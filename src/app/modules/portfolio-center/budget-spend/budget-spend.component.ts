import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioCenterService } from '../portfolio-center.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-budget-spend',
  templateUrl: './budget-spend.component.html',
  styleUrls: ['./budget-spend.component.scss']
})
export class BudgetSpendComponent {
  navItem: any
  viewContent:boolean = true
  filter: any = []
  constructor(private router: Router, public PortfolioCenterService: PortfolioCenterService){
    
  }
  
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader(){
    this.PortfolioCenterService.node = this.PortfolioCenterService.all
    this.navItem = {
    title: 'Budget/Spend',
      children: [
        {
          title: 'Portfolio Performance',
          toggled: false
        },
        {
          title: 'Project Performance',
          toggled: false
        },
        {
          title: 'Forecast Bulk Edit',
          toggled: true
        },
        
      ]
    }
    }
  ToggleButton(item){
    this.navItem.children.forEach(element => {
      element.toggled = element.title == item.title ? true : false
    });
  }
}
