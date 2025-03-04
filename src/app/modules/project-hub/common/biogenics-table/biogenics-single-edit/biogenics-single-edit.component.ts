import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MsalService} from '@azure/msal-angular';
import {AuthService} from 'app/core/auth/auth.service';
import {ProjectHubService} from 'app/modules/project-hub/project-hub.service';
import {ProjectApiService} from '../../project-api.service';
import {FuseConfirmationConfig, FuseConfirmationService} from '@fuse/services/confirmation';
import {Observable} from "rxjs";

@Component({
    selector: 'app-biogenics-single-edit',
    templateUrl: './biogenics-single-edit.component.html',
    styleUrls: ['./biogenics-single-edit.component.scss']
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
    impactRealizationDate: any;
    viewContent: boolean = false;
    canSubmit: boolean = true
    BiogenicsForm = new FormGroup({
        biogenicDataId: new FormControl(),
        projectId: new FormControl(),
        biogenicMasterUniqueId: new FormControl(),
        biogenicEmissionFactor: new FormControl(),
        biogenicUnit: new FormControl(),
        standardUoM: new FormControl('kWh'),
        biogenicUnitCost: new FormControl(),
        biogenicBasisOfEstimate: new FormControl(),
    })

    constructor(public fuseAlert: FuseConfirmationService, private authService: MsalService, private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) {
    }

    ngOnInit(): void {
        this.getllookup()
    }

    getllookup() {
        this.auth.lookupMaster().then((resp: any) => {
            this.lookupdata = resp
            this.dataloader()
        })
    }

    dataloader() {
        this.biogenicsData = this.projecthubservice.all[0]
        if (this.projecthubservice.all[2].localCurrency == null) {
            this.unitCost = "Unit Cost ()"
        } else {
            this.unitCost = "Unit Cost (" + this.projecthubservice.all[2].localCurrency.localCurrencyAbbreviation + ")"
        }
        this.impactRealizationDate = this.projecthubservice.all[2].projectData.emissionsImpactRealizationDate
        this.BiogenicsForm.patchValue({
            biogenicDataId: "",
            projectId: this.projecthubservice.projectid,
            biogenicMasterUniqueId: "",
            biogenicEmissionFactor: null,
            biogenicUnit: null,
            standardUoM: "kWh",
            biogenicUnitCost: null,
            biogenicBasisOfEstimate: ""
        })
        this.BiogenicsForm.controls['standardUoM'].disable()

        if (this.projecthubservice.all[3][0] == false && (this.projecthubservice.all[2].projectData.energyCostImpactPerYear != "" && this.projecthubservice.all[2].projectData.energyCostImpactPerYear != null && this.projecthubservice.all[2].projectData.energyCostImpactPerYear != 0)) {
            this.BiogenicsForm.controls['biogenicUnitCost'].enable()
        } else if (this.projecthubservice.all[3][0] == true && (this.projecthubservice.all[2].projectData.energyCostImpactPerYear == "" || this.projecthubservice.all[2].projectData.energyCostImpactPerYear == null || this.projecthubservice.all[2].projectData.energyCostImpactPerYear == 0)) {
            this.BiogenicsForm.controls['biogenicUnitCost'].enable()
        } else if (this.projecthubservice.all[3][0] == true && (this.projecthubservice.all[2].projectData.energyCostImpactPerYear != "" && this.projecthubservice.all[2].projectData.energyCostImpactPerYear != null && this.projecthubservice.all[2].projectData.energyCostImpactPerYear != 0)) {
            this.BiogenicsForm.controls['biogenicUnitCost'].disable()
        }

        // if (localStorage.getItem('EnergyCost') == 'true') {
        //   this.BiogenicsForm.controls['biogenicUnitCost'].disable()
        // }
        this.projecthubservice.isFormChanged = false
        this.BiogenicsForm.valueChanges.subscribe(res => {
            this.projecthubservice.isFormChanged = true
        })
        this.viewContent = true;
    }

    GetSource() {
        return this.lookupdata.filter(x => x.lookUpParentId == "ad384cb4-c41a-444f-97fe-68cc91431c51")
    }

    submitBiogenics() {
        if(this.canSubmit)
    {
      this.canSubmit = false
        this.projecthubservice.isFormChanged = false
        var formValue = this.BiogenicsForm.getRawValue()
        formValue.biogenicUnit = isNaN(formValue.biogenicUnit) ? null : formValue.biogenicUnit
        formValue.biogenicEmissionFactor = isNaN(formValue.biogenicEmissionFactor) ? null : formValue.biogenicEmissionFactor
        formValue.biogenicUnitCost = isNaN(formValue.biogenicUnitCost) ? null : formValue.biogenicUnitCost
        if (formValue.biogenicMasterUniqueId == "") {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "Please select a value for Emission Source.",
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
            this.canSubmit = true
        } else if (((formValue.biogenicUnit != null && formValue.biogenicUnit != 0) || (this.projecthubservice.all[4])) && (this.impactRealizationDate == "" || this.impactRealizationDate == null)) {
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
            this.canSubmit = true
        } else {
            var mainObj: any = {
                projectId: this.projecthubservice.projectid,
                biogenicDataId: '',
                biogenicMasterUniqueId: formValue.biogenicMasterUniqueId,
                biogenicEmissionFactor: formValue.biogenicEmissionFactor,
                biogenicUnit: formValue.biogenicUnit,
                standardUoM: formValue.standardUoM,
                biogenicUnitCost: formValue.biogenicUnitCost,
                biogenicBasisOfEstimate: formValue.biogenicBasisOfEstimate
            }
            this.apiService.addBiogenics(mainObj).then(res => {
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.successSave.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
                this.canSubmit = true
            })
        }
    }
}
}
