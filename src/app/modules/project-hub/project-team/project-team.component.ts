import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("project-team")
  }

}
