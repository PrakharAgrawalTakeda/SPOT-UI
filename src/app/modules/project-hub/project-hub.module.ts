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
import { ProjectViewComponent } from './project-board/project-view.component';
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
import { MatChipsModule } from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AskNeedViewEditComponent } from './project-board/ask-need-view-edit/ask-need-view-edit.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { UserSingleDropdownComponent } from './common/user-single-dropdown/user-single-dropdown.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverallStatusEditComponent } from './project-board/overall-status-edit/overall-status-edit.component';
import { ProjectSingleDropdownComponent } from './common/project-single-dropdown/project-single-dropdown.component';
import { FuseAlertModule } from '@fuse/components/alert';
import { CloseOutComponent } from './close-out/close-out.component';
import { ProjectCharterComponent } from './project-charter/project-charter.component';
import { BusinessCaseComponent } from './business-case/business-case.component';
import { ProjectProposalComponent } from './project-proposal/project-proposal.component';
import { RiskIssuesTableComponent } from './common/risk-issues-table/risk-issues-table.component';
import { RiskIssueViewEditComponent } from './project-board/risk-issue-view-edit/risk-issue-view-edit.component';
import { ProductSingleDropdownComponent } from './common/product-single-dropdown/product-single-dropdown.component';
import { SpotFormsModule } from 'app/core/spot-forms/spot-forms.module';

export const projectRoutes: Route[] = [
  {
      path     : '',
      component: ProjectHubComponent,
      children:[{
        path: '',
        pathMatch: 'full',
        redirectTo: 'project-board'
      },
      {
        path: 'project-team',
        component: ProjectTeamComponent,
        pathMatch: 'full'
      },
      {
        path: 'project-board',
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
      },
      {
        path: 'project-proposal',
        component: ProjectProposalComponent,
        pathMatch: 'full'
      },
      {
        path: 'business-case',
        component: BusinessCaseComponent,
        pathMatch: 'full'
      },
      {
        path: 'project-charter',
        component: ProjectCharterComponent,
        pathMatch: 'full'
      },
      {
        path: 'close-out',
        component: CloseOutComponent,
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
    AskNeedViewEditComponent,
    UserSingleDropdownComponent,
    OverallStatusEditComponent,
    ProjectSingleDropdownComponent,
    CloseOutComponent,
    ProjectCharterComponent,
    BusinessCaseComponent,
    ProjectProposalComponent,
    RiskIssuesTableComponent,
    RiskIssueViewEditComponent,
    ProductSingleDropdownComponent
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
export class ProjectHubModule { }
