import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfrimModalComponent } from 'src/app/shared/components/modals/confrim-modal/confrim-modal.component';
import { TagModalComponent } from 'src/app/shared/components/modals/tag-modal/tag-modal.component';
import { Tag } from 'src/app/shared/models/tag';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss']
})
export class LabelListComponent implements OnInit {
  tags: Tag[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private tagService: TagService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getTags().subscribe({
      next: (data) => {
        this.tags = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(TagModalComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getTags();
      }
    });
  }


  openEditModal(tag: Tag) {
    const dialogRef = this.dialog.open(TagModalComponent, {
      width: '500px',
      data: {
        id: tag.id,
        label: tag.label,
        color: tag.color,
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getTags();
      }
    });
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfrimModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.tagService.deletetag(id).subscribe({
          next: (data) => {
            this.getTags();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
}

