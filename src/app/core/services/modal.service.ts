import {
  ApplicationRef, createComponent,
  Inject,
  Injectable,
  TemplateRef,
  Type
} from '@angular/core';
import {ModalComponent} from "../components/modal/modal.component";
import {Subject} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
              private applicationRef: ApplicationRef,
              @Inject(DOCUMENT) private document: Document) {
  }

  openModal<T>(content: TemplateRef<any> | Type<T>, options?: {title?: string, showCloseButton?: boolean, backdropDismiss?: boolean, position?: 'center' | 'top' | 'bottom', size?: 'sm' | 'md' | 'lg'} ) {
    let modalComponent;
    if(content instanceof TemplateRef) {
      modalComponent = createComponent(ModalComponent,
        {environmentInjector: this.applicationRef.injector,
        projectableNodes: [content.createEmbeddedView(null).rootNodes]});
    } else {
      modalComponent = createComponent(ModalComponent, {environmentInjector: this.applicationRef.injector});
      const componentViewRef = modalComponent.instance.modalDirective.viewContainerRef;
      componentViewRef.clear();
      componentViewRef.createComponent(content);
    }

      modalComponent.instance.title = options?.title;
      modalComponent.instance.showCloseButton = options?.showCloseButton ?? true;
      modalComponent.instance.backdropDismiss = options?.backdropDismiss ?? true;
      modalComponent.instance.position = options?.position ?? 'center';
      modalComponent.instance.size = options?.size ?? 'lg';
      const modalNotifier = new Subject<string>();
      modalComponent.instance.closeEvent.subscribe(() => modalNotifier?.next('close'));
      modalComponent.hostView.detectChanges();
      this.document.body.appendChild(modalComponent.location.nativeElement);
      return modalNotifier.asObservable();
  }
}
