//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('ProjectHubCtrl', ProjectHubCtrl)
ProjectHubCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function ProjectHubCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    // Flag
    vm.myvalue = false;
    vm.qualityGridVisible = false;
    vm.riskIssueClosed = false;
    vm.askNeedClosed = false;
    vm.scheduleClosed = false;
    vm.Edit = false;
    vm.showTeamPermission = false;
    vm.ShowBaseline = false;
    vm.showPhase = false;
    vm.showDeliverables = true;
    var IncreaseBaselineCount = false;
    var Isupdatebaseline = false;
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
    var projectTeam = [];
    var askNeedUsers = [];
    var riskIssueUsers = [];
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
    vm.phasePagepath = phasePagepath;
    vm.addNewRolePagepath = addNewRolePagepath;
    vm.projectDetailsAndFormsPagepath = projectDetailsAndFormsPagepath;
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
    vm.overAllStatus = []
    vm.projectPhase = [];
    vm.projectState = [];
    vm.teamRole = [];
    vm.AskNeedusersList = [];

    //Project Hub Array
    vm.riskIssueType = [];
    // vm.siteUsers = [];
    vm.probability = [];
    vm.dsFuntionalGroup = [];
    vm.Impact = [];
    vm.askNeedData = [];
    // Functions
    vm.initProjectHub = initProjectHub;
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
    vm.SetBaseline = SetBaseline;

    vm.openRiskIssueDialog = openRiskIssueDialog;
    vm.openAskNeedDialog = openAskNeedDialog;
    vm.openScheduleDialog = openScheduleDialog;
    vm.openOverallStatusDialog = openOverallStatusDialog;
    vm.UpdateBaselineCount = UpdateBaselineCount;
    vm.dialogBaselineCountCose = dialogBaselineCountCose;
    vm.AddMilestoneSchedule = AddMilestoneSchedule;
    vm.CheckBulkEditGridUpdate = CheckBulkEditGridUpdate;
    //Local variables
    var gridDataRiskIssue = [];
    var gridDataAskNeed = [];
    var gridDataSchedule = [];
    var gridAllDataRiskIssue = [];
    var gridAllDataAskNeed = [];
    var gridAllDataSchedule = [];
    var gridDataBaselineLog = [];
    // var gridDataProjectPhase = [];
    // var gridDataProjectState = [];
    // var gridDataTeam = [];
    var functionalgroupBulk = [];
    var resourcesBulk = [];
    var probabilityBulk = [];
    var impactBulk = [];
    var riskIssueTypeBulk = [];
    var rolesBulk = [];
    /// var permissionbulk = [];
    var usergroups = [];
    var grdMilestoneTemplate = [];
    var grdMilestoneTemplateDetail = [];
    var milestoneToAdd = [];
    var lookup = riskIssueProbability + "," + riskIssueImpact + "," + funtionalGroup + "," + riskIssueType + "," + overAllStatus + "," + performanceStatus + "," + topsPrimaryKpi;
    var saveData = 0;
    var countDashoardRiskIssue = 0;
    var countDashoardAskNeed = 0;
    var countDashoardMilestone = 0;
    var countDashoardRiskIssueform = 0;
    var countDashoardAskNeedform = 0;
    var countDashoardMilestoneform = 0;
    var baselinedMilestones = [];
    var className = "ProjectHubCtrl";
    //var isConfidentialProject;


    var dirtyField = function (data, fieldName) {
        if (data.dirty && data.dirtyFields[fieldName]) {
            return "<span class='k-dirty'></span>";
        }
        else {
            return "";
        }
    };

    $rootScope.$on("getProjectHubData", function (event) {
        displayLoading();
        prepareDataForProjectHub();
    });
    $rootScope.$on("getProjectHubRiskData", function (event) {
        getDataForRiskIssue();
    });
    $rootScope.$on("getProjectHubScheduleData", function (event) {
        getDataForSchedule();
    });
    $rootScope.$on("getProjectHubAskNeedData", function (event) {
        getDataForAskNeed();
    });
    $rootScope.$on("getProjectHubOverallData", function (event) {
        getDataForOverallStatus();
    });
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
    //Bind the risk issue controls
    //function bindRiskIssueControl() {
    //    bindChangeDatePicker("logDate");
    //    bindChangeDatePicker("closeDate");
    //    bindChangeDatePicker("dueDate");
    //    bindChangeComboBox("type");
    //    bindChangeComboBox("probability");
    //    bindChangeComboBox("impact");
    //    bindChangeComboBox("functiongroup");
    //    bindUserPicker("riskowner");
    //    bindRiskIssue = false;
    //}
    function openOverallStatusDialog() {
        try {
            $rootScope.$emit("openOverallStatusDialog", vm.overAllData, gridDataKeySuccess);
            //OriginalOverallStatus = {};
            //angular.copy(vm.overAllData, OriginalOverallStatus);
            //bindChangeDatePicker("statusDate");
            //bindChangeComboBox("overallstatus");
            //SetDefaultOverallStatus();
            //var myWindow = $("#dialogOverallStatus");
            //myWindow.data("kendoWindow").open();
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
            //OriginalAskObj = {};
            //if (bindAskNeed) {
            //    bindAskNeedControl();
            //}
            //else {
            //    var siteUsers = [];
            //    var ownerlist = $("#needfromUser").data("kendoComboBox");
            //    ownerlist.setDataSource(siteUsers);
            //    ownerlist.value([]);
            //    ownerlist.refresh();
            //}
            //angular.copy(vm.askNeed, OriginalAskObj);
            //countDashoardAskNeedform = countDashoardAskNeed.length;
            //var myWindow = $("#dialogAskNeed");
            //myWindow.data("kendoWindow").open();
        }
        catch (err) {
            var dataToSend = {
                "method": "openAskNeedDialog", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }
    }
    //function bindAskNeedControl() {
    //    bindChangeDatePicker("askLogDate");
    //    bindChangeDatePicker("askCloseDate");
    //    bindChangeDatePicker("needByDate");
    //    bindUserPicker("needfromUser");
    //    bindAskNeed = false;
    //}

    function openScheduleDialog() {
        try {
            $rootScope.$emit("openScheduleDialog", countDashoardMilestone);
            //OriginalScheduleObj = {};
            //angular.copy(vm.schedule, OriginalScheduleObj);
            //if (bindSchedule) {
            //    bindChangeDatePicker("plannedFinishDate");
            //    bindChangeDatePicker("completionDate");
            //    bindChangeComboBox("functionowner");
            //    bindSchedule = false;
            //}
            //countDashoardMilestoneform = countDashoardMilestone.length;
            //var myWindow = $("#dialogMilestone");
            //myWindow.data("kendoWindow").open();
        }
        catch (err) {
            var dataToSend = {
                "method": "openScheduleDialog", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }
    }



    ////Refresh Project Hub when any update made on project charter
    //$rootScope.$on("ReloadProjectHub", function (event) {

    //    $.when(GETPostService.postDataWCF("getHubSetting", SeletedProjectId))
    //   .then(function (resHubSettings) {
    //       try {
    //           var dsHubSettings = JSON.parse(resHubSettings.getHubSettingResult);
    //           angular.forEach(dsHubSettings, function (item, index) {
    //               switch (item.LookUpID) {
    //                   case overAllHubStatus:
    //                       vm.showOverall = item.HubValue;
    //                       break;
    //                   case riskIssueOption:
    //                       vm.showRiskIssue = item.HubValue;
    //                       break;
    //                   case milestoneOption:
    //                       vm.showMilestone = item.HubValue;
    //                       break;
    //                   case askNeedOption:
    //                       vm.showAskNeed = item.HubValue;
    //                       break;
    //                   case budgetOption:
    //                       vm.showBudget = item.HubValue;
    //                       break;
    //                   case teamOption:
    //                       vm.showTeam = item.HubValue;
    //                       break;
    //                   case documentOption:
    //                       vm.showDocument = item.HubValue;
    //                       break;
    //               }
    //           });
    //           getDataForRiskIssue();
    //           getDataForSchedule();
    //           getDataForTeam();
    //           vm.ProjectName = vm.projectHubStatus.ProjectName;
    //           $scope.$digest();
    //       }
    //       catch (err) {
    //           var dataToSend = {
    //               "method": "ReloadProjectHub", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
    //           };
    //           $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
    //                 .then(function (response) { alert(errormessage) });
    //       }
    //   });

    //});
    //Load Project Hub data
    function prepareDataForProjectHub() {
        try {
            debugger;
            vm.riskIssueClosed = false;
            vm.askNeedClosed = false;
            vm.scheduleClosed = false;
            var dataToSendForMilestoneSet = {
                "ProjectID": SeletedProjectId, "DataType": "TemplateDetails"
            };
            var dataToSendForMilestoneTemplate = {
                "ProjectID": SeletedProjectId, "DataType": "Template"
            };
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.getDataWCFAsync("getAskNeed/" + SeletedProjectId),
            GETPostService.getDataWCFAsync("getSchedule/" + SeletedProjectId), GETPostService.getDataWCFAsync("getRiskIssue/" + SeletedProjectId),
            GETPostService.getDataWCFAsync("getOverAllStatus/" + SeletedProjectId), GETPostService.getDataWCFAsync("getProjectHubStatus/" + SeletedProjectId),
            GETPostService.getDataWCFAsync("getUserPermissionByProjectUserId/" + currentUserId + "/" + SeletedProjectId),
            GETPostService.postDataWCFAsync("getUserPermissionById", currentUserId), GETPostService.postDataWCFAsync("getProjectBaseline", SeletedProjectId),
                GETPostService.postDataWCFAsync("getHubSetting", SeletedProjectId), GETPostService.postDataWCFAsync("getUserGroupById", currentUserId),
                GETPostService.postDataWCFAsync("getProjectBaselineLog", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId),
                GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneTemplate), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneSet)
                )
                .then(function (resLookup, resAskNeed, resSchedule, resRiskIssue, resOverallStatus, resStatus, userpermission,
                    userGlobalPermission, projectbaseline, resHubSettings, usergroup, baselinelog, resKeySuccess, resMilestoneTemplates, resMilestoneTemplateDetail) {
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
                        gridDataKeySuccess = JSON.parse(resKeySuccess.getProjectCharterKeySuccessResult);

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
                        else { vm.showjustification = false; }
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
                        isConfidentialProject = vm.projectHubStatus.IsConfidential;
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
                        var askNeedData = JSON.parse(resAskNeed.getAskNeedResult);
                        angular.copy(askNeedData, gridAllDataAskNeed)
                        gridDataAskNeed = askNeedData.filter(function (entry) {
                            return entry.CloseDate == null;
                        });

                        var scheduleData = JSON.parse(resSchedule.getScheduleResult);
                        angular.copy(scheduleData, gridAllDataSchedule)
                        gridDataSchedule = scheduleData.filter(function (entry) {
                            return entry.CompletionDate == null;
                        });

                        // openConfirmation("dialogMilestone", saveScheduleData);
                        var riskIssueData = JSON.parse(resRiskIssue.getRiskIssueResult);
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
                        gridDataBaselineLog = JSON.parse(baselinelog.getProjectBaselineLogResult)
                        //Milestone Set
                        grdMilestoneTemplate = JSON.parse(resMilestoneTemplates);
                        grdMilestoneTemplateDetail = JSON.parse(resMilestoneTemplateDetail);
                        if (!IsLoad) {
                            vm.dsFuntionalGroup = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == funtionalGroup;
                            });
                            for (var i = 0; i < vm.dsFuntionalGroup.length; i++) {
                                var item = {
                                    "text": vm.dsFuntionalGroup[i].LookUpMemberName, "value": vm.dsFuntionalGroup[i].LookUpMemberID
                                }
                                functionalgroupBulk.push(item);
                            }

                            vm.probability = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == riskIssueProbability;
                            });
                            for (var i = 0; i < vm.probability.length; i++) {
                                var item = {
                                    "text": vm.probability[i].LookUpMemberName, "value": vm.probability[i].LookUpMemberID
                                }
                                probabilityBulk.push(item);
                            }

                            vm.Impact = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == riskIssueImpact;
                            });
                            for (var i = 0; i < vm.Impact.length; i++) {
                                var item = {
                                    "text": vm.Impact[i].LookUpMemberName, "value": vm.Impact[i].LookUpMemberID
                                }
                                impactBulk.push(item);
                            }

                            vm.riskIssueType = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == riskIssueType;
                            });
                            for (var i = 0; i < vm.riskIssueType.length; i++) {
                                var item = {
                                    "text": vm.riskIssueType[i].LookUpMemberName, "value": vm.riskIssueType[i].LookUpMemberID
                                }
                                riskIssueTypeBulk.push(item);
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
                            InitKendoGridBaselineLog();
                            InitkGridOverAllPerformance();
                            DialogCloseBinding();
                            InitMilestoneTemplates();
                            IsLoad = true;
                        }
                        else {
                            var dataSource = new kendo.data.DataSource({ data: gridDataRiskIssue });
                            var grid = $('#gridRiskIssue').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);
                            dataSource = new kendo.data.DataSource({ data: gridDataSchedule });
                            grid = $('#gridSchedule').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);
                            dataSource = new kendo.data.DataSource({ data: gridDataAskNeed });
                            grid = $('#gridAskNeed').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);
                            dataSource = new kendo.data.DataSource({ data: gridDataBaselineLog });
                            grid = $('#gridBaselineLogs').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);

                            dataSource = new kendo.data.DataSource({ data: grdMilestoneTemplate });
                            grid = $('#gridHubAddMilestones').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);

                            $('#gridRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
                            $('#gridScheduleBulkEdit').data('kendoGrid').dataSource.read();
                            $('#gridAskNeedBulkEdit').data('kendoGrid').dataSource.read();
                        }
                        vm.BaselineCount.IncreaseBaseline = "YES";
                        $scope.$digest();
                        hideLoading();
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
                    //template: function (e) {
                    //    if (vm.isEditable == false) {
                    //        if (e.IncludeInCharter == true) {
                    //            return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="successchkbx" />';
                    //        }
                    //        else {
                    //            return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="successchkbx" />';
                    //        }
                    //    }
                    //    else {
                    //        if (e.IncludeInCharter == true) {
                    //            return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="successchkbx" />';
                    //        }
                    //        else {
                    //            return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="successchkbx" />';
                    //        }
                    //    }
                    //},
                    // template: '<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="successchkbx" />',//CheckBoxKeySuccessEdit
                    //selectable: false
                }
                //{
                //    hidden: !(vm.isEditable),
                //    command: [{
                //        name: " ",
                //        iconClass: "k-icon k-i-close",
                //        width: "10%",
                //        click: function (e) {
                //            try {
                //                // prevent page scroll position change
                //                if (!confirm(gridDeleteMessage))
                //                    e.preventDefault();
                //                else {
                //                    e.preventDefault();
                //                    // e.target is the DOM element representing the button
                //                    var tr = $(e.target).closest("tr"); // get the current table row (tr)
                //                    // get the data bound to the current table row
                //                    var data = this.dataItem(tr);
                //                    if (data.KeySuccessUniqueID != 'undefined' && data.KeySuccessUniqueID != "")
                //                        vm.deletedKeySuccessData.push({ "KeySuccessUniqueID": data.KeySuccessUniqueID });

                //                    var grid = $("#overAllStatusPerformance").data("kendoGrid");
                //                    grid.removeRow(tr);

                //                    $scope.$digest();
                //                }
                //            }
                //            catch (err) {
                //                hideLoading();
                //                var dataToSend = {
                //                    "method": "InitkGridOverAllPerformance", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                //                };
                //                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                //                    .then(function (response) { alert(errormessage); });
                //            }
                //        }
                //    }]
                //}
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
            $("#overAllStatusPerformance").kendoGrid({
                dataSource: dataSource1,
                columns: col,
                navigatable: true,
                //editable: {
                //    createAt: "bottom"
                //},
                //dataBound: function () {
                //    $(".successchkbx").bind("change", function (e) {
                //        var grid = $("#overAllStatusPerformance").data("kendoGrid"),
                //            dataItem = grid.dataItem($(e.target).closest("tr"));

                //        var cell = e.target.closest('td');
                //        $(cell).prepend("<span class='k-dirty'></span>");

                //        dataItem.set("IncludeInCharter", this.checked);
                //        //dataItem.dirty = true;
                //    });
                //}

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
            $("#gridRiskIssue").kendoGrid({
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
                                template: "#if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
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
                         //template: "#= DueDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(DueDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
                     },
                     {
                         field: "IfHappens",
                         title: "If This Happens",
                         headerAttributes: { "class": "wrap-header" },
                         template: function (e) {
                             var value = "";
                             if (e.CloseDate != null && e.CloseDate != "") {
                                 value = (e.IfHappens != null && e.IfHappens != "") ? "<span class='text-italic'>" + e.IfHappens + "</span>" : '';
                             }
                             else { value = (e.IfHappens != null && e.IfHappens != "") ? e.IfHappens : '' }
                             return value;
                         },
                         width: "40%"
                     },
                     {
                         field: "RiskIssueTypeID",
                         title: "Type",
                         width: "10%",
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
            $("#gridRiskIssue").kendoTooltip({
                filter: "td:nth-child(3)", //this filter selects the fifth column's cells
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
                    var dataItem = $("#gridRiskIssue").data("kendoGrid").dataItem(e.target.closest("tr"));
                    var content = "";
                    if (dataItem.ChildLink == 1 && dataItem.LinkedParentProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedToRiskIssue + dataItem.LinkedParentProjects + "</div>";
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
            $("#gridSchedule").kendoGrid({
                dataSource: {
                    data: gridDataSchedule,
                    sort: [{ field: "MilestoneOrder ", dir: "asc" }
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
                    template: "#if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
                    title: " ",
                    width: "4%",
                },
                {
                    field: "Milestone",
                    title: "Milestone",
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
                                //else if (e.MilestoneType == 2) {
                                //    value = ("<b>" + MilestoneEndPrefix + "</b>" + e.Milestone.split('-')[1]);
                                //}
                            else
                                value = (e.Milestone != null && e.Milestone != "") ? e.Milestone : '';
                        }
                        return value;
                    },
                    width: "32%",
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

                    field: "StatusIndicator",
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
                }, {
                    field: "Variance",
                    title: "Variance",
                    width: "11%",
                    headerAttributes: { "class": "txt-float-R" },
                    attributes: { class: "txt-float-R" },
                    template: function (e) {
                        var value = "";
                        if (e.CompletionDate != null && e.CompletionDate != "") {
                            value = "<span class='text-italic'>" + (e.Variance.toString() == 'NA' || e.Variance.toString() == '') ? 'NA' : (e.Variance.toString() + "days") + "</span>";
                        }
                        else {
                            value = ((e.Variance.toString() == "NA" || e.Variance.toString() == '') ? "NA" : (e.Variance.toString() + " days"));
                        } t
                        return value;
                    },
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
            $("#gridSchedule").kendoTooltip({
                filter: "td:nth-child(3)", //this filter selects the fifth column's cells
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
                    var dataItem = $("#gridSchedule").data("kendoGrid").dataItem(e.target.closest("tr"));
                    var content = "";
                    if (dataItem.ChildLink == 1 && dataItem.LinkedParentProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedToMilestone + dataItem.LinkedParentProjects + "</div>";
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
            $("#gridAskNeed").kendoGrid({
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
                    attributes: { class: "#:StatusIndicator#" }
                },
                {
                    template: "#if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
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
                }, {
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
                    // template: "#= NeedByDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(NeedByDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
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
            $("#gridAskNeed").kendoTooltip({
                filter: "td:nth-child(3)", //this filter selects the fifth column's cells
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
                    var dataItem = $("#gridAskNeed").data("kendoGrid").dataItem(e.target.closest("tr"));
                    var content = "";
                    if (dataItem.ChildLink == 1 && dataItem.LinkedParentProjects != "") {
                        content = "<div class='prgmtooltip'>" + linkedToAskNeed + dataItem.LinkedParentProjects + "</div>";
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

        $.when(GETPostService.getDataWCF("getRiskIssue/" + SeletedProjectId))
               .then(function (resRiskIssue) {
                   try {
                       gridAllDataRiskIssue = JSON.parse(resRiskIssue.getRiskIssueResult);
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
        $.when(GETPostService.getDataWCF("getSchedule/" + SeletedProjectId), GETPostService.postDataWCFAsync("getProjectBaselineLog", SeletedProjectId), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneTemplate), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneSet))
               .then(function (resSchedule, resBaseline, resMilestoneTemplates, resMilestoneTemplateDetail) {
                   try {
                       gridAllDataSchedule = JSON.parse(resSchedule.getScheduleResult);
                       gridDataBaselineLog = JSON.parse(resBaseline.getProjectBaselineLogResult);
                       //Milestone Set
                       grdMilestoneTemplate = JSON.parse(resMilestoneTemplates);
                       grdMilestoneTemplateDetail = JSON.parse(resMilestoneTemplateDetail);
                       var dataSource = new kendo.data.DataSource({ data: gridDataBaselineLog });
                       var grid = $('#gridBaselineLogs').data('kendoGrid');
                       dataSource.read();
                       grid.setDataSource(dataSource);
                       countDashoardMilestone = gridAllDataSchedule.filter(function (entry) {
                           return entry.IncludeInReport == true;
                       });
                       dataSource = new kendo.data.DataSource({ data: grdMilestoneTemplate });
                       grid = $('#gridHubAddMilestones').data('kendoGrid');
                       dataSource.read();
                       grid.setDataSource(dataSource);
                       //$('#gridScheduleBulkEdit').data('kendoGrid').dataSource.read();
                       IncludeClosedMilestone();
                       // $('#gridHubAddMilestones').data('kendoGrid').refresh();
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
        $.when(GETPostService.getDataWCF("getAskNeed/" + SeletedProjectId))
               .then(function (resAskNeed) {
                   try {
                       gridAllDataAskNeed = JSON.parse(resAskNeed.getAskNeedResult);
                       countDashoardAskNeed = gridAllDataAskNeed.filter(function (entry) {
                           return entry.IncludeInReport == true;
                       });
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
                    $('#overAllStatusPerformance').data('kendoGrid').dataSource.read();
                    var overAllDatacopy = JSON.parse(resOverallStatus.getOverAllStatusResult);
                    if (overAllDatacopy.length > 0) {
                        vm.overAllData = overAllDatacopy[0];
                        vm.OverallStatusColor = vm.overAllData.OverallStatus;
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
             title: " ",
             width: "2.5%",
             template:
                function (e) {
                    if (e.ChildLink) {
                        return "<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>";
                    }
                    else {
                        return "";
                    }
                }
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
            width: "16%",
        },
       {
           field: "OwnerID",
           title: "Owner",
           headerAttributes: { "class": "wrap-header" },
           width: "14%",
           editor: riskIssueUserDropDownEditor,
           values: riskIssueUsers,
           template: function (e) {
               if (e.OwnerName != null || e.OwnerName != "") {
                   var teamMember;
                   teamMember = riskIssueUsers.filter(function (entry) {
                       return entry.value == e.OwnerID;
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
                values: functionalgroupBulk,

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
    function RiskIssueBulkEdit() {
        var window = $("#dialogRiskIssueBulkEdit");
        var dsRisk = new kendo.data.DataSource({
            sort: [
            //{ field: "StatusIndicator", dir: "desc" },
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
                        var finaldata = JSON.stringify({
                            "riskIssueData": JSON.parse(jsonlistdata)
                        });
                        GETPostService.postDataWCF('updateRiskIssueData ', finaldata).then(function (response) {
                            if (response.updateRiskIssueDataResult == "Success") {
                                e.success(e.data.models);
                                getDataForRiskIssue();
                                $rootScope.$emit("RefreshForDataQuality");
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
                        var finaldata = JSON.stringify({
                            "riskIssueData": JSON.parse(jsonlistdata)
                        });
                        GETPostService.postDataWCF('deleteRiskIssueData', finaldata).then(function (response) {
                            //alert(response);
                            if (response.deleteRiskIssueDataResult == "Success") {
                                e.success(e.data.models);
                                getDataForRiskIssue();
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
                    displayLoading();
                    try {
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
                        GETPostService.postDataWCF('insertRiskIssueData', finalData).then(function (response) {
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
                        ChildLink: { type: "boolean" }
                    }
                }
            }
        });
        riskIssueUsers = [];
        angular.forEach(gridDataRiskIssue, function (item, index) {
            if (item.OwnerID != null && item.OwnerID != "") {
                var user = riskIssueUsers.filter(function (val) {
                    return val.value === item.OwnerID;
                });
                if (user.length == 0) {
                    var temp = {};
                    temp.text = item.OwnerName;
                    temp.value = item.OwnerID;
                    temp.UserCountry = item.UserCountry,
                    temp.UserImageUrl = item.UserImageUrl,
                    temp.UserEmailAddress = item.UserEmailAddress,
                    temp.UserDepartment = item.UserDepartment
                    riskIssueUsers.push(temp);
                }
            }
        });

        var col = col_ProjectHubTabs_gridRiskIssueBulkEdit();
        var grid = $("#gridRiskIssueBulkEdit").kendoGrid({
            dataSource: dsRisk,
            //  height: 400,
            batch: true,
            selectable: true,
            navigatable: true,
            toolbar: [{ name: "create", text: "Add New" }, { name: "save", text: "Save" }, { name: "cancel", text: "Cancel" }],
            columns: col,
            dataBound: function () {
                saveRiskData = false;
                $(".chkbxrisk").bind("change", function (e) {
                    var grid = $("#gridRiskIssueBulkEdit").data("kendoGrid"),
                    dataItem = grid.dataItem($(e.target).closest("tr"));
                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");
                    dataItem.set("IncludeInReport", this.checked);
                });
            },
            editable: true,
            saveChanges: function (e) {
                trackEvent("Update Bulk Edit Risk/Issue");
                var grid = $("#gridRiskIssueBulkEdit").data("kendoGrid");
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
        $('#gridRiskIssueBulkEdit .k-grid-cancel-changes').unbind('click').on('click', function (e) {
            gridCancelEvent("#dialogRiskIssueBulkEdit", e)
        });
        $("#gridRiskIssueBulkEdit table").on("keydown", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                var hasCombo = $(e.target).closest(".k-combobox").length;
                if (hasCombo) {
                    grid.editCell(grid.current());
                    $("[data-role='combobox']").data("kendoComboBox").dataSource.read();
                }
            }
        });

        $("#gridRiskIssueBulkEdit").kendoTooltip({
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
                var dataItem = $("#gridRiskIssueBulkEdit").data("kendoGrid").dataItem(e.target.closest("tr"));
                var content = "";
                if (dataItem.ChildLink == 1 && dataItem.LinkedParentProjects != "") {
                    content = "<div class='prgmtooltip'>" + linkedToRiskIssue + dataItem.LinkedParentProjects + "</div>";
                }
                return content;
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
            title: " ",
            width: "2.5%",
            template:
               function (e) {
                   if (e.ChildLink) {
                       return "<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>";
                   }
                   else {
                       return "";
                   }
               }
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
            editor: askNeeduserDropDownEditor,
            values: askNeedUsers,
            template: function (e) {
                if (e.NeedFromName != null) {
                    var teamMember;
                    teamMember = askNeedUsers.filter(function (entry) {
                        return entry.value == e.NeedFromID;
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
            // template: "#= Need_x0020_By_x0020_Date ==null ? '' : kendo.toString(kendo.parseDate(new Date(Need_x0020_By_x0020_Date), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
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
        var window = $("#dialogAskNeedBulkEdit");
        var dsAskNeed = new kendo.data.DataSource({
            sort: [
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
                        var finaldata = JSON.stringify({
                            "askNeedData": JSON.parse(jsonlistdata)
                        });
                        GETPostService.postDataWCF('deleteAskNeed', finaldata).then(function (response) {
                            //alert(response);
                            if (response.deleteAskNeedResult == "Success") {
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
                        var finaldata = JSON.stringify({
                            "askNeedData": JSON.parse(jsonlistdata)
                        });
                        GETPostService.postDataWCF('updateAskNeed', finaldata).then(function (response) {

                            if (response.updateAskNeedResult == "Success") {
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
                    displayLoading();
                    try {
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
                        GETPostService.postDataWCF('insertAskNeed', finalData).then(function (response) {
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
                        ChildLink: { type: "boolean" }
                    }
                }
            },
        });
        askNeedUsers = [];
        angular.forEach(gridDataAskNeed, function (item, index) {
            if (item.NeedFromID != null && item.NeedFromID != "") {
                var user = askNeedUsers.filter(function (val) {
                    return val.value === item.NeedFromID;
                });
                if (user.length == 0) {
                    var temp = {};
                    temp.text = item.NeedFromName;
                    temp.value = item.NeedFromID;
                    temp.UserCountry = item.UserCountry,
                    temp.UserImageUrl = item.UserImageUrl,
                    temp.UserEmailAddress = item.UserEmailAddress,
                    temp.UserDepartment = item.UserDepartment
                    askNeedUsers.push(temp);
                }
            }
        });
        var col = col_ProjectHubTabs_gridAskNeedBulkEdit();
        var grid = $("#gridAskNeedBulkEdit").kendoGrid({
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
                    var grid = $("#gridAskNeedBulkEdit").data("kendoGrid"),
                    dataItem = grid.dataItem($(e.target).closest("tr"));
                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");
                    dataItem.set("IncludeInReport", this.checked);
                });
            },
            editable: true,
            saveChanges: function (e) {
                trackEvent("Update Bulk Edit Ask/Need");
                var grid = $("#gridAskNeedBulkEdit").data("kendoGrid");
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
        $('#gridAskNeedBulkEdit .k-grid-cancel-changes').unbind('click').on('click', function (e) {
            gridCancelEvent("#dialogAskNeedBulkEdit", e)
        });
        $("#gridAskNeedBulkEdit table").on("keydown", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                var hasCombo = $(e.target).closest(".k-combobox").length;
                if (hasCombo) {
                    grid.editCell(grid.current());
                    $("[data-role='combobox']").data("kendoComboBox").dataSource.read();
                }
            }
        });
        $("#gridAskNeedBulkEdit").kendoTooltip({
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
                var dataItem = $("#gridAskNeedBulkEdit").data("kendoGrid").dataItem(e.target.closest("tr"));
                var content = "";
                if (dataItem.ChildLink == 1 && dataItem.LinkedParentProjects != "") {
                    content = "<div class='prgmtooltip'>" + linkedToAskNeed + dataItem.LinkedParentProjects + "</div>";
                }
                return content;
            }
        }).data("kendoTooltip");
    };
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
        }, {
            field: "MilestoneType",
            title: "MilestoneType",
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
            title: " ",
            width: "2.5%",
            //template: "#if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
            template:
                function (e) {
                    if (e.ChildLink) {
                        return "<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>";
                    }
                    else {
                        return "";
                    }
                }


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
            headerAttributes: { "class": "txt-float-R" },
            // template: "Hello",
            template: "#=Variance == ''?'':( Variance == 'NA'? 'NA': Variance +' days')#",
            //headerAttributes: { "class": "wrap-header" },
            attributes: { "class": "txt-float-R" },
        },
        {
            field: "FunctionGroupID",
            title: "Function Owner",
            width: "20%",
            values: functionalgroupBulk,
            headerAttributes: { "class": "wrap-header" },
            editor: FunctionalOwnerDropDownEditor
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
                name: "destroy", text: " ",
                visible: function (dataItem) {
                    if (dataItem.MilestoneType == 1)
                        return false;
                    else if (dataItem.MilestoneType == 2)
                        return false;
                    else
                        return true;
                }
            }], title: " ", width: "6%",

        }
        ];
        return col;
    };
    //Bulk edit grid for milestone
    function ScheduleBulkEdit() {
        var window = $("#dialogScheduleBulkEdit");
        var dsSchedule = new kendo.data.DataSource({
            sort: [{ field: "MilestoneOrder ", dir: "asc" }
            ],
            transport: {
                read: function (e) {
                    e.success(gridDataSchedule);
                },
                destroy: function (e) {
                    try {
                        var dataSource = $("#gridScheduleBulkEdit").data("kendoGrid").dataSource;
                        var data = dataSource.data();
                        var jsonlistdata = kendo.stringify(e.data.models);
                        var finaldata = JSON.stringify({
                            "scheduleData": JSON.parse(jsonlistdata),
                            "userId": currentUserId
                        });
                        GETPostService.postDataWCF('deleteScheduleData', finaldata).then(function (response) {
                            //alert(response);
                            if (response.deleteScheduleDataResult == "Success") {
                                e.success(e.data.models);
                                getDataForSchedule();
                                gridDataSaved = true;
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
                        var finaldata = JSON.stringify({
                            "scheduleData": JSON.parse(jsonlistdata),
                            "userId": currentUserId
                        });
                        GETPostService.postDataWCF('updateScheduleData', finaldata).then(function (response) {
                            if (response.updateScheduleDataResult == "Success") {
                                if (IsBaseline) {
                                    IsBaseline = false;
                                    var milestones = baselinedMilestones.toString();
                                    var baselineData = { CurrentProjectID: SeletedProjectId, ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, Milestones: milestones, IncreaseBaseline: IncreaseBaselineCount, BaselineComment: vm.BaselineCount.Comment };
                                    //var baselineData = { ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, };
                                    var finalData = JSON.stringify({
                                        "BaselineData": baselineData
                                    });
                                    $rootScope.$emit("RefreshForDataQuality");
                                    GETPostService.postDataWCF('insertProjectBaseline', finalData).then(function (response) {
                                        if (response.insertProjectBaselineResult == "Success") {
                                            if (IncreaseBaselineCount) {
                                                vm.ProjectBaselineCount = vm.ProjectBaselineCount + 1;
                                            }
                                            vm.ProjectBaselineDate = vm.todayDate;
                                            e.success(e.data.models);
                                            getDataForSchedule();
                                            gridDataSaved = true;
                                            window.data("kendoWindow").close();
                                        }
                                    });
                                }
                                else {
                                    e.success(e.data.models);
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

                        GETPostService.postDataWCF('insertScheduleData', finalData).then(function (response) {
                            if (response.insertScheduleDataResult == "Success") {
                                hideLoading();
                                if (IsBaseline) {
                                    IsBaseline = false;
                                    var milestones = baselinedMilestones.toString();
                                    var baselineData = { CurrentProjectID: SeletedProjectId, ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, Milestones: milestones, IncreaseBaseline: IncreaseBaselineCount, BaselineComment: vm.BaselineCount.Comment };
                                    var finalData = JSON.stringify({
                                        "BaselineData": baselineData
                                    });
                                    $rootScope.$emit("RefreshForDataQuality");
                                    GETPostService.postDataWCF('insertProjectBaseline', finalData).then(function (response) {
                                        if (response.insertProjectBaselineResult == "Success") {
                                            if (IncreaseBaselineCount) {
                                                vm.ProjectBaselineCount = vm.ProjectBaselineCount + 1;
                                            }
                                            vm.ProjectBaselineDate = vm.todayDate;
                                            e.success(e.data.models);
                                            getDataForSchedule();
                                            gridDataSaved = true;
                                            window.data("kendoWindow").close();
                                        }
                                    });
                                }
                                else {
                                    e.success(e.data.models);
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
                        ChildLink: { type: "boolean" }
                    }
                }
            },
        });

        var col = col_ProjectHubTabs_gridScheduleBulkEdit();
        $("#gridScheduleBulkEdit").kendoGrid({
            dataSource: dsSchedule,
            //  height: 400,
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
                            if (e.model.CompletionDate != null && e.model.CompletionDate != "")
                            { this.closeCell(); }
                        }

                    }

                    if (e.container.find('[name="BaselineFinish"]').data('kendoDatePicker') != undefined) {
                        e.container.find('[name="BaselineFinish"]').data('kendoDatePicker').bind('change', function () {
                            IsBaseline = true;
                            var itemID = baselinedMilestones.filter(function (val) {
                                return val === e.model.ScheduleUniqueID;
                            });
                            if (itemID.length == 0) {
                                baselinedMilestones.push(e.model.ScheduleUniqueID);
                            }
                            var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                            var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
                            var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                            dataItem["Variance"] = variance;
                            $('#gridScheduleBulkEdit').data('kendoGrid').refresh();
                        });
                    }
                    if (e.container.find('[name="PlannedFinish"]').data('kendoDatePicker') != undefined) {
                        e.container.find('[name="PlannedFinish"]').data('kendoDatePicker').bind('change', function () {
                            if (e.model.BaselineFinish != null) {
                                var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                                var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
                                var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                                dataItem["Variance"] = variance;
                                $('#gridScheduleBulkEdit').data('kendoGrid').refresh();
                            }
                        });
                    }
                    if (e.container.find('[name="CompletionDate"]').data('kendoDatePicker') != undefined) {
                        e.container.find('[name="CompletionDate"]').data('kendoDatePicker').bind('change', function () {
                            if (e.model.BaselineFinish != null) {
                                var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                                var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
                                var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                                dataItem["Variance"] = variance;
                                $('#gridScheduleBulkEdit').data('kendoGrid').refresh();
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
                    var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
                    var dataItem = grid.dataItem($(e.target).closest("tr"));
                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");
                    dataItem.set("IncludeInReport", this.checked);
                    //else {
                    //alert(includeReportMessageForMilestone);
                    // e.preventDefault();
                    //}
                });
                //$('td').each(function () { if ($(this).CompletionDate == 'Jane') { $(this).addClass('customClass') } })
            },
            editable: true,
            remove: function (e) {
                var data = e.model;
                if (data.ScheduleUniqueID != 'undefined' && data.ScheduleUniqueID != "")
                    deletedMilestoneData.push({ "ScheduleUniqueID": data.ScheduleUniqueID, "link": 0 });
            },
            saveChanges: function (e) {
                trackEvent("Update Bulk Edit Milestone");
                var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
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

                            var window = $("#dialogScheduleBaselineCount");
                            window.data("kendoWindow").open();
                            e.preventDefault();
                        }
                    }

                }
                else {
                    var schwindow = $("#dialogScheduleBulkEdit");
                    schwindow.data("kendoWindow").close();
                }
            }

        }).data("kendoGrid");
        $('#gridScheduleBulkEdit .k-grid-cancel-changes').unbind('click').on('click', function (e) {
            gridCancelEvent("#dialogScheduleBulkEdit", e);
        });
        $("#gridScheduleBulkEdit").kendoTooltip({
            filter: "td:nth-child(5)", //this filter selects the fifth column's cells
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
                var dataItem = $("#gridScheduleBulkEdit").data("kendoGrid").dataItem(e.target.closest("tr"));
                var content = "";
                if (dataItem.ChildLink == 1 && dataItem.LinkedParentProjects != "") {
                    content = "<div class='prgmtooltip'>" + linkedToMilestone + dataItem.LinkedParentProjects + "</div>";
                }
                return content;
            }
        }).data("kendoTooltip");
    };
    function SetBaseline() {
        try {
            //if (!confirm(baselineMessage))
            //  {//  e.preventDefault();
            //  }
            if (confirm(baselineMessage)) {
                IsBaseline = true;
                var dataSource = $("#gridScheduleBulkEdit").data("kendoGrid").dataSource;
                var data = dataSource.data();
                var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
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
                        var itemID = baselinedMilestones.filter(function (val) {
                            return val === currentDataItem.ScheduleUniqueID;
                        });
                        if (itemID.length == 0) {
                            baselinedMilestones.push(currentDataItem.ScheduleUniqueID);
                        }
                    }
                }
                $('#gridScheduleBulkEdit').data('kendoGrid').refresh();
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
                "method": "SetBaseline", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) {
                      alert(errormessage);
                  });
        }
        //    variance = (variance.toString().indexOf('days') > 1 || variance.toString()=="NA") ? variance.toString() : (variance.toString() + ' days');
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
                //var closedItem = gridDataRiskIssue.filter(function (entry) {
                //    return entry.CloseDate != null;
                //});
                var dataSource = new kendo.data.DataSource({
                    data: gridAllDataRiskIssue,
                    sort: [
                        {
                            field: "DueDate", dir: "asc"
                        }]
                });
                //var gridbulk = $('#gridRiskIssueBulkEdit').data('kendoGrid');
                var grid = $('#gridRiskIssue').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                angular.copy(gridAllDataRiskIssue, gridDataRiskIssue);
                // gridDataRiskIssue = gridAllDataRiskIssue;
                $('#gridRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
            }
            else {
                var incompleteData = gridAllDataRiskIssue.filter(function (entry) {
                    return entry.CloseDate == null;
                });
                angular.copy(incompleteData, gridDataRiskIssue);
                //gridDataRiskIssue = gridAllDataRiskIssue.filter(function (entry) {
                //    return entry.CloseDate == null;
                //});
                var dataSource = new kendo.data.DataSource({
                    data: gridDataRiskIssue,
                    sort: [
                            {
                                field: "DueDate", dir: "asc"
                            }]
                });

                var grid = $('#gridRiskIssue').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                $('#gridRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
            }
            riskIssueUsers = [];
            angular.forEach(gridDataRiskIssue, function (item, index) {
                if (item.OwnerID != null && item.OwnerID != "") {
                    var user = riskIssueUsers.filter(function (val) {
                        return val.value === item.OwnerID;
                    });
                    if (user.length == 0) {
                        var temp = {};
                        temp.text = item.OwnerName;
                        temp.value = item.OwnerID;
                        temp.UserCountry = item.UserCountry,
                        temp.UserImageUrl = item.UserImageUrl,
                        temp.UserEmailAddress = item.UserEmailAddress,
                        temp.UserDepartment = item.UserDepartment
                        riskIssueUsers.push(temp);
                    }
                }
            });
            $('#gridRiskIssueBulkEdit').data('kendoGrid').dataSource.read();
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
                var grid = $('#gridSchedule').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                angular.copy(gridAllDataSchedule, gridDataSchedule);
                $('#gridScheduleBulkEdit').data('kendoGrid').dataSource.read();
                if (milestoneToAdd.length > 0) {
                    var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
                    angular.forEach(milestoneToAdd, function (item, index) {
                        var dataItem = grid.dataSource.get(item.ScheduleUniqueID);
                        dataItem.dirty = true;
                    });
                    $('#gridScheduleBulkEdit').data('kendoGrid').refresh();
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
                var grid = $('#gridSchedule').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                $('#gridScheduleBulkEdit').data('kendoGrid').dataSource.read();
                if (milestoneToAdd.length > 0) {
                    var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
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
                    $('#gridScheduleBulkEdit').data('kendoGrid').refresh();
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

                var dataSource = new kendo.data.DataSource(
                    {
                        data: gridAllDataAskNeed,
                        sort: [//{ field: "StatusIndicator", dir: "desc" },
                                 { field: "NeedByDate", dir: "asc" }]
                    });
                var grid = $('#gridAskNeed').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                angular.copy(gridAllDataAskNeed, gridDataAskNeed);
                // gridDataAskNeed = gridAllDataAskNeed;
                $('#gridAskNeedBulkEdit').data('kendoGrid').dataSource.read();
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
                var grid = $('#gridAskNeed').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
                $('#gridAskNeedBulkEdit').data('kendoGrid').dataSource.read();
            }
            askNeedUsers = [];
            angular.forEach(gridDataAskNeed, function (item, index) {
                if (item.NeedFromID != null && item.NeedFromID != "") {
                    var user = askNeedUsers.filter(function (val) {
                        return val.value === item.NeedFromID;
                    });
                    if (user.length == 0) {
                        var temp = {};
                        temp.text = item.NeedFromName;
                        temp.value = item.NeedFromID;
                        temp.UserCountry = item.UserCountry,
                        temp.UserImageUrl = item.UserImageUrl,
                        temp.UserEmailAddress = item.UserEmailAddress,
                        temp.UserDepartment = item.UserDepartment
                        askNeedUsers.push(temp);
                    }
                }
            });
            $('#gridAskNeedBulkEdit').data('kendoGrid').dataSource.read();

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
    //function SetProjectPhase() {
    //    vm.ExecuteStyle = "";
    //    vm.IntiateStyle = "";
    //    vm.DefineStyle = "";
    //    vm.PlanStyle = "";
    //    vm.CloseStyle = "";
    //    vm.TrackStyle = "";
    //    //Phase is Active
    //    if (vm.projectHubStatus.ProjectPhaseName != null && vm.projectHubStatus.ProjectStatusName == "Active") {
    //        switch (vm.projectHubStatus.ProjectPhaseName) {
    //            case 'Execute':
    //                vm.ExecuteStyle = "activeSpan"
    //                break;
    //            case 'Initiate':
    //                vm.IntiateStyle = "activeSpan"
    //                break;
    //            case 'Define':
    //                vm.DefineStyle = "activeSpan"
    //                break;
    //            case 'Plan':
    //                vm.PlanStyle = "activeSpan"
    //                break;
    //            case 'Close':
    //                vm.CloseStyle = "activeSpan"
    //                break;
    //            case 'Track':
    //                vm.TrackStyle = "activeSpan"
    //                break;
    //            default:

    //        }
    //    }
    //    //Phase Completed
    //    if (vm.projectHubStatus.ProjectPhaseName != null && vm.projectHubStatus.ProjectStatusName == "Completed") {
    //        vm.ExecuteStyle = "greyoutSpan";
    //        vm.IntiateStyle = "greyoutSpan";
    //        vm.DefineStyle = "greyoutSpan";
    //        vm.PlanStyle = "greyoutSpan";
    //        vm.CloseStyle = "greyoutSpan";
    //        vm.TrackStyle = "greyoutSpan";
    //    }
    //    //Hold Phase
    //    if (vm.projectHubStatus.ProjectPhaseName != null && (vm.projectHubStatus.ProjectStatusName == "Hold" || vm.projectHubStatus.ProjectStatusName == "Cancelled")) {
    //        vm.ExecuteStyle = "";
    //        vm.IntiateStyle = "";
    //        vm.DefineStyle = "";
    //        vm.PlanStyle = "";
    //        vm.CloseStyle = "";
    //        vm.TrackStyle = "";
    //        switch (vm.projectHubStatus.ProjectPhaseName) {
    //            case 'Execute':
    //                vm.ExecuteStyle = "greyoutSpan"
    //                break;
    //            case 'Initiate':
    //                vm.IntiateStyle = "greyoutSpan"
    //                break;
    //            case 'Define':
    //                vm.DefineStyle = "greyoutSpan"
    //                break;
    //            case 'Plan':
    //                vm.PlanStyle = "greyoutSpan"
    //                break;
    //            case 'Close':
    //                vm.CloseStyle = "greyoutSpan"
    //                break;
    //            case 'Track':
    //                vm.TrackStyle = "greyoutSpan"
    //                break;
    //            default:

    //        }
    //    }

    //}
    //function ShowPermission() {
    //    try {
    //        //var selectedMember = vm.projectTeam.Member.UserADId
    //        if ($("#teamuser").data("kendoComboBox") != null) {
    //            if ($("#teamuser").data("kendoComboBox").selectedIndex == -1) {
    //                vm.projectTeam.permission = null;
    //                $("#permission").data("kendoDropDownList").enable();
    //                $scope.$digest();
    //                return;
    //            }
    //            else {
    //                var selectedMember;
    //                selectedMember = $("#teamuser").data("kendoComboBox").value();
    //                if (vm.projectHubStatus.IsConfidential) {
    //                    var selectedpermission = vm.teamPermissions.filter(function (entry) {
    //                        return entry.LookUpMemberID == readonly;
    //                    });
    //                    vm.projectTeam.permission = selectedpermission[0];
    //                    $("#permission").data("kendoDropDownList").enable();
    //                }
    //                else {
    //                    var membergroups = usergroups.filter(function (item) {
    //                        return item.UserADId == selectedMember;
    //                    });
    //                    if (membergroups != null) {
    //                        if (membergroups.length > 0) {
    //                            var selectedpermission = vm.teamPermissions.filter(function (entry) {
    //                                return entry.LookUpMemberID == readonly;
    //                            });
    //                            vm.projectTeam.permission = selectedpermission[0];
    //                            $("#permission").data("kendoDropDownList").enable();
    //                        }
    //                        else {
    //                            var selectedpermission = vm.teamPermissions.filter(function (entry) {
    //                                return entry.LookUpMemberID == readwrite;
    //                            });
    //                            vm.projectTeam.permission = selectedpermission[0];
    //                            $("#permission").data("kendoDropDownList").enable(false);

    //                        }

    //                    }

    //                }
    //                $scope.$digest();
    //            }
    //        }
    //    }
    //    catch (err) {
    //        var dataToSend = {
    //            "method": "ShowPermission", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
    //        };
    //        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
    //              .then(function (response) {
    //                  // alert(errormessage);
    //              });
    //    }
    //}

    //function getCapitalPhase() {
    //    vm.capitalPhase = vm.capitalPhaseList.filter(function (item) {
    //        return item.AssociatedPhaseID === vm.SelectedprojectPhase.LookUpMemberID;
    //    });
    //    vm.SelectedprojectCapitalPhase = null;
    //    //var cPhaseList = $("#pjcapitalPhase").data("kendoComboBox");
    //    //cPhaseList.value("");
    //    $scope.$digest();
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
                    baselinedMilestones = [];
                    grid.dataSource.cancelChanges();
                    grid.dataSource.read();
                    window.data("kendoWindow").close();
                }
            }
            else {
                baselinedMilestones = [];
                window.data("kendoWindow").close();
            }
            Isupdatebaseline = false;
            IsBaseline = false;
            if (milestoneToAdd.length > 0) {
                getDataForSchedule();
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
                        baselinedMilestones = [];
                        grid.dataSource.cancelChanges();
                        grid.dataSource.read();
                    }
                }

            }
            else {
                gridDataSaved = false;
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
        saveScheduleData = false;
        saveAskNeedData = false;
        saveRiskData = false;
        Isupdatebaseline = false;
        IsBaseline = false;
        vm.BaselineCount = {};
        vm.BaselineCount.IncreaseBaseline = "YES";
        if (vm.ProjectBaselineCount > 0) {
            vm.showjustification = true;
        }
    }
    function DialogCloseBinding() {


        $("#dialogScheduleBulkEdit").data("kendoWindow").bind("close", function (e) {
            gridCloseEvent("gridScheduleBulkEdit", e)
        });

        $("#dialogAskNeedBulkEdit").data("kendoWindow").bind("close", function (e) {
            gridCloseEvent("gridAskNeedBulkEdit", e)
        });

        $("#dialogRiskIssueBulkEdit").data("kendoWindow").bind("close", function (e) {
            gridCloseEvent("gridRiskIssueBulkEdit", e)
        });
        //$("#dialogScheduleBaselineCount").data("kendoWindow").bind("close", function (e) {
        //    Isupdatebaseline = true;
        //    var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
        //    grid.saveChanges();
        //});
    }

    function askNeeduserDropDownEditor(container, options) {
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
                                dataSource: askNeedUsers,
                                change: function (e) {
                                    if (e.sender.selectedIndex != -1) {
                                        var user = askNeedUsers.filter(function (val) {
                                            return val.value == e.sender.dataItem(e.item).value;
                                        });
                                        if (user.length == 0) {
                                            askNeedUsers.push({
                                                text: e.sender.dataItem(e.item).text, value: e.sender.dataItem(e.item).value, UserCountry: e.sender.dataItem(e.item).UserCountry,
                                                UserImageUrl: e.sender.dataItem(e.item).UserImageUrl, UserEmailAddress: e.sender.dataItem(e.item).UserEmailAddress, UserDepartment: e.sender.dataItem(e.item).UserDepartment
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
                        angular.copy(askNeedUsers, resources);
                        angular.forEach(response, function (item, index) {
                            var user = askNeedUsers.filter(function (val) {
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
    function riskIssueUserDropDownEditor(container, options) {
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
                                dataSource: riskIssueUsers,
                                change: function (e) {
                                    if (e.sender.selectedIndex != -1) {
                                        var user = riskIssueUsers.filter(function (val) {
                                            return val.value == e.sender.dataItem(e.item).value;
                                        });
                                        if (user.length == 0) {
                                            riskIssueUsers.push({
                                                text: e.sender.dataItem(e.item).text, value: e.sender.dataItem(e.item).value, UserCountry: e.sender.dataItem(e.item).UserCountry,
                                                UserImageUrl: e.sender.dataItem(e.item).UserImageUrl, UserEmailAddress: e.sender.dataItem(e.item).UserEmailAddress, UserDepartment: e.sender.dataItem(e.item).UserDepartment
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
                        angular.copy(riskIssueUsers, resources);
                        angular.forEach(response, function (item, index) {
                            var user = riskIssueUsers.filter(function (val) {
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
    //function milestoneCompletedDateEditor(container, options) {
    //    $('<input  name="' + options.field + '"/>')
    //      .appendTo(container)
    //      .kendoDatePicker({
    //          format: "MM/dd/yyyy",
    //          placeholder: vm.dateFormatlabel,
    //          disableDates: function (date) {
    //              if (date > new Date()) {
    //                  return true;
    //              } else {
    //                  return false;
    //              }
    //          }
    //      });
    //}
    //function AskNeedIncludeInReport() {
    //    askNeedIncludeReportValid = true;
    //    if (vm.askNeed.IncludeInReport != null) {
    //        if (vm.askNeed.IncludeInReport) {
    //            countDashoardAskNeedform = countDashoardAskNeedform + 1;
    //            if (countDashoardAskNeedform > askNeedIncludeReportCount) {
    //                alert(includeReportMessageForAskNeed);
    //                askNeedIncludeReportValid = false;
    //            }
    //        }
    //        else {
    //            countDashoardAskNeedform = countDashoardAskNeedform - 1;
    //            if (countDashoardAskNeedform > askNeedIncludeReportCount) {
    //                alert(includeReportMessageForAskNeed);
    //                askNeedIncludeReportValid = false;
    //            }
    //        }
    //    }
    //}
    //function MilestoneIncludeInReport() {
    //    milestoneIncludeReportValid = true;
    //    if (vm.schedule.IncludeInReport != null) {
    //        if (vm.schedule.IncludeInReport) {
    //            countDashoardMilestoneform = countDashoardMilestoneform + 1;
    //            if (countDashoardMilestoneform > milestoneIncludeReportCount) {
    //                alert(includeReportMessageForMilestone);
    //                milestoneIncludeReportValid = false;
    //            }
    //        }
    //        else {
    //            countDashoardMilestoneform = countDashoardMilestoneform - 1;
    //            if (countDashoardMilestoneform > milestoneIncludeReportCount) {
    //                alert(includeReportMessageForMilestone);
    //                milestoneIncludeReportValid = false;
    //            }
    //        }
    //    }
    //}

    //function RiskIssueIncludeInReport() {
    //    riskIncludeReportValid = true;
    //    if (vm.riskIssue.IncludeInReport != null) {
    //        if (vm.riskIssue.IncludeInReport) {
    //            countDashoardRiskIssueform = countDashoardRiskIssueform + 1;
    //            if (countDashoardRiskIssueform > riskIssueIncludeReportCount) {
    //                alert(includeReportMessageForRisk);
    //                riskIncludeReportValid = false;
    //            }
    //        }
    //        else {
    //            countDashoardRiskIssueform = countDashoardRiskIssueform - 1;
    //            if (countDashoardRiskIssueform > riskIssueIncludeReportCount) {
    //                alert(includeReportMessageForRisk);
    //                riskIncludeReportValid = false;
    //            }
    //        }
    //    }
    //}
    function bindChangeDatePicker(elmentId) {
        if (elmentId == "completionDate" || elmentId == "closeDate" || elmentId == "askCloseDate") {
            $("#" + elmentId).kendoDatePicker({
                disableDates: function (date) {
                    if (date > new Date()) {
                        return true;
                    } else {
                        return false;
                    }
                },
                change: function () {
                    onDateChange($(this).attr('id'));
                }
            });
            //$("#" + elmentId).on("change", function (e) {
            //    onDateChange($(this).attr('id'));
            //})
            //$("#" + elmentId).on("disableDates", function (date) {
            //    if (date > new Date()) {
            //        return true;
            //    } else {
            //        return false;
            //    }
            //})
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
    function InitKendoGridBaselineLog() {
        try {
            $("#gridBaselineLogs").kendoGrid({
                dataSource: {
                    data: gridDataBaselineLog,
                    sort: [{ field: "BaselineCount", dir: "asc" },
                            { field: "ModifiedDate", dir: "asc" }]
                },
                groupable: false,
                sortable: true,
                //schema: {
                //    model: {
                //        fields: {
                //            BaselineCount: { type: "int" },
                //            TeamMemberName: { type: "string" },
                //            ModifiedDate: { type: "string" },
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
                //if (vm.ProjectBaselineCount > 0)
                //{
                //    if(vm.BaselineCount.Comment==null || vm.BaselineCount.Comment=="") 
                //    {
                //        alert("Please enter the justification for re-baselining");
                //        return;
                //    }
                //}
                if (vm.BaselineCount.IncreaseBaseline == "YES") {
                    IncreaseBaselineCount = true;
                }
                else { IncreaseBaselineCount = false; }
            }
            var window = $("#dialogScheduleBaselineCount");
            window.data("kendoWindow").close();
            Isupdatebaseline = true;
            if (!setMilestioneUpdate) {
                var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
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
        var window = $("#dialogScheduleBaselineCount");
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
        $("#gridHubAddMilestones").kendoGrid({
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
                        title: "Include In Dashboard",
                        headerAttributes: { "class": "wrap-header" },
                        width: "8%",
                        template: function (e) {
                            if (e.IncludeInReport == true) {
                                return '<input type="checkbox" checked disabled class="chkbxmilestonetem" />';
                            }
                            else {
                                return '<input type="checkbox" disabled class="chkbxmilestonetem" />';
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
                                $('#gridScheduleBulkEdit').data('kendoGrid').dataSource.read();
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
                                $('#gridScheduleBulkEdit').data('kendoGrid').dataSource.read();
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
    function AddMilestoneSchedule() {
        try {
            debugger;
            var showmsg = false;
            var templateMilestonemasterGrid = $("#gridHubAddMilestones").data("kendoGrid");
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
                                        gridDataSchedule[exestart].MilestoneTemplateID = item.MilestoneTemplateID;
                                        gridDataSchedule[exestart].MilestoneID = item.MilestoneID;
                                    }

                                    exestart = gridAllDataSchedule.findIndex(element => element.MilestoneType == 2);
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
                        $('#gridScheduleBulkEdit').data('kendoGrid').dataSource.read();
                        var grid = $("#gridScheduleBulkEdit").data("kendoGrid");
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
                    $('#gridScheduleBulkEdit').data('kendoGrid').refresh();
                    var window = $("#dialogAddMilestoneHub");
                    window.data("kendoWindow").close();
                }
            }
            else {
                var window = $("#dialogAddMilestoneHub");
                window.data("kendoWindow").close();
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "AddMilestoneSchedule", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }

    }
    function CheckBulkEditGridUpdate(gridId, dialog) {
        try {
            var grid = $('#' + gridId).data('kendoGrid');
            var window = $('#' + dialog);
            document.activeElement.blur();
            if (grid.dataSource.hasChanges()) {
                if (dialog == "dialogAddMilestoneHub") {
                    if (confirm(saveMilestoneConfirm)) {
                        // var grid = $("#grid").data("kendoGrid");
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
    function UpdateMilestones() {
        try {

            var count = $("#gridScheduleBulkEdit").data("kendoGrid").tbody.find("input:checked").length;
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
                    var window = $("#dialogScheduleBaselineCount");
                    window.data("kendoWindow").open();
                }
            }
            else { updateMilestoneFromSet(); }

            //if ($('#gridScheduleBulkEdit').data('kendoGrid') != undefined) {
            //    var gridupdatedData = $('#gridScheduleBulkEdit').data('kendoGrid').dataSource.data()
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
            //        if (IsBaseline) if (IsBaseline) {
            //            IsBaseline = false;
            //            var milestones = baselinedMilestones.toString();
            //            var baselineData = { CurrentProjectID: SeletedProjectId, ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, Milestones: milestones, IncreaseBaseline: IncreaseBaselineCount, BaselineComment: vm.BaselineCount.Comment };
            //            //var baselineData = { ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, };
            //            var finalData = JSON.stringify({
            //                "BaselineData": baselineData
            //            });
            //            $rootScope.$emit("RefreshForDataQuality");
            //            GETPostService.postDataWCF('insertProjectBaseline', finalData).then(function (response) {
            //                if (response.insertProjectBaselineResult == "Success") {
            //                    if (IncreaseBaselineCount) {
            //                        vm.ProjectBaselineCount = vm.ProjectBaselineCount + 1;
            //                    }
            //                    vm.ProjectBaselineDate = vm.todayDate;
            //                    getDataForSchedule();
            //                    gridDataSaved = true;
            //                    Isupdatebaseline = false;
            //                    IsBaseline = false;
            //                    var window = $("#dialogAddMilestoneHub");
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
            //            var window = $("#dialogAddMilestoneHub");
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
            if ($('#gridScheduleBulkEdit').data('kendoGrid') != undefined) {
                var gridupdatedData = $('#gridScheduleBulkEdit').data('kendoGrid').dataSource.data()
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
                        var milestones = baselinedMilestones.toString();
                        var baselineData = { CurrentProjectID: SeletedProjectId, ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, Milestones: milestones, IncreaseBaseline: IncreaseBaselineCount, BaselineComment: vm.BaselineCount.Comment };
                        //var baselineData = { ProjectID: SeletedProjectId, TeamMemberAdId: currentUserId, };
                        var finalData = JSON.stringify({
                            "BaselineData": baselineData
                        });
                        $rootScope.$emit("RefreshForDataQuality");
                        GETPostService.postDataWCF('insertProjectBaseline', finalData).then(function (response) {
                            if (response.insertProjectBaselineResult == "Success") {
                                if (IncreaseBaselineCount) {
                                    vm.ProjectBaselineCount = vm.ProjectBaselineCount + 1;
                                }
                                vm.ProjectBaselineDate = vm.todayDate;
                                getDataForSchedule();
                                gridDataSaved = true;
                                Isupdatebaseline = false;
                                IsBaseline = false;
                                var window = $("#dialogAddMilestoneHub");
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
                        var window = $("#dialogAddMilestoneHub");
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
                "method": "UpdateMilestones", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    }
    function initProjectHub() {
        // displayLoading();
        //$.when(GETPostService.getUserAdID()).then(function (userId) {
        //    prepareDataForProjectHub();
        //});
        // prepareDataForProjectHub();
    };
};



