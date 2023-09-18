import { ThemeService } from '../../services/theme.service';
import { Component } from '@angular/core';

@Component({
  selector: 'eurekax-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss']
})
export class DarkModeToggleComponent {
  constructor(public themeService:ThemeService){

  }
  toggle(){
    this.themeService.toggleDark();
  }
}
