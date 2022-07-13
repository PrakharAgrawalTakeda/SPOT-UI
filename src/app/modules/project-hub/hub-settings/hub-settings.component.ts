import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';

@Component({
  selector: 'app-hub-settings',
  templateUrl: './hub-settings.component.html',
  styleUrls: ['./hub-settings.component.scss']
})
export class HubSettingsComponent implements OnInit {
  projectid: string = ""
  hubsettings: any = []
  hubsettingsform = new FormGroup({
    overallStatus: new FormControl(true),
    milestones: new FormControl(true),
    risks: new FormControl(true),
    asks: new FormControl(true),
    budgetTracking: new FormControl(true),
    projectDocuments: new FormControl(true),
    projectTeams: new FormControl(true),
  })
  lookup = ["b4db29e9-d47a-4f4d-abbc-a5ed6cf0705d",
    "9500d3fa-3eff-4179-a5d3-94100e92b644",
    "2bd2e8a6-a605-4c38-817a-b266f2442ed1",
    "f84a8e82-de59-46d5-8b84-f4c32a1018e1",
    "5259bc84-1485-4861-b73b-b83603b825b1",
    "24f44e4b-60cc-4af8-9c42-21c83ca8a1e3",
    "6937fd4c-db74-4412-8749-108b0d356ed1"]
  initialized: boolean = false;

  constructor(private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService, public projecthubservice: ProjectHubService) { }

  ngOnInit(): void {
    this.projectid = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.initialize()

    //Capture Value Changes

    //Overall Status
    this.hubsettingsform.controls['overallStatus'].valueChanges.subscribe(res => {
      if (this.initialized == true) {
        let newobj = {
          hubSettingId: this.hubsettings.find(x => x.lookUpId == "2bd2e8a6-a605-4c38-817a-b266f2442ed1").hubSettingId,
          hubValue: res,
          lookUpId: "2bd2e8a6-a605-4c38-817a-b266f2442ed1",
          projectId: this.projectid
        }
        this.apiService.editHubSetting(newobj)
      }
    })

    //Milestones
    this.hubsettingsform.controls['milestones'].valueChanges.subscribe(res => {
      if (this.initialized == true) {
        let newobj = {
          hubSettingId: this.hubsettings.find(x => x.lookUpId == "5259bc84-1485-4861-b73b-b83603b825b1").hubSettingId,
          hubValue: res,
          lookUpId: "5259bc84-1485-4861-b73b-b83603b825b1",
          projectId: this.projectid
        }
        this.apiService.editHubSetting(newobj)
      }
    })

    //Risks
    this.hubsettingsform.controls['risks'].valueChanges.subscribe(res => {
      if (this.initialized == true) {
        let newobj = {
          hubSettingId: this.hubsettings.find(x => x.lookUpId == "f84a8e82-de59-46d5-8b84-f4c32a1018e1").hubSettingId,
          hubValue: res,
          lookUpId: "f84a8e82-de59-46d5-8b84-f4c32a1018e1",
          projectId: this.projectid
        }
        this.apiService.editHubSetting(newobj)
      }
    })

    //Asks
    this.hubsettingsform.controls['asks'].valueChanges.subscribe(res => {
      if (this.initialized == true) {
        let newobj = {
          hubSettingId: this.hubsettings.find(x => x.lookUpId == "b4db29e9-d47a-4f4d-abbc-a5ed6cf0705d").hubSettingId,
          hubValue: res,
          lookUpId: "b4db29e9-d47a-4f4d-abbc-a5ed6cf0705d",
          projectId: this.projectid
        }
        this.apiService.editHubSetting(newobj)
      }
    })

    //BudgetTracking
    this.hubsettingsform.controls['budgetTracking'].valueChanges.subscribe(res => {
      if (this.initialized == true) {
        let newobj = {
          hubSettingId: this.hubsettings.find(x => x.lookUpId == "24f44e4b-60cc-4af8-9c42-21c83ca8a1e3").hubSettingId,
          hubValue: res,
          lookUpId: "24f44e4b-60cc-4af8-9c42-21c83ca8a1e3",
          projectId: this.projectid
        }
        this.apiService.editHubSetting(newobj).then(()=>{
          this.projecthubservice.isNavChanged.next(true)
        })
      }
    })

    //Project Documents
    this.hubsettingsform.controls['projectDocuments'].valueChanges.subscribe(res => {
      if (this.initialized == true) {
        let newobj = {
          hubSettingId: this.hubsettings.find(x => x.lookUpId == "9500d3fa-3eff-4179-a5d3-94100e92b644").hubSettingId,
          hubValue: res,
          lookUpId: "9500d3fa-3eff-4179-a5d3-94100e92b644",
          projectId: this.projectid
        }
        this.apiService.editHubSetting(newobj).then(()=>{
          this.projecthubservice.isNavChanged.next(true)
        })
      }
    })

    //Project Teams
    this.hubsettingsform.controls['projectTeams'].valueChanges.subscribe(res => {
      if (this.initialized == true) {
        let newobj = {
          hubSettingId: this.hubsettings.find(x => x.lookUpId == "6937fd4c-db74-4412-8749-108b0d356ed1").hubSettingId,
          hubValue: res,
          lookUpId: "6937fd4c-db74-4412-8749-108b0d356ed1",
          projectId: this.projectid
        }
        this.apiService.editHubSetting(newobj).then(()=>{
          this.projecthubservice.isNavChanged.next(true)
        })
      }
    })
  }

