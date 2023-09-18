import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardRoutingModule } from './standard-routing.module';
import { LayoutStandardComponent } from './layout-standard.component';
import { CoreModule } from 'src/app/core/core.module';
import { UikitModule } from 'src/app/uikit/uikit.module';



@NgModule({
  declarations: [LayoutStandardComponent],
  imports: [
    CommonModule,
    StandardRoutingModule,
    CoreModule,
    UikitModule
  ]
})
export class StandardModule { }
