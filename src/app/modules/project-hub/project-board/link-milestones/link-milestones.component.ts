import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-link-milestones',
  templateUrl: './link-milestones.component.html',
  styleUrls: ['./link-milestones.component.scss']
})
export class LinkMilestonesComponent implements OnInit {
  toggleHelper: boolean = false
  localIncludedItems = new FormGroup({
    toggle: new FormControl(false)
  })
  constructor(public projecthubservice: ProjectHubService) { }

  ngOnInit(): void {
  }

  toggleSchedule(event: any) {
    this.toggleHelper = true
    this.projecthubservice.includeClosedItems.schedule.next(event.checked)
  }

  submitlink() {
    
  }

}
