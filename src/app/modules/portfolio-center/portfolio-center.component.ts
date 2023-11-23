import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { MatSidenav } from '@angular/material/sidenav';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Title } from '@angular/platform-browser';
import { ProjectHubService } from '../project-hub/project-hub.service';
import { RoleService } from 'app/core/auth/role.service';
import moment from 'moment';
import { forEach } from 'lodash';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Constants } from 'app/shared/constants';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { PortfolioCenterService } from "./portfolio-center.service";

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
  animations: fuseAnimations,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
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
  projectType = [{ name: 'Standard Project / Program' }, { name: 'Simple Project' }, { name: 'Strategic Initiative / Program' }]
  CAPSDropDrownValues = ["Yes", "No"]
  totalCAPEX = []
  AgileWorkstream = []
  AgileWave = []
  overallStatus = []
  primaryKPI = []
  sorting: any = { name: "", dir: "" }
  viewBaseline = false
  projectOverview: any = []
  filtersnew: any = {
    "PortfolioOwner": [],
    "ProjectTeamMember": [],
    "ExecutionScope": [],
    "OwningOrganization": [],
    "ProjectState": [],
    "ProjectPhase": [],
    "CapitalPhase": [],
    "OEPhase": [],
    "ProjectType": [],
    "Product": [],
    "TotalCAPEX": [],
    "GMSBudgetOwner": [],
    "AGILEWorkstream": [],
    "AGILEWave": [],
    "CAPSProject": [],
    "Project/Program": [],
    "OverallStatus": [],
    "PrimaryValueDriver": [],
    "SPRProjectCategory": []
  }
  defaultfilter: any = {
    "PortfolioOwner": [],
    "ProjectTeamMember": [],
    "ExecutionScope": [],
    "OwningOrganization": [],
    "ProjectState": [],
    "ProjectPhase": [],
    "CapitalPhase": [],
    "OEPhase": [],
    "ProjectType": [],
    "Product": [],
    "TotalCAPEX": [],
    "GMSBudgetOwner": [],
    "AGILEWorkstream": [],
    "AGILEWave": [],
    "CAPSProject": [],
    "Project/Program": [],
    "OverallStatus": [],
    "PrimaryValueDriver": [],
    "SPRProjectCategory": []
  }
  PortfolioFilterForm = new FormGroup({
    PortfolioOwner: new FormControl(),
    ExecutionScope: new FormControl(),
    OwningOrganization: new FormControl(),
    ProjectType: new FormControl(),
    ProjectState: new FormControl(),
    ProjectPhase: new FormControl(),
    CapitalPhase: new FormControl(),
    OEPhase: new FormControl(),
    TotalCAPEX: new FormControl(),
    Product: new FormControl(),
    ProjectTeamMember: new FormControl(),
    GMSBudgetOwner: new FormControl(),
    AGILEWorkstream: new FormControl(),
    AGILEWave: new FormControl(),
    CAPSProject: new FormControl(),
    OverallStatus: new FormControl(),
    projectName: new FormControl(),
    PrimaryValueDriver: new FormControl(),
    SPRProjectCategory: new FormControl()
  })

  bulkreportdata: any;
  bulkreportTableEditStack: any = []
  bulkreportForm = new FormGroup({
    projectProposal: new FormControl()
  })
  toggleStates: boolean[] = [];
  initialToggleStates: { [key: string]: boolean[] } = {};
  toggles: { [key: string]: { states: boolean[], selectAllFn: (checked: boolean) => void, toggleFn: (rowIndex: number) => void, allToggledFn: () => boolean } } = {};
  //pageToggleStates: { [page: number]: boolean[] } = {};
  pageToggleStates: { [page: number]: { [toggleName: string]: boolean[] } } = {};


  filteredPhaseArray = []
  oePhaseArray = []
  capitalPhaseArray: any
  scroll = false
  filterlist: any = {}
  lookup: any = [];
  activeaccount: any
  budgetCurrency: string = ""
  newmainnav: any

  //For Local Attributes
  localAttributeForm: any = new FormGroup({})
  localAttributeFormRaw: any = new FormGroup({})
  viewType = 'SidePanel'
  dataLA: any = [];
  originalData: any
  rawData: any
  opened: boolean = false
  hide: boolean = true
  showcontent: boolean = false
  callPagination: boolean = false
  showLA: boolean = false
  changePO = false
  changeES = false
  filterList = []
  targetPercentage = Constants.QUALITY_TARGET_PERCENTAGE;
  lowerTargetPercentage = Constants.QUALITY_LOWER_TARGET_PERCENTAGE;
  // The number of elements in the page
  size = 0
  // The total number of elements
  totalElements = 0
  // The total number of pages
  totalPages = 0
  // The current page number
  pageNumber = 0
  groupData: any = [];
  showFilter = false
  toggleObject = {};
  @ViewChild('filterDrawer') filterDrawer: MatSidenav
  initial: any;
  user = {}
  state = {}
  changedToggleStates: Record<string, boolean[]> = {};
  showdefault:boolean = false
  localAttributeData = []
  currentData
  Date2
  Date3

  // @ViewChild('bulkreportDrawer') bulkreportDrawer: MatSidenav
  // recentTransactionsTableColumns: string[] = ['overallStatus', 'problemTitle', 'phase', 'PM', 'schedule', 'risk', 'ask', 'budget', 'capex'];
  constructor(private renderer: Renderer2, private apiService: PortfolioApiService, private router: Router, private indicator: SpotlightIndicatorsService, private msal: MsalService, private auth: AuthService, public _fuseNavigationService: FuseNavigationService, private titleService: Title, public role: RoleService, public fuseAlert: FuseConfirmationService, public PortfolioCenterService: PortfolioCenterService) {
    this.PortfolioFilterForm.controls.PortfolioOwner.valueChanges.subscribe(res => {
      if (this.showContent) {
        if (this.showLA) {
          this.showLA = false
        }
        this.changePO = true
      }
    })
    this.PortfolioFilterForm.controls.ExecutionScope.valueChanges.subscribe(res => {
      if (this.showContent) {
        if (this.showLA) {
          this.showLA = false
        }
        this.changeES = true
      }
    })
    this.PortfolioFilterForm.controls.ProjectPhase.valueChanges.subscribe((value) => {
      if (this.showContent) {
        this.changePhase(value);
      }
    })

    this.renderer.listen('window', 'scroll', this.scrollHandler.bind(this));

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
          title: 'SPOT Supporting Documents',
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
    else {
      this.newmainnav = [
        {
          id: 'portfolio-center',
          title: 'Portfolio Center',
          type: 'basic',
          link: '/portfolio-center'
        },
        {
          title: 'Create Project',
          type: 'collapsable',
          link: '/create-project',
          children: [
            {
              title: 'Create a Standard/Simple Project/Program',
              type: 'basic',
              link: '/create-project/create-new-project'
            },
            {
              title: 'Create a Strategic Initiative/Program',
              type: 'basic',
              link: '/create-project/create-strategic-initiative-project'
            },
            {
              title: 'Copy an existing Project',
              type: 'basic',
              link: '/create-project/copy-project'
            }
          ],
        },
        {
          id: 'spot-documents',
          title: 'SPOT Supporting Documents',
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

        },
        {
          id: 'spot-support',
          title: 'Need Help or Propose a Change',
          type: 'basic',
          link: 'mailto:DL.SPOTSupport@takeda.com?Subject=SPOT Support Request ' + this.activeaccount.name + ' (Logged on ' + moment().format('llll') + ')',
          externalLink: true,
          target: "_blank"

        }
      ]
    }
    this.apiService.getfilterlist().then(data => {
      this.filterlist = data
      this.owningOrg = []
      this.filterlist.defaultOwningOrganizations.forEach(res => {
        this.owningOrg.push({ name: res })
      })

      this.auth.lookupMaster().then(data => {
        var AGILEall = {
          isActive: true,
          kpiImpact: null,
          lookUpId: "6e9c3845-5a1f-4891-8825-a1add299a455",
          lookUpName: "All Workstream",
          lookUpOrder: 50,
          lookUpParentId: "f4486388-4c52-48fc-8c05-836878da2247",
        }
        this.lookup = data
        this.totalCAPEX = this.lookup.filter(result => result.lookUpParentId == "10F36AC1-23CB-4326-8701-2416F8AE679E")
        this.AgileWorkstream = this.lookup.filter(result => result.lookUpParentId == "f4486388-4c52-48fc-8c05-836878da2247")
        this.AgileWave = this.lookup.filter(result => result.lookUpParentId == "4bdbcbca-90f2-4c7b-b2a5-c337446d60b1")
        this.overallStatus = this.lookup.filter(result => result.lookUpParentId == "81ab7402-ab5d-4b2c-bf70-702aedb308f0")
        this.primaryKPI = this.lookup.filter(result => result.lookUpParentId == "999572a6-5aa8-4760-8082-c06774a17474")
        this.AgileWorkstream.push(AGILEall)

        this.apiService.getCapitalPhase().then((res: any) => {
          this.capitalPhaseArray = res;
          for (var z = 0; z < this.capitalPhaseArray.length; z++) {
            if (this.capitalPhaseArray[z].capitalPhaseID == "70538E71-D9F5-42BC-884C-F1824D40D211") {
              this.capitalPhaseArray[z].capitalPhaseName = "Define (Plan Phase)"
            }
            if (this.capitalPhaseArray[z].capitalPhaseID == "CB72B543-CDF8-4C09-8372-60A8784D52D5") {
              this.capitalPhaseArray[z].capitalPhaseName = "Define (Define Phase)"
            }
            if (this.capitalPhaseArray[z].capitalPhaseID == "FCE86580-0CE5-4B9A-9F3A-761FAFC76CEF") {
              this.capitalPhaseArray[z].capitalPhaseName = "Control (Close Phase)"
            }
            if (this.capitalPhaseArray[z].capitalPhaseID == "EA995703-7A78-4689-A013-C9733B26980C") {
              this.capitalPhaseArray[z].capitalPhaseName = "Control (Track Phase)"
            }
          }

          this.user = [{
            "userAdid": this.activeaccount.localAccountId,
            "userDisplayName": this.activeaccount.name,
            "userIsActive": true
          }]

          this.state = this.filterlist.state.filter(x => x.lookUpName == "Active")
          if (localStorage.getItem('spot-filtersNew') == null) {
            this.filtersnew = this.defaultfilter
            this.filtersnew.ProjectState = this.state
            this.filtersnew.ProjectTeamMember = this.user
            this.PortfolioFilterForm.patchValue({
              ProjectTeamMember: this.user,
              ProjectState: this.state,
              ProjectPhase: []
            })
          }
          else {
            this.filtersnew = JSON.parse(localStorage.getItem('spot-filtersNew'))
            if (this.filtersnew.ProjectPhase == null) {
              this.filtersnew.ProjectPhase = []
            }
            this.PortfolioFilterForm.patchValue({
              PortfolioOwner: this.filtersnew.PortfolioOwner,
              ProjectTeamMember: this.filtersnew.ProjectTeamMember,
              ExecutionScope: this.filtersnew.ExecutionScope,
              OwningOrganization: this.filtersnew.OwningOrganization,
              ProjectState: this.filtersnew.ProjectState,
              ProjectPhase: this.filtersnew.ProjectPhase,
              CapitalPhase: this.filtersnew.CapitalPhase,
              OEPhase: this.filtersnew.OEPhase,
              ProjectType: this.filtersnew.ProjectType,
              Product: this.filtersnew.Product,
              TotalCAPEX: this.filtersnew.TotalCAPEX,
              GMSBudgetOwner: this.filtersnew.GMSBudgetOwner,
              AGILEWorkstream: this.filtersnew.AGILEWorkstream,
              AGILEWave: this.filtersnew.AGILEWave,
              CAPSProject: this.filtersnew.CAPSProject,
              projectName: this.filtersnew.projectName,
              OverallStatus: this.filtersnew.OverallStatus,
              PrimaryValueDriver: this.filtersnew.PrimaryValueDriver,
              SPRProjectCategory: this.filtersnew.SPRProjectCategory
            })
            // if (Object.values(this.filtersnew).every((x: any) => x === null || x === '' || x.length === 0)) {
            //   if (this.filtersnew.ProjectTeamMember == null || this.filtersnew.ProjectTeamMember.length == 0) {
            //     this.filtersnew.ProjectTeamMember = this.user
            //     this.PortfolioFilterForm.patchValue({
            //       ProjectTeamMember: this.user
            //     })
            //   }
            //   if (this.filtersnew.ProjectState == null || this.filtersnew.ProjectState.length == 0) {
            //     this.filtersnew.ProjectState = this.state
            //     this.PortfolioFilterForm.patchValue({
            //       ProjectState: this.state
            //     })
            //   }
            // }

          }
          var localattribute
          if (localStorage.getItem('spot-localattribute') != null) {
            localattribute = JSON.parse(localStorage.getItem('spot-localattribute'))
          }
          // var ObjectToSend = this.PortfolioFilterForm.getRawValue()
          if (this.filtersnew.AGILEWorkstream != null) {
            if (this.filtersnew.AGILEWorkstream.length != 0) {
              if (this.filtersnew.AGILEWorkstream.filter(data => data.lookUpId == "6e9c3845-5a1f-4891-8825-a1add299a455").length > 0) {
                this.filtersnew.AGILEWorkstream = this.AgileWorkstream
                this.filtersnew.AGILEWorkstream.splice(0, 1)
              }
            }
          }

          var filterKeys = Object.keys(this.filtersnew);
          var filterGroups = []
          if (this.filtersnew.PortfolioOwner != null && this.filtersnew.PortfolioOwner.length != 0) {
            for (var z = 0; z < this.filtersnew.PortfolioOwner.length; z++) {
              portfolioOwners += this.filtersnew.PortfolioOwner[z].portfolioOwnerId + ','
            }
          }
          if (this.filtersnew.ExecutionScope != null && this.filtersnew.ExecutionScope.length != 0) {
            for (var z = 0; z < this.filtersnew.ExecutionScope.length; z++) {
              executionScope += this.filtersnew.ExecutionScope[z].portfolioOwnerId + ','
            }
          }
          this.filterList = []
          for (var i = 0; i < Object.keys(this.filtersnew).length; i++) {
            var attribute = filterKeys[i]
            var filterItems = []
            if (this.filtersnew[attribute] != null && this.filtersnew[attribute].length != 0) {
              //to display list of filters
              if (attribute == "PortfolioOwner" || attribute == "ExecutionScope" || attribute == "GMSBudgetOwner") {
                if (attribute == "GMSBudgetOwner") {
                  var name = "GMS Budget Owner"
                  var order = 10
                }
                else if (attribute == "PortfolioOwner") {
                  var name = "Portfolio Owner"
                  var order = 1
                }
                else if (attribute == "ExecutionScope") {
                  var name = "Execution Scope"
                  var order = 2
                }
                var filterdata = {
                  "name": name,
                  "value": this.filtersnew[attribute][0].portfolioOwner,
                  "count": this.filtersnew[attribute].length,
                  "order": order
                }
              }
              else if (attribute == "OwningOrganization" || attribute == "ProjectType") {
                if (attribute == "OwningOrganization") {
                  var order = 3
                }
                else {
                  var order = 4
                }
                var filterdata = {
                  "name": attribute.replace(/([A-Z])/g, ' $1').trim(),
                  "value": this.filtersnew[attribute][0].name,
                  "count": this.filtersnew[attribute].length,
                  "order": order
                }
              }
              else if (attribute == "ProjectTeamMember") {
                var filterdata = {
                  "name": attribute.replace(/([A-Z])/g, ' $1').trim(),
                  "value": this.filtersnew[attribute][0].userDisplayName,
                  "count": this.filtersnew[attribute].length,
                  "order": 11
                }
              }
              else if (attribute == "projectName") {
                var filterdata = {
                  "name": "Project/Program",
                  "value": this.filtersnew[attribute][0].problemTitle,
                  "count": this.filtersnew[attribute].length,
                  "order": 17
                }
              }
              else if (attribute == "Product") {
                var filterdata = {
                  "name": "Product(s)",
                  "value": this.filtersnew[attribute][0].fullProductName,
                  "count": this.filtersnew[attribute].length,
                  "order": 10
                }
              }
              else if (attribute == "CapitalPhase" || attribute == "OEPhase") {
                if (attribute == "OEPhase") {
                  var name = "OE Phase"
                  var order = 8
                }
                else {
                  var name = "Capital Phase"
                  var order = 7
                }
                var filterdata = {
                  "name": name,
                  "value": this.filtersnew[attribute][0].capitalPhaseName,
                  "count": this.filtersnew[attribute].length,
                  "order": order
                }
              }
              else {
                if (attribute == "TotalCAPEX") {
                  var name = "Total CAPEX"
                  var order = 9
                }
                else if (attribute == "ProjectState") {
                  var name = "Project State"
                  var order = 5
                }
                else if (attribute == "ProjectPhase") {
                  var name = "Project Phase"
                  var order = 6
                }
                else if (attribute == "AGILEWorkstream") {
                  var name = "AGILE Worktream"
                  var order = 13
                }
                else if (attribute == "AGILEWave") {
                  var name = "AGILE Wave"
                  var order = 14
                }
                else if (attribute == "OverallStatus") {
                  var name = "Overall Status"
                  var order = 17
                }
                else if (attribute == "PrimaryValueDriver") {
                  var name = "Primary Value Driver"
                  var order = 18
                }
                var filterdata = {
                  "name": name,
                  "value": this.filtersnew[attribute][0].lookUpName,
                  "count": this.filtersnew[attribute].length,
                  "order": order
                }
              }

              // to send to API
              if (attribute == "CAPSProject") {
                var length: any = 1
                var filterdata = {
                  "name": "CAPS Project",
                  "value": this.filtersnew[attribute],
                  "count": length,
                  "order": 15
                }
                var filterItems1 =
                {
                  "filterAttribute": attribute,
                  "filterOperator": "=",
                  "filterValue": this.filtersnew[attribute],
                  "unionOperator": 2
                }
                filterItems.push(filterItems1)
              }
              else if (attribute == "SPRProjectCategory") {
                var length: any = 1
                var filterdata = {
                  "name": "SPR Project Category",
                  "value": this.filtersnew[attribute],
                  "count": length,
                  "order": 16
                }
                var filterItems1 =
                {
                  "filterAttribute": attribute,
                  "filterOperator": "=",
                  "filterValue": this.filtersnew[attribute],
                  "unionOperator": 2
                }
                filterItems.push(filterItems1)
              }
              else {
                for (var j = 0; j < this.filtersnew[attribute].length; j++) {
                  if (attribute == "PortfolioOwner" || attribute == "ExecutionScope") {
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
                      "filterValue": this.filtersnew[attribute][j].portfolioOwnerId,
                      "unionOperator": 2
                    }
                  }
                  else if (attribute == "OwningOrganization" || attribute == "ProjectType") {
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
                  else if (attribute == "projectName") {
                    var filterItems1 =
                    {
                      "filterAttribute": "Project/Program",
                      "filterOperator": "=",
                      "filterValue": this.filtersnew[attribute][j].problemUniqueId,
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
                  else if (attribute == "CapitalPhase" || attribute == "OEPhase") {
                    var filterItems1 =
                    {
                      "filterAttribute": attribute,
                      "filterOperator": "=",
                      "filterValue": this.filtersnew[attribute][j].capitalPhaseID,
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
              }
              // }
              this.filterList.push(filterdata)
              filterGroups.push({
                filterItems,
                "groupCondition": 1
              })
            }
          }
          this.filterList.sort((a, b) => {
            return (a.order < b.order ? -1 : a.order == b.order ? 0 : 1);
          })
          if (filterGroups.length > 0) {
            filterGroups[filterGroups.length - 1].groupCondition = 0
          }
          this.groupData
          if (localattribute == null) {
            this.groupData = {
              "filterGroups": filterGroups,
              "localAttributes": []
            }
          }
          else {
            this.groupData = {
              "filterGroups": filterGroups,
              "localAttributes": localattribute
            }
          }
          if( localattribute != undefined){
          for(var i=0;i<localattribute.length;i++){
            if(localattribute[i].data.length > 0){
              if(localattribute[i].dataType == "3"){
                var localdata = {
                  "name": localattribute[i].name,
                  "value": this.lookup.filter(result => result.lookUpId == localattribute[i].data[0].value)[0].lookUpName,
                  "count": localattribute[i].data.length,
                  "order": 15
                }
              }
              else if(localattribute[i].dataType == "4"){
                if(localattribute[i].data.length == 2){
                  var data:any = localattribute[i].data[0].value + ' to ' + localattribute[i].data[1].value
                }
                else{
                  var data:any = localattribute[i].data[0].value
                }
                localdata = {
                  "name": localattribute[i].name,
                  "value": data,
                  "count": 1,
                  "order": 15
                }
              }
              else if(localattribute[i].dataType == "2"){
                if(localattribute[i].data.length == 2){

                  var data:any = moment(localattribute[i].data[0].value).format('DD-MMM-YYYY') + ' to ' + moment(localattribute[i].data[1].value).format('DD-MMM-YYYY')
                }
                else{
                  var data:any = moment(localattribute[i].data[0].value).format('DD-MMM-YYYY')
                }
                localdata = {
                  "name": localattribute[i].name,
                  "value": data,
                  "count": 1,
                  "order": 15
                }
              }
              else{
                var localdata = {
                  "name": localattribute[i].name,
                  "value": localattribute[i].data[0].value,
                  "count": localattribute[i].data.length,
                  "order": 15
                }
              }
            }
            this.localAttributeData.push(localdata)
          }
        }

          console.log("Filter Data : " + this.groupData)
          this.currentData = new Date().toISOString().split('T')
          this.Date2 = new Date(Date.now() - 12096e5).toISOString().split('T')
          this.Date3 = new Date(Date.now() - 2.592e+9).toISOString().split('T')
          this.groupData.filterGroups.length == 0 ? this.showdefault = true : this.showdefault = false
          // localStorage.setItem('filterObject', JSON.stringify(this.groupData))
          this.apiService.FiltersByPage(this.groupData, 0, 100).then((res: any) => {
            const mainNavComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
            mainNavComponent.navigation = this.newmainnav
            mainNavComponent.refresh()
            console.log(res)
            this.totalproject = res.totalProjects
            var budgetData;
            this.projects.data = res.portfolioDetails;
            this.bulkreportdata = res.portfolioDetails
            this.initial = res



            if (res.budgetTile.localCurrencyAbbreviation == "OY") {
              this.budgetCurrency = "OY"
            }
            else {
              this.budgetCurrency = ""
            }
            if (res.budgetTile.isPreliminaryPeriod) {
              budgetData = [
                {
                  "title": "Plan",
                  "value": res.budgetTile.capex ? this.budgetCurrency != "OY" ? res.budgetTile.capex.plan.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.capex.plan.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0,
                  "value2": res.budgetTile.opex ? this.budgetCurrency != "OY" ? res.budgetTile.opex.plan.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.opex.plan.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0
                },
                {
                  "title": "Previous",
                  "value": res.budgetTile.capex ? this.budgetCurrency != "OY" ? res.budgetTile.capex.previous.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.capex.previous.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0,
                  "value2": res.budgetTile.opex ? this.budgetCurrency != "OY" ? res.budgetTile.opex.previous.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.opex.previous.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0
                },
                {
                  "title": "Current",
                  "value": res.budgetTile.capex ? this.budgetCurrency != "OY" ? res.budgetTile.capex.current.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.capex.current.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0,
                  "value2": res.budgetTile.opex ? this.budgetCurrency != "OY" ? res.budgetTile.opex.current.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.opex.current.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0
                },
                {
                  "title": "Current (YTD)",
                  "value": res.budgetTile.capex ? this.budgetCurrency != "OY" ? res.budgetTile.capex.ytd.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.capex.ytd.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0,
                  "value2": res.budgetTile.opex ? this.budgetCurrency != "OY" ? res.budgetTile.opex.ytd.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.opex.ytd.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0
                },
                {
                  "title": "Preliminary",
                  "value": res.budgetTile.capex ? this.budgetCurrency != "OY" ? res.budgetTile.capex.preliminaryForecast.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.capex.preliminaryForecast.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0,
                  "value2": res.budgetTile.opex ? this.budgetCurrency != "OY" ? res.budgetTile.opex.preliminaryForecast.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.opex.preliminaryForecast.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0
                }
              ]
            }
            else {
              budgetData = [
                {
                  "title": "Plan",
                  "value": res.budgetTile.capex ? this.budgetCurrency != "OY" ? res.budgetTile.capex.plan.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.capex.plan.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0,
                  "value2": res.budgetTile.opex ? this.budgetCurrency != "OY" ? res.budgetTile.opex.plan.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.opex.plan.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0
                },
                {
                  "title": "Previous",
                  "value": res.budgetTile.capex ? this.budgetCurrency != "OY" ? res.budgetTile.capex.previous.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.capex.previous.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0,
                  "value2": res.budgetTile.opex ? this.budgetCurrency != "OY" ? res.budgetTile.opex.previous.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.opex.previous.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0
                },
                {
                  "title": "Current",
                  "value": res.budgetTile.capex ? this.budgetCurrency != "OY" ? res.budgetTile.capex.current.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.capex.current.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0,
                  "value2": res.budgetTile.opex ? this.budgetCurrency != "OY" ? res.budgetTile.opex.current.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.opex.current.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0
                },
                {
                  "title": "Current (YTD)",
                  "value": res.budgetTile.capex ? this.budgetCurrency != "OY" ? res.budgetTile.capex.ytd.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.capex.ytd.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0,
                  "value2": res.budgetTile.opex ? this.budgetCurrency != "OY" ? res.budgetTile.opex.ytd.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.budgetTile.opex.ytd.toFixed(4).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : 0
                }
              ]
            }
            this.data = {
              "budgetDistribution": {
                "categories": [
                  "Initiate",
                  "Define",
                  "Plan",
                  "Execute",
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
                      res.phaseTile.execute,
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
                  "value": res.milestoneTile.allCompleted
                },
                {
                  "title": "On-Time Last 30 Days",
                  "value": res.milestoneTile.lastThirtyDays
                },
                {
                  "title": "Predicted On-Time Next 30 Days",
                  "value": res.milestoneTile.predicted30Days
                },
                {
                  "title": "Curent Year Completion Rate",
                  "value": res.milestoneTile.completionRate
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
              "budgetTile": budgetData,
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
            res.portfolioDetails.sort((a, b) => {
              return (a.projectUid < b.projectUid ? -1 : a.projectUid == b.projectUid ? 0 : 1);
            })
            res.projectDetails.sort((a, b) => {
              return (a.problemUniqueId < b.problemUniqueId ? -1 : a.problemUniqueId == b.problemUniqueId ? 0 : 1);
            })
            res.conditionalFormattingLabels.sort((a, b) => {
              return (a.projectId < b.projectId ? -1 : a.projectId == b.projectId ? 0 : 1);
            })
            res.trendingIndicators.sort((a, b) => {
              return (a.projectId < b.projectId ? -1 : a.projectId == b.projectId ? 0 : 1);
            })
            if(res.overallStatusInfo){
            res.overallStatusInfo.sort((a, b) => {
              return (a.projectId < b.projectId ? -1 : a.projectId == b.projectId ? 0 : 1);
            })
          }
            this.projectNames = res.projectDetails;
            this.setPage(res, 0)

            this.projects.sort = this.recentTransactionsTableMatSort;
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
            this.showdefault = false
            this.showContent = true;
          })
        })
      })
    })
    this.showContent = false;
  }

  scrollHandler(event) {
    const url = this.router.url;
    if (url.substring(url.lastIndexOf('/') + 1) == 'portfolio-center') {
      this.scroll = true
      this.showContent = false
      var fieldNameElement: any;
      fieldNameElement = document.getElementsByClassName('page-count');
      fieldNameElement[0].innerText = "Total Projects based on the applied filter criteria: " + this.totalproject + " Project(s)";
      this.showContent = true
    }
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
        // max: (max: number): number => max,
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
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        },
        formatter: function (val: any) {
          if (isNaN(val)) {
            return ""
          }
          else {
            return val
          }
        },
      },
    };

  }
  openRightDrawer() {
    console.log("WIP")
  }

  applyfilters() {
    if (this.PortfolioFilterForm.controls.ProjectPhase.value == null) {
      if (this.PortfolioFilterForm.controls.CapitalPhase.value != null && this.PortfolioFilterForm.controls.CapitalPhase.value.length != 0) {
        this.PortfolioFilterForm.patchValue({ CapitalPhase: [] })
      }
      if (this.PortfolioFilterForm.controls.OEPhase.value != null && this.PortfolioFilterForm.controls.OEPhase.value.length != 0) {
        this.PortfolioFilterForm.patchValue({ OEPhase: [] })
      }
    }
    else if (this.PortfolioFilterForm.controls.ProjectPhase.value.length == 0) {
      if (this.PortfolioFilterForm.controls.CapitalPhase.value != null && this.PortfolioFilterForm.controls.CapitalPhase.value.length != 0) {
        this.PortfolioFilterForm.patchValue({ CapitalPhase: [] })
      }
      if (this.PortfolioFilterForm.controls.OEPhase.value != null && this.PortfolioFilterForm.controls.OEPhase.value.length != 0) {
        this.PortfolioFilterForm.patchValue({ OEPhase: [] })
      }
    }
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
      if (currentControl.dirty && i >= 0) {
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
            mainObj[i].data[0].value = ""
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
              emptyObject = {
                "uniqueId": "",
                "value": this.localAttributeForm.controls[mainObj[i].uniqueId].value
              }
              mainObj[i].data.push(emptyObject)
              dataToSend.push(mainObj[i])
            }
            else {
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
    if (Object.values(dataToSend).every(x => x.data[0].value === null || x.data[0].value === '' || x.data[0].value.length === 0)) {
      dataToSend = []
    }
    if (this.changeES == false && this.changePO == false && dataToSend.length != 0) {
      var c = 0;
      var LA = JSON.parse(localStorage.getItem('spot-localattribute'))
      if (LA != null || LA != undefined) {
        var secondArray = LA.filter(o => !dataToSend.some(i => i.uniqueId === o.uniqueId));
        console.log(secondArray)
        if (secondArray.length != 0) {
          for (var z = 0; z < secondArray.length; z++) {
            dataToSend.push(secondArray[z])
          }
        }
      }
    }
    localStorage.setItem('spot-localattribute', JSON.stringify(dataToSend))
    this.filterDrawer.close()
    this.resetpage()
    this.showFilter = false
  }

  resetpage() {
    this.ngOnInit()
  }
  resetfilters() {
    this.showContent = false
    this.PortfolioFilterForm.patchValue({
      PortfolioOwner: [],
      ExecutionScope: [],
      OwningOrganization: [],
      ProjectType: [],
      ProjectState: this.state,
      ProjectPhase: [],
      CapitalPhase: [],
      OEPhase: [],
      TotalCAPEX: [],
      Product: [],
      ProjectTeamMember: this.user,
      GMSBudgetOwner: [],
      AGILEWorkstream: [],
      AGILEWave: [],
      CAPSProject: [],
      OverallStatus: [],
      projectName: [],
      PrimaryValueDriver: [],
      SPRProjectCategory: []
    })
    this.showContent = true
    this.defaultfilter.ProjectTeamMember = this.user
    this.defaultfilter.ProjectState = this.state
    this.defaultfilter.ProjectPhase = []
    localStorage.setItem('spot-filtersNew', JSON.stringify(this.defaultfilter))
    localStorage.setItem('spot-localattribute', null)
    this.defaultfilter.ProjectTeamMember = []
    this.defaultfilter.ProjectState = []
    this.defaultfilter.ProjectPhase = []
    // this.resetpage()
  }

  getPortfolioOwner(): any {
    if (Object.keys(this.filterlist).length != 0) {
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

  CloseLA() {
    this.showLA = false;
  }
  Closefilter() {
    if (this.PortfolioFilterForm.dirty) {
      var comfirmConfig: FuseConfirmationConfig = {
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
            "label": "Okay",
            "color": "warn"
          },
          "cancel": {
            "show": true,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const alert = this.fuseAlert.open(comfirmConfig)
      alert.afterClosed().subscribe(close => {
        if (close == 'confirmed') {
          this.clearForm()
        }
      })
    }
    else {
      this.filterDrawer.close()
    }
  }

  Close() {
    let changesDetected = false;

    Object.keys(this.toggles).forEach((toggleName) => {
      const currentToggleStates = this.toggles[toggleName].states;
      const initialToggleStates = this.initialToggleStates[toggleName];

      if (!changesDetected) {
        changesDetected = !this.areArraysEqual(currentToggleStates, initialToggleStates);
      }
    });

    if (changesDetected) {
      var comfirmConfig: FuseConfirmationConfig = {
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
            "label": "Okay",
            "color": "warn"
          },
          "cancel": {
            "show": true,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const alert = this.fuseAlert.open(comfirmConfig)
      alert.afterClosed().subscribe(close => {
        if (close == 'confirmed') {
          this.filterDrawer.close()
          // Reset toggle states to false on all pages and all toggles
          for (let pageNumber = 0; pageNumber < this.totalPages; pageNumber++) {
            if (this.pageToggleStates[pageNumber]) {
              Object.keys(this.pageToggleStates[pageNumber]).forEach((toggleName) => {
                this.pageToggleStates[pageNumber][toggleName] = Array(this.numberOfToggles()).fill(false);
              });
            }
          }
          this.resetpage()
        }
      })
    }
    else {
      this.filterDrawer.close()
      this.resetpage()
    }
  }

  areArraysEqual(array1: any[], array2: any[]): boolean {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }

    return true;
  }


  // Function to get the number of toggles
  numberOfToggles(): number {
    return this.bulkreportdata.length;
  }
  // Function to initialize a toggle and its associated functions
  initializeToggle(toggleName: string, pageNumber: number) {
    if (!this.pageToggleStates[pageNumber]) {
      this.pageToggleStates[pageNumber] = {}; // Initialize page object if it doesn't exist
    }

    this.toggles[toggleName] = {
      states: Array(this.numberOfToggles()).fill(false),
      selectAllFn: (checked: boolean) => {
        this.toggles[toggleName].states = this.toggles[toggleName].states.map(() => checked);
        this.pageToggleStates[pageNumber][toggleName] = [...this.toggles[toggleName].states];
      },
      toggleFn: (rowIndex: number) => {
        this.toggles[toggleName].states[rowIndex] = !this.toggles[toggleName].states[rowIndex];

        // Initialize the pageToggleStates entry if it doesn't exist
        if (!this.pageToggleStates[pageNumber]) {
          this.pageToggleStates[pageNumber] = {};
        }

        // Initialize the toggleName entry if it doesn't exist
        if (!this.pageToggleStates[pageNumber][toggleName]) {
          this.pageToggleStates[pageNumber][toggleName] = [];
        }

        // Set the toggle state in pageToggleStates
        this.pageToggleStates[pageNumber][toggleName][rowIndex] = this.toggles[toggleName].states[rowIndex];
      },
      allToggledFn: () => {
        return this.toggles[toggleName].states.every((state) => state === true);
      }
    };

    // Set initial toggle states
    this.initialToggleStates[toggleName] = [...this.toggles[toggleName].states];
  }



  generateReports() {
    this.toggleObject = {}
    // Initialize counters for each report type
    const reportTypeCounters = {};
    Object.keys(this.pageToggleStates[0] || {}).forEach(toggleName => {
      reportTypeCounters[toggleName] = 0;
    });

    let noTogglesTurnedOn = true

    // Step 1: Iterate through each page
    for (let pageNumber = 0; pageNumber < this.totalPages; pageNumber++) {
      if (this.pageToggleStates[pageNumber]) {
        const pageToggleStates = this.pageToggleStates[pageNumber];

        Object.keys(pageToggleStates).forEach((toggleName) => {
          const toggleValues = pageToggleStates[toggleName];

          if (toggleValues.some((value) => value === true)) {
            noTogglesTurnedOn = false
            // Only add project UUIDs to toggleObject if the toggle is true
            if (!this.toggleObject[toggleName]) {
              this.toggleObject[toggleName] = [];
            }

            const existingProjectUUIDs = this.toggleObject[toggleName]; // Get existing UUIDs for the toggle

            // Find the project UUIDs for which the toggle is true
            const trueProjectUUIDs = toggleValues
              .map((value, index) => (value ? this.bulkreportdata[index].problemId.toString() : null))
              .filter(Boolean);

            // Add the project UUIDs to toggleObject only if they don't exist already
            for (const uuid of trueProjectUUIDs) {
              if (!existingProjectUUIDs.includes(uuid)) {
                this.toggleObject[toggleName].push(uuid);
              }
            }

            // Update the counter for each report type
            reportTypeCounters[toggleName] += trueProjectUUIDs.length;
          }
        });
      }
    }

    console.log('Toggle Object:', this.toggleObject);

    // Step 2: Check if more than 500 toggles are turned on
    const totalTurnedOnToggles = Object.values(this.toggleObject).reduce(
      (total: number, toggleValues: unknown) =>
        total + (Array.isArray(toggleValues) ? toggleValues.length : 0),
      0
    );
    console.log(totalTurnedOnToggles)
    //     // Step 3: Check if no toggles are turned on
    //     noTogglesTurnedOn = !Object.values(this.toggles).some((toggle) =>
    //     toggle.states.includes(true)
    //   );

    // console.log(totalTurnedOnToggles)
    // Flag to determine if we've found a report type with more than 100 counts
    let showConfirmation = false;

    for (const toggleName in reportTypeCounters) {
      if (reportTypeCounters[toggleName] > 100) {
        showConfirmation = true;
        break; // exit the loop once a report type exceeds 100
      }
    }
    if (typeof totalTurnedOnToggles === 'number' && totalTurnedOnToggles > 500) {
      console.log("HI")
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Your selection exceeds the maximum number of reports you can generate (500). Please select less than 500 projects!",
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
          }
        },
        "dismissible": true
      };
      this.fuseAlert.open(comfirmConfig);

      this.updateToggleObjectFromChanges();

    }



    else if (noTogglesTurnedOn) {
      this.showWarningMessage();
    }

    // Step 4: Check if more than 100 toggles are turned on
    else if (showConfirmation) {
      if (typeof totalTurnedOnToggles === 'number' && totalTurnedOnToggles <= 500) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Are you Sure?",
          "message": "You have selected more than 100 reports to be created. The distribution may be delayed due to the large amount of data to be generated. Are you sure you want to continue?",
          "icon": {
            "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warn"
          },
          "actions": {
            "confirm": {
              "show": true,
              "label": "Yes",
              "color": "warn"
            },
            "cancel": {
              "show": true,
              "label": "Cancel"
            }
          },
          "dismissible": true
        };

        const createProjectAlert = this.fuseAlert.open(comfirmConfig);
        createProjectAlert.afterClosed().subscribe((close) => {
          if (close === 'confirmed') {
            this.apiService.bulkGenerateReports(this.toggleObject).then(Res => {
              // Close the drawer
              this.filterDrawer.close();
              // Reset toggle states to false on all pages and all toggles
              for (let pageNumber = 0; pageNumber < this.totalPages; pageNumber++) {
                if (this.pageToggleStates[pageNumber]) {
                  Object.keys(this.pageToggleStates[pageNumber]).forEach((toggleName) => {
                    this.pageToggleStates[pageNumber][toggleName] = Array(this.numberOfToggles()).fill(false);
                  });
                }
              }

              this.showConfirmationMessage();
            })
          }
        });
      }

    }
    else {
      this.apiService.bulkGenerateReports(this.toggleObject).then(Res => {
        // Close the drawer
        this.filterDrawer.close();
        // Reset toggle states to false on all pages and all toggles
        for (let pageNumber = 0; pageNumber < this.totalPages; pageNumber++) {
          if (this.pageToggleStates[pageNumber]) {
            Object.keys(this.pageToggleStates[pageNumber]).forEach((toggleName) => {
              this.pageToggleStates[pageNumber][toggleName] = Array(this.numberOfToggles()).fill(false);
            });
          }
        }


        this.showConfirmationMessage();
      })
    }
  }

  updateToggleObjectFromChanges() {
    // Loop through each page's toggle states
    for (let pageNumber = 0; pageNumber < this.totalPages; pageNumber++) {
      if (this.pageToggleStates[pageNumber]) {
        const pageToggleStates = this.pageToggleStates[pageNumber];

        // Loop through each toggle name on the page
        Object.keys(pageToggleStates).forEach((toggleName) => {
          const toggleValues = pageToggleStates[toggleName];
          const existingProjectUUIDs = this.toggleObject[toggleName] || [];

          // Find the project UUIDs for which the toggle is now true
          const trueProjectUUIDs = toggleValues
            .map((value, index) => (value ? this.bulkreportdata[index].problemId.toString() : null))
            .filter(Boolean);

          // Remove project UUIDs that are no longer selected
          const updatedUUIDs = existingProjectUUIDs.filter(uuid => trueProjectUUIDs.includes(uuid));

          // Update the toggleObject with the updated UUIDs for this toggle
          this.toggleObject[toggleName] = updatedUUIDs;
        });
      }
    }

    console.log('Updated Toggle Object:', this.toggleObject);
  }




  showWarningMessage(): void {
    let titleText;
    titleText = "Please select at least one project for distribution!"

    var comfirmConfig: FuseConfirmationConfig = {
      "title": titleText,
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
        }
      },
      "dismissible": true
    }
    this.fuseAlert.open(comfirmConfig)
  }
  showConfirmationMessage(): void {
    let titleText;
    titleText = "The selected reports will be processed and distributed by email (one email per report type). Delivery time is dependent on the number of projects and reports selected. Please be patient while checking your inbox."

    var comfirmConfig: FuseConfirmationConfig = {
      "title": titleText,
      "message": "",
      "icon": {
        "show": true,
        "name": "heroicons_outline:check",
        "color": "success"
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
    this.fuseAlert.open(comfirmConfig)
    this.resetpage()
  }


  //   generateReports() {
  //     const toggleObject = {};
  // console.log(this.pageToggleStates)
  // for (let pageNumber = 0; pageNumber < this.totalPages; pageNumber++) {
  //   if (this.pageToggleStates[pageNumber]) {
  //     const pageToggleStates = this.pageToggleStates[pageNumber];

  //     Object.keys(pageToggleStates).forEach((toggleName) => {
  //       const toggleValues = pageToggleStates[toggleName];

  //       const problemIdsWithTrueToggle = [];

  //       this.projectOverview.forEach((item, index) => {
  //         if (toggleValues[index]) {
  //           problemIdsWithTrueToggle.push(item.projectUid.toString());
  //         }
  //       });

  //       toggleObject[toggleName.toLowerCase()] = problemIdsWithTrueToggle;
  //     });
  //   }
  // }
  //     console.log('Toggle Object:', toggleObject);

  //     // Check if more than 100 toggles are turned on for a specific report
  //     const reportWithTooManyToggles = Object.keys(toggleObject).find((toggleName) => {
  //       return toggleObject[toggleName].length > 100;
  //     });

  //     // Check if more than 500 toggles are turned on for a specific report
  //     const reportWith500Toggles = Object.keys(toggleObject).find((toggleName) => {
  //       return toggleObject[toggleName].length > 500;
  //     });

  //     if (reportWith500Toggles) {
  //       var comfirmConfig: FuseConfirmationConfig = {
  //         "title": "Your selection exceeds the maximum number of reports you can generate (500). Please reduce the number of reports within your selection!",
  //         "message": "",
  //         "icon": {
  //           "show": true,
  //           "name": "heroicons_outline:exclamation",
  //           "color": "warning"
  //         },
  //         "actions": {
  //           "confirm": {
  //             "show": true,
  //             "label": "Okay",
  //             "color": "primary"
  //           },
  //           "cancel": {
  //             "show": false,
  //           }
  //         },
  //         "dismissible": true
  //       }
  //       this.fuseAlert.open(comfirmConfig)
  //       // Reset toggle states to initial values
  //       Object.keys(this.toggles).forEach((toggleName) => {
  //         this.toggles[toggleName].states = [...this.initialToggleStates[toggleName]];
  //       });
  //     }


  //     // Pass toggleObject
  //     this.apiService.bulkGenerateReports(toggleObject).then(Res => {
  //       console.log('Toggle Object:', toggleObject);

  //       // Check if any toggle was turned on
  //       const anyToggleOn = Object.values(this.toggles).some((toggle) => toggle.states.includes(true));
  //       if (!anyToggleOn) {
  //         this.showWarningMessage()
  //       }
  //       else if (reportWithTooManyToggles) {
  //         var comfirmConfig: FuseConfirmationConfig = {
  //           "title": "Are you Sure?",
  //           "message": "You have selected more than 100 reports to be created. The distribution may be delayed due to the large amount of data to be generated. Are you sure you want to continue?",
  //           "icon": {
  //             "show": true,
  //             "name": "heroicons_outline:exclamation",
  //             "color": "warn"
  //           },
  //           "actions": {
  //             "confirm": {
  //               "show": true,
  //               "label": "Yes",
  //               "color": "warn"
  //             },
  //             "cancel": {
  //               "show": true,
  //               "label": "Cancel"
  //             }
  //           },
  //           "dismissible": true
  //         }
  //         const createProjectAlert = this.fuseAlert.open(comfirmConfig)
  //         createProjectAlert.afterClosed().subscribe(close => {
  //           if (close == 'confirmed') {
  //             // Close the drawer
  //             this.filterDrawer.close();

  //             // Reset toggle states to initial values
  //             Object.keys(this.toggles).forEach((toggleName) => {
  //               this.toggles[toggleName].states = [...this.initialToggleStates[toggleName]];
  //             });
  //             this.showConfirmationMessage()
  //           }
  //         })
  //       }
  //       else {
  //         // Close the drawer
  //         this.filterDrawer.close();

  //         // Reset toggle states to initial values
  //         Object.keys(this.toggles).forEach((toggleName) => {
  //           this.toggles[toggleName].states = [...this.initialToggleStates[toggleName]];
  //         });
  //         this.showConfirmationMessage()

  //       }

  //     });

  //   }

  setPage(res: any, offset) {
    if (res != '') {
      this.projectOverview = res.portfolioDetails
      this.bulkreportdata = res.portfolioDetails
      for (var i = 0; i < this.projectOverview.length; i++) {
        this.projectOverview[i].projectCapitalOe = this.projects.data[i].phase +
          ' - ' +
          (this.projects.data[i].capitalPhaseAbbreviation
            ? this.projects.data[i].capitalPhaseAbbreviation
            : 'NA') +
          ' - ' +
          (this.projects.data[i].oephaseAbbreviation
            ? this.projects.data[i].oephaseAbbreviation
            : 'NA');
        this.projectOverview[i].overallStatus == "YellowStop" ? this.projectOverview[i].overallStatus = "RedStop" : this.projectOverview[i].overallStatus == "RedStop" ? this.projectOverview[i].overallStatus = "YellowStop" : this.projectOverview[i].overallStatus
        this.projectOverview[i].scheduleIndicator == "YellowStop" ? this.projectOverview[i].scheduleIndicator = "RedStop" : this.projectOverview[i].scheduleIndicator == "RedStop" ? this.projectOverview[i].scheduleIndicator = "YellowStop" : this.projectOverview[i].scheduleIndicator
        this.projectOverview[i].riskIndicator == "YellowStop" ? this.projectOverview[i].riskIndicator = "RedStop" : this.projectOverview[i].riskIndicator == "RedStop" ? this.projectOverview[i].riskIndicator = "YellowStop" : this.projectOverview[i].riskIndicator
        this.projectOverview[i].askNeedIndicator == "YellowStop" ? this.projectOverview[i].askNeedIndicator = "RedStop" : this.projectOverview[i].askNeedIndicator == "RedStop" ? this.projectOverview[i].askNeedIndicator = "YellowStop" : this.projectOverview[i].askNeedIndicator
        this.projectOverview[i].budgetIndicator == "YellowStop" ? this.projectOverview[i].budgetIndicator = "RedStop" : this.projectOverview[i].budgetIndicator == "RedStop" ? this.projectOverview[i].budgetIndicator = "YellowStop" : this.projectOverview[i].budgetIndicator
        this.projectOverview[i].budgetSpendIndicator == "YellowStop" ? this.projectOverview[i].budgetSpendIndicator = "RedStop" : this.projectOverview[i].budgetSpendIndicator == "RedStop" ? this.projectOverview[i].budgetSpendIndicator = "YellowStop" : this.projectOverview[i].budgetSpendIndicator

        var preffix = ""
        if (res.projectDetails[i].isArchived && !res.projectDetails[i].isConfidential) {
          preffix = "[ARCHIVED]"
        }
        else if (res.projectDetails[i].isConfidential && !res.projectDetails[i].isArchived) {
          preffix = "[CONF]"
        }
        else if (res.projectDetails[i].isConfidential && res.projectDetails[i].isArchived) {
          preffix = "[ARCHIVED CONF]"
        }
        if (res.budgetTile.localCurrencyAbbreviation == "OY") {
          this.budgetCurrency = "OY"
        }
        else {
          this.budgetCurrency = this.projects.data[i].localCurrencyAbbreviation
        }
        res.projectDetails[i].problemTitle = preffix + " " + res.projectDetails[i].problemTitle
        this.projectOverview[i].CAPEX = this.projectOverview[i].localTotalApprovedCapex
        this.projectOverview[i].FORECAST = this.projectOverview[i].localForecastLbecapEx
        this.projectOverview[i].currencyAbb = this.projects.data[i].localCurrencyAbbreviation
        this.projectOverview[i].projectDataQualityString = (~~this.projectOverview[i].projectDataQuality).toString() + "%"
        this.projectOverview[i].calculatedEmissionsImpact = this.projectNames[i].calculatedEmissionsImpact ? this.projectNames[i].calculatedEmissionsImpact.toFixed(1).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : this.projectNames[i].calculatedEmissionsImpact;
        this.projectOverview[i].waterImpactUnits = this.projectNames[i].waterImpactUnits ? this.projectNames[i].waterImpactUnits.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : this.projectNames[i].waterImpactUnits;
        this.projectOverview[i].problemId = this.projectNames[i].problemId;
        this.projectOverview[i].problemTitle = res.projectDetails[i].problemTitle;
        this.projectOverview[i].nextMilestoneFinishDate = this.projects.data[i].nextMilestoneFinishDate ? new Date(this.projects.data[i].nextMilestoneFinishDate) : this.projects.data[i].nextMilestoneFinishDate;
        this.projectOverview[i].executionCompleteDate = this.projects.data[i].executionCompleteDate ? new Date(this.projects.data[i].executionCompleteDate) : this.projects.data[i].executionCompleteDate;
        this.projectOverview[i].executionDuration = this.projects.data[i].executionDuration ? this.projects.data[i].executionDuration.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : this.projects.data[i].executionDuration;
        this.projectOverview[i].overallStatusIndicator = res.trendingIndicators[i].overallStatusIndicator
        this.projectOverview[i].scheduleIndicator = res.trendingIndicators[i].scheduleIndicator
        this.projectOverview[i].riskIssueIndicator = res.trendingIndicators[i].riskIssueIndicator
        this.projectOverview[i].askNeedIndicator = res.trendingIndicators[i].askNeedIndicator
        this.projectOverview[i].budgetIndicator = res.trendingIndicators[i].budgetIndicator
        this.projectOverview[i].spendIndicator = res.trendingIndicators[i].spendIndicator
        this.projectOverview[i].dataFreshness = this.projects.data[i].dataFreshness + ' days'
        this.projectOverview[i].overallStatusLastUpdate = res.overallStatusInfo[i] ? res.overallStatusInfo[i]?.overallStatusLastUpdate.split('T') : ''
        this.projectOverview[i].grey = false
        this.projectOverview[i].darkGrey = false
        if(this.projectOverview[i].overallStatusLastUpdate != ''){
        if(this.projectOverview[i].overallStatusLastUpdate[0] <= this.Date2[0] && this.projectOverview[i].overallStatusLastUpdate >= this.Date3[0]){
          this.projectOverview[i].grey = true
          console.log("status date = " + this.projectOverview[i].overallStatusLastUpdate[0])
          console.log("date - 14 = " + this.Date2[0])
          console.log("date - 30 = " + this.Date3[0])
        }
        else if(this.projectOverview[i].overallStatusLastUpdate[0] < this.currentData[0]){
          this.projectOverview[i].darkGrey = true
          console.log("status date = " + this.projectOverview[i].overallStatusLastUpdate[0])
          console.log("current date = " + this.currentData[0])
        }
      }
        this.projectOverview[i].notBaselined = res.conditionalFormattingLabels ? res.conditionalFormattingLabels.filter(index => index.projectId == this.projectOverview[i].projectUid)[0].notBaselined : ''
        this.projectOverview[i].completed = res.conditionalFormattingLabels ? res.conditionalFormattingLabels.filter(index => index.projectId == this.projectOverview[i].projectUid)[0].completed : ''
        this.projectOverview[i].redExecutionCompleteDate = res.conditionalFormattingLabels ? res.conditionalFormattingLabels.filter(index => index.projectId == this.projectOverview[i].projectUid)[0].redExecutionCompleteDate : ''
      }
      this.size = 100;
      this.totalElements = this.totalproject;
      this.totalPages = this.totalproject / 100;
      this.pageNumber = 0
      // Initialize toggles for the current page
      this.initializeToggle('Project Proposal', this.pageNumber);
      this.initializeToggle('Project Charter', this.pageNumber);
      this.initializeToggle('Performance Dashboard', this.pageNumber);
      this.initializeToggle('Budget Dashboard', this.pageNumber);
      this.initializeToggle('Project Closeout', this.pageNumber);
      this.initializeToggle('GMSGQ Product Team', this.pageNumber);

      // Restore toggle states based on stored values
      if (this.pageToggleStates[this.pageNumber]) {
        Object.keys(this.toggles).forEach((toggleName) => {
          if (this.pageToggleStates[this.pageNumber][toggleName]) {
            this.toggles[toggleName].states = [...this.pageToggleStates[this.pageNumber][toggleName]];
          }
        });
      }
    }
    else {
      if (offset.offset != 0 || this.callPagination == true) {
        this.callPagination = true
        this.projectOverview = []
        this.projects.data = [];
        this.apiService.FiltersByPage(this.groupData, (offset.offset) * 100, 100).then((res: any) => {
          res.portfolioDetails.sort((a, b) => {
            return (a.projectUid < b.projectUid ? -1 : a.projectUid == b.projectUid ? 0 : 1);
          })
          res.projectDetails.sort((a, b) => {
            return (a.problemUniqueId < b.problemUniqueId ? -1 : a.problemUniqueId == b.problemUniqueId ? 0 : 1);
          })
          res.trendingIndicators.sort((a, b) => {
            return (a.projectId < b.projectId ? -1 : a.projectId == b.projectId ? 0 : 1);
          })
          if(res.overallStatusInfo){
          res.overallStatusInfo.sort((a, b) => {
            return (a.projectId < b.projectId ? -1 : a.projectId == b.projectId ? 0 : 1);
          })
        }
          if (res.conditionalFormattingLabels != null) {
            res.conditionalFormattingLabels.sort((a, b) => {
              return (a.projectId < b.projectId ? -1 : a.projectId == b.projectId ? 0 : 1);
            })
          }
          this.projectOverview = res.portfolioDetails
          this.bulkreportdata = res.portfolioDetails
          this.projects.data = res.portfolioDetails;
          for (var i = 0; i < this.projectOverview.length; i++) {
            this.projectOverview[i].projectCapitalOe = this.projects.data[i].phase +
              ' - ' +
              (this.projects.data[i].capitalPhaseAbbreviation
                ? this.projects.data[i].capitalPhaseAbbreviation
                : 'NA') +
              ' - ' +
              (this.projects.data[i].oePhaseAbbreviation
                ? this.projects.data[i].oePhaseAbbreviation
                : 'NA');
            this.projectOverview[i].overallStatus == "YellowStop" ? this.projectOverview[i].overallStatus = "RedStop" : this.projectOverview[i].overallStatus == "RedStop" ? this.projectOverview[i].overallStatus = "YellowStop" : this.projectOverview[i].overallStatus
            this.projectOverview[i].scheduleIndicator == "YellowStop" ? this.projectOverview[i].scheduleIndicator = "RedStop" : this.projectOverview[i].scheduleIndicator == "RedStop" ? this.projectOverview[i].scheduleIndicator = "YellowStop" : this.projectOverview[i].scheduleIndicator
            this.projectOverview[i].riskIndicator == "YellowStop" ? this.projectOverview[i].riskIndicator = "RedStop" : this.projectOverview[i].riskIndicator == "RedStop" ? this.projectOverview[i].riskIndicator = "YellowStop" : this.projectOverview[i].riskIndicator
            this.projectOverview[i].askNeedIndicator == "YellowStop" ? this.projectOverview[i].askNeedIndicator = "RedStop" : this.projectOverview[i].askNeedIndicator == "RedStop" ? this.projectOverview[i].askNeedIndicator = "YellowStop" : this.projectOverview[i].askNeedIndicator
            this.projectOverview[i].budgetIndicator == "YellowStop" ? this.projectOverview[i].budgetIndicator = "RedStop" : this.projectOverview[i].budgetIndicator == "RedStop" ? this.projectOverview[i].budgetIndicator = "YellowStop" : this.projectOverview[i].budgetIndicator
            this.projectOverview[i].budgetSpendIndicator == "YellowStop" ? this.projectOverview[i].budgetSpendIndicator = "RedStop" : this.projectOverview[i].budgetSpendIndicator == "RedStop" ? this.projectOverview[i].budgetSpendIndicator = "YellowStop" : this.projectOverview[i].budgetSpendIndicator
            var preffix = ""
            if (res.projectDetails[i].isArchived && !res.projectDetails[i].isConfidential) {
              preffix = "[ARCHIVED]"
            }
            else if (res.projectDetails[i].isConfidential && !res.projectDetails[i].isArchived) {
              preffix = "[CONF]"
            }
            else if (res.projectDetails[i].isConfidential && res.projectDetails[i].isArchived) {
              preffix = "[ARCHIVED CONF]"
            }
            res.projectDetails[i].problemTitle = preffix + " " + res.projectDetails[i].problemTitle
            // this.projectOverview[i].CAPEX = this.projectOverview[i].localCurrentYrCapExPlan
            this.projectOverview[i].CAPEX = this.projectOverview[i].localTotalApprovedCapex
            this.projectOverview[i].FORECAST = this.projectOverview[i].localForecastLbecapEx
            this.projectOverview[i].currencyAbb = this.projects.data[i].localCurrencyAbbreviation

            this.projectOverview[i].projectDataQualityString = (~~this.projectOverview[i].projectDataQuality).toString() + "%"
            this.projectOverview[i].calculatedEmissionsImpact = res.projectDetails[i].calculatedEmissionsImpact ? res.projectDetails[i].calculatedEmissionsImpact.toFixed(1).toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.projectDetails[i].calculatedEmissionsImpact;
            this.projectOverview[i].waterImpactUnits = res.projectDetails[i].waterImpactUnits ? res.projectDetails[i].waterImpactUnits.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : res.projectDetails[i].waterImpactUnits;
            this.projectOverview[i].problemId = res.projectDetails[i].problemId;
            this.projectOverview[i].problemTitle = res.projectDetails[i].problemTitle;
            this.projectOverview[i].nextMilestoneFinishDate = this.projects.data[i].nextMilestoneFinishDate ? new Date(this.projects.data[i].nextMilestoneFinishDate) : this.projects.data[i].nextMilestoneFinishDate;
            this.projectOverview[i].executionCompleteDate = this.projects.data[i].executionCompleteDate ? new Date(this.projects.data[i].executionCompleteDate) : this.projects.data[i].executionCompleteDate;
            this.projectOverview[i].executionDuration = this.projects.data[i].executionDuration ? this.projects.data[i].executionDuration.toString().replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : this.projects.data[i].executionDuration;
            this.projectOverview[i].overallStatusIndicator = res.trendingIndicators[i].overallStatusIndicator
            this.projectOverview[i].scheduleIndicator = res.trendingIndicators[i].scheduleIndicator
            this.projectOverview[i].riskIssueIndicator = res.trendingIndicators[i].riskIssueIndicator
            this.projectOverview[i].askNeedIndicator = res.trendingIndicators[i].askNeedIndicator
            this.projectOverview[i].budgetIndicator = res.trendingIndicators[i].budgetIndicator
            this.projectOverview[i].spendIndicator = res.trendingIndicators[i].spendIndicator
            this.projectOverview[i].dataFreshness = this.projects.data[i].dataFreshness + ' days'
            this.projectOverview[i].overallStatusLastUpdate = res.overallStatusInfo ? res.overallStatusInfo[i]?.overallStatusLastUpdate.split('T') : ''
            this.projectOverview[i].grey = false
            this.projectOverview[i].darkGrey = false
            if(this.projectOverview[i].overallStatusLastUpdate != ''){
            if(this.projectOverview[i].overallStatusLastUpdate[0] <= this.Date2.split('T') && this.projectOverview[i].overallStatusLastUpdate <= this.Date3.split('T')){
              this.projectOverview[i].grey = true
              console.log()
            }
            else if(this.projectOverview[i].overallStatusLastUpdate[0] < this.currentData.split('T')){
              this.projectOverview[i].darkGrey = true
            }
          }
            this.projectOverview[i].notBaselined = res.conditionalFormattingLabels ? res.conditionalFormattingLabels.filter(index => index.projectId == this.projectOverview[i].projectUid)[0].notBaselined : ''
            this.projectOverview[i].completed = res.conditionalFormattingLabels ? res.conditionalFormattingLabels.filter(index => index.projectId == this.projectOverview[i].projectUid)[0].completed : ''
            this.projectOverview[i].redExecutionCompleteDate = res.conditionalFormattingLabels ? res.conditionalFormattingLabels.filter(index => index.projectId == this.projectOverview[i].projectUid)[0].redExecutionCompleteDate : ''
          }
          if (this.sorting.name != "") {
            this.projectOverview.sort
            if (this.sorting.dir == "asc") {
              this.projectOverview.sort((a, b) => {
                return (a.this.sorting.name < b.this.sorting.name ? -1 : a.this.sorting.name == b.this.sorting.name ? 0 : 1);
              })
            }
            else {
              this.projectOverview.sort((a, b) => {
                return (a.this.sorting.name > b.this.sorting.name ? -1 : a.this.sorting.name == b.this.sorting.name ? 0 : 1);
              })
            }
          }
          this.size = 100;
          this.totalElements = this.totalproject;
          this.totalPages = this.totalproject / 100;
          this.pageNumber = offset.offset
          // Initialize toggles for the current page
          this.initializeToggle('Project Proposal', this.pageNumber);
          this.initializeToggle('Project Charter', this.pageNumber);
          this.initializeToggle('Performance Dashboard', this.pageNumber);
          this.initializeToggle('Budget Dashboard', this.pageNumber);
          this.initializeToggle('Project Closeout', this.pageNumber);
          this.initializeToggle('GMSGQ Product Team', this.pageNumber);

          // Restore toggle states based on stored values
          if (this.pageToggleStates[this.pageNumber]) {
            Object.keys(this.toggles).forEach((toggleName) => {
              if (this.pageToggleStates[this.pageNumber][toggleName]) {
                this.toggles[toggleName].states = [...this.pageToggleStates[this.pageNumber][toggleName]];
              }
            });
          }
        })
      }
    }
  }



  clearForm() {
    this.showContent = false
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
        ProjectState: state,
        ProjectPhase: []
      })
    }
    else {
      this.filtersnew = JSON.parse(localStorage.getItem('spot-filtersNew'))
      if (this.filtersnew.ProjectPhase == null) {
        this.filtersnew.ProjectPhase = []
      }
      this.PortfolioFilterForm.patchValue({
        PortfolioOwner: this.filtersnew.PortfolioOwner ? this.filtersnew.PortfolioOwner : [],
        ProjectTeamMember: this.filtersnew.ProjectTeamMember ? this.filtersnew.ProjectTeamMember : [],
        ExecutionScope: this.filtersnew.ExecutionScope ? this.filtersnew.ExecutionScope : [],
        OwningOrganization: this.filtersnew.OwningOrganization ? this.filtersnew.OwningOrganization : [],
        ProjectState: this.filtersnew.ProjectState ? this.filtersnew.ProjectState : [],
        ProjectPhase: this.filtersnew.ProjectPhase ? this.filtersnew.ProjectPhase : [],
        CapitalPhase: this.filtersnew.CapitalPhase ? this.filtersnew.CapitalPhase : [],
        OEPhase: this.filtersnew.OEPhase ? this.filtersnew.OEPhase : [],
        ProjectType: this.filtersnew.ProjectType ? this.filtersnew.ProjectType : [],
        Product: this.filtersnew.Product ? this.filtersnew.Product : [],
        TotalCAPEX: this.filtersnew.TotalCAPEX ? this.filtersnew.TotalCAPEX : [],
        GMSBudgetOwner: this.filtersnew.GMSBudgetOwner ? this.filtersnew.GMSBudgetOwner : [],
        AGILEWorkstream: this.filtersnew.AGILEWorkstream ? this.filtersnew.AGILEWorkstream : [],
        AGILEWave: this.filtersnew.AGILEWave ? this.filtersnew.AGILEWave : [],
        CAPSProject: this.filtersnew.CAPSProject ? this.filtersnew.CAPSProject : [],
        projectName: this.filtersnew.projectName ? this.filtersnew.projectName : [],
        OverallStatus: this.filtersnew.OverallStatus ? this.filtersnew.OverallStatus : [],
        SPRProjectCategory: this.filtersnew.SPRProjectCategory ? this.filtersnew.SPRProjectCategory : [],
      })
      if (Object.values(this.filtersnew).every((x: any) => x === null || x === '' || x.length === 0)) {
        if (this.filtersnew.ProjectTeamMember == null || this.filtersnew.ProjectTeamMember.length == 0) {
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

    }
    this.showContent = true
    this.filterDrawer.close()
  }

  OpenLA() {
    var portfolioOwners = ""
    var executionScope = ""
    console.log("Inside drawer function")
    if (this.PortfolioFilterForm.controls.PortfolioOwner.value != null) {
      if (this.PortfolioFilterForm.controls.PortfolioOwner.value.length != 0) {
        for (var z = 0; z < this.PortfolioFilterForm.controls.PortfolioOwner.value.length; z++) {
          portfolioOwners += this.PortfolioFilterForm.controls.PortfolioOwner.value[z].portfolioOwnerId + ','
        }
      }
    }
    if (this.PortfolioFilterForm.controls.ExecutionScope.value != null) {
      if (this.PortfolioFilterForm.controls.ExecutionScope.value.length != 0) {
        for (var z = 0; z < this.PortfolioFilterForm.controls.ExecutionScope.value.length; z++) {
          executionScope += this.PortfolioFilterForm.controls.ExecutionScope.value[z].portfolioOwnerId + ','
        }
      }
    }

    var noChangePO = false
    var noChangeES = false
    var filtersnew = JSON.parse(localStorage.getItem('spot-filtersNew'))
    if (portfolioOwners != "" && filtersnew != null && filtersnew.PortfolioOwner != null) {
      var count = 0;
      var list = portfolioOwners.split(',');
      list.pop()
      if (filtersnew.PortfolioOwner.length == list.length) {
        for (var i = 0; i < filtersnew.PortfolioOwner.length; i++) {
          for (var j = 0; j < list.length; j++) {
            if (filtersnew.PortfolioOwner[i].portfolioOwnerId == list[j]) {
              count++;
            }
          }
        }
      }
      if (count == list.length) {
        noChangePO = true
      }
    }
    if (executionScope != "" && filtersnew != null && filtersnew.ExecutionScope != null) {
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
    if (noChangePO == true && noChangeES == true && localattribute != null) {
      this.apiService.getLocalAttributes(portfolioOwners, executionScope).then((res: any) => {
        console.log(res);
        this.localAttributeFormRaw.controls = {}
        this.localAttributeFormRaw.value = {}
        this.localAttributeForm.controls = {}
        this.localAttributeForm.value = {}
        res.forEach(response => {
          localattribute.forEach(LA => {
            if (LA.uniqueId == response.uniqueId) {
              if (response.dataType == 2 || response.dataType == 4) {
                response.data = LA.data
                this.localAttributeFormRaw.addControl(response.name, new FormControl(LA.data[0]))
                this.localAttributeFormRaw.addControl(response.uniqueId, new FormControl(LA.data[1]))
              }
              else {
                response.data = LA.data
                this.localAttributeFormRaw.addControl(response.uniqueId, new FormControl(response.data))
              }
            }
            else {
              this.localAttributeFormRaw.addControl(response.uniqueId, new FormControl(response.data))
            }
          })
        })
        const originalData = Object.assign([{}], res)
        this.dataLoader(res);
        this.originalData = originalData;
      })
      this.showLA = true
    }
    else {
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

  // formatDate(date) {
  // return [
  //   this.padTo2Digits(date.getDate()),
  //   this.padTo2Digits(date.getMonth() + 1),
  //   date.getFullYear(),
  // ].join('/');
  // }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  OpenBiReport() {
    window.open('https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/f20aacee-f8de-4db9-a17d-341b12c4fa00/ReportSection97454b27006b80c04035?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae')
  }

  OpenSPOTReport() {
    window.open('https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/3b64d881-0127-47a0-a4e1-8ae202214a6a/ReportSection76c7ec63df87082c77bb?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae')
  }

  OpenProject(projectName) {
    this.projectOverview.forEach((item) => {
      if (item.problemTitle == projectName) {
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


  changePhase(phaseId) {
    var result = []
    var resultOE = []
    this.filteredPhaseArray = []
    this.oePhaseArray = []
    var index = []
    for (var i = 0; i < phaseId.length; i++) {
      result = this.capitalPhaseArray.filter(item => item.associatedPhaseID == phaseId[i].lookUpId && item.isOEPhase == false);
      this.filteredPhaseArray = [...this.filteredPhaseArray, ...result]
    }

    for (var i = 0; i < phaseId.length; i++) {
      resultOE = this.capitalPhaseArray.filter(item => item.associatedPhaseID == phaseId[i].lookUpId && item.isOEPhase == true);
      this.oePhaseArray = [...this.oePhaseArray, ...resultOE]
    }
    if (this.PortfolioFilterForm.controls.ProjectPhase.value.length == 1 && this.PortfolioFilterForm.controls.ProjectPhase.value[0].lookUpId == "7bf185af-1fda-4086-839e-2aa38fbc19d0") {
      this.PortfolioFilterForm.controls.CapitalPhase.disable();
      this.PortfolioFilterForm.controls.OEPhase.disable();
    }
    else {
      this.PortfolioFilterForm.controls.CapitalPhase.enable();
      this.PortfolioFilterForm.controls.OEPhase.enable();
    }
    var PO = this.PortfolioFilterForm.controls.ProjectPhase.value ? this.PortfolioFilterForm.controls.ProjectPhase.value.length != 0 ? true : false : false
    var CP = this.PortfolioFilterForm.controls.CapitalPhase.value ? this.PortfolioFilterForm.controls.CapitalPhase.value.length != 0 ? true : false : false
    var OP = this.PortfolioFilterForm.controls.OEPhase.value ? this.PortfolioFilterForm.controls.OEPhase.value.length != 0 ? true : false : false
    if (PO && (CP || OP)) {
      if (this.PortfolioFilterForm.controls.CapitalPhase.value != null) {
        for (var i = 0; i < this.PortfolioFilterForm.controls.CapitalPhase.value.length; i++) {
          var c = 0;
          for (var j = 0; j < this.filteredPhaseArray.length; j++) {
            if (this.filteredPhaseArray[j].capitalPhaseID == this.PortfolioFilterForm.controls.CapitalPhase.value[i].capitalPhaseID) {
              c++;
            }
          }
          if (c == 0) {
            index.push(i);
          }
        }
        if (index.length != 0) {
          for (var z = 0; z < index.length; z++) {
            this.PortfolioFilterForm.controls.CapitalPhase.value.splice(index[z], 1);
          }
        }
      }
      if (this.PortfolioFilterForm.controls.OEPhase.value != null) {
        index = []
        for (var i = 0; i < this.PortfolioFilterForm.controls.OEPhase.value.length; i++) {
          var c = 0;
          for (var j = 0; j < this.oePhaseArray.length; j++) {
            if (this.oePhaseArray[j].capitalPhaseID == this.PortfolioFilterForm.controls.OEPhase.value[i].capitalPhaseID) {
              c++;
            }
          }
          if (c == 0) {
            index.push(i);
          }
        }
        if (index.length != 0) {
          for (var z = 0; z < index.length; z++) {
            this.PortfolioFilterForm.controls.OEPhase.value.splice(index[z], 1);
          }
        }
      }
    }
  }

  getColor(percentage: number) {
    if (percentage < this.lowerTargetPercentage) {
      return "red";
    }
    if (this.targetPercentage > percentage && percentage >= this.lowerTargetPercentage) {
      return "orange";
    }
    if (this.targetPercentage < percentage) {
      return "green";
    }
  }

  tootlipFormatter(value, series) {
    return value.toString();
  }

  sort(event) {
    console.log(event)
    this.sorting.name = event.sorts[0].prop;
    this.sorting.dir = event.sorts[0].dir;
  }
  goToForecast() {
    // localStorage.setItem('filterObject', JSON.stringify(this.groupData))
    window.open('/portfolio-center/forecast', "_blank")
  }
  openDrawer(type) {
    if (type == 'Filter') {
      this.showFilter = true
    }
    else {
      this.showFilter = false
    }
    this.filterDrawer.toggle();
  }
  DefaultFilter(){
    this.PortfolioFilterForm.patchValue({
      ProjectTeamMember: this.user,
      ProjectState: this.state,
      ProjectPhase: []
    })
    localStorage.setItem('spot-filtersNew', JSON.stringify(this.PortfolioFilterForm.getRawValue()))
    this.ngOnInit()
  }
}
