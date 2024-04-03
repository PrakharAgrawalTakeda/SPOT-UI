import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioCenterService } from '../portfolio-center.service';
import { MatSidenav } from '@angular/material/sidenav';
import { RoleService } from 'app/core/auth/role.service';
import { RoleController } from 'app/shared/role-controller';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-budget-spend',
  templateUrl: './budget-spend.component.html',
  styleUrls: ['./budget-spend.component.scss']
})
export class BudgetSpendComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  navItem: any
  viewContent:boolean = true
  filter: any = []
  showForecast:boolean = false
  roleControllerControl: RoleController = new RoleController;
  constructor(private router: Router, public PortfolioCenterService: PortfolioCenterService,public role: RoleService){
    
  }
  
 

  ngOnInit(): void {
    this.dataloader()
    this.subscription.add(
      this.PortfolioCenterService.refreshNeeded.subscribe(() => {
        this.dataloader(); // Or call ngOnInit(), but calling specific method is cleaner
      })
    )
  }

  ngOnDestroy(): void {
    // Cleanup subscription
    this.subscription.unsubscribe();
  }

  dataloader(){
    if (["C9F323D4-EF97-4C2A-B748-11DB5B8589D0","0E83F6BE-79BE-426A-A316-F523FFAECC4F"].includes(this.role.roleMaster.securityGroupId) || this.role.roleMaster?.secondarySecurityGroupId?.some(x=>x?.toLowerCase()=='500ee862-3878-43d9-9378-53feb1832cef'.toLowerCase())) {
      this.showForecast = true
    }
    else{
      this.showForecast = false
    }
    if(this.showForecast && this.role.roleMaster.securityGroupId == "C9F323D4-EF97-4C2A-B748-11DB5B8589D0" && !this.role.roleMaster?.secondarySecurityGroupId?.some(x=>x?.toLowerCase()=='500ee862-3878-43d9-9378-53feb1832cef'.toLowerCase())){
      this.navItem = {
        title: 'Budget/Spend',
          children: [
            {
              title: 'Forecast Bulk View',
              toggled: true
            }
            
          ]
        }
    }
    else if(this.showForecast && (this.role.roleMaster.securityGroupId == "0E83F6BE-79BE-426A-A316-F523FFAECC4F"|| this.role.roleMaster?.secondarySecurityGroupId?.some(x=>x?.toLowerCase()=='500ee862-3878-43d9-9378-53feb1832cef'.toLowerCase()))){
      this.navItem = {
        title: 'Budget/Spend',
          children: [
            {
              title: 'Forecast Bulk View',
              toggled: true
            },
            {
              title: 'Forecast Excel Update',
              toggled: false
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
          toggled: true
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
