import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { MsalService } from '@azure/msal-angular';
import { MyPreferenceApiService } from '../my-preference-api.service';
import { MyPreferenceService } from '../my-preference.service'

import { debounceTime, filter, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalVariables } from 'app/shared/global-variables';

@Component({
  selector: 'app-email-notifications',
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.scss']
})
export class EmailNotificationsComponent {
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
    portfolioOwner: new FormControl(),
    excecutionScope: new FormControl(),
    role: new FormControl(),
    rows: new FormControl(),
    includeChild: new FormControl(false),
    products: new FormControl(),
    emailNotifcationPortfolioReportTypes: new FormControl(null),
    notificationId: new FormControl(''),
    problemId: new FormControl(''),
    problemTitle: new FormControl('')
  })
  emailNotiTableForm = new FormArray([]);
  // emailNotiTableForm = new FormGroup({
  //   onoff: new FormControl(false), // Set default value to false
  //   description: new FormControl(''), // Set default value as an empty string
  //   event: new FormControl(''), // Set default value as an empty string
  //   priority: new FormControl('') // Set default value as an empty string
  // });
  
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
  lookUpData3: any;
  emailNotiTable: any;
  projects: any;
  onoff: any;

  constructor(public projecthubservice: ProjectHubService,
    public preferenceservice: MyPreferenceService,
    private _httpClient: HttpClient,
    private _Activatedroute: ActivatedRoute, private msalService: MsalService, private apiService: MyPreferenceApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService, private authService: AuthService, private apiservice: ProjectApiService) {
    this.preferenceservice.submitbutton.subscribe(res => {
      if (res) {
        this.dataloader()
      }
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

          this.emailNoti = res
          this.emailNotiTable = res
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

          this.eventsData = res.eventsMasterData.map(masterData => {
            const eventsUserDataItem = res.eventsUserData.find(data => data.frequencyId == masterData.frequencyId);
            const onOffValue = eventsUserDataItem ? eventsUserDataItem.onOff : false;
            
            return { ...masterData, onOff: onOffValue };
          });
          console.log(this.eventsData)
          
          this.eventsData.sort((a, b) => a.priority - b.priority);
          
          res.eventsMasterData.sort((a, b) => a.priority - b.priority)
          console.log("DB OBJECT", res)
          console.log("ROWS", this.rows)


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
                ? this.lookUpData3.find(x => x.lookUpId === res.reportOptions.emailNotficationPortfolioReportTypes)
                : this.lookUpData3.find(x => x.lookUpName === 'All Projects'),
              notificationId: res.reportOptions.notificationId
            });
            
           
            for (var i of res.eventsMasterData) {
              const eventsUserDataItem = res.eventsUserData.find(data => data.frequencyId === i.frequencyId);
              const onoffValue = eventsUserDataItem ? eventsUserDataItem.onOff : false;
            
              const formGroup = new FormGroup({
                onoff: new FormControl(onoffValue == true ? onoffValue : false),
                description: new FormControl(i.description),
                event: new FormControl(i.event),
                priority: new FormControl(i.priority)
              });
            
              (this.emailNotiTableForm as FormArray).push(formGroup);
            }
            

            
          }
          console.log("TABLE FORM", this.emailNotiTableForm.getRawValue())

          console.log("FORM", this.emailNotiForm.getRawValue())
          if (res.reportOptions.projectIds) {
            this.apiService.getprojectDetails(res.reportOptions.projectIds.split(',')).then((id: any) => {
              if (id) {
                this.projects = id
                console.log(this.projects)
              }

            })
          }
        })
      })
    })
    if (this.emailNotiForm.controls['priority']) {
      this.emailNotiForm.controls['priority'].disable()
    }
    if (this.emailNotiForm.controls['event']) {
      this.emailNotiForm.controls['event'].disable()
    }
    if (this.emailNotiForm.controls['description']) {
      this.emailNotiForm.controls['description'].disable()
    }
    if (this.emailNotiForm.controls['onoff']) {
      this.emailNotiForm.controls['onoff'].disable()
    }
    if (this.emailNotiForm.controls['reportFrequencyId']) {
      this.emailNotiForm.controls['reportFrequencyId'].disable()
    }
    if (this.emailNotiForm.controls['emailNotifcationNotifcationReportScopeIds']) {
      this.emailNotiForm.controls['emailNotifcationNotifcationReportScopeIds'].disable()
    }
    if (this.emailNotiForm.controls['portfolioOwner']) {
      this.emailNotiForm.controls['portfolioOwner'].disable()
    }
    if (this.emailNotiForm.controls['excecutionScope']) {
      this.emailNotiForm.controls['excecutionScope'].disable()
    }
    if (this.emailNotiForm.controls['role']) {
      this.emailNotiForm.controls['role'].disable()
    }
    if (this.emailNotiForm.controls['products']) {
      this.emailNotiForm.controls['products'].disable()
    }
    if (this.emailNotiForm.controls['rows']) {
      this.emailNotiForm.controls['rows'].disable()
    }
    if (this.emailNotiForm.controls['includeChild']) {
      this.emailNotiForm.controls['includeChild'].disable()
    }
    if (this.emailNotiForm.controls['emailNotifcationPortfolioReportTypes']) {
      this.emailNotiForm.controls['emailNotifcationPortfolioReportTypes'].disable()
    }
    if (this.emailNotiForm.controls['recieveEmailNotification']) {
      this.emailNotiForm.controls['recieveEmailNotification'].disable()
    }


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
      "title": "Add child",
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

  }

  submitnotificationsTable() {

  }
}
