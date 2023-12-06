import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';


@Component({
  selector: 'app-project-benefits',
  templateUrl: './project-benefits.component.html',
  styleUrls: ['./project-benefits.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectBenefitsComponent implements OnInit {
   ValueCaptureForm = new FormGroup({
    valueCaptureStart: new FormControl(''),
    primaryValueDriver: new FormControl(''),
    valueCommentary: new FormControl('')
  })
  @Input() valuecreationngxdata: any = []
  //valuecreationngxdata: any = []
  viewContent:boolean = false
  id:string = ""
  lookupData = []
  filterData:any = []
  kpi= []
  columnYear = []
  viewHisOpPerformance: boolean = false;
  bulkEditType: string = 'OperationalPerformanceBulkEdit';
  baselinePlan: string = 'BaselinePlan';
    @ViewChild('valuecreationTable') table: any;
    localCurrency: string = ""
  valueCreation: any;
  projectsMetricsData = []
  constructor(public projectApiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute, 
    public indicator: SpotlightIndicatorsService, private portApiService: PortfolioApiService, public fuseAlert: FuseConfirmationService) {
      this.projecthubservice.submitbutton.subscribe(res => {
        if (res) {
          console.log(res)
          this.ngOnInit()
        }
      })
  }

  ngOnInit(): void {
    
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
     // Clear the arrays before populating
     this.columnYear = [];
     this.projectsMetricsData = [];
    this.projectApiService.getMetricProjectData(this.id).then((res: any) => {
      var parentId = ''
      var parentData: any
      for(var i=0;i<res.length;i++){
        if(res[i].projectsMetricsData.parentProjectId != null){
          parentId = res[i].projectsMetricsData.parentProjectId
          break;
        }
      }
      if(parentId != ''){
      this.projectApiService.getproject(parentId).then((parent: any) => {
        parentData = parent
      })
      }
      this.projectApiService.getproject(this.id).then((problemCapture: any) => {
      this.auth.lookupMaster().then((resp: any) => {
        this.projectApiService.getfilterlist().then(filterres => {
          this.auth.KPIMaster().then((kpi: any) => {
            this.portApiService.getOnlyLocalCurrency(this.id).then((currency: any) => {

              console.log(res)
              console.log(currency)
              this.localCurrency = currency ? currency.localCurrencyAbbreviation : ''
console.log(problemCapture)
            this.kpi = kpi
            console.log(this.kpi)
            console.log(res.projectsMetricsData)
          this.lookupData = resp
          this.filterData = filterres
          // res.projectsMetricsData.forEach((element)=>{
          //       element.metricCategoryId = null
          //       element.metricName = ""
          //       element.helpText = ""
          //       element.metricPortfolioID = null
          //       element.metricUnit = ""
          //       element.metricTypeID = null
          //       element.metricFormat = ""
          //       element.FianncialType1 = "Target"
          //       element.FianncialType2 = "Baseline Plan"
          //       element.FianncialType3 = "Current Plan"
          //       element.FianncialType4 = "Actual"
          //   res.allMetrics.forEach((el)=>{
          //     if(element.metricId == el.metricID){
          //       var format = el.metricFormatID ? this.lookupData.find(x => x.lookUpId == el.metricFormatID).lookUpName : ''
          //       element.metricCategoryId = el.metricCategoryID
          //       element.metricName = el.metricName
          //       element.helpText = el.helpText
          //       element.metricPortfolioID = el.metricPortfolioID
          //       element.metricUnit = el.metricUnit
          //       element.metricTypeID = el.metricTypeID
          //       element.metricFormat = format
          //       element.strategicTarget = element.strategicTarget ? element.strategicTarget : '0'
          //       element.strategicBaseline = element.strategicBaseline ? element.strategicBaseline : '0'
          //       element.strategicCurrent = element.strategicCurrent ? element.strategicCurrent : '0'
          //       element.strategicActual =element.strategicActual ? element.strategicActual : '0'
          //     }
          //   })
          // })
          res.forEach((element)=>{
            var format = element.metricData.metricFormatID ? this.lookupData.find(x => x.lookUpId == element.metricData.metricFormatID).lookUpName : ''
            element.metricData.metricFormat = format
            element.metricData.FianncialType1 = "Target"
            element.metricData.FianncialType2 = "Baseline Plan"
            element.metricData.FianncialType3 = "Current Plan"
            element.metricData.FianncialType4 = "Actual"
            element.metricData.parentName = element.projectsMetricsData.parentProjectId ? parentData.problemTitle : ''
            this.projectsMetricsData.push({...element.metricData, ...element.projectsMetricsData})
      })
      console.log(problemCapture)
      this.ValueCaptureForm.patchValue({
          valueCaptureStart: problemCapture.financialRealizationStartDate,
            primaryValueDriver: this.lookupData.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474').find(x => x.lookUpId == problemCapture.primaryKpi) ? this.lookupData.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474').find(x => x.lookUpId == problemCapture.primaryKpi).lookUpName : null,
            valueCommentary: problemCapture.valueCommentary
      })
          console.log(this.ValueCaptureForm.getRawValue())
          var year = []
          var yearList=[]
          
          if(res.length > 0){
            for(var z=0;z<res.length;z++){
              if(res[z].projectsMetricsDataYearly.length > 0){
                var listYear = [...new Set(res[z].projectsMetricsDataYearly.map(item => item.financialYearId))]
                if(listYear.length > year.length){
                  year = listYear
                }
              }
            }
            for(var i=0;i<year.length;i++){
              var yearName = year[i] ? this.lookupData.find(x => x.lookUpId == year[i]).lookUpName : ''
              this.columnYear.push({year: yearName})
              yearList.push(yearName)
            }
            yearList.sort()
            for(var i=0;i<this.projectsMetricsData.length;i++){
              for(var j=0;j<yearList.length;j++){
                var baseline = 0
                var actual = 0
                var target = 0
                var current = 0
                this.projectsMetricsData[i][yearList[j]] = [{'target':"0",'baseline':"0",'actual':"0",'current':"0"}]
                if(this.projectsMetricsData[i].strategicBaselineList){
                  var data = this.projectsMetricsData[i].strategicBaselineList.split(',')
                  for(var z=0;z<data.length;z++){
                    var list = data[z].split(' ')
                    baseline = baseline + Number(list[2])
                    if(this.projectsMetricsData[i].metricFormat == "Currency (local)"){
                      this.projectsMetricsData[i].strategicBaseline = baseline.toString()
                    }
                    if(list[1].replace(':','') == yearList[j].replace(' 20','')){
                      this.projectsMetricsData[i][yearList[j]][0].baseline = list[2]
                    }
                  }
                }
                if(this.projectsMetricsData[i].strategicCurrentList){
                  var data = this.projectsMetricsData[i].strategicCurrentList.split(',')
                  for(var z=0;z<data.length;z++){
                    var list = data[z].split(' ')
                    current = current + Number(list[2])
                    if(this.projectsMetricsData[i].metricFormat == "Currency (local)"){
                      this.projectsMetricsData[i].strategicCurrent = current.toString()
                    }
                    if(list[1].replace(':','') == yearList[j].replace(' 20','')){
                      this.projectsMetricsData[i][yearList[j]][0].current = list[2]
                    }
                  }
                }
                if(this.projectsMetricsData[i].strategicActualList){
                  var data = this.projectsMetricsData[i].strategicActualList.split(',')
                  for(var z=0;z<data.length;z++){
                    var list = data[z].split(' ')
                    actual = actual + Number(list[2])
                    if(this.projectsMetricsData[i].metricFormat == "Currency (local)"){
                      this.projectsMetricsData[i].strategicActual = actual.toString()
                    }
                    if(list[1].replace(':','') == yearList[j].replace(' 20','')){
                      this.projectsMetricsData[i][yearList[j]][0].actual = list[2]
                    }
                  }
                }
                if(this.projectsMetricsData[i].strategicTargetList){
                  var data = this.projectsMetricsData[i].strategicTargetList.split(',')
                  for(var z=0;z<data.length;z++){
                    var list = data[z].split(' ')
                    target = target + Number(list[2])
                    if(this.projectsMetricsData[i].metricFormat == "Currency (local)"){
                      this.projectsMetricsData[i].strategicTarget = target.toString()
                    }
                    if(list[1].replace(':','') == yearList[j].replace(' 20','')){
                      this.projectsMetricsData[i][yearList[j]][0].target = list[2]
                    }
                  }
                }
              }
            };
          }
            this.compare(this.columnYear)
            this.valuecreationngxdata = this.projectsMetricsData
            if (!res.projectsMetricsDataYearly || res.projectsMetricsDataYearly.length === 0) {
              const fiscalYear = this.getFiscalYearFromDate(problemCapture.financialRealizationStartDate);
              this.initializeFinancialDataForYear(fiscalYear, this.projectsMetricsData);
              // Push this year to columnYear if not already present
              if (!this.columnYear.some(yearObj => yearObj.year === fiscalYear)) {
                this.columnYear.push({ year: fiscalYear });
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

  private initializeFinancialDataForYear(fiscalYear: string, metricsData: any[]): void {
    metricsData.forEach(metric => {
      // Initialize year structure if not exist
      if (!metric[fiscalYear]) {
        metric[fiscalYear] = [{
          target: "0",
          baseline: "0",
          actual: "0",
          current: "0"
        }];
      }
    });
  }
  
  

  private getFiscalYearFromDate(dateString: string): string {
    const date = new Date(dateString);
    let year = date.getFullYear();
    if (date.getMonth() < 3) { // January, February, March
      year--; // Fiscal year is the previous year
    }
    return `FY ${year}`;
  }
  
  

  getLookup(id: any){
    return id && id.lookUpId != '' ? this.lookupData.find(x => x.lookUpId == id).lookUpName : ''
  }
  compare( array: any ): any {
    return array.length > 1 ? array.sort((a, b) => {
      if ( a.year < b.year ){
        return -1;
      }
      if ( a.year > b.year ){
        return 1;
      }
      return 0;
    }) : array
  }
  getOwner(id:any, type:any){
    if(type && type.lookupId != '' && id && id.lookUpId != ''){
      if(type == 'e7a9e055-1319-4a4f-b929-cd7777599e39'){
        return 'Global'
      }
      else{
        return this.filterData.portfolioOwner.find(x => x.portfolioOwnerId == id).portfolioOwner
      }
    }
    else{
      return ''
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
  columnstyle(): any{
    return ' column-style';
  }
  getFrozenID(): any{
    return ' frozen-header-ID'
  }

  openOperationalPerformance(){
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

        })
      })
      console.log(this.valuecreationngxdata)


      }
  })
}

}
