import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-business-case-cost-funding',
  templateUrl: './business-case-cost-funding.component.html',
  styleUrls: ['./business-case-cost-funding.component.scss']
})
export class BusinessCaseCostFundingComponent implements OnInit {


  option: string = ''
  viewContent: boolean = false
  id: string;
  cost: any;
  funding: any;
  constructor(public projecthubservice: ProjectHubService,
    private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute) {
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
this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
this.apiService.getCostFunding(this.id).then((res: any) => {
this.cost = res.costData
this.funding = res.fundingData
this.viewContent = true
});
}

}
