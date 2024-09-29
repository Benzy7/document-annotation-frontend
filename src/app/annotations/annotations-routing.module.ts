import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './components/document/document.component';
import { LabelListComponent } from './components/label-list/label-list.component';
import { AnnotationsComponent } from './annotations.component';

const routes: Routes = [
  {
    path: "",
    component: AnnotationsComponent,
    children: [
      { path: "", redirectTo: "documents", pathMatch: "full" },
      { path: "documents", component: DocumentComponent },
      { path: "labels", component: LabelListComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnotationsRoutingModule { }
