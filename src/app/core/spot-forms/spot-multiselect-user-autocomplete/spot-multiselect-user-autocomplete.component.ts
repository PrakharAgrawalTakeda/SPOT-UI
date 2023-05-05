import { Component, OnInit, forwardRef, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime, filter, map, Observable, startWith, Subject, takeUntil, timeout } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVariables } from 'app/shared/global-variables';
@Component({
  selector: 'spot-multiselect-user-autocomplete',
  templateUrl: './spot-multiselect-user-autocomplete.component.html',
  styleUrls: ['./spot-multiselect-user-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpotMultiselectUserAutocompleteComponent),
      multi: true
    }
  ]
})
export class SpotMultiselectUserAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() showLabel: boolean = true
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip'
  @Input() dropDownArrayType: 'string' | 'object'
  @Input() dropDownArray: any = []
  valuePointer: string = 'userDisplayName'
  idPointer: string = 'userAdid'
  @Input() sortByType: 'valuePointer' | 'custom' = 'valuePointer'
  @Input() customSortPointer: string = ''
  @Input() Required: boolean = false

  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;

  filteredDropDownValues: any
  formFieldHelpers: any
  selectedOption: any = []
  isDisabled: boolean = false
  onTouch: any = () => { };
  onChange: any = () => { };
  form = new FormGroup({
    control: new FormControl(''),
    chipList: new FormControl([])
  });

  resultSets: any[];
  minLength = 4
  debounce = 400
  filteredOptions: any
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder, private _httpClient: HttpClient) {
    this.form.controls.control.valueChanges.subscribe((res: any) => {
      if (this.form.controls.control.value == "") {
        //this.onChange({})
        //this.selectedOption = {}
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
            if (this.selectedOption.length > 0 && resultSets.length > 0) {
              var select = this.selectedOption.map(x => x.userAdid).filter((obj) => obj.userIsActive)
              resultSets.filter(x => select.includes(x.userAdid))
            }

            // Store the result sets
            this.resultSets = resultSets;
            console.log(this.resultSets)
            console.log(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`)
            // Execute the event
            //this.search.next(resultSets);
          });
      });
  }
  changeInput() {
    this.form.controls.control.patchValue('')
    this.input.nativeElement.value = ''
  }
  ngOnInit() {
  }
  get control() {
    return this.form.get('control');
  }
  onFunctionSelect(event: any) {
    console.log(this.selectedOption)
    this.selectedOption.push(event.option.value)
    this.onChange(this.selectedOption)
    this.form.controls.chipList.patchValue(this.selectedOption)
    this.form.controls.chipList.markAsDirty()
    this.input.nativeElement.blur()
    this.form.controls.control.patchValue('')
    this.input.nativeElement.value = ''
  }
  removeOption(item: any) {
    this.selectedOption = this.selectedOption.filter(x => x[this.idPointer] != item[this.idPointer])
    this.form.controls.chipList.markAsDirty()
    this.form.controls.chipList.patchValue(this.selectedOption)
    this.onChange(this.selectedOption)
  }
  isOptionSelected(option: any): boolean {
    if (this.selectedOption && this.selectedOption.length > 0) {
      if (this.selectedOption.some(x => x[this.idPointer] == option[this.idPointer])) {
        return false
      }
    }
    return true
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: any) {
    if (val) {
      this.selectedOption = val
      this.form.controls.chipList.patchValue(this.selectedOption)
    }
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled == true) {
      this.isDisabled = true
      this.form.controls.chipList.disable()
    }
    else {
      this.isDisabled = false
      this.form.controls.chipList.enable()
    }
  }
}
