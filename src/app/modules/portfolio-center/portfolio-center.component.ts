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

  // ColumnFilterForm = new FormGroup({
  //   SelectColumns: new FormControl()
  // })

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
  
  // columnList = [{"name": 'Overall Status'},
  //   { "name": 'Project ID / Budgets ID'},
  //   { "name": 'Program / Project Name' },
  //   { "name": 'Phase (Project/Capital/OE)'},
  //   { "name": 'Project Manager'},
  //   { "name": 'Sponsor'},
  //   { "name": 'Schedule'},
  //   { "name": 'Risk/Issues'},
  //   { "name": 'Ask/Needs' },
  //   { "name": 'Budget' },
  //   { "name": 'Spend' },
  //   { "name": 'DQ%' },
  //   { "name": 'Total CAPEX Approved/Forecast' },
  //   { "name": 'Carbon Impact (Tons CO2)' },
  //   { "name": 'Water Impact (m3)' },
  //   { "name": 'Milestone / Progression' },
  //   { "name": 'Next Milestone' },
  //   { "name": 'Next Milestone Planned Finish Date' },
  //   { "name": 'Execution Complete Date' },
  //   { "name": 'Execution Duration (Days)' }, 
  // ]
  columns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];
  @ViewChild('filterDrawer') filterDrawer: MatSidenav
  @ViewChild('filterDrawerOver') filterDrawerOver: MatSidenav
  recentTransactionsTableColumns: string[] = ['overallStatus', 'problemTitle', 'phase', 'PM', 'schedule', 'risk', 'ask', 'budget', 'capex'];
  constructor(private apiService: PortfolioApiService, private router: Router, private indicator: SpotlightIndicatorsService, private msal: MsalService, private auth: AuthService, public _fuseNavigationService: FuseNavigationService, private titleService: Title, public role: RoleService) {}

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
    var groupData = {
      "filterGroups": filterGroups
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
        if(portfolioOwners != "" || executionScope != ""){
        //For Local Attributes
        this.apiService.getLocalAttributes(portfolioOwners, executionScope).then((res: any) => {
          console.log(res);
          const originalData = Object.assign([{}], res)
          res.forEach(i => {
            this.localAttributeFormRaw.addControl(i.uniqueId, new FormControl(i.data))
          })
          this.dataLoader(res);
          this.originalData = originalData;
        })
      }
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
    console.log(this.PortfolioFilterForm.getRawValue())
    localStorage.setItem('spot-filtersNew', JSON.stringify(this.PortfolioFilterForm.getRawValue()))
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

  OpenLA(){
    console.log("Inside drawer function")
    if (this.PortfolioFilterForm.controls.PortfolioOwner.value.length == 0 && this.PortfolioFilterForm.controls.ExecutionScope.value.length == 0){
      this.filterDrawerOver.toggle();
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
    this.apiService.getLocalAttributes(portfolioOwners, executionScope).then((res: any) => {
      console.log(res);
      const originalData = Object.assign([{}], res)
      res.forEach(i => {
        this.localAttributeFormRaw.addControl(i.uniqueId, new FormControl(i.data))
      })
      this.dataLoader(res);
      this.originalData = originalData;
    this.filterDrawerOver.toggle();
    })
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

  // open(): void {

  //   // Return if it's already opened
  //   if (this.opened) {
  //     this.opened = false;
  //   }
  //   else{
  //   // window.scroll(0, 0);
  //   // Open the search
  //   this.opened = true;
  //   }
  // }

  // SelectColumns(name) {
  //   this.showContent = false;
  //   console.log(name)
  //   this.hide = false;
  //   this.showContent = true
  // }

  dataLoader(res) {

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
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      else if (i.dataType == 2 && i.data.length > 0) {
        i.data = i.data[0].value
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
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
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      else if (i.dataType == 4 && i.data.length > 0) {
        if (i.linesCount == null) {
          i.linesCount = 13
        }
        if (i.data[0].value == null) {
          i.data = ""
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
        else {
          i.data = i.data[0].value
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
