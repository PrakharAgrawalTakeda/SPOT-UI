import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-ask-need',
  templateUrl: './ask-need.component.html',
  styleUrls: ['./ask-need.component.scss']
})
export class AskNeedComponent implements OnInit, OnChanges {

  constructor(public projectHubService: ProjectHubService) { }
  @Input() askNeedData: any = []
  @Input() links: any = []
  @Input() linksProblemCapture: any = []
  isclosedaskneedtoggle: boolean = false
  tableData: any = []
  viewContent: boolean = false
  ngOnInit(): void {
    this.dataloader()
    this.viewContent = true
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataloader()
  }
  dataloader() {
    if (this.isclosedaskneedtoggle) {
      this.tableData = this.askNeedData
    }
    else {
      this.tableData = this.askNeedData.filter(row => row.closeDate == null)
    }
  }
  changeaskneed(event: any) {
    if (event.checked == true) {
      this.isclosedaskneedtoggle = true
      this.tableData = this.askNeedData
    }
    else {
      this.isclosedaskneedtoggle = false
      this.tableData = this.askNeedData.filter(row => row.closeDate == null)
    }
  }
}
