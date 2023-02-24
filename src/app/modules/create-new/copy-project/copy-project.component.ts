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
  viewContent:boolean = false
  CopyProjectForm = new FormGroup({
    projectTitle: new FormControl({value: true, disabled: true}),
    projectType: new FormControl({ value: true, disabled: true }),
    problemDescription: new FormControl(true),
    proposedStatement: new FormControl(true),
    keySuccess: new FormControl(true),
    scope: new FormControl(true),
    milestone: new FormControl(true),
    projectTeam: new FormControl(true),
    categoricalDriver: new FormControl(true)
  })

  constructor(public auth: AuthService, private router: Router, private apiService: PortfolioApiService,
    private _fuseNavigationService: FuseNavigationService, private titleService: Title, private authService: MsalService, public createApiservice: CreateNewApiService) { }

  ngOnInit(): void {
    this.activeaccount = this.authService.instance.getActiveAccount();
    this.titleService.setTitle("Copy Project")
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
    console.log(this.CopyProjectForm)
    for (var i = 0; i < data.currentTarget.length; i++) {
      if (data.currentTarget[i].checked == true) {
        this.finalIndex.push(i);
      }
    }
    var copyProjectParameter= {
      projectTitle: true,
      projectType: true,
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
    for (var i = 0; i < this.finalIndex.length; i++) {
      this.finalData.push(this.lookupTemplate[i].lookUpId);
      console.log(this.finalData);
    }
    var dataToSend = {
      ProjectIDTemplate: this.projectid,
      CopyUserID: this.activeaccount.localAccountId,
      CopyProjectParameter: copyProjectParameter
    }
    this.createApiservice.getTemplateInfo(dataToSend).then(res => {
      this.createApiservice.getQuality(this.projectid).then(quality => {
        console.log(quality);
        console.log(res);
        if (res != "") {
          this.router.navigateByUrl('/create-project/create-new-project', { state: { data: res, quality: quality, callLocation: 'CopyProject', copytemplateId: this.projectid, lookupString: this.finalData.toString(), copyParameterObject: copyProjectParameter } });
        }
      })
    })
  }

  callCreateProject() {
    this.router.navigate([`./portfolio-center`]);
  }

}
