import { Filter } from './../../../core/models/query.model';
import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Action, Role} from "../../models/user";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {concatMap, finalize, Subscription, take, timer} from "rxjs";
import {QueryFirestoreService} from "../../../core/services/query-firestore.service";

@Component({
  selector: 'eurekax-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent {
  @Input() role: Role | null = null;
  @Output() roleSubmit: EventEmitter<Role> = new EventEmitter<Role>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  form = this.fb.group({
    code: this.fb.nonNullable.control<string>('', Validators.required),
    name: this.fb.nonNullable.control<string>('', Validators.required),
    description: new FormControl<string>(''),
    actions: new FormControl<Action[]>([])
  });
  isAutoCompleteLoading: boolean = false;
  openDropdown: boolean = false;
  actionsArray: Action[] = [];
  private debounceAutoComplete: number = 300;
  private subscriptionAutoComplete: Subscription | null = null;

  constructor(private fb: FormBuilder, private queryService: QueryFirestoreService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!!changes['role']) {
      this.form.reset(!!this.role ? {
        name: this.role.name,
        code: this.role.code,
        description: this.role.description,
        actions: this.role.actions
      } : {actions: []});
    }
  }

  submitAction() {
    const actionIds = this.form.value.actions?.map(action => action.id) ?? [];
    this.roleSubmit.emit(!this.role ?
      {
        id: '',
        code:( this.form.value.code as string),
        name: this.form.value.name as string,
        description: this.form.value.description ?? null,
        actions: [], actionIds } : {
      ...this.role as Role,
      code:( this.form.value.code as string),
      name: this.form.value.name as string,
      description: this.form.value.description ?? null,
      actions: [],
        actionIds
    });
  }

  cancelClick(){
    this.cancel.emit(true);
  }

  search(text: string) {
    if(!!text) {
      if(!!this.subscriptionAutoComplete) {
        this.subscriptionAutoComplete.unsubscribe();
      }

      this.isAutoCompleteLoading = true;
      this.actionsArray = [];
      this.subscriptionAutoComplete = timer(this.debounceAutoComplete)
        .pipe(
          take(1),
          concatMap(() => {
            return this.queryService.search(
              [
                ...(this.form.value.actions && this.form.value.actions?.length > 0 ? [{keyProp: 'name', type: "not-in", keyword: this.form.value.actions?.map(r => r.name) } as Filter]: []),
                {keyProp: 'name', type: '>=', keyword: text}
              ],
            'name',
              999,
              null,
              'auth-actions'
            )
          }),
          finalize(() => this.isAutoCompleteLoading = false)
        )
        .subscribe({
          next: (res: any) => {
            this.actionsArray = res.docs.map((re: any) => {
              let data = re.data() as Action;
              data.id = re.id;
              return data;
            });

            this.openDropdown = true
          }
        })
    }
  }

  selectAction(action: Action, input: any) {
    this.form.value.actions?.push(action);
    this.actionsArray = [];
    input.value = '';
    input.focus();
  }

  removeAction(id: string) {
    this.form.value.actions = this.form.value.actions?.filter(action => action.id !== id);
  }
}
