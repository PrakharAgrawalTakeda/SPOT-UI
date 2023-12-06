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
  //viewContent: boolean = false
  id: string;
  metricName: any;
  metric: any;

  constructor(public projecthubservice: ProjectHubService, public apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public auth: AuthService, private router: Router) {
    // this.newMetricForm.controls.metricName.valueChanges.subscribe(res => {
    //   if (this.viewContent) {
    //     this.projecthubservice.isFormChanged = true
    //   }
    // })

  }

  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getmetricRepo(this.id).then((vc: any) => {
      this.apiService.getproject(this.id).then((pc: any) => {
        this.apiService.singleEditMetricProjectData(this.id, this.projecthubservice.itemid).then((res: any) => {
          this.auth.lookupMaster().then((lookup: any) => {
            // Split execution scope into an array of IDs
            const executionScopeIds = pc.executionScope ? pc.executionScope.split(',').map(id => id.trim()) : '';
            // Combine portfolioOwnerId and executionScopeIds
            const portfolioOwnerId = pc.portfolioOwnerId ? pc.portfolioOwnerId : '';
            const relevantIds = [portfolioOwnerId, ...executionScopeIds];
            // If res exists and has metricData, filter out already existing metrics
            if (res && res.length > 0) {
              // Create a Set of existing metric IDs for efficient lookup
              const existingMetricIDsSet = new Set(res.map(item => item.metricData.metricID));
            
              // Filter out metrics from vc that are not in the existingMetricIDsSet
              this.metricName = vc.filter(metric => !existingMetricIDsSet.has(metric.metricID));
            }
            console.log(this.metricName)
if(this.metricName)
{
            // Further filter metrics based on the metric type ID and relevant IDs
            this.metricName = this.metricName.filter(metric =>
              metric.metricTypeID == 'e7a9e055-1319-4a4f-b929-cd7777599e39' ||
              relevantIds.some(id => id == metric.metricPortfolioID)
            );


            console.log(this.metricName)
            console.log(res)
            // Ensure unique metrics
            this.metricName = this.metricName.filter((value, index, self) =>
              self.findIndex(m => m.metricID == value.metricID) == index
            );
}


            this.newMetricForm.controls.metricName.patchValue('');
            this.projecthubservice.isFormChanged = false;
            this.newMetricForm.valueChanges.subscribe(() => {
              this.projecthubservice.isFormChanged = true;
            });

            console.log(this.metricName);
          });
        });
      });
    });
  }


  submitnewmetric() {
    this.projecthubservice.isFormChanged = false
    // Get the selected metric name from the form control
    const selectedMetricName = this.newMetricForm.get('metricName').value;

    // Find the corresponding metric object from the metricName arr
    //const selectedMetric = this.metricName.find(metric => metric.metricName == selectedMetricName);
    console.log(selectedMetricName.metricID)
    // Check if we found a metric and it has a metricUID
    if (selectedMetricName) {
      this.apiService.addNewMetric(this.id, selectedMetricName.metricID).then(secondRes => {
        this.projecthubservice.isNavChanged.next(true)
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.successSave.next(true)
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
      })
    }
  }

  OpenMetricRepo() {
    //this.projecthubservice.toggleDrawerOpen('', '', [], '');
    window.open('my-preference/metric-repository', "_blank")
  }

}
