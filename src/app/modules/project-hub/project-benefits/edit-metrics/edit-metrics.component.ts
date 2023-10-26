import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { AuthService } from 'app/core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-edit-metrics',
  templateUrl: './edit-metrics.component.html',
  styleUrls: ['./edit-metrics.component.scss']
})
export class EditMetricsComponent {
  capexAvoidanceForm = new FormGroup({
    metricCategoryId: new FormControl(''),
    metricName: new FormControl(''),
    metricUnit: new FormControl(''),
    metricDescription: new FormControl(''),
    metricFormat: new FormControl('')
  })
  id: string;
  lookupData: any;

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
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    console.log(this.id)
    //change api to single edit get api
    this.apiService.getMetricProjectData(this.id).then((res: any) => {
      this.auth.lookupMaster().then((resp: any) => {
      console.log(res.projectsMetricsData)
this.lookupData = resp
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
console.log(res.projectsMetricsData)
      this.capexAvoidanceForm.patchValue({
        metricName: res.projectsMetricsData.metricName,
        metricCategoryId: this.lookupData.find(x => x.lookUpId == res.projectsMetricsData.metricCategoryId), 
        metricUnit: res.projectsMetricsData.metricUnit,
        metricDescription: res.allMetrics.metricDescription,
        metricFormat: res.projectsMetricsData.metricFormat
      })
    })
    })
  }
  
  submitnewmetric(){

  }
}
