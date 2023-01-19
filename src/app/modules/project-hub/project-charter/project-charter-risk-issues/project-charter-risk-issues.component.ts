import {Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {ProjectApiService} from "../../common/project-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-project-charter-risk-issues',
    templateUrl: './project-charter-risk-issues.component.html',
    styleUrls: ['./project-charter-risk-issues.component.scss']
})
export class ProjectCharterRiskIssuesComponent implements OnInit {
    id: string = ''
    projectViewDetails: any = {}
    viewContent: boolean = false
    constructor(public projecthubservice: ProjectHubService,
                private apiService: ProjectApiService,
                private _Activatedroute: ActivatedRoute,) {
    }
    ngOnInit(): void {
        this.dataloader()
    }
    dataloader() {
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
        this.apiService.getprojectviewdata(this.id).then((res) => {
            this.projectViewDetails = res
            this.viewContent = true
        });

    }

}
