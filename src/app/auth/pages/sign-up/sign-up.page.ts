import {Component, computed, OnInit} from '@angular/core';
import {ThemeService} from "../../../core/services/theme.service";
import {AppConfigService} from "../../../core/services/app-config.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
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
