import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-proposal-general-info',
  templateUrl: './project-proposal-general-info.component.html',
  styleUrls: ['./project-proposal-general-info.component.scss']
})
export class ProjectProposalGeneralInfoComponent implements OnInit {

  viewElements: any = ["problemTitle", "portfolioOwner", "owningOrganization", "opU", "primaryProduct", "otherImpactedProducts", "projectDescription","projectProposalApprovedDate", "functionGroupID", "whynotgoforNextBestAlternative", "proposalStatement", "projectReviewedYN", "StrategicDrivers", "primaryKPI", "isAgile", "isPobos", "isGmsgqltannualMustWin", "isSiteAssessment","functionGroupID"]
  constructor() { }
  ngOnInit(): void {
  }

}
