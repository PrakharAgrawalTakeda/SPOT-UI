import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import * as moment from 'moment';
@Component({
  selector: 'app-ask-need-bulk-edit',
  templateUrl: './ask-need-bulk-edit.component.html',
  styleUrls: ['./ask-need-bulk-edit.component.scss']
})
export class AskNeedBulkEditComponent implements OnInit {

  constructor(public projectHubService: ProjectHubService, public apiService: ProjectApiService, public indicator: SpotlightIndicatorsService) {
    this.projectHubService.includeClosedItems.askNeed.subscribe(res => {
      this.changeaskneed(res)
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
        }
        else {
          console.log('CONGRATS')
        }
      }
    })
  }
  askNeedData: any = []
  isclosedaskneedtoggle: boolean = false
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
    this.projectHubService.includeClosedItems.askNeed.next(event.checked)
  }
  changeaskneed(event: any) {
    if (event == true) {
      this.isclosedaskneedtoggle = true
      this.tableData = this.askNeedData
    }
    else {
      this.isclosedaskneedtoggle = false
      this.tableData = this.askNeedData.filter(row => row.closeDate == null)
    }
  }

  //TABLE CONTROLS

  anTableEditRow(rowIndex) {
    if (!this.anTableEditStack.includes(rowIndex)) {
      this.anTableEditStack.push(rowIndex)
    }
  }

  deleteAN(rowIndex: number) {
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
    this.tableData = [...this.tableData]
  }

  addAN() {
    this.askNeedForm.push(new FormGroup({
      askNeedUniqueId: new FormControl(''),
      projectId: new FormControl(this.projectHubService.projectid),
      askNeed1: new FormControl(''),
      needFrom: new FormControl({}),
      needByDate: new FormControl(''),
      comments: new FormControl(''),
      logDate: new FormControl(''),
      closeDate: new FormControl(''),
      includeInReport: new FormControl(''),
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
    this.tableData = [...this.tableData, ...j]
    this.anTableEditStack.push(this.tableData.length - 1)

  }
}
