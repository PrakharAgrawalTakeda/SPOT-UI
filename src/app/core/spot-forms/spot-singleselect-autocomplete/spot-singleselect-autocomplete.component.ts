import { Component, OnInit, forwardRef, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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
  //@Input() idPointer: string = ''
  @Input() sortByType: 'valuePointer' | 'custom' = 'valuePointer'
  @Input() customSortPointer: string = ''
  @Input() Required: boolean = false
  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;

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
            return this.dropDownArray.sort(this.sortByType == 'valuePointer' ? (a, b) => (a[this.valuePointer] > b[this.valuePointer]) ? 1 : ((b[this.valuePointer] > a[this.valuePointer]) ? -1 : 0) : (a, b) => (a[this.customSortPointer] > b[this.customSortPointer]) ? 1 : ((b[this.customSortPointer] > a[this.customSortPointer]) ? -1 : 0)).filter((obj) => obj.isActive!=false)
          }
          else {
            if (Object.keys(this.selectedOption).length != 0) {
              if (filterValue == this.selectedOption[this.valuePointer]?.toLowerCase()) {
                return this.dropDownArray.sort(this.sortByType == 'valuePointer' ? (a, b) => (a[this.valuePointer] > b[this.valuePointer]) ? 1 : ((b[this.valuePointer] > a[this.valuePointer]) ? -1 : 0) : (a, b) => (a[this.customSortPointer] > b[this.customSortPointer]) ? 1 : ((b[this.customSortPointer] > a[this.customSortPointer]) ? -1 : 0)).filter((obj) => obj.isActive!=false)
              }
            }
            return this.dropDownArray.filter(x => x[this.valuePointer].toLowerCase().includes(filterValue)).sort(this.sortByType == 'valuePointer' ? (a, b) => (a[this.valuePointer] > b[this.valuePointer]) ? 1 : ((b[this.valuePointer] > a[this.valuePointer]) ? -1 : 0) : (a, b) => (a[this.customSortPointer] > b[this.customSortPointer]) ? 1 : ((b[this.customSortPointer] > a[this.customSortPointer]) ? -1 : 0)).filter((obj) => obj.isActive!=false)
          }
        }
        else {
          return []
        }
      })
    )
  }
  changeInput() {
    this.form.controls.control.patchValue(this.selectedOption[this.valuePointer])
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
      this.form.controls.control.patchValue(val[this.valuePointer]);
      this.selectedOption = val
    }

  }

  setDisabledState(isDisabled: boolean) {
    isDisabled == true ? this.control.disable() : this.control.enable()
  }
}
