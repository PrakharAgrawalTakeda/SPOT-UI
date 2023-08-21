import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { PortfolioApiService } from '../../portfolio-api.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { PortfolioCenterService } from '../../portfolio-center.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ForecastComponent {
  fundingRequests: any = []
  projectFunding:any = []
  id: string = ''
  ForecastForm = new FormGroup({
    ForecastType: new FormControl(null),
    Currency: new FormControl(null),
    PM: new FormControl(null),
  })
  showContent = false
  localCurrency: any = [];
  filterdata: any = []
  yearLabel: any = []
  CAPEXdata = []
  OPEXdata = []
  currencyList: any = []
  localCAPEX: any = []
  localOPEX: any = []
  forecastType = []
  temporaryHide = false
  showCurrency = false
  showEmail = false
  showDrawer = false
  @ViewChild('FxRateDrawer') FxRateDrawer: MatSidenav
  constructor(private portfoliService: PortfolioApiService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService
    , public fuseAlert: FuseConfirmationService, private router: Router, private titleService: Title, private auth: AuthService, public PortfolioCenterService: PortfolioCenterService) {
    this.ForecastForm.controls.PM.valueChanges.subscribe(res => {
      this.PortfolioCenterService.isFormChanged = true
    })
    this.ForecastForm.controls.ForecastType.valueChanges.subscribe((res: any) => {
      if (this.showContent) {
        console.log(res)
        this.showContent = false;
        if (res.lookUpName == "CapEx Forecast") {
          this.fundingRequests = this.CAPEXdata
        }
        else {
          this.fundingRequests = this.OPEXdata
        }
        this.showContent = true
      }
    })
    this.ForecastForm.controls.PM.valueChanges.subscribe((res: any) => {
      if (this.showContent) {
        if (res.length == 0) {
          this.showEmail = true
        }
        else {
          this.showEmail = false
        }
      }
    })
    this.ForecastForm.controls.Currency.valueChanges.subscribe((res: any) => {
      if (this.showContent) {
        console.log(res)
        this.showContent = false;
        if (res.name == "OY") {
          if (this.ForecastForm.controls.ForecastType.value.lookUpName == "CapEx Forecast") {
            this.fundingRequests = this.CAPEXdata
          }
          else {
            this.fundingRequests = this.OPEXdata
          }
        }
        else {
          if (this.ForecastForm.controls.ForecastType.value.lookUpName == "CapEx Forecast") {
            this.fundingRequests = this.localCAPEX
          }
          else {
            this.fundingRequests = this.localOPEX
          }
        }
        this.showContent = true
      }
    })
  }
  ngOnInit(): void {
    // this.titleService.setTitle("Project Forecast")
    this.filterdata = this.PortfolioCenterService.all;
    console.log(this.ForecastForm)
    this.dataloader()
  }

  dataloader() {
    console.log(this.filterdata)
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.auth.lookupMaster().then((lookup: any) => {
      this.portfoliService.getLocalCurrency().then(currency => {
        this.portfoliService.getForecastData(this.filterdata).then((forecastData: any) => {
          this.forecastType = lookup.filter(x => x.lookUpParentId == 'bc786c6a-8f23-4161-9f2a-67e1897295c7')
          if (this.ForecastForm.controls.ForecastType.value == null) {
            this.ForecastForm.patchValue({
              ForecastType: this.forecastType.filter(x => x.lookUpId == 'ec313be6-353d-413b-9805-b7519f2ede18')[0]
            })
          }
          // this.ForecastForm.patchValue({
          //   PM: null
          // })
          this.currencyList = []
          forecastData.currencies.forEach(response => {
            this.currencyList.push({ name: response })
          })
          this.showCurrency = this.currencyList.length > 1
          var index = 0
          if (this.currencyList.length > 1) {
            if (this.currencyList[0].name == "OY") {
              if (this.ForecastForm.controls.Currency.value == null) {
                this.ForecastForm.patchValue({
                  Currency: this.currencyList[0]
                })
              }
              index = 1
            }
            else {
              if (this.ForecastForm.controls.Currency.value == null) {
                this.ForecastForm.patchValue({
                  Currency: this.currencyList[1]
                })
              }
            }
            var val = "CapExForecast|" + this.currencyList[index].name
            var val1 = "OpExForecast|" + this.currencyList[index].name
            this.localCAPEX = forecastData.forecastTableItems[val]
            this.localOPEX = forecastData.forecastTableItems[val1]
          }
          this.CAPEXdata = forecastData.forecastTableItems["CapExForecast|OY"]
          this.OPEXdata = forecastData.forecastTableItems["OpExForecast|OY"]
          this.fundingRequests = forecastData.forecastTableItems["CapExForecast|OY"]
          this.projectFunding = forecastData.forecastProjectItems.CapExForecast
          this.projectFunding.sort((a, b) => {
            return (a.problemID < b.problemID ? -1 : a.problemID == b.problemID ? 0 : 1);
          })
          this.yearLabel.currentYear = forecastData.yearLabels.FY
          this.yearLabel.NextYear = forecastData.yearLabels["FY+1"]
          this.yearLabel.Y1 = forecastData.yearLabels["FY+2"]
          this.yearLabel.Y2 = forecastData.yearLabels["FY+3"]
          this.yearLabel.Y3 = forecastData.yearLabels["FY+4"]
          this.yearLabel.Y4 = forecastData.yearLabels["5+"]
          this.localCurrency = currency
          this.showContent = true
        })
      })
    })
  }
  openDrawer() {
    this.showDrawer = true
    this.FxRateDrawer.toggle()
  }
  getBlue(): any {
    return ' blue';
  }
  ApplyFilter(){
    var index = 0
    var append = false
    if (this.ForecastForm.controls.PM.value){
    if (this.ForecastForm.controls.PM.value.length == 0) {
      this.filterdata = this.PortfolioCenterService.all;
    }
    else {
      for (var z = 0; z < this.filterdata.filterGroups.length;z++){
        if (this.filterdata.filterGroups[z].filterItems[0].filterAttribute == "ProjectTeamMember"){
          index = z
          append = true
        }
      }
      var filterItems = []
      var filterGroups = []
      for (var i = 0; i < this.ForecastForm.controls.PM.value.length;i++){
        var filterItems1 =
        {
          "filterAttribute": "ProjectTeamMember",
          "filterOperator": "=",
          "filterValue": this.ForecastForm.controls.PM.value[i].userAdid,
          "unionOperator": 2
        }
        if(append == true){
          this.filterdata.filterGroups[index].filterItems.push(filterItems1)
        }
        else{
          filterItems.push(filterItems1)
        }
      }
      if (append == false) {
        filterGroups.push({
          filterItems,
          "groupCondition": 0
        })
        this.filterdata.filterGroups.push(filterGroups[0])
      }
      console.log(this.filterdata)
    }
  }
  else{
      this.filterdata = this.PortfolioCenterService.all;
  }
  this.dataloader()
  }
  OpenProject(projectName) {
    this.projectFunding.forEach((item) => {
      if (item.projectName == projectName) {
        window.open('/project-hub/' + item.projectID + '/budget', "_blank")
      }
    })
  }

  MailTo(){
    var mailID = ""
    for(var i=0;i<this.ForecastForm.controls.PM.value.length;i++){
      var name = this.ForecastForm.controls.PM.value[i].userDisplayName.split(',')
      if(mailID == ""){
        mailID=name[1]+'.'+name[0]+'@takeda.com'
      }
      else{
        mailID = mailID + ',' + name[1] + '.' + name[0] + '@takeda.com'
      }
    }
    window.location.href = "mailto:" + mailID +"?Subject=SPOT Project Management – Forecast / Budget Updates";
  }
}
