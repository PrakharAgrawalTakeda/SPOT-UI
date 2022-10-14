import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { map, Observable, startWith } from 'rxjs';
import { ProjectHubService } from '../../project-hub.service';

@Component({
    selector: 'app-update-parent',
    templateUrl: './update-parent.component.html',
    styleUrls: ['./update-parent.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UpdateParentComponent implements OnInit {
    constructor(
        public fuseAlert: FuseConfirmationService,
        public projecthubservice: ProjectHubService
    ) {}
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;

    viewContent = false;
    ngOnInit(): void {
        this.dataloader();
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
        );
        window.dispatchEvent(new Event('resize'));
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) =>
            option.toLowerCase().includes(filterValue)
        );
    }
    dataloader() {
        this.viewContent = true;
    }
}
