import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  location: any;

  constructor() { }
  private budgetFormData: any;

  setBudgetFormData(data: any): void {
    this.budgetFormData = data;
  }

  getBudgetFormData(): any {
    return this.budgetFormData;
  }

  setLocation(mode: any): void {
    this.location = mode;
  }

  getLocation(): any {
    return this.location
  }
}
