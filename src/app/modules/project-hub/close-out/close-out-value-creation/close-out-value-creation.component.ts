import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';

@Component({
  selector: 'app-close-out-value-creation',
  templateUrl: './close-out-value-creation.component.html',
  styleUrls: ['./close-out-value-creation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CloseOutValueCreationComponent implements OnInit {
  ValueCaptureForm = new FormGroup({
    valueCaptureStart: new FormControl(''),
    primaryValueDriver: new FormControl(''),
    valueCommentary: new FormControl('')
  })
  @Input() optionType: 'recommended-option'
  localCurrency: string = ""
  valuecreationngxdata: any = []
  viewContent:boolean = false
  id:string = ""
  lookupData = []
  filterData:any = []
  kpi= []
  columnYear = []
  yearData = []
  @ViewChild('valuecreationTable') table: any;
  constructor(public projectApiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public auth: AuthService,public indicator: SpotlightIndicatorsService,
    private portApiService: PortfolioApiService){

  }
  ngOnInit():void{
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    if(this.optionType == 'recommended-option')
    {
      this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id")
    }
    this.projectApiService.getMetricProjectData(this.id).then((res: any) => {
      this.auth.lookupMaster().then((resp: any) => {
        this.projectApiService.getfilterlist().then(filterres => {
          this.auth.KPIMaster().then((kpi: any) => {
            this.portApiService.getOnlyLocalCurrency(this.id).then((currency: any) => {
            this.kpi = kpi
          this.lookupData = resp
          this.filterData = filterres
          console.log(res.projectsMetricsData)
          this.localCurrency = currency.localCurrencyAbbreviation
          res.projectsMetricsData.forEach((element)=>{
                element.metricCategoryId = null
                element.metricName = ""
                element.helpText = ""
                element.metricPortfolioID = null
                element.metricUnit = ""
                element.metricTypeID = null
                element.metricFormat = ""
                element.FianncialType1 = "Target"
                element.FianncialType2 = "Baseline Plan"
                element.FianncialType3 = "Current Plan"
                element.FianncialType4 = "Actual"
            res.allMetrics.forEach((el)=>{
              if(element.metricId == el.metricID){
                var format = el.metricFormatID ? this.lookupData.find(x => x.lookUpId == el.metricFormatID).lookUpName : ''
                element.metricCategoryId = el.metricCategoryID
                element.metricName = el.metricName
                element.helpText = el.helpText
                element.metricPortfolioID = el.metricPortfolioID
                element.metricUnit = el.metricUnit
                element.metricTypeID = el.metricTypeID
                element.metricFormat = format
                element.strategicTarget = element.strategicTarget ? element.strategicTarget : '0'
                element.strategicBaseline = element.strategicBaseline ? element.strategicBaseline : '0'
                element.strategicCurrent = element.strategicCurrent ? element.strategicCurrent : '0'
                element.strategicActual =element.strategicActual ? element.strategicActual : '0'
              }
            })
          })
          this.ValueCaptureForm.patchValue({
            valueCaptureStart: res.problemCapture.financialRealizationStartDate,
            primaryValueDriver: res.problemCapture.primaryKpi ? this.lookupData.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474').find(x => x.lookUpId == res.problemCapture.primaryKpi).lookUpName : '',
            valueCommentary: res.problemCapture.valueCommentary
          })
          var year = []
          var yearList=[]
          
          year = [...new Set(res.projectsMetricsDataYearly.map(item => item.financialYearId))]
          for(var i=0;i<year.length;i++){
            var yearName = year[i] ? this.lookupData.find(x => x.lookUpId == year[i]).lookUpName : ''
            this.columnYear.push({year: yearName})
            yearList.push(yearName)
          }
          yearList.sort()
          for(var i=0;i<res.projectsMetricsData.length;i++){
            for(var j=0;j<yearList.length;j++){
              res.projectsMetricsData[i][yearList[j]] = [{'target':"0",'baseline':"0",'actual':"0",'current':"0"}]
              if(res.projectsMetricsData[i].strategicBaselineList){
                var data = res.projectsMetricsData[i].strategicBaselineList.split(',')
                for(var z=0;z<data.length;z++){
                  var list = data[z].split(' ')
                  if(list[1].replace(':','') == yearList[j].replace(' 20','')){
                    res.projectsMetricsData[i][yearList[j]][0].baseline = list[2]
                  }
                }
              }
            }
          };
          this.compare(this.columnYear)
          this.valuecreationngxdata = res.projectsMetricsData
          //this.valuecreationngxdata.shift()
          // this.valuecreationngxdata = res.projectsMetricsDataYearly
          this.ValueCaptureForm.disable()
          this.viewContent = true
      })
    })
    })
  })
})
  }

  getLookup(id: any){
    return id && id.lookUpId != '' ? this.lookupData.find(x => x.lookUpId == id).lookUpName : ''
  }
  compare( array: any ): any {
    return array.length > 1 ? array.sort((a, b) => {
      if ( a.year < b.year ){
        return -1;
      }
      if ( a.year > b.year ){
        return 1;
      }
      return 0;
    }) : array
  }
  getOwner(id:any, type:any){
    if(type && type.lookupId != '' && id && id.lookUpId != ''){
      if(type == 'e7a9e055-1319-4a4f-b929-cd7777599e39'){
        return 'Global'
      }
      else{
        return this.filterData.portfolioOwner.find(x => x.portfolioOwnerId == id).portfolioOwner
      }
    }
    else{
      return ''
    }
  }
  getFrozenHeaderClassID(): any {
    return ' frozen-header-classID';
  }
  getFrozenHeaderClass(): any {
    return ' frozen-header-class';
  }
  getFrozenClass(): any {
    return ' frozen-header';
  }
  columnstyle(): any{
    return ' column-style';
  }
  getFrozenID(): any{
    return ' frozen-header-ID'
  }
}


// Status Id = 2A4E375B-B9F8-4647-B4CB-71268B52A938
// Category Id = 999572a6-5aa8-4760-8082-c06774a17474
// value capture = 243a9492-720d-42df-823e-ae7eb4d3ae45
// value capture = metric level id
// empty column = d3926d90-9fa9-4e3c-a7fb-667737739c43
// empty column = financialTypeId