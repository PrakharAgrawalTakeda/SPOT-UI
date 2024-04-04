import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from 'app/shared/global-variables';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) {
  }

  async updateRole(userid: string, securityGroupId: string) {
    var link = GlobalVariables.apiurl + "SecurityRoles/" + userid + "?SecurityGroupId=" + securityGroupId
    const abc$ = this.http.put(link, securityGroupId)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getGlobalMessages() {
    var url = GlobalVariables.apiurl + "GlobalMessages"
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async updateGlobalMessage(messageId, body) {
    var link = GlobalVariables.apiurl + "GlobalMessages/" + messageId
    const abc$ = this.http.put(link, body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async addGlobalMessage(body) {
    var link = GlobalVariables.apiurl + "GlobalMessages"
    const abc$ = this.http.post(link, body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async deleteGlobalMessage(messageId) {
    var link = GlobalVariables.apiurl + "GlobalMessages/"+ messageId
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }
}
