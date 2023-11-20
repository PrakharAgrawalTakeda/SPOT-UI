import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-new-metrics',
  templateUrl: './new-metrics.component.html',
  styleUrls: ['./new-metrics.component.scss']
})
export class NewMetricsComponent {
  newMetricForm = new FormGroup({
    metricName: new FormControl(null)
  })
  viewContent: boolean = false
  id: string;
  metricName: any;
  metric: any;

  constructor(public projecthubservice: ProjectHubService, public apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public auth: AuthService, private router: Router) {
    this.newMetricForm.controls.metricName.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projecthubservice.isFormChanged = true
      }
    })

  }

  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getvalueCreation(this.id).then((vc: any) => {
      this.auth.lookupMaster().then((lookup: any) => {
        console.log(vc)
        this.metric = vc.projectsMetricsData.find(projectMetric => projectMetric.metricId);

        if (this.metric) {
          this.metricName = vc.allMetrics
            .filter(x => x.metricTypeID === 'e7a9e055-1319-4a4f-b929-cd7777599e39'
              && x.metricID !== this.metric.metricId
              || x.metricPortfolioID === vc.problemCapture.portfolioOwnerId)
            .filter((value, index, self) => self.findIndex(m => m.metricID === value.metricID) === index);
        } else {
          this.metricName = vc.allMetrics
            .filter(x => x.metricTypeID === 'e7a9e055-1319-4a4f-b929-cd7777599e39'
              || x.metricPortfolioID === vc.problemCapture.portfolioOwnerId)
            .filter((value, index, self) => self.findIndex(m => m.metricID === value.metricID) === index);
        }


        this.newMetricForm.controls.metricName.patchValue('')
        this.viewContent = true
        console.log(this.metricName)
      })
    })
  }
  submitnewmetric() {
    this.projecthubservice.isFormChanged = false;

    // Extract the selected primaryKpi value from the form
    const selectedPrimaryKpiValue = this.newMetricForm.get('metricName').value;
    console.log(selectedPrimaryKpiValue)

    // Find the corresponding lookUpId from primaryKPI array
    const selectedPrimaryKpiObject = this.projecthubservice.lookUpMaster.find(x => x.lookUpName == selectedPrimaryKpiValue.lookUpName);

    // Initialize the mainObj
    var mainObj: any = {};

    // Assign other properties to mainObj if needed
    mainObj.primaryValueDriverLookupId = selectedPrimaryKpiObject.lookUpId;
    console.log(mainObj)
    this.apiService.updateReportDates(this.projecthubservice.projectid, "ModifiedDate").then(secondRes => {
      this.projecthubservice.submitbutton.next(true);
      this.projecthubservice.isNavChanged.next(true);
      this.projecthubservice.toggleDrawerOpen('', '', [], '');
    })
  }

  OpenMetricRepo() {
    //this.projecthubservice.toggleDrawerOpen('', '', [], '');
    window.open('my-preference/metric-repository', "_blank")
  }

}
