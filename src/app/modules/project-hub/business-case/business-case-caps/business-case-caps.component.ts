import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-business-case-caps',
  templateUrl: './business-case-caps.component.html',
  styleUrls: ['./business-case-caps.component.scss']
})
export class BusinessCaseCapsComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  openCAPS(){
    this.router.navigate([`./portfolio-center`]);
  }

}
