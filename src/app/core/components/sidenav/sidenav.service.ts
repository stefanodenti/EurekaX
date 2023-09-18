import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  sidenavStatus = signal<'open' | 'close'>('close');

  constructor() { }

  openSidenav() {
    this.sidenavStatus.set('open');
  }

  closeSidenav() {
    this.sidenavStatus.set('close');
  }

  toggleSidenav() {
    this.sidenavStatus.set(this.sidenavStatus() === 'open' ? 'close' : 'open');
  }
}
