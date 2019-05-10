import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//---------------material----------------------------------
import {
    MatAutocompleteModule,
    MatButtonModule, MatExpansionModule,
    MatIconModule,
    MatInputModule, MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      MatToolbarModule,
      MatProgressBarModule,
      MatSidenavModule ,
      MatIconModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatMenuModule,
      MatExpansionModule,
      MatAutocompleteModule,
  ],
    exports : [
        MatToolbarModule,
    MatProgressBarModule,
    MatSidenavModule,
	MatIconModule,
	MatInputModule,
	MatButtonModule,
	MatSelectModule,
	MatMenuModule,
	MatExpansionModule,
	MatAutocompleteModule,
    ]
})
export class MaterialModule { }
