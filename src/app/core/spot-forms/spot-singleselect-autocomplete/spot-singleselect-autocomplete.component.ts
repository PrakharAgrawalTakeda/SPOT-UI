import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
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
  @Input() hintPostion: 'tooltip'|'mat-hint' = 'tooltip'
  @Input() dropDownArrayType: 'string' | 'object'
  @Input() dropDownArray: any
  @Input() valuePointer: string
  @Input() idPointer: string
  

  formFieldHelpers: any
  onTouch: any = () => { };
  onChange: any = () => { };
  form: FormGroup;
  disabled = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      control: '',
    })
  }
  get control() {
    return this.form.get('control');
  }


  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: any) {
    this.control.setValue(val[this.valuePointer]);
  }

  setDisabledState(isDisabled: boolean) {
    if(isDisabled == true){
      this.control.disable()
    }
  }
}
