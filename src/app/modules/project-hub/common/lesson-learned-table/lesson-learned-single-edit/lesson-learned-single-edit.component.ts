import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import moment from 'moment';
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
  selector: 'app-lesson-learned-single-edit',
  templateUrl: './lesson-learned-single-edit.component.html',
  styleUrls: ['./lesson-learned-single-edit.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class LessonLearnedSingleEditComponent implements OnInit {
  today = new Date();
  formFieldHelpers: string[] = [''];
  id: string = ""
  lookupdata: any
  lessonLearned: any
  lessonLearnedData: any
  lessonLearnedUpdated: any
  activeaccount: any
  LessonLearnedForm = new FormGroup({
    lessonLearnedId: new FormControl(),
    projectUid: new FormControl(),
    includeInCloseOutReport: new FormControl(false),
    createDetailedReviewSlide: new FormControl(false),
    lessonLogDate: new FormControl(),
    leassonTitle: new FormControl(),
    lessonDetail: new FormControl(),
    lessonType: new FormControl(),
    criticality: new FormControl(),
    submittedBy: new FormControl(),
    submittingGroupRole: new FormControl(),
    suggestedAction: new FormControl(),
    dueDate: new FormControl(),
    functionActionOwner: new FormControl(),
    actionOwner: new FormControl(),
    lessonCloseDate: new FormControl()
  })
  constructor(private authService: MsalService, private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) { }

  ngOnInit(): void {
    this.getllookup()
  }

  GetType(): string {
    return this.lookupdata?.filter(x => x.lookUpParentId == "3B747FFC-139E-4ECC-8123-85D8A730245E")
  }
  GetCriticality(): string {
    return this.lookupdata?.filter(x => x.lookUpParentId == "DFC4E626-10A1-464E-8B1A-09A223B125A1")
  }
  GetRole(): string {
    return this.lookupdata?.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77").sort((a, b) => {
      if (a.lookUpName === "None") {
        return true
      }
      else {
        return false
      }
    })
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
      this.lessonLearnedData = res
      if (this.projecthubservice.itemid != "new") {
        this.lessonLearned = this.lessonLearnedData.filter(x => { return x.lessonLearnedId == this.projecthubservice.itemid })
        this.LessonLearnedForm.patchValue({
          lessonLearnedId: this.lessonLearned[0].lessonLearnedId,
          projectUid: this.projecthubservice.projectid,
          // actionOwner: this.lessonLearned[0].actionOwner,
          actionOwner: this.lessonLearned[0].actionOwner ? {
            userAdid: this.lessonLearned[0].actionOwner.userAdid,
            userDisplayName: this.lessonLearned[0].actionOwner.userDisplayName
          } : {},
          createDetailedReviewSlide: this.lessonLearned[0].createDetailedReviewSlide,
          // criticality: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].criticality) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].criticality) : {},
          criticality: this.lessonLearned[0].criticality,
          dueDate: this.lessonLearned[0].dueDate,
          // functionActionOwner: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].functionActionOwner) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].functionActionOwner) : {},
          functionActionOwner: this.lessonLearned[0].functionActionOwner,
          includeInCloseOutReport: this.lessonLearned[0].includeInCloseOutReport,
          leassonTitle: this.lessonLearned[0].leassonTitle,
          lessonCloseDate: this.lessonLearned[0].lessonCloseDate,
          lessonDetail: this.lessonLearned[0].lessonDetail,
          lessonLogDate: this.lessonLearned[0].lessonLogDate ? this.lessonLearned[0].lessonLogDate : this.today,
          lessonType: this.lessonLearned[0].lessonType,
          // submittedBy: this.lessonLearned[0].submittedBy,
          submittedBy: this.lessonLearned[0].submittedBy ? {
            userAdid: this.lessonLearned[0].submittedBy.userAdid,
            userDisplayName: this.lessonLearned[0].submittedBy.userDisplayName
          } : {},
          // submittingGroupRole: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].submittingGroupRole) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].submittingGroupRole) : {},
          submittingGroupRole: this.lessonLearned[0].submittingGroupRole,
          suggestedAction: this.lessonLearned[0].suggestedAction
        })
        // if (res.functionGroupId != null) {
        //   this.riskIssueForm.controls.function.patchValue(this.lookupdata?.find(x => x.lookUpId == res.functionGroupId)?.lookUpName)
        // }
        if (this.projecthubservice.all.length > 0) {
          if (this.projecthubservice.all.filter(x => x.includeInCloseOutReport == true).length >= 4) {
            if (this.LessonLearnedForm.value.includeInCloseOutReport != true) {
              this.LessonLearnedForm.controls['includeInCloseOutReport'].disable()
            }
          }
        }
        this.projecthubservice.isFormChanged = false
      }
      else {
        this.activeaccount = this.authService.instance.getActiveAccount();
        var user = {
          userAdid: this.activeaccount.localAccountId,
          userDisplayName: this.activeaccount.name
        };
        this.LessonLearnedForm.patchValue({
          lessonLearnedId: "",
          projectUid: this.projecthubservice.projectid,
          actionOwner: "",
          createDetailedReviewSlide: false,
          criticality: "",
          dueDate: "",
          functionActionOwner: "",
          includeInCloseOutReport: false,
          leassonTitle: "",
          lessonCloseDate: "",
          lessonDetail: "",
          lessonLogDate: this.today,
          lessonType: "",
          submittedBy: user,
          submittingGroupRole: "",
          suggestedAction: ""
        })
        if (this.projecthubservice.all.length == 0) {
          console.log(this.projecthubservice.all)
        }
        else {
          if (this.projecthubservice.all.filter(x => x.includeInCloseOutReport == true).length >= 4) {
            this.LessonLearnedForm.controls['includeInCloseOutReport'].disable()
          }
        }
        this.projecthubservice.isFormChanged = false
      }
      this.LessonLearnedForm.valueChanges.subscribe(res => {
        this.projecthubservice.isFormChanged = true
      })
    })
  }

  submiLL() {
    this.lessonLearnedUpdated = this.lessonLearnedData
    for (var j = 0; j < this.lessonLearnedData.length; j++) {
      this.lessonLearnedUpdated[j].actionOwner = this.lessonLearnedData[j].actionOwner.userAdid
      this.lessonLearnedUpdated[j].submittedBy = this.lessonLearnedData[j].submittedBy.userAdid
    }
    this.projecthubservice.isFormChanged = false
    // if (this.LessonLearnedForm.valid) {
    if (this.projecthubservice.itemid == "new") {
      var mainObjnew = {
        lessonLearnedId: "",
        projectUid: this.projecthubservice.projectid,
        leassonTitle: this.LessonLearnedForm.value.leassonTitle,
        lessonLogDate: this.LessonLearnedForm.value.lessonLogDate == null ? null : moment(this.LessonLearnedForm.value.lessonLogDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
        lessonDetail: this.LessonLearnedForm.value.lessonDetail,
        lessonType: this.LessonLearnedForm.value.lessonType,
        lessonCloseDate: this.LessonLearnedForm.value.lessonCloseDate == null ? null : moment(this.LessonLearnedForm.value.lessonCloseDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
        includeInCloseOutReport: this.LessonLearnedForm.value.includeInCloseOutReport,
        // criticality: this.LessonLearnedForm.value.criticality.lookUpId == undefined ? "" : this.LessonLearnedForm.value.criticality.lookUpId,
        criticality: this.LessonLearnedForm.value.criticality,
        submittedBy: this.LessonLearnedForm.value.submittedBy.userAdid == undefined || this.LessonLearnedForm.value.submittedBy.userAdid == null ? this.LessonLearnedForm.value.submittedBy : this.LessonLearnedForm.value.submittedBy.userAdid,
        createDetailedReviewSlide: this.LessonLearnedForm.value.createDetailedReviewSlide,
        // submittingGroupRole: this.LessonLearnedForm.value.submittingGroupRole.lookUpId == undefined ? "" : this.LessonLearnedForm.value.submittingGroupRole.lookUpId,
        submittingGroupRole: this.LessonLearnedForm.value.submittingGroupRole,
        suggestedAction: this.LessonLearnedForm.value.suggestedAction,
        dueDate: this.LessonLearnedForm.value.dueDate == null ? null : moment(this.LessonLearnedForm.value.dueDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
        // functionActionOwner: this.LessonLearnedForm.value.functionActionOwner.lookUpId == undefined ? "" : this.LessonLearnedForm.value.functionActionOwner.lookUpId,
        functionActionOwner: this.LessonLearnedForm.value.functionActionOwner,
        actionOwner: this.LessonLearnedForm.value.actionOwner.userAdid == undefined || this.LessonLearnedForm.value.actionOwner.userAdid == null ? "" : this.LessonLearnedForm.value.actionOwner.userAdid
      }

      if (this.LessonLearnedForm.controls['includeInCloseOutReport'].disabled) {
        mainObjnew.includeInCloseOutReport = false
      }
      //Log Date
      if (mainObjnew.lessonLogDate == "Invalid date") {
        mainObjnew.lessonLogDate = this.lessonLearned.lessonLogDate + ".000Z"
      }
      // if (this.LessonLearnedForm.controls['actionOwner'].value == "") {
      //   mainObjnew.ownerName = null
      //   mainObjnew.ownerId = null
      // }
      if (mainObjnew.dueDate == "Invalid date") {
        mainObjnew.dueDate = null
      }
      if (mainObjnew.lessonCloseDate == "Invalid date") {
        mainObjnew.lessonCloseDate = null
      }
      this.lessonLearnedUpdated.push(mainObjnew)
      this.apiService.bulkEditLessonLearned(this.lessonLearnedUpdated, this.projecthubservice.projectid).then(() => {
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.isNavChanged.next(true)
        this.projecthubservice.successSave.next(true)
      })
    }
    else {
      var index = this.lessonLearnedUpdated.findIndex(x => x.lessonLearnedId === this.lessonLearned[0].lessonLearnedId);
      // var mainObj = {
      this.lessonLearnedUpdated[index].lessonLearnedId = this.lessonLearned[0].lessonLearnedId,
        this.lessonLearnedUpdated[index].projectUid = this.lessonLearned[0].projectUid,
        this.lessonLearnedUpdated[index].leassonTitle = this.LessonLearnedForm.value.leassonTitle,
        this.lessonLearnedUpdated[index].lessonLogDate = this.LessonLearnedForm.value.lessonLogDate == null ? null : moment(this.LessonLearnedForm.value.lessonLogDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
        this.lessonLearnedUpdated[index].lessonDetail = this.LessonLearnedForm.value.lessonDetail,
        this.lessonLearnedUpdated[index].lessonType = this.LessonLearnedForm.value.lessonType,
        this.lessonLearnedUpdated[index].lessonCloseDate = this.LessonLearnedForm.value.lessonCloseDate == null ? null : moment(this.LessonLearnedForm.value.lessonCloseDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
        this.lessonLearnedUpdated[index].includeInCloseOutReport = this.LessonLearnedForm.value.includeInCloseOutReport,
        // this.lessonLearnedUpdated[index].criticality = Object.keys(this.LessonLearnedForm.value.criticality).length == 0 ? "" : this.LessonLearnedForm.value.criticality.lookUpId,
        this.lessonLearnedUpdated[index].criticality = this.LessonLearnedForm.value.criticality,
        this.lessonLearnedUpdated[index].submittedBy = this.LessonLearnedForm.value.submittedBy.userAdid == undefined || this.LessonLearnedForm.value.submittedBy.userAdid == null ? "" : this.LessonLearnedForm.value.submittedBy.userAdid,
        this.lessonLearnedUpdated[index].createDetailedReviewSlide = this.LessonLearnedForm.value.createDetailedReviewSlide,
        // this.lessonLearnedUpdated[index].submittingGroupRole = Object.keys(this.LessonLearnedForm.value.submittingGroupRole).length == 0 ? "" : this.LessonLearnedForm.value.submittingGroupRole.lookUpId,
        this.lessonLearnedUpdated[index].submittingGroupRole = this.LessonLearnedForm.value.submittingGroupRole,
        this.lessonLearnedUpdated[index].suggestedAction = this.LessonLearnedForm.value.suggestedAction,
        this.lessonLearnedUpdated[index].dueDate = this.LessonLearnedForm.value.dueDate == null ? null : moment(this.LessonLearnedForm.value.dueDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
        // this.lessonLearnedUpdated[index].functionActionOwner = Object.keys(this.LessonLearnedForm.value.functionActionOwner).length == 0 ? "" : this.LessonLearnedForm.value.functionActionOwner.lookUpId,
        this.lessonLearnedUpdated[index].functionActionOwner = this.LessonLearnedForm.value.functionActionOwner,
        this.lessonLearnedUpdated[index].actionOwner = this.LessonLearnedForm.value.actionOwner.userAdid == undefined || this.LessonLearnedForm.value.actionOwner.userAdid == null ? "" : this.LessonLearnedForm.value.actionOwner.userAdid
      // }
      // if (this.LessonLearnedForm.controls['actionOwner'].value == "") {
      //   mainObj.ownerName = null
      //   mainObj.ownerId = null
      // }
      //Log Date
      console.log(this.LessonLearnedForm.value.lessonLogDate)
      console.log(this.lessonLearned.logDate)
      if (this.lessonLearnedUpdated[index].lessonLogDate == "Invalid date") {
        this.lessonLearnedUpdated[index].lessonLogDate = this.lessonLearned.logDate + ".000Z"
      }
      if (this.lessonLearnedUpdated[index].dueDate == "Invalid date") {
        this.lessonLearnedUpdated[index].dueDate = null
      }
      if (this.lessonLearnedUpdated[index].lessonCloseDate == "Invalid date") {
        this.lessonLearnedUpdated[index].lessonCloseDate = null
      }
      this.apiService.bulkEditLessonLearned(this.lessonLearnedUpdated, this.projecthubservice.projectid).then(res => {
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.isNavChanged.next(true)
        this.projecthubservice.successSave.next(true)
      })

    }
    // }
  }
}

