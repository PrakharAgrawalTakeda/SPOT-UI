import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import * as moment from "moment/moment";
import {GlobalBusinessCaseOptions} from "../../../../shared/global-business-case-options";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../../../core/navigation/navigation.service";
import {FuseMediaWatcherService} from "../../../../../@fuse/services/media-watcher";
import {FuseNavigationService} from "../../../../../@fuse/components/navigation";
import {ProjectHubService} from "../../../project-hub/project-hub.service";
import {MyPreferenceService} from "../../my-preference.service";

@Component({
  selector: 'app-metric-repository-add-edit-view',
  templateUrl: './metric-repository-add-edit-view.component.html',
  styleUrls: ['./metric-repository-add-edit-view.component.scss']
})
export class MetricRepositoryAddEditViewComponent {
    constructor(
        public myPreferenceService: MyPreferenceService
    ){

    }

    metricRepositoryForm = new FormGroup({
        globalLocal: new FormControl(null),
        managingPortofolio: new FormControl(''),
        category: new FormControl(''),
        metricName: new FormControl(''),
        unit: new FormControl(''),
        metricFormat: new FormControl(''),
        metricDescription: new FormControl(''),
        metricUsage: new FormControl(''),

    })
    submitriskissue() {

    }
}
