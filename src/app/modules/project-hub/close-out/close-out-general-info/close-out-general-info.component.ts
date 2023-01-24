import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close-out-general-info',
  templateUrl: './close-out-general-info.component.html',
  styleUrls: ['./close-out-general-info.component.scss']
})
export class CloseOutGeneralInfoComponent implements OnInit {

  constructor() { }
  viewElements: any = ['problemTitle','projectId','portfolioOwner','excecutionScope','parentProject','owningOrganization','primaryProduct','otherImpactedProducts','closeOutApprovedDate','opU','sponsor','projectManager','parentProject','isGoodPractise','StrategicDrivers']
  ngOnInit(): void {
  }

}
