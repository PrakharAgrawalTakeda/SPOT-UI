import { Component, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatChipsModule } from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseAlertModule } from '@fuse/components/alert';
import { MyPreferenceComponent } from './my-preference.component';
import { SpotFormsModule } from 'app/core/spot-forms/spot-forms.module';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
export const projectRoutes: Route[] = [
  {
    path: '',
    component: MyPreferenceComponent,
 children: [
 
  {
    path: 'project-settings',
    component: ProjectSettingsComponent,
  }
]
}];


@NgModule({
  declarations: [
    MyPreferenceComponent,
    ProjectSettingsComponent
  ],
  imports: [
    RouterModule.forChild(projectRoutes),
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    NgApexchartsModule,
    TranslocoModule,
    SharedModule,
    CommonModule,
    FuseDrawerModule,
    FuseNavigationModule,
    NgScrollbarModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxDatatableModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatTooltipModule,
    FuseAlertModule,
    SpotFormsModule
  ]
})
export class MyPreferenceModule { }
