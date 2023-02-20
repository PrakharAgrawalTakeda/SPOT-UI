import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';

@Component({
  selector: 'app-lesson-learned-single-edit',
  templateUrl: './lesson-learned-single-edit.component.html',
  styleUrls: ['./lesson-learned-single-edit.component.scss']
})
export class LessonLearnedSingleEditComponent implements OnInit {
  today = new Date();
  formFieldHelpers: string[] = [''];
  LessonLearnedForm= new FormGroup({
    includeInSingleSlideSummary: new FormControl(false),
    createDetailedReviewSlide: new FormControl(false),
    logDate: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    criticality: new FormControl(''),
    SubmittedBy: new FormControl(''),
    submittingGroup: new FormControl(''),
    suggestedAction: new FormControl(''),
    dueDate: new FormControl(''),
    functionOwner: new FormControl(''),
    actionOwner: new FormControl(''),
    closeDate: new FormControl('')
  })
  constructor(public projecthubservice: ProjectHubService) { }

  ngOnInit(): void {
  }

  GetType(): string {
    return this.projecthubservice.lookUpMaster.filter(x => x.lookUpParentId == "3B747FFC-139E-4ECC-8123-85D8A730245E")
  }
  GetCriticality(): string {
    return this.projecthubservice.lookUpMaster.filter(x => x.lookUpParentId == "DFC4E626-10A1-464E-8B1A-09A223B125A1")
  }
  GetRole(): string {
    return this.projecthubservice.lookUpMaster.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }
  
  submiLL(){

  }

}
