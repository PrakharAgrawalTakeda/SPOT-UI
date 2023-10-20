import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-manage-users-edit',
  templateUrl: './manage-users-edit.component.html',
  styleUrls: ['./manage-users-edit.component.scss']
})
export class ManageUsersEditComponent implements OnInit {
  viewContent= true
  constructor( public adminService: AdminService) {
  }
  ngOnInit(): void {
  }
}
