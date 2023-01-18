import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PortfolioApiService } from './../../portfolio-center/portfolio-api.service';
import { Router } from '@angular/router';
import { SpotlightIndicatorsService } from './../../../core/spotlight-indicators/spotlight-indicators.service';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './../../../core/auth/auth.service';
import { FuseNavigationService } from './../../../../@fuse/components/navigation/navigation.service';
import { Title } from '@angular/platform-browser';

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

import { ProjectHubService } from './../../project-hub/project-hub.service';
import { GeneralInfoSingleEditComponent } from './../../project-hub/general-info/general-info-single-edit/general-info-single-edit.component';
import { EventType } from '@azure/msal-browser';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  }
