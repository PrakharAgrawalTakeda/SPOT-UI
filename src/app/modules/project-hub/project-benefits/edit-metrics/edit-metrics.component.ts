import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { AuthService } from 'app/core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { EventType } from "@azure/msal-browser";
import { MsalService } from "@azure/msal-angular";
import * as moment from "moment/moment";
import { DecimalPipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-metrics',
  templateUrl: './edit-metrics.component.html',
  styleUrls: ['./edit-metrics.component.scss'],
  providers: [DecimalPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditMetricsComponent implements OnInit, OnChanges {
  capexAvoidanceForm = new FormGroup({
    metricCategoryId: new FormControl(''),
    metricName: new FormControl(''),
    metricUnit: new FormControl(''),
    metricDescription: new FormControl(''),
    metricFormat: new FormControl(''),
    metricLevelId: new FormControl(''),
    statusId: new FormControl('')
  })
  id: string;
  lookupData: any;
  valuecreationngxdata: any[] = [];
  columnYear = []
  ptTableEditStack = []
  bulkEditFormArray = new FormArray([]);
  localCurrency: string = ""
  globalMinYear: number = Infinity;
  globalMaxYear: number = -Infinity;
  tempImpactForm = new FormGroup({
    temporaryImpact: new FormControl(false)
  })
  includeinForm = new FormGroup({
    toggleIncludeIn: new FormControl(false)
  })
  projectData: any;
  captureLevel: boolean = false
  vcLevel: any;
  disabled: boolean = false
  vcLevels = ["Capture", "Cascade"]
  status = ["On Track", "At Risk", "Will Not Meet"]
  metricData: any;
  isBaselined: boolean = false;
  result: any;
  viewContent = false
  requestBody: {
    metricData: any; projectsMetricsData: {
      // Other existing fields from projectsMetricsData
      projectId: any; metricId: any; statusId: any; metricLevelId: any; temporaryImpact: boolean;
      // Calculated values and lists
      strategicTarget: any; strategicBaseline: any; strategicCurrent: any; strategicActual: any; strategicTargetList: string; strategicBaselineList: string; strategicCurrentList: string; strategicActualList: string;
    }; projectsMetricsDataYearly: {
      projectId: any; metricId: any; financialYearId: string; financialTypeId: string; metricValue: any; // Ensure metricValue is a string
    }[]; isBaseLined: boolean;
  };
  metricFormat: any;

  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute,
    public indicator: SpotlightIndicatorsService, private portApiService: PortfolioApiService, public fuseAlert: FuseConfirmationService, private decimalPipe: DecimalPipe, private changeDetectorRef: ChangeDetectorRef) {
    // this.projecthubservice.submitbutton.subscribe(res => {
    //   if (res) {
    //     this.dataloader()
    //   }
    // })
    // this.projecthubservice.isNavChanged.subscribe(res => {
    //   if (res) {
    //     this.dataloader()
    //   }
    // })
    // this.FundingForm.valueChanges.subscribe(res => {
    //   if (this.viewContent) {
    //     this.changeChecker()
    //     if (JSON.stringify(this.submitObj) == JSON.stringify(this.fundingDb)) {
    //       this.projecthubservice.isFormChanged = false
    //     }
    //     else {
    //       this.projecthubservice.isFormChanged = true
    //     }
    //   }
    // })
    this.bulkEditFormArray.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (JSON.stringify(this.result) == JSON.stringify(this.requestBody)) {
          this.projecthubservice.isFormChanged = false;
        } else {
          this.projecthubservice.isFormChanged = true;
        }
      }
    })



  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    console.log(this.id)
    this.apiService.singleEditMetricProjectData(this.id, this.projecthubservice.itemid).then((res: any) => {
      this.apiService.getMetricProjectData(this.id).then((result: any) => {
        this.apiService.getproject(this.id).then((pc: any) => {
          this.auth.lookupMaster().then((resp: any) => {
            this.portApiService.getOnlyLocalCurrency(this.id).then((currency: any) => {
              if (res) {

                if (res && res.projectsMetricsData.metricLevelId == 'd6a905be-4ff9-402e-b074-028242b6f8e0') {
                  this.captureLevel = true
                }
                this.result = res
                console.log(res)
                console.log(currency)
                this.localCurrency = currency ? currency.localCurrencyAbbreviation : ''
                console.log(this.localCurrency)
                this.lookupData = resp
                this.metricData = res.metricData
                const element = res.projectsMetricsData;
                this.projectData = res.projectsMetricsData
                console.log(this.projectData)
                // element.metricLevelId= null;
                // element.metricName = "";
                // element.helpText = "";
                // element.metricPortfolioID = null;
                // element.metricUnit = "";
                // element.metricTypeID = null;
                // element.metricFormat = "";
                element.temporaryImpact = res.projectsMetricsData.temporaryImpact
                element.FianncialType1 = "Target"
                element.FianncialType2 = "Baseline Plan"
                element.FianncialType3 = "Current Plan"
                element.FianncialType4 = "Actual"
                console.log(element)
                const el = res.metricData;
                // res.metricData.forEach((el) => {
                if (element.metricId == el.metricID) {
                  var format = el.metricFormatID ? this.lookupData.find(x => x.lookUpId == el.metricFormatID).lookUpName : '';
                  element.metricCategoryId = el.metricCategoryID;
                  element.metricName = el.metricName;
                  element.helpText = el.helpText;
                  element.metricPortfolioID = el.metricPortfolioID;
                  element.metricUnit = el.metricUnit;
                  element.metricTypeID = el.metricTypeID;
                  element.metricFormat = format;
                  element.strategicTarget = element.strategicTarget ? element.strategicTarget : '0';
                  element.strategicBaseline = element.strategicBaseline ? element.strategicBaseline : '0';
                  element.strategicCurrent = element.strategicCurrent ? element.strategicCurrent : '0';
                  element.strategicActual = element.strategicActual ? element.strategicActual : '0';
                }
                //});

                console.log(res.projectsMetricsData)
                this.capexAvoidanceForm.patchValue({
                  metricName: res.projectsMetricsData.metricName,
                  metricCategoryId: this.lookupData.find(x => x.lookUpId == res.metricData.metricCategoryID).lookUpName,
                  metricUnit: res.projectsMetricsData.metricUnit,
                  metricDescription: res.metricData.metricDescription,
                  metricFormat: res.projectsMetricsData.metricFormat,
                  metricLevelId: this.lookupData.find(x => x.lookUpId == res.projectsMetricsData.metricLevelId) ? this.lookupData.find(x => x.lookUpId == res.projectsMetricsData.metricLevelId).lookUpName : null,
                  statusId: this.lookupData.find(x => x.lookUpId == res.projectsMetricsData.statusId) ? this.lookupData.find(x => x.lookUpId == res.projectsMetricsData.statusId).lookUpName : ''
                })


                if (this.capexAvoidanceForm.get('metricLevelId').value == 'Capture' || res.projectsMetricsData.metricLevelId == 'd6a905be-4ff9-402e-b074-028242b6f8e0') {
                  this.captureLevel = true
                }
                if (this.capexAvoidanceForm && this.captureLevel) {
                  // TODO: Doubt? Why is it disabled?
                  // this.capexAvoidanceForm.get('metricLevelId').disable();
                } else {
                  this.capexAvoidanceForm.get('statusId').disable();
                }
                this.tempImpactForm.patchValue({
                  temporaryImpact: (res.projectsMetricsData.temporaryImpact)
                });
                this.includeinForm.patchValue({
                  toggleIncludeIn: (res.projectsMetricsData.includePerformanceDashboard)
                });
                this.capexAvoidanceForm.get('metricCategoryId').disable();
                this.capexAvoidanceForm.get('metricName').disable();
                this.capexAvoidanceForm.get('metricUnit').disable();
                this.capexAvoidanceForm.get('metricDescription').disable();
                this.capexAvoidanceForm.get('metricFormat').disable();
                if (this.tempImpactForm && !this.captureLevel) {
                  this.tempImpactForm.get('temporaryImpact').disable();
                }
                console.log(this.status)
                console.log(this.capexAvoidanceForm.getRawValue())
                var year = []
                var yearList = []

                year = [...new Set(res.projectsMetricsDataYearly.map(item => item.financialYearId))]
                for (var i = 0; i < year.length; i++) {
                  var yearName = year[i] ? this.lookupData.find(x => x.lookUpId == year[i]).lookUpName : ''
                  this.columnYear.push({ year: yearName })
                  yearList.push(yearName)
                }
                yearList.sort()
                for (var i = 0; i < res.projectsMetricsData.length; i++) {
                  for (var j = 0; j < yearList.length; j++) {
                    res.projectsMetricsData[i][yearList[j]] = [{ 'target': "0", 'baseline': "0", 'actual': "0", 'current': "0" }]
                    if (res.projectsMetricsData[i].strategicBaselineList) {
                      var data = res.projectsMetricsData[i].strategicBaselineList.split(',')
                      for (var z = 0; z < data.length; z++) {
                        var list = data[z].split(' ')
                        if (list[1].replace(':', '') == yearList[j].replace(' 20', '')) {
                          res.projectsMetricsData[i][yearList[j]][0].baseline = list[2]
                        }
                      }
                    }
                  }
                };

                const updateGlobalYearRange = (listString: string) => {
                  console.log(listString)
                  if (!listString)
                  {
                    if (pc.financialRealizationStartDate) {
                      const fiscalYear = this.getFiscalYearFromDate(pc.financialRealizationStartDate);
                      this.globalMinYear = fiscalYear;
                      this.globalMaxYear = fiscalYear;
                    }
                   return;
                }

                  listString.split(',').forEach(item => {
                    // Adjusted regex to match "FY" followed by two digits
                    const yearMatch = item.trim().match(/FY(\d{2})/);
                    if (yearMatch) {
                      const year = parseInt(yearMatch[1]);
                      // Assuming the years are for the 2000s, adding 2000 to convert to four digits
                      const fullYear = year < 100 ? 2000 + year : year;
                      this.globalMinYear = Math.min(this.globalMinYear, fullYear);
                      this.globalMaxYear = Math.max(this.globalMaxYear, fullYear);
                    }
                  });
                };
                // Ensure you call this for each list after data is fetched
                updateGlobalYearRange(res.projectsMetricsData.strategicTargetList);
                updateGlobalYearRange(res.projectsMetricsData.strategicBaselineList);
                updateGlobalYearRange(res.projectsMetricsData.strategicActualList);
                updateGlobalYearRange(res.projectsMetricsData.strategicCurrentList);

                console.log(`Updated Min Year: ${this.globalMinYear}, Max Year: ${this.globalMaxYear}`);
                this.compare(this.columnYear)
                console.log(this.columnYear)
                if (pc.problemType == 'Strategic Initiative / Program') {
                  this.valuecreationngxdata = [
                    {
                      financialType: 'Target',
                      values: this.processFinancialList(res.projectsMetricsData.strategicTargetList, this.globalMinYear, this.globalMaxYear, res.projectsMetricsData.metricFormat)
                    },
                    { financialType: 'Baseline Plan', values: this.processFinancialList(res.projectsMetricsData.strategicBaselineList, this.globalMinYear, this.globalMaxYear, res.projectsMetricsData.metricFormat) },
                    { financialType: 'Current Plan', values: this.processFinancialList(res.projectsMetricsData.strategicCurrentList, this.globalMinYear, this.globalMaxYear, res.projectsMetricsData.metricFormat) },
                    { financialType: 'Actual', values: this.processFinancialList(res.projectsMetricsData.strategicActualList, this.globalMinYear, this.globalMaxYear, res.projectsMetricsData.metricFormat) }
                  ];
                } else {
                  this.valuecreationngxdata = [
                    { financialType: 'Baseline Plan', values: this.processFinancialList(res.projectsMetricsData.strategicBaselineList, this.globalMinYear, this.globalMaxYear, res.projectsMetricsData.metricFormat) },
                    { financialType: 'Current Plan', values: this.processFinancialList(res.projectsMetricsData.strategicCurrentList, this.globalMinYear, this.globalMaxYear, res.projectsMetricsData.metricFormat) },
                    { financialType: 'Actual', values: this.processFinancialList(res.projectsMetricsData.strategicActualList, this.globalMinYear, this.globalMaxYear, res.projectsMetricsData.metricFormat) }
                  ];
                }
                if (!res.projectsMetricsDataYearly || res.projectsMetricsDataYearly.length === 0) {
                  const currentYear = new Date().getFullYear();
                  const shortYear = currentYear % 100; // Get the last two digits of the year
                  const fiscalYearKey = `FY${shortYear}`; // Format as 'FYXX'

                  // Add the new fiscal year to the columnYear array
                  this.columnYear.push({ year: `FY ${currentYear}` });

                  // Initialize all values for this year to 0 in valuecreationngxdata
                  this.valuecreationngxdata.forEach(financialType => {
                    if (!financialType.values) {
                      financialType.values = {};
                    }
                    financialType.values[fiscalYearKey] = '0';
                  });
                }
                console.log(this.valuecreationngxdata)
                console.log(this.valuecreationngxdata); // Add this to inspect the final data structure

                this.prepareBulkEditFormArray(this.valuecreationngxdata)
                // ... inside dataloader method, after fetching and preparing data
                this.valuecreationngxdata.forEach(financialType => {
                  financialType.total = this.calculateTotalForFinancialType(financialType);
                });

                console.log(this.valuecreationngxdata)
                const isCurrencyLocal = res.projectsMetricsData.metricFormat == 'Currency (local)';
                this.valuecreationngxdata.forEach(item => {
                  // If the metric format is 'Currency (local)' and local currency is available, append it to the financial type
                  item.displayFinancialType = isCurrencyLocal && this.localCurrency
                    ? `${item.financialType} (${this.localCurrency})`
                    : item.financialType;
                });

                //this.projecthubservice.isFormChanged = false
                this.capexAvoidanceForm.valueChanges.subscribe(res => {
                  this.projecthubservice.isFormChanged = true
                })
                this.tempImpactForm.valueChanges.subscribe(res => {
                  this.projecthubservice.isFormChanged = true
                }
                )
                this.includeinForm.valueChanges.subscribe(res => {
                  this.projecthubservice.isFormChanged = true
                }
                )
                this.viewContent = true
              }
            })
          })
        })
      })
    })

  }

                  // Helper function to calculate fiscal year from a date
