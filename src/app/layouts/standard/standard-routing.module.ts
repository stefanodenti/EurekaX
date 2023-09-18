import { AppSettingsComponent } from './../../pages/app-settings/app-settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { LayoutStandardComponent } from './layout-standard.component';
import { ContactsComponent } from '../../pages/contacts/contacts.component';
import { PrivacyComponent } from 'src/app/pages/privacy/privacy.component';
import { AuthGuard } from 'src/app/auth/interceptor/auth.guard';
import { UserProfilePage } from 'src/app/auth/pages/user-profile/user-profile.page';
import { AuthManagerComponent } from '../../auth/pages/auth-manager/auth-manager.component';
import { AuthAdminGuard } from 'src/app/auth/interceptor/auth-admin.guard';
import { UsersManagerComponent } from 'src/app/auth/pages/users-manager/users-manager.component';
import { LicenseComponent } from 'src/app/pages/license/license.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutStandardComponent,
    children: [
      {
        path: 'admin',
        children: [
          {
            path: 'users',
            component: UsersManagerComponent,
          },
          {
            path: 'permissions',
            component: AuthManagerComponent,
          },
        ],
        canActivate: [AuthAdminGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'privacy',
        component: PrivacyComponent,
      },
      {
        path: 'license',
        component: LicenseComponent,
      },
      {
        path: 'settings',
        component: AppSettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-profile',
        component: UserProfilePage,
        canActivate: [AuthGuard],
      },
      {
        path: 'auth-manager',
        component: AuthManagerComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandardRoutingModule {}
