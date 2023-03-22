import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-operational-performance-table',
  templateUrl: './operational-performance-table.component.html',
  styleUrls: ['./operational-performance-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class OperationalPerformanceTableComponent implements OnInit, OnChanges {
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Business-Case' | 'Project-Proposal' = 'Normal'
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() kpi: any
  @Input() editable: boolean = true
  initializationComplete: boolean = false
  id:string=""
  bulkEditType: string = 'OperationalPerformanceBulkEdit';
  addSingle: string = 'OperationalPerformanceSingleEdit';
  viewContent: boolean = false

  constructor(private projecthubservice: ProjectHubService, private indicator: SpotlightIndicatorsService,
    public fuseAlert: FuseConfirmationService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res == true) {
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    console.log(this.projectViewDetails);
    if (this.mode == 'Project-Close-Out') {
      this.bulkEditType = 'OperationalPerformanceBulkEditCloseOut';
      this.addSingle = 'OperationalPerformanceSingleEditCloseOut'
    }
    if (this.mode == 'Project-Charter') {
      this.bulkEditType = 'OperationalPerformanceBulkEditCharter';
      this.addSingle = 'OperationalPerformanceSingleEditCharter'
    }
    if (this.mode == 'Project-Proposal') {
        this.bulkEditType = 'OperationalPerformanceBulkEditProposal';
        this.addSingle = 'OperationalPerformanceSingleEditProposal'
    }
    this.dataloader()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataloader()
  }
  dataloader() {
    // if(this.mode != 'Normal')
    // {
      if(this.mode != 'Project-Proposal'){
          this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
          this.apiService.getprojectviewdata(this.id).then((res: any) => {
              this.projectViewDetails = res
              for (var i of this.projectViewDetails.overallPerformace) {
                  i.kpiname = this.kpi.find(x => x.kpiid == i.kpiid) ? this.kpi.find(x => x.kpiid == i.kpiid).kpiname : ''
              }
              this.viewContent = true
              this.initializationComplete = false
              this.initializationComplete = true
          })
      }else{
          this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
          this.apiService.getprojectviewdata(this.id).then((res: any) => {
              res.overallPerformace.map( (x, index) => {
                  var array = x.ptrbid.split(',');
                  let finalList = "";
                  array.forEach( ptrb =>{
                        finalList = finalList + this.getLookUpName(ptrb) + " "
                  })
                  res.overallPerformace[index].ptrbid = finalList;
              })
              this.projectViewDetails = res
              for (var i of this.projectViewDetails.overallPerformace) {
                  i.kpiname = this.kpi.find(x => x.kpiid == i.kpiid) ? this.kpi.find(x => x.kpiid == i.kpiid).kpiname : ''
              }
              this.viewContent = true
              this.initializationComplete = false
              this.initializationComplete = true
          })
      }

// }
// else
//   {
//     this.viewContent = true
//   }
    // if (this.mode == 'Project-Close-Out'){
    //   this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    //   this.apiService.getprojectviewdata(this.id).then((res: any) => {
    //         this.projectViewDetails = res
    //   })
    // }
    // if (this.mode == 'Project-Charter'){
    //   this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    //   this.apiService.getprojectviewdata(this.id).then((res: any) => {
    //         this.projectViewDetails = res
    //   })
    // }

  }
  getLookUpName(lookUpId: string): string {
    return lookUpId && lookUpId != '' ? this.lookup.find(x => x.lookUpId == lookUpId).lookUpName : ''
  }
  // getKPIName(kpiid: string): string {
  //   return this.kpi.find(x => x.kpiid == kpiid) ? this.kpi.find(x => x.kpiid == kpiid).kpiname : ''
  // }

  getIndicator(status: string): string {
    if (status == "91F35D36-B94B-44C7-9234-4AE76DB19DBB") {
      return 'Red'
    }
    else if (status == "7DFAAEDF-AB1C-4348-91B3-F2FE1C78237A") {
      return 'Yellow'
    }
    else if (status == "B12BD411-EBC7-4CC0-A8C4-5F41B8C5FC17") {
      return 'Green'
    }
    return 'Grey'
  }
  deleteOperationPerformance(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Operational Performance?",
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
    const operationalPerformanceAlert = this.fuseAlert.open(comfirmConfig)

    operationalPerformanceAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteOperationalPerformance(id).then(res => {
            if (this.mode == 'Project-Proposal') {
                this.apiService.updateReportDates(this.id, "ProjectProposalModifiedDate").then(secondRes => {
                    this.projecthubservice.submitbutton.next(true)
                })
            }else{
                this.projecthubservice.submitbutton.next(true)
            }

        })
      }
    })

  }
}
