import { Component, HostListener, OnDestroy, OnInit, ElementRef,ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectHubService } from '../../project-hub.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthService } from '../../../../core/auth/auth.service'
import * as moment from 'moment';
import { startWith, map } from 'rxjs';
import { ProjectApiService } from '../../common/project-api.service';
import { FuseAlertService } from '@fuse/components/alert';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-schedule-view-edit',
  templateUrl: './schedule-view-edit.component.html',
  styleUrls: ['./schedule-view-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class ScheduleViewEditComponent implements OnInit {
  formFieldHelpers: string[] = [''];
  lookupdata: any = []
  schedule: any = {}
  today = new Date();
  item: any = {}
  functionSets: any = []
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService,private _elementRef: ElementRef) {

    this.functionSets = this.scheduleForm.controls['function'].valueChanges.pipe(
      startWith(''),
      map(value => {
        var filterValue = value.toString().toLowerCase()
        if (this.lookupdata.find(x => x.lookUpId == this.scheduleForm.controls.functionid.value)) {
          if (this.lookupdata.find(x => x.lookUpName == value)) {

            return this.lookupdata.filter(x => x.lookUpParentId == '0edea251-09b0-4323-80a0-9a6f90190c77').sort((a, b) => {
              return a.lookUpOrder - b.lookUpOrder;
            })
          }

          else {
            return this.lookupdata.filter(x => x.lookUpName.toLowerCase().includes(filterValue) && x.lookUpParentId == '0edea251-09b0-4323-80a0-9a6f90190c77').sort((a, b) => {
              return a.lookUpOrder - b.lookUpOrder;
            })
          }
        }
        else if(this.scheduleForm.controls.functionid.value == "")
        {
          return this.lookupdata.filter(x => x.lookUpParentId == '0edea251-09b0-4323-80a0-9a6f90190c77').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })
        }
      })

    )
  }


  scheduleForm = new FormGroup({
    milestone: new FormControl(''),
    plannedFinish: new FormControl(''),
    comments: new FormControl(''),
    completionDate: new FormControl(''),
    usersingle: new FormControl(''),
    usersingleid: new FormControl(''),
    function: new FormControl(''),
    functionid: new FormControl(''),
    includeInReport: new FormControl('')
  })
  ngOnInit(): void {
    this.getllookup()
    //this.dataloader()
  }

  dataloader() {
    if (this.projecthubservice.itemid != "new") {
      this.apiService.scheduleSingle(this.projecthubservice.itemid).then((res: any) => {
        this.schedule = res
        console.log(this.projecthubservice)
        console.log('res')
        console.log(res)
        this.scheduleForm.patchValue({
          milestone: res.milestone,
          plannedFinish: res.plannedFinish,
          comments: res.comments,
          completionDate: res.completionDate,
          usersingle: res.ownerName,
          usersingleid: res.ownerId,
          functionid: res.functionGroupId,
          includeInReport: res.includeInReport
        })

        if (res.functionGroupId != null) {
          this.scheduleForm.controls.function.patchValue(this.lookupdata.find(x => x.lookUpId == res.functionGroupId).lookUpName)
        }

        if (this.projecthubservice.all != []) {
          if (this.projecthubservice.all.filter(x => x.includeInReport == true).length >= 8) {
            if (this.scheduleForm.value.includeInReport != true) {
              this.scheduleForm.controls['includeInReport'].disable()
            }
          }
        }
        this.projecthubservice.isFormChanged = false
      })
    }
    else {
      this.scheduleForm.patchValue({
        milestone: "",
          plannedFinish: null,
          comments: "",
          completionDate: null,
          usersingle: "",
          usersingleid: "",
          functionid: "",
          includeInReport: false
      })

      if (this.projecthubservice.all.length == 0) {
        console.log(this.projecthubservice.all)
      }
      else {
        if (this.projecthubservice.all.filter(x => x.includeInReport == true).length >= 8) {
          this.scheduleForm.controls['includeInReport'].disable()
        }
      }
      this.projecthubservice.isFormChanged = false
    }
    this.scheduleForm.valueChanges.subscribe(res => {
      this.projecthubservice.isFormChanged = true
    })
  }

  getllookup() {
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.dataloader()
      this.scheduleForm.controls.function.patchValue('')
    })
  }

  onFunctionSelect(event: any) {
    this.scheduleForm.patchValue({
      function: event.option.value.lookUpName,
      functionid: event.option.value.lookUpId
    })
    console.log(this.scheduleForm.controls.functionid.value)

  }
  submitschedule() {
    console.log(this.scheduleForm.errors)
    this.projecthubservice.isFormChanged = false

    if (this.scheduleForm.valid) {
      if (this.projecthubservice.itemid == "new") {
        console.log(this.projecthubservice)
        var mainObjnew = {
          scheduleUniqueId: "new",
          projectId: this.projecthubservice.projectid,
          milestone: this.scheduleForm.value.milestone,
          plannedFinish: moment(this.scheduleForm.value.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          baselineFinish: moment(this.schedule.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          functionGroupId: this.scheduleForm.value.functionid,
          comments: this.scheduleForm.value.comments,
          completionDate: moment(this.scheduleForm.value.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          includeInReport: this.scheduleForm.value.includeInReport,
          indicator: "Grey",
          includeInCharter: this.schedule.includeInCharter,
          milestoneType: this.schedule.milestoneType,
          templateMilestoneId: this.schedule.templateMilestoneId,
          includeInCloseout: this.schedule.includeInCloseout,
          responsiblePersonId: this.scheduleForm.value.usersingleid,
          responsiblePersonName: this.scheduleForm.value.usersingle
        }
        //Function when null
        if (this.scheduleForm.controls['function'].value == "") {
          mainObjnew.functionGroupId = null
        } 
        if (this.scheduleForm.controls['includeInReport'].disabled) {
          mainObjnew.includeInReport = false
        }

        //Planned Finish
        if (mainObjnew.plannedFinish == "Invalid date") {
          mainObjnew.plannedFinish = null
        }
        //Completion
        if (mainObjnew.completionDate == "Invalid date") {
          mainObjnew.completionDate = null
        }
        console.log("final object")
        console.log(mainObjnew)
        this.apiService.addSchedule(mainObjnew).then(() => {
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.submitbutton.next(true)
        })
      }
      else {
        var mainObj = {
          scheduleUniqueId: this.schedule.scheduleUniqueId,
          projectId: this.schedule.projectId,
          milestone: this.scheduleForm.value.milestone,
          plannedFinish: moment(this.scheduleForm.value.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          baselineFinish: moment(this.schedule.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          functionGroupId: this.scheduleForm.value.functionid,
          comments: this.scheduleForm.value.comments,
          completionDate: moment(this.scheduleForm.value.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          includeInReport: this.scheduleForm.value.includeInReport,
          indicator: this.schedule.indicator,
          includeInCharter: this.schedule.includeInCharter,
          milestoneType: this.schedule.milestoneType,
          templateMilestoneId: this.schedule.templateMilestoneId,
          includeInCloseout: this.schedule.includeInCloseout,
          responsiblePersonId: this.scheduleForm.value.usersingleid,
          responsiblePersonName: this.scheduleForm.value.usersingle
        }
        //Function when null
        console.log(this.scheduleForm.controls['function'].value)
        if (this.scheduleForm.controls['function'].value == "") {
          mainObj.functionGroupId = null
        } 

        //Planned Finish
        if (mainObj.plannedFinish == "Invalid date") {
          mainObj.plannedFinish = null
        }

        //Completion
        if (mainObj.completionDate == "Invalid date") {
          mainObj.completionDate = null
        }

        console.log("final object")
        console.log(mainObj)
        this.apiService.editSchedule(mainObj).then(res => {
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.submitbutton.next(true)
        })
      }
    }
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
  }
}
