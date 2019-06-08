import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule, MatButtonModule, MatCheckboxModule, MatGridListModule, MatToolbarModule,
  MatDialogModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatRippleModule,
  MatChipsModule,
  MatTableModule
} from '@angular/material';

const imports = [
  CommonModule,
  MatToolbarModule,
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatIconModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatRippleModule,
  MatChipsModule,
  MatTableModule
];


@NgModule({
  declarations: [],
  imports: [...imports],
  exports: [...imports]
})
export class AngularMaterialModule { }
