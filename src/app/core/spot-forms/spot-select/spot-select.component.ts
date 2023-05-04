import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'spot-select',
  templateUrl: './spot-select.component.html',
  styleUrls: ['./spot-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpotSelectComponent),
      multi: true
    }
  ]
})
export class SpotSelectComponent implements OnInit, ControlValueAccessor {
  @Input() showLabel: boolean = true
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip'
  @Input() showNoneOption: boolean = true
  @Input() noneOptionCustomText: string = 'None'
  @Input() dropDownArrayType: 'string' | 'object'
  @Input() dropDownArray: any
  @Input() valuePointer: string
  @Input() idPointer: string
  @Input() sortByType: 'valuePointer' | 'custom' = 'valuePointer'
  @Input() customSortPointer: string = ''
  formFieldHelpers: any
  onTouch: any = () => { };
  onChange: any = () => { };
  selected:any = () => { };
  form: FormGroup;
  disabled = false;
  @Input() Required: boolean = false

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      control: '',
    })
  }
  get control() {
    return this.form.get('control');
  }
  getDropDown(): any{
      return this.dropDownArray.sort(this.sortByType == 'valuePointer' ? (a, b) => (a[this.valuePointer] > b[this.valuePointer]) ? 1 : ((b[this.valuePointer] > a[this.valuePointer]) ? -1 : 0) : (a, b) => (a[this.customSortPointer] > b[this.customSortPointer]) ? 1 : ((b[this.customSortPointer] > a[this.customSortPointer]) ? -1 : 0)).filter((obj) => obj.isActive!=false);
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: string) {
    this.control.setValue(val);
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled == true ? this.control.disable() : this.control.enable()
  }
}
