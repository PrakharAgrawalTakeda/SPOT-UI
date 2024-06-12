import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DependencyStore, GanttConfig, Model, ProjectModelConfig, Store, StringHelper, TaskStore, ToolbarConfig } from '@bryntum/gantt';
import { BryntumGanttComponent, BryntumGanttProjectModelComponent } from '@bryntum/gantt-angular';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { CostComponent } from '../common/cost/cost.component';
import { Form, FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { D } from '@angular/cdk/keycodes';
import { project } from 'app/mock-api/dashboards/project/data';
import { items } from 'app/mock-api/apps/file-manager/data';
@Component({
  selector: 'app-detailed-schedule',
  templateUrl: './detailed-schedule.component.html',
  styleUrls: ['./detailed-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailedScheduleComponent implements OnInit {
  startDate: Date = new Date();
  isFullScreen: boolean = false;
  id: string = '';
  detailedScheduleForm: FormGroup = new FormGroup({
    projectStartDate: new FormControl()
  });
  viewContent: boolean = false;
  viewSubmitButton: boolean = false;
  viewAddButton: boolean = false;
  currentData = {
    projectUId: '',
    projectStartDate: '',
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
      { type: 'name', width: 160 },
      { type: 'duration', width: 80 },
      { type: 'percentdone', width: 80 },
      { type: 'startdate', width: 150 },
      { type: 'enddate', width: 150 },
      { type: 'resourceassignment', width: 200 }
    ],
    infiniteScroll: true,
    appendTo: 'container',
    features: {
      scrollButtons: true,
      projectLines: true,
      baselines: true,
    }
  };
  tbarConfig: Partial<ToolbarConfig> = {
    items: [
      {
        type: 'button',
        text: 'Add Task',
        icon: 'b-fa-regular b-fa-circle-plus',
        color: 'text-primary bg-gray-200 mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-primary-200 mat-mdc-button-base items-center pt-[4px]',
        onAction: () => this.addTask(),
      },
      {
        type: 'button',
        text: 'Full Screen',
        icon: 'b-fa b-fa-expand',
        color: 'text-primary bg-gray-200 mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-primary-200 mat-mdc-button-base items-center pt-[4px]',
        onAction: () => this.toggleFullScreen()
      }
    ]
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
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }
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
    this.detailedScheduleForm.controls.projectStartDate.valueChanges.subscribe((value) => {
      if (this.viewContent) {
        this.startDate = value?.toDate();
        this.currentData.projectStartDate = value?.toDate();
        this.viewSubmitButton = true;
      }
    });
  }
  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.currentData.projectUId = this.id
    this.apiService.getDetailedScheduleData(this.id).then((data: any) => {
      console.log("DATA", data)
      this.currentData = {
        projectUId: this.id,
        projectStartDate: data.projectStartDate ? data.projectStartDate : null,
        AssignmentStore: data.assignmentStore,
        AssignmentManipulationStore: data.assignmentManipulationStore,
        CalendarManagerStore: data.calendarManagerStore,
        DependencyStore: data.dependencyStore,
        ResourceStore: data.resourceStore,
        TaskStore: data.taskStore
      }
      this.startDate = data.projectStartDate ? moment(data.projectStartDate).toDate() : new Date();
      this.detailedScheduleForm.controls.projectStartDate.setValue(data.projectStartDate ? moment(data.projectStartDate).toDate() : new Date());
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
      projectStartDate: this.currentData?.projectStartDate ? moment(this.currentData?.projectStartDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
      AssignmentStore: this.currentData?.AssignmentStore?.replaceAll("_generatede_", ""),
      AssignmentManipulationStore: this.currentData?.AssignmentManipulationStore?.replaceAll("_generatede_", ""),
      CalendarManagerStore: this.currentData?.CalendarManagerStore?.replaceAll("_generatede_", ""),
      DependencyStore: this.currentData?.DependencyStore?.replaceAll("_generatede_", ""),
      ResourceStore: this.currentData?.ResourceStore?.replaceAll("_generatede_", ""),
      TaskStore: this.currentData?.TaskStore?.replaceAll("_generatede_", "")
    }
  }
  addTask() {
    this.tasks.add({
      name: 'New task'
    });
  }
  baselineTasks(){
    this.tasks.setBaseline(this.getBaselineIndex())
  }
  getBaselineIndex(): number {
    let index = 0;
    var tasksList = this.currentData.TaskStore ? JSON.parse(this.currentData.TaskStore) : []
    tasksList.forEach((task, i) => {
      if (task.baselines.length > index) {
        index = task.baselines.length
      }
    })
    return index + 1
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
