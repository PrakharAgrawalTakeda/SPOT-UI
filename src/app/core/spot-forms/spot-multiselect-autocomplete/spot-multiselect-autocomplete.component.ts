import { Component, OnInit, forwardRef, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { map, Observable, startWith, timeout } from 'rxjs';
@Component({
  selector: 'spot-multiselect-autocomplete',
  templateUrl: './spot-multiselect-autocomplete.component.html',
  styleUrls: ['./spot-multiselect-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpotMultiselectAutocompleteComponent),
      multi: true
    }
  ]
})
export class SpotMultiselectAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() showLabel: boolean = true
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip'
  @Input() dropDownArrayType: 'string' | 'object'
  @Input() dropDownArray: any = []
  @Input() valuePointer: string
  @Input() idPointer: string = ''
  @Input() sortByType: 'valuePointer' | 'custom' = 'valuePointer'
  @Input() customSortPointer: string = ''

  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;

  filteredDropDownValues: Observable<any>
  formFieldHelpers: any
  selectedOption: any = []
  isDisabled: boolean = false
  onTouch: any = () => { };
  onChange: any = () => { };
  form = new FormGroup({
    control: new FormControl(''),
    chipList: new FormControl([])
  });

  constructor(private fb: FormBuilder) {
    this.form.controls.control.valueChanges.subscribe((res: any) => {
      if (this.form.controls.control.value == "") {
        //this.onChange({})
        //this.selectedOption = {}
      }

    })
    this.filteredDropDownValues = this.form.controls.control.valueChanges.pipe(
      startWith(''),
      map(value => {
        var filterValue = value ? value.toString().toLowerCase() : ''
        if (this.dropDownArray != null) {
          if (filterValue == "") {
            return this.dropDownArray.sort(this.sortByType == 'valuePointer' ? (a, b) => (a[this.valuePointer] > b[this.valuePointer]) ? 1 : ((b[this.valuePointer] > a[this.valuePointer]) ? -1 : 0) : (a, b) => (a[this.customSortPointer] > b[this.customSortPointer]) ? 1 : ((b[this.customSortPointer] > a[this.customSortPointer]) ? -1 : 0))
          }
          else {
            return this.dropDownArray.filter(x => x[this.valuePointer].toLowerCase().includes(filterValue)).sort(this.sortByType == 'valuePointer' ? (a, b) => (a[this.valuePointer] > b[this.valuePointer]) ? 1 : ((b[this.valuePointer] > a[this.valuePointer]) ? -1 : 0) : (a, b) => (a[this.customSortPointer] > b[this.customSortPointer]) ? 1 : ((b[this.customSortPointer] > a[this.customSortPointer]) ? -1 : 0))
          }
        }
        else {
          return []
        }
      })
    )
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
    this.input.nativeElement.blur()
    this.form.controls.control.patchValue('')
    this.input.nativeElement.value = ''
  }
  removeOption(item: any) {
    this.selectedOption = this.selectedOption.filter(x => x[this.idPointer] != item[this.idPointer])
    this.onChange(this.selectedOption)
  }
  isOptionSelected(option: any): boolean {
    if (this.selectedOption) {
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
    }
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled == true) {
      this.isDisabled = true
      this.form.controls.chipList.disable()
    }
    else{
      this.isDisabled = false
      this.form.controls.chipList.enable()
    }
  }
}
