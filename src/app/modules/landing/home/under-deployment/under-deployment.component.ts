import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-under-deployment',
  templateUrl: './under-deployment.component.html',
  styleUrls: ['./under-deployment.component.scss']
})
export class UnderDeploymentComponent {
  constructor(private titleSerice: Title,private router: Router){
    if(!environment.isDeploying){
      this.router.navigate(['']);
    }
    this.titleSerice.setTitle("Coming Soon");
  }
}
