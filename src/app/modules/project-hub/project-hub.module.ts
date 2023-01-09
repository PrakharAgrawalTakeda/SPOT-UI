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
import { MatExpansionModule } from '@angular/material/expansion';
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
import { MatSelectModule } from '@angular/material/select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AskNeedViewEditComponent } from './project-board/ask-need-view-edit/ask-need-view-edit.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSnackBarModule} from '@angular/material/snack-bar';
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
import { RiskIssueViewEditComponent } from './project-board/risk-issue/risk-issue-view-edit/risk-issue-view-edit.component';
import { ScheduleTableComponent } from './common/schedule-table/schedule-table.component';
import { ScheduleViewEditComponent } from './project-board/schedule-view-edit/schedule-view-edit.component';
import { SpotFormsModule } from 'app/core/spot-forms/spot-forms.module';
import { ProductSingleDropdownComponent } from './common/product-single-dropdown/product-single-dropdown.component';
import { ScheduleViewBulkEditComponent } from './project-board/schedule-view-bulk-edit/schedule-view-bulk-edit.component';
import { ProjectTeamAddSingleComponent } from './project-team/project-team-add-single/project-team-add-single.component';
import { OperationalPerformanceTableComponent } from './common/operational-performance-table/operational-performance-table.component';
import { DataQualityPageComponent } from './common/data-quality-page/data-quality-page.component';
import { OperationalPerformanceEditComponent } from './common/operational-performance-table/operational-performance-edit/operational-performance-edit.component';
import { ProjectBenefitsComponent } from './project-benefits/project-benefits.component';
import { ProjectTeamBulkEditComponent } from './project-team/project-team-bulk-edit/project-team-bulk-edit.component';
import { OperationalPerformanceBulkEditComponent } from './common/operational-performance-table/operational-performance-bulk-edit/operational-performance-bulk-edit.component';
import { PrimaryKpiSingleEditComponent } from './project-benefits/primary-kpi-single-edit/primary-kpi-single-edit.component';
import { GeneralInfoSingleEditComponent } from './general-info/general-info-single-edit/general-info-single-edit.component';
import { OeProjectSingleEditComponent } from './general-info/oe-project-single-edit/oe-project-single-edit.component';
import { TechTransferSingleEditComponent } from './general-info/tech-transfer-single-edit/tech-transfer-single-edit.component';
import { QualityRefBulkEditComponent } from './general-info/quality-ref-bulk-edit/quality-ref-bulk-edit.component';
import { AskNeedComponent } from './project-board/ask-need/ask-need.component';
import { AskNeedTableComponent } from './project-board/ask-need/ask-need-table/ask-need-table.component';
import { AskNeedBulkEditComponent } from './project-board/ask-need/ask-need-bulk-edit/ask-need-bulk-edit.component';
import { AskNeedSingleEditComponent } from './project-board/ask-need/ask-need-single-edit/ask-need-single-edit.component';
import { AskNeedLinkComponent } from './project-board/ask-need/ask-need-link/ask-need-link.component';
import { LinkProjectComponent } from './common/link-project/link-project.component';
import { UpdateParentComponent } from './common/update-parent/update-parent.component';
import {SearchModule} from "../../layout/common/search/search.module";
import {LanguagesModule} from "../../layout/common/languages/languages.module";
import {FuseFullscreenModule} from "../../../@fuse/components/fullscreen";
import {ShortcutsModule} from "../../layout/common/shortcuts/shortcuts.module";
import {MessagesModule} from "../../layout/common/messages/messages.module";
import {NotificationsModule} from "../../layout/common/notifications/notifications.module";
import {UserModule} from "../../layout/common/user/user.module";
//Delete Later
import { LinkMilestonesComponent } from './project-board/link-milestones/link-milestones.component';
// End Delete Later
import { ScheduleComponent } from './project-board/schedule/schedule.component';
import { ScheduleLinkComponent } from './project-board/schedule/schedule-link/schedule-link.component';
import { ScheduleSingleEditComponent } from './project-board/schedule/schedule-single-edit/schedule-single-edit.component';
import { ScheduleBulkEditComponent } from './project-board/schedule/schedule-bulk-edit/schedule-bulk-edit.component';
import { PhaseStateComponent} from "./common/phase-state/phase-state.component";
import { StateCheckComponent } from './common/state-check/state-check.component';
import { RisIssueViewBulkEditComponent } from './project-board/risk-issue/risk-issue-view-bulk-edit/risk-issue-view-bulk-edit.component';
import { SchedulesTableComponent } from './project-board/schedule/schedule-table/schedule-table.component';
import { RiskIssuesLinkComponent } from './project-board/risk-issue/risk-issues-link/risk-issues-link.component';
import { RiskIssueTableComponent } from './project-board/risk-issue/risk-issue-table/risk-issue-table.component';
import { StrategicDriversComponent } from './general-info/strategic-drivers/strategic-drivers.component';
import { PlanningTeamComponent } from './project-proposal/planning-team/planning-team.component';
import { PlanningTeamBulkEditComponent } from './project-proposal/planning-team/planning-team-bulk-edit/planning-team-bulk-edit.component';
import { PlanningTeamAddSingleComponent } from './project-proposal/planning-team/planning-team-add-single/planning-team-add-single.component';

export const projectRoutes: Route[] = [
  {
    path: '',
    component: ProjectHubComponent,
    children: [{
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
      path: 'project-benefits',
      component: ProjectBenefitsComponent,
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
    },
    {
      path: 'planning-team',
      component: PlanningTeamComponent,
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
    ScheduleTableComponent,
    ScheduleViewEditComponent,
    ProductSingleDropdownComponent,
    ScheduleViewBulkEditComponent,
    ProjectTeamAddSingleComponent,
    OperationalPerformanceTableComponent,
    OperationalPerformanceEditComponent,
    DataQualityPageComponent,
    ProjectBenefitsComponent,
    ProjectTeamBulkEditComponent,
    OperationalPerformanceBulkEditComponent,
    PrimaryKpiSingleEditComponent,
    GeneralInfoSingleEditComponent,
    OeProjectSingleEditComponent,
    TechTransferSingleEditComponent,
    QualityRefBulkEditComponent,
    AskNeedComponent,
    AskNeedTableComponent,
    AskNeedBulkEditComponent,
    AskNeedSingleEditComponent,
    AskNeedLinkComponent,
    QualityRefBulkEditComponent,
    LinkProjectComponent,
    UpdateParentComponent,
    LinkMilestonesComponent,
    ScheduleComponent,
    ScheduleLinkComponent,
    ScheduleSingleEditComponent,
    ScheduleBulkEditComponent,
    LinkMilestonesComponent,
    UpdateParentComponent,
    PhaseStateComponent,
    StateCheckComponent,
    RisIssueViewBulkEditComponent,
    SchedulesTableComponent,
    RiskIssuesLinkComponent,
    RiskIssueTableComponent,
    StrategicDriversComponent,
    PlanningTeamComponent,
    PlanningTeamBulkEditComponent,
    PlanningTeamAddSingleComponent,
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
        MatSnackBarModule,
        FuseAlertModule,
        SpotFormsModule,
        SearchModule,
        LanguagesModule,
        FuseFullscreenModule,
        ShortcutsModule,
        MessagesModule,
        NotificationsModule,
        UserModule
    ]
})
export class ProjectHubModule { }
