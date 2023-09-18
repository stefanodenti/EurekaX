import {Component, Input} from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'eurekax-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Input() user: User | null = null;

  constructor() {
  }
}
