import { Component, OnInit } from '@angular/core';
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
          this.valuecreationngxdata = res.projectsMetricsData
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