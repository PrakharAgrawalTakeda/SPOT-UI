
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from 'app/shared/global-variables';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { id } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralInfoComponent implements OnInit {

  constructor(private apiService: ProjectApiService) {}
  ngOnInit(): void {
    
  }
}
