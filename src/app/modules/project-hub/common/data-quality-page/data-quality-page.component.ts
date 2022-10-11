
import { O } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ColumnMode, sortRows } from '@swimlane/ngx-datatable';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';
import { Constants } from '../../../../shared/constants'

export interface Row {
  phase: string,
  requirement: string,
  hitMiss: string,
  detailedDescription: string,
}
@Component({
  selector: 'app-data-quality-page',
  templateUrl: './data-quality-page.component.html',
  styleUrls: ['./data-quality-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataQualityPageComponent implements OnInit {

  isclosed: boolean = false;
  @ViewChild('dataCompletnessTable') dataCompletnessTable: any;

  constructor(public projecthubservice: ProjectHubService, 
    public fuseAlert: FuseConfirmationService,
    private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute,
    private fb: FormBuilder) 
  { 
  }
  id: string = '';
  rows = [];
  loadingIndicator = false;
  reorderable = true;
  phase: string = '';
  spotId: string = '';
  projectName: string = '';
  projectType: string = '';
  dataQualityPercentage: number;
  targetPercentage = Constants.QUALITY_TARGET_PERCENTAGE;
  dataQualityPercentageString: string = '';
  lowerTargetPercentage = Constants.QUALITY_LOWER_TARGET_PERCENTAGE;
  columns = [{name:'Phase', prop: 'phase', sortable:false, minWidth: 100, maxWidth: 150}, { name: 'Requirement' , prop:'requirement',sortable:false, minWidth:200, maxWidth: 350}, { name: 'Hit/Miss', prop:'hitMiss', cellClass: getCellClass, sortable:false, minWidth:50, maxWidth: 150}, {name: 'Detailed Description', prop:'detailedDescription', sortable:false, width: "auto", flexGrow:"5"}];
  rowClass  = getRowClass;
  ColumnMode = ColumnMode;
  ngOnInit(): void {
    this.dataloader()
    window.dispatchEvent(new Event('resize'));
  }
  getColor(percentage: number) {
    if(this.projectType=="Simple Project"){
      return '#4c9bcf';
    }else{
      if(percentage<this.lowerTargetPercentage)
      {
        return "red";
      }
      if(this.targetPercentage>percentage && percentage>this.lowerTargetPercentage)
      {
        return "orange";
      }
      if(this.targetPercentage<percentage)
      {
        return "green";
      }
    }
  }
  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getDataCompleteness(this.id).then((res: any) => {
      res.rows.forEach(element => {
        if(element.hitMiss == true)
          element.hitMiss = "Complete";
        if(element.hitMiss == false)
          element.hitMiss = "Incomplete" 
        if(element.hitMiss == null)
          element.hitMiss = "N/A" 
      });
      this.rows = res.rows;
      this.phase= res.phase;
      this.spotId = res.spotId;
      this.projectName = res.projectName;
      this.dataQualityPercentage = res.dataQualityPercentage*100;
      if(this.phase == "Initiate"){
        this.dataQualityPercentageString = "N/A";
      }else{
        this.dataQualityPercentageString = this.dataQualityPercentage.toString();
      }
      this.projectType = res.projectType;
    })
  }  
}
function getCellClass({ value }): any {

  if(value == "Complete"){
    return "hit-miss complete";
  }
  if(value == "Incomplete"){
    return "hit-miss incomplete";
  }
}
function getRowClass(row) {
  if(row.hitMiss == "N/A"){
    return 'hit-miss-false';
  }
  return 'hit-miss-true';
}


