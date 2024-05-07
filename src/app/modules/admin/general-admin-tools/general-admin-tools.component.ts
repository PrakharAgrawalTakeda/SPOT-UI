import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-general-admin-tools',
  templateUrl: './general-admin-tools.component.html',
  styleUrls: ['./general-admin-tools.component.scss']
})
export class GeneralAdminToolsComponent {

  constructor(public adminService: AdminService){

  }

}
