import { Component, Input } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-warehousing-table',
  templateUrl: './warehousing-table.component.html',
  styleUrls: ['./warehousing-table.component.scss']
})
export class WarehousingTableComponent {
  id: string = ""
  viewContent: boolean = false
  Warehousingngx: any = []
  warehousingBulkEditData: any = []
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
      this.apiService.getCAPSbyProjectID(this.id).then((res: any) => {
        if (this.Editable == false) {
          this.Warehousingngx = null
        }
        else {
          this.Warehousingngx = res.biogenicsData
        }
        this.warehousingBulkEditData.push(this.Warehousingngx)
        this.warehousingBulkEditData.push(res.projectData.emissionsImpactRealizationDate)
        this.viewContent = true
      })
    })
  }
}
