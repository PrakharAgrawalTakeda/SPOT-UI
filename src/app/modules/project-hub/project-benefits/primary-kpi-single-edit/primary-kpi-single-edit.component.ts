import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-primary-kpi-single-edit',
  templateUrl: './primary-kpi-single-edit.component.html',
  styleUrls: ['./primary-kpi-single-edit.component.scss']
})
export class PrimaryKpiSingleEditComponent implements OnInit {
  primaryKPIForm = new FormGroup({
    vcdate: new FormControl(null),
    primaryKpi: new FormControl(null),
    valueCommentary: new FormControl('')
  })
  viewContent: boolean = false
  primaryKPI: any;
  id: string;
  vc: any;
  constructor(public projecthubservice: ProjectHubService, public apiService: ProjectApiService, private _Activatedroute: ActivatedRoute) {
    this.primaryKPIForm.controls.primaryKpi.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projecthubservice.isFormChanged = true
      }
    })

  }

  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getvalueCreation(this.id).then((vc: any) => {
      this.vc = vc
      console.log(this.vc)
      if (this.projecthubservice.itemid && this.projecthubservice.itemid != "") {
        console.log(this.projecthubservice.itemid)
        this.primaryKPI = this.projecthubservice.lookUpMaster.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474')
        //this.primaryKPIForm.controls.primaryKpi.patchValue(this.projecthubservice.kpiMasters.find(x => x.kpiid == this.projecthubservice.itemid))
        this.primaryKPIForm.controls.primaryKpi.patchValue(this.primaryKPI.find(x => x.lookUpName == this.projecthubservice.itemid))
        this.primaryKPIForm.controls.vcdate.patchValue(vc.valueCaptureStartDate)
        this.primaryKPIForm.controls.valueCommentary.patchValue(vc.valueCommentary)
      }
      this.viewContent = true
    })
  }
  submitpkpi() {
    this.projecthubservice.isFormChanged = false;

    // Extract the selected primaryKpi value from the form
    const selectedPrimaryKpiValue = this.primaryKPIForm.get('primaryKpi').value;
    console.log(selectedPrimaryKpiValue)

    // Find the corresponding lookUpId from primaryKPI array
    const selectedPrimaryKpiObject = this.projecthubservice.lookUpMaster.find(x => x.lookUpName == selectedPrimaryKpiValue.lookUpName);

    // Initialize the mainObj
    var mainObj: any = {};

    var date = this.primaryKPIForm.get('vcdate').value
    // Assign other properties to mainObj if needed
    mainObj.valueCaptureStartDate = moment(date).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]');
    mainObj.valueCommentary = this.primaryKPIForm.get('valueCommentary').value;
    mainObj.primaryValueDriverLookupId = selectedPrimaryKpiObject.lookUpId;
    console.log(mainObj)
    this.apiService.editValueCreation(mainObj, this.projecthubservice.projectid).then(res => {
    this.apiService.updateReportDates(this.projecthubservice.projectid, "ModifiedDate").then(secondRes => {
      this.projecthubservice.submitbutton.next(true);
      this.projecthubservice.isNavChanged.next(true);
      this.projecthubservice.toggleDrawerOpen('', '', [], '');
    })
    });
  }

}
