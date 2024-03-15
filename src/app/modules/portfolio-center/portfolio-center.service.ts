import { Injectable, ViewChild } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import {
    FuseConfirmationConfig,
    FuseConfirmationService,
} from '@fuse/services/confirmation';
import { BehaviorSubject, Subject } from 'rxjs';
import { PortfolioApiService } from './portfolio-api.service';
import { BookmarkEditComponent } from './bookmarks/bookmark-edit/bookmark-edit.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';

@Injectable({
    providedIn: 'root',
})
export class PortfolioCenterService {
    node = new BehaviorSubject<object>({});
    submitbutttoggleDrawerOpenon = new BehaviorSubject<boolean>(false);
    refreshEditBookmarkComponent = new BehaviorSubject<boolean>(false);
    isNavChanged = new BehaviorSubject<boolean>(false);
    drawerOpenedright: boolean = false;
    drawerOpened: boolean = false;
    drawerOpenedPrakharTemp: boolean = false;

    itemid: string = 'new';
    itemtype: string = '';
    item: any = {};
    all: any = [];
    isFormChanged: boolean = false;
    fuseDrawerLarge: boolean = false;
    fuseDrawerSmall: boolean = false;

    projectid: string = '';
    successSave = new BehaviorSubject<boolean>(false);
    alert: FuseConfirmationConfig = {
        title: 'Are you sure you want to exit?',
        message: 'All unsaved data will be lost.',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation',
            color: 'warn',
        },
        actions: {
            confirm: {
                show: true,
                label: 'Ok',
                color: 'warn',
            },
            cancel: {
                show: true,
                label: 'Cancel',
            },
        },
        dismissible: true,
    };

    bookmarks: any = [];

    showBookmarkTableContent = false;
    bookmarkItemType: string = '';
    bookmarkItemId: string = '';
    bookmarkData: any = '';
    bookmarkDrawerOpened: boolean = false;
    bookmarkSmallDrawerOpened: boolean = false;
    bookmarkDrawerLarge: boolean = false;
    bookmarkDrawerSmall: boolean = false;

    isComponentRefreshed = false;

    async getAllBookmarks() {
        const localAccountId =
            this.msal.instance.getActiveAccount().localAccountId;

        await this.apiService
            .getBookmarksValue(localAccountId)
            .then((res: any) => {
                this.bookmarks = res.sort((a, b) => {
                    const nameA = a.bookmarkName.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
                    const nameB = b.bookmarkName.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0; // Names are equal
                });

                this.showBookmarkTableContent = true;
            });
    }

    constructor(
        private fusealert: FuseConfirmationService,
        private apiService: PortfolioApiService,
        private msal: MsalService
    ) {}

    getRefreshBookmarkPage() {
        return this.refreshEditBookmarkComponent.asObservable();
    }

    triggerRefreshBookmark() {
        this.refreshEditBookmarkComponent.next(true);
    }

    bookmarkDrawerOpenedChanged(event: any): void {
        if (!this.bookmarkSmallDrawerOpened) {
            if (this.bookmarkDrawerOpened != event) {
                if (event == false) {
                    this.bookmarkDrawerOpened = event;
                    if (this.isFormChanged == true) {
                        console.log(this.isFormChanged);
                        this.alertopener();
                    } else {
                        this.item = {};
                        this.itemtype = '';
                        this.itemid = '';
                        this.all = [];
                        this.projectid = '';
                        this.isFormChanged = false;
                    }
                }
            }
        } else {
            this.bookmarkSmallDrawerOpened = false;
        }
    }

    bookmarkSmallDrawerOpenedChanged(event: any): void {
        if (this.bookmarkSmallDrawerOpened != event) {
            if (event == false) {
                this.bookmarkSmallDrawerOpened = event;
                if (this.isFormChanged == true) {
                    console.log(this.isFormChanged);
                    this.alertopenerSmall();
                } else {
                    this.item = {};
                    this.itemtype = 'BookmarkOpen';
                    this.itemid = '';
                    this.all = [];
                    this.projectid = '';
                    this.isFormChanged = false;
                }
            }
        }
    }

    toggleBookmarkDrawerOpen(
        bookmarkType: string,
        bookmarkId: string,
        bookmarkData: any,
        bookmarkDrawerLarge: boolean = false
    ): void {
        this.bookmarkItemId = bookmarkId;
        this.bookmarkItemType = bookmarkType;
        this.bookmarkData = bookmarkData;
        this.bookmarkDrawerOpened = !this.bookmarkDrawerOpened;
        this.bookmarkDrawerLarge = bookmarkDrawerLarge;
    }

    toggleBookmarkDrawerOpenSmall(
        bookmarkType: string,
        bookmarkId: string,
        bookmarkData: any,
        bookmarkDrawerSmall: boolean = false
    ): void {
        this.bookmarkItemId = bookmarkId;
        this.bookmarkItemType = bookmarkType;
        this.bookmarkData = bookmarkData;

        this.triggerRefreshBookmark();

        this.bookmarkSmallDrawerOpened = !this.bookmarkSmallDrawerOpened;
        this.bookmarkDrawerSmall = bookmarkDrawerSmall;
    }

    drawerOpenedChanged(event: any): void {
        if (!this.drawerOpened) {
            if (this.drawerOpenedright != event) {
                if (event == false) {
                    this.drawerOpenedright = event;
                    if (this.isFormChanged == true) {
                        console.log(this.isFormChanged);
                        this.alertopener();
                    } else {
                        this.item = {};
                        this.itemtype = '';
                        this.itemid = '';
                        this.all = [];
                        this.projectid = '';
                        this.isFormChanged = false;
                    }
                }
            }
        } else {
            this.drawerOpened = false;
        }
    }

    drawerOpenedChangedSmall(event: any): void {
        if (this.drawerOpened != event) {
            if (event == false) {
                this.drawerOpened = event;
                if (this.isFormChanged == true) {
                    console.log(this.isFormChanged);
                    this.alertopenerSmall();
                } else {
                    this.item = {};
                    this.itemtype = 'BudgetSpendOpen';

                    this.itemid = '';
                    this.all = [];
                    this.projectid = '';
                    this.isFormChanged = false;
                }
            }
        }
    }

    toggleDrawerOpen(
        itemtype: string,
        itemid: string,
        all: any,
        pid: string,
        fuseDrawerLarge: boolean = false
    ): void {
        console.log(itemtype);
        if (this.drawerOpenedright == true && this.isFormChanged == true) {
            const alertopener = this.fusealert.open(this.alert);
            alertopener.afterClosed().subscribe((res) => {
                if (res == 'confirmed') {
                    this.item = {};
                    this.itemtype = itemtype;
                    this.itemid = '';
                    this.all = [];
                    this.projectid = '';
                    this.isFormChanged = false;
                    this.drawerOpenedright = !this.drawerOpenedright;
                }
            });
        } else {
            this.itemid = itemid;
            this.itemtype = itemtype;
            this.all = all;
            this.projectid = pid;
            this.drawerOpenedright = !this.drawerOpenedright;
        }
        this.fuseDrawerLarge = fuseDrawerLarge;
    }

    toggleDrawerOpenSmall(
        itemtype: string,
        itemid: string,
        all: any,
        pid: string,
        fuseDrawerSmall: boolean = false
    ): void {
        console.log(itemtype);

        if (this.drawerOpened == true && this.isFormChanged == true) {
            // const alertopener = this.fusealert.open(this.alert)
            // alertopener.afterClosed().subscribe(res => {
            // if (res == 'confirmed') {
            this.item = {};
            this.itemtype = itemtype;
            this.itemid = '';
            this.all = [];
            this.projectid = '';
            this.isFormChanged = false;
            this.drawerOpened = !this.drawerOpened;
            //   }
            // })
        } else {
            this.itemid = itemid;
            this.itemtype = itemtype;
            this.all = all;
            this.projectid = pid;
            this.drawerOpened = !this.drawerOpened;
        }
        this.fuseDrawerSmall = fuseDrawerSmall;
    }

    alertopener() {
        const alertopener = this.fusealert.open(this.alert);
        this.isFormChanged = false;
        alertopener.afterClosed().subscribe((res) => {
            if (res != 'confirmed') {
                this.toggleDrawerOpen(
                    this.itemtype,
                    this.itemid,
                    this.all,
                    this.projectid,
                    true
                );
                this.isFormChanged = true;
            } else {
                this.item = {};
                this.itemtype = '';
                this.itemid = '';
                this.all = [];
                this.projectid = '';
                this.isFormChanged = false;
            }
        });
    }
    alertopenerSmall() {
        const alertopener = this.fusealert.open(this.alert);
        this.isFormChanged = false;
        alertopener.afterClosed().subscribe((res) => {
            if (res != 'confirmed') {
                this.toggleDrawerOpen(
                    this.itemtype,
                    this.itemid,
                    this.all,
                    this.projectid,
                    true
                );
                this.isFormChanged = true;
            } else {
                this.item = {};
                this.itemtype = this.itemtype;
                this.itemid = '';
                this.all = [];
                this.projectid = '';
                this.isFormChanged = false;
            }
        });
    }
}
