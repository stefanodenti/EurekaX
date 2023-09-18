import { Component, Input } from '@angular/core';

@Component({
  selector: 'eurekax-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  @Input() position: 'top' | 'end' | 'start' = 'end';

}
