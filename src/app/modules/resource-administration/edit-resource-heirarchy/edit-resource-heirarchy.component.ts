import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { FuseNavigationService } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';
import { ResourceAdministrationService } from '../resource-administration.service';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-resource-heirarchy',
  templateUrl: './edit-resource-heirarchy.component.html',
  styleUrls: ['./edit-resource-heirarchy.component.scss']
})
export class EditResourceHeirarchyComponent implements OnInit {
  viewContent: boolean = false
  RMForm = new FormGroup({
    portfolioOwner: new FormControl(null)
  })
  portfolioOwner: any;
  userManagedPortfolios: any;
  constructor(private router: Router, private _fuseNavigationService: FuseNavigationService, public auth: AuthService,
    public resourceadminservice: ResourceAdministrationService, private apiService: ProjectApiService, private msalService: MsalService) {

  }
  ngOnInit(): void {
    console.log("I'm here")
    const currentUserID = this.msalService.instance.getActiveAccount().localAccountId;

    this.apiService.getfilterlist().then(res => {
      this.auth.lookupMaster().then(lookupMaster => {
      console.log(lookupMaster)

      this.portfolioOwner = res
      const portfolioOwnerList = this.portfolioOwner.portfolioOwner;
            this.userManagedPortfolios = portfolioOwnerList.filter(po => {
            // Check if currentUserID matches resourceMgrAdId
            return po.resourceMgrAdId == currentUserID;
        }).map(po => po.portfolioOwner);
            console.log(this.userManagedPortfolios)
      })
    })
    this.viewContent = true;

  }

  // getPortfolioOwner(): any {
  //   return this.portfolioOwner.portfolioOwner.filter(x => x.isPortfolioOwner == true)
  //   // return "";
  // }
  // fetchPortfolioFunctions() {
  //   // Assuming you have a service that fetches the state of each function for the selected portfolio
  //   this.portfolioService.getFunctionsForPortfolio(this.selectedPortfolio).subscribe((data: Function[]) => {
  //     this.functions = this.functions.map(f => ({
  //       ...f,
  //       selected: !!data.find(df => df.id === f.id)
  //     }));
  //   });
  // }
  
  // toggleFunction(functionId: number) {
  //   // Add or remove the function from the selected portfolio
  //   if (this.functions.find(f => f.id === functionId).selected) {
  //     this.portfolioService.addFunctionToPortfolio(this.selectedPortfolio, functionId);
  //   } else {
  //     this.portfolioService.removeFunctionFromPortfolio(this.selectedPortfolio, functionId);
  //   }
  // }
  
}
