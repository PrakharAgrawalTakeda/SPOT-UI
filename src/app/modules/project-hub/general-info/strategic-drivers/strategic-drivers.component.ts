import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-strategic-drivers',
  templateUrl: './strategic-drivers.component.html',
  styleUrls: ['./strategic-drivers.component.scss']
})
export class StrategicDriversComponent implements OnInit {
  strategicDriversForm = new FormGroup({
    primaryKPI: new FormControl(null),
    isAgile: new FormControl(false),
    agilePrimaryWorkstream: new FormControl(null),
    agileSecondaryWorkstream: new FormControl([]),
    agileWave: new FormControl(null),
    isPobos: new FormControl(false),
    pobosCategory: new FormControl([]),
    isGmsgqltannualMustWin: new FormControl(false),
    strategicYear: new FormControl(null),
    annualMustWinID: new FormControl(null),
    isSiteAssessment: new FormControl(false),
    siteAssessmentCategory: new FormControl([]),
    isGoodPractise: new FormControl(false),
    isSprproject: new FormControl(false),
    sprprojectCategory: new FormControl(null),
    sprprojectGrouping: new FormControl(null),
    oeprojectType: new FormControl([])
  })
  generalInfo: any = {}
  filterCriteria = {}
  kpiMasters: any = []
  lookUpMaster = []
  viewContent = false
  lookupdata: any = [];
  agileWorkStream: any = [];
  agileWave: any = [];
  Pobos: any = [];
  site: any = [];
  strategicYear: any = [];
  annualMustWin: any = [];
  @Input() viewType: 'SidePanel' | 'Form' = 'SidePanel'
  @Input() callLocation: 'ProjectHub' | 'CreateNew' | 'CopyProject' | 'CreateNewSIP' = 'ProjectHub'
  @Input() subCallLocation: 'ProjectHub' | 'ProjectProposal' | 'ProjectCharter' |'CloseOut' = 'ProjectHub'
  @Input() viewElements: any = ["primaryKPI", "isAgile", "agilePrimaryWorkstream", "agileSecondaryWorkstream", "agileWave", "isPobos", "pobosCategory", "isGmsgqltannualMustWin", "strategicYear", "annualMustWinID", "isSiteAssessment", "siteAssessmentCategory", "isGoodPractise", "isSprproject", "sprprojectCategory", "sprprojectGrouping", "oeprojectType"]
  @Output() formValueStrategic = new EventEmitter();
  lookUpData: any;
  kpiData: any;
  oeProjectType: any;
  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService, public auth: AuthService) {
    this.strategicDriversForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (this.callLocation == 'ProjectHub' && history.state.callLocation == undefined) {
          this.projectHubService.isFormChanged = true
        }
        else if (this.callLocation == 'CreateNew' || 'CreateNewSIP') {
          this.formValueStrategic.emit(this.strategicDriversForm.getRawValue())
        }
      else if (history.state.callLocation == 'CopyProject') {
        this.formValueStrategic.emit(this.strategicDriversForm.getRawValue())
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
                oeprojectType: [] 
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
    this.strategicDriversForm.controls.isSprproject.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the SPR Project Information?",
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
                sprprojectCategory: {},
                sprprojectGrouping: {}
              })
            }
            else {
              this.strategicDriversForm.controls.isSprproject.patchValue(true)
            }
          })
        }
      }
    })
  }

  ngOnInit(): void {
    if (this.callLocation == 'ProjectHub') {
      this.apiService.getGeneralInfoData(this.projectHubService.projectid).then((res: any) => {
        this.auth.lookupMaster().then((lookup: any) => {
        this.generalInfo = res
        this.lookUpData = lookup
        console.log(res.projectData.primaryKpi)
        this.filterCriteria = this.projectHubService.all
        this.kpiMasters = this.lookUpData.filter(x => x.lookUpParentId == "999572a6-5aa8-4760-8082-c06774a17474")
        this.kpiData = this.projectHubService.kpiMasters
        this.lookUpMaster = this.projectHubService.lookUpMaster
        var oeprojectypelist = res.projectData.oeprojectType && res.projectData.oeprojectType != '' ? res.projectData.oeprojectType.split(',') : []
        this.strategicDriversForm.patchValue({
          //primaryKPI: res.projectData.primaryKpi && this.kpiMasters.find(x => x.lookUpId == res.projectData.primaryKpi) ? this.kpiMasters.find(x => x.lookUpId == res.projectData.primaryKpi).lookUpName : {},
          primaryKPI: (() => {
            if (res.projectData.primaryKpi) {
                const lookUpResult = this.lookUpData.find(x => x.lookUpId == res.projectData.primaryKpi);
                if (lookUpResult) {
                    return lookUpResult;
                } else {
                    const kpiResult = this.kpiData.find(x => x.kpiid == res.projectData.primaryKpi);
                    if (kpiResult) {
                        return kpiResult;
                    }
                }
            }
            else{
              return '';
            }
            
        })(),
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
          isGoodPractise: res.projectData.isGoodPractise,
          isSprproject: res.projectData.isSprproject,
          sprprojectCategory: res.projectData.sprprojectCategory && res.projectData.sprprojectCategory != '' ? this.lookUpData.find(x => x.lookUpId == res.projectData.sprprojectCategory) : {},
          sprprojectGrouping: res.projectData.sprprojectGrouping && res.projectData.sprprojectGrouping != '' ? this.lookUpData.find(x => x.lookUpId == res.projectData.sprprojectGrouping) : {},
          oeprojectType: oeprojectypelist.length > 0 ? this.projectHubService.lookUpMaster.filter(x => res.projectData.oeprojectType.includes(x.lookUpId)) : [],
        })
        this.viewContent = true
      })
      })
    }
    else{
      this.auth.lookupMaster().then(res => {
        this.auth.KPIMaster().then(kpi => {
          this.lookupdata = res;
          this.kpiMasters = this.lookupdata.filter(x => x.lookUpParentId == "999572a6-5aa8-4760-8082-c06774a17474");
          //this.lookUpMaster = 
          if (history.state.data != undefined) {
            if (history.state.data.oeprojectType != null) {
              this.oeProjectType = this.lookupdata.filter(x => x.lookUpParentId == '04D143E7-CAA7-4D8D-88C3-A6CB575890A3');
              this.oeProjectType.sort((a, b) => {
                return a.lookUpOrder - b.lookUpOrder;
              })
              const data = history.state.data.oeprojectType.split(',');
              var oetype = {};
              var finaldataoe = [];
              for (var i = 0; i < data.length; i++) {
                oetype = this.oeProjectType.filter(function (entry) {
                  return entry.lookUpId == data[i]
                })
                finaldataoe.push(oetype[0]);
              }
            }
            if (history.state.data.primaryKpi != null) {
              history.state.data.primaryKpi = this.kpiMasters.filter(function (entry) {
                return entry.lookUpId == history.state.data.primaryKpi
              })
            }
            this.agileWorkStream = this.lookupdata.filter(x => x.lookUpParentId == 'f4486388-4c52-48fc-8c05-836878da2247');
            this.agileWorkStream.sort((a, b) => {
              return a.lookUpOrder - b.lookUpOrder;
            })
            if (history.state.data.agilePrimaryWorkstream != null) {
              history.state.data.agilePrimaryWorkstream = this.agileWorkStream.filter(function (entry) {
                return entry.lookUpId == history.state.data.agilePrimaryWorkstream
              })
            }
            if (history.state.data.agileSecondaryWorkstream != null && history.state.data.agileSecondaryWorkstream != "") {
              const data = history.state.data.agileSecondaryWorkstream.split(',');
              var agilesec = {};
              var finaldatasecagile = [];
              for (var i = 0; i < data.length; i++) {
                agilesec = this.agileWorkStream.filter(function (entry) {
                  return entry.lookUpId == data[i]
                })
                finaldatasecagile.push(agilesec[0]);
              }
            }
            this.agileWave = this.lookupdata.filter(x => x.lookUpParentId == '4bdbcbca-90f2-4c7b-b2a5-c337446d60b1');
            this.agileWave.sort((a, b) => {
              return a.lookUpOrder - b.lookUpOrder;
            })
            if (history.state.data.agileWave != null) {
              history.state.data.agileWave = this.agileWave.filter(function (entry) {
                return entry.lookUpId == history.state.data.agileWave
              })
            }
            this.Pobos = this.lookupdata.filter(x => x.lookUpParentId == 'A9AB0ADC-AA10-44C1-A99B-3BEB637D0A4E');
            this.Pobos.sort((a, b) => {
              return a.lookUpOrder - b.lookUpOrder;
            })
            if (history.state.data.poboscategory != null && history.state.data.poboscategory != "") {
              const data = history.state.data.poboscategory.split(',');
              var Pobostype = {};
              var finaldataPobos = [];
              for (var i = 0; i < data.length; i++) {
                Pobostype = this.Pobos.filter(function (entry) {
                  return entry.lookUpId == data[i]
                })
                finaldataPobos.push(Pobostype[0]);
              }
            }
            this.strategicYear = this.lookupdata.filter(x => x.lookUpParentId == '459db0af-bad2-4036-8c9c-928b3c6f8bac');
            this.strategicYear.sort((a, b) => {
              return a.lookUpOrder - b.lookUpOrder;
            })
            if (history.state.data.strategicYearId != null) {
              history.state.data.strategicYearId = this.strategicYear.filter(function (entry) {
                return entry.lookUpId == history.state.data.strategicYearId
              })
            } 
            this.annualMustWin = this.lookupdata.filter(x => x.lookUpParentId == '265400f0-6202-469b-bb3d-38727928d1b2');
            this.annualMustWin.sort((a, b) => {
              return a.lookUpOrder - b.lookUpOrder;
            })
            if (history.state.data.annualMustWinId != null) {
              history.state.data.annualMustWinId = this.annualMustWin.filter(function (entry) {
                return entry.lookUpId == history.state.data.annualMustWinId
              })
            }
            this.site = this.lookupdata.filter(x => x.lookUpParentId == '1DB73E6F-DD4B-44FF-8234-CE5FB3EC68BC');
            this.site.sort((a, b) => {
              return a.lookUpOrder - b.lookUpOrder;
            })
            if (history.state.data.siteAssessmentCategory != null && history.state.data.siteAssessmentCategory != "") {
              const data = history.state.data.siteAssessmentCategory.split(',');
              var SiteAssessmentCategory = {};
              var finaldataSite = [];
              for (var i = 0; i < data.length; i++) {
                SiteAssessmentCategory = this.site.filter(function (entry) {
                  return entry.lookUpId == data[i]
                })
                finaldataSite.push(SiteAssessmentCategory[0]);
              }
            }
            var isAgile = false
            if ((history.state.data.agilePrimaryWorkstream != null && history.state.data.agilePrimaryWorkstream.length != 0) || (history.state.data.agileSecondaryWorkstream != null && history.state.data.agileSecondaryWorkstream != "") || (history.state.data.agileWave != null && history.state.data.agileWave.length != 0)){
              isAgile = true
            }
            this.strategicDriversForm.patchValue({
              primaryKPI: history.state.data.primaryKpi == null ? '' : history.state.data.primaryKpi[0],
              isAgile: isAgile,
              agilePrimaryWorkstream: history.state.data.agilePrimaryWorkstream == null || history.state.data.agilePrimaryWorkstream == "" || history.state.data.agilePrimaryWorkstream == undefined ? '' : history.state.data.agilePrimaryWorkstream[0],
              agileSecondaryWorkstream: history.state.data.agileSecondaryWorkstream == null || history.state.data.agileSecondaryWorkstream == "" || history.state.data.agileSecondaryWorkstream == undefined ? [] : finaldatasecagile,
              agileWave: history.state.data.agileWave == null || history.state.data.agileWave == "" || history.state.data.agileWave == undefined ? '' : history.state.data.agileWave[0],
              isPobos: history.state.data.isPobos,
              pobosCategory: history.state.data.poboscategory == null || history.state.data.poboscategory == "" || history.state.data.poboscategory == undefined ? [] : finaldataPobos,
              isGmsgqltannualMustWin: history.state.data.isGmsgqltannualMustWin,
              strategicYear: history.state.data.strategicYearId == null || history.state.data.strategicYearId == "" || history.state.data.strategicYearId == undefined ? '' : history.state.data.strategicYearId[0],
              annualMustWinID: history.state.data.annualMustWinId == null || history.state.data.annualMustWinId == "" || history.state.data.annualMustWinId == undefined ? '' : history.state.data.annualMustWinId[0],
              isSiteAssessment: history.state.data.isSiteAssessment,
              siteAssessmentCategory: history.state.data.siteAssessmentCategory == null || history.state.data.siteAssessmentCategory == "" || history.state.data.siteAssessmentCategory == undefined ? [] : finaldataSite,
              isGoodPractise: false,
              isSprproject: false,
              sprprojectCategory: {},
              sprprojectGrouping: {},
              oeprojectType: history.state.data.oeprojectType == null || history.state.data.oeprojectType == "" || history.state.data.oeprojectType == undefined ? [] : finaldataoe,
            })
            this.formValueStrategic.emit(this.strategicDriversForm.getRawValue())
            this.viewContent = true
          }
          else {
          this.formValueStrategic.emit(this.strategicDriversForm.getRawValue())
          this.viewContent = true
          }
        })
      })
    }
  }
  viewElementChecker(element: string): boolean {
    return this.viewElements.some(x => x == element)
  }
  getoeprojectType(): any {
    if(this.callLocation == 'CreateNew'){
      this.oeProjectType = this.lookupdata.filter(x => x.lookUpParentId == '04D143E7-CAA7-4D8D-88C3-A6CB575890A3');
      this.oeProjectType.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.oeProjectType;
    }
    else {
      return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == "04D143E7-CAA7-4D8D-88C3-A6CB575890A3")
    }
  }
  getAgileWorkstream(): any {
    if (this.callLocation == 'CreateNew' || this.callLocation == 'CreateNewSIP') {
      this.agileWorkStream = this.lookupdata.filter(x => x.lookUpParentId == 'f4486388-4c52-48fc-8c05-836878da2247');
      this.agileWorkStream.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.agileWorkStream;
    }
    else {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "f4486388-4c52-48fc-8c05-836878da2247")
    }
  }
  getAgileWave(): any {
    if (this.callLocation == 'CreateNew' || this.callLocation == 'CreateNewSIP') {
      this.agileWave = this.lookupdata.filter(x => x.lookUpParentId == '4bdbcbca-90f2-4c7b-b2a5-c337446d60b1');
      this.agileWave.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.agileWave;
    }
    else {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "4bdbcbca-90f2-4c7b-b2a5-c337446d60b1")
    }
  }
  getPOBOSCategory(): any {
    if (this.callLocation == 'CreateNew') {
      this.Pobos = this.lookupdata.filter(x => x.lookUpParentId == 'A9AB0ADC-AA10-44C1-A99B-3BEB637D0A4E');
      this.Pobos.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.Pobos;
    }
    else {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "A9AB0ADC-AA10-44C1-A99B-3BEB637D0A4E")
    }
  }
  getSiteCategory(): any {
    if (this.callLocation == 'CreateNew') {
      this.site = this.lookupdata.filter(x => x.lookUpParentId == '1DB73E6F-DD4B-44FF-8234-CE5FB3EC68BC');
      this.site.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.site;
    }
    else {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "1DB73E6F-DD4B-44FF-8234-CE5FB3EC68BC")
    }
  }
  getStrategicYear(): any {
    if (this.callLocation == 'CreateNew') {
      this.strategicYear = this.lookupdata.filter(x => x.lookUpParentId == '459db0af-bad2-4036-8c9c-928b3c6f8bac');
      this.strategicYear.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.strategicYear;
    }
    else {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "459db0af-bad2-4036-8c9c-928b3c6f8bac")
    }
  }
  getActualMustWin(): any {
    if (this.callLocation == 'CreateNew') {
      this.annualMustWin = this.lookupdata.filter(x => x.lookUpParentId == '265400f0-6202-469b-bb3d-38727928d1b2');
      this.annualMustWin.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.annualMustWin;
    }
    else {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "265400f0-6202-469b-bb3d-38727928d1b2")
    }
  }
  getSPRProjectCategory(): any {
    if (this.callLocation == 'CreateNew') {
      this.annualMustWin = this.lookupdata.filter(x => x.lookUpParentId == '218576ed-07ee-4d7f-8572-89c8e5b9a7e9');
      this.annualMustWin.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.annualMustWin;
    }
    else {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "218576ed-07ee-4d7f-8572-89c8e5b9a7e9")
    }
  }
  getSPRProjectGrouping(): any {
    if (this.callLocation == 'CreateNew') {
      this.annualMustWin = this.lookupdata.filter(x => x.lookUpParentId == 'bebda2cb-c33a-4ad1-b133-8257e9d10526');
      this.annualMustWin.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      return this.annualMustWin;
    }
    else {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "bebda2cb-c33a-4ad1-b133-8257e9d10526")
    }
  }

  submitSD() {
    this.projectHubService.isFormChanged = false
    var formValue = this.strategicDriversForm.getRawValue()
    console.log(formValue)
    var mainObj = this.generalInfo.projectData
    mainObj.primaryKpi = Object.keys(formValue.primaryKPI).length > 0 ? formValue.primaryKPI.lookUpId : null
    mainObj.agilePrimaryWorkstream = Object.keys(formValue.agilePrimaryWorkstream).length > 0 ? formValue.agilePrimaryWorkstream.lookUpId : null
    mainObj.agileSecondaryWorkstream = formValue.agileSecondaryWorkstream.length > 0 ? formValue.agileSecondaryWorkstream.map(x => x.lookUpId).join() : null
    mainObj.agileWave = Object.keys(formValue.agileWave).length > 0 ? formValue.agileWave.lookUpId : null
    mainObj.isPobos = formValue.isPobos
    mainObj.poboscategory = formValue.pobosCategory.length > 0 ? formValue.pobosCategory.map(x => x.lookUpId).join() : null
    mainObj.isGmsgqltannualMustWin = formValue.isGmsgqltannualMustWin
    mainObj.strategicYearId = Object.keys(formValue.strategicYear).length > 0 ? formValue.strategicYear.lookUpId : null
    mainObj.annualMustWinId = Object.keys(formValue.annualMustWinID).length > 0 ? formValue.annualMustWinID.lookUpId : null
    mainObj.isSiteAssessment = formValue.isSiteAssessment
    mainObj.siteAssessmentCategory = formValue.siteAssessmentCategory.length > 0 ? formValue.siteAssessmentCategory.map(x => x.lookUpId).join() : null
    mainObj.isGoodPractise = formValue.isGoodPractise
    mainObj.isSprproject = formValue.isSprproject
    mainObj.sprprojectCategory = Object.keys(formValue.sprprojectCategory).length > 0? formValue.sprprojectCategory.lookUpId : null
    mainObj.sprprojectGrouping = Object.keys(formValue.sprprojectGrouping).length > 0? formValue.sprprojectGrouping.lookUpId : null,
    mainObj.oeprojectType = formValue.oeprojectType.length > 0 ? formValue.oeprojectType.map(x => x.lookUpId).join() : ''

    this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
      if (this.subCallLocation == 'ProjectProposal') {
        this.apiService.updateReportDates(this.projectHubService.projectid, "ProjectProposalModifiedDate").then(secondRes => {
          this.projectHubService.isNavChanged.next(true)
          this.projectHubService.submitbutton.next(true)
          this.projectHubService.successSave.next(true)
          this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
      }
      else if (this.subCallLocation == 'CloseOut') {
        this.apiService.updateReportDates(this.projectHubService.projectid, "CloseoutModifiedDate").then(secondRes => {
          this.projectHubService.isNavChanged.next(true)
          this.projectHubService.submitbutton.next(true)
          this.projectHubService.successSave.next(true)
          this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
      }
      else if (this.subCallLocation == 'ProjectCharter') {
        this.apiService.updateReportDates(this.projectHubService.projectid, "ModifiedDate").then(secondRes => {
          this.projectHubService.isNavChanged.next(true)
          this.projectHubService.submitbutton.next(true)
          this.projectHubService.successSave.next(true)
          this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
      }
      else {
        this.projectHubService.isNavChanged.next(true)
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
        this.projectHubService.toggleDrawerOpen('', '', [], '')
      }
    })
  }
}
