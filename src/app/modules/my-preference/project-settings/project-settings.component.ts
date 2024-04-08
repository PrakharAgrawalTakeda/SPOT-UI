import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';
import {
    FuseConfirmationConfig,
    FuseConfirmationService,
} from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { RoleService } from 'app/core/auth/role.service';
import { MyPreferenceApiService } from '../my-preference-api.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-project-settings',
    templateUrl: './project-settings.component.html',
    styleUrls: ['./project-settings.component.scss'],
})
export class ProjectSettingsComponent {
    preferenceForm = new FormGroup({
        role: new FormControl(''),
    });
    archiveForm = new FormGroup({
        userAdid: new FormControl(''),
        includeArchiveProject: new FormControl(false),
    });

    portfolioTilesValues = [
        {
            name: 'PhaseDistribution',
            label: 'Phase Distribution',
            isToggled: true,
            order: 100,
        },
        {
            name: 'MilestonePerformances',
            label: 'Milestone Performances',
            isToggled: true,
            order: 200,
        },
        { name: 'Budget', label: 'Budget', isToggled: true, order: 300 },
    ];

    PortfolioCenterTilesForm = new FormGroup({
        Tiles: new FormArray([]),
    });

    get tilesFormArray() {
        return (this.PortfolioCenterTilesForm.get('Tiles') as FormArray)
            .controls;
    }

    orderView = false;

    lookupdata: any = [];
    private initialized = false;
    toggle: boolean = false;

    isPortfolioInitialized = false;

    constructor(
        private titleService: Title,
        private cdr: ChangeDetectorRef,
        public auth: AuthService,
        private roleService: RoleService,
        private apiService: MyPreferenceApiService,
        private msalService: MsalService,
        public fuseAlert: FuseConfirmationService
    ) {
        this.archiveForm.valueChanges.subscribe((res) => {
            console.log(this.archiveForm.getRawValue());
            if (this.initialized) {
                this.changeToggle();
            } else {
                this.initialized = true;
            }
        });
        //   this.archiveForm.controls.includeArchiveProject.valueChanges.subscribe(res => {
        //     if (this.initialized) {

        //   }
        // })

        this.PortfolioCenterTilesForm.controls.Tiles.valueChanges.subscribe(
            (res) => {
                console.log('changes');
            }
        );
    }

    ngOnInit(): void {
        console.log('Project settings');
        this.auth.lookupMaster().then((res) => {
            this.lookupdata = res;
            this.titleService.setTitle('My Preferences');
        });
        this.dataloader();
        this.populatePortfolioTiles(this.portfolioTilesValues);
        this.initializePrefrencesTile();
    }

    dataloader() {
        this.apiService
            .getuserPreference(
                this.msalService.instance.getActiveAccount().localAccountId
            )
            .then((res: any) => {
                this.archiveForm.patchValue({
                    userAdid: res.userAdid,
                    includeArchiveProject: res.includeArchiveProject,
                });
            });
    }

    changeToggle() {
        this.initialized = false;
        var archiveProject = this.archiveForm.getRawValue();

        if (archiveProject.includeArchiveProject == true) {
            var comfirmConfig: FuseConfirmationConfig = {
                title: 'Are you sure?',
                message:
                    'Including archived projects in the portfolio center search may slow down the performance of SPOT and lead to increased response time. Are you sure you want to continue?',
                icon: {
                    show: true,
                    name: 'heroicons_outline:exclamation',
                    color: 'warn',
                },
                actions: {
                    confirm: {
                        show: true,
                        label: 'Ok',
                        color: 'warn',
                    },
                    cancel: {
                        show: true,
                        label: 'Cancel',
                    },
                },
                dismissible: true,
            };
            const alert = this.fuseAlert.open(comfirmConfig);
            alert.afterClosed().subscribe((close) => {
                if (close == 'confirmed') {
                    this.archiveForm.patchValue({
                        includeArchiveProject: true,
                    });
                    var archiveProject = this.archiveForm.getRawValue();
                    var mainObj = {
                        userAdid: archiveProject.userAdid,
                        includeArchiveProject:
                            archiveProject.includeArchiveProject,
                    };
                    this.apiService
                        .updateuserPreference(
                            this.msalService.instance.getActiveAccount()
                                .localAccountId,
                            mainObj
                        )
                        .then((res) => {
                            location.reload();
                        });
                } else {
                    location.reload();
                }
            });
        } else {
            var archiveProject = this.archiveForm.getRawValue();
            var mainObj = {
                userAdid: archiveProject.userAdid,
                includeArchiveProject: archiveProject.includeArchiveProject,
            };
            this.apiService
                .updateuserPreference(
                    this.msalService.instance.getActiveAccount().localAccountId,
                    mainObj
                )
                .then((res) => {
                    location.reload();
                });
        }
    }

