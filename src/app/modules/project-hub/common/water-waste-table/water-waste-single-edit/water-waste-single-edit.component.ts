import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MsalService } from '@azure/msal-angular';
import { ProjectApiService } from '../../project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
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
  selector: 'app-water-waste-single-edit',
  templateUrl: './water-waste-single-edit.component.html',
  styleUrls: ['./water-waste-single-edit.component.scss'],
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
export class WaterWasteSingleEditComponent {
  unitCost = ""
  formFieldHelpers: string[] = [''];
  id: string = ""
  lookupdata: any
  biogenics: any
  biogenicsData: any
  biogenicsUpdated: any
  activeaccount: any
  waterWasteForm = new FormGroup({
    emdataWwid: new FormControl(),
    projectId: new FormControl(),
    wwstream: new FormControl(),
    emwwunit: new FormControl(),
    emwwunitCost: new FormControl(),
    embasisOfEstimate: new FormControl(),
    standardUoM: new FormControl(),
    wwtype: new FormControl(),
  })
  waterWasteDropDrownValues = ["Water", "Waste"]
  typeDropDrownValues = []
  waterTypeDropDrownValues = []
  wasteTypeDropDrownValues = []
  waterwasteValues: any

  constructor(private authService: MsalService, private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) {
    this.waterWasteForm.controls.wwstream.valueChanges.subscribe(res => {
      if(res == "Water"){
        this.waterWasteForm.patchValue({ standardUoM : "m3"})
      }
      else if (res == "Waste") {
        this.waterWasteForm.patchValue({ standardUoM: "kg" })
      }
      else{
        this.waterWasteForm.patchValue({ standardUoM: "" })
      }
    })
   }

  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    this.biogenicsData = this.projecthubservice.all[0]
    this.unitCost = "Unit Cost (" + this.projecthubservice.all[2] + ")"
    this.waterwasteValues = this.projecthubservice.all[3]
    var waterValues = this.projecthubservice.all[3].filter(x => x.wwstream == "Water")
    for (var j = 0; j < waterValues.length; j++) {
      this.waterTypeDropDrownValues.push(waterValues[j].wwtype)
    }
    var wasteValues = this.projecthubservice.all[3].filter(x => x.wwstream == "Waste")
    for (var j = 0; j < wasteValues.length; j++) {
      this.wasteTypeDropDrownValues.push(wasteValues[j].wwtype)
    }
    this.waterWasteForm.patchValue({
      emdataWwid: "",
      projectId: this.projecthubservice.projectid,
      wwstream: "",
      emwwunit: "",
      emwwunitCost: "",
      embasisOfEstimate: "",
      standardUoM: "",
      wwtype: ""
    })
    this.waterWasteForm.controls['standardUoM'].disable()
    this.projecthubservice.isFormChanged = false
    this.waterWasteForm.valueChanges.subscribe(res => {
      this.projecthubservice.isFormChanged = true
    })
  }

  submitWaterWaste() {

  }
}
