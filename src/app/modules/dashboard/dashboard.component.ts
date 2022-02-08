import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectionStrategy } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { DashboardApiService } from './dashboard-api.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class DashboardComponent implements OnInit,AfterViewInit {

  @ViewChild('recentTransactionsTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
  projects: MatTableDataSource<any> = new MatTableDataSource();
  projectNames: any = []
  chartBudgetDistribution: ApexOptions = {};
  chartNewVsReturning: ApexOptions;
  showContent = false
  data: any
  recentTransactionsTableColumns: string[] = ['overallStatus', 'problemTitle', 'phase', 'PM', 'schedule','risk','ask','budget','capex'];
  constructor(private apiService: DashboardApiService, private router: Router, private indicator: SpotlightIndicatorsService, private splash: FuseSplashScreenService) { }

  ngOnInit(): void {
    this.apiService.getprojectNames().then((res:any)=>{
      this.projectNames = res
      console.log(res)
      this.apiService.getprojects().then((res:any)=>{
        this.projects.data = res    
        this.showContent = true
        this.projects.sort = this.recentTransactionsTableMatSort;
        this.showContent =true
        for(var name of this.projectNames){
          this.projects.data.find(ele => ele.projectUid==name.problemUniqueId).problemTitle = name.problemTitle
        }
        console.log(this.projects.data)
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
                        1,
                        0,
                        1,
                        2,
                        0,
                        0
                    ]
                }
            ]
        },
        "newVsReturning" :{
          "uniqueVisitors": 100,
          "series": [
              25,
              15,
              35,
              15
          ],
          "labels": [
              "Priority 1",
              "Priority 2",
              "Priority 3",
              "Priority 4"
          ]
      }};
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
      });
      
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
          height    : '100%',
          width: '100%',
          type      : 'donut',
          sparkline : {
              enabled: true
          }
      },
      colors     : ['#4c9bcf', '#da5283','#abb436','#99d58f'],
      labels     : this.data.newVsReturning.labels,
      plotOptions: {
          pie: {
              customScale  : 1,
              expandOnClick: false,
              donut        : {
                  size: '70%'
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
      tooltip    : {
          enabled        : true,
          fillSeriesColor: false,
          theme          : 'dark',
          custom         : ({
                                seriesIndex,
                                w
                            }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                              <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                              <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                              <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                          </div>`
      }
  };
    this.chartBudgetDistribution = {
      chart      : {
          fontFamily: 'inherit',
          foreColor : 'inherit',
          height    : '100%',
          type      : 'bar',
          sparkline : {
              enabled: true
          }
      },
      colors     : ['#818CF8'],
      dataLabels : {
          enabled   : true,
          formatter : (val: number): string | number => `${val}`,
          textAnchor: 'start',
          style     : {
              fontSize  : '13px',
              fontWeight: 500
          },
          background: {
              borderWidth: 0,
              padding    : 4
          },
          offsetY   : -15
      },
      markers    : {
          strokeColors: '#818CF8',
          strokeWidth : 4
      },
      plotOptions: {
          radar: {
              polygons: {
                  strokeColors   : 'var(--fuse-border)',
                  connectorColors: 'var(--fuse-border)'
              }
          },
      },
      series     : this.data.budgetDistribution.series,
      stroke     : {
          width: 2
      },
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
                  fontSize  : '12px',
                  fontWeight: '500'
              }
          },
          categories: this.data.budgetDistribution.categories
      },
      yaxis      : {
          max       : (max: number): number => parseInt((max).toFixed(0), 10),
          tickAmount: 7
      }
  };

  }

}
