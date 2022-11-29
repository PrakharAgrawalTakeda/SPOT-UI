import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'spot-textarea',
  templateUrl: './spot-textarea.component.html',
  styleUrls: ['./spot-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpotTextareaComponent),
      multi: true
    }
  ]
})
export class SpotTextareaComponent implements OnInit, ControlValueAccessor {

  @Input() showLabel: boolean = true 
  @Input() label: string = '' 
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false 
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip'|'mat-hint' = 'tooltip'
  @Input() rows: number = 5
  @Input() maxLength = 100000000
  

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
}
