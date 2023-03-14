import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-carbon-single-edit',
  templateUrl: './carbon-single-edit.component.html',
  styleUrls: ['./carbon-single-edit.component.scss']
})
export class CarbonSingleEditComponent {
  id: string = ""
  lookupdata: any
  carbon: any
  carbonData: any
  carbonUpdated: any
  activeaccount: any
  CarbonForm = new FormGroup({
    emissionSource: new FormControl(),
    projectUid: new FormControl(),
    units: new FormControl(),
    UoM: new FormControl(),
    unitCost: new FormControl(),
    basisOfEstimate: new FormControl()
  })

  constructor(private authService: MsalService, private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) { }

  ngOnInit(): void {
    this.getllookup()
  }

  getllookup() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.dataloader()
    })
  }

  dataloader() {
    this.apiService.getLessonLearnedbyProjectId(this.projecthubservice.projectid).then((res: any) => {
      this.carbonData = res
      this.carbon = this.carbonData.filter(x => { return x.lessonLearnedId == this.projecthubservice.itemid })
        // this.CarbonForm.patchValue({
        //   lessonLearnedId: this.lessonLearned[0].lessonLearnedId,
        //   projectUid: this.projecthubservice.projectid,
        //   // actionOwner: this.lessonLearned[0].actionOwner,
        //   actionOwner: this.lessonLearned[0].actionOwner ? {
        //     userAdid: this.lessonLearned[0].actionOwner.userAdid,
        //     userDisplayName: this.lessonLearned[0].actionOwner.userDisplayName
        //   } : {},
        //   createDetailedReviewSlide: this.lessonLearned[0].createDetailedReviewSlide,
        //   criticality: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].criticality) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].criticality) : {},
        //   dueDate: this.lessonLearned[0].dueDate,
        //   functionActionOwner: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].functionActionOwner) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].functionActionOwner) : {},
        //   includeInCloseOutReport: this.lessonLearned[0].includeInCloseOutReport,
        //   leassonTitle: this.lessonLearned[0].leassonTitle,
        //   lessonCloseDate: this.lessonLearned[0].lessonCloseDate,
        //   lessonDetail: this.lessonLearned[0].lessonDetail,
        //   lessonLogDate: this.lessonLearned[0].lessonLogDate ? this.lessonLearned[0].lessonLogDate : this.today,
        //   lessonType: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].lessonType) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].lessonType) : {},
        //   // submittedBy: this.lessonLearned[0].submittedBy,
        //   submittedBy: this.lessonLearned[0].submittedBy ? {
        //     userAdid: this.lessonLearned[0].submittedBy.userAdid,
        //     userDisplayName: this.lessonLearned[0].submittedBy.userDisplayName
        //   } : {},
        //   submittingGroupRole: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].submittingGroupRole) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].submittingGroupRole) : {},
        //   suggestedAction: this.lessonLearned[0].suggestedAction
        // })
          this.CarbonForm.controls['emissionSource'].disable()
          this.CarbonForm.controls['UoM'].disable()
        this.projecthubservice.isFormChanged = false
      
      this.CarbonForm.valueChanges.subscribe(res => {
        this.projecthubservice.isFormChanged = true
      })
    })
  }

  submiCarbon(){

  }
}
