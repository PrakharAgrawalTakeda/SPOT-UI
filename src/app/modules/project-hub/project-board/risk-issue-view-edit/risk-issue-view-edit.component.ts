import { Component, HostListener, OnDestroy, OnInit, ElementRef,ViewChild, ViewEncapsulation } from '@angular/core';
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

export class RiskIssueViewEditComponent implements OnInit {
  formFieldHelpers: string[] = [''];
  lookupdata: any = []
  riskissue: any = {}
  today = new Date();
  item: any = {}
  functionSets: any = []
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService,private _elementRef: ElementRef) {

    this.functionSets = this.riskIssueForm.controls['function'].valueChanges.pipe(
      startWith(''),
      map(value => {
        var filterValue = value.toString().toLowerCase()
        if (this.lookupdata.find(x => x.lookUpId == this.riskIssueForm.controls.functionid.value)) {
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
        else if(this.riskIssueForm.controls.functionid.value == "")
        {
          return this.lookupdata.filter(x => x.lookUpParentId == '0edea251-09b0-4323-80a0-9a6f90190c77').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })
        }
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
    //this.dataloader()
  }

  dataloader() {
    if (this.projecthubservice.itemid != "new") {
      this.apiService.riskIssueSingle(this.projecthubservice.itemid).then((res: any) => {
        this.riskissue = res
        console.log(this.projecthubservice)
        console.log('res')
        console.log(res)
        this.riskIssueForm.patchValue({
          logDate: res.logDate ? res.logDate : this.today,
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
        this.riskIssueForm.controls['logDate'].disable()
        if (res.functionGroupId != null) {
          this.riskIssueForm.controls.function.patchValue(this.lookupdata?.find(x => x.lookUpId == res.functionGroupId)?.lookUpName)
        }
        if (this.projecthubservice.all != []) {
          if (this.projecthubservice.all.filter(x => x.includeInReport == true).length >= 3) {
            if (this.riskIssueForm.value.includeInReport != true) {
              this.riskIssueForm.controls['includeInReport'].disable()
            }
          }
        }
        this.projecthubservice.isFormChanged = false
      })
    }
    else {
      this.riskIssueForm.patchValue({
        logDate: this.today,
        type: "",
        ifThisHappens: "",
        probability: "",
        thisIsTheResult: "",
        impact: "",
        mitigation: "",
        dueDate: null,
        closeDate: null,
        usersingle: "",
        usersingleid: "",
        functionid: "",
        includeInReport: false,
        postMitigationProbability: "",
        postMitigationImpact: "",
        postMitigationComments: ""
      })
      this.riskIssueForm.controls['logDate'].disable()
      if (this.projecthubservice.all.length == 0) {
        console.log(this.projecthubservice.all)
      }
      else {
        if (this.projecthubservice.all.filter(x => x.includeInReport == true).length >= 3) {
          this.riskIssueForm.controls['includeInReport'].disable()
        }
      }
      this.projecthubservice.isFormChanged = false
    }
    this.riskIssueForm.valueChanges.subscribe(res => {
      this.projecthubservice.isFormChanged = true
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
    this.projecthubservice.isFormChanged = false

    if (this.riskIssueForm.valid) {
      if (this.projecthubservice.itemid == "new") {
        console.log(this.projecthubservice)
        var mainObjnew = {
          riskIssueUniqueId: "new",
          projectId: this.projecthubservice.projectid,
          riskIssueTypeId: this.riskIssueForm.value.type,
          ifHappens: this.riskIssueForm.value.ifThisHappens,
          riskIssueResult: this.riskIssueForm.value.thisIsTheResult,
          probabilityId: this.riskIssueForm.value.probability,
          impactId: this.riskIssueForm.value.impact,
          mitigation: this.riskIssueForm.value.mitigation,
          ownerId: this.riskIssueForm.value.usersingleid,
          ownerName: this.riskIssueForm.value.usersingle,
          functionGroupId: this.riskIssueForm.value.functionid,
          dueDate: moment(this.riskIssueForm.value.dueDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          closeDate: moment(this.riskIssueForm.value.closeDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          logDate: moment(this.riskissue.logDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          //logDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          includeInReport: this.riskIssueForm.value.includeInReport,
          indicator: "Grey",
          includeInCharter: this.riskissue.includeInCharter,
          postMitigationProbability: this.riskIssueForm.value.postMitigationProbability,
          postMitigationImpact: this.riskIssueForm.value.postMitigationImpact,
          postMitigationComments: this.riskIssueForm.value.postMitigationComments
        }
        //Function when null
        if (this.riskIssueForm.controls['function'].value == "") {
          mainObjnew.functionGroupId = null
        }
        if (this.riskIssueForm.controls['includeInReport'].disabled) {
          mainObjnew.includeInReport = false
        }
        //Log Date
        if (mainObjnew.logDate == "Invalid date") {
          mainObjnew.logDate = this.riskissue.logDate + ".000Z"
        }
        if (this.riskIssueForm.controls['usersingleid'].value == "") {
            mainObjnew.ownerName = null
            mainObjnew.ownerId = null
        }

        // if (this.riskIssueForm.controls['logDate'].value == null) {
        //   mainObjnew.logDate = moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
        // }

        if (mainObjnew.dueDate == "Invalid date") {
          mainObjnew.dueDate = null
        }
        if (mainObjnew.closeDate == "Invalid date") {
          mainObjnew.closeDate = null
        }
        console.log("final object")
        console.log(mainObjnew)
        this.apiService.addRiskIssue(mainObjnew).then(() => {
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.submitbutton.next(true)
        })
      }
      else {
        var mainObj = {
          riskIssueUniqueId: this.riskissue.riskIssueUniqueId,
          projectId: this.riskissue.projectId,
          riskIssueTypeId: this.riskIssueForm.value.type,
          ifHappens: this.riskIssueForm.value.ifThisHappens,
          riskIssueResult: this.riskIssueForm.value.thisIsTheResult,
          probabilityId: this.riskIssueForm.value.probability,
          impactId: this.riskIssueForm.value.impact,
          mitigation: this.riskIssueForm.value.mitigation,
          ownerId: this.riskIssueForm.value.usersingleid,
          ownerName: this.riskIssueForm.value.usersingle,
          functionGroupId: this.riskIssueForm.value.functionid,
          dueDate: moment(this.riskIssueForm.value.dueDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          closeDate: moment(this.riskIssueForm.value.closeDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          logDate: moment(this.riskissue.logDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          includeInReport: this.riskIssueForm.value.includeInReport,
          indicator: this.riskissue.indicator,
          includeInCharter: this.riskissue.includeInCharter,
          postMitigationProbability: this.riskIssueForm.value.postMitigationProbability,
          postMitigationImpact: this.riskIssueForm.value.postMitigationImpact,
          postMitigationComments: this.riskIssueForm.value.postMitigationComments
        }
        //Function when null
        console.log(this.riskIssueForm.controls['function'].value)
        if (this.riskIssueForm.controls['function'].value == "") {
          mainObj.functionGroupId = null
        }
        if (this.riskIssueForm.controls['usersingle'].value == "") {
            mainObj.ownerName = null
            mainObj.ownerId = null
        }
        //Log Date
        console.log(this.riskIssueForm.value.logDate)
        console.log(this.riskissue.logDate)
        if (mainObj.logDate == "Invalid date") {
          mainObj.logDate = this.riskissue.logDate + ".000Z"
        }

        // if (this.riskIssueForm.controls['logDate'].value == null) {
        //   mainObj.logDate = this.riskissue.logDate
        // }

        //Need By Date
        if (mainObj.dueDate == "Invalid date") {
          mainObj.dueDate = null
        }

        //Close Date
        if (mainObj.closeDate == "Invalid date") {
          mainObj.closeDate = null
        }

        console.log("final object")
        console.log(mainObj)
        this.apiService.editRiskIssue(mainObj).then(res => {
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
