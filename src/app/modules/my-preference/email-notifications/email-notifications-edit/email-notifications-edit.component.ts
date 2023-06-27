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
    reportFrequencyId: new FormControl(null),
    emailNotifcationNotifcationReportScopeIds: new FormControl(null),
    portfolioOwner: new FormControl([]),
    excecutionScope: new FormControl([]),
    role: new FormControl(),
    rows: new FormControl(),
    includeChild: new FormControl(false),
    products: new FormControl(),
    emailNotifcationPortfolioReportTypes: new FormControl(null),
    notificationId: new FormControl(''),
    problemId: new FormControl([]),
    problemTitle: new FormControl([])
  })
  viewContent: boolean = false
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
  projects: any;
  reportScopechange: boolean;




  constructor(public projecthubservice: ProjectHubService,
    private _httpClient: HttpClient,
    private _Activatedroute: ActivatedRoute, private msalService: MsalService, private apiService: MyPreferenceApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService, private authService: AuthService, private apiservice: ProjectApiService,
    public preferenceservice: MyPreferenceService) {
    this.emailNotiForm.valueChanges.subscribe(res => {
      //this.projecthubservice.isFormChanged = true
      console.log(this.preferenceservice.isFormChanged)
      console.log(this.viewContent)
      
      //   var comfirmConfig: FuseConfirmationConfig = {
      //     "title": "Change Scope",
      //     "message": "Are you sure you want to change the notification scope?",
      //     "icon": {
      //       "show": true,
      //       "name": "heroicons_outline:exclamation",
      //       "color": "primary"
      //     },
      //     "actions": {
      //       "confirm": {
      //         "show": true,
      //         "label": "Yes",
      //         "color": "primary"
      //       },
      //       "cancel": {
      //         "show": true,
      //         "label": "No"
      //       }
      //     },
      //     "dismissible": true
      //   }
      //   const addAlert = this.fuseAlert.open(comfirmConfig)
      //   addAlert.afterClosed().subscribe(close => {
      //     if (close == 'confirmed') {
            
      //       this.reportScopechange = true
      //       this.dataloader()
      //     }
      // })
       //}
      // else{
        this.preferenceservice.isFormChanged = true
      // }
      

    })

    // this.emailNotiForm.controls.emailNotifcationNotifcationReportScopeIds.valueChanges.subscribe(res => {
       
    //   if(res == 'ecbe5dae-7278-4b2f-906d-ec9aaa77d868')
    //   {
    //     this.emailNotiForm.patchValue({ portfolioOwner : []})
    //   }
    //   else if(res == '11336470-8b35-4c7a-abe4-d62d58d33fca')
    //   {
    //     this.emailNotiForm.patchValue({ portfolioOwner : [], role : [], rows : [], products : []})
    //   }
    //   else if(res == '897633cf-3516-49b0-9f45-a6ddc9374c0e')
    //   {
    //     this.emailNotiForm.patchValue({ portfolioOwner : [], excecutionScope : [], rows : [], products : []})
    //   }
    //   else if(res == 'dca7a55b-6b8d-448e-b2be-0796a043775c')
    //   {
    //     this.emailNotiForm.patchValue({ portfolioOwner : [], role : [], excecutionScope : [], products : []})
    //   }
    //   else if(res == 'd290915b-cda2-4ba3-87a3-ce504fd6f15c')
    //   {
    //     this.emailNotiForm.patchValue({ portfolioOwner : [], role : [], rows : [], excecutionScope : []})
    //   }
    // })
    
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
          console.log("DB", res)
          console.log("ROWS", this.rows)
          console.log(this.filterCriteria.products)
          if (this.emailNoti != null) {
            this.emailNotiForm.patchValue({
              recieveEmailNotification: res.reportOptions.recieveEmailNotification ? res.reportOptions.recieveEmailNotification : false,
              reportFrequencyId: res.reportOptions.reportFrequencyId ? this.lookUpData.find(x => x.lookUpId == res.reportOptions.reportFrequencyId) : '',
              emailNotifcationNotifcationReportScopeIds: res.reportOptions.emailNotifcationNotifcationReportScopeIds ? this.lookUpData2.find(x => x.lookUpId == res.reportOptions.emailNotifcationNotifcationReportScopeIds) : '',
              portfolioOwner: res.reportOptions.portfolioScopeIds && this.filterCriteria.portfolioOwner
                ? res.reportOptions.portfolioScopeIds.split(',').map(id => this.filterCriteria.portfolioOwner.find(x => x.portfolioOwnerId === id)).filter(Boolean)
                : [],
              excecutionScope: res.reportOptions.executionScopeIds && this.filterCriteria.portfolioOwner
                ? res.reportOptions.executionScopeIds.split(',').map(id => this.filterCriteria.portfolioOwner.find(x => x.portfolioOwnerId === id)).filter(Boolean)
                : [],
                role: res.reportOptions.roleIds && this.getRoles()
                ? res.reportOptions.roleIds.split(',').map(id => this.getRoles().find(x => x.lookUpId === id)).filter(Boolean)
                : [],
                rows: res.reportOptions.projectIds
                ? res.reportOptions.projectIds.split(',')
                : [],
              includeChild: res.reportOptions.includeChild,
              products: res.reportOptions.productIds && this.filterCriteria.products ? 
              res.reportOptions.productIds.split(',').map(id => this.filterCriteria.products.find(x => x.productId === id)).filter(Boolean) : [],
              emailNotifcationPortfolioReportTypes: res.reportOptions.emailNotifcationPortfolioReportTypes
                ? this.lookUpData3.find(x => x.lookUpId === res.reportOptions.emailNotifcationPortfolioReportTypes)
                : this.lookUpData3.find(x => x.lookUpName === 'All Projects'),
              notificationId: res.reportOptions.notificationId
            })
            console.log("FORM", this.emailNotiForm.getRawValue())
console.log(this.getRoles())

          }
//           else if (this.emailNoti != null && this.viewContent == true && this.reportScopechange == true) {
//             this.emailNotiForm.patchValue({
//               recieveEmailNotification: res.reportOptions.recieveEmailNotification ? res.reportOptions.recieveEmailNotification : false,
//               reportFrequencyId: res.reportOptions.reportFrequencyId ? this.lookUpData.find(x => x.lookUpId == res.reportOptions.reportFrequencyId) : '',
//               emailNotifcationNotifcationReportScopeIds: res.reportOptions.emailNotifcationNotifcationReportScopeIds ? this.lookUpData2.find(x => x.lookUpId == res.reportOptions.emailNotifcationNotifcationReportScopeIds) : '',
//               portfolioOwner: res.reportOptions.portfolioScopeIds && this.filterCriteria.portfolioOwner
//                 ? res.reportOptions.portfolioScopeIds.split(',').map(id => this.filterCriteria.portfolioOwner.find(x => x.portfolioOwnerId === id)).filter(Boolean)
//                 : [],
//               excecutionScope: res.reportOptions.executionScopeIds && this.filterCriteria.portfolioOwner
//                 ? res.reportOptions.executionScopeIds.split(',').map(id => this.filterCriteria.portfolioOwner.find(x => x.portfolioOwnerId === id)).filter(Boolean)
//                 : [],
//                 role: res.reportOptions.roleIds && this.getRoles()
//                 ? res.reportOptions.roleIds.split(',').map(id => this.getRoles().find(x => x.lookUpId === id)).filter(Boolean)
//                 : [],
//                 rows: res.reportOptions.projectIds
//                 ? res.reportOptions.projectIds.split(',')
//                 : [],
//               includeChild: res.reportOptions.includeChild,
//               products: res.reportOptions.productIds && this.filterCriteria.products ? 
//               res.reportOptions.productIds.split(',').map(id => this.filterCriteria.products.find(x => x.productId === id)).filter(Boolean) : [],
//               emailNotifcationPortfolioReportTypes: res.reportOptions.emailNotifcationPortfolioReportTypes
//                 ? this.lookUpData3.find(x => x.lookUpId === res.reportOptions.emailNotifcationPortfolioReportTypes)
//                 : this.lookUpData3.find(x => x.lookUpName === 'All Projects'),
//               notificationId: res.reportOptions.notificationId
//             })
//             console.log("FORM", this.emailNotiForm.getRawValue())
// console.log(this.getRoles())

//           }
          if(res.reportOptions.projectIds)
          {
            this.apiService.getprojectDetails(res.reportOptions.projectIds.split(',')).then((id: any) => {
              if(id)
              {
                this.projects = id
                console.log(this.projects)
              }
              
                        })
          }

  this.preferenceservice.isFormChanged = false

          
     
          
          this.viewContent = true;
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
        this.searchControl.setValue('');
        this.selectedValueExists.setValue(true)
        this.rows.splice(rowIndex, 1);
        this.rows = [...this.rows];
        this.projects.splice(rowIndex, 1);
        this.projects = [...this.projects];
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
    this.projects.push(addedProject)
    this.projects = [...this.projects]
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
    this.preferenceservice.isFormChanged = false
    var formValue = this.emailNotiForm.getRawValue()
    console.log(formValue)
    if (JSON.stringify(formValue) == JSON.stringify(this.emailDb)) {
      this.preferenceservice.submitbutton.next(true)
      this.projecthubservice.toggleDrawerOpen('', '', [], '', true)
    }
    else {
      console.log(formValue.emailNotifcationNotifcationReportScopeIds)
      var mainObj = {
        reportOptions: {
          emailNotifcationNotifcationReportScopeIds: formValue.emailNotifcationNotifcationReportScopeIds.lookUpId || '',
          emailNotifcationPortfolioReportTypes: formValue.emailNotifcationPortfolioReportTypes?.lookUpId || '77b04381-623f-4ab4-887d-8d4192d1bf4b',
          executionScopeIds: formValue.excecutionScope ? formValue.excecutionScope.map(x => x.portfolioOwnerId).join() : '',
          includeChild: formValue.includeChild ? formValue.includeChild : false,
          notificationId: formValue.notificationId ? formValue.notificationId : null,
          portfolioScopeIds: formValue.portfolioOwner
            ? formValue.portfolioOwner.map(x => x.portfolioOwnerId).join()
            : '',
          productIds: formValue.products ? formValue.products.map(x => x.productId).join() : '',
          projectIds: this.projects ? this.projects.map(x => x.problemUniqueId).join() : '',
          recieveEmailNotification: formValue.recieveEmailNotification ? formValue.recieveEmailNotification : false,
          reportFrequencyId: formValue.reportFrequencyId ? formValue.reportFrequencyId.lookUpId : '',
          roleIds: formValue.role ? formValue.role.map(x => x.lookUpId).join() : '',
          userId: this.msalService.instance.getActiveAccount().localAccountId,
        },
        eventsMasterData: [],
        eventsUserData: []
      }
    }
    console.log("Main Object", mainObj)
    this.apiService.editEmailSettings(mainObj, this.msalService.instance.getActiveAccount().localAccountId).then(Res => {
      this.preferenceservice.isFormChanged = false
      this.projecthubservice.isFormChanged = false
      this.preferenceservice.submitbutton.next(true)
      this.preferenceservice.toggleDrawerOpen('', '', [], '')


      //   })
    })

  }

}
