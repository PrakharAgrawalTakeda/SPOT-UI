import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  selector: 'app-email-notifications-edit',
  templateUrl: './email-notifications-edit.component.html',
  styleUrls: ['./email-notifications-edit.component.scss']
})
export class EmailNotificationsEditComponent {
  @Input() debounce: number = 300;
  @Input() minLength: number = 4;
  @Input() appearance: 'basic' | 'bar' = 'bar';
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  emailNotiEditType: string = 'EmailNotiEdit';
  emailNotiTableEditType: string = 'EmailNotiTableEdit';
  id: string = ""
  emailNotiForm = new FormGroup({
    recieveEmailNotification: new FormControl(false),
    onoff: new FormControl(false),
    description: new FormControl(''),
    event: new FormControl(''),
    priority: new FormControl(''),
    reportFrequencyId: new FormControl(null),
    emailNotifcationNotifcationReportScopeIds: new FormControl(null),
    portfolioOwner: new FormControl(),
    excecutionScope: new FormControl(),
    role: new FormControl(),
    rows: new FormControl(),
    includeChild: new FormControl(false),
    products: new FormControl(),
    emailNotifcationPortfolioReportTypes: new FormControl(null),
    notificationId: new FormControl('')
  })
  emailNoti: any;
  eventsData: any;
  lookUpData: any;
  reportFrequency: any;
  lookUpMaster: any;
  lookUpData2: any;
  filterCriteria: any = {}
  lookup: any = []
  searchControl: FormControl = new FormControl();
  selectedValueExists: FormControl = new FormControl(true);
  detailsHaveBeenChanged: FormControl = new FormControl(false);
  opened: boolean = false;
  rows = [];
  resultSets: any[];
  budget: any = [];
  temp: string = "";
  isParent: boolean = false;
  showPortfolioOwnerField: boolean = false;
  valueChangesSubscription: Subscription;
  emailDb: any;
  lookUpData3: any;
  reportsData: any;


