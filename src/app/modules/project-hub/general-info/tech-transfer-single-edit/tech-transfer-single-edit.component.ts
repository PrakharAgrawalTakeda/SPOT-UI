import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
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
  @Input() viewType: 'SidePanel' | 'Form' = 'SidePanel'
  @Input() callLocation: 'ProjectHub' | 'CreateNew' | 'CopyProject' = 'ProjectHub'
  @Input() CreateProjectForm
  @Output() formValueTech = new EventEmitter<FormGroup>();
  lookupdata: any = []; 
  campaignPhase: any = [];
  campaignType: any = [];
  productionSteps: any = [];

  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService,
    public auth: AuthService) {
    this.generalInfoForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (this.callLocation == 'ProjectHub' && history.state.callLocation == undefined) {
          this.projectHubService.isFormChanged = true
        }
        else if (this.callLocation == 'CreateNew') {
          this.formValueTech.emit(this.generalInfoForm.getRawValue())
        }
      else if (history.state.callLocation == 'CopyProject') {
        this.formValueTech.emit(this.generalInfoForm.getRawValue())
        }
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
    if (this.callLocation == 'ProjectHub') {
      this.dataloader()
    }
    else {
      this.auth.lookupMaster().then(res => {
        this.lookupdata = res;
        if (history.state.data != undefined) {
          this.generalInfoForm.patchValue({
            isTechTransfer: history.state.data.isTechTransfer,
            productionStepId: history.state.data.productionStepId == null ? '' : history.state.data.productionStepId,
            campaignPhaseId: history.state.data.campaignPhaseId == null ? '' : history.state.data.campaignPhaseId,
            campaignTypeId: history.state.data.campaignTypeId == null ? '' : history.state.data.campaignTypeId,
          })
          this.generalInfoForm = this.CreateProjectForm
          this.formValueTech.emit(this.generalInfoForm.getRawValue())
          this.viewContent = true
        }
        else {
        this.generalInfoForm = this.CreateProjectForm
        this.formValueTech.emit(this.generalInfoForm.getRawValue())
        this.viewContent = true
        }
      })
    }
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
    if (this.callLocation == 'CreateNew'){
      this.campaignPhase = this.lookupdata.filter(x => x.lookUpParentId == '183dc1f1-06ba-4022-bd6f-ae07f70751e2');
      this.campaignPhase.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.campaignPhase;
    }
    else{
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == "183dc1f1-06ba-4022-bd6f-ae07f70751e2")
    }
  }
  getCampaignType(): any {
    if (this.callLocation == 'CreateNew') {
      this.campaignType = this.lookupdata.filter(x => x.lookUpParentId == '01a49f16-0744-4100-ae8a-ec2e469dbf74');
      this.campaignType.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.campaignType;
    }
    else {
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == "01a49f16-0744-4100-ae8a-ec2e469dbf74")
    }
  } 
  getProductionStep(): any {
    if (this.callLocation == 'CreateNew') {
      this.productionSteps = this.lookupdata.filter(x => x.lookUpParentId == 'b137412d-8008-4446-8fe6-c56a06b83174');
      this.productionSteps.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.productionSteps;
    }
    else {
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == "b137412d-8008-4446-8fe6-c56a06b83174")
    }
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
