import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-close-out-lesson-learned-bulk-edit',
  templateUrl: './close-out-lesson-learned-bulk-edit.component.html',
  styleUrls: ['./close-out-lesson-learned-bulk-edit.component.scss']
})
export class CloseOutLessonLearnedBulkEditComponent implements OnInit {
  // viewContent:boolean=false
  // lessonLearnedForm = new FormArray([])
  // projectViewDetails: any;
  constructor() { }

  ngOnInit(): void {
    this.dataloader()
  }

  dataloader(){
  // this.apiService.getprojectviewdata(this.projecthubservice.projectid).then((res: any) => {
  //   this.projectViewDetails = res
  //   for (var i of this.projectViewDetails.overallPerformace) {
  //     this.opDb.push(i)
  //     this.lessonLearnedForm.push(new FormGroup({
  //       keySuccessUniqueId: new FormControl(i.keySuccessUniqueId),
  //       projectId: new FormControl(this.projecthubservice.projectid),
  //       metric: new FormControl(i.metric),
  //       currentState: new FormControl(i.currentState),
  //       targetPerformance: new FormControl(i.targetPerformance),
  //       includeInCharter: new FormControl(i.includeInCharter),
  //       kpiid: new FormControl(i.kpiid && i.kpiid != '' ? this.projecthubservice.kpiMasters.find(x => x.kpiid == i.kpiid) : {}),
  //       actualPerformance: new FormControl(i.actualPerformance),
  //       includeInProjectDashboard: new FormControl(i.includeInProjectDashboard),
  //       status: new FormControl(i.status),
  //       includeInCloseOut: new FormControl(i.includeInCloseOut),
  //       ptrbid: new FormControl(i.ptrbid),
  //       benefitDescriptionJustification: new FormControl(i.benefitDescriptionJustification),
  //       includeinProposal: new FormControl(i.includeinProposal)
  //     }))
  //   }
  //   this.viewContent = true
  // })
}

}
