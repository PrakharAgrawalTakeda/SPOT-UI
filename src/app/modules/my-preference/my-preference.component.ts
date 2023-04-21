import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MyPreferenceService} from "./my-preference.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-preference',
  templateUrl: './my-preference.component.html',
  styleUrls: ['./my-preference.component.scss']
})
export class MyPreferenceComponent implements OnInit {

  constructor(private _Activatedroute: ActivatedRoute,
              private router: Router,
              public myPreferenceService: MyPreferenceService,
              private titleService: Title,) {
      // this.myPreferenceService.successSave.subscribe(res => {
      //     if (res == true) {
      //         this.snack.open("The information has been saved successfully", "", {
      //             duration: 2000,
      //             panelClass: ["bg-primary", "text-on-primary"]
      //         })
      //     }
      // })
    this.router.events.subscribe(res => {

      if (this.viewContent) {
        this.navItem = null
        this.reloadName()
      }
    })
  }
  id: string = ''
  viewContent: boolean = false
  navItem: any
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.viewContent = true
    this.titleService.setTitle( "Standard Milestones Edit")
    this.reloadName()


  }
  isNavActive(link: string): boolean {
    return this.router.url.includes(link)
  }
  reloadName() {
      this.navItem = {
        title: 'My Preferences',
        children: [
          {
            title:'Project Settings',
            link:'my-preference/project-settings'
          },
          {
            title:'Email Notifications',
            link:'my-preference/email-notifications'
          },
          {
            title:'Milestone Sets',
            link:'my-preference/milestone-sets'
          }
        ]
      }
  }
}
