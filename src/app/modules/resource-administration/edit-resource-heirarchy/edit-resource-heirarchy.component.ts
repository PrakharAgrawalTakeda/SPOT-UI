import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { FuseNavigationService } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';
import { ResourceAdministrationService } from '../resource-administration.service';

@Component({
  selector: 'app-edit-resource-heirarchy',
  templateUrl: './edit-resource-heirarchy.component.html',
  styleUrls: ['./edit-resource-heirarchy.component.scss']
})
export class EditResourceHeirarchyComponent implements OnInit {
  viewContent: boolean = false
  constructor(private router: Router, private _fuseNavigationService: FuseNavigationService, public auth: AuthService, private authService: MsalService,
    public resourceadminservice: ResourceAdministrationService) {

  }
  ngOnInit(): void {
    console.log("I'm here")
    this.viewContent = true;
  }
}
