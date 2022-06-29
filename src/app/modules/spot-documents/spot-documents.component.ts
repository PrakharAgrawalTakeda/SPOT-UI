import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spot-documents',
  templateUrl: './spot-documents.component.html',
  styleUrls: ['./spot-documents.component.scss']
})
export class SpotDocumentsComponent implements OnInit {

  constructor(private rounter:Router) { }

  ngOnInit(): void {
    
  }
  opennewtab(): void{
    window.open("https://mytakeda.sharepoint.com/sites/PMT-SPOT/SitePages/home.aspx", "_blank");
  }
}
