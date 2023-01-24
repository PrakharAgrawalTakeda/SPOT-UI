import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-proposal-general-info',
  templateUrl: './project-proposal-general-info.component.html',
  styleUrls: ['./project-proposal-general-info.component.scss']
})
export class ProjectProposalGeneralInfoComponent implements OnInit {

  constructor() { }
  viewElements: any = ["isArchived", "problemTitle", "portfolioOwner", "owningOrganization", "primaryProduct", "otherImpactedProducts", "projectDescription","StrategicDrivers","primaryKPI","isAgile","isPobos","isGmsgqltannualMustWin","isSiteAssessment"]
  ngOnInit(): void {
  }

}
