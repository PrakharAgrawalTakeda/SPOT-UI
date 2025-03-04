import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectHubService } from "../../project-hub.service";
import { FuseConfirmationConfig, FuseConfirmationService } from "../../../../../@fuse/services/confirmation";
import { ProjectApiService } from "../project-api.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../../core/auth/auth.service";
import { MsalService } from "@azure/msal-angular";

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
        private apiService: ProjectApiService,
        private _Activatedroute: ActivatedRoute,
        public auth: AuthService,
        private msalService: MsalService) {
    }

    id: string = '';
    phaseRows = [];
    stateRows = [];
    phaseArray: any = [];
    capitalPhaseArray = [];
    filteredPhaseArray = [];
    oePhaseArray = [];
    stateArray = [];
    viewContent = false;
    lookupdata: any = [];
    currentPhase: string = '';
    currentCapitalPhase: string = '';
    currentOEPhase: string = '';
    currentState: string = '';
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
    canSubmit: boolean = true
    ngOnInit(): void {
        this.getllookup();
    }
    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get('id');
        this.apiService.getCapitalPhase().then((res: any) => {
            this.capitalPhaseArray = res;
            this.viewContent = true;
        });
        this.phaseArray = this.lookupdata.filter(x => x.lookUpParentId == "d91fda7c-4135-4177-ae92-5f0d21a7a640");
        this.phaseForm.controls["phase"]
            .valueChanges.subscribe((value) => {
                this.changePhase(value);
            })
        this.apiService.getPhaseState(this.id).then((res: any) => {
            this.currentPhase = res.currentPhase;
            this.currentState = res.currentState;
            this.phaseRows = res.projectPhase.reverse();
            this.stateRows = res.projectStatus.reverse();
            this.currentCapitalPhase = res.currentCapitalPhaseId;
            this.currentOEPhase = res.currentOePhaseId;
            this.phaseForm.patchValue({
                phase: res.currentPhase,
                capitalPhase: res.currentCapitalPhaseId,
                oePhase: res.currentOePhaseId,
            })
            this.stateForm.patchValue({
                state: res.currentState,
            })
        });
        this.viewContent = true;
    }

    onSubmit() {
        if (this.canSubmit) {
            this.canSubmit = false
            var stateActive = false;
            var body = {
                projectId: this.id,
                phaseId: null,
                stateId: null,
                modificationDate: new Date(),
                modifiedBy: this.msalService.instance.getActiveAccount().localAccountId,
                capitalPhaseId: null,
                oephaseId: null,
                phaseComment: null,
                stateComment: null
            }
            if (this.phaseForm.get('phase').value != this.currentPhase || this.phaseForm.get('capitalPhase').value != this.currentCapitalPhase || this.phaseForm.get('oePhase').value != this.currentOEPhase) {
                body.phaseId = this.phaseForm.get('phase').value;
                body.capitalPhaseId = this.phaseForm.get('capitalPhase').value;
                body.oephaseId = this.phaseForm.get('oePhase').value;
                body.phaseComment = this.phaseForm.get('phaseComment').value;
            }
            if (this.stateForm.get('state').value != this.currentState) {
                stateActive = true;
                body.stateId = this.stateForm.get('state').value;
                body.stateComment = this.stateForm.get('stateComment').value;
            }
            this.apiService.postPhaseState(body).then(res => {
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
                this.projecthubservice.isNavChanged.next(true)
                this.projecthubservice.submitbutton.next(true)
                this.canSubmit = true
            }).catch(err => {
                if (err.status == 400) {
                    if (err.error.code == 204) {
                        var existingForecastAlert: FuseConfirmationConfig = {
                            "title": "The project contains forecast",
                            "message": "In order to cancel it please remove the forecast values in the Budget page!",
                            "icon": {
                                "show": true,
                                "name": "heroicons_outline:exclamation",
                                "color": "warning"
                            },
                            "actions": {
                                "confirm": {
                                    "show": true,
                                    "label": "Okay",
                                    "color": "primary"
                                },
                                "cancel": {
                                    "show": false,
                                    "label": "Cancel"
                                }
                            },
                            "dismissible": true
                        }
                        this.fuseAlert.open(existingForecastAlert);
                        this.canSubmit = true
                    }
                    else {
                        this.projecthubservice.toggleDrawerOpen('', '', [], '')
                        this.projecthubservice.toggleDrawerOpen('StateCheck', 'new', body, '', true);
                        this.canSubmit = true
                    }

                }
            })
        }
    }
    changePhase(phaseId) {
        this.phaseForm.patchValue({
            capitalPhase: "",
            oePhase: "",
        })
        this.filteredPhaseArray = this.capitalPhaseArray.filter(item => item.associatedPhaseID == phaseId && item.isOEPhase == false);
        this.oePhaseArray = this.capitalPhaseArray.filter(item => item.associatedPhaseID == phaseId && item.isOEPhase == true)
    }
    getllookup() {
        this.auth.lookupMaster().then((resp: any) => {
            this.lookupdata = resp
            this.dataloader()
        })
    }
    getPhase(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == 'd91fda7c-4135-4177-ae92-5f0d21a7a640').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
    getState(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == 'b2ab502a-f702-420f-98d9-c126d8664f6b').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }


}
