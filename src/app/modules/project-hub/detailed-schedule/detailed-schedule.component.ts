import { Component, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentStore, DependencyStore, Gantt, GanttConfig, ProjectModelConfig, ResourceStore, StateTrackingManager, TaskModel, TaskStore, TimeRangeStore, ToolbarConfig } from '@bryntum/gantt';
import { BryntumGanttProjectModelComponent } from '@bryntum/gantt-angular';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { ModifiedTaskModel } from 'app/shared/global-app-settings';
import { GlobalDetailedScheduleBetaUsers } from 'app/shared/global-detailed-schedule-beta-users';
import { MsalService } from '@azure/msal-angular';
import { maxHeightIcon } from '@progress/kendo-svg-icons';
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
    projectStartDate: new FormControl(),
    autoSave: new FormControl(true)
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
  timeRanges: TimeRangeStore = new TimeRangeStore({
  })
  resourceStore: ResourceStore = new ResourceStore();
  assignmentStore: AssignmentStore = new AssignmentStore();
  ganttConfig: Partial<GanttConfig> = {
    columns: [
      { type: 'name', width: 160 },
      { type: 'duration', width: 80 },
      { type: 'percentdone', showCircle: true, width: 80 },
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
      taskEdit: {
        editorConfig:{
          floating: true,
          anchor: true,
          centered: true
        },
        items: {
          generalTab: {
            scrollable: true,
            items: {
              /*isImportantDate: {
                name: 'isImportantDate',
                type: 'checkbox',
                flex: '1 0 50%',
                text: 'Important Date?',
              },
              isImportantDateTaskEndDate: {
                name: 'isImportantDateTaskEndDate',
                type: 'checkbox',
                flex: '1 0 47%',
                text: "Is Important Date, Task's End Date?",
              },*/
              isImportantDate: {
                type: 'radiogroup',
                name: 'isImportantDate',
                label: 'Important Date',
                labelWidth: '6.5em',
                cls: 'pt-3',
                items: [{
                  text: 'None',
                  name: 'isImportantDate',
                  ref: 'isImportantDate_NONE',
                  checked: true,
                  checkedValue: 'NONE'
                }, {
                  text: 'Start Date',
                  name: 'isImportantDate',
                  ref: 'isImportantDate_START_DATE',
                  checkedValue: 'START_DATE'
                }, {
                  text: 'End Date',
                  name: 'isImportantDate',
                  ref: 'isImportantDate_END_DATE',
                  checkedValue: 'END_DATE'
                }]
              },
              notes: {
                type: 'textarea',
                name: 'notes',
                label: 'NOTES',
                labelWidth: '6.5em',
                cls: 'pt-3',
              },
            }
          },

          resourcesTab: {
            items: {
              customInfoProjectTeam: {
                html: `<p>To include additional members in the Gantt chart, please ensure they are first added to the <a class="text-primary underline" href="./project-hub/${this.projectHubService.projectid}/project-team"> project team.</a></p>`,
              },
            }
          }
        }
      },
      eventSegments: false,
      scrollButtons: true,
      projectLines: true,
      baselines: {
        disabled: false,
        renderer: ({ baselineRecord, taskRecord, renderData }) => this.baselineRenderer({ baselineRecord, taskRecord, renderData })
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
      timeRanges: {
        showCurrentTimeLine: false
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
          onToggle: ({ checked }) => {
            this.toggleBaselineVisible(1, checked);
          }
        }, {
          checked: true,
          text: 'Baseline 2',
          onToggle: ({ checked }) => {
            this.toggleBaselineVisible(2, checked);
          }
        }
        ]
      },
      baselinefeature: {
        type: 'checkbox',
        text: 'Show baselines',
        checked: true,
        onAction: ({ checked }) => {
          this.gantt.features.baselines.disabled = !checked;
        }
      },
    }
  };

  tasks: TaskStore = new TaskStore({
    modelClass: ModifiedTaskModel
  });
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
    if (storename != "TimeRangeStore") {
      if (this.currentData[storename] != event.store.formattedJSON) {
        console.log("DIFFERENT")
        console.log(Object.getPrototypeOf(event.store).$$name)
        console.log(event.store.formattedJSON)
        this.currentData[storename] = event.store.formattedJSON
        console.log(this.gantt.project.tasks)
        this.updateImportantDates()
        if (this.detailedScheduleForm.controls.autoSave.value) {
          this.saveGanttData()
        }
        else {
          this.viewSubmitButton = true;
        }
        console.log("FINAL DATA", this.currentData)
      }
      else {
        console.log("SAME")
      }
    }
  }

  @ViewChildren('gantt') ganttComponent: any;
  @ViewChild('project') projectComponent!: BryntumGanttProjectModelComponent;

  constructor(private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService, private projectHubService: ProjectHubService, private msal: MsalService, private router: Router) {
    this.detailedScheduleForm.controls.projectStartDate.valueChanges.subscribe((value) => {
      if (this.viewContent) {
        this.startDate = value?.toDate();
        this.currentData.projectStartDate = value?.toDate();
        this.viewSubmitButton = true;
      }
    });
    this.detailedScheduleForm.controls.autoSave.valueChanges.subscribe((res: any) => {
      if (this.viewContent) {
        this.viewSubmitButton = !res
        localStorage.setItem("detailedScheduleAutoSave", res)
        if (res) {
          this.saveGanttData()
        }
        this.detailedScheduleForm.controls.autoSave.markAsPristine()
      }
    })
  }
  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    if (!GlobalDetailedScheduleBetaUsers.users.includes(this.msal.instance.getActiveAccount()?.username)) {
      this.router.navigate([`/project-hub/${this.id}/project-board`]);

    }
    this.currentData.projectUId = this.id
    this.apiService.getDetailedScheduleData(this.id).then((data: any) => {
      this.apiService.getmembersbyproject(this.id).then((teams: any) => {
        var auto = localStorage.getItem("detailedScheduleAutoSave")
        if (auto == 'false') {
          this.detailedScheduleForm.controls.autoSave.setValue(false)
        }
        console.log("DATA", data)
        console.log("TEAMS", teams)
        if (teams.length > 0) {
          var teamsSanitized = teams.map((team) => {
            return {
              id: team.userId,
              name: team.userName
            }
          })
          // i want to use teamsSanitized with unique id as resorucestore
          const uniqueObjects = [];
          for (const obj of teamsSanitized) {
            if (!uniqueObjects.some(item => item.id === obj.id) && obj.id) {
              uniqueObjects.push(obj);
            }
          }
          this.resourceStore.data = uniqueObjects
        }
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
        this.assignmentStore.data = JSON.parse(data.assignmentStore ? data.assignmentStore : "[]")
        console.log("CURRENT DATA", this.currentData)
        this.stm.addStore(this.tasks)
        this.stm.addStore(this.dependencies)
        this.viewContent = true;
        this.viewSubmitButton = false;
        this.ganttComponent.changes.subscribe((comps) => {
          if (this.ganttComponent.first) {
            setTimeout(() => {
              this.stm.resetQueue()
            }, 3500);
            console.log("GANTT Component", this.ganttComponent)
            this.gantt = this.ganttComponent.first.instance;
            this.updateImportantDates()
            console.log(this.gantt.project.json)
            //add wait for seconds
          }
        });
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
  getId() {
    return this.id
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
  baselineRenderer({ baselineRecord, taskRecord, renderData }) {
    if (baselineRecord.isScheduled && baselineRecord.endDate.getTime() + 24 * 3600 * 1000 < taskRecord.endDate.getTime()) {
      renderData.className['b-baseline-behind'] = 1;
    }
    else if (taskRecord.endDate < baselineRecord.endDate) {
      renderData.className['b-baseline-ahead'] = 1;
    }
    else {
      renderData.className['b-baseline-on-time'] = 1;
    }
  }

  updateImportantDates() {
    var importDatesTask = (this.gantt.project.tasks as any).filter(task => task.isImportantDate == "START_DATE" || task.isImportantDate == "END_DATE")
    this.timeRanges.data = []
    var tempTimeRanges = []
    this.gantt.project.timeRanges = []
    if (importDatesTask.length > 0) {
      importDatesTask.forEach((task) => {
        tempTimeRanges.push({
          "name": task.name,
          "startDate": task.isImportantDate == "END_DATE" ? task.endDate : task.startDate,
          "duration": 0,
          "durationUnit": "d",
          "cls": task.isMilestone ? "b-fa b-fa-diamond" : ""
        })
        this.timeRanges.data = tempTimeRanges
      })
    }
  }
  saveGanttData() {
    this.santizeData()

    console.log("SUBMIT DATA", this.submitData)
    this.apiService.putDetailedScheduleData(this.submitData, this.id).then((data: any) => {
      this.viewSubmitButton = false;
      if (!this.detailedScheduleForm.controls.autoSave.value) {
        this.projectHubService.successSave.next(true);
      }
    });
  }
}
