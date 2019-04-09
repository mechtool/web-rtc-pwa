import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from '../material/material.module';
import { ColorMenuComponent } from './color-menu/color-menu.component';
import {SidenavItemComponent} from "./sidenav-item/sidenav-item.component";
@NgModule({
  declarations: [
      ColorMenuComponent,
      SidenavItemComponent,
  ],
  imports: [
    CommonModule,
      RouterModule,
      MaterialModule,
  ],
    exports : [
        ColorMenuComponent,
	SidenavItemComponent,
    ],
})
export class SharedModule { }
