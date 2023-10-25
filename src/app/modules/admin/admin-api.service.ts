import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalVariables} from 'app/shared/global-variables';
import {lastValueFrom} from 'rxjs';
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
}
