import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-annotation-select-modal',
  templateUrl: './annotation-select-modal.component.html',
  styleUrls: ['./annotation-select-modal.component.scss']
})
export class AnnotationSelectModalComponent {
  @Input()labels: Tag[] = [];
  selectedLabel: Tag | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<AnnotationSelectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.labels = data.labels;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSelect(): void {
    if (this.selectedLabel) {
      this.dialogRef.close(this.selectedLabel);
    }
  }
}
