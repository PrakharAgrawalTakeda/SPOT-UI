import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-caps-single-edit',
  templateUrl: './caps-single-edit.component.html',
  styleUrls: ['./caps-single-edit.component.scss']
})
export class CapsSingleEditComponent {
viewType = 'SidePanel'
  today = new Date("2036-03-31");
  viewContent = true
  CAPSform = new FormGroup({
    isCapsProject: new FormControl(false),
    enviornmentalPortfolio: new FormControl(null),
    impactRealizationDate: new FormControl(''),
    EmissionsImpact: new FormControl(''),
    EnergyImpact: new FormControl(''),
    WaterImpact: new FormControl(''),
    TotalWasteImpact: new FormControl(''),
    LandfilledWasteImpact: new FormControl(''),
    EnergyCost: new FormControl(''),
    WaterCost: new FormControl(''),
    WasteCost: new FormControl('')
  })

  ngOnit(){
    this.viewContent = true
  }
}
