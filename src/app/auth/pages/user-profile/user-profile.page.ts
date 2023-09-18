import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  constructor(public authService: AuthService) {

  }

  ngOnInit() {
  }

  verifyEmail() {
    this.authService.SendVerificationMail().then((res) => {
      console.log('LOGGED', this.authService.userData);
    }).catch((error) => {
      console.log(error);
    });
  }

  logout() {
    this.authService.SignOut().then((res) => {
      console.log('LOGGED', this.authService.userData);
    }).catch((error) => {
      console.log(error);
    });
  }
}
