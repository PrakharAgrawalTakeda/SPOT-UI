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
    y0Label: string = '';
    startingMonth: number;
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
        this.startingMonth=this.getStartingMonth()
    }
    getStartingMonth(): number {
        let project = this.data.find(x => x.isopen === true);
        let monthPart = project.periodName.slice(-2);
        if(project.active == 'Current'){
            return parseInt(monthPart, 10)-3;
        }
        if(project.active == 'Preliminary'){
            return parseInt(monthPart, 10)-4;
        }
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
        let year = new Date(this.data.find(x => x.active == 'Current').financialMonthStartDate).getFullYear();
        let year2 = year+1;
        let year3 = year+2;
        let year4 = year+3;
        let year5 = year+4;
        let year6 = year+5;
        this.y0Label= 'FY' + year;
        this.y1Label= 'FY' + year2;
        this.y2Label= 'FY' + year3;
        this.y3Label= 'FY' + year4;
        this.y4Label= 'FY' + year5;
        this.y5Label= 'FY' + year6 + '+';
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    }
    getRowStyle(month:string, row:any){
        if(!this.isCellEditable(month) || !row.isopen){
            return 'closed'
        }
    }
    isCellEditable(month: string): boolean {
        let startingMonth = this.startingMonth;
        if(startingMonth == -1){
            startingMonth = 11;
        }
        if(startingMonth == -2){
            startingMonth = 10;
        }
        if(startingMonth == -3){
            startingMonth = 9;
        }
        if(startingMonth == 0){
            startingMonth = 12;
        }
        const monthNumber = this.getMonthNumber(month);
        return startingMonth <= monthNumber;
    }
    getMonthNumber(month: string): number {
        switch (month) {
            case 'jan':
                return 9;
            case 'feb':
                return 10;
            case 'mar':
                return 11;
            case 'apr':
                return 0;
            case 'may':
                return 1;
            case 'jun':
                return 2;
            case 'jul':
                return 3;
            case 'aug':
                return 4;
            case 'sep':
                return 5;
            case 'oct':
                return 6;
            case 'nov':
                return 7;
            case 'dec':
                return 8;
            default:
                return 12;
        }
    }
    getNgxDatatableNumberHeader(): any {
        return ' ngx-number-header';
    }

}
