import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';

@Component({
  selector: 'app-ask-need-link',
  templateUrl: './ask-need-link.component.html',
  styleUrls: ['./ask-need-link.component.scss']
})
export class AskNeedLinkComponent implements OnInit {

  constructor(public projectHubService: ProjectHubService, public apiService: ProjectApiService) { }
  linkData: any = []
  tableData: any = []
  viewContent: boolean = false
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.apiService.askNeedGetLinkData(this.projectHubService.projectid).then(res => {
      console.log("Link Data:", res)
      if (!this.projectHubService.includeClosedItems.askNeed.value) {
        this.linkData = this.sortByLevel(this.filterClosedItems(res))
      }
      else {
        this.linkData = this.sortByLevel(res)
      }

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
        askNeeds: item.askNeeds.length > 0 ? item.askNeeds.filter(x => x.closeDate == null) : [],
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
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
