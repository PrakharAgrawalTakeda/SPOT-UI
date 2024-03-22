import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MyPreferenceService } from 'app/modules/my-preference/my-preference.service';
import { PortfolioCenterService } from 'app/modules/portfolio-center/portfolio-center.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';

@Component({
  selector: 'app-global-messages-panel',
  templateUrl: './global-messages-panel.component.html',
  styleUrls: ['./global-messages-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalMessagesPanelComponent implements OnInit {
  messages: any = [];
  location: 'project-hub' | 'my-preference' | 'portfolio-center';
  constructor(private projectHubService: ProjectHubService, private portfolioCenterService: PortfolioCenterService, private myPreferenceService: MyPreferenceService, private router: Router) {

  }
  ngOnInit(): void {
    if (this.router.url.includes('project-hub')) {
     this.messages = this.projectHubService.all
     this.location = 'project-hub'
    }
    else if (this.router.url.includes('my-preference')) {
      this.messages = this.myPreferenceService.all
      this.location = 'my-preference'
    }
    else if (this.router.url.includes('portfolio-center')) {
    this.messages = this.portfolioCenterService.all
    this.location = 'portfolio-center'  
    }
  }

  closePanel(){
    if(this.location == 'project-hub'){
      this.projectHubService.toggleDrawerOpen("","",[],this.projectHubService.projectid, false, false)
    }
    else if( this.location == 'my-preference'){
      this.myPreferenceService.toggleDrawerOpen("","",[],'', false)
    }
    else if( this.location == 'portfolio-center'){
      this.portfolioCenterService.toggleDrawerOpen("","",[],'',false)
    }
  }

}
