import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectHubService } from '../../project-hub.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {AuthService} from '../../../../core/auth/auth.service'
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
  selector: 'app-risk-issue-view-edit',
  templateUrl: './risk-issue-view-edit.component.html',
  styleUrls: ['./risk-issue-view-edit.component.scss'],
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
export class RiskIssueViewEditComponent implements OnInit {
  formFieldHelpers: string[] = [''];
  lookupdata: any = []
  askneed: any = {} 
  today = new Date();
  item: any = {}
  constructor(public projecthubservice: ProjectHubService, public auth: AuthService) { }
  riskIssueForm = new FormGroup({
    logDate: new FormControl(''),
    type: new FormControl(''),
    ifThisHappens: new FormControl('')
  })
  ngOnInit(): void {
    this.getllookup()
  }
  getllookup(){
    this.auth.lookupMaster().then((resp: any)=>{
      this.lookupdata = resp
    })
  }
  getissuetype():any{
    return this.lookupdata.filter(x=>x.lookUpParentId=='6b4487a4-097d-43ee-890d-172c601cd09b').sort((a, b) => {
      return a.lookUpOrder - b.lookUpOrder;
  })
  }
  submitriskissue(){

  }
}
