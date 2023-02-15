import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-case-option-info',
  templateUrl: './business-case-option-info.component.html',
  styleUrls: ['./business-case-option-info.component.scss']
})
export class BusinessCaseOptionInfoComponent implements OnInit {

  constructor(private _Activatedroute: ActivatedRoute) { }
  option: string = ''
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.option = this._Activatedroute.parent.snapshot.routeConfig.path
  }

}
