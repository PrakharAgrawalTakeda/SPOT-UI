import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import * as moment from 'moment';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
@Component({
  selector: 'app-ask-need-bulk-edit',
  templateUrl: './ask-need-bulk-edit.component.html',
  styleUrls: ['./ask-need-bulk-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AskNeedBulkEditComponent implements OnInit {

  constructor(public projectHubService: ProjectHubService, public apiService: ProjectApiService, public indicator: SpotlightIndicatorsService, public fuseAlert: FuseConfirmationService) {
    this.projectHubService.includeClosedItems.askNeed.subscribe(res => {
      if (this.viewContent) {
        if (this.toggleHelper) {
          this.changeaskneed(res, true)
        }
      }
    })

    this.askNeedForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.submitPrep()
        this.formValue = this.sortByNeedByDate(this.formValue)
        this.dbAskNeeds = this.sortByNeedByDate(this.dbAskNeeds)
        if (JSON.stringify(this.formValue) != JSON.stringify(this.dbAskNeeds)) {
          console.log("DB VALUE", this.dbAskNeeds)
          console.log("FORM VALUE", this.formValue)
          console.log("FLASH CHANGE FLASH CHANGEEEEEEEE")
          this.projectHubService.isFormChanged = true
        }
        else {
          this.projectHubService.isFormChanged = false
          console.log('CONGRATS')
        }
      }
    })
  }
  today = new Date()
  askNeedData: any = []
  isclosedaskneedtoggle: boolean = false
  localIncludedItems = new FormGroup({
    toggle: new FormControl(false)
  })
  toggleHelper: boolean = false
  tableData: any = []
  anTableEditStack = []
  viewContent: boolean = false
  dbAskNeeds: any = []
  formValue: any = []
  links: any = []
  linksProblemCapture: any = []
  getRowClass = (row) => {
    return {
      'row-color1': row.closeDate != null,
    };
  };
  askNeedForm = new FormArray([])
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.viewContent = false
    if (this.projectHubService.projectid) {
      this.apiService.getprojectviewdata(this.projectHubService.projectid).then((res: any) => {
        this.askNeedData = res.askNeedData
        if (res.askNeedData.length > 0) {
          for (var i of res.askNeedData) {
            this.dbAskNeeds.push({
              askNeedUniqueId: i.askNeedUniqueId,
              projectId: i.projectId,
              askNeed1: i.askNeed1,
              needFromId: i.needFromId,
              needFromName: i.needFromName,
              needByDate: i.needByDate ? moment(i.needByDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
              comments: i.comments,
              logDate: i.logDate ? moment(i.logDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
              closeDate: i.closeDate ? moment(i.closeDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
              includeInReport: i.includeInReport,
              indicator: i.indicator
            })
          }
          this.dbAskNeeds = this.sortByNeedByDate(this.dbAskNeeds)
        }
        this.links = res.links
        this.linksProblemCapture = res.linksProblemCapture
        this.changeaskneed(this.projectHubService.includeClosedItems.askNeed.value)
        this.tableData = this.sortByNeedByDate(this.tableData)
        console.log(this.tableData)
        this.tableData.length > 0 ? this.formIntializer() : ''




        this.viewContent = true
      })
    }
  }
  reset() {
    this.dbAskNeeds = []
    this.formValue = []
    this.anTableEditStack = []
    this.askNeedForm.clear()
  }
  formIntializer() {
    for (var x of this.tableData) {
      this.askNeedForm.push(new FormGroup({
        askNeedUniqueId: new FormControl(x.askNeedUniqueId),
        projectId: new FormControl(x.projectId),
        askNeed1: new FormControl(x.askNeed1),
        needFrom: new FormControl(x.needFromId ? {
          userAdid: x.needFromId,
          userDisplayName: x.needFromName
        } : {}),
        needByDate: new FormControl(x.needByDate),
        comments: new FormControl(x.comments),
        logDate: new FormControl(x.logDate),
        closeDate: new FormControl(x.closeDate),
        includeInReport: new FormControl(x.includeInReport),
        indicator: new FormControl(x.indicator)
      }))
    }
    this.disabler()
  }

  submitPrep() {
    this.formValue = []
    var formValue = this.askNeedForm.getRawValue()
    if (!this.projectHubService.includeClosedItems.askNeed.value) {
      this.formValue = this.dbAskNeeds.length > 0 ? this.dbAskNeeds.filter(x => x.closeDate != null) : []
    }
    for (var i of formValue) {
      this.formValue.push({
        askNeedUniqueId: i.askNeedUniqueId,
        projectId: i.projectId,
        askNeed1: i.askNeed1,
        needFromId: Object.keys(i.needFrom).length > 0 ? i.needFrom.userAdid : null,
        needFromName: Object.keys(i.needFrom).length > 0 ? i.needFrom.userDisplayName : null,
        needByDate: i.needByDate ? moment(i.needByDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
        comments: i.comments,
        logDate: i.logDate ? moment(i.logDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
        closeDate: i.closeDate ? moment(i.closeDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
        includeInReport: i.includeInReport,
        indicator: i.indicator
      })
    }
  }
  sortByNeedByDate(array: any): any {
    return array.length > 1 ? array.sort((a, b) => {
      if (a.needByDate === null) {
        return -1;
      }

      if (b.needByDate === null) {
        return 1;
      }

      if (a.needByDate === b.needByDate) {
        return 0;
      }

      return a.needByDate < b.needByDate ? -1 : 1;
    }) : array
  }

  disabler() {
    this.submitPrep()
    var formValue = this.formValue
    if (formValue.length > 0) {
      if (formValue.filter(x => x.includeInReport == true).length < 1) {
        for (var i of this.askNeedForm.controls) {
          i['controls']['includeInReport'].enable()
        }
      }
      else {
        for (var i of this.askNeedForm.controls) {
          if (i['controls']['includeInReport'].value != true) {
            i['controls']['includeInReport'].disable()
          }
        }
      }
    }
  }

  submitAN() {
    if (this.projectHubService.isFormChanged) {
      this.submitPrep()
      this.projectHubService.isFormChanged = false
      this.apiService.bulkeditAskNeeds(this.formValue, this.projectHubService.projectid).then(res => {
        this.projectHubService.toggleDrawerOpen('', '', [], '')
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
      }
      )
    }
    else {
      this.projectHubService.toggleDrawerOpen('', '', [], '')
      this.projectHubService.successSave.next(true)
    }
  }
  // ASK NEED CONTROL
  islink(uid: string): boolean {
    return this.links.some(x => x.linkItemId == uid)
  }
  getlinkname(uid: string): string {
    let temp = this.links.find(x => x.linkItemId == uid)
    temp = this.linksProblemCapture.find(x => x.problemUniqueId == temp.childProjectId)
    if (temp) {
      return "This ask/need is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle
    }
    temp = this.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
    if (temp) {
      return "A link to this ask/need has been created in project(s): " + temp.problemId.toString() + " - " + temp.problemTitle
    }
  }
  toggleAskNeed(event: any) {
    this.toggleHelper = true
    this.projectHubService.includeClosedItems.askNeed.next(event.checked)
  }
  changeaskneed(event: any, initial: boolean = false) {
    if (initial) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Are you sure?",
        "message": "Are you sure you want to show/hide closed items, all unsaved data will be lost. ",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warn"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "OK",
            "color": "warn"
          },
          "cancel": {
            "show": true,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      if (this.projectHubService.isFormChanged) {
        const askNeedAlert = this.fuseAlert.open(comfirmConfig)
        askNeedAlert.afterClosed().subscribe(close => {
          if (close == 'confirmed') {
            if (event == true) {
              this.isclosedaskneedtoggle = true
              this.tableData = this.askNeedData
            }
            else {
              this.isclosedaskneedtoggle = false
              this.tableData = this.askNeedData.filter(row => row.closeDate == null)
            }
            this.localIncludedItems.controls.toggle.patchValue(event)
            this.localIncludedItems.controls.toggle.markAsPristine()
            this.reset()
            this.dataloader()
          }
          else {
            this.localIncludedItems.controls.toggle.patchValue(!event)
            this.localIncludedItems.controls.toggle.markAsPristine()
            this.toggleHelper = false
            this.projectHubService.includeClosedItems.askNeed.next(!event)
          }
        })
      }
      else {
        if (event == true) {
          this.isclosedaskneedtoggle = true
          this.tableData = this.askNeedData
        }
        else {
          this.isclosedaskneedtoggle = false
          this.tableData = this.askNeedData.filter(row => row.closeDate == null)
        }
        this.localIncludedItems.controls.toggle.patchValue(event)
        this.localIncludedItems.controls.toggle.markAsPristine()
        this.reset()
        this.dataloader()
      }
    }
    else {
      if (event == true) {
        this.isclosedaskneedtoggle = true
        this.tableData = this.askNeedData
      }
      else {
        this.isclosedaskneedtoggle = false
        this.tableData = this.askNeedData.filter(row => row.closeDate == null)
      }
      this.localIncludedItems.controls.toggle.patchValue(event)
      this.localIncludedItems.controls.toggle.markAsPristine()
    }
  }

  //TABLE CONTROLS

  anTableEditRow(rowIndex) {
    if (!this.anTableEditStack.includes(rowIndex)) {
      this.anTableEditStack.push(rowIndex)
    }
    this.disabler()
  }

  deleteAN(rowIndex: number) {
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
        console.log(this.tableData)
        this.tableData.splice(rowIndex, 1)
        console.log(this.askNeedForm.getRawValue())
        this.askNeedForm.removeAt(rowIndex)
        if (this.anTableEditStack.includes(rowIndex)) {
          this.anTableEditStack.splice(this.anTableEditStack.indexOf(rowIndex), 1)
        }
        this.anTableEditStack = this.anTableEditStack.map(function (value) {
          return value > rowIndex ? value - 1 : value;
        })
        this.disabler()
        this.tableData = [...this.tableData]
      }
    }
    )
  }

  addAN() {
    this.askNeedForm.push(new FormGroup({
      askNeedUniqueId: new FormControl(''),
      projectId: new FormControl(this.projectHubService.projectid),
      askNeed1: new FormControl(''),
      needFrom: new FormControl({}),
      needByDate: new FormControl(''),
      comments: new FormControl(''),
      logDate: new FormControl(this.today),
      closeDate: new FormControl(''),
      includeInReport: new FormControl(false),
      indicator: new FormControl('')
    }))
    var j = [{
      askNeedUniqueId: '',
      projectId: '',
      askNeed1: '',
      needFromId: '',
      needFromName: '',
      needByDate: '',
      comments: '',
      logDate: '',
      closeDate: null,
      includeInReport: '',
      indicator: ''
    }]
    this.disabler()
    this.tableData = [...this.tableData, ...j]
    this.anTableEditStack.push(this.tableData.length - 1)
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
