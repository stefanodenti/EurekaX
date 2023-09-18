import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseCardComponent } from './components/base-card/base-card.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { HeroComponent } from './blocks/hero/hero.component';
import { DropdownDirective } from './directives/dropdown.directive';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { TableComponent } from './components/table/table.component';
import { BasePageComponent } from './page-layout/base-page/base-page.component';
import { TabPageComponent } from './page-layout/tab-page/tab-page.component';



@NgModule({
  declarations: [
    BaseCardComponent,
    ImageCardComponent,
    HeroComponent,
    DropdownDirective,
    TableComponent,
    BasePageComponent,
    TabPageComponent,
  ],
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
  exports: [
    BaseCardComponent,
    ImageCardComponent,
    HeroComponent,
    DropdownDirective,
    TableComponent,
    BasePageComponent,
    TabPageComponent
  ]
})
export class UikitModule { }
