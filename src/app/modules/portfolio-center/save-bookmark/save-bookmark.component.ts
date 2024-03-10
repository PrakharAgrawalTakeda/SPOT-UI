import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-save-bookmark',
    templateUrl: './save-bookmark.component.html',
    styleUrls: ['./save-bookmark.component.scss'],
})
export class SaveBookmarkComponent {
    bookmarkName: string = '';

    constructor(public dialogRef: MatDialogRef<SaveBookmarkComponent>) {}

    onSaveBookmark() {
        if(this.bookmarkName && this.bookmarkName.match(/^ *$/) === null){
            this.dialogRef.close(this.bookmarkName);
        }
    }
}
