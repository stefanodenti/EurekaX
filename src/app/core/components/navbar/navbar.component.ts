import {Component, computed, Input, OnInit} from '@angular/core';
import {SidenavService} from "../sidenav/sidenav.service";
import {ThemeService} from "../../services/theme.service";
import {NavBar} from "../../models/config.model";
import {AuthService} from "../../../auth/services/auth.service";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'eurekax-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() config: NavBar | null = null;
  @Input() showMenuButton: boolean = true;
  showMobileMenu = false;
  unreadNotifications = computed(() => this.notificationService.notifications().filter(not => !not.read).length);

  constructor(
    private notificationService: NotificationsService,
    public sidenavService: SidenavService,
    public themeService: ThemeService,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }

}
