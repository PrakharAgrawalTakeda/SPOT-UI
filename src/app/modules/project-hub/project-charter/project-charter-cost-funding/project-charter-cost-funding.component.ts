import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-charter-cost-funding',
  templateUrl: './project-charter-cost-funding.component.html',
  styleUrls: ['./project-charter-cost-funding.component.scss']
})
export class ProjectCharterCostFundingComponent implements OnInit {

  constructor(private _Activatedroute: ActivatedRoute) { }
  option: string = ''
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    //this.option = this._Activatedroute.parent.snapshot.routeConfig.path
  }

}
