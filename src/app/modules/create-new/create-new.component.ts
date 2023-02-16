import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PortfolioApiService } from './../portfolio-center/portfolio-api.service';
import { Router } from '@angular/router';
import { SpotlightIndicatorsService } from './../../core/spotlight-indicators/spotlight-indicators.service';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './../../core/auth/auth.service';
import { FuseNavigationService } from './../../../@fuse/components/navigation/navigation.service';
import { Title } from '@angular/platform-browser';
import $ from "jquery";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProjectHubService } from './../project-hub/project-hub.service';
import { GeneralInfoComponent } from './../project-hub/general-info/general-info.component';
import { EventType } from '@azure/msal-browser';
import { Route } from '@angular/router'



@Component({
    selector: 'app-create-new',
    templateUrl: './create-new.component.html',
    styleUrls: ['./create-new.component.scss']
})

export class CreateNewComponent implements OnInit {

    constructor(private router: Router) {

    }
    ngOnInit(): void {

    }
}