import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UnderDeploymentComponent } from './under-deployment/under-deployment.component';
import { AccessDeniedComponent } from '../access-denied/access-denied.component';

@NgModule({
    declarations: [
        LandingHomeComponent,
        ComingSoonComponent,
        UnderDeploymentComponent,
        AccessDeniedComponent
    ],
    imports     : [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class LandingHomeModule
{
}
