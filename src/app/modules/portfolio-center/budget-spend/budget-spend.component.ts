import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioCenterService } from '../portfolio-center.service';
import { MatSidenav } from '@angular/material/sidenav';
import { RoleService } from 'app/core/auth/role.service';
import { RoleController } from 'app/shared/role-controller';

@Component({
  selector: 'app-budget-spend',
  templateUrl: './budget-spend.component.html',
  styleUrls: ['./budget-spend.component.scss']
})
export class BudgetSpendComponent {
  navItem: any
  viewContent:boolean = true
  filter: any = []
  showForecast:boolean = false
  roleControllerControl: RoleController = new RoleController;
  constructor(private router: Router, public PortfolioCenterService: PortfolioCenterService,public role: RoleService){
    
  }
  
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader(){
    if (this.role.roleMaster.securityGroupId == "500ee862-3878-43d9-9378-53feb1832cef" || this.role.roleMaster.securityGroupId == "C9F323D4-EF97-4C2A-B748-11DB5B8589D0" || this.role.roleMaster?.secondarySecurityGroupId?.some(x=>x=='500ee862-3878-43d9-9378-53feb1832cef')) {
      this.showForecast = true
    }
    else{
      this.showForecast = false
    }
    if(this.showForecast){
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
    else{
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
        
      ]
    }
  }
    }
  ToggleButton(item){
    this.navItem.children.forEach(element => {
      element.toggled = element.title == item.title ? true : false
    });
  }
}