getFiscalYearFromDate = (dateString: string): number => {
  const date = new Date(dateString);
  let year = date.getFullYear();
  if (date.getMonth() < 3) { // If month is before April
    year--; // Fiscal year starts in the previous calendar year
  }
  return year;
};

  getFrozenHeaderClassID(): any {
    return ' frozen-header-classID';
  }
  getFrozenHeaderClass(): any {
    return ' frozen-header-class';
  }
  getFrozenClass(): any {
    return ' frozen-header';
  }
  columnstyle(): any {
    return ' column-style';
  }
  getFrozenID(): any {
    return ' frozen-header-ID'
  }

  onValueChange(rowIndex: number, year: string, newValue: string): void {
    const financialTypeRow = this.valuecreationngxdata[rowIndex];
    if (financialTypeRow) {
      const fiscalYearKey = 'FY' + year.slice(-2);
      financialTypeRow.values[fiscalYearKey] = this.convertToNumber(newValue);
  
      // Recalculate the total based on the metric format
      financialTypeRow.total = this.calculateTotalForFinancialType(financialTypeRow);
  
      // Update the form array to trigger change detection
      const formGroup = this.bulkEditFormArray.at(rowIndex) as FormGroup;
      formGroup.patchValue({
        [fiscalYearKey]: this.convertToNumber(newValue),
        total: financialTypeRow.total, // Update the total in the form group
      });
  
      this.projecthubservice.isFormChanged = true;
    }
  }
  


  convertToNumber(value: string): number {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  sumTimesHHMM(times: string[]): string {
    let totalMinutes = times.reduce((total, time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return total + hours * 60 + minutes;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }


  calculateTotalForFinancialType(financialType: any): string {
    console.log('Calculating total for: ', financialType);
    console.log(this.projectData.metricFormat)

    if (this.projectData.metricFormat === 'Time (HH:MM)') {
      const times = Object.values(financialType.values) as string[];
      const total = this.sumTimesHHMM(times);
      console.log('Total time:', total);
      return total;
    } else {
      let total = 0;
      Object.values(financialType.values).forEach(value => {
        if (typeof value === 'string') {
          total += this.convertToNumber(value);
        }
      });
      console.log('Total number:', total.toString());
      return total.toString();
    }
  }




  calculateTotalFromList(listString) {
    if (!listString) return 0;
    return listString.split(',').reduce((acc, item) => {
      const match = item.match(/FY\d+:\s*([0-9.]+)/);
      return match ? acc + parseFloat(match[1]) : acc;
    }, 0);
  }


  toggleTemporaryImpact(event: any) {
    this.projectData.temporaryImpact = event.checked;
    console.log(this.projectData.temporaryImpact)
  }

  toggleIncludeIn(event: any) {
    this.projectData.includePerformanceDashboard = event.checked;
    console.log(this.projectData.includePerformanceDashboard)
  }


  initializeValues(minYear, maxYear) {
    const values = {};
    for (let year = minYear; year <= maxYear; year++) {
      // Extracting the last two digits for the year
      const shortYear = year % 100;
      values[`FY${shortYear}`] = '0';  // Using two-digit year format
    }
    return values;
  }



  processFinancialList(listString: string, minYear: number, maxYear: number, metricFormat: string): any {
    const values = this.initializeValues(minYear, maxYear);

    if (!listString) {
      return values;
    }

    listString.split(',').forEach(item => {
      const [yearKey, value] = item.trim().split(':');
      if (yearKey && value) {
        // Use the two-digit year format directly
        values[yearKey.trim()] = this.formatValue(value.trim(), metricFormat);
      }
    });

    return values;
  }








  prepareBulkEditFormArray(data) {
    this.bulkEditFormArray = new FormArray(data.map(row => {
      const group = new FormGroup({});
      Object.keys(row.values).forEach(key => {
        group.addControl(key, new FormControl(row.values[key] || '0', Validators.required));
      });
      // Add a control for the total
      group.addControl('total', new FormControl(row.total || '0', Validators.required));
      return group;
    }));
  }






  createFormGroupForYear(data, listName, year) {
    // Parse the list for the year, e.g., "strategicTargetList"
    const listValue = this.parseListForYear(data[listName], year);

    // Create a form group with a control for the value
    const formGroup = new FormGroup({});
    formGroup.addControl(year, new FormControl(listValue));

    return formGroup;
  }

  parseListForYear(listString, year) {
    // Split the list by comma
    const items = listString.split(',');
    for (let item of items) {
      // Split each item by space and check if the year matches
      const parts = item.trim().split(' ');
      if (parts[0].includes(year)) {
        return parts[1]; // Return the value if the year matches
      }
    }
    return '0'; // Return a default value if not found
  }

  // Function to handle row click and toggle edit mode
  ptTableEditRow(rowIndex: number): void {
    const index = this.ptTableEditStack.indexOf(rowIndex);
    if (index === -1) {
      this.ptTableEditStack.push(rowIndex);
    } else {
      this.ptTableEditStack.splice(index, 1);
    }
  }

  // Function to format the value based on metricFormat
  formatValue(value: string, metricFormat: string): string {
    switch (metricFormat) {
      case 'Time (HH:MM)':
      case '':
        return value;
      case 'Whole Number':
      case 'Currency (local)':
        return parseInt(value).toFixed(0); // Formats as whole number
      case 'Decimal (1 decimal)':
        return parseFloat(value).toFixed(1); // Formats with 1 decimal place
      case 'Percentage (2 decimal)':
      case 'Decimal (2 decimals)':
        return parseFloat(value).toFixed(2); // Formats with 2 decimal places
      default:
        return value; // Default format if no specific format is matched
    }
  }



  getControlName(year: string): string {
    return 'FY' + year.slice(-2); // Adjust as necessary to match the control names
  }



  compare(array: any): any {
    console.log(array)
    return array.length > 1 ? array.sort((a, b) => {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    }) : array
  }

  getValueForYear(row: any, year: string): any {
    // Since the year comes in the format "FY 2023", we need to abbreviate it to match the keys like "FY 23"
    const fiscalYearKey = `FY ${year.slice(-2)}`; // If year is 'FY 2023', this results in 'FY 23'
    // Should log "FY 23", "FY 24", etc.
    return row.values[fiscalYearKey] || '0';
  }


  // Function to prevent event propagation when clicking on the form
  preventDefault(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  baselinePlans() {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you sure?",
      "message": "This function will baseline metric(s). Are you sure you want to continue? ",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "OK",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const baselinePlanAlert = this.fuseAlert.open(comfirmConfig);
    baselinePlanAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        // Copy 'Current Plan' values to 'Baseline Plan' in valuecreationngxdata
        this.valuecreationngxdata.forEach((data, index) => {
          if (data.financialType == 'Current Plan') {
            const baselineIndex = this.valuecreationngxdata.findIndex(d => d.financialType == 'Baseline Plan');
            if (baselineIndex !== -1) {
              this.valuecreationngxdata[baselineIndex].values = { ...data.values };
              this.valuecreationngxdata[baselineIndex].total = this.calculateTotalForFinancialType(this.valuecreationngxdata[baselineIndex]);
              // Update the form array to trigger change detection
              (this.bulkEditFormArray.at(baselineIndex) as FormGroup).patchValue({
                ...this.valuecreationngxdata[baselineIndex].values,
                total: this.valuecreationngxdata[baselineIndex].total,
              });
            }
          }
        });

        // Flag the data as baselined
        this.isBaselined = true;

        // Since we have modified the data directly, trigger data loader to refresh the UI
        //this.dataloader();
      }
    });
  }

  canEditRow(financialType: string): boolean {
    // If the value capture level is 'Capture', disable editing for 'Baseline Plan' row
    if (this.captureLevel) {
      return !(financialType == 'Baseline Plan');
    } else {
      // When value capture level is not 'Capture', disable editing for 'Baseline Plan', 'Current Plan', and 'Actual'
      return !(financialType == 'Baseline Plan' || financialType == 'Current Plan' || financialType == 'Actual');
    }
  }

  getRowClass(financialType: string): string {
    // If the value capture level is 'Capture', disable editing for 'Baseline Plan' row
    if (this.captureLevel && financialType == 'Baseline Plan') {
      return 'non-editable-row';
    }
    // When value capture level is not 'Capture', disable editing for 'Baseline Plan', 'Current Plan', and 'Actual'
    else if (!this.captureLevel && (financialType === 'Baseline Plan' || financialType === 'Current Plan' || financialType === 'Actual')) {
      return 'non-editable-row';
    }
    // Return an empty string for editable rows
    return '';
  }

  addYear() {
    if (this.globalMaxYear < 2034) {
      const newYear = this.globalMaxYear + 1;
      this.globalMaxYear = newYear; // Update globalMaxYear

      // Add new year to columnYear as full year for display purposes
      this.columnYear.push({ year: `FY ${newYear}` });

      // Get the two last digits of the year for the form control keys
      const shortYear = newYear % 100;

      // Assign '0' for the new year in each financial type's values
      this.valuecreationngxdata.forEach(financialType => {
        const fiscalYearKey = `FY${shortYear}`; // Use two-digit year here
        financialType.values[fiscalYearKey] = '0';
      });

      // Add a new control for the new year to each group in the form array
      this.bulkEditFormArray.controls.forEach((group: AbstractControl) => {
        if (group instanceof FormGroup) {
          group.addControl(`FY${shortYear}`, new FormControl('0')); // Use two-digit year here
        }
      });
    }
    else {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Maximum possible year is reached!",
        "message": "",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warning"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Okay",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const alert = this.fuseAlert.open(comfirmConfig)
    }
  }


  removeYear() {
    if (this.columnYear.length > 0) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Are you sure?",
        "message": "This function will delete all Financial data for max year. Are you sure you want to continue? ",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warn"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "OK",
            "color": "warn"
          },
          "cancel": {
            "show": true,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const removeYearAlert = this.fuseAlert.open(comfirmConfig)
      removeYearAlert.afterClosed().subscribe(close => {
        if (close == 'confirmed') {
          if (this.columnYear.length > 0) {
            const currentYear = new Date().getFullYear();
            if (this.globalMaxYear == currentYear) {
              // Prevent deletion of current year data
              var comfirmConfig: FuseConfirmationConfig = {
                "title": "",
                "message": "Current Financial Year data cannot be removed! ",
                "icon": {
                  "show": true,
                  "name": "heroicons_outline:exclamation",
                  "color": "warn"
                },
                "actions": {
                  "confirm": {
                    "show": true,
                    "label": "OK",
                    "color": "warn"
                  },
                  "cancel": {
                    "show": true,
                    "label": "Cancel"
                  }
                },
                "dismissible": true
              }
              const removeYearAlert = this.fuseAlert.open(comfirmConfig)
            }
            // Remove the last year from columnYear as full year
            const removedYearObj = this.columnYear.pop();
            const removedYear = `FY ${this.globalMaxYear}`; // Use the full year for removal

            // Update globalMaxYear
            this.globalMaxYear = this.globalMaxYear - 1;

            // Remove the year from each financial type's values
            this.valuecreationngxdata.forEach(financialType => {
              delete financialType.values[`FY${removedYear}`];
            });

            // Remove the form control for this year from each FormGroup
            this.bulkEditFormArray.controls.forEach((group: AbstractControl) => {
              if (group instanceof FormGroup) {
                group.removeControl(`FY${removedYear}`);
              }
            });
          }
        }
      })
    }
    else {

    }
  }

  deleteMetric() {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you sure?",
      "message": "Are you sure you want to delete this metric?",
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
    const alert = this.fuseAlert.open(comfirmConfig)
    alert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteMetric(this.id, this.projecthubservice.itemid)
          .then(response => {
            console.log('Update successful', response);
            this.projecthubservice.isNavChanged.next(true)
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.successSave.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
          })
      }
    })
  }

  // Helper function to create financial list string
  createFinancialList(financialType) {
    return this.valuecreationngxdata
      .filter(data => data.financialType === financialType)
      .map(data => {
        const yearlyValues = Object.entries(data.values)
          .map(([year, value]) => `${year}: ${value}`)
          .join(', ');
        return yearlyValues;
      })
      .join(', ');
  }

  getFinancialYearId(year: string): string {
    // Your mapping logic here. For simplicity, let's say it's a direct match.
    // You need to replace this with actual lookup logic that matches the year with the lookup ID.
    const lookupYear = `${year}`;
    console.log(lookupYear)
    const lookupEntry = this.lookupData.find(entry => entry.lookUpName == lookupYear);
    console.log(lookupEntry)
    return lookupEntry ? lookupEntry.lookUpId : '';
  }

  // Implement this method based on your system's logic to map financial types to their IDs
  getFinancialTypeId(financialType: string): string {
    switch (financialType) {
      case 'Target': return '06695f51-cee0-4da6-8a5a-c243d9ae2a58';
      case 'Baseline Plan': return 'c56ae68f-fbc5-4373-b3ea-ea9b14e8740e';
      case 'Current Plan': return 'd1b495c5-90e1-415d-aee6-2a6daf7002f8';
      case 'Actual': return '8871ae56-559b-4058-a34f-37e0719b6544';
    }
  }
  submitnewmetric() {
    this.projecthubservice.isFormChanged = false
    // Constructing the lists and calculating totals
    const strategicTargetList = this.createFinancialList('Target');
    const strategicBaselineList = this.createFinancialList('Baseline Plan');
    const strategicCurrentList = this.createFinancialList('Current Plan');
    const strategicActualList = this.createFinancialList('Actual');

    const strategicTargetTotal = this.calculateTotalFromList(strategicTargetList);
    const strategicBaselineTotal = this.calculateTotalFromList(strategicBaselineList);
    const strategicCurrentTotal = this.calculateTotalFromList(strategicCurrentList);
    const strategicActualTotal = this.calculateTotalFromList(strategicActualList);
    // Construct the metricData object from the form values
    const metricData = this.metricData

console.log(this.capexAvoidanceForm.get('metricLevelId').value)
    const projectsMetricsData = {
      // Other existing fields from projectsMetricsData
      projectId: this.projectData.projectId,
      metricId: this.projectData.metricId,
      statusId: this.capexAvoidanceForm.get('statusId').value ? this.lookupData.find(x => x.lookUpName == this.capexAvoidanceForm.get('statusId').value).lookUpId : '',
      metricLevelId: this.capexAvoidanceForm.get('metricLevelId').value ? this.lookupData.find(x => x.lookUpName == this.capexAvoidanceForm.get('metricLevelId').value).lookUpId : '',
      temporaryImpact: this.tempImpactForm.get('temporaryImpact').value,

      // Calculated values and lists
      strategicTarget: strategicTargetTotal.toString(),
      strategicBaseline: strategicBaselineTotal.toString(),
      strategicCurrent: strategicCurrentTotal.toString(),
      strategicActual: strategicActualTotal.toString(),

      strategicTargetList: strategicTargetList,
      strategicBaselineList: strategicBaselineList,
      strategicCurrentList: strategicCurrentList,
      strategicActualList: strategicActualList,

      // Other fields like includeProposalSlide, includeCharter, etc., if they need to be sent
      includePerformanceDashboard: this.includeinForm.get('toggleIncludeIn').value
    };

    // Generate projectsMetricsDataYearly array based on the columnYear and valuecreationngxdata
    const projectsMetricsDataYearly = this.columnYear.flatMap(yearObj => {
      const financialYearId = this.getFinancialYearId(yearObj.year); // Convert year to financial year ID
      return this.valuecreationngxdata.map(financialType => {
        const fiscalYearKey = `FY${yearObj.year.slice(-2)}`; // Extract last two digits for year
        const financialTypeId = this.getFinancialTypeId(financialType.financialType); // Use your method to get financial type ID
        const metricValue = financialType.values[fiscalYearKey] || '0';
        return {
          projectId: this.projectData.projectId,
          metricId: this.metricData.metricID,
          financialYearId: financialYearId,
          financialTypeId: financialTypeId,
          metricValue: metricValue.toString() // Ensure metricValue is a string
        };
      });
    });
    console.log(metricData)
    console.log(projectsMetricsData)
    console.log(projectsMetricsDataYearly)
    // Assemble the final data object for the PUT API
    this.requestBody = {
      metricData,
      projectsMetricsData,
      projectsMetricsDataYearly,
      isBaseLined: this.isBaselined
    };
    console.log(this.id)
    console.log(this.metricData.metricID)
    console.log(this.requestBody)

    // Call the API service to submit the data
    this.apiService.submitMetricProjectData(this.requestBody, this.id, this.projecthubservice.itemid).then(response => {
      // Handle the response here
      this.projecthubservice.toggleDrawerOpen('', '', [], '')
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.isNavChanged.next(true)
                        this.projecthubservice.successSave.next(true)
    })
  }




}
