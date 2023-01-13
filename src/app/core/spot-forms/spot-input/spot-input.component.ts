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

  @Input() showLabel: boolean = true 
  @Input() label: string = '' 
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false 
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip'|'mat-hint' = 'tooltip'
  @Input() Required: boolean = false;
  
  

  formFieldHelpers: any
  onTouch: any = () => { };
  onChange: any = () => { };
  form: FormGroup;
  disabled = false;
  @Input() max=false;
  @Input() len = 3;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log("Length", this.len , this.max)
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
}
