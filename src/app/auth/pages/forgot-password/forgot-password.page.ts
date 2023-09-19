import {Component, computed, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AppConfigService} from "../../../core/services/app-config.service";
import {ThemeService} from "../../../core/services/theme.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  passwordResetEmail: string = '';
  logoUrl = computed(() => {
    if(this.themeService.theme().isDark) {
      return this.appConfigService.general()?.brand.logoUrlDark;
    } else {
      return this.appConfigService.general()?.brand.logoUrl;
    }
  })
  constructor(private authService: AuthService, private appConfigService: AppConfigService, private themeService: ThemeService) {
  }

  ngOnInit() {
  }

  forgotPassword() {
    this.authService.ForgotPassword(this.passwordResetEmail).then((res) => {
      console.log('EMAIL SEND FORGOT', res);
    }).catch((error) => {
      console.log(error);
    });
  }
}
