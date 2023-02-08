import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectHubService} from "../../../project-hub.service";
import {AuthService} from "../../../../../core/auth/auth.service";
import {RoleService} from "../../../../../core/auth/role.service";
import {ProjectApiService} from "../../project-api.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-key-assumptions-add-single',
    templateUrl: './key-assumptions-add-single.component.html',
    styleUrls: ['./key-assumptions-add-single.component.scss']
})
export class KeyAssumptionsAddSingleComponent implements OnInit {
    @Input() viewElements: any = ["keyAssumption", "whyIsThisAssumptionValid"];
    keyAssumptionForm = new FormGroup({
        keyAssumptionName: new FormControl(''),
        assumptionRationale: new FormControl(''),
        includeInCharter: new FormControl(false),
        includeInBusinessCase: new FormControl(false),
    })
    formInital: boolean = false
    id: string = ''
    constructor(public projecthubservice: ProjectHubService, public auth: AuthService,private _Activatedroute: ActivatedRoute, public role: RoleService, private apiService: ProjectApiService, public fuseAlert: FuseConfirmationService) {
        this.keyAssumptionForm.valueChanges.subscribe(res => {
                if (this.formInital == true) {
                    this.projecthubservice.isFormChanged = true
                }
            }
        )
    }

    ngOnInit(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        if (this.projecthubservice.all != []) {
            if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 5) {
                if (this.keyAssumptionForm.value.includeInCharter != true) {
                    this.keyAssumptionForm.controls['includeInCharter'].disable()
                }
            }
            if (this.projecthubservice.all.filter(x => x.includeInBusinessCase == true).length >= 5) {
                if (this.keyAssumptionForm.value.includeInBusinessCase != true) {
                    this.keyAssumptionForm.controls['includeInBusinessCase'].disable()
                }
            }
        }
        this.keyAssumptionForm.valueChanges.subscribe(res => {
            this.projecthubservice.isFormChanged = true
        })
    }

    submitProjectTeam() {
        this.projecthubservice.isFormChanged = false
        var keyAssumption = this.keyAssumptionForm.getRawValue();
        var mainObj = {
            keyAssumptionUniqueId: "",
            projectId: this.id,
            keyAssumption: keyAssumption.keyAssumptionName,
            assumptionRationale: keyAssumption.assumptionRationale,
            includeInCharter: keyAssumption.includeInCharter,
            includeInBusinessCase: keyAssumption.includeInBusinessCase,
        }
        this.apiService.addKeyAssumption(mainObj).then(res => {
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
        })
    }
    viewElementChecker(element: string): boolean {
        return this.viewElements.some(x => x == element)
    }
}
