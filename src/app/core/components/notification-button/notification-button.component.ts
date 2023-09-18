import {Component, computed} from '@angular/core';
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'eurekax-notification-button',
  templateUrl: './notification-button.component.html',
  styleUrls: ['./notification-button.component.scss']
})
export class NotificationButtonComponent {
  unreadNotifications = computed(() => this.notificationService.notifications().filter(not => !not.read).length);

  constructor(private notificationService: NotificationsService) {
  }

  toggleNotificationCenter() {
    this.notificationService.toggleNotificationCenter();
  }
}
