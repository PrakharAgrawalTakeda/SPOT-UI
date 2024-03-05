import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';
import moment from 'moment';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent {
  supportUrl = ''
  constructor(private titleSerice: Title, private msal: MsalService){
    this.titleSerice.setTitle("Access Denied");
    this.supportUrl = 'mailto:DL.SPOTSupport@takeda.com?Subject=SPOT Support Request ' + this.msal.instance.getActiveAccount().name + ' (Logged on ' + moment().format('llll') + ')'
  }
}
