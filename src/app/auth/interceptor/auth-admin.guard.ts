import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard {
  constructor(public authService: AuthService, public router: Router, private af: AngularFireAuth) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if(this.authService.userData?.isAdmin){
      return true;
    }
    return this.authService.userDataChange.pipe(map((user: any) => {return user.isAdmin}))
  }
}
