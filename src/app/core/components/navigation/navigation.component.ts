import {Component, Input} from '@angular/core';
import {Navigation} from "../../models/config.model";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {NotificationType} from "../../models/notification.model";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'eurekax-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  standalone: true
})
export class NavigationComponent {
  @Input() navigations: Navigation[] | null = null;
  @Input() mode: 'vertical' | 'horizontal' = 'horizontal';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('NAVIGATION', this.activatedRoute.snapshot);
    console.log(this.router.url)
  }


  getCssClass(navigation: Navigation) {
    let classesObject: { [p: string]: boolean } = {};
    if (!!navigation.cssClass) {
      classesObject[navigation.cssClass] = !!navigation.cssClass
    }
    return {
      ...classesObject,
      'text-primary': navigation.routerLink === this.router.url || navigation.childs?.find(nav => nav.routerLink === this.router.url)
    };
  }
}
