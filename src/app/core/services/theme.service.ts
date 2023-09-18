import { Injectable, signal } from '@angular/core';
import { Theme } from '../models/config.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = signal<boolean>(false);
  theme = signal<Theme>({
    name: '',
    logo: '',
  });
  themes = signal<Theme[]>([]);

  constructor() {}

  initializeTheme(theme: any) {
    this.theme.set(theme);
    this.setTheme();
  }

  setTheme() {
    document
      .getElementsByTagName('html')
      ?.item(0)
      ?.setAttribute('data-theme', this.theme().name);
  }

  toggleDark() {
    this.isDark.set(!this.isDark());
    this.setTheme();
  }

  changeTheme(theme: Theme) {
    this.theme.set(theme);
    this.setTheme();
  }

  private getThemeAnimationDuration(): number {
    let durationString = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--transition-theme-duration');
    if (durationString[0] === '.') {
      durationString = '0' + durationString;
    }
    if (durationString.includes('ms')) {
      return +durationString.slice(0, durationString.indexOf('m'));
    } else if (durationString.includes('s')) {
      return +durationString.slice(0, durationString.indexOf('s')) * 1000;
    }

    return 0;
  }
}
