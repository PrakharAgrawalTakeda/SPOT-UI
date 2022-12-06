import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';

@Component({
  selector: 'app-ask-need-link',
  templateUrl: './ask-need-link.component.html',
  styleUrls: ['./ask-need-link.component.scss']
})
export class AskNeedLinkComponent implements OnInit {

  constructor(public projectHubService: ProjectHubService, public apiService: ProjectApiService, public fuseAlert: FuseConfirmationService) {
  }
  linkData: any = []
  linkDBData: any = []
  linkedAskNeeds: any = []
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
    this.linkedAskNeeds = []
    this.apiService.askNeedGetLinkData(this.projectHubService.projectid).then(res => {
      console.log("Link Data:", res)
      this.linkDBData = [...this.sortByLevel(res)]
      if (!this.projectHubService.includeClosedItems.askNeed.value) {
        this.linkData = this.sortByLevel(this.filterClosedItems(res))
      }
      else {
        this.linkData = this.sortByLevel(res)
      }
      for (var i in this.linkData) {
        this.linkedAskNeeds.push([])
      }
      console.log("Linked Ask Needs", this.linkData, this.linkDBData)
      this.localIncludedItems.controls.toggle.patchValue(this.projectHubService.includeClosedItems.askNeed.value)
      this.projectHubService.isFormChanged = false
      this.viewContent = true
    })
  }
  toggleAskNeed(event: any) {
    this.linkedAskNeeds[event.tableIndex] = [...event.selected]
    console.log("Linked Ask Needs", this.linkedAskNeeds)
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
        const askNeedAlert = this.fuseAlert.open(comfirmConfig)
        askNeedAlert.afterClosed().subscribe(close => {
          if (close == 'confirmed') {
            this.projectHubService.includeClosedItems.askNeed.next($event.checked)
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
        this.projectHubService.includeClosedItems.askNeed.next($event.checked)
        this.dataloader()
      }
    }
    this.localIncludedItems.controls.toggle.markAsPristine()
  }
  filterClosedItems(array: any): any {
    var returnObject: any = []
    for (var item of array) {
      returnObject.push({
        projectUId: item.projectUId,
        projectId: item.projectId,
        projectName: item.projectName,
        level: item.level,
        askNeeds: item.askNeeds.length > 0 ? this.sortByNeedByDate(item.askNeeds.filter(x => x.closeDate == null)) : [],
        askNeedLink: item.askNeedLink,
        askNeedLinkProjectDetails: item.askNeedLinkProjectDetails
      })
    }
    return returnObject
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
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  submitANLink() {
    this.projectHubService.isFormChanged = false
    var mainObj: any = []
    for (var index in this.linkedAskNeeds) {
      if (this.linkedAskNeeds[index].length > 0) {
        for (var item of this.linkedAskNeeds[index]) {
          if (item != null) {
            if (this.linkDBData[index].askNeedLink.some(x => x.parentProjectId == this.projectHubService.projectid && x.linkItemId == item.askNeedUniqueId)) {
              mainObj.push(this.linkDBData[index].askNeedLink.find(x => x.parentProjectId == this.projectHubService.projectid && x.linkItemId == item.askNeedUniqueId))
            }
            else {
              mainObj.push({
                "programHubLinkUniqueId": "",
                "parentProjectId": this.projectHubService.projectid,
                "childProjectId": item.projectId,
                "linkItemId": item.askNeedUniqueId,
                "scheduleLink": null,
                "riskIssueLink": null,
                "askNeedLink": true,
                "includeInReport": false,
                "includeInCharter": null,
                "linkLevel": this.linkDBData[index].level + 1
              })
            }
          }
        }
      }
      if (!this.projectHubService.includeClosedItems.askNeed.value) {
        var temp = this.linkDBData[index].askNeedLink.filter(x => x.parentProjectId == this.projectHubService.projectid)
        if (temp.length > 0) {
          for (var i of temp) {
            if (this.linkDBData[index].askNeeds.find(x => x.askNeedUniqueId == i.linkItemId).closeDate != null) {
              mainObj.push(i)
            }
          }
        }
      }
    }
    console.log("Submit Object", mainObj)
    this.apiService.bulkeditAskNeedLinks(mainObj, this.projectHubService.projectid).then(res => {
      this.projectHubService.toggleDrawerOpen('', '', [], '')
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.successSave.next(true)
    })
  }
}
