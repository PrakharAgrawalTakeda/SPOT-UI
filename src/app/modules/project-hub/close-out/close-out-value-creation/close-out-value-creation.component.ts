import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-close-out-value-creation',
  templateUrl: './close-out-value-creation.component.html',
  styleUrls: ['./close-out-value-creation.component.scss']
})
export class CloseOutValueCreationComponent implements OnInit {
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
  @ViewChild('valuecreationTable') table: any;
  constructor(public projectApiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public auth: AuthService){

  }
  ngOnInit():void{
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.projectApiService.getMetricProjectData(this.id).then((res: any) => {
      this.auth.lookupMaster().then((resp: any) => {
        this.projectApiService.getfilterlist().then(filterres => {
          this.auth.KPIMaster().then((kpi: any) => {
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
                element.FianncialType4 = "Actuaal"
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
            valueCaptureStart: res.problemCapture.financialRealizationStartDate,
            primaryValueDriver: this.kpi.find(x => x.kpiid == res.problemCapture.primaryKpi).kpiname,
            valueCommentary: res.problemCapture.valueCommentary
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
          // this.valuecreationngxdata = res.projectsMetricsDataYearly
          this.ValueCaptureForm.disable()
          this.viewContent = true
      })
    })
    })
  })
  }

  getLookup(id: any){
    return id && id.lookUpId != '' ? this.lookupData.find(x => x.lookUpId == id).lookUpName : ''
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
}


// Status Id = 2A4E375B-B9F8-4647-B4CB-71268B52A938
// Category Id = 999572a6-5aa8-4760-8082-c06774a17474
// value capture = 243a9492-720d-42df-823e-ae7eb4d3ae45
// value capture = metric level id
// empty column = d3926d90-9fa9-4e3c-a7fb-667737739c43
// empty column = financialTypeId