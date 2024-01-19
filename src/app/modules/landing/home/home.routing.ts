import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

export const landingHomeRoutes: Route[] = [
    {
        path     : '',
        component: LandingHomeComponent
    },
    {
        path     : 'coming-soon',
        component: ComingSoonComponent
    }

];
