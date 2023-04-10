import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';
import { forEach } from 'lodash';

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
  noCarbon = false
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
        this.unitCost = "Unit Cost (" + res.localCurrency.localCurrencyAbbreviation + ")"
        var carbonParam = res.carbonParameters
        var carbonData = res.carbonData
        var carbonngx = []
        carbonParam.forEach(function(arrayItem){
          var data = []
          var param = []
          data = carbonData.filter(x => x.emsourceId == arrayItem.emsourceId)
          param = carbonParam.filter(x => x.emsourceId == arrayItem.emsourceId)
          var carbonObject = {
            ...data[0],
            ...param[0]
          }
          carbonngx.push(carbonObject)
        })
        this.carbonngx = carbonngx
        this.noCarbon = res.projectData.noCarbonImpact
        if (res.projectData.noCarbonImpact == true) {
          for (var i of this.carbonngx) {
            i.emunit = null,
              i.unitCost = null,
              i.embasisOfEstimate = ""
          }
        }
        this.viewContent = true
      })
    })
  }

}
