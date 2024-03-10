import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
} from '@angular/forms';
@Component({
    selector: 'spot-input',
    templateUrl: './spot-input.component.html',
    styleUrls: ['./spot-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SpotInputComponent),
            multi: true,
        },
    ],
})
export class SpotInputComponent implements OnInit, ControlValueAccessor {
    @Input() decimalCount: number = 0;
    @Input() autoAddDecimal: boolean = false;
    @Input() inputType: 'Text' | 'Number' | 'Time' = 'Text';
    @Input() showLabel: boolean = true;
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() showHint: boolean = false;
    @Input() hint: string = '';
    @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip';
    @Input() Required: boolean = false;
    @Input() callLocation: 'View' | 'Edit' = 'Edit';
    @Input() allowNegativeValues: boolean = false;
    @Input() isLabelStrong: boolean = false;
    firstTimeFocus: boolean = true; // Flag to track the first focus for time input

    formFieldHelpers: any;
    onTouch: any = () => {};
    onChange: any = () => {};
    form: FormGroup;
    disabled = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            control: '',
        });
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
            if (isNaN(val)) {
                val = '';
            }
            let value = '';
            if (val != null && val !== '') {
                value = this.autoAddDecimal
                    ? Number(val)
                        ? Number(val).toFixed(this.decimalCount)
                        : ''
                    : val.toString();
            }
            if (this.decimalCount === 0) {
                // Remove any decimal points if decimalCount is 0
                value = value.replace(/\..*/, '');
            }
            const formattedValue = value?.replace(
                /(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                '$1,'
            );

            this.control.setValue(formattedValue);
        } else if (this.inputType == 'Time') {
            if (this.isValidTimeFormat(val)) {
                // Value is in correct time format
                this.control.setValue(val);
            } else if (/^\d+$/.test(val)) {
                // Value is a whole number, treat as minutes and convert to HH:MM format
                const minutes = parseInt(val);
                const hours = Math.floor(minutes / 60);
                const remainingMinutes = minutes % 60;
                const formattedTime = `${hours
                    .toString()
                    .padStart(2, '0')}:${remainingMinutes
                    .toString()
                    .padStart(2, '0')}`;
                this.control.setValue(formattedTime);
            } else {
                // If the value is not in a recognized format, set it to an empty string or a default time value
                this.control.setValue('');
            }
        } else {
            this.control.setValue(val);
        }
    }

    setDisabledState(isDisabled: boolean) {
        isDisabled == true ? this.control.disable() : this.control.enable();
    }

    formatInput(event: any): void {
        const isFocused = document.activeElement === event.target;
        if (this.inputType === 'Number') {
            let value = event.target.value;

            // Remove non-numeric, non-decimal, and non-negative sign characters
            const regex = this.allowNegativeValues ? /[^\d.-]/g : /[^\d.]/g;
            value = value.replace(regex, '');

            if (this.allowNegativeValues) {
                // Allow only one negative sign and ensure it is at the beginning
                value = value.replace(/(?!^)-/g, '');
            }

            if (this.decimalCount === 0) {
                // Remove any decimal points if decimalCount is 0
                value = value.replace(/\..*/, '');
            } else {
                // Allow only one decimal point
                value = value.replace(/(\..*)\./g, '$1');

                // Round the decimal value to decimalCount decimal places if needed
                const decimalIndex = value.indexOf('.');
                if (
                    decimalIndex !== -1 &&
                    decimalIndex + this.decimalCount + 1 < value.length
                ) {
                    value = parseFloat(value)?.toFixed(this.decimalCount);
                }
            }

            // Add commas as thousand separators only when the field is blurred
            if (!isFocused) {
                value = value.replace(
                    /(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                    '$1,'
                );
            }

            // Update the input field value
            event.target.value = value;

            // Call the onChange method with the float value
            this.onChange(parseFloat(value));
        } else if (this.inputType === 'Time') {
            let value = event.target.value;
            // Allow only digits and colon
            value = value.replace(/[^\d:]/g, '');
            event.target.value = value;
        } else {
            this.onChange(event.target.value);
        }
    }

    // Utility method to check if a string is a valid time format (HH:MM)
    isValidTimeFormat(timeStr) {
        const regex = /^(\d+):[0-5][0-9]$/; // Allows for hours greater than 24
        return regex.test(timeStr);
    }

    //   formatTimeInput(value) {
    //     let [hours, minutes] = value.split(':');

    //     // Validate and format hours
    //     if (hours) {
    //         let hoursInt = parseInt(hours, 10);
    //         if (isNaN(hoursInt) || hoursInt > 23) {
    //             hoursInt = 23;
    //         } else if (hoursInt < 0) {
    //             hoursInt = 0;
    //         }
    //         hours = hoursInt.toString().padStart(2, '0');
    //     } else {
    //         hours = '00';
    //     }

    //     // Validate and format minutes
    //     if (minutes) {
    //         let minutesInt = parseInt(minutes, 10);
    //         if (isNaN(minutesInt) || minutesInt > 59) {
    //             minutesInt = 59;
    //         } else if (minutesInt < 0) {
    //             minutesInt = 0;
    //         }
    //         minutes = minutesInt.toString().padStart(2, '0');
    //     } else {
    //         minutes = '00';
    //     }

    //     // Combine hours and minutes to get the final time string
    //     return hours + ':' + minutes;
    // }

    formatTimeOnBlur(value: string): string {
        let [hours, minutes] = value.split(':');

        // Format hours - allow any positive integer
        hours = this.formatHoursAsDuration(hours);

        // Format minutes - ensure they are between 00 and 59
        minutes = this.formatMinutes(minutes);

        return `${hours}:${minutes}`;
    }

    formatHoursAsDuration(hours: string): string {
        if (!hours) return '00';
        let hoursInt = parseInt(hours, 10);
        if (isNaN(hoursInt) || hoursInt < 0) hoursInt = 0; // Check for non-negative integers
        return hoursInt.toString().padStart(2, '0');
    }

    formatMinutes(minutes: string): string {
        if (!minutes) return '00';
        let minutesInt = parseInt(minutes, 10);
        if (isNaN(minutesInt) || minutesInt > 59) minutesInt = 59;
        return minutesInt.toString().padStart(2, '0');
    }

    onBlur(event: any): void {
        this.onTouch();
        console.log(event);
        // Time formatting logic
        if (this.inputType === 'Time' && event?.target?.value) {
            event.target.value = this.formatTimeOnBlur(event.target.value);
        }

        if (
            this.autoAddDecimal &&
            this.decimalCount > 0 &&
            event?.target?.value
        ) {
            let value = event.target.value;

            // Remove commas from the value
            const valueWithoutCommas = value.replace(/,/g, '');

            // Check if the value has a decimal point
            if (valueWithoutCommas.indexOf('.') === -1) {
                // Add the decimal point and the required number of decimal places
                value = parseFloat(valueWithoutCommas)?.toFixed(
                    this.decimalCount
                );

                // Add commas as thousand separators
                value = value.replace(
                    /(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                    '$1,'
                );

                // Update the input field value
                event.target.value = value;
            }
        }

        // Add commas as thousand separators when the field is blurred
        if (event?.target?.value && this.inputType == 'Number') {
            const value = event.target.value.replace(
                /(?<!\.\d*)(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                '$1,'
            );
            event.target.value = value;
        }
    }

    customUpdate(value: any) {
        if (this.inputType == 'Text') {
            this.onChange(value);
        } else {
            // Remove commas from the value
            const valueWithoutCommas = value.replace(/,/g, '');

            // Convert the value to a float
            const floatValue = parseFloat(valueWithoutCommas);

            this.onChange(floatValue);
        }
    }
    Validate(data) {
        //debugger;
        if (data.target.value > 100) {
            data.target.value = 100;
        }
        console.log(data);
    }
}
