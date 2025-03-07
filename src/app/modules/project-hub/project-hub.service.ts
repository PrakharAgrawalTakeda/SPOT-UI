import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { RoleService } from 'app/core/auth/role.service';
import { RoleController } from 'app/shared/role-controller';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectHubService {
  drawerOpenedright: boolean = false;
  itemid: string = "new"
  itemtype: string = ""
  item: any = {}
  all: any = []
  lookUpMaster: any = []
  kpiMasters: any = []
  projectid: string = ""
  localCurrency: any = [];
  hasChildren: boolean = false
  projectState: string = "";
  submitbutton = new BehaviorSubject<boolean>(false)
  isNavChanged = new BehaviorSubject<boolean>(false)
  isFormChanged: boolean = false
  includeClosedItems = {
    askNeed: new BehaviorSubject<boolean>(false),
    riskIssue: new BehaviorSubject<boolean>(false),
    schedule: new BehaviorSubject<boolean>(false)
  }
  successSave = new BehaviorSubject<boolean>(false)
  isBulkEdit: boolean = false
  fuseDrawerSmall: boolean = false
  roleControllerControl: RoleController = new RoleController;
  removedIds: any[];
  projectChildren: any[];
  projects: any[];
  currentSpotId: string;
  projectName: string;
  isStrategicIniative: boolean = false;


  alert: FuseConfirmationConfig = {
    "title": "Are you sure you want to exit?",
    "message": "All unsaved data will be lost.",
    "icon": {
      "show": true,
      "name": "heroicons_outline:exclamation",
      "color": "warn"
    },
    "actions": {
      "confirm": {
        "show": true,
        "label": "Ok",
        "color": "warn"
      },
      "cancel": {
        "show": true,
        "label": "Cancel"
      }
    },
    "dismissible": true
  }
  menuData: FuseNavigationItem[] = [
    {
      id: 'project-info',
      title: 'Project Hub Menu',
      type: 'group',
      children: [
        {
          title: 'Project Board',
          type: 'basic',
          icon: 'heroicons_outline:clipboard-list',
          link: 'project-board'
        },
        {
          title: 'Associated Projects',
          type: 'basic',
          icon: 'heroicons_outline:link',
          link: 'associated-projects'
        },
        {
          title: 'General Info',
          type: 'basic',
          icon: 'heroicons_outline:pencil-alt',
          link: 'general-info'
        },
        {
          title: 'Value Creation',
          type: 'basic',
          icon: 'feather:target',
          link: 'value-creation'
        },
        {
          title: 'Budget',
          type: 'basic',
          icon: 'heroicons_outline:currency-dollar',
          link: 'budget'
        },
        {
          title: 'Project Team',
          type: 'basic',
          icon: 'heroicons_outline:user-group',
          link: 'project-team'
        },
        {
          title: 'Environmental Impact (CAPS)',
          type: 'basic',
          icon: 'heroicons_outline:globe',
          link: 'caps'
        },
        {
          title: 'Documents',
          type: 'basic',
          icon: 'heroicons_outline:document-text',
          link: 'project-documents'
        },
        {
          type: 'spacer'
        },
        {
          type: 'spacer'
        },
        {
          type: 'spacer'
        },
        {
          title: 'Local Attributes',
          type: 'basic',
          icon: 'mat_outline:edit_attributes',
          link: 'local-attributes'
        },
        {
          title: 'Hub Settings',
          type: 'basic',
          icon: 'heroicons_outline:adjustments',
          link: 'hub-settings'
        },
        {
          type: 'spacer'
        },
      ]
    },
    {
      title: 'Wizards',
      type: 'group',
      children: [
        {
          id: 'project-proposal',
          title: 'Project Proposal',
          type: 'collapsable',
          icon: 'heroicons_outline:light-bulb',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'project-proposal/general-info'
            },
            {
              title: 'Requirements',
              type: 'basic',
              link: 'project-proposal/benefits'
            },
            {
              title: 'Planning Team',
              type: 'basic',
              link: 'project-proposal/planning-team'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'project-proposal/value-creation'
            },
          ]
        },
        {
          title: 'Business Case',
          type: 'collapsable',
          icon: 'heroicons_outline:briefcase',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'business-case/general-info'
            },
            {
              id: 'recommended-option',
              title: 'Recommended Option',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/recommended-option/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/recommended-option/timeline'
                },
                {
                  title: 'Value Creation',
                  type: 'basic',
                  link: 'business-case/recommended-option/value-creation'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/recommended-option/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/recommended-option/benefits'
                },
                {
                  title: 'Environmental Impact (CAPS)',
                  type: 'basic',
                  link: 'business-case/recommended-option/caps'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/recommended-option/risks'
                }
              ]
            },
            {
              id: 'option-2',
              title: 'Option 2',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/option-2/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/option-2/timeline'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/option-2/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/option-2/benefits'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/option-2/risks'
                },
              ]
            },
            {
              id: 'option-3',
              title: 'Option 3',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/option-3/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/option-3/timeline'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/option-3/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/option-3/benefits'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/option-3/risks'
                },
              ]
            }
          ]
        },
        {
          id: 'project-charter',
          title: 'Project Charter',
          type: 'collapsable',
          icon: 'heroicons_outline:clipboard-check',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'project-charter/general-info'
            },
            {
              title: 'Scope',
              type: 'basic',
              link: 'project-charter/scope'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'project-charter/value-creation'
            },
            {
              title: 'Milestones',
              type: 'basic',
              link: 'project-charter/milestones'
            },
            {
              title: 'Project Team',
              type: 'basic',
              link: 'project-charter/project-team'
            },
            {
              title: 'Risks / Assumptions',
              type: 'basic',
              link: 'project-charter/risks'
            },
            {
              title: 'Cost / Funding',
              type: 'basic',
              link: 'project-charter/budget'
            },
            {
              title: 'Environmental Impact (CAPS)',
              type: 'basic',
              link: 'project-charter/caps'
            },
          ]
        },
        // {
        //   id: 'project-dashboard',
        //   title: 'Project Dashboards',
        //   type: 'collapsable',
        //   icon: 'heroicons_outline:presentation-chart-line'
        //   ,
        //   children: [
        //     {
        //       title: 'Performance',
        //       type: 'basic',
        //       link: 'project-dashboard/performance'

        //     },
        //     {
        //       title: 'Budget',
        //       type: 'basic',
        //       link: 'project-dashboard/budget'
        //     },
        //     {
        //       title: 'GMSGQ Product Team',
        //       type: 'basic',
        //       link: 'project-dashboard/product-team'
        //     }
        //   ]
        // },
        {
          title: 'Project Dashboards',
          type: 'basic',
          icon: 'heroicons_outline:presentation-chart-line',
          link: 'project-dashboards'
        },
        {
          id: 'project-closeout',
          title: 'Project Close Out',
          type: 'collapsable',
          icon: 'heroicons_outline:flag',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'close-out/general-info'
            },
            {
              title: 'Outcomes',
              type: 'basic',
              link: 'close-out/outcomes'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'close-out/value-creation'
            },
            {
              title: 'Milestone Variance',
              type: 'basic',
              link: 'close-out/milestone-variance'
            },
            {
              title: 'Schedule Baseline',
              type: 'basic',
              link: 'close-out/scheule-baseline'
            },
            {
              title: 'Budget Performance',
              type: 'basic',
              link: 'close-out/budget-performance'
            },
            {
              title: 'Lessons Learned',
              type: 'basic',
              link: 'close-out/lessons-learned'
            },
          ]
        },
      ]
    },


    {
      type: 'divider'
    }
  ];
  menuDataBeta: FuseNavigationItem[] = [
    {
      id: 'project-info',
      title: 'Project Hub Menu',
      type: 'group',
      children: [
        {
          title: 'Project Board',
          type: 'basic',
          icon: 'heroicons_outline:clipboard-list',
          link: 'project-board'
        },
        {
          title: 'Associated Projects',
          type: 'basic',
          icon: 'heroicons_outline:link',
          link: 'associated-projects'
        },
        {
          title: 'General Info',
          type: 'basic',
          icon: 'heroicons_outline:pencil-alt',
          link: 'general-info'
        },
        {
          title: 'Value Creation',
          type: 'basic',
          icon: 'feather:target',
          link: 'value-creation'
        },
        {
          title: 'Budget',
          type: 'basic',
          icon: 'heroicons_outline:currency-dollar',
          link: 'budget'
        },
        {
          title: 'Project Team',
          type: 'basic',
          icon: 'heroicons_outline:user-group',
          link: 'project-team'
        },
        {
          title: 'Environmental Impact (CAPS)',
          type: 'basic',
          icon: 'heroicons_outline:globe',
          link: 'caps'
        },
        {
          title: 'Documents',
          type: 'basic',
          icon: 'heroicons_outline:document-text',
          link: 'project-documents'
        },
        {
          title: 'Detailed Project Schedule (BETA)',
          type: 'basic',
          icon: 'gantt-icon',
          link: 'detailed-schedule'
        },
        {
          type: 'spacer'
        },
        {
          type: 'spacer'
        },
        {
          type: 'spacer'
        },
        {
          title: 'Local Attributes',
          type: 'basic',
          icon: 'mat_outline:edit_attributes',
          link: 'local-attributes'
        },
        {
          title: 'Hub Settings',
          type: 'basic',
          icon: 'heroicons_outline:adjustments',
          link: 'hub-settings'
        },
        {
          type: 'spacer'
        },
      ]
    },
    {
      title: 'Wizards',
      type: 'group',
      children: [
        {
          id: 'project-proposal',
          title: 'Project Proposal',
          type: 'collapsable',
          icon: 'heroicons_outline:light-bulb',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'project-proposal/general-info'
            },
            {
              title: 'Requirements',
              type: 'basic',
              link: 'project-proposal/benefits'
            },
            {
              title: 'Planning Team',
              type: 'basic',
              link: 'project-proposal/planning-team'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'project-proposal/value-creation'
            },
          ]
        },
        {
          title: 'Business Case',
          type: 'collapsable',
          icon: 'heroicons_outline:briefcase',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'business-case/general-info'
            },
            {
              id: 'recommended-option',
              title: 'Recommended Option',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/recommended-option/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/recommended-option/timeline'
                },
                {
                  title: 'Value Creation',
                  type: 'basic',
                  link: 'business-case/recommended-option/value-creation'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/recommended-option/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/recommended-option/benefits'
                },
                {
                  title: 'Environmental Impact (CAPS)',
                  type: 'basic',
                  link: 'business-case/recommended-option/caps'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/recommended-option/risks'
                }
              ]
            },
            {
              id: 'option-2',
              title: 'Option 2',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/option-2/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/option-2/timeline'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/option-2/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/option-2/benefits'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/option-2/risks'
                },
              ]
            },
            {
              id: 'option-3',
              title: 'Option 3',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/option-3/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/option-3/timeline'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/option-3/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/option-3/benefits'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/option-3/risks'
                },
              ]
            }
          ]
        },
        {
          id: 'project-charter',
          title: 'Project Charter',
          type: 'collapsable',
          icon: 'heroicons_outline:clipboard-check',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'project-charter/general-info'
            },
            {
              title: 'Scope',
              type: 'basic',
              link: 'project-charter/scope'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'project-charter/value-creation'
            },
            {
              title: 'Milestones',
              type: 'basic',
              link: 'project-charter/milestones'
            },
            {
              title: 'Project Team',
              type: 'basic',
              link: 'project-charter/project-team'
            },
            {
              title: 'Risks / Assumptions',
              type: 'basic',
              link: 'project-charter/risks'
            },
            {
              title: 'Cost / Funding',
              type: 'basic',
              link: 'project-charter/budget'
            },
            {
              title: 'Environmental Impact (CAPS)',
              type: 'basic',
              link: 'project-charter/caps'
            },
          ]
        },
        // {
        //   id: 'project-dashboard',
        //   title: 'Project Dashboards',
        //   type: 'collapsable',
        //   icon: 'heroicons_outline:presentation-chart-line'
        //   ,
        //   children: [
        //     {
        //       title: 'Performance',
        //       type: 'basic',
        //       link: 'project-dashboard/performance'

        //     },
        //     {
        //       title: 'Budget',
        //       type: 'basic',
        //       link: 'project-dashboard/budget'
        //     },
        //     {
        //       title: 'GMSGQ Product Team',
        //       type: 'basic',
        //       link: 'project-dashboard/product-team'
        //     }
        //   ]
        // },
        {
          title: 'Project Dashboards',
          type: 'basic',
          icon: 'heroicons_outline:presentation-chart-line',
          link: 'project-dashboards'
        },
        {
          id: 'project-closeout',
          title: 'Project Close Out',
          type: 'collapsable',
          icon: 'heroicons_outline:flag',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'close-out/general-info'
            },
            {
              title: 'Outcomes',
              type: 'basic',
              link: 'close-out/outcomes'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'close-out/value-creation'
            },
            {
              title: 'Milestone Variance',
              type: 'basic',
              link: 'close-out/milestone-variance'
            },
            {
              title: 'Schedule Baseline',
              type: 'basic',
              link: 'close-out/scheule-baseline'
            },
            {
              title: 'Budget Performance',
              type: 'basic',
              link: 'close-out/budget-performance'
            },
            {
              title: 'Lessons Learned',
              type: 'basic',
              link: 'close-out/lessons-learned'
            },
          ]
        },
      ]
    },


    {
      type: 'divider'
    }
  ];
  menuDataStrat: FuseNavigationItem[] = [
    {
      id: 'project-info',
      title: 'Project Hub Menu',
      type: 'group',
      children: [
        {
          title: 'Strategic Initiative Board',
          type: 'basic',
          icon: 'heroicons_outline:clipboard-list',
          link: 'project-board'
        },
        {
          title: 'Associated Projects',
          type: 'basic',
          icon: 'heroicons_outline:link',
          link: 'associated-projects'
        },
        {
          title: 'General Info',
          type: 'basic',
          icon: 'heroicons_outline:pencil-alt',
          link: 'general-info'
        },
        {
          title: 'Value Creation',
          type: 'basic',
          icon: 'feather:target',
          link: 'value-creation'
        },
        {
          title: 'Budget Performance',
          type: 'basic',
          icon: 'heroicons_outline:currency-dollar',
          link: 'budget-performance'
        },
        {
          title: 'Initiative Team',
          type: 'basic',
          icon: 'heroicons_outline:user-group',
          link: 'project-team'
        },
        {
          title: 'Initiative Documents',
          type: 'basic',
          icon: 'heroicons_outline:document-text',
          link: 'project-documents'
        },
        {
          type: 'spacer'
        },
        {
          type: 'spacer'
        },
        {
          type: 'spacer'
        },
        {
          title: 'Local Attributes',
          type: 'basic',
          icon: 'mat_outline:edit_attributes',
          link: 'local-attributes'
        },
        {
          title: 'Hub Settings',
          type: 'basic',
          icon: 'heroicons_outline:adjustments',
          link: 'hub-settings'
        },
        {
          type: 'spacer'
        },
      ]
    },
    {
      title: 'Wizards',
      type: 'group',
      children: [
        {
          id: 'project-proposal',
          title: 'Project Proposal',
          type: 'collapsable',
          icon: 'heroicons_outline:light-bulb',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'project-proposal/general-info'
            },
            {
              title: 'Requirements',
              type: 'basic',
              link: 'project-proposal/benefits'
            },
            {
              title: 'Initiative Team',
              type: 'basic',
              link: 'project-proposal/planning-team'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'project-proposal/value-creation'
            },
          ]
        },
        {
          title: 'Business Case',
          type: 'collapsable',
          icon: 'heroicons_outline:briefcase',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'business-case/general-info'
            },
            {
              id: 'recommended-option',
              title: 'Recommended Option',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/recommended-option/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/recommended-option/timeline'
                },
                {
                  title: 'Value Creation',
                  type: 'basic',
                  link: 'business-case/recommended-option/value-creation'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/recommended-option/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/recommended-option/benefits'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/recommended-option/risks'
                }
              ]
            },
            {
              id: 'option-2',
              title: 'Option 2',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/option-2/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/option-2/timeline'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/option-2/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/option-2/benefits'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/option-2/risks'
                },
              ]
            },
            {
              id: 'option-3',
              title: 'Option 3',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/option-3/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/option-3/timeline'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/option-3/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/option-3/benefits'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/option-3/risks'
                },
              ]
            }
          ]
        },
        {
          id: 'project-charter',
          title: 'Project Charter',
          type: 'collapsable',
          icon: 'heroicons_outline:clipboard-check',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'project-charter/general-info'
            },
            {
              title: 'Scope',
              type: 'basic',
              link: 'project-charter/scope'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'project-charter/value-creation'
            },
            {
              title: 'Milestones',
              type: 'basic',
              link: 'project-charter/milestones'
            },
            {
              title: 'Initiative Team',
              type: 'basic',
              link: 'project-charter/project-team'
            },
            {
              title: 'Risks / Assumptions',
              type: 'basic',
              link: 'project-charter/risks'
            },
            {
              title: 'Cost / Funding',
              type: 'basic',
              link: 'project-charter/budget'
            },
          ]
        },
        // {
        //   id: 'project-dashboard',
        //   title: 'Project Dashboards',
        //   type: 'collapsable',
        //   icon: 'heroicons_outline:presentation-chart-line'
        //   ,
        //   children: [
        //     {
        //       title: 'Performance',
        //       type: 'basic',
        //       link: 'project-dashboard/performance'

        //     },
        //     {
        //       title: 'Budget',
        //       type: 'basic',
        //       link: 'project-dashboard/budget'
        //     },
        //     {
        //       title: 'GMSGQ Product Team',
        //       type: 'basic',
        //       link: 'project-dashboard/product-team'
        //     }
        //   ]
        // },
        {
          title: 'Project Dashboards',
          type: 'basic',
          icon: 'heroicons_outline:presentation-chart-line',
          link: 'project-dashboards'
        },
        {
          id: 'project-closeout',
          title: 'Project Close Out',
          type: 'collapsable',
          icon: 'heroicons_outline:flag',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'close-out/general-info'
            },
            {
              title: 'Outcomes',
              type: 'basic',
              link: 'close-out/outcomes'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'close-out/value-creation'
            },
            {
              title: 'Milestone Variance',
              type: 'basic',
              link: 'close-out/milestone-variance'
            },
            {
              title: 'Schedule Baseline',
              type: 'basic',
              link: 'close-out/scheule-baseline'
            },
            {
              title: 'Budget Performance',
              type: 'basic',
              link: 'close-out/budget-performance'
            },
            {
              title: 'Lessons Learned',
              type: 'basic',
              link: 'close-out/lessons-learned'
            },
          ]
        },
      ]
    },


    {
      type: 'divider'
    }
  ];
  menuDataStratBeta: FuseNavigationItem[] = [
    {
      id: 'project-info',
      title: 'Project Hub Menu',
      type: 'group',
      children: [
        {
          title: 'Strategic Initiative Board',
          type: 'basic',
          icon: 'heroicons_outline:clipboard-list',
          link: 'project-board'
        },
        {
          title: 'Associated Projects',
          type: 'basic',
          icon: 'heroicons_outline:link',
          link: 'associated-projects'
        },
        {
          title: 'General Info',
          type: 'basic',
          icon: 'heroicons_outline:pencil-alt',
          link: 'general-info'
        },
        {
          title: 'Value Creation',
          type: 'basic',
          icon: 'feather:target',
          link: 'value-creation'
        },
        {
          title: 'Budget Performance',
          type: 'basic',
          icon: 'heroicons_outline:currency-dollar',
          link: 'budget-performance'
        },
        {
          title: 'Initiative Team',
          type: 'basic',
          icon: 'heroicons_outline:user-group',
          link: 'project-team'
        },
        {
          title: 'Initiative Documents',
          type: 'basic',
          icon: 'heroicons_outline:document-text',
          link: 'project-documents'
        },
        {
          title: 'Detailed Project Schedule (BETA)',
          type: 'basic',
          icon: 'gantt-icon',
          link: 'detailed-schedule'
        },
        {
          type: 'spacer'
        },
        {
          type: 'spacer'
        },
        {
          type: 'spacer'
        },
        {
          title: 'Local Attributes',
          type: 'basic',
          icon: 'mat_outline:edit_attributes',
          link: 'local-attributes'
        },
        {
          title: 'Hub Settings',
          type: 'basic',
          icon: 'heroicons_outline:adjustments',
          link: 'hub-settings'
        },
        {
          type: 'spacer'
        },
      ]
    },
    {
      title: 'Wizards',
      type: 'group',
      children: [
        {
          id: 'project-proposal',
          title: 'Project Proposal',
          type: 'collapsable',
          icon: 'heroicons_outline:light-bulb',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'project-proposal/general-info'
            },
            {
              title: 'Requirements',
              type: 'basic',
              link: 'project-proposal/benefits'
            },
            {
              title: 'Initiative Team',
              type: 'basic',
              link: 'project-proposal/planning-team'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'project-proposal/value-creation'
            },
          ]
        },
        {
          title: 'Business Case',
          type: 'collapsable',
          icon: 'heroicons_outline:briefcase',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'business-case/general-info'
            },
            {
              id: 'recommended-option',
              title: 'Recommended Option',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/recommended-option/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/recommended-option/timeline'
                },
                {
                  title: 'Value Creation',
                  type: 'basic',
                  link: 'business-case/recommended-option/value-creation'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/recommended-option/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/recommended-option/benefits'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/recommended-option/risks'
                }
              ]
            },
            {
              id: 'option-2',
              title: 'Option 2',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/option-2/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/option-2/timeline'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/option-2/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/option-2/benefits'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/option-2/risks'
                },
              ]
            },
            {
              id: 'option-3',
              title: 'Option 3',
              type: 'collapsable',
              children: [
                {
                  title: 'Option Info',
                  type: 'basic',
                  link: 'business-case/option-3/option-info'
                },
                {
                  title: 'Timeline',
                  type: 'basic',
                  link: 'business-case/option-3/timeline'
                },
                {
                  title: 'Cost / Funding',
                  type: 'basic',
                  link: 'business-case/option-3/cost-funding'
                },
                {
                  title: 'Benefits',
                  type: 'basic',
                  link: 'business-case/option-3/benefits'
                },
                {
                  title: 'Risks / Assumptions',
                  type: 'basic',
                  link: 'business-case/option-3/risks'
                },
              ]
            }
          ]
        },
        {
          id: 'project-charter',
          title: 'Project Charter',
          type: 'collapsable',
          icon: 'heroicons_outline:clipboard-check',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'project-charter/general-info'
            },
            {
              title: 'Scope',
              type: 'basic',
              link: 'project-charter/scope'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'project-charter/value-creation'
            },
            {
              title: 'Milestones',
              type: 'basic',
              link: 'project-charter/milestones'
            },
            {
              title: 'Initiative Team',
              type: 'basic',
              link: 'project-charter/project-team'
            },
            {
              title: 'Risks / Assumptions',
              type: 'basic',
              link: 'project-charter/risks'
            },
            {
              title: 'Cost / Funding',
              type: 'basic',
              link: 'project-charter/budget'
            },
          ]
        },
        // {
        //   id: 'project-dashboard',
        //   title: 'Project Dashboards',
        //   type: 'collapsable',
        //   icon: 'heroicons_outline:presentation-chart-line'
        //   ,
        //   children: [
        //     {
        //       title: 'Performance',
        //       type: 'basic',
        //       link: 'project-dashboard/performance'

        //     },
        //     {
        //       title: 'Budget',
        //       type: 'basic',
        //       link: 'project-dashboard/budget'
        //     },
        //     {
        //       title: 'GMSGQ Product Team',
        //       type: 'basic',
        //       link: 'project-dashboard/product-team'
        //     }
        //   ]
        // },
        {
          title: 'Project Dashboards',
          type: 'basic',
          icon: 'heroicons_outline:presentation-chart-line',
          link: 'project-dashboards'
        },
        {
          id: 'project-closeout',
          title: 'Project Close Out',
          type: 'collapsable',
          icon: 'heroicons_outline:flag',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'close-out/general-info'
            },
            {
              title: 'Outcomes',
              type: 'basic',
              link: 'close-out/outcomes'
            },
            {
              title: 'Value Creation',
              type: 'basic',
              link: 'close-out/value-creation'
            },
            {
              title: 'Milestone Variance',
              type: 'basic',
              link: 'close-out/milestone-variance'
            },
            {
              title: 'Schedule Baseline',
              type: 'basic',
              link: 'close-out/scheule-baseline'
            },
            {
              title: 'Budget Performance',
              type: 'basic',
              link: 'close-out/budget-performance'
            },
            {
              title: 'Lessons Learned',
              type: 'basic',
              link: 'close-out/lessons-learned'
            },
          ]
        },
      ]
    },


    {
      type: 'divider'
    }
  ];
  constructor(private fusealert: FuseConfirmationService, private roleController: RoleService, private msalService: MsalService) {
    console.log("Project Service Started")
  }
  projectidInjector(projectid: string) {
    this.projectid = projectid
    this.getroles()
  }
  getroles() {
    this.roleControllerControl = this.roleController.getRolesbyProjectData(this.projectid)
  }
  toggleDrawerOpen(itemtype: string, itemid: string, all: any, pid: string, isBulkEdit: boolean = false, fuseDrawerSmall: boolean = false): void {
    console.log(itemtype)
    if (this.drawerOpenedright == true && this.isFormChanged == true) {
      const alertopener = this.fusealert.open(this.alert)
      alertopener.afterClosed().subscribe(res => {
        if (res == 'confirmed') {
          this.item = {}
          this.itemtype = ""
          this.itemid = ""
          this.all = []
          this.projectid = ""
          this.isFormChanged = false
          this.drawerOpenedright = !this.drawerOpenedright
        }
      })
    }
    else {
      this.itemid = itemid
      this.itemtype = itemtype
      this.all = all
      this.projectid = pid
      this.drawerOpenedright = !this.drawerOpenedright
    }
    this.isBulkEdit = isBulkEdit
    this.fuseDrawerSmall = fuseDrawerSmall
  }
  drawerOpenedChanged(event: any): void {
      window.onbeforeunload = null;
    if (this.drawerOpenedright != event) {
      if (event == false) {
        this.drawerOpenedright = event
        if (this.isFormChanged == true) {
          console.log(this.isFormChanged)
          this.alertopener()
        }
        else {
          this.item = {}
          this.itemtype = ""
          this.itemid = ""
          this.all = []
          this.projectid = ""
          this.isFormChanged = false
          this.isBulkEdit = false
        }

      }
    }
  }

  alertopener() {
    const alertopener = this.fusealert.open(this.alert)
    this.isFormChanged = false
    alertopener.afterClosed().subscribe(res => {
      if (res != 'confirmed') {
        this.toggleDrawerOpen(this.itemtype, this.itemid, this.all, this.projectid, this.isBulkEdit)
        this.isFormChanged = true
      }
      else {
        this.item = {}
        this.itemtype = ""
        this.itemid = ""
        this.all = []
        this.projectid = ""
        this.isFormChanged = false
      }
    })
  }
}
