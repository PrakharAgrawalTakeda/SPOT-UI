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
    this.formgroup.controls.usersingle.valueChanges.pipe(
      debounceTime(this.debounce),
      filter(value => value && value.length >= this.minLength),
      takeUntil(this._unsubscribeAll)
    ).subscribe(value => {
      const params = new HttpParams().set('query', value);
      this._httpClient.post(GlobalVariables.apiurl + `ProjectTeams/UserSearch?${params.toString()}`, { body: [] })
        .subscribe((resultSets: any) => {
          this.resultSets = resultSets
            .filter(obj => obj.userIsActive)
            .sort((a, b) => {
              const lastNameA = a.userDisplayName.split(',')[0].trim();
              const lastNameB = b.userDisplayName.split(',')[0].trim();
              return lastNameA.localeCompare(lastNameB);
            });

          console.log(this.resultSets);
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
    this.formgroup.patchValue({
      usersingle: option.option.value.userDisplayName,
      usersingleid: option.option.value.userAdid,

    })
  }
}
