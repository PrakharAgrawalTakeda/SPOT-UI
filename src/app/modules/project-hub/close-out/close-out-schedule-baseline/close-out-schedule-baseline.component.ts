import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-close-out-schedule-baseline',
  templateUrl: './close-out-schedule-baseline.component.html',
  styleUrls: ['./close-out-schedule-baseline.component.scss']
})
export class CloseOutScheduleBaselineComponent implements OnInit {

  baselineLogData: any = {}
  viewContent: boolean = false
  id: string = ''
  viewBaselineLogs: boolean = true;
  viewBaseline: boolean;
  userlist: any = {}
  logdetails: any = {}
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Baseline-Log' = 'Baseline-Log'
  constructor(public projecthubservice: ProjectHubService,
    private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute) {
      this.projecthubservice.submitbutton.subscribe(res => {
      console.log(res)
      if(res == true)
      {
        this.dataloader()
      } })
    }

    ngOnInit(): void {
      this.dataloader()
  }
  dataloader() {
    console.log("MODE",this.mode)
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      this.apiService.getProjectBaselineLogDetails(this.id).then((logDetails: any) => {
    this.apiService.getProjectBaselineLog(this.id).then((logs: any) => {
      console.log(this.baselineLogData)
      console.log("Log Details", logDetails)
                  if(logDetails.length != 0)
                  {
                    this.logdetails = logDetails
                  }
      console.log("Logs", logs)
      console.log("Users List", this.userlist)
      console.log(logs.projectBaselineLog.length)
      //debugger
      if (logs.projectBaselineLog.length != 0 || logs.users != null) {
        this.userlist = logs.users

        this.getUserName(this.id)
        //console.log(this.baselineLogForm.getRawValue())

        this.baselineLogData = logs.projectBaselineLog.sort((a, b) => {
          return a.baselineCount - b.baselineCount;
        })
        var count = 1
        for (var i of this.baselineLogData) {
          i.logId = count
          count = count + 1

          //Baseline Log Form changes

          // this.baselineLogForm.push(new FormGroup({
          //   baselineLogId: new FormControl(i.baselineLogId),
          //   includeSlipChart: new FormControl(i.includeSlipChart == null ? false : i.includeSlipChart)
          // }))
        }
        this.viewContent = false
        this.viewBaseline = false
        this.viewBaselineLogs = true
      }
      else {
        this.viewContent = false
        this.viewBaseline = false
        this.viewBaselineLogs = true
      }



    })
    })
    }

    getUserName(adid: string): string {
      if (this.userlist.length > 0) {
        var baselinesetby = this.userlist.find(x => x.userAdid == adid)
        return baselinesetby ? baselinesetby.userDisplayName : ""
      }
      else {
        return ""
      }
    }

    checklogDetails(baselinelogid: string) : boolean {
      //console.log(baselinelogid)
     // console.log(this.logdetails)
      return  this.logdetails && this.logdetails != '' && this.logdetails.length > 0  ? this.logdetails.some(x=> x.baselineLogId == baselinelogid) : false
      //return
    }

}
