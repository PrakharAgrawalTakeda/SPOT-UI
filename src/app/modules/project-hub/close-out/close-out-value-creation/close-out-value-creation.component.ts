import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from '../../project-hub.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-close-out-value-creation',
  templateUrl: './close-out-value-creation.component.html',
  styleUrls: ['./close-out-value-creation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CloseOutValueCreationComponent implements OnInit {
  ValueCaptureForm = new FormGroup({
    valueCaptureStart: new FormControl(''),
    primaryValueDriver: new FormControl(''),
    COPcategory: new FormControl(''),
    valueCommentary: new FormControl(''),

  })
  @Input() optionType: 'recommended-option'
  localCurrency: string = ""
  valuecreationngxdata: any = []
  viewContent:boolean = false
  id:string = ""
  lookupData = []
  filterData:any = []
  kpi= []
  columnYear = []
  yearData = []
  projectsMetricsData = []
  isStrategicInitiative = false
  @ViewChild('valuecreationTable') table: any;
  constructor(private router: Router, public projectApiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public auth: AuthService,public indicator: SpotlightIndicatorsService,
    private portApiService: PortfolioApiService, public projecthubservice: ProjectHubService, public fuseAlert: FuseConfirmationService){

  }
  ngOnInit():void{
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    if(this.optionType == 'recommended-option')
    {
      this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id")
    }
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
              console.log("Metric Data : " + res)
            this.kpi = kpi
          this.lookupData = resp
          this.filterData = filterres
          console.log(res.projectsMetricsData)
          this.localCurrency = currency.localCurrencyAbbreviation

          res.forEach((element)=>{
            var format = element.metricData.metricFormatID ? this.lookupData.find(x => x.lookUpId == element.metricData.metricFormatID).lookUpName : ''
            var order = element.metricData.metricFormatID ? this.lookupData.find(x => x.lookUpId == element.metricData.metricFormatID).lookUpOrder : ''
            element.metricData.PO = element.metricData.metricPortfolioID ? 0 : 1
            element.metricData.metricFormat = format
            element.metricData.sortOrder = order
            element.metricData.FianncialType1 = "Target"
            element.metricData.FianncialType2 = "Baseline Plan"
            element.metricData.FianncialType3 = "Current Plan"
            element.metricData.FianncialType4 = "Actual"
            element.metricData.parentName = element.projectsMetricsData.parentProjectId ? parentData.problemTitle : ''
            this.projectsMetricsData.push({...element.metricData, ...element.projectsMetricsData})
      })
        
          this.ValueCaptureForm.patchValue({
            valueCaptureStart: problemCapture.financialRealizationStartDate,
            primaryValueDriver: problemCapture.primaryKpi && this.lookupData.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474').find(x => x.lookUpId == problemCapture.primaryKpi) ? this.lookupData.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474').find(x => x.lookUpId == problemCapture.primaryKpi).lookUpName : 
            problemCapture.primaryKpi ? this.kpi.find(x => x.kpiid == problemCapture.primaryKpi).kpiname : '',
            valueCommentary: problemCapture.valueCommentary,
            COPcategory: this.lookupData.find(x => x.lookUpId == problemCapture.copImpactCategory) ? this.lookupData.find(x => x.lookUpId == problemCapture.copImpactCategory)?.lookUpName : null
          })
          this.isStrategicInitiative = problemCapture.problemType == 'Strategic Initiative / Program' ? true : false
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
          // year = [...new Set(res[0].projectsMetricsDataYearly.map(item => item.financialYearId))]
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
// })
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
      return 'Local'
    }
  }
  getFrozenHeaderClassID(): any {
    return ' frozen-header-classID';
  }
  getFrozenHeaderClass(): any {
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

  openVC() {
    var message = "";
      message = "The details can be edited only in the Value Creation page. Do you want to leave this page and switch to the Value Creation page?"

    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you sure?",
      "message": message,
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Go to Value Creation",
          // "color": "warn"
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
        this.router.navigate([`./project-hub/` + this.id + `/value-creation`]);
      }
    }
    )
  }
}
