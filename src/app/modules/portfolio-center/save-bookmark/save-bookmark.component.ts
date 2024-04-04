import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PortfolioCenterService } from '../portfolio-center.service';
import {
    FuseConfirmationConfig,
    FuseConfirmationService,
} from '@fuse/services/confirmation';

@Component({
    selector: 'app-save-bookmark',
    templateUrl: './save-bookmark.component.html',
    styleUrls: ['./save-bookmark.component.scss'],
})

export class SaveBookmarkComponent {
    bookmarkName: string = '';

    constructor(public dialogRef: MatDialogRef<SaveBookmarkComponent>,
        private portfolioCenterService: PortfolioCenterService,
        public fuseAlert: FuseConfirmationService) {}

        onSaveBookmark() {
            const existingBookmarkNames = this.portfolioCenterService.bookmarks.map(b => b.bookmarkName);
    
            if (this.bookmarkName.trim() && !existingBookmarkNames.includes(this.bookmarkName) && this.bookmarkName && this.bookmarkName.match(/^ *$/) === null) {
                this.dialogRef.close(this.bookmarkName);
            } else {
                this.showConfirmationPopup();
            }
        }
    
        showConfirmationPopup() {
            var comfirmConfig: FuseConfirmationConfig = {
                title: 'The Bookmark Name you entered already exists. Please select a different Name!',
                message: '',
                icon: {
                    show: true,
                    name: 'heroicons_outline:exclamation',
                    color: 'warn',
                },
                actions: {
                    confirm: {
                        show: true,
                        label: 'Okay',
                        color: 'warn',
                    },
                    
                    cancel: {
                        show: false,
                        label: 'Cancel',
                    },
                },
                dismissible: true,
            };
    
            this.fuseAlert.open(comfirmConfig);
        }
}
