import { Component, OnDestroy, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { MsalService } from '@azure/msal-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/core/auth/auth.service';
import { FuseNavigationService } from '@fuse/components/navigation';
import { Title } from '@angular/platform-browser';
import { RoleService } from 'app/core/auth/role.service';
import moment from 'moment';
import _ from 'lodash';
import {
    FuseConfirmationConfig,
    FuseConfirmationService,
} from '@fuse/services/confirmation';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { PortfolioCenterService } from '../../portfolio-center.service';
import { PortfolioApiService } from '../../portfolio-api.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD-MMM-yyyy',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-bookmark-edit',
    templateUrl: './bookmark-edit.component.html',
    styleUrls: ['./bookmark-edit.component.scss'],
    animations: fuseAnimations,
    providers: [
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class BookmarkEditComponent implements OnInit {
    owningOrg = [];
    projectType = [
        { name: 'Standard Project / Program' },
        { name: 'SimpleProject' },
        { name: 'Strategic Initiative / Program' },
    ];
    CAPSDropDrownValues = ['Yes', 'No'];
    totalCAPEX = [];
    AgileWorkstream = [];
    AgileWave = [];
    overallStatus = [];
    primaryKPI = [];
    sorting: any = { name: '', dir: '' };
    viewBaseline = false;
    projectOverview: any = [];
    count: number = 0;
    filtersnew: any = {
        PortfolioOwner: [],
        ProjectTeamMember: [],
        ExecutionScope: [],
        OwningOrganization: [],
        ProjectState: [],
        ProjectPhase: [],
        CapitalPhase: [],
        OEPhase: [],
        ProjectType: [],
        Product: [],
        TotalCAPEX: [],
        GMSBudgetOwner: [],
        AGILEWorkstream: [],
        AGILEWave: [],
        CAPSProject: [],
        'Project/Program': [],
        OverallStatus: [],
        PrimaryValueDriver: [],
        SPRProjectCategory: [],
        projectNameKeyword: [],
    };
    lookup: any = [];
    defaultfilter: any = {
        PortfolioOwner: [],
        ProjectTeamMember: [],
        ExecutionScope: [],
        OwningOrganization: [],
        ProjectState: [],
        ProjectPhase: [],
        CapitalPhase: [],
        OEPhase: [],
        ProjectType: [],
        Product: [],
        TotalCAPEX: [],
        GMSBudgetOwner: [],
        AGILEWorkstream: [],
        AGILEWave: [],
        CAPSProject: [],
        'Project/Program': [],
        OverallStatus: [],
        PrimaryValueDriver: [],
        SPRProjectCategory: [],
        projectNameKeyword: [],
        BookmarksValues: [],
    };

    dataLA: any = [];

    filterExpanded = false;
    tableValuesExpanded = false;

    PortfolioFilterForm = new FormGroup({
        BookmarkName: new FormControl('', Validators.required),

        IsAppliedFilters: new FormControl(),

        PortfolioOwner: new FormControl(),
        ExecutionScope: new FormControl(),
        OwningOrganization: new FormControl(),
        ProjectType: new FormControl(),
        ProjectState: new FormControl(),
        ProjectPhase: new FormControl(),
        CapitalPhase: new FormControl(),
        OEPhase: new FormControl(),
        TotalCAPEX: new FormControl(),
        Product: new FormControl(),
        ProjectTeamMember: new FormControl(),
        GMSBudgetOwner: new FormControl(),
        AGILEWorkstream: new FormControl(),
        AGILEWave: new FormControl(),
        CAPSProject: new FormControl(),
        OverallStatus: new FormControl(),
        projectName: new FormControl(),
        PrimaryValueDriver: new FormControl(),
        SPRProjectCategory: new FormControl(),
        projectNameKeyword: new FormControl(),
    });

    ProjectTableColumns = new FormGroup({
        State: new FormControl(false),
        PhaseProjectCapitalOE: new FormControl(false),
        ProjectManager: new FormControl(false),
        Sponsor: new FormControl(false),
        Schedule: new FormControl(false),
        RiskIssues: new FormControl(false),
        AskNeed: new FormControl(false),
        Budget: new FormControl(false),
        Spend: new FormControl(false),
        DQPercent: new FormControl(false),
        TotalCapexApprovedForcast: new FormControl(false),
        CarbonImpact: new FormControl(false),
        WaterImpact: new FormControl(false),
        MilestoneProgression: new FormControl(false),
        NextMilestone: new FormControl(false),
        NextMilestonePlannedFinishDate: new FormControl(false),
        ExecutionCompleteDate: new FormControl(false),
        ExecutionDuration: new FormControl(false),
        ParentProject: new FormControl(false),
        ProjectType: new FormControl(false),
        PortfolioOwner: new FormControl(false),
        OwningOrganization: new FormControl(false),
        EnvironmentalPortfolio: new FormControl(false),
        CAPSProject: new FormControl(false),
        ImpactRealizationDate: new FormControl(false),
        PrimaryProduct: new FormControl(false),
        PrimaryValueDriver: new FormControl(false),
        AGILEPrimaryWorkstream: new FormControl(false),
        AssetPlaceInService: new FormControl(false),
        CapexRequired: new FormControl(false),
        GMSBudgetOwner: new FormControl(false),
        GlobalRegionalPredefinedInvestment: new FormControl(false),
        Where: new FormControl(false),
        Why: new FormControl(false),
        FundingApprovalNeedDate: new FormControl(false),
        OPEXRequired: new FormControl(false),
    });

    filteredPhaseArray = [];
    oePhaseArray = [];
    filterlist: any = {};
    SPRData;
    //For Local Attributes
    localAttributeForm: any = new FormGroup({});
    localAttributeFormRaw: any = new FormGroup({});
    showLA: boolean = false;
    originalData: any;
    state: any;
    user: any;
    capitalPhaseArray: any;
    activeaccount: any;
    localAttributeData: any[];
    groupData: { filterGroups: any[]; localAttributes: any[] };
    filterList: any;
    portfolio: any;
    changePO = false;
    changeES = false;
    userADID: any = '';
    isEdit = false;
    isLA = false;
    isAppliedFiltersChange = false;

    isFirstTimeReload = true;

    defaultColumnValuesSelected = [
        'State',
        'PhaseProjectCapitalOE',
        'ProjectManager',
        'Sponsor',
        'Schedule',
        'RiskIssues',
        'AskNeed',
        'Budget',
        'Spend',
        'DQPercent',
        'TotalCapexApprovedForcast',
        'CarbonImpact',
        'WaterImpact',
        'MilestoneProgression',
        'NextMilestone',
        'NextMilestonePlannedFinishDate',
        'ExecutionCompleteDate',
        'ExecutionDuration',
    ];

    constructor(
        public _fuseNavigationService: FuseNavigationService,
        private titleService: Title,
        private apiService: PortfolioApiService,
        private msal: MsalService,
        public role: RoleService,
        public fuseAlert: FuseConfirmationService,
        private auth: AuthService,
        public PortfolioCenterService: PortfolioCenterService
    ) {
        this.PortfolioCenterService.refreshEditBookmarkComponent.subscribe(
            () => {
                console.log(this.localAttributeForm);
                console.log(this.localAttributeFormRaw);
                if (this.isFirstTimeReload) {
                    this.isFirstTimeReload = false;
                } else {
                    this.dataLA = [];
                    this.ngOnInit();
                }
            }
        );

        this.PortfolioFilterForm.controls.IsAppliedFilters.valueChanges.subscribe(
            (res) => {
                if (res == true) {
                    this.filtersnew = JSON.parse(
                        localStorage.getItem('spot-filtersNew')
                    );
                    if (this.filtersnew.ProjectPhase == null) {
                        this.filtersnew.ProjectPhase = [];
                    }
                    this.PortfolioFilterForm.patchValue({
                        PortfolioOwner: this.filtersnew.PortfolioOwner,
                        ProjectTeamMember: this.filtersnew.ProjectTeamMember,
                        ExecutionScope: this.filtersnew.ExecutionScope,
                        OwningOrganization: this.filtersnew.OwningOrganization,
                        ProjectState: this.filtersnew.ProjectState,
                        ProjectPhase: this.filtersnew.ProjectPhase,
                        CapitalPhase: this.filtersnew.CapitalPhase,
                        OEPhase: this.filtersnew.OEPhase,
                        ProjectType: this.filtersnew.ProjectType,
                        Product: this.filtersnew.Product,
                        TotalCAPEX: this.filtersnew.TotalCAPEX,
                        GMSBudgetOwner: this.filtersnew.GMSBudgetOwner,
                        AGILEWorkstream: this.filtersnew.AGILEWorkstream,
                        AGILEWave: this.filtersnew.AGILEWave,
                        CAPSProject: this.filtersnew.CAPSProject,
                        projectName: this.filtersnew.projectName,
                        OverallStatus: this.filtersnew.OverallStatus,
                        PrimaryValueDriver: this.filtersnew.PrimaryValueDriver,
                        SPRProjectCategory: this.filtersnew.SPRProjectCategory,
                        projectNameKeyword: this.filtersnew.projectNameKeyword,
                    });

                    const tableColumnsArr = JSON.parse(
                        localStorage.getItem('spot-tableColumns')
                    );

                    if (tableColumnsArr.length > 0) {
                        const tableObj =
                            this.patchAllSelectedColumns(tableColumnsArr);
                        this.ProjectTableColumns.patchValue(tableObj);
                    }

                    const localAttributeArray = JSON.parse(
                        localStorage.getItem('spot-localattribute')
                    );
                    if (localAttributeArray.length > 0) {
                        this.isLA = true;
                        this.dataLA = [];
                        this.initializeLocalAttributes(localAttributeArray);
                    }
                } else {
                    if (this.isAppliedFiltersChange) {
                        this.isAppliedFiltersChange = false;
                    } else {
                        this.PortfolioFilterForm.patchValue({
                            PortfolioOwner: [],
                            ProjectTeamMember: [],
                            ExecutionScope: [],
                            OwningOrganization: [],
                            ProjectState: [],
                            ProjectPhase: [],
                            CapitalPhase: [],
                            OEPhase: [],
                            ProjectType: [],
                            Product: [],
                            TotalCAPEX: [],
                            GMSBudgetOwner: [],
                            AGILEWorkstream: [],
                            AGILEWave: [],
                            CAPSProject: [],
                            projectName: [],
                            OverallStatus: [],
                            PrimaryValueDriver: [],
                            SPRProjectCategory: [],
                            projectNameKeyword: [],
                        });
                        this.showLA = false;
                        const tableObj = this.patchAllSelectedColumns(
                            this.defaultColumnValuesSelected
                        );
                        this.ProjectTableColumns.patchValue(tableObj);
                    }
                }
            }
        );

        this.PortfolioFilterForm.controls.PortfolioOwner.valueChanges.subscribe(
            (res) => {
                if (this.showLA) {
                    this.showLA = false;
                    this.localAttributeFormRaw.controls = {};
                    this.localAttributeFormRaw.value = {};
                    this.localAttributeForm.controls = {};
                    this.localAttributeForm.value = {};
                }
                console.log(res);
                this.portfolio = res;
                this.changePO = true;
            }
        );

        this.PortfolioFilterForm.controls.ExecutionScope.valueChanges.subscribe(
            (res) => {
                if (this.showLA) {
                    this.showLA = false;
                    this.localAttributeFormRaw.controls = {};
                    this.localAttributeFormRaw.value = {};
                    this.localAttributeForm.controls = {};
                    this.localAttributeForm.value = {};
                }
                this.changeES = true;
            }
        );

        this.PortfolioFilterForm.controls.ProjectPhase.valueChanges.subscribe(
            (value) => {
                if (value) {
                    this.changePhase(value);
                }
            }
        );
    }

    ngOnInit(): void {
        this.PortfolioFilterForm.reset();
        this.ProjectTableColumns.reset();

        this.tableValuesExpanded = false;
        this.filterExpanded = false;

        this.isEdit = false;

        this.activeaccount = this.msal.instance.getActiveAccount();

        this.titleService.setTitle('Portfolio Center');

        this.apiService.getfilterlist().then((data) => {
            console.log(data, 'DATA');
            this.filterlist = data;
            this.owningOrg = [];
            this.filterlist.defaultOwningOrganizations.forEach((res) => {
                this.owningOrg.push({ name: res });
            });

            this.auth.lookupMaster().then((data) => {
                var AGILEall = {
                    isActive: true,
                    kpiImpact: null,
                    lookUpId: '6e9c3845-5a1f-4891-8825-a1add299a455',
                    lookUpName: 'All Workstream',
                    lookUpOrder: 50,
                    lookUpParentId: 'f4486388-4c52-48fc-8c05-836878da2247',
                };
                this.lookup = data;
                this.totalCAPEX = this.lookup.filter(
                    (result) =>
                        result.lookUpParentId ==
                        '10F36AC1-23CB-4326-8701-2416F8AE679E'
                );
                this.AgileWorkstream = this.lookup.filter(
                    (result) =>
                        result.lookUpParentId ==
                        'f4486388-4c52-48fc-8c05-836878da2247'
                );
                this.AgileWave = this.lookup.filter(
                    (result) =>
                        result.lookUpParentId ==
                        '4bdbcbca-90f2-4c7b-b2a5-c337446d60b1'
                );
                this.overallStatus = this.lookup.filter(
                    (result) =>
                        result.lookUpParentId ==
                        '81ab7402-ab5d-4b2c-bf70-702aedb308f0'
                );
                this.primaryKPI = this.lookup.filter(
                    (result) =>
                        result.lookUpParentId ==
                        '999572a6-5aa8-4760-8082-c06774a17474'
                );
                this.SPRData = this.lookup.filter(
                    (x) =>
                        x.lookUpParentId ==
                        '218576ed-07ee-4d7f-8572-89c8e5b9a7e9'
                );
                this.AgileWorkstream.push(AGILEall);

                this.apiService.getCapitalPhase().then((res: any) => {
                    this.capitalPhaseArray = res;
                    for (var z = 0; z < this.capitalPhaseArray.length; z++) {
                        if (
                            this.capitalPhaseArray[z].capitalPhaseID ==
                            '70538E71-D9F5-42BC-884C-F1824D40D211'
                        ) {
                            this.capitalPhaseArray[z].capitalPhaseName =
                                'Define (Plan Phase)';
                        }
                        if (
                            this.capitalPhaseArray[z].capitalPhaseID ==
                            'CB72B543-CDF8-4C09-8372-60A8784D52D5'
                        ) {
                            this.capitalPhaseArray[z].capitalPhaseName =
                                'Define (Define Phase)';
                        }
                        if (
                            this.capitalPhaseArray[z].capitalPhaseID ==
                            'FCE86580-0CE5-4B9A-9F3A-761FAFC76CEF'
                        ) {
                            this.capitalPhaseArray[z].capitalPhaseName =
                                'Control (Close Phase)';
                        }
                        if (
                            this.capitalPhaseArray[z].capitalPhaseID ==
                            'EA995703-7A78-4689-A013-C9733B26980C'
                        ) {
                            this.capitalPhaseArray[z].capitalPhaseName =
                                'Control (Track Phase)';
                        }
                    }

                    this.user = [
                        {
                            userAdid: this.activeaccount.localAccountId,
                            userDisplayName: this.activeaccount.name,
                            userIsActive: true,
                        },
                    ];

                    this.state = this.filterlist.state.filter(
                        (x) => x.lookUpName == 'Active'
                    );

                    this.initializeData();
                });
            });
        });
    }

    initializeData() {
        if (this.PortfolioCenterService.bookmarkItemId) {
            this.isEdit = true;

            const columnsObj = JSON.parse(
                this.PortfolioCenterService.bookmarkData.bookmark.columnsObject.replaceAll(
                    ' /"',
                    '"'
                )
            );
            const filterObject = JSON.parse(
                this.PortfolioCenterService.bookmarkData.bookmark.filterObject.replaceAll(
                    ' /"',
                    '"'
                )
            );
            const localAttributeArray = JSON.parse(
                this.PortfolioCenterService.bookmarkData.bookmark.localAttributeObject.replaceAll(
                    ' /"',
                    '"'
                )
            );

            this.filterExpanded = true;
            this.tableValuesExpanded = true;
            this.PortfolioFilterForm.patchValue(filterObject);
            this.ProjectTableColumns.patchValue(columnsObj);

            this.PortfolioFilterForm.controls.BookmarkName.patchValue(
                this.PortfolioCenterService.bookmarkData.bookmark.bookmarkName
            );

            if (localAttributeArray.length > 0) {
                this.isLA = true;
                this.initializeLocalAttributes(localAttributeArray);
            }
        } else {
            this.isEdit = false;

            const tableObj = this.patchAllSelectedColumns(
                this.defaultColumnValuesSelected
            );
            this.ProjectTableColumns.patchValue(tableObj);
        }
    }

    initializeLocalAttributes(localAttributeArray) {
        var portfolioOwners = '';
        var executionScope = '';
        if (this.PortfolioFilterForm.controls.PortfolioOwner.value != null) {
            if (
                this.PortfolioFilterForm.controls.PortfolioOwner.value.length !=
                0
            ) {
                for (
                    var z = 0;
                    z <
                    this.PortfolioFilterForm.controls.PortfolioOwner.value
                        .length;
                    z++
                ) {
                    portfolioOwners +=
                        this.PortfolioFilterForm.controls.PortfolioOwner.value[
                            z
                        ].portfolioOwnerId + ',';
                }
            }
        }
        if (this.PortfolioFilterForm.controls.ExecutionScope.value != null) {
            if (
                this.PortfolioFilterForm.controls.ExecutionScope.value.length !=
                0
            ) {
                for (
                    var z = 0;
                    z <
                    this.PortfolioFilterForm.controls.ExecutionScope.value
                        .length;
                    z++
                ) {
                    executionScope +=
                        this.PortfolioFilterForm.controls.ExecutionScope.value[
                            z
                        ].portfolioOwnerId + ',';
                }
            }
        }

        var origData: any = [];
        var localattribute = localAttributeArray;

        this.apiService
            .getLocalAttributes(portfolioOwners, executionScope)
            .then((res: any) => {
                console.log(res);

                origData = this.localAttributeForm.value;
                this.localAttributeFormRaw.controls = {};
                this.localAttributeFormRaw.value = {};
                this.localAttributeForm.controls = {};
                this.localAttributeForm.value = {};

                res.forEach((response) => {
                    localattribute.forEach((LA) => {
                        if (LA.uniqueId == response.uniqueId) {
                            if (
                                response.dataType == 2 ||
                                response.dataType == 4
                            ) {
                                response.data = LA.data;
                                this.localAttributeFormRaw.addControl(
                                    response.name,
                                    new FormControl(LA.data[0])
                                );
                                this.localAttributeFormRaw.addControl(
                                    response.uniqueId,
                                    new FormControl(LA.data[1])
                                );
                            } else {
                                response.data = LA.data;
                                this.localAttributeFormRaw.addControl(
                                    response.uniqueId,
                                    new FormControl(response.data)
                                );
                            }
                        } else {
                            this.localAttributeFormRaw.addControl(
                                response.uniqueId,
                                new FormControl(response.data)
                            );
                        }
                    });
                });

                const originalData = Object.assign([{}], res);
                this.dataLoader(res);
                this.originalData = originalData;
            });
        this.showLA = true;
    }

    dataLoader(res) {
        console.log(this.localAttributeForm);
        res.forEach((data) => {
            var i = Object.assign({}, data);
            if (i.dataType == 1 && i.data.length == 0) {
                i.data = false;
                this.localAttributeForm.addControl(
                    i.uniqueId,
                    new FormControl(i.data)
                );
            } else if (i.dataType == 1 && i.data.length > 0) {
                i.data = i.data[0].value;
                this.localAttributeForm.addControl(
                    i.uniqueId,
                    new FormControl(i.data)
                );
            } else if (i.dataType == 2 && i.data.length == 0) {
                i.data = '';
                this.localAttributeForm.addControl(
                    i.name,
                    new FormControl(i.data)
                );
                this.localAttributeForm.addControl(
                    i.uniqueId,
                    new FormControl(i.data)
                );
            } else if (i.dataType == 2 && i.data.length > 0) {
                this.localAttributeForm.addControl(
                    i.name,
                    new FormControl(i.data[0].value)
                );
                this.localAttributeForm.addControl(
                    i.uniqueId,
                    new FormControl(i.data[1].value)
                );
                i.data = i.data[1].value;
            } else if (i.dataType == 3) {
                if (i.data.length == 0) {
                    i.data = [];
                    this.localAttributeForm.addControl(
                        i.uniqueId,
                        new FormControl(i.data)
                    );
                } else {
                    var newData = i.data;
                    var dataMulti = [];
                    for (var j = 0; j < newData.length; j++) {
                        if (
                            this.lookup.filter(
                                (x) => x.lookUpId == newData[j].value
                            ).length == 0
                        ) {
                            i.data[j] = [];
                        } else {
                            i.data[j] = this.lookup.filter(
                                (x) => x.lookUpId == newData[j].value
                            )[0];
                        }
                    }
                    this.localAttributeForm.addControl(
                        i.uniqueId,
                        new FormControl(i.data)
                    );
                }
            } else if (i.dataType == 5) {
                if (i.data.length == 0) {
                    i.data = [];
                    this.localAttributeForm.addControl(
                        i.uniqueId,
                        new FormControl(i.data)
                    );
                } else {
                    var newData = i.data;
                    var dataMulti = [];
                    for (var j = 0; j < newData.length; j++) {
                        // if (this.lookup.filter(x => x.lookUpId == newData[j].value).length == 0) {
                        //   i.data[j] = []
                        // }
                        // else {
                        i.data[j] = newData[j].value.userAdid;
                        // }
                    }
                    this.localAttributeForm.addControl(
                        i.uniqueId,
                        new FormControl(i.data)
                    );
                }
            }
            // else if (i.dataType == 3 && i.isMulti == false) {
            //   if (i.data.length == 0) {
            //     i.data = ""
            //     this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            //   }
            //   else {
            //     if (this.lookup.filter(x => x.lookUpId == i.data[0].value).length == 0) {
            //       i.data = ""
            //       this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            //     }
            //     else {
            //       i.data = this.lookup.filter(x => x.lookUpId == i.data[0].value)[0]
            //       this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            //     }
            //   }
            // }
            else if (i.dataType == 4 && i.data.length == 0) {
                if (i.linesCount == null) {
                    i.linesCount = 13;
                }
                i.data = '';
                this.localAttributeForm.addControl(
                    i.name,
                    new FormControl(i.data)
                );
                this.localAttributeForm.addControl(
                    i.uniqueId,
                    new FormControl(i.data)
                );
            } else if (i.dataType == 4 && i.data.length > 0) {
                if (i.linesCount == null) {
                    i.linesCount = 13;
                }
                if (i.data[0].value == null) {
                    i.data = '';
                    this.localAttributeForm.addControl(
                        i.name,
                        new FormControl(i.data)
                    );
                    this.localAttributeForm.addControl(
                        i.uniqueId,
                        new FormControl(i.data)
                    );
                } else {
                    this.localAttributeForm.addControl(
                        i.name,
                        new FormControl(i.data[0].value)
                    );
                    i.data = i.data[1].value;
                    this.localAttributeForm.addControl(
                        i.uniqueId,
                        new FormControl(i.data)
                    );
                }
            }
            // else if (i.dataType == 5 && i.isMulti == false) {
            //   if (i.data.length == 0) {
            //     i.data = ""
            //     this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            //   }
            //   else {
            //     if (i.data[0].value == null) {
            //       i.data = ""
            //       this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            //     }
            //     else {
            //       i.data = i.data[0].value
            //       this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            //     }
            //   }
            // }
            else if (i.dataType == 5 && i.data.length == 0) {
                if (i.data.length == 0) {
                    i.data = [];
                    this.localAttributeForm.addControl(
                        i.uniqueId,
                        new FormControl(i.data)
                    );
                } else {
                    var newData = i.data;
                    for (var j = 0; j < newData.length; j++) {
                        i.data = newData[j].value;
                    }
                    this.localAttributeForm.addControl(
                        i.uniqueId,
                        new FormControl(i.data)
                    );
                }
            } else if (i.dataType == 6 && i.data.length == 0) {
                i.data = '';
                this.localAttributeForm.addControl(
                    i.uniqueId,
                    new FormControl(i.data)
                );
            } else if (i.dataType == 6 && i.data.length > 0) {
                i.data = i.data[0].value;
                this.localAttributeForm.addControl(
                    i.uniqueId,
                    new FormControl(i.data)
                );
            }
            this.dataLA.push(i);
        });
    }

    getLookup(key) {
        return this.lookup.filter((x) => x.lookUpParentId == key);
    }

    CloseLA() {
        this.showLA = false;
    }

    OpenLA() {
        var portfolioOwners = '';
        var executionScope = '';
        if (this.PortfolioFilterForm.controls.PortfolioOwner.value != null) {
            if (
                this.PortfolioFilterForm.controls.PortfolioOwner.value.length !=
                0
            ) {
                for (
                    var z = 0;
                    z <
                    this.PortfolioFilterForm.controls.PortfolioOwner.value
                        .length;
                    z++
                ) {
                    portfolioOwners +=
                        this.PortfolioFilterForm.controls.PortfolioOwner.value[
                            z
                        ].portfolioOwnerId + ',';
                }
            }
        }
        if (this.PortfolioFilterForm.controls.ExecutionScope.value != null) {
            if (
                this.PortfolioFilterForm.controls.ExecutionScope.value.length !=
                0
            ) {
                for (
                    var z = 0;
                    z <
                    this.PortfolioFilterForm.controls.ExecutionScope.value
                        .length;
                    z++
                ) {
                    executionScope +=
                        this.PortfolioFilterForm.controls.ExecutionScope.value[
                            z
                        ].portfolioOwnerId + ',';
                }
            }
        }

        var noChangePO = false;
        var noChangeES = false;
        var filtersnew = this.PortfolioFilterForm.getRawValue();
        if (
            portfolioOwners != '' &&
            filtersnew != null &&
            filtersnew.PortfolioOwner != null
        ) {
            var count = 0;
            var list = portfolioOwners.split(',');
            list.pop();
            if (filtersnew.PortfolioOwner.length == list.length) {
                for (var i = 0; i < filtersnew.PortfolioOwner.length; i++) {
                    for (var j = 0; j < list.length; j++) {
                        if (
                            filtersnew.PortfolioOwner[i].portfolioOwnerId ==
                            list[j]
                        ) {
                            count++;
                        }
                    }
                }
            }
            if (count == list.length) {
                noChangePO = true;
            }
        }
        if (
            executionScope != '' &&
            filtersnew != null &&
            filtersnew.ExecutionScope != null
        ) {
            var count = 0;
            var list = executionScope.split(',');
            list.pop();
            if (filtersnew.ExecutionScope.length == list.length) {
                for (var i = 0; i < filtersnew.ExecutionScope.length; i++) {
                    for (var j = 0; j < list.length; j++) {
                        if (
                            filtersnew.ExecutionScope[i].portfolioOwnerId ==
                            list[j]
                        ) {
                            count++;
                        }
                    }
                }
            }
            if (count == list.length) {
                noChangeES = true;
            }
        }
        if (filtersnew != null) {
            if (filtersnew.ExecutionScope == null && executionScope == '') {
                noChangeES = true;
            } else if (filtersnew.ExecutionScope != null) {
                if (
                    filtersnew.ExecutionScope.length == 0 &&
                    executionScope == ''
                ) {
                    noChangeES = true;
                }
            }
        }
        if (filtersnew != null) {
            if (filtersnew.PortfolioOwner == null && portfolioOwners == '') {
                noChangePO = true;
            } else if (filtersnew.PortfolioOwner != null) {
                if (
                    filtersnew.PortfolioOwner.length == 0 &&
                    portfolioOwners == ''
                ) {
                    noChangePO = true;
                }
            }
        }
        var origData: any = [];

        this.showLA = false;
        this.apiService
            .getLocalAttributes(portfolioOwners, executionScope)
            .then((res: any) => {
                console.log(res);
                const originalData = Object.assign([{}], res);
                origData = this.localAttributeForm.value;
                this.originalData = [];
                var filterKeys = Object.keys(this.localAttributeForm.value);
                this.localAttributeFormRaw.controls = {};
                this.localAttributeFormRaw.value = {};
                this.localAttributeForm.controls = {};
                this.localAttributeForm.value = {};
                if (filterKeys.length != 0) {
                    res.forEach((response) => {
                        filterKeys.forEach((key: any) => {
                            if (response.uniqueId == key) {
                                if (
                                    response.dataType == 2 ||
                                    response.dataType == 4
                                ) {
                                    response.data.push({
                                        value: origData[response.name],
                                    });
                                    response.data.push({
                                        value: origData[key],
                                    });
                                } else {
                                    if (
                                        origData[key].length == 0 ||
                                        origData[key] == ''
                                    ) {
                                        // response.data.push([])
                                    } else if (response.dataType == 3) {
                                        for (
                                            var i = 0;
                                            i < origData[key].length;
                                            i++
                                        ) {
                                            response.data.push({
                                                value: origData[key][i]
                                                    .lookUpId,
                                            });
                                        }
                                    } else if (response.dataType == 5) {
                                        for (
                                            var i = 0;
                                            i < origData[key].length;
                                            i++
                                        ) {
                                            response.data.push({
                                                value: origData[key][i],
                                            });
                                        }
                                    } else {
                                        response.data.push({
                                            value: origData[key],
                                        });
                                    }
                                }
                            }
                        });
                    });
                }
                res.forEach((i) => {
                    if (i.dataType == 2 || i.dataType == 4) {
                        this.localAttributeFormRaw.addControl(
                            i.name,
                            new FormControl(i.data[0])
                        );
                        this.localAttributeFormRaw.addControl(
                            i.uniqueId,
                            new FormControl(i.data[1])
                        );
                    }
                    this.localAttributeFormRaw.addControl(
                        i.uniqueId,
                        new FormControl(i.data)
                    );
                });
                this.dataLoader(res);
                this.originalData = originalData;
            });
        this.dataLA = [];
        this.showLA = true;
    }

    getPortfolioOwner(): any {
        if (Object.keys(this.filterlist).length != 0) {
            return this.filterlist.portfolioOwner.filter(
                (x) => x.isPortfolioOwner == true
            );
        }
    }

    getExcecutionScope(): any {
        if (Object.keys(this.filterlist).length != 0) {
            return this.filterlist.portfolioOwner.filter(
                (x) => x.isExecutionScope == true
            );
        }
    }

    getGMSBudgetOwner(): any {
        if (Object.keys(this.filterlist).length != 0) {
            return this.filterlist.portfolioOwner.filter(
                (x) => x.isGmsbudgetOwner == true
            );
        }
    }

    changePhase(phaseId) {
        var result = [];
        var resultOE = [];
        this.filteredPhaseArray = [];
        this.oePhaseArray = [];
        var index = [];
        for (var i = 0; i < phaseId.length; i++) {
            result = this.capitalPhaseArray.filter(
                (item) =>
                    item.associatedPhaseID == phaseId[i].lookUpId &&
                    item.isOEPhase == false
            );
            this.filteredPhaseArray = [...this.filteredPhaseArray, ...result];
        }

        for (var i = 0; i < phaseId.length; i++) {
            resultOE = this.capitalPhaseArray.filter(
                (item) =>
                    item.associatedPhaseID == phaseId[i].lookUpId &&
                    item.isOEPhase == true
            );
            this.oePhaseArray = [...this.oePhaseArray, ...resultOE];
        }
        if (
            this.PortfolioFilterForm.controls.ProjectPhase.value.length == 1 &&
            this.PortfolioFilterForm.controls.ProjectPhase.value[0].lookUpId ==
                '7bf185af-1fda-4086-839e-2aa38fbc19d0'
        ) {
            this.PortfolioFilterForm.controls.CapitalPhase.disable();
            this.PortfolioFilterForm.controls.OEPhase.disable();
        } else {
            this.PortfolioFilterForm.controls.CapitalPhase.enable();
            this.PortfolioFilterForm.controls.OEPhase.enable();
        }
        var PO = this.PortfolioFilterForm.controls.ProjectPhase.value
            ? this.PortfolioFilterForm.controls.ProjectPhase.value.length != 0
                ? true
                : false
            : false;
        var CP = this.PortfolioFilterForm.controls.CapitalPhase.value
            ? this.PortfolioFilterForm.controls.CapitalPhase.value.length != 0
                ? true
                : false
            : false;
        var OP = this.PortfolioFilterForm.controls.OEPhase.value
            ? this.PortfolioFilterForm.controls.OEPhase.value.length != 0
                ? true
                : false
            : false;
        if (PO && (CP || OP)) {
            if (this.PortfolioFilterForm.controls.CapitalPhase.value != null) {
                for (
                    var i = 0;
                    i <
                    this.PortfolioFilterForm.controls.CapitalPhase.value.length;
                    i++
                ) {
                    var c = 0;
                    for (var j = 0; j < this.filteredPhaseArray.length; j++) {
                        if (
                            this.filteredPhaseArray[j].capitalPhaseID ==
                            this.PortfolioFilterForm.controls.CapitalPhase
                                .value[i].capitalPhaseID
                        ) {
                            c++;
                        }
                    }
                    if (c == 0) {
                        index.push(i);
                    }
                }
                if (index.length != 0) {
                    for (var z = 0; z < index.length; z++) {
                        this.PortfolioFilterForm.controls.CapitalPhase.value.splice(
                            index[z],
                            1
                        );
                    }
                }
            }
            if (this.PortfolioFilterForm.controls.OEPhase.value != null) {
                index = [];
                for (
                    var i = 0;
                    i < this.PortfolioFilterForm.controls.OEPhase.value.length;
                    i++
                ) {
                    var c = 0;
                    for (var j = 0; j < this.oePhaseArray.length; j++) {
                        if (
                            this.oePhaseArray[j].capitalPhaseID ==
                            this.PortfolioFilterForm.controls.OEPhase.value[i]
                                .capitalPhaseID
                        ) {
                            c++;
                        }
                    }
                    if (c == 0) {
                        index.push(i);
                    }
                }
                if (index.length != 0) {
                    for (var z = 0; z < index.length; z++) {
                        this.PortfolioFilterForm.controls.OEPhase.value.splice(
                            index[z],
                            1
                        );
                    }
                }
            }
        }
    }

    onEditBookmark() {
        if (this.PortfolioFilterForm.controls.BookmarkName.valid) {
            if (
                this.PortfolioFilterForm.controls.ProjectPhase.value == null ||
                this.PortfolioFilterForm.controls.ProjectPhase.value.length == 0
            ) {
                if (
                    this.PortfolioFilterForm.controls.CapitalPhase.value !=
                        null &&
                    this.PortfolioFilterForm.controls.CapitalPhase.value
                        .length != 0
                ) {
                    this.PortfolioFilterForm.patchValue({ CapitalPhase: [] });
                }
                if (
                    this.PortfolioFilterForm.controls.OEPhase.value != null &&
                    this.PortfolioFilterForm.controls.OEPhase.value.length != 0
                ) {
                    this.PortfolioFilterForm.patchValue({ OEPhase: [] });
                }
            }

            var mainObj = this.originalData;
            var dataToSend = [];
            var emptyObject = {
                uniqueId: '',
                value: '',
            };

            // if(this.PortfolioFilterForm.value.PortfolioOwner?.length > 0 || this.PortfolioFilterForm.value.ExecutionScope?.length > 0){

            var portfolioOwners = '';
            var executionScope = '';

            if (
                this.PortfolioFilterForm.controls.PortfolioOwner.value !=
                    null &&
                this.PortfolioFilterForm.controls.PortfolioOwner.value.length !=
                    0
            ) {
                for (
                    var z = 0;
                    z <
                    this.PortfolioFilterForm.controls.PortfolioOwner.value
                        .length;
                    z++
                ) {
                    portfolioOwners +=
                        this.PortfolioFilterForm.controls.PortfolioOwner.value[
                            z
                        ].portfolioOwnerId + ',';
                }
            }
            if (
                this.PortfolioFilterForm.controls.ExecutionScope.value !=
                    null &&
                this.PortfolioFilterForm.controls.ExecutionScope.value.length !=
                    0
            ) {
                for (
                    var z = 0;
                    z <
                    this.PortfolioFilterForm.controls.ExecutionScope.value
                        .length;
                    z++
                ) {
                    executionScope +=
                        this.PortfolioFilterForm.controls.ExecutionScope.value[
                            z
                        ].portfolioOwnerId + ',';
                }
            }

            this.apiService
                .getLocalAttributes(portfolioOwners, executionScope)
                .then((res: any) => {
                    let localAttributes;
                    let filterObjects;
                    Object.keys(this.localAttributeForm.controls).forEach(
                        (name) => {
                            // const currentControl =
                            //     this.localAttributeForm.controls[name];
                            var i = mainObj.findIndex(
                                (x) => x.uniqueId === name
                            );
                            if (i >= 0) {
                                if (
                                    mainObj[i].data.length == 0 &&
                                    mainObj[i].dataType == 1 &&
                                    this.localAttributeForm.controls[
                                        mainObj[i].uniqueId
                                    ].value == ''
                                ) {
                                    mainObj[i].data = [];
                                    dataToSend.push(mainObj[i]);
                                } else if (
                                    mainObj[i].data.length == 0 &&
                                    mainObj[i].dataType == 2 &&
                                    this.localAttributeForm.controls[
                                        mainObj[i].uniqueId
                                    ].value == ''
                                ) {
                                    mainObj[i].data = [];
                                    dataToSend.push(mainObj[i]);
                                } else if (
                                    mainObj[i].data.length == 0 &&
                                    mainObj[i].dataType == 3 &&
                                    this.localAttributeForm.controls[
                                        mainObj[i].uniqueId
                                    ].value.length == 0
                                ) {
                                    mainObj[i].data = [];
                                    dataToSend.push(mainObj[i]);
                                } else if (
                                    mainObj[i].data.length == 0 &&
                                    (mainObj[i].dataType == 6 ||
                                        mainObj[i].dataType == 4) &&
                                    this.localAttributeForm.controls[
                                        mainObj[i].uniqueId
                                    ].value == ''
                                ) {
                                    mainObj[i].data = [];
                                    dataToSend.push(mainObj[i]);
                                } else if (
                                    mainObj[i].data.length == 0 &&
                                    mainObj[i].dataType == 5 &&
                                    this.localAttributeForm.controls[
                                        mainObj[i].uniqueId
                                    ].value == ''
                                ) {
                                    mainObj[i].data = [];
                                    dataToSend.push(mainObj[i]);
                                } else if (mainObj[i].dataType == 2) {
                                    if (
                                        mainObj[i].data.length != 0 &&
                                        (this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ].value == '' ||
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value == null)
                                    ) {
                                        mainObj[i].data[0].value = null;
                                        dataToSend.push(mainObj[i]);
                                    } else if (
                                        mainObj[i].data.length == 0 &&
                                        this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ].value != ''
                                    ) {
                                        emptyObject = {
                                            uniqueId: '',
                                            value: moment(
                                                this.localAttributeForm
                                                    .controls[mainObj[i].name]
                                                    .value
                                            ).format(
                                                'YYYY-MM-DD[T]HH:mm:ss.sss[Z]'
                                            ),
                                        };
                                        mainObj[i].data.push(emptyObject);
                                        emptyObject = {
                                            uniqueId: '',
                                            value: moment(
                                                this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value
                                            ).format(
                                                'YYYY-MM-DD[T]HH:mm:ss.sss[Z]'
                                            ),
                                        };
                                        mainObj[i].data.push(emptyObject);
                                        dataToSend.push(mainObj[i]);
                                    } else {
                                        mainObj[i].data[0].value = moment(
                                            this.localAttributeForm.controls[
                                                mainObj[i].name
                                            ].value
                                        ).format(
                                            'YYYY-MM-DD[T]HH:mm:ss.sss[Z]'
                                        );
                                        mainObj[i].data[1].value = moment(
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value
                                        ).format(
                                            'YYYY-MM-DD[T]HH:mm:ss.sss[Z]'
                                        );
                                        dataToSend.push(mainObj[i]);
                                    }
                                } else if (mainObj[i].dataType == 3) {
                                    var data = [];
                                    if (
                                        this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ] != null &&
                                        this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ].value.length != 0
                                    ) {
                                        for (
                                            var j = 0;
                                            j <
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value.length;
                                            j++
                                        ) {
                                            if (
                                                this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value.length <
                                                mainObj[i].data.length
                                            ) {
                                                mainObj[i].data = [];
                                                mainObj[i].data[j] = {
                                                    uniqueId: '',
                                                    value: this
                                                        .localAttributeForm
                                                        .controls[
                                                        mainObj[i].uniqueId
                                                    ].value[j].lookUpId,
                                                };
                                            } else {
                                                if (
                                                    mainObj[i].data[j] ==
                                                    undefined
                                                ) {
                                                    mainObj[i].data[j] = {
                                                        uniqueId: '',
                                                        value: this
                                                            .localAttributeForm
                                                            .controls[
                                                            mainObj[i].uniqueId
                                                        ].value[j].lookUpId,
                                                    };
                                                } else {
                                                    mainObj[i].data[j].value =
                                                        this.localAttributeForm.controls[
                                                            mainObj[i].uniqueId
                                                        ].value[j].lookUpId;
                                                }
                                            }
                                        }
                                    } else {
                                        mainObj[i].data = [];
                                    }
                                    dataToSend.push(mainObj[i]);
                                } else if (mainObj[i].dataType == 5) {
                                    var data = [];
                                    if (
                                        this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ] != null &&
                                        this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ].value.length != 0
                                    ) {
                                        for (
                                            var j = 0;
                                            j <
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value.length;
                                            j++
                                        ) {
                                            if (
                                                this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value.length <
                                                mainObj[i].data.length
                                            ) {
                                                mainObj[i].data = [];
                                                mainObj[i].data[j] = {
                                                    uniqueId: '',
                                                    value: this
                                                        .localAttributeForm
                                                        .controls[
                                                        mainObj[i].uniqueId
                                                    ].value[j],
                                                };
                                            } else {
                                                if (
                                                    mainObj[i].data[j] ==
                                                    undefined
                                                ) {
                                                    mainObj[i].data[j] = {
                                                        uniqueId: '',
                                                        value: this
                                                            .localAttributeForm
                                                            .controls[
                                                            mainObj[i].uniqueId
                                                        ].value[j],
                                                    };
                                                } else {
                                                    mainObj[i].data[j].value =
                                                        this.localAttributeForm.controls[
                                                            mainObj[i].uniqueId
                                                        ].value[j];
                                                }
                                            }
                                        }
                                    } else {
                                        mainObj[i].data = [];
                                    }
                                    dataToSend.push(mainObj[i]);
                                } else {
                                    if (mainObj[i].data.length == 0) {
                                        if (
                                            mainObj[i].dataType == 4 &&
                                            (this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value == '' ||
                                                isNaN(
                                                    this.localAttributeForm
                                                        .controls[
                                                        mainObj[i].uniqueId
                                                    ].value
                                                ))
                                        ) {
                                            emptyObject = {
                                                uniqueId: '',
                                                value: '',
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            mainObj[i].data[0].value = null;
                                            dataToSend.push(mainObj[i]);
                                        } else if (
                                            mainObj[i].dataType == 4 &&
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value != '' &&
                                            !isNaN(
                                                this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value
                                            )
                                        ) {
                                            emptyObject = {
                                                uniqueId: '',
                                                value: this.localAttributeForm
                                                    .controls[mainObj[i].name]
                                                    .value,
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            emptyObject = {
                                                uniqueId: '',
                                                value: this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value,
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            dataToSend.push(mainObj[i]);
                                        } else {
                                            emptyObject = {
                                                uniqueId: '',
                                                value: this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value,
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            mainObj[i].data[0].value =
                                                this.localAttributeForm.controls[
                                                    mainObj[i].uniqueId
                                                ].value;
                                            dataToSend.push(mainObj[i]);
                                        }
                                    } else {
                                        if (
                                            mainObj[i].dataType == 4 &&
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value == '' &&
                                            !isNaN(
                                                this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value
                                            )
                                        ) {
                                            mainObj[i].data[0].value = null;
                                            dataToSend.push(mainObj[i]);
                                        }
                                        if (
                                            mainObj[i].dataType == 4 &&
                                            (this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value != '' ||
                                                isNaN(
                                                    this.localAttributeForm
                                                        .controls[
                                                        mainObj[i].uniqueId
                                                    ].value
                                                ))
                                        ) {
                                            mainObj[i].data = [];
                                            emptyObject = {
                                                uniqueId: '',
                                                value: this.localAttributeForm
                                                    .controls[mainObj[i].name]
                                                    .value,
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            emptyObject = {
                                                uniqueId: '',
                                                value: this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value,
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            dataToSend.push(mainObj[i]);
                                        } else {
                                            mainObj[i].data[0].value =
                                                this.localAttributeForm.controls[
                                                    mainObj[i].uniqueId
                                                ].value;
                                            dataToSend.push(mainObj[i]);
                                        }
                                    }
                                }
                            }
                        }
                    );

                    var LA = null;

                    var index = [];
                    var updateArray = [];

                    for (var z = 0; z < dataToSend.length; z++) {
                        if (
                            dataToSend[z].dataType == '4' &&
                            dataToSend[z].data.length != 0
                        ) {
                            if (dataToSend[z].data[0].value == '0') {
                                index.push(z);
                            }
                        }
                        if (dataToSend[z].data.length == 0) {
                            // updateArray.splice(z,1);
                        } else if (
                            dataToSend[z].data[0].value == '' ||
                            dataToSend[z].data[0].value == null ||
                            dataToSend[z].data[0].value == undefined ||
                            dataToSend[z].data[0].value.length == 0
                        ) {
                            // updateArray.splice(z,1);
                        } else if (
                            isNaN(dataToSend[z].data[0].value) &&
                            dataToSend[z].dataType == 4
                        ) {
                            // updateArray.splice(z,1);
                        } else {
                            index.push(z);
                        }
                    }

                    if (index.length > 0) {
                        for (var i = 0; i < index.length; i++) {
                            updateArray.push(dataToSend[index[i]]);
                        }
                    }

                    dataToSend = updateArray;

                    // localStorage.setItem('spot-localattribute', JSON.stringify(dataToSend))

                    if (dataToSend.length != 0) {
                        var c = 0;
                        if (LA != null || LA != undefined) {
                            var secondArray = LA.filter(
                                (o) =>
                                    !dataToSend.some(
                                        (i) => i.uniqueId === o.uniqueId
                                    )
                            );
                            console.log(secondArray);
                            if (secondArray.length != 0) {
                                for (var z = 0; z < secondArray.length; z++) {
                                    dataToSend.push(secondArray[z]);
                                }
                            }
                        }
                        var newIndex = [];
                        var newArray = [];
                        for (var z = 0; z < dataToSend.length; z++) {
                            if (
                                dataToSend[z].dataType == '4' &&
                                dataToSend[z].data[0].value == '0'
                            ) {
                                newIndex.push(z);
                            }
                            if (dataToSend[z].data.length == 0) {
                                // newArray.splice(z,1);
                            } else if (
                                dataToSend[z].data[0].value == '' ||
                                dataToSend[z].data[0].value == null ||
                                dataToSend[z].data[0].value == undefined ||
                                dataToSend[z].data[0].value.length == 0
                            ) {
                                // newArray.splice(z,1);
                            } else if (
                                isNaN(dataToSend[z].data[0].value) &&
                                dataToSend[z].dataType == 4
                            ) {
                                // newArray.splice(z,1);
                            } else {
                                newIndex.push(z);
                            }
                        }
                        if (newIndex.length > 0) {
                            for (var i = 0; i < newIndex.length; i++) {
                                newArray.push(dataToSend[newIndex[i]]);
                            }
                        }
                        dataToSend = newArray;
                        // localStorage.setItem('spot-localattribute', JSON.stringify(dataToSend))
                    } else if (
                        (LA != null || LA != undefined) &&
                        dataToSend.length == 0
                    ) {
                        for (var i = 0; i < LA.length; i++) {
                            dataToSend.push(LA[i]);
                        }
                        // localStorage.setItem('spot-localattribute', JSON.stringify(dataToSend))
                    }

                    var removeEle = [];
                    var removeData = [];

                    if (dataToSend.length > 0) {
                        for (var i = 0; i < dataToSend.length; i++) {
                            var count = 0;
                            for (var j = 0; j < res.length; j++) {
                                if (dataToSend[i].uniqueId == res[j].uniqueId) {
                                    count++;
                                }
                            }
                            if (count > 0) {
                                removeEle.push(i);
                            }
                        }
                    }

                    if (removeEle.length > 0) {
                        for (var i = 0; i < removeEle.length; i++) {
                            removeData.push(dataToSend[removeEle[i]]);
                        }
                        dataToSend = removeData;
                    }
                    localAttributes = dataToSend;
                    this.filtersnew = this.PortfolioFilterForm.getRawValue();

                    filterObjects = this.filtersnew;

                    if (
                        Object.values(this.filtersnew).every(
                            (x: any) => x === null || x === '' || x.length === 0
                        ) &&
                        dataToSend.length == 0
                    ) {
                        var comfirmConfig: FuseConfirmationConfig = {
                            title: 'There must be at least one filter present other wise the query will return too much data to load.',
                            message: '',
                            icon: {
                                show: true,
                                name: 'heroicons_outline:exclamation',
                                color: 'warn',
                            },
                            actions: {
                                confirm: {
                                    show: true,
                                    label: 'Okay',
                                    color: 'warn',
                                },
                            },
                            dismissible: true,
                        };

                        this.fuseAlert.open(comfirmConfig);
                    } else {
                        this.isAppliedFiltersChange = true;
                        this.PortfolioFilterForm.controls.IsAppliedFilters.setValue(
                            false
                        );

                        const tempObj = {
                            bookmarkId:
                                this.PortfolioCenterService.bookmarkItemId,
                            bookmarkName:
                                this.PortfolioFilterForm.controls.BookmarkName
                                    .value,
                            userADId: this.activeaccount.localAccountId,
                            columnsObject: JSON.stringify(
                                this.ProjectTableColumns.value
                            ).replaceAll('"', ' /"'),
                            filterObject: JSON.stringify(
                                filterObjects
                            ).replaceAll('"', ' /"'),
                            localAttributeObject: JSON.stringify(
                                localAttributes
                            ).replaceAll('"', ' /"'),
                        };

                        const isExist =
                            this.PortfolioCenterService.bookmarks.some(
                                (bookmark) =>
                                    bookmark.bookmarkName ===
                                        this.PortfolioFilterForm.controls
                                            .BookmarkName.value &&
                                    bookmark.bookmarkId !=
                                        this.PortfolioCenterService
                                            .bookmarkItemId
                            );

                        if (isExist) {
                        } else {
                            this.apiService
                                .updateBookmarkValue(
                                    this.PortfolioCenterService.bookmarkItemId,
                                    tempObj
                                )
                                .then((res: any) => {
                                    this.PortfolioCenterService.getAllBookmarks();
                                    this.PortfolioCenterService.bookmarkSmallDrawerOpenedChanged(
                                        false
                                    );
                                    this.PortfolioFilterForm.reset();
                                    this.ProjectTableColumns.reset();
                                    this.PortfolioFilterForm.markAsUntouched();
                                    this.PortfolioFilterForm.markAsPristine();

                                    if (
                                        this.PortfolioCenterService
                                            .bookmarkItemId ==
                                        localStorage.getItem(
                                            'spot-currentBookmark'
                                        )
                                    ) {
                                        window.location.reload();
                                    }
                                });
                        }
                    }

                    // COMMENTED CODE

                    // this.filterDrawer.close()
                    // this.PortfolioCenterService.drawerOpenedPrakharTemp = false
                    // this.resetpage()
                    // this.showFilter = false
                });
        }
    }

    patchAllSelectedColumns(arr) {
        this.ProjectTableColumns.reset();

        let result = this.ProjectTableColumns.value;

        arr.forEach((key) => {
            result[key] = true;
        });

        return result;
    }

    onAddBookmark() {
        if (this.PortfolioFilterForm.controls.BookmarkName.valid) {
            if (
                this.PortfolioFilterForm.controls.ProjectPhase.value == null ||
                this.PortfolioFilterForm.controls.ProjectPhase.value.length == 0
            ) {
                if (
                    this.PortfolioFilterForm.controls.CapitalPhase.value !=
                        null &&
                    this.PortfolioFilterForm.controls.CapitalPhase.value
                        .length != 0
                ) {
                    this.PortfolioFilterForm.patchValue({ CapitalPhase: [] });
                }
                if (
                    this.PortfolioFilterForm.controls.OEPhase.value != null &&
                    this.PortfolioFilterForm.controls.OEPhase.value.length != 0
                ) {
                    this.PortfolioFilterForm.patchValue({ OEPhase: [] });
                }
            }

            var mainObj = this.originalData;
            var dataToSend = [];
            var emptyObject = {
                uniqueId: '',
                value: '',
            };

            // if(this.PortfolioFilterForm.value.PortfolioOwner?.length > 0 || this.PortfolioFilterForm.value.ExecutionScope?.length > 0){

            var portfolioOwners = '';
            var executionScope = '';

            if (
                this.PortfolioFilterForm.controls.PortfolioOwner.value !=
                    null &&
                this.PortfolioFilterForm.controls.PortfolioOwner.value.length !=
                    0
            ) {
                for (
                    var z = 0;
                    z <
                    this.PortfolioFilterForm.controls.PortfolioOwner.value
                        .length;
                    z++
                ) {
                    portfolioOwners +=
                        this.PortfolioFilterForm.controls.PortfolioOwner.value[
                            z
                        ].portfolioOwnerId + ',';
                }
            }
            if (
                this.PortfolioFilterForm.controls.ExecutionScope.value !=
                    null &&
                this.PortfolioFilterForm.controls.ExecutionScope.value.length !=
                    0
            ) {
                for (
                    var z = 0;
                    z <
                    this.PortfolioFilterForm.controls.ExecutionScope.value
                        .length;
                    z++
                ) {
                    executionScope +=
                        this.PortfolioFilterForm.controls.ExecutionScope.value[
                            z
                        ].portfolioOwnerId + ',';
                }
            }

            this.apiService
                .getLocalAttributes(portfolioOwners, executionScope)
                .then((res: any) => {
                    let localAttributes;
                    let filterObjects;
                    Object.keys(this.localAttributeForm.controls).forEach(
                        (name) => {
                            // const currentControl =
                            //     this.localAttributeForm.controls[name];
                            var i = mainObj.findIndex(
                                (x) => x.uniqueId === name
                            );
                            if (i >= 0) {
                                if (
                                    mainObj[i].data.length == 0 &&
                                    mainObj[i].dataType == 1 &&
                                    this.localAttributeForm.controls[
                                        mainObj[i].uniqueId
                                    ].value == ''
                                ) {
                                    mainObj[i].data = [];
                                    dataToSend.push(mainObj[i]);
                                } else if (
                                    mainObj[i].data.length == 0 &&
                                    mainObj[i].dataType == 2 &&
                                    this.localAttributeForm.controls[
                                        mainObj[i].uniqueId
                                    ].value == ''
                                ) {
                                    mainObj[i].data = [];
                                    dataToSend.push(mainObj[i]);
                                } else if (
                                    mainObj[i].data.length == 0 &&
                                    mainObj[i].dataType == 3 &&
                                    this.localAttributeForm.controls[
                                        mainObj[i].uniqueId
                                    ].value.length == 0
                                ) {
                                    mainObj[i].data = [];
                                    dataToSend.push(mainObj[i]);
                                } else if (
                                    mainObj[i].data.length == 0 &&
                                    (mainObj[i].dataType == 6 ||
                                        mainObj[i].dataType == 4) &&
                                    this.localAttributeForm.controls[
                                        mainObj[i].uniqueId
                                    ].value == ''
                                ) {
                                    mainObj[i].data = [];
                                    dataToSend.push(mainObj[i]);
                                } else if (
                                    mainObj[i].data.length == 0 &&
                                    mainObj[i].dataType == 5 &&
                                    this.localAttributeForm.controls[
                                        mainObj[i].uniqueId
                                    ].value == ''
                                ) {
                                    mainObj[i].data = [];
                                    dataToSend.push(mainObj[i]);
                                } else if (mainObj[i].dataType == 2) {
                                    if (
                                        mainObj[i].data.length != 0 &&
                                        (this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ].value == '' ||
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value == null)
                                    ) {
                                        mainObj[i].data[0].value = null;
                                        dataToSend.push(mainObj[i]);
                                    } else if (
                                        mainObj[i].data.length == 0 &&
                                        this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ].value != ''
                                    ) {
                                        emptyObject = {
                                            uniqueId: '',
                                            value: moment(
                                                this.localAttributeForm
                                                    .controls[mainObj[i].name]
                                                    .value
                                            ).format(
                                                'YYYY-MM-DD[T]HH:mm:ss.sss[Z]'
                                            ),
                                        };
                                        mainObj[i].data.push(emptyObject);
                                        emptyObject = {
                                            uniqueId: '',
                                            value: moment(
                                                this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value
                                            ).format(
                                                'YYYY-MM-DD[T]HH:mm:ss.sss[Z]'
                                            ),
                                        };
                                        mainObj[i].data.push(emptyObject);
                                        dataToSend.push(mainObj[i]);
                                    } else {
                                        mainObj[i].data[0].value = moment(
                                            this.localAttributeForm.controls[
                                                mainObj[i].name
                                            ].value
                                        ).format(
                                            'YYYY-MM-DD[T]HH:mm:ss.sss[Z]'
                                        );
                                        mainObj[i].data[1].value = moment(
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value
                                        ).format(
                                            'YYYY-MM-DD[T]HH:mm:ss.sss[Z]'
                                        );
                                        dataToSend.push(mainObj[i]);
                                    }
                                } else if (mainObj[i].dataType == 3) {
                                    var data = [];
                                    if (
                                        this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ] != null &&
                                        this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ].value.length != 0
                                    ) {
                                        for (
                                            var j = 0;
                                            j <
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value.length;
                                            j++
                                        ) {
                                            if (
                                                this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value.length <
                                                mainObj[i].data.length
                                            ) {
                                                mainObj[i].data = [];
                                                mainObj[i].data[j] = {
                                                    uniqueId: '',
                                                    value: this
                                                        .localAttributeForm
                                                        .controls[
                                                        mainObj[i].uniqueId
                                                    ].value[j].lookUpId,
                                                };
                                            } else {
                                                if (
                                                    mainObj[i].data[j] ==
                                                    undefined
                                                ) {
                                                    mainObj[i].data[j] = {
                                                        uniqueId: '',
                                                        value: this
                                                            .localAttributeForm
                                                            .controls[
                                                            mainObj[i].uniqueId
                                                        ].value[j].lookUpId,
                                                    };
                                                } else {
                                                    mainObj[i].data[j].value =
                                                        this.localAttributeForm.controls[
                                                            mainObj[i].uniqueId
                                                        ].value[j].lookUpId;
                                                }
                                            }
                                        }
                                    } else {
                                        mainObj[i].data = [];
                                    }
                                    dataToSend.push(mainObj[i]);
                                } else if (mainObj[i].dataType == 5) {
                                    var data = [];
                                    if (
                                        this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ] != null &&
                                        this.localAttributeForm.controls[
                                            mainObj[i].uniqueId
                                        ].value.length != 0
                                    ) {
                                        for (
                                            var j = 0;
                                            j <
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value.length;
                                            j++
                                        ) {
                                            if (
                                                this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value.length <
                                                mainObj[i].data.length
                                            ) {
                                                mainObj[i].data = [];
                                                mainObj[i].data[j] = {
                                                    uniqueId: '',
                                                    value: this
                                                        .localAttributeForm
                                                        .controls[
                                                        mainObj[i].uniqueId
                                                    ].value[j],
                                                };
                                            } else {
                                                if (
                                                    mainObj[i].data[j] ==
                                                    undefined
                                                ) {
                                                    mainObj[i].data[j] = {
                                                        uniqueId: '',
                                                        value: this
                                                            .localAttributeForm
                                                            .controls[
                                                            mainObj[i].uniqueId
                                                        ].value[j],
                                                    };
                                                } else {
                                                    mainObj[i].data[j].value =
                                                        this.localAttributeForm.controls[
                                                            mainObj[i].uniqueId
                                                        ].value[j];
                                                }
                                            }
                                        }
                                    } else {
                                        mainObj[i].data = [];
                                    }
                                    dataToSend.push(mainObj[i]);
                                } else {
                                    if (mainObj[i].data.length == 0) {
                                        if (
                                            mainObj[i].dataType == 4 &&
                                            (this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value == '' ||
                                                isNaN(
                                                    this.localAttributeForm
                                                        .controls[
                                                        mainObj[i].uniqueId
                                                    ].value
                                                ))
                                        ) {
                                            emptyObject = {
                                                uniqueId: '',
                                                value: '',
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            mainObj[i].data[0].value = null;
                                            dataToSend.push(mainObj[i]);
                                        } else if (
                                            mainObj[i].dataType == 4 &&
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value != '' &&
                                            !isNaN(
                                                this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value
                                            )
                                        ) {
                                            emptyObject = {
                                                uniqueId: '',
                                                value: this.localAttributeForm
                                                    .controls[mainObj[i].name]
                                                    .value,
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            emptyObject = {
                                                uniqueId: '',
                                                value: this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value,
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            dataToSend.push(mainObj[i]);
                                        } else {
                                            emptyObject = {
                                                uniqueId: '',
                                                value: this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value,
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            mainObj[i].data[0].value =
                                                this.localAttributeForm.controls[
                                                    mainObj[i].uniqueId
                                                ].value;
                                            dataToSend.push(mainObj[i]);
                                        }
                                    } else {
                                        if (
                                            mainObj[i].dataType == 4 &&
                                            this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value == '' &&
                                            !isNaN(
                                                this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value
                                            )
                                        ) {
                                            mainObj[i].data[0].value = null;
                                            dataToSend.push(mainObj[i]);
                                        }
                                        if (
                                            mainObj[i].dataType == 4 &&
                                            (this.localAttributeForm.controls[
                                                mainObj[i].uniqueId
                                            ].value != '' ||
                                                isNaN(
                                                    this.localAttributeForm
                                                        .controls[
                                                        mainObj[i].uniqueId
                                                    ].value
                                                ))
                                        ) {
                                            mainObj[i].data = [];
                                            emptyObject = {
                                                uniqueId: '',
                                                value: this.localAttributeForm
                                                    .controls[mainObj[i].name]
                                                    .value,
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            emptyObject = {
                                                uniqueId: '',
                                                value: this.localAttributeForm
                                                    .controls[
                                                    mainObj[i].uniqueId
                                                ].value,
                                            };
                                            mainObj[i].data.push(emptyObject);
                                            dataToSend.push(mainObj[i]);
                                        } else {
                                            mainObj[i].data[0].value =
                                                this.localAttributeForm.controls[
                                                    mainObj[i].uniqueId
                                                ].value;
                                            dataToSend.push(mainObj[i]);
                                        }
                                    }
                                }
                            }
                        }
                    );

                    var LA = null;

                    var index = [];
                    var updateArray = [];

                    for (var z = 0; z < dataToSend.length; z++) {
                        if (
                            dataToSend[z].dataType == '4' &&
                            dataToSend[z].data.length != 0
                        ) {
                            if (dataToSend[z].data[0].value == '0') {
                                index.push(z);
                            }
                        }
                        if (dataToSend[z].data.length == 0) {
                            // updateArray.splice(z,1);
                        } else if (
                            dataToSend[z].data[0].value == '' ||
                            dataToSend[z].data[0].value == null ||
                            dataToSend[z].data[0].value == undefined ||
                            dataToSend[z].data[0].value.length == 0
                        ) {
                            // updateArray.splice(z,1);
                        } else if (
                            isNaN(dataToSend[z].data[0].value) &&
                            dataToSend[z].dataType == 4
                        ) {
                            // updateArray.splice(z,1);
                        } else {
                            index.push(z);
                        }
                    }

                    if (index.length > 0) {
                        for (var i = 0; i < index.length; i++) {
                            updateArray.push(dataToSend[index[i]]);
                        }
                    }

                    dataToSend = updateArray;

                    // localStorage.setItem('spot-localattribute', JSON.stringify(dataToSend))

                    if (dataToSend.length != 0) {
                        var c = 0;
                        if (LA != null || LA != undefined) {
                            var secondArray = LA.filter(
                                (o) =>
                                    !dataToSend.some(
                                        (i) => i.uniqueId === o.uniqueId
                                    )
                            );
                            console.log(secondArray);
                            if (secondArray.length != 0) {
                                for (var z = 0; z < secondArray.length; z++) {
                                    dataToSend.push(secondArray[z]);
                                }
                            }
                        }
                        var newIndex = [];
                        var newArray = [];
                        for (var z = 0; z < dataToSend.length; z++) {
                            if (
                                dataToSend[z].dataType == '4' &&
                                dataToSend[z].data[0].value == '0'
                            ) {
                                newIndex.push(z);
                            }
                            if (dataToSend[z].data.length == 0) {
                                // newArray.splice(z,1);
                            } else if (
                                dataToSend[z].data[0].value == '' ||
                                dataToSend[z].data[0].value == null ||
                                dataToSend[z].data[0].value == undefined ||
                                dataToSend[z].data[0].value.length == 0
                            ) {
                                // newArray.splice(z,1);
                            } else if (
                                isNaN(dataToSend[z].data[0].value) &&
                                dataToSend[z].dataType == 4
                            ) {
                                // newArray.splice(z,1);
                            } else {
                                newIndex.push(z);
                            }
                        }
                        if (newIndex.length > 0) {
                            for (var i = 0; i < newIndex.length; i++) {
                                newArray.push(dataToSend[newIndex[i]]);
                            }
                        }
                        dataToSend = newArray;
                        // localStorage.setItem('spot-localattribute', JSON.stringify(dataToSend))
                    } else if (
                        (LA != null || LA != undefined) &&
                        dataToSend.length == 0
                    ) {
                        for (var i = 0; i < LA.length; i++) {
                            dataToSend.push(LA[i]);
                        }
                        // localStorage.setItem('spot-localattribute', JSON.stringify(dataToSend))
                    }

                    var removeEle = [];
                    var removeData = [];

                    if (dataToSend.length > 0) {
                        for (var i = 0; i < dataToSend.length; i++) {
                            var count = 0;
                            for (var j = 0; j < res.length; j++) {
                                if (dataToSend[i].uniqueId == res[j].uniqueId) {
                                    count++;
                                }
                            }
                            if (count > 0) {
                                removeEle.push(i);
                            }
                        }
                    }

                    if (removeEle.length > 0) {
                        for (var i = 0; i < removeEle.length; i++) {
                            removeData.push(dataToSend[removeEle[i]]);
                        }
                        dataToSend = removeData;
                    }
                    localAttributes = dataToSend;
                    this.filtersnew = this.PortfolioFilterForm.getRawValue();

                    filterObjects = this.filtersnew;

                    if (
                        Object.values(this.filtersnew).every(
                            (x: any) => x === null || x === '' || x.length === 0
                        ) &&
                        dataToSend.length == 0
                    ) {
                        var comfirmConfig: FuseConfirmationConfig = {
                            title: 'There must be at least one filter present other wise the query will return too much data to load.',
                            message: '',
                            icon: {
                                show: true,
                                name: 'heroicons_outline:exclamation',
                                color: 'warn',
                            },
                            actions: {
                                confirm: {
                                    show: true,
                                    label: 'Okay',
                                    color: 'warn',
                                },
                            },
                            dismissible: true,
                        };

                        this.fuseAlert.open(comfirmConfig);
                    } else {
                        this.isAppliedFiltersChange = true;
                        this.PortfolioFilterForm.controls.IsAppliedFilters.setValue(
                            false
                        );

                        const tempObj = {
                            bookmarkId: 'new',
                            bookmarkName:
                                this.PortfolioFilterForm.controls.BookmarkName
                                    .value,
                            userADId: this.activeaccount.localAccountId,
                            columnsObject: JSON.stringify(
                                this.ProjectTableColumns.value
                            ).replaceAll('"', ' /"'),
                            filterObject: JSON.stringify(
                                filterObjects
                            ).replaceAll('"', ' /"'),
                            localAttributeObject: JSON.stringify(
                                localAttributes
                            ).replaceAll('"', ' /"'),
                            createdDate: new Date().toISOString(),
                        };
                        const isExist =
                            this.PortfolioCenterService.bookmarks.some(
                                (bookmark) =>
                                    bookmark.bookmarkName ===
                                    this.PortfolioFilterForm.controls
                                        .BookmarkName.value
                            );

                        if (isExist) {
                        } else {
                            this.apiService
                                .addBookmarkValue(tempObj)
                                .then((res: any) => {
                                    this.PortfolioCenterService.getAllBookmarks();
                                    this.PortfolioCenterService.bookmarkSmallDrawerOpenedChanged(
                                        false
                                    );
                                    this.PortfolioFilterForm.reset();
                                    this.ProjectTableColumns.reset();
                                    this.PortfolioFilterForm.markAsUntouched();
                                    this.PortfolioFilterForm.markAsPristine();
                                });
                        }
                    }

                    // COMMENTED CODE

                    // this.filterDrawer.close()
                    // this.PortfolioCenterService.drawerOpenedPrakharTemp = false
                    // this.resetpage()
                    // this.showFilter = false
                });
        }
    }
}
