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
  carbonEditStack = []
  editable: boolean = false
  projectViewDetails: any = {}
  carbonDb = []
  submitObj = []
  unitCost = ""
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
    this.apiService.getprojectviewdata(this.projecthubservice.projectid).then((res: any) => {
      this.apiService.getGeneralInfoData(this.projecthubservice.projectid).then((response: any) => {
        this.apiService.getproject(this.projecthubservice.projectid).then((res: any) => {
          this.CAPSform.patchValue({
            impactRealizationDate: res.emissionsImpactRealizationDate
          })
          this.unitCost = "Unit Cost (" + response.localCurrencyAbbreviation + ")"
        })
      })
      // this.projectViewDetails = res
      // for (var i of this.projectViewDetails.overallPerformace) {
      //   this.carbonDb.push(i)
      //   this.carbonForm.push(new FormGroup({
      //     emissionSource: new FormControl(i.emissionSource),
      //     projectId: new FormControl(this.projecthubservice.projectid),
      //     metric: new FormControl(i.metric),
      //     currentState: new FormControl(i.currentState),
      //     targetPerformance: new FormControl(i.targetPerformance),
      //     includeInCharter: new FormControl(i.includeInCharter),
      //     kpiid: new FormControl(i.kpiid && i.kpiid != '' ? this.projecthubservice.kpiMasters.find(x => x.kpiid == i.kpiid) : {}),
      //     actualPerformance: new FormControl(i.actualPerformance),
      //     includeInProjectDashboard: new FormControl(i.includeInProjectDashboard),
      //     status: new FormControl(i.status),
      //     includeInCloseOut: new FormControl(i.includeInCloseOut),
      //     ptrbid: new FormControl(i.ptrbid),
      //     benefitDescriptionJustification: new FormControl(i.benefitDescriptionJustification),
      //     includeinProposal: new FormControl(i.includeinProposal),
      //     kpiname: new FormControl(i.kpiname)
      //   }))
      // }

      this.viewContent = true
    })
  }

  changeChecker() {
    var formValue = this.carbonForm.getRawValue()
    // formValue.length > 0 ? this.submitObj = formValue.map(x => {
    //   return {
    //     keySuccessUniqueId: x.keySuccessUniqueId,
    //     projectId: x.projectId,
    //     metric: x.metric,
    //     currentState: x.currentState,
    //     targetPerformance: x.targetPerformance,
    //     includeInCharter: x.includeInCharter,
    //     kpiid: Object.keys(x.kpiid).length > 0 ? x.kpiid.kpiid : '',
    //     actualPerformance: x.actualPerformance,
    //     includeInProjectDashboard: x.includeInProjectDashboard,
    //     status: x.status,
    //     includeInCloseOut: x.includeInCloseOut,
    //     ptrbid: x.ptrbid,
    //     benefitDescriptionJustification: x.benefitDescriptionJustification,
    //     includeinProposal: x.includeinProposal
    //   }
    // }) : this.submitObj = []
  }

  carbonTableEditRow(row: number) {
    if (this.projecthubservice.roleControllerControl.projectBenefits) {
      if (!this.carbonEditStack.includes(row)) {
        this.carbonEditStack.push(row)
      }
    }
  }

  submitCarbon(){

  }

}
