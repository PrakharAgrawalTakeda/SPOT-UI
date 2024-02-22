import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UnderDeploymentComponent } from './under-deployment/under-deployment.component';
import { AccessDeniedComponent } from '../access-denied/access-denied.component';

export const landingHomeRoutes: Route[] = [
    {
        path     : '',
        component: LandingHomeComponent
    },
    {
        path     : 'coming-soon',
        component: ComingSoonComponent
    },
    {
        path     : 'under-deployment',
        component: UnderDeploymentComponent
    },
    {
        path     : 'access-denied',
        component: AccessDeniedComponent
    }

];
