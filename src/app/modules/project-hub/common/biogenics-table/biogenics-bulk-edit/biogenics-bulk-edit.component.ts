import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
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
  Biogenics = []
  lookupdata: any
  CAPSform = new FormGroup({
    impactRealizationDate: new FormControl(''),
    NoCarbonImpact: new FormControl(false)
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
    // this.apiService.getCAPSbyProjectID(this.projecthubservice.projectid).then((res: any) => {
      this.auth.lookupMaster().then((resp: any) => {
        this.lookupdata = resp
      this.CAPSform.patchValue({
        impactRealizationDate: this.projecthubservice.all[2],
        NoCarbonImpact: this.projecthubservice.all[1]
      })
        this.Biogenics = this.projecthubservice.all[0]
      for (var i of this.Biogenics) {
        this.biogenicsDb.push(i)
        this.biogenicsForm.push(new FormGroup({
          biogenicDataId: new FormControl(i.biogenicDataId),
          projectId: new FormControl(this.projecthubservice.projectid),
          biogenicMasterUniqueId: new FormControl(i.biogenicMasterUniqueId),
          biogenicEmissionFactor: new FormControl(i.biogenicEmissionFactor),
          biogenicUnit: new FormControl(i.biogenicUnit),
          standardUoM: new FormControl(i.standardUoM),
          biogenicUnitCost: new FormControl(i.biogenicUnitCost),
          biogenicBasisOfEstimate: new FormControl(i.biogenicBasisOfEstimate)
        }))
      }
        this.unitCost = "Unit Cost (" + this.projecthubservice.all[3] + ")"
      this.viewContent = true
    })
  // })
  }

  getSource(){
    return this.lookupdata.filter(x => x.lookUpParentId == "ad384cb4-c41a-444f-97fe-68cc91431c51")
  }

  getLookUpName(id: string): string{
    return id && id != '' ? this.lookupdata.find(x => x.lookUpId == id).lookUpName : ''
  }

  addBiogenics(){
    var j = [{}]
    j = [{
      biogenicDataId: '',
      projectId: '',
      biogenicMasterUniqueId: '',
      biogenicEmissionFactor: '',
      biogenicUnit: '',
      standardUoM: 'kWh',
      biogenicUnitCost: '',
      biogenicBasisOfEstimate: ''
    }]
    this.biogenicsForm.push(new FormGroup({
      biogenicDataId: new FormControl(''),
      projectId: new FormControl(this.projecthubservice.projectid),
      biogenicMasterUniqueId: new FormControl(''),
      biogenicEmissionFactor: new FormControl(''),
      biogenicUnit: new FormControl(''),
      standardUoM: new FormControl('kWh'),
      biogenicUnitCost: new FormControl(''),
      biogenicBasisOfEstimate: new FormControl('')
    }))
    this.Biogenics = [...this.Biogenics, ...j]
    this.biogenicsTableEditStack.push(this.Biogenics.length - 1)
    var div = document.getElementsByClassName('datatable-scroll')[0]
    setTimeout(() => {
      div.scroll({
        top: div.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  }

  changeChecker() {
    var formValue = this.biogenicsForm.getRawValue()
    formValue.length > 0 ? this.submitObj = formValue.map(x => {
      return {
        biogenicDataId: x.biogenicDataId,
        projectId: x.projectId,
        biogenicMasterUniqueId: x.biogenicMasterUniqueId,
        biogenicEmissionFactor: x.biogenicEmissionFactor,
        biogenicUnit: x.biogenicUnit,
        standardUoM: x.standardUoM,
        biogenicUnitCost: x.biogenicUnitCost,
        biogenicBasisOfEstimate: x.biogenicBasisOfEstimate
      }
    }) : this.submitObj = []
  }

  biogenicsTableEditRow(row: number) {
      if (this.projecthubservice.roleControllerControl.projectHub.CAPS && !this.CAPSform.controls.NoCarbonImpact.value) {
      if (!this.biogenicsTableEditStack.includes(row)) {
        this.biogenicsTableEditStack.push(row)
      }
    }
  }

  deleteBio(rowIndex: number){
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you sure?",
      "message": "Are you sure you want Delete this Record?",
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
        this.Biogenics.splice(rowIndex, 1)
        this.biogenicsForm.removeAt(rowIndex)
        if (this.biogenicsTableEditStack.includes(rowIndex)) {
          this.biogenicsTableEditStack.splice(this.biogenicsTableEditStack.indexOf(rowIndex), 1)
        }
        this.biogenicsTableEditStack = this.biogenicsTableEditStack.map(function (value) {
          return value > rowIndex ? value - 1 : value;
        })
        this.Biogenics = [...this.Biogenics]
      }
    }
    )
  }

  submitBiogenics(){

  }
}
