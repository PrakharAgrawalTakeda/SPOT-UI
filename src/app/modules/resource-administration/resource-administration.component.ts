import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';
import { MsalService } from '@azure/msal-angular';
import moment from 'moment';
import { ResourceAdministrationService } from './resource-administration.service';

@Component({
  selector: 'app-resource-administration',
  templateUrl: './resource-administration.component.html',
  styleUrls: ['./resource-administration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResourceAdministrationComponent implements OnInit {
    activeaccount: any;
    newmainnav: any = []

    constructor(private router: Router, private _fuseNavigationService: FuseNavigationService, public auth: AuthService, private authService: MsalService,
      public resourceadminservice: ResourceAdministrationService) {

    }
    ngOnInit(): void {
      const mainNavComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
      this.activeaccount = this.authService.instance.getActiveAccount();

      this.newmainnav = [
        {
          id: 'portfolio-center',
          title: 'Portfolio Center',
          type: 'basic',
          link: '/portfolio-center'
        },
        {
          title: 'Create Project',
          type: 'collapsable',
          link: '/create-project',
          children: [
            {
              title: 'Create a Standard/Simple Project/Program',
              type: 'basic',
              link: '/create-project/create-new-project'
            },
            {
              title: 'Create a Strategic Initiative/Program',
              type: 'basic',
              link: '/create-project/create-strategic-initiative-project'
            },
            {
              title: 'Copy an existing Project',
              type: 'basic',
              link: '/create-project/copy-project'
            }
          ],
        },
        {
          id: 'resource-administration',
          title: 'Resource Administration',
          type: 'basic',
          link: '/resource-administration',
          externalLink: true,
          target: '_blank',
        },
        {
          id: 'spot-documents',
          title: 'SPOT Supporting Documents',
          type: 'basic',
          externalLink: true,
          link: 'https://mytakeda.sharepoint.com/sites/PMT-SPOT/SitePages/home.aspx',
          target: '_blank'
        },
        {
          id: 'report-navigator',
          title: 'Report Navigator',
          type: 'basic',
          link: 'https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/e6c7feb2-8dca-49ea-9eff-9596f519c64e/ReportSectiona2d604c32b4ad7a54177?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae',
          externalLink: true,
          target: "_blank"
  
        },
        {
          id: 'spot-support',
          title: 'Need Help or Propose a Change',
          type: 'basic',
          link: 'mailto:DL.SPOTSupport@takeda.com?Subject=SPOT Support Request ' + this.activeaccount.name + ' (Logged on ' + moment().format('llll') + ')',
          externalLink: true,
          target: "_blank"
  
        }
      ]
  mainNavComponent.navigation = this.newmainnav;
  mainNavComponent.refresh();
  console.log("Inside init")
    }

    test() {

    }
}
