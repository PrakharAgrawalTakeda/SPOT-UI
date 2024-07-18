import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { AuthService } from 'app/core/auth/auth.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-primary-kpi-single-edit',
  templateUrl: './primary-kpi-single-edit.component.html',
  styleUrls: ['./primary-kpi-single-edit.component.scss']
})
export class PrimaryKpiSingleEditComponent implements OnInit {
  primaryKPIForm = new FormGroup({
    vcdate: new FormControl(null),
    primaryKpi: new FormControl(null),
    COPcategory: new FormControl(null),
    valueCommentary: new FormControl('')
  })
  viewContent: boolean = false
  primaryKPI: any;
  copImpactCategory: any;
  id: string;
  vc: any;
  lookupMasters = []
  pc: any;

  constructor(public projecthubservice: ProjectHubService, public apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public auth: AuthService,
    public fuseAlert: FuseConfirmationService) {
    this.primaryKPIForm.controls.primaryKpi.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projecthubservice.isFormChanged = true
      }
    })
    this.primaryKPIForm.controls.COPcategory.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projecthubservice.isFormChanged = true
      }
    })

  }

  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getvalueCreation(this.id).then((vc: any) => {
      this.apiService.getproject(this.id).then((pc: any) => {
        this.auth.lookupMaster().then((lookup: any) => {
          this.vc = vc
          this.lookupMasters = lookup
          this.pc = pc
          console.log(pc)
          //if (this.projecthubservice.itemid && this.projecthubservice.itemid != "") {
          console.log(this.projecthubservice.itemid)
          this.primaryKPI = lookup.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474')
          this.copImpactCategory = lookup.filter(x => x.lookUpParentId == '47630E64-3E3F-4CE2-B4F4-2085A7F35D46')
          this.copImpactCategory.sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })
          console.log(this.primaryKPI)
          console.log(this.copImpactCategory)
          //this.primaryKPIForm.controls.primaryKpi.patchValue(this.projecthubservice.kpiMasters.find(x => x.kpiid == this.projecthubservice.itemid))
          this.primaryKPIForm.controls.primaryKpi.patchValue(this.primaryKPI.find(x => x.lookUpId == pc.primaryKpi))
          this.primaryKPIForm.controls.COPcategory.patchValue(this.copImpactCategory.find(x => x.lookUpId == pc.copImpactCategory))
          this.primaryKPIForm.controls.vcdate.patchValue(pc.financialRealizationStartDate)
          this.primaryKPIForm.controls.valueCommentary.patchValue(pc.valueCommentary)
if(this.primaryKPIForm.value.COPcategory == "" || this.primaryKPIForm.value.COPcategory == null )
{
  this.primaryKPIForm.controls.COPcategory.patchValue(this.copImpactCategory.find(x => x.lookUpId == '2730422E-680A-4B2D-8DC2-F64CA885BB61'))
}
          console.log(this.primaryKPIForm.getRawValue())
          // }
          this.viewContent = true
        })
      })
    })
  }
  submitpkpi() {
    this.projecthubservice.isFormChanged = false;

    if ((this.primaryKPIForm.value.vcdate == "" || this.primaryKPIForm.value.vcdate == null)) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please enter a value for Value Capture Start Date.",
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
    else {
      // Extract the selected primaryKpi value from the form
      const selectedPrimaryKpiValue = this.primaryKPIForm.get('primaryKpi').value;
      const selectedCOPCategory = this.primaryKPIForm.get('COPcategory').value;
      console.log(selectedPrimaryKpiValue)
      console.log(selectedCOPCategory)

      // Find the corresponding lookUpId from primaryKPI array
      const selectedPrimaryKpiObject = selectedPrimaryKpiValue ? this.lookupMasters.find(x => x.lookUpId == selectedPrimaryKpiValue.lookUpId) : '';
console.log(selectedPrimaryKpiObject)
const selectedCOPCategoryObject = selectedCOPCategory ? this.lookupMasters.find(x => x.lookUpId == selectedCOPCategory.lookUpId) : '';
console.log(selectedCOPCategoryObject)
      // Initialize the mainObj
      var mainObj: any = {};
      console.log(this.pc)
      var date = this.primaryKPIForm.get('vcdate').value
      // Assign other properties to mainObj if needed
      mainObj = this.pc
      mainObj.financialRealizationStartDate = date ? moment(date).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null;
      mainObj.valueCommentary = this.primaryKPIForm.get('valueCommentary').value;
      mainObj.primaryKpi = selectedPrimaryKpiObject ? selectedPrimaryKpiObject.lookUpId : null;
      mainObj.copImpactCategory = selectedCOPCategoryObject ? selectedCOPCategoryObject.lookUpId : null;


      console.log(mainObj)
      this.apiService.editGeneralInfo(this.id,mainObj).then(res => {
        this.projecthubservice.isNavChanged.next(true)
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.successSave.next(true)
        this.projecthubservice.toggleDrawerOpen('', '', [], '')

      });
    }


  }

}
