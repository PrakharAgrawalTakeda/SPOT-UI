import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectHubService } from '../../project-hub.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthService } from '../../../../core/auth/auth.service'
import * as moment from 'moment';
import { startWith, map } from 'rxjs';
import { ProjectApiService } from '../../common/project-api.service';
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
  functionSets: any = []
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService) {

    this.functionSets = this.riskIssueForm.controls['function'].valueChanges.pipe(
      startWith(''),
      map(value => {
        var filterValue = value.toString().toLowerCase()
        return this.lookupdata.filter(x => x.lookUpName.toLowerCase().includes(filterValue) && x.lookUpParentId == '0edea251-09b0-4323-80a0-9a6f90190c77')
      })
    )
  }
  riskIssueForm = new FormGroup({
    logDate: new FormControl(''),
    type: new FormControl(''),
    ifThisHappens: new FormControl(''),
    probability: new FormControl(''),
    thisIsTheResult: new FormControl(''),
    impact: new FormControl(''),
    mitigation: new FormControl(''),
    dueDate: new FormControl(''),
    closeDate: new FormControl(''),
    usersingle: new FormControl(''),
    usersingleid: new FormControl(''),
    function: new FormControl(''),
    functionid: new FormControl(''),
    includeInReport: new FormControl(''),
    postMitigationProbability: new FormControl(''),
    postMitigationImpact: new FormControl(''),
    postMitigationComments: new FormControl('')
  })
  ngOnInit(): void {
    this.getllookup()
  }

  dataloader() {
    this.apiService.riskIssueSingle(this.projecthubservice.itemid).then((res: any) => {
      console.log(res)
      this.riskIssueForm.patchValue({
        logDate: res.logDate,
        type: res.riskIssueTypeId,
        ifThisHappens: res.ifHappens,
        probability: res.probabilityId,
        thisIsTheResult: res.riskIssueResult,
        impact: res.impactId,
        mitigation: res.mitigation,
        dueDate: res.dueDate,
        closeDate: res.closeDate,
        usersingle: res.ownerName,
        usersingleid: res.ownerId,
        functionid: res.functionGroupId,
        includeInReport: res.includeInReport,
        postMitigationProbability: res.postMitigationProbability,
        postMitigationImpact: res.postMitigationImpact,
        postMitigationComments: res.postMitigationComments
      })
      if (res.functionGroupId != null) {
        this.riskIssueForm.controls.function.patchValue(this.lookupdata.find(x => x.lookUpId == res.functionGroupId).lookUpName)
      }

      if (this.projecthubservice.all != []) {
        if (this.projecthubservice.all.some(x => x.includeInReport == 3)) {
          if (this.riskIssueForm.value.includeInReport != true) {
            this.riskIssueForm.controls['includeInReport'].disable()
          }
        }
      }

    })
  }
  getllookup() {
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.dataloader()
      this.riskIssueForm.controls.function.patchValue('')
    })
  }
  getissuetype(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == '6b4487a4-097d-43ee-890d-172c601cd09b').sort((a, b) => {
      return a.lookUpOrder - b.lookUpOrder;
    })
  }

  getprobability(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == '56b86714-15d8-45ef-ab5f-f50063254ceb').sort((a, b) => {
      return a.lookUpOrder - b.lookUpOrder;
    })
  }

  getimpact(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == '08434f33-9e4d-482c-b776-efe1c3cae12e').sort((a, b) => {
      return a.lookUpOrder - b.lookUpOrder;
    })
  }

  getpostMitigationProbability(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == '3263E6FE-9C4E-4365-82CD-491113736EFA').sort((a, b) => {
      return a.lookUpOrder - b.lookUpOrder;
    })
  }

  getpostMitigationImpact(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == 'D4FF10E4-B354-4296-B780-1C1A9A379E70').sort((a, b) => {
      return a.lookUpOrder - b.lookUpOrder;
    })
  }

  onFunctionSelect(event: any) {
    this.riskIssueForm.patchValue({
      function: event.option.value.lookUpName,
      functionid: event.option.value.lookUpId
    })
    console.log(this.riskIssueForm.controls.functionid.value)
  }
  submitriskissue() {

  }
}
