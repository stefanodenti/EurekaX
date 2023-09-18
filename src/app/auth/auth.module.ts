import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { VerifyEmailAddressPage } from './pages/verify-email-address/verify-email-address.page';
import { UserProfilePage } from './pages/user-profile/user-profile.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthManagerComponent } from './pages/auth-manager/auth-manager.component';
import { UsersManagerComponent } from './pages/users-manager/users-manager.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ActionFormComponent } from './components/action-form/action-form.component';
import { UikitModule } from '../uikit/uikit.module';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { UserTypeFormComponent } from './components/user-type-form/user-type-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SignInPage,
    SignUpPage,
    ForgotPasswordPage,
    VerifyEmailAddressPage,
    UserProfilePage,
    AuthManagerComponent,
    UsersManagerComponent,
    UserFormComponent,
    ActionFormComponent,
    RoleFormComponent,
    UserTypeFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    UikitModule
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
