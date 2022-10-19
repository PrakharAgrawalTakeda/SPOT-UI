
import {
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    FuseConfirmationService,
} from '@fuse/services/confirmation';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';
import { Constants } from '../../../../shared/constants';

@Component({
    selector: 'app-data-quality-page',
    templateUrl: './data-quality-page.component.html',
    styleUrls: ['./data-quality-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DataQualityPageComponent implements OnInit {
    isclosed: boolean = false;
    @ViewChild('dataCompletnessTable') dataCompletnessTable: any;

    constructor(
        public projecthubservice: ProjectHubService,
        public fuseAlert: FuseConfirmationService,
        private apiService: ProjectApiService,
        private _Activatedroute: ActivatedRoute,
    ) {}
    id: string = '';
    rows = [];
    loadingIndicator = false;
    reorderable = true;
    spotId: string = '';
    projectName: string = '';
    projectType: string = '';
    dataQualityPercentage: number;
    targetPercentage = Constants.QUALITY_TARGET_PERCENTAGE;
    dataQualityPercentageString: string = '';
    lowerTargetPercentage = Constants.QUALITY_LOWER_TARGET_PERCENTAGE;
    rowClass = getRowClass;
    ColumnMode = ColumnMode;
    viewContent = false;
    getCellClass(value: any): any {
        if (value.row.hitMiss == 'Complete') {
            return 'hit-miss complete';
        }
        if (value.row.hitMiss == 'Incomplete') {
            return 'hit-miss incomplete';
        }
    }
    ngOnInit(): void {
        this.dataloader();
        window.dispatchEvent(new Event('resize'));
    }
    getColor(percentage: number) {
        if (this.projectType == 'Simple Project') {
            return '#4c9bcf';
        } else {
            if (percentage < this.lowerTargetPercentage) {
                return 'red';
            }
            if (
                this.targetPercentage > percentage &&
                percentage > this.lowerTargetPercentage
            ) {
                return 'orange';
            }
            if (this.targetPercentage < percentage) {
                return 'green';
            }
        }
    }
    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get('id');
        this.apiService.getDataCompleteness(this.id).then((res: any) => {
            res.rows.forEach((element) => {
                if (element.hitMiss == true) element.hitMiss = 'Complete';
                if (element.hitMiss == false) element.hitMiss = 'Incomplete';
                if (element.hitMiss == null) element.hitMiss = 'N/A';
            });
            this.rows = res.rows;
            this.spotId = res.spotId;
            this.projectName = res.projectName;
            this.dataQualityPercentage = res.dataQualityPercentage * 100;
            if (res.phase == 'Initiate') {
                this.dataQualityPercentageString = 'N/A';
            } else {
                this.dataQualityPercentageString =
                padTo2Digits(this.dataQualityPercentage).toString();
            }
            this.projectType = res.projectType;
            this.viewContent = true;         
        });
    }
}

function getRowClass(row) {
    if (row.hitMiss == 'N/A') {
        return 'hit-miss-false';
    }
    return 'hit-miss-true';
}
function padTo2Digits(num) {
    return parseFloat(num.toString().padStart(2, '0'));
  }
