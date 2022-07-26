import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { lookupMaster } from 'app/shared/lookup-global';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubComponent } from '../project-hub.component';
import { ProjectHubService } from '../project-hub.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectViewComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('riskIssuesTable', { read: MatSort }) riskIssuesMatSort: MatSort;
  riskIssues: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('askNeedTable', { read: MatSort }) askNeedMatSort: MatSort;
  askNeed: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('ScheduleTable', { read: MatSort }) ScheduleMatSort: MatSort;
  @ViewChild(ProjectHubComponent) parent;
  getRowClass = (row) => {
    return {
      'row-color1': row.indicator == 'Grey',
    };
  };
  Schedule: MatTableDataSource<any> = new MatTableDataSource();
  projectViewDetails: any = {}
  id: string = ''
  showContent: boolean = false
  riskIssuesHeaders: string[] = ['logDate', 'dueDate', 'ifHappens', 'riskIssueTypeId'];
  askNeedHeaders: string[] = ['askNeedIndicator', 'askNeed1', 'needFromName', 'needByDate'];
  lookupmaster = new Map();
  ScheduleHeaders: string[] = ['milestone', 'baselineFinish', 'plannedFinish', 'responsiblePersonName'];
  askneedngxdata: any = [];
  askneedngxcolumns: any = []
  isEverythingLoaded: boolean = false
  rows: any[] = [];
  isclosedaskneedtoggle: boolean = false

  overallCollapse: boolean = false
  overallCollapseControll: boolean = false

  overallCollapseClass: string = 'overall-shrink'
  expanded: any = {};
  timeout: any;
  checkedan: boolean = false
  @ViewChild('myTable') table: any;
  indicatorlook = {
    "fdac9aff-0e20-41ef-a851-5d259a4697cc": "Green",
    "1AB9DC30-D39F-4673-9F11-1F3E7DE1C8D2": "Yellow",
    "e8f4b0cd-813c-4f7c-a9b5-b955982985d9": "Red"
  }

  //hubsettings
  hubsetting: any = {}

  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, private auth: AuthService, public indicator: SpotlightIndicatorsService, public projecthubservice: ProjectHubService, private _router: Router, private changeDetector: ChangeDetectorRef) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res == true) {
        this.checkedan = false;
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  ngAfterViewChecked(): void {
      if (document.getElementById('overall-status') != null) {
        this.collapseLogic();
        this.changeDetector.detectChanges()
    }
  }

  collapseLogic() {
    this.isEverythingLoaded = true
   // console.log(document.getElementById('ra').scrollHeight)
   // console.log(document.getElementById('ra').clientHeight)
    if (
      (document.getElementById('sd').scrollHeight > document.getElementById('sd').clientHeight ||
      document.getElementById('ra').scrollHeight > document.getElementById('ra').clientHeight ||
      document.getElementById('ns').scrollHeight > document.getElementById('ns').clientHeight || this.overallCollapseControll == true)
    ) {
     // console.log("if")
      this.overallCollapse = true
    }
    else{
     // console.log("else")
      this.overallCollapse = false
    }
  }
  collapseToggle() {
    if (this.overallCollapseControll == false) {
      this.overallCollapseClass = 'overall-expand'
    }
    else {
      this.overallCollapseClass = 'overall-shrink'
    }
    this.overallCollapseControll = !this.overallCollapseControll
    console.log(this.overallCollapseControll)

  }
  dataloader() {
    if(this.overallCollapseControll == true){
      this.collapseToggle()
    }
   this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getprojectviewdata(this.id).then((res) => {
      this.projectViewDetails = res
      this.hubsetting = {
        overallStatus: this.projectViewDetails.hubSettings.some(x => x.lookUpId == '2bd2e8a6-a605-4c38-817a-b266f2442ed1') ? this.projectViewDetails.hubSettings.find(x => x.lookUpId == '2bd2e8a6-a605-4c38-817a-b266f2442ed1').hubValue : true,
        risks: this.projectViewDetails.hubSettings.some(x => x.lookUpId == 'f84a8e82-de59-46d5-8b84-f4c32a1018e1') ? this.projectViewDetails.hubSettings.find(x => x.lookUpId == 'f84a8e82-de59-46d5-8b84-f4c32a1018e1').hubValue : true,
        asks: this.projectViewDetails.hubSettings.some(x => x.lookUpId == 'b4db29e9-d47a-4f4d-abbc-a5ed6cf0705d') ? this.projectViewDetails.hubSettings.find(x => x.lookUpId == 'b4db29e9-d47a-4f4d-abbc-a5ed6cf0705d').hubValue : true,
        milestones: this.projectViewDetails.hubSettings.some(x => x.lookUpId == '5259bc84-1485-4861-b73b-b83603b825b1') ? this.projectViewDetails.hubSettings.find(x => x.lookUpId == '5259bc84-1485-4861-b73b-b83603b825b1').hubValue : true,
      }
      console.log(this.projectViewDetails)
      this.showContent = true

      this.riskIssues.data = this.projectViewDetails.riskIssuesData
      this.riskIssues.sort = this.riskIssuesMatSort
      if (this.isclosedaskneedtoggle == false) {
        this.onlyopenAskNeeds()
      }
      else {
        this.allAskNeeds()
      }

      console.log(this.projectViewDetails)

      this.askNeed.sort = this.askNeedMatSort
      this.Schedule.data = this.projectViewDetails.scheduleData
      this.Schedule.sort = this.ScheduleMatSort

    })
    this.auth.lookupMaster().then((res: any) => {
      for (let i of res) {
        this.lookupmaster.set(i.lookUpId, i.lookUpName)
      }
    })
  }
  islink(uid: string): boolean {
    return this.projectViewDetails.links.some(x => x.linkItemId == uid)
  }
  getlinkname(uid: string): string {
    let temp = this.projectViewDetails.links.find(x => x.linkItemId == uid)
    temp = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
    return "This ask/need is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle

  }
  allAskNeeds() {
    this.isclosedaskneedtoggle = true
    this.askneedngxdata = this.projectViewDetails.askNeedData
  }
  onlyopenAskNeeds() {
    this.isclosedaskneedtoggle = false
    this.askneedngxdata = this.projectViewDetails.askNeedData.filter(row => row.closeDate == null)
  }
  changeaskneed(event: any) {
    if (event.checked == true) {
      this.allAskNeeds()
    }
    else {
      this.onlyopenAskNeeds()
    }
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', this.table);
    this.table.rowDetail.toggleExpandRow(row);
  }
  test(): string {
    return "hello"
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  trackByFnRI(index: number, item: any): any {
    return item.riskIssueUniqueId || index;
  }
  trackByFnAN(index: number, item: any): any {
    return item.askNeedUniqueId || index;
  }
  trackByFnS(index: number, item: any): any {
    return item.scheduleUniqueId || index;
  }
  getlookup(key) {
    return this.lookupmaster.get(key)
  }

  ngOnDestroy(): void {
    if (this.projecthubservice.drawerOpenedright == true) {
      this.projecthubservice.toggleDrawerOpen('', '', [], '')
    }
  }
}
