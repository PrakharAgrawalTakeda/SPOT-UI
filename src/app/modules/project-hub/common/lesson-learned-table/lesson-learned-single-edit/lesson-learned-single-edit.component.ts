import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import moment from 'moment';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-lesson-learned-single-edit',
  templateUrl: './lesson-learned-single-edit.component.html',
  styleUrls: ['./lesson-learned-single-edit.component.scss']
})
export class LessonLearnedSingleEditComponent implements OnInit {
  today = new Date();
  formFieldHelpers: string[] = [''];
  id:string = ""
  lookupdata:any
  lessonLearned:any
  lessonLearnedData:any
  LessonLearnedForm= new FormGroup({
    includeInCloseOutReport: new FormControl(false),
    createDetailedReviewSlide: new FormControl(false),
    lessonLogDate: new FormControl(''),
    leassonTitle: new FormControl(''),
    lessonDetail: new FormControl(''),
    lessonType: new FormControl(''),
    criticality: new FormControl(''),
    submittedBy: new FormControl(''),
    submittingGroupRole: new FormControl(''),
    suggestedAction: new FormControl(''),
    dueDate: new FormControl(''),
    functionActionOwner: new FormControl(''),
    actionOwner: new FormControl(''),
    lessonCloseDate: new FormControl('')
  })
  constructor(private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) { }

  ngOnInit(): void {
    this.getllookup()
  }

