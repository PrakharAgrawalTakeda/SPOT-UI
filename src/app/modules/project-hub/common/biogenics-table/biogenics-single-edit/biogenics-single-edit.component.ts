import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';
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
  selector: 'app-biogenics-single-edit',
  templateUrl: './biogenics-single-edit.component.html',
  styleUrls: ['./biogenics-single-edit.component.scss'],
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
export class BiogenicsSingleEditComponent {
  unitCost = ""
  formFieldHelpers: string[] = [''];
  id: string = ""
  lookupdata: any
  biogenics: any
  biogenicsData: any
  biogenicsUpdated: any
  activeaccount: any
  BiogenicsForm = new FormGroup({
    biogenicsID: new FormControl(),
    projectUid: new FormControl(),
    emissionSource: new FormControl(),
    emissionFactor: new FormControl(),
    units: new FormControl(),
    UoM: new FormControl(),
    unitCost: new FormControl(),
    basisOfEstimate: new FormControl(),
  })

  constructor(private authService: MsalService, private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) { }
  
  ngOnInit(): void {
    this.getllookup()
  }

  getllookup() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.dataloader()
    })
  }

  dataloader() {
    this.apiService.getLessonLearnedbyProjectId(this.projecthubservice.projectid).then((res: any) => {
      this.apiService.getGeneralInfoData(this.projecthubservice.projectid).then((response: any) => {
      this.biogenicsData = res
        this.unitCost = "Unit Cost (" + response.localCurrencyAbbreviation + ")"
        this.activeaccount = this.authService.instance.getActiveAccount();
        var user = {
          userAdid: this.activeaccount.localAccountId,
          userDisplayName: this.activeaccount.name
        };
        this.BiogenicsForm.patchValue({
          biogenicsID: "",
          projectUid: this.projecthubservice.projectid,
          emissionSource: "",
          emissionFactor: "",
          units: "",
          UoM: "KWh",
          unitCost: "",
          basisOfEstimate: ""
        })
        this.projecthubservice.isFormChanged = false
      this.BiogenicsForm.valueChanges.subscribe(res => {
        this.projecthubservice.isFormChanged = true
      })
    })
    })
  }

  GetSource(){

  }

  submitBiogenics(){

  }
}
