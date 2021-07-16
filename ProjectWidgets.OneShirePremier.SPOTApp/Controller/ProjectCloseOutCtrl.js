//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('ProjectCloseOutCtrl', ProjectCloseOutCtrl)
ProjectCloseOutCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function ProjectCloseOutCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;

    vm.openProjectCloseOutInfo = openProjectCloseOutInfo;
    vm.AddNewRow = AddNewRow;
    vm.projectCloseOutPagepath = projectCloseOutPagepath;
    vm.updateProjectCloseOutInfo = updateProjectCloseOutInfo;
    vm.PortfolioOwnerChange = PortfolioOwnerChange;
    var className = "ProjectCloseOutCtrl";
    vm.isEditable = true;
    var IsCommentEditable = false;
    var IsBaselineCloseOutEditable=false;
    var dialogbind = false;
    vm.SelectedProject = {};
    vm.budgetField1 = {};
    vm.budgetField2 = {};
    vm.budgetField3 = {};
    vm.budgetField4 = {};
    vm.budgetField5 = {};
    var originalParentProjCharter = {};
    var charterCount = 0;
    var primaryKpiGrid = [];
    var performanceStatusBulk = [];
    var gridDataKeySuccess = [];
    var gridDataLessonsLearned = [];
    vm.dateErrorMsg = InValidDateFormat;
    vm.buildNo = buildNo;
    vm.releaseDate = releaseDate;
    var lessonTypeData = [];
    var lessonStatusData = [];
    var criticalityData = [];
    var functionalgroupData = [];
    var btnClickProjectCloseOut = 0;
    var gridMilestoneVariance = [];
    var gridDataBaselineLog = [];
    var submittedUsers = [];
    var actionOwnerUsers = [];
    var currentUser = [];
    function PortfolioOwnerChange(e) {

        vm.projectCloseOutInfoSelected.OpU = e.sender.dataItem().OtherAttribute;
        $scope.$digest();
        //   vm.projectCloseOutInfoSelected.OpU
    };
    function getDataForCloseOutGrids() {
        var dataToSendForMilestoneSet = {
            "ProjectID": SeletedProjectId, "DataType": "Schedule"
        };

        $.when(GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId),
            GETPostService.postDataWCFAsync("getProjectCloseOutLessonsLearned", SeletedProjectId), GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForMilestoneSet),
            GETPostService.postDataWCFAsync("getProjectBaselineLog", SeletedProjectId))
            .then(function (resKeySuccess, resLessonsLearnt, resSchedule, resBaselineLog) {
                try {
                    gridDataKeySuccess = JSON.parse(resKeySuccess.getProjectCharterKeySuccessResult);
                    gridDataLessonsLearned = JSON.parse(resLessonsLearnt.getProjectCloseOutLessonsLearnedResult);
                    gridDataBaselineLog = JSON.parse(resBaselineLog.getProjectBaselineLogResult);
                    gridMilestoneVariance = JSON.parse(resSchedule);;
                    $('#gridProjectCloseOutKeySuccessCriteria').data('kendoGrid').dataSource.read();
                    $('#gridProjectCloseOutLessonsLearnt').data('kendoGrid').dataSource.read();
                    $('#gridProjectCloseOutMilestoneVariance').data('kendoGrid').dataSource.read();
                    $('#gridProjectCloseOutScheduleVariance').data('kendoGrid').dataSource.read();
                }
                catch (err) {
                    hideLoading();
                    var dataToSendErr = {
                        "method": "getDataForCloseOutGrids", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                        .then(function (response) {
                            alert(errormessage);
                        });
                }
            })
    }

    function prepareDataForProjectCloseOut() {


        vm.deletedKeySuccessData = [];
        vm.deletedLessonsLearntData = [];
        vm.coApprovedDateError = false;
        vm.isPortfolioOwnerEditablePC = canPortfolioOwnerEdit;
        try {

            SeletedProjectId = getParameterByName(window.location.search, "ProblemID");
            var lookup = product + "," + portfolioOwner + "," + executionScope + "," + topsPrimaryKpi + "," + lessonType + "," + lessonStatus + "," + funtionalGroup + "," + criticality;
            var lookupWithAttribute = performanceStatus + "," + portfolioOwner;
            var dataToSendForMilestoneSet = {
                "ProjectID": SeletedProjectId, "DataType": "Schedule"
            };
            var dataToSendUser = {
                "UserDepartment": "All", "FilterString": currentUserName
            };
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup),
                GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId),
                GETPostService.postDataWCFAsync("getProjectCloseOutInfoByID", SeletedProjectId),
                GETPostService.postDataWCFAsync("getProjectCloseOutLessonsLearned", SeletedProjectId),
                GETPostService.postDataWCFAsync("getLookupDataPerformancestatus", lookupWithAttribute),
                GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForMilestoneSet), GETPostService.postDataWCFAsync("getProjectBaselineLog", SeletedProjectId),
                GETPostService.postDataWCFAsync("getUserPermissionById", currentUserId), GETPostService.postDataWCFAsync("getUserDataWithFilter", dataToSendUser),
