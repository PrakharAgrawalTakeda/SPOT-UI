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
import { SpotSingleselectUserAutocompleteComponent } from './spot-singleselect-user-autocomplete/spot-singleselect-user-autocomplete.component';
import { SpotToggleComponent } from './spot-toggle/spot-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SpotMultiselectUserAutocompleteComponent } from './spot-multiselect-user-autocomplete/spot-multiselect-user-autocomplete.component';
import { SpotMultiselectProjectAutocompleteComponent } from './spot-multiselect-project-autocomplete/spot-multiselect-project-autocomplete.component';
import { SpotInputForecastComponent } from './spot-input-forecast/spot-input-forecast.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
    declarations: [
        SpotInputComponent,
        SpotSelectComponent,
        SpotInputDateComponent,
        SpotMultiselectAutocompleteComponent,
        SpotSingleselectAutocompleteComponent,
        SpotTextareaComponent,
        SpotSingleselectUserAutocompleteComponent,
        SpotToggleComponent,
        SpotMultiselectUserAutocompleteComponent,
        SpotMultiselectProjectAutocompleteComponent,
        SpotInputForecastComponent,
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
        MatMomentDateModule,
        MatSlideToggleModule,
        QuillModule.forRoot(),
    ],
    exports: [
        SpotInputComponent,
        SpotSelectComponent,
        SpotInputDateComponent,
        SpotMultiselectAutocompleteComponent,
        SpotSingleselectAutocompleteComponent,
        SpotTextareaComponent,
        SpotSingleselectUserAutocompleteComponent,
        SpotToggleComponent,
        SpotMultiselectUserAutocompleteComponent,
        SpotMultiselectProjectAutocompleteComponent,
        SpotInputForecastComponent,
    ],
})
export class SpotFormsModule {}
