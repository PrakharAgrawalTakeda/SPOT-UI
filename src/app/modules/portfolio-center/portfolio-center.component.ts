import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { PortfolioApiService } from './portfolio-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectionStrategy } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-portfolio-center',
  templateUrl: './portfolio-center.component.html',
  styleUrls: ['./portfolio-center.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class PortfolioCenterComponent implements OnInit,AfterViewInit {
  @ViewChild('recentTransactionsTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
  projects: MatTableDataSource<any> = new MatTableDataSource();
  projectNames: any = []
  chartBudgetDistribution: ApexOptions = {};
  chartNewVsReturning: ApexOptions;
  showContent = false
  data: any
  totalproject = 0;
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
  recentTransactionsTableColumns: string[] = ['overallStatus', 'problemTitle', 'phase', 'PM', 'schedule','risk','ask','budget','capex'];
  constructor(private apiService: PortfolioApiService, private router: Router, private indicator: SpotlightIndicatorsService, private msal: MsalService) { }

  ngOnInit(): void {
    this.apiService.getprojectNames().then((res:any)=>{
      this.projectNames = res
      console.log(res)
      this.apiService.getprojects().then((res:any)=>{
        this.projects.data = res    
        this.projects.sort = this.recentTransactionsTableMatSort;
        this.showContent =true
        for(var name of this.projectNames){
          this.projects.data.find(ele => ele.projectUid==name.problemUniqueId).problemTitle = name.problemTitle
        }
        console.log(this.projects.data)
        
      });
      this.defaultfilter.people.push(this.msal.instance.getActiveAccount().localAccountId)
      this.apiService.Filters(this.defaultfilter).then((resp)=>{
        if(res != null){
          this.apiService.getportfoliodata(resp).then((res:any)=>{
            console.log(res)
            this.totalproject = res.totalProjects
            this.data= {"budgetDistribution" :{
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
          "newVsReturning" :{
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
        "milstoneTile":[
          {
            "title": "All Completed On-Time",
            "value": 48
          },
          {
            "title": "On-Time Last 30 Days",
            "value" : 0  
          },
          {
            "title": "Predicted On-Time Next 30 Days",
            "value" : 48  
          },
          {
            "title": "Curent Year Completion Rate",
            "value" : 53  
          },  
        ],
        "nextThreeTile":[
          {
            "title": "Milestones Coming Due",
            "value": res.nextThreeMonths.milestoneDue
          },
          {
            "title": "Projects Completing",
            "value" : res.nextThreeMonths.projectsCompleting
          },
          {
            "title": "Risk/Issues Due",
            "value" : res.nextThreeMonths.riskIssueDue  
          },
          {
            "title": "Ask/Need Due",
            "value" : res.nextThreeMonths.askNeedDue  
          }
        ],
        "budgetTile":[
          {
            "title": "Plan",
            "value": 3329,
            "value2": 315
          },
          {
            "title": "Previous",
            "value" : 7762,
            "value2": 64  
          },
          {
            "title": "Current",
            "value" : 2151,
            "value2": 515 
          },
          {
            "title": "YTD",
            "value" : 1891,
            "value2": 121  
          }
        ],
        "lastThreeTile":[
          {
            "title": "Milestones Completed",
            "value": 1250
          },
          {
            "title": "Projects Finished Excecution",
            "value" : 264  
          },
          {
            "title": "Projects Initiated",
            "value" : 2566  
          },
          {
            "title": "Projects Completed",
            "value" : 144  
          },
          {
            "title": "Projects Onhold",
            "value" : 456  
          }
        ]
        };
          console.log(this.data.newVsReturning)
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
         
        }
      })
     
      
    });
      }
  ngAfterViewInit(): void
    {}
  trackByFn(index: number, item: any): any
  {
      console.log(index)
      return item.projectTeamUniqueId || index;
  }
  private _fixSvgFill(element: Element): void
    {
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
  private _prepareChartData(): void{
    this.chartNewVsReturning = {
      chart      : {
          animations: {
              speed           : 400,
              animateGradually: {
                  enabled: false
              }
          },
          fontFamily: 'inherit',
          foreColor : 'inherit',
          height    : '130%',
          width: '95%',
          type      : 'donut',
          sparkline : {
              enabled: false
          }
      },
      legend:{
          show: false
      },
      colors     : ['#4c9bcf', '#da5283','#abb436','#99d58f','#808080'],
      labels     : this.data.newVsReturning.labels,
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
      series     : this.data.newVsReturning.series,
      states     : {
          hover : {
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
      chart      : {
          fontFamily: 'inherit',
          foreColor : 'inherit',
          height    : '100%',
          type      : 'bar',
          toolbar :{
              show: false
          } 
      },
      colors     : ['#ea5532','#da5283','#9b72b0','#4c9bcf','#51b1bf','#abb436'],
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
      series     : this.data.budgetDistribution.series,
      tooltip    : {
          theme: 'dark',
          y    : {
              formatter: (val: number): string => `${val}`
          }
      },
      xaxis      : {
          labels    : {
              show : true,
              style: {
                  fontSize  : '10px',
                  fontWeight: '500',
                  colors     : ['#ea5532','#da5283','#9b72b0','#4c9bcf','#51b1bf','#abb436']
              },
          },
          categories: this.data.budgetDistribution.categories
      },
      yaxis      : {
        max       : (max: number): number => max,
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
      legend:{
        show: false
      },
      dataLabels: {
        enabled: true,
        offsetY: 15
      },
  };

  }

}
