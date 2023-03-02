import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
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
  selector: 'app-ask-need-view-edit',
  templateUrl: './ask-need-view-edit.component.html',
  styleUrls: ['./ask-need-view-edit.component.scss'],
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

export class AskNeedViewEditComponent implements OnInit, OnDestroy {
  formFieldHelpers: string[] = [''];
  askneed: any = {}
  today = new Date();
  item: any = {}
  askneedform = new FormGroup({
    askNeed1: new FormControl(''),
    comments: new FormControl(''),
    logDate: new FormControl(null),
    needByDate: new FormControl(''),
    closeDate: new FormControl(''),
    usersingle: new FormControl(''),
    usersingleid: new FormControl(''),
    includeInReport: new FormControl(false)
  })
  constructor(public projecthubservice: ProjectHubService, private apiService: ProjectApiService) {
  }

  ngOnInit(): void {
    if (this.projecthubservice.itemid != "new") {
      this.apiService.askNeedSingle(this.projecthubservice.itemid).then((res: any) => {
        this.askneed = res
        this.askneedform.patchValue({
          askNeed1: res.askNeed1,
          comments: res.comments,
          logDate: res.logDate,
          needByDate: res.needByDate,
          closeDate: res.closeDate,
          usersingle: res.needFromName,
          usersingleid: res.needFromId,
          includeInReport: this.projecthubservice.all.find(x=>x.askNeedUniqueId == res.askNeedUniqueId).includeInReport
        })
        console.log(this.askneed.needFromName)
        this.askneedform.controls['logDate'].disable()
        if (this.projecthubservice.all.length != 0) {
          if (this.projecthubservice.all.some(x => x.includeInReport == true)) {
            if (this.askneedform.value.includeInReport != true) {
              this.askneedform.controls['includeInReport'].disable()
              //  this.askneedform.controls['includeInReport'].disabled
            }
          }
        }
        console.log(this.askneedform)
        this.projecthubservice.isFormChanged = false
      })
    }
    else {
      this.askneedform.patchValue({
        askNeed1: "",
        comments: "",
        logDate: this.today,
        needByDate: null,
        closeDate: null,
        usersingle: "",
        usersingleid: "",
        includeInReport: false
      })
      this.askneedform.controls['logDate'].disable()
      if (this.projecthubservice.all.length == 0) {
        console.log(this.projecthubservice.all)
      }
      else {
        console.log(this.projecthubservice.all)
        if (this.projecthubservice.all.some(x => x.includeInReport == true)) {
          this.askneedform.controls['includeInReport'].disable()
        }
      }
      this.projecthubservice.isFormChanged = false
    }
    this.askneedform.valueChanges.subscribe(res => {
      this.projecthubservice.isFormChanged = true
    })
  }

  submitaskneed() {
    //.format('YYYY-MM-DD[T]HH-mm-ss.sss[Z]')
    console.log(typeof this.askneedform.value.logDate)
    console.log(this.askneedform.value.needByDate)
    console.log(this.askneedform.errors)
    this.projecthubservice.isFormChanged = false

    if (this.askneedform.valid) {
      if (this.projecthubservice.itemid == "new") {
        var mainObjnew = {
          askNeed1: this.askneedform.value.askNeed1,
          comments: this.askneedform.value.comments,
          logDate: moment(this.askneed.logDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          needByDate: moment(this.askneedform.value.needByDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          closeDate: moment(this.askneedform.value.closeDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          needFromId: this.askneedform.value.usersingleid,
          needFromName: this.askneedform.value.usersingle,
          includeInReport: this.askneedform.value.includeInReport,
          indicator: "Grey",
          projectId: this.projecthubservice.projectid,
          askNeedUniqueId: "new"
        }

         //NeedFrom when null
         console.log(this.askneedform.controls['usersingle'].value)
         if (this.askneedform.controls['usersingle'].value == "") {
          mainObjnew.needFromName = null
          mainObjnew.needFromId = null
        }
        //Log Date
        if (mainObjnew.logDate == "Invalid date") {
          mainObjnew.logDate = this.askneed.logDate + ".000Z"
        }

        // if (this.askneedform.controls['logDate'].value == null) {
        //   mainObjnew.logDate = moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
        // }
        if (this.askneedform.controls['includeInReport'].disabled) {
          mainObjnew.includeInReport = false
        }
        if (mainObjnew.needByDate == "Invalid date") {
          mainObjnew.needByDate = null
        }
        if (mainObjnew.closeDate == "Invalid date") {
          mainObjnew.closeDate = null
        }
        console.log("final object")
        console.log(mainObjnew)
        this.apiService.addAskNeed(mainObjnew).then(() => {
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.submitbutton.next(true)
        })
      }
      else {
        var mainObj = {
          askNeed1: this.askneedform.value.askNeed1,
          comments: this.askneedform.value.comments,
          logDate: moment(this.askneed.logDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          needByDate: moment(this.askneedform.value.needByDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          closeDate: moment(this.askneedform.value.closeDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          needFromId: this.askneedform.value.usersingleid,
          needFromName: this.askneedform.value.usersingle,
          includeInReport: this.askneedform.value.includeInReport,
          indicator: this.askneed.indicator,
          projectId: this.askneed.projectId,
          askNeedUniqueId: this.askneed.askNeedUniqueId
        }

        //NeedFrom when null
        console.log(this.askneedform.controls['usersingle'].value)
        if (this.askneedform.controls['usersingle'].value == "") {
          mainObj.needFromName = null
          mainObj.needFromId = null
        }
        //Log Date
        if (mainObj.logDate == "Invalid date") {
          mainObj.logDate = this.askneed.logDate + ".000Z"
        }

        // if (this.askneedform.controls['logDate'].value == null) {
        //   mainObj.logDate = this.askneed.logDate
        // }

        //Need By Date
        if (mainObj.needByDate == "Invalid date") {
          mainObj.needByDate = null
        }

        //Close Date
        if (mainObj.closeDate == "Invalid date") {
          mainObj.closeDate = null
        }

        console.log("final object")
        console.log(mainObj)
        this.apiService.editAskNeed(this.projecthubservice.projectid,mainObj).then(res => {
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.isNavChanged.next(true)
          this.projecthubservice.submitbutton.next(true)
        })
      }
    }
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
  }

}
