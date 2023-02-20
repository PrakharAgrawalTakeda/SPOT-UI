import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-close-out-lessons-learned',
  templateUrl: './close-out-lessons-learned.component.html',
  styleUrls: ['./close-out-lessons-learned.component.scss']
})
export class CloseOutLessonsLearnedComponent implements OnInit {
  id:string = ""
  lessonLearned: any = []
  viewContent:boolean=false
  editable:boolean=false
  KeyTakeawayForm = new FormGroup({
    keyTakeaways: new FormControl('')
  })
  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute) {
    // this.projecthubservice.submitbutton.subscribe(res => {
    //   if (res == true) {
    //     this.dataloader()
    //   }
    // })
   }

  ngOnInit(): void {
    this.viewContent = true
  }

  
  
}
