import {Component, signal} from '@angular/core';
import {NotificationsService} from "../../services/notifications.service";
import {Notification, NotificationPresentationType, NotificationType} from "../../models/notification.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'eurekax-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertListComponent {
  alerts = signal<(Notification)[]>([]);

  constructor(private notificationService: NotificationsService) {
    this.notificationService.newAlert
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (alert: Notification) => this.alerts.update(value => [alert, ...value])
      });
  }

  removeAlert(id: string) {
    this.alerts.set(this.alerts().filter(alert => alert.id !== id));
  }
}
