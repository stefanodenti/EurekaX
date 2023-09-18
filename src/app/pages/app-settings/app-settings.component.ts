import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UikitModule } from 'src/app/uikit/uikit.module';

@Component({
  selector: 'eurekax-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    UikitModule
  ]
})
export class AppSettingsComponent {

}
