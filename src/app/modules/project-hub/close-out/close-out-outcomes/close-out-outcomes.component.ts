import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-close-out-outcomes',
    templateUrl: './close-out-outcomes.component.html',
    styleUrls: ['./close-out-outcomes.component.scss']
})

export class CloseOutOutcomesComponent implements OnInit, OnDestroy {

    id: string = ''
    projectViewDetails: any = {}
    lookupMasters = []
    kpiMasters = []
    viewContent: boolean = false
    editable: boolean = false
    outcomeForm = new FormGroup({
        projectDescription: new FormControl(''),
        detailedDescription: new FormControl(''),
        targetEndState: new FormControl(''),
        benefitsRealizedOutcome: new FormControl('')
    })
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        public projectApiService: ProjectApiService,
        public projecthubservice: ProjectHubService,
        public auth: AuthService,
        private _Activatedroute: ActivatedRoute) {
        this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }

    ngOnInit(): void {
        this.dataloader()
    }
    dataloader() {
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
        this.projectApiService.getprojectviewdata(this.id).then((res: any) => {
            this.projectApiService.getproject(this.id).then((data: any) => {
                this.projectApiService.projectCharterSingle(this.id).then((data1: any) => {
                    this.auth.KPIMaster().then((kpis: any) => {
                        this.auth.lookupMaster().then((lookup: any) => {
                        this.projectViewDetails = res
                        this.lookupMasters = lookup
                        this.kpiMasters = kpis
                        this.outcomeForm.patchValue({
                            projectDescription: data.projectDescription,
                            detailedDescription: data1.detailedDescription,
                            targetEndState: data.targetEndState,
                            benefitsRealizedOutcome: data.benefitsRealizedOutcome
                        })
                        console.log("OVERALL DATA", this.projectViewDetails)
                        this.projecthubservice.lookUpMaster = lookup
                        this.projecthubservice.kpiMasters = kpis
                        this.editable = this.projecthubservice.roleControllerControl.projectHub.projectBoard.overallStatusEdit


                        this.viewContent = true
                })
            })
        })
    })
    })

        this.disabler()
    }

    disabler() {
        this.outcomeForm.disable()
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
      }
}
