import { NgModule, Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
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
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProjectHubModule } from '../project-hub/project-hub.module';
import { ProjectHubService } from './../project-hub/project-hub.service';
import { GeneralInfoSingleEditComponent } from './../project-hub/general-info/general-info-single-edit/general-info-single-edit.component';
import { GeneralInfoComponent } from './../project-hub/general-info/general-info.component';
import { CopyProjectComponent } from './copy-project/copy-project.component';


export const projectRoutes: Route[] = [
    {
      path: '',
      component: CreateProjectComponent,
      children: [{
        path: '',
        pathMatch: 'full'
      },
      {
        path: 'create-new-project',
        pathMatch: 'full',
        component:  CreateProjectComponent ,
      },
      {
        path: 'copy-project',
        pathMatch: 'full',
        component:  CopyProjectComponent ,
      },
      // GeneralInfoSingleEditComponent

    ],

    }
  ];

@NgModule({
    declarations: [
        CreateProjectComponent,
        CopyProjectComponent,

      ],
  imports: [
    CommonModule,
    RouterModule.forChild(projectRoutes),
    MatButtonModule,
    // BrowserAnimationsModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    MatStepperModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    NgApexchartsModule,
    TranslocoModule,
    SharedModule,
    CommonModule,
    FuseDrawerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ProjectHubModule
  ]
})
export class CreateNewModule { }
