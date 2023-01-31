import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
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
  qualityForm = new FormGroup({
    isQualityRef: new FormControl(false)
  })
  @Input() qualityType: any = [];

  @Input() viewType: 'SidePanel' | 'Form' = 'SidePanel'
  @Input() callLocation: 'ProjectHub' | 'CreateNew' | 'CopyProject' = 'ProjectHub'
  @Output() formValueQuality = new EventEmitter<FormArray>();
  @Output() QualityValue = new EventEmitter<FormGroup>();
  lookupdata: any = [];
  constructor(private apiService: ProjectApiService,
    private projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService,
    public auth: AuthService) {
    this.qualityRefForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (this.callLocation == 'ProjectHub' && history.state.callLocation == undefined) {
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
        else if (this.callLocation == 'CreateNew') {
          this.formValueQuality.emit(this.qualityRefForm)
      }
      else if (history.state.callLocation == 'CopyProject') {
          this.formValueQuality.emit(this.qualityRefForm)
        }
    }
    })
    this.qualityForm.valueChanges.subscribe(res => {
      this.QualityValue.emit(this.qualityForm)
    })
  }

  ngOnInit(): void {
    if (this.callLocation =='CreateNew'){
debugger
      this.generalInfoData={
        agilePrimaryWorkstream:null,
        agileSecondaryWorkstream:null,
        agileWave:null,
        annualMustWinID:null,
        enviornmentalPortfolio:null,
        excecutionScope: null,
        otherImpactedProducts: null,
        parentProject: null,
        pobosCategory:null,
        portfolioCenterData:null,
        portfolioOwner: null,
        primaryProduct: null,
        projectData: null,
        qualityReferences: [],
        siteAssessmentCategory:null,
        sponsor:null,
        strategicYearID:null,
        topsData:null,
      }
      if (history.state.quality.length != 0) {
        this.auth.lookupMaster().then(res => {
          this.lookupdata = res;
          this.qualityType = this.lookupdata.filter(x => x.lookUpParentId == 'A4C55F7E-C213-401E-A777-3BA741FF5802');
          this.qualityType.sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })
          if (history.state.quality[0].qualityReferenceTypeId != "" && history.state.quality[0].qualityReference1 != ""){
          this.qualityForm.patchValue({
            isQualityRef: true
          })
          var j=0;
            for (var i of history.state.quality) {
              
          this.qualityRefForm.push(new FormGroup({
            qualityUniqueId: new FormControl(i.qualityUniqueId),
            qualityReferenceTypeId: new FormControl(this.qualityType.find(x => x.lookUpId == i.qualityReferenceTypeId)),
            qualityReference1: new FormControl(i.qualityReference1),
            problemUniqueId: new FormControl(i.problemUniqueId)
          }))
            this.generalInfoData.qualityReferences = this.qualityRefForm.value;
              this.generalInfoData.qualityReferences[j].qualityReferenceTypeId = i.qualityReferenceTypeId
              j++
        }
        }
        })
        
      }
      this.formValueQuality.emit(this.qualityRefForm)
      this.QualityValue.emit(this.qualityForm)
      this.viewContent = true
    }
    else{
    this.dataloader()
    }
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
    if (this.callLocation == 'CreateNew'){
    return this.qualityType.sort((a, b) => {
      return a.lookUpOrder - b.lookUpOrder;
    })
  }
  else{
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == "A4C55F7E-C213-401E-A777-3BA741FF5802")
  }
  }

  getLookUpName(id: string): string {
    if (this.callLocation == 'CreateNew'){
      return id && id != '' ? this.qualityType.find(x => x.lookUpId == id).lookUpName : ''
    }
    else{
    return id && id != '' ? this.projectHubService.lookUpMaster.find(x => x.lookUpId == id).lookUpName : ''
    }
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
