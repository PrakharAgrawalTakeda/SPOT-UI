import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
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
import { GlobalVariables } from './shared/global-variables';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { OldUrlRedirectResolver } from './core/auth/old-url-redirect.resolver';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorHandlerService } from './error-handler.service';
import { MyMonitoringService } from './logging.service';
import { MatIconModule } from '@angular/material/icon';
export function MsalInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication({
        auth: {
            authority: 'https://login.microsoftonline.com/57fdf63b-7e22-45a3-83dc-d37003163aae',
            clientId: '1457c97b-39c4-4789-9ac6-1c7a39211d9a',
            redirectUri: GlobalVariables.spotui,
        }
    });
}
const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
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
        MatIconModule,
        MatSnackBarModule

    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        { provide: ErrorHandler, useClass: ErrorHandlerService },
        MyMonitoringService,
        {
            provide: MSAL_INSTANCE,
            useFactory: MsalInstanceFactory
        },
        MsalService,
        Title,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        OldUrlRedirectResolver
    ]
})
export class AppModule {
}
