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
  viewContent:boolean = false
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.apiService.askNeedGetLinkData(this.projectHubService.projectid).then(res => {
      console.log("Link Data:", res)
      this.linkData = this.sortByLevel(res)

      this.viewContent = true
    })
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
