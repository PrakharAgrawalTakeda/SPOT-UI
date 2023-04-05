import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-water-waste-bulk-edit',
  templateUrl: './water-waste-bulk-edit.component.html',
  styleUrls: ['./water-waste-bulk-edit.component.scss']
})
export class WaterWasteBulkEditComponent {
  unitCost = ""
  viewContent = false
  waterWasteForm = new FormArray([])
  waterWasteTableEditStack = []
  editable: boolean = false
  projectViewDetails: any = {}
  waterWasteDb = []
  submitObj = []
  CAPSform = new FormGroup({
    impactRealizationDate: new FormControl('')
  })

  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
    this.waterWasteForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.changeChecker()
        if (JSON.stringify(this.submitObj) == JSON.stringify(this.waterWasteDb)) {
          this.projecthubservice.isFormChanged = false
        }
        else {
          this.projecthubservice.isFormChanged = true
        }
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    this.apiService.getprojectviewdata(this.projecthubservice.projectid).then((res: any) => {
      this.apiService.getGeneralInfoData(this.projecthubservice.projectid).then((response: any) => {
        this.apiService.getproject(this.projecthubservice.projectid).then((res: any) => {
          this.CAPSform.patchValue({
            impactRealizationDate: res.emissionsImpactRealizationDate
          })
          this.unitCost = "Unit Cost (" + response.localCurrencyAbbreviation + ")"
        })
      })
      this.viewContent = true
    })
  }

  addWaterWaste() {

  }

  changeChecker() {
    var formValue = this.waterWasteForm.getRawValue()
  }

  waterWasteTableEditRow(row: number) {
    if (this.projecthubservice.roleControllerControl.projectHub.CAPS) {
      if (!this.waterWasteTableEditStack.includes(row)) {
        this.waterWasteTableEditStack.push(row)
      }
    }
  }

  submitWaterWaste() {

  }
}
