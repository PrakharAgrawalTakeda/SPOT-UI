import { Component } from '@angular/core';
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {ProjectHubService} from "../../project-hub.service";

@Component({
  selector: 'app-budget-fxrate',
  templateUrl: './budget-fxrate.component.html',
  styleUrls: ['./budget-fxrate.component.scss']
})
export class BudgetFxrateComponent {
    localCurrency:any = [];
    constructor(private portfoliService: PortfolioApiService, public projectHubService: ProjectHubService) {
    }
    ngOnInit(): void {
        this.portfoliService.getLocalCurrency().then((currency: any[]) => {
            this.localCurrency = currency.sort((a, b) => a.displayOrder - b.displayOrder);
        })
    }
    getNgxDatatableNumberHeader(): any {
        return ' ngx-number-header';
    }
}
