import {Component, Input} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import {Theme} from "../../models/config.model";

@Component({
  selector: 'eurekax-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent {
  @Input() iconMode: boolean = false;
  dropdownId: string = Date.now().toString();
  constructor(public themeService: ThemeService) {

  }


  changeTheme(theme: Theme) {
    this.themeService.changeTheme(theme);
  }
}