    changeOrderView() {
        // if (this.myPreferenceService.isFormChanged && this.orderView == false) {
        //     var comfirmConfig: FuseConfirmationConfig = {
        //         title: 'Are you sure?',
        //         message:
        //             'Are you sure you want switch to the order view page? All the changes will be lost ',
        //         icon: {
        //             show: true,
        //             name: 'heroicons_outline:exclamation',
        //             color: 'warn',
        //         },
        //         actions: {
        //             confirm: {
        //                 show: true,
        //                 label: 'OK',
        //                 color: 'warn',
        //             },
        //             cancel: {
        //                 show: true,
        //                 label: 'Cancel',
        //             },
        //         },
        //         dismissible: true,
        //     };
        //     const riskIssueAlert = this.fuseAlert.open(comfirmConfig);
        //     riskIssueAlert.afterClosed().subscribe((close) => {
        //         if (close == 'confirmed') {
        //             this.smTableEditStack = [];
        //             this.orderView = !this.orderView;
        //         }
        //     });
        // } else {
        this.orderView = !this.orderView;
        // this.smTableEditStack = [];
        // this.myPreferenceService.isFormChanged = false;
        // }
    }

    initializePrefrencesTile() {
        const localAccountID =
            this.msalService.instance.getActiveAccount().localAccountId;
        this.apiService
            .getPortifolioCenterTilePreferencesByUser(localAccountID)
            .then((res) => {
                this.rearrangeTable(res);
            });
    }

    populatePortfolioTiles(toggleData: any[]): void {
        debugger;
        const togglesFormArray = this.PortfolioCenterTilesForm.get(
            'Tiles'
        ) as FormArray;

        while (togglesFormArray.length !== 0) {
            togglesFormArray.removeAt(0);
        }

        for (let i = 0; i < toggleData.length; i++) {
            const toggleFormGroup = new FormGroup({
                name: new FormControl(toggleData[i].name),
                isToggled: new FormControl(toggleData[i].isToggled), // Set default value as needed
                label: new FormControl(toggleData[i].label),
                order: new FormControl(toggleData[i].order),
            });

            togglesFormArray.push(toggleFormGroup);
        }
    }

    checkToggled() {
        this.portfolioTilesValues =
            this.PortfolioCenterTilesForm.controls.Tiles.value;
        this.populatePortfolioTiles(this.portfolioTilesValues);
        this.updatePortfolioCenterTiles();
    }

    drop(event: CdkDragDrop<string[]>) {
        const tilesFormArray = this.PortfolioCenterTilesForm.get(
            'Tiles'
        ) as FormArray;

        this.portfolioTilesValues = tilesFormArray.value;

        moveItemInArray(
            this.portfolioTilesValues,
            event.previousIndex,
            event.currentIndex
        );

        while (tilesFormArray.length !== 0) {
            tilesFormArray.removeAt(0);
        }

        this.populatePortfolioTiles(this.portfolioTilesValues);

        this.updatePortfolioCenterTiles();
    }

    updatePortfolioCenterTiles() {
        const localAccountID =
            this.msalService.instance.getActiveAccount().localAccountId;

        const obj = {
            portfolioCenterTilePreferencesId: 'new',
            userADId: localAccountID,
            phaseDistributionVisible: true,
            phaseDistributionVisibleOrder: 0,
            milestonePerformanceVisible: true,
            milestonePerformanceVisibleOrder: 0,
            budgetTileVisible: true,
            budgetTileVisibleOrder: 0,
        };

        let count = 100;

        for (let i = 0; i < this.portfolioTilesValues.length; i++) {
            switch (this.portfolioTilesValues[i].name) {
                case 'PhaseDistribution':
                    obj.phaseDistributionVisible =
                        this.portfolioTilesValues[i].isToggled;
                    obj.phaseDistributionVisibleOrder = count;
                    count += 100;
                    break;

                case 'MilestonePerformances':
                    obj.milestonePerformanceVisible =
                        this.portfolioTilesValues[i].isToggled;
                    obj.milestonePerformanceVisibleOrder = count;
                    count += 100;
                    break;
                case 'Budget':
                    obj.budgetTileVisible =
                        this.portfolioTilesValues[i].isToggled;
                    obj.budgetTileVisibleOrder = count;
                    count += 100;
                    break;
            }
        }

        this.apiService.addPortfolioCenterTilePreferences(obj).then((res) => {
            this.initializePrefrencesTile();
        });
    }

    rearrangeTable(json) {
        const portfolioCenterTilesArr = [
            {
                name: 'PhaseDistribution',
                label: 'Phase Distribution',
                isToggled: json.phaseDistributionVisible,
                order: json.phaseDistributionVisibleOrder,
            },
            {
                name: 'MilestonePerformances',
                label: 'Milestone Performances',
                isToggled: json.milestonePerformanceVisible,
                order: json.milestonePerformanceVisibleOrder,
            },
            {
                name: 'Budget',
                label: 'Budget',
                isToggled: json.budgetTileVisible,
                order: json.budgetTileVisibleOrder,
            },
        ];

        const sortOrder = portfolioCenterTilesArr.sort((a, b) => {
            return a.order - b.order;
        });

        this.portfolioTilesValues = sortOrder;
        this.populatePortfolioTiles(this.portfolioTilesValues);
    }
}
