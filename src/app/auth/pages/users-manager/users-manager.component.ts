import {
  Notification,
  NotificationType,
} from './../../../core/models/notification.model';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { QueryFirestoreService } from 'src/app/core/services/query-firestore.service';
import { Filter } from 'src/app/core/models/query.model';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { User } from '../../models/user';
import { Columns } from 'src/app/uikit/components/table/table.component';

@Component({
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss'],
})
export class UsersManagerComponent {
  rows: User[] = [];
  cols: Columns[] = [{
  prop: 'email', value: 'Email'
  }];
  filters: Filter[] = [
    {
      keyProp: 'displayName',
      keyword: '',
      type: '!=',
    },
  ];
  private lastVisibleEl: any;

  constructor(
    private qfService: QueryFirestoreService,
    private notificationService: NotificationsService
  ) {
    this.loadUsers();
  }

  loadUsers() {
    this.qfService.search(this.filters, 'displayName', 10, null, 'users').then((res: any) => {
        console.log('ReS', res);
        this.lastVisibleEl = res.docs[res.docs.length - 1];
        this.rows = [
          ...this.rows,
          ...res.docs.map((user: any) => {
            let data = user.data() as User;
            data.uid = user.id;
            return data;
          }),
        ];
      }).catch((err: Error) => {
        const notification: Partial<Notification> = {
          title: 'Unable to load users!',
          message: err.message,
          type: NotificationType.danger,
        };
        this.notificationService.createAlert(notification);
      });;
  }
}
