import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-ask-need',
  templateUrl: './ask-need.component.html',
  styleUrls: ['./ask-need.component.scss']
})
export class AskNeedComponent implements OnInit, OnChanges {
  constructor(public projectHubService: ProjectHubService) {
    this.projectHubService.includeClosedItems.askNeed.subscribe(res => {
      this.changeaskneed(res)
    })
  }
  @Input() askNeedData: any = []
  @Input() links: any = []
  @Input() linksProblemCapture: any = []
  @Input() projectId: string = ''
  isclosedaskneedtoggle: boolean = false
  tableData: any = []
  viewContent: boolean = false
  localIncludedItems = new FormGroup({
    toggle: new FormControl(false)
  })
  ngOnInit(): void {
    this.dataloader()
    this.viewContent = true
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataloader()
  }
  dataloader() {
    console.log(this.askNeedData)
    for(var i of this.askNeedData){
      i.includeInReport = i.projectId == this.projectId? i.includeInReport: this.links.find(t=>t.linkItemId == i.askNeedUniqueId).includeInReport 
    }
    if (this.isclosedaskneedtoggle) {
      this.tableData = this.askNeedData
    }
    else {
      this.tableData = this.askNeedData.filter(row => row.closeDate == null)
    }
  }
  toggleAskNeed(event: any) {
    this.projectHubService.includeClosedItems.askNeed.next(event.checked)
  }
  changeaskneed(event: any) {
    if (event == true) {
      this.isclosedaskneedtoggle = true
      this.tableData = this.askNeedData
    }
    else {
      this.isclosedaskneedtoggle = false
      this.tableData = this.askNeedData.filter(row => row.closeDate == null)
    }
    this.localIncludedItems.controls.toggle.patchValue(event)
    this.localIncludedItems.controls.toggle.markAsPristine()
  }
}
