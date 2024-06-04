import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GanttConfig, Model, ProjectModelConfig, Store, TaskStore } from '@bryntum/gantt';
import { BryntumGanttComponent, BryntumGanttProjectModelComponent } from '@bryntum/gantt-angular';
@Component({
  selector: 'app-detailed-schedule',
  templateUrl: './detailed-schedule.component.html',
  styleUrls: ['./detailed-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailedScheduleComponent implements OnInit {
  startDate = new Date(2022, 0, 1);
  id: string = '';
  currentData = {
    projectId: '',
    AssignmentStore: '',
    AssignmentManipulationStore: '',
    CalendarManagerStore: '',
    DependencyStore: '',
    ResourceStore: '',
    TaskStore: ''
  }
  projectConfig: Partial<ProjectModelConfig> = {
    // Empty project config
  };
  ganttConfig: Partial<GanttConfig> = {
    columns: [
      { type: 'name', width: 160 }
    ],
    startDate: new Date(2022, 0, 1),
    endDate: new Date(2022, 0, 10),
  };
  tasks: TaskStore = new TaskStore({
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
  ];

  onDataChange(event) {
    //console log current value of gantt
    console.log(Object.getPrototypeOf(event.store).$$name)
    console.log(event.store.formattedJSON)
    var storename = Object.getPrototypeOf(event.store).$$name
    this.currentData[storename] = event.store.formattedJSON
    console.log("FINAL DATA", this.currentData)
  }
  @ViewChild('gantt') ganttComponent!: BryntumGanttComponent;
  @ViewChild('project') projectComponent!: BryntumGanttProjectModelComponent;

  constructor(private _Activatedroute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
  }
}
