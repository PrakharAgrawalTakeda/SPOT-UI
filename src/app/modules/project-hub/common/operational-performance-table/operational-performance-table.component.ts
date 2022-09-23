import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-operational-performance-table',
  templateUrl: './operational-performance-table.component.html',
  styleUrls: ['./operational-performance-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationalPerformanceTableComponent implements OnInit, OnChanges {
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() kpi: any
  @Input() editable: boolean = true
  initializationComplete: boolean = false
  primaryKPIForm = new FormGroup({
    primaryKpi: new FormControl({})
  })

  constructor(private projecthubservice: ProjectHubService, private indicator: SpotlightIndicatorsService,
    public fuseAlert: FuseConfirmationService, private apiService: ProjectApiService) {

    this.primaryKPIForm.controls.primaryKpi.valueChanges.subscribe(res => {
      if (this.initializationComplete == true) {
        this.apiService.updatePrimayKPI(this.projectid, res.kpiid).then(x => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataloader()
  }
  dataloader() {
    this.initializationComplete = false
    this.primaryKPIForm.controls.primaryKpi.patchValue(this.projectViewDetails.projectData.primaryKpi ? this.kpi.find(x => x.kpiid == this.projectViewDetails.projectData.primaryKpi) : {})
    this.initializationComplete = true
  }
  getLookUpName(lookUpId: string): string {
    return lookUpId && lookUpId != '' ? this.lookup.find(x => x.lookUpId = lookUpId).lookUpName : ''
  }
  getKPIName(kpiid: string): string {
    return this.kpi.find(x => x.kpiid == kpiid) ? this.kpi.find(x => x.kpiid == kpiid).kpiname : ''
  }

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
          this.projecthubservice.submitbutton.next(true)
        })
      }
    })

  }
}
