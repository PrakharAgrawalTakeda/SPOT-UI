import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectHubService {
  drawerOpenedright: boolean = false;
  
  constructor() { }

  toggleDrawerOpen(): void
{
        this.drawerOpenedright = !this.drawerOpenedright
} 
 drawerOpenedChanged(event: any): void
{
  this.drawerOpenedright = event
}
}
