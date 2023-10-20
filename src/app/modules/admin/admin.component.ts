import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from './admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private titleService: Title, public adminService: AdminService) {
  }
  ngOnInit(): void {
    this.titleService.setTitle("Admin Tools")
  }
}
