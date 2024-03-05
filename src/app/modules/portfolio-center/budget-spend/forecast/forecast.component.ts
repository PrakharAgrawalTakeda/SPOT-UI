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
  projectCAPEXdata:any = []
  projectOPEXdata: any = []
  forecastType = []
  temporaryHide = false
  showCurrency = false
  showEmail = false
  showDrawer = false
  sortDir = ""
  sortDirID = ""
  sortDirPN = ""
  sortDirPM = ""
  sortDirLC = ""
  sortDirHis = ""
  sortDirapr = ""
  sortDirmay = ""
  sortDirjun = ""
  sortDirjul = ""
  sortDiraug = ""
  sortDirsep = ""
  sortDiroct = ""
  sortDirnov = ""
  sortDirdec = ""
  sortDirjan = ""
  sortDirfeb = ""
  sortDirmar = ""
  sortDirAT = ""
  sortDiraprY1 = ""
  sortDirmayY1 = ""
  sortDirjunY1 = ""
  sortDirjulY1 = ""
  sortDiraugY1 = ""
  sortDirsepY1 = ""
  sortDiroctY1 = ""
  sortDirnovY1 = ""
  sortDirdecY1 = ""
  sortDirjanY1 = ""
  sortDirfebY1 = ""
  sortDirmarY1 = ""
  sortDirATY1 = ""
  sortDiry2 = ""
  sortDiry3 = ""
  sortDiry4 = ""
  sortDiry5 = ""
  sortDirCT = ""
  sortDirSN = ""
  sortDirLS = ""
  sortDiractive = ""
  @ViewChild('FxRateDrawer') FxRateDrawer: MatSidenav
  forecastData: any;
  hidePlan: boolean = false;
  constructor(private portfoliService: PortfolioApiService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService
    , public fuseAlert: FuseConfirmationService, private router: Router, private titleService: Title, private auth: AuthService, public PortfolioCenterService: PortfolioCenterService) {
    this.ForecastForm.valueChanges.subscribe(res => {
      if (this.showContent) {
      this.PortfolioCenterService.isFormChanged = true
      }
    })
    this.ForecastForm.controls.ForecastType.valueChanges.subscribe((res: any) => {
      if (this.showContent) {
        console.log(res)
        this.showContent = false;
        if (res.lookUpName == "CapEx Forecast" && this.forecastData.forecastProjectItems && this.forecastData.forecastProjectItems.CapExForecast) {
          this.hidePlan = false
          this.fundingRequests = this.CAPEXdata
          this.projectFunding = this.projectCAPEXdata
          console.log(this.fundingRequests)
          console.log(this.projectFunding)
        }
        else if(res.lookUpName == "CapEx Forecast" && this.forecastData.forecastProjectItems && !this.forecastData.forecastProjectItems.CapExForecast)
        {
          this.hidePlan = true
          this.projectFunding = this.projectCAPEXdata
        }
        else {
          this.hidePlan = false
          this.fundingRequests = this.OPEXdata
          this.projectFunding = this.projectOPEXdata
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
          if (this.ForecastForm.controls.ForecastType.value.lookUpName == "CapEx Forecast"  && this.forecastData.forecastProjectItems.CapExForecast) {
            this.fundingRequests = this.CAPEXdata
            this.hidePlan = false
          }
          else if (this.ForecastForm.controls.ForecastType.value.lookUpName == "CapEx Forecast"  && !this.forecastData.forecastProjectItems.CapExForecast) {
            //this.fundingRequests = this.CAPEXdata
            this.hidePlan = true
          }
          else {
            this.hidePlan = false
            this.fundingRequests = this.OPEXdata
          }
        }
        else {
          if (this.ForecastForm.controls.ForecastType.value.lookUpName == "CapEx Forecast"  && this.forecastData.forecastProjectItems.CapExForecast) {
            this.fundingRequests = this.localCAPEX
            this.hidePlan = false
          }
          else if (this.ForecastForm.controls.ForecastType.value.lookUpName == "CapEx Forecast"  && !this.forecastData.forecastProjectItems.CapExForecast) {
            this.hidePlan = true
          }
          else {
            this.hidePlan = false
            this.fundingRequests = this.localOPEX
          }
        }
        this.showContent = true
      }
    })
  }
  ngOnInit(): void {
    this.filterdata = JSON.parse(JSON.stringify(this.PortfolioCenterService.all))
    console.log(this.ForecastForm)
    this.dataloader()
  }

  dataloader() {
    console.log(this.filterdata)
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.auth.lookupMaster().then((lookup: any) => {
      this.portfoliService.getLocalCurrency().then(currency => {
        this.portfoliService.getForecastData(this.filterdata).then((forecastData: any) => {
          //debugger
          this.forecastType = lookup.filter(x => x.lookUpParentId == 'bc786c6a-8f23-4161-9f2a-67e1897295c7')
          if (this.ForecastForm.controls.ForecastType.value == null) {
            this.ForecastForm.patchValue({
              ForecastType: this.forecastType.filter(x => x.lookUpId == 'ec313be6-353d-413b-9805-b7519f2ede18')[0]
            })
          }
          console.log(this.ForecastForm.controls.ForecastType.value.lookUpName)

          this.forecastData = forecastData
          console.log(forecastData)
          if(this.forecastData.forecastProjectItems && this.ForecastForm.controls.ForecastType.value.lookUpName == 'CapEx Forecast' && this.forecastData.forecastProjectItems.CapExForecast)
          {
            //this.fundingRequests = this.CAPEXdata
            this.hidePlan = false
          }
          else if(this.forecastData.forecastProjectItems && this.ForecastForm.controls.ForecastType.value.lookUpName == 'CapEx Forecast' && !this.forecastData.forecastProjectItems.CapExForecast)
          {
            //this.fundingRequests = this.CAPEXdata
            this.hidePlan = true
          }
          else{
            this.hidePlan = false
          }
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
          else{
            this.ForecastForm.patchValue({
              Currency: this.currencyList[0]
            })
          }
          if(forecastData.forecastTableItems != null){
            this.CAPEXdata = forecastData.forecastTableItems["CapExForecast|OY"]
            this.OPEXdata = forecastData.forecastTableItems["OpExForecast|OY"]
            this.fundingRequests = forecastData.forecastTableItems["CapExForecast|OY"]
            if (forecastData.forecastProjectItems.CapExForecast != undefined){
              this.projectCAPEXdata = forecastData.forecastProjectItems.CapExForecast
              this.projectFunding = forecastData.forecastProjectItems.CapExForecast
            }
            if (forecastData.forecastProjectItems.OpExForecast != undefined) {
              this.projectOPEXdata = forecastData.forecastProjectItems.OpExForecast
            }
            
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
          }
          this.showContent = true
        })
      })
    })
  }
  openDrawer() {
    this.showDrawer = true
    this.FxRateDrawer.toggle()
  }
  
  ApplyFilter(){
    this.PortfolioCenterService.isFormChanged = false
    const originalData = JSON.parse(JSON.stringify(this.filterdata))
    var index = 0
    var append = false
    if (this.ForecastForm.controls.PM.value){
    if (this.ForecastForm.controls.PM.value.length == 0) {
      this.ngOnInit()
    }
    else {
      for (var z = 0; z < originalData.filterGroups.length;z++){
        if (originalData.filterGroups[z].filterItems[0].filterAttribute == "ProjectTeamMember"){
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
          originalData.filterGroups[index].filterItems.push(filterItems1)
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
        originalData.filterGroups.push(filterGroups[0])
      }
      this.filterdata = originalData
      this.dataloader()
    }
  }
  else{
      this.ngOnInit()
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
  sortasc(columnName) {
    if(columnName == "capitalBudgetID"){
      if (this.sortDir == "" || this.sortDir == "desc") {
        return this.sortDir = "asc"
      }
      else if (this.sortDir == "asc") {
        return this.sortDir = "desc"
      }
    }
    else if(columnName == "problemID"){
      if (this.sortDirID == "" || this.sortDirID == "desc") {
        return this.sortDirID = "asc"
      }
      else if (this.sortDirID == "asc") {
        return this.sortDirID = "desc"
      }
    }
    else if(columnName == "projectName"){
      if (this.sortDirPN == "" || this.sortDirPN == "desc") {
        return this.sortDirPN = "asc"
      }
      else if (this.sortDirPN == "asc") {
        return this.sortDirPN = "desc"
      }
    }
    else if(columnName == "pm"){
      if (this.sortDirPM == "" || this.sortDirPM == "desc") {
        return this.sortDirPM = "asc"
      }
      else if (this.sortDirPM == "asc") {
        return this.sortDirPM = "desc"
      }
    }
    else if(columnName == "localCurrencyAbbreviation"){
      if (this.sortDirLC == "" || this.sortDirLC == "desc") {
        return this.sortDirLC = "asc"
      }
      else if (this.sortDirLC == "asc") {
        return this.sortDirLC = "desc"
      }
    }
    else if(columnName == "historical"){
      if (this.sortDirHis == "" || this.sortDirHis == "desc") {
        return this.sortDirHis = "asc"
      }
      else if (this.sortDirHis == "asc") {
        return this.sortDirHis = "desc"
      }
    }
    else if(columnName == "apr"){
      if (this.sortDirapr == "" || this.sortDirapr == "desc") {
        return this.sortDirapr = "asc"
      }
      else if (this.sortDirapr == "asc") {
        return this.sortDirapr = "desc"
      }
    }
    else if(columnName == "may"){
      if (this.sortDirmay == "" || this.sortDirmay == "desc") {
        return this.sortDirmay = "asc"
      }
      else if (this.sortDirmay == "asc") {
        return this.sortDirmay = "desc"
      }
    }
    else if(columnName == "jun"){
      if (this.sortDirjun == "" || this.sortDirjun == "desc") {
        return this.sortDirjun = "asc"
      }
      else if (this.sortDirjun == "asc") {
        return this.sortDirjun = "desc"
      }
    }
    else if(columnName == "jul"){
      if (this.sortDirjul == "" || this.sortDirjul == "desc") {
        return this.sortDirjul = "asc"
      }
      else if (this.sortDirjul == "asc") {
        return this.sortDirjul = "desc"
      }
    }
    else if(columnName == "aug"){
      if (this.sortDiraug == "" || this.sortDiraug == "desc") {
        return this.sortDiraug = "asc"
      }
      else if (this.sortDiraug == "asc") {
        return this.sortDiraug = "desc"
      }
    }
    else if(columnName == "sep"){
      if (this.sortDirsep == "" || this.sortDirsep == "desc") {
        return this.sortDirsep = "asc"
      }
      else if (this.sortDirsep == "asc") {
        return this.sortDirsep = "desc"
      }
    }
    else if(columnName == "oct"){
      if (this.sortDiroct == "" || this.sortDiroct == "desc") {
        return this.sortDiroct = "asc"
      }
      else if (this.sortDiroct == "asc") {
        return this.sortDiroct = "desc"
      }
    }
    else if(columnName == "nov"){
      if (this.sortDirnov == "" || this.sortDirnov == "desc") {
        return this.sortDirnov = "asc"
      }
      else if (this.sortDirnov == "asc") {
        return this.sortDirnov = "desc"
      }
    }
    else if(columnName == "dec"){
      if (this.sortDirdec == "" || this.sortDirdec == "desc") {
        return this.sortDirdec = "asc"
      }
      else if (this.sortDirdec == "asc") {
        return this.sortDirdec = "desc"
      }
    }
    else if(columnName == "jan"){
      if (this.sortDirjan == "" || this.sortDirjan == "desc") {
        return this.sortDirjan = "asc"
      }
      else if (this.sortDirjan == "asc") {
        return this.sortDirjan = "desc"
      }
    }
    else if(columnName == "feb"){
      if (this.sortDirfeb == "" || this.sortDirfeb == "desc") {
        return this.sortDirfeb = "asc"
      }
      else if (this.sortDirfeb == "asc") {
        return this.sortDirfeb = "desc"
      }
    }
    else if(columnName == "mar"){
      if (this.sortDirmar == "" || this.sortDirmar == "desc") {
        return this.sortDirmar = "asc"
      }
      else if (this.sortDirmar == "asc") {
        return this.sortDirmar = "desc"
      }
    }
    else if(columnName == "annualTotal"){
      if (this.sortDirAT == "" || this.sortDirAT == "desc") {
        return this.sortDirAT = "asc"
      }
      else if (this.sortDirAT == "asc") {
        return this.sortDirAT = "desc"
      }
    }
    else if(columnName == "aprY1"){
      if (this.sortDiraprY1 == "" || this.sortDiraprY1 == "desc") {
        return this.sortDiraprY1 = "asc"
      }
      else if (this.sortDiraprY1 == "asc") {
        return this.sortDiraprY1 = "desc"
      }
    }
    else if(columnName == "mayY1"){
      if (this.sortDirmayY1 == "" || this.sortDirmayY1 == "desc") {
        return this.sortDirmayY1 = "asc"
      }
      else if (this.sortDirmayY1 == "asc") {
        return this.sortDirmayY1 = "desc"
      }
    }
    else if(columnName == "junY1"){
      if (this.sortDirjunY1 == "" || this.sortDirjunY1 == "desc") {
        return this.sortDirjunY1 = "asc"
      }
      else if (this.sortDirjunY1 == "asc") {
        return this.sortDirjunY1 = "desc"
      }
    }
    else if(columnName == "julY1"){
      if (this.sortDirjulY1 == "" || this.sortDirjulY1 == "desc") {
        return this.sortDirjulY1 = "asc"
      }
      else if (this.sortDirjulY1 == "asc") {
        return this.sortDirjulY1 = "desc"
      }
    }
    else if(columnName == "augY1"){
      if (this.sortDiraugY1 == "" || this.sortDiraugY1 == "desc") {
        return this.sortDiraugY1 = "asc"
      }
      else if (this.sortDiraugY1 == "asc") {
        return this.sortDiraugY1 = "desc"
      }
    }
    else if(columnName == "sepY1"){
      if (this.sortDirsepY1 == "" || this.sortDirsepY1 == "desc") {
        return this.sortDirsepY1 = "asc"
      }
      else if (this.sortDirsepY1 == "asc") {
        return this.sortDirsepY1 = "desc"
      }
    }
    else if(columnName == "octY1"){
      if (this.sortDiroctY1 == "" || this.sortDiroctY1 == "desc") {
        return this.sortDiroctY1 = "asc"
      }
      else if (this.sortDiroctY1 == "asc") {
        return this.sortDiroctY1 = "desc"
      }
    }
    else if(columnName == "novY1"){
      if (this.sortDirnovY1 == "" || this.sortDirnovY1 == "desc") {
        return this.sortDirnovY1 = "asc"
      }
      else if (this.sortDirnovY1 == "asc") {
        return this.sortDirnovY1 = "desc"
      }
    }
    else if(columnName == "decY1"){
      if (this.sortDirdecY1 == "" || this.sortDirdecY1 == "desc") {
        return this.sortDirdecY1 = "asc"
      }
      else if (this.sortDirdecY1 == "asc") {
        return this.sortDirdecY1 = "desc"
      }
    }
    else if(columnName == "janY1"){
      if (this.sortDirjanY1 == "" || this.sortDirjanY1 == "desc") {
        return this.sortDirjanY1 = "asc"
      }
      else if (this.sortDirjanY1 == "asc") {
        return this.sortDirjanY1 = "desc"
      }
    }
    else if(columnName == "febY1"){
      if (this.sortDirfebY1 == "" || this.sortDirfebY1 == "desc") {
        return this.sortDirfebY1 = "asc"
      }
      else if (this.sortDirfebY1 == "asc") {
        return this.sortDirfebY1 = "desc"
      }
    }
    else if(columnName == "marY1"){
      if (this.sortDirmarY1 == "" || this.sortDirmarY1 == "desc") {
        return this.sortDirmarY1 = "asc"
      }
      else if (this.sortDirmarY1 == "asc") {
        return this.sortDirmarY1 = "desc"
      }
    }
    else if(columnName == "annualTotalY1"){
      if (this.sortDirATY1 == "" || this.sortDirATY1 == "desc") {
        return this.sortDirATY1 = "asc"
      }
      else if (this.sortDirATY1 == "asc") {
        return this.sortDirATY1 = "desc"
      }
    }
    else if(columnName == "y2"){
      if (this.sortDiry2 == "" || this.sortDiry2 == "desc") {
        return this.sortDiry2 = "asc"
      }
      else if (this.sortDiry2 == "asc") {
        return this.sortDiry2 = "desc"
      }
    }
    else if(columnName == "y3"){
      if (this.sortDiry3 == "" || this.sortDiry3 == "desc") {
        return this.sortDiry3 = "asc"
      }
      else if (this.sortDiry3 == "asc") {
        return this.sortDiry3 = "desc"
      }
    }
    else if(columnName == "y4"){
      if (this.sortDiry4 == "" || this.sortDiry4 == "desc") {
        return this.sortDiry4 = "asc"
      }
      else if (this.sortDiry4 == "asc") {
        return this.sortDiry4 = "desc"
      }
    }
    else if(columnName == "y5"){
      if (this.sortDiry5 == "" || this.sortDiry5 == "desc") {
        return this.sortDiry5 = "asc"
      }
      else if (this.sortDiry5 == "asc") {
        return this.sortDiry5 = "desc"
      }
    }
    else if(columnName == "cumulativeTotal"){
      if (this.sortDirCT == "" || this.sortDirCT == "desc") {
        return this.sortDirCT = "asc"
      }
      else if (this.sortDirCT == "asc") {
        return this.sortDirCT = "desc"
      }
    }
    else if(columnName == "submittedByName"){
      if (this.sortDirSN == "" || this.sortDirSN == "desc") {
        return this.sortDirSN = "asc"
      }
      else if (this.sortDirSN == "asc") {
        return this.sortDirSN = "desc"
      }
    }
    else if(columnName == "lastSubmitted"){
      if (this.sortDirLS == "" || this.sortDirLS == "desc") {
        return this.sortDirLS = "asc"
      }
      else if (this.sortDirLS == "asc") {
        return this.sortDirLS = "desc"
      }
    }
    else if(columnName == "active"){
      if (this.sortDiractive == "" || this.sortDiractive == "desc") {
        return this.sortDiractive = "asc"
      }
      else if (this.sortDiractive == "asc") {
        return this.sortDiractive = "desc"
      }
    }
  }
}
