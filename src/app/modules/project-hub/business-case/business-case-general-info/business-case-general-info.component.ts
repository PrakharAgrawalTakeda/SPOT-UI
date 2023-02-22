import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-case-general-info',
  templateUrl: './business-case-general-info.component.html',
  styleUrls: ['./business-case-general-info.component.scss']
})
export class BusinessCaseGeneralInfoComponent implements OnInit {
  viewElements: any = ["problemTitle", "portfolioOwner", "owningOrganization", "opU", "primaryProduct", "otherImpactedProducts", "projectDescription", "excecutionScope", "sponsor", "BCAuthor", "StrategicRationale", "RiskImpact", "AdditionalAuthor", "problemId", "businessCaseApprovedDate"]
  constructor() { }

  ngOnInit(): void {
  }

}
