import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {

  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
