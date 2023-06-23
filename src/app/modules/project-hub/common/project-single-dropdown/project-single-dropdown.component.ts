import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalVariables } from 'app/shared/global-variables';
import {debounceTime, filter, lastValueFrom, map, Observable, startWith, Subject, takeUntil} from 'rxjs';
import {ProjectHubService} from "../../project-hub.service";
import { RoleService } from 'app/core/auth/role.service';

@Component({
  selector: 'app-project-single-dropdown',
  templateUrl: './project-single-dropdown.component.html',
  styleUrls: ['./project-single-dropdown.component.scss']
})
export class ProjectSingleDropdownComponent implements OnInit {

  @Input() formgroup: FormGroup;
  @Input() label: string;
  @Input() showHint: boolean = false
  @Input() hint: string = ''
  @Input() hideRelations: boolean = false
  @Input() confiedentialProjects: 'None' | 'User' = 'User'

  options: string[] = ['One', 'Two', 'Three'];
  resultSets: any[];
  minLength = 4
  debounce = 400
  filteredOptions: any
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _httpClient: HttpClient,public projecthubservice: ProjectHubService,private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.filteredOptions = this.formgroup.controls.projectsingle.valueChanges.pipe(
      debounceTime(this.debounce),
      takeUntil(this._unsubscribeAll),
      map((value) => {

        // Set the resultSets to null if there is no value or
        // the length of the value is smaller than the minLength
        // so the autocomplete panel can be closed
        if (!value || value.length < this.minLength) {
          this.resultSets = null;
          if (value == ''){
            this.formgroup.patchValue({
              projectsingle: '',
              projectsingleid: ''
            })
          }
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
        this._httpClient.post(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`, { body: [] })
          .subscribe((resultSets: any) => {
              let abc$;
              if (this.hideRelations) {
                  var ids = [];
                  abc$ = this._httpClient.get(GlobalVariables.apiurl + `ProjectHubData/ProjectTree/${this.projecthubservice.projectid}`)
                  const response =  lastValueFrom(abc$)
                  response.then((res: any) => {
                      res.values.forEach(project => {
                          ids.push(project.problemUniqueId);
                      })
                      this.projecthubservice.removedIds = ids;
                      for (var i = 0; i < resultSets.projectData.length; i++) {
                          var obj = resultSets.projectData[i];
                          if (this.projecthubservice.removedIds.indexOf(obj.problemUniqueId) !== -1) {
                              resultSets.projectData.splice(i, 1);
                              i--;
                          }
                      }
                  })


              }
            // Store the result sets
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
            console.log(this.resultSets)
            console.log(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`)
            // Execute the event
            //this.search.next(resultSets);
          });
      });
  }

  onProjectSelectenter(option: any) {
    console.log(option.option.value)
    this.formgroup.patchValue({
      projectsingle: option.option.value.problemTitle,
      projectsingleid: option.option.value.problemUniqueId
    })
  }
}
