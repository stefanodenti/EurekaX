import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { DarkModeToggleComponent } from './components/dark-mode-toggle/dark-mode-toggle.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { UserLoggedDropdownComponent } from './components/user-logged-dropdown/user-logged-dropdown.component';
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { AlertComponent } from './components/alert/alert.component';
import { NotificationCenterComponent } from './components/notification-center/notification-center.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationButtonComponent } from './components/notification-button/notification-button.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { IsAuthorizedDirective } from './directives/is-authorized.directive';
import { ModalComponent } from './components/modal/modal.component';
import {UikitModule} from "../uikit/uikit.module";
import { ModalContainerDirective } from './components/modal/modal-container.directive';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidenavComponent,
    NotificationsComponent,
    DarkModeToggleComponent,
    ThemeSelectorComponent,
    LanguageSelectorComponent,
    UserLoggedDropdownComponent,
    AlertListComponent,
    AlertComponent,
    NotificationCenterComponent,
    NotificationComponent,
    NotificationButtonComponent,
    IsAuthorizedDirective,
    ModalComponent,
    ModalContainerDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NavigationComponent,
    FontAwesomeModule,
    UikitModule
  ],
    exports: [
        NavbarComponent,
        FooterComponent,
        SidenavComponent,
        NotificationsComponent,
        DarkModeToggleComponent,
        ThemeSelectorComponent,
        LanguageSelectorComponent,
        AlertListComponent,
        NotificationCenterComponent,
        IsAuthorizedDirective
    ],
})
export class CoreModule {

}
