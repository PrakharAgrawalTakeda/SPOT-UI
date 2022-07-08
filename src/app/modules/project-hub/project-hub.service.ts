import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  all:any = []
  projectid: string = ""
  submitbutton = new BehaviorSubject<boolean>(false)
  constructor() { }

  toggleDrawerOpen(itemtype: string, itemid: string, all: any, pid:string): void {
    this.itemid = itemid
    this.itemtype = itemtype
    this.all = all
    this.projectid = pid
    this.drawerOpenedright = !this.drawerOpenedright

  }
  drawerOpenedChanged(event: any): void {
    this.drawerOpenedright = event
    if (event == false) {
      this.item = {}
      this.itemtype = ""
      this.itemid = ""
      this.all = []
      this.projectid = ""
    }
  }
}
