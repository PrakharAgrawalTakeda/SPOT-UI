import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { GlobalVariables } from 'app/shared/global-variables';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateNewApiService {

  constructor(private http: HttpClient, private authService: MsalService) { }

  async updatePortfolioCenterData(projectid) {
    const params = new HttpParams().set('projectId', projectid)
    var link = GlobalVariables.apiurl + "Projects/UpdatePortfolioCenterData" + `?${params.toString()}`
    const abc$ = this.http.post(link, projectid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async createProject(body) {
    var userid = GlobalVariables.apiurl + "Projects/CreateProject"
    const abc$ = this.http.post(userid, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async createProjectStrategic(body) {
    var userid = GlobalVariables.apiurl + "Projects/CreateStrategicInitiativeProgram"
    const abc$ = this.http.post(userid, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async copyProject(body, projectid) {
    var userid = GlobalVariables.apiurl + "GeneralInfo/" + projectid
    const abc$ = this.http.put(userid, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getTemplateInfo(body) {
    var userid = GlobalVariables.apiurl + "Projects/GetProjectTemplateInfoByID"
    const abc$ = this.http.post(userid, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getQuality(projectid) {
    var userid = GlobalVariables.apiurl + "QualityReference/GetQualityReferenceByProjectId/" + projectid
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
}
