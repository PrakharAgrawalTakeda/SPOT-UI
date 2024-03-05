import {
    Component,
    OnInit,
    forwardRef,
    Input,
    Output,
    EventEmitter,
    ViewChild,
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
} from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
@Component({
    selector: 'spot-textarea',
    templateUrl: './spot-textarea.component.html',
    styleUrls: ['./spot-textarea.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SpotTextareaComponent),
            multi: true,
        },
    ],
})
export class SpotTextareaComponent implements OnInit, ControlValueAccessor {
    @Input() showLabel: boolean = true;
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() showHint: boolean = false;
    @Input() hint: string = '';
    @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip';
    @Input() rows: number = 5;
    @Input() maxLength = 100000000;
    @Input() Required: boolean = false;
    @Input() isQuill: boolean = false;

    formFieldHelpers: any;
    onTouch: any = () => {};
    onChange: any = () => {};
    selected: any = () => {};
    form: FormGroup;
    disabled = false;
    @ViewChild('quill') quill: QuillEditorComponent;
    editorOptions = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }],
            [{ font: [] }],
            [{ align: [] }],
        ],
    };

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

    writeValue(val: string) {
        this.control.setValue(val);
    }

    setDisabledState(isDisabled: boolean) {
        isDisabled == true ? this.control.disable() : this.control.enable();
    }

    selectValue(event) {
        if (event.editor.getLength() > this.maxLength) {
            event.editor.deleteText(this.maxLength, event.editor.getLength());
        }
    }
}
