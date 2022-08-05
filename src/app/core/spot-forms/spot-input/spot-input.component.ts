import { Component, OnInit, forwardRef, Input, ViewChild, ElementRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, Subject, timer } from 'rxjs';
import { distinctUntilChanged, debounce } from 'rxjs/operators';
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
  
  

  formFieldHelpers: any
  separatorKeysCodes: number[] = [13, 9]
  onTouch: any = () => { };
  onChange: any = () => { };
  form: FormGroup;
  filteredOptions: any;
  disabled = false;
  debounceHelper = new Subject();

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
    if(isDisabled == true){
      this.control.disable()
    }
  }
}
