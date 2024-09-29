import { NgModule } from '@angular/core';
import { AnnotationsRoutingModule } from './annotations-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DocumentComponent } from './components/document/document.component';
import { LabelListComponent } from './components/label-list/label-list.component';
import { AnnotationsComponent } from './annotations.component';



@NgModule({
  declarations: [
    DocumentComponent,
    LabelListComponent,
    AnnotationsComponent
  ],
  imports: [
    AnnotationsRoutingModule,
    SharedModule
  ]
})
export class AnnotationsModule { }
