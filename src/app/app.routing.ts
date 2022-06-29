import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { MsalGuard } from './core/auth/msal.guard';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: '', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },
    {
        path       : '',
        component  : LayoutComponent,
        canActivate: [MsalGuard],
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            {path: 'dashboard', loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
            {path: 'portfolio-center', loadChildren: () => import('app/modules/portfolio-center/portfolio-center.module').then(m => m.PortfolioCenterModule)},
            {path: 'project-hub/:id', loadChildren: () => import('app/modules/project-hub/project-hub.module').then(m => m.ProjectHubModule)},
            {path: 'spot-documents', loadChildren: () => import('app/modules/spot-documents/spot-documents.module').then(m => m.SpotDocumentsModule)}
        ]
    }
];
