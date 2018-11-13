import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirm-dialog.component',
  templateUrl: 'confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  confirmMessage: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.confirmMessage = data.confirmMessage;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
