import { Injectable } from '@angular/core';
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../@fuse/services/confirmation";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    submitbutton = new BehaviorSubject<boolean>(false)
    isNavChanged = new BehaviorSubject<boolean>(false)
    drawerOpenedright: boolean = false;
    itemid: string = "new"
    itemtype: string = ""
    item: any = {}
    all: any = []
    isFormChanged: boolean = false
    fuseDrawerLarge: boolean = false
    projectid: string = ""
    lookUpMaster: any = []
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
    constructor(private fusealert: FuseConfirmationService) {
    }

    drawerOpenedChanged(event: any): void {
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
    toggleDrawerOpen(itemtype: string, itemid: string, all: any, pid: string, fuseDrawerLarge: boolean = false): void {
        console.log(itemtype)

        if (this.drawerOpenedright == true && this.isFormChanged == true) {
            const alertopener = this.fusealert.open(this.alert)
            alertopener.afterClosed().subscribe(res => {
                if (res == 'confirmed') {
                    this.item = {}
                    this.itemtype = ""
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
    alertopener() {

        const alertopener = this.fusealert.open(this.alert)
        this.isFormChanged = false
        alertopener.afterClosed().subscribe(res => {
            if (res != 'confirmed') {
                this.toggleDrawerOpen(this.itemtype, this.itemid, this.all, this.projectid)
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
}