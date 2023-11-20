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
  valuecreationngxdata: any = []
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
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute, 
    public indicator: SpotlightIndicatorsService, private portApiService: PortfolioApiService, public fuseAlert: FuseConfirmationService) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res) {
        this.dataloader()
      }
    })
    this.projecthubservice.isNavChanged.subscribe(res => {
      if (res) {
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
    
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getMetricProjectData(this.id).then((res: any) => {
      this.auth.lookupMaster().then((resp: any) => {
        this.apiService.getfilterlist().then(filterres => {
          this.auth.KPIMaster().then((kpi: any) => {
            this.portApiService.getOnlyLocalCurrency(this.id).then((currency: any) => {
              console.log(res)
              console.log(currency)
              this.localCurrency = currency ? currency.localCurrencyAbbreviation : ''

            this.kpi = kpi
            console.log(this.kpi)
            console.log(res.projectsMetricsData)
          this.lookupData = resp
          this.filterData = filterres
          res.projectsMetricsData.forEach((element)=>{
                element.metricCategoryId = null
                element.metricName = ""
                element.helpText = ""
                element.metricPortfolioID = null
                element.metricUnit = ""
                element.metricTypeID = null
                element.metricFormat = ""
                element.FianncialType1 = "Target"
                element.FianncialType2 = "Baseline Plan"
                element.FianncialType3 = "Current Plan"
                element.FianncialType4 = "Actual"
            res.allMetrics.forEach((el)=>{
              if(element.metricId == el.metricID){
                var format = el.metricFormatID ? this.lookupData.find(x => x.lookUpId == el.metricFormatID).lookUpName : ''
                element.metricCategoryId = el.metricCategoryID
                element.metricName = el.metricName
                element.helpText = el.helpText
                element.metricPortfolioID = el.metricPortfolioID
                element.metricUnit = el.metricUnit
                element.metricTypeID = el.metricTypeID
                element.metricFormat = format
                element.strategicTarget = element.strategicTarget ? element.strategicTarget : '0'
                element.strategicBaseline = element.strategicBaseline ? element.strategicBaseline : '0'
                element.strategicCurrent = element.strategicCurrent ? element.strategicCurrent : '0'
                element.strategicActual =element.strategicActual ? element.strategicActual : '0'
              }
            })
          })
          this.ValueCaptureForm.patchValue({
            valueCaptureStart: res.problemCapture.financialRealizationStartDate ? res.problemCapture.financialRealizationStartDate : '',
            primaryValueDriver: res.problemCapture.primaryKpi && this.lookupData.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474').find(x => x.lookUpId == res.problemCapture.primaryKpi) ? this.lookupData.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474').find(x => x.lookUpId == res.problemCapture.primaryKpi).lookUpName : 
            res.problemCapture.primaryKpi ? this.kpi.find(x => x.kpiid == res.problemCapture.primaryKpi).kpiname : '',
            valueCommentary: res.problemCapture.valueCommentary
          })
          console.log(this.ValueCaptureForm.getRawValue())
          var year = []
          var yearList=[]
          
          year = [...new Set(res.projectsMetricsDataYearly.map(item => item.financialYearId))]
          for(var i=0;i<year.length;i++){
            var yearName = year[i] ? this.lookupData.find(x => x.lookUpId == year[i]).lookUpName : ''
            this.columnYear.push({year: yearName})
            yearList.push(yearName)
          }
          yearList.sort()
          for(var i=0;i<res.projectsMetricsData.length;i++){
            for(var j=0;j<yearList.length;j++){
              res.projectsMetricsData[i][yearList[j]] = [{'target':"0",'baseline':"0",'actual':"0",'current':"0"}]
              if(res.projectsMetricsData[i].strategicBaselineList){
                var data = res.projectsMetricsData[i].strategicBaselineList.split(',')
                for(var z=0;z<data.length;z++){
                  var list = data[z].split(' ')
                  if(list[1].replace(':','') == yearList[j].replace(' 20','')){
                    res.projectsMetricsData[i][yearList[j]][0].baseline = list[2]
                  }
                }
              }
            }
          };
          this.compare(this.columnYear)
          this.valuecreationngxdata = res.projectsMetricsData
          console.log(this.valuecreationngxdata)
          // this.valuecreationngxdata = res.projectsMetricsDataYearly
          this.ValueCaptureForm.disable()
          this.viewContent = true
      })
    })
    })
  })
})
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
    return ' frozen-header-class2';
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
              // this.apiService.updateProjectMetrics(this.id, updatedMetricsData)
      //   .then(response => {
      //     console.log('Update successful', response);

      //   })


        // // Iterate over all keys of the metricData object
        // Object.keys(metricData).forEach(key => {
        //   // Check if the key is a fiscal year
        //   if (/^FY \d+$/.test(key)) {
        //     // This key represents a fiscal year
        //     metricData[key].forEach(data => {
        //      data.baseline = data.current;
        //      console.log(data.baseline)
        //     });
        //   }
        // });
      })
      console.log(this.valuecreationngxdata)


      }
  })
}

}
