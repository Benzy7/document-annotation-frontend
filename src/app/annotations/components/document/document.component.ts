import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnnotationSelectModalComponent } from 'src/app/shared/components/modals/annotation-select-modal/annotation-select-modal.component';
import { ConfrimModalComponent } from 'src/app/shared/components/modals/confrim-modal/confrim-modal.component';
import { DocumentModalComponent } from 'src/app/shared/components/modals/document-modal/document-modal.component';
import { Annotation } from 'src/app/shared/models/annotation';
import { Document } from 'src/app/shared/models/document';
import { Tag } from 'src/app/shared/models/tag';
import { DocumentService } from 'src/app/shared/services/document.service';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  documents: Document[] = [];
  labels: Tag[] = [];

  isSelecting: boolean = false;

  selectedText: string | null = null;
  selectedRange: { start: number, end: number } | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private documentService: DocumentService,
    private tagService: TagService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDocuments();
    this.getTags();
  }

  getDocuments() {
    this.documentService.getDocuments().subscribe({
      next: (data) => {
        this.documents = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTags() {
    this.tagService.getTags().subscribe({
      next: (data) => {
        this.labels = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getAnnotatedContent(document: Document): { text: string, color?: string, label?: string }[] {
    const fragments: { text: string, color?: string, label?: string }[] = [];
    let currentIndex = 0;

    const sortedAnnotations = document.annotations.sort((a, b) => a.start - b.start);

    for (const annotation of sortedAnnotations) {
      if (annotation.start > currentIndex) {
        fragments.push({
          text: document.content.slice(currentIndex, annotation.start)
        });
      }

      const label = annotation.label as Tag;
      fragments.push({
        text: annotation.annotated_text,
        color: label.color,
        label: label.label
      });
      currentIndex = annotation.end;
    }

    if (currentIndex < document.content.length) {
      fragments.push({
        text: document.content.slice(currentIndex)
      });
    }

    return fragments;
  }

  onTextSelect(documentId: number) {
    if (this.isSelecting) return;
    this.isSelecting = true;

    const selection = window.getSelection();
    const document = this.documents.find(doc => doc.id === documentId);

    if (selection && document) {
      const selectedText = selection.toString();
      const startIndex = document!.content.indexOf(selectedText);
      const endIndex = startIndex + selectedText.length;

      if (selectedText) {
        this.selectedText = selectedText;
        this.selectedRange = { start: Math.min(startIndex, endIndex), end: Math.max(startIndex, endIndex) };
        this.openAnnotationSelectDialog(documentId);
      }
    }

    setTimeout(() => {
      this.isSelecting = false;
    }, 200);
  }

  openAnnotationSelectDialog(documentId: number) {
    if (this.selectedText && this.selectedRange) {
      const dialogRef = this.dialog.open(AnnotationSelectModalComponent, {
        width: '300px',
        data: { labels: this.labels }
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.addAnnotation(documentId, res);
        }
      });
    }
  }

  addAnnotation(documentId: number, label: Tag) {
    if (this.selectedText && this.selectedRange) {
      const { start, end } = this.selectedRange;
      const newAnnotation: Annotation = {
        start,
        end,
        annotated_text: this.selectedText,
        label: { label: label.label, color: label.color }
      };
      const document = this.documents.find(doc => doc.id === documentId);
      if (document) {
        document.annotations.push(newAnnotation);

        const data: Annotation = {
          ...newAnnotation,
          label: label.id!,
          document: documentId
        }
        this.documentService.addDocumentAnnotation(data).subscribe({
          next: (data) => {
            this.getDocuments();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
      this.selectedText = null;
      this.selectedRange = null;
    }
  }

  exportAnnotations(documentId: number) {
    const slectedDocument = this.documents.find(doc => doc.id === documentId);
    if (slectedDocument) {
      const annotationsExport = slectedDocument.annotations.map(({ id, label, ...rest }) => ({
        ...rest,
        label: typeof label === 'object' && label !== null ? label.label : ""
      }));
      const annotationsJson = JSON.stringify({ document: slectedDocument.content, annotation: annotationsExport }, null, 2);

      const blob = new Blob([annotationsJson], { type: 'application/json' });

      const url = URL.createObjectURL(blob);
      // window.open(url, '_blank');

      var a = document.createElement("a")
      a.href = url
      a.download = `${slectedDocument.title}.json`
      a.click()
    }
  }

  openAddModal() {
    const dialogRef = this.dialog.open(DocumentModalComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getDocuments();
      }
    });
  }

  openEditModal(index: number) {
    const doc = this.documents[index]
    const dialogRef = this.dialog.open(DocumentModalComponent, {
      width: '500px',
      data: {
        id: doc.id,
        title: doc.title,
        content: doc.content,
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getDocuments();
      }
    });
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfrimModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.documentService.deleteDocument(id).subscribe({
          next: (data) => {
            this.getDocuments();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
}
