import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//---------------material----------------------------------
import {MatIconModule, MatProgressBarModule, MatSidenavModule, MatToolbarModule} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      MatToolbarModule,
      MatProgressBarModule,
      MatSidenavModule ,
      MatIconModule,
  ],
    exports : [
        MatToolbarModule,
    MatProgressBarModule,
    MatSidenavModule,
	MatIconModule,
    ]
})
export class MaterialModule { }
