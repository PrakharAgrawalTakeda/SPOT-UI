import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';
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

  constructor(private authService: MsalService, private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) { }
  
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
    // this.apiService.getCAPSbyProjectID(this.projecthubservice.projectid).then((res: any) => {
      this.biogenicsData = this.projecthubservice.all[0]
      this.unitCost = "Unit Cost (" + this.projecthubservice.all[3] + ")"
        this.BiogenicsForm.patchValue({
          biogenicDataId: "",
          projectId: this.projecthubservice.projectid,
          biogenicMasterUniqueId: "",
          biogenicEmissionFactor: "",
          biogenicUnit: "",
          standardUoM: "kWh",
          biogenicUnitCost: "",
          biogenicBasisOfEstimate: ""
        })
      this.BiogenicsForm.controls['standardUoM'].disable()
        this.projecthubservice.isFormChanged = false
      this.BiogenicsForm.valueChanges.subscribe(res => {
        this.projecthubservice.isFormChanged = true
      })
    // })
  }

  GetSource(){
    return this.lookupdata.filter(x => x.lookUpParentId == "ad384cb4-c41a-444f-97fe-68cc91431c51")
  }

  submitBiogenics(){

  }
}
