//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('ProgramHubCtrl', ProgramHubCtrl)
ProgramHubCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function ProgramHubCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    // Flag
    vm.myvalue = false;
    vm.riskIssueClosed = false;
    vm.askNeedClosed = false;
    vm.scheduleClosed = false;
    vm.Edit = false;
    vm.ShowBaseline = false;
    var IncreaseBaselineCount = false;
    var Isupdatebaseline = false;
    var IsBaseline = false;
    var gridDataSaved = false;
    var riskIncludeReportValid = true;
    var askNeedIncludeReportValid = true;
    var milestoneIncludeReportValid = true;
    var bindRiskIssue = true;
    var bindAskNeed = true;
    var bindSchedule = true;
    var saveAskNeedData = false;
    var saveScheduleData = false;
    var saveRiskData = false;
    var gridLinkDataSaved = false;
    var projectTeam = [];
    var askNeedUsers = [];
    var askNeedComboUsers = [];
    var riskIssueUsers = [];
    var riskUsers = [];
    var projectHubProjects = [];
    var gridDataKeySuccess = [];

    var performanceStatusBulk = [];
    var primaryKpiGrid = [];
    var deletedMilestoneData = [];
    var IsLoad = false;
    var setMilestioneUpdate = false;
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
    vm.showjustification = true;
    //String
    vm.ProjectName = "";
    vm.todayDate;
    vm.OverallStatusColor = "Grey";
    vm.ExecuteStyle = "";
    vm.IntiateStyle = "";
    vm.DefineStyle = "";
    vm.PlanStyle = "";
    vm.CloseStyle = "";
    vm.TrackStyle = "";

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
    vm.BaselineCount = {};
    var OriginalRiskObj = {};
    var OriginalAskObj = {};
    var OriginalScheduleObj = {};
    var OriginalProjectTeam = {};
    var OriginalOverallStatus = {};
    var OriginalPhase = {};
    var OriginalCapitalPhase = {};
    var OriginalState = {};
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
    vm.ProjectTypeSelectorListItems = [];
    vm.overAllStatus = []
    vm.projectPhase = [];
    vm.projectState = [];
    vm.teamRole = [];
    vm.AskNeedusersList = [];
    vm.capitalPhaseList = [];
    vm.capitalPhase = [];
    vm.SelectedprojectPhase = {};
    vm.SelectedprojectState = {};
    vm.SelectedprojectCapitalPhase = {};
    //Project Hub Array
    vm.riskIssueType = [];
    vm.probability = [];
    vm.dsFuntionalGroup = [];
    vm.Impact = [];
    vm.askNeedData = [];
    // Functions
    vm.SetDefaultOverallStatus = SetDefaultOverallStatus
    vm.GetOptionData = GetOptionData;
    vm.RiskIssueBulkEdit = RiskIssueBulkEdit;
    vm.AskNeedBulkEdit = AskNeedBulkEdit;
    vm.ScheduleBulkEdit = ScheduleBulkEdit;
    vm.IncludeClosedRiskIssue = IncludeClosedRiskIssue;
    vm.IncludeClosedAskNeed = IncludeClosedAskNeed;
    vm.IncludeClosedMilestone = IncludeClosedMilestone;
    vm.CheckIncludeClosedRiskIssue = CheckIncludeClosedRiskIssue;
    vm.CheckIncludeClosedAskNeed = CheckIncludeClosedAskNeed;
    vm.CheckIncludeClosedMilestone = CheckIncludeClosedMilestone;
    vm.CheckLinkIncludeClosedRiskIssue = CheckLinkIncludeClosedRiskIssue;
    vm.CheckLinkIncludeClosedAskNeed = CheckLinkIncludeClosedAskNeed;
    vm.CheckLinkIncludeClosedMilestone = CheckLinkIncludeClosedMilestone;
    vm.SetBaseline = SetBaseline;
    vm.AskNeedIncludeInReport = AskNeedIncludeInReport;
    vm.RiskIssueIncludeInReport = RiskIssueIncludeInReport;
    vm.MilestoneIncludeInReport = MilestoneIncludeInReport;
    vm.openRiskIssueDialog = openRiskIssueDialog;
    vm.openAskNeedDialog = openAskNeedDialog;
    vm.openScheduleDialog = openScheduleDialog;
    vm.openOverallStatusDialog = openOverallStatusDialog;
    vm.BulkUpdatePrgRiskIssue = BulkUpdatePrgRiskIssue;
    vm.BulkUpdatePrgAskNeed = BulkUpdatePrgAskNeed;
    vm.BulkUpdatePrgSchedule = BulkUpdatePrgSchedule;
    vm.CheckBulkEditGridUpdate = CheckBulkEditGridUpdate;
    vm.UpdateBaselineCount = UpdateBaselineCount;
    vm.dialogBaselineCountCose = dialogBaselineCountCose;
    vm.AddMilestonePrgSchedule = AddMilestonePrgSchedule;

    //Local variables
    var gridDataRiskIssue = [];
    var gridDataAskNeed = [];
    var gridDataSchedule = [];
    var gridAllDataRiskIssue = [];
    var gridAllDataAskNeed = [];
    var gridAllDataSchedule = [];
    var gridDataProjectPhase = [];
    var gridDataProjectState = [];
    var gridDataTeam = [];
    var gridRiskIssueBulkData = [];
    var gridAskNeedBulkData = [];
    var gridScheduleBulkData = [];
    var gridDataBaselineLog = [];
    var riskIssueBulkData = [];
    var askNeedBulkData = [];
    var scheduleBulkData = [];
    var functionalgroupBulk = [];
    var resourcesBulk = [];
    var probabilityBulk = [];
    var impactBulk = [];
    var riskIssueTypeBulk = [];
    var rolesBulk = [];
    var permissionbulk = [];
    var usergroups = [];
    var primaryKpiGrid = [];
    var grdMilestoneTemplate = [];
    var grdMilestoneTemplateDetail = [];
    var milestoneToAdd = [];
    var lookup = riskIssueProbability + "," + riskIssueImpact + "," + funtionalGroup + "," + riskIssueType + "," + overAllStatus + "," + teamPermission + "," + performanceStatus + "," + topsPrimaryKpi;
    var saveData = 0;
    var countDashoardRiskIssue = 0;
    var countDashoardAskNeed = 0;
    var countDashoardMilestone = 0;
    var countDashoardRiskIssueform = 0;
    var countDashoardAskNeedform = 0;
    var countDashoardMilestoneform = 0;
    var dataToSendForRisk;
    var dataToSendForMilestone;
    var dataToSendForAskNeed;
    var blnload = false;
    var deletedRiskIssue = [];
    var deletedAskNeed = [];
    var deletedMilestones = [];
    var baselinedProjects = [];
    var baselinedMilestones = [];
    var className = "ProgramHubCtrl";

    $rootScope.$on("getProgramHubData", function (event) {
        displayLoading();
        prepareDataForProgramHub();
    });
    $rootScope.$on("getProgramHubRiskData", function (event) {
        getDataForRiskIssue();
    });
    $rootScope.$on("getProgramHubScheduleData", function (event) {
        getDataForSchedule();
    });
    $rootScope.$on("getProgramHubAskNeedData", function (event) {
        getDataForAskNeed();
    });
    $rootScope.$on("getProgramHubOverallData", function (event) {
        getDataForOverallStatus();
    });




    function openRiskIssueDialog() {
        try {
            $rootScope.$emit("openRiskIssueDialog", countDashoardRiskIssue);
            //OriginalRiskObj = {};
            //if (bindRiskIssue) {
            //    bindRiskIssueControl();
            //}
            //else {
            //    var siteUsers = [];
            //    var ownerlist = $("#riskowner").data("kendoComboBox");
            //    ownerlist.setDataSource(siteUsers);
            //    ownerlist.value([]);
            //}
            //countDashoardRiskIssueform = countDashoardRiskIssue.length;
            //angular.copy(vm.riskIssue, OriginalRiskObj);
            //var myWindow = $("#dialogRiskIssue");
            //myWindow.data("kendoWindow").open();
        }
        catch (err) {
            var dataToSend = {
                "method": "openRiskIssueDialog", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    }
    function openOverallStatusDialog() {
        try {
            $rootScope.$emit("openOverallStatusDialog", vm.overAllData, gridDataKeySuccess);
        }
        catch (err) {
            var dataToSend = {
                "method": "openOverallStatusDialog", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    }

    function openAskNeedDialog() {
        try {
            $rootScope.$emit("openAskNeedDialog", countDashoardAskNeed);
        }
        catch (err) {
            var dataToSend = {
                "method": "openAskNeedDialog", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    }
    function openScheduleDialog() {
        try {
            $rootScope.$emit("openScheduleDialog", countDashoardMilestone);
        }
        catch (err) {
            var dataToSend = {
                "method": "openScheduleDialog", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    }

    //Load Program Hub data
    function prepareDataForProgramHub() {
        try {
            // if (!IsLoad) {
            dataToSendForRisk = {
                "ProjectID": SeletedProjectId, "DataType": "RiskIssue"
            };
            dataToSendForMilestone = {
                "ProjectID": SeletedProjectId, "DataType": "Schedule"
            };
            dataToSendForAskNeed = {
                "ProjectID": SeletedProjectId, "DataType": "AskNeed"
            };
            var dataToSendForMilestoneSet = {
                "ProjectID": SeletedProjectId, "DataType": "TemplateDetails"
            };
            var dataToSendForMilestoneTemplate = {
                "ProjectID": SeletedProjectId, "DataType": "Template"
            };
            vm.riskIssueClosed = false;
            vm.askNeedClosed = false;
            vm.scheduleClosed = false;
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForRisk),
                GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForMilestone), GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForAskNeed),
                GETPostService.postDataWCFAsync("getProgramHubBulkEditData", dataToSendForRisk), GETPostService.postDataWCFAsync("getProgramHubBulkEditData", dataToSendForMilestone), GETPostService.postDataWCFAsync("getProgramHubBulkEditData", dataToSendForAskNeed),
                GETPostService.getDataWCFAsync("getOverAllStatus/" + SeletedProjectId), GETPostService.getDataWCFAsync("getProjectHubStatus/" + SeletedProjectId),
                GETPostService.getDataWCFAsync("getUserPermissionByProjectUserId/" + currentUserId + "/" + SeletedProjectId),
                GETPostService.postDataWCFAsync("getUserPermissionById", currentUserId), GETPostService.postDataWCFAsync("getProjectBaseline", SeletedProjectId),
                GETPostService.postDataWCFAsync("getHubSetting", SeletedProjectId), GETPostService.postDataWCFAsync("getUserGroupById", currentUserId),
                GETPostService.postDataWCFAsync("getProgramHubProjects", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectBaselineLog", SeletedProjectId),
                GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneTemplate), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneSet))
                .then(function (resLookup, resRiskIssue, resSchedule, resAskNeed, resRiskIssueBulk, resScheduleBulk, resAskNeedBulk, resOverallStatus,
                    resStatus, userpermission, userGlobalPermission, projectbaseline, resHubSettings, usergroup, hubProjects, baselinelog, resKeySuccess, resMilestoneTemplates, resMilestoneTemplateDetail) {
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

                        }
                        var ProjectBaselineDetail = JSON.parse(projectbaseline.getProjectBaselineResult);
                        if (ProjectBaselineDetail.length > 0) {
                            vm.ProjectBaselineCount = ProjectBaselineDetail[0].BaselineCount;
                            vm.ProjectBaselineDate = kendo.toString(kendo.parseDate(ProjectBaselineDetail[0].ModifiedDate), 'dd-MMM-yy');
                            if (vm.ProjectBaselineCount == 0) {
                                vm.showjustification = false;
                            }
                        }
                        else {
                            vm.showjustification = false;
                        }

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
                            }
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
                            vm.overAllData.StatusLastUpdated = kendo.toString(kendo.parseDate(vm.overAllData.StatusLastUpdated), 'dd-MMM-yy');
                            angular.copy(vm.overAllData, vm.OverAllDataMain);
                        }
                        var projecthubStatus = JSON.parse(resStatus.getProjectHubStatusResult);
                        vm.projectHubStatus = projecthubStatus[0];
                        vm.ProjectName = vm.projectHubStatus.ProjectName;
                        SeletedProjectName = vm.ProjectName;
                        ProjectSiteUrl = vm.projectHubStatus.ProjectSiteURL;
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

                        var askNeedData = JSON.parse(resAskNeed);
                        angular.copy(askNeedData, gridAllDataAskNeed)
                        gridDataAskNeed = askNeedData.filter(function (entry) {
                            return entry.CloseDate == null;
                        });

                        var scheduleData = JSON.parse(resSchedule);
                        angular.copy(scheduleData, gridAllDataSchedule)
                        gridDataSchedule = scheduleData.filter(function (entry) {
                            return entry.CompletionDate == null;
                        });

                        // openConfirmation("dialogMilestone", saveScheduleData);
                        var riskIssueData = JSON.parse(resRiskIssue);
                        angular.copy(riskIssueData, gridAllDataRiskIssue)
                        //  gridAllDataRiskIssue = JSON.parse(resRiskIssue.getRiskIssueResult);
                        gridDataRiskIssue = riskIssueData.filter(function (entry) {
                            return entry.CloseDate == null;
                        });
                        countDashoardRiskIssue = gridAllDataRiskIssue.filter(function (entry) {
                            return entry.IncludeInReport == true;
                        });
                        countDashoardAskNeed = gridAllDataAskNeed.filter(function (entry) {
                            return entry.IncludeInReport == true;
                        });
                        countDashoardMilestone = gridAllDataSchedule.filter(function (entry) {
                            return entry.IncludeInReport == true;
                        });
                        riskIssueBulkData = JSON.parse(resRiskIssueBulk);
                        gridRiskIssueBulkData = riskIssueBulkData.filter(function (entry) {
                            return entry.CloseDate == null;
                        });

                        askNeedBulkData = JSON.parse(resAskNeedBulk);
                        gridAskNeedBulkData = askNeedBulkData.filter(function (entry) {
                            return entry.CloseDate == null;
                        });

                        scheduleBulkData = JSON.parse(resScheduleBulk);
                        gridScheduleBulkData = scheduleBulkData.filter(function (entry) {
                            return entry.CompletionDate == null;
                        });
                        angular.forEach(gridRiskIssueBulkData, function (item, index) {
                            if (item.OwnerID != null && item.OwnerID != "") {
                                var user = riskIssueUsers.filter(function (val) {
                                    return (val.value == item.OwnerID && val.ProjectID == item.ProjectID);
                                });
                                if (user.length == 0) {
                                    var temp = {};
                                    temp.text = item.OwnerName;
                                    temp.value = item.OwnerID;
                                    temp.UserCountry = item.UserCountry,
                                        temp.UserImageUrl = item.UserImageUrl,
                                        temp.UserEmailAddress = item.UserEmailAddress,
                                        temp.UserDepartment = item.UserDepartment,
                                        temp.ProjectID = item.ProjectID
                                    riskIssueUsers.push(temp);
                                }
                            }
                        });
                        angular.forEach(gridAskNeedBulkData, function (item, index) {
                            if (item.NeedFromID != null && item.NeedFromID != "") {
                                var user = askNeedUsers.filter(function (val) {
                                    return (val.value == item.NeedFromID && val.ProjectID == item.ProjectID);
                                });
                                if (user.length == 0) {
                                    var temp = {};
                                    temp.text = item.NeedFromName;
                                    temp.value = item.NeedFromID;
                                    temp.UserCountry = item.UserCountry,
                                        temp.UserImageUrl = item.UserImageUrl,
                                        temp.UserEmailAddress = item.UserEmailAddress,
                                        temp.UserDepartment = item.UserDepartment,
                                        temp.ProjectID = item.ProjectID
                                    askNeedUsers.push(temp);
                                }
                            }
                        });
                        projectHubProjects = JSON.parse(hubProjects.getProgramHubProjectsResult);
                        gridDataBaselineLog = JSON.parse(baselinelog.getProjectBaselineLogResult);
                        //Milestone Set
                        grdMilestoneTemplate = JSON.parse(resMilestoneTemplates);
                        grdMilestoneTemplateDetail = JSON.parse(resMilestoneTemplateDetail);

                        if (!IsLoad) {

                            vm.dsFuntionalGroup = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == funtionalGroup;
                            });

                            vm.probability = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == riskIssueProbability;
                            });

                            vm.Impact = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == riskIssueImpact;
                            });
                            vm.riskIssueType = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == riskIssueType;
                            });
                            for (var i = 0; i < vm.riskIssueType.length; i++) {
                                var item = {
                                    "text": vm.riskIssueType[i].LookUpMemberName, "value": vm.riskIssueType[i].LookUpMemberID
                                }
                                riskIssueTypeBulk.push(item);
                            }
                            for (var i = 0; i < vm.Impact.length; i++) {
                                var item = {
                                    "text": vm.Impact[i].LookUpMemberName, "value": vm.Impact[i].LookUpMemberID
                                }
                                impactBulk.push(item);
                            }
                            for (var i = 0; i < vm.probability.length; i++) {
                                var item = {
                                    "text": vm.probability[i].LookUpMemberName, "value": vm.probability[i].LookUpMemberID
                                }
                                probabilityBulk.push(item);
                            }
                            for (var i = 0; i < vm.dsFuntionalGroup.length; i++) {
                                var item = {
                                    "text": vm.dsFuntionalGroup[i].LookUpMemberName, "value": vm.dsFuntionalGroup[i].LookUpMemberID
                                }
                                functionalgroupBulk.push(item);
                            }
                            vm.dsPrimaryKPI = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == topsPrimaryKpi;
                            }), "LookUpMemberOrder");
                            for (var i = 0; i < vm.dsPrimaryKPI.length; i++) {
                                var item5 = {
                                    "text": vm.dsPrimaryKPI[i].LookUpMemberName, "value": vm.dsPrimaryKPI[i].LookUpMemberID
                                }
                                primaryKpiGrid.push(item5);
                            }
                            vm.performStatus = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == performanceStatus;
                            });
                            for (var p = 0; p < vm.performStatus.length; p++) {
                                var newItem = {
                                    "text": vm.performStatus[p].LookUpMemberName, "value": vm.performStatus[p].LookUpMemberID
                                };
                                performanceStatusBulk.push(newItem);
                            }

                            InitKendoGridRiskIssue();
                            InitKendoGridSchedule();
                            InitKendoGridAskNeed();
                            RiskIssueBulkEdit();
                            AskNeedBulkEdit();
                            ScheduleBulkEdit();
                            RiskIssueLinkBulkEdit();
                            AskNeedLinkBulkEdit();
                            ScheduleLinkBulkEdit();
                            InitKendoGridBaselineLog();
                            InitkGridOverAllPerformance();
                            InitMilestoneTemplates();
                            DialogCloseBinding();
                            IsLoad = true;
                        }
                        else {
                            var dataSource = new kendo.data.DataSource({ data: gridDataRiskIssue });
                            var grid = $('#gridRiskIssuePrgHub').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);
                            dataSource = new kendo.data.DataSource({ data: gridDataSchedule });
                            grid = $('#gridSchedulePrgHub').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);
                            dataSource = new kendo.data.DataSource({ data: gridDataAskNeed });
                            grid = $('#gridAskNeedPrgHub').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);
                            dataSource = new kendo.data.DataSource({ data: gridDataBaselineLog });
                            grid = $('#gridPrgBaselineLogs').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);

                            dataSource = new kendo.data.DataSource({ data: grdMilestoneTemplate });
                            grid = $('#gridPrgHubAddMilestones').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);

                            $('#gridPrgRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
                            $('#gridPrgScheduleBulkEdit').data('kendoGrid').dataSource.read();
                            $('#gridPrgAskNeedBulkEdit').data('kendoGrid').dataSource.read();
                            $('#gridPrgHubLinkRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
                            $('#gridPrgHubLinkScheduleBulkEdit').data('kendoGrid').dataSource.read();
                            $('#gridPrgHubLinkAskNeedBulkEdit').data('kendoGrid').dataSource.read();
                        }
                        vm.BaselineCount.IncreaseBaseline = "YES";
                        $scope.$digest();
                        hideLoading();
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "prepareDataForProgramHub", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { alert(errormessage) });
                        hideLoading();
                    }
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "prepareDataForProgramHub", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
            hideLoading();
        }

    };
    function openConfirmation(windowName, varibleName) {
        $("#" + windowName).data("kendoWindow").bind("close", function (e) {
            if (varibleName == false) {
                if (!confirm(dialogCloseMessage))
                    e.preventDefault();
            }
        });
    };

    function GetOptionData() {
        vm.myvalue = true;
    };
    function InitkGridOverAllPerformance() {
        try {
            var col = [
                {
                    template: "",
                    field: "StatusIndicator",
                    title: " ",
                    width: "1%",
                    attributes: { class: "#:StatusIndicator#" }
                },
                {
                    field: "KPIID",
                    title: "KPI",
                    values: primaryKpiGrid
                },
                {
                    field: "Metric",
                    title: "Metric",
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
                        fields: {
                            StatusIndicator: { type: "string" },
                            KPIID: { type: "string" },
                            Metric: { type: "string" },
                            CurrentState: { type: "string" },
                            TargetPerformance: { type: "string" },
                            ActualPerformance: { type: "string" }
                        }
                    }
                },
            });
            $("#overAllStatusPerformanceProgramHub").kendoGrid({
                dataSource: dataSource1,
                columns: col,
                navigatable: true
            });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitkGridOverAllPerformance", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    };
    //Initialize Risk Issue grid.
    function InitKendoGridRiskIssue() {
        try {
            $("#gridRiskIssuePrgHub").kendoGrid({
                dataSource:
                {
                    data: gridDataRiskIssue,
                    sort: [
                        //{ field: "StatusIndicator", dir: "desc" },
                        { field: "DueDate", dir: "asc" }]
                },
                groupable: false,
                sortable: true,
                schema: {
                    model: {
                        fields: {
                            StatusIndicator: { type: "string" },
                            LogDate: { type: "date" },
                            DueDate: { type: "date" },
                            IfHappens: { type: "string" },
                            RiskIssueTypeID: { type: "string" }
                        }
                    }
                },

                columns: [
                    {
                        template: "",
                        field: "StatusIndicator",
                        title: " ",
                        width: "1%",
                        attributes: { class: "#:StatusIndicator#" },
                    },
                    {
                        template: "#if(link == 1) {#<span class='k-icon k-i-link-vertical'></span>#}" +
                       "else if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
                        title: " ",
                        width: "4%",
                    },
                    {
                        field: "LogDate",
                        title: "Date Initiated",
                        headerAttributes: { "class": "wrap-header" },
                        width: "18%",
                        template: function (e) {
                            var value = "";
                            if (e.CloseDate != null && e.CloseDate != "") {
                                value = (e.LogDate != null && e.LogDate != "") ? "<span class='text-italic'>" + kendo.toString(kendo.parseDate(new Date(e.LogDate), 'yyyy-MM-dd'), 'dd-MMM-yy') + "</span>" : '';
                            }
                            else {
                                value = (e.LogDate != null && e.LogDate != "") ? kendo.toString(kendo.parseDate(new Date(e.LogDate), 'yyyy-MM-dd'), 'dd-MMM-yy') : '';
                            }
                            return value;
                        },
                        //template: "#= LogDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(LogDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
                    },
                    {
                        field: "DueDate",
                        title: "Due Date",
                        headerAttributes: { "class": "wrap-header" },
                        width: "18%",
                        template: function (e) {
                            var value = "";
                            if (e.CloseDate != null && e.CloseDate != "") {
                                value = (e.DueDate != null && e.DueDate != "") ? "<span class='text-italic'>" + kendo.toString(kendo.parseDate(new Date(e.DueDate), 'yyyy-MM-dd'), 'dd-MMM-yy') + "</span>" : '';
                            }
                            else {
                                value = (e.DueDate != null && e.DueDate != "") ? kendo.toString(kendo.parseDate(new Date(e.DueDate), 'yyyy-MM-dd'), 'dd-MMM-yy') : '';
                            }
                            return value;
                        },
                        // template: "#= DueDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(DueDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
                    },
                    {
                        field: "IfHappens",
                        title: "If This Happens",
                        headerAttributes: { "class": "wrap-header" },
                        width: "40%",
                        template: function (e) {
                            var value = "";
                            if (e.CloseDate != null && e.CloseDate != "") {
                                value = (e.IfHappens != null && e.IfHappens != "") ? "<span class='text-italic'>" + e.IfHappens + "</span>" : '';
                            }
                            else { value = (e.IfHappens != null && e.IfHappens != "") ? e.IfHappens : '' }
                            return value;
                        },
                    },
                    {
                        field: "RiskIssueTypeID",
                        title: "Type",
                        width: "9%",
                        values: riskIssueTypeBulk,
                        template: function (e) {
                            var value = "";
                            if (e.CloseDate != null && e.CloseDate != "") {
                                value = (e.RiskIssueTypeID != null && e.RiskIssueTypeID != "") ? "<span class='text-italic'>" + e.RiskIssueTypeName + "</span>" : '';
                            }
                            else { value = (e.RiskIssueTypeID != null && e.RiskIssueTypeID != "") ? e.RiskIssueTypeName : ''; }
                            return value;
                        },
                    },
                    {
                        hidden: !(vm.Edit),
                        command: [{
                            name: " ",
                            iconClass: "k-icon k-i-edit",
                            width: "10%",
                            click: function (e) {
                                try {
                                    // prevent page scroll position change
                                    e.preventDefault();
                                    // e.target is the DOM element representing the button
                                    var tr = $(e.target).closest("tr"); // get the current table row (tr)
                                    // get the data bound to the current table row
                                    var data = this.dataItem(tr);
                                    $rootScope.$emit("RiskIssueEdit", data, countDashoardRiskIssue);
                                }
                                catch (err) {
                                    var dataToSend = {
                                        "method": "InitKendoGridRiskIssue", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                    };
                                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                        .then(function (response) { alert(errormessage) });
                                }

                            }
                        }]
                    }

                ],
                detailTemplate: kendo.template($("#riskIssuedetail-template").html())
            });
            $("#gridRiskIssuePrgHub").kendoTooltip({
                filter: "td:nth-child(3)", //this filter selects the third column's cells
                position: "absolute",
                width: 300,
                show: function (e) {
                    if (this.content.text().length > 0) {
                        this.content.parent().css('visibility', 'visible');
                    } else {
                        this.content.parent().css('visibility', 'hidden');
                    }
                },
                content: function (e) {
                    var dataItem = $("#gridRiskIssuePrgHub").data("kendoGrid").dataItem(e.target.closest("tr"));
                    var content = "";
                    if (dataItem.ChildLink == 0 && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedFromRiskIssue + dataItem.LinkedProjects + "</div>";
                    }
                    if (dataItem.ChildLink == 1 && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedToRiskIssue + dataItem.LinkedProjects + "</div>";
                    }
                    return content;
                }
            }).data("kendoTooltip");
        }
        catch (err) {
            var dataToSend = {
                "method": "InitKendoGridRiskIssue", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };
    //Initialize milestone grid
    function InitKendoGridSchedule() {
        try {
            $("#gridSchedulePrgHub").kendoGrid({
                dataSource: {
                    data: gridDataSchedule,
                    sort: [{ field: "MilestoneOrder", dir: "asc" }
                    ]

                },
                groupable: false,
                sortable: true,
                schema: {
                    model: {
                        fields: {
                            StatusIndicator: { type: "string" },
                            Milestone: { type: "string" },
                            BaselineFinish: { type: "date" },
                            PlannedFinish: { type: "date" },
                            Variance: { type: "string" }
                        }
                    }
                },
                columns: [{
                    template: "",
                    field: "StatusIndicator",
                    title: " ",
                    attributes: { class: "#:StatusIndicator#" },
                    width: "1%"
                },
                {
                    template: "#if(link == 1) {#<span class='k-icon k-i-link-vertical'></span>#}" +
                       "else if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
                    title: " ",
                    width: "4%",
                },
                {
                    field: "Milestone",
                    title: "Milestone",
                    width: "32%",
                    template: function (e) {
                        var value = "";
                        if (e.CompletionDate != null && e.CompletionDate != "") {
                            if (e.MilestoneType == 1 || e.MilestoneType == 2) {
                                if (e.Milestone.split('-')[1] == MilestoneExecutionInsert || e.Milestone.split('-')[1].trim() == "") {
                                    value = (e.Milestone != null && e.Milestone != "") ? "<span class='text-italic-red'><b>" + ((e.MilestoneType == 1) ? MilestoneStartPrefix : MilestoneEndPrefix) + "</b>" + MilestoneExecutionInsert + "</span>" : '';
                                }
                                else {
                                    var miltext = (e.MilestoneType == 1) ? e.Milestone.replace(MilestoneStartPrefix, "") : e.Milestone.replace(MilestoneEndPrefix, "");
                                    value = (e.Milestone != null && e.Milestone != "") ? "<span class='text-italic-bold'>" + ((e.MilestoneType == 1) ? MilestoneStartPrefix : MilestoneEndPrefix) + "</span><span class='text-italic'>" + miltext + "</span>" : '';
                                }
                            }
                            else {
                                value = (e.Milestone != null && e.Milestone != "") ? "<span class='text-italic'>" + e.Milestone + "</span>" : '';
                            }

                        }
                        else {
                            if (e.MilestoneType == 1 || e.MilestoneType == 2) {
                                if (e.Milestone.split('-')[1] == MilestoneExecutionInsert || e.Milestone.split('-')[1].trim() == "") {
                                    value = (e.Milestone != null && e.Milestone != "") ? "<span class='RedQuality'><b>" + ((e.MilestoneType == 1) ? MilestoneStartPrefix : MilestoneEndPrefix) + "</b>" + MilestoneExecutionInsert + "</span>" : '';
                                }
                                else {
                                    var miltext = (e.MilestoneType == 1) ? e.Milestone.replace(MilestoneStartPrefix, "") : e.Milestone.replace(MilestoneEndPrefix, "");
                                    value = (e.Milestone != null && e.Milestone != "") ? "<b>" + ((e.MilestoneType == 1) ? MilestoneStartPrefix : MilestoneEndPrefix) + "</b>" + miltext : '';
                                }
                            }
                            else
                                value = (e.Milestone != null && e.Milestone != "") ? e.Milestone : '';
                        }
                        return value;
                    },
                }, {
                    field: "BaselineFinish",
                    title: "Baseline Finish",
                    headerAttributes: { "class": "wrap-header" },
                    width: "22%",
                    template: function (e) {
                        var value = "";
                        if (e.CompletionDate != null && e.CompletionDate != "") {
                            value = (e.BaselineFinish != null && e.BaselineFinish != "") ? "<span class='text-italic'>" + kendo.toString(kendo.parseDate(new Date(e.BaselineFinish), 'yyyy-MM-dd'), 'dd-MMM-yy') + "</span>" : '';
                        }
                        else {
                            value = (e.BaselineFinish != null && e.BaselineFinish != "") ? kendo.toString(kendo.parseDate(new Date(e.BaselineFinish), 'yyyy-MM-dd'), 'dd-MMM-yy') : '';
                        }
                        return value;
                    },
                    // template: "#= BaselineFinish ==null ? '' : kendo.toString(kendo.parseDate(new Date(BaselineFinish), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
                },
                {
                    title: " ",
                    width: "4%",
                    template: "# if (CompletionDate == null) {#<span></span># } else{#<span class='k-icon k-i-check' style='color: blue;'></span>#}#"
                },
                {
                    field: "PlannedFinish",
                    title: "Finish",
                    width: "16%",
                    headerAttributes: { "class": "wrap-header" },
                    template: function (e) {
                        var value = "";
                        if (e.CompletionDate != null && e.CompletionDate != "") {
                            value = "<span class='text-italic'>" + kendo.toString(kendo.parseDate(new Date(e.CompletionDate), 'yyyy-MM-dd'), 'dd-MMM-yy') + "</span>";
                        }
                        else {
                            value = (e.PlannedFinish != null && e.PlannedFinish != "") ? kendo.toString(kendo.parseDate(new Date(e.PlannedFinish), 'yyyy-MM-dd'), 'dd-MMM-yy') : '';
                        }
                        return value;
                    },
                    // template: "# if (CompletionDate == null) {#<span>#= PlannedFinish ==null ? '' : kendo.toString(kendo.parseDate(new Date(PlannedFinish), 'yyyy-MM-dd'), 'dd-MMM-yy') #</span># } else{ #<span>#= CompletionDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(CompletionDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #</span>#}#"
                }, {
                    field: "Variance",
                    title: "Variance",
                    width: "11%",
                    headerAttributes: { "class": "txt-float-R" },
                    attributes: { class: "txt-float-R" },
                    template: function (e) {
                        var value = "";
                        if (e.CompletionDate != null && e.CompletionDate != "") {
                            value = "<span class='text-italic'>" + (e.Variance.toString() == 'NA' || e.Variance.toString() == '' || (e.Variance.toString().indexOf("days") > 1)) ? e.Variance.toString() : (e.Variance.toString() + "days") + "</span>";
                        }
                        else {
                            value = ((e.Variance.toString() == 'NA' || e.Variance.toString() == '' || (e.Variance.toString().indexOf("days")) > 1)) ? e.Variance.toString() : (e.Variance.toString() + " days");
                        }
                        return value;
                    }
                },
                {
                    hidden: !(vm.Edit),
                    command: [{
                        name: " ",
                        iconClass: "k-icon k-i-edit",
                        width: "9%",
                        click: function (e) {
                            try {
                                e.preventDefault();

                                // e.target is the DOM element representing the button
                                var tr = $(e.target).closest("tr"); // get the current table row (tr)
                                // get the data bound to the current table row
                                var data = this.dataItem(tr);
                                $rootScope.$emit("ScheduleEdit", data, countDashoardMilestone);


                            }
                            catch (err) {
                                var dataToSend = {
                                    "method": "InitKendoGridSchedule", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                };
                                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                    .then(function (response) { alert(errormessage) });
                            }

                        }
                    }]
                }
                ],
                detailTemplate: kendo.template($("#scheduledetail-template").html())
            });
            $("#gridSchedulePrgHub").kendoTooltip({
                filter: "td:nth-child(3)", //this filter selects the fifth column's cells
                position: "absolute",
                width: 400,
                show: function (e) {
                    if (this.content.text().length > 0) {
                        this.content.parent().css('visibility', 'visible');
                    } else {
                        this.content.parent().css('visibility', 'hidden');
                    }
                },
                content: function (e) {
                    var dataItem = $("#gridSchedulePrgHub").data("kendoGrid").dataItem(e.target.closest("tr"));
                    var content = "";
                    if (dataItem.ChildLink == 0 && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedFromMilestone + dataItem.LinkedProjects + "</div>";
                    }
                    if (dataItem.ChildLink == 1 && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedToMilestone + dataItem.LinkedProjects + "</div>";
                    }
                    return content;
                }
            }).data("kendoTooltip");
        }
        catch (err) {
            var dataToSend = {
                "method": "InitKendoGridSchedule", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };
    //Initialize Ask Need Grid
    function InitKendoGridAskNeed() {
        try {
            $("#gridAskNeedPrgHub").kendoGrid({
                dataSource: {
                    data: gridDataAskNeed,
                    sort: [//{ field: "StatusIndicator", dir: "desc" },
                        { field: "NeedByDate", dir: "asc" }]
                },
                groupable: false,
                sortable: true,
                schema: {
                    model: {
                        fields: {
                            StatusIndicator: { type: "string" },
                            AskNeed: { type: "string" },
                            NeedFromName: { type: "string" },
                            NeedByDate: { type: "date" }

                        }
                    }
                },
                columns: [
                    {
                        template: "",
                        field: "StatusIndicator",
                        title: " ",
                        width: "1%",
                        attributes: { class: "#:StatusIndicator#" },
                    },
                    {
                        template: "#if(link == 1) {#<span class='k-icon k-i-link-vertical'></span>#}" +
                        "else if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
                        title: " ",
                        width: "4%",
                    },
                    {
                        field: "AskNeed",
                        title: "Ask or Need",
                        width: "45.1%",
                        template: function (e) {
                            var value = "";
                            if (e.CloseDate != null && e.CloseDate != "") {
                                value = "<span class='text-italic'>" + e.AskNeed + "</span>";
                            }
                            else { value = e.AskNeed; }
                            return value;
                        },
                    },
                    {
                        field: "NeedFromName",
                        title: "Need From",
                        width: "20%",
                        template: function (e) {
                            var value = "";
                            if (e.CloseDate != null && e.CloseDate != "") {
                                value = (e.NeedFromName != null && e.NeedFromName != "") ? "<span class='text-italic'>" + e.NeedFromName + "</span>" : '';
                            }
                            else {
                                value = (e.NeedFromName != null && e.NeedFromName != "") ? e.NeedFromName : '';
                            }
                            return value;
                        }
                    }, {
                        field: "NeedByDate",
                        title: "Need Date",
                        width: "20%",
                        template: function (e) {
                            var value = "";
                            if (e.CloseDate != null && e.CloseDate != "") {
                                value = (e.NeedByDate != null && e.NeedByDate != "") ? "<span class='text-italic'>" + kendo.toString(kendo.parseDate(new Date(e.NeedByDate), 'yyyy-MM-dd'), 'dd-MMM-yy') + "</span>" : '';
                            }
                            else {
                                value = (e.NeedByDate != null && e.NeedByDate != "") ? kendo.toString(kendo.parseDate(new Date(e.NeedByDate), 'yyyy-MM-dd'), 'dd-MMM-yy') : '';
                            }
                            return value;
                        }
                        //template: "#= NeedByDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(NeedByDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
                    },
                    {
                        hidden: !(vm.Edit),
                        command: [{
                            name: " ",
                            iconClass: "k-icon k-i-edit",
                            width: "5%",
                            click: function (e) {
                                try {
                                    // prevent page scroll position change
                                    e.preventDefault();
                                    // e.target is the DOM element representing the button
                                    var tr = $(e.target).closest("tr"); // get the current table row (tr)

                                    // get the data bound to the current table row
                                    var data = this.dataItem(tr);
                                    $rootScope.$emit("AskNeedEdit", data, countDashoardAskNeed);
                                }
                                catch (err) {
                                    var dataToSend = {
                                        "method": "InitKendoGridAskNeed", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                    };
                                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                        .then(function (response) { alert(errormessage) });
                                }
                            }
                        }]
                    }

                ],
                detailTemplate: kendo.template($("#askneeddetail-template").html())
            });
            $("#gridAskNeedPrgHub").kendoTooltip({
                filter: "td:nth-child(3)", //this filter selects the fifth column's cells
                position: "absolute",
                width: 400,
                show: function (e) {
                    if (this.content.text().length > 0) {
                        this.content.parent().css('visibility', 'visible');
                    } else {
                        this.content.parent().css('visibility', 'hidden');
                    }
                },
                content: function (e) {
                    var content = "";
                    var dataItem = $("#gridAskNeedPrgHub").data("kendoGrid").dataItem(e.target.closest("tr"));
                    if (dataItem.ChildLink == 0 && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedFromAskNeed + dataItem.LinkedProjects + "</div>";
                    }
                    if (dataItem.ChildLink == 1 && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedToAskNeed + dataItem.LinkedProjects + "</div>";
                    }

                    return content;
                }
            }).data("kendoTooltip");
        }
        catch (err) {
            var dataToSend = {
                "method": "InitKendoGridAskNeed", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };

    //Get the data for Risk Issue
    function getDataForRiskIssue() {
        $.when(GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForRisk), GETPostService.postDataWCFAsync("getProgramHubBulkEditData", dataToSendForRisk))
            .then(function (resRiskIssue, resRiskIssueBulk) {
                try {
                    gridAllDataRiskIssue = JSON.parse(resRiskIssue);
                    riskIssueBulkData = JSON.parse(resRiskIssueBulk);
                    countDashoardRiskIssue = gridAllDataRiskIssue.filter(function (entry) {
                        return entry.IncludeInReport == true;
                    });
                    IncludeClosedRiskIssue();
                    $rootScope.$emit("UpdateHubStatus");
                    $scope.$digest();
                }
                catch (err) {
                    var dataToSend = {
                        "method": "getDataForRiskIssue", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            alert(errormessage);
                        });
                }
            });

    };
    //Get data for milestone to refersh grid
    function getDataForSchedule() {
        milestoneToAdd = [];
        setMilestioneUpdate = false;
        deletedMilestoneData = [];
        var dataToSendForMilestoneSet = {
            "ProjectID": SeletedProjectId, "DataType": "TemplateDetails"
        };
        var dataToSendForMilestoneTemplate = {
            "ProjectID": SeletedProjectId, "DataType": "Template"
        };
        $.when(GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForMilestone), GETPostService.postDataWCFAsync("getProgramHubBulkEditData", dataToSendForMilestone), GETPostService.postDataWCFAsync("getProjectBaselineLog", SeletedProjectId), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneTemplate), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneSet))
            .then(function (resSchedule, resScheduleBulk, resBaseline, resMilestoneTemplates, resMilestoneTemplateDetail) {
                try {
                    gridAllDataSchedule = JSON.parse(resSchedule);
                    gridDataBaselineLog = JSON.parse(resBaseline.getProjectBaselineLogResult);
                    //Milestone Set
                    grdMilestoneTemplate = JSON.parse(resMilestoneTemplates);
                    grdMilestoneTemplateDetail = JSON.parse(resMilestoneTemplateDetail);

                    var dataSource = new kendo.data.DataSource({ data: gridDataBaselineLog });
                    var grid = $('#gridPrgBaselineLogs').data('kendoGrid');
                    dataSource.read();
                    grid.setDataSource(dataSource);
                    countDashoardMilestone = gridAllDataSchedule.filter(function (entry) {
                        return entry.IncludeInReport == true;
                    });
                    dataSource = new kendo.data.DataSource({ data: grdMilestoneTemplate });
                    grid = $('#gridPrgHubAddMilestones').data('kendoGrid');
                    dataSource.read();
                    grid.setDataSource(dataSource);

                    scheduleBulkData = JSON.parse(resScheduleBulk);
                    angular.copy(scheduleBulkData, gridScheduleBulkData)
                    // $('#gridPrgHubAddMilestones').data('kendoGrid').refresh();
                    IncludeClosedMilestone();
                    $rootScope.$emit("UpdateHubStatus");
                    $scope.$digest();
                }
                catch (err) {
                    var dataToSend = {
                        "method": "getDataForSchedule", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            alert(errormessage);
                        });
                }
            });

    };
    //Get data for Ask need to refresh grid
    function getDataForAskNeed() {
        $.when(GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForAskNeed), GETPostService.postDataWCFAsync("getProgramHubBulkEditData", dataToSendForAskNeed))
            .then(function (resAskNeed, resAskNeedBulk) {
                try {
                    gridAllDataAskNeed = JSON.parse(resAskNeed);
                    countDashoardAskNeed = gridAllDataAskNeed.filter(function (entry) {
                        return entry.IncludeInReport == true;
                    });
                    askNeedBulkData = JSON.parse(resAskNeedBulk);
                    angular.copy(askNeedBulkData, gridAskNeedBulkData)
                    IncludeClosedAskNeed();
                    $rootScope.$emit("UpdateHubStatus");
                    $scope.$digest();
                }
                catch (err) {
                    var dataToSend = {
                        "method": "getDataForAskNeed", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            alert(errormessage);
                        });
                }
            });

    };
    function getDataForOverallStatus() {

        $.when(GETPostService.getDataWCF("getOverallStatus/" + SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId))
            .then(function (resOverallStatus, resKeySuccess) {
                try {
                    gridDataKeySuccess = JSON.parse(resKeySuccess.getProjectCharterKeySuccessResult);
                    $('#overAllStatusPerformanceProgramHub').data('kendoGrid').dataSource.read();
                    var overAllDatacopy = JSON.parse(resOverallStatus.getOverAllStatusResult);
                    if (overAllDatacopy.length > 0) {
                        vm.overAllData = overAllDatacopy[0];
                        vm.OverallStatusColor = vm.overAllData.OverallStatus
                        vm.overAllData.StatusLastUpdated = kendo.toString(kendo.parseDate(vm.overAllData.StatusLastUpdated), 'dd-MMM-yy');
                        angular.copy(vm.overAllData, vm.OverAllDataMain);
                        $scope.$digest();
                        $rootScope.$emit("UpdateOverallStatus", vm.overAllData);
                    }
                }
                catch (err) {
                    var dataToSend = {
                        "method": "getDataForOverallStatus", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            alert(errormessage);
                        });
                }
            });
    }


    function RiskIssueLinkBulkEdit() {
        var dsRisk = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    // on success
                    e.success(projectHubProjects);
                },
                sort: [{ field: "StatusIndicator", dir: "desc" },
                {
                    field: "DueDate", dir: "asc"
                }],
            },

        });
        $("#gridPrgHubLinkRiskIssueBulkEdit").kendoGrid({
            dataSource: dsRisk,
            // height: 400,
            sortable: false,
            selectable: true,
            navigatable: true,
            detailInit: detailInitRisk,
            columns: [
                {
                    field: "ProjectName",
                    title: "ProjectName",
                    attributes: { class: "ProgHub#:ProjLevel#" },
                    headerAttributes: { "class": "wrap-header" },
                }
            ],
            //remove: function (e) {
            //    gridDataDelete = true;
            //}
        });

    }
    function detailInitRisk(e) {
        var riskData = gridRiskIssueBulkData.filter(function (val) {
            return (val.ProjectID == e.data.ProjectID);
        });

        var show = true;
        if (riskData.length == 1) {
            if ((riskData[0].RiskIssueUniqueID == null) && (e.data.ProjectID != SeletedProjectId)) {
                show = false;
            }
        }
        if (riskData.length == 0) {
            show = false;
        }
        if (show) {
            var hideLink = false;
            vm.showadd = false;
            if (e.data.ProjectID == SeletedProjectId) {
                hideLink = true;
                vm.showadd = true;
            }
            var gridOptions = {

                dataSource: {
                    sort: [
                        {
                            field: "DueDate", dir: "asc"
                        }],
                    transport: {
                        read: function (e) {
                            // on success
                            e.success(gridRiskIssueBulkData);
                        }
                    },
                    filter: { field: "ProjectID", operator: "eq", value: e.data.ProjectID },
                    schema: {
                        model: {
                            id: 'RiskIssueUniqueID',
                            fields: {
                                ProjectID: { editable: false, hidden: true, defaultValue: SeletedProjectId },
                                RiskIssueUniqueID: { editable: false, hidden: true },
                                RiskIssueTypeID: { type: "string" },
                                IfHappens: { type: "string" },
                                ProbabilityID: { type: "string" },
                                RiskIssueResult: { type: "string" },
                                ImpactID: { type: "string" },
                                Mitigation: { type: "string" },
                                OwnerID: { type: "string" },
                                OwnerName: { type: "string" },
                                DueDate: { type: "date", defaultValue: null },
                                CloseDate: { type: "date", defaultValue: null },
                                IsLinked: { type: "boolean" }
                            }
                        }
                    },
                },
                scrollable: false,
                // sortable: true,
                editable: false,
                navigatable: true,
                columns: [
                    {
                        field: "ProjectName",
                        title: "ProjectName",
                    },
                    {
                        field: "ProjectID",
                        title: "ProjectID",
                        editable: false, hidden: true,
                    },
                    {
                        template: "",
                        field: "StatusIndicator",
                        title: " ",
                        width: ".5%",
                        attributes: { class: "#:StatusIndicator#" },
                    },
                    {
                        field: "RiskIssueTypeID",
                        title: "Type",
                        width: "7%",
                        values: riskIssueTypeBulk
                    }, {
                        field: "IfHappens",
                        title: "If This Happens",
                        headerAttributes: { "class": "wrap-header" },
                        width: "20%",
                    }, {
                        field: "ProbabilityID",
                        title: "Probability",
                        values: probabilityBulk,
                        width: "8%",
                    }, {
                        field: "RiskIssueResult",
                        title: "This Is The Result",
                        headerAttributes: { "class": "wrap-header" },
                        width: "18%",

                    }, {
                        field: "ImpactID",
                        title: "Impact",
                        width: "9%",
                        values: impactBulk
                    }, {
                        field: "Mitigation",
                        title: "Mitigation",
                        width: "20%",
                    },
                    {
                        field: "OwnerID",
                        title: "Owner",
                        headerAttributes: { "class": "wrap-header" },
                        width: "12%",
                        editor: riskIssueUserLinkDropDownEditor,
                        template: function (e) {
                            if (e.OwnerName != null || e.OwnerName != "") {
                                var teamMember;
                                teamMember = riskIssueUsers.filter(function (entry) {
                                    return (entry.value == e.OwnerID && entry.ProjectID == e.ProjectID);
                                });
                                if (teamMember.length > 0) {
                                    e.OwnerName = teamMember[0].text;
                                }
                                else {
                                    e.OwnerName = "";
                                    e.OwnerName = "";
                                }
                            }
                            return e.OwnerName;
                        }
                    },
                    {
                        field: "DueDate",
                        title: "Due Date (mm/dd/yyyy)",
                        headerAttributes: { "class": "wrap-header" },
                        width: "10%",
                        format: "{0:MM/dd/yyyy}",
                    },
                    {
                        field: "CloseDate",
                        title: "Close Date (mm/dd/yyyy)",
                        headerAttributes: { "class": "wrap-header" },
                        width: "10%",
                        format: "{0:MM/dd/yyyy}",
                        editor: CompletedDateEditor
                    },
                    {
                        // field: "IsLinked",
                        title: "Link",
                        headerAttributes: { "class": "wrap-header" },
                        width: "5%",
                        headerTemplate: '<label>Link</label><br><input type="checkbox" class="chkheader">',
                        template: function (e) {
                            if (e.IsLinked == true) {
                                return dirtyField(e, 'IsLinked') + '<input type="checkbox" checked class="chkbxlink" />';
                            }
                            else {
                                return dirtyField(e, 'IsLinked') + '<input type="checkbox" class="chkbxlink" />';
                            }
                        }
                    },
                    //{
                    //    command: [{ name: "destroy", text: " " }], title: " ", width: "5%"
                    //}

                ],
                dataBound: function (dt) {
                    var grid = this;
                    $(".chkbxlink").bind("change", function (e) {
                        var selectedRow = $(e.target).parent().parent();
                        var currentGrid = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid');
                        if (currentGrid != undefined) {
                            var dataItem = currentGrid.dataItem(selectedRow);
                            // var cell = $(e.target).closest('.k-detail-row').closest('td');
                            //  $(cell).prepend("<span class='k-dirty'></span>");

                            var cell1 = e.target.closest('td');
                            $(cell1).prepend("<span class='k-dirty'></span>");

                            dataItem.set("IsLinked", this.checked);
                        }
                    });
                    $('.chkheader').change(function (e) {
                        var checked = e.target.checked;
                        var currentGrid = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid');
                        if (currentGrid != undefined) {
                            var data = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid').dataSource.view();
                            for (var i = 0; i < data.length; i++) {
                                data[i].set("IsLinked", checked);
                            }

                        }
                    });
                },
                remove: function (e) {
                    var data = e.model;
                    if (data.RiskIssueUniqueID != 'undefined' && data.RiskIssueUniqueID != "")
                        deletedRiskIssue.push({ "RiskIssueUniqueID": data.RiskIssueUniqueID });
                }
            };

            var detailGrid = $("<div/>").appendTo(e.detailCell).kendoGrid(gridOptions).data("kendoGrid");
            detailGrid.tbody.on("keydown", function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    var hasCombo = $(e.target).closest(".k-combobox").length;
                    if (hasCombo) {
                        detailGrid.editCell(detailGrid.current());
                        $("[data-role='combobox']").data("kendoComboBox").dataSource.read();
                    }
                }
            });
        }
        else {
            $("<div><span>No Risk Issues found</span></div>").appendTo(e.detailCell)
        }
    }
    var dirtyField = function (data, fieldName) {
        if (data.dirty && data.dirtyFields[fieldName]) {
            return "<span class='k-dirty'></span>";
        }
        else {
            return "";
        }
    };

    function AskNeedLinkBulkEdit() {
        var dsAskNeed = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    // on success
                    e.success(projectHubProjects);
                },
                sort: [{ field: "SortOrder", dir: "asc" }
                ]
            },
        });

        var grid = $("#gridPrgHubLinkAskNeedBulkEdit").kendoGrid({
            dataSource: dsAskNeed,
            groupable: false,
            sortable: false,
            detailInit: detailInitAskNeed,
            columns: [
                {
                    field: "ProjectName",
                    title: "ProjectName",
                    attributes: { class: "ProgHub#:ProjLevel#" },
                    headerAttributes: { "class": "wrap-header" },
                }
            ]
        }).data("kendoGrid");
        //var template = kendo.template($("#styletemplate").html()).bind(grid);
        //grid.setOptions({
        //    rowTemplate: template
        //});

    }
    function detailInitAskNeed(e) {
        var askNeedData = gridAskNeedBulkData.filter(function (val) {
            return (val.ProjectID == e.data.ProjectID);
        });
        var show = true;

        if (askNeedData.length == 1) {
            if ((askNeedData[0].AskNeedUniqueID == null) && (e.data.ProjectID != SeletedProjectId)) {
                show = false;
            }
        }
        if (askNeedData.length == 0) { show = false; }

        if (show) {
            var hideLink = false;
            if (e.data.ProjectID == SeletedProjectId) {
                hideLink = true;
            }
            var gridoptions = {
                dataSource: {
                    sort: [{ field: "NeedByDate", dir: "asc" }],
                    transport: {
                        read: function (e) {
                            // on success
                            e.success(gridAskNeedBulkData);
                        }
                    },
                    filter: { field: "ProjectID", operator: "eq", value: e.data.ProjectID },
                    schema: {
                        model: {
                            id: "AskNeedUniqueID",
                            fields: {
                                AskNeedUniqueID: {
                                    editable: false, hidden: true
                                },
                                ProjectID: { editable: false, hidden: true, defaultValue: SeletedProjectId },
                                AskNeed: {
                                    type: "string"
                                },
                                NeedFromID: {
                                    type: "string"
                                },
                                NeedFromName: {
                                    type: "string"
                                },
                                NeedByDate: {
                                    type: "date", defaultValue: null
                                },
                                Comments: {
                                    type: "string"
                                },
                                CloseDate: {
                                    type: "date", defaultValue: null
                                },
                                IsLinked: { type: "boolean", hidden: hideLink }

                            }
                        }
                    }

                },
                scrollable: false,
                //sortable: true,
                editable: false,
                navigatable: true,
                columns: [
                    {
                        field: "AskNeedUniqueID",
                        title: "AskNeedUniqueID",
                        hidden: true

                    },
                    {
                        field: "ProjectID",
                        title: "ProjectID",
                        hidden: true

                    },
                    {
                        template: "",
                        field: "StatusIndicator",
                        title: " ",
                        width: ".5%",
                        attributes: { class: "#:StatusIndicator#" },
                    },
                    {
                        field: "AskNeed",
                        title: "Ask Need",
                        headerAttributes: { "class": "wrap-header" },
                        width: "30%",
                    },
                    {
                        field: "NeedFromID",
                        title: "Need From",
                        headerAttributes: { "class": "wrap-header" },
                        width: "20%",
                        editor: askNeeduserLinkDropDownEditor,
                        template: function (e) {
                            if (e.NeedFromName != null) {
                                var teamMember;
                                teamMember = askNeedUsers.filter(function (entry) {
                                    return (entry.value == e.NeedFromID && entry.ProjectID == e.ProjectID);
                                });
                                if (teamMember.length > 0) {
                                    e.NeedFromName = teamMember[0].text;
                                }
                                else {
                                    e.NeedFromName = "";
                                    e.NeedFromID = "";
                                }
                            }
                            return e.NeedFromName;
                        },
                    },
                    {
                        field: "NeedByDate",
                        title: "Need Date (mm/dd/yyyy)",
                        headerAttributes: { "class": "wrap-header" },
                        width: "10%",
                        format: "{0:MM/dd/yyyy}",
                    }, {
                        field: "Comments",
                        title: "Comments",
                        width: "30%"
                    }, {
                        field: "CloseDate",
                        title: "Close Date (mm/dd/yyyy)",
                        headerAttributes: { "class": "wrap-header" },
                        width: "10%",
                        format: "{0:MM/dd/yyyy}",
                        editor: CompletedDateEditor
                    },
                    {
                        //field: "IsLinked",
                        title: "Link",
                        headerAttributes: { "class": "wrap-header" },
                        width: "5%",
                        //hidden: hideLink,
                        headerTemplate: '<label>Link</label><br><input type="checkbox" class="chkheader">',
                        template: function (e) {
                            if (e.IsLinked == true) {
                                return dirtyField(e, 'IsLinked') + '<input type="checkbox" checked class="chkbxlink" />';
                            }
                            else {
                                return dirtyField(e, 'IsLinked') + '<input type="checkbox" class="chkbxlink" />';
                            }
                        }
                    },
                    //{
                    //    command: [{ name: "destroy", text: " " }], title: " ", width: "4%"
                    //}

                ],
                dataBound: function (dt) {
                    var grid = this;
                    $(".chkbxlink").bind("change", function (e) {
                        var selectedRow = $(e.target).parent().parent();
                        var currentGrid = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid');
                        if (currentGrid != undefined) {
                            var dataItem = currentGrid.dataItem(selectedRow);
                            var cell = $(e.target).closest('.k-detail-row').closest('td');
                            $(cell).prepend("<span class='k-dirty'></span>");
                            dataItem.set("IsLinked", this.checked);
                            //dataItem.dirty = true;
                        }
                    });

                    $('.chkheader').change(function (e) {
                        var checked = e.target.checked;
                        var currentGrid = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid');
                        if (currentGrid != undefined) {
                            var data = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid').dataSource.view();
                            for (var i = 0; i < data.length; i++) {
                                data[i].set("IsLinked", checked);
                            }


                        }
                    });

                },
                remove: function (e) {
                    var data = e.model;
                    if (data.AskNeedUniqueID != 'undefined' && data.AskNeedUniqueID != "")
                        deletedAskNeed.push({ "AskNeedUniqueID": data.AskNeedUniqueID });
                }
            };

            var detailGrid = $("<div/>").appendTo(e.detailCell).kendoGrid(gridoptions).data("kendoGrid");
            detailGrid.tbody.on("keydown", function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    var hasCombo = $(e.target).closest(".k-combobox").length;
                    if (hasCombo) {
                        detailGrid.editCell(detailGrid.current());
                        $("[data-role='combobox']").data("kendoComboBox").dataSource.read();
                    }
                }
            });
        }
        else {
            $("<div id='editAskNeed'><span>No Asks & Needs  found</span></div>").appendTo(e.detailCell)
        }
    }
    function ScheduleLinkBulkEdit() {
        var dsSchedule = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    // on success
                    e.success(projectHubProjects);
                },
                sort: [{ field: "SortOrder", dir: "asc" }
                ]
            },
        });

        var grid = $("#gridPrgHubLinkScheduleBulkEdit").kendoGrid({
            dataSource: dsSchedule,
            groupable: false,
            sortable: false,
            detailInit: detailInitSchedule,
            columns: [
                {
                    field: "ProjectName",
                    title: "ProjectName",
                    attributes: { class: "ProgHub#:ProjLevel#" },
                    headerAttributes: { "class": "wrap-header" },
                }
            ]
        }).data("kendoGrid");

    }
    function detailInitSchedule(e) {
        var milestonedata = gridScheduleBulkData.filter(function (val) {
            return (val.ProjectID == e.data.ProjectID);
        });
        var show = true;
        if (milestonedata.length == 1) {
            if ((milestonedata[0].ScheduleUniqueID == null) && (e.data.ProjectID != SeletedProjectId)) {
                show = false;
            }
        }
        if (milestonedata.length == 0) {
            show = false;
        }
        if (show) {
            var hideLink = false;
            if (e.data.ProjectID == SeletedProjectId) {
                hideLink = true;
            }
            var gridOptions = {
                dataSource: {
                    sort: [{ field: "BaselineFinish", dir: "asc" },
                    { field: "PlannedFinish", dir: "asc" }],
                    transport: {
                        read: function (e) {
                            // on success
                            e.success(gridScheduleBulkData);
                        }
                    },
                    filter: { field: "ProjectID", operator: "eq", value: e.data.ProjectID },
                    schema: {
                        model: {
                            id: "ScheduleUniqueID",
                            fields: {
                                ScheduleUniqueID: {
                                    hidden: true
                                },
                                ProjectID: { editable: false, hidden: true, defaultValue: SeletedProjectId },
                                Milestone: {
                                    type: "string"
                                },
                                PlannedFinish: {
                                    type: "date", defaultValue: null
                                },
                                BaselineFinish: {
                                    type: "date", defaultValue: null, editable: false,
                                },
                                Variance: {
                                    type: "string", editable: false,
                                },
                                CompletionDate: {
                                    type: "date", defaultValue: null,
                                },
                                Comments: {
                                    type: "string"
                                },
                                IsLinked: { type: "boolean", hidden: hideLink },
                            }
                        }
                    }
                },
                scrollable: false,
                //sortable: true,
                editable: false,
                navigatable: true,
                columns: [
                    {
                        field: "ScheduleUniqueID",
                        title: "Id",
                        editable: false, hidden: true,
                        headerAttributes: { "class": "wrap-header" }
                    },
                    {
                        field: "ProjectID",
                        title: "ProjectID",
                        editable: false, hidden: true,
                    },
                    {
                        template: "",
                        field: "StatusIndicator",
                        title: " ",
                        width: ".5%",
                        attributes: { class: "#:StatusIndicator#" },
                    },
                    {
                        field: "Milestone",
                        title: "Milestone",
                        width: "25%",
                        headerAttributes: { "class": "wrap-header" },
                        template: function (e) {
                            var value = "";
                            if (e.MilestoneType == 1 || e.MilestoneType == 2) {
                                if (e.Milestone.split('-')[1] == MilestoneExecutionInsert || e.Milestone.split('-')[1].trim() == "") {
                                    value = (e.Milestone != null && e.Milestone != "") ? "<span class='RedQuality'>" + ((e.MilestoneType == 1) ? MilestoneStartPrefix : MilestoneEndPrefix) + MilestoneExecutionInsert + "</span>" : '';
                                }
                                else {
                                    value = (e.Milestone != null && e.Milestone != "") ? e.Milestone : '';
                                }
                            }
                            else
                                value = (e.Milestone != null && e.Milestone != "") ? e.Milestone : '';
                            return value;
                        }

                    },
                    {
                        field: "PlannedFinish",
                        title: "Planned Finish (mm/dd/yyyy)",
                        width: "12%",
                        format: "{0:MM/dd/yyyy}",
                        headerAttributes: { "class": "wrap-header" }

                    },
                    {
                        field: "BaselineFinish",
                        title: "Baseline Finish (mm/dd/yyyy)",
                        width: "12%",
                        format: "{0:MM/dd/yyyy}",
                        headerAttributes: { "class": "wrap-header" }
                    },
                    {
                        field: "Variance",
                        title: "Variance",
                        width: "10%",
                        editable: false,
                        attributes: { class: "txt-float-R" },
                        //   headerAttributes: { "class": "txt-float-R" },
                        template: "#= Variance == ''? '':( Variance == 'NA'? 'NA': Variance +' days')#",
                        //headerAttributes: { "class": "wrap-header" }
                    },
                    {
                        field: "CompletionDate",
                        title: "Completion Date (mm/dd/yyy)",
                        width: "12%",
                        format: "{0:MM/dd/yyyy}",
                        headerAttributes: { "class": "wrap-header" },
                        editor: CompletedDateEditor
                    },
                    {
                        field: "Comments",
                        title: "Comments",
                        width: "25%",
                        headerAttributes: { "class": "wrap-header" },
                    },
                    {
                        // field: "IsLinked",
                        title: "Link",
                        headerAttributes: { "class": "wrap-header" },
                        width: "5%",
                        headerTemplate: '<label>Link</label><br><input type="checkbox" class="chkheader">',
                        template: function (e) {
                            if (e.IsLinked == true) {
                                return dirtyField(e, 'IsLinked') + '<input type="checkbox" checked class="chkbxlink" />';
                            }
                            else {
                                return dirtyField(e, 'IsLinked') + '<input type="checkbox" class="chkbxlink" />';
                            }
                        }
                    },
                ],
                //edit: function (e) {
                //    try {
                //        var grid = this;
                //        if (e.container.find('[name="PlannedFinish"]').data('kendoDatePicker') != undefined) {
                //            e.container.find('[name="PlannedFinish"]').data('kendoDatePicker').bind('change', function () {
                //                if (e.model.BaselineFinish != null) {
                //                    var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                //                    var grid = this.wrapper.closest("tr.k-detail-row").find('.k-grid').data('kendoGrid');
                //                    var selectedRow = this.wrapper.closest("tr");
                //                    var dataItem = grid.dataItem(selectedRow);
                //                    dataItem["Variance"] = variance;
                //                    grid.refresh();
                //                }
                //            });
                //        }
                //        if (e.container.find('[name="CompletionDate"]').data('kendoDatePicker') != undefined) {
                //            e.container.find('[name="CompletionDate"]').data('kendoDatePicker').bind('change', function () {
                //                if (e.model.BaselineFinish != null) {
                //                    var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                //                    var grid = this.wrapper.closest("tr.k-detail-row").find('.k-grid').data('kendoGrid');
                //                    var selectedRow = this.wrapper.closest("tr");
                //                    var dataItem = grid.dataItem(selectedRow);
                //                    dataItem["Variance"] = variance;
                //                    grid.refresh();
                //                }

                //            });
                //        }
                //    }
                //    catch (err) {
                //        var dataToSend = {
                //            "method": "detailInitSchedule(Edit)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                //        };
                //        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                //            .then(function (response) {
                //                //  alert(errormessage);
                //            });
                //    }
                //},
                dataBound: function (dt) {
                    var grid = this;
                    $(".chkbxlink").bind("change", function (e) {
                        var selectedRow = $(e.target).parent().parent();
                        var currentGrid = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid');
                        if (currentGrid != undefined) {
                            var dataItem = currentGrid.dataItem(selectedRow);
                            var cell = $(e.target).closest('.k-detail-row').closest('td');
                            $(cell).prepend("<span class='k-dirty'></span>");
                            dataItem.set("IsLinked", this.checked);
                        }
                    });
                    $('.chkheader').change(function (e) {
                        var checked = e.target.checked;
                        var currentGrid = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid');
                        if (currentGrid != undefined) {
                            var data = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid').dataSource.view();
                            for (var i = 0; i < data.length; i++) {
                                data[i].set("IsLinked", checked);
                            }


                        }
                    });
                },
                remove: function (e) {
                    var data = e.model;
                    if (data.ScheduleUniqueID != 'undefined' && data.ScheduleUniqueID != "")
                        deletedMilestones.push({ "ScheduleUniqueID": data.ScheduleUniqueID });
                }
            };
            $("<div/>").appendTo(e.detailCell).kendoGrid(gridOptions);
        }
        else {
            $("<div><span>No Milestones found</span></div>").appendTo(e.detailCell)
        }
    }
    function SetVariance(PlannedFinish, BaselineFinish, CompletionDate) {
        var variance = "NA";
        try {
            if (CompletionDate != null && BaselineFinish != null) {
                // var days = (CompletionDate - BaselineFinish) / (1000 * 60 * 60 * 24);
                variance = Math.floor((Date.UTC(CompletionDate.getFullYear(), CompletionDate.getMonth(), CompletionDate.getDate()) - Date.UTC(BaselineFinish.getFullYear(), BaselineFinish.getMonth(), BaselineFinish.getDate())) / (1000 * 60 * 60 * 24));
                //variance = Math.round(days);
            }
            else {
                if (PlannedFinish != null && BaselineFinish != null) {
                    if (new Date() > PlannedFinish) {
                        if (BaselineFinish != null) {
                            //var days = (new Date() - BaselineFinish) / (1000 * 60 * 60 * 24);
                            variance = Math.floor((Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) - Date.UTC(BaselineFinish.getFullYear(), BaselineFinish.getMonth(), BaselineFinish.getDate())) / (1000 * 60 * 60 * 24));
                            // variance = Math.round(days);
                        }
                    }
                    else {
                        if (PlannedFinish != null && BaselineFinish != null) {
                            //var days = (PlannedFinish - BaselineFinish) / (1000 * 60 * 60 * 24);
                            variance = Math.floor((Date.UTC(PlannedFinish.getFullYear(), PlannedFinish.getMonth(), PlannedFinish.getDate()) - Date.UTC(BaselineFinish.getFullYear(), BaselineFinish.getMonth(), BaselineFinish.getDate())) / (1000 * 60 * 60 * 24));
                        }
                    }
                }
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "SetVariance", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
        return variance;
    }

    function SetDefaultOverallStatus() {
        OriginalOverallStatus = {};
        angular.copy(vm.overAllData, OriginalOverallStatus);
        if (vm.overAllData != null || vm.overAllData != undefined) {
            var statuslist = $("#overallstatus").data("kendoComboBox");
            statuslist.value(vm.overAllData.OverallStatusID);
            statuslist.refresh();
        }
    }
    function IncludeClosedRiskIssue() {
        try {

            if (vm.riskIssueClosed) {
                var dataSource = new kendo.data.DataSource({
                    data: gridAllDataRiskIssue,
                    sort: [
                        { field: "DueDate", dir: "asc" }]

                });
                //var gridbulk = $('#gridRiskIssueBulkEdit').data('kendoGrid');
                var grid = $('#gridRiskIssuePrgHub').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                angular.copy(gridAllDataRiskIssue, gridDataRiskIssue);
                //Bulk Edit
                angular.copy(riskIssueBulkData, gridRiskIssueBulkData);
                $('#gridPrgRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
                $('#gridPrgHubLinkRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
            }
            else {
                var incompleteData = gridAllDataRiskIssue.filter(function (entry) {
                    return entry.CloseDate == null;
                });
                angular.copy(incompleteData, gridDataRiskIssue);
                var dataSource = new kendo.data.DataSource({
                    data: gridDataRiskIssue,
                    sort: [
                        { field: "DueDate", dir: "asc" }]

                });
                var grid = $('#gridRiskIssuePrgHub').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                //Bulk Edit
                var incompleteBulkData = riskIssueBulkData.filter(function (entry) {
                    return entry.CloseDate == null;
                });
                angular.copy(incompleteBulkData, gridRiskIssueBulkData);
                $('#gridPrgRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
                $('#gridPrgHubLinkRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
            }
            riskIssueUsers = [];
            angular.forEach(gridRiskIssueBulkData, function (item, index) {
                if (item.OwnerID != null && item.OwnerID != "") {
                    var user = riskIssueUsers.filter(function (val) {
                        return (val.value == item.OwnerID && val.ProjectID == item.ProjectID);
                    });
                    if (user.length == 0) {
                        var temp = {};
                        temp.text = item.OwnerName;
                        temp.value = item.OwnerID;
                        temp.UserCountry = item.UserCountry,
                            temp.UserImageUrl = item.UserImageUrl,
                            temp.UserEmailAddress = item.UserEmailAddress,
                            temp.UserDepartment = item.UserDepartment,
                            temp.ProjectID = item.ProjectID
                        riskIssueUsers.push(temp);
                    }
                }
            });
            $('#gridPrgRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
            $('#gridPrgHubLinkRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
        }
        catch (err) {
            var dataToSend = {
                "method": "IncludeClosedRiskIssue", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }

        // $scope.$digest();

    }
    function IncludeClosedMilestone() {
        try {
            if (vm.scheduleClosed) {
                var dataSource = new kendo.data.DataSource({
                    data: gridAllDataSchedule,
                    sort: [{ field: "BaselineFinish", dir: "asc" },
                    { field: "PlannedFinish", dir: "asc" }]
                });
                var grid = $('#gridSchedulePrgHub').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                angular.copy(gridAllDataSchedule, gridDataSchedule);
                //Bulk Edit datasource refersh
                angular.copy(scheduleBulkData, gridScheduleBulkData);
                $('#gridPrgHubLinkScheduleBulkEdit').data('kendoGrid').dataSource.read();
                $('#gridPrgScheduleBulkEdit').data('kendoGrid').dataSource.read();
                if (milestoneToAdd.length > 0) {
                    var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
                    angular.forEach(milestoneToAdd, function (item, index) {
                        var dataItem = grid.dataSource.get(item.ScheduleUniqueID);
                        dataItem.dirty = true;
                    });
                    $('#gridPrgScheduleBulkEdit').data('kendoGrid').refresh();
                }
            }
            else {
                var incompleteData = gridAllDataSchedule.filter(function (entry) {
                    return entry.CompletionDate == null;
                });
                angular.copy(incompleteData, gridDataSchedule);
                var dataSource = new kendo.data.DataSource({
                    data: gridDataSchedule,
                    sort: [{ field: "BaselineFinish", dir: "asc" },
                    { field: "PlannedFinish", dir: "asc" }]

                });
                var grid = $('#gridSchedulePrgHub').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                // Bulk Edit 
                var incompleteBulkData = scheduleBulkData.filter(function (entry) {
                    return entry.CompletionDate == null;
                });
                angular.copy(incompleteBulkData, gridScheduleBulkData);
                $('#gridPrgHubLinkScheduleBulkEdit').data('kendoGrid').dataSource.read();
                $('#gridPrgScheduleBulkEdit').data('kendoGrid').dataSource.read();
                if (milestoneToAdd.length > 0) {
                    var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
                    var filterdata = milestoneToAdd.filter(function (entry) {
                        return entry.CompletionDate == null;
                    });
                    if (filterdata.length > 0) {
                        angular.forEach(filterdata, function (item, index) {
                            var dataItem = grid.dataSource.get(item.ScheduleUniqueID);
                            dataItem.dirty = true;
                        });
                    }
                    else {
                        if (gridDataSchedule.length > 0) {
                            var id = gridDataSchedule[0].ScheduleUniqueID;
                            var dataItem = grid.dataSource.get(id);
                            dataItem.dirty = true;
                        }
                    }
                    $('#gridPrgScheduleBulkEdit').data('kendoGrid').refresh();
                }
            }

        }
        catch (err) {
            var dataToSend = {
                "method": "IncludeClosedMilestone", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }

    }
    function IncludeClosedAskNeed() {
        try {
            if (vm.askNeedClosed) {
                var dataSource = new kendo.data.DataSource({
                    data: gridAllDataAskNeed,
                    sort: [//{ field: "StatusIndicator", dir: "desc" },
                        { field: "NeedByDate", dir: "asc" }]

                });
                var grid = $('#gridAskNeedPrgHub').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                angular.copy(gridAllDataAskNeed, gridDataAskNeed);
                //Bulk Edit datasource refresh
                angular.copy(askNeedBulkData, gridAskNeedBulkData);
                $('#gridPrgAskNeedBulkEdit').data('kendoGrid').dataSource.read();
                $('#gridPrgHubLinkAskNeedBulkEdit').data('kendoGrid').dataSource.read();
            }
            else {
                var incompleteData = gridAllDataAskNeed.filter(function (entry) {
                    return entry.CloseDate == null;
                });
                angular.copy(incompleteData, gridDataAskNeed);

                var dataSource = new kendo.data.DataSource({
                    data: gridDataAskNeed,
                    sort: [//{ field: "StatusIndicator", dir: "desc" },
                        { field: "NeedByDate", dir: "asc" }]
                });
                var grid = $('#gridAskNeedPrgHub').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);

                //Bulk Edit data refresh
                var incompleteBulkData = askNeedBulkData.filter(function (entry) {
                    return entry.CloseDate == null;
                });
                angular.copy(incompleteBulkData, gridAskNeedBulkData);
                $('#gridPrgAskNeedBulkEdit').data('kendoGrid').dataSource.read();
                $('#gridPrgHubLinkAskNeedBulkEdit').data('kendoGrid').dataSource.read();
            }
            askNeedUsers = [];
            angular.forEach(gridAskNeedBulkData, function (item, index) {
                if (item.NeedFromID != null && item.NeedFromID != "") {
                    var user = askNeedUsers.filter(function (val) {
                        return (val.value == item.NeedFromID && val.ProjectID == item.ProjectID);
                    });
                    if (user.length == 0) {
                        var temp = {};
                        temp.text = item.NeedFromName;
                        temp.value = item.NeedFromID;
                        temp.UserCountry = item.UserCountry,
                            temp.UserImageUrl = item.UserImageUrl,
                            temp.UserEmailAddress = item.UserEmailAddress,
                            temp.UserDepartment = item.UserDepartment,
                            temp.ProjectID = item.ProjectID
                        askNeedUsers.push(temp);
                    }
                }
            });
            $('#gridPrgAskNeedBulkEdit').data('kendoGrid').dataSource.read();
            $('#gridPrgHubLinkAskNeedBulkEdit').data('kendoGrid').dataSource.read();
        }
        catch (err) {
            var dataToSend = {
                "method": "IncludeClosedAskNeed", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }

    }
    function CheckIncludeClosedRiskIssue(gridId) {
        var grid = $('#' + gridId).data('kendoGrid');
        document.activeElement.blur();
        if (grid.dataSource.hasChanges()) {
            if (!confirm(includeClosedItemsMsg)) {
                vm.riskIssueClosed = !(vm.riskIssueClosed);
                return;
            }
        }
        IncludeClosedRiskIssue();
    }
    function CheckLinkIncludeClosedRiskIssue(gridId) {
        var grid = $('#' + gridId).data('kendoGrid');
        document.activeElement.blur();
        var blnHaschanges = false;
        var detailRows = grid.element.find(".k-detail-row");
        for (var i = 0; i < detailRows.length; i++) {
            var detailGrid = $(detailRows[i]).find(".k-grid").data("kendoGrid");
            if (detailGrid != undefined) {
                if (detailGrid.dataSource.hasChanges()) {
                    blnHaschanges = true;

                }
            }
        }
        if (blnHaschanges) {
            if (!confirm(includeClosedItemsMsg)) {
                vm.riskIssueClosed = !(vm.riskIssueClosed);
                return;
            }
        }
        IncludeClosedRiskIssue();
    }
    function CheckIncludeClosedAskNeed(gridId) {
        var grid = $('#' + gridId).data('kendoGrid');
        document.activeElement.blur();
        if (grid.dataSource.hasChanges()) {
            if (!confirm(includeClosedItemsMsg)) {
                vm.askNeedClosed = !(vm.askNeedClosed);
                return;
            }
        }
        IncludeClosedAskNeed();
    }
    function CheckLinkIncludeClosedAskNeed(gridId) {
        var grid = $('#' + gridId).data('kendoGrid');
        document.activeElement.blur();
        var blnHaschanges = false;
        var detailRows = grid.element.find(".k-detail-row");
        for (var i = 0; i < detailRows.length; i++) {
            var detailGrid = $(detailRows[i]).find(".k-grid").data("kendoGrid");
            if (detailGrid != undefined) {
                if (detailGrid.dataSource.hasChanges()) {
                    blnHaschanges = true;
                }
            }
        }
        if (blnHaschanges) {
            if (!confirm(includeClosedItemsMsg)) {
                vm.askNeedClosed = !(vm.askNeedClosed);
                return;
            }
        }
        IncludeClosedAskNeed();
    }
    function CheckIncludeClosedMilestone(gridId) {
        var grid = $('#' + gridId).data('kendoGrid');
        document.activeElement.blur();
        if (grid.dataSource.hasChanges()) {
            if (!confirm(includeClosedItemsMsg)) {
                vm.scheduleClosed = !(vm.scheduleClosed);
                return;
            }
        }
        IncludeClosedMilestone();
    }
    function CheckLinkIncludeClosedMilestone(gridId) {
        var grid = $('#' + gridId).data('kendoGrid');
        document.activeElement.blur();
        var detailRows = grid.element.find(".k-detail-row");
        var blnHaschanges = false;
        for (var i = 0; i < detailRows.length; i++) {
            var detailGrid = $(detailRows[i]).find(".k-grid").data("kendoGrid");
            if (detailGrid != undefined) {
                if (detailGrid.dataSource.hasChanges()) {
                    blnHaschanges = true;
                }
            }
        }
        if (blnHaschanges) {
            if (!confirm(includeClosedItemsMsg)) {
                vm.scheduleClosed = !(vm.scheduleClosed);
                return;
            }
        }
        IncludeClosedMilestone();
    }
    //}
    //Grid Cancel event for bulk edit to confirm before cancelation and close dialog
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
                    baselinedProjects = [];
                    baselinedMilestones = [];
                    window.data("kendoWindow").close();
                }
            }
            else {
                window.data("kendoWindow").close();
            }
            Isupdatebaseline = false;
            IsBaseline = false;
            if (milestoneToAdd.length > 0) {
                getDataForSchedule()
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
    function gridPrgCloseEvent(gridId, e) {
        try {
            if (!gridLinkDataSaved) {
                var grid = $('#' + gridId).data('kendoGrid');
                document.activeElement.blur();
                var detailRows = grid.element.find(".k-detail-row");
                for (var i = 0; i < detailRows.length; i++) {
                    var detailGrid = $(detailRows[i]).find(".k-grid").data("kendoGrid");
                    if (detailGrid != undefined) {
                        if (detailGrid.dataSource.hasChanges()) {
                            if (!confirm(dialogCancelMessage)) {
                                e.preventDefault();
                                return true;
                            }
                            else {
                                grid.dataSource.read();
                                return true;
                            }
                        }
                    }
                }


            }
            else {
                gridLinkDataSaved = false;
            }
            milestoneToAdd = [];
        }
        catch (err) {
            var dataToSend = {
                "method": "gridPrgCloseEvent", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    // alert(errormessage);
                });
        }
    }
    function DialogCloseBinding() {
        $("#dialogScheduleBulkEditPrgHub").data("kendoWindow").bind("close", function (e) {
            gridPrgCloseEvent("gridPrgHubLinkScheduleBulkEdit", e)
        });

        $("#dialogAskNeedBulkEditPrgHub").data("kendoWindow").bind("close", function (e) {
            gridPrgCloseEvent("gridPrgHubLinkAskNeedBulkEdit", e)
        });

        $("#dialogRiskIssueBulkEditPrgHub").data("kendoWindow").bind("close", function (e) {
            gridPrgCloseEvent("gridPrgHubLinkRiskIssueBulkEdit", e)
        });
        $("#dialogPrgScheduleBulkEdit").data("kendoWindow").bind("close", function (e) {
            gridCloseEvent("gridPrgScheduleBulkEdit", e)
        });

        $("#dialogPrgAskNeedBulkEdit").data("kendoWindow").bind("close", function (e) {
            gridCloseEvent("gridPrgAskNeedBulkEdit", e)
        });

        $("#dialogPrgRiskIssueBulkEdit").data("kendoWindow").bind("close", function (e) {
            gridCloseEvent("gridPrgRiskIssueBulkEdit", e)
        });
        //$("#dialogPrgScheduleBaselineCount").data("kendoWindow").bind("close", function (e) {
        //    Isupdatebaseline = true;
        //    var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
        //    grid.saveChanges();
        //});
    }
    function askNeeduserLinkDropDownEditor(container, options) {
        askNeedComboUsers = askNeedUsers.filter(function (val) {
            return (val.ProjectID == options.model.ProjectID);
        });
        $('<input name="' + options.field + '" id="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                minLength: 3,
                filtering: function (e) {
                    e.preventDefault();
                },
                placeholder: peoplepickerPlaceholderSmall,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                filter: "contains",
                dataSource: askNeedComboUsers,
                change: function (e) {
                    if (e.sender.selectedIndex != -1) {
                        var user = askNeedUsers.filter(function (val) {
                            return (val.value == e.sender.dataItem(e.item).value && val.ProjectID == options.model.ProjectID);
                        });
                        if (user.length == 0) {
                            askNeedUsers.push({
                                text: e.sender.dataItem(e.item).text, value: e.sender.dataItem(e.item).value, UserCountry: e.sender.dataItem(e.item).UserCountry,
                                UserImageUrl: e.sender.dataItem(e.item).UserImageUrl, UserEmailAddress: e.sender.dataItem(e.item).UserEmailAddress, UserDepartment: e.sender.dataItem(e.item).UserDepartment,
                                ProjectID: options.model.ProjectID
                            });
                        }
                    }
                },
                valueTemplate: '<span class="selected-value" style="background-image:url(#: UserImageUrl#)"></span><span>#: text#</span>',
                template: "<span class='k-state-default' style=background-image:url(#: UserImageUrl#)></span><span class='k-state-default'><h3>#: text#</h3># if (UserEmailAddress != null) {#<p>#: UserEmailAddress#</p># } if (UserDepartment != null) {# <p><span> #:UserDepartment#</span># }if (UserCountry != null) {# <span>#:UserCountry#</span></p># } #</span>"
            });

        $("#" + options.field).data("kendoComboBox").input.on('keydown', function (e) {
            //userControlSearch(e,$(this).attr('id'));
            GETPostService.searchPeopleBulkEdit(e, e.currentTarget.name.replace("_input", "")).then(function (response) {
                try {
                    if (response.length > 0) {
                        var resources = [];
                        angular.copy(askNeedComboUsers, resources);
                        angular.forEach(response, function (item, index) {
                            var user = askNeedComboUsers.filter(function (val) {
                                return val.value === item.UserADId;
                            });
                            if (user.length == 0) {
                                resources.push({
                                    text: item.UserDisplayName, value: item.UserADId, UserCountry: item.UserCountry,
                                    UserImageUrl: item.UserImageUrl, UserEmailAddress: item.UserEmailAddress, UserDepartment: item.UserDepartment,
                                    ProjectID: options.model.ProjectID
                                });
                            }
                        });
                        resources.reverse();
                        var combobox = $("#" + options.field).data("kendoComboBox");
                        combobox.setDataSource(resources);
                        combobox.dataSource.read();
                    }
                }
                catch (err) {
                    var dataToSend = {
                        "method": "askNeeduserDropDownEditor", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            // alert(errormessage);
                        });
                }
            });

        });
    }
    function riskIssueUserLinkDropDownEditor(container, options) {
        riskUsers = riskIssueUsers.filter(function (val) {
            return (val.ProjectID == options.model.ProjectID);
        });
        $('<input name="' + options.field + '" id="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                minLength: 3,
                filtering: function (e) {
                    e.preventDefault();
                },
                placeholder: peoplepickerPlaceholderSmall,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                filter: "contains",
                dataSource: riskUsers,
                change: function (e) {
                    if (e.sender.selectedIndex != -1) {
                        var user = riskIssueUsers.filter(function (val) {
                            return (val.value == e.sender.dataItem(e.item).value && val.ProjectID == options.model.ProjectID);
                        });
                        if (user.length == 0) {
                            riskIssueUsers.push({
                                text: e.sender.dataItem(e.item).text, value: e.sender.dataItem(e.item).value, UserCountry: e.sender.dataItem(e.item).UserCountry,
                                UserImageUrl: e.sender.dataItem(e.item).UserImageUrl, UserEmailAddress: e.sender.dataItem(e.item).UserEmailAddress, UserDepartment: e.sender.dataItem(e.item).UserDepartment,
                                ProjectID: options.model.ProjectID
                            });
                        }
                    }
                },
                valueTemplate: '<span class="selected-value" style="background-image:url(#: UserImageUrl#)"></span><span>#: text#</span>',
                template: "<span class='k-state-default' style=background-image:url(#: UserImageUrl#)></span><span class='k-state-default'><h3>#: text#</h3># if (UserEmailAddress != null) {#<p>#: UserEmailAddress#</p># } if (UserDepartment != null) {# <p><span> #:UserDepartment#</span># }if (UserCountry != null) {# <span>#:UserCountry#</span></p># } #</span>"
            });

        $("#" + options.field).data("kendoComboBox").input.on('keydown', function (e) {
            //userControlSearch(e,$(this).attr('id'));
            GETPostService.searchPeopleBulkEdit(e, e.currentTarget.name.replace("_input", "")).then(function (response) {
                try {
                    if (response.length > 0) {
                        var combobox = $("#" + options.field).data("kendoComboBox");
                        var resources = [];
                        angular.copy(riskUsers, resources);
                        angular.forEach(response, function (item, index) {
                            var user = riskUsers.filter(function (val) {
                                return (val.value === item.UserADId);
                            });
                            if (user.length == 0) {
                                resources.push({
                                    text: item.UserDisplayName, value: item.UserADId, UserCountry: item.UserCountry,
                                    UserImageUrl: item.UserImageUrl, UserEmailAddress: item.UserEmailAddress, UserDepartment: item.UserDepartment,
                                    ProjectID: options.model.ProjectID
                                });
                            }
                        });
                        resources.reverse();
                        combobox.setDataSource(resources);
                        combobox.dataSource.read();
                    }
                }
                catch (err) {
                    var dataToSend = {
                        "method": "riskIssueUserDropDownEditor", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            // alert(errormessage);
                        });
                }
            });

        });
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
    function bindChangeDatePicker(elmentId) {
        if (elmentId == "completionDate") {
            //$("#" + elmentId).kendoDatePicker({
            //    disableDates: function (date) {
            //        if (date > new Date()) {
            //            return true;
            //        } else {
            //            return false;
            //        }
            //    },
            //    change: function () {
            //        onDateChange(this.element.attr("id"), this.value());
            //    }
            //});
            $("#" + elmentId).on("change", function (e) {
                onDateChange($(this).attr('id'));
            })
            $("#" + elmentId).on("disableDates", function (date) {
                if (date > new Date()) {
                    return true;
                } else {
                    return false;
                }
            })
        }
        else {
            //$("#" + elmentId).kendoDatePicker({
            //    change: function () {
            //        onDateChange(this.element.attr("id"), this.value());
            //    }
            //});
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
                    vm.logDateError = false;
                    break;
                case 'closeDate':
                    vm.closeDateError = false;
                    break;
                case 'dueDate':
                    vm.dueDateError = false;
                    break;
                case 'completionDate':
                    if (new Date(value) <= new Date()) {
                        vm.completeDateError = false;
                    }
                    break;
                case 'plannedFinishDate':
                    vm.plannedFinishError = false;
                    break;
                case 'askLogDate':
                    vm.askLogDateError = false;
                    break;
                case 'askCloseDate':
                    vm.askCloseDateError = false;
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
            placeholder: peoplepickerPlaceholderSmall,
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
    function BulkUpdatePrgRiskIssue() {
        var digname = "#dialogRiskIssueBulkEditPrgHub";
        try {
            displayLoading();
            var totalIncludeReportCount = 0;
            var riskmasterGrid = $("#gridPrgHubLinkRiskIssueBulkEdit").data("kendoGrid");

            var detailRows = riskmasterGrid.element.find(".k-detail-row");
            var insertedData = [];
            var updatedData = [];

            for (var i = 0; i < detailRows.length; i++) {
                var detailGrid = $(detailRows[i]).find(".k-grid").data("kendoGrid");
                if (detailGrid != undefined) {

                    var gridupdatedData = $(detailRows[i]).find(".k-grid").data("kendoGrid").dataSource.data()
                        .filter(function (x) { return x.dirty })
                        .map(function (x) { return x });
                    //var insertArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                    //    .map(function (x) { return x });
                    var updateArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                        .map(function (x) { return x });
                    //if (insertArray.length > 0) {
                    //    Array.prototype.push.apply(insertedData, insertArray);
                    //}
                    if (updateArray.length > 0) {
                        Array.prototype.push.apply(updatedData, updateArray);
                    }
                    console.log(detailGrid.dataSource.view());
                }
            }
            //if (insertedData.length > 0) {
            //    for (var i = 0; i < insertedData.length; i++) {
            //        insertedData[i].DueDate = (insertedData[i].DueDate != null && insertedData[i].DueDate != "") ? kendo.toString(insertedData[i].DueDate, "d") : null;
            //        insertedData[i].CloseDate = (insertedData[i].CloseDate != null && insertedData[i].CloseDate != "") ? kendo.toString(insertedData[i].CloseDate, "d") : null;
            //    }
            //}
            if (updatedData.length > 0) {
                for (var i = 0; i < updatedData.length; i++) {
                    updatedData[i].DueDate = (updatedData[i].DueDate != null && updatedData[i].DueDate != "") ? kendo.toString(updatedData[i].DueDate, "d") : null;
                    updatedData[i].CloseDate = (updatedData[i].CloseDate != null && updatedData[i].CloseDate != "") ? kendo.toString(updatedData[i].CloseDate, "d") : null;
                }
            }
            var dataToSend = {
                "programId": SeletedProjectId,
                "objInsert": JSON.stringify(insertedData),
                "objUpdate": JSON.stringify(updatedData),
                "objDelete": JSON.stringify(deletedRiskIssue)
            };
            if (insertedData.length > 0 || updatedData.length > 0 || deletedRiskIssue.length > 0) {
                GETPostService.postDataWCFAsync('insertUpdateProgramRiskIssue', dataToSend).then(function (response) {
                    if (response == "Success") {
                        deletedRiskIssue = [];
                        getDataForRiskIssue();
                        gridLinkDataSaved = true;
                        hideLoading();
                        var window = $(digname);
                        window.data("kendoWindow").close();
                    }
                    else {
                        alert("Error occurred in item updation for risks/issues.");
                        hideLoading();
                    }
                });
            }
            else {
                hideLoading();
                var window = $(digname);
                window.data("kendoWindow").close();
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "BulkUpdatePrgRiskIssue", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    // alert(errormessage);
                });
        }
    }
    function BulkUpdatePrgAskNeed() {
        displayLoading();
        var digname = "#dialogAskNeedBulkEditPrgHub";
        try {
            var totalIncludeReportCount = 0;
            var askNeedmasterGrid = $("#gridPrgHubLinkAskNeedBulkEdit").data("kendoGrid");
            var detailRows = askNeedmasterGrid.element.find(".k-detail-row");
            var insertedData = [];
            var updatedData = [];

            for (var i = 0; i < detailRows.length; i++) {
                var detailGrid = $(detailRows[i]).find(".k-grid").data("kendoGrid");
                if (detailGrid != undefined) {

                    var gridupdatedData = $(detailRows[i]).find(".k-grid").data("kendoGrid").dataSource.data()
                        .filter(function (x) { return x.dirty })
                        .map(function (x) { return x });
                    //var insertArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                    //    .map(function (x) { return x });
                    var updateArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                        .map(function (x) { return x });
                    //if (insertArray.length > 0) {
                    //    Array.prototype.push.apply(insertedData, insertArray);
                    //}
                    if (updateArray.length > 0) {
                        Array.prototype.push.apply(updatedData, updateArray);
                    }
                    console.log(detailGrid.dataSource.view());
                }
            }
            //if (insertedData.length > 0) {
            //    for (var i = 0; i < insertedData.length; i++) {
            //        insertedData[i].NeedByDate = (insertedData[i].NeedByDate != null && insertedData[i].NeedByDate != "") ? kendo.toString(insertedData[i].NeedByDate, "d") : null;
            //        insertedData[i].CloseDate = (insertedData[i].CloseDate != null && insertedData[i].CloseDate != "") ? kendo.toString(insertedData[i].CloseDate, "d") : null;
            //    }
            //}
            if (updatedData.length > 0) {
                for (var i = 0; i < updatedData.length; i++) {
                    updatedData[i].NeedByDate = (updatedData[i].NeedByDate != null && updatedData[i].NeedByDate != "") ? kendo.toString(updatedData[i].NeedByDate, "d") : null;
                    updatedData[i].CloseDate = (updatedData[i].CloseDate != null && updatedData[i].CloseDate != "") ? kendo.toString(updatedData[i].CloseDate, "d") : null;
                }
            }
            var dataToSend = {
                "programId": SeletedProjectId,
                "objInsert": JSON.stringify(insertedData),
                "objUpdate": JSON.stringify(updatedData),
                "objDelete": JSON.stringify(deletedAskNeed)
            };
            GETPostService.postDataWCFAsync('insertUpdateProgramAskNeed', dataToSend).then(function (response) {
                if (response == "Success") {
                    deletedAskNeed = [];
                    getDataForAskNeed();
                    gridLinkDataSaved = true;
                    hideLoading();
                    var window = $(digname);
                    window.data("kendoWindow").close();
                }
                else {
                    alert("Error occurred in item updation for Ask/Need.");
                    hideLoading();
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "BulkUpdatePrgAskNeed", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    // alert(errormessage);
                });
        }
    }
    function BulkUpdatePrgSchedule() {
        var digname = "#dialogScheduleBulkEditPrgHub";
        try {
            displayLoading();
            var totalIncludeReportCount = 0;
            var schedulemasterGrid = $("#gridPrgHubLinkScheduleBulkEdit").data("kendoGrid");
            var detailRows = schedulemasterGrid.element.find(".k-detail-row");
            var insertedData = [];
            var updatedData = [];
            for (var i = 0; i < detailRows.length; i++) {
                var detailGrid = $(detailRows[i]).find(".k-grid").data("kendoGrid");
                if (detailGrid != undefined) {
                    var gridupdatedData = $(detailRows[i]).find(".k-grid").data("kendoGrid").dataSource.data()
                        .filter(function (x) { return x.dirty })
                        .map(function (x) { return x });
                    //var insertArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                    //    .map(function (x) { return x });
                    var updateArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                        .map(function (x) { return x });
                    //if (insertArray.length > 0) {
                    //    Array.prototype.push.apply(insertedData, insertArray);
                    //}
                    if (updateArray.length > 0) {
                        Array.prototype.push.apply(updatedData, updateArray);
                    }
                    console.log(detailGrid.dataSource.view());
                }
            }
            //if (insertedData.length > 0) {
            //    for (var i = 0; i < insertedData.length; i++) {
            //        insertedData[i].PlannedFinish = (insertedData[i].PlannedFinish != null && insertedData[i].PlannedFinish != "") ? kendo.toString(insertedData[i].PlannedFinish, "d") : null;
            //        insertedData[i].BaselineFinish = (insertedData[i].BaselineFinish != null && insertedData[i].BaselineFinish != "") ? kendo.toString(insertedData[i].BaselineFinish, "d") : null;
            //        insertedData[i].CompletionDate = (insertedData[i].CompletionDate != null && insertedData[i].CompletionDate != "") ? kendo.toString(insertedData[i].CompletionDate, "d") : null;
            //    }
            //}
            if (updatedData.length > 0) {
                for (var i = 0; i < updatedData.length; i++) {
                    updatedData[i].PlannedFinish = (updatedData[i].PlannedFinish != null && updatedData[i].PlannedFinish != "") ? kendo.toString(updatedData[i].PlannedFinish, "d") : null;
                    updatedData[i].BaselineFinish = (updatedData[i].BaselineFinish != null && updatedData[i].BaselineFinish != "") ? kendo.toString(updatedData[i].BaselineFinish, "d") : null;
                    updatedData[i].CompletionDate = (updatedData[i].CompletionDate != null && updatedData[i].CompletionDate != "") ? kendo.toString(updatedData[i].CompletionDate, "d") : null;
                }
            }
            var dataToSend = {
                "programId": SeletedProjectId,
                "userId": currentUserId,
                "objInsert": JSON.stringify(insertedData),
                "objUpdate": JSON.stringify(updatedData),
                "objDelete": JSON.stringify(deletedMilestones)
            };
            GETPostService.postDataWCFAsync('insertUpdateProgramMilestones', dataToSend).then(function (response) {
                if (response == "Success") {
                    deletedMilestones = [];
                    getDataForSchedule();
                    gridLinkDataSaved = true;
                    hideLoading();
                    var window = $(digname);
                    window.data("kendoWindow").close();
                }
                else {
                    alert("Error occurred in item updation for milestones.");
                    hideLoading();
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "BulkUpdatePrgSchedule", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    // alert(errormessage);
                });
        }
    }
    function col_ProjectHubTabs_gridScheduleBulkEdit() {
        var col = [{
            field: "ScheduleUniqueID",
            title: "Id",
            editable: false, hidden: true,
            headerAttributes: { "class": "wrap-header" }
        },
        {
            field: "ProjectID",
            title: "ProjectID",
            editable: false, hidden: true,
        },
        {
            template: "",
            field: "StatusIndicator",
            title: " ",
            width: ".5%",
            attributes: { class: "#:StatusIndicator#" },
        },
        {
            template: "#if(link == 1) {#<span class='k-icon k-i-link-vertical'></span>#}" +
                        "else if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
            title: " ",
            width: "2.5%",
        },
        {
            field: "Milestone",
            title: "Milestone",
            width: "26%",
            headerAttributes: { "class": "wrap-header" },
            template: function (data) {
                if (data.MilestoneType == 1) {
                    data.Milestone = data.Milestone.replace(MilestoneStartPrefix, "");
                    if (data.Milestone == MilestoneExecutionInsert || data.Milestone.trim() == "") {
                        return ("<span class='RedQuality'><b>" + MilestoneStartPrefix + "</b>" + MilestoneExecutionInsert + "</span>");
                    }
                    else { return ("<b>" + MilestoneStartPrefix + "</b>" + data.Milestone); }
                }
                else if (data.MilestoneType == 2) {
                    data.Milestone = data.Milestone.replace(MilestoneEndPrefix, "");
                    if (data.Milestone == MilestoneExecutionInsert || data.Milestone.trim() == "") {
                        return ("<span class='RedQuality'><b>" + MilestoneEndPrefix + "</b>" + MilestoneExecutionInsert + "</span>");
                    }
                    else { return ("<b>" + MilestoneEndPrefix + "</b>" + data.Milestone); }
                }
                else
                    return data.Milestone;
            }
        },
        {
            field: "PlannedFinish",
            title: "Planned Finish (mm/dd/yyyy)",
            width: "12%",
            format: "{0:MM/dd/yyyy}",
            headerAttributes: { "class": "wrap-header" }

        },
        {
            field: "BaselineFinish",
            title: "Baseline Finish (mm/dd/yyyy)",
            width: "12%",
            format: "{0:MM/dd/yyyy}",
            headerAttributes: { "class": "wrap-header" }
        },
        {
            field: "Variance",
            title: "Variance",
            width: "15%",
            editable: false,
            template: "#=Variance == ''? '':( Variance == 'NA'? 'NA': Variance +' days')#",
            headerAttributes: { "class": "wrap-header txt-float-R" }
        },
        {
            field: "FunctionGroupID",
            title: "Function Owner",
            width: "20%",
            values: functionalgroupBulk,
            editor: FunctionalOwnerDropDownEditor,
            headerAttributes: { "class": "wrap-header" }
        },
        {
            field: "CompletionDate",
            title: "Completion Date (mm/dd/yyy)",
            width: "15%",
            format: "{0:MM/dd/yyyy}",
            headerAttributes: { "class": "wrap-header" },
            editor: CompletedDateEditor
        },
        {
            field: "Comments",
            title: "Comments",
            width: "26%",
            headerAttributes: { "class": "wrap-header" }
        },
        {
            //field: "IncludeInReport",
            title: "Include In Dashboard (Max 8)",
            width: "5%",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (e.IncludeInReport == true) {
                    return dirtyField(e, 'IncludeInReport') + '<input type="checkbox" checked class="chkbxsch" />';
                }
                else {
                    return dirtyField(e, 'IncludeInReport') + '<input type="checkbox" class="chkbxsch" />';
                }
            }
        },
        {
            command: [{
                name: "destroy",
                text: " ",
                visible: function (dataItem) {
                    if (dataItem.MilestoneType == 1)
                        return false;
                    else if (dataItem.MilestoneType == 2)
                        return false;
                    else
                        return true;
                }

            }],
            title: " ", width: "6%"
        }
        ];
        return col;
    };
    function FunctionalOwnerDropDownEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                filter: "contains",
                valuePrimitive: true,
                dataSource: functionalgroupBulk
            });
    };
    //Bulk edit grid for milestone
    function ScheduleBulkEdit() {
        var window = $("#dialogPrgScheduleBulkEdit");
        var dsSchedule = new kendo.data.DataSource({
            sort: [{ field: "MilestoneOrder", dir: "asc" }
            ],
            transport: {
                read: function (e) {
                    e.success(gridDataSchedule);
                },
                destroy: function (e) {
                    try {
                        var dataSource = $("#gridPrgScheduleBulkEdit").data("kendoGrid").dataSource;
                        var data = dataSource.data();

                        var jsonlistdata = kendo.stringify(e.data.models);
                        //var finaldata = JSON.stringify({
                        //    "scheduleData": JSON.parse(jsonlistdata)
                        //});
                        //GETPostService.postDataWCFAsync('deleteScheduleData', finaldata).then(function (response) {
                        //    //alert(response);
                        //    if (response.deleteScheduleDataResult == "Success") {
                        var dataToSend = {
                            "programId": SeletedProjectId,
                            "userId": currentUserId,
                            "objInsert": JSON.stringify([]),
                            "objUpdate": JSON.stringify([]),
                            "objDelete": JSON.stringify(JSON.parse(jsonlistdata))
                        };
                        GETPostService.postDataWCFAsync('insertUpdateProgramMilestones', dataToSend).then(function (response) {
                            if (response == "Success") {
                                e.success(e.data.models);
                                getDataForSchedule();
                                gridDataSaved = true;
                                milestoneToAdd = [];
                                window.data("kendoWindow").close();
                                //alert("Success");
                            }
                            else {
                                e.error(gridDataSchedule);
                                alert("Error occurred in item deletion for schedule.");
                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "deleteScheduleDataBulk", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) {
                                e.error(gridDataSchedule);
                                alert(errormessage);
                            });
                    }

                },
                update: function (e) {
                    try {
                        for (var i = 0; i < e.data.models.length; i++) {
                            e.data.models[i].PlannedFinish = (e.data.models[i].PlannedFinish != null && e.data.models[i].PlannedFinish != "") ? kendo.toString(e.data.models[i].PlannedFinish, "d") : null;
                            e.data.models[i].BaselineFinish = (e.data.models[i].BaselineFinish != null && e.data.models[i].BaselineFinish != "") ? kendo.toString(e.data.models[i].BaselineFinish, "d") : null;
                            e.data.models[i].CompletionDate = (e.data.models[i].CompletionDate != null && e.data.models[i].CompletionDate != "") ? kendo.toString(e.data.models[i].CompletionDate, "d") : null;
                            e.data.models[i].Milestone = (e.data.models[i].MilestoneType == 1) ? MilestoneStartPrefix + e.data.models[i].Milestone : (e.data.models[i].MilestoneType == 2 ? MilestoneEndPrefix + e.data.models[i].Milestone : e.data.models[i].Milestone);

                        }

                        var dataToupdate = e.data.models;

                        if (milestoneToAdd.length > 0) {
                            if (!vm.scheduleClosed) {
                                var completeData = milestoneToAdd.filter(function (entry) {
                                    return entry.CompletionDate != null;
                                });
                                angular.forEach(completeData, function (item, index) {
                                    var exeindex = gridAllDataSchedule.findIndex(element => element.MilestoneType == item.MilestoneType);
                                    var temp = {};
                                    temp.ScheduleUniqueID = gridAllDataSchedule[exeindex].ScheduleUniqueID;
                                    temp.MilestoneType = gridAllDataSchedule[exeindex].MilestoneType;
                                    //temp.Milestone = item.Milestone;
                                    temp.Milestone = gridAllDataSchedule[exeindex].Milestone;
                                    temp.PlannedFinish = kendo.toString(gridAllDataSchedule[exeindex].PlannedFinish, "d");
                                    temp.BaselineFinish = kendo.toString(gridAllDataSchedule[exeindex].BaselineFinish, "d");
                                    temp.CompletionDate = kendo.toString(gridAllDataSchedule[exeindex].CompletionDate, "d");
                                    temp.FunctionGroupID = gridAllDataSchedule[exeindex].FunctionGroupID;
                                    temp.IncludeInReport = gridAllDataSchedule[exeindex].IncludeInReport;
                                    temp.ProjectID = gridAllDataSchedule[exeindex].ProjectID;
                                    temp.IncludeInCharter = gridAllDataSchedule[exeindex].IncludeInCharter;
                                    temp.ParentProgramID = gridAllDataSchedule[exeindex].ParentProgramID;
                                    temp.Comments = gridAllDataSchedule[exeindex].Comments;
                                    temp.IsLinked = gridAllDataSchedule[exeindex].IsLinked;
                                    temp.MilestoneTemplateID = gridAllDataSchedule[exeindex].MilestoneTemplateID;
                                    temp.MilestoneID = gridAllDataSchedule[exeindex].MilestoneID;
                                    dataToupdate.push(temp);
                                });
                            }
                        }
                        var jsonlistdata = kendo.stringify(dataToupdate);
                        var dataToSend = {
                            "programId": SeletedProjectId,
                            "userId": currentUserId,
                            "objInsert": JSON.stringify([]),
                            "objUpdate": JSON.stringify(JSON.parse(jsonlistdata)),
                            "objDelete": JSON.stringify([])
                        };

                        GETPostService.postDataWCFAsync('insertUpdateProgramMilestones', dataToSend).then(function (response) {
                            if (response == "Success") {
                                if (IsBaseline) {
                                    IsBaseline = false;
                                    var projectslist = baselinedProjects.toString();
                                    var milestones = baselinedMilestones.toString();
                                    var baselineData = { CurrentProjectID: SeletedProjectId, ProjectID: projectslist, TeamMemberAdId: currentUserId, Milestones: milestones, IncreaseBaseline: IncreaseBaselineCount, BaselineComment: vm.BaselineCount.Comment };
                                    //    var finalData = JSON.stringify({
                                    //        "BaselineData": baselineData
                                    //    });
                                    //   var baselineData = { ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, };
                                    var finalData = JSON.stringify({
                                        "BaselineData": baselineData
                                    });
                                    $rootScope.$emit("RefreshForDataQuality");
                                    GETPostService.postDataWCFAsync('insertProjectBaseline', finalData).then(function (response) {
                                        if (response.insertProjectBaselineResult == "Success") {
                                            if (IncreaseBaselineCount) {
                                                vm.ProjectBaselineCount = vm.ProjectBaselineCount + 1;
                                            }
                                            vm.ProjectBaselineDate = vm.todayDate;
                                            e.success(e.data.models);
                                            milestoneToAdd = [];
                                            getDataForSchedule();
                                            gridDataSaved = true;
                                            window.data("kendoWindow").close();
                                        }
                                    });
                                }
                                else {
                                    e.success(e.data.models);
                                    milestoneToAdd = [];
                                    getDataForSchedule();
                                    gridDataSaved = true;
                                    window.data("kendoWindow").close();
                                }
                                //alert("Success");
                            }
                            else {
                                e.error(gridDataSchedule);
                                alert("Error occurred in item updation for schedule.");
                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "updateScheduleDataBulk", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) {
                                e.error(gridDataSchedule);
                                alert(errormessage);
                            });
                    }

                },
                create: function (e) {
                    displayLoading();
                    try {
                        var listdata = [];
                        for (var i = 0; i < e.data.models.length; i++) {
                            var scheduleData = {
                                ScheduleUniqueID: NewGuid(),
                                ProjectID: SeletedProjectId,
                                Milestone: e.data.models[i].Milestone,
                                PlannedFinish: (e.data.models[i].PlannedFinish != null && e.data.models[i].PlannedFinish != "") ? kendo.toString(e.data.models[i].PlannedFinish, "d") : null,
                                BaselineFinish: (e.data.models[i].BaselineFinish != null && e.data.models[i].BaselineFinish != "") ? kendo.toString(e.data.models[i].BaselineFinish, "d") : null,
                                FunctionGroupID: e.data.models[i].FunctionGroupID != null ? e.data.models[i].FunctionGroupID : null,
                                Comments: e.data.models[i].Comments != null ? e.data.models[i].Comments : null,
                                CompletionDate: (e.data.models[i].CompletionDate != null && e.data.models[i].CompletionDate != "") ? kendo.toString(e.data.models[i].CompletionDate, "d") : null,
                                IncludeInReport: e.data.models[i].IncludeInReport,
                            };
                            e.data.models[i].ScheduleUniqueID = scheduleData.ScheduleUniqueID;
                            listdata.push(scheduleData);
                        }
                        var finalData = JSON.stringify({
                            "scheduleData": listdata,
                            "userId": currentUserId,
                        });
                        GETPostService.postDataWCFAsync('insertScheduleData', finalData).then(function (response) {
                            if (response.insertScheduleDataResult == "Success") {
                                hideLoading();
                                if (IsBaseline) {
                                    IsBaseline = false;
                                    var projectslist = baselinedProjects.toString();
                                    var milestones = baselinedMilestones.toString();
                                    var baselineData = { CurrentProjectID: SeletedProjectId, ProjectID: projectslist, TeamMemberAdId: currentUserId, Milestones: milestones, IncreaseBaseline: IncreaseBaselineCount, BaselineComment: vm.BaselineCount.Comment };
                                    // var baselineData = { ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, };
                                    var finalData = JSON.stringify({
                                        "BaselineData": baselineData
                                    });
                                    $rootScope.$emit("RefreshForDataQuality");
                                    GETPostService.postDataWCFAsync('insertProjectBaseline', finalData).then(function (response) {
                                        if (response.insertProjectBaselineResult == "Success") {
                                            if (IncreaseBaselineCount) {
                                                vm.ProjectBaselineCount = vm.ProjectBaselineCount + 1;
                                            }
                                            vm.ProjectBaselineDate = vm.todayDate;
                                            e.success(e.data.models);
                                            milestoneToAdd = [];
                                            getDataForSchedule();
                                            gridDataSaved = true;
                                            window.data("kendoWindow").close();
                                        }
                                    });
                                }
                                else {
                                    e.success(e.data.models);
                                    milestoneToAdd = [];
                                    getDataForSchedule();
                                    gridDataSaved = true;
                                    window.data("kendoWindow").close();
                                }
                                // alert("Success");
                            }
                            else {
                                e.error(gridDataSchedule);
                                alert("Error occurred in item insertion for schedule.");
                            }

                        });

                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "createScheduleDataBulk", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) {
                                e.error(gridDataSchedule);
                                alert(errormessage);
                            });
                    }

                },
            },
            batch: true,

            schema: {
                model: {
                    id: 'ScheduleUniqueID',
                    fields: {
                        ScheduleUniqueID: {
                            hidden: true
                        },
                        ProjectID: { editable: false, hidden: true, defaultValue: SeletedProjectId },
                        Milestone: {
                            type: "string"
                        },
                        PlannedFinish: {
                            type: "date", defaultValue: null
                        },
                        BaselineFinish: {
                            type: "date", defaultValue: null
                        },
                        Variance: {
                            type: "string", editable: false,
                        },
                        FunctionGroupID: {
                            type: "string"
                        },
                        CompletionDate: {
                            type: "date", defaultValue: null,

                        },
                        Comments: {
                            type: "string"
                        },
                        IncludeInReport: {
                            type: "boolean"
                        },
                        StatusIndicator: { type: "string" },
                        link: { type: "string" },
                        ChildLink: { type: "string" },
                        MilestoneTemplateID: { type: "string" }
                    }
                }
            },
        });

        var col = col_ProjectHubTabs_gridScheduleBulkEdit();
        $("#gridPrgScheduleBulkEdit").kendoGrid({
            dataSource: dsSchedule,
            //height: 400,
            navigatable: true,
            batch: true,
            selectable: true,
            toolbar: [{ name: "create", text: "Add New" }, { name: "save", text: "Save" }, { name: "cancel", text: "Cancel" }],
            columns: col,
            edit: function (e) {
                try {
                    var grid = this;
                    var fieldName = grid.columns[e.container.index()].field;
                    if (fieldName == "BaselineFinish") {
                        if (!vm.ShowBaseline) {
                            this.closeCell();
                        }
                        else {
                            if (e.model.CompletionDate != null && e.model.CompletionDate != "") { this.closeCell(); }
                        }

                    }

                    if (e.container.find('[name="BaselineFinish"]').data('kendoDatePicker') != undefined) {
                        e.container.find('[name="BaselineFinish"]').data('kendoDatePicker').bind('change', function () {
                            IsBaseline = true;
                            var projID = baselinedProjects.filter(function (val) {
                                return val === e.model.ProjectID;
                            });
                            if (projID.length == 0) {
                                baselinedProjects.push(e.model.ProjectID);
                            }
                            var itemID = baselinedMilestones.filter(function (val) {
                                return val === e.model.ScheduleUniqueID;
                            });
                            if (itemID.length == 0) {
                                baselinedMilestones.push(e.model.ScheduleUniqueID);
                            }
                            var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                            var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
                            var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                            dataItem["Variance"] = variance;
                            $('#gridPrgScheduleBulkEdit').data('kendoGrid').refresh();
                        });
                    }
                    if (e.container.find('[name="PlannedFinish"]').data('kendoDatePicker') != undefined) {
                        e.container.find('[name="PlannedFinish"]').data('kendoDatePicker').bind('change', function () {
                            if (e.model.BaselineFinish != null) {
                                var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                                var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
                                var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                                dataItem["Variance"] = variance;
                                $('#gridPrgScheduleBulkEdit').data('kendoGrid').refresh();
                            }
                        });
                    }
                    if (e.container.find('[name="CompletionDate"]').data('kendoDatePicker') != undefined) {
                        e.container.find('[name="CompletionDate"]').data('kendoDatePicker').bind('change', function () {
                            if (e.model.BaselineFinish != null) {
                                var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                                var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
                                var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                                dataItem["Variance"] = variance;
                                $('#gridPrgScheduleBulkEdit').data('kendoGrid').refresh();
                            }

                        });
                    }
                }
                catch (err) {
                    var dataToSend = {
                        "method": "ScheduleBulkEdit(Edit)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            //  alert(errormessage);
                        });
                }
            },
            dataBound: function () {
                $(".chkbxsch").bind("change", function (e) {
                    var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
                    var dataItem = grid.dataItem($(e.target).closest("tr"));
                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");
                    dataItem.set("IncludeInReport", this.checked);
                });
            },
            editable: {
                confirmation: function (model) {
                    if (model.link == 1) {
                        return gridUnlinkMessage;
                    }
                    else { return gridDeleteMessage; }
                }
            },
            remove: function (e) {
                var data = e.model;
                if (data.ScheduleUniqueID != 'undefined' && data.ScheduleUniqueID != "")
                    deletedMilestoneData.push({ "ScheduleUniqueID": data.ScheduleUniqueID, "link": data.link });
            },
            saveChanges: function (e) {
                trackEvent("Update Bulk Edit Milestone");
                var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
                if (grid.dataSource.hasChanges()) {
                    var count = $(":checked", grid.element).length;
                    if (vm.scheduleClosed) {
                        if (count > milestoneIncludeReportCount) {
                            alert(includeReportMessageForMilestone);
                            e.preventDefault();
                        }
                    }
                    else {
                        var countCompleted = gridAllDataSchedule.filter(function (entry) {
                            return (entry.IncludeInReport == true && entry.CompletionDate != null);
                        });
                        if (countCompleted.length > 0) {
                            var totalCount = count + countCompleted.length;
                            if (totalCount > milestoneIncludeReportCount) {
                                alert(includeReportMessageForMilestone);
                                e.preventDefault();
                            }
                        }
                        else {
                            if (count > milestoneIncludeReportCount) {
                                alert(includeReportMessageForMilestone);
                                e.preventDefault();
                            }
                        }

                    }
                    if (IsBaseline) {
                        if (!Isupdatebaseline) {

                            var window = $("#dialogPrgScheduleBaselineCount");
                            window.data("kendoWindow").open();
                            e.preventDefault();
                        }
                    }

                }
                else {
                    var schwindow = $("#dialogPrgScheduleBulkEdit");
                    schwindow.data("kendoWindow").close();

                }
            }

        }).data("kendoGrid");
        $('#gridPrgScheduleBulkEdit .k-grid-cancel-changes').unbind('click').on('click', function (e) {
            gridCancelEvent("#dialogPrgScheduleBulkEdit", e)
        });
        $("#gridPrgScheduleBulkEdit").kendoTooltip({
            filter: "td:nth-child(4)", //this filter selects the fifth column's cells
            position: "absolute",
            width: 500,
            show: function (e) {
                if (this.content.text().length > 0) {
                    this.content.parent().css('visibility', 'visible');
                } else {
                    this.content.parent().css('visibility', 'hidden');
                }
            },
            content: function (e) {
                var dataItem = $("#gridPrgScheduleBulkEdit").data("kendoGrid").dataItem(e.target.closest("tr"));
                if (dataItem.link == true || dataItem.ChildLink == true) {
                    var content = "";
                    if (dataItem.link == true && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedFromMilestone + dataItem.LinkedProjects + "</div>";
                    }
                    if (dataItem.ChildLink == true && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedToMilestone + dataItem.LinkedProjects + "</div>";
                    }
                    return content;
                }
                else { return ""; }
            }
        }).data("kendoTooltip");
    };
    function col_ProjectHubTabs_gridAskNeedBulkEdit() {
        var col = [{
            field: "AskNeedUniqueID",
            title: "AskNeedUniqueID",
            hidden: true

        },
        {
            field: "ProjectID",
            title: "ProjectID",
            hidden: true

        },
        {
            template: "",
            field: "StatusIndicator",
            title: " ",
            width: ".5%",
            attributes: { class: "#:StatusIndicator#" },
        },
        {
            template: "#if(link == 1) {#<span class='k-icon k-i-link-vertical'></span>#}" +
                       "else if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
            title: " ",
            width: "2.5%",
        },
        {
            field: "AskNeed",
            title: "Ask Need",
            headerAttributes: { "class": "wrap-header" },
            width: "30%",
        }, {
            field: "NeedFromID",
            title: "Need From",
            headerAttributes: { "class": "wrap-header" },
            width: "20%",
            editor: askNeeduserLinkDropDownEditor,
            values: askNeedUsers,
            template: function (e) {
                if (e.NeedFromName != null) {
                    var teamMember;
                    teamMember = askNeedUsers.filter(function (entry) {
                        return (entry.value == e.NeedFromID && entry.ProjectID == e.ProjectID);;
                    });
                    if (teamMember.length > 0) {
                        e.NeedFromName = teamMember[0].text;
                    }
                    else {
                        e.NeedFromName = "";
                        e.NeedFromID = "";
                    }
                }
                return e.NeedFromName;
            },
        }, {
            field: "NeedByDate",
            title: "Need Date (mm/dd/yyyy)",
            headerAttributes: { "class": "wrap-header" },
            width: "10%",
            format: "{0:MM/dd/yyyy}",
            //template: "#= Need_x0020_By_x0020_Date ==null ? '' : kendo.toString(kendo.parseDate(new Date(Need_x0020_By_x0020_Date), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
        }, {
            field: "Comments",
            title: "Comments",
            width: "30%"
        }, {
            field: "CloseDate",
            title: "Close Date (mm/dd/yyyy)",
            headerAttributes: { "class": "wrap-header" },
            width: "10%",
            format: "{0:MM/dd/yyyy}",
            editor: CompletedDateEditor
        }, {
            //field: "IncludeInReport",
            title: "Include in Dashboard (Max 1)",
            headerAttributes: { "class": "wrap-header" },
            // editor: customBoolAskNeedEditor,
            template: '<input type="checkbox" #= IncludeInReport ? \'checked="checked"\' : "" # class="chkbxask" />',
            width: "8%"
        },

        {
            command: [{ name: "destroy", text: " " }], title: " ", width: "4%"
        }

        ];
        return col;
    };
    function AskNeedBulkEdit() {
        var window = $("#dialogPrgAskNeedBulkEdit");
        var dsAskNeed = new kendo.data.DataSource({
            sort: [//{ field: "StatusIndicator", dir: "desc" },
                {
                    field: "NeedByDate", dir: "asc"
                }],
            transport: {
                read: function (e) {
                    e.success(gridDataAskNeed);
                },

                destroy: function (e) {
                    try {
                        var jsonlistdata = kendo.stringify(e.data.models);
                        //var finaldata = JSON.stringify({
                        //    "askNeedData": JSON.parse(jsonlistdata)
                        //});
                        var dataToSend = {
                            "programId": SeletedProjectId,
                            "objInsert": JSON.stringify([]),
                            "objUpdate": JSON.stringify([]),
                            "objDelete": JSON.stringify(JSON.parse(jsonlistdata))
                        };
                        GETPostService.postDataWCFAsync('insertUpdateProgramAskNeed', dataToSend).then(function (response) {
                            if (response == "Success") {
                                e.success(e.data.models);
                                getDataForAskNeed();
                                gridDataSaved = true;
                                window.data("kendoWindow").close();
                            }
                            else {
                                e.error(gridDataAskNeed);
                                alert("Error occurred in item deletion of Ask/Need.");
                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "deleteAskNeedBulk", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) {
                                e.error(gridDataAskNeed);
                                alert(errormessage);
                            });
                    }
                },
                update: function (e) {
                    try {
                        for (var i = 0; i < e.data.models.length; i++) {
                            var teamMember;
                            if (e.data.models[i].NeedFromID != null) {
                                teamMember = askNeedUsers.filter(function (entry) {
                                    return entry.value === e.data.models[i].NeedFromID;
                                });

                                e.data.models[i].NeedFromName = teamMember.length > 0 ? teamMember[0].text : null
                            }
                            e.data.models[i].NeedByDate = (e.data.models[i].NeedByDate != null && e.data.models[i].NeedByDate != "") ? kendo.toString(e.data.models[i].NeedByDate, "d") : null;
                            e.data.models[i].CloseDate = (e.data.models[i].CloseDate != null && e.data.models[i].CloseDate != "") ? kendo.toString(e.data.models[i].CloseDate, "d") : null;
                        }
                        var jsonlistdata = kendo.stringify(e.data.models);
                        var dataToSend = {
                            "programId": SeletedProjectId,
                            "objInsert": JSON.stringify([]),
                            "objUpdate": JSON.stringify(JSON.parse(jsonlistdata)),
                            "objDelete": JSON.stringify([])
                        };
                        GETPostService.postDataWCFAsync('insertUpdateProgramAskNeed', dataToSend).then(function (response) {
                            if (response == "Success") {
                                e.success(e.data.models);
                                getDataForAskNeed();
                                gridDataSaved = true;
                                window.data("kendoWindow").close();
                            }
                            else {
                                e.error(gridDataAskNeed);
                                alert("Error occurred in item updation for Ask/Need .");
                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "updateAskNeedBulk", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) {
                                e.error(gridDataAskNeed);
                                alert(errormessage);
                            });
                    }

                },
                create: function (e) {
                    try {
                        displayLoading();
                        var listdata = [];
                        for (var i = 0; i < e.data.models.length; i++) {
                            var teamMember;
                            if (e.data.models[i].NeedFromID != null) {
                                teamMember = askNeedUsers.filter(function (entry) {
                                    return entry.value === e.data.models[i].NeedFromID;
                                });
                            }
                            var askNeedData = {
                                AskNeedUniqueID: NewGuid(),
                                ProjectID: SeletedProjectId,
                                AskNeed: e.data.models[i].AskNeed,
                                NeedFromID: e.data.models[i].NeedFromID != null ? e.data.models[i].NeedFromID : null,
                                NeedFromName: teamMember.length > 0 ? teamMember[0].text : null,
                                NeedByDate: (e.data.models[i].NeedByDate != null && e.data.models[i].NeedByDate != "") ? kendo.toString(e.data.models[i].NeedByDate, "d") : null,
                                Comments: e.data.models[i].Comments != null ? e.data.models[i].Comments : '',
                                CloseDate: e.data.models[i].CloseDate != null ? kendo.toString(e.data.models[i].CloseDate, "d") : null,
                                LogDate: vm.todayDate,
                                IncludeInReport: e.data.models[i].IncludeInReport
                            };
                            listdata.push(askNeedData);
                        }
                        var finalData = JSON.stringify({
                            "askNeedData": listdata
                        });
                        GETPostService.postDataWCFAsync('insertAskNeed', finalData).then(function (response) {
                            //alert(response);
                            if (response.insertAskNeedResult == "Success") {
                                hideLoading();
                                e.success(listdata);
                                getDataForAskNeed();
                                gridDataSaved = true;
                                window.data("kendoWindow").close();
                            }
                            else {
                                e.error(gridDataAskNeed);
                                alert("Error occurred in item insertion for Ask/Need .");
                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "createAskNeedBulk", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) {
                                e.error(gridDataAskNeed);
                                alert(errormessage);
                            });
                    }
                },
            },
            batch: true,
            schema: {
                model: {
                    id: 'AskNeedUniqueID',
                    fields: {
                        AskNeedUniqueID: {
                            editable: false, hidden: true
                        },
                        ProjectID: { editable: false, hidden: true, defaultValue: SeletedProjectId },
                        AskNeed: {
                            type: "string"
                        },
                        NeedFromID: {
                            type: "string"
                        },
                        NeedFromName: {
                            type: "string"
                        },
                        NeedByDate: {
                            type: "date", defaultValue: null
                        },
                        Comments: {
                            type: "string"
                        },
                        CloseDate: {
                            type: "date", defaultValue: null
                        },
                        IncludeInReport: {
                            type: "boolean"
                        },
                        StatusIndicator: { type: "string" },
                        link: { type: "string" },
                        ChildLink: { type: "string" }
                    }
                }
            },
        });

        var col = col_ProjectHubTabs_gridAskNeedBulkEdit();
        var grid = $("#gridPrgAskNeedBulkEdit").kendoGrid({
            dataSource: dsAskNeed,
            // height: 400,
            batch: true,
            selectable: true,
            navigatable: true,
            toolbar: [{ name: "create", text: "Add New" }, { name: "save", text: "Save" }, { name: "cancel", text: "Cancel" }],
            columns: col,
            dataBound: function () {
                saveAskNeedData = false;
                $(".chkbxask").bind("change", function (e) {
                    var grid = $("#gridPrgAskNeedBulkEdit").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));
                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");
                    dataItem.set("IncludeInReport", this.checked);
                    //else {
                    //  alert(includeReportMessageForAskNeed);
                    //  e.preventDefault();
                    // }
                });
            },
            editable: {
                confirmation: function (model) {
                    if (model.link == 1) {
                        return gridUnlinkMessage;
                    }
                    else { return gridDeleteMessage; }
                }
            },
            saveChanges: function (e) {
                trackEvent("Update Bulk Edit Ask/Need");
                var grid = $("#gridPrgAskNeedBulkEdit").data("kendoGrid");
                if (grid.dataSource.hasChanges()) {
                    var count = $(":checked", grid.element).length;
                    if (vm.askNeedClosed) {
                        if (count > askNeedIncludeReportCount) {
                            alert(includeReportMessageForAskNeed);
                            e.preventDefault();
                        }
                    }
                    else {
                        var countCompleted = gridAllDataAskNeed.filter(function (entry) {
                            return (entry.IncludeInReport == true && entry.CloseDate != null);
                        });
                        if (countCompleted.length > 0) {
                            var totalCount = count + countCompleted.length;
                            if (totalCount > askNeedIncludeReportCount) {
                                alert(includeReportMessageForAskNeed);
                                e.preventDefault();
                            }
                        }
                        else {
                            if (count > askNeedIncludeReportCount) {
                                alert(includeReportMessageForAskNeed);
                                e.preventDefault();
                            }
                        }

                    }

                }
                else { window.data("kendoWindow").close(); }
            }

        }).data("kendoGrid");
        $('#gridPrgAskNeedBulkEdit .k-grid-cancel-changes').unbind('click').on('click', function (e) {
            gridCancelEvent("#dialogPrgAskNeedBulkEdit", e)
        });
        $("#gridPrgAskNeedBulkEdit table").on("keydown", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                var hasCombo = $(e.target).closest(".k-combobox").length;
                if (hasCombo) {
                    grid.editCell(grid.current());
                    $("[data-role='combobox']").data("kendoComboBox").dataSource.read();
                }
            }
        });
        $("#gridPrgAskNeedBulkEdit").kendoTooltip({
            filter: "td:nth-child(4)", //this filter selects the fifth column's cells
            position: "absolute",
            width: "500",
            show: function (e) {
                if (this.content.text().length > 0) {
                    this.content.parent().css('visibility', 'visible');
                } else {
                    this.content.parent().css('visibility', 'hidden');
                }
            },
            content: function (e) {
                var dataItem = $("#gridPrgAskNeedBulkEdit").data("kendoGrid").dataItem(e.target.closest("tr"));
                if (dataItem.link == true || dataItem.ChildLink == true) {
                    var content = "";
                    if (dataItem.link == true && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedFromAskNeed + dataItem.LinkedProjects + "</div>";
                    }
                    if (dataItem.ChildLink == true && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedToAskNeed + dataItem.LinkedProjects + "</div>";
                    }
                    return content;
                }
                else {
                    return "";
                }
            }
        }).data("kendoTooltip");
    };
    function col_ProjectHubTabs_gridRiskIssueBulkEdit() {
        var col = [{
            field: "RiskIssueUniqueID",
            title: "Id",
            hidden: true
        },
        {
            field: "ProjectID",
            title: "ProjectID",
            editable: false, hidden: true,
        },
        {
            template: "",
            field: "StatusIndicator",
            title: " ",
            width: ".5%",
            attributes: { class: "#:StatusIndicator#" },
        },
        {
            template: "#if(link == 1) {#<span class='k-icon k-i-link-vertical'></span>#}" +
                        "else if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
            title: " ",
            width: "2.5%",
        },
        {
            field: "RiskIssueTypeID",
            title: "Type",
            width: "7%",
            values: riskIssueTypeBulk
        }, {
            field: "IfHappens",
            title: "If This Happens",
            headerAttributes: { "class": "wrap-header" },
            width: "20%",
        }, {
            field: "ProbabilityID",
            title: "Probability",
            values: probabilityBulk,
            width: "9%",
        }, {
            field: "RiskIssueResult",
            title: "This Is The Result",
            headerAttributes: { "class": "wrap-header" },
            width: "18%",

        }, {
            field: "ImpactID",
            title: "Impact",
            width: "9%",
            values: impactBulk
        }, {
            field: "Mitigation",
            title: "Mitigation",
            width: "16%"
        },
        {
            field: "OwnerID",
            title: "Owner",
            headerAttributes: { "class": "wrap-header" },
            width: "14%",
            editor: riskIssueUserLinkDropDownEditor,
            values: riskIssueUsers,
            template: function (e) {
                if (e.OwnerName != null || e.OwnerName != "") {
                    var teamMember;
                    teamMember = riskIssueUsers.filter(function (entry) {
                        return (entry.value == e.OwnerID && entry.ProjectID == e.ProjectID);
                    });
                    if (teamMember.length > 0) {
                        e.OwnerName = teamMember[0].text;
                    }
                    else {
                        e.OwnerName = "";
                        e.OwnerName = "";
                    }
                }
                return e.OwnerName;
            },
        },
        {
            field: "FunctionGroupID",
            title: "Function Owner",
            headerAttributes: { "class": "wrap-header" },
            width: "10%",
            values: functionalgroupBulk
        },
        {
            field: "DueDate",
            title: "Due Date (mm/dd/yyyy)",
            headerAttributes: { "class": "wrap-header" },
            width: "10%",
            format: "{0:MM/dd/yyyy}",
        },
        {
            field: "CloseDate",
            title: "Close Date (mm/dd/yyyy)",
            headerAttributes: { "class": "wrap-header" },
            width: "10%",
            format: "{0:MM/dd/yyyy}",
            editor: CompletedDateEditor
        }, {
            //field: "IncludeInReport",
            title: "Include In Dashboard (Max 3)",
            headerAttributes: { "class": "wrap-header" },
            width: "5%",
            template: function (e) {
                if (e.IncludeInReport == true) {
                    return dirtyField(e, 'IncludeInReport') + '<input type="checkbox" checked class="chkbxrisk" />';
                }
                else {
                    return dirtyField(e, 'IncludeInReport') + '<input type="checkbox" class="chkbxrisk" />';
                }
            }

        },
        {
            command: [{ name: "destroy", text: " " }], title: " ", width: "5%"
        }

        ];
        return col;
    };
    function RiskIssueBulkEdit() {
        var window = $("#dialogPrgRiskIssueBulkEdit");
        var dsRisk = new kendo.data.DataSource({
            sort: [//{ field: "StatusIndicator", dir: "desc" },
                {
                    field: "DueDate", dir: "asc"
                }],
            transport: {
                read: function (e) {
                    // on success
                    e.success(gridDataRiskIssue);
                },

                update: function (e) {
                    try {
                        for (var i = 0; i < e.data.models.length; i++) {
                            var teamMember;
                            if (e.data.models[i].OwnerID != null) {
                                teamMember = riskIssueUsers.filter(function (entry) {
                                    return entry.value === e.data.models[i].OwnerID;
                                });
                                e.data.models[i].OwnerName = teamMember.length > 0 ? teamMember[0].text : null
                            }
                            e.data.models[i].DueDate = (e.data.models[i].DueDate != null && e.data.models[i].DueDate != "") ? kendo.toString(e.data.models[i].DueDate, "d") : null;
                            e.data.models[i].CloseDate = (e.data.models[i].CloseDate != null && e.data.models[i].CloseDate != "") ? kendo.toString(e.data.models[i].CloseDate, "d") : null;
                        }
                        var jsonlistdata = kendo.stringify(e.data.models);
                        //var finaldata = JSON.stringify({
                        //    "riskIssueData": JSON.parse(jsonlistdata)
                        //});
                        var dataToSend = {
                            "programId": SeletedProjectId,
                            "objInsert": JSON.stringify([]),
                            "objUpdate": JSON.stringify(JSON.parse(jsonlistdata)),
                            "objDelete": JSON.stringify([])
                        };

                        GETPostService.postDataWCFAsync('insertUpdateProgramRiskIssue', dataToSend).then(function (response) {
                            if (response == "Success") {
                                e.success(e.data.models);
                                getDataForRiskIssue();
                                gridDataSaved = true;
                                window.data("kendoWindow").close();
                            }
                            else {
                                e.error(gridDataRiskIssue);
                                alert("Error occurred in item updation for risk issue.");

                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "updateRiskIssueBulk", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) {
                                e.error(gridDataRiskIssue);
                                alert(errormessage);
                            });
                    }
                },
                destroy: function (e) {
                    try {
                        var jsonlistdata = kendo.stringify(e.data.models);
                        //var finaldata = JSON.stringify({
                        //    "riskIssueData": JSON.parse(jsonlistdata)
                        //});
                        var dataToSend = {
                            "programId": SeletedProjectId,
                            "objInsert": JSON.stringify([]),
                            "objUpdate": JSON.stringify([]),
                            "objDelete": JSON.stringify(JSON.parse(jsonlistdata))
                        };
                        GETPostService.postDataWCFAsync('insertUpdateProgramRiskIssue', dataToSend).then(function (response) {
                            //alert(response);
                            if (response == "Success") {
                                e.success(e.data.models);
                                getDataForRiskIssue();
                                $rootScope.$emit("RefreshForDataQuality");
                                gridDataSaved = true;
                                window.data("kendoWindow").close();
                            }
                            else {
                                e.error(gridDataRiskIssue);
                                alert("Error occurred in item deletion for risk issue.");
                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "deleteRiskIssueBulk", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) {
                                e.error(gridDataRiskIssue);
                                alert(errormessage);
                            });
                    }
                },
                create: function (e) {
                    try {
                        displayLoading();
                        var listdata = [];
                        for (var i = 0; i < e.data.models.length; i++) {
                            var teamMember;
                            if (e.data.models[i].OwnerID != null) {
                                teamMember = riskIssueUsers.filter(function (entry) {
                                    return entry.value === e.data.models[i].OwnerID;
                                });

                                e.data.models[i].OwnerName = teamMember.length > 0 ? teamMember[0].text : null
                            }
                            var riskIssueData = {
                                ProjectID: SeletedProjectId,
                                RiskIssueUniqueID: NewGuid(),
                                IfHappens: e.data.models[i].IfHappens,
                                RiskIssueResult: e.data.models[i].RiskIssueResult,
                                Mitigation: e.data.models[i].Mitigation,
                                RiskIssueTypeID: e.data.models[i].RiskIssueTypeID != null ? e.data.models[i].RiskIssueTypeID : null,
                                ProbabilityID: e.data.models[i].ProbabilityID != null ? e.data.models[i].ProbabilityID : null,
                                ImpactID: e.data.models[i].ImpactID != null ? e.data.models[i].ImpactID : null,
                                FunctionGroupID: e.data.models[i].FunctionGroupID != null ? e.data.models[i].FunctionGroupID : null,
                                CloseDate: (e.data.models[i].CloseDate != null && e.data.models[i].CloseDate != "") ? kendo.toString(e.data.models[i].CloseDate, "d") : null,
                                LogDate: vm.todayDate,
                                IncludeInReport: e.data.models[i].IncludeInReport,
                                OwnerID: e.data.models[i].OwnerID != null ? e.data.models[i].OwnerID : null,
                                OwnerName: teamMember.length > 0 ? teamMember[0].text : null,
                                DueDate: (e.data.models[i].DueDate != null && e.data.models[i] != "") ? kendo.toString(e.data.models[i].DueDate, "d") : null,
                            };
                            listdata.push(riskIssueData);
                        }
                        var finalData = JSON.stringify({
                            "riskIssueData": listdata
                        });
                        GETPostService.postDataWCFAsync('insertRiskIssueData', finalData).then(function (response) {
                            if (response.insertRiskIssueDataResult == "Success") {
                                hideLoading();
                                e.success(listdata);
                                getDataForRiskIssue();
                                $rootScope.$emit("RefreshForDataQuality");
                                gridDataSaved = true;
                                window.data("kendoWindow").close();
                            }
                            else {
                                e.error(gridDataRiskIssue);
                                alert("Error occurred in item insertion for risk issue.");
                            }
                        });
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "createRiskIssueBulk", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) {
                                e.error(gridDataRiskIssue);
                                alert(errormessage);
                            });
                    }
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: 'RiskIssueUniqueID',
                    fields: {
                        ProjectID: { editable: false, hidden: true, defaultValue: SeletedProjectId },
                        RiskIssueUniqueID: { editable: false, hidden: true },
                        RiskIssueTypeID: { type: "string" },
                        IfHappens: { type: "string" },
                        ProbabilityID: { type: "string" },
                        RiskIssueResult: { type: "string" },
                        ImpactID: { type: "string" },
                        Mitigation: { type: "string" },
                        OwnerID: { type: "string" },
                        OwnerName: { type: "string" },
                        FunctionGroupID: { type: "string" },
                        DueDate: { type: "date", defaultValue: null },
                        CloseDate: { type: "date", defaultValue: null },
                        IncludeInReport: { type: "boolean" },
                        StatusIndicator: { type: "string" },
                        link: { type: "string" },
                        ChildLink: { type: "string" }
                    }
                }
            }
        });

        var col = col_ProjectHubTabs_gridRiskIssueBulkEdit();
        var grid = $("#gridPrgRiskIssueBulkEdit").kendoGrid({
            dataSource: dsRisk,
            // height: 400,
            batch: true,
            selectable: true,
            navigatable: true,
            toolbar: [{ name: "create", text: "Add New" }, { name: "save", text: "Save" }, { name: "cancel", text: "Cancel" }],
            columns: col,

            dataBound: function () {
                saveRiskData = false;
                $(".chkbxrisk").bind("change", function (e) {
                    var grid = $("#gridPrgRiskIssueBulkEdit").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));
                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");
                    dataItem.set("IncludeInReport", this.checked);
                });
            },
            editable: {
                confirmation: function (model) {
                    if (model.link == 1) {
                        return gridUnlinkMessage;
                    }
                    else { return gridDeleteMessage }
                }
            },
            saveChanges: function (e) {
                trackEvent("Update Bulk Edit Risk/Issue");
                var grid = $("#gridPrgRiskIssueBulkEdit").data("kendoGrid");
                if (grid.dataSource.hasChanges()) {
                    var count = $(":checked", grid.element).length;
                    if (vm.riskIssueClosed) {
                        if (count > riskIssueIncludeReportCount) {
                            alert(includeReportMessageForRisk);
                            e.preventDefault();
                        }
                    }
                    else {
                        var countCompleted = gridAllDataRiskIssue.filter(function (entry) {
                            return (entry.IncludeInReport == true && entry.CloseDate != null);
                        });
                        if (countCompleted.length > 0) {
                            var totalCount = count + countCompleted.length;
                            if (totalCount > riskIssueIncludeReportCount) {
                                alert(includeReportMessageForRisk);
                                e.preventDefault();
                            }
                        }
                        else {
                            if (count > riskIssueIncludeReportCount) {
                                alert(includeReportMessageForRisk);
                                e.preventDefault();
                            }
                        }

                    }

                }
                else { window.data("kendoWindow").close(); }
            }
        }).data("kendoGrid");
        $('#gridPrgRiskIssueBulkEdit .k-grid-cancel-changes').unbind('click').on('click', function (e) {
            gridCancelEvent("#dialogPrgRiskIssueBulkEdit", e)
        });
        $("#gridPrgRiskIssueBulkEdit table").on("keydown", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                var hasCombo = $(e.target).closest(".k-combobox").length;
                if (hasCombo) {
                    grid.editCell(grid.current());
                    $("[data-role='combobox']").data("kendoComboBox").dataSource.read();
                }
            }
        });
        $("#gridPrgRiskIssueBulkEdit").kendoTooltip({
            filter: "td:nth-child(4)", //this filter selects the second column's cells
            position: "absolute",
            width: 500,
            show: function (e) {
                if (this.content.text().length > 0) {
                    this.content.parent().css('visibility', 'visible');
                } else {
                    this.content.parent().css('visibility', 'hidden');
                }
            },
            content: function (e) {

                var dataItem = $("#gridPrgRiskIssueBulkEdit").data("kendoGrid").dataItem(e.target.closest("tr"));
                if (dataItem.link == true || dataItem.ChildLink == true) {
                    var content = "";
                    if (dataItem.link == true && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedFromRiskIssue + dataItem.LinkedProjects + "</div>";
                    }
                    if (dataItem.ChildLink == true && dataItem.LinkedProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedToRiskIssue + dataItem.LinkedProjects + "</div>";
                    }
                    return content;
                }
                else { return ""; }
            }
        }).data("kendoTooltip");

    };
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
                        baselinedProjects = [];
                        baselinedMilestones = [];
                        grid.dataSource.cancelChanges();
                        grid.dataSource.read();
                    }
                }

            }
            else {
                gridDataSaved = false;
                baselinedProjects = [];
                baselinedMilestones = [];
            }
            if (milestoneToAdd.length > 0) {
                getDataForSchedule()
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
        Isupdatebaseline = false;
        IsBaseline = false;
        vm.BaselineCount = {};
        vm.BaselineCount.IncreaseBaseline = "YES";
        if (vm.ProjectBaselineCount > 0) {
            vm.showjustification = true;
        }

    }

    function SetBaseline() {
        try {
            //if (!confirm(baselineMessage))
            //  {//  e.preventDefault();
            //  }
            if (confirm(baselineMessage)) {
                IsBaseline = true;
                var dataSource = $("#gridPrgScheduleBulkEdit").data("kendoGrid").dataSource;
                var data = dataSource.data();
                var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
                for (var i = 0; i < data.length; i++) {
                    var currentDataItem = data[i];
                    if (currentDataItem.PlannedFinish != null) {
                        var dataItem = grid.dataSource.get(currentDataItem.ScheduleUniqueID);
                        if (currentDataItem.ScheduleUniqueID == "") {
                            var select = grid.tbody.find('tr[data-uid="' + currentDataItem.uid + '"]');
                            grid.select(select);
                            var selectedRow = grid.select();
                            dataItem = grid.dataItem(selectedRow);
                        }
                        if (currentDataItem.CompletionDate == null) {
                            dataItem.set('BaselineFinish', currentDataItem.PlannedFinish);
                            var variance = SetVariance(currentDataItem.PlannedFinish, currentDataItem.BaselineFinish, currentDataItem.CompletionDate)
                            dataItem["Variance"] = variance;
                        }
                        var projID = baselinedProjects.filter(function (val) {
                            return val === currentDataItem.ProjectID;
                        });
                        if (projID.length == 0) {
                            baselinedProjects.push(currentDataItem.ProjectID);
                        }
                        var itemID = baselinedMilestones.filter(function (val) {
                            return val === currentDataItem.ScheduleUniqueID;
                        });
                        if (itemID.length == 0) {
                            baselinedMilestones.push(currentDataItem.ScheduleUniqueID);
                        }

                    }
                }
                $('#gridPrgScheduleBulkEdit').data('kendoGrid').refresh();
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "SetBaseline", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }

    }
    function CheckBulkEditGridUpdate(gridId, dialog) {
        try {
            var grid = $('#' + gridId).data('kendoGrid');
            var window = $('#' + dialog);
            document.activeElement.blur();
            if (grid.dataSource.hasChanges()) {
                if (dialog == "dialogAddMilestonePrgHub") {
                    if (confirm(saveMilestoneConfirm)) {
                        UpdateMilestones();
                    }
                    else {
                        window.data("kendoWindow").open();
                    }
                }
                else {
                    if (!confirm(dialogCancelMessage)) {
                        e.preventDefault();
                    }
                    else {

                        grid.dataSource.cancelChanges();
                        grid.dataSource.read();
                        window.data("kendoWindow").open();
                    }
                }

            }
            else { window.data("kendoWindow").open(); }


        }
        catch (err) {
            var dataToSend = {
                "method": "CheckBulkEditGridUpdate", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    // alert(errormessage);
                });
        }
    }
    function InitKendoGridBaselineLog() {
        try {
            $("#gridPrgBaselineLogs").kendoGrid({
                dataSource: {
                    data: gridDataBaselineLog,
                    sort: [{ field: "BaselineCount", dir: "asc" },
                        { field: "ModifiedDate", dir: "asc" }
                    ]
                },
                groupable: false,
                sortable: true,
                //schema: {
                //    model: {
                //        fields: {
                //            BaselineCount: { type: "int" },
                //            TeamMemberName: { type: "string" },
                //            ModifiedDate: { type: "string" },
                //            BaselineComment: { type: "string" }
                //        }
                //    }
                //},
                columns: [

                    {
                        field: "BaselineCount",
                        title: "Baseline"
                    },
                    {
                        field: "ModifiedDate",
                        title: "Baseline Date",
                        template: "#= ModifiedDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(ModifiedDate), 'yyyy-MM-dd'), 'dd-MMM-yy  hh:mm:ss tt') #"
                    },
                    {
                        field: "TeamMemberName",
                        title: "Baseline Set By"
                    },
                    {
                        field: "BaselineComment",
                        title: "Justification"
                    }
                ]
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "gridBaselineLogs", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };
    function UpdateBaselineCount() {
        try {
            if (vm.BaselineCount != null) {
                //if (vm.ProjectBaselineCount > 0) {
                //    if (vm.BaselineCount.Comment == null || vm.BaselineCount.Comment == "") {
                //        alert("Please enter the justification for re-baselining");
                //        return;
                //    }
                //}
                if (vm.BaselineCount.IncreaseBaseline == "YES") {
                    IncreaseBaselineCount = true;
                }
                else { IncreaseBaselineCount = false; }
            }
            var window = $("#dialogPrgScheduleBaselineCount");
            window.data("kendoWindow").close();
            Isupdatebaseline = true;
            if (!setMilestioneUpdate) {
                var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
                grid.saveChanges();
            }
            else { updateMilestoneFromSet(); }
        }
        catch (err) {
            var dataToSend = {
                "method": "UpdateBaselineCount", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }

    }
    function dialogBaselineCountCose() {
        IncreaseBaselineCount = false;
        vm.BaselineCount = {};
        vm.BaselineCount.IncreaseBaseline = "YES";
        var window = $("#dialogPrgScheduleBaselineCount");
        window.data("kendoWindow").close();
    }
    function InitMilestoneTemplates() {
        var dsTemplate = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    // on success
                    e.success(grdMilestoneTemplate);
                }

            },
            sort: [{ field: "TemplateOrder", dir: "asc" }]
        });
        $("#gridPrgHubAddMilestones").kendoGrid({
            dataSource: dsTemplate,
            // height: 400,
            sortable: false,
            selectable: true,
            navigatable: true,
            detailInit: detailInitMilestoneTemplate,
            columns: [
                {
                    field: "MilestoneSet",
                    title: "Milestone Set(s)",
                    template: "<strong>#: MilestoneSet # </strong>",
                    attributes: { class: "ProgHub1" },
                    headerAttributes: { "class": "wrap-header" },
                }
            ],
        });

    }
    function detailInitMilestoneTemplate(e) {
        var detailData = grdMilestoneTemplateDetail.filter(function (val) {
            return (val.MilestoneTemplateID == e.data.MilestoneTemplateID);
        });

        var show = true;

        if (detailData.length == 0) {
            show = false;
        }
        if (show) {
            var hideLink = false;
            var gridOptions = {
                dataSource: {
                    sort: [
                        {
                            field: "SortOrder", dir: "asc"
                        }],
                    transport: {
                        read: function (e) {
                            // on success
                            e.success(grdMilestoneTemplateDetail);
                        }
                    },
                    filter: { field: "MilestoneTemplateID", operator: "eq", value: e.data.MilestoneTemplateID }
                },
                scrollable: false,
                // sortable: true,
                editable: false,
                navigatable: true,
                columns: [
                    {
                        field: "Milestone",
                        title: "Milestone",
                        template: function (e) {
                            var value = "";
                            if (e.MilestoneType == 1 || e.MilestoneType == 2) {
                                if (e.Milestone.split('-')[1] == MilestoneExecutionInsert || e.Milestone.split('-')[1].trim() == "") {
                                    value = (e.Milestone != null && e.Milestone != "") ? "<span class='RedQuality'>" + ((e.MilestoneType == 1) ? MilestoneStartPrefix : MilestoneEndPrefix) + MilestoneExecutionInsert + "</span>" : '';
                                }

                                else {
                                    value = (e.Milestone != null && e.Milestone != "") ? e.Milestone : '';
                                }

                            }
                            else
                                value = (e.Milestone != null && e.Milestone != "") ? e.Milestone : '';
                            return value;
                        }

                    },
                    {
                        field: "FunctionalGroupName",
                        title: "Functional Owner"

                    },
                    {
                        field: "Comments",
                        title: "Comment"
                    },
                    {
                        //field: "IncludeInReport",
                        title: "IncludeInReport",
                        headerAttributes: { "class": "wrap-header" },
                        width: "8%",
                        template: function (e) {
                            if (e.IncludeInReport == true) {
                                return '<input type="checkbox" checked disabled/>';
                            }
                            else {
                                return '<input type="checkbox" disabled />';
                            }
                        }

                    },
                    {
                        field: "IsLinked",
                        title: "Add",
                        headerAttributes: { "class": "wrap-header" },
                        width: "5%",
                        headerTemplate: '<label>Add</label><br><input type="checkbox" class="chkheader">',
                        template: function (e) {
                            if (e.IsLinked == true) {
                                return dirtyField(e, 'IsLinked') + '<input type="checkbox" checked class="chkbxlink" />';
                            }
                            else {
                                return dirtyField(e, 'IsLinked') + '<input type="checkbox" class="chkbxlink" />';
                            }
                        }
                    },
                ],
                dataBound: function (dt) {
                    var grid = this;
                    $(".chkbxlink").bind("change", function (e) {
                        var selectedRow = $(e.target).parent().parent();
                        var currentGrid = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid');
                        if (currentGrid != undefined) {
                            var dataItem = currentGrid.dataItem(selectedRow);
                            // var cell = $(e.target).closest('.k-detail-row').closest('td');
                            //  $(cell).prepend("<span class='k-dirty'></span>");

                            var cell1 = e.target.closest('td');
                            $(cell1).prepend("<span class='k-dirty'></span>");

                            dataItem.set("IsLinked", this.checked);
                            if (!this.checked) {
                                var data = milestoneToAdd.filter(function (val) {
                                    return val.MilestoneID == dataItem.MilestoneID;
                                });
                                if (data.length > 0) {
                                    var dataremove = milestoneToAdd.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                    milestoneToAdd.splice(dataremove, 1);

                                    if (dataItem.MilestoneType == null) {
                                        dataremove = gridDataSchedule.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                        gridDataSchedule.splice(dataremove, 1);
                                        dataremove = gridAllDataSchedule.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                        gridAllDataSchedule.splice(dataremove, 1);
                                    }

                                }
                                $('#gridPrgScheduleBulkEdit').data('kendoGrid').dataSource.read();
                            }
                        }
                    });
                    $('.chkheader').change(function (e) {
                        var checked = e.target.checked;
                        var currentGrid = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid');
                        if (currentGrid != undefined) {
                            var data = $(e.target).closest('.k-detail-row').find('.k-grid').data('kendoGrid').dataSource.view();
                            for (var i = 0; i < data.length; i++) {
                                data[i].set("IsLinked", checked);
                                if (checked == false) {
                                    var dataval = milestoneToAdd.filter(function (val) {
                                        return val.MilestoneID == data[i].MilestoneID;
                                    });
                                    if (dataval.length > 0) {
                                        var dataremove = milestoneToAdd.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                        milestoneToAdd.splice(dataremove, 1);

                                        if (data[i].MilestoneType == null) {
                                            dataremove = gridDataSchedule.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                            gridDataSchedule.splice(dataremove, 1);
                                            dataremove = gridAllDataSchedule.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                            gridAllDataSchedule.splice(dataremove, 1);
                                        }

                                    }
                                }
                            }
                            if (checked == false) {
                                $('#gridPrgScheduleBulkEdit').data('kendoGrid').dataSource.read();
                            }
                        }
                    });
                }

            };

            var detailGrid = $("<div/>").appendTo(e.detailCell).kendoGrid(gridOptions).data("kendoGrid");
            detailGrid.tbody.on("keydown", function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    var hasCombo = $(e.target).closest(".k-combobox").length;
                    if (hasCombo) {
                        detailGrid.editCell(detailGrid.current());
                        $("[data-role='combobox']").data("kendoComboBox").dataSource.read();
                    }
                }
            });
        }
        else {
            $("<div><span>No Milestones are added</span></div>").appendTo(e.detailCell)
        }
    }
    function AddMilestonePrgSchedule() {
        try {
            
            var showmsg = false;
            var templateMilestonemasterGrid = $("#gridPrgHubAddMilestones").data("kendoGrid");
            var detailRows = templateMilestonemasterGrid.element.find(".k-detail-row");
            for (var j = 0; j < detailRows.length; j++) {
                var detailGrid = $(detailRows[j]).find(".k-grid").data("kendoGrid");
                if (detailGrid != undefined) {
                    var gridData = $(detailRows[j]).find(".k-grid").data("kendoGrid").dataSource.data()
                        .filter(function (x) { return x.IsLinked == true })
                        .map(function (x) { return x });
                    if (gridData.length > 0)
                    { showmsg = true; }
                }
            }
            if (showmsg == true && confirm(setMilestoneConfirm)) {
                var templateMilestonemasterGrid = $("#gridPrgHubAddMilestones").data("kendoGrid");
                var detailRows = templateMilestonemasterGrid.element.find(".k-detail-row");
                var updatedData = [];
                var isduplicate = false;
                for (var i = 0; i < detailRows.length; i++) {
                    var detailGrid = $(detailRows[i]).find(".k-grid").data("kendoGrid");
                    if (detailGrid != undefined) {

                        var gridData = $(detailRows[i]).find(".k-grid").data("kendoGrid").dataSource.data()
                            .filter(function (x) { return x.IsLinked == true })
                            .map(function (x) { return x });
                        angular.forEach(gridData, function (item, index) {
                            var temp = {};
                            temp.ScheduleUniqueID = NewGuid();
                            temp.MilestoneTemplateID = item.MilestoneTemplateID;
                            temp.Milestone = item.Milestone;
                            temp.Comments = item.Comments;
                            temp.Variance = "NA";
                            temp.FunctionGroupID = item.FunctionGroupID;
                            temp.IncludeInReport = item.IncludeInReport;
                            temp.ProjectID = SeletedProjectId;
                            temp.PlannedFinish = null;
                            temp.BaselineFinish = null;
                            temp.CompletionDate = null;
                            temp.MilestoneType = item.MilestoneType;
                            temp.MilestoneID = item.MilestoneID;
                            var data = milestoneToAdd.filter(function (val) {
                                return val.MilestoneID == item.MilestoneID;
                            });

                            if (data.length == 0) {
                                if (item.MilestoneType != null) {
                                    var type1 = milestoneToAdd.filter(function (val) {
                                        return (val.MilestoneType == item.MilestoneType && item.MilestoneType == 1);
                                    });
                                    var type2 = milestoneToAdd.filter(function (val) {
                                        return (val.MilestoneType == item.MilestoneType && item.MilestoneType == 2);
                                    });
                                    if (type1.length > 0) {
                                        isduplicate = true;
                                        alert(exeStartMsg);
                                        return;
                                    }
                                    if (type2.length > 0) {
                                        isduplicate = true;
                                        alert(exeEndMsg);
                                        return;
                                    }
                                }

                                if (item.MilestoneType == 1) {
                                    var exestart = gridDataSchedule.findIndex(element => element.MilestoneType == 1);
                                    if (exestart >= 0) {
                                        gridDataSchedule[exestart].Comments = (gridDataSchedule[exestart].Comments != null && gridDataSchedule[exestart].Comments != "") ? gridDataSchedule[exestart].Comments : item.Comments;
                                        gridDataSchedule[exestart].FunctionGroupID = (item.FunctionGroupID != null && item.FunctionGroupID != "") ? item.FunctionGroupID : gridDataSchedule[exestart].FunctionGroupID;
                                        gridDataSchedule[exestart].IncludeInReport = (gridDataSchedule[exestart].IncludeInReport != null && gridDataSchedule[exestart].IncludeInReport != "") ? gridDataSchedule[exestart].IncludeInReport : item.IncludeInReport;
                                        gridDataSchedule[exestart].Milestone = item.Milestone;
                                        gridDataSchedule[exestart].MilestoneTemplateID = item.MilestoneTemplateID;
                                        gridDataSchedule[exestart].MilestoneID = item.MilestoneID;

                                    }
                                    exestart = gridAllDataSchedule.findIndex(element => element.MilestoneType == 1);
                                    gridAllDataSchedule[exestart].Comments = (gridAllDataSchedule[exestart].Comments != null && gridAllDataSchedule[exestart].Comments != "") ? gridAllDataSchedule[exestart].Comments : item.Comments;
                                    gridAllDataSchedule[exestart].FunctionGroupID = (item.FunctionGroupID != null && item.FunctionGroupID != "") ? item.FunctionGroupID : gridAllDataSchedule[exestart].FunctionGroupID;
                                    gridAllDataSchedule[exestart].IncludeInReport = (gridAllDataSchedule[exestart].IncludeInReport != null && gridAllDataSchedule[exestart].IncludeInReport != "") ? gridAllDataSchedule[exestart].IncludeInReport : item.IncludeInReport;
                                    gridAllDataSchedule[exestart].Milestone = item.Milestone;
                                    gridAllDataSchedule[exestart].MilestoneTemplateID = item.MilestoneTemplateID;
                                    gridAllDataSchedule[exestart].MilestoneID = item.MilestoneID;

                                    temp.ScheduleUniqueID = gridAllDataSchedule[exestart].ScheduleUniqueID;
                                    temp.MilestoneTemplateID = item.MilestoneTemplateID;
                                    temp.Milestone = item.Milestone;
                                    temp.Comments = item.Comments;
                                    temp.Variance = "NA";
                                    temp.FunctionGroupID = item.FunctionGroupID;
                                    temp.IncludeInReport = item.IncludeInReport;
                                    temp.ProjectID = SeletedProjectId;
                                    temp.PlannedFinish = gridAllDataSchedule[exestart].PlannedFinish;
                                    temp.BaselineFinish = gridAllDataSchedule[exestart].BaselineFinish;
                                    temp.CompletionDate = gridAllDataSchedule[exestart].CompletionDate;
                                    temp.MilestoneType = item.MilestoneType;
                                    temp.MilestoneID = item.MilestoneID;
                                    milestoneToAdd.push(temp);
                                }
                                else if (item.MilestoneType == 2) {
                                    var exestart = gridDataSchedule.findIndex(element => element.MilestoneType == 2);
                                    if (exestart >= 0) {
                                        gridDataSchedule[exestart].Comments = (gridDataSchedule[exestart].Comments != null && gridDataSchedule[exestart].Comments != "") ? gridDataSchedule[exestart].Comments : item.Comments;
                                        gridDataSchedule[exestart].FunctionGroupID = (item.FunctionGroupID != null && item.FunctionGroupID != "") ? item.FunctionGroupID : gridDataSchedule[exestart].FunctionGroupID;
                                        gridDataSchedule[exestart].IncludeInReport = (gridDataSchedule[exestart].IncludeInReport != null && gridDataSchedule[exestart].IncludeInReport != "") ? gridDataSchedule[exestart].IncludeInReport : item.IncludeInReport;
                                        gridDataSchedule[exestart].Milestone = item.Milestone;
                                        gridDataSchedule[exestart].MilestoneID = item.MilestoneID;
                                        gridDataSchedule[exestart].MilestoneTemplateID = item.MilestoneTemplateID;
                                    }
                                    exestart = gridAllDataSchedule.findIndex(element => element.MilestoneType == 2);
                                    gridAllDataSchedule[exestart].Comments = (gridAllDataSchedule[exestart].Comments != null && gridAllDataSchedule[exestart].Comments != "") ? gridAllDataSchedule[exestart].Comments : item.Comments;
                                    gridAllDataSchedule[exestart].FunctionGroupID = (item.FunctionGroupID != null && item.FunctionGroupID != "") ? item.FunctionGroupID : gridAllDataSchedule[exestart].FunctionGroupID;
                                    gridAllDataSchedule[exestart].IncludeInReport = (gridAllDataSchedule[exestart].IncludeInReport != null && gridAllDataSchedule[exestart].IncludeInReport != "") ? gridAllDataSchedule[exestart].IncludeInReport : item.IncludeInReport;
                                    gridAllDataSchedule[exestart].Milestone = item.Milestone;
                                    gridAllDataSchedule[exestart].MilestoneID = item.MilestoneID;
                                    gridAllDataSchedule[exestart].MilestoneTemplateID = item.MilestoneTemplateID;
                                    temp.ScheduleUniqueID = gridAllDataSchedule[exestart].ScheduleUniqueID;
                                    temp.MilestoneTemplateID = item.MilestoneTemplateID;
                                    temp.Milestone = item.Milestone;
                                    temp.Comments = item.Comments;
                                    temp.Variance = "NA";
                                    temp.FunctionGroupID = item.FunctionGroupID;
                                    temp.IncludeInReport = item.IncludeInReport;
                                    temp.ProjectID = SeletedProjectId;
                                    temp.PlannedFinish = gridAllDataSchedule[exestart].PlannedFinish;
                                    temp.BaselineFinish = gridAllDataSchedule[exestart].BaselineFinish;
                                    temp.CompletionDate = gridAllDataSchedule[exestart].CompletionDate;
                                    temp.MilestoneType = item.MilestoneType;
                                    temp.MilestoneID = item.MilestoneID;
                                    milestoneToAdd.push(temp);
                                }
                                else {
                                    milestoneToAdd.push(temp);
                                    gridDataSchedule.push(temp);
                                    gridAllDataSchedule.push(temp);
                                }
                            }
                        });

                    }
                }
                if (!isduplicate) {
                    if (milestoneToAdd.length > 0) {
                        $('#gridPrgScheduleBulkEdit').data('kendoGrid').dataSource.read();
                        var grid = $("#gridPrgScheduleBulkEdit").data("kendoGrid");
                        if (vm.scheduleClosed) {
                            angular.forEach(milestoneToAdd, function (item, index) {
                                var dataItem = grid.dataSource.get(item.ScheduleUniqueID);
                                dataItem.dirty = true;
                            });
                        }
                        else {
                            var incompleteData = milestoneToAdd.filter(function (entry) {
                                return entry.CompletionDate == null;
                            });
                            if (incompleteData.length > 0) {
                                angular.forEach(incompleteData, function (item, index) {
                                    var dataItem = grid.dataSource.get(item.ScheduleUniqueID);
                                    dataItem.dirty = true;
                                });
                            }
                            else {
                                if (gridDataSchedule.length > 0) {
                                    var id = gridDataSchedule[0].ScheduleUniqueID;
                                    var dataItem = grid.dataSource.get(id);
                                    dataItem.dirty = true;
                                }
                            }
                        }
                    }
                    $('#gridPrgScheduleBulkEdit').data('kendoGrid').refresh();
                    var window = $("#dialogAddMilestonePrgHub");
                    window.data("kendoWindow").close();
                }
            }
            else {
                var window = $("#dialogAddMilestonePrgHub");
                window.data("kendoWindow").close();
            }

        }
        catch (err) {
            var dataToSend = {
                "method": "AddMilestonePrgSchedule", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }

    }
    function UpdateMilestones() {
        try {

            var count = $("#gridPrgScheduleBulkEdit").data("kendoGrid").tbody.find("input:checked").length;
            if (vm.scheduleClosed) {
                if (count > milestoneIncludeReportCount) {
                    alert(includeReportMessageForMilestone);
                    return false;
                }
            }
            else {
                var countCompleted = gridAllDataSchedule.filter(function (entry) {
                    return (entry.IncludeInReport == true && entry.CompletionDate != null);
                });
                if (countCompleted.length > 0) {
                    var totalCount = count + countCompleted.length;
                    if (totalCount > milestoneIncludeReportCount) {
                        alert(includeReportMessageForMilestone);
                        return false;
                    }
                }
                else {
                    if (count > milestoneIncludeReportCount) {
                        alert(includeReportMessageForMilestone);
                        return false;
                    }
                }

            }
            if (IsBaseline) {
                if (!Isupdatebaseline) {
                    setMilestioneUpdate = true;
                    var window = $("#dialogPrgScheduleBaselineCount");
                    window.data("kendoWindow").open();
                }
            }
            else { updateMilestoneFromSet(); }

            //if ($('#gridPrgScheduleBulkEdit').data('kendoGrid') != undefined) {
            //    var gridupdatedData = $('#gridPrgScheduleBulkEdit').data('kendoGrid').dataSource.data()
            //        .filter(function (x) { return x.dirty })
            //        .map(function (x) { return x });
            //    var insertMilestoneArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
            //        .map(function (x) { return x });
            //    var updateMilestoneArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
            //        .map(function (x) { return x });

            //    angular.forEach(insertMilestoneArray, function (item, index) {
            //        var temp = {};
            //        temp.ScheduleUniqueID = NewGuid();
            //        temp.Milestone = item.Milestone;
            //        temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
            //        temp.BaselineFinish = kendo.toString(item.BaselineFinish, "d");
            //        temp.CompletionDate = kendo.toString(item.CompletionDate, "d");
            //        temp.FunctionGroupID = item.FunctionGroupID;
            //        temp.IncludeInReport = item.IncludeInReport;
            //        temp.ProjectID = item.ProjectID;
            //        temp.Comments = item.Comments;
            //        temp.IncludeInCharter = item.IncludeInCharter;
            //        milestoneInsertListItems.push(temp);
            //    });
            //    angular.forEach(updateMilestoneArray, function (item, index) {
            //        var temp = {};
            //        temp.ScheduleUniqueID = item.ScheduleUniqueID;
            //        temp.MilestoneType = item.MilestoneType;
            //        temp.Milestone = item.Milestone;
            //        // temp.Milestone = (item.MilestoneType == 1) ? MilestoneStartPrefix + item.Milestone : (item.MilestoneType == 2 ? MilestoneEndPrefix + item.Milestone : item.Milestone);
            //        temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
            //        temp.BaselineFinish = kendo.toString(item.BaselineFinish, "d");
            //        temp.CompletionDate = kendo.toString(item.CompletionDate, "d");
            //        temp.FunctionGroupID = item.FunctionGroupID;
            //        temp.IncludeInReport = item.IncludeInReport;
            //        temp.ProjectID = item.ProjectID;
            //        temp.IncludeInCharter = item.IncludeInCharter;
            //        temp.ParentProgramID = item.ParentProgramID;
            //        temp.Comments = item.Comments;
            //        temp.IsLinked = item.IsLinked;
            //        temp.Variance = item.Variance;
            //        if (milestoneToAdd.length > 0) {
            //            temp.MilestoneTemplateID = item.MilestoneTemplateID;
            //            temp.MilestoneID = item.MilestoneID;
            //        }
            //        milestoneUpdateListItems.push(temp);
            //    });
            //}

            //var dataToSend = {
            //    "programId": SeletedProjectId,
            //    "userId": currentUserId,
            //    "objInsert": JSON.stringify(milestoneInsertListItems),
            //    "objUpdate": JSON.stringify(milestoneUpdateListItems),
            //    "objDelete": JSON.stringify(deletedMilestoneData)
            //};
            //GETPostService.postDataWCFAsync('insertUpdateProgramMilestones', dataToSend).then(function (response) {
            //    if (response == "Success") {
            //        if (IsBaseline) {
            //            IsBaseline = false;
            //            var projectslist = baselinedProjects.toString();
            //            var milestones = baselinedMilestones.toString();
            //            var baselineData = { CurrentProjectID: SeletedProjectId, ProjectID: projectslist, TeamMemberAdId: currentUserId, Milestones: milestones, IncreaseBaseline: IncreaseBaselineCount, BaselineComment: vm.BaselineCount.Comment };
            //            //    var finalData = JSON.stringify({
            //            //        "BaselineData": baselineData
            //            //    });
            //            //   var baselineData = { ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, };
            //            var finalData = JSON.stringify({
            //                "BaselineData": baselineData
            //            });
            //            $rootScope.$emit("RefreshForDataQuality");
            //            GETPostService.postDataWCFAsync('insertProjectBaseline', finalData).then(function (response) {
            //                if (response.insertProjectBaselineResult == "Success") {
            //                    if (IncreaseBaselineCount) {
            //                        vm.ProjectBaselineCount = vm.ProjectBaselineCount + 1;
            //                    }
            //                    vm.ProjectBaselineDate = vm.todayDate;
            //                    milestoneToAdd = [];
            //                    getDataForSchedule();
            //                    gridDataSaved = true;
            //                    Isupdatebaseline = false;
            //                    IsBaseline = false;
            //                    var window = $("#dialogAddMilestonePrgHub");
            //                    window.data("kendoWindow").open();
            //                }
            //            });
            //        }
            //        else {
            //            milestoneToAdd = [];
            //            getDataForSchedule();
            //            gridDataSaved = true;
            //            Isupdatebaseline = false;
            //            IsBaseline = false;
            //            var window = $("#dialogAddMilestonePrgHub");
            //            window.data("kendoWindow").open();
            //        }
            //        //alert("Success");
            //    }
            //    else {
            //        alert("Error occurred in item updation for schedule.");
            //    }
            //});
        }
        catch (err) {
            var dataToSend = {
                "method": "UpdateMilestones", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }



    }
    function updateMilestoneFromSet() {
        try {
            var milestoneInsertListItems = [];
            var milestoneUpdateListItems = [];
            var listdataMilestone = [];
            if ($('#gridPrgScheduleBulkEdit').data('kendoGrid') != undefined) {
                var gridupdatedData = $('#gridPrgScheduleBulkEdit').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertMilestoneArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateMilestoneArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });

                angular.forEach(insertMilestoneArray, function (item, index) {
                    var temp = {};
                    temp.ScheduleUniqueID = NewGuid();
                    temp.Milestone = item.Milestone;
                    temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                    temp.BaselineFinish = kendo.toString(item.BaselineFinish, "d");
                    temp.CompletionDate = kendo.toString(item.CompletionDate, "d");
                    temp.FunctionGroupID = item.FunctionGroupID;
                    temp.IncludeInReport = item.IncludeInReport;
                    temp.ProjectID = item.ProjectID;
                    temp.Comments = item.Comments;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    milestoneInsertListItems.push(temp);
                });
                angular.forEach(updateMilestoneArray, function (item, index) {
                    var temp = {};
                    temp.ScheduleUniqueID = item.ScheduleUniqueID;
                    temp.MilestoneType = item.MilestoneType;
                    //temp.Milestone = item.Milestone;
                    temp.Milestone = (item.MilestoneType == 1) ? MilestoneStartPrefix + item.Milestone : (item.MilestoneType == 2 ? MilestoneEndPrefix + item.Milestone : item.Milestone);
                    temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                    temp.BaselineFinish = kendo.toString(item.BaselineFinish, "d");
                    temp.CompletionDate = kendo.toString(item.CompletionDate, "d");
                    temp.FunctionGroupID = item.FunctionGroupID;
                    temp.IncludeInReport = item.IncludeInReport;
                    temp.ProjectID = item.ProjectID;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    temp.ParentProgramID = item.ParentProgramID;
                    temp.Comments = item.Comments;
                    temp.IsLinked = item.IsLinked;
                    temp.Variance = item.Variance;
                    if (milestoneToAdd.length > 0) {
                        temp.MilestoneTemplateID = item.MilestoneTemplateID;
                        temp.MilestoneID = item.MilestoneID;
                    }
                    milestoneUpdateListItems.push(temp);
                });
            }
            if (milestoneToAdd.length > 0) {
                if (!vm.scheduleClosed) {
                    var completeData = milestoneToAdd.filter(function (entry) {
                        return entry.CompletionDate != null;
                    });
                    angular.forEach(completeData, function (item, index) {
                        var exeindex = gridAllDataSchedule.findIndex(element => element.MilestoneType == item.MilestoneType);
                        var temp = {};
                        temp.ScheduleUniqueID = gridAllDataSchedule[exeindex].ScheduleUniqueID;
                        temp.MilestoneType = gridAllDataSchedule[exeindex].MilestoneType;
                        temp.Milestone = gridAllDataSchedule[exeindex].Milestone;
                        temp.PlannedFinish = kendo.toString(gridAllDataSchedule[exeindex].PlannedFinish, "d");
                        temp.BaselineFinish = kendo.toString(gridAllDataSchedule[exeindex].BaselineFinish, "d");
                        temp.CompletionDate = kendo.toString(gridAllDataSchedule[exeindex].CompletionDate, "d");
                        temp.FunctionGroupID = gridAllDataSchedule[exeindex].FunctionGroupID;
                        temp.IncludeInReport = gridAllDataSchedule[exeindex].IncludeInReport;
                        temp.ProjectID = gridAllDataSchedule[exeindex].ProjectID;
                        temp.IncludeInCharter = gridAllDataSchedule[exeindex].IncludeInCharter;
                        temp.ParentProgramID = gridAllDataSchedule[exeindex].ParentProgramID;
                        temp.Comments = gridAllDataSchedule[exeindex].Comments;
                        temp.IsLinked = gridAllDataSchedule[exeindex].IsLinked;
                        temp.MilestoneTemplateID = gridAllDataSchedule[exeindex].MilestoneTemplateID;
                        temp.MilestoneID = gridAllDataSchedule[exeindex].MilestoneID;
                        milestoneUpdateListItems.push(temp);
                    });
                }
            }

            var dataToSend = {
                "programId": SeletedProjectId,
                "userId": currentUserId,
                "objInsert": JSON.stringify(milestoneInsertListItems),
                "objUpdate": JSON.stringify(milestoneUpdateListItems),
                "objDelete": JSON.stringify(deletedMilestoneData)
            };
            GETPostService.postDataWCFAsync('insertUpdateProgramMilestones', dataToSend).then(function (response) {
                if (response == "Success") {
                    alert("Milestone data updated successfully");
                    if (IsBaseline) {
                        IsBaseline = false;
                        var projectslist = baselinedProjects.toString();
                        var milestones = baselinedMilestones.toString();
                        var baselineData = { CurrentProjectID: SeletedProjectId, ProjectID: projectslist, TeamMemberAdId: currentUserId, Milestones: milestones, IncreaseBaseline: IncreaseBaselineCount, BaselineComment: vm.BaselineCount.Comment };
                        //    var finalData = JSON.stringify({
                        //        "BaselineData": baselineData
                        //    });
                        //   var baselineData = { ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, };
                        var finalData = JSON.stringify({
                            "BaselineData": baselineData
                        });
                        $rootScope.$emit("RefreshForDataQuality");
                        GETPostService.postDataWCFAsync('insertProjectBaseline', finalData).then(function (response) {
                            if (response.insertProjectBaselineResult == "Success") {
                                if (IncreaseBaselineCount) {
                                    vm.ProjectBaselineCount = vm.ProjectBaselineCount + 1;
                                }
                                vm.ProjectBaselineDate = vm.todayDate;
                                milestoneToAdd = [];
                                getDataForSchedule();
                                gridDataSaved = true;
                                Isupdatebaseline = false;
                                IsBaseline = false;
                                var window = $("#dialogAddMilestonePrgHub");
                                window.data("kendoWindow").open();
                            }
                        });
                    }
                    else {
                        milestoneToAdd = [];
                        getDataForSchedule();
                        gridDataSaved = true;
                        Isupdatebaseline = false;
                        IsBaseline = false;
                        var window = $("#dialogAddMilestonePrgHub");
                        window.data("kendoWindow").open();
                    }
                    //alert("Success");
                }
                else {
                    alert("Error occurred in item updation for schedule.");
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "updateMilestonesFromSet", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    }
    function initProgramHub() {
        //$.when(GETPostService.getUserAdID()).then(function (userId) {
        //    prepareDataForProjectHub();
        //});

    };
};



