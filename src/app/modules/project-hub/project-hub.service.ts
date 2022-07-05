import { Injectable } from '@angular/core';
import { ProjectApiService } from './common/project-api.service';
import { AskNeedViewEditComponent } from './project-view/ask-need-view-edit/ask-need-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectHubService {
  drawerOpenedright: boolean = false;
  itemid: string = "new"
  itemtype: string = ""
  item: any = {}
  
  constructor(private apiService: ProjectApiService) { }

  toggleDrawerOpen(itemtype: string, itemid: string): void {
    this.itemid = itemid
    this.itemtype = itemtype
    if (itemtype == "AskNeed") {
      this.apiService.askNeedSingle(itemid).then(res => {
        this.item = res
        console.log(this.item)
        this.drawerOpenedright = !this.drawerOpenedright
      })
    }
  }
  drawerOpenedChanged(event: any): void {
    this.drawerOpenedright = event
    if (event == false) {
      this.item = {}
      this.itemtype = ""
    }
  }
}
