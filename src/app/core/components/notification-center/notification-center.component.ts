import {Component, HostListener, Input, signal} from '@angular/core';
import {NotificationsService} from "../../services/notifications.service";
import {Sidenav} from "../../models/config.model";

@Component({
  selector: 'eurekax-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss']
})
export class NotificationCenterComponent {
  notifications = this.notificationService.notifications;


  constructor(private notificationService: NotificationsService) {
  }

  toggleNotifications() {
    this.notificationService.toggleNotificationCenter();
  }
}
