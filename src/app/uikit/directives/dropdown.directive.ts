import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dropdown]',
})
export class DropdownDirective {
  private isOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click') onClick() {
    const dropdownOptions = this.el.nativeElement.nextElementSibling;
    const dropdownRect = dropdownOptions.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (this.isOpen) {
      this.renderer.removeClass(dropdownOptions, 'hidden');
    } else {
      if (dropdownRect.bottom + dropdownRect.height > viewportHeight) {
        this.renderer.addClass(dropdownOptions, 'show-above');
      } else {
        this.renderer.removeClass(dropdownOptions, 'show-above');
      }
      this.renderer.addClass(dropdownOptions, 'hidden');
    }
    this.isOpen = !this.isOpen;
  }
}