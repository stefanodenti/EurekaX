export interface Notification {
  id: string,
  title: string;
  message: string,
  presentation: NotificationPresentationType,
  icon?: string,
  type: NotificationType,
  createdAt: number;
  routerLink?: string;
  read: boolean;
}

export enum NotificationType {
  'info',
  'success',
  'warning',
  'danger',
  'base'
}

export enum NotificationPresentationType {
  'alert',
  'default',
  'both'
}
