import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';

@Component({
  selector: 'app-schedule-link',
  templateUrl: './schedule-link.component.html',
  styleUrls: ['./schedule-link.component.scss']
})
export class ScheduleLinkComponent implements OnInit {

  constructor(public projectHubService: ProjectHubService, public apiService: ProjectApiService, public fuseAlert: FuseConfirmationService) { }

  linkData: any = []
  linkDBData: any = []
  linkedSchedules: any = []
  viewContent: boolean = false
  localIncludedItems = new FormGroup({
    toggle: new FormControl(false)
  })
  toggleHelper: boolean = false
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.linkData = []
    this.linkDBData = []
    this.linkedSchedules = []
    this.apiService.milestoneGetLinkData(this.projectHubService.projectid).then(res => {
      console.log("Schedule Link",res)
      this.linkDBData = [...this.sortByLevel(res)]
      if (!this.projectHubService.includeClosedItems.schedule.value) {
        this.linkData = this.sortByLevel(this.filterClosedItems(res))
      }
      else {
        this.linkData = this.sortByLevel(res)
      }
      for (var i in this.linkData) {
        this.linkedSchedules.push([])
      }
      this.localIncludedItems.controls.toggle.patchValue(this.projectHubService.includeClosedItems.schedule.value)
      this.projectHubService.isFormChanged = false
      this.viewContent = true
    })
  }

  filterClosedItems(array: any): any {
    var returnObject: any = []
    for (var item of array) {
      returnObject.push({
        projectUId: item.projectUId,
        projectId: item.projectId,
        projectName: item.projectName,
        level: item.level,
        schedules: item.schedules.length > 0 ? this.sortByPlannedFinishDate(item.schedules.filter(x => x.completionDate == null)) : [],
        schedulesLink: item.schedulesLink,
        scheduleLinkProjectDetails: item.scheduleLinkProjectDetails
      })
    }
    return returnObject
  }
  toggleSchedule(event: any) {
    this.linkedSchedules[event.tableIndex] = [...event.selected]
    console.log("Linked Schedules", this.linkedSchedules)
  }
  toggleClosedItems($event) {
    if (this.viewContent) {
      if (this.projectHubService.isFormChanged) {
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
        const scheduleAlert = this.fuseAlert.open(comfirmConfig)
        scheduleAlert.afterClosed().subscribe(close => {
          if (close == 'confirmed') {
            this.projectHubService.includeClosedItems.schedule.next($event.checked)
            this.dataloader()
          }
          else {
            this.toggleHelper = false
            this.localIncludedItems.controls.toggle.patchValue(!$event.checked)
          }
        })
      }
      else {
        console.log("Event Value", $event.checked)
        this.projectHubService.includeClosedItems.schedule.next($event.checked)
        this.dataloader()
      }
    }
    this.localIncludedItems.controls.toggle.markAsPristine()
  }

  sortByLevel(array: any): any {
    return array.length > 1 ? array.sort((a, b) => {
      if (a.level === null) {
        return -1;
      }
      if (b.level === null) {
        return 1;
      }
      if (a.level === b.level) {
        return 0;
      }
      return a.level < b.level ? -1 : 1;
    }) : array
  }
  sortByPlannedFinishDate(array: any): any {
    return array.length > 1 ? array.sort((a, b) => {
      if (a.plannedFinish === null) {
        return -1;
      }
      if (b.plannedFinish === null) {
        return 1;
      }
      if (a.plannedFinish === b.plannedFinish) {
        return 0;
      }
      return a.plannedFinish < b.plannedFinish ? -1 : 1;
    }) : array
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  submitScheduleLink() {
    this.projectHubService.isFormChanged = false
    var mainObj: any = []
    for (var index in this.linkedSchedules) {
      if (this.linkedSchedules[index].length > 0) {
        for (var item of this.linkedSchedules[index]) {
          if (this.linkDBData[index].schedulesLink.some(x => x.parentProjectId == this.projectHubService.projectid && x.linkItemId == item.scheduleUniqueId)) {
            mainObj.push(this.linkDBData[index].schedulesLink.find(x => x.parentProjectId == this.projectHubService.projectid && x.linkItemId == item.scheduleUniqueId))
          }
          else {
            mainObj.push({
              "programHubLinkUniqueId": "",
              "parentProjectId": this.projectHubService.projectid,
              "childProjectId": item.projectId,
              "linkItemId": item.scheduleUniqueId,
              "scheduleLink": true,
              "riskIssueLink": null,
              "askNeedLink": null,
              "includeInReport": false,
              "includeInCharter": null,
              "linkLevel": this.linkDBData[index].level + 1
            })
          }
        }
      }
      if (!this.projectHubService.includeClosedItems.schedule.value) {
        var temp = this.linkDBData[index].schedulesLink.filter(x => x.parentProjectId == this.projectHubService.projectid)
        if (temp.length > 0) {
          for (var i of temp) {
            if (this.linkDBData[index].schedules.find(x => x.scheduleUniqueId == i.linkItemId).closeDate != null) {
              mainObj.push(i)
            }
          }
        }
      }
    }
    console.log("Submit Object",mainObj)
    /*this.apiService.bulkeditAskNeedLinks(mainObj,this.projectHubService.projectid).then(res=>{
      this.projectHubService.toggleDrawerOpen('', '', [], '')
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
    })*/
  }
}
