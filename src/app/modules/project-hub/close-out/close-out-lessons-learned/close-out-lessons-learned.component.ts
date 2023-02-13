import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectHubService } from '../../project-hub.service';
import { CloseOutService } from '../close-out.service';

@Component({
  selector: 'app-close-out-lessons-learned',
  templateUrl: './close-out-lessons-learned.component.html',
  styleUrls: ['./close-out-lessons-learned.component.scss']
})
export class CloseOutLessonsLearnedComponent implements OnInit {
  id:string = ""
  lessonLearned: any = []
  isGrid:boolean=false
  editable:boolean=false
  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public apiService: CloseOutService) {
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
