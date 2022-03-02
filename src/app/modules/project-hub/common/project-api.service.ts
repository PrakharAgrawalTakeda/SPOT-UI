import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(private http:HttpClient, private authService: MsalService) {}
  async getproject(projectid){
    var url = "https://localhost:44304/api/Projects/"+ projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
}
