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
    primaryKpi: new FormControl(null)
  })
  viewContent: boolean = false
  id: string;
  primaryKPI: any;

  constructor(public projecthubservice: ProjectHubService, public apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public auth: AuthService, private router: Router) {
    this.newMetricForm.controls.primaryKpi.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projecthubservice.isFormChanged = true
      }
    })

  }

  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getvalueCreation(this.id).then((vc: any) => {
      this.auth.lookupMaster().then((lookup: any) => {
        this.primaryKPI = lookup.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474')
        this.newMetricForm.controls.primaryKpi.patchValue('')
      this.viewContent = true
    })
  })
  }
  submitnewmetric() {
    this.projecthubservice.isFormChanged = false;

    // Extract the selected primaryKpi value from the form
    const selectedPrimaryKpiValue = this.newMetricForm.get('primaryKpi').value;
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
    window.open('my-preference/metric-repository', "_blank")
  }
  
}
