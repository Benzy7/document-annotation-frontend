import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/shared/services/document.service';

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.scss']
})
export class DocumentModalComponent {
  documentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DocumentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentService: DocumentService,

  ) {
    this.documentForm = this.fb.group({
      id: [data?.id ?? null],
      title: [data?.title ?? '', Validators.required],
      content: [data?.content ?? '', Validators.required]
    });
  }

  onAdd() {
    this.documentService.addDocument(this.documentForm.value).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error:', error)
      },
    })
  }

  onEdit() {
    this.documentService.updateDocument(this.data.id, this.documentForm.value).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error:', error)
      },
    })
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
