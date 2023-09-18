import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-verify-email-address',
  templateUrl: './verify-email-address.page.html',
  styleUrls: ['./verify-email-address.page.scss'],
})
export class VerifyEmailAddressPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  resend() {
    this.authService.SendVerificationMail().then((res) => {
      console.log("LOGGED", this.authService.userData);
    }).catch((error) => {
      console.log(error);
    });
  }
}
