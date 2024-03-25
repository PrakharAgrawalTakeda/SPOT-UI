import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MyPreferenceService } from 'app/modules/my-preference/my-preference.service';
import { PortfolioCenterService } from 'app/modules/portfolio-center/portfolio-center.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-global-messages-panel',
  templateUrl: './global-messages-panel.component.html',
  styleUrls: ['./global-messages-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalMessagesPanelComponent implements OnInit, OnDestroy {
  messages: any = [];
  location: 'project-hub' | 'my-preference' | 'portfolio-center';
  constructor(private projectHubService: ProjectHubService, private portfolioCenterService: PortfolioCenterService, private myPreferenceService: MyPreferenceService, private router: Router, private msalService: MsalService, private messageService: MessagesService) {

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

  readLater(){
    var submitObject = []
    for(let message of this.messages){
      submitObject.push({
        userAdid: this.msalService.instance.getActiveAccount()?.localAccountId,
        messageId: message.messageId,
        messageRead: 0
      })
    }
    this.messageService.bulkEditGlobalMessageUserLog(this.msalService.instance.getActiveAccount()?.localAccountId, submitObject).then((response) => {
    })
  }

  readLaterAndClose(){
    this.readLater()
    this.closePanel()
  }
  readAndUnderstood(){
    var submitObject = []
    for(let message of this.messages){
      submitObject.push({
        userAdid: this.msalService.instance.getActiveAccount()?.localAccountId,
        messageId: message.messageId,
        messageRead: 1
      })
    }
    this.messageService.bulkEditGlobalMessageUserLog(this.msalService.instance.getActiveAccount()?.localAccountId, submitObject).then((response) => {
    this.closePanel()
    })
  }

  ngOnDestroy(): void {
    this.readLater()
  }

}
