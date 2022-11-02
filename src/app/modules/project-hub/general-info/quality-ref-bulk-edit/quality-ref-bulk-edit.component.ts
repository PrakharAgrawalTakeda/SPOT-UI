import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-quality-ref-bulk-edit',
  templateUrl: './quality-ref-bulk-edit.component.html',
  styleUrls: ['./quality-ref-bulk-edit.component.scss']
})
export class QualityRefBulkEditComponent implements OnInit {
  qualityRefForm = new FormArray([])
  formFieldHelpers: any
  viewContent = false
  generalInfoData: any = {}
  qrTableEditStack: any = []
  formValue = []
  dbvalue = []
  constructor(private apiService: ProjectApiService,
    private projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService) {
    this.qualityRefForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.dataprep()
        console.log("formValue", this.formValue)
        console.log("Db", this.dbvalue)
        if (JSON.stringify(this.formValue) != JSON.stringify(this.dbvalue)) {
          this.projectHubService.isFormChanged = true
        }
        else {
          this.projectHubService.isFormChanged = false
        }
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader(): void {
    this.apiService.getGeneralInfoData(this.projectHubService.projectid).then((res: any) => {
      this.generalInfoData = res
      if (res.qualityReferences.length != 0) {
        for (var i of res.qualityReferences) {
          this.dbvalue.push(i)
          this.qualityRefForm.push(new FormGroup({
            qualityUniqueId: new FormControl(i.qualityUniqueId),
            qualityReferenceTypeId: new FormControl(this.projectHubService.lookUpMaster.find(x => x.lookUpId == i.qualityReferenceTypeId)),
            qualityReference1: new FormControl(i.qualityReference1),
            problemUniqueId: new FormControl(this.projectHubService.projectid)
          }))
        }
      }
      this.viewContent = true
    })
  }

  getQRType(): any {
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == "A4C55F7E-C213-401E-A777-3BA741FF5802")
  }

  getLookUpName(id: string): string {
    return id && id != '' ? this.projectHubService.lookUpMaster.find(x => x.lookUpId == id).lookUpName : ''
  }

  submitQR() {
    this.dataprep()
    this.projectHubService.isFormChanged = false
    this.apiService.bulkeditQualityReference(this.formValue, this.projectHubService.projectid).then(res => {
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }



  //TABLE ALTERATIONS
  dataprep() {
    this.formValue = []
    var genQRFORM = this.qualityRefForm.getRawValue()
    for (var quality of genQRFORM) {
      this.formValue.push({
        qualityUniqueId: quality.qualityUniqueId,
        problemUniqueId: quality.problemUniqueId,
        qualityReferenceTypeId: Object.keys(quality.qualityReferenceTypeId).length > 0 ? quality.qualityReferenceTypeId.lookUpId : '',
        qualityReference1: quality.qualityReference1
      })
    }
  }
  qrTableEditRow(row: number) {
    if (!this.qrTableEditStack.includes(row)) {
      this.qrTableEditStack.push(row)
    }
  }
  deleteQR(rowIndex: number) {
    this.generalInfoData.qualityReferences.splice(rowIndex, 1)
    this.qualityRefForm.removeAt(rowIndex)
    if (this.qrTableEditStack.includes(rowIndex)) {
      this.qrTableEditStack.splice(this.qrTableEditStack.indexOf(rowIndex), 1)
    }
    this.qrTableEditStack = this.qrTableEditStack.map(function (value) {
      return value > rowIndex ? value - 1 : value;
    })
    this.generalInfoData.qualityReferences = [...this.generalInfoData.qualityReferences]

  }
  addQR() {
    this.qualityRefForm.push(new FormGroup({
      qualityUniqueId: new FormControl(''),
      qualityReferenceTypeId: new FormControl({}),
      qualityReference1: new FormControl(''),
      problemUniqueId: new FormControl(this.projectHubService.projectid)
    }))
    var j = [{
      qualityUniqueId: '',
      qualityReferenceTypeId: '',
      qualityReference1: '',
      problemUniqueId: ''
    }]
    this.generalInfoData.qualityReferences = [...this.generalInfoData.qualityReferences, ...j]
    this.qrTableEditStack.push(this.generalInfoData.qualityReferences.length - 1)
    var div = document.getElementsByClassName('datatable-scroll')[0]
    setTimeout(() => {
      div.scroll({
        top: div.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);

  }
}
