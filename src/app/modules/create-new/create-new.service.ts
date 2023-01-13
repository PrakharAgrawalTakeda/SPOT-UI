import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { IdToken } from '@azure/msal-common';
import { GlobalVariables } from 'app/shared/global-variables';
import { map } from 'lodash';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateNewService {

  constructor(private http: HttpClient, private authService: MsalService) { }
  async getfilterlist() {
    var userid = GlobalVariables.apiurl + "FilterProjects/FilterCriteria"
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getprojectlist(id: string) {
    var userid = GlobalVariables.apiurl + `Projects/Search?query=${id}`
    const abc$ = this.http.post(userid, id)
    const response = await lastValueFrom(abc$)
    return response
  }

 
}
