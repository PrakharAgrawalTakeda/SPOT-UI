import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-spot-input-forecast',
    templateUrl: './spot-input-forecast.component.html',
    styleUrls: ['./spot-input-forecast.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SpotInputForecastComponent),
            multi: true,
        },
    ],
})
export class SpotInputForecastComponent implements OnInit, ControlValueAccessor {
    @Input() decimalCount: number = 0
    @Input() autoAddDecimal: boolean = false
    @Input() isBlue: boolean = false
    @Output() valueChanged = new EventEmitter<number>();
    @Output() pasteEvent = new EventEmitter<ClipboardEvent>();
    value: any = '';
    formFieldHelpers: any
    onTouch: any = () => {
    };
    onChange: any = () => {
    };
    form: FormGroup;
    disabled = false;

    constructor(private fb: FormBuilder) {
    }

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
        let value = '';
        if (val != null && val !== '') {
            value = this.autoAddDecimal ? (Number(val) ? Number(val).toFixed(this.decimalCount) : '') : val.toString();
        }
        if (this.decimalCount === 0) {
            value = value.replace(/\..*/, '');
        }
        const formattedValue = value?.replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
        this.control.setValue(formattedValue);
    }

    setDisabledState(isDisabled: boolean) {
        isDisabled == true ? this.control.disable() : this.control.enable()
    }

    formatInput(event: any): void {
        const isFocused = document.activeElement === event.target;
        let value = event.target.value;
        const regex = /[^\d.]/g;
        value = value.replace(regex, '');
        if (this.decimalCount === 0) {
            value = value.replace(/\..*/, '');
        } else {
            value = value.replace(/(\..*)\./g, '$1');
            const decimalIndex = value.indexOf('.');
            if (decimalIndex !== -1 && decimalIndex + this.decimalCount + 1 < value.length) {
                value = parseFloat(value)?.toFixed(this.decimalCount);
            }
        }
        if (!isFocused) {
            value = value.replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
        }
        event.target.value = value;
        this.onChange(parseFloat(value));
    }

    onBlur(event: any): void {
        this.onTouch();
        if (this.autoAddDecimal && this.decimalCount > 0 && event?.target?.value) {
            let value = event.target.value;
            const valueWithoutCommas = value.replace(/,/g, '');
            if (valueWithoutCommas.indexOf('.') === -1) {
                value = parseFloat(valueWithoutCommas)?.toFixed(this.decimalCount);
                value = value.replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                event.target.value = value;
            }
        }
        if (event?.target?.value) {
            const value = event.target.value.replace(/(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
            event.target.value = value;
        }
    }
    onInputChange(event: any): void {
        this.formatInput(event);
        this.recalculateAnnualTotal(event.target.value);
    }
    recalculateAnnualTotal(newValue: number) {
        this.valueChanged.emit(newValue);
    }
    onPaste(event: ClipboardEvent) {
        this.pasteEvent.emit(event);
    }
}
