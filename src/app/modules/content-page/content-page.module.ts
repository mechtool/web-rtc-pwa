import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentPageRoutingModule } from './content-page-routing.module';
import {ContentPageComponent} from "./content-page.component";
import {MaterialModule} from "../material/material.module";

import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [ContentPageComponent],
  imports: [
    CommonModule,
    ContentPageRoutingModule,
      MaterialModule,
      SharedModule,
  ]
})
export class ContentPageModule { }
