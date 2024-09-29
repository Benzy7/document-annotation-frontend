import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tag } from 'src/app/shared/models/tag';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.scss']
})
export class TagModalComponent {
  tagForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TagModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tag | null,
    private tagService: TagService
  ) {
    this.tagForm = this.fb.group({
      id: [data?.id ?? null],
      label: [data?.label ?? '', Validators.required],
      color: [data?.color ?? '', [Validators.required, Validators.pattern(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)]],
    });
  }

  onSave(): void {
    if (this.tagForm.valid) {
      const tag: Tag = this.tagForm.value;
      if (tag.id) {
        this.tagService.updateTag(tag.id, tag).subscribe(() => this.dialogRef.close(true));
      } else {
        this.tagService.addTag(tag).subscribe(() => this.dialogRef.close(true));
      }
    }
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
