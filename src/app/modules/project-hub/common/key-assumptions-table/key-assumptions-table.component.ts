import {Component, Input, OnInit} from '@angular/core';
import {ProjectApiService} from "../project-api.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectHubService} from "../../project-hub.service";

@Component({
    selector: 'app-key-assumptions-table',
    templateUrl: './key-assumptions-table.component.html',
    styleUrls: ['./key-assumptions-table.component.scss']
})
export class KeyAssumptionsTableComponent implements OnInit {
    @Input() callLocation:  'Normal'  | 'Project-Charter'  = 'Normal'
    keyAssumptions: any = []
    id: string = ''
    isGrid: boolean = false
    constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService) {
        this.projecthubservice.submitbutton.subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }

    ngOnInit(): void {
        this.dataloader()
    }
    dataloader(){
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        if(this.callLocation != 'Normal'){
            this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
        }
        this.apiService.getKeyAssumptionsByProject(this.id).then((res) => {
            this.keyAssumptions = res
        })
    }

}
