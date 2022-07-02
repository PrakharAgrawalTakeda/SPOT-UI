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
import { ProjectHubComponent } from './project-hub.component';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { ProjectTeamComponent } from './project-team/project-team.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AssociatedProjectsComponent } from './associated-projects/associated-projects.component';
import { BudgetComponent } from './budget/budget.component';
import { ProjectDocumentsComponent } from './project-documents/project-documents.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { TopsComponent } from './tops/tops.component';
import { CapsComponent } from './caps/caps.component';
import { ReportsComponent } from './reports/reports.component';
import { LocalAttributesComponent } from './local-attributes/local-attributes.component';
import { HubSettingsComponent } from './hub-settings/hub-settings.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AskNeedViewEditComponent } from './project-view/ask-need-view-edit/ask-need-view-edit.component';


export const projectRoutes: Route[] = [
  {
      path     : '',
      component: ProjectHubComponent,
      children:[{
        path: '',
        pathMatch: 'full',
        redirectTo: 'project-view'
      },
      {
        path: 'project-team',
        component: ProjectTeamComponent,
        pathMatch: 'full'
      },
      {
        path: 'project-view',
        component: ProjectViewComponent,
        pathMatch: 'full'
      },
      {
        path: 'associated-projects',
        component: AssociatedProjectsComponent,
        pathMatch: 'full'
      },
      {
        path: 'budget',
        component: BudgetComponent,
        pathMatch: 'full'
      },
      {
        path: 'project-documents',
        component: ProjectDocumentsComponent,
        pathMatch: 'full'
      },
      {
        path: 'general-info',
        component: GeneralInfoComponent,
        pathMatch: 'full'
      },
      {
        path: 'tops',
        component: TopsComponent,
        pathMatch: 'full'
      },
      {
        path: 'caps',
        component: CapsComponent,
        pathMatch: 'full'
      },
      {
        path: 'reports',
        component: ReportsComponent,
        pathMatch: 'full'
      },
      {
        path: 'local-attributes',
        component: LocalAttributesComponent,
        pathMatch: 'full'
      },
      {
        path: 'hub-settings',
        component: HubSettingsComponent,
        pathMatch: 'full'
      }
      
      ]
  },
  
];
@NgModule({
  declarations: [
    ProjectHubComponent,
    ProjectTeamComponent,
    ProjectViewComponent,
    AssociatedProjectsComponent,
    BudgetComponent,
    ProjectDocumentsComponent,
    GeneralInfoComponent,
    TopsComponent,
    CapsComponent,
    ReportsComponent,
    LocalAttributesComponent,
    HubSettingsComponent,
    AskNeedViewEditComponent
  ],
  imports     : [
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
      FuseDrawerModule,
      FuseNavigationModule,
      NgScrollbarModule,
      NgxDatatableModule
  ]
})
export class ProjectHubModule { }
