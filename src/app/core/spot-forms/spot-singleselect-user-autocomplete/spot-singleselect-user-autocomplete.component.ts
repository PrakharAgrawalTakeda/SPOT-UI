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
  isDisabled: boolean = false
  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;
  filteredDropDownValues: any
  formFieldHelpers: any
  selectedOption: any = {}
  onTouch: any = () => { };
  onChange: any = () => { };
  form = new FormGroup({
    control: new FormControl(''),
    chipList: new FormControl([])
  });
  disabled = false;
  inputDisabled = false;

  resultSets: any[];
  minLength = 4
  debounce = 400
  filteredOptions: any
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private fb: FormBuilder, private _httpClient: HttpClient,
    public fuseAlert: FuseConfirmationService) {

    this.form.controls.control.valueChanges.subscribe((res: any) => {
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

            // Sort and filter logic
            this.resultSets = resultSets
              .filter(obj => obj.userIsActive)
              .sort((a, b) => {
                const lastNameA = a.userDisplayName.split(',')[0].trim();
                const lastNameB = b.userDisplayName.split(',')[0].trim();
                return lastNameA.localeCompare(lastNameB);
              })
          });
      });
  }
  changeInput() {
    this.input.nativeElement.addEventListener('focusout',(event =>{
      this.onFocusout(event)
    }))
    if (this.inputDisabled) {
      this.input.nativeElement.disabled = true
      this.form.markAsPristine()
    }
    else {
      this.input.nativeElement.disabled = false
    }
  }
  onFocusout(event) {
    setTimeout(() => {
      if (this.selectedOption[this.valuePointer] === undefined && event != "") {
        this.input.nativeElement.blur()
        this.input.nativeElement.value = ''
      }
    }, 200);
  }
  ngOnInit() {
  }
  get control() {
    
    return this.form.get('control');
  }
  onFunctionSelect(event: any) {
    this.onChange(event.option.value)
    this.valueChange.emit(event.option.value)
    this.form.controls.control.patchValue('')
    this.form.controls.chipList.patchValue(event.option.value)
    this.selectedOption = event.option.value
    this.form.markAsDirty()
    this.input.nativeElement.blur()
    this.input.nativeElement.value = ''
    this.input.nativeElement.disabled = true
    this.inputDisabled = true
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: any) {
    if (val != null) {
      if (Object.keys(val).length > 0) {
        this.form.controls.chipList.patchValue(val)
        if (typeof val != 'string') {
          this.form.controls.control.patchValue('');
          this.selectedOption = val
        }
        else {
          this.form.controls.control.patchValue('');

          this.selectedOption = val
        }
        this.inputDisabled = true
      }
    }

  }
  removeOption(selectedOption) {
    this.onChange({})
    this.valueChange.emit({})
    this.selectedOption = {}
    this.input.nativeElement.value = ''
    this.input.nativeElement.disabled = false
    this.inputDisabled = false
  }
  setDisabledState(isDisabled: boolean) {
    isDisabled == true ? this.control.disable() : this.control.enable()
    isDisabled == true ? this.isDisabled = true : this.isDisabled = false
  }
}
