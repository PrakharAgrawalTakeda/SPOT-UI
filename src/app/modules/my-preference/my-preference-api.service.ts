import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from 'app/shared/global-variables';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyPreferenceApiService {

  constructor(private http: HttpClient) { }

  async updateRole(userid: string, securityGroupId:string){
    var link = GlobalVariables.apiurl+"SecurityRoles/" + userid+"?SecurityGroupId="+securityGroupId
    const abc$ = this.http.put(link,securityGroupId)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getuserPreference(userid: string) {
    var url = GlobalVariables.apiurl + "UserPreference/" + userid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }

  async updateuserPreference(userid, body){
    var link = GlobalVariables.apiurl+"UserPreference/" + userid
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
}
