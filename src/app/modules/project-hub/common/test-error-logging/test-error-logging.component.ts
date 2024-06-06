import { Component } from '@angular/core';
import { MyMonitoringService } from 'app/logging.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
@Component({
  selector: 'app-test-error-logging',
  template: ``,
  styleUrls: ['./test-error-logging.component.scss']
})
export class TestErrorLoggingComponent {
  constructor(private monitoringService: MyMonitoringService,
    private apiService: ProjectApiService,
      private _Activatedroute: ActivatedRoute,
      private portApiService: PortfolioApiService,
      private authService: AuthService,
      private projectHubService: ProjectHubService
  ) {}

    ngOnInit(): void {
    try {
      // Automatically cause an error
      throw new Error('This is a test exception automatically logged to Application Insights');
    } catch (error) {
      if (error instanceof Error) {
        // Log the exception
        this.monitoringService.logException(error);
      }
    }
  }
  
}
