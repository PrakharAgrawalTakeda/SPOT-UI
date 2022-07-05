import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-ask-need-view-edit',
  templateUrl: './ask-need-view-edit.component.html',
  styleUrls: ['./ask-need-view-edit.component.scss']
})
export class AskNeedViewEditComponent implements OnInit, OnDestroy {
  formFieldHelpers: string[] = [''];
  item: any = {}
  askneedform = new FormGroup({
    askNeed1: new FormControl(''),
    comments: new FormControl('')
  })
  constructor(public projecthubservice: ProjectHubService, private apiService: ProjectApiService) {
  }

  ngOnInit(): void {
    this.apiService.askNeedSingle(this.projecthubservice.itemid).then((res: any)=>{
      this.askneedform.setValue({
        askNeed1: res.askNeed1,
        comments: res.comments
      })
    })
  }

  submitaskneed(){
    console.log(this.askneedform.value)
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
  }

}
