import {Component, HostListener, Input, SimpleChanges} from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {BudgetService} from "../budget.service";

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
    startingMonth: number;
    hasBigValues: boolean = false;
    enableForecastButton: boolean= true;
    constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService
        , public fuseAlert: FuseConfirmationService, public budgetService: BudgetService) {
        this.projecthubservice.submitbutton.subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.dataloader()
        this.startingMonth=this.budgetService.getStartingMonth()
    }

    dataloader() {
        if(this.mode=="Y1"){
            this.data = this.inputData;
        }
        if(this.mode=="Opex"){
            this.data = this.inputData.budgetForecasts.filter(x => x.budgetData == "OpEx Forecast")
            this.budgetService.forecastEditButtonEnabler();
        }
        if(this.mode=="Capex"){
            this.data = this.inputData.budgetForecasts.filter(x => x.budgetData == "CapEx Forecast")
        }
        this.budgetService.setLabels()
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.setTableColumnMode();
    }
    getRowStyle(month:string, row:any){
        if(!this.budgetService.isCellEditable(month) || !row.isopen){
            return 'closed'
        }
    }
    setTableColumnMode() {
        this.data.forEach(x => {
            if(window.innerWidth < 1589){
                if(x.y1 > 99999 || x.y2 > 99999 || x.y3 > 99999 || x.y4 > 99999 || x.y5 > 99999 || x.jan > 99999 || x.feb > 99999 || x.mar > 99999 || x.apr > 99999 || x.may > 99999 || x.jun > 99999 || x.jul > 99999 || x.aug > 99999 || x.sep > 99999 || x.oct > 99999 || x.nov > 99999 || x.dec > 99999){
                    this.hasBigValues = true;
                }
            }
            if(window.innerWidth > 1588 && window.innerWidth < 1757){
                if(x.y1 > 999999 || x.y2 > 999999 || x.y3 > 999999 || x.y4 > 999999 || x.y5 > 999999 || x.jan > 999999 || x.feb > 999999 || x.mar > 999999 || x.apr > 999999 || x.may > 999999 || x.jun > 999999 || x.jul > 999999 || x.aug > 999999 || x.sep > 999999 || x.oct > 999999 || x.nov > 999999 || x.dec > 999999){
                    this.hasBigValues = true;
                }
            }
            if(window.innerWidth > 1756 && window.innerWidth < 1981){
                if(x.y1 > 9999999 || x.y2 > 9999999 || x.y3 > 9999999 || x.y4 > 9999999 || x.y5 > 9999999 || x.jan > 9999999 || x.feb > 9999999 || x.mar > 9999999 || x.apr > 9999999 || x.may > 9999999 || x.jun > 9999999 || x.jul > 9999999 || x.aug > 9999999 || x.sep > 9999999 || x.oct > 9999999 || x.nov > 9999999 || x.dec > 9999999){
                    this.hasBigValues = true;
                }
            }
            if(window.innerWidth > 1980 && window.innerWidth < 2147){
                if( x.y1 > 99999999 || x.y2 > 99999999 || x.y3 > 99999999 || x.y4 > 99999999 || x.y5 > 99999999 || x.jan > 99999999 || x.feb > 99999999 || x.mar > 99999999 || x.apr > 99999999 || x.may > 99999999 || x.jun > 99999999 || x.jul > 99999999 || x.aug > 99999999 || x.sep > 99999999 || x.oct > 99999999 || x.nov > 99999999 || x.dec > 99999999){
                    this.hasBigValues = true;
                }
            }
            if(window.innerWidth > 2146 && window.innerWidth < 2299){
                if( x.y1 > 999999999 || x.y2 > 999999999 || x.y3 > 999999999 || x.y4 > 999999999 || x.y5 > 999999999 || x.jan > 999999999 || x.feb > 999999999 || x.mar > 999999999 || x.apr > 99999999 || x.may > 999999999 || x.jun > 999999999 || x.jul > 999999999 || x.aug > 999999999 || x.sep > 999999999 || x.oct > 999999999 || x.nov > 999999999 || x.dec > 999999999){
                    this.hasBigValues = true;
                }
            }
        })
    }

    getNgxDatatableNumberHeader(): any {
        return ' ngx-number-header';
    }

}
