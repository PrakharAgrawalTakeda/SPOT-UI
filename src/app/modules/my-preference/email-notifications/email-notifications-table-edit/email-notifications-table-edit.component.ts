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
  emailNotiTableForm = new FormArray([]);
  id: string = ""
  emailTable: any;
  MasterData: any;
  userData: any;
  emailTableEditStack: any = []
  emailTableDb = []
  submitObj = {}
  viewContent: boolean = false
  eventsData: any;


  constructor(public projecthubservice: ProjectHubService,
    private _httpClient: HttpClient,
    private _Activatedroute: ActivatedRoute, private msalService: MsalService, private apiService: MyPreferenceApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService, private authService: AuthService, private apiservice: ProjectApiService,
    public preferenceservice: MyPreferenceService) {
      this.emailNotiTableForm.valueChanges.subscribe(res => {
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
      console.log(this.emailTable)
      this.MasterData = res.eventsMasterData
      this.userData = res.eventsUserData
      this.MasterData = this.sortbyPriority(this.MasterData)
      console.log(this.MasterData)
      console.log(this.userData)
      this.eventsData = res.eventsMasterData.map(masterData => {
        const eventsUserDataItem = res.eventsUserData.find(data => data.frequencyId == masterData.frequencyId);
        const onOffValue = eventsUserDataItem ? eventsUserDataItem.onOff : false;
        
        return { ...masterData, onOff: onOffValue };
      });
      console.log(this.eventsData)
      
      this.eventsData.sort((a, b) => a.priority - b.priority);
      for (var i of res.eventsMasterData) {
        const eventsUserDataItem = res.eventsUserData.find(data => data.frequencyId === i.frequencyId);
        const onoffValue = eventsUserDataItem ? eventsUserDataItem.onOff : false;
      
        const formGroup = new FormGroup({
          frequencyId: new FormControl(i.frequencyId),
          onoff: new FormControl(onoffValue == true ? onoffValue : false),
          description: new FormControl(i.description),
          event: new FormControl(i.event),
          priority: new FormControl(i.priority)
        });
      
        (this.emailNotiTableForm as FormArray).push(formGroup);
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
      var formValue = this.emailNotiTableForm.getRawValue()
      console.log(formValue)
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
              const formItem = formValue.find(value => value.frequencyId == masterData.frequencyId);
              console.log(formItem)
              const onOff = formItem.onoff
              
              return {
                frequencyId: masterData.frequencyId,
                onOff: onOff ? onOff : false,
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
            // this.projecthubservice.isFormChanged = false
            // this.projecthubservice.isNavChanged.next(true)
            // this.projecthubservice.submitbutton.next(true)
            // this.projecthubservice.successSave.next(true)
            // this.projecthubservice.toggleDrawerOpen('', '', [], '')
         this.emailTableEditStack = []
            this.preferenceservice.isFormChanged = false
      this.projecthubservice.isFormChanged = false
      this.preferenceservice.submitbutton.next(true)
      this.preferenceservice.toggleDrawerOpen('', '', [], '')


            // this.preferenceservice.isFormChanged = false
            // this.preferenceservice.submitbutton.next(true)
            // this.preferenceservice.successSave.next(true)
            // this.preferenceservice.toggleDrawerOpen('', '', [], '')
          })
          
        
    
  }
}
}
