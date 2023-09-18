import {Injectable, signal} from '@angular/core';
import {Notification, NotificationPresentationType, NotificationType} from "../models/notification.model";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notifications = signal<Notification[]>([]);
  private newAlert$: Subject<Notification> = new Subject<Notification>();
  notificationCenterStatus = signal<'open' | 'close'>('close');

  constructor() { }

  get newAlert(): Observable<Notification> {
    return this.newAlert$.asObservable();
  }
  toggleNotificationCenter() {
    this.notificationCenterStatus.update(value => {
      if(value === 'open') {
        return 'close';
      } else {
        return 'open';
      }
    });

    const checkbox: HTMLInputElement | null = document.getElementById('notifications-drawer') as HTMLInputElement;
    if(!!checkbox) {
      console.log(checkbox.checked)
      checkbox.checked = this.notificationCenterStatus() === 'open';
    }
  }

  openNotificationCenter() {
    this.notificationCenterStatus.set('open');
  }

  closeNotificationCenter() {
    this.notificationCenterStatus.set('close');
  }

  createAlert(config: Partial<Notification>) {
    this.newAlert$.next({
      id: config.id ?? Date.now().toString(),
      icon: config.icon,
      createdAt: Date.now(),
      title: config.title ?? '',
      message: config.message ?? '',
      type: config.type ?? NotificationType.base,
      presentation: config.presentation === NotificationPresentationType.both ? config.presentation : NotificationPresentationType.alert,
      read: false,
      routerLink: config.routerLink,
    });
  }

  createNotification(config: Partial<Notification>) {
    const notification: Notification = {
      id: config.id ?? Date.now().toString(),
      icon: config.icon,
      createdAt: Date.now(),
      title: config.title ?? '',
      message: config.message ?? '',
      type: config.type ?? NotificationType.base,
      presentation: config.presentation ?? NotificationPresentationType.default,
      read: false,
      routerLink: config.routerLink
    };

    if([NotificationPresentationType.default, NotificationPresentationType.both].includes(notification.presentation)) {
      this.notifications.update(value => [notification, ...value]);
    }

    if([NotificationPresentationType.alert, NotificationPresentationType.both].includes(notification.presentation)) {
      this.createAlert(notification);
    }
  }


  showHelpModal() {
    console.log("showHelpModal.")
  }

  showSuccessAlert() {
    console.log("showSucessAlert.")
  }

  showWarningAlert() {
    console.log("showWarningAlert.")
  }

  showErrorAlert() {
    console.log("showErrorAlert.")
  }

  deleteNotification(id: string) {
    this.notifications.update(value => {
      return value.filter(not => not.id !== id);
    })
  }

  readNotification(id: string) {
    this.notifications.update(value => {
      return value.map(not => {
        if(not.id === id) {
          not.read = true;
        }

        return not;
      })
    })
  }

}
