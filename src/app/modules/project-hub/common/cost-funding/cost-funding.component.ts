import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-cost-funding',
  templateUrl: './cost-funding.component.html',
  styleUrls: ['./cost-funding.component.scss']
})
export class CostFundingComponent implements OnInit {

  
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute, public indicator: SpotlightIndicatorsService) {
    
  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {

  }

}
