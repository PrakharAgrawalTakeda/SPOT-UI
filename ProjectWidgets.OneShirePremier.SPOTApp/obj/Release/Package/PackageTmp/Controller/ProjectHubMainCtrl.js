/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('ProjectHubMainCtrl', ProjectHubMainCtrl)
ProjectHubMainCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function ProjectHubMainCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    var permissionbulk = [];
    var IsBaseline = false;
    var gridDataSaved = false;
    var gridDataDelete = false;
    var teamClose = false;
    var riskIncludeReportValid = true;
    var askNeedIncludeReportValid = true;
    var milestoneIncludeReportValid = true;
    var bindRiskIssue = true;
    var bindAskNeed = true;
    var bindSchedule = true;
    var saveAskNeedData = false;
    var saveScheduleData = false;
    var saveRiskData = false;
    var gridDataKeySuccess = [];  
    var performanceStatusBulk = [];
    var primaryKpiGrid = [];
    var projectTeam = [];
    var askNeedUsers = [];
    var riskIssueUsers = [];
    var OriginalRiskObj = {};
    var OriginalAskObj = {};
    var OriginalScheduleObj = {};
    var OriginalProjectTeam = {};
    var OriginalOverallStatus = {};
    var OriginalPhase = {};
    var OriginalCapitalPhase = {};
    var OriginalState = {};
    var OriginalOEPhase = {};
    var associatedProjectFirstLoad = 1;
    var OriginalProjectAssociation = [];
    var saveChildAssociationData = 0;
    var windowAssociatedOpen = 0;

    vm.init = init;
    vm.ShowProjectDocument = ShowProjectDocument;
    vm.BudgetData = BudgetData;
    vm.ProgramHubData = ProgramHubData;
    vm.ProjectHubData = ProjectHubData;
    vm.myvalue = false;
    vm.qualityGridVisible = false;
    vm.riskIssueClosed = false;
    vm.askNeedClosed = false;
    vm.scheduleClosed = false;
    vm.showProjectHub = true;
    vm.showProgramHub = true;
    vm.Edit = false;
    vm.showTeamPermission = false;
    vm.ShowBaseline = false;
    vm.showPhase = false;
    vm.showDeliverables = true;
    vm.showRiskIncludeReport = true;
    vm.showAskNeedIncludeReport = true;
    vm.showMilestoneIncludeReport = true;
    vm.showOverall = false;
    vm.showRiskIssue = false;
    vm.showAskNeed = false;
    vm.showMilestone = false;
    vm.showBudget = false;
    vm.showDocument = false;
    vm.showTeam = false;
    vm.showProjectType = false;
    vm.completeDateError = false;
    vm.finishDateError = false;
    vm.IsAddChildProgram = true;
    vm.IsMilestoneLabel = false;

    //String
    vm.ProjectName = "";
    vm.ProblemID = "";
    vm.IsActive = "";
    vm.todayDate;
    vm.phasePagepath = phasePagepath;
    vm.addNewRolePagepath = addNewRolePagepath;
    vm.projectDetailsAndFormsPagepath = projectDetailsAndFormsPagepath;
    vm.ExecuteStyle = "";
    vm.IntiateStyle = "";
    vm.DefineStyle = "";
    vm.PlanStyle = "";
    vm.CloseStyle = "";
    vm.TrackStyle = "";
    vm.RiskIssueSPOTLightInd = "";
    vm.AskNeedSPOTLightInd = "";
    vm.ScheduleSPOTLightInd = "";
    vm.OverallStatusSPOTLightInd = "";
    vm.MileStoneIndicator = "";
    vm.RiskIssueIndicator = "";
    vm.AskNeedIndicator = "";
    vm.OverallStatusIndicator = "";
    vm.OverallStatusColor = "Grey";
    vm.ProjectBaselineDate;
    vm.ProjectBaselineCount = 0;
    vm.dateFormatlabel = dateLabel;
    vm.dateErrorMsg = InValidDateFormat;
    // Objects
    vm.overAllData = {};
    vm.OverAllDataMain = {};
    vm.dstempProjectClassification = [];
    vm.projectTypeSelector = [];
    //Object for single edit and insert
    vm.riskIssue = {};
    vm.askNeed = {};
    vm.schedule = {};
    vm.projectTeam = {};

    vm.projectHubStatus = {};
    // Array
    vm.dsPrimaryProduct = [];
    vm.dsOwner = [];
    vm.dsExecutionScope = [];
    vm.dsProjectClassification = [];
    vm.dsResList = [];
    vm.dsFunctionOption = [];
    vm.dsBusinessProcessesOption = [];
    vm.dsManufacturingProcessesOption = [];
    vm.dsEquipmentOption = [];
    vm.dsPeopleOption = [];
    vm.dsTechnologyOption = [];
    vm.dsPrograms = [];
    //vm.ProjectTypeSelectorListItems = [];
    vm.overAllStatus = []
    vm.projectPhase = [];
    vm.projectState = [];
    vm.teamRole = [];
    vm.AskNeedusersList = [];
    vm.capitalPhaseList = [];
    vm.capitalPhase = [];
    vm.OEPhase = [];
    vm.SelectedprojectPhase = {};
    vm.SelectedprojectState = {};
    vm.SelectedprojectCapitalPhase = {};
    vm.SelectedprojectOEPhase = {};
    //Project Hub Array
    vm.riskIssueType = [];
    // vm.siteUsers = [];
    vm.probability = [];
    vm.dsFuntionalGroup = [];
    vm.PostImpact = [];
    vm.PostProbability = []
    vm.Impact = [];
    vm.askNeedData = [];
    vm.deletedAssociationData = [];
    vm.deletedPerformanceData = [];
    vm.insertUpdateDeletePerformance = [];
    vm.riskIssueTitle = "";
    vm.askNeedTitle = "";
    vm.scheduleTitle = "";
    // Functions
    vm.getDataForTeam = getDataForTeam;
    vm.getEditPhaseData = getEditPhaseData;
    // vm.closeWindow = closeWindow;
    vm.SetDefaultOverallStatus = SetDefaultOverallStatus
    // vm.GetOptionData = GetOptionData;
    vm.CreateRiskIssueData = CreateRiskIssueData;
    //vm.RiskIssueBulkEdit = RiskIssueBulkEdit;
    vm.CreateAskNeedData = CreateAskNeedData;
    //vm.AskNeedBulkEdit = AskNeedBulkEdit;
    vm.CreateScheduleData = CreateScheduleData;
    // vm.ScheduleBulkEdit = ScheduleBulkEdit;
    vm.CreateOverAllData = CreateOverAllData;
    vm.CreateProjectPhaseStateData = CreateProjectPhaseStateData;
    vm.CreateProjectTeam = CreateProjectTeam;
    vm.ProjectTeamBulkEdit = ProjectTeamBulkEdit;

    vm.getCapitalPhase = getCapitalPhase;
    vm.ShowPermission = ShowPermission;
    vm.ProjectPhaseStateClose = ProjectPhaseStateClose;
    vm.AskNeedIncludeInReport = AskNeedIncludeInReport;
    vm.RiskIssueIncludeInReport = RiskIssueIncludeInReport;
    vm.MilestoneIncludeInReport = MilestoneIncludeInReport;
    vm.buildNo = buildNo;
    vm.releaseDate = releaseDate;
    vm.OpenNewRoleDialog = OpenNewRoleDialog;
    //Associated Projects functions
    vm.getAssociatedProjects = getAssociatedProjects;
    vm.getChildProject = getChildProject;
    vm.addProjectToChildGrid = addProjectToChildGrid;
    vm.directChildProjectlist = [];
    vm.updateParentProject = updateParentProject;
    vm.ExportToExcel = ExportToExcel;
    vm.insertReports = insertReports;
    vm.getParentProject = getParentProject;
    vm.updateCurrentParentProject = updateCurrentParentProject;
    vm.AddNewRowPerfor = AddNewRowPerfor;
    vm.GetDataQuality = GetDataQuality;

    var gridDataProjectPhase = [];
    var gridDataProjectState = [];
    var gridDataTeam = [];
    var resourcesBulk = [];
    var rolesBulk = [];
    var permissionbulk = [];
    var usergroups = [];
    var saveData = 0;
    var countDashoardRiskIssue = 0;
    var countDashoardAskNeed = 0;
    var countDashoardMilestone = 0;
    var countDashoardRiskIssueform = 0;
    var countDashoardAskNeedform = 0;
    var countDashoardMilestoneform = 0;
    var lookup = issueRiskImpactPost + "," + riskIssueProbabilityPost +","+riskIssueProbability + "," + riskIssueImpact + "," + funtionalGroup + "," + riskIssueType + "," + overAllStatus + "," + projectPhase + "," + projectStatus + "," + teamPermission + "," + performanceStatus + "," + topsPrimaryKpi;
    var className = "ProjectHubMain";
    //var isConfidentialProject;
    var originalParentProject = {};
    $rootScope.$on("RefreshForDataQuality", function (event) {
        GetProjectHubStatusForDataQuality();
    });
    $rootScope.$on("UpdateProjectNameHub", function (event, ProjectName) {
        vm.ProjectName = ProjectName;
        GetProjectHubStatus();
        // SeletedProjectName = ProjectName;
    });
    function ShowProjectDocument() {
        trackEvent("Project Hub project documents tab");
        //aisdk.trackEvent({ name: "Project Hub project documents tab" });
        $rootScope.$emit("GetProjectDocument", isConfidentialProject);
    };
    function BudgetData() {
        trackEvent("Project Hub budget tab");
        //aisdk.trackEvent({ name: "Project Hub budget tab" });
        $rootScope.$emit("getBudgetData");
    };

    function ProgramHubData() {
        GetProjectHubStatus();
        $rootScope.$emit("getProgramHubData");
    };
    function ProjectHubData() {
        GetProjectHubStatus();
        $rootScope.$emit("getProjectHubData");
    };

    $rootScope.$on("UpdateAssociatedProject", function (event) {
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

        var tabIndx = tabStrip.select().index();
        if (tabIndx == 2)
            getAssociatedProjects();
    });



    $rootScope.$on("UpdateOverallStatus", function (event, overAllData) {
        angular.copy(overAllData, vm.OverAllDataMain);
        vm.OverallStatusColor = overAllData.OverallStatus;
        vm.OverallStatusIndicator = "";
        vm.OverallStatusSPOTLightInd = overAllData.OverallStatusIndicator == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                            (overAllData.OverallStatusIndicator == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                (overAllData.OverallStatusIndicator == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                    (overAllData.OverallStatusIndicator == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                        (overAllData.OverallStatusIndicator == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                            (overAllData.OverallStatusIndicator == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                                (overAllData.OverallStatusIndicator == 'YellowDown' ? "k-icon k-i-arrow-down arrow arrow-yellow" :
                                                    ""))))));
        if (vm.OverallStatusSPOTLightInd == "") {
            vm.OverallStatusIndicator = overAllData.OverallStatus;
        }
        $scope.$digest();
    });
    $rootScope.$on("UpdateHubStatus", function (event) {
        GetProjectHubStatus();
    });
    //Refresh Schedule data
    $rootScope.$on("UpdateHubSchedule", function (event) {
        if (IsProgram) {
            $rootScope.$emit("getProgramHubScheduleData");
        }
        else {
            $rootScope.$emit("getProjectHubScheduleData");
        }
    });
    //Refresh Project Hub when any update made on project charter
    $rootScope.$on("ReloadProjectHub", function (event) {

        $.when(GETPostService.postDataWCFAsync("getHubSetting", SeletedProjectId))
       .then(function (resHubSettings) {
           try {
               var dsHubSettings = JSON.parse(resHubSettings.getHubSettingResult);
               angular.forEach(dsHubSettings, function (item, index) {
                   switch (item.LookUpID) {
                       case overAllHubStatus:
                           vm.showOverall = item.HubValue;
                           break;
                       case riskIssueOption:
                           vm.showRiskIssue = item.HubValue;
                           break;
                       case milestoneOption:
                           vm.showMilestone = item.HubValue;
                           break;
                       case askNeedOption:
                           vm.showAskNeed = item.HubValue;
                           break;
                       case budgetOption:
                           vm.showBudget = item.HubValue;
                           break;
                       case teamOption:
                           vm.showTeam = item.HubValue;
                           break;
                       case documentOption:
                           vm.showDocument = item.HubValue;
                           break;
                   }
               });
               getDataForTeam();
             //  vm.ProjectName = vm.projectHubStatus.ProjectName;
               vm.riskIssueTitle = vm.ProblemID + " - " + vm.ProjectName;
               vm.askNeedTitle = vm.ProblemID + " - " + vm.ProjectName;
               vm.scheduleTitle = vm.ProblemID + " - " + vm.ProjectName;
               if (IsProgram) {
                   $rootScope.$emit("getProgramHubData");
               }
               else {
                   $rootScope.$emit("getProjectHubData");
               }

               $scope.$digest();
           }
           catch (err) {
               var dataToSend = {
                   "method": "ReloadProjectHub", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
               };
               $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                     .then(function (response) { alert(errormessage) });
           }
       });

    });
    var dirtyField = function (data, fieldName) {
        if (data.dirty && data.dirtyFields[fieldName]) {
            return "<span class='k-dirty'></span>";
        }
        else {
            return "";
        }
    };
    function GetDataQuality() {
        //alert("quality");
        //trackEvent("Portfolio center budget/spend tile forecast bulk edit tab - FxRates button");
        
        var myWindow = $("#dialogDataQuality");
        //myWindow.kendoWindow({
        //    content: "DataQuality.html?v=" + buildNo,
        //    modal: true,
        //});
        
   
        $.when(GETPostService.postDataWCFAsync("getProjectDataCorrectness",SeletedProjectId)).then(function (response) {
            myWindow.data("kendoWindow").open();
            getQualityData(response);
        });
    }
    function getQualityData(response) {
        var dsCurr = JSON.parse(response.getProjectDataCorrectnessResult);
                try {
                    //var dsCurr = JSON.parse(resQuality.getGetAllCurrencyFxRateResult);
                   // var dsCurr = [{ "Phase": "Define", "Requirement": "Quality Status update", "HitMiss": "N/A", "DetailedDescription": "description" }, { "Phase": "Define", "Requirement": "Quality Status update 2", "HitMiss": "Complete", "DetailedDescription": "description2" }, { "Phase": "Execute", "Requirement": "Quality Status update3", "HitMiss": "Incomplete", "DetailedDescription": "description3" }];
                    var col = [{
                        field: "Phase",
                        title: "Phase",
                        headerAttributes: {
                            "class": "wrap-header"
                        },
                    }, {
                        field: "Measure",
                        title: "Requirement",
                    }, {
                        field: "HitMiss",
                            title: "Hit/Miss",
                            template: function (data) {
                                var value = "";
                                if (data.HitMiss == "Complete") {
                                    value = "<span class='k-icon k-i-check-circle arrow-green'></span>" + data.HitMiss;
                                }
                                else if (data.HitMiss == "Incomplete") {
                                    value = "<i class='exclamationQuality'>!</i>" + data.HitMiss;
                                }
                                else
                                    value =  data.HitMiss;
                                return value;
                            }
                    },
                    {
                        field: "DetailedDescription",
                        title: "Detailed Description",
                    }
                        //template: "#= (kendo.toString(FixRate, 'n4').trim()) #",
                    ];
                    var dataSource = new kendo.data.DataSource({
                        //pageSize: 10,
                        data: dsCurr,

                        schema: {
                            model: {
                                fields: {
                                    Phase: {
                                        editable: false, nullable: true
                                    },
                                    Measure: {
                                        type: "string", editable: false
                                    },
                                    HitMiss: {
                                        type: "string", editable: false
                                },
                                    DetailedDescription: { type: "string", editable: false }
                                }
                                 
                                }
                            }
                        });

                    $("#GridDataQuality").kendoGrid({
                        dataSource: dataSource,
                        // groupable: false,
                        columns: col,
                        dataBound: function () {

                            var grid = $("#GridDataQuality").data("kendoGrid");
                            grid.tbody.find('>tr').each(
                                function () {
                                    var dataItem = grid.dataItem(this);
                                    

                                    if (dataItem.BGColor == "Grey") {
                                        $(this).css('color', 'Grey');
                                    }
                                    else
                                        $(this).css('color', 'Black');
                                    //if (dataItem.HitMiss == "Complete") {    
                                    //    var cell = $("td:nth-child(3)", $(this));
                                    //    cell.addClass("k-icon k-i-success");
                                    //}
                                    //else if (dataItem.HitMiss == "Incomplete") {   
                                    //    var cell1 = $("td:nth-child(3)", $(this));
                                    //    cell1.addClass("k-icon k-i-warning");
                                    //}
                                });
                        },
                    });
                   // deferred.resolve("success");
                    //prodCombo.setDataSource(dsProducts);
                    $scope.$digest();
                }
                catch (err) {
                    var dataToSend = {
                        "method": "getQualityData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    //$.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                    //    .then(function (response) { alert(errormessage) });
                    hideLoading();
                }
           // });
       // return deferred.promise;

    }
    function AddNewRowPerfor() {       
        var gridName = 'OverallStatusPerformanceBulkEdit';
        var gridNew = $("#" + gridName).data("kendoGrid");

        var sorting = gridNew.dataSource.sort();
        if (sorting) {
            gridNew.dataSource.sort(null);
        }
        gridNew.addRow();
    };
    function prepareDataForProject() {
        
        vm.deletedPerformanceData = [];
        try {
            SeletedProjectId = getParameterByName(window.location.search, "ProblemID");
            if (SeletedProjectId == "" || SeletedProjectId == null) {
                window.location.href = portfolioCenterpath;
            }
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.getDataWCFAsync("getProjectHubStatus/" + SeletedProjectId),
            GETPostService.getDataWCFAsync("getUserPermissionByProjectUserId/" + currentUserId + "/" + SeletedProjectId),
            GETPostService.postDataWCFAsync("getUserPermissionById", currentUserId), GETPostService.postDataWCFAsync("getProjectBaseline", SeletedProjectId),
            GETPostService.postDataWCFAsync("getHubSetting", SeletedProjectId), GETPostService.postDataWCFAsync("getUserGroupById", currentUserId),
                GETPostService.getDataWCFAsync("getOverAllStatus/" + SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId),
                GETPostService.postDataWCFAsync("getLookupDataPerformancestatus", performanceStatus)
            )
                .then(function (resLookup, resStatus, userpermission, userGlobalPermission, projectbaseline, resHubSettings, usergroup, resOverallStatus,resKeySuccess,resPerformanceStatus) {
                    try {                        
                        var checkUser = JSON.parse(userpermission.getUserPermissionByProjectUserIdResult);
                        if (checkUser.length > 0) {
                            if (checkUser[0].canRead) {
                                if (checkUser[0].canEdit) {
                                    vm.Edit = true;
                                }
                                else { vm.Edit = false; }
                            }
                            else {
                                window.location.href = portfolioCenterpath;
                            }
                            SeletedProjectName = checkUser[0].ProblemTitle;
                        }
                        else {
                            window.location.href = portfolioCenterpath;
                        }
                        vm.ProjectName = SeletedProjectName;
                        var permission = JSON.parse(userGlobalPermission.getUserPermissionByIdResult)
                        if (permission != null) {
                            var permissionlist = permission.filter(function (entry) {
                                return entry.Permission == updateBaselinePerm;
                            });
                            if (permissionlist.length > 0) {
                                vm.ShowBaseline = true;
                            }
                            permissionlist = permission.filter(function (entry) {
                                return entry.Permission == editPhase;
                            });
                            if (permissionlist.length > 0) {
                                vm.showPhase = true;
                            }
                        }
                        //var ProjectBaselineDetail = JSON.parse(projectbaseline.getProjectBaselineResult);
                        //if (ProjectBaselineDetail.length > 0) {
                        //    vm.ProjectBaselineCount = ProjectBaselineDetail[0].BaselineCount;
                        //    vm.ProjectBaselineDate = kendo.toString(kendo.parseDate(ProjectBaselineDetail[0].ModifiedDate), 'dd-MMM-yy');

                        //}
                        gridDataKeySuccess = JSON.parse(resKeySuccess.getProjectCharterKeySuccessResult);
                        var dsHubSettings = JSON.parse(resHubSettings.getHubSettingResult);
                        angular.forEach(dsHubSettings, function (item, index) {
                            switch (item.LookUpID) {
                                case overAllHubStatus:
                                    vm.showOverall = item.HubValue;
                                    break;
                                case riskIssueOption:
                                    vm.showRiskIssue = item.HubValue;
                                    break;
                                case milestoneOption:
                                    vm.showMilestone = item.HubValue;
                                    break;
                                case askNeedOption:
                                    vm.showAskNeed = item.HubValue;
                                    break;
                                case budgetOption:
                                    vm.showBudget = item.HubValue;
                                    break;
                                case teamOption:
                                    vm.showTeam = item.HubValue;
                                    break;
                                case documentOption:
                                    vm.showDocument = item.HubValue;
                                    break;
                            }
                        });

                        vm.dsFuntionalGroup = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == funtionalGroup;
                        });


                        vm.probability = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == riskIssueProbability;
                        });

                        vm.PostImpact = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == issueRiskImpactPost;
                        });

                        vm.PostProbability = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == riskIssueProbabilityPost;
                        });

                        vm.Impact = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == riskIssueImpact;
                        });

                        vm.riskIssueType = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == riskIssueType;
                        });


                        vm.projectPhase = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == projectPhase;
                        });
                        vm.projectPhase = $filter('orderBy')(vm.projectPhase, ' LookUpMemberOrder');

                        vm.projectState = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === projectStatus;
                        });
                        vm.projectState = $filter('orderBy')(vm.projectState, 'LookUpMemberOrder');

                        vm.teamRole = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == funtionalGroup;
                        });

                        vm.dsPrimaryKPI = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == topsPrimaryKpi;
                        }), "LookUpMemberOrder");
                        for (var i = 0; i < vm.dsPrimaryKPI.length; i++) {
                            var item5 = {
                                "text": vm.dsPrimaryKPI[i].LookUpMemberName, "value": vm.dsPrimaryKPI[i].LookUpMemberID
                            }
                            primaryKpiGrid.push(item5);
                        }
                        vm.performStatus = JSON.parse(resPerformanceStatus.getLookupDataPerformancestatusResult);

                        for (var p = 0; p < vm.performStatus.length; p++) {
                            var newItem = {
                                "text": vm.performStatus[p].LookUpMemberName, "value": vm.performStatus[p].LookUpMemberID
                            };
                            performanceStatusBulk.push(newItem);
                        }

                        for (var i = 0; i < vm.teamRole.length; i++) {
                            var isDeleted = false;
                            if (vm.teamRole[i].LookUpMemberID == projectmanager || vm.teamRole[i].LookUpMemberID == projectSponsor)
                            { isDeleted = true; }
                            var item = {
                                "text": vm.teamRole[i].LookUpMemberName, "value": vm.teamRole[i].LookUpMemberID, "isDisabled": isDeleted
                            }
                            rolesBulk.push(item);
                        }
                        vm.teamRole = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == funtionalGroup && entry.LookUpMemberID != projectmanager && entry.LookUpMemberID != projectSponsor;
                        });

                        /*Project Hub */
                        vm.todayDate = kendo.toString(kendo.parseDate(new Date()), 'MM/dd/yyyy');
                        vm.overAllStatus = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === overAllStatus
                        });
                        var overAllDatacopy = JSON.parse(resOverallStatus.getOverAllStatusResult);
                        vm.overAllData = overAllDatacopy[0];
                        if (vm.overAllData != null || vm.overAllData != undefined) {
                            vm.OverallStatusColor = vm.overAllData.OverallStatus;
                            vm.OverallStatusSPOTLightInd = vm.overAllData.OverallStatusIndicator == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                            (vm.overAllData.OverallStatusIndicator == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                (vm.overAllData.OverallStatusIndicator == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                    (vm.overAllData.OverallStatusIndicator == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                        (vm.overAllData.OverallStatusIndicator == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                            (vm.overAllData.OverallStatusIndicator == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                                (vm.overAllData.OverallStatusIndicator == 'YellowDown' ? "k-icon k-i-arrow-down arrow arrow-yellow" :
                                                    ""))))));
                            if (vm.OverallStatusSPOTLightInd == "") {
                                vm.OverallStatusIndicator = vm.overAllData.OverallStatus;
                            }
                            vm.overAllData.StatusLastUpdated = kendo.toString(kendo.parseDate(vm.overAllData.StatusLastUpdated), 'dd-MMM-yy');
                            angular.copy(vm.overAllData, vm.OverAllDataMain);
                        }
                        else { vm.OverallStatusIndicator = "Grey"; }

                        var projecthubStatus = JSON.parse(resStatus.getProjectHubStatusResult);
                        vm.projectHubStatus = projecthubStatus[0];
                        vm.ProjectName = vm.projectHubStatus.ProjectName;
                       
                        if (vm.projectHubStatus.IsArchived) {
                            vm.IsActive = "arrow-grey-dark";
                        }
                        else { vm.IsActive = ""; }
                        SelectedProblemId = vm.projectHubStatus.ProblemID;
                        vm.ProblemID = vm.projectHubStatus.ProblemID;
                        vm.riskIssueTitle = vm.ProblemID + " - " + vm.ProjectName;
                        vm.askNeedTitle = vm.ProblemID + " - " + vm.ProjectName;
                        vm.scheduleTitle = vm.ProblemID + " - " + vm.ProjectName;
                        isConfidentialProject = vm.projectHubStatus.IsConfidential;
                        SeletedProjectName = vm.ProjectName;
                        ProjectSiteUrl = vm.projectHubStatus.ProjectSiteURL;
                        IsProgram = vm.projectHubStatus.IsProgram;
                        if (vm.projectHubStatus.ProjectType != null && vm.projectHubStatus.ProjectType == simpleProjectType) {
                            var checkUsergroup = JSON.parse(usergroup.getUserGroupByIdResult);
                            if (checkUsergroup.length > 0) {
                                var getmanager = checkUsergroup.filter(function (entry) {
                                    return entry.LookUpID == spotProjectManagerId
                                });
                                if (getmanager.length > 0) {
                                    if (vm.projectHubStatus.IsConfidential) {
                                        if (vm.Edit) {
                                            vm.ShowBaseline = true;
                                        }
                                    }
                                    else {
                                        vm.ShowBaseline = true;
                                    }
                                }
                            }
                        }
                        //Set ReadOnly as default
                        vm.teamPermissions = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return (entry.LookUpName === teamPermission && entry.LookUpMemberName != 'None')
                        });
                        for (var i = 0; i < vm.teamPermissions.length; i++) {
                            var item = {
                                "text": vm.teamPermissions[i].LookUpMemberName, "value": vm.teamPermissions[i].LookUpMemberID
                            }
                            permissionbulk.push(item);
                        }
                        //}
                        if (vm.projectHubStatus != null || vm.projectHubStatus != undefined) {
                            SetProjectPhase();
                            SetProjectSPOTLightIndicator();                          
                        }
                        InitKendoGridTeam();
                        ProjectTeamBulkEdit();
                        InitkGridOverAllPerformanceBulkEdit();
                        DialogCloseBinding();
                        if (IsProgram) {
                            $rootScope.$emit("getProgramHubData");
                            vm.showProgramHub = true;
                            vm.showProjectHub = false;
                            var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
                            tabStrip.select(1);
                        }
                        else {
                            $rootScope.$emit("getProjectHubData");
                            vm.showProgramHub = false;
                            vm.showProjectHub = true;
                            var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
                            tabStrip.select(0);
                        }
                        $scope.$digest();
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "prepareDataForProjectHub", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) { alert(errormessage) });
                        hideLoading();
                    }
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "prepareDataForProjectHub", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }

        ;
    };
    //Single Edit form binding for RiskIssue called from Project and Program Hub
    $rootScope.$on("RiskIssueEdit", function (event, data, countDashoardRiskIssue) {
        try {
            if (bindRiskIssue) {
                bindRiskIssueControl();
            }
            riskIncludeReportValid = true;
            angular.copy(data, vm.riskIssue);
            angular.copy(data, OriginalRiskObj);
            countDashoardRiskIssueform = countDashoardRiskIssue.length;
            if (vm.riskIssue.RiskIssueTypeID != null && vm.riskIssue.RiskIssueTypeID != "") {
                var riskIssueTypelist = $("#type").data("kendoComboBox");
                riskIssueTypelist.value(vm.riskIssue.RiskIssueTypeID);
                riskIssueTypelist.refresh();
            }
            if (vm.riskIssue.FunctionGroupID != null && vm.riskIssue.FunctionGroupID != "") {
                var functiongrouplist = $("#functiongroup").data("kendoComboBox");
                functiongrouplist.value(vm.riskIssue.FunctionGroupID);
                functiongrouplist.refresh();
            }
            if (vm.riskIssue.ProbabilityID != null && vm.riskIssue.ProbabilityID != "") {
                var probabilitylist = $("#probability").data("kendoComboBox");
                probabilitylist.value(vm.riskIssue.ProbabilityID);
                probabilitylist.refresh();
            }

            if (vm.riskIssue.ImpactID != null && vm.riskIssue.ImpactID != "") {
                var impactlist = $("#impact").data("kendoComboBox");
                impactlist.value(vm.riskIssue.ImpactID);
                impactlist.refresh();
            }
            
            if (vm.riskIssue.PostProbabilityID != null && vm.riskIssue.PostProbabilityID != "") {
                var probabilitylistPost = $("#postProbability").data("kendoComboBox");
                probabilitylistPost.value(vm.riskIssue.PostProbabilityID);
                probabilitylistPost.refresh();
            }
            if (vm.riskIssue.PostImpactID != null && vm.riskIssue.PostImpactID != "") {
                var impactlistPost = $("#postImpact").data("kendoComboBox");
                impactlistPost.value(vm.riskIssue.PostImpactID);
                impactlistPost.refresh();
            }

            if (vm.riskIssue.OwnerID != null && vm.riskIssue.OwnerID != "") {
                //var selecteduser = vm.siteUsers.filter(function (entry) {
                //    return entry.UserADId == vm.riskIssue.OwnerID.UserADId;
                //});
                //vm.riskIssue.OwnerID = selecteduser[0];
                var pplObj = {};
                var siteUsers = [];
                pplObj.UserADId = vm.riskIssue.OwnerID;
                pplObj.UserDisplayName = vm.riskIssue.OwnerName;
                pplObj.UserCountry = vm.riskIssue.UserCountry != null ? vm.riskIssue.UserCountry : "",
                pplObj.UserImageUrl = vm.riskIssue.UserImageUrl,
                pplObj.UserEmailAddress = vm.riskIssue.UserEmailAddress != null ? vm.riskIssue.UserEmailAddress : "",
                pplObj.UserDepartment = vm.riskIssue.UserDepartment != null ? vm.riskIssue.UserDepartment : ""
                siteUsers.push(pplObj);
                var ownerlist = $("#riskowner").data("kendoComboBox");
                ownerlist.value(vm.riskIssue.OwnerID);
                ownerlist.setDataSource(siteUsers);
                ownerlist.refresh();
            }
            else {
                var siteUsers = [];
                var ownerlist = $("#riskowner").data("kendoComboBox");
                ownerlist.setDataSource(siteUsers);
                ownerlist.value([]);
                ownerlist.refresh();
            }
            if (vm.riskIssue.link != undefined) {
                if (vm.riskIssue.link != null && vm.riskIssue.link == 1) {
                    vm.showRiskIncludeReport = false;
                }
            }
            vm.riskIssueTitle = vm.riskIssue.ProblemID + " - " + vm.riskIssue.ProjectName;
            $scope.$digest();
            var myWindow = $("#dialogRiskIssue");
            myWindow.data("kendoWindow").open();
        }
        catch (err) {
            var dataToSend = {
                "method": "RiskIssueEdit", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }
    });
    //Single Edit form binding for Milestone called from Project and Program Hub
    $rootScope.$on("ScheduleEdit", function (event, data, countDashoardMilestone) {
        try {
            
            if (bindSchedule) {
                bindChangeDatePicker("plannedFinishDate");
                bindChangeDatePicker("completionDate");
                bindChangeComboBox("functionowner");
                bindSchedule = false;
            }
            milestoneIncludeReportValid = true;
            angular.copy(data, vm.schedule);
            angular.copy(data, OriginalScheduleObj);
            countDashoardMilestoneform = countDashoardMilestone.length;
            if (vm.schedule.FunctionGroupID != null && vm.schedule.FunctionGroupID != "") {
                var functionOwnerIDlist = $("#functionowner").data("kendoComboBox");
                functionOwnerIDlist.value(vm.schedule.FunctionGroupID);
                functionOwnerIDlist.refresh();
            }
            if (vm.schedule.link != undefined) {
                if (vm.schedule.link != null && vm.schedule.link == 1) {
                    vm.showMilestoneIncludeReport = false;
                }
            }
            if (vm.schedule.MilestoneType == 1) {
                vm.IsMilestoneLabel = true;
                vm.MilestoneLabel = MilestoneStartPrefix;
                vm.schedule.Milestone = vm.schedule.Milestone.replace(MilestoneStartPrefix, "");
            }
            else if (vm.schedule.MilestoneType == 2) {
                vm.IsMilestoneLabel = true;
                vm.MilestoneLabel = MilestoneEndPrefix;
                vm.schedule.Milestone = vm.schedule.Milestone.replace(MilestoneEndPrefix, "");
            }
            else
                vm.IsMilestoneLabel = false;
            vm.scheduleTitle = vm.schedule.ProblemID + " - " + vm.schedule.ProjectName;
            var myWindow = $("#dialogMilestone");
            myWindow.data("kendoWindow").open();
            $scope.$digest();
        }
        catch (err) {
            var dataToSend = {
                "method": "ScheduleEdit", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }
    });
    //Single Edit form binding for AskNeed called from Project and Program Hub
    $rootScope.$on("AskNeedEdit", function (event, data, countDashoardAskNeed) {
        try {
            if (bindAskNeed) {
                bindAskNeedControl();
            }
            // get the data bound to the current table row
            angular.copy(data, vm.askNeed);
            angular.copy(data, OriginalAskObj);
            countDashoardAskNeedform = countDashoardAskNeed.length;
            askNeedIncludeReportValid = true;
            if (vm.askNeed.NeedFromID != null && vm.askNeed.NeedFromID != "") {
                var pplObj = {};
                var siteUsers = [];
                pplObj.UserADId = vm.askNeed.NeedFromID;
                pplObj.UserDisplayName = vm.askNeed.NeedFromName;
                pplObj.UserCountry = vm.askNeed.UserCountry != null ? vm.askNeed.UserCountry : "",
                pplObj.UserImageUrl = vm.askNeed.UserImageUrl,
                pplObj.UserEmailAddress = vm.askNeed.UserEmailAddress != null ? vm.askNeed.UserEmailAddress : "",
                pplObj.UserDepartment = vm.askNeed.UserDepartment != null ? vm.askNeed.UserDepartment : ""
                siteUsers.push(pplObj);
                var ownerlist = $("#needfromUser").data("kendoComboBox");
                ownerlist.value(vm.askNeed.NeedFromID);
                ownerlist.setDataSource(siteUsers);
                ownerlist.refresh();
            }
            else {
                var siteUsers = [];
                var ownerlist = $("#needfromUser").data("kendoComboBox");
                ownerlist.setDataSource(siteUsers);
                ownerlist.value([]);
                ownerlist.refresh();
            }
            if (vm.askNeed.link != undefined) {
                if (vm.askNeed.link != null && vm.askNeed.link == 1) {
                    vm.showAskNeedIncludeReport = false;
                }
            }
            vm.askNeedTitle = vm.askNeed.ProblemID + " - " + vm.askNeed.ProjectName;
            var myWindow = $("#dialogAskNeed");
            myWindow.data("kendoWindow").open();
            $scope.$digest();
        }
        catch (err) {
            var dataToSend = {
                "method": "AskNeedEdit", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }
    });
    $rootScope.$on("openRiskIssueDialog", function (event, countDashoardRiskIssue) {
        // function openRiskIssueDialog() {
        try {
            
            OriginalRiskObj = {};
            if (bindRiskIssue) {
                bindRiskIssueControl();
            }
            else {
                var siteUsers = [];
                var ownerlist = $("#riskowner").data("kendoComboBox");
                ownerlist.setDataSource(siteUsers);
                ownerlist.value([]);
            }
            riskIncludeReportValid = true;
            countDashoardRiskIssueform = countDashoardRiskIssue.length;
            angular.copy(vm.riskIssue, OriginalRiskObj);
            var myWindow = $("#dialogRiskIssue");
            myWindow.data("kendoWindow").open();
        }
        catch (err) {
            var dataToSend = {
                "method": "openRiskIssueDialog", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }
    });
    $rootScope.$on("overallStatusProjectCharter", function (event) {
        try {
            $.when(GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId))
                .then(function (resKeySuccess) {
                    gridDataKeySuccess = JSON.parse(resKeySuccess.getProjectCharterKeySuccessResult);;
                    $('#OverallStatusPerformanceBulkEdit').data('kendoGrid').dataSource.read();      

                    });
               
        }
        catch (err) {
            var dataToSend = {
                "method": "overallStatusProjectCharter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    });
    $rootScope.$on("openOverallStatusDialog", function (event, data, performanceBulkgridData) {
        try {
            gridDataKeySuccess = performanceBulkgridData;
            $('#OverallStatusPerformanceBulkEdit').data('kendoGrid').dataSource.read();
            OriginalOverallStatus = {};
            angular.copy(data, vm.overAllData);
            angular.copy(data, OriginalOverallStatus);
            bindChangeDatePicker("statusDate");
            bindChangeComboBox("overallstatus");
            SetDefaultOverallStatus();
            var myWindow = $("#dialogOverallStatus");
            myWindow.data("kendoWindow").open();
        }
        catch (err) {
            var dataToSend = {
                "method": "openOverallStatusDialog", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }
    });

    $rootScope.$on("openAskNeedDialog", function (event, countDashoardAskNeed) {
        try {
            OriginalAskObj = {};
            if (bindAskNeed) {
                bindAskNeedControl();
            }
            else {
                var siteUsers = [];
                var ownerlist = $("#needfromUser").data("kendoComboBox");
                ownerlist.setDataSource(siteUsers);
                ownerlist.value([]);
                ownerlist.refresh();
            }
            askNeedIncludeReportValid = true;
            angular.copy(vm.askNeed, OriginalAskObj);
            countDashoardAskNeedform = countDashoardAskNeed.length;
            var myWindow = $("#dialogAskNeed");
            myWindow.data("kendoWindow").open();
        }
        catch (err) {
            var dataToSend = {
                "method": "openAskNeedDialog", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }
    });
    function bindAskNeedControl() {
        bindChangeDatePicker("askLogDate");
        bindChangeDatePicker("askCloseDate");
        bindChangeDatePicker("needByDate");
        bindUserPicker("needfromUser");
        bindAskNeed = false;
    }

    $rootScope.$on("openScheduleDialog", function (event, countDashoardMilestone) {
        try {
            OriginalScheduleObj = {};
            vm.IsMilestoneLabel = false;
            angular.copy(vm.schedule, OriginalScheduleObj);
            if (bindSchedule) {
                bindChangeDatePicker("plannedFinishDate");
                bindChangeDatePicker("completionDate");
                bindChangeComboBox("functionowner");
                bindSchedule = false;
            }
            milestoneIncludeReportValid = true;
            countDashoardMilestoneform = countDashoardMilestone.length;
            var myWindow = $("#dialogMilestone");
            myWindow.data("kendoWindow").open();
        }
        catch (err) {
            var dataToSend = {
                "method": "openScheduleDialog", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }
    });
    //Bind the risk issue controls
    function bindRiskIssueControl() {
        bindChangeDatePicker("logDate");
        bindChangeDatePicker("closeDate");
        bindChangeDatePicker("dueDate");
        bindChangeComboBox("type");
        bindChangeComboBox("probability");
        bindChangeComboBox("impact");
        bindChangeComboBox("functiongroup");
        bindUserPicker("riskowner");
        bindRiskIssue = false;
    }

    function bindChangeDatePicker(elmentId) {
        if (elmentId == "completionDate" || elmentId == "closeDate" || elmentId == "askCloseDate" || elmentId == "logDate" || elmentId == "askLogDate") {
            $("#" + elmentId).kendoDatePicker({
                disableDates: function (date) {
                    if (date > new Date()) {
                        return true;
                    } else {
                        return false;
                    }
                },
                //change: function () {
                //    onDateChange(this.element.attr("id"));
                //}
            });
            $("#" + elmentId).on("change", function (e) {
                onDateChange($(this).attr('id'));
            })
            //$("#" + elmentId).on("disableDates", function (date) {
            //    if (date > new Date()) {
            //        return true;
            //    } else {
            //        return false;
            //    }
            //})
        }
        else {
            $("#" + elmentId).on("change", function (e) {
                onDateChange($(this).attr('id'));
            });
        }
    };
    function onDateChange(elementId) {
        var flag = false;
        var value = $("#" + elementId).val();
        if (parseDate(value)) {
            flag = true;
        }
        if (flag) {
            switch (elementId) {
                case 'logDate':
                    if (new Date(value) <= new Date()) {
                        vm.logDateError = false;
                    }
                    else { $('#validationLogDate').html(logDateRangeMsg); }
                    break;
                case 'closeDate':
                    if (new Date(value) <= new Date()) {
                        vm.closeDateError = false;
                    }
                    else { $('#validationcloseDate').html(CloseDateRangeMsg); }
                    break;
                case 'dueDate':
                    vm.dueDateError = false;
                    break;
                case 'completionDate':
                    if (new Date(value) <= new Date()) {
                        vm.completeDateError = false;
                    }
                    else { $('#validationcompletionDate').html("Completion date could not be greater than today's date."); }
                    break;
                case 'plannedFinishDate':
                    vm.plannedFinishError = false;
                    break;
                case 'askLogDate':
                    if (new Date(value) <= new Date()) {
                        vm.askLogDateError = false;
                    }
                    else { $('#validationaskLogDate').html(logDateRangeMsg); }
                    break;
                case 'askCloseDate':
                    if (new Date(value) <= new Date()) {
                        vm.askCloseDateError = false;
                    }
                    else { $('#validationaskCloseDate').html(CloseDateRangeMsg); }
                    break;
                case 'needByDate':
                    vm.needByDateError = false;
                    break;
                case 'statusDate':
                    vm.statusDateError = false;
                    break;
                default:

            }
            $scope.$digest();
        }
    }
    function bindUserPicker(elmentId) {
        $("#" + elmentId).kendoComboBox({
            suggest: false,
            minLength: 3,
            filtering: function (e) {
                e.preventDefault();
            },
            dataSource: [],
            filter: "contains",
            dataTextField: "UserDisplayName",
            dataValueField: "UserADId",
            placeholder: peoplepickerPlaceholder,
            headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                '<span>Photo</span>' +
                '<span>Contact info</span>' +
            '</div>',
            valueTemplate: '<span class="selected-value" style="background-image: url(\'#: data.UserImageUrl #\')"></span><span>#: data.UserDisplayName #</span>',
            template: '<span class="k-state-default" style="background-image: url(\'#: data.UserImageUrl #\')"></span>' +
            '<span class="k-state-default"><h3>#: data.UserDisplayName #</h3># if (data.UserEmailAddress != null) {#<p>#: data.UserEmailAddress #</p># }if (data.UserDepartment != null) {#<p><span>#: data.UserDepartment #</span># }if (data.UserCountry != null) {# <span> #: data.UserCountry #</span></p># } #</span>',
        });

        $("#" + elmentId).data("kendoComboBox").input.on('keydown', function (e) {
            GETPostService.searchPeople(e, e.currentTarget.name.replace("_input", ""));
        });

    };
    //Add/Update Risk Issue
    function CreateRiskIssueData(windowname) {
        trackEvent("Create Risk/Issue");
        try {
            displayLoading();
            saveData = 1;
            var valid = true;
            var listdata = [];
            var dueDate = (vm.riskIssue.DueDate != null && vm.riskIssue.DueDate != "") ? $("#dueDate").val() : null;
            var closeDate = (vm.riskIssue.CloseDate != null && vm.riskIssue.CloseDate != "") ? $("#closeDate").val() : null;
            var logDate = (vm.riskIssue.LogDate != null && vm.riskIssue.LogDate != "") ? $("#logDate").val() : null;
            if (dueDate != null) {
                if (!parseDate(dueDate)) {
                    valid = false;
                    vm.dueDateError = true;
                }
                else {
                    vm.dueDateError = false;
                }
            }
            if (closeDate != null) {
                if (!parseDate(closeDate)) {
                    valid = false;
                    vm.closeDateError = true;
                    $('#validationcloseDate').html(vm.dateErrorMsg);
                }
                else {
                    vm.closeDateError = false;
                    if (new Date(closeDate) > new Date()) {
                        valid = false;
                        $('#validationcloseDate').html(CloseDateRangeMsg);
                        vm.closeDateError = true;
                    }
                }
            }
            if (logDate != null) {
                if (!parseDate(logDate)) {
                    valid = false;
                    vm.logDateError = true;
                    $('#validationLogDate').html(vm.dateErrorMsg);
                }
                else {
                    vm.logDateError = false;
                    if (new Date(logDate) > new Date()) {
                        valid = false;
                        $('#validationLogDate').html(logDateRangeMsg);
                        vm.logDateError = true;
                    }
                }
            }
            if (!riskIncludeReportValid) {
                alert(includeReportMessageForRisk);
                valid = false;
            }
            if (!valid) {
                hideLoading();
                return;
            }
            var ownerID = '';
            var ownerName = '';
            if ($("#riskowner").data("kendoComboBox") != null && $("#riskowner").data("kendoComboBox").selectedIndex != -1) {
                ownerID = $("#riskowner").data("kendoComboBox").value();
                ownerName = $("#riskowner").data("kendoComboBox").text();
            }
            if (vm.riskIssue.RiskIssueUniqueID != null) {
                vm.riskIssueData = {
                    RiskIssueUniqueID: vm.riskIssue.RiskIssueUniqueID,
                    ProjectID: vm.riskIssue.ProjectID,
                    IfHappens: vm.riskIssue.IfHappens,
                    RiskIssueResult: vm.riskIssue.RiskIssueResult,
                    Mitigation: vm.riskIssue.Mitigation,
                    RiskIssueTypeID: vm.riskIssue.RiskIssueTypeID != null ? (vm.riskIssue.RiskIssueTypeID.LookUpMemberID != undefined ? vm.riskIssue.RiskIssueTypeID.LookUpMemberID : vm.riskIssue.RiskIssueTypeID) : null,
                    ProbabilityID: vm.riskIssue.ProbabilityID != null ? (vm.riskIssue.ProbabilityID.LookUpMemberID != undefined ? vm.riskIssue.ProbabilityID.LookUpMemberID : vm.riskIssue.ProbabilityID) : null,
                    ImpactID: vm.riskIssue.ImpactID != null ? (vm.riskIssue.ImpactID.LookUpMemberID != undefined ? vm.riskIssue.ImpactID.LookUpMemberID : vm.riskIssue.ImpactID) : null,
                    OwnerID: ownerID,
                    OwnerName: ownerName,
                    FunctionGroupID: vm.riskIssue.FunctionGroupID != null ? (vm.riskIssue.FunctionGroupID.LookUpMemberID != undefined ? vm.riskIssue.FunctionGroupID.LookUpMemberID : vm.riskIssue.FunctionGroupID) : null,
                    DueDate: (vm.riskIssue.DueDate != null && vm.riskIssue.DueDate != "") ? vm.riskIssue.DueDate : null,
                    CloseDate: (vm.riskIssue.CloseDate != null && vm.riskIssue.CloseDate != "") ? vm.riskIssue.CloseDate : null,
                    LogDate: (vm.riskIssue.LogDate != null && vm.riskIssue.LogDate != "") ? vm.riskIssue.LogDate : vm.todayDate,
                    IncludeInReport: vm.riskIssue.IncludeInReport,
                    link: vm.riskIssue.link != null ? vm.riskIssue.link : 0,
                    PostProbabilityID: vm.riskIssue.PostProbabilityID != null ? (vm.riskIssue.PostProbabilityID.LookUpMemberID != undefined ? vm.riskIssue.PostProbabilityID.LookUpMemberID : vm.riskIssue.PostProbabilityID) : null,
                    PostImpactID: vm.riskIssue.PostImpactID != null ? (vm.riskIssue.PostImpactID.LookUpMemberID != undefined ? vm.riskIssue.PostImpactID.LookUpMemberID : vm.riskIssue.PostImpactID) : null,
                    PostMitigationComments: vm.riskIssue.PostMitigationComments

                };
                listdata.push(vm.riskIssueData);

                if (listdata.length > 0) {
                    var finalData = JSON.stringify({
                        "riskIssueData": listdata
                    });
                    GETPostService.postDataWCFAsync('updateRiskIssueData', finalData).then(function (response) {
                        //alert(response);
                        if (response.updateRiskIssueDataResult == "Success") {
                            vm.riskIssue = {};
                            if (IsProgram) {
                                $rootScope.$emit("getProgramHubRiskData");
                            }
                            else {
                                $rootScope.$emit("getProjectHubRiskData");
                            }
                            GetProjectHubStatus();
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                            saveData = 0;
                        }
                        else {
                            alert("Error occurred in item updation for RiskIssue.");
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                        }
                    });
                }
            }
            else {
                vm.riskIssueData = {
                    ProjectID: SeletedProjectId,
                    RiskIssueUniqueID: NewGuid(),
                    IfHappens: vm.riskIssue.IfHappens,
                    RiskIssueResult: vm.riskIssue.RiskIssueResult,
                    Mitigation: vm.riskIssue.Mitigation,
                    RiskIssueTypeID: vm.riskIssue.RiskIssueTypeID != null ? vm.riskIssue.RiskIssueTypeID.LookUpMemberID : null,
                    ProbabilityID: vm.riskIssue.ProbabilityID != null ? vm.riskIssue.ProbabilityID.LookUpMemberID : null,
                    ImpactID: vm.riskIssue.ImpactID != null ? vm.riskIssue.ImpactID.LookUpMemberID : null,
                    OwnerID: ownerID,
                    OwnerName: ownerName,
                    FunctionGroupID: vm.riskIssue.FunctionGroupID != null ? vm.riskIssue.FunctionGroupID.LookUpMemberID : null,
                    DueDate: (vm.riskIssue.DueDate != null && vm.riskIssue.DueDate != "") ? vm.riskIssue.DueDate : null,
                    CloseDate: (vm.riskIssue.CloseDate != null && vm.riskIssue.CloseDate != "") ? vm.riskIssue.CloseDate : null,
                    LogDate: (vm.riskIssue.LogDate != null && vm.riskIssue.LogDate != "") ? vm.riskIssue.LogDate : vm.todayDate,
                    IncludeInReport: vm.riskIssue.IncludeInReport,
                    PostProbabilityID: vm.riskIssue.PostProbabilityID != null ? (vm.riskIssue.PostProbabilityID.LookUpMemberID != undefined ? vm.riskIssue.PostProbabilityID.LookUpMemberID : vm.riskIssue.PostProbabilityID) : null,
                    PostImpactID: vm.riskIssue.PostImpactID != null ? (vm.riskIssue.PostImpactID.LookUpMemberID != undefined ? vm.riskIssue.PostImpactID.LookUpMemberID : vm.riskIssue.PostImpactID) : null,
                    PostMitigationComments: vm.riskIssue.PostMitigationComments
                };
                listdata.push(vm.riskIssueData);

                if (listdata.length > 0) {
                    var finalData = JSON.stringify({
                        "riskIssueData": listdata
                    });
                    GETPostService.postDataWCFAsync('insertRiskIssueData', finalData).then(function (response) {
                        //alert(response);
                        if (response.insertRiskIssueDataResult == "Success") {
                            vm.riskIssue = {};
                            //  getDataForRiskIssue();
                            if (IsProgram) {
                                $rootScope.$emit("getProgramHubRiskData");
                            }
                            else {
                                $rootScope.$emit("getProjectHubRiskData");
                            }
                            GetProjectHubStatus();
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                        }
                        else {
                            alert("Error occurred in item insertion for RiskIssue.");
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                        }
                    });
                }
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "CreateRiskIssueData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      alert(errormessage);
                      hideLoading();
                      var digname = "#" + windowname;
                      var myWindow = $(digname);
                      myWindow.data("kendoWindow").close();
                  });
        }

    };


    //Add/Update milestone data
    function CreateScheduleData(windowname) {
        trackEvent("Create Milestone");
        try {
            displayLoading();
            saveData = 1;
            var listdata = [];
            var valid = true;
            var completeDate = (vm.schedule.CompletionDate != null && vm.schedule.CompletionDate != "") ? $("#completionDate").val() : null;
            var plannedDate = (vm.schedule.PlannedFinish != null && vm.schedule.PlannedFinish != "") ? $("#plannedFinishDate").val() : null;

            if (completeDate != null) {
                if (!parseDate(completeDate)) {
                    valid = false;
                    vm.completeDateError = true;
                    $('#validationcompletionDate').html(vm.dateErrorMsg);
                }
                else {
                    vm.completeDateError = false;
                    if (new Date(completeDate) > new Date()) {
                        valid = false;
                        $('#validationcompletionDate').html("Completion date could not be greater than today's date.");
                        vm.completeDateError = true;
                    }
                }
            }
            if (plannedDate != null) {
                if (!parseDate(plannedDate)) {
                    valid = false;
                    vm.plannedFinishError = true;
                }
                else {
                    vm.plannedFinishError = false;
                }
            }
            if (!milestoneIncludeReportValid) {
                alert(includeReportMessageForMilestone);
                valid = false;
            }

            if (!valid) {
                hideLoading();
                return;
            }
            if (vm.schedule.ScheduleUniqueID != null) {
                var scheduleData = {
                    ScheduleUniqueID: vm.schedule.ScheduleUniqueID,
                    ProjectID: vm.schedule.ProjectID,
                    //Milestone: vm.schedule.Milestone,
                    Milestone: (vm.schedule.MilestoneType == 1) ? MilestoneStartPrefix + vm.schedule.Milestone : (vm.schedule.MilestoneType == 2 ? MilestoneEndPrefix + vm.schedule.Milestone : vm.schedule.Milestone),

                    PlannedFinish: (vm.schedule.PlannedFinish != null && vm.schedule.PlannedFinish != "") ? vm.schedule.PlannedFinish : null,
                    BaselineFinish: (vm.schedule.BaselineFinish != null && vm.schedule.BaselineFinish != "") ? vm.schedule.BaselineFinish : null,
                    FunctionGroupID: vm.schedule.FunctionGroupID != null ? (vm.schedule.FunctionGroupID.LookUpMemberID != undefined ? vm.schedule.FunctionGroupID.LookUpMemberID : vm.schedule.FunctionGroupID) : null,
                    Comments: vm.schedule.Comments != null ? vm.schedule.Comments : null,
                    CompletionDate: (vm.schedule.CompletionDate != null && vm.schedule.CompletionDate != "") ? vm.schedule.CompletionDate : null,
                    IncludeInReport: vm.schedule.IncludeInReport,
                    link: vm.schedule.link != null ? vm.schedule.link : 0
                };
                listdata.push(scheduleData);
                if (listdata.length > 0) {
                    var finalData = JSON.stringify({ "scheduleData": listdata, "userId": currentUserId });

                    GETPostService.postDataWCFAsync('updateScheduleData', finalData).then(function (response) {
                        if (response.updateScheduleDataResult == "Success") {
                            if (IsProgram) {
                                $rootScope.$emit("getProgramHubScheduleData");
                            }
                            else {
                                $rootScope.$emit("getProjectHubScheduleData");
                            }
                            GetProjectHubStatus();
                            //  getDataForSchedule();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            vm.schedule = {};
                            hideLoading();
                            myWindow.data("kendoWindow").close();
                            saveData = 0;
                        }
                        else {
                            alert("Error occurred in item updation for Schedule.");
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                        }
                    });
                }
            }
            else {
                var scheduleData = {
                    ScheduleUniqueID: NewGuid(),
                    ProjectID: SeletedProjectId,
                    Milestone: vm.schedule.Milestone,
                    PlannedFinish: (vm.schedule.PlannedFinish != null && vm.schedule.PlannedFinish != "") ? vm.schedule.PlannedFinish : null,
                    FunctionGroupID: vm.schedule.FunctionGroupID != null ? vm.schedule.FunctionGroupID.LookUpMemberID : null,
                    Comments: vm.schedule.Comments != null ? vm.schedule.Comments : null,
                    CompletionDate: (vm.schedule.CompletionDate != null && vm.schedule.CompletionDate != "") ? vm.schedule.CompletionDate : null,
                    IncludeInReport: vm.schedule.IncludeInReport,
                };
                listdata.push(scheduleData);
                if (listdata.length > 0) {
                    var finalData = JSON.stringify({ "scheduleData": listdata, "userId": currentUserId });

                    GETPostService.postDataWCFAsync('insertScheduleData', finalData).then(function (response) {
                        if (response.insertScheduleDataResult == "Success") {
                            if (IsProgram) {
                                $rootScope.$emit("getProgramHubScheduleData");
                            }
                            else {
                                $rootScope.$emit("getProjectHubScheduleData");
                            }
                            GetProjectHubStatus();
                            // getDataForSchedule();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            vm.schedule = {};
                            hideLoading();
                            myWindow.data("kendoWindow").close();
                        }
                        else {
                            alert("Error occurred in item insertion for Schedule.");
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                        }
                    });
                }

            }
        }
        catch (err) {
            var dataToSend = {
                "method": "CreateScheduleData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      alert(errormessage);
                      hideLoading();
                      var digname = "#" + windowname;
                      var myWindow = $(digname);
                      myWindow.data("kendoWindow").close();
                  });
        }
    };
    function CreateAskNeedData(windowname) {
        trackEvent("Create AskNeed");
        try {
            displayLoading();
            var listdata = [];
            var valid = true;
            var needDate = (vm.askNeed.NeedByDate != null && vm.askNeed.NeedByDate != "") ? $("#needByDate").val() : null;
            var closeDate = (vm.askNeed.CloseDate != null && vm.askNeed.CloseDate != "") ? $("#askCloseDate").val() : null;
            var logDate = (vm.askNeed.LogDate != null && vm.askNeed.LogDate != "") ? $("#askLogDate").val() : null;
            if (!askNeedIncludeReportValid) {
                alert(includeReportMessageForAskNeed);
                valid = false;
            }

            if (needDate != null) {
                if (!parseDate(needDate)) {
                    valid = false;
                    vm.needByDateError = true;
                }
                else {
                    vm.needByDateError = false;
                }
            }
            if (closeDate != null) {
                if (!parseDate(closeDate)) {
                    valid = false;
                    vm.askCloseDateError = true;
                    $('#validationaskCloseDate').html(vm.dateErrorMsg);
                }
                else {
                    vm.askCloseDateError = false;
                    if (new Date(closeDate) > new Date()) {
                        valid = false;
                        $('#validationaskCloseDate').html(CloseDateRangeMsg);
                        vm.askCloseDateError = true;
                    }
                }
            }
            if (logDate != null) {
                if (!parseDate(logDate)) {
                    valid = false;
                    vm.askLogDateError = true;
                    $('#validationaskLogDate').html(vm.dateErrorMsg);
                }
                else {
                    vm.askLogDateError = false;
                    if (new Date(logDate) > new Date()) {
                        valid = false;
                        $('#validationaskLogDate').html(logDateRangeMsg);
                        vm.askLogDateError = true;
                    }
                }
            }
            if (!valid) {
                hideLoading();
                return;
            }
            saveData = 1;
            var ownerID = '';
            var ownerName = '';
            if ($("#needfromUser").data("kendoComboBox") != null && $("#needfromUser").data("kendoComboBox").selectedIndex != -1) {
                ownerID = $("#needfromUser").data("kendoComboBox").value();
                ownerName = $("#needfromUser").data("kendoComboBox").text();
            }
            if (vm.askNeed.AskNeedUniqueID != null) {
                var askNeedData = {
                    AskNeedUniqueID: vm.askNeed.AskNeedUniqueID,
                    ProjectID: vm.askNeed.ProjectID,
                    AskNeed: vm.askNeed.AskNeed,
                    NeedFromID: ownerID,
                    NeedFromName: ownerName,
                    NeedByDate: (vm.askNeed.NeedByDate != null && vm.askNeed.NeedByDate != "") ? vm.askNeed.NeedByDate : null,
                    Comments: vm.askNeed.Comments != null ? vm.askNeed.Comments : '',
                    CloseDate: (vm.askNeed.CloseDate != null && vm.askNeed.CloseDate != "") ? vm.askNeed.CloseDate : null,
                    LogDate: (vm.askNeed.LogDate != null && vm.askNeed.LogDate != "") ? vm.askNeed.LogDate : vm.todayDate,
                    IncludeInReport: vm.askNeed.IncludeInReport != null ? vm.askNeed.IncludeInReport : false,
                    link: vm.askNeed.link != null ? vm.askNeed.link : 0
                };
                listdata.push(askNeedData);
                if (listdata.length > 0) {
                    var jsonListData = JSON.stringify(listdata);
                    var finalData = JSON.stringify({
                        "askNeedData": JSON.parse(jsonListData)
                    });

                    GETPostService.postDataWCFAsync('updateAskNeed', finalData).then(function (response) {
                        if (response.updateAskNeedResult == "Success") {
                            vm.askNeed = {};
                            // getDataForAskNeed();
                            if (IsProgram) {
                                $rootScope.$emit("getProgramHubAskNeedData");
                            }
                            else {
                                $rootScope.$emit("getProjectHubAskNeedData");
                            }
                            GetProjectHubStatus();
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                            saveData = 0;
                        }
                        else {
                            alert("Error occurred in item updation for Ask/Need.");
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                        }
                    });
                }
            }
            else {
                var askNeedData = {
                    ProjectID: SeletedProjectId,
                    AskNeedUniqueID: NewGuid(),
                    AskNeed: vm.askNeed.AskNeed,
                    NeedFromID: ownerID,
                    NeedFromName: ownerName,
                    NeedByDate: (vm.askNeed.NeedByDate != null && vm.askNeed.NeedByDate != "") ? vm.askNeed.NeedByDate : null,
                    Comments: vm.askNeed.Comments != null ? vm.askNeed.Comments : '',
                    CloseDate: (vm.askNeed.CloseDate != null && vm.askNeed.CloseDate != "") ? vm.askNeed.CloseDate : null,
                    LogDate: (vm.askNeed.LogDate != null && vm.askNeed.LogDate != "") ? vm.askNeed.LogDate : vm.todayDate,
                    IncludeInReport: vm.askNeed.IncludeInReport != null ? vm.askNeed.IncludeInReport : false
                };
                listdata.push(askNeedData);
                if (listdata.length > 0) {
                    var jsonListData = JSON.stringify(listdata);
                    var finalData = JSON.stringify({
                        "askNeedData": JSON.parse(jsonListData)
                    });
                    GETPostService.postDataWCFAsync('insertAskNeed', finalData).then(function (response) {
                        if (response.insertAskNeedResult == "Success") {
                            vm.askNeed = {};
                            if (IsProgram) {
                                $rootScope.$emit("getProgramHubAskNeedData");
                            }
                            else {
                                $rootScope.$emit("getProjectHubAskNeedData");
                            }
                            GetProjectHubStatus();
                            //  getDataForAskNeed();
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                        }
                        else {
                            alert("Error occurred in item insertion for Ask/Need.");
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                        }
                    });
                }
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "CreateAskNeedData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      alert(errormessage);
                      hideLoading();
                      var digname = "#" + windowname;
                      var myWindow = $(digname);
                      myWindow.data("kendoWindow").close();
                  });
        }
    };
    function CreateOverAllData(windowname) {
        vm.insertUpdateDeletePerformance = [];
        trackEvent("Overall Status Submitted");
        try {
            displayLoading();
            saveData = 1;
            var listdata = [];
            var listData1 = [];
            var valid = true;
            var performanceIncludeLength = $("#OverallStatusPerformanceBulkEdit").data("kendoGrid").tbody.find("input:checked").length;
            if (performanceIncludeLength > includeInDashboardReportCount) {
                alert(includeDashboardReportMess);
                hideLoading();
                return false;
            }
            var statusDate = (vm.overAllData.StatusThrough != null && vm.overAllData.StatusThrough != "") ? $("#statusDate").val() : null;
            if (statusDate != null) {
                if (!parseDate(statusDate)) {
                    valid = false;
                    vm.statusDateError = true;
                }
                else {
                    vm.statusDateError = false;
                }
            }
            if (valid) {
                var scheduleData = {
                    StatusUnquieID: vm.overAllData.StatusUnquieID,
                    ProjectID: SeletedProjectId,
                    StatusThrough: (vm.overAllData.StatusThrough != null && vm.overAllData.StatusThrough != "") ? vm.overAllData.StatusThrough : null,
                    OverallStatusID: vm.overAllData.OverallStatusID != null ? (vm.overAllData.OverallStatusID.LookUpMemberID != undefined ? vm.overAllData.OverallStatusID.LookUpMemberID : vm.overAllData.OverallStatusID) : null,
                    OverallStatusDescription: vm.overAllData.OverallStatusDescription != null ? vm.overAllData.OverallStatusDescription : null,
                    RecentAccomplishments: vm.overAllData.RecentAccomplishments != null ? vm.overAllData.RecentAccomplishments : null,
                    NextSteps: vm.overAllData.NextSteps != null ? vm.overAllData.NextSteps : null
                };
                listdata.push(scheduleData);
                vm.performanceInsertListItems = [];
                vm.performanceUpdateListItems = [];
                var gridupdatedData = $('#OverallStatusPerformanceBulkEdit').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertPerformanceArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updatePerformanceArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });

                angular.forEach(insertPerformanceArray, function (item, index) {
                    var temp = {};                   
                    temp.StatusIndicator = item.StatusIndicator;
                    temp.StatusID = item.StatusID;
                    temp.KPIID = item.KPIID;
                    temp.Metric = item.Metric;
                    temp.CurrentState = item.CurrentState;
                    temp.TargetPerformance = item.TargetPerformance;
                    temp.ActualPerformance = item.ActualPerformance;
                    temp.IncludeInProjectDashboard = item.IncludeInProjectDashboard;
                    vm.performanceInsertListItems.push(temp);
                });
                angular.forEach(updatePerformanceArray, function (item, index) {
                    var temp = {};
                    temp.KeySuccessUniqueID = item.KeySuccessUniqueID;
                    temp.StatusIndicator = item.StatusIndicator;
                    temp.StatusID = item.StatusID;
                    temp.KPIID = item.KPIID;
                    temp.Metric = item.Metric;
                    temp.CurrentState = item.CurrentState;
                    temp.TargetPerformance = item.TargetPerformance;
                    temp.ActualPerformance = item.ActualPerformance;
                    temp.IncludeInProjectDashboard = item.IncludeInProjectDashboard;
                    vm.performanceUpdateListItems.push(temp);
                });
                vm.insertUpdateDeletePerformance = {
                    "insert": vm.performanceInsertListItems,
                    "update": vm.performanceUpdateListItems,
                    "delete": vm.deletedPerformanceData
                };
                listData1.push(vm.insertUpdateDeletePerformance);
                //vm.OverallStatusColor = vm.overAllData.OverallStatusID != null ? vm.overAllData.OverallStatusID.LookUpMemberName : "";
                var finalData = { "ProjectID": SeletedProjectId, "objPerformance": JSON.stringify(listData1), "overAllStatusData": JSON.stringify(listdata), "userId": currentUserId };
                GETPostService.postDataWCFAsync('insertOverAllStatus', finalData).then(function (response) {
                    //alert(response);
                    if (response == "Success") {
                        if (IsProgram) {
                            $rootScope.$emit("getProgramHubOverallData");
                        }
                        else {
                            $rootScope.$emit("getProjectHubOverallData");
                        }
                        $.when(GETPostService.getDataWCF("getProjectHubStatus/" + SeletedProjectId))
                            .then(function (resStatus) {                            
                                    var projecthubStatus = JSON.parse(resStatus.getProjectHubStatusResult);
                                    vm.projectHubStatus = projecthubStatus[0];
                            hideLoading();
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                            saveData = 0;
                         });
                        //getDataForOverallStatus();
                       // $('#OverallStatusPerformanceBulkEdit').data('kendoGrid').dataSource.read();
                        
                    }
                    else {
                        alert("Error occurred in item updation for OverAllStatus.");
                    }
                })
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "CreateOverAllData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      alert(errormessage);
                      hideLoading();
                      var digname = "#" + windowname;
                      var myWindow = $(digname);
                      myWindow.data("kendoWindow").close();
                  });
        }
    };
    function CreateProjectPhaseStateData(windowname) {
        try {
            var listdata = [];
            saveData = 1;
            //if (vm.Phase != null) {
            if (vm.SelectedprojectPhase != null) {
                if (vm.SelectedprojectPhase.LookUpMemberID != vm.projectHubStatus.ProjectPhaseID) {
                    var projectphaseData = {
                        ProjectID: SeletedProjectId,
                        PhaseStateID: vm.SelectedprojectPhase != null ? vm.SelectedprojectPhase.LookUpMemberID : null,
                        ModificationDate: new Date().toUTCString().substr(0, 25),
                        ModifiedBy: currentUserId,
                        CapitalPhaseID: vm.SelectedprojectCapitalPhase != null ? vm.SelectedprojectCapitalPhase.CapitalPhaseID : null,
                        OEPhaseID: vm.SelectedprojectOEPhase != null ? vm.SelectedprojectOEPhase.CapitalPhaseID : null
                    };
                    listdata.push(projectphaseData);
                }
                else {
                    if (vm.SelectedprojectCapitalPhase != null && (vm.SelectedprojectCapitalPhase.CapitalPhaseID != vm.projectHubStatus.CapitalPhaseID)) {
                        //if ((vm.SelectedprojectCapitalPhase.CapitalPhaseID != vm.projectHubStatus.CapitalPhaseID)) {
                            var projectphaseData = {
                                ProjectID: SeletedProjectId,
                                PhaseStateID: vm.SelectedprojectPhase != null ? vm.SelectedprojectPhase.LookUpMemberID : null,
                                ModificationDate: new Date().toUTCString().substr(0, 25),
                                ModifiedBy: currentUserId,
                                CapitalPhaseID: vm.SelectedprojectCapitalPhase != null ? vm.SelectedprojectCapitalPhase.CapitalPhaseID : null,
                                OEPhaseID: vm.SelectedprojectOEPhase != null ? vm.SelectedprojectOEPhase.CapitalPhaseID : null
                            };
                            listdata.push(projectphaseData);
                        //}
                    }
                    else {
                        if (vm.SelectedprojectOEPhase != null && vm.SelectedprojectOEPhase.CapitalPhaseID != vm.projectHubStatus.OEPhaseID) {
                            //if (vm.SelectedprojectOEPhase.CapitalPhaseID != vm.projectHubStatus.OEPhaseID) {
                            var projectphaseData = {
                                ProjectID: SeletedProjectId,
                                PhaseStateID: vm.SelectedprojectPhase != null ? vm.SelectedprojectPhase.LookUpMemberID : null,
                                ModificationDate: new Date().toUTCString().substr(0, 25),
                                ModifiedBy: currentUserId,
                                CapitalPhaseID: vm.SelectedprojectCapitalPhase != null ? vm.SelectedprojectCapitalPhase.CapitalPhaseID : null,
                                OEPhaseID: vm.SelectedprojectOEPhase != null ? vm.SelectedprojectOEPhase.CapitalPhaseID : null
                            };
                            listdata.push(projectphaseData);
                            // }
                        }
                        else {
                            if ((vm.SelectedprojectOEPhase == null && vm.projectHubStatus.OEPhaseID != "") || (vm.SelectedprojectCapitalPhase==null&&vm.projectHubStatus.CapitalPhaseID != ""))
                            {
                                var projectphaseData = {
                                    ProjectID: SeletedProjectId,
                                    PhaseStateID: vm.SelectedprojectPhase != null ? vm.SelectedprojectPhase.LookUpMemberID : null,
                                    ModificationDate: new Date().toUTCString().substr(0, 25),
                                    ModifiedBy: currentUserId,
                                    CapitalPhaseID: vm.SelectedprojectCapitalPhase != null ? vm.SelectedprojectCapitalPhase.CapitalPhaseID : null,
                                    OEPhaseID: vm.SelectedprojectOEPhase != null ? vm.SelectedprojectOEPhase.CapitalPhaseID : null
                                };
                                listdata.push(projectphaseData);
                            }
                        }
                    
                    }
                }
            }
            if (vm.SelectedprojectState != null) {
                if (gridDataProjectState.length > 0) {
                    if (vm.SelectedprojectState.LookUpMemberID != null)
                    {
                        if (vm.SelectedprojectState.LookUpMemberID == cancelStateID && gridDataProjectState[0].ForecastData == 1)
                        {
                            alert(cancelStateMsg);
                            var digname = "#" + windowname;
                            var myWindow = $(digname);
                            myWindow.data("kendoWindow").close();
                            saveData = 0;
                            return;
                        }
                    }
                }
                if (vm.SelectedprojectState.LookUpMemberID != vm.projectHubStatus.ProjectStatusID) {
                    var projectStateData = {
                        ProjectID: SeletedProjectId,
                        PhaseStateID: vm.SelectedprojectState != null ? vm.SelectedprojectState.LookUpMemberID : null,
                        ModificationDate: new Date().toUTCString().substr(0, 25),
                        ModifiedBy: currentUserId
                    };
                    listdata.push(projectStateData);
                }
            }
            if (listdata.length > 0) {
                var finalData = JSON.stringify({ "PhaseState": listdata });

                GETPostService.postDataWCFAsync('InsertPhaseState', finalData).then(function (response) {
                    if (response.insertPhaseStateResult == "Success") {
                        $.when(GETPostService.getDataWCF("getProjectHubStatus/" + SeletedProjectId))
                       .then(function (resStatus) {
                           var projecthubStatus = JSON.parse(resStatus.getProjectHubStatusResult);
                           vm.projectHubStatus = projecthubStatus[0];
                           if (vm.projectHubStatus != null || vm.projectHubStatus != undefined) {
                               SetProjectPhase();
                               SetProjectSPOTLightIndicator();
                               vm.ProjectName = vm.projectHubStatus.ProjectName;
                               if (vm.projectHubStatus.IsArchived) {
                                   vm.IsActive = "arrow-grey-dark";
                               }
                               else { vm.IsActive = ""; }
                           }
                           $scope.$digest();
                       })
                        var digname = "#" + windowname;
                        var myWindow = $(digname);
                        myWindow.data("kendoWindow").close();
                        saveData = 0;
                    }
                    else {
                        alert("Error occurred in item insertion/updation for PhaseData.");
                    }
                })
            }
            else {
                var digname = "#" + windowname;
                var myWindow = $(digname);
                myWindow.data("kendoWindow").close();
                saveData = 0;
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "CreateProjectPhaseStateData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      alert(errormessage);
                      var digname = "#" + windowname;
                      var myWindow = $(digname);
                      myWindow.data("kendoWindow").close();
                  });
        }

    }
    function CreateProjectTeam(windowname) {
        try {
            displayLoading();
            var listdata = [];
            saveData = 1;
            if (vm.projectTeam != null) {
                var userID = '';
                var userName = '';
                if ($("#teamuser").data("kendoComboBox") != null && $("#teamuser").data("kendoComboBox").selectedIndex != -1) {
                    userID = $("#teamuser").data("kendoComboBox").value();
                    userName = $("#teamuser").data("kendoComboBox").text();
                }
                var teamData = {
                    ProblemUniqueID: SeletedProjectId,
                    ProjectTeamUniqueID: NewGuid(),
                    TeamMemberAdId: userID,
                    TeamMemberName: userName,
                    RoleID: vm.projectTeam.role != null ? vm.projectTeam.role.LookUpMemberID : null,
                    TeamPermissionID: vm.projectTeam.permission != null ? vm.projectTeam.permission.LookUpMemberID : null
                };
                listdata.push(teamData);
            }
            if (listdata.length > 0) {
                var finalData = JSON.stringify({ "ProjectTeam": listdata });

                GETPostService.postDataWCFAsync('InsertProjectTeam', finalData).then(function (response) {
                    if (response.insertProjectTeamResult == "Success") {
                        getDataForTeam();
                        GetProjectHubStatus();
                        GetProjectHubStatusForDataQuality();
                        vm.projectTeam = {};
                        hideLoading();
                        var digname = "#" + windowname;
                        var myWindow = $(digname);
                        myWindow.data("kendoWindow").close();
                        saveData = 0;
                    }
                    else {
                        hideLoading();
                        alert("Error occurred in item insertion for Project Team .");
                    }
                });

            }
        }
        catch (err) {
            var dataToSend = {
                "method": "CreateProjectTeam", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      alert(errormessage);
                      hideLoading();
                      var digname = "#" + windowname;
                      var myWindow = $(digname);
                      myWindow.data("kendoWindow").close();
                  });
        }
    }
    function SetProjectPhase() {
        vm.ExecuteStyle = "";
        vm.IntiateStyle = "";
        vm.DefineStyle = "";
        vm.PlanStyle = "";
        vm.CloseStyle = "";
        vm.TrackStyle = "";
        //Phase is Active
        if (vm.projectHubStatus.ProjectPhaseName != null && vm.projectHubStatus.ProjectStatusName == "Active") {
            switch (vm.projectHubStatus.ProjectPhaseName) {
                case 'Execute':
                    vm.ExecuteStyle = "activeSpan"
                    break;
                case 'Initiate':
                    vm.IntiateStyle = "activeSpan"
                    break;
                case 'Define':
                    vm.DefineStyle = "activeSpan"
                    break;
                case 'Plan':
                    vm.PlanStyle = "activeSpan"
                    break;
                case 'Close':
                    vm.CloseStyle = "activeSpan"
                    break;
                case 'Track':
                    vm.TrackStyle = "activeSpan"
                    break;
                default:

            }
        }
        //Phase Completed
        if (vm.projectHubStatus.ProjectPhaseName != null && vm.projectHubStatus.ProjectStatusName == "Completed") {
            vm.ExecuteStyle = "greyoutSpan";
            vm.IntiateStyle = "greyoutSpan";
            vm.DefineStyle = "greyoutSpan";
            vm.PlanStyle = "greyoutSpan";
            vm.CloseStyle = "greyoutSpan";
            vm.TrackStyle = "greyoutSpan";
        }
        //Hold Phase
        if (vm.projectHubStatus.ProjectPhaseName != null && (vm.projectHubStatus.ProjectStatusName == "Hold" || vm.projectHubStatus.ProjectStatusName == "Cancelled")) {
            vm.ExecuteStyle = "";
            vm.IntiateStyle = "";
            vm.DefineStyle = "";
            vm.PlanStyle = "";
            vm.CloseStyle = "";
            vm.TrackStyle = "";
            switch (vm.projectHubStatus.ProjectPhaseName) {
                case 'Execute':
                    vm.ExecuteStyle = "greyoutSpan"
                    break;
                case 'Initiate':
                    vm.IntiateStyle = "greyoutSpan"
                    break;
                case 'Define':
                    vm.DefineStyle = "greyoutSpan"
                    break;
                case 'Plan':
                    vm.PlanStyle = "greyoutSpan"
                    break;
                case 'Close':
                    vm.CloseStyle = "greyoutSpan"
                    break;
                case 'Track':
                    vm.TrackStyle = "greyoutSpan"
                    break;
                default:

            }
        }

    }
    function getDataForTeam() {
        trackEvent("Project Hub project teams tab");
        //aisdk.trackEvent({ name: "Project Hub project teams tab" });
        // Need to Get Data for TeamDetails
        displayLoading();
        $.when(GETPostService.getDataWCFAsync("getProjectTeam/" + SeletedProjectId), GETPostService.postDataWCFAsync("getUserTeamPermission"))
                        .then(function (team, group) {
                            try {
                                gridDataTeam = [];
                                gridDataTeam = JSON.parse(team.getProjectTeamResult);
                                if (ProjectSiteUrl != "" && ProjectSiteUrl != null && gridDataTeam.length > 0 && isConfidentialProject == true) {
                                    var arrayTeam = [];
                                    angular.copy(gridDataTeam, arrayTeam);
                                    GETPostService.getAllMembers(arrayTeam);
                                }
                                usergroups = JSON.parse(group.getUserTeamPermissionResult);
                                var dataSource = new kendo.data.DataSource({ data: gridDataTeam });
                                var grid = $('#gridTeam').data('kendoGrid');
                                dataSource.read();
                                grid.setDataSource(dataSource);
                                projectTeam = [];
                                var temp = {};
                                temp.text = unassignedTeamMember;
                                temp.value = null;
                                temp.UserCountry = "",
                                temp.UserImageUrl = "",
                                temp.UserEmailAddress = "",
                                temp.UserDepartment = ""
                                projectTeam.push(temp);
                                angular.forEach(gridDataTeam, function (item, index) {
                                    if (item.TeamMemberAdId != null && item.TeamMemberAdId != "") {
                                        var user = projectTeam.filter(function (val) {
                                            return val.value === item.TeamMemberAdId;
                                        });
                                        if (user.length == 0) {
                                            var temp = {};
                                            temp.text = item.TeamMemberName;
                                            temp.value = item.TeamMemberAdId;
                                            temp.UserCountry = item.UserCountry,
                                            temp.UserImageUrl = item.UserImageUrl,
                                            temp.UserEmailAddress = item.UserEmailAddress,
                                            temp.UserDepartment = item.UserDepartment
                                            projectTeam.push(temp);
                                        }
                                    }
                                });
                                $('#gridTeamBulkEdit').data('kendoGrid').dataSource.read();

                                if (teamClose == false) {
                                    $("#dialogProjectTeamBulkEdit").data("kendoWindow").bind("close", function (e) {
                                        gridCloseEvent("gridTeamBulkEdit", e)
                                    });

                                    bindChangeComboBox("teamRole");
                                    $("#teamuser").kendoComboBox({
                                        suggest: false,
                                        dataSource: [],
                                        filter: "contains",
                                        dataTextField: "UserDisplayName",
                                        dataValueField: "UserADId",
                                        placeholder: peoplepickerPlaceholder,
                                        minLength: 3,
                                        filtering: function (e) {
                                            e.preventDefault();
                                        },
                                        change: function (e) { ShowPermission() },
                                        headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                                            '<span>Photo</span>' +
                                            '<span>Contact info</span>' +
                                            '</div>',
                                        valueTemplate: '<span class="selected-value" style="background-image: url(\'#: data.UserImageUrl #\')"></span><span>#: data.UserDisplayName #</span>',
                                        template: '<span class="k-state-default" style="background-image: url(\'#: data.UserImageUrl #\')"></span>' +
            '<span class="k-state-default"><h3>#: data.UserDisplayName #</h3># if (data.UserEmailAddress != null) {#<p>#: data.UserEmailAddress #</p># }if (data.UserDepartment != null) {#<p><span>#: data.UserDepartment #</span># }if (data.UserCountry != null) {# <span> #: data.UserCountry #</span></p># } #</span>',
                                    });

                                    $("#teamuser").data("kendoComboBox").input.on('keydown', function (e) {
                                        GETPostService.searchPeople(e, e.currentTarget.name.replace("_input", ""));
                                    });

                                    $("#dialogNewRole").data("kendoWindow").bind("close", function (e) {
                                        if (saveData == 0) {
                                            if (angular.equals(OriginalProjectTeam, vm.projectTeam) == false) {
                                                if (!confirm(dialogCloseMessage))
                                                    e.preventDefault();
                                                else {
                                                    vm.projectTeam = {};
                                                }
                                            }
                                            else {
                                                vm.projectTeam = {};
                                            }
                                        }
                                        else {
                                            vm.projectTeam = {};
                                        }
                                        saveData = 0
                                        $("#permission").data("kendoDropDownList").enable();
                                    });

                                    teamClose = true;
                                }

                                hideLoading();
                                $scope.$digest();
                            }
                            catch (err) {
                                var dataToSend = {
                                    "method": "getDataForTeam", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                };
                                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                      .then(function (response) {
                                          alert(errormessage);
                                      });
                            }

                        });

    };
    function getPhaseData() {
        // Need to Get Data for PhaseData
        InitKendoGridPhase();

    };
    function getStatusData() {
        // Need to Get Data from SharePoint List to StatusData
        InitKendoGridStatus();

    };
    function InitKendoGridTeam() {
        $("#gridTeam").kendoGrid({
            dataSource: {
                data: gridDataTeam,

            },
            sort: [{ field: "Role", dir: "asc" }],
            height: 500,
            groupable: false,
            sortable: true,
            columns: [
            {
                field: "TeamMemberName",
                title: "Team Member",
                template: function (e) {
                    if (e.TeamMemberName == null || e.TeamMemberName == "") {
                        e.TeamMemberName = unassignedTeamMember;
                    }
                    return e.TeamMemberName;
                },
            },
            {
                field: "UserEmailAddress",
                title: "Email Address"
            },
            {
                field: "UserOfficeLocation",
                title: "Location"
            },
            {
                field: "Role",
                title: "Role"
            }
            ]
        });
    };

    function InitKendoGridPhase() {
        $("#gridPhaseChangeLog").kendoGrid({
            dataSource: {
                data: gridDataProjectPhase,
                sort: [{ field: "ModificationDate", dir: "desc" }],
            },
            height: 200,
            groupable: false,
            sortable: true,
            schema: {
                model: {
                    fields: {
                        Prv: {
                            type: "string"
                        },
                        Cur: {
                            type: "string"
                        },
                        ModificationDate: {
                            type: "date"
                        },
                        ModifiedByTitle: { type: "string" }
                    }
                }
            },
            columns: [{
                field: "Prv",
                title: "From Phase",
                headerAttributes: { "class": "wrap-header" },
                //template: "# if (PrvCapitalPhaseAbbreviation == null||PrvCapitalPhaseAbbreviation =='') { #<span>#: Prv  #</span># } else{#<span>#: Prv# - #: PrvCapitalPhaseAbbreviation#</span>#}#",
                template: function (e) {
                    var value = "";
                    if (e.Prv != null && e.Prv != "") {
                        value = "<span>" + e.Prv;
                        if (e.PrvCapitalPhaseAbbreviation != null && e.PrvCapitalPhaseAbbreviation != "") {
                            value = value + " - " + e.PrvCapitalPhaseAbbreviation;
                        }
                        if (e.PrvOEPhaseAbbreviation != null && e.PrvOEPhaseAbbreviation != "") {
                            value = value + " - " + e.PrvOEPhaseAbbreviation;
                        }
                        value = value + "</span>";
                    }
                    return value;
                }
            }, {
                field: "Cur",
                title: "To Phase",
                headerAttributes: { "class": "wrap-header" },
                // template: "# if (CurCapitalPhaseAbbreviation == null||CurCapitalPhaseAbbreviation =='') { #<span>#: Cur  #</span># } else{#<span>#: Cur# - #: CurCapitalPhaseAbbreviation#</span>#}#"
                template: function (e) {
                    var value = "";
                    if (e.Cur != null && e.Cur != "") {
                        value = "<span>" + e.Cur
                        if (e.CurCapitalPhaseAbbreviation != null && e.CurCapitalPhaseAbbreviation != "") {
                            value = value + " - " + e.CurCapitalPhaseAbbreviation;
                        }
                        if (e.CurOEPhaseAbbreviation != null && e.CurOEPhaseAbbreviation != "") {
                            value = value + " - " + e.CurOEPhaseAbbreviation;
                        }

                        value = value + "</span>";
                    }
                    return value;
                }
            },
            {
                field: "ModificationDate",
                title: "Change Date",
                headerAttributes: { "class": "wrap-header" },
                template: "#= ModificationDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(ModificationDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
            },
            {
                field: "ModifiedByTitle",
                title: "Changed By",
                headerAttributes: { "class": "wrap-header" },
            },
            ]
        });
    };
    function InitKendoGridStatus() {
        $("#gridStatusChangeLog").kendoGrid({
            dataSource: {
                data: gridDataProjectState,
                sort: [{ field: "ModificationDate", dir: "desc" }],
            },
            height: 200,
            groupable: false,
            sortable: true,
            schema: {
                model: {
                    fields: {
                        Prv: {
                            type: "string"
                        },
                        Cur: {
                            type: "string"
                        },
                        ModificationDate: {
                            type: "date"
                        },
                        ModifiedByTitle: { type: "string" }
                    }
                }
            },
            columns: [{
                field: "Prv",
                title: "From State",
                width: "20%",
                headerAttributes: { "class": "wrap-header" },
            }, {
                field: "Cur",
                title: "To State",
                width: "20%",
                headerAttributes: { "class": "wrap-header" },
            }, {
                field: "ModificationDate ",
                title: "Change Date",
                width: "20%",
                headerAttributes: { "class": "wrap-header" },
                template: "#= ModificationDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(ModificationDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
            },
            {
                field: "ModifiedByTitle",
                title: "Changed By",
                width: "40%",
                headerAttributes: { "class": "wrap-header" },
            },
            ]
        });
    };
    function getEditPhaseData() {
        try {
            if (vm.showPhase) {
                displayLoading();
                OriginalState = {};
                OriginalPhase = {};
                OriginalCapitalPhase = {};
                OriginalOEPhase = {};
                bindChangeComboBox("pjPhase");
                bindChangeComboBox("pjcapitalPhase");
                bindChangeComboBox("pjState");
                $.when(GETPostService.getDataWCF("getPhaseState/" + SeletedProjectId), GETPostService.getDataWCF("getCapitalPhase"))
                             .then(function (resphaseStatus, resCapitalPhase) {
                                 try {
                                     gridDataProjectPhase = JSON.parse(resphaseStatus.getPhaseStateResult).filter(function (item) {
                                         return item.ParLookUpName === "ProjectPhase";
                                     });
                                     gridDataProjectState = JSON.parse(resphaseStatus.getPhaseStateResult).filter(function (item) {
                                         return item.ParLookUpName === "ProjectStatus";
                                     });
                                     
                                     vm.capitalPhaseList = JSON.parse(resCapitalPhase.getCapitalPhaseResult);

                                     var SelectedprojectPhase = vm.projectPhase.filter(function (item) {
                                         return item.LookUpMemberID == vm.projectHubStatus.ProjectPhaseID;
                                     });

                                     vm.SelectedprojectPhase = SelectedprojectPhase[0];
                                     angular.copy(vm.SelectedprojectPhase, OriginalPhase);

                                     var SelectedprojectState = vm.projectState.filter(function (item) {
                                         return item.LookUpMemberID == vm.projectHubStatus.ProjectStatusID;
                                     });
                                     vm.SelectedprojectState = SelectedprojectState[0];
                                     angular.copy(vm.SelectedprojectState, OriginalState);
                                     
                                     vm.capitalPhase = vm.capitalPhaseList.filter(function (item) {
                                         return item.AssociatedPhaseID == vm.projectHubStatus.ProjectPhaseID && item.IsOEPhase==false;
                                     });
                                     vm.OEPhase = vm.capitalPhaseList.filter(function (item) {
                                         return item.AssociatedPhaseID == vm.projectHubStatus.ProjectPhaseID && item.IsOEPhase == true;
                                     });
                                     //Set current Capital Phase
                                     if (vm.projectHubStatus.CapitalPhaseID != "") {

                                         var SelectedprojectCapitalPhase = vm.capitalPhase.filter(function (entry) {
                                             return entry.CapitalPhaseID == vm.projectHubStatus.CapitalPhaseID;
                                         });
                                         vm.SelectedprojectCapitalPhase = SelectedprojectCapitalPhase[0];
                                         angular.copy(vm.SelectedprojectCapitalPhase, OriginalCapitalPhase);
                                     }
                                     else {
                                         vm.SelectedprojectCapitalPhase = null;
                                         OriginalCapitalPhase = null;
                                     }
                                     //Set current OE Phase
                                     if (vm.projectHubStatus.OEPhaseID != "") {

                                         var SelectedprojectOEPhase = vm.OEPhase.filter(function (entry) {
                                             return entry.CapitalPhaseID == vm.projectHubStatus.OEPhaseID;
                                         });
                                         vm.SelectedprojectOEPhase = SelectedprojectOEPhase[0];
                                         angular.copy(vm.SelectedprojectOEPhase,  OriginalOEPhase );
                                     }
                                     else {
                                         vm.SelectedprojectOEPhase = null;
                                         OriginalOEPhase = null;
                                     }
                                     $scope.$digest();
                                     getPhaseData();
                                     getStatusData();

                                     if (vm.Edit) {
                                         var myWindow = $("#dialogPhaseHub");
                                         myWindow.data("kendoWindow").open();
                                     }
                                     hideLoading();
                                 }
                                 catch (err) {
                                     var dataToSend = {
                                         "method": "getEditPhaseData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                     };
                                     $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                           .then(function (response) {
                                               alert(errormessage);
                                               hideLoading();
                                           });
                                 }
                             });
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "getEditPhaseData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      alert(errormessage);
                      hideLoading();
                  });
        }

    };
    function InitkGridOverAllPerformanceBulkEdit() {
        try {
            var col = [
                {      
                    template: " ",
                    field: "StatusIndicator",
                    title: " ",
                    width: "1%",
                    attributes: { class: "#:StatusIndicator#" }
                },
                {

                    field: "StatusID",
                    title: "Status",
                    values: performanceStatusBulk,
                    editor: StatusEditor
                },
                {
                    field: "KPIID",
                    title: "KPI",
                    values: primaryKpiGrid,
                    editor: KPIEditor
                },
                {
                    field: "Metric",
                    title: "Metric"
                },
                {
                    field: "CurrentState",
                    title: "Baseline",
                }, {
                    field: "TargetPerformance",
                    title: "Target Performance",
                    headerAttributes: { "class": "wrap-header" }
                },
                {
                    field: "ActualPerformance",
                    title: "Actual Performance",
                    headerAttributes: { "class": "wrap-header" }
                },
                {
                    field: "IncludeInProjectDashboard",
                    title: "Include In Project Dashboard Report (Max 3)",
                    headerAttributes: { "class": "wrap-header" },
                    template: function (e) {
                        //
                        //if (vm.isEditable == false) {
                        //    if (e.IncludeInProjectDashboard == true) {
                        //        return dirtyField(e, 'IncludeInProjectDashboard') + '<input disabled="disabled" checked type="checkbox" class="successchkbx" />';
                        //    }
                        //    else {
                        //        return dirtyField(e, 'IncludeInProjectDashboard') + '<input disabled="disabled" type="checkbox" class="successchkbx" />';
                        //    }
                        //}
                        //else {
                            if (e.IncludeInProjectDashboard == true) {
                                return dirtyField(e, 'IncludeInProjectDashboard') + '<input type="checkbox" checked class="successchkbx" />';
                            }
                            else {
                                return dirtyField(e, 'IncludeInProjectDashboard') + '<input type="checkbox" class="successchkbx" />';
                            }
                       // }
                    }
                },
                {                    
                    command: [{
                        name: " ",
                        iconClass: "k-icon k-i-close",
                        width: "10%",
                        click: function (e) {
                            try {
                                // prevent page scroll position change
                                if (!confirm(gridDeleteMessage))
                                    e.preventDefault();
                                else {
                                    e.preventDefault();
                                    // e.target is the DOM element representing the button
                                    var tr = $(e.target).closest("tr"); // get the current table row (tr)
                                    // get the data bound to the current table row
                                    var data = this.dataItem(tr);
                                    if (data.KeySuccessUniqueID != 'undefined' && data.KeySuccessUniqueID != "")
                                        vm.deletedPerformanceData.push({ "KeySuccessUniqueID": data.KeySuccessUniqueID });

                                    var grid = $("#OverallStatusPerformanceBulkEdit").data("kendoGrid");
                                    grid.removeRow(tr);

                                    $scope.$digest();
                                }
                            }
                            catch (err) {
                                hideLoading();
                                var dataToSend = {
                                    "method": "InitkGridOverAllPerformance", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                };
                                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                    .then(function (response) { alert(errormessage); });
                            }
                        }
                    }]
                }
            ];
            var dataSource1 = new kendo.data.DataSource({
                transport: {
                    read: function (e) {
                        // on success
                        e.success(gridDataKeySuccess);
                    }
                },
                // data: gridDataKeySuccess,
                batch: true,
                //pageSize: 20,
                schema: {
                    model: {
                        id: "KeySuccessUniqueID",
                        fields: {
                            KeySuccessUniqueID: { editable: false, nullable: true },
                            StatusIndicator: { type: "string", editable: false },
                            StatusID: { type: "string" },
                            KPIID: { type: "string" },
                            Metric: { type: "string" },
                            CurrentState: { type: "string" },
                            TargetPerformance: { type: "string" },
                            ActualPerformance: { type: "string" },
                            IncludeInProjectDashboard: { type: "boolean" }
                        }
                    }
                },
            });
            $("#OverallStatusPerformanceBulkEdit").kendoGrid({
                dataSource: dataSource1,
                columns: col,
                navigatable: true,
                editable: {
                    createAt: "bottom"
                },
                dataBound: function () {
                    $(".successchkbx").bind("change", function (e) {
                        var grid = $("#OverallStatusPerformanceBulkEdit").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));

                        var cell = e.target.closest('td');
                        $(cell).prepend("<span class='k-dirty'></span>");
                        if (dataItem!=null)
                            dataItem.set("IncludeInProjectDashboard", this.checked);
                        //dataItem.dirty = true;
                    });
                }

            });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "OverallStatusPerformanceBulkEdit", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    };
    function KPIEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: primaryKpiGrid,
                change: function (e) {
                                var widget = e.sender;

                                if (widget.value() && widget.select() === -1) {
                                    //custom has been selected
                                    widget.value(""); //reset widget
                                }
                },
                select: function (e) {
                    var widget = e.sender;

                    if (widget.value() && widget.select() === -1) {
                        //custom has been selected
                        widget.select("-1"); //reset widget
                    }
                },

            });
    };
    function StatusEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: performanceStatusBulk,
                change: function (e) {
                    var widget = e.sender;

                    if (widget.select() === -1) {
                        var grid = e.sender.element.closest(".k-grid").data("kendoGrid");
                        var row = e.sender.element.closest("tr");
                        var dataItem = grid.dataItem(row);
                        widget.value(""); //reset widget
                        var StatusColor = "Grey";
                        var row1 = grid.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                        var newRow = row1.find('td:eq(0)');
                        newRow.removeClass(dataItem.StatusIndicator);

                        row1.find('td:eq(0)').addClass(StatusColor);
                        dataItem["StatusIndicator"] = StatusColor;
                        dataItem["StatusID"] = "";
                    }
                },
                select: function (e) {
                    var widget = e.sender;
                    var grid = e.sender.element.closest(".k-grid").data("kendoGrid");
                    var row = e.sender.element.closest("tr");
                    var dataItem = grid.dataItem(row);
                    
                    var StatusColor =vm.performStatus.filter(function (entry) {
                        return entry.LookUpMemberName === e.sender.dataItem(e.item).text;
                    })[0].OtherAttribute;
                    
                    if ((widget.select() === -1 && StatusColor=="") || (e.sender.dataItem(e.item).text == "" && StatusColor=="")) {
                        //custom has been selected
                        widget.value("");   
                        StatusColor = "Grey";
                    }

                          
                        var row1 = grid.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                        var newRow = row1.find('td:eq(0)');
                        newRow.removeClass(dataItem.StatusIndicator);
                       
                        row1.find('td:eq(0)').addClass(StatusColor);
                        dataItem["StatusIndicator"] = StatusColor;
                     
                },

            });
    };
    function ProjectTeamBulkEdit() {
        var window = $("#dialogProjectTeamBulkEdit");
        var dsTeam = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(gridDataTeam);
                },
                update: function (e) {
                    displayLoading();
                    try {
                        for (var i = 0; i < e.data.models.length; i++) {
                            var teamMember;
                            e.data.models[i].TeamMemberName = null;
                            if (e.data.models[i].TeamMemberAdId != null) {
                                teamMember = projectTeam.filter(function (entry) {
                                    return entry.value === e.data.models[i].TeamMemberAdId;
                                });

                                e.data.models[i].TeamMemberName = teamMember.length > 0 ? teamMember[0].text : null
                            }

                        }
                        var jsonlistdata = kendo.stringify(e.data.models);
                        var finaldata = JSON.stringify({
                            "ProjectTeam": JSON.parse(jsonlistdata)
                        });
                        GETPostService.postDataWCF('updateProjectTeamData ', finaldata).then(function (response) {
                            if (response.updateProjectTeamDataResult == "Success") {
                                e.success(e.data.models);
                                hideLoading();
                                getDataForTeam();
                                GetProjectHubStatusForDataQuality();
                                gridDataSaved = true;
                                window.data("kendoWindow").close();
                                //alert("Success");
                            }
                            else {
                                e.error(gridDataTeam);
                                alert("Error occurred in item updation for project team.");
                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "ProjectTeamBulkEdit(update)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) {
                                  alert(errormessage);
                                  e.error(gridDataTeam);
                                  window.data("kendoWindow").close();
                              });
                    }
                },
                destroy: function (e) {
                    try {
                        var jsonlistdata = kendo.stringify(e.data.models);
                        var finaldata = JSON.stringify({
                            "ProjectTeam": JSON.parse(jsonlistdata)
                        });
                        GETPostService.postDataWCF('deleteProjectTeamData', finaldata).then(function (response) {
                            //alert(response);
                            if (response.deleteProjectTeamDataResult == "Success") {
                                e.success(e.data.models);
                                getDataForTeam();
                                GetProjectHubStatusForDataQuality();
                                gridDataSaved = true;
                                window.data("kendoWindow").close();

                            }
                            else {
                                e.error(gridDataTeam);
                                alert("Error occurred in item deletion for project team.");
                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "ProjectTeamBulkEdit(delete)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) {
                                  alert(errormessage);
                                  e.error(gridDataTeam);
                                  window.data("kendoWindow").close();
                              });
                    }
                },
                create: function (e) {
                    displayLoading();
                    try {
                        var listdata = [];
                        for (var i = 0; i < e.data.models.length; i++) {
                            var teamMember;
                            if (e.data.models[i].TeamMemberAdId != null) {
                                teamMember = projectTeam.filter(function (entry) {
                                    return entry.value === e.data.models[i].TeamMemberAdId;
                                });
                            }
                            var teamData = {
                                ProblemUniqueID: SeletedProjectId,
                                ProjectTeamUniqueID: NewGuid(),
                                TeamMemberAdId: e.data.models[i].TeamMemberAdId != null ? e.data.models[i].TeamMemberAdId : null,
                                TeamMemberName: teamMember.length > 0 ? teamMember[0].text : null,
                                RoleID: e.data.models[i].RoleID != null ? e.data.models[i].RoleID : null,
                                TeamPermissionID: e.data.models[i].TeamPermissionID != null ? e.data.models[i].TeamPermissionID : null,
                            };
                            listdata.push(teamData);
                        }

                        var finaldata = JSON.stringify({
                            "ProjectTeam": listdata
                        });
                        GETPostService.postDataWCF('InsertProjectTeam', finaldata).then(function (response) {
                            if (response.insertProjectTeamResult == "Success") {
                                e.success(listdata);
                                hideLoading();
                                getDataForTeam();
                                GetProjectHubStatusForDataQuality();
                                gridDataSaved = true;
                                window.data("kendoWindow").close();

                            }
                            else {
                                e.error(gridDataTeam);
                                alert("Error occurred in item insertion for project team.");
                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "ProjectTeamBulkEdit(create)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) {
                                  alert(errormessage);
                                  e.error(gridDataTeam);
                                  window.data("kendoWindow").close();
                              });
                    }

                }

            },
            batch: true,
            sort: [{ field: "Role", dir: "asc" }],
            navigatable: true,
            schema: {
                model: {
                    id: 'ProjectTeamUniqueID',
                    fields: {
                        ProblemUniqueID: { editable: false, hidden: true, defaultValue: SeletedProjectId },
                        ProjectTeamUniqueID: { editable: false, hidden: true },
                        RoleID: { type: "string" },
                        Role: { type: "string" },
                        TeamMemberAdId: { type: "string" },
                        TeamMemberName: { type: "string" },
                        TeamPermissionID: { type: "string" },
                    }
                }
            }
        });

        var colTeam = [{
            field: "ProjectTeamUniqueID",
            title: "Id",
            hidden: true
        },
                    {
                        field: "ProjectID",
                        title: "ProjectID",
                        editable: false, hidden: true,
                    },

                    {
                        field: "RoleID",
                        title: "Role",
                        values: rolesBulk,
                        editor: roleDropDownEditor
                    },
                    {
                        field: "TeamMemberAdId",
                        title: "Team Member",
                        editor: teamuserDropDownEditor,
                        values: projectTeam,
                        template: function (e) {
                            e.TeamMemberName = unassignedTeamMember;
                            if (e.TeamMemberAdId != null) {
                                var teamMember;
                                teamMember = projectTeam.filter(function (entry) {
                                    return entry.value == e.TeamMemberAdId;
                                });
                                if (teamMember.length > 0) {
                                    e.TeamMemberName = teamMember[0].text;
                                }
                                else {
                                    e.TeamMemberName = unassignedTeamMember;
                                    e.TeamMemberAdId = "";
                                }
                            }
                            return e.TeamMemberName;
                        },
                    },
                    {
                        field: "TeamPermissionID",
                        title: "Permission",
                        values: permissionbulk
                    },
                    {
                        command: [{ name: "destroy", text: " " }], title: " ", width: "5%"
                    }
        ];
        var grid = $("#gridTeamBulkEdit").kendoGrid({
            dataSource: dsTeam,
            height: 400,
            batch: true,
            selectable: true,
            navigatable: true,
            toolbar: [{ name: "create", text: "Add New" }, { name: "save", text: "Save" }, { name: "cancel", text: "Cancel" }],
            columns: colTeam,
            editable: true,
            edit: function (e) {
                var grid = this;
                var roleId = e.model.RoleID;
                var userID = e.model.TeamMemberAdId;
                var permission = e.model.TeamPermissionID;
                var fieldName = grid.columns[e.container.index()].field;
                if (fieldName == "RoleID") {
                    if (roleId == projectmanager || roleId == projectSponsor) {
                        this.closeCell();
                    }
                }
                if (!vm.projectHubStatus.IsConfidential) {
                    if (fieldName == "TeamPermissionID") {
                        var membergroups = usergroups.filter(function (item) {
                            return item.UserADId == userID;
                        });
                       // if (membergroups.length == 0)
                        if (membergroups.length > 0) {
                            this.closeCell();
                        }
                    }
                }

                if (e.container.find('[name="TeamMemberAdId"]').data('kendoComboBox') != undefined) {
                    e.container.find('[name="TeamMemberAdId"]').data('kendoComboBox').bind('change', function () {
                        var membergroups = usergroups.filter(function (item) {
                            return item.UserADId == e.model.TeamMemberAdId;
                        });
                        if (!vm.projectHubStatus.IsConfidential) {
                            if (membergroups.length > 0) {
                                var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                                //dataItem.set("TeamPermissionID", readonly);
                                dataItem.set("TeamPermissionID", readwrite);
                            }
                            else {
                                var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                                //  dataItem.set("TeamPermissionID", readwrite);
                                dataItem.set("TeamPermissionID", readonly);
                            }
                        }
                        else {
                            var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                            dataItem.set("TeamPermissionID", readonly);
                        }

                    });
                }
            },
            saveChanges: function (e) {
                GetProjectHubStatusForDataQuality();
                var grid = $("#gridTeamBulkEdit").data("kendoGrid");
                if (!grid.dataSource.hasChanges()) {
                    window.data("kendoWindow").close();
                }

            }


        }).data("kendoGrid");
        $('#gridTeamBulkEdit .k-grid-cancel-changes').unbind('click').on('click', function (e) {
            gridCancelEvent("#dialogProjectTeamBulkEdit", e)
        });
        $("#gridTeamBulkEdit table").on("keydown", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                var hasCombo = $(e.target).closest(".k-combobox").length;
                if (hasCombo) {
                    grid.editCell(grid.current());
                    $("[data-role='combobox']").data("kendoComboBox").dataSource.read();
                }
            }
        });
    };
    function roleDropDownEditor(container, options) {
        $('<input class="peoplePickerNoImage" name="' + options.field + '"/>') // kendoDropDownList
          .appendTo(container)
          .kendoComboBox({
              autoBind: false,
              dataTextField: "text",
              dataValueField: "value",
              filter: "contains",
              valuePrimitive: true,
              dataSource: rolesBulk,
              select: function (e) {
                  if (e.dataItem.isDisabled) {
                      e.preventDefault();
                  }
                  e.dataItem.set("isDisabled", true);
              },
              template: "# if (isDisabled) { #<span class='k-state-disabled peoplePickerNoImage'>#: text#</span># } else{#<span class='peoplePickerNoImage'>#: text#</span>#}#"
          });
    };
    function teamuserDropDownEditor(container, options) {
        $('<input name="' + options.field + '" id="' + options.field + '"/>') // kendoDropDownList
                            .appendTo(container)
                            .kendoComboBox({
                                autoBind: false,
                                minLength: 3,
                                filtering: function (e) {
                                    e.preventDefault();
                                },
                                placeholder: peoplepickerPlaceholder,
                                dataTextField: "text",
                                dataValueField: "value",
                                valuePrimitive: true,
                                filter: "contains",
                                dataSource: projectTeam,
                                change: function (e) {
                                    if (e.sender.selectedIndex != -1) {
                                        var user = projectTeam.filter(function (val) {
                                            return val.value == e.sender.dataItem(e.item).value;
                                        });
                                        if (user.length == 0) {
                                            projectTeam.push({
                                                text: e.sender.dataItem(e.item).text, value: e.sender.dataItem(e.item).value, UserCountry: e.sender.dataItem(e.item).UserCountry,
                                                UserImageUrl: e.sender.dataItem(e.item).UserImageUrl, UserEmailAddress: e.sender.dataItem(e.item).UserEmailAddress, UserDepartment: e.sender.dataItem(e.item).UserDepartment
                                            });
                                        }
                                    }
                                },
                                //select: function (e) {
                                //    if (e.dataItem != null) {
                                //        var user = projectTeam.filter(function (val) {
                                //            return val.value === e.dataItem.value;
                                //        });
                                //        if (user.length == 0) {
                                //            projectTeam.push({
                                //                text: e.dataItem.text, value: e.dataItem.value, UserCountry: e.dataItem.UserCountry,
                                //                UserImageUrl: e.dataItem.UserImageUrl, UserEmailAddress: e.dataItem.UserEmailAddress, UserDepartment: e.dataItem.UserDepartment
                                //            });
                                //        }
                                //    }
                                //},
                                valueTemplate: '<span class="selected-value" style="background-image:url(#: UserImageUrl#)"></span><span>#: text#</span>',
                                template: "<span class='k-state-default' style=background-image:url(#: UserImageUrl#)></span><span class='k-state-default'><h3>#: text#</h3># if (UserEmailAddress != null) {#<p>#: UserEmailAddress#</p># } if (UserDepartment != null) {# <p><span> #:UserDepartment#</span># }if (UserCountry != null) {# <span>#:UserCountry#</span></p># } #</span>"
                            });

        $("#" + options.field).data("kendoComboBox").input.on('keydown', function (e) {
            GETPostService.searchPeopleBulkEdit(e, e.currentTarget.name.replace("_input", "")).then(function (response) {
                try {
                    if (response.length > 0) {
                        var resources = [];
                        angular.copy(projectTeam, resources);
                        angular.forEach(response, function (item, index) {
                            var user = projectTeam.filter(function (val) {
                                return val.value === item.UserADId;
                            });
                            if (user.length == 0) {
                                resources.push({
                                    text: item.UserDisplayName, value: item.UserADId, UserCountry: item.UserCountry,
                                    UserImageUrl: item.UserImageUrl, UserEmailAddress: item.UserEmailAddress, UserDepartment: item.UserDepartment
                                });
                            }
                        });
                        resources.reverse();
                        var combobox = $("#" + options.field).data("kendoComboBox");
                        combobox.setDataSource(resources);
                        combobox.dataSource.read();
                        //$("#gridTeamBulkEdit").getKendoGrid().columns[3].values = resources;
                    }
                }
                catch (err) {
                    var dataToSend = {
                        "method": "teamuserDropDownEditor", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                          .then(function (response) {
                              // alert(errormessage);
                          });
                }
            });

        });
    };
    function SetDefaultOverallStatus() {
        OriginalOverallStatus = {};
        angular.copy(vm.overAllData, OriginalOverallStatus);
        if (vm.overAllData != null || vm.overAllData != undefined) {
            var statuslist = $("#overallstatus").data("kendoComboBox");
            statuslist.value(vm.overAllData.OverallStatusID);
            statuslist.refresh();
            vm.overAllData.StatusThrough = vm.todayDate;
        }
        else {
            vm.overAllData = {};
            vm.overAllData.StatusThrough = vm.todayDate;
            angular.copy(vm.overAllData, OriginalOverallStatus);
        }
    }
    function ShowPermission() {
        try {
            //var selectedMember = vm.projectTeam.Member.UserADId
            if ($("#teamuser").data("kendoComboBox") != null) {
                if ($("#teamuser").data("kendoComboBox").selectedIndex == -1) {
                    vm.projectTeam.permission = null;
                    $("#permission").data("kendoDropDownList").enable();
                    $scope.$digest();
                    return;
                }
                else {
                    var selectedMember;
                    selectedMember = $("#teamuser").data("kendoComboBox").value();
                    if (vm.projectHubStatus.IsConfidential) {
                        var selectedpermission = vm.teamPermissions.filter(function (entry) {
                            return entry.LookUpMemberID == readonly;
                        });
                        vm.projectTeam.permission = selectedpermission[0];
                        $("#permission").data("kendoDropDownList").enable();
                    }
                    else {
                        var membergroups = usergroups.filter(function (item) {
                            return item.UserADId == selectedMember;
                        });
                        if (membergroups != null) {
                            if (membergroups.length > 0) {
                                //var selectedpermission = vm.teamPermissions.filter(function (entry) {
                                //    return entry.LookUpMemberID == readonly;
                                //});
                                //vm.projectTeam.permission = selectedpermission[0];
                                //$("#permission").data("kendoDropDownList").enable();
                                var selectedpermission = vm.teamPermissions.filter(function (entry) {
                                    return entry.LookUpMemberID == readwrite;
                                });
                                vm.projectTeam.permission = selectedpermission[0];
                                $("#permission").data("kendoDropDownList").enable(false);
                            }
                            else {
                                //var selectedpermission = vm.teamPermissions.filter(function (entry) {
                                //    return entry.LookUpMemberID == readwrite;
                                //});
                                //vm.projectTeam.permission = selectedpermission[0];
                                //$("#permission").data("kendoDropDownList").enable(false);
                                var selectedpermission = vm.teamPermissions.filter(function (entry) {
                                    return entry.LookUpMemberID == readonly;
                                });
                                vm.projectTeam.permission = selectedpermission[0];
                                $("#permission").data("kendoDropDownList").enable();

                            }

                        }

                    }
                    $scope.$digest();
                }
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "ShowPermission", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      // alert(errormessage);
                  });
        }
    }
    function OpenNewRoleDialog() {
        OriginalProjectTeam = {};
        vm.projectTeam.permission = null;
        angular.copy(vm.projectTeam, OriginalProjectTeam);
        var userlist = $("#teamuser").data("kendoComboBox");
        userlist.setDataSource(userlist);
        userlist.value([]);
        $("#permission").data("kendoDropDownList").enable();
        var myWindow = $("#dialogNewRole");
        myWindow.data("kendoWindow").open();
    };
    function getCapitalPhase() {
        if (vm.SelectedprojectPhase != null) {
            vm.capitalPhase = vm.capitalPhaseList.filter(function (item) {
                return item.AssociatedPhaseID === vm.SelectedprojectPhase.LookUpMemberID && item.IsOEPhase == false;
            });
            vm.OEPhase = vm.capitalPhaseList.filter(function (item) {
                return item.AssociatedPhaseID === vm.SelectedprojectPhase.LookUpMemberID && item.IsOEPhase == true;
            });
        }
        else { vm.capitalPhase = null; vm.OEPhase = null;}
        vm.SelectedprojectOEPhase = null;
        vm.SelectedprojectCapitalPhase = null;
    }
    function GetProjectHubStatusForDataQuality() {
        $.when(GETPostService.getDataWCF("getProjectHubStatus/" + SeletedProjectId))
            .then(function (resStatus) {
                
                    var projecthubStatus = JSON.parse(resStatus.getProjectHubStatusResult);
                    vm.projectHubStatus = projecthubStatus[0];
                });
    }
    function GetProjectHubStatus() {
        try {
            $.when(GETPostService.getDataWCF("getProjectHubStatus/" + SeletedProjectId))
                   .then(function (resStatus) {
                       try {
                           var projecthubStatus = JSON.parse(resStatus.getProjectHubStatusResult);
                           vm.projectHubStatus = projecthubStatus[0];
                           if (vm.projectHubStatus != null || vm.projectHubStatus != undefined) {
                               SetProjectSPOTLightIndicator();
                               SetProjectPhase();
                               if (vm.projectHubStatus.IsArchived) {
                                   vm.IsActive = "arrow-grey-dark";
                               }
                               else { vm.IsActive = ""; }
                               vm.ProjectName = vm.projectHubStatus.ProjectName;
                           }
                           $scope.$digest();
                       }
                       catch (err) {
                           var dataToSend = {
                               "method": "GetProjectHubStatus", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                           };
                           $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                 .then(function (response) {
                                     alert(errormessage);
                                 });
                       }
                   });
        }
        catch (err) {
            var dataToSend = {
                "method": "GetProjectHubStatus", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      // alert(errormessage);
                  });
        }
    }
    function AskNeedIncludeInReport() {
        askNeedIncludeReportValid = true;
        if (vm.askNeed.IncludeInReport != null) {
            if (vm.askNeed.IncludeInReport) {
                countDashoardAskNeedform = countDashoardAskNeedform + 1;
                if (countDashoardAskNeedform > askNeedIncludeReportCount) {
                    alert(includeReportMessageForAskNeed);
                    askNeedIncludeReportValid = false;
                }
            }
            else {
                countDashoardAskNeedform = countDashoardAskNeedform - 1;
                if (countDashoardAskNeedform > askNeedIncludeReportCount) {
                    alert(includeReportMessageForAskNeed);
                    askNeedIncludeReportValid = false;
                }
            }
        }
    }
    function MilestoneIncludeInReport() {
        milestoneIncludeReportValid = true;
        if (vm.schedule.IncludeInReport != null) {
            if (vm.schedule.IncludeInReport) {
                countDashoardMilestoneform = countDashoardMilestoneform + 1;
                if (countDashoardMilestoneform > milestoneIncludeReportCount) {
                    alert(includeReportMessageForMilestone);
                    milestoneIncludeReportValid = false;
                }
            }
            else {
                countDashoardMilestoneform = countDashoardMilestoneform - 1;
                if (countDashoardMilestoneform > milestoneIncludeReportCount) {
                    alert(includeReportMessageForMilestone);
                    milestoneIncludeReportValid = false;
                }
            }
        }
    }

    function RiskIssueIncludeInReport() {
        riskIncludeReportValid = true;
        if (vm.riskIssue.IncludeInReport != null) {
            if (vm.riskIssue.IncludeInReport) {
                countDashoardRiskIssueform = countDashoardRiskIssueform + 1;
                if (countDashoardRiskIssueform > riskIssueIncludeReportCount) {
                    alert(includeReportMessageForRisk);
                    riskIncludeReportValid = false;
                }
            }
            else {
                countDashoardRiskIssueform = countDashoardRiskIssueform - 1;
                if (countDashoardRiskIssueform > riskIssueIncludeReportCount) {
                    alert(includeReportMessageForRisk);
                    riskIncludeReportValid = false;
                }
            }
        }
    }
    function DialogCloseBinding() {
        $("#dialogPhaseHub").data("kendoWindow").bind("close", function (e) {
            if (saveData == 0) {
                if (angular.equals(OriginalPhase, vm.SelectedprojectPhase) == false || angular.equals(OriginalCapitalPhase, vm.SelectedprojectCapitalPhase) == false || angular.equals(OriginalOEPhase, vm.SelectedprojectOEPhase) == false || angular.equals(OriginalState, vm.SelectedprojectState) == false) {
                    if (!confirm(dialogCloseMessage))
                        e.preventDefault();
                    else {
                        vm.Phase = [];
                    }
                }
                else {
                    vm.Phase = [];
                }
            }
            saveData = 0
        });

        $("#dialogRiskIssue").data("kendoWindow").bind("close", function (e) {
            if (saveData == 0) {
                if ($("#riskowner").data("kendoComboBox") != null && ($("#riskowner").data("kendoComboBox").value() != "" && $("#riskowner").data("kendoComboBox").value() != null)) {
                    vm.riskIssue.OwnerID = $("#riskowner").data("kendoComboBox").value();
                    vm.riskIssue.OwnerName = $("#riskowner").data("kendoComboBox").text();
                }
                if (angular.equals(OriginalRiskObj, vm.riskIssue) == false) {

                    if (!confirm(dialogCloseMessage))
                        e.preventDefault();
                    else {
                        vm.riskIssue = {};
                        OriginalRiskObj = {};
                        vm.riskIssue.LogDate = vm.todayDate;
                    }

                }
                else {
                    vm.riskIssue = {};
                    OriginalRiskObj = {};
                    vm.riskIssue.LogDate = vm.todayDate;
                }
            }
            else {
                vm.riskIssue = {};
                OriginalRiskObj = {};
                vm.riskIssue.LogDate = vm.todayDate;
            }
            saveData = 0;
            vm.logDateError = false;
            vm.closeDateError = false;
            vm.dueDateError = false;
            vm.showRiskIncludeReport = true;
            vm.riskIssueTitle = vm.ProblemID + " - " + vm.ProjectName;
        });

        $("#dialogAskNeed").data("kendoWindow").bind("close", function (e) {
            if (saveData == 0) {
                if ($("#needfromUser").data("kendoComboBox") != null && ($("#needfromUser").data("kendoComboBox").value() != "" && $("#needfromUser").data("kendoComboBox").value() != null)) {
                    vm.askNeed.NeedFromID = $("#needfromUser").data("kendoComboBox").value();
                    vm.askNeed.NeedFromName = $("#needfromUser").data("kendoComboBox").text();
                }
                if (angular.equals(OriginalAskObj, vm.askNeed) == false) {
                    if (!confirm(dialogCloseMessage))
                        e.preventDefault();
                    else {
                        vm.askNeed = {};
                        vm.askNeed.LogDate = vm.todayDate
                    }
                }
                else {
                    vm.askNeed = {};
                    vm.askNeed.LogDate = vm.todayDate
                }
            }
            else {
                vm.askNeed = {};
                vm.askNeed.LogDate = vm.todayDate
            }
            saveData = 0;
            vm.needByDateError = false;
            vm.askCloseDateError = false;
            vm.askLogDateError = false;
            vm.showAskNeedIncludeReport = true;
            vm.askNeedTitle = vm.ProblemID + " - " + vm.ProjectName;
        });
        $("#dialogOverallStatus").data("kendoWindow").bind("close", function (e) {
            if (saveData == 0) {
                if (angular.equals(OriginalOverallStatus, vm.overAllData) == false) {
                    angular.copy(vm.OverAllDataMain, vm.overAllData);
                    if (!confirm(dialogCloseMessage))
                        e.preventDefault();
                }
            }
            vm.statusDateError = false;
        });
        $("#dialogMilestone").data("kendoWindow").bind("close", function (e) {
            if (saveData == 0) {
                if (angular.equals(OriginalScheduleObj, vm.schedule) == false) {
                    if (!confirm(dialogCloseMessage))
                        e.preventDefault();
                    else {
                        vm.schedule = {};
                    }
                }
                else {
                    vm.schedule = {};
                }
            }
            else {
                vm.schedule = {};
            }
            saveData = 0;
            vm.completeDateError = false;
            vm.plannedFinishError = false;
            vm.showMilestoneIncludeReport = true;
            vm.scheduleTitle = vm.ProblemID + " - " + vm.ProjectName;
            $('#validationcompletionDate').html(vm.dateErrorMsg);
        });

    }
    function ProjectPhaseStateClose(windowname) {
        var digname = "#" + windowname;
        var myWindow = $(digname);
        myWindow.data("kendoWindow").close();
        //if (saveData == 0) {
        //    if (!confirm(dialogCloseMessage))
        //        e.preventDefault();
        //    else {
        //        vm.Phase = [];
        //        myWindow.data("kendoWindow").close();
        //    }
        //}
        //else {
        //    vm.Phase = [];
        //    myWindow.data("kendoWindow").close();
        //}
        //saveData == 0

    }
    function gridCancelEvent(windowname, e) {
        try {
            e.preventDefault();
            e.stopPropagation();
            var gridId = e.currentTarget.offsetParent.id
            var window = $(windowname);
            var grid = $('#' + gridId).data('kendoGrid');
            if (grid.dataSource.hasChanges()) {
                if (!confirm(dialogCancelMessage)) {
                    e.preventDefault();
                }
                else {
                    grid.dataSource.cancelChanges();
                    grid.dataSource.read();
                    window.data("kendoWindow").close();
                }
            }
            else {
                window.data("kendoWindow").close();
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "gridCancelEvent", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      // alert(errormessage);
                  });
        }
    }
    function gridCloseEvent(gridId, e) {
        try {
            if (!gridDataSaved) {
                var grid = $('#' + gridId).data('kendoGrid');
                document.activeElement.blur();
                if (grid.dataSource.hasChanges()) {
                    if (!confirm(dialogCancelMessage)) {
                        e.preventDefault();
                    }
                    else {
                        grid.dataSource.cancelChanges();
                        grid.dataSource.read();
                    }
                }
            }
            else {
                gridDataSaved = false;
            }

        }
        catch (err) {
            var dataToSend = {
                "method": "gridCloseEvent", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      // alert(errormessage);
                  });
        }
    }
    //Associated Projects
    function getAssociatedProjects() {
        trackEvent("Project Hub associated projects tab");
        //aisdk.trackEvent({ name: "Project Hub associated projects tab" });
        displayLoading();
        try {
            if (associatedProjectFirstLoad == 1) {
                InitKendoGridAssociatedProj();
                associatedProjectFirstLoad = 0;
            }

            $.when(GETPostService.postDataWCFAsync("getAssociatedProjects", SeletedProjectId))
                .then(function (resAssociatedProj) {
                    try {
                        vm.associatedProjList = JSON.parse(resAssociatedProj.getAssociatedProjectsResult);
                        var tree1 = $("#treelistAssociatedProject").data("kendoTreeList");

                        var dsNew = new kendo.data.TreeListDataSource({
                            data: vm.associatedProjList,
                            sort: [{
                                field: "ProjectName",
                                dir: "asc"
                            }],
                            schema: {
                                model: {
                                    id: "ProblemUniqueID",
                                    fields: {
                                        ProblemUniqueID: { type: "string" },
                                        ProjectName: {
                                            type: "string"
                                        },
                                        ActualCompletedMilestones: { type: "decimal" },
                                        TargetToComplete: { type: "decimal" },
                                        TotalMilestone: { type: "decimal" },
                                    }
                                }
                            }
                        });
                        tree1.setDataSource(dsNew);
                        emptyChildDropDown();
                        var treeList = $("#treelistAssociatedProject").data("kendoTreeList");
                        var rows = $("tr.k-treelist-group", treeList.tbody);
                        var treeArray = treeList.dataItems();
                        $.each(rows, function (idx, row) {
                            treeList.expand(row);
                            //var prjId = treeArray[idx].ProblemUniqueID;
                            //var rowe = $(row);
                            //if (prjId == SeletedProjectId) {
                            //    rowe.addClass("mudYellow");
                            //}
                        });

                        //  var LeafRows = $("tr.k-alt", treeList.tbody);

                        //$.each(LeafRows, function (idx, row) {
                        //    var prjId = treeArray[idx].ProblemUniqueID;
                        //    var rowe = $(row);
                        //    if (prjId == SeletedProjectId) {
                        //        rowe.addClass("mudYellow");
                        //    }
                        //});

                        var rowsA = $("#treelistAssociatedProject").find('tr');
                        rowsA.each(function (index, row) {
                            if (index != 0) {
                                var idx = index - 1;
                                var a = treeArray[idx];
                                if (a != undefined) {
                                    if (a.ProblemUniqueID == SeletedProjectId) {
                                        $(row).addClass("mudYellow");
                                    }
                                }
                                var r = $(row);
                                r.find(".chartPercentageCompleteAssociate").each(function () {
                                    //var grid = this;
                                    //$(".chartPercentageCompleteAssociate").each(function () {
                                    var chart = $(this);
                                    var tr = chart.closest('tr');
                                    var model = a;//grid.dataItem(tr);
                                    chart.kendoChart({
                                        series: [{
                                            type: "bullet",
                                            data: [[model.ActualCompletedMilestones, model.TargetToComplete]]
                                        }],
                                        chartArea: {
                                            margin: {
                                                left: 0
                                            }
                                        },

                                        valueAxis: {
                                            min: 0,
                                            max: model.TotalMilestone,
                                            line: {
                                                visible: false
                                            },
                                            labels: {
                                                visible: false
                                            },
                                            majorGridLines: {
                                                visible: false
                                            }
                                        },
                                        tooltip: {
                                            visible: true,
                                            template: "target: #= value.target # <br /> completed: #= value.current #"
                                        }
                                    });
                                });



                            }
                        });
                        //if (treeArray[index].ProblemUniqueID == SeletedProjectId) {
                        //    $(row).addClass("mudYellow");
                        //}
                        //var dataItem = treeList.dataItem(row);
                        //if (dataItem.ProblemUniqueID == SeletedProjectId) {
                        //    $(row).addClass("mudYellow");
                        //}

                        // });

                        $scope.$digest();
                        hideLoading();
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "getAssociatedProjects", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) { alert(errormessage) });
                        hideLoading();
                    }
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "getAssociatedProjects", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }

    }

    //Initialize Associated Project Grid
    function InitKendoGridAssociatedProj() {
        try {
            var colo = col_ProgramHub_treelistAssociatedProject();

            $("#treelistAssociatedProject").kendoTreeList({
                dataSource: {
                    data: vm.associatedProjList,
                    sort: [{
                        field: "ProjectName",
                        dir: "asc"
                    }],
                    schema: {
                        model: {
                            id: "ProblemUniqueID",
                            expanded: true,
                            fields: {
                                ProjectName: {
                                    type: "string"
                                },
                            },
                        }
                    }
                },
                height: 400,
                columns: colo,
                expand: function (e) {
                    setTimeout(function () {
                        var rows = e.sender.tbody.children();
                        for (var j = 0; j < rows.length; j++) {
                            var row = $(rows[j]);
                            var dataItem = e.sender.dataItem(row);
                            if (dataItem.ProblemUniqueID == SeletedProjectId) {
                                row.addClass("mudYellow");
                            }
                        }
                    }, 0);
                },
                dataBound: function (e) {
                    //console.log(this);
                    //  var rows = e.sender.tbody.children();

                    var grid = this;
                    //$(".chartPercentageCompleteAssociate").each(function () {
                    //    var chart = $(this);
                    //    var tr = chart.closest('tr');
                    //    var model = grid.dataItem(tr);
                    //    chart.kendoChart({
                    //        series: [{
                    //            type: "bullet",
                    //            data: [[model.ActualCompletedMilestones, model.TargetToComplete]]
                    //        }],
                    //        chartArea: {
                    //            margin: {
                    //                left: 0
                    //            }
                    //        },

                    //        valueAxis: {
                    //            min: 0,
                    //            max: model.TotalMilestone,
                    //            line: {
                    //                visible: false
                    //            },
                    //            labels: {
                    //                visible: false
                    //            },
                    //            majorGridLines: {
                    //                visible: false
                    //            }
                    //        },
                    //        tooltip: {
                    //            visible: true,
                    //            template: "target: #= value.target # <br /> completed: #= value.current #"
                    //        }
                    //    });
                    //});

                    var rows = e.sender.content.find('tr');
                    rows.each(function (index, row) {
                        var dataItem = e.sender.dataItem(row);
                        if (dataItem.ProblemUniqueID == SeletedProjectId) {
                            $(row).addClass("mudYellow");
                        }

                    });

                },
            });

        }
        catch (err) {
            var dataToSend = {
                "method": "InitKendoGridAssociatedProj", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }
    };

    function col_ProgramHub_treelistAssociatedProject() {
        var col = [{
            field: "ProjectName",
            title: "Program / Project Name",
            width: "22%",
            filterable: true,
            template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
            //    template: "<span>#: ProblemID #</span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>"
            //  template: "#if(BudgetID == '') {#<span>ProblemID</span></br><span><a href='${navigateHubUrl}' target='_blank'>ProjectName</a></span>#} else {#<span>ProblemID</span><span>BudgetID</span></br><span><a href='${navigateHubUrl}' target='_blank'>ProjectName</a></span>#}",
            // template: "#if(BudgetID != '') { #<span>#: ProblemID # ( #: BudgetID # )</span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>#} else{ #<span>#: ProblemID # </span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>#}#",

        }, {
            field: "Tops",
            width: "3%",
            headerTemplate: "<span class='title-vertical'>TOPS</span>",
            title: "TOPS",
            //title: "<span class='title-vertical'>TOPS</span>",
            //filterable: true,
        }, {
            field: "Phase",
            width: "7%",
            title: "Phase (Project-Capital-OE)",
            headerAttributes: { "class": "wrap-header" },
          //  template: "#if(CapitalPhaseAbbreviation != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # </span>#} else{ #<span>#: Phase # </span>#}#",
            template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
            filterable: true,
        }, {
            field: "PM",
            title: "PM Sponsor",
            template: "<span>#: PM # </span><br/><span>#: Sponsor # </span>",
            headerAttributes: { "class": "wrap-header" },
            width: "10%",
            //filterable: true,
        }, {
            field: "ScheduleIndicatorArrow",
            width: "2%",
            //headerAttributes: { "class": "title-vertical" },
            headerTemplate: "<span class='title-vertical'>Schedule</span>",
            //title: "Schedule",
         //   template: "#if(ScheduleIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(ScheduleIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(ScheduleIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
            template: "#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
           "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
           "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
           "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
           "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
           "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
           "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        }, {
            field: "RiskIndicatorArrow",
            width: "2%",
            headerTemplate: "<span class='title-vertical'>Risks/Issues</span>",
            //headerAttributes: { "class": "title-vertical" },
            //title: "Risks/Issues/Safety",
          //  template: "#if(RiskIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(RiskIndicator == 'GreenDown')   {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
            //filterable: true,
            template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
              "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
              "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
              "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
               "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
              "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
              "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
              "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        }, {
            field: "AskNeedIndicatorArrow",
            width: "2%",
            headerTemplate: "<span class='title-vertical'>Ask/Needs</span>",
            //headerAttributes: { "class": "title-vertical" },
            //title: "Ask/Need",
            attributes: {
                "class": "text-mid"
            },
          //  template: "#if(AskNeedIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(AskNeedIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(AskNeedIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(AskNeedIndicator == 'GreenDown')   {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
            template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
             "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
             "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
             "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
              "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
             "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
             "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
             "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        }, {
            field: "BudgetIndicator",
            width: "2%",
            headerTemplate: "<span class='title-vertical'>Budget/Spend</span>",
            //headerAttributes: { "class": "title-vertical" },
            //title: "Budget/Spend",
            attributes: {
                "class": "text-mid"
            },
          //  template: "#if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(BudgetIndicator == 'GreenDown')   {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
            //},  {
            //    title: "Cumulative Schedule Variance",
            //    headerAttributes: { "class": "wrap-header" },
            //    template: '<div class="chart" style="height:50px"></div>',
            //    width: "10%"
            template: "<span class=#:BudgetIndicator#></span>",
        }, {
            title: "Milestone / Progression",
            headerAttributes: { "class": "wrap-header" },
            template: '<div class="chartPercentageCompleteAssociate" style="height:50px"></div>',
            width: "140px",
        }, {
            template: "<span>#: kendo.toString(TotalApprovedCapex, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(TotalProjectForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
            title: "Total CAPEX Approved / Forecast",
            headerAttributes: { "class": "wrap-header" },
            attributes: { style: "text-align:right;" },
            width: "9%",
        }, {
            field: "NextMilestone",
            title: "Next Milestone",
            width: "15%",
            headerAttributes: { "class": "wrap-header" },
            filterable: true
        }, {
            field: "NextMilestoneFinishDate",
            title: "Next Milestone Planned Finish Date",
            headerAttributes: {
                "class": "wrap-header"
            },

            filterable: true,
            template: "#= (NextMilestoneFinishDate ==null || NextMilestoneFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(NextMilestoneFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
        }, {
            field: "ProjectPlannedFinishDate",
            title: "Planned Project Complete Date",
            headerAttributes: { "class": "wrap-header" },
            filterable: true,
         
            template: "#= (ProjectPlannedFinishDate ==null || ProjectPlannedFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ProjectPlannedFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
        }];
        return col;
    }

    function getChildProject() {
        displayLoading();
        try {
            vm.deletedAssociationData = [];
            var inputId = "ddl_ProjectProgram";
            var dsProjects = [];
            var searchFor = "Child";
            var projectUID = SeletedProjectId;
            hideLoading();
            GETPostService.searchProject(inputId, dsProjects, searchFor, projectUID)

            //$.when(GETPostService.postDataWCFAsync("getAllProjectProgramList", SeletedProjectId))
            //          .then(function (response) {
            //              try {
            //                  var allProject = JSON.parse(response.getAllProjectProgramListResult)
            //                  //vm.programList = allProject.filter(function (entry) {
            //                  //    return entry.IsProgram == 1;
            //                  //});;
            //                  //vm.projectList = allProject.filter(function (entry) {
            //                  //    return entry.IsProgram == 0;
            //                  //});
            //                  vm.dsProjectProgram = allProject;
            //                  $scope.$digest();
            //                  hideLoading();
            //              }
            //              catch (err) {
            //                  var dataToSend = {
            //                      "method": "getChildProject", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            //                  };
            //                  $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
            //                        .then(function (response) { alert(errormessage) });
            //                  hideLoading();
            //              }
            //          });
            vm.directChildProjectlist = vm.associatedProjList.filter(function (entry) {
                return entry.parentId === SeletedProjectId;
            });
            angular.copy(vm.directChildProjectlist, OriginalProjectAssociation);
            if (windowAssociatedOpen == 0) {
                InitkendoGridChildProject();
                $("#dialogProjectLinkChildProj").data("kendoWindow").bind("close", function (e) {
                    if (saveChildAssociationData == 0) {
                        if (angular.equals(OriginalProjectAssociation, vm.directChildProjectlist) == false) {
                            if (!confirm(dialogCloseMessage))
                                e.preventDefault();
                            //else {
                            //    vm.associatedProjList = {};
                            //}
                        }
                        //else {
                        //    vm.associatedProjList = {};
                        //}
                    }
                    //else {
                    //    vm.associatedProjList = {};
                    //}
                    saveChildAssociationData = 0
                });
                windowAssociatedOpen = 1;
            }

            else {
                var dataSource = new kendo.data.DataSource({
                    //pageSize: 10,
                    data: vm.directChildProjectlist,
                    sort: [{
                        field: "ProjectName",
                        dir: "asc"
                    }],
                    schema: {
                        model: {
                            id: "ProblemUniqueID",
                            fields: {
                                ProblemUniqueID: {
                                    editable: false, nullable: true
                                },
                                ProjectName: {
                                    type: "string", editable: false
                                },
                            }
                        }
                    }
                });

                var grid = $('#gridImmediateChildProject').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
            }
            vm.IsAddChildProgram = true;
            var myWindow = $("#dialogProjectLinkChildProj");
            myWindow.data("kendoWindow").open();
            emptyChildDropDown();
        } catch (err) {
            var dataToSend = {
                "method": "getChildProject", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }

    }

    function InitkendoGridChildProject() {
        try {
            var col = [{
                field: "ProblemUniqueID",
                title: "ProblemUniqueID",
                hidden: true
            }, {
                field: "ProjectName",
                title: "Child Project/Program",
                headerAttributes: {
                    "class": "wrap-header"
                },
            }, {
                hidden: !(vm.Edit),
                command: [{
                    name: " ",
                    iconClass: "k-icon k-i-close",
                    width: "5%",
                    click: function (e) {

                        // prevent page scroll position change
                        if (!confirm(gridUnlinkMessage))
                            e.preventDefault();
                        else {
                            e.preventDefault();
                            // e.target is the DOM element representing the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            if (data.ProblemUniqueID != 'undefined' && data.ProblemUniqueID != "") {
                                vm.deletedAssociationData.push({ "ProblemUniqueID": data.ProblemUniqueID });
                                vm.directChildProjectlist = vm.directChildProjectlist.filter(function (entry) {
                                    return entry.ProblemUniqueID !== data.ProblemUniqueID;
                                });
                            }
                            var grid = $("#gridImmediateChildProject").data("kendoGrid");
                            grid.removeRow(tr);

                            $scope.$digest();

                        }
                        windowAssociatedOpen = 1;
                    }
                }]
            }];
            var dataSource = new kendo.data.DataSource({
                //pageSize: 10,
                data: vm.directChildProjectlist,
                sort: [{
                    field: "ProjectName",
                    dir: "asc"
                }],
                
                schema: {
                    model: {
                        id: "ProblemUniqueID",
                        fields: {
                            ProblemUniqueID: {
                                editable: false, nullable: true
                            },
                            ProjectName: {
                                type: "string", editable: false
                            },
                        }
                    }
                }
            });

            $("#gridImmediateChildProject").kendoGrid({
                dataSource: dataSource,
                // groupable: false,
                columns: col,
                // editable: vm.isEditable,
            });
        }

        catch (err) {
            var dataToSend = {
                "method": "InitkendoGridLocal", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };

    function addProjectToChildGrid() {
        var prjselect = $("#ddl_ProjectProgram").data("kendoComboBox");
        var PrjName = "";
        var PrjID = "";
        if (prjselect.select() !== -1) {
            PrjName = prjselect.text();
            PrjID = $("#ddl_ProjectProgram").val();
            var ParentProj = '';
            if (prjselect.dataItem() != undefined)
                if (prjselect.dataItem().ParentProgramID != null && prjselect.dataItem().ParentProgramID != undefined)
                {
                    ParentProj = prjselect.dataItem().ParentProgramID;
                }
            vm.selectedProjectProgram = { "ProjectName": PrjName, "ProblemUniqueID": PrjID, "parentId": ParentProj };

            var alreadyAdded = vm.directChildProjectlist.filter(function (entry) {
                return entry.ProblemUniqueID === vm.selectedProjectProgram.ProblemUniqueID;
            });
            if (alreadyAdded.length > 0) {
                alert("Project is already added in the list.");
            }
            else {
                vm.directChildProjectlist.push(vm.selectedProjectProgram);
                var dsImmediate = new kendo.data.DataSource({
                    data: vm.directChildProjectlist,
                    sort: [{
                    field: "ProjectName",
                    dir: "asc"
                }],
                });
                var grid1 = $('#gridImmediateChildProject').data('kendoGrid');
                grid1.setDataSource(dsImmediate);
                //angular.copy(vm.directChildProjectlist, OriginalProjectAssociation);
                emptyChildDropDown();

            }
        }
        else { alert(optionMsg) }

    }
    function emptyChildDropDown() {
        vm.selectedProjectProgram = null;
        if (($("#ddl_ProjectProgram").data("kendoComboBox")) !== undefined)
            $("#ddl_ProjectProgram").data("kendoComboBox").value("");
    }
    function updateParentProject() {
        var hasParent=false;
        
        angular.forEach(vm.directChildProjectlist, function (item1, index1) {
            if (item1.parentId != undefined && item1.parentId != null && item1.parentId != "" && item1.parentId != SeletedProjectId)
                hasParent = true;
        });
        if (hasParent == true) {
            if (!confirm(childProjChangMessage)) {
                //var myWindow = $("#dialogProjectLinkChildProj");
                //myWindow.data("kendoWindow").close();
            }
            else {
                SaveParentProject();
            }
        }
        else { SaveParentProject(); }
        }
        function SaveParentProject(){
            displayLoading();
            try {
                var dataToSend = { "projectUID": SeletedProjectId, "directChildProjectlist": JSON.stringify(vm.directChildProjectlist), "deletedAssociationProjList": JSON.stringify(vm.deletedAssociationData) };
                $.when(GETPostService.postDataWCFAsync("updateParentProject", dataToSend))
                        .then(function (response) {
                            //alert(response);
                            if (response == "Success") {
                                getAssociatedProjects();
                                getProjectInfo();
                                saveChildAssociationData = 1;
                                var myWindow = $("#dialogProjectLinkChildProj");
                                myWindow.data("kendoWindow").close();
                                //   hideLoading();

                            }
                        });
            }

            catch (err) {
                var dataToSend = {
                    "method": "updateParentProject", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                      .then(function (response) { alert(errormessage) });
                hideLoading();
            }
        }

    function updateCurrentParentProject() {
        var ProblemUniqueID = "";
        var ProjectName = "";
        var newParent = {};
        if ($("#ddl_ParentProgram").data("kendoComboBox").selectedIndex != -1) {
            ProblemUniqueID = $("#ddl_ParentProgram").data("kendoComboBox").value();
            ProjectName = $("#ddl_ParentProgram").data("kendoComboBox").text();
            newParent = { "ProblemUniqueID": ProblemUniqueID, "ProjectName": ProjectName };
        }
        if (angular.equals(originalParentProject, newParent) == false) {
            if (originalParentProject)
                if (!confirm(parentProgChangMsg)) {
                    //var myWindow = $("#dialogParentProj");
                    //myWindow.data("kendoWindow").close();
                }
                else {
                    displayLoading();
                    try {
                        vm.deletedAssociationData = [];
                        vm.deletedAssociationData.push({ "ProblemUniqueID": SeletedProjectId });

                        var prjselect = $("#ddl_ParentProgram").data("kendoComboBox");
                        //var PrjName = "";
                        var PrjID = "";
                        if (prjselect.select() !== -1) {
                            //PrjName = prjselect.text();
                            PrjID = $("#ddl_ParentProgram").val();
                        }
                        else
                            PrjID = "";
                        var dataToSend = { "ProjectUID": SeletedProjectId, "ParentProjectID": PrjID };
                        $.when(GETPostService.postDataWCFAsync("updateParentProjectSingle", dataToSend))
                                .then(function (response) {
                                    //alert(response);
                                    if (response == "Success") {
                                        getAssociatedProjects();
                                        getProjectInfo();
                                        saveChildAssociationData = 1;
                                        angular.copy(newParent, originalParentProject);
                                        var myWindow = $("#dialogParentProj");
                                        myWindow.data("kendoWindow").close();


                                    }
                                });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "updateCurrentParentProject", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) { alert(errormessage) });
                        hideLoading();
                    }
                }
        }
        else {
            var myWindow = $("#dialogParentProj");
            myWindow.data("kendoWindow").close();
        }
    }

    function insertReports() {
        if (vm.associatedProjList.length <= ProjectData_size) {
            var formName = portfolioDataOutputReport;
            var filteredProjId = "";
            if (vm.associatedProjList.length > 0) {
                angular.forEach(vm.associatedProjList, function (item, index) {
                    filteredProjId = filteredProjId + ',' + item.ProblemID
                })
                filteredProjId.substring(1);
            }

            var listdata = [];
            var report = {
                "ProjectID": filteredProjId,
                "UserADID": currentUserId,
                "ReportName": formName
            };
            listdata.push(report);
            var finalData = JSON.stringify({
                "ReportsData": listdata
            });
            GETPostService.postDataWCF('InsertReports', finalData).then(function (response) {
                //alert(response);
                try {
                    if (response.InsertReportsResult == "Success") {
                        alert(reportprocessmessage);
                    }
                    else {
                        alert("Error occurred");
                    }
                }
                catch (err) {
                    hideLoading();
                    var dataToSend = {
                        "method": "insertReports", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) { alert(errormessage); });
                }
            });
        }
        else
            alert(errorMessageForMaxRecordReport);
    };
    /********Function to export the two views to excel
        It will dynamically create the cells 
        There will be multiple sheets***********/
    function ExportToExcel() {
        displayLoading();
        vm.associatedProjList
        var filteredProjId = vm.associatedProjList.map(function (a) {
            return {
                "ProjectID": a.ProblemID
            };
        });

        GETPostService.ExportToExcel(filteredProjId);
    };
    function getParentProject() {
        displayLoading();
        var window = $('#dialogParentProj');
        window.data("kendoWindow").open();
        var inputId = "ddl_ParentProgram";
        var dsProjects = [];
        var searchFor = "Parent";
        var projectUID = SeletedProjectId;
        originalParentProject = {};
        $.when(GETPostService.postDataWCFAsync("getParentProject", SeletedProjectId))
         .then(function (resProj) {
             var prtProj = JSON.parse(resProj.getParentProjectResult);
             if (prtProj.length > 0) {
                 dsProjects.push(prtProj[0]);
                 angular.copy(prtProj[0], originalParentProject);
             }
             GETPostService.searchProject(inputId, dsProjects, searchFor, projectUID);


             if (prtProj.length > 0)
                 $("#ddl_ParentProgram").data("kendoComboBox").value(prtProj[0].ProblemUniqueID);
             else
                 $("#ddl_ParentProgram").data("kendoComboBox").value('');


         })


        hideLoading();

        //  GETPostService.postDataWCFAsync("getProgramHubProjects", SeletedProjectId)
    }
    function getProjectInfo() {
        $.when(GETPostService.getDataWCFAsync("getProjectHubStatus/" + SeletedProjectId))
    .then(function (resStatus) {
        try {
            var projecthubStatus = JSON.parse(resStatus.getProjectHubStatusResult);
            IsProgram = projecthubStatus[0].IsProgram;
            if (IsProgram) {
                vm.showProgramHub = true;
                vm.showProjectHub = false;
            }
            else {
                vm.showProgramHub = false;
                vm.showProjectHub = true;
            }
            $scope.$digest();
        }
        catch (err) {
            var dataToSend = {
                "method": "getProjectInfo", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }
    });
    }
    function SetProjectSPOTLightIndicator() {
        vm.RiskIssueSPOTLightInd = "";
        vm.AskNeedSPOTLightInd = "";
        vm.ScheduleSPOTLightInd = "";
        vm.MileStoneIndicator = "";
        vm.RiskIssueIndicator = "";
        vm.AskNeedIndicator = "";
      
        if (vm.projectHubStatus.MileStoneIndicator != null) {
            vm.ScheduleSPOTLightInd = vm.projectHubStatus.MileStoneIndicator == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                            (vm.projectHubStatus.MileStoneIndicator == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                (vm.projectHubStatus.MileStoneIndicator == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                    (vm.projectHubStatus.MileStoneIndicator == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                        (vm.projectHubStatus.MileStoneIndicator == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                            (vm.projectHubStatus.MileStoneIndicator == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                                (vm.projectHubStatus.MileStoneIndicator == 'YellowDown' ? "k-icon k-i-arrow-down arrow arrow-yellow" :
                                                    ""))))));
            if (vm.ScheduleSPOTLightInd == "")
            {
                vm.MileStoneIndicator = vm.projectHubStatus.MileStoneIndicator;
            }
        }
        if (vm.projectHubStatus.RiskIssueIndicator != null) {
            vm.RiskIssueSPOTLightInd = vm.projectHubStatus.RiskIssueIndicator == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                            (vm.projectHubStatus.RiskIssueIndicator == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                (vm.projectHubStatus.RiskIssueIndicator == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                    (vm.projectHubStatus.RiskIssueIndicator == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                        (vm.projectHubStatus.RiskIssueIndicator == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                            (vm.projectHubStatus.RiskIssueIndicator == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                                (vm.projectHubStatus.RiskIssueIndicator == 'YellowDown' ? "k-icon k-i-arrow-down arrow arrow-yellow" :
                                                    ""))))));
            if (vm.RiskIssueSPOTLightInd == "") {
                vm.RiskIssueIndicator = vm.projectHubStatus.RiskIssueIndicator;
            }
        }
        if (vm.projectHubStatus.AskNeedIndicator != null) {
            vm.AskNeedSPOTLightInd = vm.projectHubStatus.AskNeedIndicator == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                            (vm.projectHubStatus.AskNeedIndicator == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                (vm.projectHubStatus.AskNeedIndicator == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                    (vm.projectHubStatus.AskNeedIndicator == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                        (vm.projectHubStatus.AskNeedIndicator == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                            (vm.projectHubStatus.AskNeedIndicator == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                                (vm.projectHubStatus.AskNeedIndicator == 'YellowDown' ? "k-icon k-i-arrow-down arrow arrow-yellow" :
                                                    ""))))));
            if (vm.AskNeedSPOTLightInd == "") {
                vm.AskNeedIndicator = vm.projectHubStatus.AskNeedIndicator;
            }
        }
    }
    function init() {
        displayLoading();
        if (buildNo != localStorage["buildNoProj"]) {
            localStorage["buildNoProj"] = buildNo;
            window.location.href = $(location).attr("href")+"&v="+buildNo;
        }
       
        $.when(GETPostService.getUserAdID()).then(function (userId) {
        if (userId != "")
            prepareDataForProject();
        });
      //prepareDataForProject();
    };
}