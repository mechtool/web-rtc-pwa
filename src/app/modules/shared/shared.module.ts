import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from '../material/material.module';
import { ColorMenuComponent } from './color-menu/color-menu.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
@NgModule({
  declarations: [
      ColorMenuComponent,
      ContactItemComponent,
  ],
  imports: [
    CommonModule,
      RouterModule,
      MaterialModule,
  ],
    exports : [
	ColorMenuComponent,
	ContactItemComponent,
    ],
})
export class SharedModule { }
