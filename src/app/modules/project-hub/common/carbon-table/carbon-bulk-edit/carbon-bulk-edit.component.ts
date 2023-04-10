import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-carbon-bulk-edit',
  templateUrl: './carbon-bulk-edit.component.html',
  styleUrls: ['./carbon-bulk-edit.component.scss']
})
export class CarbonBulkEditComponent {
  today = new Date("2036-03-31");
  viewContent: boolean = false
  carbonForm = new FormArray([])
  carbonTableEditStack = []
  editable: boolean = false
  projectViewDetails: any = {}
  carbonDb = []
  submitObj = []
  unitCost = ""
  Carbon  = []
  noCarbon: boolean = false
  CAPSform = new FormGroup({
    impactRealizationDate: new FormControl(''),
  })

  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService,
    public fuseAlert: FuseConfirmationService, private _Activatedroute: ActivatedRoute, private router: Router) {
    this.carbonForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.changeChecker()
        if (JSON.stringify(this.submitObj) == JSON.stringify(this.carbonDb)) {
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
    this.apiService.getCAPSbyProjectID(this.projecthubservice.projectid).then((res: any) => {
      this.CAPSform.patchValue({
        impactRealizationDate: res.projectData.emissionsImpactRealizationDate
      })
      this.unitCost = "Unit Cost (" + res.localCurrency.localCurrencyAbbreviation + ")"
      this.noCarbon = res.projectData.noCarbonImpact
      this.Carbon = this.projecthubservice.all
      for (var i of this.Carbon) {
        this.carbonDb.push(i)
        this.carbonForm.push(new FormGroup({
          emsourceMasterUniqueId: new FormControl(i.emsourceMasterUniqueId),
          // source: new FormControl(i.source),
          // emscope: new FormControl(i.emscope),
          // isActive: new FormControl(i.isActive),
          // emtype: new FormControl(i.emtype),
          emsourceId: new FormControl(i.emsourceId),
          emsourceName: new FormControl(i.emsourceName),
          standardUoM: new FormControl(i.standardUoM),
          // comments: new FormControl(i.comments),
          // gjequivalent: new FormControl(i.gjequivalent),
          // correspondingFactor: new FormControl(i.correspondingFactor),
          // correspondingFactorName: new FormControl(i.correspondingFactorName),
          emdataUniqueId: new FormControl(i.emdataUniqueId),
          projectId: new FormControl(this.projecthubservice.projectid),
          emportfolioOwnerId: new FormControl(i.emportfolioOwnerId),
          emunit: new FormControl(i.emunit),
          emimpactTonsCo2year: new FormControl(i.emimpactTonsCo2year),
          embasisOfEstimate: new FormControl(i.embasisOfEstimate),
          unitCost: new FormControl(i.unitCost)
        }))
      }
      this.viewContent = true
    })
  }

  changeChecker() {
    var formValue = this.carbonForm.getRawValue()
    formValue.length > 0 ? this.submitObj = formValue.map(x => {
      return {
        emsourceMasterUniqueId: x.emsourceMasterUniqueId,
        projectId: x.projectId,
        emsourceId: x.emsourceId,
        emsourceName: x.emsourceName,
        standardUoM: x.standardUoM,
        emdataUniqueId: x.emdataUniqueId,
        emportfolioOwnerId: x.emportfolioOwnerId,
        emunit: x.emunit,
        emimpactTonsCo2year: x.emimpactTonsCo2year,
        embasisOfEstimate: x.embasisOfEstimate,
        unitCost: x.unitCost
      }
    }) : this.submitObj = []
  }

  carbonTableEditRow(row: number) {
    if (this.projecthubservice.roleControllerControl.projectHub.CAPS && !this.noCarbon) {
      if (!this.carbonTableEditStack.includes(row)) {
        this.carbonTableEditStack.push(row)
      }
    }
  }

  submitCarbon(){

  }

}
