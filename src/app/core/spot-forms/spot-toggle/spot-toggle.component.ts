import { E } from '@angular/cdk/keycodes';
import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'spot-toggle',
  templateUrl: './spot-toggle.component.html',
  styleUrls: ['./spot-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpotToggleComponent),
      multi: true
    }
  ]
})
export class SpotToggleComponent implements OnInit, ControlValueAccessor {
  @Input() showLabel: boolean = true
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip'
  @Input() mode: 'toggle' | 'dropDown' = 'toggle'
  dropDownArray = ["Yes", "No"]
  formFieldHelpers: any
  onTouch: any = () => { };
  onChange: any = () => { };
  form: FormGroup;
  disabled = false;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      control: '',
    })
    /*if (this.mode == "toggle") {
      this.control.valueChanges.subscribe(res => {
        this.onChange(res)
      })
    }*/
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
    if (this.mode == 'toggle') {
      this.control.setValue(val);
    }
    else {
      if (val) {
        this.control.setValue("Yes")
      }
      else {
        this.control.setValue("No")
      }
    }
  }
  consoleLogger(event: any){
    console.log(event)
  }
  optionSelect(event: any) {
    if (event == "Yes") {
      this.onChange(true)
    }
    else {
      this.onChange(false)
    }
  }
  setDisabledState(isDisabled: boolean) {
    isDisabled == true ? this.control.disable() : this.control.enable()
  }
}
