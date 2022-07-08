import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
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
  selector: 'app-overall-status-edit',
  templateUrl: './overall-status-edit.component.html',
  styleUrls: ['./overall-status-edit.component.scss'],
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

export class OverallStatusEditComponent implements OnInit {
  today = new Date()
  formFieldHelpers: string[] = [''];
  askneed: any = {}
  item: any = {}
  overallStatusform = new FormGroup({
    nextSteps: new FormControl(''),
    overallStatusId: new FormControl(''),
    overallStatusDescription: new FormControl(''),
    recentAccomplishments: new FormControl(''),
    statusLastUpdated: new FormControl(''),
    statusThrough: new FormControl(''),
  })
  constructor(public projecthubservice: ProjectHubService, private apiService: ProjectApiService) { }

  ngOnInit(): void {
    this.apiService.overallStatusSingle(this.projecthubservice.itemid).then((res: any) => {
      console.log(res)
      this.item = res
      this.overallStatusform.patchValue({
        nextSteps: res.nextSteps,
        overallStatusId: res.overallStatusId,
        overallStatusDescription: res.overallStatusDescription,
        recentAccomplishments: res.recentAccomplishments,
        statusLastUpdated: res.statusLastUpdated,
        statusThrough: res.statusThrough,
      })
    })
    this.overallStatusform.controls['statusLastUpdated'].disable()
  }
  submitoverall() {
    
    var overall = {
      nextSteps: this.overallStatusform.value.nextSteps,
      overallStatusDescription: this.overallStatusform.value.overallStatusDescription,
      overallStatusId: this.overallStatusform.value.overallStatusId,
      projectId: this.item.projectId,
      recentAccomplishments: this.overallStatusform.value.recentAccomplishments,
      statusUnquieId: this.item.statusUnquieId,
      statusThrough: moment(this.overallStatusform.value.statusThrough).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
      statusLastUpdated: moment(this.item.statusLastUpdated).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
    }
    if (this.overallStatusform.value.statusThrough == null) {
      overall.statusThrough = this.item.statusThrough
    }
    console.log(overall)
    this.apiService.editOverallStatus(overall).then(res => {
      this.projecthubservice.toggleDrawerOpen('', '', [], '')
      this.projecthubservice.submitbutton.next(true)
    })
  }
}