  constructor(public projecthubservice: ProjectHubService,
    private _httpClient: HttpClient,
    private _Activatedroute: ActivatedRoute, private msalService: MsalService, private apiService: MyPreferenceApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService, private authService: AuthService, private apiservice: ProjectApiService,
    public preferenceservice: MyPreferenceService) {
    this.emailNotiForm.valueChanges.subscribe(res => {
      this.projecthubservice.isFormChanged = true
      this.preferenceservice.isFormChanged = true

    })

  }
  ngOnInit(): void {
    this.dataloader()
    window.dispatchEvent(new Event('resize'));
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounce),
        takeUntil(this._unsubscribeAll),
        startWith(''),
        map((value) => {
          if (!value || value.length < this.minLength) {
            this.resultSets = null;
          }
          this.temp = value
          return value;
        }),
        filter(value => value && value.length >= this.minLength)
      )
      .subscribe((value) => {
        const params = new HttpParams().set('query', value);
        if (this.selectedValueExists.value == true && this.searchControl.value != "") {
          this._httpClient.post(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`, { body: [] })
            .subscribe((resultSets: any) => {
              for (var i = 0; i < resultSets.projectData.length; i++) {
                var obj = resultSets.projectData[i];
                console.log(this.projecthubservice)
                // if (this.projecthubservice.removedIds.indexOf(obj.problemUniqueId) !== -1) {
                //     resultSets.projectData.splice(i, 1);
                //     i--;
                // }
              }
              console.log(this.resultSets)
              this.resultSets = resultSets.projectData;
              this.budget = resultSets.budget
              this.search.next(resultSets);
            });

        }
      });
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getemailNoti(this.msalService.instance.getActiveAccount().localAccountId).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
        this.apiservice.getfilterlist().then(filter => {

          this.lookup = lookup
          this.filterCriteria = filter
          console.log('LookUp Data', lookup)
          this.lookUpData = lookup.filter(x => x.lookUpParentId == '3df298d8-fcac-4b2c-b571-c7ddfdeafbdc')
          this.lookUpData.sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })

          this.lookUpData2 = lookup.filter(x => x.lookUpParentId == '995740b8-8a4a-44b8-afb0-813a23c61160')
          this.lookUpData2.sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })
          this.lookUpData3 = lookup.filter(x => x.lookUpParentId == '15cb0049-6b90-45a7-b71e-12d32d091f73')
          this.lookUpData3.sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })
          this.emailNoti = res
          this.reportsData = res.reportOptions
          this.emailDb = this.emailNoti
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
              reportFrequencyId: res.reportOptions.reportFrequencyId ? this.lookUpData.find(x => x.lookUpId == res.reportOptions.reportFrequencyId) : '',
              emailNotifcationNotifcationReportScopeIds: res.reportOptions.emailNotifcationNotifcationReportScopeIds ? this.lookUpData2.find(x => x.lookUpId == res.reportOptions.emailNotifcationNotifcationReportScopeIds) : '',
              portfolioOwner: Array.isArray(res.reportOptions.portfolioScopeIds)
              ? res.reportOptions.portfolioScopeIds
              : [],
              excecutionScope: res.reportOptions.executionScopeIds ? res.reportOptions.executionScopeIds : [],
              role: res.reportOptions.roleId ? res.reportOptions.roleId : [],
              rows: res.reportOptions.projectIds ? res.reportOptions.projectIds : [],
              includeChild: res.reportOptions.includeChild,
              products: res.reportOptions.products ? res.reportOptions.products : [],
              emailNotifcationPortfolioReportTypes: res.reportOptions.emailNotifcationPortfolioReportTypes
                ? this.lookUpData3.find(x => x.lookUpId === res.reportOptions.emailNotifcationPortfolioReportTypes)
                : this.lookUpData3.find(x => x.lookUpName === 'All Projects'),
                notificationId: res.reportOptions.notificationId
            })
            console.log(this.emailNotiForm.getRawValue())
          }
        })
      })
    })
  }
  getPortfolioOwner(): any {
    if (this.filterCriteria && this.filterCriteria.portfolioOwner) {
      return this.filterCriteria.portfolioOwner.filter(x => x.isPortfolioOwner == true);
    }
    return [];
  }

  getExcecutionScope(): any {
    if (this.filterCriteria && this.filterCriteria.portfolioOwner) {
      return this.filterCriteria.portfolioOwner.filter(x => x.isExecutionScope == true);
    }
    return [];
  }
  getRoles(): any {
    var j = this.projecthubservice.all
    if (j.some(x => x.roleId == '17d65016-0541-4fcc-8a9c-1db0597817cc') && j.some(x => x.roleId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
      return this.lookup.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && !['17d65016-0541-4fcc-8a9c-1db0597817cc', 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8'].includes(x.lookUpId))
    }
    else if (j.some(x => x.roleId == '17d65016-0541-4fcc-8a9c-1db0597817cc')) {
      return this.lookup.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != '17d65016-0541-4fcc-8a9c-1db0597817cc')
    }
    else if (j.some(x => x.roleId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
      return this.lookup.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')
    }
    return this.lookup.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }

  ngOnDestroy() {
    if (this.detailsHaveBeenChanged.value == true)
      window.location.reload();
  }
  onRemoveLink(projectId: string, rowIndex: number) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove project",
      "message": "Are you sure you want to remove this project?",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Remove",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const deleteAlert = this.fuseAlert.open(comfirmConfig)

    deleteAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        //const objWithIdIndex = this.projecthubservice.projectChildren.findIndex((obj) => obj.problemUniqueId === projectId);
        //const index = this.projecthubservice.removedIds.indexOf(projectId);
        //this.projecthubservice.removedIds.splice(index, 1);
        this.searchControl.setValue('');
        this.selectedValueExists.setValue(true)
        this.rows.splice(rowIndex, 1);
        this.rows = [...this.rows];
        this.detailsHaveBeenChanged.setValue(true);
      }
    })
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.appearance === 'bar') {
      if (event.code === 'Escape') {
        this.close();
      }
    }
  }

  close(): void {
    if (!this.opened) {
      return;
    }
    this.searchControl.setValue('');

    this.opened = false;
  }

  onOptionSelected() {
    this.selectedValueExists.setValue(false)
  }

  budgetfind(projectid: string): string {
    if (this.resultSets.length > 0) {
      if (this.budget.length > 0) {
        var temp = this.budget.find(x => x.projectId == projectid)
        if (temp != null) {
          return temp.capitalBudgetId
        }
      }
    }
    return ""
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  onAdd(childId) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Add project",
      "message": "Are you sure you want to add this project?",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "primary"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Yes",
          "color": "primary"
        },
        "cancel": {
          "show": true,
          "label": "No"
        }
      },
      "dismissible": true
    }
    const addAlert = this.fuseAlert.open(comfirmConfig)
    addAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        var addedProject = this.resultSets.find(_ => _.problemUniqueId === childId);
        this.searchControl.setValue('');
        this.selectedValueExists.setValue(true);
        //this.projecthubservice.removedIds.push(childId, 1);
        this.rows.push(addedProject);
        this.rows = [...this.rows];
        console.log(this.rows)
        this.detailsHaveBeenChanged.setValue(true);
      }
    })
  }
  displayFn(value?: number) {
    let returnValue = "";
    if (value) {
      const selectedValue = this.resultSets.find(_ => _.problemUniqueId === value);
      returnValue = (selectedValue.isParent ? "[PGM] " : "") + selectedValue.problemId + " - " + this.budgetfind(selectedValue.problemUniqueId) + selectedValue.problemTitle;
    }
    return returnValue;
  }
  submitnotifications() {
    this.projecthubservice.isFormChanged = false
    this.preferenceservice.isFormChanged = false
    //var mainObj = this.costfundingData
    var formValue = this.emailNotiForm.getRawValue()
    console.log(formValue)
    if (JSON.stringify(formValue) == JSON.stringify(this.emailDb)) {
      this.projecthubservice.toggleDrawerOpen('', '', [], '', true)
    }
    else {
      console.log(formValue.emailNotifcationNotifcationReportScopeIds)
      var mainObj = {
        reportOptions: {
        emailNotifcationNotifcationReportScopeIds: formValue.emailNotifcationNotifcationReportScopeIds.lookUpId || '',
        emailNotifcationPortfolioReportTypes: formValue.emailNotifcationPortfolioReportTypes?.lookUpId || '77b04381-623f-4ab4-887d-8d4192d1bf4b',
          executionScopeIds: formValue.excecutionScope.length > 0 ? formValue.excecutionScope.map(x => x.portfolioOwnerId).join() : [],
          includeChild: formValue.includeChild ? formValue.includeChild : false,
          notificationId: formValue.notificationId ? formValue.notificationId : null,
          portfolioScopeIds: Array.isArray(formValue.portfolioOwner)
          ? formValue.portfolioOwner.map(x => x.portfolioOwnerId).join()
          : [],
          productIds: formValue.products.length > 0 ? formValue.products.map(x => x.productId).join() : [],
          projectIds: this.rows.length > 0 ? this.rows.map(x => x.problemUniqueId).join() : [],
          recieveEmailNotification: formValue.recieveEmailNotification ? formValue.recieveEmailNotification : false,
          reportFrequencyId: formValue.reportFrequencyId ? formValue.reportFrequencyId.lookUpId : '',
          roleIds: formValue.role.length > 0 ? formValue.role.map(x => x.lookUpId).join() : '',
          userId: this.msalService.instance.getActiveAccount().localAccountId
        }
        ,
  eventsMasterData: [],
  eventsUserData: []
      }
      }

      console.log("Main Object", mainObj)
       this.apiService.editEmailSettings(mainObj, this.msalService.instance.getActiveAccount().localAccountId).then(Res => {
      //   this.apiService.updateReportDates(this.projectHubService.projectid, "ModifiedDate").then(secondRes => {
          //this.projectHubService.isFormChanged = false
          // this.projecthubservice.isNavChanged.next(true)
          // this.projecthubservice.submitbutton.next(true)
          // this.projecthubservice.successSave.next(true)
          // this.projecthubservice.toggleDrawerOpen('', '', [], '')
          // this.preferenceservice.submitbutton.next(true)
          // this.preferenceservice.successSave.next(true)
          // this.preferenceservice.toggleDrawerOpen('', '', [], '')

          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
      //   })
       })
    
  }

}
