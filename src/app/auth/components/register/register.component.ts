import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit{

  email: string = '';
  password: string = '';
  termsCheck: boolean = true;
  privacyCheck: boolean = false;
  constructor(private authService: AuthService) {
    console.log('ISLOGGED?', this.authService.userData);
  }

  ngAfterViewInit() {
    console.log(this.email, this.password)
  }

  register() {
    if (this.privacyCheck && this.termsCheck) {
      this.authService.SignUp(this.email, this.password).then((res) => {
        console.log('LOGGED', this.authService.userData);
      }).catch((error) => {
        console.log(error);
      });
    }
}
}
