import {Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {ModalContainerDirective} from "./modal-container.directive";
import {BaseCardComponent} from "../../../uikit/components/base-card/base-card.component";

@Component({
  selector: 'eurekax-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title?: string;
  @Input() position: 'center' | 'top' | 'bottom' = 'center';
  @Input() showCloseButton: boolean = true;
  @Input() backdropDismiss: boolean = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'lg';
  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(ModalContainerDirective, {static: true}) modalDirective!: ModalContainerDirective;
  protected id = 'modal-' + Date.now();

  constructor(private elementRef: ElementRef) {
  }


  close(backdrop?: boolean) {
    if(!backdrop || (backdrop && this.backdropDismiss)) {
      document.getElementById(this.id)?.classList.add(this.position === 'bottom' ? 'fade-out-bottom' : 'fade-out-top');
      setTimeout(() => {
        this.elementRef.nativeElement.remove();
        this.closeEvent.emit();
      }, 750)
    }
  }

}
