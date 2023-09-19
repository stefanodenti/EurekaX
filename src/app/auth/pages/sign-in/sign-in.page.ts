import {Component, computed, OnInit} from '@angular/core';
import {ThemeService} from "../../../core/services/theme.service";
import {AppConfigService} from "../../../core/services/app-config.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  logoUrl = computed(() => {
    if(this.themeService.theme().isDark) {
      return this.appConfigService.general()?.brand.logoUrlDark;
    } else {
      return this.appConfigService.general()?.brand.logoUrl;
    }
  })

  constructor(private themeService: ThemeService, private appConfigService: AppConfigService) { }

  ngOnInit() {
  }

}
