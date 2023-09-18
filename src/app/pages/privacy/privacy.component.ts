import { UikitModule } from './../../uikit/uikit.module';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'eurekax-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    UikitModule
  ]
})
export class PrivacyComponent {

}
