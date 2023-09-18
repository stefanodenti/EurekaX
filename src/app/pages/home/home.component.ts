import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { UikitModule } from 'src/app/uikit/uikit.module';
import {ModalService} from "../../core/services/modal.service";
import {RoleFormComponent} from "../../auth/components/role-form/role-form.component";

@Component({
  selector: 'eurekax-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    UikitModule
  ]
})

export class HomeComponent implements OnInit {
  test = true;
  constructor(public themeService:ThemeService, private modal: ModalService) { }

  ngOnInit(): void {
  }
  toggleBTN(){
    this.test = !this.test;
  }

  openModal() {
    this.modal.openModal(RoleFormComponent, {position: 'top', size: 'sm'})
  }
}
