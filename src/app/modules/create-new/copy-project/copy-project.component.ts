import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { PortfolioApiService } from './../../portfolio-center/portfolio-api.service';
import { CreateNewService } from '../create-new.service';
import { } from '@angular/compiler'
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Title } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';


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
  CopyProjectForm = new FormGroup({
    addTemplate: new FormControl('')
  })

  constructor(public auth: AuthService, private router: Router, private apiService: PortfolioApiService,
    private _fuseNavigationService: FuseNavigationService, private titleService: Title, private authService: MsalService) { }

  ngOnInit(): void {
    this.activeaccount = this.authService.instance.getActiveAccount();
    this.titleService.setTitle("Copy Project")
    this.CopyProjectForm.patchValue({
      addTemplate: true
    })
    this.auth.lookupMaster().then(res => {
      this.lookupdata = res;
      this.lookupTemplate = this.lookupdata.filter(x => x.lookUpParentId == 'a378aa1b-dadf-4592-8dc6-fee59b75f51d');
      this.lookupTemplate.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      console.log(this.lookupTemplate);
    })
  }

  addItem(newItem: string) {
    this.projectid = newItem;
  }

  SubmitCopyProject(data: any) {
    for (var i = 0; i < data.currentTarget.length; i++) {
      if (data.currentTarget[i].checked == true) {
        this.finalIndex.push(i);
      }
    }
    for (var i = 0; i < this.finalIndex.length; i++) {
      this.finalData.push(this.lookupTemplate[i].lookUpId);
      console.log(this.finalData);
    }
    this.userid = "";
    var dataToSend = {
      ProjectIDTemplate: this.projectid,
      CopyUserID: this.activeaccount.localAccountId,
      CopyProjectParameter: this.finalData.toString()
    }
    this.apiService.getTemplateInfo(dataToSend).then(res => {
      this.apiService.getQuality(this.projectid).then(quality => {
        console.log(quality);
        console.log(res);
        if (res != "") {
          this.router.navigateByUrl('/create-project/create-new-project', { state: { data: res, quality: quality, callLocation: 'CopyProject', copytemplateId: this.projectid, lookupString: this.finalData.toString() } });
        }
      })
    })
  }

  callCreateProject() {
    this.router.navigate([`./portfolio-center`]);
  }

}
