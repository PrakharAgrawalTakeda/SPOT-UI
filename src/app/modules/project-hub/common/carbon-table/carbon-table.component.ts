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
  @Input() data : any
  noCarbon: boolean = false
  @Input() ProjectData: any
  @Input() editCost: any
  @Input() DateMandatory: boolean
  sortDir = ""
  sortDirCost = ""
  carbonBulkEditData: any = []
  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res == true && this.viewContent == true) {
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      if (this.ProjectData.localCurrency == null){
          this.unitCost = "Unit Cost ()"
        }
        else{
        this.unitCost = "Unit Cost (" + this.ProjectData.localCurrency.localCurrencyAbbreviation + ")"
        }
        if (this.data != null){
        this.carbonngx = this.data
          this.noCarbon = this.ProjectData.projectData.noCarbonImpact
          
          if (this.noCarbon == true) {
          for (var i of this.carbonngx) {
            i.emunit = null,
              i.unitCost = null,
              i.embasisOfEstimate = ""
          }
        }
      }
      this.carbonBulkEditData = []
      this.carbonBulkEditData.push(this.carbonngx)
      this.carbonBulkEditData.push(this.ProjectData)
      this.carbonBulkEditData.push(this.noCarbon)
      this.carbonBulkEditData.push(this.editCost)
      this.carbonBulkEditData.push(this.DateMandatory)
      this.viewContent = true
    
  }

  sortasc() {
    if (this.sortDir == "" || this.sortDir == "desc") {
      return this.sortDir = "asc"
    }
    else if (this.sortDir == "asc") {
      return this.sortDir = "desc"
    }
  }

  sortascCost() {
    if (this.sortDirCost == "" || this.sortDirCost == "desc") {
      return this.sortDirCost = "asc"
    }
    else if (this.sortDirCost == "asc") {
      return this.sortDirCost = "desc"
    }
  }

}
