import { Component } from '@angular/core';
import { PortfolioCenterService } from '../../portfolio-center.service';
import { PortfolioApiService } from '../../portfolio-api.service';

@Component({
  selector: 'app-forecast-bulk-edit',
  templateUrl: './forecast-bulk-edit.component.html',
  styleUrls: ['./forecast-bulk-edit.component.scss']
})
export class ForecastBulkEditComponent {
  ForecastBulkEdit: string = 'ForecastBulkEdit';
  forecastData: any;
  projectCAPEXdata: any;
  projectFunding: any;
  projectOPEXdata: any;
  showContent = false
constructor(public PortfolioCenterService: PortfolioCenterService, private portfoliService: PortfolioApiService)
{
  
}

  ngOnInit(): void {
    this.forecastData = JSON.parse(JSON.stringify(this.PortfolioCenterService.forecastData))
    console.log(this.forecastData)
    this.dataloader()
  }

  dataloader()
  {
this.showContent = true
  }
}