  GetType(): string {
    return this.lookupdata.filter(x => x.lookUpParentId == "3B747FFC-139E-4ECC-8123-85D8A730245E")
  }
  GetCriticality(): string {
    return this.lookupdata.filter(x => x.lookUpParentId == "DFC4E626-10A1-464E-8B1A-09A223B125A1")
  }
  GetRole(): string {
    return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
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
            actionOwner: this.lessonLearned[0].actionOwner,
            // actionOwner: new FormControl(x.actionOwner ? {
            //   userAdid: x.actionOwner,
            //   userDisplayName: x.actionOwnerName
            // } : {}),
            createDetailedReviewSlide: this.lessonLearned[0].createDetailedReviewSlide,
            criticality: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].criticality) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].criticality) : {},
            dueDate: this.lessonLearned[0].dueDate,
            functionActionOwner: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].functionActionOwner) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].functionActionOwner) : {},
            includeInCloseOutReport: this.lessonLearned[0].includeInCloseOutReport,
            leassonTitle: this.lessonLearned[0].leassonTitle,
            lessonCloseDate: this.lessonLearned[0].lessonCloseDate,
            lessonDetail: this.lessonLearned[0].lessonDetail,
            lessonLogDate: this.lessonLearned[0].lessonLogDate ? this.lessonLearned[0].lessonLogDate : this.today,
            lessonType: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].lessonType) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].lessonType) : {},
            submittedBy: this.lessonLearned[0].submittedBy,
            // owner: new FormControl(x.ownerId ? {
            //   userAdid: x.ownerId,
            //   userDisplayName: x.ownerName
            // } : {}),
            submittingGroupRole: this.lookupdata.some(x => x.lookUpId == this.lessonLearned[0].submittingGroupRole) ? this.lookupdata.find(x => x.lookUpId == this.lessonLearned[0].submittingGroupRole) : {},
            suggestedAction: this.lessonLearned[0].suggestedAction
          })
          this.LessonLearnedForm.controls['lessonLogDate'].disable()
          // if (res.functionGroupId != null) {
          //   this.riskIssueForm.controls.function.patchValue(this.lookupdata?.find(x => x.lookUpId == res.functionGroupId)?.lookUpName)
          // }
          if (this.projecthubservice.all != []) {
            if (this.projecthubservice.all.filter(x => x.includeInCloseOutReport == true).length >= 4) {
              if (this.LessonLearnedForm.value.includeInCloseOutReport != true) {
                this.LessonLearnedForm.controls['includeInCloseOutReport'].disable()
              }
            }
          }
          this.projecthubservice.isFormChanged = false
      }
      else {
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
          submittedBy: "",
          submittingGroupRole: "",
          suggestedAction: ""
        })
        this.LessonLearnedForm.controls['lessonLogDate'].disable()
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
    this.projecthubservice.isFormChanged = false
    if (this.LessonLearnedForm.valid) {
      if (this.projecthubservice.itemid == "new") {
        var mainObjnew = {
          lessonLearnedId: "",
          projectUid: this.projecthubservice.projectid,
          leassonTitle: this.LessonLearnedForm.value.leassonTitle ,
          lessonLogDate: moment(this.LessonLearnedForm.value.lessonLogDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          lessonDetail: this.LessonLearnedForm.value.lessonDetail,
          lessonType: this.LessonLearnedForm.value.lessonType.lookUpId == undefined ? this.LessonLearnedForm.value.lessonType : this.LessonLearnedForm.value.lessonType.lookUpId,
          lessonCloseDate: moment(this.LessonLearnedForm.value.lessonCloseDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          includeInCloseOutReport: this.LessonLearnedForm.value.includeInCloseOutReport,
          criticality: this.LessonLearnedForm.value.criticality.lookUpId == undefined ? this.LessonLearnedForm.value.criticality : this.LessonLearnedForm.value.criticality.lookUpId,
          submittedBy: this.LessonLearnedForm.value.submittedBy.userAdid == undefined ? this.LessonLearnedForm.value.submittedBy : this.LessonLearnedForm.value.submittedBy.userAdid,
          createDetailedReviewSlide: this.LessonLearnedForm.value.createDetailedReviewSlide,
          submittingGroupRole: this.LessonLearnedForm.value.submittingGroupRole.lookUpId == undefined ? this.LessonLearnedForm.value.submittingGroupRole : this.LessonLearnedForm.value.submittingGroupRole.lookUpId,
          suggestedAction: this.LessonLearnedForm.value.suggestedAction,
          dueDate: moment(this.LessonLearnedForm.value.dueDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          functionActionOwner: this.LessonLearnedForm.value.functionActionOwner.lookUpId == undefined ? this.LessonLearnedForm.value.functionActionOwner : this.LessonLearnedForm.value.functionActionOwner.lookUpId,
          actionOwner: this.LessonLearnedForm.value.actionOwner.userAdid == undefined ? this.LessonLearnedForm.value.actionOwner : this.LessonLearnedForm.value.actionOwner.userAdid
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
        this.lessonLearnedData.push(mainObjnew)
        this.apiService.bulkEditLessonLearned(this.lessonLearnedData, this.projecthubservice.projectid).then(() => {
              this.projecthubservice.toggleDrawerOpen('', '', [], '')
              this.projecthubservice.submitbutton.next(true)
              this.projecthubservice.isNavChanged.next(true)
            })
        }
      else {
        var index = this.lessonLearnedData.findIndex(x => x.lessonLearnedId === this.lessonLearned[0].lessonLearnedId);
        // var mainObj = {
          this.lessonLearnedData[index].lessonLearnedId= this.lessonLearned[0].lessonLearnedId,
            this.lessonLearnedData[index].projectUid = this.lessonLearned[0].projectUid,
          this.lessonLearnedData[index].leassonTitle= this.LessonLearnedForm.value.leassonTitle,
          this.lessonLearnedData[index].lessonLogDate= moment(this.LessonLearnedForm.value.lessonLogDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          this.lessonLearnedData[index].lessonDetail= this.LessonLearnedForm.value.lessonDetail,
            this.lessonLearnedData[index].lessonType = this.LessonLearnedForm.value.lessonType.lookUpId == undefined ? this.LessonLearnedForm.value.lessonType : this.LessonLearnedForm.value.lessonType.lookUpId,
          this.lessonLearnedData[index].lessonCloseDate= moment(this.LessonLearnedForm.value.lessonCloseDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          this.lessonLearnedData[index].includeInCloseOutReport= this.LessonLearnedForm.value.includeInCloseOutReport,
            this.lessonLearnedData[index].criticality = this.LessonLearnedForm.value.criticality.lookUpId == undefined ? this.LessonLearnedForm.value.criticality : this.LessonLearnedForm.value.criticality.lookUpId,
            this.lessonLearnedData[index].submittedBy = this.LessonLearnedForm.value.submittedBy.userAdid == undefined ? this.LessonLearnedForm.value.submittedBy : this.LessonLearnedForm.value.submittedBy.userAdid,
          this.lessonLearnedData[index].createDetailedReviewSlide= this.LessonLearnedForm.value.createDetailedReviewSlide,
            this.lessonLearnedData[index].submittingGroupRole = this.LessonLearnedForm.value.submittingGroupRole.lookUpId == undefined ? this.LessonLearnedForm.value.submittingGroupRole : this.LessonLearnedForm.value.submittingGroupRole.lookUpId,
          this.lessonLearnedData[index].suggestedAction= this.LessonLearnedForm.value.suggestedAction,
          this.lessonLearnedData[index].dueDate= moment(this.LessonLearnedForm.value.dueDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
            this.lessonLearnedData[index].functionActionOwner = this.LessonLearnedForm.value.functionActionOwner.lookUpId == undefined ? this.LessonLearnedForm.value.functionActionOwner : this.LessonLearnedForm.value.functionActionOwner.lookUpId,
            this.lessonLearnedData[index].actionOwner = this.LessonLearnedForm.value.actionOwner.userAdid == undefined ? this.LessonLearnedForm.value.actionOwner : this.LessonLearnedForm.value.actionOwner.userAdid
        // }
        // if (this.LessonLearnedForm.controls['actionOwner'].value == "") {
        //   mainObj.ownerName = null
        //   mainObj.ownerId = null
        // }
        //Log Date
        console.log(this.LessonLearnedForm.value.lessonLogDate)
        console.log(this.lessonLearned.logDate)
        if (this.lessonLearnedData[index].lessonLogDate == "Invalid date") {
          this.lessonLearnedData[index].lessonLogDate = this.lessonLearned.logDate + ".000Z"
        }
        if (this.lessonLearnedData[index].dueDate == "Invalid date") {
          this.lessonLearnedData[index].dueDate = null
        }
        if (this.lessonLearnedData[index].lessonCloseDate == "Invalid date") {
          this.lessonLearnedData[index].lessonCloseDate = null
        }
        this.apiService.bulkEditLessonLearned(this.lessonLearnedData, this.projecthubservice.projectid).then(res => {
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.isNavChanged.next(true)
        })

      }
    }
    }
 }

