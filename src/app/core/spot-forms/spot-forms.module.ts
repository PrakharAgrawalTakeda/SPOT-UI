import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotInputComponent } from './spot-input/spot-input.component';
import { SpotSelectComponent } from './spot-select/spot-select.component';
import { SpotInputDateComponent } from './spot-input-date/spot-input-date.component';
import { SpotMultiselectAutocompleteComponent } from './spot-multiselect-autocomplete/spot-multiselect-autocomplete.component';
import { SpotSingleselectAutocompleteComponent } from './spot-singleselect-autocomplete/spot-singleselect-autocomplete.component';
import { SpotTextareaComponent } from './spot-textarea/spot-textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';



@NgModule({
  declarations: [
    SpotInputComponent,
    SpotSelectComponent,
    SpotInputDateComponent,
    SpotMultiselectAutocompleteComponent,
    SpotSingleselectAutocompleteComponent,
    SpotTextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  exports: [
    SpotInputComponent,
    SpotSelectComponent,
    SpotInputDateComponent,
    SpotMultiselectAutocompleteComponent,
    SpotSingleselectAutocompleteComponent,
    SpotTextareaComponent
  ]
})
export class SpotFormsModule { }
