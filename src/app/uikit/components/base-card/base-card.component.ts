import { Component, Input } from '@angular/core';

@Component({
  selector: 'eurekax-base-card',
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.scss'],
})
export class BaseCardComponent {
  @Input() bgColor: string = 'bg-base-200';
  @Input() title: string = '';
}
