import { Component } from '@angular/core';
import { Action, Role, UserType } from '../../models/user';
import { QueryFirestoreService } from 'src/app/core/services/query-firestore.service';
import { Filter } from 'src/app/core/models/query.model';
import {
  Notification,
  NotificationType,
} from 'src/app/core/models/notification.model';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import {
  Columns,
  TableAction,
} from 'src/app/uikit/components/table/table.component';
import {
  documentId,
  DocumentSnapshot,
  FieldPath,
} from '@angular/fire/firestore';

@Component({
  templateUrl: './auth-manager.component.html',
  styleUrls: ['./auth-manager.component.scss'],
})
export class AuthManagerComponent {
  rows: Action[] | Role[] = [];
  cols: Columns[] = [
    { prop: 'name', value: 'Name' },
    { prop: 'code', value: 'Code' },
  ];
  tableActions: TableAction[] = [
    {
      code: 'edit',
      icon: 'pen-to-square',
      cssClass: 'text-warning',
      tooltip: { label: 'Edit', cssClass: 'tooltip tooltip-warning' },
    },
    {
      code: 'delete',
      icon: 'trash',
      cssClass: 'text-error',
      tooltip: { label: 'Delete', cssClass: 'tooltip tooltip-error' },
    },
  ];
  filters: Filter[] = [
    {
      keyProp: 'name',
      keyword: '',
      type: '>=',
    },
  ];
  limit = 3;
  formVisible = false;
  selectedTab: 'User Types' | 'Roles' | 'Actions' = 'User Types';
  selectedRow: UserType | Role | Action | null = null;
  loadingForm: boolean = false;
  private lastVisibleEl: DocumentSnapshot | null = null;

  constructor(
    private queryService: QueryFirestoreService,
    private notificationService: NotificationsService
  ) {
    this.search();
  }

  search() {
    this.queryService
      .search(
        this.filters,
        'name',
        this.limit,
        this.lastVisibleEl,
        this.getCollection()
      )
      .then((res: any) => {
        console.log('ReS', res);
        this.lastVisibleEl = res.docs[res.docs.length - 1];
        this.rows = [
          ...this.rows,
          ...res.docs.map((re: any) => {
            let data = re.data() as Action | Role;
            data.id = re.id;
            return data;
          }),
        ];

        console.log(this.rows);
      })
      .catch((err: Error) => {
        const notification: Partial<Notification> = {
          title: 'Unable to load elemtents!',
          message: err.message,
          type: NotificationType.danger,
        };
        this.notificationService.createAlert(notification);
      });
  }

  changeTab(tab: string) {
    this.selectedTab = tab as 'User Types' | 'Roles' | 'Actions';
    this.reset();
    this.search();
  }

  saveUserType(userType: UserType) {
    if(!userType.id) {
      this.queryService
        .create<UserType>(userType, 'auth-usertypes')
        .then((res) => {
          this.reset();
          this.search();
        });
    } else {
      this.queryService.update<UserType>(userType.id, userType, 'auth-usertypes')
        .then((res) => {
          this.reset();
          this.search();
        });
    }
  }

  saveRole(role: Role) {
    if(!role.id) {
      this.queryService.create<Role>(role, 'auth-roles').then((res) => {
        this.reset();
        this.search();
      });
    } else {
      this.queryService.update<Role>(role.id, role, 'auth-roles').then((res) => {
        this.reset();
        this.search();
      });
    }
  }

  saveAction(action: Action) {
    if(!action.id) {
      this.queryService.create<Action>(action, 'auth-actions').then((res) => {
        this.reset();
        this.search();
      });
    } else {
      this.queryService.update<Action>(action.id, action, 'auth-actions').then((res) => {
        this.reset();
        this.search();
      });
    }
  }

  reset() {
    this.formVisible = false;
    this.rows = [];
    this.lastVisibleEl = null;
  }
  filter() {
    this.reset();
    this.search();
  }
  fireAction(event: { row: Action | Role | UserType; actionCode: string }) {
    if (event.actionCode === 'delete') {
      if (confirm('Are you sure?') === true) {
        this.queryService
          .delete<typeof event.row>(event.row.id, this.getCollection())
          .then((res) => {
            this.reset();
            this.search();
          });
      }
    } else if (event.actionCode === 'edit') {
      this.showForm(event.row);
    }
  }

  getCollection() {
    if (this.selectedTab === 'Roles') {
      return 'auth-roles';
    } else if (this.selectedTab === 'Actions') {
      return 'auth-actions';
    } else if (this.selectedTab === 'User Types') {
      return 'auth-usertypes';
    }
    return '';
  }

  showForm(item: Role | UserType | Action) {
    switch (this.selectedTab) {
      case 'Roles':
        const role = item as Role;
        if(role.actionIds.length > 0) {
          this.loadingForm = true;
            this.queryService.getByDocumentByIds('auth-actions', role.actionIds).subscribe({next:(res: any) => {
              role.actions = res.docs.map((re: any) => {
                let data = re.data() as Action;
                data.id = re.id;
                return data;
              });
              this.loadingForm = false;
              this.selectedRow = item;
              this.formVisible = true;
            }});
        } else {
          this.selectedRow = item;
          this.formVisible = true;
        }

        break;
      case 'User Types':
        const userType = item as UserType;
        if(userType.roleIds?.length > 0) {
          this.loadingForm = true;
          this.queryService.getByDocumentByIds('auth-roles', userType.roleIds).subscribe({next:(res: any) => {
              userType.roles = res.docs.map((re: any) => {
                let data = re.data() as Action;
                data.id = re.id;
                return data;
              });
              this.loadingForm = false;
              this.selectedRow = item;
              this.formVisible = true;

            }});
        } else {
          this.selectedRow = item;
          this.formVisible = true;
        }

        break;

      case 'Actions':
        this.selectedRow = item;
        this.formVisible = true;
        break;
    }
  }
}
