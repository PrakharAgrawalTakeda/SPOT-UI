import { Component, OnInit } from '@angular/core';
import {ProjectHubService} from "../project-hub.service";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
    viewContent = false;
  constructor(public projectHubService: ProjectHubService) { }

  ngOnInit(): void {
      this.viewContent = true;
  }

}
