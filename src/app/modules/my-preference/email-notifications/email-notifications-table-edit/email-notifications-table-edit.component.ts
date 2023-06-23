import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { MsalService } from '@azure/msal-angular';

import { debounceTime, filter, map, Observable, startWith, Subject, Subscription, takeUntil } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalVariables } from 'app/shared/global-variables';
import { MyPreferenceApiService } from '../../my-preference-api.service';
import { MyPreferenceService } from '../../my-preference.service';

@Component({
  selector: 'app-email-notifications-table-edit',
  templateUrl: './email-notifications-table-edit.component.html',
  styleUrls: ['./email-notifications-table-edit.component.scss']
})
export class EmailNotificationsTableEditComponent {
  // emailTableForm = new FormGroup({
  //   onoff: new FormControl(false),
  //   description: new FormControl(''),
  //   event: new FormControl(''),
  //   priority: new FormControl('')
  // })
  emailTableForm = new FormArray([])
  id: string = ""
  emailTable: any;
  MasterData: any;
  userData: any;
  emailTableEditStack: any = []
  emailTableDb = []
  submitObj = {}
  viewContent: boolean = false


  constructor(public projecthubservice: ProjectHubService,
    private _httpClient: HttpClient,
    private _Activatedroute: ActivatedRoute, private msalService: MsalService, private apiService: MyPreferenceApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService, private authService: AuthService, private apiservice: ProjectApiService,
    public preferenceservice: MyPreferenceService) {
      this.emailTableForm.valueChanges.subscribe(res => {
        //this.projecthubservice.isFormChanged = true
        this.preferenceservice.isFormChanged = true
  
      })

  }

  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getemailNoti(this.msalService.instance.getActiveAccount().localAccountId).then((res: any) => {
      this.emailTable = res
      this.MasterData = res.eventsMasterData
      this.userData = res.eventsUserData
      this.MasterData = this.sortbyPriority(this.MasterData)
      for (var i of this.MasterData) {
        this.emailTableDb.push(i)
        console.log(i)

        this.emailTableForm.push(new FormGroup({
          onoff: new FormControl(i.onoff),
          description: new FormControl(i.description),
          event: new FormControl(i.event),
          priority: new FormControl(i.priority),
          frequencyId: new FormControl(i.frequencyId)
        }))
      }
      this.preferenceservice.isFormChanged = false
      this.viewContent = true;
    })
  }

  sortbyPriority(array: any): any {
    return array.length > 1 ? array.sort((a, b) => {
      if (a.priority === null) {
        return -1;
      }

      if (b.priority === null) {
        return 1;
      }

      if (a.priority === b.priority) {
        return 0;
      }

      return a.priority < b.priority ? -1 : 1;
    }) : array
  }

  emailTableEditRow(row: number) {
    if (!this.emailTableEditStack.includes(row)) {
      this.emailTableEditStack.push(row)
    }
  }

  submitnotificationsTable() {
      var formValue = this.emailTableForm.getRawValue()
      if(formValue.length > 0) 
      {
        this.submitObj = {
          reportOptions: {
            emailNotifcationNotifcationReportScopeIds: this.emailTable.reportOptions.emailNotifcationNotifcationReportScopeIds,
            emailNotifcationPortfolioReportTypes: this.emailTable.reportOptions.emailNotifcationPortfolioReportTypes,
              executionScopeIds: this.emailTable.reportOptions.executionScopeIds,
              includeChild: this.emailTable.reportOptions.includeChild,
              notificationId: this.emailTable.reportOptions.notificationId,
              portfolioScopeIds: this.emailTable.reportOptions.portfolioScopeIds,
              productIds: this.emailTable.reportOptions.productIds,
              projectIds: this.emailTable.reportOptions.projectIds,
              recieveEmailNotification: this.emailTable.reportOptions.recieveEmailNotification,
              reportFrequencyId: this.emailTable.reportOptions.reportFrequencyId,
              roleIds: this.emailTable.reportOptions.roleIds,
              userId: this.emailTable.reportOptions.userId
            }
            ,
            eventsMasterData: [],
          eventsUserData: this.emailTable.eventsMasterData.map(masterData => {
            const matchingValue = formValue.find(value => value.frequencyId == masterData.frequencyId)
            console.log
            const onOffValue = matchingValue ? matchingValue.onoff : false;
            return {
              frequencyId: masterData.frequencyId,
              onOff: onOffValue == true? onOffValue : false,
              resourceId: this.msalService.instance.getActiveAccount().localAccountId
            };
          })
        }
      }

      console.log(this.submitObj)
    console.log(this.emailTableDb)
    if (JSON.stringify(this.submitObj) == JSON.stringify(this.emailTableDb)) {
     console.log("WRONG")
      this.projecthubservice.toggleDrawerOpen('', '', [], '', true)
    }
    else {
      console.log("RIGHT")
          this.apiService.editEmailSettings(this.submitObj, this.msalService.instance.getActiveAccount().localAccountId).then(resp => {
            this.projecthubservice.isFormChanged = false
            this.projecthubservice.isNavChanged.next(true)
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.successSave.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')


            // this.preferenceservice.isFormChanged = false
            // this.preferenceservice.submitbutton.next(true)
            // this.preferenceservice.successSave.next(true)
            // this.preferenceservice.toggleDrawerOpen('', '', [], '')
          })
          
        
    
  }
}
}
