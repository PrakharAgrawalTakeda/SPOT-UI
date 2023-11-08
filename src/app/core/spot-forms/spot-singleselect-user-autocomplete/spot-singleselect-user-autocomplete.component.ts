import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, forwardRef, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { GlobalVariables } from 'app/shared/global-variables';
import { debounceTime, filter, map, Observable, startWith, Subject, takeUntil, timeout } from 'rxjs';
@Component({
  selector: 'spot-singleselect-user-autocomplete',
  templateUrl: './spot-singleselect-user-autocomplete.component.html',
  styleUrls: ['./spot-singleselect-user-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpotSingleselectUserAutocompleteComponent),
      multi: true
    }
  ]
})
export class SpotSingleselectUserAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() showLabel: boolean = true
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip'
  @Input() dropDownArrayType: 'string' | 'object'
  @Input() dropDownArray: any = []
  valuePointer: string = 'userDisplayName'
  //@Input() idPointer: string = ''
  @Input() sortByType: 'valuePointer' | 'custom' = 'valuePointer'
  @Input() customSortPointer: string = ''
  @Output() valueChange = new EventEmitter();
  @Input() Required: boolean = false
  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;

  filteredDropDownValues: any
  formFieldHelpers: any
  selectedOption: any = {}
  onTouch: any = () => { };
  onChange: any = () => { };
  form = new FormGroup({
    control: new FormControl('')
  });
  disabled = false;

  resultSets: any[];
  minLength = 4
  debounce = 400
  filteredOptions: any

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private fb: FormBuilder, private _httpClient: HttpClient,
    public fuseAlert: FuseConfirmationService) {
    this.form.controls.control.valueChanges.subscribe((res: any) => {
      if (this.form.controls.control.value == "") {
        this.onChange({})
        this.valueChange.emit({})
        this.selectedOption = {}
      }
    })
    this.filteredDropDownValues = this.form.controls.control.valueChanges.pipe(
      debounceTime(this.debounce),
      takeUntil(this._unsubscribeAll),
      map((value) => {

        // Set the resultSets to null if there is no value or
        // the length of the value is smaller than the minLength
        // so the autocomplete panel can be closed
        if (!value || value.length < this.minLength) {
          this.resultSets = null;
        }

        // Continue
        return value;
      }),
      // Filter out undefined/null/false statements and also
      // filter out the values that are smaller than minLength
      filter(value => value && value.length >= this.minLength)
    )
      .subscribe((value) => {
        const params = new HttpParams().set('query', value);
        this._httpClient.post(GlobalVariables.apiurl + `ProjectTeams/UserSearch?${params.toString()}`, { body: [] })
          .subscribe((resultSets: any) => {

            // Store the result sets
            this.resultSets = resultSets.filter((obj) => obj.userIsActive!=false);
            console.log(this.resultSets.filter((obj) => obj.userIsActive))
            console.log(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`)
            // Execute the event
            //this.search.next(resultSets);
          });
      });
  }
  changeInput() {
      this.form.controls.control.patchValue(this.selectedOption[this.valuePointer])
  }
  onFocusout(event) {
    setTimeout(() => {
      if (this.selectedOption[this.valuePointer] === undefined && event != "") {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "The entered name does not exist. Please review your selection!",
          "message": "",
          "icon": {
            "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warn"
          },
          "actions": {
            "confirm": {
              "show": true,
              "label": "Okay",
              "color": "warn"
            },
          },
          "dismissible": true
        }
        const alert = this.fuseAlert.open(comfirmConfig)
      }
    }, 700);
  }
  ngOnInit() {
  }
  get control() {
    return this.form.get('control');
  }
  onFunctionSelect(event: any) {
    this.onChange(event.option.value)
    this.valueChange.emit(event.option.value)
    this.form.controls.control.patchValue(event.option.value[this.valuePointer])
    this.selectedOption = event.option.value
    this.input.nativeElement.blur()
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: any) {
    if (val != null) {
      if(typeof val != 'string')
      {
      this.form.controls.control.patchValue(val[this.valuePointer]);
      this.selectedOption = val
      }
      else
      {
        this.form.controls.control.patchValue(val);
        this.selectedOption = val
      }
    }

  }

  setDisabledState(isDisabled: boolean) {
    isDisabled == true ? this.control.disable() : this.control.enable()
  }
}
