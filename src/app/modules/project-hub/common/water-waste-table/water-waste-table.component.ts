import { Component, Input } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-water-waste-table',
  templateUrl: './water-waste-table.component.html',
  styleUrls: ['./water-waste-table.component.scss']
})
export class WaterWasteTableComponent {
  id: string = ""
  viewContent: boolean = false
  WaterWastengx: any = []
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
        })
        this.WaterWastengx = res
        this.viewContent = true
      })
    })
  }

  getLookupName(lookUpId: string): string {
    return lookUpId && lookUpId != '' ? this.lookupdata.find(x => x.lookUpId == lookUpId).lookUpName : ''
  }
}
