import { Component, Input, OnInit } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-operational-performance-table',
  templateUrl: './operational-performance-table.component.html',
  styleUrls: ['./operational-performance-table.component.scss']
})
export class OperationalPerformanceTableComponent implements OnInit {
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() kpi: any
  @Input() editable: boolean = true
  
  constructor(private projecthubservice: ProjectHubService) { }

  ngOnInit(): void {
  }
   getLookUpName(lookUpId: string): string{
    return this.lookup.get(lookUpId)
   }
   getKPIName(kpiid: string): string{
    return this.kpi.find(x=>x.kpiid == kpiid).kpiname
   }
}
