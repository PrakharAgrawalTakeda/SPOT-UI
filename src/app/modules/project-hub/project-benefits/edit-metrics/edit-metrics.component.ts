import { Component, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
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
  providers: [DecimalPipe] // Provide the DecimalPipe here
})
export class EditMetricsComponent {
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
  bulkEditFormArray: FormArray;
  localCurrency: string = ""
  globalMinYear: number = Infinity;
  globalMaxYear: number = -Infinity;
  tempImpactForm = new FormGroup({
    temporaryImpact: new FormControl('')
  })
  projectData: any;
  captureLevel: boolean = false
  vcLevel: any;
  disabled: boolean = false
  vcLevels = ["Capture", "Cascade"]
  status = ["On Track", "At Risk", "Will Not Meet"]

  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute,
    public indicator: SpotlightIndicatorsService, private portApiService: PortfolioApiService, public fuseAlert: FuseConfirmationService, private decimalPipe: DecimalPipe) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res) {
        this.dataloader()
      }
    })
    this.projecthubservice.isNavChanged.subscribe(res => {
      if (res) {
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()

  }

  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    console.log(this.id)
    //change api to single edit get api
    this.apiService.singleEditMetricProjectData(this.id, this.projecthubservice.itemid).then((res: any) => {
      this.apiService.getMetricProjectData(this.id).then((result: any) => {
        this.auth.lookupMaster().then((resp: any) => {
          this.portApiService.getOnlyLocalCurrency(this.id).then((currency: any) => {
            if (res && res.projectsMetricsData.metricLevelId == 'd6a905be-4ff9-402e-b074-028242b6f8e0') {
              this.captureLevel = true
            }
            console.log(res)
            console.log(currency)
            this.localCurrency = currency ? currency.localCurrencyAbbreviation : ''
            console.log(this.localCurrency)
            this.lookupData = resp
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
              metricLevelId: this.lookupData.find(x => x.lookUpId == res.projectsMetricsData.metricLevelId).lookUpName,
              statusId: this.lookupData.find(x => x.lookUpId == res.projectsMetricsData.statusId) ? this.lookupData.find(x => x.lookUpId == res.projectsMetricsData.statusId).lookUpName : ''
            })


            if (this.capexAvoidanceForm.get('metricLevelId').value == 'Capture' || res.projectsMetricsData.metricLevelId == 'd6a905be-4ff9-402e-b074-028242b6f8e0') {
              this.captureLevel = true
            }
            if (this.capexAvoidanceForm && this.captureLevel) {
              this.capexAvoidanceForm.get('metricLevelId').disable();
            } else {
              this.capexAvoidanceForm.get('statusId').disable();
            }
            this.tempImpactForm.patchValue({
              temporaryImpact: (res.projectsMetricsData.temporaryImpact)
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
              if (!listString) return;

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
            if (result.problemCapture.problemType == 'Strategic Initiative / Program') {
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
            console.log(this.valuecreationngxdata); // Add this to inspect the final data structure
           
            this.prepareBulkEditFormArray(this.valuecreationngxdata)
          })
        })
      })
    })
  }


  toggleTemporaryImpact(event: any) {
    // Handle the toggle change event
    // Update the 'temporaryImpact' value in your project data
    this.projectData.temporaryImpact = event.checked;
    console.log(this.projectData.temporaryImpact)
    // Additional logic as needed
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
        group.addControl(key, new FormControl(row.values[key] || '0'));
      });
      console.log(group)
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
    const baselinePlanAlert = this.fuseAlert.open(comfirmConfig)
    baselinePlanAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        //this.valuecreationngxdata.forEach(metricData => {

        this.apiService.baselineProjectMetricData(this.id, this.valuecreationngxdata)
          .then(response => {
            console.log('Update successful', response);

          })


        // // Iterate over all keys of the metricData object
        // Object.keys(metricData).forEach(key => {
        //   // Check if the key is a fiscal year
        //   if (/^FY \d+$/.test(key)) {
        //     // This key represents a fiscal year
        //     metricData[key].forEach(data => {
        //      data.baseline = data.current;
        //      console.log(data.baseline)
        //     });
        //   }
        // });
        //})
        console.log(this.valuecreationngxdata)


      }
    })
  }



  submitnewmetric() {

  }

  addYear() {
    const newYear = this.globalMaxYear + 1;
    this.globalMaxYear = newYear; // Update globalMaxYear

    const shortYear = newYear % 100; // This will give you '27' for 2027,
    // Add new year to columnYear
    this.columnYear.push({ year: `FY ${shortYear}` });

    // Assign '0' for the new year in each financial type's values
    this.valuecreationngxdata.forEach(financialType => {
      financialType.values[`FY${shortYear}`] = '0';
    });

    this.bulkEditFormArray.controls.forEach((group: AbstractControl) => {
      if (group instanceof FormGroup) {
        group.addControl(`FY${shortYear}`, new FormControl('0'));
      }
    });
  }

  removeYear() {
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
          // Remove the last year from columnYear
          const removedYearObj = this.columnYear.pop();
          const removedYear = removedYearObj.year.slice(-2); // Extract the two-digit year

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


}
