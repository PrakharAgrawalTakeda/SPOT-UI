import {Component} from '@angular/core';
import {ProjectApiService} from "../../../common/project-api.service";
import {ProjectHubService} from "../../../project-hub.service";
import { FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {RoleService} from "../../../../../core/auth/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-budget-performance-edit',
    templateUrl: './budget-performance-edit.component.html',
    styleUrls: ['./budget-performance-edit.component.scss']
})
export class BudgetPerformanceEditComponent {

    viewContent: boolean = false;
    id: string = ""
    budgetPerformance: any = {}
    finalRequirements: any = []
    finalRequirementsValueForm = new FormArray([])

    budgetPerformanceForm = new FormGroup({
        projectId: new FormControl(''),
        budgetCommentary: new FormControl(''),
        selectedFields: new FormControl([]),
        finalRequirementsValue: new FormControl([])
    })

    constructor(private apiService: ProjectApiService,
                public projectHubService: ProjectHubService,
                public fuseAlert: FuseConfirmationService,
                public role: RoleService,
                private router: Router,
                private _Activatedroute: ActivatedRoute) {
        this.budgetPerformanceForm.valueChanges.subscribe(res => {
            if (this.viewContent) {
                this.projectHubService.isFormChanged = true
            }
        })
    }

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.apiService.getBudgetPerformanceById(this.id).then((res: any) => {
            this.budgetPerformance = res;
            res.finalRequirementsValue.forEach((x, index) => {
                this.finalRequirements.push(x);
                this.finalRequirements[index].isSelected = !!res.selectedFields.includes(x.fieldId);
            })
            this.budgetPerformancePatchValue(res)
            this.viewContent = true
        })
    }

    budgetPerformancePatchValue(response) {
        this.budgetPerformanceForm.patchValue({
            projectId: response.projectId,
            budgetCommentary: response.budgetCommentary,
            finalRequirementsValue: response.finalRequirementsValue,
            selectedFields: response.selectedFields,
        })
        response.finalRequirementsValue.forEach( i =>{
            this.finalRequirementsValueForm.push(new FormGroup({
                fieldId: new FormControl(i.fieldId),
                fieldName: new FormControl(i.fieldName),
                fieldDisplayName: new FormControl(i.fieldDisplayName),
                isSelected: new FormControl(i.isSelected),
            }))
        })

    }

    submitBudgetPerformance() {
        this.projectHubService.isFormChanged = false
        let selectedFields: string[] = [];
        this.finalRequirementsValueForm.value.forEach(x => {
            if(x.isSelected ==true){
                selectedFields.push(x.fieldId)
            }
        })
        const formValue = this.budgetPerformanceForm.getRawValue();
        const mainObj = this.budgetPerformance;
        mainObj.projectId = formValue.projectId
        mainObj.budgetCommentary = formValue.budgetCommentary
        mainObj.selectedFields = selectedFields
        mainObj.finalRequirementsValue = formValue.finalRequirementsValue
        this.apiService.editBudgetPerformance(mainObj).then(res => {
            this.projectHubService.isNavChanged.next(true)
            this.projectHubService.submitbutton.next(true)
            this.projectHubService.successSave.next(true)
            this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
    }
    onSlideToggleChange() {
        if(this.projectHubService.isFormChanged == false){
            this.projectHubService.isFormChanged = true;
        }
    }

}
