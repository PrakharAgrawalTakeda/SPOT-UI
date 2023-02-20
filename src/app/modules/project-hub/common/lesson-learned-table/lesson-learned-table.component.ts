import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-lesson-learned-table',
  templateUrl: './lesson-learned-table.component.html',
  styleUrls: ['./lesson-learned-table.component.scss']
})
export class LessonLearnedTableComponent implements OnInit {
  id: string = ""
  lessonLearned: any = []
  editable: boolean = false
  KeyTakeawayForm = new FormGroup({
    keyTakeaways: new FormControl('')
  })
  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute) {
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
    // this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    // this.apiService.getmembersbyproject(this.id).then((res) => {
    //   this.lessonLearned = res
    // })
  }

  getLookupName(lookUpId: string): string {
    return lookUpId && lookUpId != '' ? this.projecthubservice.lookUpMaster.find(x => x.lookUpId == lookUpId).lookUpName : ''
  }


  // criticality DFC4E626-10A1 - 464E-8B1A - 09A223B125A1
  // Type 3B747FFC-139E-4ECC - 8123 - 85D8A730245E
  // submitting group 0edea251-09b0 - 4323 - 80a0 - 9a6f90190c77

}
