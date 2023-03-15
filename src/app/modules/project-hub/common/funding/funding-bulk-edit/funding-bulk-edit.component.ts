import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-funding-bulk-edit',
  templateUrl: './funding-bulk-edit.component.html',
  styleUrls: ['./funding-bulk-edit.component.scss']
})
export class FundingBulkEditComponent {
  //@Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' = 'Normal'
  projectViewDetails: any = {}
  fundingDb = []
  submitObj = []
  viewContent: boolean = false
  FundingForm = new FormArray([])
  fundingEditStack = []
  editable: boolean = false
  id: string;
  fundingdata: any;
  fundingSourceData: any;
  lookupdata: any;
  localcurrency: any;
  Amount: any;
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService,
    public fuseAlert: FuseConfirmationService, private _Activatedroute: ActivatedRoute, public indicator: SpotlightIndicatorsService, private router: Router,
    private portApiService: PortfolioApiService) {
    this.FundingForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.changeChecker()
        if (JSON.stringify(this.submitObj) == JSON.stringify(this.fundingDb)) {
          this.projecthubservice.isFormChanged = false
        }
        else {
          this.projecthubservice.isFormChanged = true
        }
      }
    })

  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getCostFunding(this.projecthubservice.projectid).then((res: any) => {
      this.portApiService.getfilterlist().then((po: any) => {
        this.auth.lookupMaster().then((resp: any) => {
          this.lookupdata = resp
          this.localcurrency = res.localCurrency
           this.Amount = this.localcurrency.localCurrencyAbbreviation
        console.log(this.projecthubservice.projectid)
        this.fundingSourceData = po
    //this.apiService.getprojectviewdata(this.projecthubservice.projectid).then((res: any) => {
      this.fundingdata = res.fundingData
      
      console.log(this.fundingdata)
      if(this.fundingdata != null)
       {
      // for (var i of this.fundingdata) {
      //   i.kpiname = this.projecthubservice.kpiMasters.find(x => x.kpiid == i.kpiid) ? this.projecthubservice.kpiMasters.find(x => x.kpiid == i.kpiid).kpiname : ''
      // }
      
      for (var i of this.fundingdata) {
          i.fundingSourceName = i.fundingSourceId ? po.portfolioOwner.find(x => x.portfolioOwnerId == i.fundingSourceId).portfolioOwner : ''
      }
      this.fundingdata = this.sortbyFundingSourceName(this.fundingdata)
      for (var i of this.fundingdata) {
        this.fundingDb.push(i)
          console.log(i)
          
        this.FundingForm.push(new FormGroup({
          
          fundingAmount: new FormControl(i.fundingAmount),
          fundingAmountFxconv: new FormControl(this.fundingdata.fundingAmountFxconv),
          fundingIntheplan: new FormControl(i.fundingIntheplan),
          fundingNotes: new FormControl(i.fundingNotes),
          fundingSourceId: new FormControl(i.fundingSourceId),
          includeInCharter: new FormControl(i.includeInCharter),
          fundingSourceName: new FormControl(i.fundingSourceName),
          fundingTypeId: new FormControl(i.fundingTypeId),
          fundingUniqueId: new FormControl(i.fundingUniqueId),
          includeInBusinessCase: new FormControl(this.fundingdata.includeInBusinessCase),
          projectId: new FormControl(this.projecthubservice.projectid)
        }))
        //this.fundingdata = this.sortbyFundingSourceName(this.fundingdata)
      }
    }
    
        
      this.disabler()
      this.viewContent = true
  })
    })
    })
  }

  sortbyFundingSourceName(array: any): any {
    return array.length > 1 ? array.sort((a, b) => {
      if (a.fundingSourceName === null) {
        return -1;
      }

      if (b.fundingSourceName === null) {
        return 1;
      }

      if (a.fundingSourceName === b.fundingSourceName) {
        return 0;
      }

      return a.fundingSourceName < b.fundingSourceName ? -1 : 1;
    }) : array
  }

  getfundingtype(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == 'b127f31e-aeae-4940-ba32-ddd0d4e5287b').sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
    })
}
getfundingintheplan(): any {
  return this.lookupdata.filter(x => x.lookUpParentId == 'c58fb456-3901-4677-9ec5-f4eada7158e6').sort((a, b) => {
      return b.lookUpOrder - a.lookUpOrder;
  })
}

