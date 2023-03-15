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
  @Input() decimalCount: number = 2
  @Input() autoAddDecimal: boolean = false
  @Input() inputType: 'Text' | 'Number' = 'Text'
  @Input() showLabel: boolean = true
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip'
  @Input() Required: boolean = false;



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

  writeValue(val: string) {
    this.control.setValue(val);
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled == true ? this.control.disable() : this.control.enable()
  }

  formatInput(event: any): void {
    if (this.inputType == 'Number') {
      let value = event.target.value;

      // Remove non-numeric and non-decimal characters
      value = value.replace(/[^\d.]/g, '');

      if (this.decimalCount === 0) {
        // Remove any decimal points if decimalCount is 0
        value = value.replace(/\./g, '');
      } else {
        // Allow only one decimal point
        value = value.replace(/(\..*)\./g, '$1');

        // Round the decimal value to decimalCount decimal places if needed
        const decimalIndex = value.indexOf('.');
        if (decimalIndex !== -1 && decimalIndex + this.decimalCount + 1 < value.length) {
          value = parseFloat(value).toFixed(this.decimalCount);
        }
      }

      // Add commas as thousand separators
      value = value.replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');

      // Update the input field value
      event.target.value = value;
    }
  }

  onBlur(event: any): void {
    this.onTouch()
    if (this.autoAddDecimal && this.decimalCount > 0) {
      let value = event.target.value;

      // Remove commas from the value
      const valueWithoutCommas = value.replace(/,/g, '');

      // Check if the value has a decimal point
      if (valueWithoutCommas.indexOf('.') === -1) {
        // Add the decimal point and the required number of decimal places
        value = parseFloat(valueWithoutCommas).toFixed(this.decimalCount);

        // Add commas as thousand separators
        value = value.replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');

        // Update the input field value
        event.target.value = value;
      }
    }
  }

  Validate(data) {
    debugger;
    if (data.target.value > 100) {
      data.target.value = 100
    }
    console.log(data);
  }


}
