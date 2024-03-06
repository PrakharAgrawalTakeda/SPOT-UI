import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-close-out-lessons-learned',
  templateUrl: './close-out-lessons-learned.component.html',
  styleUrls: ['./close-out-lessons-learned.component.scss']
})
export class CloseOutLessonsLearnedComponent implements OnInit, OnDestroy {
  id:string = ""
  viewContent:boolean=false
  editable:boolean=false
  projectData:any
  keyTakeaways:any
  KeyTakeawayForm = new FormGroup({
    keyTakeaways: new FormControl('')
  })
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public projectApiService: ProjectApiService) {
    this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (res == true) {
        this.dataloader()
      }
    })
   }

  ngOnInit(): void {
    if(this.projecthubservice.roleControllerControl.closeOut.lessonsLearnt){
      this.editable=true
    }
    this.dataloader();
    this.viewContent = true
  }

  dataloader(){
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.projectApiService.getproject(this.id).then((res: any) => {
      this.projectData = res
      this.keyTakeaways = res.keyTakeaways
      this.KeyTakeawayForm.patchValue({
        keyTakeaways: res.keyTakeaways
      })
      this.KeyTakeawayForm.controls.keyTakeaways.disable()
    })
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
