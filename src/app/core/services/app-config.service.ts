import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LayoutService} from "./layout.service";
import {ThemeService} from "./theme.service";
import {AppConfig} from "../models/config.model";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {fab} from "@fortawesome/free-brands-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(
    private http: HttpClient,
    private layoutService: LayoutService,
    private themeService: ThemeService,
    private faLibrary: FaIconLibrary
  ) {
  }

  initialize() {
    this.http.get<AppConfig>(`assets/eurekax.config.json`)
      .subscribe({
        next: (res: AppConfig) => {
          this.layoutService.setLayouts(res.layout);
          this.themeService.initializeTheme(res.themes[0]);
          this.themeService.themes.set(res.themes);

          switch (res.general?.iconStyle) {
            case 'solid':
              this.faLibrary.addIconPacks(fas, fab);
              break;
            case 'regular':
              this.faLibrary.addIconPacks(far, fab);
              break;
          }
        },
        error: (err) => {
          console.error("LOAD CONFIG", err.error);
        }
      });
  }
}
