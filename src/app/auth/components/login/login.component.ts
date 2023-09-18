import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {
    console.log('ISLOGGED?', this.authService.userData);
  }

  login() {
    this.authService.SignIn(this.email, this.password).then((res) => {
      console.log('LOGGED', this.authService.userData);
    }).catch((error) => {
      console.log(error);
    });
  }

  googleLogin() {
    this.authService.LoginWithGoogle().then((res) => {
      console.log('LOGGED', this.authService.userData);
    });
  }
}
