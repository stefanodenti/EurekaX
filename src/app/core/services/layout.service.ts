import {Injectable, signal} from '@angular/core';
import {Layout} from "../models/config.model";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  layout = signal<Layout | null>(null);

  constructor() {}

  setLayouts(layout: Layout) {
    this.layout.set(layout ?? null);
  }
}
