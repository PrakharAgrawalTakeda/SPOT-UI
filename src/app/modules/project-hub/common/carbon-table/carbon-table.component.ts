import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-carbon-table',
  templateUrl: './carbon-table.component.html',
  styleUrls: ['./carbon-table.component.scss']
})
export class CarbonTableComponent {
  id: string = ""
  viewContent:boolean = false
  carbonngx: any = []
  unitCost = ""
  @Input() Editable: boolean = false
  lookupdata: any
  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
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
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      this.apiService.getLessonLearnedbyProjectId(this.id).then((res: any) => {
        this.apiService.getGeneralInfoData(this.id).then((response: any) => {
          this.unitCost = "Unit Cost (" + response.localCurrencyAbbreviation + ")"
          this.carbonngx = res
          this.viewContent = true
        })
      })
    })
  }

}
