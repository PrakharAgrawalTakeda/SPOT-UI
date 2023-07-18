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
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { SearchModule } from "../../layout/common/search/search.module";
import { LanguagesModule } from "../../layout/common/languages/languages.module";
import { FuseFullscreenModule } from "../../../@fuse/components/fullscreen";
import { ShortcutsModule } from "../../layout/common/shortcuts/shortcuts.module";
import { MessagesModule } from "../../layout/common/messages/messages.module";
import { NotificationsModule } from "../../layout/common/notifications/notifications.module";
import { UserModule } from "../../layout/common/user/user.module";
//Delete Later
import { LinkMilestonesComponent } from './project-board/link-milestones/link-milestones.component';
// End Delete Later
import { ScheduleComponent } from './project-board/schedule/schedule.component';
import { ScheduleLinkComponent } from './project-board/schedule/schedule-link/schedule-link.component';
import { ScheduleSingleEditComponent } from './project-board/schedule/schedule-single-edit/schedule-single-edit.component';
import { ScheduleBulkEditComponent } from './project-board/schedule/schedule-bulk-edit/schedule-bulk-edit.component';
import { PhaseStateComponent } from "./common/phase-state/phase-state.component";
import { StateCheckComponent } from './common/state-check/state-check.component';
import { RisIssueViewBulkEditComponent } from './project-board/risk-issue/risk-issue-view-bulk-edit/risk-issue-view-bulk-edit.component';
import { SchedulesTableComponent } from './project-board/schedule/schedule-table/schedule-table.component';
import { RiskIssuesLinkComponent } from './project-board/risk-issue/risk-issues-link/risk-issues-link.component';
import { RiskIssueTableComponent } from './project-board/risk-issue/risk-issue-table/risk-issue-table.component';
import { StrategicDriversComponent } from './general-info/strategic-drivers/strategic-drivers.component';
import { ProjectProposalGeneralInfoComponent } from './project-proposal/project-proposal-general-info/project-proposal-general-info.component';
import { ProjectProposalBenefitsComponent } from './project-proposal/project-proposal-benefits/project-proposal-benefits.component';
import { ProjectProposalPlanningTeamComponent } from './project-proposal/project-proposal-planning-team/project-proposal-planning-team.component';
import { CloseOutOutcomesComponent } from './close-out/close-out-outcomes/close-out-outcomes.component';
import { CloseOutMilestoneVarianceComponent } from './close-out/close-out-milestone-variance/close-out-milestone-variance.component';
import { CloseOutBudgetPerformanceComponent } from './close-out/close-out-budget-performance/close-out-budget-performance.component';
import { CloseOutLessonsLearnedComponent } from './close-out/close-out-lessons-learned/close-out-lessons-learned.component';
import { CloseOutScheduleBaselineComponent } from './close-out/close-out-schedule-baseline/close-out-schedule-baseline.component';
import { ProjectCharterGeneralInfoComponent } from './project-charter/project-charter-general-info/project-charter-general-info.component';
import { ProjectCharterScopeComponent } from './project-charter/project-charter-scope/project-charter-scope.component';
import { ProjectCharterMilestonesComponent } from './project-charter/project-charter-milestones/project-charter-milestones.component';
import { ProjectCharterRiskIssuesComponent } from './project-charter/project-charter-risk-issues/project-charter-risk-issues.component';
import { ProjectCharterCostFundingComponent } from './project-charter/project-charter-cost-funding/project-charter-cost-funding.component';
import { ProjectCharterCapsComponent } from './project-charter/project-charter-caps/project-charter-caps.component';
import { CloseOutGeneralInfoComponent } from "./close-out/close-out-general-info/close-out-general-info.component";
import { KeyAssumptionsTableComponent } from './common/key-assumptions-table/key-assumptions-table.component';
import { KeyAssumptionsAddSingleComponent } from './common/key-assumptions-table/key-assumptions-add-single/key-assumptions-add-single.component';
import { KeyAssumptionsBulkEditComponent } from './common/key-assumptions-table/key-assumptions-bulk-edit/key-assumptions-bulk-edit.component';
import { StandardMilestoneSetsComponent } from './project-board/schedule/standard-milestone-sets/standard-milestone-sets.component';
import { BusinessCaseGeneralInfoComponent } from './business-case/business-case-general-info/business-case-general-info.component';
import { BusinessCaseOptionInfoComponent } from './business-case/business-case-option-info/business-case-option-info.component';
import { BusinessCaseTimelineComponent } from './business-case/business-case-timeline/business-case-timeline.component';
import { BusinessCaseCostFundingComponent } from './business-case/business-case-cost-funding/business-case-cost-funding.component';
import { BusinessCaseBenefitsComponent } from './business-case/business-case-benefits/business-case-benefits.component';
import { BusinessCaseCapsComponent } from './business-case/business-case-caps/business-case-caps.component';
import { BusinessCaseRiskIssuesComponent } from './business-case/business-case-risk-issues/business-case-risk-issues.component';
import { OptionInfoComponent } from './common/option-info/option-info.component';
import { OptionInfoEditComponent } from './common/option-info/option-info-edit/option-info-edit.component';
import { FeasibilityEditComponent } from './common/option-info/feasibility-edit/feasibility-edit.component';
import { CloseOutOutcomesSingleEditComponent } from './close-out/close-out-outcomes/close-out-outcomes-single-edit/close-out-outcomes-single-edit.component';
import { ProjectCharterProjectTeamsComponent } from './project-charter/project-charter-project-teams/project-charter-project-teams.component';
import { LessonLearnedTableComponent } from './common/lesson-learned-table/lesson-learned-table.component';
import { LessonLearnedBulkEditComponent } from './common/lesson-learned-table/lesson-learned-bulk-edit/lesson-learned-bulk-edit.component';
import { LessonLearnedSingleEditComponent } from './common/lesson-learned-table/lesson-learned-single-edit/lesson-learned-single-edit.component';
import { KeyTakeawaySingleEditComponent } from './close-out/close-out-lessons-learned/key-takeaway-single-edit/key-takeaway-single-edit.component';
import { ProjectCharterScopeSingleEditComponent } from './project-charter/project-charter-scope/project-charter-scope-single-edit/project-charter-scope-single-edit.component';
import { CostComponent } from './common/cost/cost.component';
import { FundingComponent } from './common/funding/funding.component';
import { FundingEditComponent } from './common/funding/funding-edit/funding-edit.component';
import { FundingBulkEditComponent } from './common/funding/funding-bulk-edit/funding-bulk-edit.component';
import { LocalAttributeSingleEditComponent } from './local-attributes/local-attribute-single-edit/local-attribute-single-edit.component';
import { CostEditComponent } from './common/cost/cost-edit/cost-edit.component';
import { CarbonTableComponent } from './common/carbon-table/carbon-table.component';
import { CarbonBulkEditComponent } from './common/carbon-table/carbon-bulk-edit/carbon-bulk-edit.component';
import { CapsSingleEditComponent } from './caps/caps-single-edit/caps-single-edit.component';
import { WaterWasteTableComponent } from './common/water-waste-table/water-waste-table.component';
import { BiogenicsTableComponent } from './common/biogenics-table/biogenics-table.component';
import { TransportationTableComponent } from './common/transportation-table/transportation-table.component';
import { ShippingTableComponent } from './common/shipping-table/shipping-table.component';
import { WarehousingTableComponent } from './common/warehousing-table/warehousing-table.component';
import { ProjectRequirementsComponent } from './common/project-requirements/project-requirements.component';
import { ProjectRequirementsEditComponent } from './common/project-requirements/project-requirements-edit/project-requirements-edit.component';
import { BenefitsPageComponent } from './common/benefits-page/benefits-page.component';
import { OperationalBenefitsTableComponent } from './common/operational-benefits-table/operational-benefits-table.component';
import { BenefitsPageEditComponent } from './common/benefits-page/benefits-page-edit/benefits-page-edit.component';
import { BiogenicsBulkEditComponent } from './common/biogenics-table/biogenics-bulk-edit/biogenics-bulk-edit.component';
import { BiogenicsSingleEditComponent } from './common/biogenics-table/biogenics-single-edit/biogenics-single-edit.component';
import { OperationalBenefitsAddNewComponent } from './common/operational-benefits-table/operational-benefits-add-new/operational-benefits-add-new.component';
import { OperationalBenefitsBulkEditComponent } from './common/operational-benefits-table/operational-benefits-bulk-edit/operational-benefits-bulk-edit.component';
import { BudgetPerformanceEditComponent } from './close-out/close-out-budget-performance/budget-performance-edit/budget-performance-edit.component';
import { WaterWasteBulkEditComponent } from './common/water-waste-table/water-waste-bulk-edit/water-waste-bulk-edit.component';
import { WaterWasteSingleEditComponent } from './common/water-waste-table/water-waste-single-edit/water-waste-single-edit.component';
import {MyPreferenceModule} from "../my-preference/my-preference.module";
import { TransportationSingleEditComponent } from './common/transportation-table/transportation-single-edit/transportation-single-edit.component';
import { WarehousingSingleEditComponent } from './common/warehousing-table/warehousing-single-edit/warehousing-single-edit.component';
import { ShippingSingleEditComponent } from './common/shipping-table/shipping-single-edit/shipping-single-edit.component';
import { TransportationBulkEditComponent } from './common/transportation-table/transportation-bulk-edit/transportation-bulk-edit.component';
import { ShippingBulkEditComponent } from './common/shipping-table/shipping-bulk-edit/shipping-bulk-edit.component';
import { WarehousingBulkEditComponent } from './common/warehousing-table/warehousing-bulk-edit/warehousing-bulk-edit.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectDashboardPerformanceComponent } from './project-dashboard/project-dashboard-performance/project-dashboard-performance.component';
import { ProjectDashboardBudgetComponent } from './project-dashboard/project-dashboard-budget/project-dashboard-budget.component';
import { ProjectDashboardProductTeamComponent } from './project-dashboard/project-dashboard-product-team/project-dashboard-product-team.component';
import {BudgetGeneralEditComponent} from "./budget/budget-general-edit/budget-general-edit.component";
import { BudgetFundingInformationTableComponent } from './budget/budget-funding-information-table/budget-funding-information-table.component';
import { BudgetFundingInformationBulkEditComponent } from './budget/budget-funding-information-bulk-edit/budget-funding-information-bulk-edit.component';
import { BudgetAdditionalEditComponent } from './budget/budget-additional-edit/budget-additional-edit.component';
import { BudgetCapexOpexTableComponent } from './budget/budget-capex-opex-table/budget-capex-opex-table.component';
import { BudgetFundingAddViewComponent } from './budget/budget-funding-add-view/budget-funding-add-view.component';
import { BudgetFxrateComponent } from './budget/budget-fxrate/budget-fxrate.component';

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
      path: 'close-out-general-info',
      component: CloseOutGeneralInfoComponent,
      pathMatch: 'full'
    },
    {
      path: 'project-benefits',
      component: ProjectBenefitsComponent,
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
      path: 'project-dashboards',
      component: ProjectDashboardComponent,
      pathMatch: 'full'
    },
    {
      path: 'project-proposal',
      component: ProjectProposalComponent,
      children: [
        {
          path: 'general-info',
          component: ProjectProposalGeneralInfoComponent,
        },
        {
          path: 'benefits',
          component: ProjectProposalBenefitsComponent,
        },
        {
          path: 'planning-team',
          component: ProjectProposalPlanningTeamComponent,
        }
      ]
    },
    {
      path: 'project-charter',
      component: ProjectCharterComponent,
      children: [
        {
          path: 'general-info',
          component: ProjectCharterGeneralInfoComponent,
        },
        {
          path: 'scope',
          component: ProjectCharterScopeComponent,
        },
        {
          path: 'milestones',
          component: ProjectCharterMilestonesComponent,
        },
        {
          path: 'project-team',
          component: ProjectCharterProjectTeamsComponent,
        },
        {
          path: 'risks',
          component: ProjectCharterRiskIssuesComponent,
        },
        {
          path: 'budget',
          component: ProjectCharterCostFundingComponent,
        },
        {
          path: 'caps',
          component: ProjectCharterCapsComponent,
        }
      ]
    },
    {
      path: 'close-out',
      component: CloseOutComponent,
      children: [
        {
          path: 'general-info',
          component: CloseOutGeneralInfoComponent,
        },
        {
          path: 'outcomes',
          component: CloseOutOutcomesComponent,
        },
        {
          path: 'milestone-variance',
          component: CloseOutMilestoneVarianceComponent,
        },
        {
          path: 'scheule-baseline',
          component: CloseOutScheduleBaselineComponent,
        },
        {
          path: 'budget-performance',
          component: CloseOutBudgetPerformanceComponent,
        },
        {
          path: 'lessons-learned',
          component: CloseOutLessonsLearnedComponent,
        }
      ]
    },
    {
      path: 'business-case',
      component: BusinessCaseComponent,
      children: [
        {
          path: 'general-info',
          component: BusinessCaseGeneralInfoComponent,
        },
        {
          path: 'recommended-option',
          children: [
            {
              path: 'option-info',
              component: BusinessCaseOptionInfoComponent,
            },
            {
              path: 'timeline',
              component: BusinessCaseTimelineComponent,
            },
            {
              path: 'cost-funding',
              component: BusinessCaseCostFundingComponent,
            },
            {
              path: 'benefits',
              component: BusinessCaseBenefitsComponent,
            },
            {
              path: 'caps',
              component: BusinessCaseCapsComponent,
            },
            {
              path: 'risks',
              component: BusinessCaseRiskIssuesComponent,
            }
          ]
        },
        {
          path: 'option-2',
          children: [
            {
              path: 'option-info',
              component: BusinessCaseOptionInfoComponent,
            },
            {
              path: 'timeline',
              component: BusinessCaseTimelineComponent,
            },
            {
              path: 'cost-funding',
              component: BusinessCaseCostFundingComponent,
            },
            {
              path: 'benefits',
              component: BusinessCaseBenefitsComponent,
            },
            {
              path: 'risks',
              component: BusinessCaseRiskIssuesComponent,
            }
          ]
        },
        {
          path: 'option-3',
          children: [
            {
              path: 'option-info',
              component: BusinessCaseOptionInfoComponent,
            },
            {
              path: 'timeline',
              component: BusinessCaseTimelineComponent,
            },
            {
              path: 'cost-funding',
              component: BusinessCaseCostFundingComponent,
            },
            {
              path: 'benefits',
              component: BusinessCaseBenefitsComponent,
            },
            {
              path: 'risks',
              component: BusinessCaseRiskIssuesComponent,
            }
          ]
        }
      ]
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
    BudgetGeneralEditComponent,
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
    CloseOutGeneralInfoComponent,
    StrategicDriversComponent,
    ProjectProposalGeneralInfoComponent,
    ProjectProposalBenefitsComponent,
    ProjectProposalPlanningTeamComponent,
    CloseOutGeneralInfoComponent,
    CloseOutOutcomesComponent,
    CloseOutMilestoneVarianceComponent,
    CloseOutBudgetPerformanceComponent,
    CloseOutLessonsLearnedComponent,
    CloseOutScheduleBaselineComponent,
    ProjectCharterGeneralInfoComponent,
    ProjectCharterScopeComponent,
    ProjectCharterMilestonesComponent,
    ProjectCharterProjectTeamsComponent,
    ProjectCharterRiskIssuesComponent,
    ProjectCharterCostFundingComponent,
    ProjectCharterCapsComponent,
    KeyAssumptionsTableComponent,
    KeyAssumptionsAddSingleComponent,
    KeyAssumptionsBulkEditComponent,
    BusinessCaseGeneralInfoComponent,
    BusinessCaseOptionInfoComponent,
    BusinessCaseTimelineComponent,
    BusinessCaseCostFundingComponent,
    BusinessCaseBenefitsComponent,
    BusinessCaseCapsComponent,
    BusinessCaseRiskIssuesComponent,
    OptionInfoComponent,
    OptionInfoEditComponent,
    FeasibilityEditComponent,
    CloseOutOutcomesSingleEditComponent,
    LessonLearnedTableComponent,
    LessonLearnedBulkEditComponent,
    LessonLearnedSingleEditComponent,
    KeyTakeawaySingleEditComponent,
    StandardMilestoneSetsComponent,
    ProjectCharterScopeSingleEditComponent,
    CostComponent,
    FundingComponent,
    FundingEditComponent,
    FundingBulkEditComponent,
    LocalAttributeSingleEditComponent,
    CostEditComponent,
    CarbonTableComponent,
    CarbonBulkEditComponent,
    CapsSingleEditComponent,
    WaterWasteTableComponent,
    BiogenicsTableComponent,
    TransportationTableComponent,
    ShippingTableComponent,
    WarehousingTableComponent,
    ProjectRequirementsComponent,
    ProjectRequirementsEditComponent,
    BenefitsPageComponent,
    OperationalBenefitsTableComponent,
    BenefitsPageEditComponent,
    BiogenicsBulkEditComponent,
    BiogenicsSingleEditComponent,
    OperationalBenefitsAddNewComponent,
    OperationalBenefitsBulkEditComponent,
    BudgetPerformanceEditComponent,
    WaterWasteBulkEditComponent,
    WaterWasteSingleEditComponent,
    TransportationSingleEditComponent,
    WarehousingSingleEditComponent,
    ShippingSingleEditComponent,
    TransportationBulkEditComponent,
    ShippingBulkEditComponent,
    WarehousingBulkEditComponent,
    ProjectDashboardComponent,
    ProjectDashboardPerformanceComponent,
    ProjectDashboardBudgetComponent,
    ProjectDashboardProductTeamComponent,
    BudgetFundingInformationTableComponent,
    BudgetFundingInformationBulkEditComponent,
    BudgetAdditionalEditComponent,
    BudgetCapexOpexTableComponent,
    BudgetFundingAddViewComponent,
    BudgetFxrateComponent
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
    ],
  exports: [
    GeneralInfoSingleEditComponent,
    QualityRefBulkEditComponent,
    OeProjectSingleEditComponent,
    TechTransferSingleEditComponent,
    StrategicDriversComponent,
    LocalAttributeSingleEditComponent
  ]
})
export class ProjectHubModule { }
