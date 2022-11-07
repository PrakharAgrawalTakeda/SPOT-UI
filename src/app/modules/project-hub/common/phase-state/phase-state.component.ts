import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import { FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {ProjectApiService} from "../project-api.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-phase-state',
    templateUrl: './phase-state.component.html',
    styleUrls: ['./phase-state.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class PhaseStateComponent implements OnInit {

    constructor(
        public projecthubservice: ProjectHubService,
        public fuseAlert: FuseConfirmationService,
        private apiService: ProjectApiService) {
    }

    rows = [];
    phaseArray = [];
    capitalPhaseArray=[];
    oePhaseArray= [];
    stateArray= [];
    viewContent = false;
    phaseForm = new FormGroup({
        phase: new FormControl(''),
        capitalPhase: new FormControl(''),
        oePhase: new FormControl(''),
        phaseComment: new FormControl(''),
    })
    stateForm = new FormGroup({
        state: new FormControl(''),
        stateComment: new FormControl(''),
    })

    ngOnInit(): void {
        this.dataloader();
    }
    dataloader() {
        this.viewContent = true;
    }

    submitPhase() {
    }
    submitState() {
    }
    onSubmit(){
        this.projecthubservice.toggleDrawerOpen('StateCheck', 'new', [] , '1',false,true)
    }

}
