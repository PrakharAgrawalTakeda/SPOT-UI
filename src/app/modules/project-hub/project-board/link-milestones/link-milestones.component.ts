import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-link-milestones',
  templateUrl: './link-milestones.component.html',
  styleUrls: ['./link-milestones.component.scss']
})
export class LinkMilestonesComponent implements OnInit {
  toggleHelper: boolean = false
  localIncludedItems = new FormGroup({
    toggle: new FormControl(false)
  })
  constructor(public projectHubService: ProjectHubService, public apiService: ProjectApiService, private _Activatedroute: ActivatedRoute) { }
  linkData: any = []
  viewContent: boolean = false
  id: string = ""
  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    //console.log(this.projectHubService.projectid)
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.milestoneGetLinkData(this.id).then(res => {
      console.log("Link Data:", res)
      if (!this.projectHubService.includeClosedItems.schedule.value) {
        this.linkData = this.sortByLevel(this.filterClosedItems(res))
      }
      else {
        this.linkData = this.sortByLevel(res)
      }

      this.viewContent = true
    })
  }

  toggleSchedule(event: any) {
    this.toggleHelper = true
    this.projectHubService.includeClosedItems.schedule.next(event.checked)
  }

  filterClosedItems(array: any): any {
    var returnObject: any = []
    for (var item of array) {
      returnObject.push({
        projectUId: item.projectUId,
        projectId: item.projectId,
        projectName: item.projectName,
        level: item.level,
        schedules: item.schedules.length > 0 ? this.sortBybaselineFinish(item.schedules.filter(x => x.closeDate == null)) : [],
        schedulesLink: item.schedulesLink,
        scheduleLinkProjectDetails: item.scheduleLinkProjectDetails
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

  sortBybaselineFinish(array: any): any {
    return array.length > 1 ? array.sort((a, b) => {
      if (a.baselineFinish === null) {
        return -1;
      }

      if (b.baselineFinish === null) {
        return 1;
      }

      if (a.baselineFinish === b.baselineFinish) {
        return 0;
      }

      return a.baselineFinish < b.baselineFinish ? -1 : 1;
    }) : array
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  submitlink() {
    
  }

}
