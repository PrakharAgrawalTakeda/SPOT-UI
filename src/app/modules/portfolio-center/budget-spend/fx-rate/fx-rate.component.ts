import { Component } from '@angular/core';
import { PortfolioApiService } from '../../portfolio-api.service';
import { PortfolioCenterService }from '../../portfolio-center.service';

@Component({
  selector: 'app-fx-rate',
  templateUrl: './fx-rate.component.html',
  styleUrls: ['./fx-rate.component.scss']
})
export class FxRateComponent {
  localCurrency: any = [];
  constructor(private portfoliService: PortfolioApiService, public PortfolioCenterService: PortfolioCenterService) {
  }
  ngOnInit(): void {
    this.portfoliService.getLocalCurrency().then(currency => {
      this.localCurrency = currency
    })
  }
}