GETPostService.getDataWCFAsync("getUserPermissionByProjectUserId/" + currentUserId + "/" + SeletedProjectId)
                )
                .then(function (resLookup, resKeySuccess, resProjectCloseOutInfo, resLessonsLearnt, resPerformanceStatus, resSchedule,
                        resBaselineLog, userGlobalPermission, resCurrentUser, resPermission) {
                    try {
                        var dsPermission = JSON.parse(resPermission.getUserPermissionByProjectUserIdResult);
                        if (dsPermission[0].canEdit == true) {
                            vm.isEditable = true;
                        }
                        else { vm.isEditable = false };

                        vm.dsPrimaryProduct = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === product;
                        });
                        vm.dsOwner = JSON.parse(resPerformanceStatus.getLookupDataPerformancestatusResult).filter(function (entry) {
                            return entry.LookUpName === portfolioOwner;
                        });
                        
                        vm.dsExecutionScope = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == executionScope;
                        }), "LookUpMemberOrder");
                        
                        vm.dsLessonType = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == lessonType;
                        });
                        vm.dsLessonStatus = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == lessonStatus;
                        });
                        vm.dsPrimaryKPI = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == topsPrimaryKpi;
                        }), "LookUpMemberOrder");
                        var criticalitylist = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == criticality;
                        });
                        var functionalgroupDataList = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == funtionalGroup;
                        });

                        vm.dsPrimaryProduct = $filter('orderBy')(vm.dsPrimaryProduct, 'LookUpMemberOrder');//LookUpMemberOrder
                        var permission = JSON.parse(userGlobalPermission.getUserPermissionByIdResult)
                        if (permission != null) {
                            var permissionlist = permission.filter(function (entry) {
                                return entry.Permission == updateBaselineJustificationperm;
                            });
                            if (permissionlist.length > 0) {
                                IsCommentEditable = true;
                            }
                             permissionlist = permission.filter(function (entry) {
                                 return entry.Permission == updateBaselineReportCloseOut;
                             });
                             if (permissionlist.length > 0) {
                                 IsBaselineCloseOutEditable = true;
                             }

                        }
                        var dsResListPeople = JSON.parse(resCurrentUser);
                        currentUser = dsResListPeople.filter(function (entry) {
                            return entry.UserADId === currentUserId;
                        });
                        var dsProjectCloseOutInfo = JSON.parse(resProjectCloseOutInfo.getProjectCloseOutInfoByIDResult);
                        if (dsProjectCloseOutInfo.length > 0) {
                            vm.projectCloseOutInfoSelected = dsProjectCloseOutInfo[0];
                            var fields = vm.projectCloseOutInfoSelected.FieldMasterDetails;
                            var fieldsList = fields.split("ß")
                            for (var j = 0; j < fieldsList.length; j++) {
                                var fieldsval = fieldsList[j].split("Þ");
                                switch (j) {
                                    case 0: vm.budgetField1.name = fieldsval[2];
                                        vm.budgetField1.active = (fieldsval[0] == 0 ? false : true);
                                        vm.budgetField1.fieldName = fieldsval[1];
                                        vm.budgetField1.checked = GetBudgetFieldStaus(fieldsval[1]);
                                        break;
                                    case 1: vm.budgetField2.name = fieldsval[2];
                                        vm.budgetField2.active = (fieldsval[0] == 0 ? false : true);
                                        vm.budgetField2.fieldName = fieldsval[1];
                                        vm.budgetField2.checked = GetBudgetFieldStaus(fieldsval[1]);
                                        break;
                                    case 2: vm.budgetField3.name = fieldsval[2];
                                        vm.budgetField3.active = (fieldsval[0] == 0 ? false : true);
                                        vm.budgetField3.fieldName = fieldsval[1];
                                        vm.budgetField3.checked = GetBudgetFieldStaus(fieldsval[1]);
                                        break;
                                    case 3: vm.budgetField4.name = fieldsval[2];
                                        vm.budgetField4.active = (fieldsval[0] == 0 ? false : true);
                                        vm.budgetField4.fieldName = fieldsval[1];
                                        vm.budgetField4.checked = GetBudgetFieldStaus(fieldsval[1]);
                                        break;
                                    case 4: vm.budgetField5.name = fieldsval[2];
                                        vm.budgetField5.active = (fieldsval[0] == 0 ? false : true);
                                        vm.budgetField5.fieldName = fieldsval[1];
                                        vm.budgetField5.checked = GetBudgetFieldStaus(fieldsval[1]);
                                        break;
                                }
                            }

                        }
                        vm.localCurrencyAbbrePlaceholder = vm.projectCloseOutInfoSelected.LocalCurrencyAbbreviation;

                        if (vm.projectCloseOutInfoSelected.LocalCurrencyAbbreviation != null)
                            vm.localCurrencyAbbre = "(" + vm.projectCloseOutInfoSelected.LocalCurrencyAbbreviation + ")";



                        var ParentProgramName = vm.projectCloseOutInfoSelected.ParentProgramName == null ? '' : vm.projectCloseOutInfoSelected.ParentProgramName;
                        var ParentProgramID = vm.projectCloseOutInfoSelected.ParentProgramID == null ? '' : vm.projectCloseOutInfoSelected.ParentProgramID;


                        createParentProj(ParentProgramID, ParentProgramName);

                        if (vm.projectCloseOutInfoSelected.PrimaryProductID != null && vm.projectCloseOutInfoSelected.PrimaryProductID != "") {
                            var selectedPrimaryProduct = vm.dsPrimaryProduct.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCloseOutInfoSelected.PrimaryProductID;
                            });
                            vm.projectCloseOutInfoSelected.PrimaryProductID = selectedPrimaryProduct[0];
                        }

                        if (vm.projectCloseOutInfoSelected.PortfolioOwnerID != null && vm.projectCloseOutInfoSelected.PortfolioOwnerID != "") {
                            var selectedPortfolio = vm.dsOwner.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCloseOutInfoSelected.PortfolioOwnerID;
                            });
                            vm.projectCloseOutInfoSelected.PortfolioOwnerID = selectedPortfolio[0];
                        }
                        gridMilestoneVariance = JSON.parse(resSchedule);

                        gridDataKeySuccess = JSON.parse(resKeySuccess.getProjectCharterKeySuccessResult);
                        gridDataLessonsLearned = JSON.parse(resLessonsLearnt.getProjectCloseOutLessonsLearnedResult);
                        gridDataBaselineLog = JSON.parse(resBaselineLog.getProjectBaselineLogResult);
                        //vm.agileVisibleCharter = vm.projectCloseOutInfoSelected.IsAgile;
                        var impObj = [];
                        var exScope = [];
                        var agileSecWorkstream = [];
                        if (vm.projectCloseOutInfoSelected.OtherImpactedProducts != null && vm.projectCloseOutInfoSelected.OtherImpactedProducts != 'undefined') {
                            impObj = vm.projectCloseOutInfoSelected.OtherImpactedProducts.split(',');
                        }

                        if (vm.projectCloseOutInfoSelected.ExecutionScopeID != null && vm.projectCloseOutInfoSelected.ExecutionScopeID != 'undefined') {
                            exScope = vm.projectCloseOutInfoSelected.ExecutionScopeID.split(',');
                        }
                        vm.dsImpactedProducts = {
                            placeholder: "Select and/or Type to Search",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsPrimaryProduct,
                            filter: "contains"
                        };
                        vm.projectCloseOutInfoSelected.OtherImpactedProducts = impObj;
                        vm.dsExecutionScope = {
                            placeholder: "Select scope...",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsExecutionScope,
                            filter: "contains"
                        };
                        vm.projectCloseOutInfoSelected.ExecutionScope = exScope;

                        if (vm.projectCloseOutInfoSelected.AgileSecondaryWorkstream != null && vm.projectCloseOutInfoSelected.AgileSecondaryWorkstream != 'undefined') {
                            agileSecWorkstream = vm.projectCloseOutInfoSelected.AgileSecondaryWorkstream.split(',');
                        }


                        var primaryProductlist = $("#ddl_PC_PrimaryProduct").data("kendoComboBox");
                        primaryProductlist.value(vm.projectCloseOutInfoSelected.PrimaryProductID);
                        primaryProductlist.refresh();

                        var portfolioOwnerlist = $("#ddl_PC_PortfolioOwner").data("kendoComboBox");
                        portfolioOwnerlist.value(vm.projectCloseOutInfoSelected.PortfolioOwnerID);
                        portfolioOwnerlist.refresh();

                        OriginalPCdata = {};

                        angular.copy(vm.projectCloseOutInfoSelected, OriginalPCdata);

                        vm.performStatus = JSON.parse(resPerformanceStatus.getLookupDataPerformancestatusResult).filter(function (entry) {
                            return entry.LookUpName === performanceStatus;
                        });




                        //   vm.performStatus = JSON.parse(resPerformanceStatus.getLookupDataPerformancestatusResult);

                        if (charterCount == 0) {
                            for (var i = 0; i < vm.dsLessonType.length; i++) {
                                var item7 = {
                                    "text": vm.dsLessonType[i].LookUpMemberName, "value": vm.dsLessonType[i].LookUpMemberID
                                }
                                lessonTypeData.push(item7);
                            }

                            for (var i = 0; i < vm.dsLessonStatus.length; i++) {
                                var item6 = {
                                    "text": vm.dsLessonStatus[i].LookUpMemberName, "value": vm.dsLessonStatus[i].LookUpMemberID
                                }
                                lessonStatusData.push(item6);
                            }


                            for (var p = 0; p < vm.performStatus.length; p++) {
                                var newItem = {
                                    "text": vm.performStatus[p].LookUpMemberName, "value": vm.performStatus[p].LookUpMemberID
                                };
                                performanceStatusBulk.push(newItem);
                            }
                            for (var i = 0; i < vm.dsPrimaryKPI.length; i++) {
                                var item5 = {
                                    "text": vm.dsPrimaryKPI[i].LookUpMemberName, "value": vm.dsPrimaryKPI[i].LookUpMemberID
                                }
                                primaryKpiGrid.push(item5);
                            }
                            for (var i = 0; i < criticalitylist.length; i++) {
                                var cdata = {
                                    "text": criticalitylist[i].LookUpMemberName, "value": criticalitylist[i].LookUpMemberID
                                }
                                criticalityData.push(cdata);
                            }
                            for (var i = 0; i < functionalgroupDataList.length; i++) {
                                var fgdata = {
                                    "text": functionalgroupDataList[i].LookUpMemberName, "value": functionalgroupDataList[i].LookUpMemberID
                                }
                                functionalgroupData.push(fgdata);
                            }
                            bindUserPicker("ddl_CO_ProjectManager");
                            bindUserPicker("ddl_CO_Sponsor");
                            InitkGridProjectCloseOutKeySuccessCriteria();
                            InitkGridProjectCloseOutLL();
                            InitkGridMilestoneVariance();
                            InitKendoGridBaselineLog();
                        }
                        else {

                            $('#gridProjectCloseOutKeySuccessCriteria').data('kendoGrid').dataSource.read();
                            $('#gridProjectCloseOutLessonsLearnt').data('kendoGrid').dataSource.read();
                            $('#gridProjectCloseOutMilestoneVariance').data('kendoGrid').dataSource.read();
                            $('#gridProjectCloseOutScheduleVariance').data('kendoGrid').dataSource.read();

                        }

                        if (vm.projectCloseOutInfoSelected.SponsorId != null && vm.projectCloseOutInfoSelected.SponsorId != "") {
                            var pplObj = {};
                            var siteUsers = [];
                            pplObj.UserADId = vm.projectCloseOutInfoSelected.SponsorId;
                            pplObj.UserDisplayName = vm.projectCloseOutInfoSelected.SponsorName;
                            pplObj.UserImageUrl = vm.projectCloseOutInfoSelected.SponsorImageUrl;
                            pplObj.UserEmailAddress = vm.projectCloseOutInfoSelected.SponsorEmailAddress;
                            pplObj.UserDepartment = vm.projectCloseOutInfoSelected.SponsorDepartment;
                            pplObj.UserCountry = vm.projectCloseOutInfoSelected.SponsorCountry;
                            siteUsers.push(pplObj);
                            var ownerlist = $("#ddl_CO_Sponsor").data("kendoComboBox");
                            ownerlist.value(vm.projectCloseOutInfoSelected.SponsorId);
                            ownerlist.setDataSource(siteUsers);
                            ownerlist.refresh();
                        }
                        else {
                            var siteUsers1 = [];
                            var ownerlist3 = $("#ddl_CO_Sponsor").data("kendoComboBox");
                            ownerlist3.setDataSource(siteUsers1);
                            ownerlist3.value("");
                            ownerlist3.text("");
                            ownerlist3.refresh();
                        }

                        if (vm.projectCloseOutInfoSelected.ProjectManagerId != null && vm.projectCloseOutInfoSelected.ProjectManagerId != "") {
                            var pplObj = {};
                            var siteUsers = [];
                            pplObj.UserADId = vm.projectCloseOutInfoSelected.ProjectManagerId;
                            pplObj.UserDisplayName = vm.projectCloseOutInfoSelected.ProjectManagerName;
                            pplObj.UserImageUrl = vm.projectCloseOutInfoSelected.SponsorImageUrl;
                            pplObj.UserEmailAddress = vm.projectCloseOutInfoSelected.SponsorEmailAddress;
                            pplObj.UserDepartment = vm.projectCloseOutInfoSelected.SponsorDepartment;
                            pplObj.UserCountry = vm.projectCloseOutInfoSelected.SponsorCountry;
                            siteUsers.push(pplObj);
                            var ownerlist = $("#ddl_CO_ProjectManager").data("kendoComboBox");
                            ownerlist.value(vm.projectCloseOutInfoSelected.ProjectManagerId);
                            ownerlist.setDataSource(siteUsers);
                            ownerlist.refresh();
                        }
                        else {
                            var siteUsers1 = [];
                            var ownerlist3 = $("#ddl_CO_ProjectManager").data("kendoComboBox");
                            ownerlist3.setDataSource(siteUsers1);
                            ownerlist3.value("");
                            ownerlist3.text("");
                            ownerlist3.refresh();
                        }
                        gridAddDefaultRows();
                        $scope.$digest();
                        hideLoading();
                        charterCount++;
                    }
                    catch (err) {
                        hideLoading();
                        var dataToSend = {
                            "method": "prepareDataForProjectCloseOut", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { alert(errormessage) });
                    }
                });

        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "prepareDataForProjectCloseOut", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    };

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

            // using {{angular}} templates:
            valueTemplate: '<span class="selected-value" style="background-image: url(\'#: data.UserImageUrl #\')"></span><span>#: data.UserDisplayName #</span>',

            template: '<span class="k-state-default" style="background-image: url(\'#: data.UserImageUrl #\')"></span>' +
                '<span class="k-state-default"><h3>#: data.UserDisplayName #</h3># if (data.UserEmailAddress != null) {#<p>#: data.UserEmailAddress #</p># }if (data.UserDepartment != null) {#<p><span>#: data.UserDepartment #</span># }if (data.UserCountry != null) {# <span> #: data.UserCountry #</span></p># } #</span>',
        });

        $("#" + elmentId).data("kendoComboBox").input.on('keydown', function (e) {
            GETPostService.searchPeople(e, e.currentTarget.name.replace("_input", ""));
        });
        //}
    };
    function gridAddDefaultRows() {
        if (vm.isEditable) {
            AddNewRow("gridProjectCloseOutKeySuccessCriteria");

        }
    };
    function AddNewRow(gridName) {
        var gridNew = $("#" + gridName).data("kendoGrid");

        //var sorting = gridNew.dataSource.sort();
        //if (sorting) {
        //    gridNew.dataSource.sort(null);
        //}
        gridNew.addRow();
    };
    function InitkGridProjectCloseOutKeySuccessCriteria() {
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
                    title: "Metric",
                },
                {
                    field: "CurrentState",
                    title: "Baseline",
                }, {
                    field: "TargetPerformance",
                    title: "Target Performance",
                },
                {
                    field: "ActualPerformance",
                    title: "Actual Performance",
                    headerAttributes: { "class": "wrap-header" }
                },
                {
                    //field: "IncludeInCharter",
                    title: "Include In Close Out Report (Max 5)",
                    headerAttributes: { "class": "wrap-header" },
                    template: function (e) {
                        if (vm.isEditable == false) {
                            if (e.IncludeInCloseOutReport == true) {
                                return dirtyField(e, 'IncludeInCloseOutReport') + '<input disabled="disabled" checked type="checkbox" class="successchkbx" />';
                            }
                            else {
                                return dirtyField(e, 'IncludeInCloseOutReport') + '<input disabled="disabled" type="checkbox" class="successchkbx" />';
                            }
                        }
                        else {
                            if (e.IncludeInCloseOutReport == true) {
                                return dirtyField(e, 'IncludeInCloseOutReport') + '<input type="checkbox" checked class="successchkbx" />';
                            }
                            else {
                                return dirtyField(e, 'IncludeInCloseOutReport') + '<input type="checkbox" class="successchkbx" />';
                            }
                        }
                    },
                    // template: '<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="successchkbx" />',//CheckBoxKeySuccessEdit
                    //selectable: false
                }, {
                    hidden: !(vm.isEditable),
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
                                        vm.deletedKeySuccessData.push({ "KeySuccessUniqueID": data.KeySuccessUniqueID });

                                    var grid = $("#gridProjectCloseOutKeySuccessCriteria").data("kendoGrid");
                                    grid.removeRow(tr);

                                    $scope.$digest();
                                }
                            }
                            catch (err) {
                                hideLoading();
                                var dataToSend = {
                                    "method": "InitkGridProjectCloseOutKeySuccessCriteria_click", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                };
                                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                    .then(function (response) { alert(errormessage); });
                            }
                        }
                    }]
                }];
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
                            StatusID: { type: "string", editable: vm.isEditable },
                            KPIID: { type: "string", editable: vm.isEditable },
                            Metric: {
                                type: "string", editable: vm.isEditable
                                //validation: { required: true }
                            },
                            CurrentState: { type: "string", editable: vm.isEditable },
                            TargetPerformance: { type: "string", editable: vm.isEditable },
                            IncludeInCloseOutReport: { type: "boolean", editable: vm.isEditable },
                            ActualPerformance: { type: "string", editable: vm.isEditable },
                        }
                    }
                },
            });
            $("#gridProjectCloseOutKeySuccessCriteria").kendoGrid({
                dataSource: dataSource1,
                columns: col,
                navigatable: true,
                editable: {
                    createAt: "bottom"
                },
                dataBound: function () {
                    $(".successchkbx").bind("change", function (e) {
                        var grid = $("#gridProjectCloseOutKeySuccessCriteria").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));

                        var cell = e.target.closest('td');
                        $(cell).prepend("<span class='k-dirty'></span>");

                        dataItem.set("IncludeInCloseOutReport", this.checked);
                        //dataItem.dirty = true;
                    });
                }

            });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitkGridProjectCloseOutKeySuccessCriteria", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    };
    function InitkGridProjectCloseOutLL() {
        try {
            submittedUsers = [];
            actionOwnerUsers = [];
            angular.forEach(gridDataLessonsLearned, function (item, index) {
                if (item.SubmittedBy != null && item.SubmittedBy != "") {
                    var user = submittedUsers.filter(function (val) {
                        return (val.value == item.SubmittedBy);
                    });
                    if (user.length == 0) {
                        var temp = {};
                        temp.text = item.SubmittedUserDisplayName;
                        temp.value = item.SubmittedBy;
                        temp.UserCountry = item.SubmittedUserCountry,
                        temp.UserImageUrl = item.UserImageUrl,
                        temp.UserEmailAddress = item.SubmittedUserEmailAddress,
                        temp.UserDepartment = item.UserDepartment,
                        submittedUsers.push(temp);
                    }
                }
                if (item.ActionOwner != null && item.ActionOwner != "") {
                    var user = actionOwnerUsers.filter(function (val) {
                        return (val.value == item.ActionOwner);
                    });
                    if (user.length == 0) {
                        var temp = {};
                        temp.text = item.ActionUserDisplayName;
                        temp.value = item.ActionOwner;
                        temp.UserCountry = item.ActionUserCountry,
                        temp.UserImageUrl = item.UserImageUrl,
                        temp.UserEmailAddress = item.ActionUserEmailAddress,
                        temp.UserDepartment = item.UserDepartment,
                        actionOwnerUsers.push(temp);
                    }
                }
            });

            var user = submittedUsers.filter(function (val) {
                return val.value === currentUserId;
            });
            if (user.length == 0) {
                submittedUsers.push({
                    text: currentUser[0].UserDisplayName, value: currentUser[0].UserADId, UserCountry: currentUser[0].UserCountry,
                    UserImageUrl: currentUser[0].UserImageUrl, UserEmailAddress: currentUser[0].UserEmailAddress, UserDepartment: currentUser[0].UserDepartment

                });
            }

            var col = [
                {
                    headerTemplate: '<div>Include in Single Slide Summary<span>(Max 4)</span></div>',
                    width: "70px",
                    headerAttributes: { "class": "wrap-header" },
                    template: function (e) {
                        if (vm.isEditable == false) {
                            if (e.IncludeInCloseOutReport == true) {
                                return  '<input disabled="disabled" checked type="checkbox" class="successCloseOutchkbx" />';
                            }
                            else {
                                return '<input disabled="disabled" type="checkbox" class="successCloseOutchkbx" />';
                            }
                        }
                        else {
                            if (e.IncludeInCloseOutReport == true) {
                                return dirtyField(e, 'IncludeInCloseOutReport') + '<input type="checkbox" checked class="successCloseOutchkbx" />';
                            }
                            else {
                                return dirtyField(e, 'IncludeInCloseOutReport') + '<input type="checkbox" class="successCloseOutchkbx" />';
                            }
                        }
                    }
                },
                {
                    headerTemplate: '<div>Create Detailed Review Slide (No Max)</span></div>',
                    headerAttributes: { "class": "wrap-header" },
                    width: "50px",
                    template: function (e) {
                        if (vm.isEditable == false) {
                            if (e.CreateDetailedReviewSlide == true) {
                                return '<input disabled="disabled" checked type="checkbox" class="detailCloseOutchkbx" />';
                            }
                            else {
                                return '<input disabled="disabled" type="checkbox" class="detailCloseOutchkbx" />';
                            }
                        }
                        else {
                            if (e.CreateDetailedReviewSlide == true) {
                                return dirtyField(e, 'CreateDetailedReviewSlide') + '<input type="checkbox" checked class="detailCloseOutchkbx" />';
                            }
                            else {
                                return dirtyField(e, 'CreateDetailedReviewSlide') + '<input type="checkbox" class="detailCloseOutchkbx" />';
                            }
                        }

                    }

                },
                 {
                     field: "LessonLogDate",
                     headerTemplate: '<div>Log Date<span>(mm/dd/yyyy)</span></div>',
                     width: "100px",
                     format: "{0:MM/dd/yyyy}",
                     headerAttributes: { "class": "wrap-header" }
                 },
                {
                    field: "LeassonTitle",
                    title: "Title",
                    width: "250px",
                },
                {
                    field: "LessonDetail",
                    title: "Description/Details",
                    width: "250px",
                    headerAttributes: { "class": "wrap-header" },
                },
                {
                    field: "LessonTypeID",
                    title: "Type",
                    width: "150px",
                    values: lessonTypeData,
                    editor: LessonsLearnedTypeEditor
                },
                {
                    field: "Criticality",
                    title: "Criticality",
                    width: "120px",
                    values: criticalityData,
                    editor: criticalityEditor
                },
                {
                    field: "SubmittedBy",
                    title: "Submitted By",
                    width: "250px",
                    headerAttributes: { "class": "wrap-header" },
                    values: submittedUsers,
                    editor: submittedByUserDropDownEditor,
                    template: function (e) {

                        if (e.SubmittedBy != null) {
                            var teamMember;
                            teamMember = submittedUsers.filter(function (entry) {
                                return entry.value == e.SubmittedBy;
                            });
                            if (teamMember.length > 0) {
                                e.SubmittedUserDisplayName = teamMember[0].text;
                            }
                            else {
                                e.SubmittedUserDisplayName = "";
                                e.SubmittedBy = "";
                            }
                        }
                        else {
                            e.SubmittedUserDisplayName = currentUser[0].UserDisplayName;
                            e.SubmittedBy = currentUser[0].UserADId;
                        }
                        return e.SubmittedUserDisplayName;
                    },
                },
                {
                    field: "SubmittingGroupRole",
                    title: "Submitting Group/Role",
                    width: "250px",
                    headerAttributes: { "class": "wrap-header" },
                    values: functionalgroupData,
                    editor: functiongroupEditor
                },
                {
                    field: "SuggestedAction",
                    title: "Suggested Action",
                    width: "250px",
                    headerAttributes: { "class": "wrap-header" },
                    editor: textAreaEditor

                },
                {
                    field: "DueDate",
                    headerTemplate: '<div>Due Date<span>(mm/dd/yyyy)</span></div>',
                    width: "100px",
                    format: "{0:MM/dd/yyyy}",
                    headerAttributes: { "class": "wrap-header" }
                    // attributes: { class: "#:StatusIndicator#" }
                },
               {
                   field: "FunctionActionOwner",
                   title: "Function Action Owner",
                   width: "250px",
                   headerAttributes: { "class": "wrap-header" },
                   values: functionalgroupData,
                   editor: functiongroupEditor
               },
                {
                    field: "ActionOwner",
                    title: "Action Owner",
                    width: "250px",
                    headerAttributes: { "class": "wrap-header" },
                    //values: lessonTypeData,
                    editor: actionOwnerUserDropDownEditor,
                    template: function (e) {
                        if (e.ActionOwner != null) {
                            var teamMember;
                            teamMember = actionOwnerUsers.filter(function (entry) {
                                return entry.value == e.ActionOwner;
                            });
                            if (teamMember.length > 0) {
                                e.ActionUserDisplayName = teamMember[0].text;
                            }
                            else {
                                e.ActionUserDisplayName = "";
                                e.ActionOwner = "";
                            }
                        }
                        else { e.ActionUserDisplayName = ""; }
                        return e.ActionUserDisplayName;
                    },
                },

                {
                    field: "LessonCloseDate",
                    headerTemplate: '<div>Close Date<span>(mm/dd/yyyy)</span></div>',
                    width: "100px",
                    format: "{0:MM/dd/yyyy}",
                    headerAttributes: { "class": "wrap-header" },
                },

                {
                    hidden: !(vm.isEditable),
                    width: "60px",
                    command: [{
                        name: " ",
                        iconClass: "k-icon k-i-close",
                        // width: "3%",
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
                                    if (data.LessonLearnedID != 'undefined' && data.LessonLearnedID != "")
                                        vm.deletedLessonsLearntData.push({ "LessonLearnedID": data.LessonLearnedID });

                                    var grid = $("#gridProjectCloseOutLessonsLearnt").data("kendoGrid");
                                    grid.removeRow(tr);

                                    $scope.$digest();
                                }
                            }
                            catch (err) {
                                hideLoading();
                                var dataToSend = {
                                    "method": "InitkGridProjectCloseOutLL_click", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                };
                                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                    .then(function (response) { alert(errormessage); });
                            }
                        }
                    }]
                }];
            var dataSource1 = new kendo.data.DataSource({
                transport: {
                    read: function (e) {
                        // on success
                        e.success(gridDataLessonsLearned);
                    }
                },
                sort: [{ field: "LessonLogDate", dir: "desc" }],
                batch: true,
                schema: {
                    model: {
                        id: "LessonLearnedID",
                        fields: {
                            LessonLearnedID: { editable: false, nullable: true },
                            LessonLogDate: { type: "date", defaultValue: null, editable: vm.isEditable },
                            LeassonTitle: { type: "string", editable: vm.isEditable },
                            LessonDetail: { type: "string", editable: vm.isEditable },
                            LessonTypeID: { type: "string", editable: vm.isEditable },
                            LessonStatusID: { type: "string", editable: vm.isEditable },
                            LessonCloseDate: { type: "date", defaultValue: null, editable: vm.isEditable },
                            IncludeInCloseOutReport: { type: "boolean", editable: vm.isEditable },
                            SubmittedBy: { type: "string", editable: vm.isEditable },
                            ActionOwner: { type: "string", editable: vm.isEditable },
                            Criticality: { type: "string", editable: vm.isEditable },
                            CreateDetailedReviewSlide: { type: "boolean", editable: vm.isEditable },
                            SubmittingGroupRole: { type: "string", editable: vm.isEditable },
                            SuggestedAction: { type: "string", editable: vm.isEditable },
                            DueDate: { type: "date", defaultValue: null, editable: vm.isEditable },
                            FunctionActionOwner: { type: "string", editable: vm.isEditable }
                        }
                    }
                },
            });
            var grid = $("#gridProjectCloseOutLessonsLearnt").kendoGrid({
                dataSource: dataSource1,
                columns: col,
                scrollable: true,
                width: "auto",
                navigatable: true,
                selectable: true,
                editable: {
                    createAt: "bottom"
                },
                dataBound: function () {
                    $(".successCloseOutchkbx").bind("change", function (e) {
                        var grid = $("#gridProjectCloseOutLessonsLearnt").data("kendoGrid");
                        var dataItem = grid.dataItem($(e.target).closest("tr"));

                        var cell = e.target.closest('td');
                        $(cell).prepend("<span class='k-dirty'></span>");
                        dataItem.set("IncludeInCloseOutReport", this.checked);
                        //dataItem.dirty = true;
                    });
                    $(".detailCloseOutchkbx").bind("change", function (e) {
                        var grid = $("#gridProjectCloseOutLessonsLearnt").data("kendoGrid");
                        var dataItem = grid.dataItem($(e.target).closest("tr"));
                        var cell = e.target.closest('td');
                        $(cell).prepend("<span class='k-dirty'></span>");
                        dataItem.set("CreateDetailedReviewSlide", this.checked);
                    });
                },
                edit: function (e) {
                    try {
                        if (e.model.isNew() && !e.model.dirty) {
                            var user = submittedUsers.filter(function (val) {
                                return val.value === currentUserId;
                            });
                            if (user.length == 0) {
                                submittedUsers.push({
                                    // text: item.UserDisplayName, value: item.UserADId, UserCountry: item.UserCountry,
                                    // UserEmailAddress: item.UserEmailAddress
                                    text: currentUser.UserDisplayName, value: currentUser.UserADId, UserCountry: currentUser.UserCountry,
                                    UserImageUrl: currentUser.UserImageUrl, UserEmailAddress: currentUser.UserEmailAddress, UserDepartment: currentUser.UserDepartment

                                });
                            }

                            //set field
                            e.model.set("SubmittedBy", currentUser[0].UserADId);
                        }
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "InitGridProjcetCloseOutLL(Edit)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) {
                                  //  alert(errormessage);
                              });
                    }
                }

            }).data("kendoGrid");
            $("#gridProjectCloseOutLessonsLearnt table").on("keydown", function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    var hasCombo = $(e.target).closest(".k-combobox").length;
                    if (hasCombo) {
                        grid.editCell(grid.current());
                        $("[data-role='combobox']").data("kendoComboBox").dataSource.read();
                    }
                }
            });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitkGridProjectCloseOutLL", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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

                    var StatusColor = vm.performStatus.filter(function (entry) {
                        return entry.LookUpMemberName === e.sender.dataItem(e.item).text;
                    })[0].OtherAttribute;

                    if ((widget.select() === -1 && StatusColor == "") || (e.sender.dataItem(e.item).text == "" && StatusColor == "")) {
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
    function LessonsLearnedTypeEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: lessonTypeData,
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
    function LessonsLearnedStatusEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: lessonStatusData,
                change: function (e) {
                    var widget = e.sender;
                    var grid = e.sender.element.closest(".k-grid").data("kendoGrid");
                    var row = e.sender.element.closest("tr");
                    var dataItem = grid.dataItem(row);

                    if (widget.value() == "" && widget.select() === -1) {
                        //custom has been selected
                        widget.value(""); //reset widget                    


                        dataItem.set("LessonCloseDate", "");

                    }
                    else {
                        if (widget.value() == statusCloseId) {
                            //widget.value(""); //reset widget

                            dataItem.set("LessonCloseDate", new Date());
                            dataItem.dirty = true;
                            row.find('td:eq(5)').removeClass("disabledLi");
                            //dataItem["StatusID"] = "";
                        }
                        else {
                            row.find('td:eq(5)').addClass("disabledLi");
                            dataItem.set("LessonCloseDate", "");
                            dataItem.dirty = true;
                        }
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
    var dirtyField = function (data, fieldName) {
        if (data.dirty && data.dirtyFields[fieldName]) {
            return "<span class='k-dirty'></span>";
        }
        else {
            return "";
        }
    };
    function createParentProj(ParentProgramID, ParentProgramName) {

        var dsProjects = [{ "ProblemUniqueID": ParentProgramID, "ProjectName": ParentProgramName }];
        var searchFor = "Parent";
        var projectUID = SeletedProjectId;
        var SelectedParentProjCharter = ParentProgramID;
        searchProjectParentCloseOut("ddl_Co_parentProjectCloseOut", dsProjects, searchFor, projectUID, SelectedParentProjCharter);
       
        SelectedParentProjCharter = [];


        //selectedParentProj = (vm.dsGIProgram).filter(function (entry) {
        //    return entry.LookUpMemberID == vm.SelectedProject.ParentProgramID;
        //});


        vm.SelectedParentProject = dsProjects[0];//selectedParentProj.length > 0 ? selectedParentProj[0] : "";
        angular.copy(vm.SelectedParentProject, originalParentProjCharter);
    }
    function searchProjectParentCloseOut(inputId, dsProjects, searchFor, projectUID, SelectedParentProjCharter) {
        var selectedPeoplefilter = "";
        var projCombo = $("#" + inputId).data("kendoComboBox");
        if (projCombo == undefined) {
            $("#" + inputId).kendoComboBox({
                dataTextField: "ProjectName",
                dataValueField: "ProblemUniqueID",
                dataSource: dsProjects,
                minLength: 3,
                value: SelectedParentProjCharter,
                select: function (e) {
                    vm.SelectedParentProject = { "ProblemUniqueID": e.dataItem.ProblemUniqueID, "ProjectName": e.dataItem.ProjectName };
                    if (angular.equals(originalParentProjCharter, vm.SelectedParentProject) === false && originalParentProjCharter.ProblemUniqueID !== undefined && originalParentProjCharter.ProblemUniqueID !== null) {
                        if (!confirm(parentProgChangMsg)) {
                            //     e.preventDefault();
                            var dsParentProj = [];
                            dsParentProj.push(vm.SelectedParentProject);
                            angular.copy(originalParentProjCharter, vm.SelectedParentProject);
                            var combobox = $("#" + inputId).data("kendoComboBox");
                            combobox.setDataSource(dsParentProj);
                            $("#" + inputId).data("kendoComboBox").value(originalParentProjCharter.ProblemUniqueID)
                            // vm.SelectedParentProject = ;
                            //if ($("#ddl_GI_ParentProg").data("kendoComboBox").value() && $("#ddl_GI_ParentProg").data("kendoComboBox").select() === -1) {
                            //    vm.SelectedParentProject = null;
                            //}
                            $scope.$digest();
                        }
                        else {
                            needHubreload = true;
                        }
                    }
                    else {
                        needHubreload = true;
                        //if ($("#ddl_GI_ParentProg").data("kendoComboBox").value() && $("#ddl_GI_ParentProg").data("kendoComboBox").select() === -1) {
                        //    $("#ddl_GI_ParentProg").data("kendoComboBox").value("");
                        //}
                    }
                },
                placeholder: projectPickerPlaceholder,
            });
            try {
                $('#' + inputId).data().kendoComboBox.input.on('keydown', function (e) {
                    if (e.keyCode == 13) {
                        // if (canFilter == true) {
                        var projCombo = $("#" + inputId).data("kendoComboBox");

                        var userFilter = "";
                        console.log(projCombo.value());
                        var input = projCombo.input[0].value;
                        var isConfidentialPrj = vm.projectCloseOutInfoSelected.IsConfidential === true ? "1" : "0";
                        console.log(input);
                        if (input.length >= 3) {
                            displayLoading();
                            var dataToSend = {
                                "programUID": projectUID, "searchFor": searchFor + '-' + vm.projectCloseOutInfoSelected.IsConfidential, "filterString": input
                            };
                            $.when(GETPostService.postDataWCFAsync("getAllProjectProgramListFilter", dataToSend))
                                .then(function (resProj) {
                                    try {
                                        dsProjects = JSON.parse(resProj);
                                        projCombo.setDataSource(dsProjects);
                                        projCombo.open();
                                        hideLoading();
                                    }
                                    catch (err) {
                                        var dataToSend = {
                                            "method": "searchProjectParentCharter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                        };
                                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                            .then(function (response) { alert(errormessage) });
                                        hideLoading();
                                    }
                                });
                        }
                        else {
                            alert(minThreeLetterMsg);
                            dsProjects = [];
                            var projCombo = $("#" + inputId).data("kendoComboBox");
                            projCombo.setDataSource(dsProjects);
                            projCombo.close();
                            hideLoading();
                        }
                        //}
                        //else {
                        //    alert(minThreeLetterMsg);

                        //    var projCombo = $("#" + inputId).data("kendoComboBox");
                        //    projCombo.close();
                        //}
                    }
                    if (e.keyCode == 8 || e.keyCode == 46) {
                        $("#" + inputId).data("kendoComboBox").value("");
                    }
                    else {
                        dsProjects = [];
                        var projCombo = $("#" + inputId).data("kendoComboBox");
                        projCombo.setDataSource(dsProjects);
                        projCombo.close();
                    }
                });

                //$("#" + inputId).on("change", function (e) {
                //    if ($('#' + inputId).data("kendoComboBox").value() && $('#' + inputId).data("kendoComboBox").select() === -1) {
                //        $('#' + inputId).data("kendoComboBox").value("");
                //    }

                //});
            }
            catch (err) {
                var dataToSend = {
                    "method": "searchProjectParentCharter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
                hideLoading();
            }

        }
        else {
            projCombo.setDataSource(dsProjects);
            projCombo.value(SelectedParentProjCharter);
            hideLoading();
        }
        if (!vm.isEditable)
        {
            var projCombox = $("#" + inputId).data("kendoComboBox");
            projCombox.enable(false);
        }
       
        return selectedPeoplefilter;
    }
    function bindChangeDatePicker(elmentId) {
        $("#" + elmentId).on("change", function (e) {
            //onDateChange($(this).attr('id'));
            var flag = false;
            var value = $("#" + $(this).attr('id')).val();
            if (parseDate(value)) {
                flag = true;
            }
            if (flag) {
                vm.coApprovedDateError = false;
            }
            $scope.$digest();
        });
    };
    function openProjectCloseOutInfo() {
        trackEvent("Project close out dialog opened");
        try {
            displayLoading();
            bindChangeDatePicker("PC_approvedDateCloseOut");
            bindChangeComboBox("ddl_CO_PrimaryProduct");
            bindChangeComboBox("ddl_CO_PortfolioOwner");
            //bindChangeComboBox("ddl_Co_parentProjectCloseOut");        


            if (dialogbind == false) {
                $("#dialogProjectCloseOut").data("kendoWindow").bind("close", function (e) {
                    DialogCloseEvent(e)
                });
                dialogbind = true;
            }
            var myWindow = $("#dialogProjectCloseOut");

            prepareDataForProjectCloseOut();

            myWindow.data("kendoWindow").open();
            /*Need to update the count as per requiremet.*/
            //if (btnClickProjectCloseOut == 0) {

            //}
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "openProjectCloseOutInfo", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };



    function DialogCloseEvent(e) {
        // dropdownSetValuePC();
        var gridupdatedDataKeySuccess = $('#gridProjectCloseOutKeySuccessCriteria').data('kendoGrid').dataSource.data()
            .filter(function (x) { return x.dirty })
            .map(function (x) { return x });
        var gridupdatedDataLL = $('#gridProjectCloseOutLessonsLearnt').data('kendoGrid').dataSource.data()
            .filter(function (x) { return x.dirty })
            .map(function (x) { return x });
        var gridupdatedDataMilestone = $('#gridProjectCloseOutMilestoneVariance').data('kendoGrid').dataSource.data()
            .filter(function (x) { return x.dirty })
            .map(function (x) { return x });
        var gridupdatedDataBaseline = $('#gridProjectCloseOutScheduleVariance').data('kendoGrid').dataSource.data()
                   .filter(function (x) { return x.dirty })
                   .map(function (x) { return x });

        if (gridupdatedDataKeySuccess.length > 0 || gridupdatedDataLL.length > 0 || gridupdatedDataMilestone.length > 0 || gridupdatedDataBaseline.length > 0) {

            if (!confirm(dialogCloseMessage))
                e.preventDefault();
        }

    }
    function updateProjectCloseOutInfo() {
        try {
            displayLoading();
            var listdataKeySuccess = [];
            var listdataLL = [];
            var listdataProjectCloseOutInfo = [];

            vm.keySuccessInsertListItems = [];
            vm.keySuccessUpdateListItems = [];
            vm.LLInsertListItems = [];
            vm.LLUpdateListItems = [];

            if (vm.SelectedParentProject == null && vm.projectCloseOutInfoSelected.ParentProgramID != null)
                parentProjChangeCharter = true;
            else if (vm.projectCloseOutInfoSelected != null && vm.projectCloseOutInfoSelected != undefined && vm.SelectedParentProject != null) {
                if (vm.projectCloseOutInfoSelected.ParentProgramID != vm.SelectedParentProject.ProblemUniqueID)
                    parentProjChangeCharter = true;
            }

            // var prjselect = $("#ddl_Co_parentProjectCloseOut").data("kendoComboBox");
            if ($("#ddl_Co_parentProjectCloseOut").data("kendoComboBox").select() === -1) {
                //alert(optionMsg);
                vm.SelectedParentProject = null
                $("#ddl_Co_parentProjectCloseOut").data("kendoComboBox").value("");
            }

            var valid = true;
            var projectCloseApprovedDate = (vm.projectCloseOutInfoSelected.ApprovedDate != null && vm.projectCloseOutInfoSelected.ApprovedDate != "") ? $("#PC_approvedDateCloseOut").val() : null;
            if (projectCloseApprovedDate != null) {
                if (!parseDate(projectCloseApprovedDate)) {
                    valid = false;
                    vm.coApprovedDateError = true;
                }
                else {
                    vm.coApprovedDateError = false;
                }
            }
            if (!valid) {
                hideLoading();
                return;
            }

            var keySuccessCharterLength = $("#gridProjectCloseOutKeySuccessCriteria").data("kendoGrid").tbody.find("input:checked").length;
            if (keySuccessCharterLength > keySuccessCloseOutCount) {
                alert(keySuccessCountCloseOutMessage);
                hideLoading();
                return false;
            }
            var lessonLearnLength = $("#gridProjectCloseOutLessonsLearnt").data("kendoGrid").tbody.find("input.successCloseOutchkbx:checked").length;
            if (lessonLearnLength > lessonLearnedCloseOutCount) {
                alert(lessonLearnedCountCloseOutMessage);
                hideLoading();
                return false;
            }
            var milestoneLength = $("#gridProjectCloseOutMilestoneVariance").data("kendoGrid").tbody.find("input:checked").length;
            if (milestoneLength > milestoneCountReportcloseOut) {
                alert(milestoneCloseOutMessage);
                hideLoading();
                return false;
            }

            var baselineLogLength = $("#gridProjectCloseOutScheduleVariance").data("kendoGrid").tbody.find("input:checked").length;
            if (baselineLogLength > baselinelogcountReportcloseOut) {
                alert(baselinelogCloseOutMessage);
                hideLoading();
                return false;
            }
            var milestoneUpdateListItems = [];
            if ($('#gridProjectCloseOutMilestoneVariance').data('kendoGrid') != undefined) {
                var gridupdatedData = $('#gridProjectCloseOutMilestoneVariance').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });

                angular.forEach(gridupdatedData, function (item, index) {
                    var temp = {};
                    temp.ScheduleUniqueID = item.ScheduleUniqueID;
                    temp.IncludeInCloseout = item.IncludeInCloseout;
                    temp.ProjectID = item.ProjectID;
                    temp.Comments = item.Comments;
                    milestoneUpdateListItems.push(temp);
                });
            }
            var updateMilestone = {
                "update": milestoneUpdateListItems,
            };
            var logUpdateListItems = [];
            if ($('#gridProjectCloseOutScheduleVariance').data('kendoGrid') != undefined) {
                var gridupdatedBaselineData = $('#gridProjectCloseOutScheduleVariance').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                angular.forEach(gridupdatedBaselineData, function (item, index) {
                    var temp = {};
                    temp.BaselineLogID = item.BaselineLogID;
                    temp.IncludeInCloseout = item.IncludeInCloseout;
                    temp.ProjectID = item.ProjectID;
                    temp.BaselineComment = item.BaselineComment;
                    logUpdateListItems.push(temp);
                });
            }
            var updateBaselineLog = {
                "update": logUpdateListItems,
            };


            if ($('#gridProjectCloseOutKeySuccessCriteria').data('kendoGrid') != undefined) {
                var gridupdatedDataKey = $('#gridProjectCloseOutKeySuccessCriteria').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertKeySuccessArray = gridupdatedDataKey.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateKeySuccessArray = gridupdatedDataKey.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });
                angular.forEach(insertKeySuccessArray, function (item, index) {
                    var temp = {};
                    temp.KeySuccessUniqueID = item.KeySuccessUniqueID;
                    temp.KPIID = item.KPIID;
                    temp.StatusIndicator = item.StatusIndicator;
                    temp.StatusID = item.StatusID;
                    temp.Metric = item.Metric;
                    temp.CurrentState = item.CurrentState;
                    temp.TargetPerformance = item.TargetPerformance;
                    temp.ActualPerformance = item.ActualPerformance;
                    temp.IncludeInCloseOutReport = item.IncludeInCloseOutReport;
                    vm.keySuccessInsertListItems.push(temp);
                });
                angular.forEach(updateKeySuccessArray, function (item, index) {
                    var temp = {};
                    temp.KeySuccessUniqueID = item.KeySuccessUniqueID;
                    temp.KPIID = item.KPIID;
                    temp.StatusIndicator = item.StatusIndicator;
                    temp.StatusID = item.StatusID;
                    temp.Metric = item.Metric;
                    temp.CurrentState = item.CurrentState;
                    temp.TargetPerformance = item.TargetPerformance;
                    temp.ActualPerformance = item.ActualPerformance;
                    temp.IncludeInCloseOutReport = item.IncludeInCloseOutReport;
                    vm.keySuccessUpdateListItems.push(temp);
                });
            }
            vm.insertUpdateDeleteKeySuccess = {
                "insert": vm.keySuccessInsertListItems,
                "update": vm.keySuccessUpdateListItems,
                "delete": vm.deletedKeySuccessData
            };


            if ($('#gridProjectCloseOutLessonsLearnt').data('kendoGrid') != undefined) {
                var gridupdatedDataLL = $('#gridProjectCloseOutLessonsLearnt').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertLLArray = gridupdatedDataLL.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateLLArray = gridupdatedDataLL.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });
                angular.forEach(insertLLArray, function (item, index) {
                    var temp = {};
                    temp.LessonLearnedID = item.LessonLearnedID;
                    temp.ProjectUID = item.ProjectUID;
                    temp.LeassonTitle = item.LeassonTitle;
                    temp.LessonLogDate = kendo.toString(item.LessonLogDate, "d");
                    temp.LessonDetail = item.LessonDetail;
                    temp.LessonTypeID = item.LessonTypeID;
                    // temp.LessonTypeName = item.LessonTypeName;
                    //temp.LessonStatusID = item.LessonStatusID;
                    // temp.LessonStatusName = item.LessonStatusName;
                    temp.LessonCloseDate = kendo.toString(item.LessonCloseDate, "d");
                    temp.IncludeInCloseOutReport = item.IncludeInCloseOutReport;
                    temp.Criticality = item.Criticality;
                    temp.SubmittedBy = (item.SubmittedBy != null && item.SubmittedBy != "") ? item.SubmittedBy : currentUser[0].UserADId;
                    temp.CreateDetailedReviewSlide = item.CreateDetailedReviewSlide;
                    temp.SubmittingGroupRole = item.SubmittingGroupRole;
                    temp.SuggestedAction = item.SuggestedAction;
                    temp.DueDate = kendo.toString(item.DueDate, "d");
                    temp.FunctionActionOwner = item.FunctionActionOwner;
                    temp.ActionOwner = item.ActionOwner;
                    vm.LLInsertListItems.push(temp);
                });
                angular.forEach(updateLLArray, function (item, index) {
                    var temp = {};
                    temp.LessonLearnedID = item.LessonLearnedID;
                    temp.ProjectUID = item.ProjectUID;
                    temp.LeassonTitle = item.LeassonTitle;
                    temp.LessonLogDate = kendo.toString(item.LessonLogDate, "d");
                    temp.LessonDetail = item.LessonDetail;
                    temp.LessonTypeID = item.LessonTypeID;
                    // temp.LessonTypeName = item.LessonTypeName;
                    //temp.LessonStatusID = item.LessonStatusID;
                    // temp.LessonStatusName = item.LessonStatusName;
                    temp.LessonCloseDate = kendo.toString(item.LessonCloseDate, "d");
                    temp.IncludeInCloseOutReport = item.IncludeInCloseOutReport;
                    temp.Criticality = item.Criticality;
                    temp.SubmittedBy = (item.SubmittedBy != null && item.SubmittedBy != "") ? item.SubmittedBy : currentUser[0].UserADId;
                    temp.CreateDetailedReviewSlide = item.CreateDetailedReviewSlide;
                    temp.SubmittingGroupRole = item.SubmittingGroupRole;
                    temp.SuggestedAction = item.SuggestedAction;
                    temp.DueDate = kendo.toString(item.DueDate, "d");
                    temp.FunctionActionOwner = item.FunctionActionOwner;
                    temp.ActionOwner = item.ActionOwner;
                    vm.LLUpdateListItems.push(temp);
                });
            }
            vm.insertUpdateDeleteLL = {
                "insert": vm.LLInsertListItems,
                "update": vm.LLUpdateListItems,
                "delete": vm.deletedLessonsLearntData
            };

            var ImpactedProductsList = [];
            var executionscopeList = [];

            if (vm.projectCloseOutInfoSelected.OtherImpactedProducts != null) {

                ImpactedProductsList = vm.projectCloseOutInfoSelected.OtherImpactedProducts.length > 1 ? vm.projectCloseOutInfoSelected.OtherImpactedProducts.join(",") : vm.projectCloseOutInfoSelected.OtherImpactedProducts[0];
            }

            if (vm.projectCloseOutInfoSelected.ExecutionScope != null) {

                executionscopeList = vm.projectCloseOutInfoSelected.ExecutionScope.length > 1 ? vm.projectCloseOutInfoSelected.ExecutionScope.join(",") : vm.projectCloseOutInfoSelected.ExecutionScope[0];

            }


            var sponsorID = '';
            var sponsorName = '';
            var pmID = ''
            var pmName = ''
            if ($("#ddl_CO_Sponsor").data("kendoComboBox") != null && $("#ddl_CO_Sponsor").data("kendoComboBox").selectedIndex != -1) {
                sponsorID = $("#ddl_CO_Sponsor").data("kendoComboBox").value();
                sponsorName = $("#ddl_CO_Sponsor").data("kendoComboBox").text();
            }

            if ($("#ddl_CO_ProjectManager").data("kendoComboBox") != null && $("#ddl_CO_ProjectManager").data("kendoComboBox").selectedIndex != -1) {
                pmID = $("#ddl_CO_ProjectManager").data("kendoComboBox").value();
                pmName = $("#ddl_CO_ProjectManager").data("kendoComboBox").text();
            }
            // Get the selected field value

            var fields = vm.projectCloseOutInfoSelected.FieldMasterDetails;
            var fieldsList = fields.split("ß")
            for (var j = 0; j < fieldsList.length; j++) {
                var fieldsval = fieldsList[j].split("Þ");
                switch (j) {
                    case 0: if (vm.budgetField1.active) {
                        vm.projectCloseOutInfoSelected.Field1 = vm.budgetField1.checked;
                    }

                        break;
                    case 1: if (vm.budgetField2.active) {
                        vm.projectCloseOutInfoSelected.Field2 = vm.budgetField2.checked;
                    }
                        break;
                    case 2: if (vm.budgetField3.active) {
                        vm.projectCloseOutInfoSelected.Field3 = vm.budgetField3.checked;
                    }
                        break;
                    case 3: if (vm.budgetField4.active) {
                        vm.projectCloseOutInfoSelected.Field4 = vm.budgetField4.checked;
                    }
                        break;
                    case 4: if (vm.budgetField5.active) {
                        vm.projectCloseOutInfoSelected.Field5 = vm.budgetField5.checked;
                    }
                        break;
                }
            }

            vm.projectCloseOutInfoSelectedData = {
                //ProjectID: vm.projectCloseOutInfoSelected.ProjectID != null ? vm.projectCloseOutInfoSelected.ProjectID : null,
                ProjectName: vm.projectCloseOutInfoSelected.ProjectName,
                PrimaryProductID: vm.projectCloseOutInfoSelected.PrimaryProductID != null ? vm.projectCloseOutInfoSelected.PrimaryProductID.LookUpMemberID : null,
                OtherImpactedProducts: vm.projectCloseOutInfoSelected.OtherImpactedProducts != null ? ImpactedProductsList : null,
                PortfolioOwnerID: vm.projectCloseOutInfoSelected.PortfolioOwnerID != null ? vm.projectCloseOutInfoSelected.PortfolioOwnerID.LookUpMemberID : null,
                ExecutionScopeID: vm.projectCloseOutInfoSelected.ExecutionScope != null ? executionscopeList : null,
                //SponsorADID: vm.projectCloseOutInfoSelected.SponsorADID != null ? vm.projectCloseOutInfoSelected.SponsorADID.UserADId : null,
                //ProjectManagerADID: vm.projectCloseOutInfoSelected.ProjectManagerADID != null ? vm.projectCloseOutInfoSelected.ProjectManagerADID.UserADId : null,
                // ParentProgramID: vm.projectCloseOutInfoSelected.ParentProgramID != null ? vm.projectCloseOutInfoSelected.ParentProgramID.LookUpMemberID : null,

                //SVPElementTypeID: vm.projectCloseOutInfoSelected.SVPElementTypeID != null ? vm.projectCloseOutInfoSelected.SVPElementTypeID.LookUpMemberID : null,
                // GovernanceBodyTypeID: vm.projectCloseOutInfoSelected.GovernanceBodyTypeID != null ? vm.projectCloseOutInfoSelected.GovernanceBodyTypeID.LookUpMemberID : null,
                ApprovedDate: (vm.projectCloseOutInfoSelected.ApprovedDate != null && vm.projectCloseOutInfoSelected.ApprovedDate != "") ? vm.projectCloseOutInfoSelected.ApprovedDate : null,
                ProjectDescription: vm.projectCloseOutInfoSelected.ProjectDescription != null ? vm.projectCloseOutInfoSelected.ProjectDescription : null,
                DetailedDescription: vm.projectCloseOutInfoSelected.DetailedDescription != null ? vm.projectCloseOutInfoSelected.DetailedDescription : null,
                TargetEndState: vm.projectCloseOutInfoSelected.TargetEndState != null ? vm.projectCloseOutInfoSelected.TargetEndState : null,
                BenefitsRealized: vm.projectCloseOutInfoSelected.BenefitsRealizedOutcome != null ? vm.projectCloseOutInfoSelected.BenefitsRealizedOutcome : null,
                ParentProgramID: (vm.SelectedParentProject != null && vm.SelectedParentProject.ProblemUniqueID != "") ? vm.SelectedParentProject.ProblemUniqueID : null,
                SponserID: sponsorID != '' ? sponsorID : null,
                SponsorName: sponsorName != '' ? sponsorName : null,
                ProjectManagerID: pmID != '' ? pmID : null,
                ProjectManagerName: pmName != '' ? pmName : null,
                IsGoodPractise: vm.projectCloseOutInfoSelected.IsGoodPractise != null ? vm.projectCloseOutInfoSelected.IsGoodPractise : null,
                KeyTakeaways: vm.projectCloseOutInfoSelected.KeyTakeaways != null ? vm.projectCloseOutInfoSelected.KeyTakeaways : null,
                BudgetComment: vm.projectCloseOutInfoSelected.BudgetComment != null ? vm.projectCloseOutInfoSelected.BudgetComment : null,
                Field1: (vm.projectCloseOutInfoSelected.Field1 != null && vm.SelectedParentProject.Field1 != "") ? vm.projectCloseOutInfoSelected.Field1 : null,
                Field2: (vm.projectCloseOutInfoSelected.Field2 != null && vm.SelectedParentProject.Field2 != "") ? vm.projectCloseOutInfoSelected.Field2 : null,
                Field3: (vm.projectCloseOutInfoSelected.Field3 != null && vm.SelectedParentProject.Field3 != "") ? vm.projectCloseOutInfoSelected.Field3 : null,
                Field4: (vm.projectCloseOutInfoSelected.Field4 != null && vm.SelectedParentProject.Field4 != "") ? vm.projectCloseOutInfoSelected.Field4 : null,
                Field5: (vm.projectCloseOutInfoSelected.Field5 != null && vm.SelectedParentProject.Field5 != "") ? vm.projectCloseOutInfoSelected.Field5 : null
            };


            listdataKeySuccess.push(vm.insertUpdateDeleteKeySuccess);
            listdataLL.push(vm.insertUpdateDeleteLL);
            listdataProjectCloseOutInfo.push(vm.projectCloseOutInfoSelectedData);

            var dataToSend = { "ProjectID": vm.projectCloseOutInfoSelected.ProjectID, "objKeySuccess": JSON.stringify(listdataKeySuccess), "objLessonsLearnt": JSON.stringify(listdataLL), "objProjectCloseOutInfo": JSON.stringify(listdataProjectCloseOutInfo), "objMilestone": JSON.stringify(milestoneUpdateListItems), "objBalelineLog": JSON.stringify(logUpdateListItems), "userId": currentUserId };
            GETPostService.postDataWCFAsync('projectCloseOutUpdate', dataToSend).then(function (response) {
                //alert(response);
                if (response == "Success") {

                    angular.copy(vm.SelectedParentProject, originalParentProjCharter);

                    //dropdownSetValuePC();
                    OriginalPCdata = {};

                    angular.copy(vm.projectCloseOutInfoSelected, OriginalPCdata);

                    hideLoading();
                    getDataForCloseOutGrids();

                    $.when(GETPostService.postDataWCF("getProjectNameByID", SeletedProjectId))
                        .then(function (resProjectName) {
                            var ProjDetail = JSON.parse(resProjectName.getProjectNameByIDResult);
                            SeletedProjectName = ProjDetail[0].ProjectName;
                            $rootScope.$emit("UpdateProjectNameHub", SeletedProjectName);
                            $rootScope.$emit("ProjectHubGetCall", SeletedProjectName);
                            $rootScope.$emit("overallStatusProjectCharter");
                            $rootScope.$emit("UpdateHubSchedule");
                            if (IsProgram) {
                                $rootScope.$emit("getProgramHubOverallData");
                            }
                            else {
                                $rootScope.$emit("getProjectHubOverallData");
                            }


                        });


                    $rootScope.$emit("UpdateGeneralInfo", true);
                    alert(saveMessage);

                }
                else {
                    hideLoading();
                    alert("Error occurred in Project Charter Update");

                    var dataToSendErr = {
                        "method": "updateProjectCloseOutInfo", "exceptionMessage": "message:" + response, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                        .then(function (response) {
                            console.log(response.message);
                        });

                }
            });
        }
        catch (err) {
            hideLoading();
            var dataToSendErr = {
                "method": "updateProjectCloseOutInfo", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    }
    function InitkGridMilestoneVariance() {
        try {
            var col = [
                 {
                     template: "#if(link == 1) {#<span class='k-icon k-i-link-vertical'></span>#}" +
                    "else if(ChildLink == 1) {#<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>#}#",
                     title: " ",
                     width: "4%",
                 },
                {
                    field: "Milestone",
                    title: "Milestone",
                    width: "20%",
                    template: function (e) {
                        var value = "";
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
                        return value;
                    }
                },
                {
                    field: "BaselineFinish",
                    title: "Baseline Finish",
                    width: "15%",
                    //format: "{0:MM/dd/yyyy}",
                    template: "#= BaselineFinish ==null ? '' : kendo.toString(kendo.parseDate(new Date(BaselineFinish), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
                },
                {
                    field: "CompletionDate",
                    title: "Completion Date",
                    width: "15%",
                    //format: "{0:MM/dd/yyyy}",
                    template: "#= CompletionDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(CompletionDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
                },
                {
                    field: "Variance",
                    title: "Variance (Days)",
                    width: "15%",
                    editable: false,
                    template: "#=Variance == ''?'':( Variance == 'NA'? 'NA': Variance +' days')#",
                    //attributes: { "class": "txt-float-R" },
                },
                 {
                     field: "Comments",
                     title: "Comment",
                     width: "20%",
                 },
                {
                    title: "Include In Report (Max 20)",
                    headerAttributes: { "class": "wrap-header" },
                    template: CheckBoxMilestoneEdit,
                    width: "5%"
                },
            ];
            var scheduleDataSource = new kendo.data.DataSource({
                transport: {
                    read: function (e) {
                        // on success
                        e.success(gridMilestoneVariance);
                    }
                },
                sort: [{ field: "BaselineFinish", dir: "asc" },
                   { field: "PlannedFinish", dir: "asc" }, { field: "CompletionDate", dir: "asc" }],
                batch: true,
                //pageSize: 20,
                schema: {
                    model: {
                        id: "ScheduleUniqueID",
                        fields: {
                            ScheduleUniqueID: { editable: false, nullable: true },
                            Milestone: {
                                type: "string", editable: false
                            },
                            BaselineFinish: { type: "date", defaultValue: null, editable: false },
                            CompletionDate: { type: "date", defaultValue: null, editable: false },
                            Variance: {
                                type: "string", editable: false,
                            },
                            Comments: { type: "string", editable: vm.isEditable },
                            IncludeInCloseout: { type: "boolean", editable: vm.isEditable }
                        }
                    }
                }
            });
            $("#gridProjectCloseOutMilestoneVariance").kendoGrid({
                dataSource: scheduleDataSource,
                columns: col,
                selectable: true,
                editable: true,
                sortable: true,
                navigatable: true,
                dataBound: function () {

                    $(".milestoneVarianeChkbx").bind("change", function (e) {
                        var grid = $("#gridProjectCloseOutMilestoneVariance").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));
                        dataItem.set("IncludeInCloseout", this.checked);
                    });
                }
            });
            $("#gridProjectCloseOutMilestoneVariance").kendoTooltip({
                filter: "td:nth-child(1)", //this filter selects the fifth column's cells
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
                    var dataItem = $("#gridProjectCloseOutMilestoneVariance").data("kendoGrid").dataItem(e.target.closest("tr"));
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
            hideLoading();
            var dataToSend = {
                "method": "InitkGridMilestoneVariance", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };
    var CheckBoxMilestoneEdit = function (item) {
        if (vm.isEditable == false) {
            if (item.IncludeInCloseout == true) {
                return dirtyField(item, 'IncludeInCloseout') + '<input disabled="disabled" checked type="checkbox" class="milestoneVarianeChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCloseout') + '<input disabled="disabled" type="checkbox" class="milestoneVarianeChkbx" />';
            }
        }
        else {
            if (item.IncludeInCloseout == true) {
                return dirtyField(item, 'IncludeInCloseout') + '<input type="checkbox" checked class="milestoneVarianeChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCloseout') + '<input type="checkbox" class="milestoneVarianeChkbx" />';
            }
        }
    };
    function InitKendoGridBaselineLog() {
        try {
            var scheduleDataSource = new kendo.data.DataSource({
                transport: {
                    read: function (e) {
                        // on success
                        e.success(gridDataBaselineLog);
                    }
                },
                sort: [{ field: "BaselineCount", dir: "asc" },
                           { field: "ModifiedDate", dir: "asc" }],
                batch: true,
                //pageSize: 20,
                schema: {
                    model: {
                        id: "BaselineLogID",
                        fields: {
                            BaselineLogID: { editable: false },
                            BaselineCount: { editable: false },
                            TeamMemberName: {
                                type: "string", editable: false
                            },
                            ModifiedDate: { type: "date", defaultValue: null, editable: false },
                            BaselineComment: {
                                type: "string", editable: IsCommentEditable
                            },
                            IncludeInCloseout: { type: "boolean", editable: IsBaselineCloseOutEditable }
                        }
                    }
                }
            });
            $("#gridProjectCloseOutScheduleVariance").kendoGrid({
                dataSource: scheduleDataSource,
                groupable: false,
                sortable: true,
                editable: true,
                dataBound: function () {

                    $(".scheduleVarianeChkbx").bind("change", function (e) {
                        var grid = $("#gridProjectCloseOutScheduleVariance").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));
                        dataItem.set("IncludeInCloseout", this.checked);
                    });
                },
                columns: [

                {
                    field: "BaselineCount",
                    title: "Baseline",
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
                    title: "Baseline Justification",
                    editor: textAreaEditor
                },
                {
                    title: "Include In Report (Max 10)",
                    headerAttributes: { "class": "wrap-header" },
                    template: CheckBoxScheduleVarianceEdit,
                    width: "15%"
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
    var CheckBoxScheduleVarianceEdit = function (item) {
        if (IsBaselineCloseOutEditable == false) {
            if (item.IncludeInCloseout == true) {
                return dirtyField(item, 'IncludeInCloseout') + '<input disabled="disabled" checked type="checkbox" class="scheduleVarianeChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCloseout') + '<input disabled="disabled" type="checkbox" class="scheduleVarianeChkbx" />';
            }
        }
        else {
            if (item.IncludeInCloseout == true) {
                return dirtyField(item, 'IncludeInCloseout') + '<input type="checkbox" checked class="scheduleVarianeChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCloseout') + '<input type="checkbox" class="scheduleVarianeChkbx" />';
            }
        }

    };
    function criticalityEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: criticalityData,
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
    function functiongroupEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: functionalgroupData,
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
    function submittedByUserDropDownEditor(container, options) {
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
                                dataSource: submittedUsers,
                                change: function (e) {
                                    if (e.sender.selectedIndex != -1) {
                                        var user = submittedUsers.filter(function (val) {
                                            return val.value == e.sender.dataItem(e.item).value;
                                        });
                                        if (user.length == 0) {
                                            submittedUsers.push({
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
                        angular.copy(submittedUsers, resources);
                        angular.forEach(response, function (item, index) {
                            var user = submittedUsers.filter(function (val) {
                                return val.value === item.UserADId;
                            });
                            if (user.length == 0) {
                                resources.push({
                                     text: item.UserDisplayName, value: item.UserADId, UserCountry: item.UserCountry,
                                     UserEmailAddress: item.UserEmailAddress, UserImageUrl: item.UserImageUrl,UserDepartment: item.UserDepartment

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
                        "method": "SubmittedByUserDropDownEditor", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                          .then(function (response) {
                              // alert(errormessage);
                          });
                }
            });

        });
    }
    function actionOwnerUserDropDownEditor(container, options) {
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
                                dataSource: actionOwnerUsers,
                                change: function (e) {
                                    if (e.sender.selectedIndex != -1) {
                                        var user = actionOwnerUsers.filter(function (val) {
                                            return val.value == e.sender.dataItem(e.item).value;
                                        });
                                        if (user.length == 0) {
                                            actionOwnerUsers.push({
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
                        angular.copy(actionOwnerUsers, resources);
                        angular.forEach(response, function (item, index) {
                            var user = actionOwnerUsers.filter(function (val) {
                                return val.value === item.UserADId;
                            });
                            if (user.length == 0) {
                                resources.push({
                                    text: item.UserDisplayName, value: item.UserADId, UserCountry: item.UserCountry,
                                    UserEmailAddress: item.UserEmailAddress, UserImageUrl: item.UserImageUrl, UserDepartment: item.UserDepartment
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
                        "method": "actionOwnerUserDropDownEditor", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                          .then(function (response) {
                              // alert(errormessage);
                          });
                }
            });

        });
    }
    function textAreaEditor(container, options) {
        $('<textarea class="k-textbox" name="' + options.field + '" style="width:100%;height:100%;" />').appendTo(container);
    }
    function GetBudgetFieldStaus(fieldname) {
        var status = 0;
        switch (fieldname) {
            case budgetField1:
                status = vm.projectCloseOutInfoSelected.Field1;
                break;
            case budgetField2:
                status = vm.projectCloseOutInfoSelected.Field2;
                break;
            case budgetField3:
                status = vm.projectCloseOutInfoSelected.Field3;
                break;
            case budgetField4:
                status = vm.projectCloseOutInfoSelected.Field4;
                break;
            case budgetField5:
                status = vm.projectCloseOutInfoSelected.Field5;
                break;
        }
        return status;
    }
    function initProjectCloseOut() {

    };
};