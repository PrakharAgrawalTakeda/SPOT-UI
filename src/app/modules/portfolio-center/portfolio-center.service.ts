import { Injectable } from '@angular/core';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioCenterService {
  node = new BehaviorSubject<object>({});
  submitbutton = new BehaviorSubject<boolean>(false)
  isNavChanged = new BehaviorSubject<boolean>(false)
  drawerOpenedright: boolean = false;
  drawerOpened:boolean = false
  itemid: string = "new"
  itemtype: string = ""
  item: any = {}
  all: any = []
  isFormChanged: boolean = false
  fuseDrawerLarge: boolean = false
  fuseDrawerSmall: boolean = false
  projectid: string = ""
  successSave = new BehaviorSubject<boolean>(false)
  alert: FuseConfirmationConfig = {
    "title": "Are you sure you want to exit?",
    "message": "All unsaved data will be lost.",
    "icon": {
      "show": true,
      "name": "heroicons_outline:exclamation",
      "color": "warn"
    },
    "actions": {
      "confirm": {
        "show": true,
        "label": "Ok",
        "color": "warn"
      },
      "cancel": {
        "show": true,
        "label": "Cancel"
      }
    },
    "dismissible": true
  }
  
  constructor(private fusealert: FuseConfirmationService) { }
  drawerOpenedChanged(event: any): void {
    if (!this.drawerOpened){
    if (this.drawerOpenedright != event) {
      if (event == false) {
        this.drawerOpenedright = event
        if (this.isFormChanged == true) {
          console.log(this.isFormChanged)
          this.alertopener()
        }
        else {
          this.item = {}
          this.itemtype = ""
          this.itemid = ""
          this.all = []
          this.projectid = ""
          this.isFormChanged = false
        }

      }
    }
  }
  }
  drawerOpenedChangedSmall(event: any): void {
    if (this.drawerOpened != event) {
      if (event == false) {
        this.drawerOpened = event
        if (this.isFormChanged == true) {
          console.log(this.isFormChanged)
          this.alertopenerSmall()
        }
        else {
          this.item = {}
          this.itemtype = "BudgetSpendOpen"
          this.itemid = ""
          this.all = []
          this.projectid = ""
          this.isFormChanged = false
        }

      }
    }
  }
  toggleDrawerOpen(itemtype: string, itemid: string, all: any, pid: string, fuseDrawerLarge: boolean = false): void {
    console.log(itemtype)

    if (this.drawerOpenedright == true && this.isFormChanged == true) {
      const alertopener = this.fusealert.open(this.alert)
      alertopener.afterClosed().subscribe(res => {
        if (res == 'confirmed') {
          this.item = {}
          this.itemtype = itemtype
          this.itemid = ""
          this.all = []
          this.projectid = ""
          this.isFormChanged = false
          this.drawerOpenedright = !this.drawerOpenedright
        }
      })
    }
    else {
      this.itemid = itemid
      this.itemtype = itemtype
      this.all = all
      this.projectid = pid
      this.drawerOpenedright = !this.drawerOpenedright
    }
    this.fuseDrawerLarge = fuseDrawerLarge
  }
  toggleDrawerOpenSmall(itemtype: string, itemid: string, all: any, pid: string, fuseDrawerSmall: boolean = false): void {
    console.log(itemtype)

    if (this.drawerOpened == true && this.isFormChanged == true) {
      // const alertopener = this.fusealert.open(this.alert)
      // alertopener.afterClosed().subscribe(res => {
        // if (res == 'confirmed') {
          this.item = {}
          this.itemtype = itemtype
          this.itemid = ""
          this.all = []
          this.projectid = ""
          this.isFormChanged = false
          this.drawerOpened = !this.drawerOpened
      //   }
      // })
    }
    else {
      this.itemid = itemid
      this.itemtype = itemtype
      this.all = all
      this.projectid = pid
      this.drawerOpened = !this.drawerOpened

    }
    this.fuseDrawerSmall = fuseDrawerSmall
  }
  alertopener() {

    const alertopener = this.fusealert.open(this.alert)
    this.isFormChanged = false
    alertopener.afterClosed().subscribe(res => {
      if (res != 'confirmed') {
        this.toggleDrawerOpen(this.itemtype, this.itemid, this.all, this.projectid, true)
        this.isFormChanged = true
      }
      else {
        this.item = {}
        this.itemtype = ""
        this.itemid = ""
        this.all = []
        this.projectid = ""
        this.isFormChanged = false

      }
    })
  }
  alertopenerSmall() {

    const alertopener = this.fusealert.open(this.alert)
    this.isFormChanged = false
    alertopener.afterClosed().subscribe(res => {
      if (res != 'confirmed') {
        this.toggleDrawerOpen(this.itemtype, this.itemid, this.all, this.projectid, true)
        this.isFormChanged = true
      }
      else {
        this.item = {}
        this.itemtype = this.itemtype
        this.itemid = ""
        this.all = []
        this.projectid = ""
        this.isFormChanged = false

      }
    })
  }
}
