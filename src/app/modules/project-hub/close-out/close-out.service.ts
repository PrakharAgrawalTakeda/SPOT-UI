import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from 'app/shared/global-variables';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CloseOutApiService {

    constructor(private http: HttpClient) { }

    
}
