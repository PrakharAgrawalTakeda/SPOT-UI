import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { map, Observable, startWith, timeout } from 'rxjs';
@Component({
  selector: 'spot-singleselect-autocomplete',
  templateUrl: './spot-singleselect-autocomplete.component.html',
  styleUrls: ['./spot-singleselect-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpotSingleselectAutocompleteComponent),
      multi: true
    }
  ]
})
export class SpotSingleselectAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() showLabel: boolean = true
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip'
  @Input() dropDownArrayType: 'string' | 'object'
  @Input() dropDownArray: any = []
  @Input() valuePointer: string
  @Input() idPointer: string

  filteredDropDownValues: Observable<any>
  formFieldHelpers: any
  selectedOption: any = {}
  onTouch: any = () => { };
  onChange: any = () => { };
  form = new FormGroup({
    control: new FormControl('')
  });
  disabled = false;

  constructor(private fb: FormBuilder) {
    this.form.controls.control.valueChanges.subscribe((res: any) => {
      if (this.form.controls.control.value == "") {
        this.onChange({})
        this.selectedOption = {}
      }

    })
    this.filteredDropDownValues = this.form.controls.control.valueChanges.pipe(
      startWith(''),
      map(value => {
        var filterValue = value ? value.toString().toLowerCase() : ''
        if (this.dropDownArray != null) {
          if (filterValue == "") {
            return this.dropDownArray
          }
          else {
            if (Object.keys(this.selectedOption).length != 0 ) {
              if (filterValue == this.selectedOption[this.valuePointer].toLowerCase()) {
                return this.dropDownArray
              }
            }
            return this.dropDownArray.filter(x => x[this.valuePointer].toLowerCase().includes(filterValue))
          }
        }
        else {
          return []
        }
      })
    )
  }
  changeInput() {
    if (this.selectedOption != {}) {
      this.form.controls.control.patchValue(this.selectedOption[this.valuePointer])
    }
  }
  ngOnInit() {
  }
  get control() {
    return this.form.get('control');
  }
  onFunctionSelect(event: any) {
    this.onChange(event.option.value)
    this.form.controls.control.patchValue(event.option.value[this.valuePointer])
    this.selectedOption = event.option.value
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: any) {
    this.form.controls.control.patchValue(val[this.valuePointer]);
    this.selectedOption = val
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled == true) {
      this.control.disable()
    }
  }
}
