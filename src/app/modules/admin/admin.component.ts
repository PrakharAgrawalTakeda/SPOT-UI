import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from './admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from 'app/core/auth/role.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  navItem : any
  constructor(private titleService: Title, public adminService: AdminService, public snack: MatSnackBar, private roleService: RoleService, private routes: Router) {
    this.adminService.successSave.subscribe(res => {
      console.log(routes)
      if (res == true) {
        this.snack.open("The information has been saved successfully", "", {
          duration: 2000,
          panelClass: ["bg-primary", "text-on-primary"]
        })
      }
    })
  }
  ngOnInit(): void {
    this.titleService.setTitle("Admin Tools")
    if (this.roleService.roleMaster.securityGroupId != "0E83F6BE-79BE-426A-A316-F523FFAECC4F") {
      this.routes.navigate(['portfolio-center'])
    }
    this.navItem = {
      title: 'Admin Tools',
      children: [
          {
              title: 'General',
              link: '/admin'
          },
          {
              title: 'Global Messages',
              link: '/admin/global-messages'
          }
      ]
  }
  }

  isNavActive(link: string): boolean {
    return this.routes.url == link
  }
}
