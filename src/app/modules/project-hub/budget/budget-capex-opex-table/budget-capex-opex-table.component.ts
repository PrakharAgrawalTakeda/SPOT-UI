import {Component, Input, SimpleChanges} from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";

@Component({
  selector: 'app-budget-capex-opex-table',
  templateUrl: './budget-capex-opex-table.component.html',
  styleUrls: ['./budget-capex-opex-table.component.scss']
})
export class BudgetCapexOpexTableComponent {
    @Input() mode: 'Capex' | 'Opex' | 'Y1' = 'Capex'
    @Input() inputData: any;
    data: any[];
    id: string = ''
    constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService
        , public fuseAlert: FuseConfirmationService, private router: Router) {
        this.projecthubservice.submitbutton.subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.dataloader()
    }
    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        if(this.mode=="Y1"){
            this.data = this.inputData;
        }
        if(this.mode=="Opex"){
            this.data = this.inputData.budgetForecasts.filter(x => x.budgetData == "OpEx Forecast")
        }
        if(this.mode=="Capex"){
            this.data = this.inputData.budgetForecasts.filter(x => x.budgetData == "CapEx Forecast")
        }
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    }

}
