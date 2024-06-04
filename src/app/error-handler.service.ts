import { ErrorHandler, Injectable } from '@angular/core';
import { MyMonitoringService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {

  constructor(private myMonitoringService: MyMonitoringService) {
    super();
  }

  handleError(error: any): void {
    this.myMonitoringService.logException(error);
    console.error('Global Error Handler:', error);
    super.handleError(error);
}
}
