import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalVariables } from 'app/shared/global-variables';
import { debounceTime, filter, map, Observable, startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-single-dropdown',
  templateUrl: './user-single-dropdown.component.html',
  styleUrls: ['./user-single-dropdown.component.scss']
})
export class UserSingleDropdownComponent implements OnInit {
  @Input() formgroup: FormGroup;
  @Input() label: string;
  options: string[] = ['One', 'Two', 'Three'];
  resultSets: any[];
  minLength = 4
  debounce = 400
  filteredOptions: any
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.filteredOptions = this.formgroup.controls.usersingle.valueChanges.pipe(
      debounceTime(this.debounce),
      takeUntil(this._unsubscribeAll),
      map((value) => {

        // Set the resultSets to null if there is no value or
        // the length of the value is smaller than the minLength
        // so the autocomplete panel can be closed
        if (!value || value.length < this.minLength) {
          this.resultSets = null;
        }

        // Continue
        return value;
      }),
      // Filter out undefined/null/false statements and also
      // filter out the values that are smaller than minLength
      filter(value => value && value.length >= this.minLength)
    )
      .subscribe((value) => {
        const params = new HttpParams().set('query', value);
        this._httpClient.post(GlobalVariables.apiurl + `ProjectTeams/UserSearch?${params.toString()}`, { body: [] })
          .subscribe((resultSets: any) => {

            // Store the result sets
            this.resultSets = resultSets;
            console.log(this.resultSets)
            console.log(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`)
            // Execute the event
            //this.search.next(resultSets);
          });
      });
  }

  onUserSelect(option: any){
    this.formgroup.patchValue({
      usersingle: option.userDisplayName,
      usersingleid: option.userAdid
    })
    
  }
  onUserSelectenter(option: any){
    console.log(option.option.value)
    this.formgroup.patchValue({
      usersingle: option.option.value.userDisplayName,
      usersingleid: option.option.value.userAdid
    })
  }
}
