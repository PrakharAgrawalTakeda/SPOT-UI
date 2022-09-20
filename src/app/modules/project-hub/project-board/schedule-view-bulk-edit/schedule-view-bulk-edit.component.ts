import { Component, HostListener, OnDestroy, OnInit, ElementRef, ViewChild, ViewEncapsulation, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment';
import { startWith, map } from 'rxjs';

import { FuseAlertService } from '@fuse/components/alert';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from '../../common/project-api.service';
import { AuthService } from 'app/core/auth/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-schedule-view-bulk-edit',
  templateUrl: './schedule-view-bulk-edit.component.html',
  styleUrls: ['./schedule-view-bulk-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ScheduleViewBulkEditComponent implements OnInit {
  @Input() scheduleData: any;
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() editable: boolean
  @ViewChild('scheduleTable') scheduleTable: any;
  editing = {};
  ColumnMode = ColumnMode;
  schedulengxdata: any = []
  today = new Date()
  variance: any;
  formFieldHelpers: string[] = [''];
  lookupdata: any = []
  schedule: any = {}
  item: any = {}
  functionSets: any = []
  milestoneTableEditStack: any = []
  milestoneForm = new FormArray([])
  id: string = ""
  lookUpData: any = []
  filterCriteria: any = {}
  scheduleObj: any = []
  addObj: any = []
  viewContent: boolean = false
  roleMaster: any = {}
  baselineCount: any = {}
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService,
    private portApiService: PortfolioApiService,
    private authService: AuthService, private _elementRef: ElementRef, private indicator: SpotlightIndicatorsService, 
    private router: Router, private _Activatedroute: ActivatedRoute, public fuseAlert: FuseConfirmationService, private changeDetectorRef: ChangeDetectorRef) {
    this.milestoneForm.valueChanges.subscribe(res => {
      console.log("Milestone form Value", this.milestoneForm.getRawValue())
      console.log("Milstone Schedule Data Array", this.scheduleData.scheduleData)
    })
    
  }


  ngOnInit(): void {
    this.dataloader()

  }



  getFunctionOwner(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }

 

  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
this.apiService.getProjectBaseline(this.id).then((count:any) => {
this.baselineCount = count
console.log(this.baselineCount)
})
    this.apiService.getprojectviewdata(this.id).then((res: any) => {
      this.portApiService.getfilterlist().then(filterres => {
        this.authService.lookupMaster().then((lookup: any) => {
          console.log('LookUp Data', lookup)
          this.lookUpData = lookup
          console.log('Filter Criteria:', filterres)
          this.filterCriteria = filterres
          console.log("Milestone info:", res)
          this.scheduleData = res
          console.log(this.id)
          if (res.scheduleData.length != 0) {
            for (var i of res.scheduleData) {
              console.log(res.scheduleData)
              this.milestoneForm.push(new FormGroup({
                scheduleUniqueId: new FormControl(i.scheduleUniqueId),
                projectId: new FormControl(i.projectId),
                milestone: new FormControl(i.milestone),
                plannedFinish: new FormControl(i.plannedFinish),
                baselineFinish: new FormControl(i.baselineFinish),
                responsiblePersonName: new FormControl(i.responsiblePersonId == null || i.responsiblePersonId == ''?{}:{userAdid: i.responsiblePersonId, userDisplayName: i.responsiblePersonName} ),
                functionGroupId: new FormControl(i.functionGroupId),
                function: new FormControl(this.lookUpData.find(x => x.lookUpId == i.functionGroupId)),
                completionDate: new FormControl(i.completionDate),
                comments: new FormControl(i.comments),
                includeInReport: new FormControl(i.includeInReport),
                includeInCharter: new FormControl(i.includeInCharter),
                milestoneType: new FormControl(i.milestoneType),
                templateMilestoneId: new FormControl(i.templateMilestoneId),
                includeInCloseout: new FormControl(i.includeInCloseout),
                responsiblePersonId: new FormControl(i.responsiblePersonId),
                indicator: new FormControl(i.indicator)
              }))
              
            }
            if(this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit)
            {
              if (this.scheduleData.projectData.problemType == 'Standard Project / Program' && this.projecthubservice.roleControllerControl.roleId == '9E695295-DC5F-44A8-95F1-A329CD475203')
              {
               
                this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit = false
              }
            }
            for(let control of this.milestoneForm.controls )
            {
              if(!this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit)
              {
                control['controls']['baselineFinish'].disable()
              }
            }
            
          }
          
          console.log('MilestoneForm:', this.milestoneForm.getRawValue())
          this.viewContent =true
        })
      })
    })


  }

  getLookupName(lookUpId: string): string {

    var lookup =  this.lookUpData.find(x => x.lookUpId == lookUpId)

    return  lookup? lookup.lookUpName : ""

  }

  addMilestoneRecord() {

    this.milestoneForm.push(new FormGroup({
      scheduleUniqueId: new FormControl(''),
      projectId: new FormControl(this.id),
      milestone: new FormControl(''),
      plannedFinish: new FormControl(''),
      baselineFinish: new FormControl(''),
      responsiblePersonName: new FormControl({}),
      function: new FormControl({}),
      functionGroupId: new FormControl({}),
      completionDate: new FormControl(''),
      comments: new FormControl(''),
      includeInReport: new FormControl(false),
      includeInCharter: new FormControl(false),
      milestoneType: new FormControl(null),
      templateMilestoneId: new FormControl(''),
      includeInCloseout: new FormControl(false),
      responsiblePersonId: new FormControl(''),
      indicator: new FormControl('')
    }))
    if (this.roleMaster.securityGroupId == '9E695295-DC5F-44A8-95F1-A329CD475203' && this.scheduleData.projectData.problemType == 'Standard Project / Program')
    {
      this.milestoneForm.controls['baselineFinish'].disable()
    }

  var j = [{
    scheduleUniqueId: "new",
      baselineFinish: '',
      comments: null,
      completionDate: null,
      functionGroupId: null,
      includeInCharter: false,
      includeInCloseout: false,
      includeInReport: false,
      indicator: "Grey",
      milestone: '',
      milestoneType: null,
      plannedFinish: null,
      projectId: this.id,
      responsiblePersonId: null,
      responsiblePersonName: null,
      templateMilestoneId: null
    }]
   
    this.scheduleData.scheduleData = [...this.scheduleData.scheduleData,...j] 
    console.log(this.scheduleData.scheduleData)
    console.log(this.milestoneTableEditStack)
    this.milestoneTableEditRow(this.scheduleData.scheduleData.length - 1)
  }

  //let index = this.datarows.indexOf(this.selected[0])
  

  deleteSchedule(id: string,row: any, rowIndex: number) {
    console.log(row)
    console.log(rowIndex)
    console.log(this.scheduleData)
    console.log(this.milestoneForm)
    console.log(this.milestoneTableEditStack)

                          
                 
  
      console.log(this.scheduleData)


        this.milestoneForm.removeAt(rowIndex)
        this.scheduleData.scheduleData.splice(rowIndex, 1)
         this.scheduleData.scheduleData = [...this.scheduleData.scheduleData];     
      
    

  }

  milestoneTableEditRow(row: number) {
    if (!this.milestoneTableEditStack.includes(row)) {
      this.milestoneTableEditStack.push(row)
    }
  }

  calculateVariance(row: any): string {
    var datetoday = new Date(moment(this.today).format('L'))
    var datebaseline = new Date(moment(row.baselineFinish).format('L'))
    var dateplanned = new Date(moment(row.plannedFinish).format('L'))
    var datecompletion = new Date(moment(row.completionDate).format('L'))



    if (row.completionDate == null && row.baselineFinish != null && row.plannedFinish != null) {
      if (moment(this.today) > moment(row.plannedFinish)) {
        var Time1 = datetoday.getTime() - datebaseline.getTime();
        var Days1 = Time1 / (1000 * 3600 * 24)

        var variance = Math.round(Days1)
        return variance.toString()


      }
      else if (moment(this.today) < moment(row.plannedFinish)) {
        var Time2 = dateplanned.getTime() - datebaseline.getTime();
        var Days2 = Time2 / (1000 * 3600 * 24)
        var variance = Math.round(Days2)
        return variance.toString()
      }
    }
    else if (row.completionDate != null && row.baselineFinish != null && row.plannedFinish != null) {
      var Time3 = datecompletion.getTime() - datebaseline.getTime();
      var Days3 = Time3 / (1000 * 3600 * 24)
      var variance = Math.round(Days3)
      return variance.toString()
    }
    else {
      return "N/A"
    }
  }

  islink(uid: string): boolean {
    return this.scheduleData.links.some(x => x.linkItemId == uid)
  }
  getlinkname(uid: string): string {
    let temp = this.scheduleData.links.find(x => x.linkItemId == uid)
    temp = this.scheduleData.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
    return "This milestone is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle

  }

  submitschedule() {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Save Changes?",
      "message": "Are you sure you want to save the changes permanently? ",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Save",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const scheduleAlert = this.fuseAlert.open(comfirmConfig)

    scheduleAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
    var formValue = this.milestoneForm.getRawValue()
    console.log(formValue)
    for (var i of formValue) {
      console.log(i)
      this.scheduleObj.push({
        scheduleUniqueId: i.scheduleUniqueId,
        projectId: i.projectId,
        milestone: i.milestone,
        plannedFinish: i.plannedFinish?moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'): null,
        baselineFinish: i.baselineFinish?moment(i.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'): null,
        responsiblePersonName: Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userDisplayName,
        completionDate: i.completionDate?moment(i.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'): null,
        comments: i.comments,
        includeInReport: i.includeInReport,
        functionGroupId: i.function == null ? null : i.function.lookUpId,
        includeInCharter: i.includeInCharter,
        milestoneType: i.milestoneType,
        templateMilestoneId: i.templateMilestoneId,
        includeInCloseout: i.includeInCloseout,
        responsiblePersonId: Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userAdid,
        indicator: i.indicator
      })
    }
    console.log(this.scheduleObj)
    this.apiService.bulkeditSchedule(this.scheduleObj, this.id).then(res => {
      this.projecthubservice.submitbutton.next(true)
      this.projecthubservice.toggleDrawerOpen('', '', [], '')
    })
  }
})
    
  }
  cancelschedule(){
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Discard Changes?",
      "message": "Are you sure you want to discard your changes? ",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Yes",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "No"
        }
      },
      "dismissible": true
    }
    const scheduleAlert = this.fuseAlert.open(comfirmConfig)

    scheduleAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
    this.projecthubservice.toggleDrawerOpen('', '',[],'')
      }
  })
  }
  

}
