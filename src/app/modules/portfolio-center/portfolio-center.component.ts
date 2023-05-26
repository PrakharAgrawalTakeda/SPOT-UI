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
  fieldsvalues = 
  [
    { name: 'Overall Status', checked: false },
    { name: 'Project ID / Budget ID', checked: false },
    { name: 'Program / Project Name', checked: false },
    { name: 'Phase (Project/Capital/OE)', checked: false }
  ]
  checkedList: any = [];
  currentSelected = {};
  showDropDown = true
  filtersnew: any = {
    "portfolioOwner": [],
    "ProjectTeamMember": [],
    "excecutionScope": [],
    "owningOrganization": [],
    "projectState": [],
    "projectPhase": [],
    "projectType": [],
    "product": [],
    "totalCapex": [],
    "GMSBudgetOwner": [],
    "AgileWorkstream": [],
    "AgileWave": [],
    "isCapsProject": [],
    "projectName": [],
    "overallStatus": [],
  }
  defaultfilter: any = {
    "portfolioOwner": [],
    "ProjectTeamMember": [],
    "excecutionScope": [],
    "owningOrganization": [],
    "projectState": [],
    "projectPhase": [],
    "projectType": [],
    "product": [],
    "totalCapex": [],
    "GMSBudgetOwner": [],
    "AgileWorkstream": [],
    "AgileWave": [],
    "isCapsProject": [],
    "projectName": [],
    "overallStatus": [],
  }
  PortfolioFilterForm = new FormGroup({
    portfolioOwner: new FormControl(),
    ProjectTeamMember: new FormControl(),
    excecutionScope: new FormControl(),
    owningOrganization: new FormControl(),
    projectState: new FormControl(),
    projectPhase: new FormControl(),
    projectType: new FormControl(),
    product: new FormControl(),
    totalCapex: new FormControl(),
    GMSBudgetOwner: new FormControl(),
    AgileWorkstream: new FormControl(),
    AgileWave: new FormControl(),
    isCapsProject: new FormControl(),
    projectName: new FormControl(),
    overallStatus: new FormControl(),
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

  @ViewChild('filterDrawer') filterDrawer: MatSidenav
  recentTransactionsTableColumns: string[] = ['overallStatus', 'problemTitle', 'phase', 'PM', 'schedule', 'risk', 'ask', 'budget', 'capex'];
  constructor(private apiService: PortfolioApiService, private router: Router, private indicator: SpotlightIndicatorsService, private msal: MsalService, private auth: AuthService, public _fuseNavigationService: FuseNavigationService, private titleService: Title, public role: RoleService) {
  }

  ngOnInit(): void {
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

    //checking if there are any preset filter
    if (localStorage.getItem('spot-filters') == null) {
      this.filtersnew = this.defaultfilter

    }
    else {
      this.filtersnew = JSON.parse(localStorage.getItem('spot-filters'))

    }
    console.log(this.filtersnew)
    //Filtering Projects
    this.apiService.MainFilters(this.filtersnew).then((resp:any) => {
      const mainNavComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
      mainNavComponent.navigation = this.newmainnav
      mainNavComponent.refresh()
      if (resp != null) {

        //Loading Lookup Values in Filters
        this.apiService.getfilterlist().then(data => {
          this.filterlist = data
          this.filterlist.defaultOwningOrganizations.forEach(res => {
            this.owningOrg.push({ name: res })
          })
        })

        this.auth.lookupMaster().then(data => {
          this.lookup = data
          this.totalCAPEX = this.lookup.filter(result => result.lookUpParentId == "10F36AC1-23CB-4326-8701-2416F8AE679E")
          this.AgileWorkstream = this.lookup.filter(result => result.lookUpParentId == "f4486388-4c52-48fc-8c05-836878da2247")
          this.AgileWave = this.lookup.filter(result => result.lookUpParentId == "4bdbcbca-90f2-4c7b-b2a5-c337446d60b1")
          this.overallStatus = this.lookup.filter(result => result.lookUpParentId == "81ab7402-ab5d-4b2c-bf70-702aedb308f0")
          
        })

        //end Loading
        //Loading Portfiolio Data
        this.apiService.getportfoliodata(resp).then((res: any) => {
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
          console.log("is this working too?")
        });
        //End Loading
      }
    })

    //For Local Attributes
    // this.apiService.getLocalAttributes(this.projectHubService.projectid).then((res: any) => {
    //   this.auth.lookupMaster().then(res1 => {
    //     this.lookupData = res1
    //     const originalData = Object.assign([{}], res)
    //     res.forEach(i => {
    //       this.localAttributeFormRaw.addControl(i.uniqueId, new FormControl(i.data))
    //     })
    //     this.dataLoader(res);
    //     this.originalData = originalData;
    //     this.viewContent = true
    //   })
    // })
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
    localStorage.setItem('spot-filters', JSON.stringify(this.filtersnew))
    this.filterDrawer.close()
    this.resetpage()


  }

  resetpage() {
    this.ngOnInit()
  }
  resetfilters() {
    localStorage.setItem('spot-filters', JSON.stringify(this.defaultfilter))
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
    this.viewBaseline = true
    this.filterDrawer.toggle();
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

  getSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.checkedList.push(value);
    } else {
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
    }

    this.currentSelected = { checked: status, name: value };

    //share checked list
    // this.shareCheckedlist();

    //share individual selected item
    // this.shareIndividualStatus();
  }

  // shareCheckedlist() {
  //   this.shareCheckedList.emit(this.checkedList);
  // }
  // shareIndividualStatus() {
  //   this.shareIndividualCheckedList.emit(this.currentSelected);
  // }
}
