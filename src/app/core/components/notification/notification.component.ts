import {Component, Input} from '@angular/core';
import {Notification, NotificationType} from "../../models/notification.model";
import {NotificationsService} from "../../services/notifications.service";
import {Router} from "@angular/router";

@Component({
  selector: 'eurekax-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input({required: true}) notification!: Notification;
  notificationType = NotificationType;

  constructor(private notificationService: NotificationsService, private router: Router) {
  }

  deleteNotification() {
    this.notificationService.deleteNotification(this.notification.id);
  }

  readNotification() {
    if(!this.notification.read) {
      this.notificationService.readNotification(this.notification.id);
    }
  }

  navigate() {
    this.router.navigateByUrl(this.notification.routerLink as string).then();
    this.notificationService.toggleNotificationCenter();
  }
}
