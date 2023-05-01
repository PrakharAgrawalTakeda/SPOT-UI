import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-case-caps',
  templateUrl: './business-case-caps.component.html',
  styleUrls: ['./business-case-caps.component.scss']
})
export class BusinessCaseCapsComponent implements OnInit {
  // option: string = ''
  // viewContent: boolean = false
  constructor(private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.dataloader()
  }
  

  // dataloader() {
  //   this.option = this._Activatedroute.parent.snapshot.routeConfig.path
  //   console.log(this.option)
  //   this.viewContent = true
  // }

}
