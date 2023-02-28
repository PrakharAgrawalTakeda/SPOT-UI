import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-lesson-learned-table',
  templateUrl: './lesson-learned-table.component.html',
  styleUrls: ['./lesson-learned-table.component.scss']
})
export class LessonLearnedTableComponent implements OnInit {
  id: string = ""
  lessonLearned: any = []
  @Input() Editable: boolean = false
  lookupdata:any
  // KeyTakeawayForm = new FormGroup({
  //   keyTakeaways: new FormControl('')
  // })
  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res == true) {
        this.dataloader()
      }
    })
   }

  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      this.apiService.getLessonLearnedbyProjectId(this.id).then((res:any) => {
        this.lessonLearned = res
        this.lessonLearned = this.sortbyDateTypeName(this.lessonLearned)
        for(var i=0;i<this.lessonLearned.length;i++){
          this.lessonLearned[i].Actionusername = res[i].actionOwner.userDisplayName
          this.lessonLearned[i].SubmittedByName = res[i].submittedBy.userDisplayName 
          this.lessonLearned[i].actionOwner = res[i].actionOwner.userAdid == null ? '' : res[i].actionOwner.userAdid
          this.lessonLearned[i].submittedBy = res[i].submittedBy.userAdid == null ? '' : res[i].submittedBy.userAdid
          this.lessonLearned[i].typeName = res[i].lessonType == "" ? "" : this.lookupdata.filter(x => x.lookUpId == res[i].lessonType)[0].lookUpName
        }
        this.lessonLearned = this.sortbyTypeName(this.lessonLearned)
      })
    })
  }

  sortbyDateTypeName(array: any): any {
    return array.length > 1 ? array.sort((a, b) => {
      if (a.lessonCloseDate === null) {
        return -1;
      }

      if (new Date(b.lessonCloseDate) === null) {
        return 1;
      }

      if (a.lessonCloseDate === new Date(b.lessonCloseDate)) {
        return 0;
      }

      return new Date(a.lessonCloseDate) < new Date(b.lessonCloseDate) ? -1 : 1;
    }) : array

  }

  sortbyTypeName(array: any): any{
    return array.length > 1 ? array.sort((a, b) => {
      if (a.lessonCloseDate === new Date(b.lessonCloseDate)) {
          return a.typeName < b.typeName ? -1 : 1;
      }
      return 0;
    }) : array

  }

  getLookupName(lookUpId: string): string {
    return lookUpId && lookUpId != '' ? this.lookupdata.find(x => x.lookUpId == lookUpId).lookUpName : ''
  }

  deleteLL(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Lesson Learned?",
      "message": "Are you sure you want to remove this record permanently? ",
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
    const lessonLearnedAlert = this.fuseAlert.open(comfirmConfig)

    lessonLearnedAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        var index = this.lessonLearned.findIndex(x => x.lessonLearnedId === id);
        this.lessonLearned.splice(index,1)
        this.apiService.bulkEditLessonLearned(this.lessonLearned,this.id).then(res => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
    })

  }
}
