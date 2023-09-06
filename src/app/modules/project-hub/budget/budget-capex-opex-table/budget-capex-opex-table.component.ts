import {Component, Input} from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import { isNullOrUndefined } from '@swimlane/ngx-datatable';

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
    ngOnInit(): void {
        if(this.mode=="Y1"){
            this.data = this.inputData;
        }else{
            this.data = this.inputData.budgetForecasts.filter(x => x.budgetData == "CapEx Forecast")
        }
        this.dataloader()
    }

    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    }

}