  initialize(): void {
    this.apiService.getHubSettings(this.projectid).then((res: any) => {

      //inititializing
      console.log("hello")
      console.log(res)
      this.hubsettings = res
      //Overall Status
      let overall = res.find(x => x.lookUpId == '2bd2e8a6-a605-4c38-817a-b266f2442ed1')
      if (overall == null) {
        let newoverall = {
          hubSettingId: "",
          hubValue: true,
          lookUpId: "2bd2e8a6-a605-4c38-817a-b266f2442ed1",
          projectId: this.projectid
        }
        this.apiService.addHubSetting(newoverall).then((res) => {
          this.hubsettings.push(res)
        })

      }
      else {
        this.hubsettingsform.patchValue({
          overallStatus: overall.hubValue
        })
      }


      //Milestones
      let milestone = res.find(x => x.lookUpId == '5259bc84-1485-4861-b73b-b83603b825b1')
      if (milestone == null) {
        let newmilestone = {
          hubSettingId: "",
          hubValue: true,
          lookUpId: "5259bc84-1485-4861-b73b-b83603b825b1",
          projectId: this.projectid
        }
        this.apiService.addHubSetting(newmilestone).then((res) => {
          this.hubsettings.push(res)
        })

      }
      else {
        this.hubsettingsform.patchValue({
          milestones: milestone.hubValue
        })
      }

      //Risk Issues
      let risk = res.find(x => x.lookUpId == 'f84a8e82-de59-46d5-8b84-f4c32a1018e1')
      if (risk == null) {
        let newrisk = {
          hubSettingId: "",
          hubValue: true,
          lookUpId: "f84a8e82-de59-46d5-8b84-f4c32a1018e1",
          projectId: this.projectid
        }
        this.apiService.addHubSetting(newrisk).then((res) => {
          this.hubsettings.push(res)
        })

      }
      else {
        this.hubsettingsform.patchValue({
          risks: risk.hubValue
        })
      }


      //Ask Needs
      let ask = res.find(x => x.lookUpId == 'b4db29e9-d47a-4f4d-abbc-a5ed6cf0705d')
      if (ask == null) {
        let newask = {
          hubSettingId: "",
          hubValue: true,
          lookUpId: "b4db29e9-d47a-4f4d-abbc-a5ed6cf0705d",
          projectId: this.projectid
        }
        this.apiService.addHubSetting(newask).then((res) => {
          this.hubsettings.push(res)
        })
      }
      else {
        this.hubsettingsform.patchValue({
          asks: ask.hubValue
        })
      }


      //Budget Tracking
      let bud = res.find(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3')
      if (bud == null) {
        let newbud = {
          hubSettingId: "",
          hubValue: true,
          lookUpId: "24f44e4b-60cc-4af8-9c42-21c83ca8a1e3",
          projectId: this.projectid
        }
        this.apiService.addHubSetting(newbud).then((res) => {
          this.hubsettings.push(res)
        })
       }
      else {
        this.hubsettingsform.patchValue({
          budgetTracking: bud.hubValue
        })
      }

      //Project Documents
      let docs = res.find(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644')
      if (docs == null) {
        let newdocs = {
          hubSettingId: "",
          hubValue: true,
          lookUpId: "9500d3fa-3eff-4179-a5d3-94100e92b644",
          projectId: this.projectid
        }
        this.apiService.addHubSetting(newdocs).then((res) => {
          this.hubsettings.push(res)
        })
        }
      else {
        this.hubsettingsform.patchValue({
          projectDocuments: docs.hubValue
        })
      }

      //Project  Teams
      let teams = res.find(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1')
      if (teams == null) {
        let newteams = {
          hubSettingId: "",
          hubValue: true,
          lookUpId: "6937fd4c-db74-4412-8749-108b0d356ed1",
          projectId: this.projectid
        }
        this.apiService.addHubSetting(newteams).then((res) => {
          this.hubsettings.push(res)
        })
       }
      else {
        this.hubsettingsform.patchValue({
          projectTeams: teams.hubValue
        })
      }
      this.initialized = true
    })
  }

}
