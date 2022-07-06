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
  submitbutton = new BehaviorSubject<boolean>(false)
  constructor(private apiService: ProjectApiService) { }

  toggleDrawerOpen(itemtype: string, itemid: string): void {
    this.itemid = itemid
    this.itemtype = itemtype
    this.drawerOpenedright = !this.drawerOpenedright

  }
  drawerOpenedChanged(event: any): void {
    this.drawerOpenedright = event
    if (event == false) {
      this.item = {}
      this.itemtype = ""
    }
  }
}
