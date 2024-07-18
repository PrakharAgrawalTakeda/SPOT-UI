import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-project-benefits',
  templateUrl: './project-benefits.component.html',
  styleUrls: ['./project-benefits.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectBenefitsComponent implements OnInit, OnDestroy {
  ValueCaptureForm = new FormGroup({
    valueCaptureStart: new FormControl(''),
    primaryValueDriver: new FormControl(''),
    COPcategory: new FormControl(''),
    valueCommentary: new FormControl('')
  })
  @Input() valuecreationngxdata: any = []
  //valuecreationngxdata: any = []
  viewContent: boolean = false
  id: string = ""
  lookupData = []
  filterData: any = []
  kpi = []
  columnYear = []
  viewHisOpPerformance: boolean = false;
  isStrategicInitiative = false
  bulkEditType: string = 'OperationalPerformanceBulkEdit';
  baselinePlan: string = 'BaselinePlan';
  @ViewChild('valuecreationTable') table: any;
  localCurrency: string = ""
  valueCreation: any;
  projectsMetricsData = []
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(public projectApiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute,
    public indicator: SpotlightIndicatorsService, private portApiService: PortfolioApiService, public fuseAlert: FuseConfirmationService) {
    this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (this.viewContent == true) {
        this.ngOnInit()

      }
    })


  }

  ngOnInit(): void {
    this.columnYear = [];
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    // Clear the arrays before populating


    this.projectsMetricsData = [];
    this.projectApiService.getMetricProjectData(this.id).then((res: any) => {
      var parentId = ''
      var parentData: any
      for (var i = 0; i < res.length; i++) {
        if (res[i].projectsMetricsData.parentProjectId != null) {
          parentId = res[i].projectsMetricsData.parentProjectId
          break;
        }
      }
      if (parentId != '') {
        this.projectApiService.getproject(parentId).then((parent: any) => {
          parentData = parent
        })
      }
      console.log(this.columnYear)
      this.projectApiService.getproject(this.id).then((problemCapture: any) => {
        this.auth.lookupMaster().then((resp: any) => {
          this.projectApiService.getfilterlist().then(filterres => {
            this.auth.KPIMaster().then((kpi: any) => {
              this.portApiService.getOnlyLocalCurrency(this.id).then((currency: any) => {
                //debugger
                console.log(this.columnYear)
                console.log(currency)
                this.localCurrency = currency ? currency.localCurrencyAbbreviation : ''
                console.log(problemCapture)
                this.kpi = kpi
                console.log(this.kpi)
                console.log(res)
                console.log(resp)
                this.lookupData = resp
                this.filterData = filterres
                res.forEach((element) => {
                  if (element.metricData) {
                    var format = element.metricData.metricFormatID ? this.lookupData.find(x => x.lookUpId == element.metricData.metricFormatID)?.lookUpName : ''
                    var order = element.metricData.metricFormatID ? this.lookupData.find(x => x.lookUpId == element.metricData.metricFormatID)?.lookUpOrder : ''
                    element.metricData.metricFormat = format
                    element.metricData.PO = element.metricData.metricPortfolioID ? 0 : 1
                    element.metricData.sortOrder = order
                    element.metricData.FianncialType1 = "Target"
                    element.metricData.FianncialType2 = "Baseline Plan"
                    element.metricData.FianncialType3 = "Current Plan"
                    element.metricData.FianncialType4 = "Actual"
                    element.metricData.parentName = element.projectsMetricsData.parentProjectId ? parentData.problemTitle : ''
                    if (element.projectsMetricsData.strategicTargetList) {
                      element.projectsMetricsData.strategicTargetList = element.projectsMetricsData.strategicTargetList.replace(/FY19:/g, 'Historical:');
                    }
                    if (element.projectsMetricsData.strategicBaselineList) {
                      element.projectsMetricsData.strategicBaselineList = element.projectsMetricsData.strategicBaselineList.replace(/FY19:/g, 'Historical:');
                    }
                    if (element.projectsMetricsData.strategicCurrentList) {
                      element.projectsMetricsData.strategicCurrentList = element.projectsMetricsData.strategicCurrentList.replace(/FY19:/g, 'Historical:');
                    }
                    if (element.projectsMetricsData.strategicActualList) {
                      element.projectsMetricsData.strategicActualList = element.projectsMetricsData.strategicActualList.replace(/FY19:/g, 'Historical:');
                    }
                    // Initialize null values to "0"
                    element.projectsMetricsData.strategicTarget = element.projectsMetricsData.strategicTarget ?? "0";
                    element.projectsMetricsData.strategicBaseline = element.projectsMetricsData.strategicBaseline ?? "0";
                    element.projectsMetricsData.strategicCurrent = element.projectsMetricsData.strategicCurrent ?? "0";
                    element.projectsMetricsData.strategicActual = element.projectsMetricsData.strategicActual ?? "0";

                    this.projectsMetricsData.push({ ...element.metricData, ...element.projectsMetricsData });
                  }

                })
                console.log(problemCapture)
                const primaryValueDriver = this.lookupData.find(x => x.lookUpId == problemCapture.primaryKpi)?.lookUpName || null;
                const copCategory = this.lookupData.find(x => x.lookUpId == problemCapture.copImpactCategory)?.lookUpName || null;
                const defaultCopCategory = this.lookupData.find(x => x.lookUpId == '2730422E-680A-4B2D-8DC2-F64CA885BB61')?.lookUpName || null;

                this.ValueCaptureForm.patchValue({
                  valueCaptureStart: problemCapture.financialRealizationStartDate,
                  primaryValueDriver: primaryValueDriver,
                  valueCommentary: problemCapture.valueCommentary,
                  COPcategory: copCategory || defaultCopCategory
                });
                // const primaryValueDriver = this.lookupData.find(x => x.lookUpId == problemCapture.primaryKpi)?.lookUpName || null;
                // const copCategory = this.lookupData.find(x => x.lookUpId == problemCapture.copImpactCategory)?.lookUpName || null;

                // this.ValueCaptureForm.patchValue({
                //   valueCaptureStart: problemCapture.financialRealizationStartDate,
                //   primaryValueDriver: primaryValueDriver,
                //   valueCommentary: problemCapture.valueCommentary,
                //   COPcategory: copCategory
                // });

                // if (!this.ValueCaptureForm.value.COPcategory) {
                //   const defaultCopCategory = this.lookupData.find(x => x.lookUpId == '2730422E-680A-4B2D-8DC2-F64CA885BB61')?.lookUpName || null;
                //   this.ValueCaptureForm.controls.COPcategory.patchValue(defaultCopCategory);
                // }
                // this.ValueCaptureForm.patchValue({
                //   valueCaptureStart: problemCapture.financialRealizationStartDate,
                //   primaryValueDriver: this.lookupData.find(x => x.lookUpId == problemCapture.primaryKpi) ? this.lookupData.find(x => x.lookUpId == problemCapture.primaryKpi)?.lookUpName : null,
                //   valueCommentary: problemCapture.valueCommentary,
                //   COPcategory: this.lookupData.find(x => x.lookUpId == problemCapture.copImpactCategory) ? this.lookupData.find(x => x.lookUpId == problemCapture.copImpactCategory)?.lookUpName : null
                // })

                // if (this.ValueCaptureForm.value.COPcategory == "" || this.ValueCaptureForm.value.COPcategory == null) {
                //   this.ValueCaptureForm.controls.COPcategory.patchValue(this.lookupData.find(x => x.lookUpId == '2730422E-680A-4B2D-8DC2-F64CA885BB61').lookUpName)
                // }
                this.isStrategicInitiative = problemCapture.problemType == 'Strategic Initiative / Program' ? true : false

                console.log(this.ValueCaptureForm.getRawValue())
                var year = []
                var yearList = []
                console.log(res)

                if (res.length > 0) {
                  for (var z = 0; z < res.length; z++) {
                    if (res[z].projectsMetricsDataYearly.length > 0) {
                      var listYear = [...new Set(res[z].projectsMetricsDataYearly.map(item => item.financialYearId))]
                      if (listYear.length > year.length) {
                        year = listYear
                      }
                    }
                    console.log(year)
                  }
                  for (var i = 0; i < year.length; i++) {
                    var yearName = year[i] ? this.lookupData.find(x => x.lookUpId == year[i])?.lookUpName : ''
                    this.columnYear.push({ year: yearName })
                    yearList.push(yearName)
                  }
                  yearList.sort()
                  for (var i = 0; i < this.projectsMetricsData.length; i++) {
                    for (var j = 0; j < yearList.length; j++) {
                      var baseline = 0
                      var actual = 0
                      var target = 0
                      var current = 0
                      this.projectsMetricsData[i][yearList[j]] = [{ 'target': "0", 'baseline': "0", 'actual': "0", 'current': "0" }]
                      if (this.projectsMetricsData[i].strategicBaselineList) {
                        var data = this.projectsMetricsData[i].strategicBaselineList.split(',')
                        for (var z = 0; z < data.length; z++) {
                          var list = data[z].split(' ')
                          baseline = baseline + Number(list[2])
                          if (this.projectsMetricsData[i].metricFormat == "Currency (local)") {
                            this.projectsMetricsData[i].strategicBaseline = baseline.toString()
                          }
                          if (list[1].replace(':', '') == yearList[j].replace(' 20', '')) {
                            this.projectsMetricsData[i][yearList[j]][0].baseline = list[2]
                          }
                        }
                      }
                      if (this.projectsMetricsData[i].strategicCurrentList) {
                        var data = this.projectsMetricsData[i].strategicCurrentList.split(',')
                        for (var z = 0; z < data.length; z++) {
                          var list = data[z].split(' ')
                          current = current + Number(list[2])
                          if (this.projectsMetricsData[i].metricFormat == "Currency (local)") {
                            this.projectsMetricsData[i].strategicCurrent = current.toString()
                          }
                          if (list[1].replace(':', '') == yearList[j].replace(' 20', '')) {
                            this.projectsMetricsData[i][yearList[j]][0].current = list[2]
                          }
                        }
                      }
                      if (this.projectsMetricsData[i].strategicActualList) {
                        var data = this.projectsMetricsData[i].strategicActualList.split(',')
                        for (var z = 0; z < data.length; z++) {
                          var list = data[z].split(' ')
                          actual = actual + Number(list[2])
                          if (this.projectsMetricsData[i].metricFormat == "Currency (local)") {
                            this.projectsMetricsData[i].strategicActual = actual.toString()
                          }
                          if (list[1].replace(':', '') == yearList[j].replace(' 20', '')) {
                            this.projectsMetricsData[i][yearList[j]][0].actual = list[2]
                          }
                        }
                      }
                      if (this.projectsMetricsData[i].strategicTargetList) {
                        var data = this.projectsMetricsData[i].strategicTargetList.split(',')
                        for (var z = 0; z < data.length; z++) {
                          var list = data[z].split(' ')
                          target = target + Number(list[2])
                          if (this.projectsMetricsData[i].metricFormat == "Currency (local)") {
                            this.projectsMetricsData[i].strategicTarget = target.toString()
                          }
                          if (list[1].replace(':', '') == yearList[j].replace(' 20', '')) {
                            this.projectsMetricsData[i][yearList[j]][0].target = list[2]
                          }
                        }
                      }
                    }
                  };
                }
                this.compare(this.columnYear)
                this.valuecreationngxdata = this.projectsMetricsData
                console.log(this.columnYear)
                console.log(this.projectsMetricsData)
                if (!res.projectsMetricsDataYearly || res.projectsMetricsDataYearly.length === 0) {
                  const fiscalYear = this.getFiscalYearFromDate(problemCapture.financialRealizationStartDate);
                  console.log(fiscalYear)
                  if (fiscalYear === "Historical") {
                    this.initializeFinancialDataForYear("Historical", this.projectsMetricsData);
                  }
                  else {
                    this.initializeFinancialDataForYear(fiscalYear, this.projectsMetricsData);
                  }
                  // Push this year to columnYear if not already present
                  if (!this.columnYear.some(yearObj => yearObj.year === fiscalYear)) {
                    this.columnYear.push({ year: fiscalYear });
                  }
                }
                //this.columnYear.sort((a, b) => a.year.localeCompare(b.year));
                this.sortColumnYears()
                console.log(this.columnYear)
                const isHistorical = this.isBeforeFY2020(problemCapture.financialRealizationStartDate);
                if (isHistorical) {
                  // Check if "Historical" already exists in this.columnYear
                  const historicalExists = this.columnYear.find(entry => entry.year === "Historical");

                  // If "Historical" does not exist, add it as the first entry
                  if (!historicalExists) {
                    this.columnYear.unshift({ year: "Historical" });
                  }
                }
                this.ValueCaptureForm.disable()
                this.viewContent = true
              })
            })
          })
        })
      })
    })
  }

  private sortColumnYears(): void {
    this.columnYear.sort((a, b) => {
      // Ensure "Historical" always comes first
      if (a.year === "Historical") return -1;
      if (b.year === "Historical") return 1;
      // Then sort other years as usual
      return a.year.localeCompare(b.year);
    });
  }


  private isBeforeFY2020(dateString: string): boolean {
    if (dateString) {
      const date = new Date(dateString);
      const fiscalYearStart = new Date(date.getFullYear(), 3, 1); // FY starts in April
      if (date < fiscalYearStart) {
        return date.getFullYear() < 2020;
      }
      return date.getFullYear() - 1 < 2020;
    }

  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  private initializeFinancialDataForYear(fiscalYear: string, metricsData: any[]): void {

    metricsData.forEach(metric => {
      // Check if the fiscal year is "Historical" and treat it as "FY 2019" only within this context
      const yearKey = fiscalYear == "Historical" ? "Historical" : fiscalYear;

      // Initialize the year structure if it does not exist
      if (!metric[yearKey]) {
        metric[yearKey] = [{
          target: "0",
          baseline: "0",
          actual: "0",
          current: "0"
        }];
      }
    });
  }




  private getFiscalYearFromDate(dateString: string): string {
    let date;
    let year;

    if (dateString != null) {
      date = new Date(dateString);
      year = date.getFullYear();
      if (date.getMonth() < 3) { // January, February, March
        year--; // Fiscal year is the previous year
      }
    } else {
      date = new Date();
      year = date.getFullYear();
      if (date.getMonth() < 3) { // For consistency, also consider the fiscal year in the current year
        year--;
      }
    }

    // If the year is before 2020, return "Historical"
    if (year < 2020) {
      return "Historical";
    }

    return `FY ${year}`;
  }




  getLookup(id: any) {
    return id && id.lookUpId != '' ? this.lookupData.find(x => x.lookUpId == id)?.lookUpName : ''
  }
  compare(array: any): any {
    return array.length > 1 ? array.sort((a, b) => {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    }) : array
  }
  getOwner(id: any, type: any) {
    if (type && type.lookupId != '' && id && id.lookUpId != '') {
      if (type == 'e7a9e055-1319-4a4f-b929-cd7777599e39') {
        return 'Global'
      }
      else {
        return this.filterData.portfolioOwner.find(x => x.portfolioOwnerId == id).portfolioOwner
      }
    }
    else {
      return 'Local'
    }
  }
  getFrozenHeaderClassID(): any {
    return ' frozen-header-classID';
  }
  getFrozenHeaderClass(): any {
    return ' frozen-header-class';
  }
  getFrozenHeaderClass2(): any {
    return ' frozen-header-class';
  }
  getFrozenClass(): any {
    return ' frozen-header';
  }
  columnstyle(): any {
    return ' column-style';
  }
  getFrozenID(): any {
    return ' frozen-header-ID'
  }

  openOperationalPerformance() {
    this.viewHisOpPerformance = true
    this.viewContent = true
  }

  baselinePlans() {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you sure?",
      "message": "This function will baseline metric(s). Are you sure you want to continue? ",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "OK",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const baselinePlanAlert = this.fuseAlert.open(comfirmConfig)
    baselinePlanAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.valuecreationngxdata.forEach(metricData => {
          this.projectApiService.baselineProjectMetricData(this.id)
            .then(response => {
              console.log('Update successful', response);
              this.projecthubservice.submitbutton.next(true)

            })
        })
        console.log(this.valuecreationngxdata)


      }
    })
  }

}
