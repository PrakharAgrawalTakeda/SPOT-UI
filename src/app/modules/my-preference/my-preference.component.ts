import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';
import { RoleService } from 'app/core/auth/role.service';
import { ProjectApiService } from '../project-hub/common/project-api.service';
import { ProjectHubService } from '../project-hub/project-hub.service';
import { MyPreferenceApiService } from './my-preference-api.service';

@Component({
  selector: 'app-my-preference',
  templateUrl: './my-preference.component.html',
  styleUrls: ['./my-preference.component.scss']
})
export class MyPreferenceComponent implements OnInit {

  constructor(private _Activatedroute: ActivatedRoute, private router: Router) {
    console.log("My preference top bar")

    this.router.events.subscribe(res => {
      
      if (this.viewContent) {
        this.navItem = null
        this.reloadName()
      }
    })
  }
  id: string = ''
  viewContent: boolean = false
  navItem: any
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.viewContent = true
      this.reloadName()
      

  }
  isNavActive(link: string): boolean {
    return this.router.url.includes(link)
  }
  reloadName() {

    if (this.router.url.includes('project-settings')) {
      this.navItem = {
        title: 'My Preferences',
        children: [
          {
            title:'Project Settings',
            link:'my-preference/project-settings'
          },
          {
            title:'Email Notifications',
            link:'my-preference/email-notifications'
          },
          {
            title:'Milestone Sets',
            link:'my-preference/milestone-sets'
          }
        ]
      }
      console.log(this.navItem)
    }
  }
}
