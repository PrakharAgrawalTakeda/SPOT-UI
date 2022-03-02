import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { PortfolioCenterComponent } from './modules/portfolio-center/portfolio-center.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProjectHubComponent } from './modules/project-hub/project-hub.component';

export function MsalInstanceFactory(): IPublicClientApplication{
    return new PublicClientApplication({
        auth: {
          authority : 'https://login.microsoftonline.com/57fdf63b-7e22-45a3-83dc-d37003163aae',
          clientId: '1457c97b-39c4-4789-9ac6-1c7a39211d9a',
          redirectUri: 'http://localhost:4200/',
        }
      });
}
const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        MsalModule,

    ],
    bootstrap   : [
        AppComponent
    ],
    providers :[
        {
            provide: MSAL_INSTANCE,
            useFactory: MsalInstanceFactory
        },
        MsalService
    ]
})
export class AppModule
{
}
