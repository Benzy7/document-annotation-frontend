import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confrim-modal',
  templateUrl: './confrim-modal.component.html',
  styleUrls: ['./confrim-modal.component.scss']
})
export class ConfrimModalComponent {
  constructor(public dialogRef: MatDialogRef<ConfrimModalComponent>) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
