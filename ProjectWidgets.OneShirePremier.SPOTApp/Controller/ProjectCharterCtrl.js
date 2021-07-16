//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('ProjectCharterCtrl', ProjectCharterCtrl)
ProjectCharterCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function ProjectCharterCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    vm.agileVisibleCharter = false;
    vm.buildNo = buildNo;
    vm.releaseDate = releaseDate;
    //Object
    vm.SelectedProject = {};
    vm.projectCharterInfoSelected = {};
    vm.dsProjectCharterInfo = [];
    vm.riskIssueType = [];
    vm.scheduleData = [];
    vm.isEditable = false;
    vm.projectVisible = true;
    vm.programVisible = false;
    var dialogbind = false;
    vm.isPortfolioOwnerEditablePC = false;
    //var charterDataSaved = false;
    vm.projectCharterPagepath = projectCharterPagepath;
    vm.projectCharter = projectCharter;
    vm.trackEventFunc = trackEventFunc;
    vm.deletedMilestoneData = [];
    vm.deletedRiskData = [];
    vm.deletedKeySuccessData = [];
    vm.deletedAssumptionData = [];
    vm.deletedTeamsData = [];
    vm.deletedFundingData = [];
    vm.dateFormatlabel = dateLabel;
    vm.dateErrorMsg = InValidDateFormat;
    var gridDataRiskIssue = [];
    var gridDataTeam = [];
    var gridDataSchedule = [];
    var gridDataKeySuccess = [];
    var gridDataAssumption = [];
    var gridDataFunding = [];
    var milestoneToAdd = [];
    var riskIssueTypeBulk = [];
    var fundingTypeValues = [];
    var fundingSourceValues = [];
    var functionalgroupBulk = [];
    var rolesBulk = [];
    //var usergroups = [];
    var primaryKpiGrid = [];
    var charterCount = 0;
    var projectTeam = [];
    var dataToSendForRisk;
    var dataToSendForMilestone;
    var className = "ProjectCharterCtrl";
    var originalParentProjCharter = {};
    var SelectedParentProjCharter = {};
    var parentProjChangeCharter = false;
    var gridCharterCapsData = [];
    var gridCharterCapsDataAllPortfolio = [];
    var grdMilestoneTemplate = [];
    var grdMilestoneTemplateDetail = [];
    var WaterWasteDataSetCharter = [];
    var gridCapsDataWaterWasteCharter = [];
    var WaterWasteOptionsCharter = [];
    var WaterWasteTypeOptionsCharter = [];
    var WaterWasteCategoryOptionsCharter = [];
    var deletedWaterWasteCharter = [];
    //Functions
    vm.initProjectCharter = initProjectCharter;
    vm.InitkGridProjectCharterKeySuccessCriteria = InitkGridProjectCharterKeySuccessCriteria;
    vm.InitkGridProjectCharterMilestone = InitkGridProjectCharterMilestone;
    vm.InitkGridProjectCharterRisk = InitkGridProjectCharterRisk;
    vm.InitkGridProjectTeam = InitkGridProjectTeam;
    vm.InitkGridProjectCharterFunding = InitkGridProjectCharterFunding;
    //vm.Init_PCProject = Init_PCProject;
    // vm.UpdateProjectDetails = UpdateProjectDetails;
    vm.updateProjectCharterInfo = updateProjectCharterInfo;
    vm.openProjectCharterInfo = openProjectCharterInfo;
    vm.AddNewRow = AddNewRow;
    vm.gridAddDefaultRows = gridAddDefaultRows;
    vm.changeAgile = changeAgile;
    vm.onChangeCarbonImpact = onChangeCarbonImpact;
    vm.onChangeEnergyCostImpactCharter = onChangeEnergyCostImpactCharter;
    vm.onChangeWWCostImpactCharter = onChangeWWCostImpactCharter;
    vm.AddMilestoneCharter = AddMilestoneCharter;
    vm.CheckBulkEditGridUpdate = CheckBulkEditGridUpdate;
    vm.capsProjectTooltipCh = capsProjectTooltip;
    vm.environmentalTootltipCh = environmentalTootltip;
    var permissionbulk = [];
    var OriginalPCdata = {};
    vm.localCurrencyAbbrePlaceholder;
    vm.localCurrencyAbbre;
    vm.isCapsProjectChecked = true;
    vm.isUnitCost = null;
    vm.isUnitCostWWC = null;
    var beforeSaveGriddata = [];
    vm.options = {
        format: "n1",
        decimals: 1,
        min: 0,
        restrictDecimals: true
    };
    vm.optionsCurrency = {
        format: "n0",
        decimals: 0,
        min: 0,
        restrictDecimals: true
    };
    vm.optionsCostImpact = {
        format: "n0",
        decimals: 0,
        restrictDecimals: true
    };

    function AddNewRow(gridName) {
        if (gridName == 'gridCapsWaterWasteCharter') {
            if ($("#" + gridName).data("kendoGrid").dataSource.data().length >= 10) {
                alert(moreThanTenRowsInGrid);
                return
            }
        }

        var gridNew = $("#" + gridName).data("kendoGrid");

        var sorting = gridNew.dataSource.sort();
        if (sorting) {
            gridNew.dataSource.sort(null);
        }
        gridNew.addRow();
    };
    function gridAddDefaultRows() {
        if (vm.isEditable) {
            AddNewRow("gridProjectCharterKeySuccessCriteria");
            AddNewRow("gridProjectCharterMilestone");
            AddNewRow("gridProjectTeam");
            AddNewRow("gridProjectCharterRisk");
            AddNewRow("gridProjectCharterAssumption");
            AddNewRow("gridProjectCharterFunding1");
        }
    };
    function changeAgile(agileVal, e) {
        if (agileVal == true)
            vm.agileVisibleCharter = true;
        else {

            if (!confirm(agileTypeClearMessage)) {
                e.preventDefault();
            }
            else {
                vm.agileVisibleCharter = false;
                vm.selectedAgilePrimaryWorkstream = "";
                vm.agileSecWorkstreamIds = "";
                vm.selectedAgileWave = "";
            }
        }
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
                vm.pcApprovedDateError = false;
            }
            $scope.$digest();
        });
    };

    var CheckBoxKeySuccessEdit = function (item) {
        if (vm.isEditable == false)
            return '<input type="checkbox" #= item.IncludeInCharter ? checked="checked" : "" # class="successchkbx" disabled="disabled"/>';
        else
            return '<input type="checkbox" #= item.IncludeInCharter ? \'checked="checked"\' : "" # class="successchkbx" />';
    };
    var CheckBoxMilestoneEdit = function (item) {
        if (vm.isEditable == false) {
            if (item.IncludeInCharter == true) {
                return dirtyField(item, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="milestoneChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="milestoneChkbx" />';
            }
        }
        else {
            if (item.IncludeInCharter == true) {
                return dirtyField(item, 'IncludeInCharter') + '<input type="checkbox" checked class="milestoneChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCharter') + '<input type="checkbox" class="milestoneChkbx" />';
            }
        }
    };
    var CheckTeamEdit = function (item) {
        if (vm.isEditable == false) {
            if (item.IncludeInCharter == true) {
                return dirtyField(item, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="teamChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="teamChkbx" />';
            }
        }
        else {
            if (item.IncludeInCharter == true) {
                return dirtyField(item, 'IncludeInCharter') + '<input type="checkbox" checked class="teamChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCharter') + '<input type="checkbox" class="teamChkbx" />';
            }
        }
    };
    var CheckRiskEdit = function (item) {
        if (vm.isEditable == false) {
            if (item.IncludeInCharter == true) {
                return dirtyField(item, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="riskChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="riskChkbx" />';
            }
        }
        else {
            if (item.IncludeInCharter == true) {
                return dirtyField(item, 'IncludeInCharter') + '<input type="checkbox" checked class="riskChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCharter') + '<input type="checkbox" class="riskChkbx" />';
            }
        }
    };
    var CheckFundingEdit = function (item) {
        if (vm.isEditable == false) {
            if (item.IncludeInCharter == true) {
                return dirtyField(item, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="fundChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="fundChkbx" />';
            }
        }
        else {
            if (item.IncludeInCharter == true) {
                return dirtyField(item, 'IncludeInCharter') + '<input type="checkbox" checked class="fundChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCharter') + '<input type="checkbox" class="fundChkbx" />';
            }
        }
    };
    var CheckAssumpEdit = function (item) {
        if (vm.isEditable == false) {
            if (item.IncludeInCharter == true) {
                return dirtyField(item, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="assumptionChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="assumptionChkbx" />';
            }
        }
        else {
            if (item.IncludeInCharter == true) {
                return dirtyField(item, 'IncludeInCharter') + '<input type="checkbox" checked class="assumptionChkbx" />';
            }
            else {
                return dirtyField(item, 'IncludeInCharter') + '<input type="checkbox" class="assumptionChkbx" />';
            }
        }
    };

    var dirtyField = function (data, fieldName) {
        if (data.dirty && data.dirtyFields[fieldName]) {
            return "<span class='k-dirty'></span>";
        }
        else {
            return "";
        }
    };
    function InitkGridProjectCharterKeySuccessCriteria() {
        try {

            //var col = col_BusinessCaseOption_gridProjectCharterKeySuccessCriteria();
            var col = [
                {
                    field: "KPIID",
                    title: "Associated KPI",
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
                    //field: "IncludeInCharter",
                    title: "Include in Charter (Max 3)",
                    headerAttributes: { "class": "wrap-header" },
                    template: function (e) {
                        if (vm.isEditable == false) {
                            if (e.IncludeInCharter == true) {
                                return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="successchkbx" />';
                            }
                            else {
                                return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="successchkbx" />';
                            }
                        }
                        else {
                            if (e.IncludeInCharter == true) {
                                return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="successchkbx" />';
                            }
                            else {
                                return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="successchkbx" />';
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

                                    var grid = $("#gridProjectCharterKeySuccessCriteria").data("kendoGrid");
                                    grid.removeRow(tr);

                                    $scope.$digest();
                                }
                            }
                            catch (err) {
                                hideLoading();
                                var dataToSend = {
                                    "method": "InitkGridProjectCharterKeySuccessCriteria_click", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
                            KPIID: { type: "string", editable: vm.isEditable },
                            Metric: {
                                type: "string", editable: vm.isEditable
                                //validation: { required: true }
                            },
                            CurrentState: { type: "string", editable: vm.isEditable },
                            TargetPerformance: { type: "string", editable: vm.isEditable },
                            IncludeInCharter: { type: "boolean", editable: vm.isEditable }
                        }
                    }
                },
            });
            $("#gridProjectCharterKeySuccessCriteria").kendoGrid({
                dataSource: dataSource1,
                columns: col,
                navigatable: true,
                editable: {
                    createAt: "bottom"
                },
                dataBound: function () {
                    $(".successchkbx").bind("change", function (e) {
                        var grid = $("#gridProjectCharterKeySuccessCriteria").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));

                        var cell = e.target.closest('td');
                        $(cell).prepend("<span class='k-dirty'></span>");

                        dataItem.set("IncludeInCharter", this.checked);
                        //dataItem.dirty = true;
                    });
                }

            });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitkGridProjectCharterKeySuccessCriteria", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
    function InitkGridProjectCharterMilestone() {
        try {
            var col = [
                {
                    title: " ",
                    width: "4%",
                    template:
                        function (e) {
                                if (e.link == 1)
                                    return "<span class='k-icon k-i-link-vertical'></span>";
                                else if (e.ChildLink==1)
                                    return "<span class='k-icon k-i-unlink-horizontal' style='color:blue;'></span>";
                            else {
                                return "";
                            }
                        }
                },
                {
                    field: "Milestone",
                    title: "Milestone",
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
                    //filterable: true,
                }, {
                    field: "PlannedFinish",
                    title: "Planned Finish (mm/dd/yyyy)",
                    format: "{0:MM/dd/yyyy}",
                    // template: "#= PlannedFinish ==null ? '' : kendo.toString(kendo.parseDate(new Date(PlannedFinish), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
                    //filterable: true,
                }, {
                    field: "FunctionGroupID",
                    title: "Functional Owner",
                    values: functionalgroupBulk,
                    editor: FunctionalOwnerDropDownEditor
                    //filterable: true,
                }, {
                    //field: "IncludeInCharter",
                    title: "Include In Charter (Max 10)",
                    headerAttributes: { "class": "wrap-header" },
                    template: CheckBoxMilestoneEdit// '<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="milestoneChkbx" />',
                }, {
                    hidden: !(vm.isEditable),
                    command: [{
                        name: " ",
                        iconClass: "k-icon k-i-close",
                        width: "10%",
                        visible: function (dataItem) {
                            if (dataItem.MilestoneType == 1)
                                return false;
                            else if (dataItem.MilestoneType == 2)
                                return false;
                            else
                                return true;
                        },
                        click: function (e) {
                            // prevent page scroll position change
                            if (!confirm(gridDeleteMessage))
                                e.preventDefault();
                            else {
                                e.preventDefault();
                                // e.target is the DOM element representing the button
                                var tr = $(e.target).closest("tr"); // get the current table row (tr)
                                // get the data bound to the current table row
                                var data = this.dataItem(tr);
                                if (data.ScheduleUniqueID != 'undefined' && data.ScheduleUniqueID != "")
                                    vm.deletedMilestoneData.push({ "ScheduleUniqueID": data.ScheduleUniqueID });
                                var grid = $("#gridProjectCharterMilestone").data("kendoGrid");
                                grid.removeRow(tr);
                                $scope.$digest();
                            }
                        }
                    }]
                }];
            var scheduleDataSource = new kendo.data.DataSource({
                //data: gridDataSchedule,
                transport: {
                    read: function (e) {
                        // on success
                        e.success(gridDataSchedule);
                    }
                },
                sort: [{ field: "PlannedFinish", dir: "asc" }],
                batch: true,
                //pageSize: 20,
                schema: {
                    model: {
                        id: "ScheduleUniqueID",
                        fields: {
                            ScheduleUniqueID: { editable: false, nullable: true },
                            Milestone: {
                                type: "string", editable: vm.isEditable
                            },
                            PlannedFinish: { type: "date", defaultValue: null, editable: vm.isEditable },
                            FunctionGroupID: { type: "string", editable: vm.isEditable },
                            IncludeInCharter: { type: "boolean", editable: vm.isEditable }
                        }
                    }
                }
            });
            $("#gridProjectCharterMilestone").kendoGrid({
                dataSource: scheduleDataSource,
                columns: col,
                selectable: true,
                sortable: true,
                navigatable: true,
                editable: {
                    createAt: "bottom"
                },
                dataBound: function () {

                    $(".milestoneChkbx").bind("change", function (e) {
                        var grid = $("#gridProjectCharterMilestone").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));
                        dataItem.set("IncludeInCharter", this.checked);
                        //   milestoneCount = $(":checked", grid.element).length;
                        // if (milestoneCount <= milestoneCharterCount)

                        //else {
                        //   alert(milestoneCountMessage);
                        //    e.preventDefault();
                        // }
                    });
                }
            });
            
            $("#gridProjectCharterMilestone").kendoTooltip({
                filter: "td:nth-child(1)", //this filter selects the first column's cells
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
                    var dataItem = $("#gridProjectCharterMilestone").data("kendoGrid").dataItem(e.target.closest("tr"));
                    var content = "";
                   
                    if (IsProgram) {
                        if (dataItem.ChildLink == 0 && dataItem.LinkedProjects != "") {
                            content = "<div class='prgmtooltip'>" + linkedFromMilestone + dataItem.LinkedProjects + "</div>";
                        }
                        if (dataItem.ChildLink == 1 && dataItem.LinkedProjects != "") {
                            content = "<div class='prgmtooltip'>" + linkedToMilestone + dataItem.LinkedProjects + "</div>";
                        }
                    }
                    else {
                        if (dataItem.ChildLink == 1 && dataItem.LinkedParentProjects != "") {
                            content = "<div class='prgmtooltip'>" + linkedToMilestone + dataItem.LinkedParentProjects + "</div>";
                        }
                    }
                    return content;
                }
            }).data("kendoTooltip");

        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitkGridProjectCharterMilestone", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
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
    function InitkGridProjectTeam() {
        try {
            //var col = col_ProjectCharter_GridProjectTeam();
            projectTeam = [];
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
            var col = [{
                field: "RoleID",
                title: "Role Name",
                values: rolesBulk,
                editor: roleDropDownEditor,
                width: "20%",
            }, {
                field: "TeamMemberAdId",
                title: "Team Member",
                values: projectTeam,
                editor: userDropDownEditor,
                template: function (e) {
                    if (e.TeamMemberAdId != null) {
                        var teamMember;
                        teamMember = projectTeam.filter(function (entry) {
                            return entry.value == e.TeamMemberAdId;
                        });
                        if (teamMember.length > 0) {
                            e.TeamMemberName = teamMember[0].text;
                        }
                        else {
                            e.TeamMemberName = "";
                            e.TeamMemberAdId = "";
                        }
                    }
                    return e.TeamMemberName;
                },
                width: "35%",
            },
            {
                field: "TeamPermissionID",
                title: "Permission",
                values: permissionbulk,
                width: "0%",
                hidden: true
            },
            {
                field: "PercentTime",
                title: "% Time",
                width: "12%",
                attributes: { class: "txt-float-R" },
                headerAttributes: { "class": "wrap-header align-right" },
            },
            {
                field: "Duration",
                title: "Duration (Months)",
                width: "12%",
                format: "{0:n0}",
                decimals: 0,
                min: 0,
                restrictDecimals: false,
                attributes: { class: "txt-float-R" },
                headerAttributes: { "class": "wrap-header align-right" },
            },

            {
                //field: "IncludeInCharter",
                title: "Include in Charter (Max 10)",
                headerAttributes: { "class": "wrap-header" },
                template: CheckTeamEdit, //'<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="teamChkbx" />',
                width: "17%"
            },

            {
                hidden: !(vm.isEditable),
                command: [{
                    name: " ",
                    iconClass: "k-icon k-i-close",
                    width: "5%",
                    click: function (e) {
                        // prevent page scroll position change
                        if (!confirm(gridDeleteMessage))
                            e.preventDefault();
                        else {
                            e.preventDefault();
                            // e.target is the DOM element representing the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            if (data.ProjectTeamUniqueID != 'undefined' && data.ProjectTeamUniqueID != "")
                                vm.deletedTeamsData.push({ "ProjectTeamUniqueID": data.ProjectTeamUniqueID });

                            var grid = $("#gridProjectTeam").data("kendoGrid");
                            grid.removeRow(tr);

                            $scope.$digest();
                        }
                    }
                }]
            }];
            var projectTeamDataSource1 = new kendo.data.DataSource({
                //data: gridDataTeam,
                transport: {
                    read: function (e) {
                        // on success
                        e.success(gridDataTeam);
                    }
                },
                sort: [{ field: "Role", dir: "asc" }],
                batch: true,
                //pageSize: 20,
                schema: {
                    model: {
                        id: "ProjectTeamUniqueID",
                        fields: {
                            ProjectTeamUniqueID: { editable: false, nullable: true },
                            RoleID: {
                                type: "string", editable: vm.isEditable
                            },
                            Role: {
                                type: "string", editable: vm.isEditable
                            },
                            TeamMemberAdId: { type: "string", editable: vm.isEditable },
                            TeamMemberName: { type: "string", editable: vm.isEditable },
                            PercentTime: {
                                type: "number", validation: { min: 0, max: 100, maxlength: 4 }, editable: vm.isEditable
                            },
                            Duration: { type: "number", validation: { min: 0, maxlength: 6 }, editable: vm.isEditable },
                            IncludeInCharter: { type: "boolean", editable: vm.isEditable },
                            TeamPermissionID: { type: "string", editable: vm.isEditable }
                        }
                    }
                }
            });
            $("#gridProjectTeam").kendoGrid({
                dataSource: projectTeamDataSource1,
                columns: col,
                selectable: true,
                //navigatable: true,
                editable: {
                    createAt: "bottom"
                },
                dataBound: function () {

                    $(".teamChkbx").bind("change", function (e) {
                        var grid = $("#gridProjectTeam").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));

                        dataItem.set("IncludeInCharter", this.checked);

                    });
                },
                edit: function (e) {
                    var grid = this;
                    var roleId = e.model.RoleID;
                    var userID = e.model.TeamMemberAdId;
                    var fieldName = grid.columns[e.container.index()].field;
                    if (fieldName == "RoleID") {
                        if (roleId == projectmanager || roleId == projectSponsor) {
                            this.closeCell();
                        }
                    }


                }
            });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitkGridProjectTeam", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };
    function roleDropDownEditor(container, options) {
        $('<input class="peoplePickerNoImage" name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                placeholder: "Select and/or Type to Search",
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
    }

    function userDropDownEditor(container, options) {
        $('<input name="' + options.field + '" id="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                placeholder: peoplepickerPlaceholder,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                minLength: 3,
                filtering: function (e) {
                    e.preventDefault();
                },
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
                valueTemplate: '<span class="selected-value" style="background-image:url(#: UserImageUrl#)"></span><span>#: text#</span>',

                template: "<span class='k-state-default' style=background-image:url(#: UserImageUrl#)></span><span class='k-state-default'><h3>#: text#</h3># if (UserEmailAddress != null) {#<p>#: UserEmailAddress#</p># } if (UserDepartment != null) {# <p><span> #:UserDepartment#</span># }if (UserCountry != null) {# <span>#:UserCountry#</span></p># } #</span>"
            });
        $("#" + options.field).data("kendoComboBox").input.on('keydown', function (e) {
            if (e.currentTarget.name != null) {
                GETPostService.searchPeopleBulkEdit(e, e.currentTarget.name.replace("_input", "")).then(function (response) {
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
                        // $("#gridProjectTeam").getKendoGrid().columns[1].values = projectTeam;

                    }
                });
            }
        });
    }

    function InitkGridProjectCharterRisk() {
        try {
            var colAssump = [{
                field: "KeyAssumption",
                title: "Key Assumption",
            }, {
                field: "AssumptionRationale",
                title: "Why Is This Assumption Valid?",
            }, {
                // field: "IncludeInCharter",
                title: "Include in Charter (Max 5)",
                headerAttributes: { "class": "wrap-header" },
                template: CheckAssumpEdit //'<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="assumptionChkbx" />',
            }, {
                hidden: !(vm.isEditable),
                command: [{
                    name: " ",
                    iconClass: "k-icon k-i-close",
                    width: "5%",
                    click: function (e) {
                        // prevent page scroll position change
                        if (!confirm(gridDeleteMessage))
                            e.preventDefault();
                        else {
                            e.preventDefault();
                            // e.target is the DOM element representing the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            if (data.KeyAssumptionUniqueID != 'undefined' && data.KeyAssumptionUniqueID != "")
                                vm.deletedAssumptionData.push({ "KeyAssumptionUniqueID": data.KeyAssumptionUniqueID });

                            var grid = $("#gridProjectCharterAssumption").data("kendoGrid");
                            grid.removeRow(tr);
                            $scope.$digest();
                        }
                    }
                }]
            }];

            var colRisk = [{
                field: "RiskIssueUniqueID",
                title: "Id",
                hidden: true
            },
            {
                field: "ProjectID",
                title: "ProjectID",
                editable: false, hidden: true
            },
            {
                title: " ",
                width: "4%",
                template:
                    function (e) {
                        if (IsProgram) {
                            if (e.link == 1)
                                return "<span class='k-icon k-i-link-vertical'></span>";
                            else
                                return "";
                        }
                        else {
                            return "";
                        }
                    }
            },
            {
                field: "IfHappens",
                title: "If This Happens",
                headerAttributes: { "class": "wrap-header" },
                width: "20%",
                editable: function (e) { return vm.isEditable; }
                //template: "<input data-bind='value: Title' >"
            }, {
                field: "RiskIssueResult",
                title: "This Is The Result",
                headerAttributes: { "class": "wrap-header" },
                width: "18%"
                , editable: function (e) { return vm.isEditable; }
                // template: "<input data-bind='value: ThisIsResult' >"

            },
            {
                field: "Mitigation",
                title: "Mitigation",
                width: "15%", editable: function (e) { return vm.isEditable; }
                // template: "<input data-bind='value: Mitigation' >"
            }, {
                field: "RiskIssueTypeID",
                title: "Type",
                values: riskIssueTypeBulk, editable: function (e) { return vm.isEditable; }
            }, {
                //field: "IncludeInCharter",
                title: "Include in Charter (Max 5)",
                headerAttributes: { "class": "wrap-header" },
                width: "12%",
                //editor: customBoolEditor,ng-checked=\"isChecked(dataItem)\"
                template: CheckRiskEdit,//'<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="riskChkbx" />',
                // editable: function (e) { return false; }
            }, {
                hidden: !(vm.isEditable),
                command: [{
                    name: " ",
                    iconClass: "k-icon k-i-close",
                    width: "5%",
                    click: function (e) {
                        if (!confirm(gridDeleteMessage))
                            e.preventDefault();
                        else {
                            // prevent page scroll position change
                            e.preventDefault();
                            // e.target is the DOM element representing the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            if (data.RiskIssueUniqueID != 'undefined' && data.RiskIssueUniqueID != "")
                                vm.deletedRiskData.push({ "RiskIssueUniqueID": data.RiskIssueUniqueID });


                            var grid = $("#gridProjectCharterRisk").data("kendoGrid");
                            grid.removeRow(tr);
                            $scope.$digest();
                        }
                    }
                }]
            }
            ];
            var dsRisk = new kendo.data.DataSource({
                //data: gridDataRiskIssue,
                transport: {
                    read: function (e) {
                        // on success
                        e.success(gridDataRiskIssue);
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
                            IfHappens: { type: "string", editable: vm.isEditable },
                            // ProbabilityID: { type: "string" },
                            RiskIssueResult: { type: "string", editable: vm.isEditable },
                            //   ImpactID: { type: "string" },
                            Mitigation: { type: "string", editable: vm.isEditable },
                            RiskIssueTypeID: { editable: vm.isEditable },
                            //  CloseDate: { type: "date", format: "{0:yyyy/MM/dd}" },
                            IncludeInCharter: { type: "boolean", editable: vm.isEditable }
                        }
                    }
                }
            });

            $("#gridProjectCharterRisk").kendoGrid({
                dataSource: dsRisk,
                selectable: true,
                navigatable: true,
                editable: {
                    createAt: "bottom"
                },
                columns: colRisk,
                dataBound: function () {
                    $(".riskChkbx").bind("change", function (e) {
                        var grid = $("#gridProjectCharterRisk").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));
                        dataItem.set("IncludeInCharter", this.checked);
                    });
                }

            });
            if (IsProgram) {
                $("#gridProjectCharterRisk").kendoTooltip({
                    filter: "td:nth-child(3)", //this filter selects the fifth column's cells
                    position: "absolute",
                    width: 300,
                    content: function (e) {
                        var dataItem = $("#gridProjectCharterRisk").data("kendoGrid").dataItem(e.target.closest("tr"));
                        if (dataItem.ProblemID != null) {
                            var content = "<div class='prgmtooltip'>" + dataItem.ProblemID + " - " + dataItem.ProjectName + "</div>";
                            return content;
                        }
                        else { return ""; }
                    }
                }).data("kendoTooltip");
            }

            var dataSourceAssumption = new kendo.data.DataSource({
                // data: gridDataAssumption,
                transport: {
                    read: function (e) {
                        // on success
                        e.success(gridDataAssumption);
                    }
                },
                batch: true,
                //pageSize: 20,
                schema: {
                    model: {
                        id: "KeyAssumptionUniqueID",
                        fields: {
                            KeyAssumptionUniqueID: { editable: false, nullable: true },
                            KeyAssumption: { type: "string", editable: vm.isEditable },
                            AssumptionRationale: { type: "string", editable: vm.isEditable },
                            IncludeInCharter: { type: "boolean", editable: vm.isEditable }
                        }
                    }
                }
            });
            $("#gridProjectCharterAssumption").kendoGrid({
                dataSource: dataSourceAssumption,
                columns: colAssump,
                navigatable: true,
                editable: {
                    createAt: "bottom"
                },
                dataBound: function () {
                    $(".assumptionChkbx").bind("change", function (e) {
                        var grid = $("#gridProjectCharterAssumption").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));
                        dataItem.set("IncludeInCharter", this.checked);
                    });
                }
            });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitkGridProjectCharterRisk", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };


    function InitkGridProjectCharterFunding() {
        try {
            var col = col_ProjectCharter_GridProjectCharterFunding();
            var dataSource1 = new kendo.data.DataSource({
                // data: gridDataFunding,
                transport: {
                    read: function (e) {
                        // on success
                        e.success(gridDataFunding);
                    }
                },
                batch: true,
                //pageSize: 20,
                schema: {
                    model: {
                        id: "FundingUniqueID",
                        fields: {
                            FundingUniqueID: { editable: false, nullable: true },
                            FundingTypeID: {
                                type: "string", editable: vm.isEditable
                            },
                            //  TaskStartDate: { type: "date" },
                            FundingSourceID: { type: "string", editable: vm.isEditable },
                            // TaskDuration: { type: "number", validation: { required: true, min: 0 } },
                            FundingIntheplan: { type: "boolean", editable: vm.isEditable },
                            FundingAmount: { type: "number", validation: { min: 0, maxlength: 12 }, editable: vm.isEditable },
                            FundingNotes: { type: "string", editable: vm.isEditable },
                            IncludeInCharter: { type: "boolean", editable: vm.isEditable },
                        }
                    }
                }
            });
            $("#gridProjectCharterFunding1").kendoGrid({
                dataSource: dataSource1,
                columns: col,
                navigatable: true,
                editable: {
                    createAt: "bottom"
                },
                dataBound: function () {
                    $(".fundChkbx").bind("click", function (e) {
                        var grid = $("#gridProjectCharterFunding1").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));
                        dataItem.set("IncludeInCharter", this.checked);
                    });
                }
            });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitkGridProjectCharterFunding", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    }




    function col_ProjectCharter_GridProjectCharterFunding() {
        var col = [{
            field: "FundingTypeID",
            title: "Funding Type",
            values: fundingTypeValues
        }, {
            field: "FundingSourceID",
            title: "Funding Source",
            values: fundingSourceValues
        }, {
            field: "FundingIntheplan",
            title: "In the Plan",
            values: [{ "text": "Yes", "value": true }, { "text": "No", "value": false }]

        }, {
            field: "FundingAmount",
            title: "Amount " + vm.localCurrencyAbbre,
            format: "{0:n0}",
            decimals: 0,
            min: 0,
            restrictDecimals: true,
            attributes: { "class": "txt-float-R" },
            headerAttributes: { "class": "wrap-header align-right" },
        }, {
            field: "FundingNotes",
            title: "Notes",
        }, {
            field: "IncludeInCharter",
            title: "Include in Charter (Max 3)",
            headerAttributes: { "class": "wrap-header" },
            template: CheckFundingEdit//'<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="fundChkbx" />',
        }, {
            hidden: !(vm.isEditable),
            command: [{
                name: " ",
                iconClass: "k-icon k-i-close",
                width: "10%",
                click: function (e) {
                    if (!confirm(gridDeleteMessage))
                        e.preventDefault();
                    else {
                        // prevent page scroll position change
                        e.preventDefault();
                        // e.target is the DOM element representing the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        // get the data bound to the current table row
                        var data = this.dataItem(tr);
                        if (data.FundingUniqueID != 'undefined' && data.FundingUniqueID != "")
                            vm.deletedFundingData.push({ "FundingUniqueID": data.FundingUniqueID });


                        var grid = $("#gridProjectCharterFunding1").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        return col;
    };
    /**************************START : CAPS Grid************************************************/
    function InitKendoGridCapsCharter() {
        var dsCharterCaps = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(gridCharterCapsData);
                }
            },
            schema: {
                model: {
                    id: 'EmissionSourceID',
                    fields: {
                        EMSourceID: { hidden: true },
                        EMSourceName: { type: "string", editable: false },
                        EMUnit: { type: "number", validation: { maxlength: 10 }, editable: vm.isEditable  },
                        UnitOfMeasure: { type: "string", editable: false },
                        UnitCost: {
                            type: "number", editable: vm.isEditable ,
                            //validation: { min: 0 } //It is not working as we have editor defined to make the value positive only we have updated the min value in editor
                        },
                        EMBasisOfEstimate: { type: "string", editable: vm.isEditable  },
                        EMFactorImpact: { hidden: true }
                    }
                }
            }
        });

        $("#gridCapsCharter").kendoGrid({
            dataSource: dsCharterCaps,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: vm.isEditable,
            edit: function (e) {

                if (vm.projectCharterInfoSelected.startonImpact == true) {
                    $('#gridCapsCharter').data("kendoGrid").closeCell();
                }
                var grid = this;
                var fieldName = grid.columns[e.container.index()].field;
                if (e.container.find('[name="UnitCost"]').length > 0) {
                    e.container.find('[name="UnitCost"]').data('kendoNumericTextBox').bind('change', function () {
                        NullValueExist = true;

                        if (fieldName == "UnitCost") {
                            var grid1 = $("#gridCapsCharter").data("kendoGrid");
                            var data = grid1.dataSource.data();


                            var gridupdatedDataKey3 = $('#gridCapsCharter').data('kendoGrid').dataSource.data();


                            angular.forEach(gridupdatedDataKey3, function (item, index) {
                                if (item.UnitCost != null) {
                                    NullValueExist = false;
                                    return;
                                    //vm.isUnitCost = true;
                                }

                            });
                            if (!NullValueExist)
                                vm.isUnitCost = true;
                            else {
                                vm.isUnitCost = null;
                                vm.projectCharterInfoSelected.EnergyCostImpactPerYear = 0;
                            }
                        }
                        $scope.$digest();
                    });
                }
            },
            columns: [
                {
                    field: "EMSourceName",
                    title: "Emission Source",
                    headerAttributes: { "class": "wrap-header" },
                    width: "8%",
                    //groupHeaderTemplate: "#= value #"
                },
                {
                    field: "EMUnit",
                    title: "Units",
                    editor: editNumber,
                    width: "5%",
                    format: "{0:n0}",
                    // decimals: 0,
                    //min: -9999999999,
                    //max: 9999999999,
                    // restrictDecimals: true, 
                    attributes: { "class": "txt-float-R" },
                    headerAttributes: { "class": "wrap-header align-right" },
                    headerTemplate: '<div>Units<span title="Input gross change in emissions type here in the unit provided using whole numbers. Positive values for increase, negative values for decrease" class="k-icon k-i-question"></span></div>'
                    //groupHeaderTemplate: "#= value #"
                },
                {
                    field: "UnitOfMeasure",
                    title: "UoM",
                    width: "2%",
                    // values: topsBulk
                },
                {
                    field: "UnitCost",
                    title: "Unit Cost",
                    width: "4%",
                    attributes: { "class": "txt-float-R" },
                    headerAttributes: { "class": "wrap-header align-right" },
                    headerTemplate: '<div>Unit Cost <span>(' + vm.projectCharterInfoSelected.LocalCurrencyAbbreviation + ')</span><span title="Input the cost of each energy unit using up to 4 decimal places, positive values only." class="k-icon k-i-question"></span></div>',
                    editor: editNumberCost,
                    format: "{0:n4}",
                    editable: function (dataItem) {
                        return vm.isUnitCost == null ? true : vm.isUnitCost;
                    }
                },
                {
                    field: "EMBasisOfEstimate",
                    title: "Basis of Estimate",
                    width: "13%",
                }
            ]
        });

    };
    function editNumber(container, options) {
        $('<input name="' + options.field + '" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox({
                //spinners: false,
                decimals: 0,
                format: "{0:n0}",
                restrictDecimals: true,
                max: 9999999,
                min: -9999999
            });
    };

    function editNumberCost(container, options) {
        $('<input name="' + options.field + '" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox({
                //spinners: false,
                decimals: 4,
                format: "{0:n4}",
                restrictDecimals: true,
                max: 9999999999,
                min: 0
            });
    };

    function onChangeCarbonImpact() {
        //alert(vm.projectCharterInfoSelected.startonImpact);        
        if (vm.projectCharterInfoSelected.NoCarbonImpact == true) {
            for (var i = 0; i < gridCharterCapsData.length; i++) {
                gridCharterCapsData[i].EMUnit = null;
                gridCharterCapsData[i].EMBasisOfEstimate = null;
                gridCharterCapsData[i].UnitCost = null;
                vm.projectCharterInfoSelected.EnergyCostImpactPerYear = null;
            }
        }
        else {
            angular.copy(beforeSaveGriddata, gridCharterCapsData);
            vm.isUnitCost = beforeSaveIsUnit;
            vm.projectCharterInfoSelected.EnergyCostImpactPerYear = beforeSaveEnergy;
            //gridCapsData = beforeSaveGriddata;
        }

        $('#gridCapsCharter').data('kendoGrid').dataSource.read();

        //$scope.$digest();
    }

    function onChangeEnergyCostImpactCharter() {
        if (vm.projectCharterInfoSelected.EnergyCostImpactPerYear != null && vm.projectCharterInfoSelected.EnergyCostImpactPerYear != "")
            vm.isUnitCost = false;
        else
            vm.isUnitCost = null;
        //$scope.$digest();
    }

    function onChangeWWCostImpactCharter() {
        if ((vm.projectCharterInfoSelected.EnergyWaterImpactCostPerYear != null && vm.projectCharterInfoSelected.EnergyWaterImpactCostPerYear != "") || (vm.projectCharterInfoSelected.EnergyWasteImpactCostPerYear != null && vm.projectCharterInfoSelected.EnergyWasteImpactCostPerYear != ""))
            vm.isUnitCostWWC = false;
        else
            vm.isUnitCostWWC = null;
        $scope.$digest();
    }


    /***************************END : CAPS Grid***********************************************/
    /**************************START : Water and Waste Grid************************************************/
    function InitKendoGridCapsWaterWasteCharter() {


        var dsCapsWaterWaste = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(gridCapsDataWaterWasteCharter);
                }
            },
            sort: [{ field: "WWStream", dir: "asc" },
             { field: "WWType", dir: "asc" },
             { field: "Category", dir: "asc" }],
            schema: {
                model: {
                    id: 'EMDataWWID',
                    fields: {
                        EMDataWWID: { hidden: true },
                        WWStream: { type: "string", editable: vm.isEditable },
                        EMWWUnit: { type: "number", validation: { maxlength: 10 }, editable: vm.isEditable },
                        StandardUoM: { type: "string", editable: vm.isEditable },
                        UnitCost: {
                            type: "number", editable: vm.isEditable, defaultValue: null
                            //validation: { min: 0 } //It is not working as we have editor defined to make the value positive only we have updated the min value in editor
                        },
                        WWType: { type: "string", editable: vm.isEditable },
                        Category: { type: "string", editable: vm.isEditable },
                        EMBasisOfEstimate: { type: "string", editable: vm.isEditable }
                    }
                }
            }
        });
        $("#gridCapsWaterWasteCharter").kendoGrid({
            dataSource: dsCapsWaterWaste,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: {
                createAt: "bottom"
            },
            edit: function (e) {

                var grid = this;
                var fieldName = grid.columns[e.container.index()].field;
                if (e.container.find('[name="UnitCost"]').length > 0) {
                    e.container.find('[name="UnitCost"]').data('kendoNumericTextBox').bind('change', function () {
                        NullValueExist = true;

                        if (fieldName == "UnitCost") {
                            var gridupdatedDataKey3 = $('#gridCapsWaterWasteCharter').data('kendoGrid').dataSource.data();


                            angular.forEach(gridupdatedDataKey3, function (item, index) {
                                if (item.UnitCost != null) {
                                    NullValueExist = false;
                                    return;
                                    //vm.isUnitCost = true;
                                }

                            });
                            if (!NullValueExist)
                                vm.isUnitCostWWC = true;
                            else {
                                vm.isUnitCostWWC = null;
                                vm.projectCharterInfoSelected.EnergyWaterImpactCostPerYear = 0;
                                vm.projectCharterInfoSelected.EnergyWasteImpactCostPerYear = 0;
                            }
                        }
                        $scope.$digest();
                    });
                }
                //$("#gridCapsWaterWasteCharter").find('table tr td:nth-child(4)').unbind("click").bind("change", function (e) {


                //    }


            },


            columns: [
                            {
                                field: "WWStream",
                                title: "Water/Waste",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteDropDownEditorCharter,
                                values: WaterWasteOptionsCharter,
                            }, {
                                field: "WWType",
                                title: "Type",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteTypeDropDownEditorCharter,
                                values: WaterWasteTypeOptionsCharter,
                            }, {
                                field: "Category",
                                title: "Category",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteCategoryDropDownEditorCharter,
                                values: WaterWasteCategoryOptionsCharter,
                            }, {
                                field: "EMWWUnit",
                                title: "Units",
                                editor: editNumber,
                                width: "10%",
                                format: "{0:n0}",
                                attributes: { "class": "txt-float-R" },
                                headerAttributes: { "class": "wrap-header align-right" },
                                headerTemplate: '<div>Units<span title="Input gross change in emissions type here in the unit provided using whole numbers. Positive values for increase, negative values for decrease" class="k-icon k-i-question"></span></div>'
                            },{
                                field: "StandardUoM",
                                title: "UoM",
                                width: "10%",
                            },{
                                field: "UnitCost",
                                title: "Unit Cost",
                                width: "10%",
                                attributes: { "class": "txt-float-R" },
                                headerAttributes: { "class": "wrap-header align-right" },
                                headerTemplate: '<div>Unit Cost <span>(' + vm.projectCharterInfoSelected.LocalCurrencyAbbreviation + ')</span><span title="Input the cost of each energy unit using up to 4 decimal places, positive values only." class="k-icon k-i-question"></span></div>',
                                editor: editNumberCost,
                                format: "{0:n4}",
                                editable: function (dataItem) {
                                    return vm.isUnitCostWWC == null ? true : vm.isUnitCostWWC;
                                }
                            },{
                                field: "EMBasisOfEstimate",
                                title: "Basis of Estimate",
                                width: "20%",
                                // values: topsBulk
                            }, {
                                hidden: !(vm.isEditable),
                                width: "5%",
                                command: [{
                                    name: " ",
                                    iconClass: "k-icon k-i-close",

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
                                                if (data.EMDataWWID != 'undefined' && data.EMDataWWID != "")
                                                    deletedWaterWasteCharter.push({ "EMDataWWID": data.EMDataWWID });

                                                var grid = $("#gridCapsWaterWasteCharter").data("kendoGrid");
                                                grid.removeRow(tr);

                                                $scope.$digest();
                                            }
                                        }
                                        catch (err) {
                                            hideLoading();
                                            var dataToSend = {
                                                "method": "InitKendoGridCapsWaterWasteCharter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                            };
                                            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                                .then(function (response) { alert(errormessage); });
                                        }
                                    }
                                }]
                            }
            ]
        });


    };

    function WaterWasteDropDownEditorCharter(container, options) {
        $('<input id="' + options.field + options.model.EMDataWWID + '" name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                filter: "contains",
                valuePrimitive: true,
                dataSource: WaterWasteOptionsCharter,
                change: function (e) {
                    var grid = e.sender.element.closest(".k-grid").data("kendoGrid");
                    var row = e.sender.element.closest("tr");
                    var dataItem = grid.dataItem(row);
                    var WaterWasteStandardUoM = WaterWasteDataSetCharter.filter(function (entry) {
                        return entry.WWStream == dataItem.WWStream;
                    });
                    dataItem.Category = "";
                    dataItem.WWType = "";
                    dataItem.StandardUoM = WaterWasteStandardUoM[0].StandardUoM;
                    dataItem.dirty = true;
                    $('#gridCapsWaterWasteCharter').data('kendoGrid').refresh();
                },
            });
    };
    function WaterWasteTypeDropDownEditorCharter(container, options) {
        var WaterWasteSelect = options.model.WWStream;
        var WaterWasteTypeOptionsAll = WaterWasteDataSetCharter.filter(function (entry) {
            return entry.WWStream == WaterWasteSelect;
        });
        var WaterWasteTypeOptionsFiltered = Array.from(new Set(WaterWasteTypeOptionsAll.map((item) => item.WWType)))
        $('<input  id="' + options.field + options.model.EMDataWWID + '"name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                //dataTextField: "WWType",
                //dataValueField: "WWType",
                filter: "contains",
                valuePrimitive: true,
                dataSource: WaterWasteTypeOptionsFiltered,
                change: function (e) {
                    var grid = e.sender.element.closest(".k-grid").data("kendoGrid");
                    var row = e.sender.element.closest("tr");
                    var dataItem = grid.dataItem(row);
                    dataItem.Category = "";
                    dataItem.dirty = true;
                    $('#gridCapsWaterWasteCharter').data('kendoGrid').refresh();
                },
            });
    };
    function WaterWasteCategoryDropDownEditorCharter(container, options) {
        var WaterWasteSelect = options.model.WWStream;
        var WaterWasteType = options.model.WWType;
        var WaterWasteCategoryOptionsAll = WaterWasteDataSetCharter.filter(function (entry) {
            return (entry.WWStream == WaterWasteSelect && entry.WWType == WaterWasteType);
        });
        $('<input  id="' + options.field + options.model.EMDataWWID + '" name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataTextField: "Category",
                dataValueField: "WWSourceMasterUniqueID",
                template: "#:Category#",
                filter: "contains",
                valuePrimitive: true,
                dataSource: WaterWasteCategoryOptionsAll,
                change: function (e) {
                    var grid = e.sender.element.closest(".k-grid").data("kendoGrid");
                    var row = e.sender.element.closest("tr");
                    var dataItem = grid.dataItem(row);
                    dataItem.WWSourceMasterUniqueID = e.sender.value();
                    dataItem.Category = e.sender.text()
                    //dataItem.dirty = true;
                    //$('#gridCapsWaterWasteCharter').data('kendoGrid').refresh();
                },
            });
    };

    /***************************END : Water and Waste  Grid***********************************************/
    function prepareDataForProjectCharter() {
        vm.deletedMilestoneData = [];
        vm.deletedRiskData = [];
        vm.deletedKeySuccessData = [];
        vm.deletedAssumptionData = [];
        vm.deletedTeamsData = [];
        vm.deletedFundingData = [];

        vm.pcApprovedDateError = false;
        vm.isPortfolioOwnerEditablePC = canPortfolioOwnerEdit;
        vm.CharterRealizationDateCaps = false;
        vm.isEMPortfolio = false;
        var dataToSendForMilestoneSet = {
            "ProjectID": SeletedProjectId, "DataType": "TemplateDetails"
        };
        var dataToSendForMilestoneTemplate = {
            "ProjectID": SeletedProjectId, "DataType": "Template"
        };
        try {
            //SeletedProjectName = getParameterByName(window.location.search, "ProblemTitle");
            SeletedProjectId = getParameterByName(window.location.search, "ProblemID");
            //vm.SelectedProjectName = SeletedProjectName;

            var lookup = product + "," + portfolioOwner + "," + CapitalProjectClassification + "," + topsFunctionRequired + "," + riskIssueType + "," + businessCaseFundingType + "," + funtionalGroup + "," + executionScope + "," + teamPermission + "," + topsPrimaryKpi + "," + agileAttribute + "," + agileWave;
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.getDataWCFAsync("getRiskIssue/" + SeletedProjectId), GETPostService.getDataWCFAsync("getProjectTeam/" + SeletedProjectId), GETPostService.getDataWCFAsync("getSchedule/" + SeletedProjectId),
                GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterFunding", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterInfoByID", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterAssumption", SeletedProjectId), GETPostService.getDataWCFAsync("getUserPermissionByProjectUserId/" + currentUserId + "/" + SeletedProjectId)
                , GETPostService.postDataWCFAsync("getProjectCapsDetails", SeletedProjectId), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneTemplate), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneSet),
             GETPostService.postDataWCFAsync("getCAPSWaterWasteByProjectID", SeletedProjectId),
             GETPostService.postDataWCFAsync("getCAPSWaterWaste"))
                .then(function (resLookup, resRiskIssue, resTeam, resSchedule, resKeySuccess, resFunding, resProjectCharterInfo, resAssumption, resPermission, resCapsData, resMilestoneTemplates, resMilestoneTemplateDetail, resCapsWaterWasteProjectCharter, resCapsWaterWasteStreamCharter) {
                    try {
                        vm.dsPermission = JSON.parse(resPermission.getUserPermissionByProjectUserIdResult);

                        if (vm.dsPermission[0].canEdit == true) {

                            vm.isEditable = true;

                        } else vm.isEditable = false;

                        vm.dsPrimaryProduct = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === product;
                        });
                        vm.dsOwner = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === portfolioOwner;
                        });
                        vm.dsExecutionScope = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == executionScope;
                        }), "LookUpMemberOrder");
                        vm.dsProjectClassification = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === CapitalProjectClassification;
                        });
                        vm.dsAgilePrimaryWorkstation = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == agileAttribute;
                        });
                        vm.dsAgileWave = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == agileWave;
                        });
                        vm.dsPrimaryKPI = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == topsPrimaryKpi;
                        }), "LookUpMemberOrder");
                        //vm.dsProgram = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                        //    return entry.LookUpName === program;
                        //});
                        //vm.dsProject = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                        //    return entry.LookUpName === project;
                        //});
                        //vm.svpElement = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                        //    return entry.LookUpName === svpElement;
                        //});
                        vm.functionRequired = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === topsFunctionRequired;
                        });
                        //vm.dsPrograms = getdropdowndata(resPrograms);
                        //vm.dsResList = getdropdowndata(resAllRes);

                        vm.dsProjectClassification = $filter('orderBy')(vm.dsProjectClassification, 'LookUpMemberOrder');
                        vm.dsPrimaryProduct = $filter('orderBy')(vm.dsPrimaryProduct, 'LookUpMemberOrder');//LookUpMemberOrder
                        // vm.dsResList = JSON.parse(userInfo.getUserDataResult);

                        //   vm.dsResListBulk = JSON.parse(userBulk.GetUserForBulkResult);

                        //vm.dsProgram = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                        //    return entry.LookUpName === program;
                        //});
                        //vm.dsProject = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                        //    return entry.LookUpName === project;
                        //});
                        vm.dsFundingType = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === businessCaseFundingType;
                        });
                        // usergroups = JSON.parse(group.getUserTeamPermissionResult);

                        var dsProjectCharterInfo = JSON.parse(resProjectCharterInfo.getProjectCharterInfoByIDResult);
                        if (dsProjectCharterInfo.length > 0) {
                            vm.projectCharterInfoSelected = dsProjectCharterInfo[0];
                        }
                        vm.localCurrencyAbbrePlaceholder = vm.projectCharterInfoSelected.LocalCurrencyAbbreviation;
                        //LocalCurrencyAbbreviation
                        if (vm.projectCharterInfoSelected.LocalCurrencyAbbreviation != null)
                            vm.localCurrencyAbbre = "(" + vm.projectCharterInfoSelected.LocalCurrencyAbbreviation + ")";




                        var ParentProgramName = vm.projectCharterInfoSelected.ParentProgramName;
                        var ParentProgramID = vm.projectCharterInfoSelected.ParentProgramID;
                        createParentProj(ParentProgramID, ParentProgramName);

                        if (vm.projectCharterInfoSelected.PrimaryProductID != null && vm.projectCharterInfoSelected.PrimaryProductID != "") {
                            var selectedPrimaryProduct = vm.dsPrimaryProduct.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.PrimaryProductID;
                            });
                            vm.projectCharterInfoSelected.PrimaryProductID = selectedPrimaryProduct[0];
                        }

                        if (vm.projectCharterInfoSelected.PortfolioOwnerID != null && vm.projectCharterInfoSelected.PortfolioOwnerID != "") {
                            var selectedPortfolio = vm.dsOwner.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.PortfolioOwnerID;
                            });
                            vm.projectCharterInfoSelected.PortfolioOwnerID = selectedPortfolio[0];
                        }


                        if (vm.projectCharterInfoSelected.GovernanceBodyTypeID != null && vm.projectCharterInfoSelected.GovernanceBodyTypeID != "") {
                            var selectedGovernance = vm.dsOwner.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.GovernanceBodyTypeID;
                            });
                            vm.projectCharterInfoSelected.GovernanceBodyTypeID = selectedGovernance[0];
                        }

                        if (vm.projectCharterInfoSelected.FunctionsRequiredID != null && vm.projectCharterInfoSelected.FunctionsRequiredID != "") {
                            var selectedFunction = vm.functionRequired.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.FunctionsRequiredID;
                            });
                            vm.projectCharterInfoSelected.FunctionsRequiredID = selectedFunction[0];
                        }
                        if (vm.projectCharterInfoSelected.PrimaryKPI != null && vm.projectCharterInfoSelected.PrimaryKPI != "") {
                            var selectedPrimaryKPI = $filter('orderBy')(vm.dsPrimaryKPI.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.PrimaryKPI;
                            }), "LookUpMemberOrder");
                            vm.projectCharterInfoSelected.PrimaryKPI = selectedPrimaryKPI[0];
                        }
                        var selectedAgilePrimaryWorkstream = [];
                        if (vm.projectCharterInfoSelected.AgilePrimaryWorkstream != null && vm.projectCharterInfoSelected.AgilePrimaryWorkstream != "") {
                            selectedAgilePrimaryWorkstream = vm.dsAgilePrimaryWorkstation.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.AgilePrimaryWorkstream;
                            });
                        }
                        vm.selectedAgilePrimaryWorkstream = selectedAgilePrimaryWorkstream.length > 0 ? selectedAgilePrimaryWorkstream[0] : "";

                        var selectedAgileWave = [];
                        if (vm.projectCharterInfoSelected.AgileWave != null && vm.projectCharterInfoSelected.AgileWave != "") {
                            selectedAgileWave = vm.dsAgileWave.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.AgileWave;
                            });
                        }
                        vm.selectedAgileWave = selectedAgileWave.length > 0 ? selectedAgileWave[0] : "";


                        //Set ReadOnly as default
                        var teamPermissions = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return (entry.LookUpName === teamPermission && entry.LookUpMemberName != 'None')
                        });
                        for (var i = 0; i < teamPermissions.length; i++) {
                            var item = {
                                "text": teamPermissions[i].LookUpMemberName, "value": teamPermissions[i].LookUpMemberID
                            }
                            permissionbulk.push(item);
                        }


                        gridDataRiskIssue = JSON.parse(resRiskIssue.getRiskIssueResult);
                        gridDataTeam = JSON.parse(resTeam.getProjectTeamResult);
                        gridDataSchedule = JSON.parse(resSchedule.getScheduleResult);

                        gridDataKeySuccess = JSON.parse(resKeySuccess.getProjectCharterKeySuccessResult);
                        gridDataAssumption = JSON.parse(resAssumption.getProjectCharterAssumptionResult);
                        gridDataFunding = JSON.parse(resFunding.getProjectCharterFundingResult);

                        //Milestone Set
                        grdMilestoneTemplate = JSON.parse(resMilestoneTemplates);
                        grdMilestoneTemplateDetail = JSON.parse(resMilestoneTemplateDetail);

                        vm.riskIssueType = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === riskIssueType;
                        });
                        vm.dsFuntionalGroup = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === funtionalGroup;
                        });
                        vm.agileVisibleCharter = vm.projectCharterInfoSelected.IsAgile;
                        var impObj = [];
                        var exScope = [];
                        var agileSecWorkstream = [];
                        if (vm.projectCharterInfoSelected.OtherImpactedProducts != null && vm.projectCharterInfoSelected.OtherImpactedProducts != 'undefined') {
                            impObj = vm.projectCharterInfoSelected.OtherImpactedProducts.split(',');
                        }

                        if (vm.projectCharterInfoSelected.ExecutionScopeID != null && vm.projectCharterInfoSelected.ExecutionScopeID != 'undefined') {
                            exScope = vm.projectCharterInfoSelected.ExecutionScopeID.split(',');
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
                        vm.projectCharterInfoSelected.OtherImpactedProducts = impObj;
                        vm.dsExecutionScope = {
                            placeholder: "Select scope...",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsExecutionScope,
                            filter: "contains"
                        };
                        vm.projectCharterInfoSelected.ExecutionScope = exScope;

                        if (vm.projectCharterInfoSelected.AgileSecondaryWorkstream != null && vm.projectCharterInfoSelected.AgileSecondaryWorkstream != 'undefined') {
                            agileSecWorkstream = vm.projectCharterInfoSelected.AgileSecondaryWorkstream.split(',');
                        }

                        vm.dsAgileSecWorkstream = {
                            placeholder: "Select secondary workstream...",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsAgilePrimaryWorkstation,
                            filter: "contains"
                        };
                        vm.agileSecWorkstreamIds = agileSecWorkstream;

                        var primaryProductlist = $("#ddl_PC_PrimaryProduct").data("kendoComboBox");
                        primaryProductlist.value(vm.SelectedProject.PrimaryProductID);
                        primaryProductlist.refresh();

                        var portfolioOwnerlist = $("#ddl_PC_PortfolioOwner").data("kendoComboBox");
                        portfolioOwnerlist.value(vm.SelectedProject.PortfolioOwnerID);
                        portfolioOwnerlist.refresh();

                        OriginalPCdata = {};

                        angular.copy(vm.projectCharterInfoSelected, OriginalPCdata);
                        vm.formattedCalculated = kendo.toString(vm.projectCharterInfoSelected.CalculatedEmissionsImpact, "n1");

                        /*************************START:For Water and Waste in CAPS*********************************/
                        gridCapsDataWaterWasteCharter = JSON.parse(resCapsWaterWasteProjectCharter.getCAPSWaterWasteByProjectIDResult);

                        WaterWasteDataSetCharter = JSON.parse(resCapsWaterWasteStreamCharter.getCAPSWaterWasteResult);

                        WaterWasteOptionsCharter = Array.from(new Set(WaterWasteDataSetCharter.map((item) => item.WWStream)))
                        WaterWasteTypeOptionsCharter = Array.from(new Set(WaterWasteDataSetCharter.map((item) => item.WWType)))
                        WaterWasteCategoryOptionsCharter = Array.from(new Set(WaterWasteDataSetCharter.map((item) => item.Category)))

                        vm.isUnitCostWWC = vm.projectCharterInfoSelected.isUnitCostWWC;
                      
                        /*************************END:For Water and Waste in CAPS*********************************/
                      
                        if (charterCount == 0) {
                            for (var i = 0; i < vm.riskIssueType.length; i++) {
                                var item3 = {
                                    "text": vm.riskIssueType[i].LookUpMemberName, "value": vm.riskIssueType[i].LookUpMemberID
                                }
                                riskIssueTypeBulk.push(item3);
                            }

                            //booleanTypeBulk.push([{ "text": Yes, "value": True }, { "text": No, "value": false }]);

                            for (var i = 0; i < vm.dsFundingType.length; i++) {
                                var item2 = {
                                    "text": vm.dsFundingType[i].LookUpMemberName, "value": vm.dsFundingType[i].LookUpMemberID
                                }
                                fundingTypeValues.push(item2);
                            }
                            for (var i = 0; i < vm.dsOwner.length; i++) {
                                var item1 = {
                                    "text": vm.dsOwner[i].LookUpMemberName, "value": vm.dsOwner[i].LookUpMemberID
                                }
                                fundingSourceValues.push(item1);
                            }
                            for (var i = 0; i < vm.dsFuntionalGroup.length; i++) {
                                var item4 = {
                                    "text": vm.dsFuntionalGroup[i].LookUpMemberName, "value": vm.dsFuntionalGroup[i].LookUpMemberID
                                }
                                functionalgroupBulk.push(item4);
                            }
                            for (var i = 0; i < vm.dsFuntionalGroup.length; i++) {
                                var isDisabled = false;
                                if (vm.dsFuntionalGroup[i].LookUpMemberID == projectmanager || vm.dsFuntionalGroup[i].LookUpMemberID == projectSponsor) { isDisabled = true; }
                                var item = {
                                    "text": vm.dsFuntionalGroup[i].LookUpMemberName, "value": vm.dsFuntionalGroup[i].LookUpMemberID, "isDisabled": isDisabled
                                }
                                rolesBulk.push(item);
                            }
                            for (var i = 0; i < vm.dsPrimaryKPI.length; i++) {
                                var item5 = {
                                    "text": vm.dsPrimaryKPI[i].LookUpMemberName, "value": vm.dsPrimaryKPI[i].LookUpMemberID
                                }
                                primaryKpiGrid.push(item5);
                            }


                            InitkGridProjectCharterKeySuccessCriteria();
                            InitkGridProjectCharterMilestone();
                            InitkGridProjectTeam();
                            InitkGridProjectCharterRisk();
                            InitkGridProjectCharterFunding();
                            InitMilestoneTemplates();
                              InitKendoGridCapsWaterWasteCharter();
                        }
                        else {
                            UpdateProjectTeamUsers();
                            $('#gridProjectCharterKeySuccessCriteria').data('kendoGrid').dataSource.read();
                            $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.read();
                            $('#gridProjectTeam').data('kendoGrid').dataSource.read();
                            $('#gridProjectCharterRisk').data('kendoGrid').dataSource.read();
                            $('#gridProjectCharterAssumption').data('kendoGrid').dataSource.read();
                            $('#gridProjectCharterFunding1').data('kendoGrid').dataSource.read();
                            $('#gridCapsWaterWasteCharter').data('kendoGrid').dataSource.read();
                            var dataSource = new kendo.data.DataSource({ data: grdMilestoneTemplate });
                            var grid = $('#gridCharterAddMilestones').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);
                        }


                        /*************************START:For CAPS*********************************/
                        var unitCostExist = vm.projectCharterInfoSelected.isUnitCost;
                        vm.isUnitCost = vm.projectCharterInfoSelected.isUnitCost;

                        var selectedEmissionPCaps = [];
                        if (vm.projectCharterInfoSelected.EmissionPortfolioID != null && vm.projectCharterInfoSelected.EmissionPortfolioID != "") {
                            vm.isEMPortfolio = true;
                        }
                        else {
                            vm.isEMPortfolio = false;
                        }
                        gridCharterCapsDataAllPortfolio = JSON.parse(resCapsData.getProjectCapsDetailsResult);
                        gridCharterCapsData = gridCharterCapsDataAllPortfolio.filter(function (entry) {
                            return entry.EMPortfolioOwnerID == vm.projectCharterInfoSelected.EmissionPortfolioID;
                        });
                        angular.copy(gridCharterCapsData, beforeSaveGriddata);
                        beforeSaveIsUnit = vm.isUnitCost;
                        beforeSaveEnergy = vm.projectCharterInfoSelected.EnergyCostImpactPerYear;
                        vm.formattedCalculated = kendo.toString(vm.projectCharterInfoSelected.CalculatedEmissionsImpact, "n1");
                        InitKendoGridCapsCharter();
                        /*************************END:For CAPS*********************************/
                       
                        bindChangeComboBox("functionRequired");
                        gridAddDefaultRows();
                        $scope.$digest();
                        hideLoading();
                        charterCount++;
                    }
                    catch (err) {
                        hideLoading();
                        var dataToSend = {
                            "method": "prepareDataForProjectCharter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { alert(errormessage) });
                    }
                });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "prepareDataForProjectCharter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    };


    function DialogCloseEvent(e) {
        dropdownSetValuePC();
        var gridupdatedData = $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.data()
            .filter(function (x) { return x.dirty })
            .map(function (x) { return x });
        var gridupdatedDataRisk = $('#gridProjectCharterRisk').data('kendoGrid').dataSource.data()
            .filter(function (x) { return x.dirty })
            .map(function (x) { return x });
        var gridupdatedDataTeams = $('#gridProjectTeam').data('kendoGrid').dataSource.data()
            .filter(function (x) { return x.dirty })
            .map(function (x) { return x });
        var gridupdatedDataKey = $('#gridProjectCharterKeySuccessCriteria').data('kendoGrid').dataSource.data()
            .filter(function (x) { return x.dirty })
            .map(function (x) { return x });
        var gridupdatedDataAssumption = $('#gridProjectCharterAssumption').data('kendoGrid').dataSource.data()
            .filter(function (x) { return x.dirty })
            .map(function (x) { return x });
        var gridupdatedDataFunding = $('#gridProjectCharterFunding1').data('kendoGrid').dataSource.data()
            .filter(function (x) { return x.dirty })
            .map(function (x) { return x });
        var gridupdatedDataCaps = $('#gridCapsCharter').data('kendoGrid').dataSource.data()
            .filter(function (x) { return x.dirty })
            .map(function (x) { return x });


        if (angular.equals(OriginalPCdata, vm.projectCharterInfoSelected) == false || gridupdatedData.length > 0 || gridupdatedDataRisk.length > 0
            || gridupdatedDataTeams.length > 0 || gridupdatedDataKey.length > 0 || gridupdatedDataAssumption.length > 0 || gridupdatedDataFunding.length > 0 || gridupdatedDataCaps.length > 0) {

            if (!confirm(dialogCloseMessage))
                e.preventDefault();
        }

    }
    function dropdownSetValuePC() {

        if (vm.projectCharterInfoSelected.OtherImpactedProducts != null && vm.projectCharterInfoSelected.OtherImpactedProducts != "") {
            vm.projectCharterInfoSelected.OtherImpactedProducts = vm.projectCharterInfoSelected.OtherImpactedProducts.lemgth > 1 ? vm.projectCharterInfoSelected.OtherImpactedProducts.split(",") : vm.projectCharterInfoSelected.OtherImpactedProducts;

        }
        if ($("#pc_parentProject").data("kendoComboBox").select() === -1) {
            //alert(optionMsg);
            vm.SelectedParentProject = null
            $("#pc_parentProject").data("kendoComboBox").value("");
            vm.projectCharterInfoSelected.ParentProgramID = null;
            vm.projectCharterInfoSelected.ParentProgramName = null;
        }
        else {
            vm.projectCharterInfoSelected.ParentProgramID = $("#pc_parentProject").data("kendoComboBox").text() === "" ? null : $("#pc_parentProject").data("kendoComboBox").value();
            vm.projectCharterInfoSelected.ParentProgramName = $("#pc_parentProject").data("kendoComboBox").text() === "" ? null : $("#pc_parentProject").data("kendoComboBox").text();
        }
        if (parentProjChangeCharter) {
            $rootScope.$emit("UpdateAssociatedProject");
        }
    }
    function trackEventFunc(eventName) {
        trackEvent(eventName);
    }
    function openProjectCharterInfo() {
        trackEvent("Project charter dialog opened");
        try {
            displayLoading();
            bindChangeDatePicker("PC_approvedDate");
            bindChangeComboBox("ddl_PC_PrimaryProduct");
            bindChangeComboBox("ddl_PC_PortfolioOwner");
            bindChangeComboBox("pc_governanceBody");
            bindChangeComboBox("ddl_Primary_KPI_Charter");
            bindChangeComboBox("ddl_Impacted_KPI");
            bindChangeComboBox("charterPrimaryWorkstation");
            bindChangeComboBox("agileSecondaryWorkstream");
            bindChangeComboBox("agileWaveCharter");


            if (dialogbind == false) {
                $("#dialogProjectCharter").data("kendoWindow").bind("close", function (e) {
                    DialogCloseEvent(e)
                });
                dialogbind = true;
            }
            var myWindow = $("#dialogProjectCharter");
            if (IsProgram) {
                prepareDataForProgramCharter();
            }
            else {
                prepareDataForProjectCharter();
            }

            myWindow.data("kendoWindow").open();
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "openProjectCharterInfo", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };
    function updateProjectCharterInfo() {
        try {
            displayLoading();
            var listdataMilestone = [];
            var listdataRisk = [];
            var listdataAssumption = [];
            var listdataKeySuccess = [];
            var listdataTeams = [];
            var listdataFunding = [];
            var listdataProjectCharterInfo = [];


            vm.milestoneInsertListItems = [];
            vm.milestoneUpdateListItems = [];
            vm.riskInsertListItems = [];
            vm.riskUpdateListItems = [];
            vm.teamsInsertListItems = [];
            vm.teamsUpdateListItems = [];

            vm.keySuccessInsertListItems = [];
            vm.keySuccessUpdateListItems = [];

            vm.assumptionInsertListItems = [];
            vm.assumptionUpdateListItems = [];

            vm.fundindInsertListItems = [];
            vm.fundindUpdateListItems = [];
            var CAPSCharterList = [];
            if (vm.SelectedParentProject == null && vm.projectCharterInfoSelected.ParentProgramID != null)
                parentProjChangeCharter = true;
            else if (vm.projectCharterInfoSelected != null && vm.projectCharterInfoSelected != undefined && vm.SelectedParentProject != null) {
                if (vm.projectCharterInfoSelected.ParentProgramID != vm.SelectedParentProject.ProblemUniqueID)
                    parentProjChangeCharter = true;
            }

            var prjselect = $("#pc_parentProject").data("kendoComboBox");
            if ($("#pc_parentProject").data("kendoComboBox").select() === -1) {
                //alert(optionMsg);
                vm.SelectedParentProject = null
                $("#pc_parentProject").data("kendoComboBox").value("");
            }

            var valid = true;
            var pcApprovedDate = (vm.projectCharterInfoSelected.ApprovedDate != null && vm.projectCharterInfoSelected.ApprovedDate != "") ? $("#PC_approvedDate").val() : null;
            if (pcApprovedDate != null) {
                if (!parseDate(pcApprovedDate)) {
                    valid = false;
                    vm.pcApprovedDateError = true;
                }
                else {
                    vm.pcApprovedDateError = false;
                }
            }

            if (!valid) {
                hideLoading();
                return;
            }
            var keySuccessCharterLength = $("#gridProjectCharterKeySuccessCriteria").data("kendoGrid").tbody.find("input:checked").length;
            if (keySuccessCharterLength > keySuccessCharterCount) {
                alert(keySuccessCountMessage);
                hideLoading();
                return false;
            }
            var milestoneCharterLength = $("#gridProjectCharterMilestone").data("kendoGrid").tbody.find("input:checked").length;
            if (milestoneCharterLength > milestoneCharterCount) {
                alert(milestoneCountMessage);
                hideLoading();
                return false;
            }
            var teamCharterLength = $("#gridProjectTeam").data("kendoGrid").tbody.find("input:checked").length;
            if (teamCharterLength > teamCharterCount) {
                alert(teamCountMessage);
                hideLoading();
                return false;
            }
            var riskCharterLength = $("#gridProjectCharterRisk").data("kendoGrid").tbody.find("input:checked").length;
            if (riskCharterLength > riskCharterCount) {
                alert(riskCountMessage);
                hideLoading();
                return false;
            }
            var assumptionCharterLength = $("#gridProjectCharterAssumption").data("kendoGrid").tbody.find("input:checked").length;
            if (assumptionCharterLength > assumptionCharterCount) {
                alert(assumptionCountMessage);
                hideLoading();
                return false;
            }
            var fundingCharterLength = $("#gridProjectCharterFunding1").data("kendoGrid").tbody.find("input:checked").length;
            if (fundingCharterLength > fundingCharterCount) {
                alert(fundingCountMessage);
                hideLoading();
                return false;
            }

            if ($('#gridProjectCharterMilestone').data('kendoGrid') != undefined) {
                var gridupdatedData = $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertMilestoneArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateMilestoneArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });

                angular.forEach(insertMilestoneArray, function (item, index) {
                    var temp = {};
                    temp.ScheduleUniqueID = item.ScheduleUniqueID;
                    temp.Milestone = item.Milestone;
                    temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                    temp.FunctionGroupID = item.FunctionGroupID;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    temp.ProjectID = item.ProjectID;
                    vm.milestoneInsertListItems.push(temp);
                });
                angular.forEach(updateMilestoneArray, function (item, index) {
                    var temp = {};
                    temp.ScheduleUniqueID = item.ScheduleUniqueID;
                    temp.Milestone = item.Milestone;
                    temp.Milestone = (item.MilestoneType == 1) ? MilestoneStartPrefix + item.Milestone : (item.MilestoneType == 2 ? MilestoneEndPrefix + item.Milestone : item.Milestone);

                    temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                    temp.FunctionGroupID = item.FunctionGroupID;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    temp.ProjectID = item.ProjectID;
                    temp.link = item.link;
                    if (milestoneToAdd.length > 0) {
                        temp.MilestoneTemplateID = item.MilestoneTemplateID;
                        temp.MilestoneID = item.MilestoneID;
                        //temp.IncludeInReport = item.IncludeInReport;
                        temp.Comments = item.Comments;
                    }
                    vm.milestoneUpdateListItems.push(temp);
                });
            }
            vm.insertUpdateDeleteMilestone = {
                "insert": vm.milestoneInsertListItems,
                "update": vm.milestoneUpdateListItems,
                "delete": vm.deletedMilestoneData
            };

            if ($('#gridProjectCharterRisk').data('kendoGrid') != undefined) {
                var gridupdatedDataRisk = $('#gridProjectCharterRisk').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertRiskArray = gridupdatedDataRisk.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateRiskSArray = gridupdatedDataRisk.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });
                //if (insertRiskArray.length!=0)
                angular.forEach(insertRiskArray, function (item, index) {
                    var temp = {};
                    temp.RiskIssueUniqueID = item.RiskIssueUniqueID;
                    temp.IfHappens = item.IfHappens;
                    temp.RiskIssueResult = item.RiskIssueResult;
                    temp.Mitigation = item.Mitigation;
                    temp.RiskIssueTypeID = item.RiskIssueTypeID;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    temp.ProjectID = item.ProjectID;
                    vm.riskInsertListItems.push(temp);
                });
                angular.forEach(updateRiskSArray, function (item, index) {
                    var temp = {};
                    temp.RiskIssueUniqueID = item.RiskIssueUniqueID;
                    temp.IfHappens = item.IfHappens;
                    temp.RiskIssueResult = item.RiskIssueResult;
                    temp.Mitigation = item.Mitigation;
                    temp.RiskIssueTypeID = item.RiskIssueTypeID;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    temp.ProjectID = item.ProjectID;
                    temp.link = item.link;
                    vm.riskUpdateListItems.push(temp);
                });
            }
            vm.insertUpdateDeleteRisk = {
                "insert": vm.riskInsertListItems,
                "update": vm.riskUpdateListItems,
                "delete": vm.deletedRiskData
            };

            if ($('#gridProjectTeam').data('kendoGrid') != undefined) {
                var gridupdatedDataTeams = $('#gridProjectTeam').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertTeamsArray = gridupdatedDataTeams.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateTeamsArray = gridupdatedDataTeams.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });


                angular.forEach(insertTeamsArray, function (item, index) {
                    var temp = {};
                    temp.ProjectTeamUniqueID = item.ProjectTeamUniqueID;
                    temp.RoleID = item.RoleID;
                    temp.TeamMemberAdId = item.TeamMemberAdId;
                    temp.PercentTime = item.PercentTime;
                    temp.Duration = item.Duration;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    temp.TeamPermissionID = item.TeamPermissionID != null ? item.TeamPermissionID : null;
                    if (item.TeamMemberAdId != null) {
                        var teamMember;
                        teamMember = projectTeam.filter(function (entry) {
                            return entry.value == item.TeamMemberAdId;
                        });

                        temp.TeamMemberName = teamMember.length > 0 ? teamMember[0].text : null
                    }


                    vm.teamsInsertListItems.push(temp);
                });
                angular.forEach(updateTeamsArray, function (item, index) {
                    var temp = {};
                    temp.ProjectTeamUniqueID = item.ProjectTeamUniqueID;
                    temp.RoleID = item.RoleID;
                    temp.TeamMemberAdId = item.TeamMemberAdId;
                    temp.PercentTime = item.PercentTime;
                    temp.Duration = item.Duration;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    temp.TeamPermissionID = item.TeamPermissionID != null ? item.TeamPermissionID : null;
                    if (item.TeamMemberAdId != null) {
                        var teamMember;
                        teamMember = projectTeam.filter(function (entry) {
                            return entry.value == item.TeamMemberAdId;
                        });

                        temp.TeamMemberName = teamMember.length > 0 ? teamMember[0].text : null
                    }
                    vm.teamsUpdateListItems.push(temp);
                });
            }
            vm.insertUpdateDeleteTeams = {
                "insert": vm.teamsInsertListItems,
                "update": vm.teamsUpdateListItems,
                "delete": vm.deletedTeamsData
            };

            //var gridData = $('#gridProjectCharterMilestone').data('kendoGrid');
            if ($('#gridProjectCharterKeySuccessCriteria').data('kendoGrid') != undefined) {
                var gridupdatedDataKey = $('#gridProjectCharterKeySuccessCriteria').data('kendoGrid').dataSource.data()
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
                    temp.Metric = item.Metric;
                    temp.CurrentState = item.CurrentState;
                    temp.TargetPerformance = item.TargetPerformance;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    vm.keySuccessInsertListItems.push(temp);
                });
                angular.forEach(updateKeySuccessArray, function (item, index) {
                    var temp = {};
                    temp.KeySuccessUniqueID = item.KeySuccessUniqueID;
                    temp.KPIID = item.KPIID;
                    temp.Metric = item.Metric;
                    temp.CurrentState = item.CurrentState;
                    temp.TargetPerformance = item.TargetPerformance;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    vm.keySuccessUpdateListItems.push(temp);
                });
            }
            vm.insertUpdateDeleteKeySuccess = {
                "insert": vm.keySuccessInsertListItems,
                "update": vm.keySuccessUpdateListItems,
                "delete": vm.deletedKeySuccessData
            };

            //var gridData = $('#gridProjectCharterAssumption').data('kendoGrid');
            if ($('#gridProjectCharterAssumption').data('kendoGrid') != undefined) {
                var gridupdatedDataAssumption = $('#gridProjectCharterAssumption').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertAssumptionArray = gridupdatedDataAssumption.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateAssumptionArray = gridupdatedDataAssumption.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });
                angular.forEach(insertAssumptionArray, function (item, index) {
                    var temp = {};
                    temp.KeyAssumptionUniqueID = item.KeyAssumptionUniqueID;
                    temp.KeyAssumption = item.KeyAssumption;
                    temp.AssumptionRationale = item.AssumptionRationale;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    vm.assumptionInsertListItems.push(temp);
                });
                angular.forEach(updateAssumptionArray, function (item, index) {
                    var temp = {};
                    temp.KeyAssumptionUniqueID = item.KeyAssumptionUniqueID;
                    temp.KeyAssumption = item.KeyAssumption;
                    temp.AssumptionRationale = item.AssumptionRationale;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    vm.assumptionUpdateListItems.push(temp);
                });
            }
            vm.insertUpdateDeleteAssumption = {
                "insert": vm.assumptionInsertListItems,
                "update": vm.assumptionUpdateListItems,
                "delete": vm.deletedAssumptionData
            };

            if ($('#gridProjectCharterFunding1').data('kendoGrid') != undefined) {
                var gridupdatedDataFunding = $('#gridProjectCharterFunding1').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertFundingArray = gridupdatedDataFunding.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateFundingArray = gridupdatedDataFunding.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });
                angular.forEach(insertFundingArray, function (item, index) {
                    var temp = {};
                    temp.FundingUniqueID = item.FundingUniqueID;
                    temp.FundingTypeID = item.FundingTypeID;
                    temp.FundingSourceID = item.FundingSourceID;
                    temp.FundingIntheplan = item.FundingIntheplan;
                    temp.FundingAmount = item.FundingAmount;
                    temp.FundingNotes = item.FundingNotes;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    vm.fundindInsertListItems.push(temp);
                });
                angular.forEach(updateFundingArray, function (item, index) {
                    var temp = {};
                    temp.FundingUniqueID = item.FundingUniqueID;
                    temp.FundingTypeID = item.FundingTypeID;
                    temp.FundingSourceID = item.FundingSourceID;
                    temp.FundingIntheplan = item.FundingIntheplan;
                    temp.FundingAmount = item.FundingAmount;
                    temp.FundingNotes = item.FundingNotes;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    vm.fundindUpdateListItems.push(temp);
                });
            }

            /*****************************START:For Caps*****************************************/
            var capsData = [];
            var valid = true;

            var CapsRealizationDate = (vm.projectCharterInfoSelected.EmissionsImpactRealizationDate != null && vm.projectCharterInfoSelected.EmissionsImpactRealizationDate != "") ? $("#charterRealizationDate").val() : null;

            if (CapsRealizationDate != null) {
                if (!parseDate(CapsRealizationDate)) {
                    valid = false;
                    vm.CharterRealizationDateCaps = true;
                }
                else {
                    vm.CharterRealizationDateCaps = false;
                }
            }
            if (!valid) {
                hideLoading();
                return;
            }

            if ($('#gridCapsCharter').data('kendoGrid') != undefined) {
                var gridCharterCapsData = $('#gridCapsCharter').data('kendoGrid').dataSource.data()
             .map(function (x) { return x });
                angular.forEach(gridCharterCapsData, function (item, index) {
                    // if (!vm.capsDataInfo.NoCarbonImpact) { 
                    temp = {
                        EMSourceID: item.EMSourceID,
                        EMSourceName: item.EMSourceName,
                        EMUnit: item.EMUnit,
                        UnitOfMeasure: item.UnitOfMeasure,
                        UnitCost: item.UnitCost,
                        EMBasisOfEstimate: item.EMBasisOfEstimate,
                        EMFactorImpact: item.EMFactorImpact,
                    }

                    CAPSCharterList.push(temp);
                });
            }

            /*****************************END:For Caps*****************************************/


            /*****************************START:For Water and Waste*****************************************/
            var CAPSWaterWasteList = [];
            var tempWaterWaste;
            var gridWaterWasteData = $('#gridCapsWaterWasteCharter').data('kendoGrid').dataSource.data()
                .map(function (x) { return x });
            angular.forEach(gridWaterWasteData, function (item, index) {
                if (valid == false) return;
                if (item.WWStream == null || item.WWType == null || item.Category == null
                           || item.WWStream == "" || item.WWType == "" || item.Category == "") {
                    valid = false;
                    alert(waterWasteErrorMsg);
                    return;
                }
                tempWaterWaste = {
                    EMDataWWID: item.EMDataWWID,
                    WWSourceMasterUniqueID: item.WWSourceMasterUniqueID,
                    WWStream: item.WWStream,
                    WWType: item.WWType,
                    Category: item.Category,
                    EMWWUnit: item.EMWWUnit,
                    StandardUoM: item.StandardUoM,
                    UnitCost: item.UnitCost,
                    EMBasisOfEstimate: item.EMBasisOfEstimate
                }
                CAPSWaterWasteList.push(tempWaterWaste);
            });
            if (!valid) {
                hideLoading();
                return;
            }
            var waterWasteInsertListItems = [];
            var waterWasteUpdateListItems = [];
            if ($('#gridCapsWaterWasteCharter').data('kendoGrid') != undefined) {
                var gridupdatedData = $('#gridCapsWaterWasteCharter').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertWaterWasteArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateWaterWasteArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });

                angular.forEach(insertWaterWasteArray, function (item, index) {
                    var tempWaterWaste = {};

                    tempWaterWaste.EMDataWWID = item.EMDataWWID,
                    tempWaterWaste.WWSourceMasterUniqueID = item.WWSourceMasterUniqueID,
                    tempWaterWaste.WWStream = item.WWStream,
                    tempWaterWaste.WWType = item.WWType,
                    tempWaterWaste.Category = item.Category,
                    tempWaterWaste.EMWWUnit = item.EMWWUnit,
                    tempWaterWaste.StandardUoM = item.StandardUoM,
                    tempWaterWaste.UnitCost = item.UnitCost,
                    tempWaterWaste.EMBasisOfEstimate = item.EMBasisOfEstimate

                    waterWasteInsertListItems.push(tempWaterWaste);
                });
                angular.forEach(updateWaterWasteArray, function (item, index) {
                    var tempWaterWaste = {};

                    tempWaterWaste.EMDataWWID = item.EMDataWWID,
                    tempWaterWaste.WWSourceMasterUniqueID = item.WWSourceMasterUniqueID,
                    tempWaterWaste.WWStream = item.WWStream,
                    tempWaterWaste.WWType = item.WWType,
                    tempWaterWaste.Category = item.Category,
                    tempWaterWaste.EMWWUnit = item.EMWWUnit,
                    tempWaterWaste.StandardUoM = item.StandardUoM,
                    tempWaterWaste.UnitCost = item.UnitCost,
                    tempWaterWaste.EMBasisOfEstimate = item.EMBasisOfEstimate
                    waterWasteUpdateListItems.push(tempWaterWaste);
                });
            }

           
            vm.insertUpdateDeleteWaterWaste = {
                "insert": waterWasteInsertListItems,
                "update": waterWasteUpdateListItems,
                "delete": deletedWaterWasteCharter
            };

            /*****************************END:Water and Waste*****************************************/
            vm.insertUpdateDeleteFunding = {
                "insert": vm.fundindInsertListItems,
                "update": vm.fundindUpdateListItems,
                "delete": vm.deletedFundingData
            };
            var ImpactedProductsList = [];
            var executionscopeList = [];
            var agileSecondaryList = [];
            if (vm.projectCharterInfoSelected.OtherImpactedProducts != null) {
                //var impactedLength = vm.projectCharterInfoSelected.OtherImpactedProducts.split(",");
                ImpactedProductsList = vm.projectCharterInfoSelected.OtherImpactedProducts.length > 1 ? vm.projectCharterInfoSelected.OtherImpactedProducts.join(",") : vm.projectCharterInfoSelected.OtherImpactedProducts[0];
            }

            if (vm.projectCharterInfoSelected.ExecutionScope != null) {
                //var executionLength = vm.projectCharterInfoSelected.ExecutionScopeID.split(",");
                executionscopeList = vm.projectCharterInfoSelected.ExecutionScope.length > 1 ? vm.projectCharterInfoSelected.ExecutionScope.join(",") : vm.projectCharterInfoSelected.ExecutionScope[0];

            }
            if (vm.agileSecWorkstreamIds != null && vm.agileSecWorkstreamIds != "") {
                agileSecondaryList = vm.agileSecWorkstreamIds.join(",");
            }
            vm.projectCharterInfoSelectedData = {
                ProjectID: vm.projectCharterInfoSelected.ProjectID != null ? vm.projectCharterInfoSelected.ProjectID : null,
                ProjectName: vm.projectCharterInfoSelected.ProjectName,
                PrimaryProductID: vm.projectCharterInfoSelected.PrimaryProductID != null ? vm.projectCharterInfoSelected.PrimaryProductID.LookUpMemberID : null,
                OtherImpactedProducts: vm.projectCharterInfoSelected.OtherImpactedProducts != null ? ImpactedProductsList : null,
                PortfolioOwnerID: vm.projectCharterInfoSelected.PortfolioOwnerID != null ? vm.projectCharterInfoSelected.PortfolioOwnerID.LookUpMemberID : null,
                ExecutionScopeID: vm.projectCharterInfoSelected.ExecutionScope != null ? executionscopeList : null,
                SponsorADID: vm.projectCharterInfoSelected.SponsorADID != null ? vm.projectCharterInfoSelected.SponsorADID.UserADId : null,
                ProjectManagerADID: vm.projectCharterInfoSelected.ProjectManagerADID != null ? vm.projectCharterInfoSelected.ProjectManagerADID.UserADId : null,
                //ParentProgramID: vm.projectCharterInfoSelected.ParentProgramID != null ? vm.projectCharterInfoSelected.ParentProgramID.LookUpMemberID : null,

                //SVPElementTypeID: vm.projectCharterInfoSelected.SVPElementTypeID != null ? vm.projectCharterInfoSelected.SVPElementTypeID.LookUpMemberID : null,
                // GovernanceBodyTypeID: vm.projectCharterInfoSelected.GovernanceBodyTypeID != null ? vm.projectCharterInfoSelected.GovernanceBodyTypeID.LookUpMemberID : null,
                ProposalStatement: vm.projectCharterInfoSelected.ProposalStatement != null ? vm.projectCharterInfoSelected.ProposalStatement : null,
                DetailedDescription: vm.projectCharterInfoSelected.DetailedDescription != null ? vm.projectCharterInfoSelected.DetailedDescription : null,
                InScope: vm.projectCharterInfoSelected.InScope != null ? vm.projectCharterInfoSelected.InScope : null,
                OutOfScope: vm.projectCharterInfoSelected.OutOfScope != null ? vm.projectCharterInfoSelected.OutOfScope : null,
                DurationBaseCase: (vm.projectCharterInfoSelected.DurationBaseCase != null && vm.projectCharterInfoSelected.DurationBaseCase != "") ? vm.projectCharterInfoSelected.DurationBaseCase : null,
                DurationHighCase: (vm.projectCharterInfoSelected.DurationHighCase != null && vm.projectCharterInfoSelected.DurationHighCase != "") ? vm.projectCharterInfoSelected.DurationHighCase : null,
                PeopleFTEMonthsRequiredBaseCase: (vm.projectCharterInfoSelected.PeopleFTEMonthsRequiredBaseCase != null && vm.projectCharterInfoSelected.PeopleFTEMonthsRequiredBaseCase != "") ? vm.projectCharterInfoSelected.PeopleFTEMonthsRequiredBaseCase : null,
                PeopleFTEMonthsRequiredHighCase: (vm.projectCharterInfoSelected.PeopleFTEMonthsRequiredHighCase != null && vm.projectCharterInfoSelected.PeopleFTEMonthsRequiredHighCase != "") ? vm.projectCharterInfoSelected.PeopleFTEMonthsRequiredHighCase : null,
                TotalCapExBaseCase: (vm.projectCharterInfoSelected.TotalCapExBaseCase != null && vm.projectCharterInfoSelected.TotalCapExBaseCase !== "") ? vm.projectCharterInfoSelected.TotalCapExBaseCase : null,
                TotalCapExHighCase: (vm.projectCharterInfoSelected.TotalCapExHighCase != null && vm.projectCharterInfoSelected.TotalCapExHighCase !== "") ? vm.projectCharterInfoSelected.TotalCapExHighCase : null,
                TotalNonFTEOpExBaseCase: (vm.projectCharterInfoSelected.TotalNonFTEOpExBaseCase != null && vm.projectCharterInfoSelected.TotalNonFTEOpExBaseCase !== "") ? vm.projectCharterInfoSelected.TotalNonFTEOpExBaseCase : null,
                TotalNonFTEOpExHighCase: (vm.projectCharterInfoSelected.TotalNonFTEOpExHighCase != null && vm.projectCharterInfoSelected.TotalNonFTEOpExHighCase !== "") ? vm.projectCharterInfoSelected.TotalNonFTEOpExHighCase : null,
                // ParentProgramID: vm.projectCharterInfoSelected.ParentProgramID != null ? vm.projectCharterInfoSelected.ParentProgramID.LookUpMemberID : null,
                ParentProgramID: (vm.SelectedParentProject != null && vm.SelectedParentProject.ProblemUniqueID != "") ? vm.SelectedParentProject.ProblemUniqueID : null,

                FunctionsRequiredID: vm.projectCharterInfoSelected.FunctionsRequiredID != null ? vm.projectCharterInfoSelected.FunctionsRequiredID.LookUpMemberID : null,
                ApprovedDate: (vm.projectCharterInfoSelected.ApprovedDate != null && vm.projectCharterInfoSelected.ApprovedDate != "") ? vm.projectCharterInfoSelected.ApprovedDate : null,
                //ParentProject: vm.projectCharterInfoSelected.ParentProject != null ? vm.projectCharterInfoSelected.ParentProject.LookUpMemberID : null,

                //ProblemID: vm.projectCharterInfoSelected.ProblemID,
                AgilePrimaryWorkstream: (vm.selectedAgilePrimaryWorkstream != null && vm.selectedAgilePrimaryWorkstream != "") ? vm.selectedAgilePrimaryWorkstream.LookUpMemberID : null,
                AgileSecondaryWorkstream: agileSecondaryList,
                AgileWave: (vm.selectedAgileWave != null && vm.selectedAgileWave != "") ? vm.selectedAgileWave.LookUpMemberID : null,
                PrimaryKPI: vm.projectCharterInfoSelected.PrimaryKPI != null ? vm.projectCharterInfoSelected.PrimaryKPI.LookUpMemberID : null,
                ProjectDescription: vm.projectCharterInfoSelected.ProjectDescription != null ? vm.projectCharterInfoSelected.ProjectDescription : null,
                TargetEndState: vm.projectCharterInfoSelected.TargetEndState != null ? vm.projectCharterInfoSelected.TargetEndState : null,
                IsCapsProject: vm.projectCharterInfoSelected.IsCapsProject,
                CalculatedEmissionsImpact: (vm.projectCharterInfoSelected.CalculatedEmissionsImpact != null && vm.projectCharterInfoSelected.CalculatedEmissionsImpact !== "") ? vm.projectCharterInfoSelected.CalculatedEmissionsImpact : null,
                EmissionPortfolioID: (vm.projectCharterInfoSelected.EmissionPortfolioID != null && vm.projectCharterInfoSelected.EmissionPortfolioID !== "") ? vm.projectCharterInfoSelected.EmissionPortfolioID : null,
                EmissionsImpactRealizationDate: (vm.projectCharterInfoSelected.EmissionsImpactRealizationDate != null && vm.projectCharterInfoSelected.EmissionsImpactRealizationDate !== "") ? vm.projectCharterInfoSelected.EmissionsImpactRealizationDate : null,
                NoCarbonImpact: (vm.projectCharterInfoSelected.NoCarbonImpact != null && vm.projectCharterInfoSelected.NoCarbonImpact !== "") ? vm.projectCharterInfoSelected.NoCarbonImpact : null,
                EnergyCostImpactPerYear: (vm.projectCharterInfoSelected.EnergyCostImpactPerYear != null && vm.projectCharterInfoSelected.EnergyCostImpactPerYear !== "") ? vm.projectCharterInfoSelected.EnergyCostImpactPerYear : null,
                EnergyImpact: vm.projectCharterInfoSelected.EnergyImpact,
                EnergyWasteImpactCostPerYear: (vm.projectCharterInfoSelected.EnergyWasteImpactCostPerYear != null && vm.projectCharterInfoSelected.EnergyWasteImpactCostPerYear !== "") ? vm.projectCharterInfoSelected.EnergyWasteImpactCostPerYear : null,
                EnergyWasteImpactPerYear: vm.projectCharterInfoSelected.EnergyWasteImpactPerYear,
                EnergyWaterImpactCostPerYear: (vm.projectCharterInfoSelected.EnergyWaterImpactCostPerYear != null && vm.projectCharterInfoSelected.EnergyWaterImpactCostPerYear !== "") ? vm.projectCharterInfoSelected.EnergyWaterImpactCostPerYear : null,
                EnergyWaterImpactPerYear: vm.projectCharterInfoSelected.EnergyWaterImpactPerYear,
            };

            listdataMilestone.push(vm.insertUpdateDeleteMilestone);
            listdataRisk.push(vm.insertUpdateDeleteRisk);

            listdataTeams.push(vm.insertUpdateDeleteTeams);
            listdataKeySuccess.push(vm.insertUpdateDeleteKeySuccess);
            listdataAssumption.push(vm.insertUpdateDeleteAssumption);
            listdataFunding.push(vm.insertUpdateDeleteFunding);
            listdataProjectCharterInfo.push(vm.projectCharterInfoSelectedData);

            var dataToSend = { "ProjectID": vm.projectCharterInfoSelected.ProjectID, "objRiskIssue": JSON.stringify(listdataRisk), "objMilestone": JSON.stringify(listdataMilestone), "objProjectTeam": JSON.stringify(listdataTeams), "objKeySuccess": JSON.stringify(listdataKeySuccess), "objAssumption": JSON.stringify(listdataAssumption), "objFunding": JSON.stringify(listdataFunding), "objProjectCharterInfo": JSON.stringify(listdataProjectCharterInfo), "userId": currentUserId, "objCapsCharter": JSON.stringify(CAPSCharterList), "CapsWaterWaste": JSON.stringify(vm.insertUpdateDeleteWaterWaste) };
            GETPostService.postDataWCFAsync('projectCharterUpdate', dataToSend).then(function (response) {
                //alert(response);
                if (response == "Success") {

                    angular.copy(vm.SelectedParentProject, originalParentProjCharter);
                    // charterDataSaved = true;
                    dropdownSetValuePC();
                    OriginalPCdata = {};



                    hideLoading();
                    if (IsProgram) {
                        getProgramDataForGrids();
                    }
                    else {
                        getDataForGrids();
                    }
                    //$rootScope.$emit("UpdateProjectNameHub", vm.projectCharterInfoSelected.ProjectName);
                    //$rootScope.$emit("UpdateProjectNameDetail", vm.projectCharterInfoSelected.ProjectName);
                    $.when(GETPostService.postDataWCF("getProjectNameByID", SeletedProjectId),
                        GETPostService.getDataWCF("getProjectTeam/" + SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterInfoByID", SeletedProjectId))
                        .then(function (resProjectName, team, resProjectCharterInfo) {
                            var dsProjectCharterInfo = JSON.parse(resProjectCharterInfo.getProjectCharterInfoByIDResult);
                            var tempData = dsProjectCharterInfo[0];
                            vm.projectCharterInfoSelected.ProjectManagerName = tempData.ProjectManagerName;
                            vm.projectCharterInfoSelected.SponsorName = tempData.SponsorName;

                            /*************************START:For CAPS*********************************/
                            var unitCostExist = tempData.isUnitCost;
                            vm.isUnitCost = tempData.isUnitCost;
                            var selectedEmissionPCaps = [];
                            if (tempData.EmissionPortfolioID != null && tempData.EmissionPortfolioID != "") {
                                vm.isEMPortfolio = true;
                            }
                            else {
                                vm.isEMPortfolio = false;
                            }
                       
                            beforeSaveIsUnit = vm.isUnitCost;
                            vm.projectCharterInfoSelected.EnergyImpact = tempData.EnergyImpact;
                            vm.projectCharterInfoSelected.EnergyCostImpactPerYear = tempData.EnergyCostImpactPerYear;
                            vm.projectCharterInfoSelected.EnergyWasteImpactCostPerYear = tempData.EnergyWasteImpactCostPerYear;
                            vm.projectCharterInfoSelected.EnergyWasteImpactPerYear = tempData.EnergyWasteImpactPerYear;
                            vm.projectCharterInfoSelected.EnergyWaterImpactCostPerYear = tempData.EnergyWaterImpactCostPerYear;
                            vm.projectCharterInfoSelected.EnergyWaterImpactPerYear = tempData.EnergyWaterImpactPerYear;
                            vm.formattedCalculated = kendo.toString(tempData.CalculatedEmissionsImpact, "n1");
                            /*************************END:For CAPS Grid binding is in below section*********************************/


                            vm.projectCharterInfoSelected.EmissionsImpactRealizationDate = tempData.EmissionsImpactRealizationDate;
                            angular.copy(vm.projectCharterInfoSelected, OriginalPCdata);
                            var ProjDetail = JSON.parse(resProjectName.getProjectNameByIDResult);
                            SeletedProjectName = ProjDetail[0].ProjectName;
                            $rootScope.$emit("UpdateProjectNameHub", SeletedProjectName);
                            $rootScope.$emit("ProjectHubGetCall", SeletedProjectName);
                            $rootScope.$emit("overallStatusProjectCharter");

                            if (IsProgram) {
                                $rootScope.$emit("getProgramHubOverallData");
                            }
                            else {
                                $rootScope.$emit("getProjectHubOverallData");
                            }
                            var gridDataTeam = [];
                            gridDataTeam = JSON.parse(team.getProjectTeamResult);
                            if (ProjectSiteUrl != "" && gridDataTeam.length > 0 && ProjDetail[0].IsConfidential == true) {
                                var arrayTeam = [];
                                angular.copy(gridDataTeam, arrayTeam);
                                GETPostService.getAllMembers(arrayTeam);
                            }

                        });

                    $rootScope.$emit("UpdateHubLoad", true);
                    $rootScope.$emit("UpdateGeneralInfo", true);
                    $rootScope.$emit("RefreshForDataQuality");
                    $scope.$digest();
                    alert(saveMessage);
                    //$("#projectCharterSave").closest(".k-window-content").data("kendoWindow").close();

                }
                else {
                    hideLoading();
                    alert("Error occurred in Project Charter Update");

                    var dataToSendErr = {
                        "method": "updateProjectCharterInfo", "exceptionMessage": "message:" + response, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                        .then(function (response) {
                            console.log(errormessage);
                        });

                }
            });
        }
        catch (err) {
            hideLoading();
            var dataToSendErr = {
                "method": "updateProjectCharterInfo", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    }
    function getDataForGrids() {
        milestoneToAdd = [];
         var dataToSendForMilestoneSet = {
            "ProjectID" : SeletedProjectId, "DataType": "TemplateDetails"
         };
        var dataToSendForMilestoneTemplate = {
            "ProjectID" : SeletedProjectId, "DataType": "Template"
         };
        $.when(GETPostService.getDataWCFAsync("getRiskIssue/" + SeletedProjectId), GETPostService.getDataWCFAsync("getProjectTeam/" + SeletedProjectId), GETPostService.getDataWCFAsync("getSchedule/" + SeletedProjectId),
            GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterFunding", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterAssumption", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCapsDetails", SeletedProjectId),
            GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneTemplate), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneSet), GETPostService.postDataWCFAsync("getCAPSWaterWasteByProjectID", SeletedProjectId),
             GETPostService.postDataWCFAsync("getCAPSWaterWaste"))
            .then(function (resRiskIssue, resTeam, resSchedule, resKeySuccess, resFunding, resAssumption, resCapsData, resMilestoneTemplates, resMilestoneTemplateDetail, resCapsWaterWasteProjectCharter, resCapsWaterWasteStreamCharter) {
                try {
                    gridDataRiskIssue = JSON.parse(resRiskIssue.getRiskIssueResult);
                    gridDataTeam = JSON.parse(resTeam.getProjectTeamResult);
                    gridDataSchedule = JSON.parse(resSchedule.getScheduleResult);
                    gridDataKeySuccess = JSON.parse(resKeySuccess.getProjectCharterKeySuccessResult);
                    gridDataAssumption = JSON.parse(resAssumption.getProjectCharterAssumptionResult);
                    gridDataFunding = JSON.parse(resFunding.getProjectCharterFundingResult);
                    gridCharterCapsDataAllPortfolio = JSON.parse(resCapsData.getProjectCapsDetailsResult);
                    gridCharterCapsData = gridCharterCapsDataAllPortfolio.filter(function (entry) {
                        return entry.EMPortfolioOwnerID == vm.projectCharterInfoSelected.EmissionPortfolioID;
                    });
                    //Milestone Set
                    grdMilestoneTemplate = JSON.parse(resMilestoneTemplates);
                    grdMilestoneTemplateDetail = JSON.parse(resMilestoneTemplateDetail);
                    gridCapsDataWaterWasteCharter = JSON.parse(resCapsWaterWasteProjectCharter.getCAPSWaterWasteByProjectIDResult);
                    UpdateProjectTeamUsers();
                    $('#gridProjectCharterKeySuccessCriteria').data('kendoGrid').dataSource.read();
                    $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.read();
                    $('#gridProjectTeam').data('kendoGrid').dataSource.read();
                    $('#gridProjectCharterRisk').data('kendoGrid').dataSource.read();
                    $('#gridProjectCharterAssumption').data('kendoGrid').dataSource.read();
                    $('#gridProjectCharterFunding1').data('kendoGrid').dataSource.read();
                    $('#gridCapsCharter').data('kendoGrid').dataSource.read();
                    $('#gridCapsWaterWasteCharter').data('kendoGrid').dataSource.read();
                   // $('#gridCharterAddMilestones').data('kendoGrid').refresh();
                    var dataSource = new kendo.data.DataSource({ data: grdMilestoneTemplate });
                    var grid = $('#gridCharterAddMilestones').data('kendoGrid');
                    dataSource.read();
                    grid.setDataSource(dataSource);

                    $scope.$digest();
                }
                catch (err) {
                    hideLoading();
                    var dataToSendErr = {
                        "method": "getDataForGrids", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                        .then(function (response) {
                            alert(errormessage);
                        });
                }
            });
    }
    function isGuid(stringToTest) {
        if (stringToTest[0] === "{") {
            stringToTest = stringToTest.substring(1, stringToTest.length - 1);
        }
        var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
        return regexGuid.test(stringToTest);
    }
    function UpdateProjectTeamUsers() {
        try {
            projectTeam = [];
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
           
        }
        catch (err) {
            hideLoading();
            var dataToSendErr = {
                "method": "UpdateProjectTeamUsers", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    }
    //Program Hub
    function prepareDataForProgramCharter() {
        vm.deletedMilestoneData = [];
        vm.deletedRiskData = [];
        vm.deletedKeySuccessData = [];
        vm.deletedAssumptionData = [];
        vm.deletedTeamsData = [];
        vm.deletedFundingData = [];

        vm.pcApprovedDateError = false;
        vm.isPortfolioOwnerEditablePC = canPortfolioOwnerEdit;
        vm.CharterRealizationDateCaps = false;
        vm.isEMPortfolio = false;
        var dataToSendForMilestoneSet = {
            "ProjectID": SeletedProjectId, "DataType": "TemplateDetails"
        };
        var dataToSendForMilestoneTemplate = {
            "ProjectID": SeletedProjectId, "DataType": "Template"
        };
        try {
            //SeletedProjectName = getParameterByName(window.location.search, "ProblemTitle");
            SeletedProjectId = getParameterByName(window.location.search, "ProblemID");
            dataToSendForRisk = {
                "ProjectID": SeletedProjectId, "DataType": "RiskIssue"
            };
            dataToSendForMilestone = {
                "ProjectID": SeletedProjectId, "DataType": "Schedule"
            };
            var lookup = product + "," + portfolioOwner + "," + CapitalProjectClassification + "," + topsFunctionRequired + "," + riskIssueType + "," + businessCaseFundingType + "," + funtionalGroup + "," + executionScope + "," + teamPermission + "," + topsPrimaryKpi + "," + agileAttribute + "," + agileWave;;
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForRisk),
                GETPostService.getDataWCFAsync("getProjectTeam/" + SeletedProjectId), GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForMilestone),
                GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterFunding", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterInfoByID", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterAssumption", SeletedProjectId), GETPostService.getDataWCFAsync("getUserPermissionByProjectUserId/" + currentUserId + "/" + SeletedProjectId),
                GETPostService.postDataWCFAsync("getProjectCapsDetails", SeletedProjectId), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneTemplate), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneSet),GETPostService.postDataWCFAsync("getCAPSWaterWasteByProjectID", SeletedProjectId),
             GETPostService.postDataWCFAsync("getCAPSWaterWaste"))
                .then(function (resLookup, resRiskIssue, resTeam, resSchedule, resKeySuccess, resFunding, resProjectCharterInfo, resAssumption, resPermission, resCapsData, resMilestoneTemplates, resMilestoneTemplateDetail, resCapsWaterWasteProjectCharter, resCapsWaterWasteStreamCharter) {
                    try {
                        vm.dsPermission = JSON.parse(resPermission.getUserPermissionByProjectUserIdResult);

                        if (vm.dsPermission[0].canEdit == true) {

                            vm.isEditable = true;

                        } else vm.isEditable = false;

                        vm.dsPrimaryProduct = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === product;
                        });
                        vm.dsOwner = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === portfolioOwner;
                        });
                        vm.dsExecutionScope = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == executionScope;
                        }), "LookUpMemberOrder");
                        vm.dsProjectClassification = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === CapitalProjectClassification;
                        });

                        vm.dsAgilePrimaryWorkstation = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == agileAttribute;
                        });
                        vm.dsAgileWave = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == agileWave;
                        });
                        vm.dsPrimaryKPI = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == topsPrimaryKpi;
                        }), "LookUpMemberOrder");
                        vm.functionRequired = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === topsFunctionRequired;
                        });
                        //vm.dsPrograms = getdropdowndata(resPrograms);
                        //vm.dsResList = getdropdowndata(resAllRes);

                        vm.dsProjectClassification = $filter('orderBy')(vm.dsProjectClassification, 'LookUpMemberOrder');
                        vm.dsPrimaryProduct = $filter('orderBy')(vm.dsPrimaryProduct, 'LookUpMemberOrder');//LookUpMemberOrder
                        // vm.dsResList = JSON.parse(userInfo.getUserDataResult);

                        //   vm.dsResListBulk = JSON.parse(userBulk.GetUserForBulkResult);

                        //vm.dsProgram = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                        //    return entry.LookUpName === program;
                        //});
                        //vm.dsProject = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                        //    return entry.LookUpName === project;
                        //});
                        vm.dsFundingType = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === businessCaseFundingType;
                        });
                        // usergroups = JSON.parse(group.getUserTeamPermissionResult);

                        var dsProjectCharterInfo = JSON.parse(resProjectCharterInfo.getProjectCharterInfoByIDResult);
                        if (dsProjectCharterInfo.length > 0) {
                            vm.projectCharterInfoSelected = dsProjectCharterInfo[0];
                        }
                        vm.localCurrencyAbbrePlaceholder = vm.projectCharterInfoSelected.LocalCurrencyAbbreviation;
                        //LocalCurrencyAbbreviation
                        if (vm.projectCharterInfoSelected.LocalCurrencyAbbreviation != null)
                            vm.localCurrencyAbbre = "(" + vm.projectCharterInfoSelected.LocalCurrencyAbbreviation + ")";

                        var ParentProgramName = vm.projectCharterInfoSelected.ParentProgramName;
                        var ParentProgramID = vm.projectCharterInfoSelected.ParentProgramID;
                        createParentProj(ParentProgramID, ParentProgramName);

                        /*************************START:For Water and Waste in CAPS*********************************/

                        gridCapsDataWaterWasteCharter = JSON.parse(resCapsWaterWasteProjectCharter.getCAPSWaterWasteByProjectIDResult);

                        WaterWasteDataSetCharter = JSON.parse(resCapsWaterWasteStreamCharter.getCAPSWaterWasteResult);

                        WaterWasteOptionsCharter = Array.from(new Set(WaterWasteDataSetCharter.map((item) => item.WWStream)))
                        WaterWasteTypeOptionsCharter = Array.from(new Set(WaterWasteDataSetCharter.map((item) => item.WWType)))
                        WaterWasteCategoryOptionsCharter = Array.from(new Set(WaterWasteDataSetCharter.map((item) => item.Category)))

                        vm.isUnitCostWWC = vm.projectCharterInfoSelected.isUnitCostWWC;
                   

                        /*************************END:For Water and Waste in CAPS*********************************/

                        if (vm.projectCharterInfoSelected.PrimaryProductID != null && vm.projectCharterInfoSelected.PrimaryProductID != "") {
                            var selectedPrimaryProduct = vm.dsPrimaryProduct.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.PrimaryProductID;
                            });
                            vm.projectCharterInfoSelected.PrimaryProductID = selectedPrimaryProduct[0];
                        }

                        if (vm.projectCharterInfoSelected.PortfolioOwnerID != null && vm.projectCharterInfoSelected.PortfolioOwnerID != "") {
                            var selectedPortfolio = vm.dsOwner.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.PortfolioOwnerID;
                            });
                            vm.projectCharterInfoSelected.PortfolioOwnerID = selectedPortfolio[0];
                        }

                        //if (vm.projectCharterInfoSelected.SVPElementTypeID != null && vm.projectCharterInfoSelected.SVPElementTypeID != "") {
                        //    var selectedSVPElement = vm.svpElement.filter(function (entry) {
                        //        return entry.LookUpMemberID == vm.projectCharterInfoSelected.SVPElementTypeID;
                        //    });
                        //    vm.projectCharterInfoSelected.SVPElementTypeID = selectedSVPElement[0];
                        //}
                        if (vm.projectCharterInfoSelected.GovernanceBodyTypeID != null && vm.projectCharterInfoSelected.GovernanceBodyTypeID != "") {
                            var selectedGovernance = vm.dsOwner.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.GovernanceBodyTypeID;
                            });
                            vm.projectCharterInfoSelected.GovernanceBodyTypeID = selectedGovernance[0];
                        }

                        if (vm.projectCharterInfoSelected.FunctionsRequiredID != null && vm.projectCharterInfoSelected.FunctionsRequiredID != "") {
                            var selectedFunction = vm.functionRequired.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.FunctionsRequiredID;
                            });
                            vm.projectCharterInfoSelected.FunctionsRequiredID = selectedFunction[0];
                        }
                        if (vm.projectCharterInfoSelected.PrimaryKPI != null && vm.projectCharterInfoSelected.PrimaryKPI != "") {
                            var selectedPrimaryKPI = vm.dsPrimaryKPI.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.PrimaryKPI;
                            });
                            vm.projectCharterInfoSelected.PrimaryKPI = selectedPrimaryKPI[0];
                        }
                        var selectedAgilePrimaryWorkstream = [];
                        if (vm.projectCharterInfoSelected.AgilePrimaryWorkstream != null && vm.projectCharterInfoSelected.AgilePrimaryWorkstream != "") {
                            selectedAgilePrimaryWorkstream = vm.dsAgilePrimaryWorkstation.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.AgilePrimaryWorkstream;
                            });
                        }
                        vm.selectedAgilePrimaryWorkstream = selectedAgilePrimaryWorkstream.length > 0 ? selectedAgilePrimaryWorkstream[0] : "";

                        var selectedAgileWave = [];
                        if (vm.projectCharterInfoSelected.AgileWave != null && vm.projectCharterInfoSelected.AgileWave != "") {
                            selectedAgileWave = vm.dsAgileWave.filter(function (entry) {
                                return entry.LookUpMemberID == vm.projectCharterInfoSelected.AgileWave;
                            });
                        }
                        vm.selectedAgileWave = selectedAgileWave.length > 0 ? selectedAgileWave[0] : "";
                        //if (IsConfidential) {
                        //    var teamPermissions = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                        //        return entry.LookUpName === teamPermission
                        //    });
                        //    for (var i = 0; i < teamPermissions.length; i++) {
                        //        var item = {
                        //            "text": teamPermissions[i].LookUpMemberName, "value": teamPermissions[i].LookUpMemberID
                        //        }
                        //        permissionbulk.push(item);
                        //    }
                        //}
                        //else {
                        //Set ReadOnly as default
                        var teamPermissions = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return (entry.LookUpName === teamPermission && entry.LookUpMemberName != 'None')
                        });
                        for (var i = 0; i < teamPermissions.length; i++) {
                            var item = {
                                "text": teamPermissions[i].LookUpMemberName, "value": teamPermissions[i].LookUpMemberID
                            }
                            permissionbulk.push(item);
                        }
                        //}
                        //var selectedUser = vm.dsResList.filter(function (entry) {
                        //    return entry.UserADId === vm.projectCharterInfoSelected.ProjectManagerId;
                        //});
                        //vm.projectCharterInfoSelected.ProjectManagerADID = selectedUser[0];

                        gridDataRiskIssue = JSON.parse(resRiskIssue);
                        gridDataTeam = JSON.parse(resTeam.getProjectTeamResult);
                        gridDataSchedule = JSON.parse(resSchedule);

                        gridDataKeySuccess = JSON.parse(resKeySuccess.getProjectCharterKeySuccessResult);
                        gridDataAssumption = JSON.parse(resAssumption.getProjectCharterAssumptionResult);
                        gridDataFunding = JSON.parse(resFunding.getProjectCharterFundingResult);

                        //Milestone Set
                        grdMilestoneTemplate = JSON.parse(resMilestoneTemplates);
                        grdMilestoneTemplateDetail = JSON.parse(resMilestoneTemplateDetail);
                        vm.riskIssueType = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === riskIssueType;
                        });
                        vm.dsFuntionalGroup = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName === funtionalGroup;
                        });
                        vm.agileVisibleCharter = vm.projectCharterInfoSelected.IsAgile;
                        var impObj = [];
                        var exScope = [];
                        var agileSecWorkstream = [];

                        if (vm.projectCharterInfoSelected.OtherImpactedProducts != null && vm.projectCharterInfoSelected.OtherImpactedProducts != 'undefined') {
                            impObj = vm.projectCharterInfoSelected.OtherImpactedProducts.split(',');
                        }

                        if (vm.projectCharterInfoSelected.ExecutionScopeID != null && vm.projectCharterInfoSelected.ExecutionScopeID != 'undefined') {
                            exScope = vm.projectCharterInfoSelected.ExecutionScopeID.split(',');
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
                        vm.projectCharterInfoSelected.OtherImpactedProducts = impObj;
                        vm.dsExecutionScope = {
                            placeholder: "Select scope...",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsExecutionScope,
                            filter: "contains"
                        };
                        vm.projectCharterInfoSelected.ExecutionScope = exScope;

                        if (vm.projectCharterInfoSelected.AgileSecondaryWorkstream != null && vm.projectCharterInfoSelected.AgileSecondaryWorkstream != 'undefined') {
                            agileSecWorkstream = vm.projectCharterInfoSelected.AgileSecondaryWorkstream.split(',');
                        }

                        vm.dsAgileSecWorkstream = {
                            placeholder: "Select secondary workstream...",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsAgilePrimaryWorkstation,
                            filter: "contains"
                        };
                        vm.agileSecWorkstreamIds = agileSecWorkstream;
                        var primaryProductlist = $("#ddl_PC_PrimaryProduct").data("kendoComboBox");
                        primaryProductlist.value(vm.SelectedProject.PrimaryProductID);
                        primaryProductlist.refresh();

                        var portfolioOwnerlist = $("#ddl_PC_PortfolioOwner").data("kendoComboBox");
                        portfolioOwnerlist.value(vm.SelectedProject.PortfolioOwnerID);
                        portfolioOwnerlist.refresh();
                        OriginalPCdata = {};

                        angular.copy(vm.projectCharterInfoSelected, OriginalPCdata);

                        /*************************START:For CAPS*********************************/
                        var unitCostExist = vm.projectCharterInfoSelected.isUnitCost;
                        vm.isUnitCost = vm.projectCharterInfoSelected.isUnitCost;
                        var selectedEmissionPCaps = [];
                        if (vm.projectCharterInfoSelected.EmissionPortfolioID != null && vm.projectCharterInfoSelected.EmissionPortfolioID != "") {
                            vm.isEMPortfolio = true;
                        }
                        else {
                            vm.isEMPortfolio = false;
                        }
                        gridCharterCapsDataAllPortfolio = JSON.parse(resCapsData.getProjectCapsDetailsResult);
                        gridCharterCapsData = gridCharterCapsDataAllPortfolio.filter(function (entry) {
                            return entry.EMPortfolioOwnerID == vm.projectCharterInfoSelected.EmissionPortfolioID;
                        });
                        angular.copy(gridCharterCapsData, beforeSaveGriddata);
                        beforeSaveIsUnit = vm.isUnitCost;
                        beforeSaveEnergy = vm.projectCharterInfoSelected.EnergyCostImpactPerYear;
                        vm.formattedCalculated = kendo.toString(vm.projectCharterInfoSelected.CalculatedEmissionsImpact, "n1");
                        /*************************END:For CAPS Grid binding is in below section*********************************/

                        if (charterCount == 0) {
                            for (var i = 0; i < vm.riskIssueType.length; i++) {
                                var item3 = {
                                    "text": vm.riskIssueType[i].LookUpMemberName, "value": vm.riskIssueType[i].LookUpMemberID
                                }
                                riskIssueTypeBulk.push(item3);
                            }

                            //booleanTypeBulk.push([{ "text": Yes, "value": True }, { "text": No, "value": false }]);

                            for (var i = 0; i < vm.dsFundingType.length; i++) {
                                var item2 = {
                                    "text": vm.dsFundingType[i].LookUpMemberName, "value": vm.dsFundingType[i].LookUpMemberID
                                }
                                fundingTypeValues.push(item2);
                            }
                            for (var i = 0; i < vm.dsOwner.length; i++) {
                                var item1 = {
                                    "text": vm.dsOwner[i].LookUpMemberName, "value": vm.dsOwner[i].LookUpMemberID
                                }
                                fundingSourceValues.push(item1);
                            }
                            for (var i = 0; i < vm.dsFuntionalGroup.length; i++) {
                                var item4 = {
                                    "text": vm.dsFuntionalGroup[i].LookUpMemberName, "value": vm.dsFuntionalGroup[i].LookUpMemberID
                                }
                                functionalgroupBulk.push(item4);
                            }
                            for (var i = 0; i < vm.dsPrimaryKPI.length; i++) {
                                var item5 = {
                                    "text": vm.dsPrimaryKPI[i].LookUpMemberName, "value": vm.dsPrimaryKPI[i].LookUpMemberID
                                }
                                primaryKpiGrid.push(item5);
                            }
                            for (var i = 0; i < vm.dsFuntionalGroup.length; i++) {
                                var isDisabled = false;
                                if (vm.dsFuntionalGroup[i].LookUpMemberID == projectmanager || vm.dsFuntionalGroup[i].LookUpMemberID == projectSponsor) { isDisabled = true; }
                                var item = {
                                    "text": vm.dsFuntionalGroup[i].LookUpMemberName, "value": vm.dsFuntionalGroup[i].LookUpMemberID, "isDisabled": isDisabled
                                }
                                rolesBulk.push(item);
                            }


                            InitkGridProjectCharterKeySuccessCriteria();
                            InitkGridProjectCharterMilestone();
                            InitkGridProjectTeam();
                            InitkGridProjectCharterRisk();
                            InitkGridProjectCharterFunding();
                            InitMilestoneTemplates();
                                 InitKendoGridCapsWaterWasteCharter();

                            InitKendoGridCapsCharter();

                            /*************************END:For CAPS*********************************/
                        }
                        else {
                            UpdateProjectTeamUsers();
                            $('#gridProjectCharterKeySuccessCriteria').data('kendoGrid').dataSource.read();
                            $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.read();
                            $('#gridProjectTeam').data('kendoGrid').dataSource.read();
                            $('#gridProjectCharterRisk').data('kendoGrid').dataSource.read();
                            $('#gridProjectCharterAssumption').data('kendoGrid').dataSource.read();
                            $('#gridProjectCharterFunding1').data('kendoGrid').dataSource.read();
                            $('#gridCapsCharter').data('kendoGrid').dataSource.read();
                            $('#gridCapsWaterWasteCharter').data('kendoGrid').dataSource.read();
                            var dataSource = new kendo.data.DataSource({ data: grdMilestoneTemplate });
                            var grid = $('#gridCharterAddMilestones').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);
                        }
                        bindChangeComboBox("functionRequired");
                        gridAddDefaultRows();

                        $scope.$digest();
                        hideLoading();
                        charterCount++;
                    }
                    catch (err) {
                        hideLoading();
                        var dataToSend = {
                            "method": "prepareDataForProgramCharter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { alert(errormessage) });
                    }
                });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "prepareDataForProgramCharter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    }

    function getProgramDataForGrids() {
        milestoneToAdd = [];
        var dataToSendForMilestoneSet = {
            "ProjectID": SeletedProjectId, "DataType": "TemplateDetails"
        };
        var dataToSendForMilestoneTemplate = {
            "ProjectID": SeletedProjectId, "DataType": "Template"
        };
        $.when(GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForRisk), GETPostService.getDataWCFAsync("getProjectTeam/" + SeletedProjectId), GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForMilestone),
            GETPostService.postDataWCFAsync("getProjectCharterKeySuccess", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterFunding", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCharterAssumption", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectCapsDetails", SeletedProjectId), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneTemplate), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneSet), GETPostService.postDataWCFAsync("getCAPSWaterWasteByProjectID", SeletedProjectId),
             GETPostService.postDataWCFAsync("getCAPSWaterWaste"))
            .then(function (resRiskIssue, resTeam, resSchedule, resKeySuccess, resFunding, resAssumption, resCapsData, resMilestoneTemplates, resMilestoneTemplateDetail, resCapsWaterWasteProjectCharter, resCapsWaterWasteStreamCharter) {
                try {
                    gridDataRiskIssue = JSON.parse(resRiskIssue);
                    gridDataTeam = JSON.parse(resTeam.getProjectTeamResult);
                    gridDataSchedule = JSON.parse(resSchedule);
                    gridDataKeySuccess = JSON.parse(resKeySuccess.getProjectCharterKeySuccessResult);
                    gridDataAssumption = JSON.parse(resAssumption.getProjectCharterAssumptionResult);
                    gridDataFunding = JSON.parse(resFunding.getProjectCharterFundingResult);
                    gridCharterCapsDataAllPortfolio = JSON.parse(resCapsData.getProjectCapsDetailsResult);
                    gridCharterCapsData = gridCharterCapsDataAllPortfolio.filter(function (entry) {
                        return entry.EMPortfolioOwnerID == vm.projectCharterInfoSelected.EmissionPortfolioID;
                    });
                    //Milestone Set
                        grdMilestoneTemplate = JSON.parse(resMilestoneTemplates);
                        grdMilestoneTemplateDetail = JSON.parse(resMilestoneTemplateDetail);
                        gridCapsDataWaterWasteCharter = JSON.parse(resCapsWaterWasteProjectCharter.getCAPSWaterWasteByProjectIDResult);

                    UpdateProjectTeamUsers();
                    $('#gridProjectCharterKeySuccessCriteria').data('kendoGrid').dataSource.read();
                    $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.read();
                    $('#gridProjectTeam').data('kendoGrid').dataSource.read();
                    $('#gridProjectCharterRisk').data('kendoGrid').dataSource.read();
                    $('#gridProjectCharterAssumption').data('kendoGrid').dataSource.read();
                    $('#gridProjectCharterFunding1').data('kendoGrid').dataSource.read();
                    //$('#gridCharterAddMilestones').data('kendoGrid').refresh();
                    $('#gridCapsCharter').data('kendoGrid').dataSource.read();
                    $('#gridCapsWaterWasteCharter').data('kendoGrid').dataSource.read();
                    var dataSource = new kendo.data.DataSource({ data: grdMilestoneTemplate });
                    var grid = $('#gridCharterAddMilestones').data('kendoGrid');
                    dataSource.read();
                    grid.setDataSource(dataSource);
                    $scope.$digest();
                }
                catch (err) {
                    hideLoading();
                    var dataToSendErr = {
                        "method": "getProgramDataForGrids", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                        .then(function (response) {
                            alert(errormessage);
                        });
                }
            });
    }

    function createParentProj(ParentProgramID, ParentProgramName) {
        var dsProjects = [{ "ProblemUniqueID": ParentProgramID, "ProjectName": ParentProgramName }];
        var searchFor = "Parent";
        var projectUID = SeletedProjectId;
        var SelectedParentProjCharter = ParentProgramID;
        searchProjectParentCharter("pc_parentProject", dsProjects, searchFor, projectUID, SelectedParentProjCharter);

        var SelectedParentProjCharter = [];


        //selectedParentProj = (vm.dsGIProgram).filter(function (entry) {
        //    return entry.LookUpMemberID == vm.SelectedProject.ParentProgramID;
        //});


        vm.SelectedParentProject = dsProjects[0];//selectedParentProj.length > 0 ? selectedParentProj[0] : "";
        angular.copy(vm.SelectedParentProject, originalParentProjCharter);
    }

    function searchProjectParentCharter(inputId, dsProjects, searchFor, projectUID, SelectedParentProjCharter) {
        var selectedPeoplefilter = "";
        var projCombo = $("#" + inputId).data("kendoComboBox");
        if (projCombo == undefined) {
            $("#" + inputId).kendoComboBox({
                dataTextField: "ProjectName",
                dataValueField: "ProblemUniqueID",
                dataSource: dsProjects,
                minLength: 3,
                value: SelectedParentProjCharter,
                //select: onParentProgChange,
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
                    }
                },
            });
            try {
                $('#' + inputId).data().kendoComboBox.input.on('keydown', function (e) {
                    if (e.keyCode == 13) {
                        // if (canFilter == true) {
                        var projCombo = $("#" + inputId).data("kendoComboBox");

                        var userFilter = "";
                        console.log(projCombo.value());
                        var input = projCombo.input[0].value;
                        var isConfidentialPrj = vm.projectCharterInfoSelected.IsConfidential === true ? "1" : "0";
                        console.log(input);
                        if (input.length >= 3) {
                            displayLoading();
                            var dataToSend = {
                                "programUID": projectUID, "searchFor": searchFor + '-' + vm.projectCharterInfoSelected.IsConfidential, "filterString": input
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
                $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
                hideLoading();
            }

        }
        else {
            projCombo.setDataSource(dsProjects);
            projCombo.value(SelectedParentProjCharter);
            hideLoading();
        }
        return selectedPeoplefilter;
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
        $("#gridCharterAddMilestones").kendoGrid({
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
                        title: "Include In Charter",
                        headerAttributes: { "class": "wrap-header" },
                        width: "8%",
                        template: function (e) {
                            if (e.IncludeInReport == true) {
                                return '<input type="checkbox" checked disabled />';
                            }
                            else {
                                return  '<input type="checkbox" disabled />';
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
                                        //dataremove = gridAllDataSchedule.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                        //gridAllDataSchedule.splice(dataremove, 1);
                                    }

                                }
                                $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.read();
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
                                            //dataremove = gridAllDataSchedule.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                            // gridAllDataSchedule.splice(dataremove, 1);
                                        }

                                    }
                                }
                            }
                            if (checked == false) {
                                $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.read();
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
    function AddMilestoneCharter() {
        try {          
            var showmsg = false;
            var templateMilestonemasterGrid = $("#gridCharterAddMilestones").data("kendoGrid");
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
                var templateMilestonemasterGrid = $("#gridCharterAddMilestones").data("kendoGrid");
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
                            temp.IncludeInCharter = item.IncludeInReport;
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
                                    gridDataSchedule[exestart].Comments = (gridDataSchedule[exestart].Comments != null && gridDataSchedule[exestart].Comments != "") ? gridDataSchedule[exestart].Comments : item.Comments;
                                    gridDataSchedule[exestart].FunctionGroupID = (item.FunctionGroupID != null && item.FunctionGroupID != "") ? item.FunctionGroupID : gridDataSchedule[exestart].FunctionGroupID;
                                    gridDataSchedule[exestart].IncludeInCharter = (gridDataSchedule[exestart].IncludeInCharter != null && gridDataSchedule[exestart].IncludeInCharter != "") ? gridDataSchedule[exestart].IncludeInCharter : item.IncludeInReport;
                                    gridDataSchedule[exestart].Milestone = item.Milestone;
                                    gridDataSchedule[exestart].MilestoneTemplateID = item.MilestoneTemplateID;
                                    gridDataSchedule[exestart].MilestoneID = item.MilestoneID;


                                    temp.ScheduleUniqueID = gridDataSchedule[exestart].ScheduleUniqueID;
                                    temp.MilestoneTemplateID = item.MilestoneTemplateID;
                                    temp.Milestone = item.Milestone;
                                    temp.Comments = item.Comments;
                                    temp.Variance = "NA";
                                    temp.FunctionGroupID = item.FunctionGroupID;
                                    temp.IncludeInCharter = item.IncludeInReport;
                                    temp.ProjectID = SeletedProjectId;
                                    temp.PlannedFinish = null;
                                    temp.BaselineFinish = null;
                                    temp.CompletionDate = null;
                                    temp.MilestoneType = item.MilestoneType;
                                    temp.MilestoneID = item.MilestoneID;
                                    milestoneToAdd.push(temp);

                                    //exestart = gridAllDataSchedule.findIndex(element => element.MilestoneType == 1);
                                    //gridAllDataSchedule[exestart].Comments = item.Comments;
                                    //gridAllDataSchedule[exestart].FunctionGroupID = item.FunctionGroupID;
                                    //gridAllDataSchedule[exestart].IncludeInReport = item.IncludeInReport;
                                    //gridAllDataSchedule[exestart].Milestone = item.Milestone;
                                    //gridAllDataSchedule[exestart].MilestoneTemplateID = item.MilestoneTemplateID;
                                    //gridAllDataSchedule[exestart].MilestoneID = item.MilestoneID;

                                }
                                else if (item.MilestoneType == 2) {
                                    var exestart = gridDataSchedule.findIndex(element => element.MilestoneType == 2);
                                    gridDataSchedule[exestart].Comments = (gridDataSchedule[exestart].Comments != null && gridDataSchedule[exestart].Comments != "") ? gridDataSchedule[exestart].Comments : item.Comments;
                                    gridDataSchedule[exestart].FunctionGroupID = (item.FunctionGroupID != null && item.FunctionGroupID != "") ? item.FunctionGroupID : gridDataSchedule[exestart].FunctionGroupID;
                                    gridDataSchedule[exestart].IncludeInCharter = (gridDataSchedule[exestart].IncludeInCharter != null && gridDataSchedule[exestart].IncludeInCharter != "") ? gridDataSchedule[exestart].IncludeInCharter : item.IncludeInReport;
                                    gridDataSchedule[exestart].Milestone = item.Milestone;
                                    gridDataSchedule[exestart].MilestoneTemplateID = item.MilestoneTemplateID;
                                    gridDataSchedule[exestart].MilestoneID = item.MilestoneID;

                                    temp.ScheduleUniqueID = gridDataSchedule[exestart].ScheduleUniqueID;
                                    temp.MilestoneTemplateID = item.MilestoneTemplateID;
                                    temp.Milestone = item.Milestone;
                                    temp.Comments = item.Comments;
                                    temp.Variance = "NA";
                                    temp.FunctionGroupID = item.FunctionGroupID;
                                    temp.IncludeInCharter = item.IncludeInReport;
                                    temp.ProjectID = SeletedProjectId;
                                    temp.PlannedFinish = null;
                                    temp.BaselineFinish = null;
                                    temp.CompletionDate = null;
                                    temp.MilestoneType = item.MilestoneType;
                                    temp.MilestoneID = item.MilestoneID;
                                    milestoneToAdd.push(temp);

                                    //exestart = gridAllDataSchedule.findIndex(element => element.MilestoneType == 1);
                                    //gridAllDataSchedule[exestart].Comments = item.Comments;
                                    //gridAllDataSchedule[exestart].FunctionGroupID = item.FunctionGroupID;
                                    //gridAllDataSchedule[exestart].IncludeInReport = item.IncludeInReport;
                                    //gridAllDataSchedule[exestart].Milestone = item.Milestone;
                                    //gridAllDataSchedule[exestart].MilestoneTemplateID = item.MilestoneTemplateID;
                                    //gridAllDataSchedule[exestart].MilestoneID = item.MilestoneID;

                                }
                                else {
                                    milestoneToAdd.push(temp);
                                    gridDataSchedule.push(temp);
                                    // gridAllDataSchedule.push(temp);
                                }
                            }
                        });

                    }
                }
                if (!isduplicate) {
                    if (milestoneToAdd.length > 0) {
                        $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.read();
                        var grid = $("#gridProjectCharterMilestone").data("kendoGrid");
                        angular.forEach(milestoneToAdd, function (item, index) {
                            var dataItem = grid.dataSource.get(item.ScheduleUniqueID);
                            dataItem.dirty = true;
                        });
                    }
                    $('#gridProjectCharterMilestone').data('kendoGrid').refresh();
                    var window = $("#dialogAddMilestoneCharter");
                    window.data("kendoWindow").close();
                }
            }
            else {
                var window = $("#dialogAddMilestoneCharter");
                window.data("kendoWindow").close();
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "AddMilestoneCharter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
                if (dialog == "dialogAddMilestoneCharter") {
                    if (doesDataSourceHaveChanges(grid.dataSource)) {
                        if (confirm(saveMilestoneConfirm)) {
                            UpdateMilestones();
                        }
                        else {
                            window.data("kendoWindow").open();
                        }
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
            vm.milestoneInsertListItems = [];
            vm.milestoneUpdateListItems = [];
            var listdataMilestone = [];

            var milestoneCharterLength = $("#gridProjectCharterMilestone").data("kendoGrid").tbody.find("input:checked").length;
            if (milestoneCharterLength > milestoneCharterCount) {
                alert(milestoneCountMessage);
                hideLoading();
                return false;
            }
            if ($('#gridProjectCharterMilestone').data('kendoGrid') != undefined) {
                var gridupdatedData = $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertMilestoneArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateMilestoneArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });

                angular.forEach(insertMilestoneArray, function (item, index) {
                    var temp = {};
                    temp.ScheduleUniqueID = item.ScheduleUniqueID;
                    temp.Milestone = item.Milestone;
                    temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                    temp.FunctionGroupID = item.FunctionGroupID;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    temp.ProjectID = item.ProjectID;
                    vm.milestoneInsertListItems.push(temp);
                });
                angular.forEach(updateMilestoneArray, function (item, index) {
                    var temp = {};
                    temp.ScheduleUniqueID = item.ScheduleUniqueID;
                    temp.Milestone = item.Milestone;
                    temp.Milestone = (item.MilestoneType == 1) ? MilestoneStartPrefix + item.Milestone : (item.MilestoneType == 2 ? MilestoneEndPrefix + item.Milestone : item.Milestone);

                    temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                    temp.FunctionGroupID = item.FunctionGroupID;
                    temp.IncludeInCharter = item.IncludeInCharter;
                    temp.ProjectID = item.ProjectID;
                    temp.link = item.link;
                    if (milestoneToAdd.length > 0) {
                        temp.MilestoneTemplateID = item.MilestoneTemplateID;
                        temp.MilestoneID = item.MilestoneID;
                      //  temp.IncludeInReport = item.IncludeInReport;
                        temp.Comments = item.Comments;
                    }
                    vm.milestoneUpdateListItems.push(temp);
                });
            }
            vm.insertUpdateDeleteMilestone = {
                "insert": vm.milestoneInsertListItems,
                "update": vm.milestoneUpdateListItems,
                "delete": vm.deletedMilestoneData
            };
            if (vm.milestoneInsertListItems.length > 0 || vm.milestoneUpdateListItems.length > 0 || vm.deletedMilestoneData.length > 0) {
                listdataMilestone.push(vm.insertUpdateDeleteMilestone);
                var dataToSend = { "ProjectID": vm.projectCharterInfoSelected.ProjectID, "objMilestone": JSON.stringify(listdataMilestone), "userId": currentUserId };
                GETPostService.postDataWCFAsync('updateProjectCharterSchedule', dataToSend).then(function (response) {
                    //alert(response);
                    if (response == "Success") {
                        alert("Milestone data updated successfully");
                        milestoneToAdd = [];
                        if (IsProgram) {
                            $.when(GETPostService.postDataWCFAsync("getProgramHubData", dataToSendForMilestone))
                                .then(function (resSchedule) {
                                    gridDataSchedule = JSON.parse(resSchedule);
                                    $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.read();
                                    $('#gridCharterAddMilestones').data('kendoGrid').refresh();
                                    $scope.$digest();
                                });
                        }
                        else {
                            $.when(GETPostService.getDataWCFAsync("getSchedule/" + SeletedProjectId))
                                .then(function (resSchedule) {
                                    gridDataSchedule = JSON.parse(resSchedule.getScheduleResult);
                                    $('#gridProjectCharterMilestone').data('kendoGrid').dataSource.read();
                                    $('#gridCharterAddMilestones').data('kendoGrid').refresh();
                                    $scope.$digest();
                                });
                        }
                        $rootScope.$emit("UpdateHubLoad", true);
                        var window = $("#dialogAddMilestoneCharter");
                        window.data("kendoWindow").open();
                    }
                });
            }
            else {
                var window = $("#dialogAddMilestoneCharter");
                window.data("kendoWindow").open();
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "UpdateMilestone", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    // alert(errormessage);
                });
        }
    }
    function doesDataSourceHaveChanges(ds) {
        var dirty = false;

        $.each(ds._data, function () {
            if (this.dirty == true) {
                dirty = true;
            }
        });

        if (ds._destroyed.length > 0) {
            dirty = true;
        }

        return dirty;
    }
    function initProjectCharter() {

    };
};