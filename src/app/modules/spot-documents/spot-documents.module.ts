import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotDocumentsComponent } from './spot-documents.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


export const docRoutes: Route[] = [
  {
    path: '',
    component: SpotDocumentsComponent,
  }
];
@NgModule({
  declarations: [
    SpotDocumentsComponent
  ],
  imports: [
    RouterModule.forChild(docRoutes),
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule
  ]
})
export class SpotDocumentsModule { }
