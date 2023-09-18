import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UikitModule } from 'src/app/uikit/uikit.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    UikitModule,
    FontAwesomeModule
  ]
})

export class ContactsComponent implements OnInit {
  email = "hello@email.com"
  constructor() { }

  ngOnInit(): void {
  }

}
