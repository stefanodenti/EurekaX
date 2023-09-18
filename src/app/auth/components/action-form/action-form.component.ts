import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Action} from "../../models/user";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'eurekax-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.scss']
})
export class ActionFormComponent implements OnChanges{
  @Input() action: Action | null = null;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() actionSubmit: EventEmitter<Action> = new EventEmitter<Action>();
  form = this.fb.group({
    code: this.fb.nonNullable.control<string>('', Validators.required),
    name: this.fb.nonNullable.control<string>('', Validators.required),
    description: new FormControl<string>(''),
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!!changes['action']) {
      this.form.reset(!!this.action ? {
        name: this.action.name,
        code: this.action.code,
        description: this.action.description
      } : {});
    }
  }

  submitAction() {
    this.actionSubmit.emit(!this.action ? {id: '', code:( this.form.value.code as string), name: this.form.value.name as string, description: this.form.value.description ?? null } : {
      ...this.action as Action,
      code:( this.form.value.code as string), name: this.form.value.name as string, description: this.form.value.description ?? null
    });
  }
  cancelClick(){
    this.cancel.emit(true);
  }
}
