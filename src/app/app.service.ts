import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  errorSave = new BehaviorSubject<boolean>(false)
  constructor() { }
}
