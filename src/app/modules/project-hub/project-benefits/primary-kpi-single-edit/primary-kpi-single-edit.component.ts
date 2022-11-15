import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-primary-kpi-single-edit',
  templateUrl: './primary-kpi-single-edit.component.html',
  styleUrls: ['./primary-kpi-single-edit.component.scss']
})
export class PrimaryKpiSingleEditComponent implements OnInit {
  primaryKPIForm = new FormGroup({
    primaryKpi: new FormControl({})
  })
  viewContent: boolean = false
  constructor(public projecthubservice: ProjectHubService, public apiService: ProjectApiService) {
    this.primaryKPIForm.controls.primaryKpi.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projecthubservice.isFormChanged = true
      }
    })

  }

  ngOnInit(): void {
    if (this.projecthubservice.itemid && this.projecthubservice.itemid != "") {
      this.primaryKPIForm.controls.primaryKpi.patchValue(this.projecthubservice.kpiMasters.find(x => x.kpiid == this.projecthubservice.itemid))
    }
    this.viewContent = true
  }
  submitpkpi() {
    this.projecthubservice.isFormChanged = false
    this.apiService.updatePrimayKPI(this.projecthubservice.projectid, this.primaryKPIForm.controls.primaryKpi.value).then(res => {
      this.projecthubservice.submitbutton.next(true)
      this.projecthubservice.isNavChanged.next(true)
      this.projecthubservice.toggleDrawerOpen('', '', [], '')
    })
  }
}
