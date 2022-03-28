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
      }
      
      ]
  },
  
];
@NgModule({
  declarations: [
    ProjectHubComponent,
    ProjectTeamComponent,
    ProjectViewComponent
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
      NgScrollbarModule
  ]
})
export class ProjectHubModule { }
