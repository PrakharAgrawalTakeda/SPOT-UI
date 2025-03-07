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
  @Input() Required: boolean = false
  @Input() sortSelected: boolean = false
  @Input() sortSelectedValuePointer: string
  @Input() sort: true | false = true

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
    this.filteredDropDownValues = this.form.controls.control.valueChanges.pipe(
      startWith(''),
      map(value => {
        var filterValue = value ? value.toString().toLowerCase() : ''
        if (this.dropDownArray != null) {
          if(this.sort == true){
          if (filterValue == "") {
            return this.dropDownArray.sort(this.sortByType == 'valuePointer' ? (a, b) => (a[this.valuePointer] > b[this.valuePointer]) ? 1 : ((b[this.valuePointer] > a[this.valuePointer]) ? -1 : 0) : (a, b) => (a[this.customSortPointer] > b[this.customSortPointer]) ? 1 : ((b[this.customSortPointer] > a[this.customSortPointer]) ? -1 : 0)).filter((obj) => obj.isActive!=false);
          }
          else {
            return this.dropDownArray.filter(x => x[this.valuePointer].toLowerCase().includes(filterValue)).sort(this.sortByType == 'valuePointer' ? (a, b) => (a[this.valuePointer] > b[this.valuePointer]) ? 1 : ((b[this.valuePointer] > a[this.valuePointer]) ? -1 : 0) : (a, b) => (a[this.customSortPointer] > b[this.customSortPointer]) ? 1 : ((b[this.customSortPointer] > a[this.customSortPointer]) ? -1 : 0)).filter((obj) => obj.isActive!=false);
          }
        }
        else{
          return this.dropDownArray
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
    console.log(this.valuePointer)
  }
  get control() {
    return this.form.get('control');
  }
  onBlur(value) {
    if(value){
    if (this.form.controls.chipList.value.length > 0) {
        this.Required = false;
    } else {
        this.Required = true;
    }
  }
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
  removeOption(item: any, value) {
    this.selectedOption = this.selectedOption.filter(x => x[this.idPointer] != item[this.idPointer])
    // this.form.controls.chipList.patchValue(this.selectedOption)
    this.form.controls.chipList.markAsDirty()
    this.form.controls.chipList.patchValue(this.selectedOption)
    this.onChange(this.selectedOption)
    this.onBlur(value)
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
    this.form.valueChanges.subscribe(fn)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: any) {
    if (val) {
      console.log(val)
      console.log(typeof val)
        this.selectedOption = val.sort((a, b) => (a[this.valuePointer] > b[this.valuePointer]) ? 1 : ((b[this.valuePointer] > a[this.valuePointer]) ? -1 : 0))
        console.log(this.selectedOption)
        this.form.controls.chipList.patchValue(this.selectedOption)
        console.log(this.form.getRawValue())
    }
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled == true) {
      this.isDisabled = true
      this.form.disable()
    }
    else{
      this.isDisabled = false
      this.form.enable()
    }
  }
}
