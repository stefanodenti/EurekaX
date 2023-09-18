import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {User, UserType} from "../../auth/models/user";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Directive({
  selector: '[eurekaxIsAuthorized]'
})
export class IsAuthorizedDirective {
  private actions: string[] = [];

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.authService.userDataChange
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          const userType: UserType = this.authService.userData.userType ?? {
            description: 'TEST',
            id: 'TERST',
            name: 'TEST',
            imageUrl: '',
            roles: [
              {
                actions: [{code: 'ADMIN', id: '1', name: 'ADMIN', description: 'ADMIN'}],
                code: 'ROLE',
                description: 'ROLE',
                name: 'ROLE',
                id: '1'
              }
            ]
          };
          const actionsToFind: string[] = [];
          let isAuthorized: boolean = false;
          if(!!this.actions && this.actions.length > 0) {
            for(let role of userType.roles) {
              for(let action of role.actions){
                if(this.actions.includes(action.code) && !actionsToFind.includes(action.code)) {
                  actionsToFind.push(action.code);

                  if(actionsToFind.length === this.actions.length) {
                    break;
                  }
                }
              }
              if(actionsToFind.length === this.actions.length) {
                break;
              }
            }

            isAuthorized = actionsToFind.length === this.actions.length;
          } else {
            isAuthorized = true;
          }

          if(isAuthorized) {
            this._viewContainer.createEmbeddedView(this._templateRef);
          } else {
            this._viewContainer.clear();
          }
        }
      })
  }

  @Input() set eurekaxIsAuthorized(actions: string[]) {
    this.actions = actions;
  }

}
