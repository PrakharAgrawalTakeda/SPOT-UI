import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';

@Component({
  selector: 'app-project-benefits',
  templateUrl: './project-benefits.component.html',
  styleUrls: ['./project-benefits.component.scss']
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
    @ViewChild('valuecreationTable') table: any;
  valueCreation: any;
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute, public indicator: SpotlightIndicatorsService) {
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
            this.valueCreation = res
            this.kpi = kpi
          this.lookupData = resp
          this.filterData = filterres
          res.projectsMetricsData.forEach((element)=>{
                element.metricCategoryId = null
                element.metricName = ""
                element.helpText = ""
                element.metricPortfolioID = null
                element.metricUnit = ""
                element.metricTypeID = null
                element.FianncialType1 = "Target"
                element.FianncialType2 = "Baseline Plan"
                element.FianncialType3 = "Current Plan"
                element.FianncialType4 = "Actual"
            res.allMetrics.forEach((el)=>{
              if(element.metricId == el.metricID){
                element.metricCategoryId = el.metricCategoryID
                element.metricName = el.metricName
                element.helpText = el.helpText
                element.metricPortfolioID = el.metricPortfolioID
                element.metricUnit = el.metricUnit
                element.metricTypeID = el.metricTypeID
              }
            })
          })
          this.ValueCaptureForm.patchValue({
            valueCaptureStart: res.problemCapture.financialRealizationStartDate ? res.problemCapture.financialRealizationStartDate : '',
            primaryValueDriver: res.problemCapture.primaryKpi ? this.kpi.find(x => x.kpiid == res.problemCapture.primaryKpi).kpiname : '',
            valueCommentary: res.problemCapture.valueCommentary ? res.problemCapture.valueCommentary : ''
          })
          var year = []
          var baselineYear=[]
          var TargetYear= []
          var ActualYear = []
          var CurrentYear = []
          for(var i=0;i<res.projectsMetricsData.length;i++){
            if(res.projectsMetricsData[i].strategicActualList){
              ActualYear = res.projectsMetricsData[i].strategicActualList.split(' ')
              break;
            }
            else if(res.projectsMetricsData[i].strategicBaselineList){
              baselineYear = res.projectsMetricsData[i].strategicBaselineList.split(' ')
              break;
            }
            else if(res.projectsMetricsData[i].strategicCurrentList){
              CurrentYear = res.projectsMetricsData[i].strategicTargetList.split(' ')
              break;
            }
            else if(res.projectsMetricsData[i].strategicTargetList){
              TargetYear = res.projectsMetricsData[i].strategicTargetList.split(' ')
              break;
            }
            if(ActualYear.length != 0 || baselineYear.length != 0 || CurrentYear.length != 0 || TargetYear.length != 0 ){
              break;
            }
          }
            if(ActualYear.length >= baselineYear.length && ActualYear.length >= CurrentYear.length && ActualYear.length >= TargetYear.length){
              for(var i=1;i<ActualYear.length;i+2){
                this.columnYear.push({year: ActualYear[i], target: "", actual: "", current: "", baseline: ""})
              }
            }
            else if (baselineYear.length >= ActualYear.length && baselineYear.length >= CurrentYear.length && baselineYear.length >= TargetYear.length){
              for(var i=1;i<baselineYear.length;i+=2){
                this.columnYear.push({year: baselineYear[i], target: "", actual: "", current: "", baseline: ""})
              }
            }
            else if(CurrentYear.length >= ActualYear.length && CurrentYear.length >= baselineYear.length && CurrentYear.length >= TargetYear.length){
              for(var i=1;i<CurrentYear.length;i+2){
                this.columnYear.push({year: CurrentYear[i], target: "", actual: "", current: "", baseline: ""})
              }
            }
            else if(TargetYear.length >= ActualYear.length && TargetYear.length >= baselineYear.length && TargetYear.length >= CurrentYear.length){
              for(var i=1;i<TargetYear.length;i+2){
                this.columnYear.push({year: TargetYear[i], target: "", actual: "", current: "", baseline: ""})
              }
            }
          
          this.valuecreationngxdata = res.projectsMetricsData
          this.ValueCaptureForm.disable()
          this.viewContent = true
      })
    })
    })
  })
  }

  getLookup(id: any){
    return id ? this.lookupData.find(x => x.lookUpId == id).lookUpName : ''
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

  openOperationalPerformance(){
    this.viewHisOpPerformance = true
    this.viewContent = true
  }

}
