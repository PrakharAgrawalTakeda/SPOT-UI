import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { GlobalVariables } from 'app/shared/global-variables';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'spot-global-message',
  templateUrl: './spot-global-message.component.html',
  styleUrls: ['./spot-global-message.component.scss']
})
export class SpotGlobalMessageComponent implements OnInit {
  globalMessage: string = null
  dismissed: boolean = false
  @Input() callLocation: 'PortfolioCenter' | 'ProjectHub' | 'CreateNew' | 'MyPreference' = null
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.getGlobalMessage().then((response: any) => {
      this.globalMessage = response.globalMessageText
      console.log("CALL LOCATION", this.callLocation)
    })
  }
  afterDismissed(event:any){
    this.dismissed = event
  }
  async getGlobalMessage() {
    var url = GlobalVariables.apiurl + "GlobalMessages"
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
}
