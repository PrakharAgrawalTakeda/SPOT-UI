import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';

@Component({
  selector: 'app-business-case',
  templateUrl: './business-case.component.html',
  styleUrls: ['./business-case.component.scss']
})
export class BusinessCaseComponent implements OnInit {

  constructor(private projectHubService: ProjectHubService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, private _fuseNavigationService: FuseNavigationService, private router: Router) {
    this.projectHubService.submitbutton.subscribe(res => {
      if (res == true) {
        this.dataloader()
      }
    })
    this.router.events.subscribe(res => {
      if (this.viewContent) {
        this.navItem = null
        this.reloadName()
      }
    })
  }
  id: string = ''
  viewContent: boolean = false
  reportInfoData: any = {}
  navItem: any
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getReportInfoData(this.id).then(res => {
      console.log("Report Info", res)
      console.log("Router", this.router)
      this.reportInfoData = res
      this.reloadName()
      this.viewContent = true
    })
  }
  isNavActive(link: string): boolean {
    return this.router.url.includes(link)
  }
  reloadName() {
    const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('projecthub-navigation');
    if (this.router.url.includes('recommended-option')) {
      this.navItem = this._fuseNavigationService.getItem('recommended-option', navComponent.navigation)
    }
    else if (this.router.url.includes('option-2')) {
      this.navItem = this._fuseNavigationService.getItem('option-2', navComponent.navigation)
    }
    else if (this.router.url.includes('option-3')) {
      this.navItem = this._fuseNavigationService.getItem('option-3', navComponent.navigation)
    }
    else if (this.router.url.includes('general-info')) {
      this.navItem = {
        title: 'General Info',
        children: [
          {
            title:'Recommended Option',
            link:'business-case/recommended-option/option-info'
          },
          {
            title:'Option 2',
            link:'business-case/option-2/option-info'
          },
          {
            title:'Option 3',
            link:'business-case/option-3/option-info'
          }
        ]
      }
    }
  }
}
