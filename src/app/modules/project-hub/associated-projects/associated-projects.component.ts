import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';

@Component({
    selector: 'app-associated-projects',
    templateUrl: './associated-projects.component.html',
    styleUrls: ['./associated-projects.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AssociatedProjectsComponent implements OnInit {
    constructor(
        private apiService: ProjectApiService,
        private _Activatedroute: ActivatedRoute,
        public projecthubservice: ProjectHubService,
    ) {}

    id: string = '';
    rows = [];
    viewContent = false;
    ngOnInit(): void {
        this.dataloader();
        window.dispatchEvent(new Event('resize'));
    }

    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get('id');
        this.viewContent = true;
    }
    getHeaderClass(): any {
        return ' horizontal-header-class';
  }
}
