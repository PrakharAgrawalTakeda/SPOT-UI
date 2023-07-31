import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  @Input() mode: 'Capex' | 'Opex' = 'Capex'
  fundingRequests: any = []
  lookUpData: any = []
  id: string = ''
  ForecastForm = new FormGroup({
    ForecastType: new FormControl(''),
    Currency: new FormControl(''),
    PM: new FormControl(''),
  })
  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService
    , public fuseAlert: FuseConfirmationService, private router: Router, private titleService: Title, private auth: AuthService) {
    // this.projecthubservice.submitbutton.subscribe(res => {
    //   if (res == true) {
    //     this.dataloader()
    //   }
    // })
  }
  ngOnInit(): void {
    this.titleService.setTitle("Project Forecast")
    console.log(this.ForecastForm)
    this.dataloader()
  }

  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.auth.lookupMaster().then(data => {
      this.lookUpData = data
    })
  }
  getForecastType(){
    return this.lookUpData.filter(x => x.lookUpParentId == 'bc786c6a-8f23-4161-9f2a-67e1897295c7')
  }
}
