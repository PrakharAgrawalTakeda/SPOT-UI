import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-funding',
  templateUrl: './funding.component.html',
  styleUrls: ['./funding.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class FundingComponent implements OnInit, OnChanges {
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' = 'Normal'
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() kpi: any
  @Input() editable: boolean = true
  initializationComplete: boolean = false
  id:string=""
  bulkEditType: string = 'FundingBulkEdit';
  addSingle: string = 'FundingSingleEdit';
  viewContent: boolean = false
  fundingdata: any;

  constructor(private projecthubservice: ProjectHubService, private indicator: SpotlightIndicatorsService,
    public fuseAlert: FuseConfirmationService, private apiService: ProjectApiService, private authService: AuthService,private _Activatedroute: ActivatedRoute) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res == true) {
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    //console.log(this.projectViewDetails)
    this.dataloader()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getCostFunding(this.id).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
        console.log(res)
      console.log(res.fundingData)
      console.log(lookup)
       this.fundingdata = res.fundingData
    for (var i of this.fundingdata) {
      console.log(i)
      //res.equipmentRatingId ? lookup.find(x => x.lookUpId == res.equipmentRatingId)?.lookUpName : ''
      i.fundingSourceName = lookup.find(x => x.lookUpId == i.fundingSourceId) ? lookup.find(x => x.lookUpId == i.fundingSourceId).lookUpName : ''
    }
    this.viewContent = true
  })
})
    this.initializationComplete = false
    this.initializationComplete = true
  }
  // getLookUpName(lookUpId: string): string {
  //   return lookUpId && lookUpId != '' ? this.lookup.find(x => x.lookUpId == lookUpId).lookUpName : ''
  // }
  // getKPIName(kpiid: string): string {
  //   return this.kpi.find(x => x.kpiid == kpiid) ? this.kpi.find(x => x.kpiid == kpiid).kpiname : ''
  // }

  deleteFunding(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Funding?",
      "message": "Are you sure you want to remove this record permanently? ",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Remove",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const fundingAlert = this.fuseAlert.open(comfirmConfig)

    fundingAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteFunding(id).then(res => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
    })

  }
}
