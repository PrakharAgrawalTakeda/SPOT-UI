import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { FuseNavigationService } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';
import { ResourceAdministrationApiService } from '../resource-administration-api.service';
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
    managingPortfolio: new FormControl(null)
  })
  portfolioOwner: any;
  userManagedPortfolios: any;
  portfolioOwnerList: any;
  functions: any;
  rows: any;
  constructor(private router: Router, private _fuseNavigationService: FuseNavigationService, public auth: AuthService,
    public resourceadminservice: ResourceAdministrationApiService, private apiService: ProjectApiService, private msalService: MsalService) {

  }

  ngOnInit(): void {
    this.dataloader()
    this.setupFormSubscriptions()
  }

  dataloader() {
    console.log("I'm here")
    const currentUserID = this.msalService.instance.getActiveAccount().localAccountId;
//this.resourceadminservice.getTeamByPortfolio().then(res => {
    this.apiService.getfilterlist().then(res => {
      this.auth.lookupMaster().then((lookup: any) => {
      console.log(res)
      this.functions = lookup.filter(x => x.lookUpParentId == '689b87da-1140-446b-82a9-fb71801916b6')
      this.functions.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      console.log(this.functions)

      this.functions = this.functions.map(func => ({
        ...func,
        departments: lookup.filter(x => x.lookUpParentId == func.lookUpId)
    }));
      this.portfolioOwner = res
      this.portfolioOwnerList = this.portfolioOwner.portfolioOwner;
      console.log(this.functions)
            this.portfolioOwnerList = this.portfolioOwnerList.filter(po => {

            return po.resourceMgrAdId == currentUserID;
        });
            console.log(this.portfolioOwnerList)
      })
    })
   // })
    this.viewContent = true;
  }


  setupFormSubscriptions() {
    this.RMForm.get('managingPortfolio').valueChanges.subscribe(selectedPortfolio => {
      if (selectedPortfolio) {
        this.resourceadminservice.getTeamByPortfolio(selectedPortfolio).then(res => {
          this.updateFunctionsBasedOnPortfolio(res);
        });
      } else {
        this.functions = [];
      }
    });
  }
  
  updateFunctionsBasedOnPortfolio(data: any) {
    this.functions.forEach(func => {
      func.departments.forEach(dept => {
        const teams = data.teams.filter(team => team.departmentId === dept.lookUpId);
        dept.teams = teams;
        dept.selected = teams.length > 0;
      });
      func.selected = func.departments.length > 0;
    });
  }
  

  editTeam() {
    
  }

  toggleFunction(func: any) {
    // Logic to handle the toggle
    func.selected = !func.selected;
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
