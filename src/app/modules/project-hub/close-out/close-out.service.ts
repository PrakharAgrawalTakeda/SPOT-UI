import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from 'app/shared/global-variables';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CloseOutApiService {

    constructor(private http: HttpClient) { }

    async getCloseoutOutcomes(projectid: string) {
        // var options = {
        //     "headers": {
        //         "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc1MzE5MDc2LCJuYmYiOjE2NzUzMTkwNzYsImV4cCI6MTY3NTMyMzY0MiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWc4Q3JNNUtSNUJyVTR3WGhsbWpUSDIyaWwxb0NzaDVBeldraE9sMG5SMHUzRUM0SStkNFVMeFZsRnV0NHZVc2kiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjI3LjU0LjE4NS4xMDEiLCJuYW1lIjoiV2FnbGF3YWxhLCBaZW5hYiAoZXh0KSIsIm9pZCI6IjgxOTViMDhiLWNhZjYtNDExOS04NWI0LTQyYWU4ZDdmOWU5NyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjQzNDA5NzI3LTE5MzIwNzY1MjItNDA3NjUyMjc1MS04NDE1MzIiLCJyaCI6IjAuQVJBQU9fYjlWeUotbzBXRDNOTndBeFk2cm52SlZ4VEVPWWxIbXNZY2Vqa2hIWm9RQU5RLiIsInNjcCI6IkFwaS5SZWFkIiwic3ViIjoidHkxbEdaOXpTRHFaOG5BY194TjVSVldMRm1MSEFtTzVDNm5Xdm5GeVppZyIsInRpZCI6IjU3ZmRmNjNiLTdlMjItNDVhMy04M2RjLWQzNzAwMzE2M2FhZSIsInVuaXF1ZV9uYW1lIjoiemVuYWIud2FnbGF3YWxhQHRha2VkYS5jb20iLCJ1cG4iOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInV0aSI6IjQ2dFNoaUpDOEUtOFJKRldXZThhQUEiLCJ2ZXIiOiIxLjAifQ.DGYRK6KAYAo3Hd347n_xJ7xOmKnQ1UtdJFfe1T43U_tMT2UpbdcvUkqN0QX_SwVxAdN-P_AKEP1Ao0JmFnwkXTXxeulT6so6h0va4hyuxmB-krLfPLDifFPBVzn5M1rYPTWNH5veoz3zB862q3KEoPK8Kzxr3rvzY5WffQMbtw3hOI5OKOtEVA_--v-pF2Y3y7NJMYLKDM9UZ9JcySBhFO_w-KQRrSIwXbgY-D3vG4Y5M9JWIxOPTl8zeXK_CIWAbx8YH_EjJCGYeUmKsx2PhlgnjWeByTvrC-keWXUHkI6YqVOX271OY_P457zkBepY361PAlY0PSyq0SNfXxMf4w"
        //     }
        // }
        // var url = "https://localhost:7288/api/ProjectCloseOut/Outcomes/" + projectid
        var url = GlobalVariables.apiurl + "ProjectCloseOut/Outcomes/" + projectid
        const abc$ = this.http.get(url)
        const response = await lastValueFrom(abc$)
        return response
    }

    async patchCloseoutOutcomes(projectid: string, data) {
        var url = GlobalVariables.apiurl + "ProjectCloseOut/Outcomes/" + projectid
        const abc$ = this.http.patch(url, data)
        const response = await lastValueFrom(abc$)
        return response
    }
}
