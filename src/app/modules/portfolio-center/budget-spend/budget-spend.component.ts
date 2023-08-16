import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioCenterService } from '../portfolio-center.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-budget-spend',
  templateUrl: './budget-spend.component.html',
  styleUrls: ['./budget-spend.component.scss']
})
export class BudgetSpendComponent {
  navItem: any
  viewContent:boolean = true

  constructor(private router: Router, public PortfolioCenterService: PortfolioCenterService, public renderer: Renderer2, public location: Location){
    this.renderer.listen('window', 'click', (e: any) => {
      if (e.target.className == "fuse-drawer-overlay"){
        this.location.replaceState('/portfolio-center');
      }
    })
  }
  
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader(){
    this.navItem = {
    title: 'Budget/Spend',
      children: [
        {
          title: 'Portfolio Performance',
          link: 'portfolio-center/portfolio-performance'
        },
        {
          title: 'Project Performance',
          link: 'portfolio-center/project-performance'
        },
        {
          title: 'Forecast Bulk Edit',
          link: 'portfolio-center/forecast-bulk-edit'
        },
        
      ]
    }
    }
  isNavActive(link: string): boolean {
    return this.router.url.includes(link)
  }
}
