import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PortfolioCenterService } from '../portfolio-center.service';
import {
    FuseConfirmationConfig,
    FuseConfirmationService,
} from '@fuse/services/confirmation';
import { PortfolioApiService } from '../portfolio-api.service';
import { MsalService } from '@azure/msal-angular';

@Component({
    selector: 'app-bookmarks',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
    constructor(
        public PortfolioCenterService: PortfolioCenterService,
        public fuseAlert: FuseConfirmationService,
        private apiService: PortfolioApiService,
        private msal: MsalService
    ) {}


    viewElements: any = ['bookmarkId', 'bookmarkName', 'actions'];

    viewElementChecker(element: string): boolean {
        return this.viewElements.some((x) => x == element);
    }

    ngOnInit(): void {
        this.PortfolioCenterService.getAllBookmarks();
    }

    deleteBookmark(id: string) {
        console.log(id, 'ID OF BOOKMARK');
        var comfirmConfig: FuseConfirmationConfig = {
            title: 'Remove Bookmark?',
            message:
                'Are you sure you want to remove this bookmark permanently?',
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Remove',
                    color: 'warn',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: true,
        };
        const milestoneSetDeleteAlert = this.fuseAlert.open(comfirmConfig);
        milestoneSetDeleteAlert.afterClosed().subscribe((close) => {
            if (close == 'confirmed') {
                this.apiService.removeBookmarkValue(id).then((res) => {

                    this.PortfolioCenterService.getAllBookmarks();

                    if (id == localStorage.getItem('spot-currentBookmark')) {
                        window.location.reload();
                    }
                });
            }
        });
    }

    editSingleBookmark(bookmark) {
        this.PortfolioCenterService.toggleBookmarkDrawerOpenSmall(
            'BookmarksEditOpen',
            bookmark.bookmarkId,
            { bookmark },
            true
        );
    }
}
