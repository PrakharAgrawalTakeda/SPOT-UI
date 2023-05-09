import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { forEach } from 'lodash';
import moment from 'moment';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-lesson-learned-bulk-edit',
  templateUrl: './lesson-learned-bulk-edit.component.html',
  styleUrls: ['./lesson-learned-bulk-edit.component.scss']
})
export class LessonLearnedBulkEditComponent implements OnInit {
  viewContent:boolean=false
  lessonLearnedForm = new FormArray([])
  lessonLearnedData: any;
  lessonsLearned = []
  lessonLearnedTableEditStack = []
  lookupdata:any
  lessonLearnedDb = []
  lessonLearnedSubmit = []
  activeaccount: any
  constructor(private authService: MsalService, public auth: AuthService, public projecthubservice: ProjectHubService, private apiService: ProjectApiService, public fuseAlert: FuseConfirmationService) {
    this.lessonLearnedForm.valueChanges.subscribe(res => {
      if (this.viewContent == true) {
        this.formValue()
        if (JSON.stringify(this.lessonLearnedDb) != JSON.stringify(this.lessonLearnedSubmit)) {
          this.projecthubservice.isFormChanged = true
        } else {
          this.projecthubservice.isFormChanged = false
        }
      }
    })
   }

  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
    this.apiService.getLessonLearnedbyProjectId(this.projecthubservice.projectid).then((res: any) => {
      this.lessonLearnedData = res
      for (var j = 0; j < res.length; j++) {
        res[j].actionOwnerName = res[j].actionOwner.userDisplayName
        res[j].submittedByName = res[j].submittedBy.userDisplayName
      }
      this.lessonsLearned = res
      this.lessonsLearned = this.sortbyDateTypeName(this.lessonsLearned)
      this.lessonLearnedDb = this.lessonsLearned.map(x => {
        return {
          "lessonLearnedId": x.lessonLearnedId,
          "projectUid": x.projectid,
          "actionOwner": x.actionOwner.userAdid,
          "actionOwnerName": x.actionOwner.userDisplayName,
          "createDetailedReviewSlide": x.createDetailedReviewSlide,
          "criticality": x.criticality,
          "dueDate": x.dueDate,
          "functionActionOwner": x.functionActionOwner,
          "includeInCloseOutReport": x.includeInCloseOutReport,
          "leassonTitle": x.leassonTitle,
          "lessonCloseDate": x.lessonCloseDate,
          "lessonDetail": x.lessonDetail,
          "lessonLogDate": x.lessonLogDate,
          "lessonType": x.lessonType,
          "submittedBy": x.submittedBy.userAdid,
          "submittedByName": x.submittedBy.userDisplayName,
          "submittingGroupRole": x.submittingGroupRole,
          "suggestedAction": x.suggestedAction
        }
      })
      for (var i of this.lessonsLearned) {
        // this.opDb.push(i)
        this.lessonLearnedForm.push(new FormGroup({
          lessonLearnedId: new FormControl(i.lessonLearnedId),
          projectUid: new FormControl(this.projecthubservice.projectid),
          actionOwner: new FormControl(i.actionOwner ? {
            userAdid: i.actionOwner.userAdid,
            userDisplayName: i.actionOwner.userDisplayName
          } : {}),
          actionOwnerName: new FormControl(i.actionOwner.userDisplayName),
          createDetailedReviewSlide: new FormControl(i.createDetailedReviewSlide),
          criticality: new FormControl(i.criticality),
          dueDate: new FormControl(i.dueDate),
          functionActionOwner: new FormControl(i.functionActionOwner),
          includeInCloseOutReport: new FormControl(i.includeInCloseOutReport),
          leassonTitle: new FormControl(i.leassonTitle),
          lessonCloseDate: new FormControl(i.lessonCloseDate),
          lessonDetail: new FormControl(i.lessonDetail),
          lessonLogDate: new FormControl(i.lessonLogDate),
          lessonType: new FormControl(i.lessonType),
          submittedBy: new FormControl(i.submittedBy ? {
            userAdid: i.submittedBy.userAdid,
            userDisplayName: i.submittedBy.userDisplayName
          } : {}),
          submittedByName: new FormControl(i.submittedBy.userDisplayName),
          submittingGroupRole: new FormControl(i.submittingGroupRole),
          suggestedAction: new FormControl(i.suggestedAction),
          typeName: new FormControl(i.lessonType == "" ? "" : this.lookupdata.filter(x => x.lookUpId == i.lessonType)[0].lookUpName)
        }))
      }
      this.disabler();
      this.viewContent = true
    })
  })
  }

  disabler() {
    var formValue = this.lessonLearnedForm.getRawValue()
    if (formValue.length > 0) {
      if (formValue.filter(x => x.includeInCloseOutReport == true).length < 4) {
        for (var i of this.lessonLearnedForm.controls) {
          i['controls']['includeInCloseOutReport'].enable()
        }
      } else {
        for (var i of this.lessonLearnedForm.controls) {
          if (i['controls']['includeInCloseOutReport'].value != true) {
            i['controls']['includeInCloseOutReport'].disable()
          }
        }
      }
    }
  }

  getLookUpName(id: string): string {
    return id && id != '' ? this.lookupdata.find(x => x.lookUpId == id).lookUpName : ''
  }

  addLL() {
    this.activeaccount = this.authService.instance.getActiveAccount();
    var user = {
      userAdid: this.activeaccount.localAccountId,
      userDisplayName: this.activeaccount.name
    };
    var j = [{}]
      j = [{
        lessonLearnedId: '',
        projectUid: '',
        actionOwner: '',
        actionOwnerName: '',
        createDetailedReviewSlide: false,
        criticality: '',
        dueDate: '',
        functionActionOwner: '',
        includeInCloseOutReport: false,
        leassonTitle: '',
        lessonCloseDate: '',
        lessonDetail: '',
        lessonLogDate: '',
        lessonType: '',
        submittedBy: user,
        submittedByName: user.userDisplayName,
        submittingGroupRole: '',
        suggestedAction: '',
        typeName: ''
      }]
    this.lessonLearnedForm.push(new FormGroup({
      lessonLearnedId: new FormControl(''),
      projectUid: new FormControl(this.projecthubservice.projectid),
      actionOwner: new FormControl(''),
      actionOwnerName: new FormControl(''),
      createDetailedReviewSlide: new FormControl(false),
      criticality: new FormControl(''),
      dueDate: new FormControl(''),
      functionActionOwner: new FormControl(''),
      includeInCloseOutReport: new FormControl(false),
      leassonTitle: new FormControl(''),
      lessonCloseDate: new FormControl(''),
      lessonDetail: new FormControl(''),
      lessonLogDate: new FormControl(''),
      lessonType: new FormControl(''),
      submittedBy: new FormControl(user),
      submittedByName: new FormControl(user.userDisplayName),
      submittingGroupRole: new FormControl(''),
      suggestedAction: new FormControl(''),
      typeName: new FormControl('')
      }))
    // }
    this.disabler()
    this.lessonsLearned = [...this.lessonsLearned, ...j]
    this.lessonLearnedTableEditStack.push(this.lessonsLearned.length - 1)
    var div = document.getElementsByClassName('datatable-scroll')[0]
    setTimeout(() => {
      div.scroll({
        top: div.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);

  }

  sortbyDateTypeName(array: any): any {
    return array.length > 1 ? array.sort((a, b) => {
      a.typeName = a.lessonType == "" ? "" : this.lookupdata.filter(x => x.lookUpId == a.lessonType)[0].lookUpName
      b.typeName = b.lessonType == "" ? "" : this.lookupdata.filter(x => x.lookUpId == b.lessonType)[0].lookUpName
      if (a.lessonCloseDate === null) {
        return -1;
      }

      if (new Date(b.lessonCloseDate) === null) {
        return 1;
      }

      if (a.lessonCloseDate === b.lessonCloseDate) {
        return a.typeName < b.typeName ? -1 : (a.typeName > b.typeName) ? 1 : 0;
      } else {
        return a.lessonCloseDate < b.lessonCloseDate ? -1 : 1;
      }
    }) : array

  }

  
  lessonLearnedTableEditRow(rowIndex) {
    if (!this.lessonLearnedTableEditStack.includes(rowIndex)) {
      this.lessonLearnedTableEditStack.push(rowIndex)
    }
    this.disabler()
  }

  deleteLL(rowIndex: number) {
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
        this.lessonsLearned.splice(rowIndex, 1)
        this.lessonLearnedForm.removeAt(rowIndex)
        if (this.lessonLearnedTableEditStack.includes(rowIndex)) {
          this.lessonLearnedTableEditStack.splice(this.lessonLearnedTableEditStack.indexOf(rowIndex), 1)
        }
        this.lessonLearnedTableEditStack = this.lessonLearnedTableEditStack.map(function (value) {
          return value > rowIndex ? value - 1 : value;
        })
        this.disabler()
        this.lessonsLearned = [...this.lessonsLearned]
      }
    }
    )
  }

  getFunctionOwner(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77").sort((a, b) => {
      return a.lookUpOrder - b.lookUpOrder;
    })
  }

  getType(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == "3B747FFC-139E-4ECC-8123-85D8A730245E")
  }

  getCriticality(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == "DFC4E626-10A1-464E-8B1A-09A223B125A1")
  }

  submitLL() {
    if (JSON.stringify(this.lessonLearnedDb) != JSON.stringify(this.lessonLearnedSubmit)) {
      this.projecthubservice.isFormChanged = false
        this.formValue()
      this.apiService.bulkEditLessonLearned(this.lessonLearnedSubmit, this.projecthubservice.projectid).then(res => {
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.isNavChanged.next(true)
        })
    } else {
      this.projecthubservice.submitbutton.next(true)
      this.projecthubservice.toggleDrawerOpen('', '', [], '')
      this.projecthubservice.isNavChanged.next(true)
    }
  }

  formValue() {
    var form = this.lessonLearnedForm.getRawValue()
    if (form.length > 0) {
      this.lessonLearnedSubmit = []
      for (var x of form) {
        this.lessonLearnedSubmit.push({
          "lessonLearnedId": x.lessonLearnedId,
          "projectUid": this.projecthubservice.projectid,
          "actionOwner": x.actionOwner.userAdid == undefined || x.actionOwner.userAdid == null ? "" : x.actionOwner.userAdid,
          "createDetailedReviewSlide": x.createDetailedReviewSlide,
          "criticality": x.criticality == null ? x.criticality : x.criticality.lookUpId == undefined ? x.criticality : x.criticality.lookUpId,
          "dueDate": x.dueDate ? moment(x.dueDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
          "functionActionOwner": x.functionActionOwner == null ? x.functionActionOwner : x.functionActionOwner.lookUpId == undefined ? x.functionActionOwner : x.functionActionOwner.lookUpId,
          "includeInCloseOutReport": x.includeInCloseOutReport,
          "leassonTitle": x.leassonTitle,
          "lessonCloseDate": x.lessonCloseDate ? moment(x.lessonCloseDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
          "lessonDetail": x.lessonDetail,
          "lessonLogDate": x.lessonLogDate ? moment(x.lessonLogDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
          "lessonType": x.lessonType == null ? x.lessonType : x.lessonType.lookUpId == undefined ? x.lessonType : x.lessonType.lookUpId,
          "submittedBy": x.submittedBy.userAdid == undefined || x.submittedBy.userAdid == null ? "" : x.submittedBy.userAdid,
          "submittingGroupRole": x.submittingGroupRole == null ? x.submittingGroupRole : x.submittingGroupRole.lookUpId == undefined ? x.submittingGroupRole : x.submittingGroupRole.lookUpId,
          "suggestedAction": x.suggestedAction
        })
      }
    } else {
      this.lessonLearnedSubmit = []
    }
  }

}
