import { Component, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DependencyStore, Gantt, GanttConfig, ProjectModelConfig, StateTrackingManager, TaskStore, ToolbarConfig } from '@bryntum/gantt';
import { BryntumGanttProjectModelComponent } from '@bryntum/gantt-angular';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
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
    // The State TrackingManager which the UndoRedo widget in the toolbar uses

  };
  stm: StateTrackingManager = new StateTrackingManager({
    autoRecord: true,
    disabled: false
  })
  gantt: Gantt;
  ganttConfig: Partial<GanttConfig> = {
    columns: [
      { type: 'name', width: 160 },
      { type: 'duration', width: 80 },
      { type: 'percentdone', width: 80 },
      { type: 'startdate', width: 150 },
      { type: 'enddate', width: 150 },
      { type: 'resourceassignment', width: 200 },
      {
        text: 'Baseline 1',
        collapsible: true,
        children: [
          { type: 'baselinestartdate', text: 'Start', field: 'baselines[0].startDate' },
          { type: 'baselineenddate', text: 'Finish', field: 'baselines[0].endDate' },
          { type: 'baselineduration', text: 'Duration', field: 'baselines[0].fullDuration' },
          { type: 'baselinestartvariance', field: 'baselines[0].startVariance' },
          { type: 'baselineendvariance', field: 'baselines[0].endVariance' },
          { type: 'baselinedurationvariance', field: 'baselines[0].durationVariance' }
        ]
      },
      {
        text: 'Baseline 2',
        collapsible: true,
        children: [
          { type: 'baselinestartdate', text: 'Start', field: 'baselines[1].startDate' },
          { type: 'baselineenddate', text: 'Finish', field: 'baselines[1].endDate' },
          { type: 'baselineduration', text: 'Duration', field: 'baselines[1].fullDuration' },
          { type: 'baselinestartvariance', field: 'baselines[1].startVariance' },
          { type: 'baselineendvariance', field: 'baselines[1].endVariance' },
          { type: 'baselinedurationvariance', field: 'baselines[1].durationVariance' }
        ]
      }
    ],
    subGridConfigs: {
      locked: {
        flex: 3
      },
      normal: {
        flex: 4
      }
    },
    rowHeight: 60,
    selectionMode: {
      cell: true,
      dragSelect: true,
      rowNumber: true
    },
    scrollTaskIntoViewOnCellClick: true,
    infiniteScroll: true,
    enableUndoRedoKeys: true,
    columnLines: false,
    appendTo: 'container',
    features: {
      scrollButtons: true,
      projectLines: true,
      baselines: {
        disabled: false
      },
      dependencies: {
        showLagInTooltip: true,
        // Soften up dependency line corners
        radius: 5,
        // Make dependencies easier to reach using the mouse
        clickWidth: 5
      },
      labels: {
        left: {
          field: 'name',
          editor: {
            type: 'textfield'
          }
        }
      },

    }
  };
  tbarConfig: Partial<ToolbarConfig> = {
    items: {
      addTaskButton: {
        color: 'b-green',
        icon: 'b-fa b-fa-plus',
        text: 'Create',
        tooltip: 'Create new task',
        onAction: () => this.addTask(),
      },
      undoRedo: {
        type: 'undoredo',
        items: {
          transactionsCombo: null
        }
      },
      zoomButtons: {
        type: 'buttonGroup',
        items: [
          {
            type: 'button',
            icon: 'b-fa b-fa-search-plus',
            tooltip: 'Zoom in',
            onAction: () => this.onZoomInClick(),
          },
          {
            type: 'button',
            icon: 'b-fa b-fa-search-minus',
            tooltip: 'Zoom out',
            onAction: () => this.onZoomOutClick(),
          },
          {
            type: 'button',
            icon: 'b-fa b-fa-compress-arrows-alt',
            tooltip: 'Zoom to fit',
            onAction: () => this.onZoomToFitClick(),
          },
          {
            type: 'button',
            icon: 'b-fa b-fa-angle-left',
            tooltip: 'Previous time span',
            onAction: () => this.onShiftPreviousClick(),
          },
          {
            type: 'button',
            icon: 'b-fa b-fa-angle-right',
            tooltip: 'Next time span',
            onAction: () => this.onShiftNextClick(),
          }
        ]
      },
      setBaseLineButtons: {
        type: 'button',
        text: 'Set baseline',
        iconAlign: 'end',
        menu: [{
          text: 'Set baseline 1',
          onItem: () => {
            this.setBaseline(1);
          },
        },
        {
          text: 'Set baseline 2',
          onItem: () => {
            this.setBaseline(2);
          },
        }
        ]
      },
      toggleBaseLines: {
        type: 'button',
        text: 'Show baseline',
        iconAlign: 'end',
        menu: [{
          checked: true,
          text: 'Baseline 1',
          onToggle: ({checked}) => {
            this.toggleBaselineVisible(1, checked);
          }
        }, {
          checked: true,
          text: 'Baseline 2',
          onToggle: ({checked}) => {
            this.toggleBaselineVisible(2, checked);
          }
        }
        ]
      },
      baselinefeature: {
        type       : 'checkbox',
        text       : 'Show baselines',
        checked    : true,
        onAction: ({ checked })=> {
            this.gantt.features.baselines.disabled = !checked;
        }
    },
    }
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

  @ViewChildren('gantt') ganttComponent: any;
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
      this.stm.addStore(this.tasks)
      this.stm.addStore(this.dependencies)
      this.viewContent = true;
      this.viewSubmitButton = false;
      setTimeout(() => {
        this.stm.resetQueue()
      }, 3500);
      this.ganttComponent.changes.subscribe((comps) => {
        if (this.ganttComponent.first) {
          console.log("GANTT Component", this.ganttComponent)
          this.gantt = this.ganttComponent.first.instance;
          //add wait for seconds
        }
      });
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
  baselineTasks() {
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
  onExpandAllClick() {
    this.gantt.expandAll();
  }

  onCollapseAllClick() {
    this.gantt.collapseAll();
  }

  onZoomInClick() {
    this.gantt.zoomIn();
  }

  onZoomOutClick() {
    this.gantt.zoomOut();
  }

  onZoomToFitClick() {
    this.gantt.zoomToFit({
      leftMargin: 50,
      rightMargin: 50
    });
  }

  onShiftPreviousClick() {
    this.gantt.shiftPrevious();
  }

  onShiftNextClick() {
    this.gantt.shiftNext();
  }

  toggleBaselineVisible(index, visible) {
    console.log("TOGGLE HIT", index, visible)
    this.gantt.element.classList[visible ? 'remove' : 'add'](`b-hide-baseline-${index}`);
  }
  setBaseline(index) {
    this.tasks.setBaseline(index);
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
