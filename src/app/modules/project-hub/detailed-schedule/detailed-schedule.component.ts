import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DependencyStore, GanttConfig, Model, ProjectModelConfig, Store, TaskStore } from '@bryntum/gantt';
import { BryntumGanttComponent, BryntumGanttProjectModelComponent } from '@bryntum/gantt-angular';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { CostComponent } from '../common/cost/cost.component';
@Component({
  selector: 'app-detailed-schedule',
  templateUrl: './detailed-schedule.component.html',
  styleUrls: ['./detailed-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailedScheduleComponent implements OnInit {
  startDate = new Date();
  id: string = '';
  viewContent: boolean = false;
  viewSubmitButton: boolean = false;
  viewAddButton: boolean = false;
  currentData = {
    projectUId: '',
    AssignmentStore: '',
    AssignmentManipulationStore: '',
    CalendarManagerStore: '',
    DependencyStore: '',
    ResourceStore: '',
    TaskStore: ''
  }
  submitData = {}
  projectConfig: Partial<ProjectModelConfig> = {
    // Empty project config
  };
  ganttConfig: Partial<GanttConfig> = {
    columns: [
      { type: 'name', width: 160 }
    ],
    startDate: new Date()
  };
  tasks: TaskStore = new TaskStore();
  dependencies: DependencyStore = new DependencyStore();
  /*new TaskStore({
    data: [
      {
        id: 'hello',
        name: 'Write docs',
        expanded: true,
        children: [
          { id: 'hey', name: 'Proof-read docs', startDate: '2022-01-02', endDate: '2022-01-09' },
          { id: 'hwy', name: 'Release docs', startDate: '2022-01-09', endDate: '2022-01-10' }
        ]
      }
    ]
  });

  dependencies = [
    { fromTask: 'hey', toTask: 'hwy' }
  ];*/

  onDataChange(event) {
    //console log current value of gantt
    var storename = Object.getPrototypeOf(event.store).$$name
    if (this.currentData[storename] != event.store.formattedJSON) {
      console.log("DIFFERENT")
      console.log(Object.getPrototypeOf(event.store).$$name)
      console.log(event.store.formattedJSON)
      this.currentData[storename] = event.store.formattedJSON
      this.viewSubmitButton = true;
      console.log("FINAL DATA", this.currentData)
    }
    else {
      console.log("SAME")
    }
  }
  @ViewChild('gantt') ganttComponent!: BryntumGanttComponent;
  @ViewChild('project') projectComponent!: BryntumGanttProjectModelComponent;

  constructor(private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService, private projectHubService: ProjectHubService) {
  }
  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.currentData.projectUId = this.id
    this.apiService.getDetailedScheduleData(this.id).then((data: any) => {
      console.log("DATA", data)
      this.currentData = {
        projectUId: this.id,
        AssignmentStore: data.assignmentStore,
        AssignmentManipulationStore: data.assignmentManipulationStore,
        CalendarManagerStore: data.calendarManagerStore,
        DependencyStore: data.dependencyStore,
        ResourceStore: data.resourceStore,
        TaskStore: data.taskStore
      }
      this.tasks.data = JSON.parse(data.taskStore ? data.taskStore : "[]")
      this.dependencies.data = JSON.parse(data.dependencyStore ? data.dependencyStore : "[]")
      console.log("CURRENT DATA", this.currentData)
      this.viewContent = true;
      this.viewSubmitButton = false;
    });

  }

  santizeData() {
    this.submitData = {
      projectUId: this.id,
      AssignmentStore: this.currentData?.AssignmentStore?.replaceAll("_generatede_", ""),
      AssignmentManipulationStore: this.currentData?.AssignmentManipulationStore?.replaceAll("_generatede_", ""),
      CalendarManagerStore: this.currentData?.CalendarManagerStore?.replaceAll("_generatede_", ""),
      DependencyStore: this.currentData?.DependencyStore?.replaceAll("_generatede_", ""),
      ResourceStore: this.currentData?.ResourceStore?.replaceAll("_generatede_", ""),
      TaskStore: this.currentData?.TaskStore?.replaceAll("_generatede_", "")
    }
  }
  addTask(){
    this.tasks.add({
      name: 'New task'
    });
  }
  saveGanttData() {
    this.santizeData()

    console.log("SUBMIT DATA", this.submitData)
    this.apiService.putDetailedScheduleData(this.submitData, this.id).then((data: any) => {
      this.viewSubmitButton = false;
      this.projectHubService.successSave.next(true);
    });
  }
}
