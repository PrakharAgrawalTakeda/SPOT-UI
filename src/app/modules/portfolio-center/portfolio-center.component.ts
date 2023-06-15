import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { PortfolioApiService } from './portfolio-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectionStrategy } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { MsalService } from '@azure/msal-angular';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Title } from '@angular/platform-browser';
import { ProjectHubService } from '../project-hub/project-hub.service';
import { RoleService } from 'app/core/auth/role.service';
import moment from 'moment';
import { forEach } from 'lodash';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-portfolio-center',
  templateUrl: './portfolio-center.component.html',
  styleUrls: ['./portfolio-center.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PortfolioCenterComponent implements OnInit {
  @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
  projects: MatTableDataSource<any> = new MatTableDataSource();
  projectNames: any = []
  chartBudgetDistribution: ApexOptions = {};
  chartNewVsReturning: ApexOptions;
  showContent = false
  data: any
  totalproject = 0;
  owningOrg = []
  projectType = [{ name: 'Standard Project / Program' }, { name: 'Simple Project' }]
  totalCAPEX = []
  AgileWorkstream = []
  AgileWave = []
  overallStatus = []
  viewBaseline = false
  projectOverview:any = []
  filtersnew: any = {
    "PortfolioOwner": [],
    "ProjectTeamMember": [],
    "ExecutionScope": [],
    "OwningOrganization": [],
    "ProjectState": [],
    "ProjectPhase": [],
    "ProjectType": [],
    "Product": [],
    "TotalCAPEX": [],
    "GMSBudgetOwner": [],
    "AGILEWorkstream": [],
    "AGILEWave": [],
    "CAPSProject": [],
    "Project/Program": [],
    "OverallStatus": [],
  }
  defaultfilter: any = {
    "PortfolioOwner": [],
    "ProjectTeamMember": [],
    "ExecutionScope": [],
    "OwningOrganization": [],
    "ProjectState": [],
    "ProjectPhase": [],
    "ProjectType": [],
    "Product": [],
    "TotalCAPEX": [],
    "GMSBudgetOwner": [],
    "AGILEWorkstream": [],
    "AGILEWave": [],
    "CAPSProject": [],
    "Project/Program": [],
    "OverallStatus": [],
  }
  PortfolioFilterForm = new FormGroup({
    PortfolioOwner: new FormControl(),
    ProjectTeamMember: new FormControl(),
    ExecutionScope: new FormControl(),
    OwningOrganization: new FormControl(),
    ProjectState: new FormControl(),
    ProjectPhase: new FormControl(),
    ProjectType: new FormControl(),
    Product: new FormControl(),
    TotalCAPEX: new FormControl(),
    GMSBudgetOwner: new FormControl(),
    AGILEWorkstream: new FormControl(),
    AGILEWave: new FormControl(),
    CAPSProject: new FormControl(),
    projectName: new FormControl(),
    OverallStatus: new FormControl(),
  })

  filterlist: any = {}
  separatorKeysCodes: number[] = [ENTER, COMMA];
  lookup: any = [];
  activeaccount: any
  newmainnav: any = [
    {
      id: 'portfolio-center',
      title: 'Portfolio Center',
      type: 'basic',
      link: '/portfolio-center'
    },
    {
      // id: 'create-project',
      title: 'Create Project',
      type: 'collapsable',
      link: '/create-project',
      children: [
        {
          title: 'Create Project',
          type: 'basic',
          link: '/create-project/create-new-project'
        },
        {
          title: 'Copy Project',
          type: 'basic',
          link: '/create-project/copy-project'
        }
      ],
    },
    {
      id: 'spot-documents',
      title: 'SPOT Resources',
      type: 'basic',
      externalLink: true,
      link: 'https://mytakeda.sharepoint.com/sites/PMT-SPOT/SitePages/home.aspx',
      target: '_blank'
    },
    {
      id: 'report-navigator',
      title: 'Report Navigator',
      type: 'basic',
      link: 'https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/e6c7feb2-8dca-49ea-9eff-9596f519c64e/ReportSectiona2d604c32b4ad7a54177?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae',
      externalLink: true,
      target: "_blank"

    }
  ]

  //For Local Attributes
  localAttributeForm: any = new FormGroup({})
  localAttributeFormRaw: any = new FormGroup({})
  viewType = 'SidePanel'
  dataLA: any = [];
  originalData: any
  rawData: any
  opened:boolean =  false
  hide:boolean = true
  showcontent: boolean = false
  showLA:boolean=false
  changePO = false
  changeES = false
  
  columns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];
  @ViewChild('filterDrawer') filterDrawer: MatSidenav
  @ViewChild('filterDrawerOver') filterDrawerOver: MatSidenav
  recentTransactionsTableColumns: string[] = ['overallStatus', 'problemTitle', 'phase', 'PM', 'schedule', 'risk', 'ask', 'budget', 'capex'];
  constructor(private apiService: PortfolioApiService, private router: Router, private indicator: SpotlightIndicatorsService, private msal: MsalService, private auth: AuthService, public _fuseNavigationService: FuseNavigationService, private titleService: Title, public role: RoleService, public fuseAlert: FuseConfirmationService) {
    this.PortfolioFilterForm.controls.PortfolioOwner.valueChanges.subscribe(res => {
      if(this.showContent){
        this.changePO = true
      }
    })
    this.PortfolioFilterForm.controls.ExecutionScope.valueChanges.subscribe(res => {
      if (this.showContent) {
        this.changeES = true
      }
    })
  }

  ngOnInit(): void {
    var executionScope = ""
    var portfolioOwners = ""
    this.activeaccount = this.msal.instance.getActiveAccount();
    this.showContent = false;
    this.titleService.setTitle("Portfolio Center")
    if (this.role.roleMaster.securityGroupId == "F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F") {
      this.newmainnav = [
        {
          id: 'portfolio-center',
          title: 'Portfolio Center',
          type: 'basic',
          link: '/portfolio-center'
        },
        {
          id: 'spot-documents',
          title: 'SPOT Resources',
          type: 'basic',
          externalLink: true,
          link: 'https://mytakeda.sharepoint.com/sites/PMT-SPOT/SitePages/home.aspx',
          target: '_blank'
        },
        {
          id: 'report-navigator',
          title: 'Report Navigator',
          type: 'basic',
          link: 'https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/e6c7feb2-8dca-49ea-9eff-9596f519c64e/ReportSectiona2d604c32b4ad7a54177?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae',
          externalLink: true,
          target: "_blank"

        }
      ]
    }
    this.apiService.getfilterlist().then(data => {
      this.filterlist = data
      this.filterlist.defaultOwningOrganizations.forEach(res => {
        this.owningOrg.push({ name: res })
      })

    this.auth.lookupMaster().then(data => {
      this.lookup = data
      this.totalCAPEX = this.lookup.filter(result => result.lookUpParentId == "10F36AC1-23CB-4326-8701-2416F8AE679E")
      this.AgileWorkstream = this.lookup.filter(result => result.lookUpParentId == "f4486388-4c52-48fc-8c05-836878da2247")
      this.AgileWave = this.lookup.filter(result => result.lookUpParentId == "4bdbcbca-90f2-4c7b-b2a5-c337446d60b1")
      this.overallStatus = this.lookup.filter(result => result.lookUpParentId == "81ab7402-ab5d-4b2c-bf70-702aedb308f0")

    var user = [{
      "userAdid": this.activeaccount.localAccountId,
      "userDisplayName": this.activeaccount.name,
      "userIsActive": true
    }]

      // var user = [{
      //   "userAdid": "8195b08b-caf6-4119-85b4-42ae8d7f9e97",
      //   "userDisplayName": "Waglawala, Zenab (ext)",
      //   "userIsActive": true
      // }]

    var state = this.filterlist.state.filter(x => x.lookUpName == "Active")
    if (localStorage.getItem('spot-filtersNew') == null) {
      this.filtersnew = this.defaultfilter
      this.filtersnew.ProjectState = state
      this.filtersnew.ProjectTeamMember = user
      this.PortfolioFilterForm.patchValue({
        ProjectTeamMember: user,
        ProjectState: state
      })

    }
    else {
      this.filtersnew = JSON.parse(localStorage.getItem('spot-filtersNew'))
      this.PortfolioFilterForm.patchValue({
        PortfolioOwner: this.filtersnew.PortfolioOwner,
        ProjectTeamMember: this.filtersnew.ProjectTeamMember,
        // ProjectTeamMember: user,
        ExecutionScope: this.filtersnew.ExecutionScope,
        OwningOrganization: this.filtersnew.OwningOrganization,
        ProjectState: this.filtersnew.ProjectState,
        ProjectPhase: this.filtersnew.ProjectPhase,
        ProjectType: this.filtersnew.ProjectType,
        Product: this.filtersnew.Product,
        TotalCAPEX: this.filtersnew.TotalCAPEX,
        GMSBudgetOwner: this.filtersnew.GMSBudgetOwner,
        AGILEWorkstream: this.filtersnew.AGILEWorkstream,
        AGILEWave: this.filtersnew.AGILEWave,
        CAPSProject: this.filtersnew.CAPSProject,
        projectName: this.filtersnew.projectName,
        OverallStatus: this.filtersnew.OverallStatus,
      })
      if (this.filtersnew.ProjectTeamMember == null || this.filtersnew.ProjectTeamMember.length == 0){
        this.filtersnew.ProjectTeamMember = user
        this.PortfolioFilterForm.patchValue({
          ProjectTeamMember: user
        })
      }
      if (this.filtersnew.ProjectState == null || this.filtersnew.ProjectState.length == 0) {
        this.filtersnew.ProjectState = state
        this.PortfolioFilterForm.patchValue({
          ProjectState: state
        })
      }

    }
    var localattribute
    if (localStorage.getItem('spot-localattribute') != null) {
      localattribute = JSON.parse(localStorage.getItem('spot-localattribute'))
    }
    var filterKeys = Object.keys(this.filtersnew);
    var filterGroups = []
    if (this.filtersnew.PortfolioOwner != null && this.filtersnew.PortfolioOwner.length != 0){
      for (var z = 0; z < this.filtersnew.PortfolioOwner.length; z++){
        portfolioOwners += this.filtersnew.PortfolioOwner[z].portfolioOwnerId + ','
      }
    }
    if (this.filtersnew.ExecutionScope != null && this.filtersnew.ExecutionScope.length != 0) {
      for (var z = 0; z < this.filtersnew.ExecutionScope.length; z++) {
        executionScope += this.filtersnew.ExecutionScope[z].portfolioOwnerId + ','
      }
    }
        
    for (var i = 0; i < Object.keys(this.filtersnew).length; i++){
      var attribute = filterKeys[i]
      var filterItems = []
      if (this.filtersnew[attribute] != null && this.filtersnew[attribute].length != 0){
      for (var j = 0; j < this.filtersnew[attribute].length; j++){
        if (attribute == "PortfolioOwner" || attribute == "ExecutionScope"){
          var filterItems1 =
          {
            "filterAttribute": attribute,
            "filterOperator": "=",
            "filterValue": this.filtersnew[attribute][j].portfolioOwner,
            "unionOperator": 2
          }
        }
        else if (attribute == "GMSBudgetOwner") {
          var filterItems1 =
          {
            "filterAttribute": attribute,
            "filterOperator": "=",
            "filterValue": this.filtersnew[attribute][j].gmsbudgetOwnerDefault,
            "unionOperator": 2
          }
        }
        else if (attribute == "OwningOrganization" || attribute == "ProjectType"){
          var filterItems1 = 
          {
            "filterAttribute": attribute,
            "filterOperator": "=",
            "filterValue": this.filtersnew[attribute][j].name,
            "unionOperator": 2
          }
        }
        else if (attribute == "ProjectTeamMember") {
          // this.filtersnew[attribute][j].userAdid = '8195b08b-caf6-4119-85b4-42ae8d7f9e97'
          var filterItems1 =
          {
            "filterAttribute": attribute,
            "filterOperator": "=",
            "filterValue": this.filtersnew[attribute][j].userAdid,
            "unionOperator": 2
          }
        }
        else if (attribute == "CAPSProject") {
          if(this.filtersnew[attribute] == true){
            this.filtersnew[attribute] = "Yes";
          }
          else{
            this.filtersnew[attribute] ="No"
          }
          var filterItems1 =
          {
            "filterAttribute": attribute,
            "filterOperator": "=",
            "filterValue": this.filtersnew[attribute],
            "unionOperator": 2
          }
        }
        else if (attribute == "projectName") {
          var filterItems1 =
          {
            "filterAttribute": "Project/Program",
            "filterOperator": "=",
            "filterValue": this.filtersnew[attribute][j].ProblemUniqueId,
            "unionOperator": 2
          }
        }
        else if (attribute == "Product") {
          var filterItems1 =
          {
            "filterAttribute": attribute,
            "filterOperator": "=",
            "filterValue": this.filtersnew[attribute][j].productId,
            "unionOperator": 2
          }
        }
        else {
          var filterItems1 =
          {
            "filterAttribute": attribute,
            "filterOperator": "=",
            "filterValue": this.filtersnew[attribute][j].lookUpId,
            "unionOperator": 2
          }
        }
        filterItems.push(filterItems1)
      }
    // }
      filterGroups.push({
          filterItems,
          "groupCondition": 1
    })
  }
    }
    filterGroups[filterGroups.length - 1].groupCondition = 0
      var groupData
    if (localattribute == null){
      groupData = {
        "filterGroups": filterGroups,
        "localAttributes": []
      }
    }
    else{
      groupData = {
        "filterGroups": filterGroups,
        "localAttributes": localattribute
      }
    }

    console.log("Filter Data : " +groupData)
    //Filtering Projects
      this.apiService.Filters(groupData).then((res: any) => {
      const mainNavComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
      mainNavComponent.navigation = this.newmainnav
      mainNavComponent.refresh()
          console.log(res)
          this.totalproject = res.totalProjects
          this.data = {
            "budgetDistribution": {
              "categories": [
                "Intitate",
                "Define",
                "Plan",
                "Excecute",
                "Close",
                "Track"
              ],
              "series": [
                {
                  "name": "Projects",
                  "data": [
                    res.phaseTile.initiate,
                    res.phaseTile.define,
                    res.phaseTile.plan,
                    res.phaseTile.excecute,
                    res.phaseTile.close,
                    res.phaseTile.track
                  ]
                }
              ]
            },
            "newVsReturning": {
              "uniqueVisitors": res.totalProjects,
              "series": [
                res.priorityTile.priority1,
                res.priorityTile.priority2,
                res.priorityTile.priority3,
                res.priorityTile.priority4,
                res.priorityTile.priorityundefined
              ],
              "labels": [
                "Priority 1",
                "Priority 2",
                "Priority 3",
                "Priority 4",
                "Priotity Undefined"
              ]
            },
            "milstoneTile": [
              {
                "title": "All Completed On-Time",
                "value": 48
              },
              {
                "title": "On-Time Last 30 Days",
                "value": 0
              },
              {
                "title": "Predicted On-Time Next 30 Days",
                "value": 48
              },
              {
                "title": "Curent Year Completion Rate",
                "value": 53
              },
            ],
            "nextThreeTile": [
              {
                "title": "Milestones Coming Due",
                "value": res.nextThreeMonths.milestoneDue
              },
              {
                "title": "Projects Completing",
                "value": res.nextThreeMonths.projectsCompleting
              },
              {
                "title": "Risk/Issues Due",
                "value": res.nextThreeMonths.riskIssueDue
              },
              {
                "title": "Ask/Need Due",
                "value": res.nextThreeMonths.askNeedDue
              }
            ],
            "budgetTile": [
              {
                "title": "Plan",
                "value": 3329,
                "value2": 315
              },
              {
                "title": "Previous",
                "value": 7762,
                "value2": 64
              },
              {
                "title": "Current",
                "value": 2151,
                "value2": 515
              },
              {
                "title": "YTD",
                "value": 1891,
                "value2": 121
              }
            ],
            "lastThreeTile": [
              {
                "title": "Milestones Completed",
                "value": res.lastThreeMonths.milestoneCompleted
              },
              {
                "title": "Projects Finished Excecution",
                "value": res.lastThreeMonths.projectsExcecuted
              },
              {
                "title": "Projects Initiated",
                "value": res.lastThreeMonths.projectsIntitated
              },
              {
                "title": "Projects Completed",
                "value": res.lastThreeMonths.projectsCompleted
              },
              {
                "title": "Projects Onhold",
                "value": res.lastThreeMonths.projectsOnHold
              }
            ]
          };
          this.projectNames = res.projectDetails;
          this.projects.data = res.portfolioDetails;
          this.projectOverview = res.portfolioDetails
          for(var i=0;i<this.projectOverview.length;i++){
            this.projectOverview[i].projectCapitalOe= this.projects.data[i].phase +
                ' - ' +
                (this.projects.data[i].capitalPhaseAbbreviation
                ? this.projects.data[i].capitalPhaseAbbreviation
                  : 'NA') +
                ' - ' +
                (this.projects.data[i].oePhaseAbbreviation
                ? this.projects.data[i].oePhaseAbbreviation
                  : 'NA');
            this.projectOverview[i].calculatedEmissionsImpact= this.projectNames[i].calculatedEmissionsImpact;
            this.projectOverview[i].waterImpactUnits = this.projectNames[i].waterImpactUnits;
            this.projectOverview[i].problemId = this.projectNames[i].problemId;
            this.projectOverview[i].nextMilestoneFinishDate= this.formatDate(new Date(this.projects.data[i].nextMilestoneFinishDate));
            this.projectOverview[i].executionCompleteDate= this.formatDate(new Date(this.projects.data[i].executionCompleteDate));
            this.projectOverview[i].totalApprovedCapex= this.projects.data[i].totalApprovedCapex + " " + this.projects.data[i].localCurrencyAbbreviation;
          }
          
          this.projects.sort = this.recentTransactionsTableMatSort;
          this.showContent = true
          for (var name of this.projectNames) {
            this.projects.data.find(ele => ele.projectUid == name.problemUniqueId).problemTitle = name.problemTitle
          }
          this._prepareChartData();
          window['Apex'] = {
            chart: {
              events: {
                mounted: (chart: any, options?: any): void => {
                  this._fixSvgFill(chart.el);
                },
                updated: (chart: any, options?: any): void => {
                  this._fixSvgFill(chart.el);
                }
              }
            }
          };
})
})
})
  this.showcontent = true;
  }
  routeProject(projectid): void {
    window.open('project-hub/' + projectid, "_blank")

  }

  trackByFn(index: number, item: any): any {
    return item.projectTeamUniqueId || index;
  }


  private _fixSvgFill(element: Element): void {
    // Current URL
    const currentURL = this.router.url;
    Array.from(element.querySelectorAll('*[fill]'))
      .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
      .forEach((el) => {
        const attrVal = el.getAttribute('fill');
        el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
      });
  }
  private _prepareChartData(): void {
    this.chartNewVsReturning = {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false
          }
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '130%',
        width: '95%',
        type: 'donut',
        sparkline: {
          enabled: false
        }
      },
      legend: {
        show: false
      },
      colors: ['#4c9bcf', '#da5283', '#abb436', '#99d58f', '#808080'],
      labels: this.data.newVsReturning.labels,
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Projects',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b
                  }, 0)
                }
              }
            }
          }
        }
      },
      series: this.data.newVsReturning.series,
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      },

    };
    this.chartBudgetDistribution = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      colors: ['#ea5532', '#da5283', '#9b72b0', '#4c9bcf', '#51b1bf', '#abb436'],
      grid: {
        show: false,      // you can either change hear to disable all grids
        xaxis: {
          lines: {
            show: false  //or just here to disable only x axis grids
          }
        },
        yaxis: {
          lines: {
            show: false //or just here to disable only y axis
          }
        },
      },
      series: this.data.budgetDistribution.series,
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val: number): string => `${val}`
        }
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '10px',
            fontWeight: '500',
            colors: ['#ea5532', '#da5283', '#9b72b0', '#4c9bcf', '#51b1bf', '#abb436']
          },
        },
        categories: this.data.budgetDistribution.categories
      },
      yaxis: {
        max: (max: number): number => max,
        show: false
      },
      plotOptions: {
        bar: {
          horizontal: false,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: true,
        offsetY: 15
      },
    };

  }
  openRightDrawer() {
    console.log("WIP")
  }

  applyfilters() {
    // var defaultFilter = JSON.parse(localStorage.getItem('spot-filtersNew'))
    // var Concatenate = false
    // if (defaultFilter.PortfolioOwner == this.PortfolioFilterForm.controls.PortfolioOwner.value && defaultFilter.ExecutionScope == this.PortfolioFilterForm.controls.ExecutionScope.value){
    //   Concatenate = true
    // }
    localStorage.setItem('spot-filtersNew', JSON.stringify(this.PortfolioFilterForm.getRawValue()))
    var mainObj = this.originalData
    var dataToSend = []
    var emptyObject = {
      "uniqueId": "",
      "value": ""
    }
    Object.keys(this.localAttributeForm.controls).forEach((name) => {
      const currentControl = this.localAttributeForm.controls[name];
      var i = mainObj.findIndex(x => x.uniqueId === name);
      if (currentControl.dirty && i>=0) {
        if (mainObj[i].data.length == 0 && mainObj[i].dataType == 1 && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].data.length == 0 && mainObj[i].dataType == 2 && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].data.length == 0 && mainObj[i].dataType == 3 && mainObj[i].isMulti == false && this.localAttributeForm.controls[mainObj[i].uniqueId].value.lookUpId == undefined) {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].data.length == 0 && mainObj[i].dataType == 3 && mainObj[i].isMulti == true && this.localAttributeForm.controls[mainObj[i].uniqueId].value.length == 0) {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].data.length == 0 && (mainObj[i].dataType == 6 || mainObj[i].dataType == 4) && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].data.length == 0 && mainObj[i].dataType == 5 && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].dataType == 2) {
          if (mainObj[i].data.length != 0 && (this.localAttributeForm.controls[mainObj[i].uniqueId].value == "" || this.localAttributeForm.controls[mainObj[i].uniqueId].value == null)) {
            mainObj[i].data[0].value = null
            dataToSend.push(mainObj[i])
          }
          else if (mainObj[i].data.length == 0 && this.localAttributeForm.controls[mainObj[i].uniqueId].value != "") {
            emptyObject = {
              "uniqueId": "",
              "value": moment(this.localAttributeForm.controls[mainObj[i].name].value).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
            }
            mainObj[i].data.push(emptyObject)
            emptyObject = {
              "uniqueId": "",
              "value": moment(this.localAttributeForm.controls[mainObj[i].uniqueId].value).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
            }
            mainObj[i].data.push(emptyObject)
            dataToSend.push(mainObj[i])
          }
          else {
            mainObj[i].data[0].value = moment(this.localAttributeForm.controls[mainObj[i].name].value).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
            mainObj[i].data[1].value = moment(this.localAttributeForm.controls[mainObj[i].uniqueId].value).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
            dataToSend.push(mainObj[i])
          }
        }
        else if (mainObj[i].dataType == 3 && mainObj[i].isMulti == false) {
          if (mainObj[i].data.length != 0 && this.localAttributeForm.controls[mainObj[i].uniqueId].value.lookUpId == undefined) {
            mainObj[i].data[0].value = null
            dataToSend.push(mainObj[i])
          }
          else if (mainObj[i].data.length == 0 && this.localAttributeForm.controls[mainObj[i].uniqueId].value.lookUpId != undefined) {
            emptyObject = {
              "uniqueId": "",
              "value": ""
            }
            mainObj[i].data.push(emptyObject)
            mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value.lookUpId
            dataToSend.push(mainObj[i])
          }
          else {
            mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value.lookUpId
            dataToSend.push(mainObj[i])
          }
        }
        else if (mainObj[i].dataType == 3 && mainObj[i].isMulti == true) {
          var data = []
          if (this.localAttributeForm.controls[mainObj[i].uniqueId] != null && this.localAttributeForm.controls[mainObj[i].uniqueId].value.length != 0) {
            for (var j = 0; j < this.localAttributeForm.controls[mainObj[i].uniqueId].value.length; j++) {
              if (this.localAttributeForm.controls[mainObj[i].uniqueId].value.length < mainObj[i].data.length) {
                mainObj[i].data = []
                mainObj[i].data[j] = {
                  "uniqueId": "",
                  "value": this.localAttributeForm.controls[mainObj[i].uniqueId].value[j].lookUpId
                }
              }
              else {
                if (mainObj[i].data[j] == undefined) {
                  mainObj[i].data[j] = {
                    "uniqueId": "",
                    "value": this.localAttributeForm.controls[mainObj[i].uniqueId].value[j].lookUpId
                  }
                }
                else {
                  mainObj[i].data[j].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value[j].lookUpId

                }
              }
            }
          }
          else {
            mainObj[i].data = []
          }
          dataToSend.push(mainObj[i])
        }
        else {
          if (mainObj[i].data.length == 0) {
            if (mainObj[i].dataType == 4 && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
              emptyObject = {
                "uniqueId": "",
                "value": ""
              }
              mainObj[i].data.push(emptyObject)
              mainObj[i].data[0].value = null
              dataToSend.push(mainObj[i])
            }
            else if (mainObj[i].dataType == 4 && this.localAttributeForm.controls[mainObj[i].uniqueId].value != "") {
              emptyObject = {
                "uniqueId": "",
                "value": this.localAttributeForm.controls[mainObj[i].name].value
              }
              mainObj[i].data.push(emptyObject)
              // mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].name].value
              emptyObject = {
                "uniqueId": "",
                "value": this.localAttributeForm.controls[mainObj[i].uniqueId].value
              }
              mainObj[i].data.push(emptyObject)
              // mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value
              dataToSend.push(mainObj[i])
            }
            else{
              emptyObject = {
                "uniqueId": "",
                "value": this.localAttributeForm.controls[mainObj[i].uniqueId].value
              }
              mainObj[i].data.push(emptyObject)
              mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value
              dataToSend.push(mainObj[i])
            }
          }
          else {
            if (mainObj[i].dataType == 4 && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
              mainObj[i].data[0].value = null
              dataToSend.push(mainObj[i])
            }
            if (mainObj[i].dataType == 4 && this.localAttributeForm.controls[mainObj[i].uniqueId].value != "") {
              mainObj[i].data = []
              emptyObject = {
                "uniqueId": "",
                "value": this.localAttributeForm.controls[mainObj[i].name].value
              }
              mainObj[i].data.push(emptyObject)
              emptyObject = {
                "uniqueId": "",
                "value": this.localAttributeForm.controls[mainObj[i].uniqueId].value
              }
              mainObj[i].data.push(emptyObject)
              dataToSend.push(mainObj[i])
            }
            else {
              mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value
              dataToSend.push(mainObj[i])
            }
          }
        }
      }
    })
    console.log(dataToSend)
    if(this.changeES == false && this.changePO == false){
      var c = 0;
      var LA = JSON.parse(localStorage.getItem('spot-localattribute'))
      if(LA != null || LA != undefined){
      var secondArray = LA.filter(o => !dataToSend.some(i => i.uniqueId === o.uniqueId));
      console.log(secondArray)
        if (secondArray.length != 0){
          for (var z = 0; z < secondArray.length; z++){
            dataToSend.push(secondArray[z])
          }
        }
      }
    }
    localStorage.setItem('spot-localattribute', JSON.stringify(dataToSend))
    this.filterDrawer.close()
    this.resetpage()


  }

  resetpage() {
    this.ngOnInit()
  }
  resetfilters() {
    localStorage.setItem('spot-filtersNew', JSON.stringify(this.defaultfilter))
    this.resetpage()
  }

  getPortfolioOwner(): any {
    if (Object.keys(this.filterlist).length != 0){
      return this.filterlist.portfolioOwner.filter(x => x.isPortfolioOwner == true)
    }
  }

  getExcecutionScope(): any {
    if (Object.keys(this.filterlist).length != 0) {
      return this.filterlist.portfolioOwner.filter(x => x.isExecutionScope == true)
    }
  }

  getGMSBudgetOwner(): any {
    if (Object.keys(this.filterlist).length != 0) {
      return this.filterlist.portfolioOwner.filter(x => x.isGmsbudgetOwner == true)
    }
  }

  CloseLA(){
    this.showLA = false;
  }

  OpenLA(){
    console.log("Inside drawer function")
    if (this.PortfolioFilterForm.controls.PortfolioOwner.value == null && this.PortfolioFilterForm.controls.ExecutionScope.value == null){
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please select a portfolio owner and Execution Scope",
        "message": "",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warning"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Okay",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const alert = this.fuseAlert.open(comfirmConfig)
    }
    if (this.PortfolioFilterForm.controls.PortfolioOwner.value.length == 0 && this.PortfolioFilterForm.controls.ExecutionScope.value.length == 0){
      // this.filterDrawerOver.toggle();
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please select a portfolio owner and Execution Scope",
        "message": "",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warning"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Okay",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const alert = this.fuseAlert.open(comfirmConfig)
  }
    else{
    var portfolioOwners = ""
    var executionScope = ""
      if (this.PortfolioFilterForm.controls.PortfolioOwner.value.length != 0) {
        for (var z = 0; z < this.PortfolioFilterForm.controls.PortfolioOwner.value.length; z++) {
          portfolioOwners += this.PortfolioFilterForm.controls.PortfolioOwner.value[z].portfolioOwnerId + ','
      }
    }
      if (this.PortfolioFilterForm.controls.ExecutionScope.value.length != 0) {
        for (var z = 0; z < this.PortfolioFilterForm.controls.ExecutionScope.value.length; z++) {
          executionScope += this.PortfolioFilterForm.controls.ExecutionScope.value[z].portfolioOwnerId + ','
      }
    }
  }
    if (portfolioOwners == "" && executionScope == ""){
      // this.filterDrawerOver.toggle();
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please select a portfolio owner and Execution Scope",
        "message": "",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warning"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Okay",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const alert = this.fuseAlert.open(comfirmConfig)
    }
    var noChangePO = false
    var noChangeES = false
    var filtersnew = JSON.parse(localStorage.getItem('spot-filtersNew'))
    if (portfolioOwners != "" && filtersnew != null){
      var count = 0;
      var list = portfolioOwners.split(',');
      list.pop()
      if (filtersnew.PortfolioOwner.length == list.length){
        for (var i = 0; i < filtersnew.PortfolioOwner.length; i++){
          for(var j=0;j<list.length;j++){
            if (filtersnew.PortfolioOwner[i].portfolioOwnerId == list[j]){
              count++;
            }
          }
        }
      }
      if(count == list.length){
        noChangePO = true
      }
    }
    if (executionScope != "" && filtersnew != null) {
      var count = 0;
      var list = executionScope.split(',');
      list.pop()
      if (filtersnew.ExecutionScope.length == list.length) {
        for (var i = 0; i < filtersnew.ExecutionScope.length; i++) {
          for (var j = 0; j < list.length; j++) {
            if (filtersnew.ExecutionScope[i].portfolioOwnerId == list[j]) {
              count++;
            }
          }
        }
      }
      if (count == list.length) {
        noChangeES = true
      }
    }
    var localattribute = JSON.parse(localStorage.getItem('spot-localattribute'))
    if (noChangePO == true && noChangeES == true && localattribute != null){
      this.apiService.getLocalAttributes(portfolioOwners, executionScope).then((res: any) => {
        console.log(res);
        this.localAttributeFormRaw.controls = {}
        this.localAttributeFormRaw.value = {}
        this.localAttributeForm.controls = {}
        this.localAttributeForm.value = {}
        res.forEach(response => {
          localattribute.forEach(LA => {
            if (LA.uniqueId == response.uniqueId) {
              if (response.dataType == 2 || response.dataType == 4){
                response.data = LA.data
                this.localAttributeFormRaw.addControl(response.name, new FormControl(LA.data[0]))
                this.localAttributeFormRaw.addControl(response.uniqueId, new FormControl(LA.data[1]))
              }
              else{
                response.data = LA.data
                this.localAttributeFormRaw.addControl(response.uniqueId, new FormControl(response.data))
              }
            }
            else{
              this.localAttributeFormRaw.addControl(response.uniqueId, new FormControl(response.data))
            }
          })
        })
        const originalData = Object.assign([{}], res)
        // res.forEach(i => {
        //   if(i.dataType == 2){
        //     this.localAttributeFormRaw.addControl(i.name, new FormControl(i.data))
        //   }
        //   this.localAttributeFormRaw.addControl(i.uniqueId, new FormControl(i.data))
        // })
        this.dataLoader(res);
        this.originalData = originalData;
      })
      // this.filterDrawerOver.toggle();
      this.showLA = true
    }
    else{
      this.showLA = false
    localStorage.setItem('spot-localattribute', null)
    this.apiService.getLocalAttributes(portfolioOwners, executionScope).then((res: any) => {
      console.log(res);
      const originalData = Object.assign([{}], res)
      this.originalData = []
      this.localAttributeFormRaw.controls = {}
      this.localAttributeFormRaw.value = {}
      this.localAttributeForm.controls = {}
      this.localAttributeForm.value = {}
      res.forEach(i => {
        if (i.dataType == 2 || i.dataType == 4) {
          this.localAttributeFormRaw.addControl(i.name, new FormControl(i.data))
        }
        this.localAttributeFormRaw.addControl(i.uniqueId, new FormControl(i.data))
      })
      this.dataLoader(res);
      this.originalData = originalData;
    this.filterDrawerOver.toggle();
    })
      this.showLA = true
  }
  }

  getHeaderClass(): any {
    return ' vertical-header-class';
  }
  alignHeaderMiddleClass(): any {
    return ' align-header-middle-class';
  }
  getTotalCapexHeaderClass(): any {
    return ' total-capex-header-class';
  }
  getGraphCellClass(): any {
    return 'graph-cell-datatable';
  } 
  getFrozenHeaderClass(): any {
    return ' frozen-header-class';
  }
  getFrozenHeaderClassID(): any {
    return ' frozen-header-classID';
  }

  formatDate(date) {
  return [
    this.padTo2Digits(date.getDate()),
    this.padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  OpenBiReport(){
    window.open('https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/f20aacee-f8de-4db9-a17d-341b12c4fa00/ReportSection97454b27006b80c04035?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae')
  }

  OpenSPOTReport(){
    window.open('https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/3b64d881-0127-47a0-a4e1-8ae202214a6a/ReportSection76c7ec63df87082c77bb?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae')
  }
  
  OpenProject(projectName){
    this.projectOverview.forEach((item)=>{
      if (item.problemTitle == projectName){
        window.open('/project-hub/' + item.projectUid + '/project-board', "_blank")
      }
    })
  }

  dataLoader(res) {
    this.dataLA = []
    res.forEach(data => {
      var i = Object.assign({}, data)
      if (i.dataType == 1 && i.data.length == 0) {
        i.data = false
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      else if (i.dataType == 1 && i.data.length > 0) {
        i.data = i.data[0].value
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      else if (i.dataType == 2 && i.data.length == 0) {
        i.data = ""
        this.localAttributeForm.addControl(i.name, new FormControl(i.data))
        // this.dataLA.push(i);
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      else if (i.dataType == 2 && i.data.length > 0) {
        this.localAttributeForm.addControl(i.name, new FormControl(i.data[0].value))
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data[1].value))
        i.data = i.data[1].value
      }
      else if (i.dataType == 3 && i.isMulti == true) {
        if (i.data.length == 0) {
          i.data = []
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
        else {
          var newData = i.data
          var dataMulti = []
          for (var j = 0; j < newData.length; j++) {
            if (this.lookup.filter(x => x.lookUpId == newData[j].value).length == 0) {
              i.data[j] = []
            }
            else {
              i.data[j] = this.lookup.filter(x => x.lookUpId == newData[j].value)[0]
            }
          }
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
      }
      else if (i.dataType == 3 && i.isMulti == false) {
        if (i.data.length == 0) {
          i.data = ""
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
        else {
          if (this.lookup.filter(x => x.lookUpId == i.data[0].value).length == 0) {
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else {
            i.data = this.lookup.filter(x => x.lookUpId == i.data[0].value)[0]
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
        }
      }
      else if (i.dataType == 4 && i.data.length == 0) {
        if (i.linesCount == null) {
          i.linesCount = 13
        }
        i.data = ""
        this.localAttributeForm.addControl(i.name, new FormControl(i.data))
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      else if (i.dataType == 4 && i.data.length > 0) {
        if (i.linesCount == null) {
          i.linesCount = 13
        }
        if (i.data[0].value == null) {
          i.data = ""
          this.localAttributeForm.addControl(i.name, new FormControl(i.data))
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
        else {
          this.localAttributeForm.addControl(i.name, new FormControl(i.data[0].value))
          i.data = i.data[1].value
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
      }
      else if (i.dataType == 5 && i.isMulti == false) {
        if (i.data.length == 0) {
          i.data = ""
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
        else {
          if (i.data[0].value == null) {
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
        }
      }
      else if (i.dataType == 5 && i.isMulti == true && i.data.length == 0) {
        if (i.data.length == 0) {
          i.data = []
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
        else {
          var newData = i.data
          for (var j = 0; j < newData.length; j++) {
            i.data = newData[j].value
          }
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
      }
      else if (i.dataType == 6 && i.data.length == 0) {
        i.data = ""
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      else if (i.dataType == 6 && i.data.length > 0) {
        i.data = i.data[0].value
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      this.dataLA.push(i);
    })
  }

  getLookup(key) {
    return this.lookup.filter(x => x.lookUpParentId == key)
  }

}
