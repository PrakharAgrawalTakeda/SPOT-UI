import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { GanttConfig, Model, ProjectModelConfig, Store, TaskStore } from '@bryntum/gantt';
import { BryntumGanttComponent, BryntumGanttProjectModelComponent } from '@bryntum/gantt-angular';
@Component({
  selector: 'app-detailed-schedule',
  templateUrl: './detailed-schedule.component.html',
  styleUrls: ['./detailed-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailedScheduleComponent {
  startDate = new Date(2022, 0, 1);
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
    ],
    onChange(event) {
     // console.log(event)
    }
  });

  dependencies = [
    { fromTask: 'hey', toTask: 'hwy' }
  ];

  onDataChange(event) {
    //console log current value of gantt
    console.log(event.store.formattedJSON)
  }
  syncData({ store, action, records }: { store: Store; action: String; records: Model[] }): void {
    console.log(`${store.id} changed. The action was: ${action}. Changed records: `, records);
    // Your sync data logic comes here
  }
  @ViewChild('gantt') ganttComponent!: BryntumGanttComponent;
  @ViewChild('project') projectComponent!: BryntumGanttProjectModelComponent;

  constructor(){
  }
}
