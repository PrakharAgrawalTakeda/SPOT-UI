import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RoleService } from 'app/core/auth/role.service';
import { GlobalVariables } from 'app/shared/global-variables';
import { Subject, debounceTime, filter, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-spot-multiselect-project-autocomplete',
  templateUrl: './spot-multiselect-project-autocomplete.component.html',
  styleUrls: ['./spot-multiselect-project-autocomplete.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpotMultiselectProjectAutocompleteComponent),
      multi: true
    }
  ]
})
export class SpotMultiselectProjectAutocompleteComponent {
  @Input() showLabel: boolean = true
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() showHint: boolean = false
  @Input() hint: string = ''
  @Input() hintPostion: 'tooltip' | 'mat-hint' = 'tooltip'
  @Input() dropDownArrayType: 'string' | 'object'
  @Input() dropDownArray: any = []
  valuePointer: string = 'problemTitle'
  idPointer: string = 'problemUniqueId'
  @Input() sortByType: 'valuePointer' | 'custom' = 'valuePointer'
  @Input() confiedentialProjects: 'None' | 'User' = 'User'
  @Input() customSortPointer: string = ''
  @Input() Required: boolean = false

  @ViewChild('input', {static: false}) Input: ElementRef<HTMLInputElement>

  filteredDropDownValues: any
  formFieldHelpers: any
  selectedOption: any = []
  isDisabled: boolean = false
  onTouch: any = () => { };
  onChange: any = () => { };
  form = new FormGroup({
    control: new FormControl(''),
    chipList: new FormControl([])
  });

  resultSets: any[];
  minLength = 4
  debounce = 400
  filteredOptions: any

  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  
  private unSubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _httpClient: HttpClient, private roleService: RoleService){
    // this.form.controls.control.valueChanges.subscribe((res: any) => {
    //   if (this.form.controls.control.value == "") {
    //     //this.onChange({})
    //     //this.selectedOption = {}
    //   }

    // })
    this.filteredDropDownValues= this.form.controls.control.valueChanges.pipe(
      debounceTime(this.debounce),
      takeUntil(this.unSubscribeAll),
      map((value) => {
        if (!value || value.length < this.minLength) {
          this.resultSets = null;
        }
        return value;
      }),
      filter(value => value && value.length >= this.minLength)
    )
    .subscribe((value)=> {
      const params = new HttpParams().set('query', value);
      this._httpClient.post(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`, { body: [] })
      .subscribe((resultSets:any) =>{
        this.resultSets = resultSets.projectData?.filter(x => !x.isConfidential);
        if (this.roleService.roleMaster?.confidentialProjects && this.confiedentialProjects == 'User') {
            if (this.roleService.roleMaster.confidentialProjects.length > 0) {
                var confProjectUserList = resultSets.projectData?.filter(x=>this.roleService.roleMaster.confidentialProjects.includes(x.problemUniqueId) )
                if(confProjectUserList?.length>0){
                    console.log(confProjectUserList)
                    this.resultSets = [...this.resultSets, ...confProjectUserList]
                }
            }
        }
        this.search.next(resultSets);
      })
    })
  }

  changeInput() {
    this.form.controls.control.patchValue('')
    this.Input.nativeElement.value = ''
  }
  
  ngOnInit() {
  }

  get control() {
    return this.form.get('control');
  }
  
  onFunctionSelect(event: any) {
    console.log(this.selectedOption)
    this.selectedOption.push(event.option.value)
    this.onChange(this.selectedOption)
    this.form.controls.chipList.patchValue(this.selectedOption)
    this.form.controls.chipList.markAsDirty()
    this.Input.nativeElement.blur()
    this.form.controls.control.patchValue('')
    this.Input.nativeElement.value = ''
  }

  removeOption(item: any) {
    this.selectedOption = this.selectedOption.filter(x => x[this.idPointer] != item[this.idPointer])
    this.form.controls.chipList.markAsDirty()
    this.form.controls.chipList.patchValue(this.selectedOption)
    this.onChange(this.selectedOption)
  }

  isOptionSelected(option: any): boolean {
    if (this.selectedOption && this.selectedOption.length > 0) {
      if (this.selectedOption.some(x => x[this.idPointer] == option[this.idPointer])) {
        return false
      }
    }
    return true
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: any) {
    if (val) {
      this.selectedOption = val
      this.form.controls.chipList.patchValue(this.selectedOption)
    }
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled == true) {
      this.isDisabled = true
      this.form.controls.chipList.disable()
    }
    else {
      this.isDisabled = false
      this.form.controls.chipList.enable()
    }
  }
}
