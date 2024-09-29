import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DocumentModalComponent } from './components/modals/document-modal/document-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TagModalComponent } from './components/modals/tag-modal/tag-modal.component';
import { MatTableModule } from '@angular/material/table';
import { AnnotationSelectModalComponent } from './components/modals/annotation-select-modal/annotation-select-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfrimModalComponent } from './components/modals/confrim-modal/confrim-modal.component';

@NgModule({
  declarations: [
    SideBarComponent,
    DocumentModalComponent,
    TagModalComponent,
    AnnotationSelectModalComponent,
    ConfrimModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule
  ], exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    SideBarComponent,
    ConfrimModalComponent,
    AnnotationSelectModalComponent,
    TagModalComponent,
    DocumentModalComponent
  ]
})
export class SharedModule { }
