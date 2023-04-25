import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'spot-input',
  templateUrl: './spot-input.component.html',
  styleUrls: ['./spot-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpotInputComponent),
      multi: true
    }
  ]
})
export class SpotInputComponent implements OnInit, ControlValueAccessor {
  @Input() decimalCount: number = 0
  @Input() autoAddDecimal: boolean = false
  @Input() inputType: 'Text' | 'Number' = 'Text'
  @Input() showLabel: boolean = true
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip'
  @Input() Required: boolean = false;
  @Input() callLocation: 'View' | 'Edit' = 'Edit'
  @Input() allowNegativeValues: boolean = false


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
    if (this.inputType == 'Number') {
      let value = '';
      if (val != null && val !== '') {
        value = this.autoAddDecimal ? (Number(val) ? Number(val).toFixed(this.decimalCount) : '') : val.toString();
      }
  
      const formattedValue = value?.replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
  
      this.control.setValue(formattedValue);
    }
    else {
      this.control.setValue(val);
    }
  }
  
  setDisabledState(isDisabled: boolean) {
    isDisabled == true ? this.control.disable() : this.control.enable()
  }
  
  removeCommas(value: string): string {
    return value.replace(/,/g, '');
  }
  
  formatInput(event: any): void {
    const isFocused = document.activeElement === event.target;
    if (this.inputType === 'Number') {
      let value = this.removeCommas(event.target.value);
      // ... rest of the code
      if (isFocused) {
        // Remove commas when the field is focused
        value = value.replace(/,/g, '');
      } else {
        // Add commas as thousand separators when the field is blurred
        value = value.replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
      }
      // Update the input field value
      event.target.value = value;
  
      // Call the onChange method with the float value
      this.onChange(parseFloat(this.removeCommas(value)));
    } else {
      this.onChange(event.target.value);
    }
  }
  
  
  onFocus(event: any): void {
    // Remove commas when the field is focused
    event.target.value = this.removeCommas(event.target.value);
  }
  
  
  onBlur(event: any): void {
    this.onTouch();
  
    if (this.autoAddDecimal && this.decimalCount > 0 && event?.target?.value) {
      let value = event.target.value;
  
      // Remove commas from the value
      const valueWithoutCommas = value.replace(/,/g, '');
  
      // Check if the value has a decimal point
      if (valueWithoutCommas.indexOf('.') === -1) {
        // Add the decimal point and the required number of decimal places
        value = parseFloat(valueWithoutCommas)?.toFixed(this.decimalCount);
  
        // Add commas as thousand separators
        value = value.replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
  
        // Update the input field value
        event.target.value = value;
      }
    }
  
    // Add commas as thousand separators when the field is blurred
    if (event?.target?.value) {
      const value = event.target.value.replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
      event.target.value = value;
    }
  }
  
  customUpdate(value: any) {
    if (this.inputType == 'Text') {
      this.onChange(value)
    }
    else {
      // Remove commas from the value
      const valueWithoutCommas = value.replace(/,/g, '');

      // Convert the value to a float
      const floatValue = parseFloat(valueWithoutCommas);

      this.onChange(floatValue)
    }
  }
  Validate(data) {
    //debugger;
    if (data.target.value > 100) {
      data.target.value = 100
    }
    console.log(data);
  }


}
