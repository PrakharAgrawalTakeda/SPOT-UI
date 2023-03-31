import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-biogenics-bulk-edit',
  templateUrl: './biogenics-bulk-edit.component.html',
  styleUrls: ['./biogenics-bulk-edit.component.scss']
})
export class BiogenicsBulkEditComponent {
  unitCost = ""
  viewContent = false
  biogenicsForm = new FormArray([])
  biogenicsTableEditStack = []
  editable: boolean = false
  projectViewDetails: any = {}
  biogenicsDb = []
  submitObj = []
  CAPSform = new FormGroup({
    impactRealizationDate: new FormControl(''),
  })

  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
    this.biogenicsForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.changeChecker()
        if (JSON.stringify(this.submitObj) == JSON.stringify(this.biogenicsDb)) {
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

  dataloader(){
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

  addBiogenics(){

  }

  changeChecker() {
    var formValue = this.biogenicsForm.getRawValue()
  }

  carbonTableEditRow(row: number) {
    if (this.projecthubservice.roleControllerControl.projectBenefits) {
      if (!this.biogenicsTableEditStack.includes(row)) {
        this.biogenicsTableEditStack.push(row)
      }
    }
  }

  submitBiogenics(){

  }
}
