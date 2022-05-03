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
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-portfolio-center',
  templateUrl: './portfolio-center.component.html',
  styleUrls: ['./portfolio-center.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PortfolioCenterComponent implements OnInit, AfterViewInit {
  @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
  projects: MatTableDataSource<any> = new MatTableDataSource();
  projectNames: any = []
  chartBudgetDistribution: ApexOptions = {};
  chartNewVsReturning: ApexOptions;
  showContent = false
  data: any
  totalproject = 0;
  filters: any = {
    "portfolioOwner": [],
    "phase": [],
    "executionScope": [],
    "people": [],
    "products": [],
    "state": [],
    "totalCAPEX": [],
    "gmsBudgetOwner": [],
    "oeProjectType": [],
    "projectType": [],
    "fundingStatus": [],
    "agileWorkstream": [],
    "agileWave": [],
    "primaryKPI": [],
    "startegicYear": [],
    "annualInitiatives": [],
    "topsGroup": [],
    "capsProject": [],
    "projectName": []
  }
  defaultfilter: any = {
    "portfolioOwner": [],
    "phase": [],
    "executionScope": [],
    "people": [],
    "products": [],
    "state": [],
    "totalCAPEX": [],
    "gmsBudgetOwner": [],
    "oeProjectType": [],
    "projectType": [],
    "fundingStatus": [],
    "agileWorkstream": [],
    "agileWave": [],
    "primaryKPI": [],
    "startegicYear": [],
    "annualInitiatives": [],
    "topsGroup": [],
    "capsProject": [],
    "projectName": []
  }
  filterchiplist: any = {
    "portfolioOwner": [],
    "phase": [],
    "executionScope": [],
    "people": [],
    "products": [],
    "state": [],
    "totalCAPEX": [],
    "gmsBudgetOwner": [],
    "oeProjectType": [],
    "projectType": [],
    "fundingStatus": [],
    "agileWorkstream": [],
    "agileWave": [],
    "primaryKPI": [],
    "startegicYear": [],
    "annualInitiatives": [],
    "topsGroup": [],
    "capsProject": [],
    "projectName": []
  }
  filterInputs: any = {
    "portfolioOwner": [],
    "phase": [],
    "executionScope": [],
    "products": [],
    "state": [],
    "totalCAPEX": [],
    "gmsBudgetOwner": [],
    "oeProjectType": [],
    "projectType": [],
    "fundingStatus": [],
    "agileWorkstream": [],
    "agileWave": [],
    "primaryKPI": [],
    "startegicYear": [],
    "annualInitiatives": [],
    "topsGroup": [],
    "capsProject": [],
    "projectName": []
  }
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  phaseCtrl = new FormControl();
  stateCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  lookup: any = [];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('phaseInput') phaseInput: ElementRef<HTMLInputElement>;
  @ViewChild('stateInput') stateInput: ElementRef<HTMLInputElement>;
  @ViewChild('filterDrawer') filterDrawer: MatSidenav
  recentTransactionsTableColumns: string[] = ['overallStatus', 'problemTitle', 'phase', 'PM', 'schedule', 'risk', 'ask', 'budget', 'capex'];
  constructor(private apiService: PortfolioApiService, private router: Router, private indicator: SpotlightIndicatorsService, private msal: MsalService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.showContent = false;
    if (!this.defaultfilter.people.includes(this.msal.instance.getActiveAccount().localAccountId)) {
      this.defaultfilter.people.push(this.msal.instance.getActiveAccount().localAccountId)
    }
    //checking if there are any preset filter
    if (localStorage.getItem('spot-filters') == null) {
      this.filters = this.defaultfilter

    }
    else {
      this.filters = JSON.parse(localStorage.getItem('spot-filters'))

    }
    //Filtering Projects
    this.apiService.Filters(this.filters).then((resp) => {
      if (resp != null) {

        //Loading Lookup Values in Filters
        this.auth.lookupMaster().then(data => {
          this.filterchiplist.phase = []
          this.filterchiplist.state =[]
          // Filters Inputs 
          this.lookup = data
          this.filterInputs.phase = this.lookup.filter(p => p.lookUpParentId === GlobalFiltersDropDown.dropdownparent["phase"])
          this.filterInputs.state = this.lookup.filter(p => p.lookUpParentId === GlobalFiltersDropDown.dropdownparent["state"])
          this.filterInputs.startegicYear = this.lookup.filter(p => p.lookUpParentId === GlobalFiltersDropDown.dropdownparent["stratyear"])
          //Phase
          for (var i of this.filters.phase) {
            const name = this.lookup.find(x => x.lookUpId == i).lookUpName
            if (!this.filterchiplist.phase.includes(name)) {
              this.filterchiplist.phase.push(name)
              this.filterInputs.phase = this.filterInputs.phase.filter(x => x.lookUpId != i)
            }
          }
          //State
          for (var i of this.filters.state) {
            if (!this.filterchiplist.state.includes(i)) {
              this.filterchiplist.state.push(i)
              this.filterInputs.state = this.filterInputs.state.filter(x => x.lookUpName != i)
            }
          }
        })
        //end Loading
        //Loading Portfiolio Data
        this.apiService.getportfoliodata(resp).then((res: any) => {
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
                "value": 1250
              },
              {
                "title": "Projects Finished Excecution",
                "value": 264
              },
              {
                "title": "Projects Initiated",
                "value": 2566
              },
              {
                "title": "Projects Completed",
                "value": 144
              },
              {
                "title": "Projects Onhold",
                "value": 456
              }
            ]
          };
          this.projectNames = res.projectDetails;
          this.projects.data = res.portfolioDetails;
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
  }
  ngAfterViewInit(): void { }

  remove(value: string, field: string): void {
    if (field == "Phase") {
      var look = this.lookup.find(x => x.lookUpName == value)
      this.filterInputs.phase.push(look)
      const index = this.filterchiplist.phase.indexOf(value)
      this.filterchiplist.phase.splice(index, 1)
      const indexfil = this.filters.phase.indexOf(look.lookUpId)
      this.filters.phase.splice(indexfil, 1)
    }
    else if (field == "State") {
      var look = this.lookup.find(x => x.lookUpName == value)
      this.filterInputs.state.push(look)
      const index = this.filterchiplist.state.indexOf(value)
      this.filterchiplist.state.splice(index, 1)
      const indexfil = this.filters.state.indexOf(look.lookUpName)
      this.filters.state.splice(indexfil, 1)
    }
  }
  selected(event: MatAutocompleteSelectedEvent, field: string): void {

    //entering values to start filtering
    //Phase Selection
    if (field == "Phase") {
      if (!this.filters.phase.includes(event.option.value)) {
        this.filters.phase.push(event.option.value);
        this.filterchiplist.phase.push(event.option.viewValue);
        this.filterInputs.phase = this.filterInputs.phase.filter(x => x.lookUpId != event.option.value)
      }
      this.phaseInput.nativeElement.blur();
      this.phaseCtrl.setValue(null);
    }
    if (field == "State") {
      if (!this.filters.state.includes(event.option.value)) {
        this.filters.state.push(event.option.viewValue);
        this.filterchiplist.state.push(event.option.viewValue);
        this.filterInputs.state = this.filterInputs.state.filter(x => x.lookUpId != event.option.value)
      }
      this.stateInput.nativeElement.blur();
      this.stateCtrl.setValue(null);
    }
    if (field == "Priority") {
      if (!this.fruits.includes(event.option.viewValue)) {
        this.fruits.push(event.option.viewValue);
        this.allFruits.splice(this.allFruits.indexOf(event.option.viewValue), 1)
      }
      this.fruitInput.nativeElement.blur();
      this.fruitCtrl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  trackByFn(index: number, item: any): any {
    return item.projectTeamUniqueId || index;
  }


  private _fixSvgFill(element: Element): void {
    // Current URL
    const currentURL = this.router.url;

    // 1. Find all elements with 'fill' attribute within the element
    // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
    // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
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
    localStorage.setItem('spot-filters', JSON.stringify(this.filters))
    console.log(this.filters)
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
}
