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
    y1Label: string = '';
    y2Label: string = '';
    y3Label: string = '';
    y4Label: string = '';
    y5Label: string = '';
    y6Label: string = '';
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
    // ngOnInit(): void {
    //     this.dataloader()
    // }

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
        let year = new Date(this.data.find(x => x.active == 'Current').financialMonthStartDate).getFullYear();
        let year2 = year+1;
        let year3 = year+2;
        let year4 = year+3;
        let year5 = year+4;
        let year6 = year+5;
        this.y1Label= 'FY' + year;
        this.y2Label= 'FY' + year2;
        this.y3Label= 'FY' + year3;
        this.y4Label= 'FY' + year4;
        this.y5Label= 'FY' + year5;
        this.y6Label= 'FY' + year6 + '+';
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    }

}
