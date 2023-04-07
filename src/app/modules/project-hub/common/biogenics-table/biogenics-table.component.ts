import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-biogenics-table',
  templateUrl: './biogenics-table.component.html',
  styleUrls: ['./biogenics-table.component.scss']
})
export class BiogenicsTableComponent {
  id: string = ""
  viewContent:boolean = false
  Biogenicsngx: any = []
  unitCost = ""
  NoCarbonForm= new FormGroup({
    NoCarbonImpact: new FormControl(false)
  })
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
          this.Biogenicsngx = res
          this.viewContent = true
        })
      })
    })
  }
}
