import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { MsalGuard } from './core/auth/msal.guard';
import { OldUrlRedirectResolver } from './core/auth/old-url-redirect.resolver';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: '', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [MsalGuard],
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'admin', loadChildren: () => import('app/modules/admin/admin.module').then(m => m.AdminModule) },
            { path: 'dashboard', loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'portfolio-center', loadChildren: () => import('app/modules/portfolio-center/portfolio-center.module').then(m => m.PortfolioCenterModule) },
            { path: 'create-project', loadChildren: () => import('app/modules/create-new/create-new.module').then(m => m.CreateNewModule) },
            { path: 'project-hub/:id', loadChildren: () => import('app/modules/project-hub/project-hub.module').then(m => m.ProjectHubModule) },
            { path: 'my-preference', loadChildren: () => import('app/modules/my-preference/my-preference.module').then(m => m.MyPreferenceModule) },
            { path: 'create-project', loadChildren: () => import('app/modules/create-new/create-new.module').then(m => m.CreateNewModule) },
            { path: 'resource-administration', loadChildren: () => import('app/modules/resource-administration/resource-administration.module').then(m => m.ResourceAdministrationModule) }
        ]
    },
    {
        path: 'HTML/ProjectHub.html',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        resolve: { redirect: OldUrlRedirectResolver }
    },
    {
        path: 'HTML/MyPreferences.html',
        redirectTo: '/my-preference/settings',
        pathMatch: 'full'
    },
    // {
    //     path: 'HTML/ResourceAdministration.html',
    //     redirectTo: '/resource-administration',
    //     pathMatch: 'full'
    // },
    {
        path: 'HTML/SecurityGroupUsers.html',
        redirectTo: '/admin',
        pathMatch: 'full'
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
