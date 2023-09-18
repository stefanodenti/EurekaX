import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UikitModule } from 'src/app/uikit/uikit.module';

@Component({
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    UikitModule
  ]
})
export class LicenseComponent {

}
