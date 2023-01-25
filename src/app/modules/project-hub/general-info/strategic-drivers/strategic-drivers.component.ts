import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-strategic-drivers',
  templateUrl: './strategic-drivers.component.html',
  styleUrls: ['./strategic-drivers.component.scss']
})
export class StrategicDriversComponent implements OnInit {
  strategicDriversForm = new FormGroup({
    primaryKPI: new FormControl({}),
    isAgile: new FormControl(false),
    agilePrimaryWorkstream: new FormControl({}),
    agileSecondaryWorkstream: new FormControl([]),
    agileWave: new FormControl({}),
    isPobos: new FormControl(false),
    pobosCategory: new FormControl([]),
    isGmsgqltannualMustWin: new FormControl(false),
    strategicYear: new FormControl({}),
    annualMustWinID: new FormControl({}),
    isSiteAssessment: new FormControl(false),
    siteAssessmentCategory: new FormControl([]),
    isGoodPractise: new FormControl(false)
  })
  generalInfo: any = {}
  filterCriteria = {}
  kpiMasters = []
  lookUpMaster = []
  viewContent = false
  @Input() viewType: 'SidePanel' | 'Form' = 'SidePanel'
  @Input() callLocation: 'ProjectHub' | 'CreateNew' | 'CopyProject' = 'ProjectHub'
  @Input() viewElements: any = ["primaryKPI", "isAgile", "agilePrimaryWorkstream", "agileSecondaryWorkstream", "agileWave", "isPobos", "pobosCategory", "isGmsgqltannualMustWin", "strategicYear", "annualMustWinID", "isSiteAssessment", "siteAssessmentCategory", "isGoodPractise"]
  @Output() formValue = new EventEmitter();
  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService) {
    this.strategicDriversForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (this.callLocation == 'ProjectHub') {
          this.projectHubService.isFormChanged = true
        }
      }
    })

    //confirmation pop ups
    this.strategicDriversForm.controls.isAgile.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the Agile Information?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
                "color": "warn"
              },
              "cancel": {
                "show": true,
                "label": "Cancel"
              }
            },
            "dismissible": true
          }
          const alert = this.fuseAlert.open(comfirmConfig)
          alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
              this.strategicDriversForm.patchValue({
                agilePrimaryWorkstream: {},
                agileSecondaryWorkstream: [],
                agileWave: {},
              })
            }
            else {
              this.strategicDriversForm.controls.isAgile.patchValue(true)
            }
          })
        }
      }
    })
    this.strategicDriversForm.controls.isPobos.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the POBOS Information?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
                "color": "warn"
              },
              "cancel": {
                "show": true,
                "label": "Cancel"
              }
            },
            "dismissible": true
          }
          const alert = this.fuseAlert.open(comfirmConfig)
          alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
              this.strategicDriversForm.patchValue({
                pobosCategory: []
              })
            }
            else {
              this.strategicDriversForm.controls.isPobos.patchValue(true)
            }
          })
        }
      }
    })
    this.strategicDriversForm.controls.isGmsgqltannualMustWin.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the Annual Must Win and Strategic Year?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
                "color": "warn"
              },
              "cancel": {
                "show": true,
                "label": "Cancel"
              }
            },
            "dismissible": true
          }
          const alert = this.fuseAlert.open(comfirmConfig)
          alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
              this.strategicDriversForm.patchValue({
                strategicYear: {},
                annualMustWinID: {}
              })
            }
            else {
              this.strategicDriversForm.controls.isGmsgqltannualMustWin.patchValue(true)
            }
          })
        }
      }
    })
    this.strategicDriversForm.controls.isSiteAssessment.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the Site Assessment Information?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
                "color": "warn"
              },
              "cancel": {
                "show": true,
                "label": "Cancel"
              }
            },
            "dismissible": true
          }
          const alert = this.fuseAlert.open(comfirmConfig)
          alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
              this.strategicDriversForm.patchValue({
                siteAssessmentCategory: []
              })
            }
            else {
              this.strategicDriversForm.controls.isSiteAssessment.patchValue(true)
            }
          })
        }
      }
    })
  }

  ngOnInit(): void {
    if (this.callLocation == 'ProjectHub') {
      this.apiService.getGeneralInfoData(this.projectHubService.projectid).then((res: any) => {
        this.generalInfo = res
        this.filterCriteria = this.projectHubService.all
        this.kpiMasters = this.projectHubService.kpiMasters
        this.lookUpMaster = this.projectHubService.lookUpMaster
        this.strategicDriversForm.patchValue({
          primaryKPI: res.projectData.primaryKpi ? this.kpiMasters.find(x => x.kpiid == res.projectData.primaryKpi) : {},
          isAgile: (res.agilePrimaryWorkstream || res.agileWave || res.agileSecondaryWorkstream) ? true : false,
          agilePrimaryWorkstream: res.agilePrimaryWorkstream ? res.agilePrimaryWorkstream : {},
          agileSecondaryWorkstream: res.agileSecondaryWorkstream ? res.agileSecondaryWorkstream : [],
          agileWave: res.agileWave ? res.agileWave : {},
          isPobos: res.projectData.isPobos,
          pobosCategory: res.pobosCategory ? res.pobosCategory : [],
          isGmsgqltannualMustWin: res.projectData.isGmsgqltannualMustWin,
          strategicYear: res.strategicYearID ? res.strategicYearID : {},
          annualMustWinID: res.annualMustWinID ? res.annualMustWinID : {},
          isSiteAssessment: res.projectData.isSiteAssessment,
          siteAssessmentCategory: res.siteAssessmentCategory ? res.siteAssessmentCategory : [],
          isGoodPractise: res.projectData.isGoodPractise
        })
        this.viewContent = true
      })
    }
  }
  viewElementChecker(element: string): boolean {
    return this.viewElements.some(x => x == element)
  }
  getAgileWorkstream(): any {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "f4486388-4c52-48fc-8c05-836878da2247")
  }
  getAgileWave(): any {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "4bdbcbca-90f2-4c7b-b2a5-c337446d60b1")
  }
  getPOBOSCategory(): any {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "A9AB0ADC-AA10-44C1-A99B-3BEB637D0A4E")
  }
  getSiteCategory(): any {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "1DB73E6F-DD4B-44FF-8234-CE5FB3EC68BC")
  }
  getStrategicYear(): any {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "459db0af-bad2-4036-8c9c-928b3c6f8bac")
  }
  getActualMustWin(): any {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "265400f0-6202-469b-bb3d-38727928d1b2")
  }

  submitSD() {
    this.projectHubService.isFormChanged = false
    var formValue = this.strategicDriversForm.getRawValue()
    var mainObj = this.generalInfo.projectData
    mainObj.primaryKpi = Object.keys(formValue.primaryKPI).length > 0 ? formValue.primaryKPI.kpiid : ''
    mainObj.agilePrimaryWorkstream = Object.keys(formValue.agilePrimaryWorkstream).length > 0 ? formValue.agilePrimaryWorkstream.lookUpId : ''
    mainObj.agileSecondaryWorkstream = formValue.agileSecondaryWorkstream.length > 0 ? formValue.agileSecondaryWorkstream.map(x => x.lookUpId).join() : ''
    mainObj.agileWave = Object.keys(formValue.agileWave).length > 0 ? formValue.agileWave.lookUpId : ''
    mainObj.isPobos = formValue.isPobos
    mainObj.poboscategory = formValue.pobosCategory.length > 0 ? formValue.pobosCategory.map(x => x.lookUpId).join() : ''
    mainObj.isGmsgqltannualMustWin = formValue.isGmsgqltannualMustWin
    mainObj.strategicYearId = Object.keys(formValue.strategicYear).length > 0 ? formValue.strategicYear.lookUpId : ''
    mainObj.annualMustWinId = Object.keys(formValue.annualMustWinID).length > 0 ? formValue.annualMustWinID.lookUpId : ''
    mainObj.isSiteAssessment = formValue.isSiteAssessment
    mainObj.siteAssessmentCategory = formValue.siteAssessmentCategory.length > 0 ? formValue.siteAssessmentCategory.map(x => x.lookUpId).join() : ''
    mainObj.isGoodPractise = formValue.isGoodPractise
    this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }
}
