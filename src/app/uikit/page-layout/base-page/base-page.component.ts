import { Component, Input } from '@angular/core';

@Component({
  selector: 'eurekax-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
})
export class BasePageComponent {
  @Input() title: string = '';
}
