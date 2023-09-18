import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Action, Role, UserType} from "../../models/user";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {concatMap, finalize, Subscription, take, timer} from "rxjs";
import {QueryFirestoreService} from "../../../core/services/query-firestore.service";
import { documentId } from '@angular/fire/firestore';
import { Filter } from 'src/app/core/models/query.model';

@Component({
  selector: 'eurekax-user-type-form',
  templateUrl: './user-type-form.component.html',
  styleUrls: ['./user-type-form.component.scss']
})
export class UserTypeFormComponent {
  @Input() userType: UserType | null = null;
  @Output() userTypeSubmit: EventEmitter<UserType> = new EventEmitter<UserType>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  form = this.fb.group({
    imageUrl: this.fb.control<string>(''),
    name: this.fb.nonNullable.control<string>('', Validators.required),
    description: new FormControl<string>(''),
    roles: new FormControl<Role[]>([]),
  });
  isAutoCompleteLoading: boolean = false;
  openDropdown: boolean = false;
  rolesArray: Role[] = [];
  private debounceAutoComplete: number = 300;
  private subscriptionAutoComplete: Subscription | null = null;

  constructor(private fb: FormBuilder, private queryService: QueryFirestoreService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!!changes['userType']) {
      this.form.reset(!!this.userType ? {
        name: this.userType.name,
        imageUrl: this.userType.imageUrl,
        description: this.userType.description,
        roles: this.userType.roles
      } : {roles: []});
    }
  }

  submitAction() {
    const roleIds = this.form.value.roles?.map(role => role.id) ?? [];
    this.userTypeSubmit.emit(!this.userType ? {id: '', imageUrl:( this.form.value.imageUrl as string) ?? null, name: this.form.value.name as string, description: this.form.value.description ?? null, roles: [], roleIds } : {
      ...this.userType as UserType,
      imageUrl:( this.form.value.imageUrl as string) ?? null, name: this.form.value.name as string, description: this.form.value.description ?? null,
      roles: [],
      roleIds
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
      this.rolesArray = [];
      this.subscriptionAutoComplete = timer(this.debounceAutoComplete)
        .pipe(
          take(1),
          concatMap(() => {
            return this.queryService.search(
              [
               ...(this.form.value.roles && this.form.value.roles?.length > 0 ? [{keyProp: 'name', type: "not-in", keyword: this.form.value.roles?.map(r => r.name) } as Filter]: []),
                {keyProp: 'name', type: '>=', keyword: text},
              ],
              'name',
              999,
              null,
              'auth-roles'
            )
          }),
          finalize(() => this.isAutoCompleteLoading = false)
        )
        .subscribe({
          next: (res: any) => {
            this.rolesArray = res.docs.map((re: any) => {
              let data = re.data() as Role;
              data.id = re.id;
              return data;
            });

            this.openDropdown = true
          }
        })
    }
  }

  selectRole(role: Role, input: any) {
    this.form.value.roles?.push(role);
    this.rolesArray = [];
    input.value = '';
    input.focus();
  }

  removeRole(id: string) {
    this.form.value.roles = this.form.value.roles?.filter(role => role.id !== id);
  }
}
