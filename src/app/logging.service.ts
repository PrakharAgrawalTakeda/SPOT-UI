import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // This ensures the service is available in the root injector
})
export class MyMonitoringService {
  appInsights: ApplicationInsights;

  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.appInsights.instrumentationKey,
        enableAutoRouteTracking: true // option to log all route changes
      }
    });

    if (this.appInsights.config.instrumentationKey) {
      this.appInsights.loadAppInsights();
    }
  }

  logPageView(name?: string, url?: string) {
    if (this.appInsights.config.instrumentationKey) {
      this.appInsights.trackPageView({
        name: name,
        uri: url
      });
    }
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    if (this.appInsights.config.instrumentationKey) {
      this.appInsights.trackEvent({ name: name }, properties);
    }
  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }) {
    if (this.appInsights.config.instrumentationKey) {
      this.appInsights.trackMetric({ name: name, average: average }, properties);
    }
  }

  logException(exception: Error, severityLevel?: number) {
    if (this.appInsights.config.instrumentationKey) {
      console.log('Logging exception:', exception);
      this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
    }
  }
  
  logTrace(message: string, properties?: { [key: string]: any }) {
    if (this.appInsights.config.instrumentationKey) {
      this.appInsights.trackTrace({ message: message }, properties);
    }
  }
}