getPO(): string {
    return this.fundingSourceData ? this.fundingSourceData.portfolioOwner.filter(x => x.isPortfolioOwner == true) : ''
  }
  // getIndicator(status: string): string {
  //   if (status == "91F35D36-B94B-44C7-9234-4AE76DB19DBB") {
  //     return 'Red'
  //   }
  //   else if (status == "7DFAAEDF-AB1C-4348-91B3-F2FE1C78237A") {
  //     return 'Yellow'
  //   }
  //   else if (status == "B12BD411-EBC7-4CC0-A8C4-5F41B8C5FC17") {
  //     return 'Green'
  //   }
  //   return 'Grey'
  // }
  getSource(source: string): string {
    return source ? this.fundingSourceData.portfolioOwner.find(x => x.portfolioOwnerId == source).portfolioOwner : ''
  }
  disabler() {
    var formValue = this.FundingForm.getRawValue()
    if (formValue.length > 0) {

      if (formValue.filter(x => x.includeInCharter == true).length < 3) {
        for (var i of this.FundingForm.controls) {
          i['controls']['includeInCharter'].enable()
        }
      }
      else {
        for (var i of this.FundingForm.controls) {
          if (i['controls']['includeInCharter'].value != true) {
            i['controls']['includeInCharter'].disable()
          }
        }
      }
    }
  }


  changeChecker() {
    var formValue = this.FundingForm.getRawValue()
    formValue.length > 0 ? this.submitObj = formValue.map(x => {
      return {
        fundingAmount: parseInt(x.fundingAmount),
          fundingAmountFxconv: x.fundingAmountFxconv == "" || x.fundingAmountFxconv == " " ? null :x.fundingAmountFxconv,
          fundingIntheplan: x.fundingIntheplan,
          fundingNotes: x.fundingNotes,
          fundingSourceId: x.fundingSourceId,
          includeInCharter: x.includeInCharter,
          fundingSourceName: x.fundingSourceName,
          fundingTypeId: x.fundingTypeId,
          fundingUniqueId: x.fundingUniqueId,
          includeInBusinessCase: x.includeInBusinessCase,
          projectId: x.projectId
      }
    }) : this.submitObj = []
  }
  //Table Edit
  fundingTableEditRow(row: number) {
      if (!this.fundingEditStack.includes(row)) {
        this.fundingEditStack.push(row)
      }
    
  }
  deleteFunding(rowIndex: number) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you Sure?",
      "message": "Are you sure you want to Delete this Record? ",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Remove",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const fundingAlert = this.fuseAlert.open(comfirmConfig)
    fundingAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.fundingdata.splice(rowIndex, 1)
        this.FundingForm.removeAt(rowIndex)
        if (this.fundingEditStack.includes(rowIndex)) {
          this.fundingEditStack.splice(this.fundingEditStack.indexOf(rowIndex), 1)
        }
        this.fundingEditStack = this.fundingEditStack.map(function (value) {
          return value > rowIndex ? value - 1 : value;
        })
        this.disabler()
        this.fundingdata = [...this.fundingdata]
      }
    })
  }
  addFunding() {
    {
      var j = [{
        fundingAmount: 0,
          fundingAmountFxconv: '',
          fundingIntheplan: '',
          fundingNotes: '',
          fundingSourceId: '',
          includeInCharter: '',
          fundingSourceName: '',
          fundingTypeId: '',
          fundingUniqueId: '',
          includeInBusinessCase: '',
          projectId: ''
      }]
      this.FundingForm.push(new FormGroup({
        fundingAmount: new FormControl(0),
          fundingAmountFxconv: new FormControl(''),
          fundingIntheplan: new FormControl(false),
          fundingNotes: new FormControl(''),
          fundingSourceId: new FormControl(''),
          includeInCharter: new FormControl(false),
          fundingSourceName: new FormControl(''),
          fundingTypeId: new FormControl(''),
          fundingUniqueId: new FormControl(''),
          includeInBusinessCase: new FormControl(false),
          projectId: new FormControl(this.projecthubservice.projectid)

        
      }))
      this.fundingdata = [...this.fundingdata, ...j]
      this.disabler()
      this.fundingEditStack.push(this.fundingdata.length - 1)
      var div = document.getElementsByClassName('datatable-scroll')[0]
      setTimeout(() => {
        div.scroll({
          top: div.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
  submitFunding() {
    this.changeChecker()
    console.log(this.submitObj)
    console.log(this.fundingDb)
    if (JSON.stringify(this.submitObj) == JSON.stringify(this.fundingDb)) {
      this.projecthubservice.toggleDrawerOpen('', '', [], '', true)
    }
    else {
      this.apiService.bulkeditFunding(this.submitObj, this.projecthubservice.projectid).then(resp => {
        this.projecthubservice.isFormChanged = false
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.successSave.next(true)
        this.projecthubservice.toggleDrawerOpen('', '', [], '', true)
      })
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  numberWithDecimal(x) {
    return x.toString().replace(/^\d*\.?\d{0,2}$/g);
  }
  
}
