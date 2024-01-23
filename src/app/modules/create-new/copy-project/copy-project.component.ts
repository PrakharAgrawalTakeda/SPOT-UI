import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { PortfolioApiService } from './../../portfolio-center/portfolio-api.service';
import { } from '@angular/compiler'
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Title } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';
import { CreateNewApiService } from '../create-new-api.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import moment from 'moment';
import { RoleService } from 'app/core/auth/role.service';

@Component({
  selector: 'app-copy-project',
  templateUrl: './copy-project.component.html',
  styleUrls: ['./copy-project.component.scss']
})
export class CopyProjectComponent implements OnInit {
  lookupdata: any = [];
  lookupTemplate: any = [];
  activeaccount: any;
  disableToggle: boolean = true;
  finalData: any = [];
  finalIndex: any = [];
  projectList: any = {};
  userid: string = "";
  projectid: string = "";
  projectname: string = "";
  viewContent: boolean = false
  CopyProjectForm = new FormGroup({
    projectTitle: new FormControl({ value: true, disabled: true }),
    // projectType: new FormControl({ value: false, disabled: true }),
    problemDescription: new FormControl(true),
    proposedStatement: new FormControl(true),
    keySuccess: new FormControl(true),
    scope: new FormControl(true),
    milestone: new FormControl(true),
    projectTeam: new FormControl(true),
    categoricalDriver: new FormControl(true),
    StrategicalDriver: new FormControl(true)
  })
  newmainnav: any = []

  constructor(public auth: AuthService, private router: Router, private apiService: PortfolioApiService,
    private _fuseNavigationService: FuseNavigationService, private titleService: Title, private authService: MsalService, public createApiservice: CreateNewApiService, public fuseAlert: FuseConfirmationService, public role: RoleService) { }

  ngOnInit(): void {
    const mainNavComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
    this.activeaccount = this.authService.instance.getActiveAccount();
    this.newmainnav = [
      {
        id: 'portfolio-center',
        title: 'Portfolio Center',
        type: 'basic',
        link: '/portfolio-center'
      },
      {
        // id: 'create-project',
        title: 'Create Project',
        type: 'collapsable',
        link: '/create-project',
        children: [
          {
            title: 'Create a Standard/Simple Project/Program',
            type: 'basic',
            link: '/create-project/create-new-project'
          },
          {
            title: 'Create a Strategic Initiative/Program',
            type: 'basic',
            link: '/create-project/create-strategic-initiative-project'
          },
          {
            title: 'Copy an existing Project',
            type: 'basic',
            link: '/create-project/copy-project'
          }
        ],
      },
      {
        id: 'spot-documents',
        title: 'SPOT Supporting Documents',
        type: 'basic',
        externalLink: true,
        link: 'https://mytakeda.sharepoint.com/sites/PMT-SPOT/SitePages/home.aspx',
        target: '_blank'
      },
      {
        id: 'report-navigator',
        title: 'Report Navigator',
        type: 'basic',
        link: 'https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/e6c7feb2-8dca-49ea-9eff-9596f519c64e/ReportSectiona2d604c32b4ad7a54177?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae',
        externalLink: true,
        target: "_blank"

      },
      {
        id: 'spot-support',
        title: 'Need Help or Propose a Change',
        type: 'basic',
        link: 'mailto:DL.SPOTSupport@takeda.com?Subject=SPOT Support Request ' + this.activeaccount.name + ' (Logged on ' + moment().format('llll') + ')',
        externalLink: true,
        target: "_blank"

      }
    ]
    mainNavComponent.navigation = this.newmainnav
    mainNavComponent.refresh()

    this.titleService.setTitle("Copy an existing Project")
    this.auth.lookupMaster().then(res => {
      this.lookupdata = res;
      this.lookupTemplate = this.lookupdata.filter(x => x.lookUpParentId == 'a378aa1b-dadf-4592-8dc6-fee59b75f51d');
      this.lookupTemplate.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      this.viewContent = true
      console.log(this.lookupTemplate);
    })
  }

  toggleSection(item: number) {
    console.log(item)
    console.log(this.lookupTemplate[item])
    // this.gDatas[item].toggle = !this.gDatas[item].toggle;
  }

  addItem(newItem: any) {
    this.projectid = newItem.problemUniqueId;
    this.projectname = newItem.problemTitle
  }

  SubmitCopyProject(data: any) {
    if (this.projectid == "") {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "You must select a project to copy.",
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
      console.log(this.CopyProjectForm)
      for (var i = 0; i < data.currentTarget.length; i++) {
        if (data.currentTarget[i].checked == true) {
          this.finalIndex.push(i);
        }
      }
      var copyProjectParameter = {
        projectTitle: true,
        // projectType: true,
        problemDescription: true,
        proposedStatement: true,
        keySuccessCriteria: true,
        inOutOfScope: true,
        milestones: true,
        projectTeam: true,
        categoricalData: true,
        strategicDriverDetails: true
      }
      if (!this.CopyProjectForm.value.problemDescription) {
        copyProjectParameter.problemDescription = false
      }
      if (!this.CopyProjectForm.value.proposedStatement) {
        copyProjectParameter.proposedStatement = false
      }
      if (!this.CopyProjectForm.value.keySuccess) {
        copyProjectParameter.keySuccessCriteria = false
      }
      if (!this.CopyProjectForm.value.scope) {
        copyProjectParameter.inOutOfScope = false
      }
      if (!this.CopyProjectForm.value.milestone) {
        copyProjectParameter.milestones = false
      }
      if (!this.CopyProjectForm.value.projectTeam) {
        copyProjectParameter.projectTeam = false
      }
      if (!this.CopyProjectForm.value.categoricalDriver) {
        copyProjectParameter.categoricalData = false
      }
      if (!this.CopyProjectForm.value.StrategicalDriver) {
        copyProjectParameter.strategicDriverDetails = false
      }
      for (var i = 0; i < this.finalIndex.length; i++) {
        this.finalData.push(this.lookupTemplate[i].lookUpId);
        console.log(this.finalData);
      }
      var dataToSend = {
        ProjectIDTemplate: this.projectid,
        CopyUserID: this.activeaccount.localAccountId,
        CopyProjectParameter: copyProjectParameter
      }
      this.createApiservice.getTemplateInfo(dataToSend).then((res : any) => {
        this.createApiservice.getQuality(this.projectid).then(quality => {
          console.log(quality);
          console.log(res);
          if (res != "") {
            if(res.problemType == 'Strategic Initiative / Program'){
              this.router.navigateByUrl('/create-project/create-strategic-initiative-project', { state: { data: res, quality: quality, callLocation: 'CopyProject', copytemplateId: this.projectid, lookupString: this.finalData.toString(), copyParameterObject: copyProjectParameter } });
            }
            else{
              res.problemType = res.problemType == '' || res.problemType == null ? 'Standard Project / Program' : res.problemType
              this.router.navigateByUrl('/create-project/create-new-project', { state: { data: res, quality: quality, callLocation: 'CopyProject', copytemplateId: this.projectid, lookupString: this.finalData.toString(), copyParameterObject: copyProjectParameter } });
            }
            
          }
        })
      })
    }
  }

  callCreateProject() {
    this.router.navigate([`./portfolio-center`]);
  }

}
