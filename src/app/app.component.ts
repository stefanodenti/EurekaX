import {Component, OnInit, ViewChild} from '@angular/core';
import { AppConfigService } from "./core/services/app-config.service";
import {NotificationsService} from "./core/services/notifications.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('notificationDrawerCheckbox') notificationDrawerCheckbox!: HTMLInputElement;
  title = 'EurekaX-Web';

  constructor(private appConfigService: AppConfigService, public notificationService: NotificationsService) {
    this.appConfigService.initialize();

  }

  ngOnInit() {

  }
}
