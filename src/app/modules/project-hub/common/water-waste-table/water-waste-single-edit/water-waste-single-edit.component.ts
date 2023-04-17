import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MsalService } from '@azure/msal-angular';
import { ProjectApiService } from '../../project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
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
  impactRealizationDate: any
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

  constructor(public fuseAlert: FuseConfirmationService, private authService: MsalService, private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) {
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
    this.unitCost = "Unit Cost (" + this.projecthubservice.all[2] + ")"
    this.impactRealizationDate = this.projecthubservice.all[1].projectData.emissionsImpactRealizationDate
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
      emwwunit: null,
      emwwunitCost: null,
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
    this.projecthubservice.isFormChanged = false
    var formValue = this.waterWasteForm.getRawValue()
    formValue.emwwunit = isNaN(formValue.emwwunit) ? null : formValue.emwwunit
    formValue.emwwunitCost = isNaN(formValue.emwwunitCost) ? null : formValue.emwwunitCost
    if (formValue.wwstream == "") {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please select a value in Water/Waste.",
        "message": "",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warning"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Okay",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const alert = this.fuseAlert.open(comfirmConfig)
    }
    else if (formValue.wwtype == "") {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please select a Type.",
        "message": "",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warning"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Okay",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const alert = this.fuseAlert.open(comfirmConfig)
    }
    else if ((formValue.emwwunit != null && formValue.emwwunit != 0) && (this.impactRealizationDate == "" || this.impactRealizationDate == null)) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please enter a value for Impact Realization Date.",
        "message": "",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warning"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Okay",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const alert = this.fuseAlert.open(comfirmConfig)
    }
    else{
      var id = this.waterwasteValues.filter(x => x.wwstream == formValue.wwstream && x.wwtype == formValue.wwtype)[0].wwsourceMasterUniqueId
      var mainObj: any = {
        projectId: this.projecthubservice.projectid,
        emdataWwid: '',
        wwsourceMasterUniqueId: id,
        emwwunit: formValue.emwwunit,
        emwwunitCost: formValue.emwwunitCost,
        embasisOfEstimate: formValue.embasisOfEstimate
      }
      this.apiService.addWW(mainObj).then(res => {
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.successSave.next(true)
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
      })
    }
  }
}
