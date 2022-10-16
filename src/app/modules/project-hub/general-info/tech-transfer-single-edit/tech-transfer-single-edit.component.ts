import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-tech-transfer-single-edit',
  templateUrl: './tech-transfer-single-edit.component.html',
  styleUrls: ['./tech-transfer-single-edit.component.scss']
})
export class TechTransferSingleEditComponent implements OnInit {
  viewContent: boolean = false
  generalInfoForm = new FormGroup({
    isTechTransfer: new FormControl(false),
    productionStepId: new FormControl(''),
    campaignPhaseId: new FormControl(''),
    campaignTypeId: new FormControl(''),
  })
  projectData: any = {}

  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService) {
    this.generalInfoForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projectHubService.isFormChanged = true
      }
    })
    this.generalInfoForm.controls.isTechTransfer.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the Tech Transfer Information?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
                "color": "warn"
              },
              "cancel": {
                "show": true,
                "label": "Cancel"
              }
            },
            "dismissible": true
          }
          const alert = this.fuseAlert.open(comfirmConfig)
          alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
              this.generalInfoForm.patchValue({
                productionStepId: '',
                campaignPhaseId: '',
                campaignTypeId: '',
              })
            }
            else {
              this.generalInfoForm.controls.isTechTransfer.patchValue(true)
            }
          })
        }
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.apiService.getGeneralInfoData(this.projectHubService.projectid).then((res: any) => {
      this.projectData = res.projectData
      this.generalInfoForm.patchValue({
        isTechTransfer: res.projectData.isTechTransfer,
        productionStepId: res.projectData.productionStepId,
        campaignPhaseId: res.projectData.campaignPhaseId,
        campaignTypeId: res.projectData.campaignTypeId,
      })
      this.viewContent = true
    })


  }

  getCampaignPhase(): any {
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == "183dc1f1-06ba-4022-bd6f-ae07f70751e2")
  }
  getCampaignType(): any {
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == "01a49f16-0744-4100-ae8a-ec2e469dbf74")
  }
  getProductionStep(): any {
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == "b137412d-8008-4446-8fe6-c56a06b83174")
  }

  techTransfer() {
    this.projectHubService.isFormChanged = false
    var formValue = this.generalInfoForm.getRawValue()
    this.projectData.isTechTransfer = formValue.isTechTransfer
    this.projectData.productionStepId = formValue.isTechTransfer ? formValue.productionStepId : ''
    this.projectData.campaignPhaseId = formValue.isTechTransfer ? formValue.campaignPhaseId : ''
    this.projectData.campaignTypeId = formValue.isTechTransfer ? formValue.campaignTypeId : ''
    this.apiService.editGeneralInfo(this.projectHubService.projectid, this.projectData).then(res => {
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }
}
