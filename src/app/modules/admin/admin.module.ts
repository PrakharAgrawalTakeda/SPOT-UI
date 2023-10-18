import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersEditComponent } from './manage-users-edit/manage-users-edit.component';
import { AdminComponent } from './admin.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { SpotFormsModule } from 'app/core/spot-forms/spot-forms.module';

export const projectRoutes: Routes = [
  { path: '', component: AdminComponent },
];

@NgModule({
  declarations: [
    ManageUsersEditComponent
  ],
  imports: [
    RouterModule.forChild(projectRoutes),
    CommonModule,
    SpotFormsModule
  ]
})
export class AdminModule { }
