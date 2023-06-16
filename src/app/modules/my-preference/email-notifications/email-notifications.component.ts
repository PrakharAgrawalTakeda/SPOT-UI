import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { MsalService } from '@azure/msal-angular';
import { MyPreferenceApiService } from '../my-preference-api.service';

@Component({
  selector: 'app-email-notifications',
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.scss']
})
export class EmailNotificationsComponent {
  emailNotiEditType: string = 'EmailNotiEdit';
  id: string = ""
  emailNotiForm = new FormGroup({
    recieveEmailNotification: new FormControl(false),
    onoff: new FormControl(false),
    description: new FormControl(''),
    event: new FormControl(''),
    priority: new FormControl(''),
    reportFrequencyId: new FormControl(''),
    emailNotifcationNotifcationReportScopeIds: new FormControl('')
  })
  emailNoti: any;
  eventsData: any;
  lookUpData: any;
  reportFrequency: any;
  lookUpMaster: any;
  lookUpData2: any;
  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private msalService: MsalService, private apiService: MyPreferenceApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService,private authService: AuthService,) {
  }
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getemailNoti(this.msalService.instance.getActiveAccount().localAccountId).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
          console.log('LookUp Data', lookup)
          this.lookUpData = lookup.filter(x => x.lookUpParentId == '3df298d8-fcac-4b2c-b571-c7ddfdeafbdc')
          this.lookUpData.sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })

          this.lookUpData2 = lookup.filter(x => x.lookUpParentId == '995740b8-8a4a-44b8-afb0-813a23c61160')
          this.lookUpData2.sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })
      this.emailNoti = res
      this.eventsData = res.eventsMasterData
      res.eventsMasterData.sort((a, b) => a.priority - b.priority)
      console.log(res)
      if (this.emailNoti != null) {
        this.emailNotiForm.patchValue({
          recieveEmailNotification: res.reportOptions.recieveEmailNotification ? res.reportOptions.recieveEmailNotification : false,
          priority: res.eventsMasterData.priority,
          event: res.eventsMasterData.event,
          description: res.eventsMasterData.description,
          onoff: res.eventsUserData.find(eventUserData => eventUserData.frequencyId === res.eventsMasterData.frequencyId)?.onoff,
          reportFrequencyId: res.reportOptions.reportFrequencyId ? this.lookUpData.find(x => x.lookUpId == res.reportOptions.reportFrequencyId) : {},
          emailNotifcationNotifcationReportScopeIds: res.reportOptions.emailNotifcationNotifcationReportScopeIds ? this.lookUpData2.find(x => x.lookUpId == res.reportOptions.emailNotifcationNotifcationReportScopeIds) : {}
        })

      }
    })
  })
  }


  submitnotifications() {

  }
}
