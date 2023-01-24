import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-charter-general-info',
  templateUrl: './project-charter-general-info.component.html',
  styleUrls: ['./project-charter-general-info.component.scss']
})
export class ProjectCharterGeneralInfoComponent implements OnInit {
  viewElements: any = ['problemTitle','projectId','portfolioOwner','excecutionScope','owningOrganization','primaryProduct','otherImpactedProducts','approvedDate','opU','sponsor','projectManager','parentProject','StrategicDrivers','primaryKPI', 'isAgile']
  constructor() { }

  ngOnInit(): void {
  }

}
