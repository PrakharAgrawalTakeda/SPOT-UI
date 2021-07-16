//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('BusinessCaseCtrl', BusinessCaseCtrl)
BusinessCaseCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function BusinessCaseCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    // Flag
    //array
    vm.dsBCPrimaryProduct = [];
    //  vm.dsOwner = [];
    // vm.dsProjectClassification = [];
    vm.dsProgram = [];
    vm.buildNo = buildNo;
    vm.releaseDate = releaseDate;
    //  vm.dsProject = [];
    vm.dsFeasibilityPeople = [];
    vm.dsFeasibilityTechnology = [];
    vm.dsFeasibilityBusiness = [];
    vm.dsFeasibilityManufacturing = [];
    vm.dsFeasibilityEquipment = [];
    vm.dsFundingType = [];
    vm.dsBCFunctionalOwner = [];

    vm.deletedMilestoneData = [];
    vm.deletedRiskData = [];
    vm.deletedKeySuccessData = [];
    vm.deletedAssumptionData = [];
    vm.deletedFundingData = [];
    vm.isOption2 = true;
    vm.isOption3 = true;
    vm.NoImpactSelected = true;
    vm.NoImpactSelected2 = true;
    vm.NoImpactSelected3 = true;
    vm.isCapsProjectChecked = true;
    vm.dateFormatlabel = dateLabel;
    //vm.executionStartOpt1DateError = false;
    vm.dateErrorMsg = InValidDateFormat;
    //option2
    vm.deletedMilestoneDataOption2 = [];
    vm.deletedFundingDataOption2 = [];
    vm.deletedRiskDataOption2 = [];
    vm.deletedKeySuccessDataOption2 = [];
    vm.deletedAssumptionDataOption2 = [];
    var beforeSaveGriddata = [];
    var beforeSaveGriddata2 = [];
    var beforeSaveGriddata3 = [];
    //option3
    vm.deletedMilestoneDataOption3 = [];
    vm.deletedFundingDataOption3 = [];
    vm.deletedRiskDataOption3 = [];
    vm.deletedKeySuccessDataOption3 = [];
    vm.deletedAssumptionDataOption3 = [];

    var gridTopsData = [];
    var gridTopsData1 = [];
    var gridTopsData2 = [];
    var gridTopsData3 = [];
    var topsBulk = [];
    vm.dsTopsFunctions = [];
    vm.dsTopsImpactMultiplier = [];
    vm.dsTopsInLineProductStrategy = [];
    vm.dsTopsProducts = [];
    vm.dsAdditionalAuthList = [];
    vm.localCurrencyAbbre;
    var fundingTypeBulk = [];
    var riskIssueImpactBulk = [];
    var likelihoodBulk = [];
    var fundingSourceBulk = [];
    var functionalOwnerBulk = [];
    var riskIssueTypeBulk = [];
    var inThePlan = [];
    var productMultiplier;
    var dsBCBudgetFunding = [];
    var dsBCKeyAssumption = [];
    var dsBCRiskIssue = [];
    var dsBCKeySuccess = [];
    var dsBCSchedule = [];
    var btnClickBusinessCase = 0;
    var dialogbindBC = false;
    var bcDataSaved = false;
    var clearOptionId1 = "";
    var clearOptionId2 = "";
    var clearOptionId3 = "";
    var OriginalBCdata = {};
    var OriginalbusinessOptionInfoSelector = {};
    var OriginalbusinessOption2InfoSelector = {};
    var OriginalbusinessOption3InfoSelector = {};
    var gridCapsData = [];
    var gridCapsData2 = [];
    var gridCapsData3 = [];

    var WaterWasteOptionsOpt = [];
    var WaterWasteDataSetOpt = [];
    var WaterWasteTypeOptionsOpt = [];
    var WaterWasteCategoryOptionsOpt = [];
    var deletedWaterWasteOpt1 = [];
    var deletedWaterWasteOpt2 = [];
    var deletedWaterWasteOpt3 = []
    var gridCapsDataWaterWasteOpt1 = [];
    var gridCapsDataWaterWasteOpt2 = [];
    var gridCapsDataWaterWasteOpt3 = [];
    var capsDataBC = [];
    //Object
    vm.SelectedProject = {};
    vm.tops = {};
    vm.businessOptionInfoSelector = {};
    vm.businessOption2InfoSelector = {};
    vm.businessOption3InfoSelector = {};

    vm.dsBCScheduleOpt1 = [];
    vm.dsBCScheduleOpt2 = [];
    vm.dsBCScheduleOpt3 = [];

    vm.dsBCKeySuccessOpt1 = {};
    vm.dsBCKeySuccessOpt2 = {};
    vm.dsBCKeySuccessOpt3 = {};

    vm.dsBCRiskIssueOpt1 = {};
    vm.dsBCRiskIssueOpt2 = {};
    vm.dsBCRiskIssueOpt3 = {};


    vm.dsBCKeyAssumptionOpt1 = {};
    vm.dsBCKeyAssumptionOpt2 = {};
    vm.dsBCKeyAssumptionOpt3 = {};

    vm.dsBCBudgetFundingOpt1 = {};
    vm.dsBCBudgetFundingOpt2 = {};
    vm.dsBCBudgetFundingOpt3 = {};
    //Function
    vm.initBusinessCase = initBusinessCase;
    vm.SaveBusinessCaseData = SaveBusinessCaseData;
    vm.businessCase = businessCase;
    vm.OpenBusinessCaseDialog = OpenBusinessCaseDialog;
    vm.businessCasePagepath = businessCasePagepath;
    vm.changeShowOpex = changeShowOpex;
    vm.AddNewRow = AddNewRow;
    //vm.addNewOption = addNewOption;
    vm.recommendOnChange = recommendOnChange;
    vm.onChangeCarbonImpact = onChangeCarbonImpact;
    vm.onChangeWWCostImpact = onChangeWWCostImpact;
    vm.businessDialogClose = businessDialogClose;
    vm.clearOption = clearOption;
    vm.trackEventFunc = trackEventFunc;
    //  vm.onBCProjectScopeChange = onBCProjectScopeChange;
    vm.GetBCProjectScopeDialog = GetBCProjectScopeDialog;
    vm.CheckBulkEditGridUpdateBC = CheckBulkEditGridUpdateBC;
    vm.AddMilestoneBCOpt = AddMilestoneBCOpt;
    vm.showOpexDiv = false;
    vm.showOpex = 0;
    vm.dsProjectScopeData = [];

    vm.changeShowCapex = changeShowCapex;
    vm.showCapexDiv = false;
    vm.showCapex = 0;

    vm.isEditable = false;
    vm.isPortfolioOwnerEditableBC = false;
    var className = "BusinessCaseCtrl";
    vm.localCurrencyAbbrePlaceholder;
    var grdMilestoneTemplateBCOpt = [];

    var grdMilestoneTemplateDetailBCOpt = [];
    var milestoneToAdd = [];
    var milestoneToAddBC1 = [];
    var milestoneToAddBC2 = [];
    var milestoneToAddBC3 = [];

    vm.capsProjectTooltipBC = capsProjectTooltip;
    vm.environmentalTootltipBC = environmentalTootltip;
    // var gridDataSchedule = [];
    /**********************START: Business Case Milestone Set*************************/

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

    function CheckBulkEditGridUpdateBC(gridId, dialog) {
        try {
            var grid = $('#' + gridId).data('kendoGrid');
            var window = $('#' + dialog);
            document.activeElement.blur();
            if (doesDataSourceHaveChanges(grid.dataSource)) {
                if (dialog == "dialogAddMilestoneBCOpt") {
                    if (confirm(saveMilestoneConfirm)) {
                        UpdateMilestonesBC(BusinessCaseOption1);
                    }
                    else {
                        window.data("kendoWindow").open();
                    }
                }
                else if (dialog == "dialogAddMilestoneBCOpt2") {
                    if (confirm(saveMilestoneConfirm)) {
                        UpdateMilestonesBC(BusinessCaseOption2);
                    }
                    else {
                        window.data("kendoWindow").open();
                    }
                }
                else if (dialog == "dialogAddMilestoneBCOpt3") {
                    if (confirm(saveMilestoneConfirm)) {
                        UpdateMilestonesBC(BusinessCaseOption3);
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
                "method": "CheckBulkEditGridUpdateBC", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    // alert(errormessage);
                });
        }
    }

    function AddMilestoneBCOpt(Option) {
        try {

            var GridName = "gridBusinessCaseOptTimeline";
            var AddGridName = "gridBCOptAddMilestones";
            var DialogName = "dialogAddMilestoneBCOpt";
            var MilestoneArrayToAdd = milestoneToAddBC1;
            if (Option == 'Option1') {
                GridName = "gridBusinessCaseOptTimeline";
                AddGridName = "gridBCOptAddMilestones";
                DialogName = "dialogAddMilestoneBCOpt";
                MilestoneArrayToAdd = milestoneToAddBC1;
            }
            else if (Option == 'Option2') {
                GridName = "gridBusinessCaseOpt2Timeline";
                AddGridName = "gridBCOptAddMilestones2";
                DialogName = "dialogAddMilestoneBCOpt2";
                MilestoneArrayToAdd = milestoneToAddBC2;

            }
            else if (Option == 'Option3') {
                GridName = "gridBusinessCaseOpt3Timeline";
                AddGridName = "gridBCOptAddMilestones3";
                DialogName = "dialogAddMilestoneBCOpt3";
                MilestoneArrayToAdd = milestoneToAddBC3;
            }
            var showmsg = false;
            var templateMilestonemasterGrid = $("#" + AddGridName).data("kendoGrid");
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
            if (showmsg == true && confirm(setMilestoneConfirmBC)) {
                var templateMilestonemasterGrid = $("#" + AddGridName).data("kendoGrid");
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
                            temp.BusinessScheduleUniqueID = NewGuid();
                            temp.MilestoneTemplateID = item.MilestoneTemplateID;
                            temp.Milestone = item.Milestone;
                            //   temp.Comments = item.Comments;
                            temp.Variance = "NA";
                            temp.FunctionGroupID = item.FunctionGroupID;
                            temp.IncludeInBusinessCase = item.IncludeInReport;
                            temp.ProjectID = SeletedProjectId;
                            temp.PlannedFinish = null;
                            temp.BaselineFinish = null;
                            temp.CompletionDate = null;
                            temp.MilestoneType = item.MilestoneType;
                            temp.MilestoneID = item.MilestoneID;
                            var data = MilestoneArrayToAdd.filter(function (val) {
                                return val.MilestoneID == item.MilestoneID;
                            });

                            if (data.length == 0) {
                                MilestoneArrayToAdd.push(temp);
                                if (Option == 'Option1') {
                                    vm.dsBCScheduleOpt1.push(temp);
                                }
                                else if (Option == 'Option2') {
                                    vm.dsBCScheduleOpt2.push(temp);
                                }
                                else if (Option == 'Option3') {
                                    vm.dsBCScheduleOpt3.push(temp);
                                }
                            }
                        });
                    }
                }
                if (!isduplicate) {
                    if (MilestoneArrayToAdd.length > 0) {
                        $('#' + GridName).data('kendoGrid').dataSource.read();
                        var grid = $("#" + GridName).data("kendoGrid");
                        angular.forEach(MilestoneArrayToAdd, function (item, index) {
                            var dataItem = grid.dataSource.get(item.BusinessScheduleUniqueID);
                            if (dataItem != undefined)
                                dataItem.dirty = true;
                        });
                    }
                    if (Option == 'Option1') {
                        milestoneToAddBC1 = MilestoneArrayToAdd;
                    }
                    else if (Option == 'Option2') {
                        milestoneToAddBC2 = MilestoneArrayToAdd;
                    }
                    else if (Option == 'Option3') {
                        milestoneToAddBC3 = MilestoneArrayToAdd;
                    }
                    $('#' + GridName).data('kendoGrid').refresh();
                    var window = $("#" + DialogName);
                    window.data("kendoWindow").close();
                }
            }
            else {
                var window = $("#" + DialogName);
                window.data("kendoWindow").close();
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "AddMilestoneBCOpt", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
        }
    }

    function InitMilestoneTemplatesBCOpt(OptionID) {
        var GridName = "gridBusinessCaseOptTimeline";
        var AddGridName = "gridBCOptAddMilestones";
        var DialogName = "dialogAddMilestoneBCOpt";
        if (OptionID == BusinessCaseOption1) {
            GridName = "gridBusinessCaseOptTimeline";
            AddGridName = "gridBCOptAddMilestones";
            DialogName = "dialogAddMilestoneBCOpt";
        }
        else if (OptionID == BusinessCaseOption2) {
            GridName = "gridBusinessCaseOpt2Timeline";
            AddGridName = "gridBCOptAddMilestones2";
            DialogName = "dialogAddMilestoneBCOpt2";

        }
        else if (OptionID == BusinessCaseOption3) {
            GridName = "gridBusinessCaseOpt3Timeline";
            AddGridName = "gridBCOptAddMilestones3";
            DialogName = "dialogAddMilestoneBCOpt3";

        }
        var dsTemplate = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    // on success
                    e.success(grdMilestoneTemplateBCOpt);
                }

            },
            sort: [{ field: "TemplateOrder", dir: "asc" }]
        });
        $("#" + AddGridName).kendoGrid({
            dataSource: dsTemplate,
            // height: 400,
            sortable: false,
            selectable: true,
            navigatable: true,
            height: 450,
            detailInit: ((OptionID == BusinessCaseOption1) ? detailInitMilestoneTemplateBCOpt : ((OptionID == BusinessCaseOption2) ? detailInitMilestoneTemplateBCOpt2 : detailInitMilestoneTemplateBCOpt3)),
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
    function detailInitMilestoneTemplateBCOpt(e) {
        var detailData = grdMilestoneTemplateBCOpt.filter(function (val) {
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
                            e.success(grdMilestoneTemplateDetailBCOpt);
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
                        title: "Milestone"

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
                        //field: "IncludeInBusinessCase",
                        title: "Include in Business Case",
                        headerAttributes: { "class": "wrap-header" },
                        width: "18%",
                        template: function (e) {
                            if (e.IncludeInReport == true) {
                                return '<input type="checkbox" checked class="chkbxmilestonetem" disabled="disabled"  />';
                            }
                            else {
                                return '<input type="checkbox" class="chkbxmilestonetem" disabled="disabled" />';
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
                                var data = milestoneToAddBC1.filter(function (val) {
                                    return val.MilestoneID == dataItem.MilestoneID;
                                });
                                if (data.length > 0) {
                                    var dataremove = milestoneToAddBC1.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                    milestoneToAddBC1.splice(dataremove, 1);

                                    if (dataItem.MilestoneType == null) {
                                        dataremove = vm.dsBCScheduleOpt1.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                        vm.dsBCScheduleOpt1.splice(dataremove, 1);
                                        //dataremove = gridAllDataSchedule.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                        //gridAllDataSchedule.splice(dataremove, 1);
                                    }

                                }
                                $('#gridBusinessCaseOptTimeline').data('kendoGrid').dataSource.read();
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
                                    var dataval = milestoneToAddBC1.filter(function (val) {
                                        return val.MilestoneID == data[i].MilestoneID;
                                    });
                                    if (dataval.length > 0) {
                                        var dataremove = milestoneToAddBC1.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                        milestoneToAddBC1.splice(dataremove, 1);

                                        if (data[i].MilestoneType == null) {
                                            dataremove = vm.dsBCScheduleOpt1.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                            vm.dsBCScheduleOpt1.splice(dataremove, 1);
                                            //dataremove = gridAllDataSchedule.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                            // gridAllDataSchedule.splice(dataremove, 1);
                                        }

                                    }
                                }
                            }
                            if (checked == false) {
                                $('#gridBusinessCaseOptTimeline').data('kendoGrid').dataSource.read();
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
    function detailInitMilestoneTemplateBCOpt2(e) {
        var detailData = grdMilestoneTemplateBCOpt.filter(function (val) {
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
                            e.success(grdMilestoneTemplateDetailBCOpt);
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
                        title: "Milestone"

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
                        //field: "IncludeInBusinessCase",
                        title: "Include in Business Case",
                        headerAttributes: { "class": "wrap-header" },
                        width: "8%",
                        template: function (e) {
                            if (e.IncludeInReport == true) {
                                return '<input type="checkbox" checked class="chkbxmilestonetem" disabled="disabled"  />';
                            }
                            else {
                                return '<input type="checkbox" class="chkbxmilestonetem" disabled="disabled" />';
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
                                var data = milestoneToAddBC2.filter(function (val) {
                                    return val.MilestoneID == dataItem.MilestoneID;
                                });
                                if (data.length > 0) {
                                    var dataremove = milestoneToAddBC2.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                    milestoneToAddBC2.splice(dataremove, 1);

                                    if (dataItem.MilestoneType == null) {
                                        dataremove = vm.dsBCScheduleOpt2.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                        vm.dsBCScheduleOpt2.splice(dataremove, 1);
                                        //dataremove = gridAllDataSchedule.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                        //gridAllDataSchedule.splice(dataremove, 1);
                                    }

                                }
                                $('#gridBusinessCaseOpt2Timeline').data('kendoGrid').dataSource.read();
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
                                    var dataval = milestoneToAddBC2.filter(function (val) {
                                        return val.MilestoneID == data[i].MilestoneID;
                                    });
                                    if (dataval.length > 0) {
                                        var dataremove = milestoneToAddBC2.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                        milestoneToAddBC2.splice(dataremove, 1);

                                        if (data[i].MilestoneType == null) {
                                            dataremove = vm.dsBCScheduleOpt2.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                            vm.dsBCScheduleOpt2.splice(dataremove, 1);
                                            //dataremove = gridAllDataSchedule.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                            // gridAllDataSchedule.splice(dataremove, 1);
                                        }

                                    }
                                }
                            }
                            if (checked == false) {
                                $('#gridBusinessCaseOpt2Timeline').data('kendoGrid').dataSource.read();
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
    function detailInitMilestoneTemplateBCOpt3(e) {
        var detailData = grdMilestoneTemplateBCOpt.filter(function (val) {
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
                            e.success(grdMilestoneTemplateDetailBCOpt);
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
                        title: "Milestone"

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
                        //field: "IncludeInBusinessCase",
                        title: "Include in Business Case",
                        headerAttributes: { "class": "wrap-header" },
                        width: "8%",
                        template: function (e) {
                            if (e.IncludeInReport == true) {
                                return '<input type="checkbox" checked class="chkbxmilestonetem" disabled="disabled"  />';
                            }
                            else {
                                return '<input type="checkbox" class="chkbxmilestonetem" disabled="disabled"  />';
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
                                var data = milestoneToAddBC3.filter(function (val) {
                                    return val.MilestoneID == dataItem.MilestoneID;
                                });
                                if (data.length > 0) {
                                    var dataremove = milestoneToAddBC3.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                    milestoneToAddBC3.splice(dataremove, 1);

                                    if (dataItem.MilestoneType == null) {
                                        dataremove = vm.dsBCScheduleOpt3.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                        vm.dsBCScheduleOpt3.splice(dataremove, 1);
                                        //dataremove = gridAllDataSchedule.findIndex(element => element.MilestoneID == dataItem.MilestoneID);
                                        //gridAllDataSchedule.splice(dataremove, 1);
                                    }

                                }
                                $('#gridBusinessCaseOpt3Timeline').data('kendoGrid').dataSource.read();
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
                                    var dataval = milestoneToAddBC3.filter(function (val) {
                                        return val.MilestoneID == data[i].MilestoneID;
                                    });
                                    if (dataval.length > 0) {
                                        var dataremove = milestoneToAddBC3.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                        milestoneToAddBC3.splice(dataremove, 1);

                                        if (data[i].MilestoneType == null) {
                                            dataremove = vm.dsBCScheduleOpt3.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                            vm.dsBCScheduleOpt3.splice(dataremove, 1);
                                            //dataremove = gridAllDataSchedule.findIndex(element => element.MilestoneID == data[i].MilestoneID);
                                            // gridAllDataSchedule.splice(dataremove, 1);
                                        }

                                    }
                                }
                            }
                            if (checked == false) {
                                $('#gridBusinessCaseOpt3Timeline').data('kendoGrid').dataSource.read();
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

    function UpdateMilestonesBC(OptionID) {
        try {
            var GridName = "gridBusinessCaseOptTimeline";
            var AddGridName = "gridBCOptAddMilestones";
            var DialogName = "dialogAddMilestoneBCOpt";
            var DeleteArray = vm.deletedMilestoneData;
            milestoneToAdd = milestoneToAddBC1;
            if (OptionID == BusinessCaseOption1) {
                GridName = "gridBusinessCaseOptTimeline";
                AddGridName = "gridBCOptAddMilestones";
                DialogName = "dialogAddMilestoneBCOpt";
                DeleteArray = vm.deletedMilestoneData;
                milestoneToAdd = milestoneToAddBC1;
            }
            else if (OptionID == BusinessCaseOption2) {
                GridName = "gridBusinessCaseOpt2Timeline";
                AddGridName = "gridBCOptAddMilestones2";
                DialogName = "dialogAddMilestoneBCOpt2";
                DeleteArray = vm.deletedMilestoneDataOption2;
                milestoneToAdd = milestoneToAddBC2;
            }
            else if (OptionID == BusinessCaseOption3) {
                GridName = "gridBusinessCaseOpt3Timeline";
                AddGridName = "gridBCOptAddMilestones3";
                DialogName = "dialogAddMilestoneBCOpt3";
                DeleteArray = vm.deletedMilestoneDataOption3;
                milestoneToAdd = milestoneToAddBC3;
            }
            vm.milestoneInsertListItems = [];
            vm.milestoneUpdateListItems = [];
            var listdataMilestone = [];

            var milestoneBCLength = $("#" + GridName).data("kendoGrid").tbody.find("input:checked").length;
            if (milestoneBCLength > milestoneBusinessCount) {
                alert(milestoneCountMessage);
                hideLoading();
                return false;
            }
            if ($('#' + GridName).data('kendoGrid') != undefined) {
                var gridupdatedData = $('#' + GridName).data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertMilestoneArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateMilestoneArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });

                angular.forEach(insertMilestoneArray, function (item, index) {
                    var temp = {};
                    temp.BusinessScheduleUniqueID = item.BusinessScheduleUniqueID;
                    temp.Milestone = item.Milestone;
                    temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                    temp.FunctionGroupID = item.FunctionGroupID;
                    temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                    temp.ProjectID = item.ProjectID;
                    vm.milestoneInsertListItems.push(temp);
                });
                angular.forEach(updateMilestoneArray, function (item, index) {
                    var temp = {};
                    temp.BusinessScheduleUniqueID = item.BusinessScheduleUniqueID;
                    temp.Milestone = item.Milestone;
                    temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                    temp.FunctionGroupID = item.FunctionGroupID;
                    //  temp.IncludeInBusinessCase = item.IncludeInReport;
                    temp.ProjectID = item.ProjectID;
                    temp.link = item.link;
                    if (milestoneToAdd.length > 0) {
                        temp.MilestoneTemplateID = item.MilestoneTemplateID;
                        temp.MilestoneID = item.MilestoneID;
                        temp.IncludeInBusinessCase = item.IncludeInReport;
                        temp.Comments = item.Comments;
                    }
                    vm.milestoneUpdateListItems.push(temp);
                });
            }
            vm.insertUpdateDeleteMilestone = {
                "insert": vm.milestoneInsertListItems,
                "update": vm.milestoneUpdateListItems,
                "delete": DeleteArray
            };
            if (vm.milestoneInsertListItems.length > 0 || vm.milestoneUpdateListItems.length > 0 || DeleteArray.length > 0) {
                listdataMilestone.push(vm.insertUpdateDeleteMilestone);
                var dataToSend = { "ProjectID": vm.SelectedProject.ProjectID, "BusinessOptionID": OptionID, "objMilestone": JSON.stringify(listdataMilestone), "userId": currentUserId };
                GETPostService.postDataWCFAsync('InsertUpdateBussinessCaseSchedule', dataToSend).then(function (response) {
                    //alert(response);
                    if (response == "Success") {
                        alert("Milestone data updated successfully");
                        milestoneToAdd = [];


                        $.when(GETPostService.postDataWCFAsync("getBusinessCaseSchedule", SeletedProjectId))
                                .then(function (resBCSchedule) {
                                    dsBCSchedule = JSON.parse(resBCSchedule.getBusinessCaseScheduleResult);
                                    if (OptionID == BusinessCaseOption1) {
                                        vm.dsBCScheduleOpt1 = dsBCSchedule.filter(function (entry) {
                                            return entry.BusinessOptionID == BusinessCaseOption1;
                                        });
                                        milestoneToAddBC1 = [];
                                    }
                                    else if (OptionID == BusinessCaseOption2) {
                                        vm.dsBCScheduleOpt2 = dsBCSchedule.filter(function (entry) {
                                            return entry.BusinessOptionID == BusinessCaseOption2;
                                        });
                                        milestoneToAddBC2 = [];
                                    }
                                    else if (OptionID == BusinessCaseOption3) {
                                        vm.dsBCScheduleOpt3 = dsBCSchedule.filter(function (entry) {
                                            return entry.BusinessOptionID == BusinessCaseOption3;
                                        });
                                        milestoneToAddBC3 = [];
                                    }

                                    $('#' + GridName).data('kendoGrid').dataSource.read();
                                    $('#' + AddGridName).data('kendoGrid').refresh();
                                    $scope.$digest();
                                });

                        //   $rootScope.$emit("UpdateHubLoad", true);
                        var window = $("#" + DialogName);
                        window.data("kendoWindow").open();
                    }
                });
            }
            else {
                var window = $("#" + DialogName);
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

    /**********************END: Business Case Milestone Set*************************/
    function trackEventFunc(eventName) {
        trackEvent(eventName);
    }
    function GetBCProjectScopeDialog() {

        var myWindow = $("#dialogBCTopsProjectScope");

        InitkendoGridTopsProjectScope();
        myWindow.data("kendoWindow").open();

        // });
    }
    function onBCProjectScopeChange(e) {
        if (!confirm(ProjectScopeMessage)) {
            e.preventDefault();
            $scope.$digest();
        }
        else {
            if (e.dataItem.LookUpMemberName != "") {
                var selectedProjectScope = e.dataItem.LookUpMemberName;

                vm.selectedScopeData = vm.dsProjectScopeData.filter(function (entry) {
                    return entry.ProjectScope == selectedProjectScope;
                });
                var durationData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "Duration";
                });
                var peopleData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "People (FTE Months)";
                });
                var capexData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "Total CAPEX";
                });
                var FTEOpexData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "Total Non Non-FTE OPEX";
                });

                vm.businessOptionInfoSelector.DurationBaseCase = durationData[0].BaseCase;
                vm.businessOptionInfoSelector.DurationHighCase = durationData[0].HighCase;
                vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredBaseCase = peopleData[0].BaseCase;
                vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredHighCase = peopleData[0].HighCase;
                vm.businessOptionInfoSelector.TotalCapexBaseCase = capexData[0].BaseCase;
                vm.businessOptionInfoSelector.TotalCapexHighCase = capexData[0].HighCase;
                vm.businessOptionInfoSelector.TotalNonFTEBaseCase = FTEOpexData[0].BaseCase;
                vm.businessOptionInfoSelector.TotalNonFTEHighCase = FTEOpexData[0].HighCase;
                $scope.$digest();
            }
        }
    }
    function onBCProjectScopeChangeBC2(e) {
        if (!confirm(ProjectScopeMessage)) {
            e.preventDefault();
            $scope.$digest();
        }
        else {
            if (e.dataItem.LookUpMemberName != "") {
                var selectedProjectScope = e.dataItem.LookUpMemberName;
                vm.selectedScopeData = vm.dsProjectScopeData.filter(function (entry) {
                    return entry.ProjectScope == selectedProjectScope;
                });
                var durationData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "Duration";
                });
                var peopleData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "People (FTE Months)";
                });
                var capexData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "Total CAPEX";
                });
                var FTEOpexData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "Total Non Non-FTE OPEX";
                });

                vm.businessOption2InfoSelector.DurationBaseCase = durationData[0].BaseCase;
                vm.businessOption2InfoSelector.DurationHighCase = durationData[0].HighCase;
                vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredBaseCase = peopleData[0].BaseCase;
                vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredHighCase = peopleData[0].HighCase;
                vm.businessOption2InfoSelector.TotalCapexBaseCase = capexData[0].BaseCase;
                vm.businessOption2InfoSelector.TotalCapexHighCase = capexData[0].HighCase;
                vm.businessOption2InfoSelector.TotalNonFTEBaseCase = FTEOpexData[0].BaseCase;
                vm.businessOption2InfoSelector.TotalNonFTEHighCase = FTEOpexData[0].HighCase;
                $scope.$digest();
            }
        }
    }
    function onBCProjectScopeChangeBC3(e) {
        if (!confirm(ProjectScopeMessage)) {
            e.preventDefault();
            $scope.$digest();
        }
        else {
            if (e.dataItem.LookUpMemberName != "") {
                var selectedProjectScope = e.dataItem.LookUpMemberName;
                vm.selectedScopeData = vm.dsProjectScopeData.filter(function (entry) {
                    return entry.ProjectScope == selectedProjectScope;
                });
                var durationData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "Duration";
                });
                var peopleData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "People (FTE Months)";
                });
                var capexData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "Total CAPEX";
                });
                var FTEOpexData = vm.selectedScopeData.filter(function (entry) {
                    return entry.Category == "Total Non Non-FTE OPEX";
                });

                vm.businessOption3InfoSelector.DurationBaseCase = durationData[0].BaseCase;
                vm.businessOption3InfoSelector.DurationHighCase = durationData[0].HighCase;
                vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredBaseCase = peopleData[0].BaseCase;
                vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredHighCase = peopleData[0].HighCase;
                vm.businessOption3InfoSelector.TotalCapexBaseCase = capexData[0].BaseCase;
                vm.businessOption3InfoSelector.TotalCapexHighCase = capexData[0].HighCase;
                vm.businessOption3InfoSelector.TotalNonFTEBaseCase = FTEOpexData[0].BaseCase;
                vm.businessOption3InfoSelector.TotalNonFTEHighCase = FTEOpexData[0].HighCase;
                $scope.$digest();
            }
        }
    }
    function clearOption(optionValue) {
        var businessOptionInfoSelectedData = {
            OptionTitle: "",
            RecommendedOption: "",
            ProposalStatement: "",
            DetailedDescription: "",
            TradeoffsConsiderations: "",
            PeopleJustification: "",
            TechnologyJustification: "",
            BusinessProcessJustification: "",
            ManufacturingProcessJustification: "",
            EquipementJustification: "",
            ExecutionStartDate: "",
            ExecutionEndDate: "",
            CapexRequired: false,
            TotalCapexBaseCase: "",
            TotalCapexHighCase: "",
            ProjectSpendStart: "",
            IsProjectSpentNA: false,
            AssetInService: "",
            AssetInServiceNA: false,

            OpexRequired: false,
            TotalNonFTEBaseCase: "",
            TotalNonFTEHighCase: "",

            StrategicAlignment: "",
            StrategicAlignmentJustification: "",
            NPVBaseCase: "",
            NPVHighCase: "",
            NPVRationale: "",

            //CostBenefitRatio: "",
            //OverallBenefitScore: "",

            DurationBaseCase: "",
            DurationHighCase: "",
            DurationBasisofEstimate: "",
            PeopleFTEMonthsRequiredBaseCase: "",
            PeopleFTEMonthsRequiredHighCase: "",
            PeopleFTEMonthsRequiredBasisofEstimate: "",
            TotalCapExBaseCase: "",
            TotalCapExHighCase: "",
            TotalCapExBasisofEstimate: "",
            TotalNonFTEBasisofEstimate: "",

            InLineProductID: "",
            InLineProductRationale: "",
            ImpactMultiplierID: "",
            ImpactMultiplierRationale: "",
            FunctionsRequiredID: "",
            ProductID: "",
            //TOPSGroup: "",

        };
        if (!confirm(gridClearMessage))
            e.preventDefault();
        else {

            var businessOption1InfoSelectedData = {};
            var businessOption2InfoSelectedData = {};
            var businessOption3InfoSelectedData = {};

            if (optionValue == "Opt1") {
                clearOptionId1 = BusinessCaseOption1;
                vm.selectedBCPeopleRating = "";
                vm.selectedBCTechnologyRating = "";
                vm.selectedBCBusinessCaseProcess = "";
                vm.selectedBCManufacturingProcess = "";
                vm.selectedBCEquipmentRating = "";
                vm.showCapex = "0";
                vm.showOpex = "0";
          
                $("#functions1").data("kendoComboBox").value("");
                $("#impactOpt1").data("kendoComboBox").value("");
                $("#InlineProductOpt1").data("kendoComboBox").value("");
             

                vm.dsBCScheduleOpt1 = {};
                vm.dsBCKeyAssumptionOpt1 = {};
                vm.dsBCRiskIssueOpt1 = {};
                vm.dsBCKeySuccessOpt1 = {};
                vm.dsBCBudgetFundingOpt1 = {};
                gridCapsDataWaterWasteOpt1 = {};
             

                var grid = $("#gridOption1Tops").data("kendoGrid");
                for (var i = 0; i < gridTopsData1.length; i++) {
                    var dataItem = grid.dataSource.get(gridTopsData1[i].BusinessKPIUniqueID);
                    dataItem["LookUpValue"] = topsKPIDefaultValue;
                }
                $('#gridOption1Tops').data('kendoGrid').refresh();

                $('#gridBusinessCaseOptTimeline').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseOptAssumption').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseFunding').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseOptKeySuccessCriteria').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseOptRisk').data('kendoGrid').dataSource.read();
                $('#gridCapsWaterWasteOpt1').data('kendoGrid').dataSource.read();


                vm.businessOptionInfoSelector = businessOption1InfoSelectedData;
                if (vm.businessOption2InfoSelector.RecommendedOption == false && vm.businessOption3InfoSelector.RecommendedOption == false)
                    vm.businessOptionInfoSelector.RecommendedOption = true;
            }
            if (optionValue == "Opt2") {
                clearOptionId2 = BusinessCaseOption2;
                vm.selectedBCPeopleRatingOption2 = "";
                vm.selectedBCTechnologyRatingOption2 = "";
                vm.selectedBCBusinessCaseProcessOption2 = "";
                vm.selectedBCManufacturingProcessoption2 = "";
                vm.selectedBCEquipmentRatingOption2 = "";
                vm.showCapexOpt2 = "0";
                vm.showOpexOpt2 = "0";


                var grid2 = $("#gridOption2Tops").data("kendoGrid");
                for (var j = 0; j < gridTopsData2.length; j++) {
                    var dataItem2 = grid2.dataSource.get(gridTopsData2[j].BusinessKPIUniqueID);
                    dataItem2["LookUpValue"] = topsKPIDefaultValue;
                }
                $('#gridOption2Tops').data('kendoGrid').refresh();

                vm.dsBCScheduleOpt2 = {};
                vm.dsBCKeyAssumptionOpt2 = {};
                vm.dsBCRiskIssueOpt2 = {};
                vm.dsBCKeySuccessOpt2 = {};
                vm.dsBCBudgetFundingOpt2 = {};
                gridCapsDataWaterWasteOpt2 = {};
           
                $("#functions2").data("kendoComboBox").value("");
                $("#impactOpt2").data("kendoComboBox").value("");
                $("#InlineProductOpt2").data("kendoComboBox").value("");
                //option2

                $('#gridBusinessCaseOpt2Timeline').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseFundingOption2').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseOptKeySuccessCriteriaOption2').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseOptAssumptionOption2').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseOptRiskOption2').data('kendoGrid').dataSource.read();
                $('#gridCapsWaterWasteOpt2').data('kendoGrid').dataSource.read();

                vm.businessOption2InfoSelector = businessOption2InfoSelectedData;
                if (vm.businessOptionInfoSelector.RecommendedOption == false && vm.businessOption3InfoSelector.RecommendedOption == false)
                    vm.businessOption2InfoSelector.RecommendedOption = true;
            }
            if (optionValue == "Opt3") {
                clearOptionId3 = BusinessCaseOption3;
                vm.selectedBCPeopleRatingOption3 = "";
                vm.selectedBCTechnologyRatingOption3 = "";
                vm.selectedBCBusinessCaseProcessOption3 = "";
                vm.selectedBCManufacturingProcessOption3 = "";
                vm.selectedBCEquipmentRatingOption3 = "";
                vm.showCapexOpt3 = "0";
                vm.showOpexOpt3 = "0";


                var grid3 = $("#gridOption3Tops").data("kendoGrid");
                for (var k = 0; k < gridTopsData3.length; k++) {
                    var dataItem3 = grid3.dataSource.get(gridTopsData3[k].BusinessKPIUniqueID);
                    dataItem3["LookUpValue"] = topsKPIDefaultValue;
                }
                $('#gridOption3Tops').data('kendoGrid').refresh();
                vm.dsBCScheduleOpt3 = {};
                vm.dsBCKeyAssumptionOpt3 = {};
                vm.dsBCRiskIssueOpt3 = {};
                vm.dsBCKeySuccessOpt3 = {};
                vm.dsBCBudgetFundingOpt3 = {};
                gridCapsDataWaterWasteOpt3 = {};

                //option3

                $('#gridBusinessCaseOpt3Timeline').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseOptAssumptionOption3').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseOptRiskOption3').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseFundingOption3').data('kendoGrid').dataSource.read();
                $('#gridBusinessCaseOptKeySuccessCriteriaOption3').data('kendoGrid').dataSource.read();
                $('#gridCapsWaterWasteOpt3').data('kendoGrid').dataSource.read();
                vm.businessOption3InfoSelector = businessOption3InfoSelectedData;
                $("#functions3").data("kendoComboBox").value("");
                $("#impactOpt3").data("kendoComboBox").value("");
                $("#InlineProductOpt3").data("kendoComboBox").value("");
                if (vm.businessOptionInfoSelector.RecommendedOption == false && vm.businessOption2InfoSelector.RecommendedOption == false)
                    vm.businessOption3InfoSelector.RecommendedOption = true;

                if (vm.businessOption3InfoSelector.FunctionsRequiredID != undefined)
                    vm.businessOption3InfoSelector.FunctionsRequiredID = null;
                //   $scope.$digest();
            }

        }

    };
    function recommendOnChange(optionValue, e) {
        var $checkboxes = $('.recommendCheckbox');
        var countCheckedCheckboxes = $checkboxes.filter(':checked').length;
        if (countCheckedCheckboxes == 0) {
            if (optionValue == "Opt1")
                vm.businessOptionInfoSelector.RecommendedOption = true;
            if (optionValue == "Opt2")
                vm.businessOption2InfoSelector.RecommendedOption = true;
            if (optionValue == "Opt3")
                vm.businessOption3InfoSelector.RecommendedOption = true;
        }
        if (optionValue == "Opt1") {
            vm.businessOption2InfoSelector.RecommendedOption = false;
            vm.businessOption3InfoSelector.RecommendedOption = false;
        }
        if (optionValue == "Opt2") {
            vm.businessOptionInfoSelector.RecommendedOption = false;
            vm.businessOption3InfoSelector.RecommendedOption = false;
        }
        if (optionValue == "Opt3") {
            vm.businessOptionInfoSelector.RecommendedOption = false;
            vm.businessOption2InfoSelector.RecommendedOption = false;
        }
    }
    function AddNewRow(gridName) {
        if (gridName == 'gridCapsWaterWasteOpt3' || gridName == 'gridCapsWaterWasteOpt1' || gridName == 'gridCapsWaterWasteOpt2') {
            if ($("#" + gridName).data("kendoGrid").dataSource.data().length >= 10) {
                alert(moreThanTenRowsInGrid);
                return
            }
        }

        var grid1 = $("#" + gridName).data("kendoGrid");
        grid1.addRow();
    }

    function changeShowCapex(entity, option, e) {
        if (entity == 'Yes') {
            //vm.showCapex = 1;
            if (option == "Opt1")
                vm.businessOptionInfoSelector.CapexRequired = true;
            if (option == "Opt2")
                vm.businessOption2InfoSelector.CapexRequired = true;
            if (option == "Opt3")
                vm.businessOption3InfoSelector.CapexRequired = true;
        }
        else {
            //vm.showCapex = 0;
            if (!confirm(capexClearMessage)) {
                e.preventDefault();
            }
            else {
                if (option == "Opt1") {
                    vm.businessOptionInfoSelector.CapexRequired = false;
                    vm.businessOptionInfoSelector.TotalCapexBaseCase = null;
                    vm.businessOptionInfoSelector.TotalCapexHighCase = null;
                }
                if (option == "Opt2") {
                    vm.businessOption2InfoSelector.CapexRequired = false;
                    vm.businessOption2InfoSelector.TotalCapexBaseCase = null;
                    vm.businessOption2InfoSelector.TotalCapexHighCase = null;
                }
                if (option == "Opt3") {
                    vm.businessOption3InfoSelector.CapexRequired = false;
                    vm.businessOption3InfoSelector.TotalCapexBaseCase = null;
                    vm.businessOption3InfoSelector.TotalCapexHighCase = null;

                }
            }
        }
    }

    function changeShowOpex(entity, option, e) {
        if (entity == 'Yes') {
            if (option == "Opt1")
                vm.businessOptionInfoSelector.OpexRequired = true;
            else if (option == "Opt2")
                vm.businessOption2InfoSelector.OpexRequired = true;
            else if (option == "Opt3")
                vm.businessOption3InfoSelector.OpexRequired = true;
        }
        else {
            if (!confirm(opexClearMessage)) {
                e.preventDefault();
            }
            else {
                if (option == "Opt1") {
                    vm.businessOptionInfoSelector.OpexRequired = false;
                    vm.businessOptionInfoSelector.TotalNonFTEBaseCase = null;
                    vm.businessOptionInfoSelector.TotalNonFTEHighCase = null;
                }
                if (option == "Opt2") {
                    vm.businessOption2InfoSelector.OpexRequired = false;
                    vm.businessOption2InfoSelector.TotalNonFTEBaseCase = null;
                    vm.businessOption2InfoSelector.TotalNonFTEHighCase = null;
                }
                if (option == "Opt3") {
                    vm.businessOption3InfoSelector.OpexRequired = false;
                    vm.businessOption3InfoSelector.TotalNonFTEBaseCase = null;
                    vm.businessOption3InfoSelector.TotalNonFTEHighCase = null;
                }
            }
        }
    };
   
    function gridAddDefaultRows() {
        try {
            if (vm.isEditable) {
                $("#gridBusinessCaseOptTimeline").data("kendoGrid").addRow();
                $("#gridBusinessCaseOptAssumption").data("kendoGrid").addRow();
                $("#gridBusinessCaseOptRisk").data("kendoGrid").addRow();
                $("#gridBusinessCaseFunding").data("kendoGrid").addRow();
                $("#gridBusinessCaseOptKeySuccessCriteria").data("kendoGrid").addRow();

                //option2
                $("#gridBusinessCaseOpt2Timeline").data("kendoGrid").addRow();
                $("#gridBusinessCaseFundingOption2").data("kendoGrid").addRow();
                $("#gridBusinessCaseOptKeySuccessCriteriaOption2").data("kendoGrid").addRow();
                $("#gridBusinessCaseOptAssumptionOption2").data("kendoGrid").addRow();
                $("#gridBusinessCaseOptRiskOption2").data("kendoGrid").addRow();

                //option3
                $("#gridBusinessCaseOpt3Timeline").data("kendoGrid").addRow();
                $("#gridBusinessCaseOptAssumptionOption3").data("kendoGrid").addRow();
                $("#gridBusinessCaseOptRiskOption3").data("kendoGrid").addRow();
                $("#gridBusinessCaseFundingOption3").data("kendoGrid").addRow();
                $("#gridBusinessCaseOptKeySuccessCriteriaOption3").data("kendoGrid").addRow();
            }
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "gridAddDefaultRows", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    };


    function bcDialogCloseEvent(e) {


        var gridupdatedDataTimeline = $('#gridBusinessCaseOptTimeline').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataRisk = $('#gridBusinessCaseOptRisk').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataAssumption = $('#gridBusinessCaseOptAssumption').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataFunding = $('#gridBusinessCaseFunding').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataKey = $('#gridBusinessCaseOptKeySuccessCriteria').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridDataTops = $('#gridOption1Tops').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        //option 2

        var gridupdatedData2 = $('#gridBusinessCaseOpt2Timeline').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataRisk2 = $('#gridBusinessCaseOptRiskOption2').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataAssumption2 = $('#gridBusinessCaseOptAssumptionOption2').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataFunding2 = $('#gridBusinessCaseFundingOption2').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataKey2 = $('#gridBusinessCaseOptKeySuccessCriteriaOption2').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridDataTops2 = $('#gridOption2Tops').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });

        //option 3
        var gridupdatedData3 = $('#gridBusinessCaseOpt3Timeline').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataRisk3 = $('#gridBusinessCaseOptRiskOption3').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataAssumption3 = $('#gridBusinessCaseOptAssumptionOption3').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataFunding3 = $('#gridBusinessCaseFundingOption3').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridupdatedDataKey3 = $('#gridBusinessCaseOptKeySuccessCriteriaOption3').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        var gridDataTops3 = $('#gridOption3Tops').data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        /* Dropdopwn values are not bindied with main object */
        dropdownSetValue();
        //gridupdatedData2 gridupdatedDataRisk2 gridupdatedDataAssumption2 gridupdatedDataFunding2 gridupdatedDataKey2 
        if (angular.equals(OriginalBCdata, vm.SelectedProject) == false || angular.equals(OriginalbusinessOptionInfoSelector, vm.businessOptionInfoSelector) == false ||
            angular.equals(OriginalbusinessOption2InfoSelector, vm.businessOption2InfoSelector) == false || angular.equals(OriginalbusinessOption3InfoSelector, vm.businessOption3InfoSelector) == false
            || gridupdatedDataRisk.length > 0 || gridupdatedDataTimeline.length > 0 || gridupdatedDataKey.length > 0 || gridupdatedDataFunding.length > 0
            || gridupdatedDataAssumption.length > 0
            || gridupdatedData2.length > 0 || gridupdatedDataRisk2.length > 0 || gridupdatedDataAssumption2.length > 0
            || gridupdatedDataFunding2.length > 0 || gridupdatedDataKey2.length > 0
            || gridupdatedData3.length > 0 || gridupdatedDataRisk3.length > 0 || gridupdatedDataAssumption3.length > 0
            || gridupdatedDataFunding3.length > 0 || gridupdatedDataKey3.length > 0 || gridDataTops.length > 0 || gridDataTops2.length > 0
            || gridDataTops3.length > 0) {

            if (!confirm(dialogCloseMessage))
                e.preventDefault();
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
    function businessDialogClose(window) {
        $("#" + window).data("kendoWindow").close();
    };
    function OpenBusinessCaseDialog() {
        //var tabStrip1 = $("#businessCaseTabstrip").kendoTabStrip().data("kendoTabStrip");

        //var tabIndx = tabStrip1.select().index();
        //var tabName = tabStrip1.select()[0].textContent();

        trackEvent("Business case dialog opened");
        //trackEvent("Business case dialog" + tabName);
        bindChangeDatePicker("BC_approvedDate");
        bindChangeComboBox("ddl_BC_PrimaryProduct");
        bindChangeComboBox("ddl_GI_PortfolioOwner");
        //bindChangeComboBox("ddl_GI_Classification");

        bindChangeDatePicker("executionStart");
        bindChangeDatePicker("executionEnd");
        bindChangeDatePicker("spendDate");
        bindChangeDatePicker("assetDate");
        bindChangeDatePicker("realizationDate1");

        //option2
        bindChangeDatePicker("executionStartOpt2");
        bindChangeDatePicker("executionEndOpt2");
        bindChangeDatePicker("spendDateOpt2");
        bindChangeDatePicker("assetDateOpt2");
        bindChangeDatePicker("realizationDate2");

        //option3
        bindChangeDatePicker("executionStartOpt3");
        bindChangeDatePicker("executionEndOpt3");
        bindChangeDatePicker("spendDateOpt3");
        bindChangeDatePicker("assetDateOpt3");
        bindChangeDatePicker("realizationDate3");


        displayLoading();
        var tabStrip = $("#businessCaseTabstrip").data("kendoTabStrip");
        tabStrip.select(0);
        if (dialogbindBC == false) {
            $("#dialogBusinessCase").data("kendoWindow").bind("close", function (e) {
                bcDialogCloseEvent(e)
            });
            dialogbindBC = true;
        }
        prepareDataForBusinessCase();
        var myWindow = $('#dialogBusinessCase');
        myWindow.data("kendoWindow").open();
        if (btnClickBusinessCase == 0) {
            bindUserPicker("ddlSponsor");
            bindUserPicker("ddlbusinessCaseAuthor");
        }
    };
    function onChangeCarbonImpact(optionValue, e) {
        //alert(vm.capsDataInfo.NoCarbonImpact);     
        if (optionValue == "Opt1") {
            if (vm.businessOptionInfoSelector.NoCarbonImpact == true) {
                for (var i = 0; i < gridCapsData.length; i++) {
                    gridCapsData[i].EMUnit = null;
                    gridCapsData[i].EMBasisOfEstimate = null;
                }
            }
            else {
                if (beforeSaveGriddata.length != 0)
                    angular.copy(beforeSaveGriddata, gridCapsData);
                //gridCapsData = beforeSaveGriddata;
            }
            $('#gridCapsOpt1').data('kendoGrid').dataSource.read();
        }
        if (optionValue == "Opt2") {
            if (vm.businessOption2InfoSelector.NoCarbonImpact == true) {
                for (var i = 0; i < gridCapsData2.length; i++) {
                    gridCapsData2[i].EMUnit = null;
                    gridCapsData2[i].EMBasisOfEstimate = null;
                }
            }
            else {
                if (beforeSaveGriddata2.length != 0)
                    angular.copy(beforeSaveGriddata2, gridCapsData2);
                //gridCapsData2 = beforeSaveGriddata2;
            }
            $('#gridCapsOpt2').data('kendoGrid').dataSource.read();
        }
        if (optionValue == "Opt3") {
            if (vm.businessOption3InfoSelector.NoCarbonImpact == true) {
                for (var i = 0; i < gridCapsData3.length; i++) {
                    gridCapsData3[i].EMUnit = null;
                    gridCapsData3[i].EMBasisOfEstimate = null;
                }
            }
            else {
                if (beforeSaveGriddata3.length != 0)
                    angular.copy(beforeSaveGriddata3, gridCapsData3);
                //gridCapsData3 = beforeSaveGriddata3;
            }
            $('#gridCapsOpt3').data('kendoGrid').dataSource.read();
        }
        //$scope.$digest();
    }
    /****--------------START: Water and Waste Cost Impact change--------------***/
    function onChangeWWCostImpact(optionValue, e) {
        if (optionValue == "Opt1") {
            if ((vm.businessOptionInfoSelector.EnergyWaterImpactCostPerYear != null && vm.businessOptionInfoSelector.EnergyWaterImpactCostPerYear != "") || (vm.businessOptionInfoSelector.EnergyWasteImpactCostPerYear != null && vm.businessOptionInfoSelector.EnergyWasteImpactCostPerYear != ""))
                vm.isUnitCostWW = false;
            else
                vm.isUnitCostWW = null;
        }
        if (optionValue == "Opt1") {
            if ((vm.businessOptionInfoSelector.EnergyWaterImpactCostPerYear != null && vm.businessOptionInfoSelector.EnergyWaterImpactCostPerYear != "") || (vm.businessOptionInfoSelector.EnergyWasteImpactCostPerYear != null && vm.businessOptionInfoSelector.EnergyWasteImpactCostPerYear != ""))
                vm.isUnitCostWW = false;
            else
                vm.isUnitCostWW = null;
        }
        $scope.$digest();
    }
    /****--------------START: Water and Waste Cost Impact change--------------***/

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
    function prepareDataForBusinessCase() {
        vm.isEMPortfolio = false;
        vm.businessOptionInfoSelector = {};
        vm.businessOption2InfoSelector = {};
        vm.businessOption3InfoSelector = {};

        vm.deletedMilestoneData = [];
        vm.deletedRiskData = [];
        vm.deletedKeySuccessData = [];
        vm.deletedAssumptionData = [];
        vm.deletedFundingData = [];

        //option2
        vm.deletedMilestoneDataOption2 = [];
        vm.deletedFundingDataOption2 = [];
        vm.deletedRiskDataOption2 = [];
        vm.deletedKeySuccessDataOption2 = [];
        vm.deletedAssumptionDataOption2 = [];

        //option3
        vm.deletedMilestoneDataOption3 = [];
        vm.deletedFundingDataOption3 = [];
        vm.deletedRiskDataOption3 = [];
        vm.deletedKeySuccessDataOption3 = [];
        vm.deletedAssumptionDataOption3 = [];
        try {
            vm.optionsCostImpact = {
                format: "n0",
                decimals: 0,
                restrictDecimals: true
            },
            vm.options = {
                format: "n1",
                decimals: 1,
                min: 0,
                restrictDecimals: true
            },
                vm.optionsCurrency = {
                    format: "n0",
                    decimals: 0,
                    min: 0,
                    restrictDecimals: true
                };
            vm.isOption2 = true;
            vm.isOption3 = true;
            clearOptionId1 = "";
            clearOptionId2 = "";
            clearOptionId3 = "";
            bcDataSaved = false;
            vm.executionStartOpt1DateError = false;
            vm.executionEndOpt1DateError = false;
            vm.ProjectSpendStartOpt1DateError = false;
            vm.AssetInServiceOpt1DateError = false;
            vm.executionStartOpt2DateError = false;
            vm.executionEndOpt2DateError = false;
            vm.ProjectSpendStartOpt2DateError = false;
            vm.AssetInServiceOpt2DateError = false;
            vm.executionStartOpt3DateError = false;
            vm.executionEndOpt3DateError = false;
            vm.ProjectSpendStartOpt3DateError = false;
            vm.AssetInServiceOpt3DateError = false;
            vm.bcApprovedDateError = false;

            vm.BCRealizationDate1 = false;
            vm.BCRealizationDate2 = false;
            vm.BCRealizationDate3 = false;

            vm.SelectedProject = {};
            vm.selectedPrimaryProduct = "";
            vm.isPortfolioOwnerEditableBC = canPortfolioOwnerEdit;

            //SeletedProjectName = getParameterByName(window.location.search, "ProblemTitle");
            SeletedProjectId = getParameterByName(window.location.search, "ProblemID");
            vm.SelectedProjectName = SeletedProjectName;
            var dataToSendForMilestoneSet = {
                "ProjectID": SeletedProjectId, "DataType": "BusinessCaseTemplateDetails"
            };
            var dataToSendForMilestoneTemplate = {
                "ProjectID": SeletedProjectId, "DataType": "Template"
            };
            var lookup = product + "," + portfolioOwner + "," + CapitalProjectClassification + "," + funtionalGroup + "," + feasibilityPeople + "," + feasibilityTechnology + "," + feasibilityBusinessProcess + "," + feasibilityManufacturingProcess + "," + feasibilityEquipment + "," + businessCaseFundingType + "," + riskIssueProbability + "," + riskIssueType + "," + riskIssueImpact + ',' + topsFunctionRequired + "," + topsImpactMultiplier + "," + topsInLineProductStrategy + "," + productMaster + "," + topsKPI + ',' + executionScope + "," + projectScope + "," + emissionPortfolio;
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.getDataWCFAsync("getBusinessCaseInfoByProjectID/" + SeletedProjectId),
                GETPostService.getDataWCFAsync("getUserPermissionByProjectUserId/" + currentUserId + "/" + SeletedProjectId),
                GETPostService.getDataWCFAsync("getBusinessCaseOptionByProjectID/" + SeletedProjectId), GETPostService.postDataWCFAsync("getBusinessCaseBudgetFunding", SeletedProjectId),
                GETPostService.postDataWCFAsync("getBusinessCaseKeyAssumption", SeletedProjectId), GETPostService.postDataWCFAsync("getBusinessCaseRiskIssue", SeletedProjectId),
                GETPostService.postDataWCFAsync("getGetBusinessCaseKeySuccess", SeletedProjectId), GETPostService.postDataWCFAsync("getBusinessCaseSchedule", SeletedProjectId),
                GETPostService.postDataWCFAsync("getBusinessCaseTOPSKPI", SeletedProjectId), GETPostService.postDataWCFAsync("getAdditionalAuthorByProjectId", SeletedProjectId),
                GETPostService.postDataWCFAsync("getTopsProjectScope", SeletedProjectId), GETPostService.postDataWCFAsync("getBusinessCaseCapsDetails", SeletedProjectId),
                GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneTemplate), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneSet),
                  GETPostService.postDataWCFAsync("getBusinessCaseCAPSWaterWasteByProjectID", SeletedProjectId),
             GETPostService.postDataWCFAsync("getCAPSWaterWaste"))
                .then(function (resLookup, resProjectData, resPermission, resProjectBussinessDate, resBCBudgetFunding, resBCKeyAssumption, resBCRiskIssue, resBCKeySuccess, resBCSchedule, resTopsKPI, resAdditionalAuthor, resTopsProjectScopeData
                , resBusinessCaseCapsData, resMilestoneTemplates, resMilestoneTemplateDetail, resCapsWaterWasteProject, resCapsWaterWasteStream) {
                    try {
                        var projDetails = JSON.parse(resProjectData.getBusinessCaseInfoByProjectIDResult);
                        vm.dsProjectScopeData = JSON.parse(resTopsProjectScopeData.getTopsProjectScopeResult);
                        vm.SelectedProject = projDetails[0];
                        vm.localCurrencyAbbrePlaceholder = vm.SelectedProject.LocalCurrencyAbbreviation;
                        vm.dsPermission = JSON.parse(resPermission.getUserPermissionByProjectUserIdResult);
                        if (vm.dsPermission[0].canEdit == true) {
                            vm.isEditable = true;
                        }
                        /**********************START: Getting Milestone Set template and their details****************************/
                        grdMilestoneTemplateBCOpt = JSON.parse(resMilestoneTemplates);
                        grdMilestoneTemplateDetailBCOpt = JSON.parse(resMilestoneTemplateDetail);
                        /**********************END: Getting Milestone Set template and their details****************************/
                        /**********************START: Water and Waste****************************/

                        var gridCapsDataWaterWasteOpt = JSON.parse(resCapsWaterWasteProject.getBusinessCaseCAPSWaterWasteByProjectIDResult);
                        WaterWasteDataSetOpt = JSON.parse(resCapsWaterWasteStream.getCAPSWaterWasteResult);

                        WaterWasteOptionsOpt = Array.from(new Set(WaterWasteDataSetOpt.map((item) => item.WWStream)))
                        WaterWasteTypeOptionsOpt = Array.from(new Set(WaterWasteDataSetOpt.map((item) => item.WWType)))
                        WaterWasteCategoryOptionsOpt = Array.from(new Set(WaterWasteDataSetOpt.map((item) => item.Category)))



                        gridCapsDataWaterWasteOpt1 = (gridCapsDataWaterWasteOpt.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption1;
                        }))
                        gridCapsDataWaterWasteOpt2 = (gridCapsDataWaterWasteOpt.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        }))
                        gridCapsDataWaterWasteOpt3 = (gridCapsDataWaterWasteOpt.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        }))




                        /**********************END: Water and Waste****************************/

                        capsDataBC = JSON.parse(resBusinessCaseCapsData.getBusinessCaseCapsDetailsResult);

                        //LocalCurrencyAbbreviation
                        if (vm.SelectedProject.LocalCurrencyAbbreviation != null)
                            vm.localCurrencyAbbre = "(" + vm.SelectedProject.LocalCurrencyAbbreviation + ")";

                        if (vm.SelectedProject.SponsorId != null && vm.SelectedProject.SponsorId != "") {
                            var pplObj = {};
                            var siteUsers = [];
                            pplObj.UserADId = vm.SelectedProject.SponsorId;
                            pplObj.UserDisplayName = vm.SelectedProject.SponsorName;
                            pplObj.UserImageUrl = vm.SelectedProject.SponsorImageUrl;
                            pplObj.UserEmailAddress = vm.SelectedProject.SponsorEmailAddress;
                            pplObj.UserDepartment = vm.SelectedProject.SponsorDepartment;
                            pplObj.UserCountry = vm.SelectedProject.SponsorCountry;
                            siteUsers.push(pplObj);
                            var ownerlist = $("#ddlSponsor").data("kendoComboBox");
                            ownerlist.value(vm.SelectedProject.SponsorId);
                            ownerlist.setDataSource(siteUsers);
                            ownerlist.enable(vm.isEditable);
                            ownerlist.refresh();
                        }
                        else {
                            var siteUsers1 = [];
                            var ownerlist3 = $("#ddlSponsor").data("kendoComboBox");
                            ownerlist3.setDataSource(siteUsers1);
                            ownerlist3.value("");
                            ownerlist3.text("");
                            ownerlist3.enable(vm.isEditable);
                            ownerlist3.refresh();
                        }
                        if (vm.SelectedProject.BusinessCaseAuthorID != null && vm.SelectedProject.BusinessCaseAuthorID != "") {
                            var pplObj1 = {};
                            var siteUsers1 = [];
                            pplObj1.UserADId = vm.SelectedProject.BusinessCaseAuthorID;
                            pplObj1.UserDisplayName = vm.SelectedProject.BusinessCaseAuthorName;
                            pplObj1.UserImageUrl = vm.SelectedProject.BusinessCaseAuthorImageUrl;
                            pplObj1.UserEmailAddress = vm.SelectedProject.BusinessCaseAuthorEmailAddress;
                            pplObj1.UserDepartment = vm.SelectedProject.BusinessCaseAuthorDepartment;
                            pplObj1.UserCountry = vm.SelectedProject.BusinessCaseAuthorCountry;
                            siteUsers1.push(pplObj1);
                            var ownerlist1 = $("#ddlbusinessCaseAuthor").data("kendoComboBox");
                            ownerlist1.value(vm.SelectedProject.BusinessCaseAuthorID);
                            ownerlist1.setDataSource(siteUsers1);
                            ownerlist1.enable(vm.isEditable);
                            ownerlist1.refresh();
                        }
                        else {
                            var siteUsers4 = [];
                            var ownerlist4 = $("#ddlbusinessCaseAuthor").data("kendoComboBox");
                            ownerlist4.setDataSource(siteUsers4);
                            ownerlist4.value("");
                            ownerlist4.enable(vm.isEditable);
                            ownerlist4.refresh();
                        }
                        var projBC_Details = JSON.parse(resProjectBussinessDate.getBusinessCaseOptionByProjectIDResult);


                        var option2Count = (projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        })).length;
                        var option3Count = projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        }).length;

                        var option1Variable = (projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption1;
                        })[0]) != undefined ? projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption1;
                        }) : projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption1;
                        });
                        var option2Variable = (projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        })[0]) != undefined ? projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        }) : projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        });
                        var option3Variable = (projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        })[0]) != undefined ? projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        }) : projBC_Details.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        });
                        if (option1Variable.length > 0) {
                            vm.businessOptionInfoSelector = option1Variable[0];
                        }
                        if (option2Variable.length > 0) {
                            vm.businessOption2InfoSelector = option2Variable[0];
                        }
                        if (option3Variable.length > 0) {
                            vm.businessOption3InfoSelector = option3Variable[0];
                        }

                        var originalDefaultObject = {
                            "BusinessCaseProcess": null,
                            "BusinessCaseProcessID": null,
                            "CapexRequired": false,
                            "Equipment": null,
                            "EquipmentRatingID": null,
                            "FunctionsRequiredID": null,
                            "ImpactMultiplierID": null,
                            "InLineProductID": null,
                            "ManufacturingProcess": null,
                            "ManufacturingProcessID": null,
                            "OpexRequired": false,
                            "People": null,
                            "PeopleRatingID": null,
                            "RecommendedOption": true,
                            "Technology": null,
                            "TechnologyRatingID": null
                        };
                        var originalDefaultObject23 = {
                            "BusinessCaseProcess": null,
                            "BusinessCaseProcessID": null,
                            "CapexRequired": false,
                            "Equipment": null,
                            "EquipmentRatingID": null,
                            "FunctionsRequiredID": null,
                            "ImpactMultiplierID": null,
                            "InLineProductID": null,
                            "ManufacturingProcess": null,
                            "ManufacturingProcessID": null,
                            "OpexRequired": false,
                            "People": null,
                            "PeopleRatingID": null,
                            "Technology": null,
                            "TechnologyRatingID": null
                        };
                        OriginalBCdata = {};

                        angular.copy(vm.SelectedProject, OriginalBCdata);

                        if (option1Variable.length > 0) {
                            OriginalbusinessOptionInfoSelector = {};

                            angular.copy(vm.businessOptionInfoSelector, OriginalbusinessOptionInfoSelector);
                        }
                        else {
                            OriginalbusinessOptionInfoSelector = originalDefaultObject;
                        }
                        if (option2Variable.length > 0) {
                            OriginalbusinessOption2InfoSelector = {};

                            angular.copy(vm.businessOption2InfoSelector, OriginalbusinessOption2InfoSelector);
                        }
                        else {
                            OriginalbusinessOption2InfoSelector = originalDefaultObject23;
                        }
                        if (option3Variable.length > 0) {
                            OriginalbusinessOption3InfoSelector = {};

                            angular.copy(vm.businessOption3InfoSelector, OriginalbusinessOption3InfoSelector);
                        }
                        else {
                            OriginalbusinessOption3InfoSelector = originalDefaultObject23;
                        }

                        if (option2Count == 0 && option3Count == 0) {
                            vm.businessOptionInfoSelector.RecommendedOption = true;
                        }
                        if (option2Count != 0 || option3Count != 0) {
                            if (vm.businessOption2InfoSelector.RecommendedOption == false && vm.businessOption3InfoSelector.RecommendedOption == false) {
                                vm.businessOptionInfoSelector.RecommendedOption = true;
                            }
                        }

                        vm.OEProjectVisibleSolution = vm.SelectedProject.IsOEProject;
                        if (vm.SelectedProject.IsOEProject) {
                            var oEProjectTypelist = $("#ddl_GI_OEProjectType").data("kendoComboBox");
                            oEProjectTypelist.value(vm.SelectedProject.OEProjectType);
                            oEProjectTypelist.refresh();
                        }

                       
                        //if (vm.isEditable == true) {
                        vm.dsBCPrimaryProduct = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == product;
                        });
                        if (vm.SelectedProject.PrimaryProductID != "") {
                            var selectedPrimaryProduct = vm.dsBCPrimaryProduct.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.PrimaryProductID;
                            });
                            vm.selectedPrimaryProduct = selectedPrimaryProduct[0];
                        }

                        vm.dsBCPortfolioOwner = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == portfolioOwner;
                        });
                        if (vm.SelectedProject.PortfolioOwnerID != "") {
                            var selectedPortfolioOwner = vm.dsBCPortfolioOwner.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.PortfolioOwnerID;
                            });
                            vm.selectedPortfolioOwner = selectedPortfolioOwner[0];
                        }


                        var impObj = [];
                        var exScope = [];
                        var OEProjType = [];
                        if (vm.SelectedProject.OtherImpactedProducts != null && vm.SelectedProject.OtherImpactedProducts != 'undefined') {
                            impObj = vm.SelectedProject.OtherImpactedProducts.split(',');
                        }

                        if (vm.SelectedProject.ExecutionScopeID != null && vm.SelectedProject.ExecutionScopeID != 'undefined') {
                            exScope = vm.SelectedProject.ExecutionScopeID.split(',');
                        }

                        vm.ImpactedProductOptions = {
                            placeholder: "Select products...",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsBCPrimaryProduct,
                            filter: "contains"
                        };
                        vm.ImpactedProductIds = impObj;

                        vm.dsBCExectionScope = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == executionScope;
                        })

                        vm.ExecutionScopeOptions = {
                            placeholder: "Select products...",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsBCExectionScope,
                            filter: "contains"
                        };
                        vm.ExecutionScopeIds = exScope;

                        vm.dsBCFunctionalOwner = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == funtionalGroup;
                        });




                        var SelectedPpl = [];
                        var authArraySelected = [];
                        var multiselect = $("#ddl_GI_AdditionalAuthorsContributor").data("kendoMultiSelect");

                        //Getting the current additional authors of the project 
                        //Make those values default selected 
                        //resAdditionalAuthor is holding the values of current additional authors.
                        vm.dsAdditionalAuthList = [];
                        if (vm.SelectedProject.AdditionalAuthorsContributorsID != null && vm.SelectedProject.AdditionalAuthorsContributorsID != "") {
                            vm.dsAdditionalAuthList = JSON.parse(resAdditionalAuthor.getAdditionalAuthorByProjectIdResult);
                            authArraySelected = vm.SelectedProject.AdditionalAuthorsContributorsID.split(',');
                            angular.forEach(authArraySelected, function (item, index) {
                                SelectedPpl.push(item);
                            });
                        }

                        //searchPeopleMultiselect is a common function which receive three parameters-
                        //1. Id if the control which we want to make multiselect
                        //2. array of current additional authors user objects which needs to be displayed as selected on load
                        //3. Current Additional author's userID's in comma seperated form
                        GETPostService.searchPeopleMultiselect("ddl_GI_AdditionalAuthorsContributor", SelectedPpl, vm.dsAdditionalAuthList);
                        var multiselect = $("#ddl_GI_AdditionalAuthorsContributor").data("kendoMultiSelect");
                        multiselect.readonly(!vm.isEditable);



                        vm.dsFeasibilityPeople = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == feasibilityPeople;
                        }), "LookUpMemberOrder");
                        if (vm.businessOptionInfoSelector.PeopleRatingID != "") {
                            var selectedBCPeopleRating = vm.dsFeasibilityPeople.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOptionInfoSelector.PeopleRatingID;
                            });
                            vm.selectedBCPeopleRating = vm.businessOptionInfoSelector.PeopleRatingID != null ? selectedBCPeopleRating[0] : "";
                        }
                        vm.dsEmissionPortfolio = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == emissionPortfolio;
                        });

                        //option2 
                        if (vm.businessOption2InfoSelector.PeopleRatingID != "") {
                            var selectedBCPeopleRating2 = vm.dsFeasibilityPeople.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption2InfoSelector.PeopleRatingID;
                            });
                            vm.selectedBCPeopleRatingOption2 = vm.businessOption2InfoSelector.PeopleRatingID != null ? selectedBCPeopleRating2[0] : "";
                        }
                        //option3
                        if (vm.businessOption3InfoSelector.PeopleRatingID != "") {
                            var selectedBCPeopleRating3 = vm.dsFeasibilityPeople.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption3InfoSelector.PeopleRatingID;
                            });
                            vm.selectedBCPeopleRatingOption3 = vm.businessOption3InfoSelector.PeopleRatingID != null ? selectedBCPeopleRating3[0] : "";
                        }
                        vm.dsFeasibilityTechnology = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == feasibilityTechnology;
                        }), "LookUpMemberOrder");
                        if (vm.businessOptionInfoSelector.TechnologyRatingID != "") {
                            var selectedBCTechnologyRating = vm.dsFeasibilityTechnology.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOptionInfoSelector.TechnologyRatingID;
                            });
                            vm.selectedBCTechnologyRating = vm.businessOptionInfoSelector.TechnologyRatingID != null ? selectedBCTechnologyRating[0] : "";
                        }
                        //option2
                        if (vm.businessOption2InfoSelector.TechnologyRatingID != "") {
                            var selectedBCTechnologyRating2 = vm.dsFeasibilityTechnology.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption2InfoSelector.TechnologyRatingID;
                            });
                            vm.selectedBCTechnologyRatingOption2 = vm.businessOption2InfoSelector.TechnologyRatingID != null ? selectedBCTechnologyRating2[0] : "";
                        }
                        //option3
                        if (vm.businessOption3InfoSelector.TechnologyRatingID != "") {
                            var selectedBCTechnologyRating3 = vm.dsFeasibilityTechnology.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption3InfoSelector.TechnologyRatingID;
                            });
                            vm.selectedBCTechnologyRatingOption3 = vm.businessOption3InfoSelector.TechnologyRatingID != null ? selectedBCTechnologyRating3[0] : "";
                        }
                        vm.dsFeasibilityBusiness = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == feasibilityBusinessProcess;
                        }), "LookUpMemberOrder");
                        if (vm.businessOptionInfoSelector.BusinessCaseProcessID != "") {
                            var selectedBCBusinessCaseProcess = vm.dsFeasibilityBusiness.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOptionInfoSelector.BusinessCaseProcessID;
                            });
                            vm.selectedBCBusinessCaseProcess = vm.businessOptionInfoSelector.BusinessCaseProcessID != null ? selectedBCBusinessCaseProcess[0] : "";
                        }
                        //option2
                        if (vm.businessOption2InfoSelector.BusinessCaseProcessID != "") {
                            var selectedBCBusinessCaseProcess2 = vm.dsFeasibilityBusiness.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption2InfoSelector.BusinessCaseProcessID;
                            });
                            vm.selectedBCBusinessCaseProcessOption2 = vm.businessOption2InfoSelector.BusinessCaseProcessID != null ? selectedBCBusinessCaseProcess2[0] : "";
                        }
                        //option3
                        if (vm.businessOption3InfoSelector.BusinessCaseProcessID != "") {
                            var selectedBCBusinessCaseProcess3 = vm.dsFeasibilityBusiness.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption3InfoSelector.BusinessCaseProcessID;
                            });
                            vm.selectedBCBusinessCaseProcessOption3 = vm.businessOption3InfoSelector.BusinessCaseProcessID != null ? selectedBCBusinessCaseProcess3[0] : "";
                        }
                        vm.dsFeasibilityManufacturing = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == feasibilityManufacturingProcess;
                        }), "LookUpMemberOrder");
                        if (vm.businessOptionInfoSelector.ManufacturingProcessID != "") {
                            var selectedBCManufacturingProcess = vm.dsFeasibilityManufacturing.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOptionInfoSelector.ManufacturingProcessID;
                            });
                            vm.selectedBCManufacturingProcess = vm.businessOptionInfoSelector.ManufacturingProcessID != null ? selectedBCManufacturingProcess[0] : "";
                        }
                        //option2
                        if (vm.businessOption2InfoSelector.ManufacturingProcessID != "") {
                            var selectedBCManufacturingProcess2 = vm.dsFeasibilityManufacturing.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption2InfoSelector.ManufacturingProcessID;
                            });
                            vm.selectedBCManufacturingProcessoption2 = vm.businessOption2InfoSelector.ManufacturingProcessID != null ? selectedBCManufacturingProcess2[0] : "";
                        }
                        //option3
                        if (vm.businessOption3InfoSelector.ManufacturingProcessID != "") {
                            var selectedBCManufacturingProcess3 = vm.dsFeasibilityManufacturing.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption3InfoSelector.ManufacturingProcessID;
                            });
                            vm.selectedBCManufacturingProcessOption3 = vm.businessOption3InfoSelector.ManufacturingProcessID != null ? selectedBCManufacturingProcess3[0] : "";
                        }

                        vm.dsFeasibilityEquipment = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == feasibilityEquipment;
                        }), "LookUpMemberOrder");
                        if (vm.businessOptionInfoSelector.EquipmentRatingID != "") {
                            var selectedBCEquipmentRating = vm.dsFeasibilityEquipment.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOptionInfoSelector.EquipmentRatingID;
                            });
                            vm.selectedBCEquipmentRating = vm.businessOptionInfoSelector.EquipmentRatingID != null ? selectedBCEquipmentRating[0] : "";
                        }
                        //option2
                        if (vm.businessOption2InfoSelector.EquipmentRatingID != "") {
                            var selectedBCEquipmentRating2 = vm.dsFeasibilityEquipment.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption2InfoSelector.EquipmentRatingID != null ? vm.businessOption2InfoSelector.EquipmentRatingID : "";
                            });
                            vm.selectedBCEquipmentRatingOption2 = selectedBCEquipmentRating2[0];
                        }
                        //option3
                        if (vm.businessOption3InfoSelector.EquipmentRatingID != "") {
                            var selectedBCEquipmentRating3 = vm.dsFeasibilityEquipment.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption3InfoSelector.EquipmentRatingID;
                            });
                            vm.selectedBCEquipmentRatingOption3 = vm.businessOption3InfoSelector.EquipmentRatingID != null ? selectedBCEquipmentRating3[0] : "";
                        }
                        //if (vm.businessOptionInfoSelector.EmissionPortfolioID != null && vm.businessOptionInfoSelector.EmissionPortfolioID != "") {
                        gridCapsData = capsDataBC.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption1;
                        });

                        angular.copy(gridCapsData, beforeSaveGriddata);
                        //}
                        if (vm.SelectedProject.EmissionPortfolioID != null) {
                            vm.isEMPortfolio = true;
                        }
                        else
                            vm.isEMPortfolio = false;
                        var selectedEmissionPCaps = [];
                        //if (vm.businessOptionInfoSelector.EmissionPortfolioID != null && vm.businessOptionInfoSelector.EmissionPortfolioID != "") {
                        selectedEmissionPCaps = vm.dsEmissionPortfolio.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.EmissionPortfolioID;
                        });
                        //}
                        vm.SelectedCapsEmissionPortfolio1 = selectedEmissionPCaps.length > 0 ? selectedEmissionPCaps[0] : "";
                        //option2
                        //if (vm.businessOption2InfoSelector.EmissionPortfolioID != null && vm.businessOption2InfoSelector.EmissionPortfolioID != "") {

                        gridCapsData2 = capsDataBC.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        });
                        angular.copy(gridCapsData2, beforeSaveGriddata2);
                        //}
                        var selectedEmissionPCaps2 = [];
                        //if (vm.businessOption2InfoSelector.EmissionPortfolioID != null && vm.businessOption2InfoSelector.EmissionPortfolioID != "") {
                        selectedEmissionPCaps2 = vm.dsEmissionPortfolio.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.EmissionPortfolioID;
                        });
                        //}
                        vm.SelectedCapsEmissionPortfolio2 = selectedEmissionPCaps2.length > 0 ? selectedEmissionPCaps2[0] : "";
                        //option3
                        //if (vm.businessOption3InfoSelector.EmissionPortfolioID != null && vm.businessOption3InfoSelector.EmissionPortfolioID != "") {

                        gridCapsData3 = capsDataBC.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        });
                        angular.copy(gridCapsData3, beforeSaveGriddata3);
                        //}
                        var selectedEmissionPCaps3 = [];
                        //if (vm.businessOption3InfoSelector.EmissionPortfolioID != null && vm.businessOption3InfoSelector.EmissionPortfolioID != "") {
                        selectedEmissionPCaps3 = vm.dsEmissionPortfolio.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.EmissionPortfolioID;
                        });
                        //}
                        vm.SelectedCapsEmissionPortfolio3 = selectedEmissionPCaps3.length > 0 ? selectedEmissionPCaps3[0] : "";

                        vm.formattedCalculatedEmissionsImpact1 = kendo.toString(vm.businessOptionInfoSelector.CalculatedEmissionsImpact, "n1");
                        vm.formattedCalculatedEmissionsImpact2 = kendo.toString(vm.businessOption2InfoSelector.CalculatedEmissionsImpact, "n1");
                        vm.formattedCalculatedEmissionsImpact3 = kendo.toString(vm.businessOption3InfoSelector.CalculatedEmissionsImpact, "n1");

                        if (btnClickBusinessCase == 0) {
                            functionalOwnerBulk = [];
                            //dsBCFunctionalOwner will filled on general Info
                            for (var i = 0; i < vm.dsBCFunctionalOwner.length; i++) {
                                var item = {
                                    "text": vm.dsBCFunctionalOwner[i].LookUpMemberName, "value": vm.dsBCFunctionalOwner[i].LookUpMemberID
                                }
                                functionalOwnerBulk.push(item);
                            }
                            vm.dsFundingType = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == businessCaseFundingType
                            }), "LookUpMemberOrder");

                            fundingTypeBulk = [];
                            for (var i = 0; i < vm.dsFundingType.length; i++) {
                                var item = {
                                    "text": vm.dsFundingType[i].LookUpMemberName, "value": vm.dsFundingType[i].LookUpMemberID
                                }
                                fundingTypeBulk.push(item);
                            }

                            vm.dsLikelihood = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == riskIssueProbability
                            }), "LookUpMemberOrder");

                            inThePlan = [];
                            inThePlan = [{ value: true, text: "Yes" }, { value: false, text: "No" }];


                            likelihoodBulk = [];
                            for (var i = 0; i < vm.dsLikelihood.length; i++) {
                                var item = {
                                    "text": vm.dsLikelihood[i].LookUpMemberName, "value": vm.dsLikelihood[i].LookUpMemberID
                                }
                                likelihoodBulk.push(item);
                            }

                            vm.dsFundingSource = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == portfolioOwner
                            }), "LookUpMemberOrder");

                            fundingSourceBulk = [];
                            for (var i = 0; i < vm.dsFundingSource.length; i++) {
                                var item = {
                                    "text": vm.dsFundingSource[i].LookUpMemberName, "value": vm.dsFundingSource[i].LookUpMemberID
                                }
                                fundingSourceBulk.push(item);
                            }
                            vm.dsRiskIssueImpact = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName == riskIssueImpact
                            }), "LookUpMemberOrder");

                            riskIssueImpactBulk = [];
                            for (var i = 0; i < vm.dsRiskIssueImpact.length; i++) {
                                var item = {
                                    "text": vm.dsRiskIssueImpact[i].LookUpMemberName, "value": vm.dsRiskIssueImpact[i].LookUpMemberID
                                }
                                riskIssueImpactBulk.push(item);
                            }

                            vm.riskIssueType = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                return entry.LookUpName === riskIssueType;
                            });
                            riskIssueTypeBulk = [];
                            for (var i = 0; i < vm.riskIssueType.length; i++) {
                                var item3 = {
                                    "text": vm.riskIssueType[i].LookUpMemberName, "value": vm.riskIssueType[i].LookUpMemberID
                                }
                                riskIssueTypeBulk.push(item3);
                            }
                        }


                        if (vm.businessOptionInfoSelector.OpexRequired == true) {
                            vm.showOpex = "1";
                            vm.businessOptionInfoSelector.OpexRequired = true;
                            //vm.showOpexDiv = true;
                        }
                        else {
                            vm.showOpex = "0";
                            vm.businessOptionInfoSelector.OpexRequired = false
                            //vm.showOpexDiv = false;
                        }

                        if (vm.businessOptionInfoSelector.CapexRequired == true) {
                            vm.showCapex = "1";
                            vm.businessOptionInfoSelector.CapexRequired = true;
                            //vm.showCapexDiv = true;
                        }
                        else {
                            vm.showCapex = "0";
                            vm.businessOptionInfoSelector.CapexRequired = false;
                            //vm.showCapexDiv = false;
                        }

                        //option2 & 3
                        if (vm.businessOption2InfoSelector.OpexRequired == true) {
                            vm.showOpexOpt2 = "1";
                            vm.businessOption2InfoSelector.OpexRequired = true;
                            //vm.showOpexDiv = true;
                        }
                        else {
                            vm.showOpexOpt2 = "0";
                            vm.businessOption2InfoSelector.OpexRequired = false
                            //vm.showOpexDiv = false;
                        }

                        if (vm.businessOption2InfoSelector.CapexRequired == true) {
                            vm.showCapexOpt2 = "1";
                            vm.businessOption2InfoSelector.CapexRequired = true;
                            //vm.showCapexDiv = true;
                        }
                        else {
                            vm.showCapexOpt2 = "0";
                            vm.businessOption2InfoSelector.CapexRequired = false;
                            //vm.showCapexDiv = false;
                        }


                        //option3
                        if (vm.businessOption3InfoSelector.OpexRequired == true) {
                            vm.showOpexOpt3 = "1";
                            vm.businessOption3InfoSelector.OpexRequired = true;
                            //vm.showOpexDiv = true;
                        }
                        else {
                            vm.showOpexOpt3 = "0";
                            vm.businessOption3InfoSelector.OpexRequired = false
                            //vm.showOpexDiv = false;
                        }

                        if (vm.businessOption3InfoSelector.CapexRequired == true) {
                            vm.showCapexOpt3 = "1";
                            vm.businessOption3InfoSelector.CapexRequired = true;
                            //vm.showCapexDiv = true;
                        }
                        else {
                            vm.showCapexOpt3 = "0";
                            vm.businessOption3InfoSelector.CapexRequired = false;
                            //vm.showCapexDiv = false;
                        }


                        //vm.showOpexOpt3 = vm.businessOption3InfoSelector.OpexRequired == true ? "1" : "0";
                        //vm.showCapexOpt3 = vm.businessOption3InfoSelector.CapexRequired == true ? "1" : "0";
                        //vm.businessOptionInfoSelector.CapexRequired = vm.businessOptionInfoSelector.CapexRequired == "1" ? "True" : "False";
                        //vm.businessOptionInfoSelector.OpexRequired = vm.businessOptionInfoSelector.OpexRequired == "1" ? "True" : "False";

                        dsBCBudgetFunding = JSON.parse(resBCBudgetFunding.getBusinessCaseBudgetFundingResult);
                        dsBCKeyAssumption = JSON.parse(resBCKeyAssumption.getBusinessCaseKeyAssumptionResult);
                        dsBCRiskIssue = JSON.parse(resBCRiskIssue.getBusinessCaseRiskIssueResult);
                        dsBCKeySuccess = JSON.parse(resBCKeySuccess.getGetBusinessCaseKeySuccessResult);
                        dsBCSchedule = JSON.parse(resBCSchedule.getBusinessCaseScheduleResult);

                        vm.dsBCScheduleOpt1 = dsBCSchedule.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption1;
                        });
                        vm.dsBCScheduleOpt2 = dsBCSchedule.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        });
                        vm.dsBCScheduleOpt3 = dsBCSchedule.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        });

                        vm.dsBCKeySuccessOpt1 = dsBCKeySuccess.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption1;
                        });
                        vm.dsBCKeySuccessOpt2 = dsBCKeySuccess.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        });
                        vm.dsBCKeySuccessOpt3 = dsBCKeySuccess.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        });

                        vm.dsBCRiskIssueOpt1 = dsBCRiskIssue.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption1;
                        });
                        vm.dsBCRiskIssueOpt2 = dsBCRiskIssue.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        });
                        vm.dsBCRiskIssueOpt3 = dsBCRiskIssue.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        });

                        vm.dsBCKeyAssumptionOpt1 = dsBCKeyAssumption.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption1;
                        });
                        vm.dsBCKeyAssumptionOpt2 = dsBCKeyAssumption.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        });
                        vm.dsBCKeyAssumptionOpt3 = dsBCKeyAssumption.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        });

                        vm.dsBCBudgetFundingOpt1 = dsBCBudgetFunding.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption1;
                        });
                        vm.dsBCBudgetFundingOpt2 = dsBCBudgetFunding.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption2;
                        });
                        vm.dsBCBudgetFundingOpt3 = dsBCBudgetFunding.filter(function (entry) {
                            return entry.BusinessOptionID == BusinessCaseOption3;
                        });

                        /*----------------------Fill tops grid-Start-------------------------*/
                        vm.dsProjectScope = $filter('orderBy')(JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == projectScope;
                        }), "LookUpMemberOrder");
                        vm.dsTopsFunctions = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == topsFunctionRequired;
                        });
                        vm.dsTopsImpactMultiplier = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == topsImpactMultiplier;
                        });
                        vm.dsTopsInLineProductStrategy = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == topsInLineProductStrategy;
                        });
                        vm.dsTopsProducts = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == productMaster;
                        });
                        var topsList = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                            return entry.LookUpName == topsKPI;
                        });
                        for (var i = 0; i < topsList.length; i++) {
                            var item = {
                                "text": topsList[i].LookUpMemberName, "value": topsList[i].LookUpMemberID
                            }
                            topsBulk.push(item);
                        }

                        //var topsData = JSON.parse(resTops.getProjectTOPSResult);
                        //if (topsData.length > 0) {
                        //  vm.tops = topsData[0];

                        if (vm.businessOptionInfoSelector.ProjectScope != null) {
                            var selectedTopsProjectScope = vm.dsProjectScope.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOptionInfoSelector.ProjectScope;
                            });
                        }
                        vm.businessOptionInfoSelector.ProjectScope = (vm.businessOptionInfoSelector.ProjectScope != null && vm.businessOptionInfoSelector.ProjectScope != "") ? selectedTopsProjectScope[0] : null;

                        if (vm.businessOptionInfoSelector.FunctionsRequiredID != null) {
                            var selectedTopsFunctions = vm.dsTopsFunctions.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOptionInfoSelector.FunctionsRequiredID;
                            });
                            //vm.businessOptionInfoSelector.FunctionsRequiredID = selectedTopsFunctions[0];
                        }
                        vm.businessOptionInfoSelector.FunctionsRequiredID = (vm.businessOptionInfoSelector.FunctionsRequiredID != null && vm.businessOptionInfoSelector.FunctionsRequiredID != "") ? selectedTopsFunctions[0] : null;
                        if (vm.businessOptionInfoSelector.InLineProductID != null) {
                            var selectedTopsProduct1 = vm.dsTopsInLineProductStrategy.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOptionInfoSelector.InLineProductID;
                            });
                            //vm.businessOptionInfoSelector.InLineProductID = selectedTopsProduct1[0];
                        }
                        vm.businessOptionInfoSelector.InLineProductID = (vm.businessOptionInfoSelector.InLineProductID != null && vm.businessOptionInfoSelector.InLineProductID != "") ? selectedTopsProduct1[0] : null;

                        if (vm.businessOptionInfoSelector.ImpactMultiplierID != null) {
                            var selectedTopsMultiplier = vm.dsTopsImpactMultiplier.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOptionInfoSelector.ImpactMultiplierID;
                            });
                            //vm.businessOptionInfoSelector.ImpactMultiplierID = selectedTopsMultiplier[0];
                        }

                        vm.businessOptionInfoSelector.ImpactMultiplierID = (vm.businessOptionInfoSelector.ImpactMultiplierID != null && vm.businessOptionInfoSelector.ImpactMultiplierID != "") ? selectedTopsMultiplier[0] : null;

                        //option2
                        if (vm.businessOption2InfoSelector.ProjectScope != null) {
                            var selectedTopsProjectScope2 = vm.dsProjectScope.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption2InfoSelector.ProjectScope;
                            });
                        }
                        vm.businessOption2InfoSelector.ProjectScope = (vm.businessOption2InfoSelector.ProjectScope != null && vm.businessOption2InfoSelector.ProjectScope != "") ? selectedTopsProjectScope2[0] : null;

                        if (vm.businessOption2InfoSelector.FunctionsRequiredID != null) {
                            var selectedTopsFunctions2 = vm.dsTopsFunctions.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption2InfoSelector.FunctionsRequiredID;
                            });
                            // vm.businessOption2InfoSelector.FunctionsRequiredID = selectedTopsFunctions2[0];
                        }
                        vm.businessOption2InfoSelector.FunctionsRequiredID = (vm.businessOption2InfoSelector.FunctionsRequiredID != null && vm.businessOption2InfoSelector.FunctionsRequiredID != "") ? selectedTopsFunctions2[0] : null;
                        if (vm.businessOption2InfoSelector.InLineProductID != null) {
                            var selectedTopsProduct12 = vm.dsTopsInLineProductStrategy.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption2InfoSelector.InLineProductID;
                            });
                            //vm.businessOption2InfoSelector.InLineProductID = selectedTopsProduct12[0];
                        }
                        vm.businessOption2InfoSelector.InLineProductID = (vm.businessOption2InfoSelector.InLineProductID != null && vm.businessOption2InfoSelector.InLineProductID != "") ? selectedTopsProduct12[0] : null;

                        if (vm.businessOption2InfoSelector.ImpactMultiplierID != null) {
                            var selectedTopsMultiplier2 = vm.dsTopsImpactMultiplier.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption2InfoSelector.ImpactMultiplierID;
                            });
                            //vm.businessOption2InfoSelector.ImpactMultiplierID = selectedTopsMultiplier2[0];
                        }
                        vm.businessOption2InfoSelector.ImpactMultiplierID = (vm.businessOption2InfoSelector.ImpactMultiplierID != null && vm.businessOption2InfoSelector.ImpactMultiplierID != "") ? selectedTopsMultiplier2[0] : null;

                        //option3
                        if (vm.businessOption3InfoSelector.ProjectScope != null) {
                            var selectedTopsProjectScope3 = vm.dsProjectScope.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption3InfoSelector.ProjectScope;
                            });
                        }
                        vm.businessOption3InfoSelector.ProjectScope = (vm.businessOption3InfoSelector.ProjectScope != null && vm.businessOption3InfoSelector.ProjectScope != "") ? selectedTopsProjectScope3[0] : null;

                        if (vm.businessOption3InfoSelector.FunctionsRequiredID != null) {
                            var selectedTopsFunctions3 = vm.dsTopsFunctions.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption3InfoSelector.FunctionsRequiredID;
                            });
                            // vm.businessOption3InfoSelector.FunctionsRequiredID = selectedTopsFunctions3[0];
                        }
                        vm.businessOption3InfoSelector.FunctionsRequiredID = (vm.businessOption3InfoSelector.FunctionsRequiredID != null && vm.businessOption3InfoSelector.FunctionsRequiredID != "") ? selectedTopsFunctions3[0] : null;
                        if (vm.businessOption3InfoSelector.InLineProductID != null) {
                            var selectedTopsProduct13 = vm.dsTopsInLineProductStrategy.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption3InfoSelector.InLineProductID;
                            });
                            //vm.businessOption3InfoSelector.InLineProductID = selectedTopsProduct13[0];
                        }
                        vm.businessOption3InfoSelector.InLineProductID = (vm.businessOption3InfoSelector.InLineProductID != null && vm.businessOption3InfoSelector.InLineProductID != "") ? selectedTopsProduct13[0] : null;
                        if (vm.businessOption3InfoSelector.ImpactMultiplierID != null) {
                            var selectedTopsMultiplier3 = vm.dsTopsImpactMultiplier.filter(function (entry) {
                                return entry.LookUpMemberID == vm.businessOption3InfoSelector.ImpactMultiplierID;
                            });
                            //vm.businessOption3InfoSelector.ImpactMultiplierID = selectedTopsMultiplier3[0];
                        }
                        vm.businessOption3InfoSelector.ImpactMultiplierID = (vm.businessOption3InfoSelector.ImpactMultiplierID != null && vm.businessOption3InfoSelector.ImpactMultiplierID != "") ? selectedTopsMultiplier3[0] : null;

                        if (btnClickBusinessCase == 0) {
                            var combobox1 = $("#ddl_ProjectScopeBC1").data("kendoDropDownList");
                            combobox1.bind("select", onBCProjectScopeChange);

                            var combobox2 = $("#ddl_ProjectScopeBC2").data("kendoDropDownList");
                            combobox2.bind("select", onBCProjectScopeChangeBC2);

                            var combobox3 = $("#ddl_ProjectScopeBC3").data("kendoDropDownList");
                            combobox3.bind("select", onBCProjectScopeChangeBC3);

                            InitKendoGridTops();
                            InitKendoGridTopsOption2();
                            InitKendoGridTopsOption3();
                            InitkendoGridTopsProjectScope();


                            //option1
                            InitkendoGridTime();
                            InitkGridBusinessCaseOpRisk();
                            InitkGridBusinessCaseFunding();
                            InitkGridBusinessCaseOptKeySuccessCriteria();
                            InitKendoGridCaps();
                            InitMilestoneTemplatesBCOpt(BusinessCaseOption1);
                            InitKendoGridCapsWaterWasteOpt1();

                            //option2
                            InitkendoGridTimeOption2();
                            InitkGridBusinessCaseFundingOption2();
                            InitkGridBusinessCaseOptKeySuccessCriteriaOption2();
                            InitkGridBusinessCaseOpRiskOption2();
                            InitKendoGridCaps2();
                            InitMilestoneTemplatesBCOpt(BusinessCaseOption2);
                            InitKendoGridCapsWaterWasteOpt2();

                            //option3
                            InitkendoGridTimeOption3();
                            InitkGridBusinessCaseOpRiskOption3();
                            InitkGridBusinessCaseFundingOption3();
                            InitkGridBusinessCaseOptKeySuccessCriteriaOption3();
                            InitKendoGridCaps3();
                            InitMilestoneTemplatesBCOpt(BusinessCaseOption3);
                            InitKendoGridCapsWaterWasteOpt3();
                        }
                        else {
                            //option1
                            $('#gridBusinessCaseOptTimeline').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseOptAssumption').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseFunding').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseOptKeySuccessCriteria').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseOptRisk').data('kendoGrid').dataSource.read();
                            $('#gridCapsOpt1').data('kendoGrid').dataSource.read();
                            $('#gridCapsWaterWasteOpt1').data('kendoGrid').dataSource.read();

                            var dataSource = new kendo.data.DataSource({ data: grdMilestoneTemplateBCOpt });
                            var grid = $('#gridBCOptAddMilestones').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);

                            //option2
                            $('#gridBusinessCaseOpt2Timeline').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseFundingOption2').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseOptKeySuccessCriteriaOption2').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseOptAssumptionOption2').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseOptRiskOption2').data('kendoGrid').dataSource.read();
                            $('#gridCapsOpt2').data('kendoGrid').dataSource.read();
                            $('#gridCapsWaterWasteOpt2').data('kendoGrid').dataSource.read();

                            var grid1 = $('#gridBCOptAddMilestones2').data('kendoGrid');
                            grid1.setDataSource(dataSource);

                            //option3
                            $('#gridBusinessCaseOpt3Timeline').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseOptAssumptionOption3').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseOptRiskOption3').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseFundingOption3').data('kendoGrid').dataSource.read();
                            $('#gridBusinessCaseOptKeySuccessCriteriaOption3').data('kendoGrid').dataSource.read();
                            $('#gridCapsOpt3').data('kendoGrid').dataSource.read();
                            $('#gridCapsWaterWasteOpt3').data('kendoGrid').dataSource.read();
                            var grid2 = $('#gridBCOptAddMilestones3').data('kendoGrid');
                            grid2.setDataSource(dataSource);
                        }
                        getDataForTops();
                        /*----------------------Fill tops grid-END-------------------------*/

                        bindChangeComboBox("peopleRating");
                        bindChangeComboBox("technologyRating");
                        bindChangeComboBox("businessProcessRating");
                        bindChangeComboBox("manufacturingRating");
                        bindChangeComboBox("equipmentRating");

                        bindChangeComboBox("peopleRating2");
                        bindChangeComboBox("technologyRating2");
                        bindChangeComboBox("businessProcessRating2");
                        bindChangeComboBox("manufacturingRating2");
                        bindChangeComboBox("equipmentRating2");

                        bindChangeComboBox("peopleRating3");
                        bindChangeComboBox("technologyRating3");
                        bindChangeComboBox("businessProcessRating3");
                        bindChangeComboBox("manufacturingRating3");
                        bindChangeComboBox("equipmentRating3");

                        bindChangeComboBox("functions1");
                        bindChangeComboBox("functions2");
                        bindChangeComboBox("functions3");


                        bindChangeComboBox("InlineProductOpt1");
                        bindChangeComboBox("impactOpt1");

                        bindChangeComboBox("InlineProductOpt2");
                        bindChangeComboBox("impactOpt2");

                        bindChangeComboBox("InlineProductOpt3");
                        bindChangeComboBox("impactOpt3");

                        //disableComboSearch("productMulti1");
                        //disableComboSearch("productMulti2");
                        //disableComboSearch("productMulti3");
                        gridAddDefaultRows();
                        btnClickBusinessCase++;

                        $scope.$digest();
                        hideLoading();
                    }
                    catch (err) {
                        hideLoading();
                        var dataToSendErr = {
                            "method": "prepareDataForBusinessCase", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                            .then(function (response) { alert(errormessage) });
                    }
                });
        }
        catch (e) {
            hideLoading();
        }
    };

    function riskTypeDropDownEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: riskIssueTypeBulk,

            });
    };
    function impactDropDownEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: riskIssueImpactBulk,

            });
    };
    function likelihoodDropDownEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: likelihoodBulk,

            });
    };
    function functionalDropDownEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: functionalOwnerBulk,

            });
    };
    function fundingDropDownEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: fundingTypeBulk,

            });
    };
    function BooleanDropDownEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: inThePlan

            });
    };

    function fundingSourceDropDownEditor(container, options) {
        $('<input name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                dataSource: fundingSourceBulk,

            });
    };
    /*Insert/Update business case general Info data*/
    function getBusinessCaseGeneralInfoData() {
        try {
            var sponsorID = '';
            var sponsorName = '';
            var busniessCaseAuthorID = '';
            var busniessCaseAuthorName = '';

            var listdata = [];
            var executionscope;
            var ImpactedProductsList;
            var impObj;
            var exScope;


            if (vm.ExecutionScopeIds != null) {
                exScope = vm.ExecutionScopeIds.join(",");
            }
            if (vm.ImpactedProductIds != null) {
                impObj = vm.ImpactedProductIds.join(",");
            }
            if ($("#ddlSponsor").data("kendoComboBox") != null && $("#ddlSponsor").data("kendoComboBox").selectedIndex != -1) {
                sponsorID = $("#ddlSponsor").data("kendoComboBox").value();
                sponsorName = $("#ddlSponsor").data("kendoComboBox").text();
            }
            if ($("#ddlbusinessCaseAuthor").data("kendoComboBox") != null && $("#ddlbusinessCaseAuthor").data("kendoComboBox").selectedIndex != -1) {
                busniessCaseAuthorID = $("#ddlbusinessCaseAuthor").data("kendoComboBox").value();
                busniessCaseAuthorName = $("#ddlbusinessCaseAuthor").data("kendoComboBox").text();
            }

            var AdditionalAuthors = '';
            //angular.forEach(vm.selectedBC_AdditionalAuthorsContributor, function (item, index) {
            //    AdditionalAuthors = AdditionalAuthors + item.UserADId.toString() + ","
            //});

            var multiselect = $("#ddl_GI_AdditionalAuthorsContributor").data("kendoMultiSelect");
            var alreadySearched = multiselect.value();

            if (alreadySearched != null && alreadySearched.length > 0) {
                angular.forEach(alreadySearched, function (item, index) {
                    AdditionalAuthors = AdditionalAuthors + "," + item
                });
                AdditionalAuthors = AdditionalAuthors.substring(1, AdditionalAuthors.length)
            }
            else {
                AdditionalAuthors = null;
            }

            vm.busninessCaseSelectorData = {
                ProblemUniqueID: vm.SelectedProject.ProjectID,
                ProblemTitle: vm.SelectedProject.ProjectName != null ? vm.SelectedProject.ProjectName : null,
                PrimaryProductID: vm.selectedPrimaryProduct != null ? vm.selectedPrimaryProduct.LookUpMemberID : null,
                OtherImpactedProducts: impObj != null ? impObj : null,
                ExecutionScopeID: exScope != null ? exScope : null,
                ProjectDescription: vm.SelectedProject.ProjectDescription != null ? vm.SelectedProject.ProjectDescription : null,
                PortfolioOwnerID: vm.selectedPortfolioOwner != null ? vm.selectedPortfolioOwner.LookUpMemberID : null,

                // SponserID: vm.selectedBC_Sponsor != null ? vm.selectedBC_Sponsor.UserADId: null,
                SponserID: sponsorID != '' ? sponsorID : null,
                BusinessCaseAuthorID: busniessCaseAuthorID != '' ? busniessCaseAuthorID : null,
                //BusinessCaseAuthorID: vm.selectedBC_BusinessCaseAuthor != null ? vm.selectedBC_BusinessCaseAuthor.UserADId: null,
                AdditionalAuthorsContributorsID: AdditionalAuthors,

                //ProjectClassificationID: vm.selectedProjectClassification != null ? vm.selectedProjectClassification.LookUpMemberID : null,
                ImpactOfDoingNothing: vm.SelectedProject.ImpactOfDoingNothing != null ? vm.SelectedProject.ImpactOfDoingNothing : null,
                StrategicRationale: vm.SelectedProject.StrategicRationale != null ? vm.SelectedProject.StrategicRationale : null,
                ApprovedDate: (vm.SelectedProject.ApprovedDate != null && vm.SelectedProject.ApprovedDate != "") ? vm.SelectedProject.ApprovedDate : null,

            };

            // listdata.push(vm.busninessCaseSelectorData);
            //var finalData = JSON.stringify({
            //    "BusinessCaseGeneralInfoData": listdata
            //});
            return vm.busninessCaseSelectorData
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "getBusinessCaseGeneralInfoData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    };
    function bindChangeDatePicker(elmentId) {
        $("#" + elmentId).on("change", function (e) {
            onDateChange($(this).attr('id'));
        });
    };
    function onDateChange(elementId) {
        var flag = false;
        var value = $("#" + elementId).val();
        if (parseDate(value)) {
            flag = true;
        }
        if (flag) {
            switch (elementId) {
                case 'executionStart':
                    vm.executionStartOpt1DateError = false;
                    break;
                case 'executionEnd':
                    vm.executionEndOpt1DateError = false;
                    break;
                case 'spendDate':
                    vm.ProjectSpendStartOpt1DateError = false;
                    break;
                case 'assetDate':
                    vm.AssetInServiceOpt1DateError = false;
                    break;
                case 'executionStartOpt2':
                    vm.executionStartOpt2DateError = false;
                    break;
                case 'executionEndOpt2':
                    vm.executionEndOpt2DateError = false;
                    break;
                case 'spendDateOpt2':
                    vm.ProjectSpendStartOpt2DateError = false;
                    break;
                case 'assetDateOpt2':
                    vm.AssetInServiceOpt2DateError = false;
                    break;
                case 'executionStartOpt3':
                    vm.executionStartOpt3DateError = false;
                    break;
                case 'executionEndOpt3':
                    vm.executionEndOpt3DateError = false;
                    break;
                case 'spendDateOpt3':
                    vm.ProjectSpendStartOpt3DateError = false;
                    break;
                case 'assetDateOpt3':
                    vm.AssetInServiceOpt3DateError = false;
                    break;
                case 'BC_approvedDate':
                    vm.bcApprovedDateError = false;
                    break;
                case 'realizationDate1':
                    vm.BCRealizationDate1 = false;
                    break;
                case 'realizationDate2':
                    vm.BCRealizationDate2 = false;
                    break;
                case 'realizationDate3':
                    vm.BCRealizationDate2 = false;
                    break;
                default:

            }
            $scope.$digest();
        }
    }
    function InitKendoGridCaps() {
        var dsCaps = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(gridCapsData);
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
                        EMBasisOfEstimate: { type: "string", editable: vm.isEditable  },
                        EMFactorImpact: { hidden: true }
                    }
                }
            }
        });

        $("#gridCapsOpt1").kendoGrid({
            dataSource: dsCaps,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: vm.isEditable,
            edit: function (e) {
                if (vm.businessOptionInfoSelector.NoCarbonImpact == true) {
                    $('#gridCapsOpt1').data("kendoGrid").closeCell();
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
                    editor: editNumberBC,
                    width: "5%",
                    format: "{0:n0}",
                    attributes: { "class": "txt-float-R" },
                    headerAttributes: { "class": "wrap-header align-right" },
                    headerTemplate: '<div>Units<span title="Input gross change in emissions type here in the unit provided using whole numbers. Positive values for increase, negative values for decrease" class="k-icon k-i-question"></span></div>'
                },
                {
                    field: "UnitOfMeasure",
                    title: "UoM",
                    width: "2%",
                },
                {
                    field: "EMBasisOfEstimate",
                    title: "Basis of Estimate",
                    width: "15%",
                }
            ]
        });
    };
    function InitKendoGridCaps2() {
        var dsCaps = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(gridCapsData2);
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
                        EMBasisOfEstimate: { type: "string", editable: vm.isEditable  },
                        EMFactorImpact: { hidden: true }
                    }
                }
            }
        });

        $("#gridCapsOpt2").kendoGrid({
            dataSource: dsCaps,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: vm.isEditable,
            edit: function (e) {
                if (vm.businessOption2InfoSelector.NoCarbonImpact == true) {
                    $('#gridCapsOpt2').data("kendoGrid").closeCell();
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
                    editor: editNumberBC,
                    width: "5%",
                    format: "{0:n0}",
                    attributes: { "class": "txt-float-R" },
                    headerAttributes: { "class": "wrap-header align-right" },
                    headerTemplate: '<div>Units<span title="Input gross change in emissions type here in the unit provided using whole numbers. Positive values for increase, negative values for decrease" class="k-icon k-i-question"></span></div>'

                },
                {
                    field: "UnitOfMeasure",
                    title: "UoM",
                    width: "2%",
                },
                {
                    field: "EMBasisOfEstimate",
                    title: "Basis of Estimate",
                    width: "15%",
                }
            ]
        });
    };
    function InitKendoGridCaps3() {
        var dsCaps = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(gridCapsData3);
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
                        EMBasisOfEstimate: { type: "string", editable: vm.isEditable  },
                        EMFactorImpact: { hidden: true }
                    }
                }
            }
        });

        $("#gridCapsOpt3").kendoGrid({
            dataSource: dsCaps,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: vm.isEditable,
            edit: function (e) {
                if (vm.businessOption3InfoSelector.NoCarbonImpact == true) {
                    $('#gridCapsOpt3').data("kendoGrid").closeCell();
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
                    editor: editNumberBC,
                    width: "5%",
                    format: "{0:n0}",
                    attributes: { "class": "txt-float-R" },
                    headerAttributes: { "class": "wrap-header align-right" },
                    headerTemplate: '<div>Units<span title="Input gross change in emissions type here in the unit provided using whole numbers. Positive values for increase, negative values for decrease" class="k-icon k-i-question"></span></div>'
                },
                {
                    field: "UnitOfMeasure",
                    title: "UoM",
                    width: "2%",
                },
                {
                    field: "EMBasisOfEstimate",
                    title: "Basis of Estimate",
                    width: "15%",
                }
            ]
        });
    };
    /****--------------START: Water and Waste Grid bind--------------***/
    function InitKendoGridCapsWaterWasteOpt1() {
        var dsCapsWaterWaste = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(gridCapsDataWaterWasteOpt1);
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
                        WWStream: { type: "string", editable: vm.isEditable  },
                        EMWWUnit: { type: "number", validation: { maxlength: 10 }, editable: vm.isEditable  },
                        StandardUoM: { type: "string", editable: false },
                        UnitCost: {
                            type: "number", editable: vm.isEditable ,
                        },
                        WWType: { type: "string", editable: vm.isEditable  },
                        Category: { type: "string", editable: vm.isEditable  },
                        EMBasisOfEstimate: { type: "string", editable: vm.isEditable  }
                    }
                }
            }
        });
        $("#gridCapsWaterWasteOpt1").kendoGrid({
            dataSource: dsCapsWaterWaste,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: {
                createAt: "bottom"
            },

            columns: [{
                field: "WWStream",
                title: "Water/Waste",
                headerAttributes: { "class": "wrap-header" },
                width: "15%",
                editor: WaterWasteDropDownEditor,
                values: WaterWasteOptionsOpt,
            }, {
                field: "WWType",
                title: "Type",
                headerAttributes: { "class": "wrap-header" },
                width: "15%",
                editor: WaterWasteTypeDropDownEditor,
                values: WaterWasteTypeOptionsOpt,
            }, {
                field: "Category",
                title: "Category",
                headerAttributes: { "class": "wrap-header" },
                width: "15%",
                editor: WaterWasteCategoryDropDownEditor,
                values: WaterWasteCategoryOptionsOpt,
            }, {
                field: "EMWWUnit",
                title: "Units",
                editor: editNumber,
                width: "10%",
                format: "{0:n0}",
                attributes: { "class": "txt-float-R" },
                headerAttributes: { "class": "wrap-header align-right" },
                headerTemplate: '<div>Units<span title="Input gross change in emissions type here in the unit provided using whole numbers. Positive values for increase, negative values for decrease" class="k-icon k-i-question"></span></div>'
            }, {
                field: "StandardUoM",
                title: "UoM",
                width: "10%",
            }, {
                field: "EMBasisOfEstimate",
                title: "Basis of Estimate",
                width: "20%",
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
                                    deletedWaterWasteOpt1.push({ "EMDataWWID": data.EMDataWWID });

                                var grid = $("#gridCapsWaterWasteOpt1").data("kendoGrid");
                                grid.removeRow(tr);

                                $scope.$digest();
                            }
                        }
                        catch (err) {
                            hideLoading();
                            var dataToSend = {
                                "method": "InitKendoGridCapsWaterWasteOpt1", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
    function InitKendoGridCapsWaterWasteOpt2() {
        var dsCapsWaterWaste = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(gridCapsDataWaterWasteOpt2);
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
                        WWStream: { type: "string", editable: vm.isEditable  },
                        EMWWUnit: { type: "number", validation: { maxlength: 10 }, editable: vm.isEditable  },
                        StandardUoM: { type: "string", editable: false },
                        UnitCost: {
                            type: "number", editable: vm.isEditable ,
                            //validation: { min: 0 } //It is not working as we have editor defined to make the value positive only we have updated the min value in editor
                        },
                        WWType: { type: "string", editable: vm.isEditable  },
                        Category: { type: "string", editable: vm.isEditable  },
                        EMBasisOfEstimate: { type: "string", editable: vm.isEditable  }
                    }
                }
            }
        });
        $("#gridCapsWaterWasteOpt2").kendoGrid({
            dataSource: dsCapsWaterWaste,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: {
                createAt: "bottom"
            },

            columns: [
                            {
                                field: "WWStream",
                                title: "Water/Waste",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteDropDownEditor,
                                values: WaterWasteOptionsOpt,
                            }, {
                                field: "WWType",
                                title: "Type",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteTypeDropDownEditor,
                                values: WaterWasteTypeOptionsOpt,
                            }, {
                                field: "Category",
                                title: "Category",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteCategoryDropDownEditor,
                                values: WaterWasteCategoryOptionsOpt,
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
                                field: "EMBasisOfEstimate",
                                title: "Basis of Estimate",
                                width: "20%",
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
                                                    deletedWaterWasteOpt2.push({ "EMDataWWID": data.EMDataWWID });

                                                var grid = $("#gridCapsWaterWasteOpt2").data("kendoGrid");
                                                grid.removeRow(tr);

                                                $scope.$digest();
                                            }
                                        }
                                        catch (err) {
                                            hideLoading();
                                            var dataToSend = {
                                                "method": "InitKendoGridCapsWaterWasteOpt2", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
    function InitKendoGridCapsWaterWasteOpt3() {
        var dsCapsWaterWaste = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(gridCapsDataWaterWasteOpt3);
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
                        WWStream: { type: "string", editable: vm.isEditable  },
                        EMWWUnit: { type: "number", validation: { maxlength: 10 }, editable: vm.isEditable  },
                        StandardUoM: { type: "string", editable: false },
                        UnitCost: {
                            type: "number", editable: vm.isEditable ,
                            //validation: { min: 0 } //It is not working as we have editor defined to make the value positive only we have updated the min value in editor
                        },
                        WWType: { type: "string", editable: vm.isEditable  },
                        Category: { type: "string", editable: vm.isEditable  },
                        EMBasisOfEstimate: { type: "string", editable: vm.isEditable  }
                    }
                }
            }
        });
        $("#gridCapsWaterWasteOpt3").kendoGrid({
            dataSource: dsCapsWaterWaste,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: {
                createAt: "bottom"
            },

            columns: [{
                                field: "WWStream",
                                title: "Water/Waste",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteDropDownEditor,
                                values: WaterWasteOptionsOpt,
                            }, {
                                field: "WWType",
                                title: "Type",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteTypeDropDownEditor,
                                values: WaterWasteTypeOptionsOpt,
                            }, {
                                field: "Category",
                                title: "Category",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteCategoryDropDownEditor,
                                values: WaterWasteCategoryOptionsOpt,
                            },
                            {
                                field: "EMWWUnit",
                                title: "Units",
                                editor: editNumber,
                                width: "10%",
                                format: "{0:n0}",

                                attributes: { "class": "txt-float-R" },
                                headerAttributes: { "class": "wrap-header align-right" },
                                headerTemplate: '<div>Units<span title="Input gross change in emissions type here in the unit provided using whole numbers. Positive values for increase, negative values for decrease" class="k-icon k-i-question"></span></div>'
                            },
                            {
                                field: "StandardUoM",
                                title: "UoM",
                                width: "10%",
                            }, {
                                field: "EMBasisOfEstimate",
                                title: "Basis of Estimate",
                                width: "20%",
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
                                                    deletedWaterWasteOpt3.push({ "EMDataWWID": data.EMDataWWID });

                                                var grid = $("#gridCapsWaterWasteOpt3").data("kendoGrid");
                                                grid.removeRow(tr);

                                                $scope.$digest();
                                            }
                                        }
                                        catch (err) {
                                            hideLoading();
                                            var dataToSend = {
                                                "method": "InitKendoGridCapsWaterWasteOpt3", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
    function WaterWasteDropDownEditor(container, options) {
        $('<input id="' + options.field + options.model.EMDataWWID + '" name="' + options.field + '"/>') // kendoDropDownList
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                filter: "contains",
                valuePrimitive: true,
                dataSource: WaterWasteOptionsOpt,
                change: function (e) {
                    var grid = e.sender.element.closest(".k-grid").data("kendoGrid");
                    var row = e.sender.element.closest("tr");
                    var dataItem = grid.dataItem(row);
                    var WaterWasteStandardUoM = WaterWasteDataSetOpt.filter(function (entry) {
                        return entry.WWStream == dataItem.WWStream;
                    });
                    dataItem.Category = "";
                    dataItem.WWType = "";
                    dataItem.StandardUoM = WaterWasteStandardUoM[0].StandardUoM;
                    dataItem.dirty = true;
                    grid.refresh();
                    // $('#gridCapsWaterWaste').data('kendoGrid').refresh();
                },
            });
    };
    function WaterWasteTypeDropDownEditor(container, options) {
        var WaterWasteSelect = options.model.WWStream;
        var WaterWasteTypeOptionsAll = WaterWasteDataSetOpt.filter(function (entry) {
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
                    grid.refresh();
                    // $('#gridCapsWaterWaste').data('kendoGrid').refresh();
                },
            });
    };
    function WaterWasteCategoryDropDownEditor(container, options) {
        var WaterWasteSelect = options.model.WWStream;
        var WaterWasteType = options.model.WWType;
        var WaterWasteCategoryOptionsAll = WaterWasteDataSetOpt.filter(function (entry) {
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
                    //$('#gridCapsWaterWaste').data('kendoGrid').refresh();
                },
            });
    };
    /****--------------START: Water and Waste Grid bind--------------***/


    function InitkendoGridTime() {
        var col = col_BusinessCaseOption_gridBusinessCaseOptTimeline();
        var dataSource1 = new kendo.data.DataSource({
            //  data: vm.dsBCScheduleOpt1,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCScheduleOpt1);
                }
            },
            sort: [{ field: "PlannedFinish", dir: "asc" }],
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessScheduleUniqueID",
                    fields: {
                        BusinessScheduleUniqueID: { editable: false, nullable: true },
                        Milestone: { type: "string", editable: vm.isEditable },
                        //  TaskStartDate: { type: "date" },
                        PlannedFinish: { type: "date", defaultValue: null, editable: vm.isEditable },
                        // TaskDuration: { type: "number", validation: { required: true, min: 0 } },
                        FunctionGroupID: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            }
        });
        $("#gridBusinessCaseOptTimeline").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            //  sortable: true,
            navigatable: true,
            editable: { createAt: "bottom" },
            dataBound: function () {
                $(".milestonechkbxOpt1").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseOptTimeline").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });

    };
    function InitkendoGridTimeOption2() {
        var col = [{
            field: "Milestone",
            title: "Milestone",
            //width: "30%"
            //filterable: true,
        }, {
            field: "PlannedFinish",
            title: "Planned Finish (mm/dd/yyyy)",
            template: "#= PlannedFinish ==null ? '' : kendo.toString(kendo.parseDate(new Date(PlannedFinish), 'MM/dd/yyyy'), 'MM/dd/yyyy') #",
            headerAttributes: { "class": "wrap-header" },
            // width: "30%",
            format: "{0:MM/dd/yyyy}",
            //filterable: true,
        }, {
            field: "FunctionGroupID",
            title: "Functional Owner",
            values: functionalOwnerBulk,
            headerAttributes: { "class": "wrap-header" },
            // width: "30%",
            editor: functionalDropDownEditor
            //filterable: true,
        }, {
            field: "BusinessScheduleUniqueID",
            title: "id",
            hidden: true,
        },
        {
            //field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 10)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="milestonechkbxOpt2" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="milestonechkbxOpt2" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="milestonechkbxOpt2" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="milestonechkbxOpt2" />';
                    }
                }
            }

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

                        if (data != undefined) {
                            if (data.BusinessScheduleUniqueID != undefined && data.BusinessScheduleUniqueID != "")
                                vm.deletedMilestoneDataOption2.push({ "BusinessScheduleUniqueID": data.BusinessScheduleUniqueID });
                        }

                        var grid = $("#gridBusinessCaseOpt2Timeline").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        var dataSource1 = new kendo.data.DataSource({
            // data: vm.dsBCScheduleOpt2,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCScheduleOpt2);
                }
            },
            batch: true,
            sort: [{ field: "PlannedFinish", dir: "asc" }],
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessScheduleUniqueID",
                    fields: {
                        BusinessScheduleUniqueID: { editable: false, nullable: true },
                        Milestone: { type: "string", editable: vm.isEditable },
                        //  TaskStartDate: { type: "date" },
                        PlannedFinish: { type: "date", defaultValue: null, editable: vm.isEditable },
                        // TaskDuration: { type: "number", validation: { required: true, min: 0 } },
                        FunctionGroupID: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            }
        });
        $("#gridBusinessCaseOpt2Timeline").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".milestonechkbxOpt2").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseOpt2Timeline").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });

    };

    function InitkendoGridTimeOption3() {
        var col = [{
            field: "Milestone",
            title: "Milestone",
            //width: "30%"
            //filterable: true,
        }, {
            field: "PlannedFinish",
            title: "Planned Finish (mm/dd/yyyy)",
            template: "#= PlannedFinish ==null ? '' : kendo.toString(kendo.parseDate(new Date(PlannedFinish), 'MM/dd/yyyy'), 'MM/dd/yyyy') #",
            headerAttributes: { "class": "wrap-header" },
            //width: "30%",
            format: "{0:MM/dd/yyyy}",
            //filterable: true,
        }, {
            field: "FunctionGroupID",
            title: "Functional Owner",
            values: functionalOwnerBulk,
            headerAttributes: { "class": "wrap-header" },
            //width: "30%",
            editor: functionalDropDownEditor
            //filterable: true,
        }, {
            field: "BusinessScheduleUniqueID",
            title: "id",
            hidden: true,
        },
        {
            // field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 10)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="milestonechkbxOpt3" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="milestonechkbxOpt3" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="milestonechkbxOpt3" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="milestonechkbxOpt3" />';
                    }
                }
            }

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

                        if (data != undefined) {
                            if (data.BusinessScheduleUniqueID != undefined && data.BusinessScheduleUniqueID != "")
                                vm.deletedMilestoneDataOption3.push({ "BusinessScheduleUniqueID": data.BusinessScheduleUniqueID });
                        }

                        var grid = $("#gridBusinessCaseOpt3Timeline").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        var dataSource1 = new kendo.data.DataSource({
            //data: vm.dsBCScheduleOpt3,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCScheduleOpt3);
                }
            },
            batch: true,
            sort: [{ field: "PlannedFinish", dir: "asc" }],
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessScheduleUniqueID",
                    fields: {
                        BusinessScheduleUniqueID: { editable: false, nullable: true },
                        Milestone: { type: "string", editable: vm.isEditable },
                        //  TaskStartDate: { type: "date" },
                        PlannedFinish: { type: "date", defaultValue: null, editable: vm.isEditable },
                        // TaskDuration: { type: "number", validation: { required: true, min: 0 } },
                        FunctionGroupID: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            }
        });
        $("#gridBusinessCaseOpt3Timeline").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".milestonechkbxOpt3").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseOpt3Timeline").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });

    };
    function InitkGridBusinessCaseOptKeySuccessCriteria() {
        var col = [{
            field: "Metric",
            title: "Metric",
            //width: "30%"
        }, {
            field: "CurrentState",
            title: "Baseline",
            //width: "30%"
        }, {
            field: "TargetPerformance",
            title: "Target Performance",
            //width: "30%"
        }, {
            field: "BusinessKeySuccessUniqueID",
            title: "id",
            hidden: true,
        },
        {
            //field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 3)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="successchkbxOpt1" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="successchkbxOpt1" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="successchkbxOpt1" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="successchkbxOpt1" />';
                    }
                }
            }

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
                        if (data != undefined) {
                            if (data.BusinessKeySuccessUniqueID != undefined && data.BusinessKeySuccessUniqueID != "")
                                vm.deletedKeySuccessData.push({ "BusinessKeySuccessUniqueID": data.BusinessKeySuccessUniqueID });
                        }

                        var grid = $("#gridBusinessCaseOptKeySuccessCriteria").data("kendoGrid");
                        grid.removeRow(tr);

                        $scope.$digest();
                    }
                }
            }]
        }];
        var dataSource1 = new kendo.data.DataSource({
            //data: vm.dsBCKeySuccessOpt1,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCKeySuccessOpt1);
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessKeySuccessUniqueID",
                    fields: {
                        BusinessKeySuccessUniqueID: { editable: false, nullable: true },
                        Metric: {
                            type: "string", editable: vm.isEditable
                            //validation: { required: true }
                        },
                        CurrentState: { type: "string", editable: vm.isEditable },
                        TargetPerformance: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            },
        });
        $("#gridBusinessCaseOptKeySuccessCriteria").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".successchkbxOpt1").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseOptKeySuccessCriteria").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });
    };
    function InitkGridBusinessCaseOptKeySuccessCriteriaOption2() {
        var col = [{
            field: "Metric",
            title: "Metric",
            //width: "30%"
        }, {
            field: "CurrentState",
            title: "Baseline",
            //width: "30%"
        }, {
            field: "TargetPerformance",
            title: "Target Performance",
            //width: "30%"
        }, {
            field: "BusinessKeySuccessUniqueID",
            title: "id",
            hidden: true,
        },
        {
            //field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 3)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="successchkbxOpt2" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="successchkbxOpt2" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="successchkbxOpt2" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="successchkbxOpt2" />';
                    }
                }
            }

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
                        if (data != undefined) {
                            if (data.BusinessKeySuccessUniqueID != undefined && data.BusinessKeySuccessUniqueID != "")
                                vm.deletedKeySuccessDataOption2.push({ "BusinessKeySuccessUniqueID": data.BusinessKeySuccessUniqueID });
                        }

                        var grid = $("#gridBusinessCaseOptKeySuccessCriteriaOption2").data("kendoGrid");
                        grid.removeRow(tr);

                        $scope.$digest();
                    }
                }
            }]
        }];
        var dataSource1 = new kendo.data.DataSource({
            //data: vm.dsBCKeySuccessOpt2,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCKeySuccessOpt2);
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessKeySuccessUniqueID",
                    fields: {
                        BusinessKeySuccessUniqueID: { editable: false, nullable: true },
                        Metric: {
                            type: "string", editable: vm.isEditable
                            //validation: { required: true }
                        },
                        CurrentState: { type: "string", editable: vm.isEditable },
                        TargetPerformance: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            },
        });

        $("#gridBusinessCaseOptKeySuccessCriteriaOption2").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".successchkbxOpt2").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseOptKeySuccessCriteriaOption2").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });

    };
    function InitkGridBusinessCaseOptKeySuccessCriteriaOption3() {
        var col = [{
            field: "Metric",
            title: "Metric",
            //width: "30%"
        }, {
            field: "CurrentState",
            title: "Baseline",
            //width: "30%"
        }, {
            field: "TargetPerformance",
            title: "Target Performance",
            //width: "30%"
        }, {
            field: "BusinessKeySuccessUniqueID",
            title: "id",
            hidden: true,
        },
        {
            // field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 3)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="successchkbxOpt3" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="successchkbxOpt3" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="successchkbxOpt3" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="successchkbxOpt3" />';
                    }
                }
            }

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
                        if (data != undefined) {
                            if (data.BusinessKeySuccessUniqueID != undefined && data.BusinessKeySuccessUniqueID != "")
                                vm.deletedKeySuccessDataOption3.push({ "BusinessKeySuccessUniqueID": data.BusinessKeySuccessUniqueID });
                        }

                        var grid = $("#gridBusinessCaseOptKeySuccessCriteriaOption3").data("kendoGrid");
                        grid.removeRow(tr);

                        $scope.$digest();
                    }
                }
            }]
        }];
        var dataSource1 = new kendo.data.DataSource({
            //data: vm.dsBCKeySuccessOpt3,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCKeySuccessOpt3);
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessKeySuccessUniqueID",
                    fields: {
                        BusinessKeySuccessUniqueID: { editable: false, nullable: true },
                        Metric: {
                            type: "string", editable: vm.isEditable
                            //validation: { required: true }
                        },
                        CurrentState: { type: "string", editable: vm.isEditable },
                        TargetPerformance: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            },
        });
        $("#gridBusinessCaseOptKeySuccessCriteriaOption3").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".successchkbxOpt3").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseOptKeySuccessCriteriaOption3").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });

    };
    function InitkGridBusinessCaseOpRisk() {
        var colAssump = [{
            field: "KeyAssumption",
            title: "Key Assumption",
            //width: "45%",
        }, {
            field: "AssumptionRationale",
            title: "Why Is This Assumption Valid?",
            //width: "45%",
        }, {
            field: "BusinessKeyAssumptionUniqueID",
            title: "id",
            hidden: true,
        },
        {
            //field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 4)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="keyAssumptionchkbxOpt1" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="keyAssumptionchkbxOpt1" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="keyAssumptionchkbxOpt1" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="keyAssumptionchkbxOpt1" />';
                    }
                }
            }

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
                        if (data != undefined) {
                            if (data.BusinessKeyAssumptionUniqueID != undefined && data.BusinessKeyAssumptionUniqueID != "")
                                vm.deletedAssumptionData.push({ "BusinessKeyAssumptionUniqueID": data.BusinessKeyAssumptionUniqueID });
                        }


                        var grid = $("#gridBusinessCaseOptAssumption").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        var dataSourceAssumption = new kendo.data.DataSource({
            //data: vm.dsBCKeyAssumptionOpt1,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCKeyAssumptionOpt1);
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessKeyAssumptionUniqueID",
                    fields: {
                        BusinessKeyAssumptionUniqueID: { editable: false, nullable: true },
                        KeyAssumption: { type: "string", editable: vm.isEditable },
                        AssumptionRationale: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            }
        });
        $("#gridBusinessCaseOptAssumption").kendoGrid({
            dataSource: dataSourceAssumption,
            columns: colAssump,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".keyAssumptionchkbxOpt1").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseOptAssumption").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });


        var colRisk = [{
            field: "IfHappens",
            title: "If This Happens",
            width: "20%",
        }, {
            field: "ProbabilityID",
            title: "Probability",
            editor: likelihoodDropDownEditor,
            values: likelihoodBulk,
            width: "10%",
            //  template: "#=Likelihood#"
        }, {
            field: "RiskIssueResult",
            title: "This Is The Result",
            headerAttributes: { "class": "wrap-header" },
            width: "20%",
        }, {
            field: "ImpactID",
            title: "Impact",
            values: riskIssueImpactBulk,
            width: "10%",
            editor: impactDropDownEditor
        }, {
            field: "Mitigation",
            title: "Details / Mitigation",
            headerAttributes: { "class": "wrap-header" },
            width: "10%",
            //filterable: true,<span class="k-icon k-i-edit"></span>
        }, {
            field: "FunctionGroupID",
            title: "Owner",
            values: functionalOwnerBulk,
            width: "10%",
            editor: functionalDropDownEditor
            //filterable: true,
        }, {
            field: "RiskIssueTypeID",
            title: "Type",
            width: "10%",
            values: riskIssueTypeBulk,
            editor: riskTypeDropDownEditor

        }, {
            field: "BusinessRiskIssueUniqueID",
            title: "id",
            hidden: true,
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

                        if (data != undefined) {
                            if (data.BusinessRiskIssueUniqueID != undefined && data.BusinessRiskIssueUniqueID != "")
                                vm.deletedRiskData.push({ "BusinessRiskIssueUniqueID": data.BusinessRiskIssueUniqueID });
                        }


                        var grid = $("#gridBusinessCaseOptRisk").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        var dsRisk = new kendo.data.DataSource({
            // data: vm.dsBCRiskIssueOpt1,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCRiskIssueOpt1);
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: 'BusinessRiskIssueUniqueID',
                    fields: {
                        BusinessRiskIssueUniqueID: { editable: false, hidden: true },
                        IfHappens: { type: "string", editable: vm.isEditable },
                        ProbabilityID: { type: "string", editable: vm.isEditable },
                        RiskIssueResult: { type: "string", editable: vm.isEditable },
                        ImpactID: {
                            type: "string", editable: vm.isEditable
                        },
                        Mitigation: { type: "string", editable: vm.isEditable },
                        RiskIssueTypeID: { editable: vm.isEditable },
                        FunctionGroupID: { type: "string", editable: vm.isEditable },
                        //  CloseDate: { type: "date", format: "{0:yyyy/MM/dd}" },
                    }
                }
            }
        });

        $("#gridBusinessCaseOptRisk").kendoGrid({
            dataSource: dsRisk,
            selectable: true,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            columns: colRisk
        });
    };
    function InitkGridBusinessCaseOpRiskOption2() {
        var colAssump = [{
            field: "KeyAssumption",
            title: "Key Assumption",
            //width: "45%",
        }, {
            field: "AssumptionRationale",
            title: "Why Is This Assumption Valid?",
            //width: "45%",
        }, {
            field: "BusinessKeyAssumptionUniqueID",
            title: "id",
            hidden: true,
        },
        {
            //field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 4)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="keyAssumptionchkbxOpt2" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="keyAssumptionchkbxOpt2" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="keyAssumptionchkbxOpt2" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="keyAssumptionchkbxOpt2" />';
                    }
                }
            }

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
                        if (data != undefined) {
                            if (data.BusinessKeyAssumptionUniqueID != undefined && data.BusinessKeyAssumptionUniqueID != "")
                                vm.deletedAssumptionDataOption2.push({ "BusinessKeyAssumptionUniqueID": data.BusinessKeyAssumptionUniqueID });
                        }


                        var grid = $("#gridBusinessCaseOptAssumptionOption2").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        var dataSourceAssumption = new kendo.data.DataSource({
            //data: vm.dsBCKeyAssumptionOpt2,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCKeyAssumptionOpt2);
                }
            },
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "BusinessKeyAssumptionUniqueID",
                    fields: {
                        BusinessKeyAssumptionUniqueID: { editable: false, nullable: true },
                        KeyAssumption: { type: "string", editable: vm.isEditable },
                        AssumptionRationale: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            }
        });
        $("#gridBusinessCaseOptAssumptionOption2").kendoGrid({
            dataSource: dataSourceAssumption,
            columns: colAssump,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".keyAssumptionchkbxOpt2").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseOptAssumptionOption2").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });


        var colRisk = [{
            field: "IfHappens",
            title: "If This Happens",
            width: "20%",
        }, {
            field: "ProbabilityID",
            title: "Probability",
            editor: likelihoodDropDownEditor,
            values: likelihoodBulk,
            width: "10%",
            //  template: "#=Likelihood#"
        }, {
            field: "RiskIssueResult",
            title: "This Is The Result",
            headerAttributes: { "class": "wrap-header" },
            width: "20%",
        }, {
            field: "ImpactID",
            title: "Impact",
            values: riskIssueImpactBulk,
            width: "10%",
            editor: impactDropDownEditor
        }, {
            field: "Mitigation",
            title: "Details / Mitigation",
            headerAttributes: { "class": "wrap-header" },
            width: "10%",
            //filterable: true,<span class="k-icon k-i-edit"></span>
        }, {
            field: "FunctionGroupID",
            title: "Owner",
            values: functionalOwnerBulk,
            width: "10%",
            editor: functionalDropDownEditor
            //filterable: true,
        }, {
            field: "RiskIssueTypeID",
            title: "Type",
            width: "10%",
            values: riskIssueTypeBulk,
            editor: riskTypeDropDownEditor
        }, {
            field: "BusinessRiskIssueUniqueID",
            title: "id",
            hidden: true,
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

                        if (data != undefined) {
                            if (data.BusinessRiskIssueUniqueID != undefined && data.BusinessRiskIssueUniqueID != "")
                                vm.deletedRiskDataOption2.push({ "BusinessRiskIssueUniqueID": data.BusinessRiskIssueUniqueID });
                        }


                        var grid = $("#gridBusinessCaseOptRiskOption2").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        var dsRisk = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCRiskIssueOpt2);
                }
            },
            // data: vm.dsBCRiskIssueOpt2,
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: 'BusinessRiskIssueUniqueID',
                    fields: {
                        BusinessRiskIssueUniqueID: { editable: false, hidden: true },
                        IfHappens: { type: "string", editable: vm.isEditable },
                        ProbabilityID: { type: "string", editable: vm.isEditable },
                        RiskIssueResult: { type: "string", editable: vm.isEditable },
                        ImpactID: {
                            type: "string", editable: vm.isEditable
                        },
                        Mitigation: { type: "string", editable: vm.isEditable },
                        RiskIssueTypeID: { editable: vm.isEditable },
                        FunctionGroupID: { type: "string", editable: vm.isEditable },
                        //  CloseDate: { type: "date", format: "{0:yyyy/MM/dd}" },
                    }
                }
            }
        });

        $("#gridBusinessCaseOptRiskOption2").kendoGrid({
            dataSource: dsRisk,
            selectable: true,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            columns: colRisk
        });
    };
    function InitkGridBusinessCaseOpRiskOption3() {
        var colAssump = [{
            field: "KeyAssumption",
            title: "Key Assumption",
            //width: "45%",
        }, {
            field: "AssumptionRationale",
            title: "Why Is This Assumption Valid?",
            //width: "45%",
        }, {
            field: "BusinessKeyAssumptionUniqueID",
            title: "id",
            hidden: true,
        },
        {
            //field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 4)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="keyAssumptionchkbxOpt3" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="keyAssumptionchkbxOpt3" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="keyAssumptionchkbxOpt3" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="keyAssumptionchkbxOpt3" />';
                    }
                }
            }

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
                        if (data != undefined) {
                            if (data.BusinessKeyAssumptionUniqueID != undefined && data.BusinessKeyAssumptionUniqueID != "")
                                vm.deletedAssumptionDataOption3.push({ "BusinessKeyAssumptionUniqueID": data.BusinessKeyAssumptionUniqueID });
                        }


                        var grid = $("#gridBusinessCaseOptAssumptionOption3").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        var dataSourceAssumption = new kendo.data.DataSource({
            // data: vm.dsBCKeyAssumptionOpt3,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCKeyAssumptionOpt3);
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessKeyAssumptionUniqueID",
                    fields: {
                        BusinessKeyAssumptionUniqueID: { editable: false, nullable: true },
                        KeyAssumption: { type: "string", editable: vm.isEditable },
                        AssumptionRationale: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            }
        });
        $("#gridBusinessCaseOptAssumptionOption3").kendoGrid({
            dataSource: dataSourceAssumption,
            columns: colAssump,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".keyAssumptionchkbxOpt3").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseOptAssumptionOption3").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });


        var colRisk = [{
            field: "IfHappens",
            title: "If This Happens",
            width: "20%",
        }, {
            field: "ProbabilityID",
            title: "Probability",
            editor: likelihoodDropDownEditor,
            values: likelihoodBulk,
            width: "10%",
            //  template: "#=Likelihood#"
        }, {
            field: "RiskIssueResult",
            title: "This Is The Result",
            headerAttributes: { "class": "wrap-header" },
            width: "20%",
        }, {
            field: "ImpactID",
            title: "Impact",
            values: riskIssueImpactBulk,
            width: "10%",
            editor: impactDropDownEditor
        }, {
            field: "Mitigation",
            title: "Details / Mitigation",
            headerAttributes: { "class": "wrap-header" },
            width: "10%",
            //filterable: true,<span class="k-icon k-i-edit"></span>
        }, {
            field: "FunctionGroupID",
            title: "Owner",
            values: functionalOwnerBulk,
            width: "10%",
            editor: functionalDropDownEditor
            //filterable: true,
        }, {
            field: "RiskIssueTypeID",
            title: "Type",
            width: "10%",
            values: riskIssueTypeBulk,
            editor: riskTypeDropDownEditor
        }, {
            field: "BusinessRiskIssueUniqueID",
            title: "id",
            hidden: true,
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

                        if (data != undefined) {
                            if (data.BusinessRiskIssueUniqueID != undefined && data.BusinessRiskIssueUniqueID != "")
                                vm.deletedRiskDataOption3.push({ "BusinessRiskIssueUniqueID": data.BusinessRiskIssueUniqueID });
                        }


                        var grid = $("#gridBusinessCaseOptRiskOption3").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        var dsRisk = new kendo.data.DataSource({
            //data: vm.dsBCRiskIssueOpt3,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCRiskIssueOpt3);
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: 'BusinessRiskIssueUniqueID',
                    fields: {
                        BusinessRiskIssueUniqueID: { editable: false, hidden: true },
                        IfHappens: { type: "string", editable: vm.isEditable },
                        ProbabilityID: { type: "string", editable: vm.isEditable },
                        RiskIssueResult: { type: "string", editable: vm.isEditable },
                        ImpactID: { type: "string", editable: vm.isEditable },
                        Mitigation: { type: "string", editable: vm.isEditable },
                        RiskIssueTypeID: { editable: vm.isEditable },
                        FunctionGroupID: { type: "string", editable: vm.isEditable },
                        //  CloseDate: { type: "date", format: "{0:yyyy/MM/dd}" },
                    }
                }
            }
        });

        $("#gridBusinessCaseOptRiskOption3").kendoGrid({
            dataSource: dsRisk,
            selectable: true,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            columns: colRisk
        });

    };
    function InitkGridBusinessCaseFunding() {
        var col = col_BusinessCaseOption_gridBusinessCaseFunding();
        var dataSource1 = new kendo.data.DataSource({
            //data: vm.dsBCBudgetFundingOpt1,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCBudgetFundingOpt1);
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessFundingUniqueID",
                    fields: {
                        BusinessFundingUniqueID: { editable: false, nullable: true },
                        FundingTypeID: {
                            type: "string", editable: vm.isEditable
                        },
                        //  TaskStartDate: { type: "date" },
                        FundingSourceID: { type: "string", editable: vm.isEditable },
                        // TaskDuration: { type: "number", validation: { required: true, min: 0 } },
                        FundingIntheplan: { type: "boolean", editable: vm.isEditable },
                        FundingAmount: { type: "number", validation: { min: 0, maxlength: 12 }, editable: vm.isEditable },
                        FundingNotes: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            }
        });
        $("#gridBusinessCaseFunding").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".funcdingchkbxOpt1").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseFunding").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });

    };
    function InitkGridBusinessCaseFundingOption2() {
        var col = [{
            field: "FundingTypeID",
            title: "Funding Type",
            values: fundingTypeBulk,
            headerAttributes: { "class": "wrap-header" },
            //width: "15%",
            editor: fundingDropDownEditor,
        }, {
            field: "FundingSourceID",
            title: "Funding Source",
            values: fundingSourceBulk,
            headerAttributes: { "class": "wrap-header" },
            //width: "15%",
            editor: fundingSourceDropDownEditor,
        }, {
            field: "FundingIntheplan",
            title: "In the Plan",
            values: inThePlan,
            headerAttributes: { "class": "wrap-header" },
            //width: "15%"
            //values: dsBool
            editor: BooleanDropDownEditor,
        }, {
            field: "FundingAmount",
            title: "Amount " + vm.localCurrencyAbbre,
            width: "15%",
            format: "{0:n0}",
            decimals: 0,
            min: 0,
            restrictDecimals: true,
            attributes: { class: "txt-float-R" },
            headerAttributes: { "class": "wrap-header align-right" },
        }, {
            field: "FundingNotes",
            title: "Notes",
            //width: "30%"
        }, {
            field: "BusinessFundingUniqueID",
            title: "id",
            hidden: true,
        },
        {
            //field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 2)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="funcdingchkbxOpt2" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="funcdingchkbxOpt2" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="funcdingchkbxOpt2" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="funcdingchkbxOpt2" />';
                    }
                }
            }

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

                        if (data.BusinessFundingUniqueID != undefined)
                            vm.deletedFundingDataOption2.push({ "BusinessFundingUniqueID": data.BusinessFundingUniqueID });


                        var grid = $("#gridBusinessCaseFundingOption2").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        var dataSource1 = new kendo.data.DataSource({
            //data: vm.dsBCBudgetFundingOpt2,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCBudgetFundingOpt2);
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessFundingUniqueID",
                    fields: {
                        BusinessFundingUniqueID: { editable: false, nullable: true },
                        FundingTypeID: {
                            type: "string", editable: vm.isEditable
                        },
                        //  TaskStartDate: { type: "date" },
                        FundingSourceID: { type: "string", editable: vm.isEditable },
                        // TaskDuration: { type: "number", validation: { required: true, min: 0 } },
                        FundingIntheplan: { type: "boolean", editable: vm.isEditable },
                        FundingAmount: {
                            type: "number", validation: { min: 0, maxlength: 12 }, editable: vm.isEditable
                        },
                        FundingNotes: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            }
        });
        $("#gridBusinessCaseFundingOption2").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".funcdingchkbxOpt2").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseFundingOption2").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });

    };
    function InitkGridBusinessCaseFundingOption3() {
        var col = [{
            field: "FundingTypeID",
            title: "Funding Type",
            values: fundingTypeBulk,
            headerAttributes: { "class": "wrap-header" },
            //width: "15%",
            editor: fundingDropDownEditor,
        }, {
            field: "FundingSourceID",
            title: "Funding Source",
            values: fundingSourceBulk,
            headerAttributes: { "class": "wrap-header" },
            //width: "15%",
            editor: fundingSourceDropDownEditor,
        }, {
            field: "FundingIntheplan",
            title: "In the Plan",
            values: inThePlan,
            headerAttributes: { "class": "wrap-header" },
            //width: "15%"
            //values: dsBool
            editor: BooleanDropDownEditor,
        }, {
            field: "FundingAmount",
            title: "Amount " + vm.localCurrencyAbbre,
            //width: "15%",
            format: "{0:n0}",
            decimals: 0,
            min: 0,
            restrictDecimals: true,
            attributes: { class: "txt-float-R" },
            headerAttributes: { "class": "wrap-header align-right" },
        }, {
            field: "FundingNotes",
            title: "Notes",
            // width: "30%"
        }, {
            field: "BusinessFundingUniqueID",
            title: "id",
            hidden: true,
        },
        {
            // field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 2)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="funcdingchkbxOpt3" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="funcdingchkbxOpt3" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="funcdingchkbxOpt3" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="funcdingchkbxOpt3" />';
                    }
                }
            }

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

                        if (data.BusinessFundingUniqueID != undefined)
                            vm.deletedFundingDataOption3.push({ "BusinessFundingUniqueID": data.BusinessFundingUniqueID });


                        var grid = $("#gridBusinessCaseFundingOption3").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        var dataSource1 = new kendo.data.DataSource({
            //data: vm.dsBCBudgetFundingOpt3,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsBCBudgetFundingOpt3);
                }
            },
            batch: true,
            //pageSize: 20,
            schema: {
                model: {
                    id: "BusinessFundingUniqueID",
                    fields: {
                        BusinessFundingUniqueID: { editable: false, nullable: true },
                        FundingTypeID: {
                            type: "string", editable: vm.isEditable
                        },
                        //  TaskStartDate: { type: "date" },
                        FundingSourceID: { type: "string", editable: vm.isEditable },
                        // TaskDuration: { type: "number", validation: { required: true, min: 0 } },
                        FundingIntheplan: { type: "boolean", editable: vm.isEditable },
                        FundingAmount: { type: "number", validation: { min: 0, maxlength: 12 }, editable: vm.isEditable },
                        FundingNotes: { type: "string", editable: vm.isEditable },
                        IncludeInBusinessCase: { type: "boolean", editable: vm.isEditable }
                    }
                }
            }
        });
        $("#gridBusinessCaseFundingOption3").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            navigatable: true,
            editable: {
                createAt: "bottom"
            },
            dataBound: function () {
                $(".funcdingchkbxOpt3").bind("change", function (e) {
                    var grid = $("#gridBusinessCaseFundingOption3").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    var cell = e.target.closest('td');
                    $(cell).prepend("<span class='k-dirty'></span>");

                    dataItem.set("IncludeInBusinessCase", this.checked);
                    //dataItem.dirty = true;
                });
            }
        });

    };
    function col_BusinessCaseOption_gridBusinessCaseFunding() {
        var col = [{
            field: "FundingTypeID",
            title: "Funding Type",
            values: fundingTypeBulk,
            headerAttributes: { "class": "wrap-header" },
            //width: "15%",
            editor: fundingDropDownEditor,
        }, {
            field: "FundingSourceID",
            title: "Funding Source",
            values: fundingSourceBulk,
            headerAttributes: { "class": "wrap-header" },
            //width: "15%",
            editor: fundingSourceDropDownEditor,
        }, {
            field: "FundingIntheplan",
            title: "In the Plan",
            //values: fundingSourceBulk,
            values: inThePlan,
            headerAttributes: { "class": "wrap-header" },
            editor: BooleanDropDownEditor,
        }, {
            field: "FundingAmount",
            title: "Amount " + vm.localCurrencyAbbre,
            //width: "15%",
            format: "{0:n0}",
            decimals: 0,
            min: 0,
            restrictDecimals: true,
            attributes: { class: "txt-float-R" },
            headerAttributes: { "class": "wrap-header align-right" },
        }, {
            field: "FundingNotes",
            title: "Notes",
            //width: "30%"
        }, {
            field: "BusinessFundingUniqueID",
            title: "id",
            hidden: true,
        },
        {
            // field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 2)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInBusinessCase') + '<input disabled="disabled" checked type="checkbox" class="funcdingchkbxOpt1" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInBusinessCase') + '<input disabled="disabled" type="checkbox" class="funcdingchkbxOpt1" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInBusinessCase') + '<input type="checkbox" checked class="funcdingchkbxOpt1" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInBusinessCase') + '<input type="checkbox" class="funcdingchkbxOpt1" />';
                    }
                }
            }

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

                        if (data.BusinessFundingUniqueID != undefined)
                            vm.deletedFundingData.push({ "BusinessFundingUniqueID": data.BusinessFundingUniqueID });


                        var grid = $("#gridBusinessCaseFunding").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        return col;
    };

    function col_BusinessCaseOption_gridBusinessCaseOptTimeline() {
        var col = [{
            field: "Milestone",
            title: "Milestone",
            //width: "30%"
            //filterable: true,
        }, {
            field: "PlannedFinish",
            title: "Planned Finish (mm/dd/yyyy)",
            template: "#= PlannedFinish ==null ? '' : kendo.toString(kendo.parseDate(new Date(PlannedFinish), 'MM/dd/yyyy'), 'MM/dd/yyyy') #",
            headerAttributes: { "class": "wrap-header" },
            //width: "30%",
            format: "{0:MM/dd/yyyy}",
            //filterable: true,
        }, {
            field: "FunctionGroupID",
            title: "Functional Owner",
            values: functionalOwnerBulk,
            headerAttributes: { "class": "wrap-header" },
            //width: "30%",
            editor: functionalDropDownEditor
            //filterable: true,
        }, {
            field: "BusinessScheduleUniqueID",
            title: "id",
            hidden: true,
        },
        {
            //field: "IncludeInBusinessCase",
            title: "Include in Business Case (Max 10)",
            headerAttributes: { "class": "wrap-header" },
            template: function (e) {
                if (vm.isEditable == false) {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" checked type="checkbox" class="milestonechkbxOpt1" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input disabled="disabled" type="checkbox" class="milestonechkbxOpt1" />';
                    }
                }
                else {
                    if (e.IncludeInBusinessCase == true) {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" checked class="milestonechkbxOpt1" />';
                    }
                    else {
                        return dirtyField(e, 'IncludeInCharter') + '<input type="checkbox" class="milestonechkbxOpt1" />';
                    }
                }
            }

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

                        if (data != undefined) {
                            if (data.BusinessScheduleUniqueID != undefined && data.BusinessScheduleUniqueID != "")
                                vm.deletedMilestoneData.push({ "BusinessScheduleUniqueID": data.BusinessScheduleUniqueID });
                        }

                        var grid = $("#gridBusinessCaseOptTimeline").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        return col;
    }
    function validateBaseHighCase() {
        if (vm.businessOptionInfoSelector.DurationBaseCase != null && vm.businessOptionInfoSelector.DurationHighCase != null
            && vm.businessOptionInfoSelector.DurationBaseCase != "" && vm.businessOptionInfoSelector.DurationHighCase != "" &&
            (parseFloat(vm.businessOptionInfoSelector.DurationBaseCase) > parseFloat(vm.businessOptionInfoSelector.DurationHighCase))) {
            return false;
        }
        else if (vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredBaseCase != null && vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredHighCase != null
            && vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredBaseCase != "" && vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredHighCase != "" &&
            vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredBaseCase > vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredHighCase) {
            return false;
        }
        else if (vm.businessOptionInfoSelector.TotalCapexBaseCase != null && vm.businessOptionInfoSelector.TotalCapexHighCase != null
            && vm.businessOptionInfoSelector.TotalCapexBaseCase != "" && vm.businessOptionInfoSelector.TotalCapexHighCase != "" &&
            vm.businessOptionInfoSelector.TotalCapexBaseCase > vm.businessOptionInfoSelector.TotalCapexHighCase) {
            return false;
        }
        else if (vm.businessOptionInfoSelector.TotalNonFTEBaseCase != null && vm.businessOptionInfoSelector.TotalNonFTEHighCase != null
            && vm.businessOptionInfoSelector.TotalNonFTEBaseCase != "" && vm.businessOptionInfoSelector.TotalNonFTEHighCase != "" &&
            vm.businessOptionInfoSelector.TotalNonFTEBaseCase > vm.businessOptionInfoSelector.TotalNonFTEHighCase) {
            return false;
        }
        else if (vm.businessOptionInfoSelector.NPVBaseCase != null && vm.businessOptionInfoSelector.NPVHighCase != null
            && vm.businessOptionInfoSelector.NPVBaseCase != "" && vm.businessOptionInfoSelector.NPVHighCase != "" &&
            parseFloat(vm.businessOptionInfoSelector.NPVBaseCase) > parseFloat(vm.businessOptionInfoSelector.NPVHighCase)) { return false; }
        else if (vm.businessOption2InfoSelector.DurationBaseCase != null && vm.businessOption2InfoSelector.DurationHighCase != null
            && vm.businessOption2InfoSelector.DurationBaseCase != "" && vm.businessOption2InfoSelector.DurationHighCase != "" &&
            parseFloat(vm.businessOption2InfoSelector.DurationBaseCase) > parseFloat(vm.businessOption2InfoSelector.DurationHighCase)) {
            return false;
        }
        else if (vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredBaseCase != null && vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredHighCase != null
            && vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredBaseCase != "" && vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredHighCase != "" &&
            vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredBaseCase > vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredHighCase) {
            return false;
        }
        else if (vm.businessOptionInfoSelector.TotalCapexBaseCase != null && vm.businessOption2InfoSelector.TotalCapexHighCase != null
            && vm.businessOption2InfoSelector.TotalCapexBaseCase != "" && vm.businessOption2InfoSelector.TotalCapexHighCase != "" &&
            vm.businessOption2InfoSelector.TotalCapexBaseCase > vm.businessOption2InfoSelector.TotalCapexHighCase) {
            return false;
        }
        else if (vm.businessOption2InfoSelector.TotalNonFTEBaseCase != null && vm.businessOption2InfoSelector.TotalNonFTEHighCase != null
            && vm.businessOption2InfoSelector.TotalNonFTEBaseCase != "" && vm.businessOption2InfoSelector.TotalNonFTEHighCase != "" &&
            vm.businessOption2InfoSelector.TotalNonFTEBaseCase > vm.businessOption2InfoSelector.TotalNonFTEHighCase) {
            return false;
        }
        else if (vm.businessOption2InfoSelector.NPVBaseCase != null && vm.businessOption2InfoSelector.NPVHighCase != null
            && vm.businessOption2InfoSelector.NPVBaseCase != "" && vm.businessOption2InfoSelector.NPVHighCase != "" &&
            vm.businessOption2InfoSelector.NPVBaseCase > vm.businessOption2InfoSelector.NPVHighCase) { return false; }
        else if (vm.businessOption3InfoSelector.DurationBaseCase != null && vm.businessOption3InfoSelector.DurationHighCase != null
            && vm.businessOption3InfoSelector.DurationBaseCase != "" && vm.businessOption3InfoSelector.DurationHighCase != "" &&
            vm.businessOption3InfoSelector.DurationBaseCase > vm.businessOption3InfoSelector.DurationHighCase) {
            return false;
        }
        else if (vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredBaseCase != null && vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredHighCase != null
            && vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredBaseCase != "" && vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredHighCase != "" &&
            vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredBaseCase > vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredHighCase) {
            return false;
        }
        else if (vm.businessOption3InfoSelector.TotalCapexBaseCase != null && vm.businessOption3InfoSelector.TotalCapexHighCase != null
            && vm.businessOption3InfoSelector.TotalCapexBaseCase != "" && vm.businessOption3InfoSelector.TotalCapexHighCase != "" &&
            vm.businessOption3InfoSelector.TotalCapexBaseCase > vm.businessOption3InfoSelector.TotalCapexHighCase) {
            return false;
        }
        else if (vm.businessOption3InfoSelector.TotalNonFTEBaseCase != null && vm.businessOption3InfoSelector.TotalNonFTEHighCase != null
            && vm.businessOption3InfoSelector.TotalNonFTEBaseCase != "" && vm.businessOption3InfoSelector.TotalNonFTEHighCase != "" &&
            vm.businessOption3InfoSelector.TotalNonFTEBaseCase > vm.businessOption3InfoSelector.TotalNonFTEHighCase) {
            return false;
        } else if (vm.businessOption3InfoSelector.NPVBaseCase != null && vm.businessOption3InfoSelector.NPVHighCase != null
            && vm.businessOption3InfoSelector.NPVBaseCase != "" && vm.businessOption3InfoSelector.NPVHighCase != "" &&
            vm.businessOption3InfoSelector.NPVBaseCase > vm.businessOption3InfoSelector.NPVHighCase) { return false; }
    }
    function IncludeInBusinessCaseCountValidation() {
        //Milestone
        var MilestoneLengthOpt1 = $("#gridBusinessCaseOptTimeline").data("kendoGrid").tbody.find("input:checked").length;
        if (MilestoneLengthOpt1 > milestoneBusinessCount) {
            alert(timelineCountMessageOpt1);
            hideLoading();
            return false;
        }
        var MilestoneLengthOpt2 = $("#gridBusinessCaseOpt2Timeline").data("kendoGrid").tbody.find("input:checked").length;
        if (MilestoneLengthOpt2 > milestoneBusinessCount) {
            alert(timelineCountMessageOpt2);
            hideLoading();
            return false;
        }
        var MilestoneLengthOpt3 = $("#gridBusinessCaseOpt3Timeline").data("kendoGrid").tbody.find("input:checked").length;
        if (MilestoneLengthOpt3 > milestoneBusinessCount) {
            alert(timelineCountMessageOpt3);
            hideLoading();
            return false;
        }
        //Keysuccess

        var KeySuccessLengthOpt1 = $("#gridBusinessCaseOptKeySuccessCriteria").data("kendoGrid").tbody.find("input:checked").length;
        if (KeySuccessLengthOpt1 > keySuccessBusinessCount) {
            alert(keySuccessCountMessageOpt1);
            hideLoading();
            return false;
        }
        var KeySuccessLengthOpt2 = $("#gridBusinessCaseOptKeySuccessCriteriaOption2").data("kendoGrid").tbody.find("input:checked").length;
        if (KeySuccessLengthOpt2 > keySuccessBusinessCount) {
            alert(keySuccessCountMessageOpt2);
            hideLoading();
            return false;
        }
        var KeySuccessLengthOpt3 = $("#gridBusinessCaseOptKeySuccessCriteriaOption3").data("kendoGrid").tbody.find("input:checked").length;
        if (KeySuccessLengthOpt3 > keySuccessBusinessCount) {
            alert(keySuccessCountMessageOpt3);
            hideLoading();
            return false;
        }

        //Funding
        var FundingLengthOpt1 = $("#gridBusinessCaseFunding").data("kendoGrid").tbody.find("input:checked").length;
        if (FundingLengthOpt1 > fundingBusinessCount) {
            alert(FundingCountMessageOpt1);
            hideLoading();
            return false;
        }
        var FundingLengthOpt2 = $("#gridBusinessCaseFundingOption2").data("kendoGrid").tbody.find("input:checked").length;
        if (FundingLengthOpt2 > fundingBusinessCount) {
            alert(FundingCountMessageOpt2);
            hideLoading();
            return false;
        }
        var FundingLengthOpt3 = $("#gridBusinessCaseFundingOption3").data("kendoGrid").tbody.find("input:checked").length;
        if (FundingLengthOpt3 > fundingBusinessCount) {
            alert(FundingCountMessageOpt3);
            hideLoading();
            return false;
        }


        //KeyAssumption
        var KeyAssumptionLengthOpt1 = $("#gridBusinessCaseOptAssumption").data("kendoGrid").tbody.find("input:checked").length;
        if (KeyAssumptionLengthOpt1 > keyAssumptionBusinessCount) {
            alert(keyAssumptionCountMessageOpt1);
            hideLoading();
            return false;
        }
        var KeyAssumptionLengthOpt2 = $("#gridBusinessCaseOptAssumptionOption2").data("kendoGrid").tbody.find("input:checked").length;
        if (KeyAssumptionLengthOpt2 > keyAssumptionBusinessCount) {
            alert(keyAssumptionCountMessageOpt2);
            hideLoading();
            return false;
        }
        var KeyAssumptionLengthOpt3 = $("#gridBusinessCaseOptAssumptionOption3").data("kendoGrid").tbody.find("input:checked").length;
        if (KeyAssumptionLengthOpt3 > keyAssumptionBusinessCount) {
            alert(keyAssumptionCountMessageOpt3);
            hideLoading();
            return false;
        }

    }
    function SaveBusinessCaseData() {

        displayLoading();
        var listBC_GeneralInfo = [];
        var listBC_Op1Milestone = [];
        var listBC_Op1Op1Risk = [];
        var listBC_Op1Assumption = [];
        var listBC_Op1KeySuccess = [];
        var listBC_Op1Funding = [];
        var listBusinessCaseInfo = [];
        var listCapsOpt1 = [];
        //productMultiplier = "";

        vm.milestoneInsertListItems = [];
        vm.milestoneUpdateListItems = [];

        vm.riskInsertListItems = [];
        vm.riskUpdateListItems = [];

        vm.keySuccessInsertListItems = [];
        vm.keySuccessUpdateListItems = [];

        vm.assumptionInsertListItems = [];
        vm.assumptionUpdateListItems = [];

        vm.fundindInsertListItems = [];
        vm.fundindUpdateListItems = [];
        var listBC_Op1WaterWaste = []

        //option2
        var listBC_Op1Milestone2 = [];
        var listBC_Op1Op1Risk2 = [];
        var listBC_Op1Assumption2 = [];
        var listBC_Op1KeySuccess2 = [];
        var listBC_Op1Funding2 = [];
        var listBusinessCaseInfoOpt2 = [];
        var listCapsOpt2 = [];
        var listBC_Op1WaterWaste2 = [];
        vm.milestoneInsertListItemsOpt2 = [];
        vm.milestoneUpdateListItemsOpt2 = [];

        vm.riskInsertListItemsOpt2 = [];
        vm.riskUpdateListItemsOpt2 = [];

        vm.keySuccessInsertListItemsOpt2 = [];
        vm.keySuccessUpdateListItemsOpt2 = [];

        vm.assumptionInsertListItemsOpt2 = [];
        vm.assumptionUpdateListItemsOpt2 = [];

        vm.fundindInsertListItemsOpt2 = [];
        vm.fundindUpdateListItemsOpt2 = [];

        //option3
        var listBC_Op1Milestone3 = [];
        var listBC_Op1Op1Risk3 = [];
        var listBC_Op1Assumption3 = [];
        var listBC_Op1KeySuccess3 = [];
        var listBC_Op1Funding3 = [];
        var listBusinessCaseInfoOpt3 = [];
        var listCapsOpt3 = [];
        var listBC_Op1WaterWaste3 = [];

        vm.milestoneInsertListItemsOpt3 = [];
        vm.milestoneUpdateListItemsOpt3 = [];

        vm.riskInsertListItemsOpt3 = [];
        vm.riskUpdateListItemsOpt3 = [];

        vm.keySuccessInsertListItemsOpt3 = [];
        vm.keySuccessUpdateListItemsOpt3 = [];

        vm.assumptionInsertListItemsOpt3 = [];
        vm.assumptionUpdateListItemsOpt3 = [];

        vm.fundindInsertListItemsOpt3 = [];
        vm.fundindUpdateListItemsOpt3 = [];

        vm.capsGridOpt1 = [];
        vm.capsGridOpt2 = [];
        vm.capsGridOpt3 = [];

        var CAPSWaterWasteListOpt1 = [];
        var CAPSWaterWasteListOpt2 = [];
        var CAPSWaterWasteListOpt3 = [];

        var valid = true;
        var executionStartOpt1 = (vm.businessOptionInfoSelector.ExecutionStartDate != null && vm.businessOptionInfoSelector.ExecutionStartDate != "") ? $("#executionStart").val() : null;
        var executionEndOpt1 = (vm.businessOptionInfoSelector.ExecutionEndDate != null && vm.businessOptionInfoSelector.ExecutionEndDate != "") ? $("#executionEnd").val() : null;
        var AssetInServiceOpt1 = (vm.businessOptionInfoSelector.AssetInService != null && vm.businessOptionInfoSelector.AssetInService != "") ? $("#assetDate").val() : null;
        var spendDateOpt1 = (vm.businessOptionInfoSelector.ProjectSpendStart != null && vm.businessOptionInfoSelector.ProjectSpendStart != "") ? $("#spendDate").val() : null;
        var EPRealizationDate1 = (vm.businessOptionInfoSelector.EmissionsImpactRealizationDate != null && vm.businessOptionInfoSelector.EmissionsImpactRealizationDate != "") ? $("#realizationDate1").val() : null;

        if (executionStartOpt1 != null) {
            if (!parseDate(executionStartOpt1)) {
                valid = false;
                vm.executionStartOpt1DateError = true;
            }
            else {
                vm.executionStartOpt1DateError = false;
            }
        }
        if (executionEndOpt1 != null) {
            if (!parseDate(executionEndOpt1)) {
                valid = false;
                vm.executionEndOpt1DateError = true;
            }
            else {
                vm.executionEndOpt1DateError = false;
            }
        }
        if (AssetInServiceOpt1 != null) {
            if (!parseDate(AssetInServiceOpt1)) {
                valid = false;
                vm.AssetInServiceOpt1DateError = true;
            }
            else {
                vm.AssetInServiceOpt1DateError = false;
            }
        }
        if (spendDateOpt1 != null) {
            if (!parseDate(spendDateOpt1)) {
                valid = false;
                vm.ProjectSpendStartOpt1DateError = true;
            }
            else {
                vm.ProjectSpendStartOpt1DateError = false;
            }
        }
        if (EPRealizationDate1 != null) {
            if (!parseDate(EPRealizationDate1)) {
                valid = false;
                vm.BCRealizationDate1 = true;
            }
            else {
                vm.BCRealizationDate1 = false;
            }
        }
        //option2
        var executionStartOpt2 = (vm.businessOption2InfoSelector.ExecutionStartDate != null && vm.businessOption2InfoSelector.ExecutionStartDate != "") ? $("#executionStartOpt2").val() : null;
        var executionEndOpt2 = (vm.businessOption2InfoSelector.ExecutionEndDate != null && vm.businessOption2InfoSelector.ExecutionEndDate != "") ? $("#executionEndOpt2").val() : null;
        var AssetInServiceOpt2 = (vm.businessOption2InfoSelector.AssetInService != null && vm.businessOption2InfoSelector.AssetInService != "") ? $("#assetDateOpt2").val() : null;
        var spendDateOpt2 = (vm.businessOption2InfoSelector.ProjectSpendStart != null && vm.businessOption2InfoSelector.ProjectSpendStart != "") ? $("#spendDateOpt2").val() : null;
        var EPRealizationDate2 = (vm.businessOption2InfoSelector.EmissionsImpactRealizationDate != null && vm.businessOption2InfoSelector.EmissionsImpactRealizationDate != "") ? $("#realizationDate2").val() : null;

        if (executionStartOpt2 != null) {
            if (!parseDate(executionStartOpt2)) {
                valid = false;
                vm.executionStartOpt2DateError = true;
            }
            else {
                vm.executionStartOpt2DateError = false;
            }
        }
        if (executionEndOpt2 != null) {
            if (!parseDate(executionEndOpt2)) {
                valid = false;
                vm.executionEndOpt2DateError = true;
            }
            else {
                vm.executionEndOpt2DateError = false;
            }
        }
        if (AssetInServiceOpt2 != null) {
            if (!parseDate(AssetInServiceOpt2)) {
                valid = false;
                vm.AssetInServiceOpt2DateError = true;
            }
            else {
                vm.AssetInServiceOpt2DateError = false;
            }
        }
        if (spendDateOpt2 != null) {
            if (!parseDate(spendDateOpt2)) {
                valid = false;
                vm.ProjectSpendStartOpt2DateError = true;
            }
            else {
                vm.ProjectSpendStartOpt2DateError = false;
            }
        }
        if (EPRealizationDate2 != null) {
            if (!parseDate(EPRealizationDate2)) {
                valid = false;
                vm.BCRealizationDate2 = true;
            }
            else {
                vm.BCRealizationDate2 = false;
            }
        }
        //option3
        var executionStartOpt3 = (vm.businessOption3InfoSelector.ExecutionStartDate != null && vm.businessOption3InfoSelector.ExecutionStartDate != "") ? $("#executionStartOpt3").val() : null;
        var executionEndOpt3 = (vm.businessOption3InfoSelector.ExecutionEndDate != null && vm.businessOption3InfoSelector.ExecutionEndDate != "") ? $("#executionEndOpt3").val() : null;
        var AssetInServiceOpt3 = (vm.businessOption3InfoSelector.AssetInService != null && vm.businessOption3InfoSelector.AssetInService != "") ? $("#assetDateOpt3").val() : null;
        var spendDateOpt3 = (vm.businessOption3InfoSelector.ProjectSpendStart != null && vm.businessOption3InfoSelector.ProjectSpendStart != "") ? $("#spendDateOpt3").val() : null;
        var EPRealizationDate3 = (vm.businessOption3InfoSelector.EmissionsImpactRealizationDate != null && vm.businessOption3InfoSelector.EmissionsImpactRealizationDate != "") ? $("#realizationDate3").val() : null;

        var bcApprovedDate = (vm.SelectedProject.ApprovedDate != null && vm.SelectedProject.ApprovedDate != "") ? $("#BC_approvedDate").val() : null;

        if (executionStartOpt3 != null) {
            if (!parseDate(executionStartOpt3)) {
                valid = false;
                vm.executionStartOpt3DateError = true;
            }
            else {
                vm.executionStartOpt3DateError = false;
            }
        }
        if (executionEndOpt3 != null) {
            if (!parseDate(executionEndOpt3)) {
                valid = false;
                vm.executionEndOpt3DateError = true;
            }
            else {
                vm.executionEndOpt3DateError = false;
            }
        }
        if (AssetInServiceOpt3 != null) {
            if (!parseDate(AssetInServiceOpt3)) {
                valid = false;
                vm.AssetInServiceOpt3DateError = true;
            }
            else {
                vm.AssetInServiceOpt3DateError = false;
            }
        }
        if (spendDateOpt3 != null) {
            if (!parseDate(spendDateOpt3)) {
                valid = false;
                vm.ProjectSpendStartOpt3DateError = true;
            }
            else {
                vm.ProjectSpendStartOpt3DateError = false;
            }
        }
        if (EPRealizationDate3 != null) {
            if (!parseDate(EPRealizationDate3)) {
                valid = false;
                vm.BCRealizationDate3 = true;
            }
            else {
                vm.BCRealizationDate3 = false;
            }
        }
        if (bcApprovedDate != null) {
            if (!parseDate(bcApprovedDate)) {
                valid = false;
                vm.bcApprovedDateError = true;
            }
            else {
                vm.bcApprovedDateError = false;
            }
        }
        if (validateBaseHighCase() == false) {
            alert(errorBaseCaseHighCase);
            valid = false;
        }
        if (IncludeInBusinessCaseCountValidation() == false) {
            // alert(errorBaseCaseHighCase);
            valid = false;
        }
        /****--------------START: Water and Waste Grid data--------------***/

        if ($('#gridCapsWaterWasteOpt1').data('kendoGrid') != undefined) {
            var waterWasteInsertListItems = [];
            var waterWasteUpdateListItems = [];
            var gridupdatedData = $('#gridCapsWaterWasteOpt1').data('kendoGrid').dataSource.data()
                .filter(function (x) { return x.dirty })
                .map(function (x) { return x });
            var insertWaterWasteArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                .map(function (x) { return x });
            var updateWaterWasteArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                .map(function (x) { return x });

            angular.forEach(insertWaterWasteArray, function (item, index) {

                if ((item.WWStream == null || item.WWType == null || item.Category == null
                          || item.WWStream == "" || item.WWType == "" || item.Category == "") && valid == true) {
                    valid = false;
                    alert(waterWasteErrorMsg);
                    return;
                }
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
                if ((item.WWStream == null || item.WWType == null || item.Category == null
                        || item.WWStream == "" || item.WWType == "" || item.Category == "") && valid == true) {
                    valid = false;
                    alert(waterWasteErrorMsg);
                    return;
                }
                if (valid == false) return;
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
            vm.insertUpdateDeleteWaterWasteOpt1 = {
                "insert": waterWasteInsertListItems,
                "update": waterWasteUpdateListItems,
                "delete": deletedWaterWasteOpt1
            };
        }

        if ($('#gridCapsWaterWasteOpt2').data('kendoGrid') != undefined) {
            var waterWasteInsertListItems = [];
            var waterWasteUpdateListItems = [];
            var gridupdatedData = $('#gridCapsWaterWasteOpt2').data('kendoGrid').dataSource.data()
                .filter(function (x) { return x.dirty })
                .map(function (x) { return x });
            var insertWaterWasteArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                .map(function (x) { return x });
            var updateWaterWasteArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                .map(function (x) { return x });

            angular.forEach(insertWaterWasteArray, function (item, index) {
                var tempWaterWaste = {};
                if ((item.WWStream == null || item.WWType == null || item.Category == null
                        || item.WWStream == "" || item.WWType == "" || item.Category == "") && valid == true) {
                    valid = false;
                    alert(waterWasteErrorMsg);
                    return;
                }

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
                if ((item.WWStream == null || item.WWType == null || item.Category == null
                        || item.WWStream == "" || item.WWType == "" || item.Category == "") && valid == true) {
                    valid = false;
                    alert(waterWasteErrorMsg);
                    return;
                }

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
            vm.insertUpdateDeleteWaterWasteOpt2 = {
                "insert": waterWasteInsertListItems,
                "update": waterWasteUpdateListItems,
                "delete": deletedWaterWasteOpt2
            };
        }

        if ($('#gridCapsWaterWasteOpt3').data('kendoGrid') != undefined) {
            var waterWasteInsertListItems = [];
            var waterWasteUpdateListItems = [];
            var gridupdatedData = $('#gridCapsWaterWasteOpt3').data('kendoGrid').dataSource.data()
                .filter(function (x) { return x.dirty })
                .map(function (x) { return x });
            var insertWaterWasteArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                .map(function (x) { return x });
            var updateWaterWasteArray = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null })
                .map(function (x) { return x });

            angular.forEach(insertWaterWasteArray, function (item, index) {
                var tempWaterWaste = {};
                if ((item.WWStream == null || item.WWType == null || item.Category == null
                        || item.WWStream == "" || item.WWType == "" || item.Category == "") && valid == true) {
                    valid = false;
                    alert(waterWasteErrorMsg);
                    return;
                }

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
                if ((item.WWStream == null || item.WWType == null || item.Category == null
                        || item.WWStream == "" || item.WWType == "" || item.Category == "") && valid==true) {
                    valid = false;
                    alert(waterWasteErrorMsg);
                    return;
                }
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
            vm.insertUpdateDeleteWaterWasteOpt3 = {
                "insert": waterWasteInsertListItems,
                "update": waterWasteUpdateListItems,
                "delete": deletedWaterWasteOpt3
            };
        }
        /****--------------END: Water and Waste Grid bind--------------***/


        if (!valid) {
            hideLoading();
            return;
        }
        if ($('#gridBusinessCaseOptTimeline').data('kendoGrid') != undefined) {
            var gridupdatedData = $('#gridBusinessCaseOptTimeline').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertMilestoneArray = gridupdatedData.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateMilestoneArray = gridupdatedData.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });

            angular.forEach(insertMilestoneArray, function (item, index) {
                var temp = {};
                temp.BusinessScheduleUniqueID = item.BusinessScheduleUniqueID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.Milestone = item.Milestone;
                temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                temp.FunctionGroupID = item.FunctionGroupID;
                vm.milestoneInsertListItems.push(temp);
            });
            angular.forEach(updateMilestoneArray, function (item, index) {
                var temp = {};
                temp.BusinessScheduleUniqueID = item.BusinessScheduleUniqueID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.Milestone = item.Milestone;
                temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                temp.FunctionGroupID = item.FunctionGroupID;
                // temp.MilestoneTemplateID = item.MilestoneTemplateID;
                if (milestoneToAddBC1.length > 0) {
                    temp.MilestoneTemplateID = item.MilestoneTemplateID;
                    temp.MilestoneID = item.MilestoneID;
                    temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                    temp.Comments = item.Comments;
                }
                vm.milestoneUpdateListItems.push(temp);
            });
            vm.insertUpdateDeleteMilestone = {
                "insert": vm.milestoneInsertListItems,
                "update": vm.milestoneUpdateListItems,
                "delete": vm.deletedMilestoneData
            };
        }

        if ($('#gridBusinessCaseOptRisk').data('kendoGrid') != undefined) {
            var gridupdatedDataRisk = $('#gridBusinessCaseOptRisk').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertRiskArray = gridupdatedDataRisk.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateRiskSArray = gridupdatedDataRisk.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            //if (insertRiskArray.length!=0)
            angular.forEach(insertRiskArray, function (item, index) {
                var temp = {};
                temp.BusinessRiskIssueUniqueID = item.BusinessRiskIssueUniqueID;
                temp.IfHappens = item.IfHappens;
                temp.RiskIssueResult = item.RiskIssueResult;
                temp.Mitigation = item.Mitigation;
                temp.RiskIssueTypeID = item.RiskIssueTypeID;
                temp.ProbabilityID = item.ProbabilityID;
                temp.ImpactID = item.ImpactID;
                temp.FunctionGroupID = item.FunctionGroupID;
                vm.riskInsertListItems.push(temp);
            });
            angular.forEach(updateRiskSArray, function (item, index) {
                var temp = {};
                temp.BusinessRiskIssueUniqueID = item.BusinessRiskIssueUniqueID;
                temp.IfHappens = item.IfHappens;
                temp.RiskIssueResult = item.RiskIssueResult;
                temp.Mitigation = item.Mitigation;
                temp.RiskIssueTypeID = item.RiskIssueTypeID;
                temp.ProbabilityID = item.ProbabilityID;
                temp.ImpactID = item.ImpactID;
                temp.FunctionGroupID = item.FunctionGroupID;
                vm.riskUpdateListItems.push(temp);
            });
            vm.insertUpdateDeleteRisk = {
                "insert": vm.riskInsertListItems,
                "update": vm.riskUpdateListItems,
                "delete": vm.deletedRiskData
            };
        }

        if ($('#gridBusinessCaseOptAssumption').data('kendoGrid') != undefined) {
            var gridupdatedDataAssumption = $('#gridBusinessCaseOptAssumption').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertAssumptionArray = gridupdatedDataAssumption.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateAssumptionArray = gridupdatedDataAssumption.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            angular.forEach(insertAssumptionArray, function (item, index) {
                var temp = {};
                temp.BusinessKeyAssumptionUniqueID = "";
                temp.KeyAssumption = item.KeyAssumption;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.AssumptionRationale = item.AssumptionRationale;
                vm.assumptionInsertListItems.push(temp);
            });
            angular.forEach(updateAssumptionArray, function (item, index) {
                var temp = {};
                temp.BusinessKeyAssumptionUniqueID = item.BusinessKeyAssumptionUniqueID;
                temp.KeyAssumption = item.KeyAssumption;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.AssumptionRationale = item.AssumptionRationale;
                vm.assumptionUpdateListItems.push(temp);
            });
            vm.insertUpdateDeleteAssumption = {
                "insert": vm.assumptionInsertListItems,
                "update": vm.assumptionUpdateListItems,
                "delete": vm.deletedAssumptionData
            };
        }

        if ($('#gridBusinessCaseFunding').data('kendoGrid') != undefined) {
            var gridupdatedDataFunding = $('#gridBusinessCaseFunding').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertFundingArray = gridupdatedDataFunding.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateFundingArray = gridupdatedDataFunding.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            angular.forEach(insertFundingArray, function (item, index) {
                var temp = {};
                temp.BusinessFundingUniqueID = item.BusinessFundingUniqueID;
                temp.FundingTypeID = item.FundingTypeID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.FundingSourceID = item.FundingSourceID;
                temp.FundingIntheplan = item.FundingIntheplan;
                temp.FundingAmount = item.FundingAmount;
                temp.FundingNotes = item.FundingNotes;
                vm.fundindInsertListItems.push(temp);
            });
            angular.forEach(updateFundingArray, function (item, index) {
                var temp = {};
                temp.BusinessFundingUniqueID = item.BusinessFundingUniqueID;
                temp.FundingTypeID = item.FundingTypeID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.FundingSourceID = item.FundingSourceID;
                temp.FundingIntheplan = item.FundingIntheplan;
                temp.FundingAmount = item.FundingAmount;
                temp.FundingNotes = item.FundingNotes;
                vm.fundindUpdateListItems.push(temp);
            });
            vm.insertUpdateDeleteFunding = {
                "insert": vm.fundindInsertListItems,
                "update": vm.fundindUpdateListItems,
                "delete": vm.deletedFundingData
            };
        }

        if ($('#gridBusinessCaseOptKeySuccessCriteria').data('kendoGrid') != undefined) {
            var gridupdatedDataKey = $('#gridBusinessCaseOptKeySuccessCriteria').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertKeySuccessArray = gridupdatedDataKey.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateKeySuccessArray = gridupdatedDataKey.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            angular.forEach(insertKeySuccessArray, function (item, index) {
                var temp = {};
                temp.BusinessKeySuccessUniqueID = item.BusinessKeySuccessUniqueID;
                temp.Metric = item.Metric;
                temp.CurrentState = item.CurrentState;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.TargetPerformance = item.TargetPerformance;
                vm.keySuccessInsertListItems.push(temp);
            });
            angular.forEach(updateKeySuccessArray, function (item, index) {
                var temp = {};
                temp.BusinessKeySuccessUniqueID = item.BusinessKeySuccessUniqueID;
                temp.Metric = item.Metric;
                temp.CurrentState = item.CurrentState;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.TargetPerformance = item.TargetPerformance;
                vm.keySuccessUpdateListItems.push(temp);
            });
            vm.insertUpdateDeleteKeySuccess = {
                "insert": vm.keySuccessInsertListItems,
                "update": vm.keySuccessUpdateListItems,
                "delete": vm.deletedKeySuccessData
            };
        }
        if ($('#gridCapsOpt1').data('kendoGrid') != undefined) {
            var temp = {};
            var gridData = $('#gridCapsOpt1').data('kendoGrid').dataSource.data()
                .map(function (x) { return x });
            angular.forEach(gridData, function (item, index) {
                //if (!vm.businessOptionInfoSelector.NoCarbonImpact) {
                temp = {
                    EMSourceID: item.EMSourceID,
                    EMSourceName: item.EMSourceName,
                    EMUnit: item.EMUnit,
                    UnitOfMeasure: item.UnitOfMeasure,
                    EMBasisOfEstimate: item.EMBasisOfEstimate,
                    EMFactorImpact: item.EMFactorImpact,
                }
                //}
                //else {
                //    temp = {
                //        EMSourceID: item.EMSourceID,
                //        EMSourceName: item.EMSourceName,
                //        EMUnit: null,
                //        UnitOfMeasure: item.UnitOfMeasure,
                //        EMBasisOfEstimate: item.EMBasisOfEstimate,
                //        EMFactorImpact: item.EMFactorImpact,
                //    }
                //}
                vm.capsGridOpt1.push(temp);
            })
        }
        /* Start Option2 */

        if ($('#gridBusinessCaseOpt2Timeline').data('kendoGrid') != undefined) {
            var gridupdatedData2 = $('#gridBusinessCaseOpt2Timeline').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertMilestoneArray2 = gridupdatedData2.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateMilestoneArray2 = gridupdatedData2.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });

            angular.forEach(insertMilestoneArray2, function (item, index) {
                var temp = {};
                temp.BusinessScheduleUniqueID = item.BusinessScheduleUniqueID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.Milestone = item.Milestone;
                temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                temp.FunctionGroupID = item.FunctionGroupID;
                vm.milestoneInsertListItemsOpt2.push(temp);
            });
            angular.forEach(updateMilestoneArray2, function (item, index) {
                var temp = {};
                temp.BusinessScheduleUniqueID = item.BusinessScheduleUniqueID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.Milestone = item.Milestone;
                temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                temp.FunctionGroupID = item.FunctionGroupID;
                if (milestoneToAddBC2.length > 0) {
                    temp.MilestoneTemplateID = item.MilestoneTemplateID;
                    temp.MilestoneID = item.MilestoneID;
                    temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                    temp.Comments = item.Comments;
                }
                vm.milestoneUpdateListItemsOpt2.push(temp);
            });
            vm.insertUpdateDeleteMilestoneOpt2 = {
                "insert": vm.milestoneInsertListItemsOpt2,
                "update": vm.milestoneUpdateListItemsOpt2,
                "delete": vm.deletedMilestoneDataOption2
            };
        }

        if ($('#gridBusinessCaseOptRiskOption2').data('kendoGrid') != undefined) {
            var gridupdatedDataRisk2 = $('#gridBusinessCaseOptRiskOption2').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertRiskArray2 = gridupdatedDataRisk2.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateRiskSArray2 = gridupdatedDataRisk2.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            //if (insertRiskArray.length!=0)
            angular.forEach(insertRiskArray2, function (item, index) {
                var temp = {};
                temp.BusinessRiskIssueUniqueID = item.BusinessRiskIssueUniqueID;
                temp.IfHappens = item.IfHappens;
                temp.RiskIssueResult = item.RiskIssueResult;
                temp.Mitigation = item.Mitigation;
                temp.RiskIssueTypeID = item.RiskIssueTypeID;
                temp.ProbabilityID = item.ProbabilityID;
                temp.ImpactID = item.ImpactID;
                temp.FunctionGroupID = item.FunctionGroupID;
                vm.riskInsertListItemsOpt2.push(temp);
            });
            angular.forEach(updateRiskSArray2, function (item, index) {
                var temp = {};
                temp.BusinessRiskIssueUniqueID = item.BusinessRiskIssueUniqueID;
                temp.IfHappens = item.IfHappens;
                temp.RiskIssueResult = item.RiskIssueResult;
                temp.Mitigation = item.Mitigation;
                temp.RiskIssueTypeID = item.RiskIssueTypeID;
                temp.ProbabilityID = item.ProbabilityID;
                temp.ImpactID = item.ImpactID;
                temp.FunctionGroupID = item.FunctionGroupID;
                vm.riskUpdateListItemsOpt2.push(temp);
            });
            vm.insertUpdateDeleteRiskOpt2 = {
                "insert": vm.riskInsertListItemsOpt2,
                "update": vm.riskUpdateListItemsOpt2,
                "delete": vm.deletedRiskDataOption2
            };
        }

        if ($('#gridBusinessCaseOptAssumptionOption2').data('kendoGrid') != undefined) {
            var gridupdatedDataAssumption2 = $('#gridBusinessCaseOptAssumptionOption2').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertAssumptionArray2 = gridupdatedDataAssumption2.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateAssumptionArray2 = gridupdatedDataAssumption2.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            angular.forEach(insertAssumptionArray2, function (item, index) {
                var temp = {};
                temp.BusinessKeyAssumptionUniqueID = "";
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.KeyAssumption = item.KeyAssumption;
                temp.AssumptionRationale = item.AssumptionRationale;
                vm.assumptionInsertListItemsOpt2.push(temp);
            });
            angular.forEach(updateAssumptionArray2, function (item, index) {
                var temp = {};
                temp.BusinessKeyAssumptionUniqueID = item.BusinessKeyAssumptionUniqueID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.KeyAssumption = item.KeyAssumption;
                temp.AssumptionRationale = item.AssumptionRationale;
                vm.assumptionUpdateListItemsOpt2.push(temp);
            });
            vm.insertUpdateDeleteAssumptionOpt2 = {
                "insert": vm.assumptionInsertListItemsOpt2,
                "update": vm.assumptionUpdateListItemsOpt2,
                "delete": vm.deletedAssumptionDataOption2
            };
        }

        if ($('#gridBusinessCaseFundingOption2').data('kendoGrid') != undefined) {
            var gridupdatedDataFunding2 = $('#gridBusinessCaseFundingOption2').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertFundingArray2 = gridupdatedDataFunding2.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateFundingArray2 = gridupdatedDataFunding2.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            angular.forEach(insertFundingArray2, function (item, index) {
                var temp = {};
                temp.BusinessFundingUniqueID = item.BusinessFundingUniqueID;
                temp.FundingTypeID = item.FundingTypeID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.FundingSourceID = item.FundingSourceID;
                temp.FundingIntheplan = item.FundingIntheplan;
                temp.FundingAmount = item.FundingAmount;
                temp.FundingNotes = item.FundingNotes;
                vm.fundindInsertListItemsOpt2.push(temp);
            });
            angular.forEach(updateFundingArray2, function (item, index) {
                var temp = {};
                temp.BusinessFundingUniqueID = item.BusinessFundingUniqueID;
                temp.FundingTypeID = item.FundingTypeID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.FundingSourceID = item.FundingSourceID;
                temp.FundingIntheplan = item.FundingIntheplan;
                temp.FundingAmount = item.FundingAmount;
                temp.FundingNotes = item.FundingNotes;
                vm.fundindUpdateListItemsOpt2.push(temp);
            });
            vm.insertUpdateDeleteFundingOpt2 = {
                "insert": vm.fundindInsertListItemsOpt2,
                "update": vm.fundindUpdateListItemsOpt2,
                "delete": vm.deletedFundingDataOption2
            };
        }

        if ($('#gridBusinessCaseOptKeySuccessCriteriaOption2').data('kendoGrid') != undefined) {
            //var gridData = $('#gridBusinessCaseOptTimeline').data('kendoGrid');
            var gridupdatedDataKey2 = $('#gridBusinessCaseOptKeySuccessCriteriaOption2').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertKeySuccessArray2 = gridupdatedDataKey2.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateKeySuccessArray2 = gridupdatedDataKey2.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            angular.forEach(insertKeySuccessArray2, function (item, index) {
                var temp = {};
                temp.BusinessKeySuccessUniqueID = item.BusinessKeySuccessUniqueID;
                temp.Metric = item.Metric;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.CurrentState = item.CurrentState;
                temp.TargetPerformance = item.TargetPerformance;
                vm.keySuccessInsertListItemsOpt2.push(temp);
            });
            angular.forEach(updateKeySuccessArray2, function (item, index) {
                var temp = {};
                temp.BusinessKeySuccessUniqueID = item.BusinessKeySuccessUniqueID;
                temp.Metric = item.Metric;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.CurrentState = item.CurrentState;
                temp.TargetPerformance = item.TargetPerformance;
                vm.keySuccessUpdateListItemsOpt2.push(temp);
            });
            vm.insertUpdateDeleteKeySuccessOpt2 = {
                "insert": vm.keySuccessInsertListItemsOpt2,
                "update": vm.keySuccessUpdateListItemsOpt2,
                "delete": vm.deletedKeySuccessDataOption2
            };
        }
        if ($('#gridCapsOpt2').data('kendoGrid') != undefined) {
            var temp2 = {};
            var gridData2 = $('#gridCapsOpt2').data('kendoGrid').dataSource.data()
                .map(function (x) { return x });
            angular.forEach(gridData2, function (item, index) {
                // if (!vm.businessOption2InfoSelector.NoCarbonImpact) {
                temp2 = {
                    EMSourceID: item.EMSourceID,
                    EMSourceName: item.EMSourceName,
                    EMUnit: item.EMUnit,
                    UnitOfMeasure: item.UnitOfMeasure,
                    EMBasisOfEstimate: item.EMBasisOfEstimate,
                    EMFactorImpact: item.EMFactorImpact,
                }
                //}
                //else {
                //    temp2 = {
                //        EMSourceID: item.EMSourceID,
                //        EMSourceName: item.EMSourceName,
                //        EMUnit: null,
                //        UnitOfMeasure: item.UnitOfMeasure,
                //        EMBasisOfEstimate: item.EMBasisOfEstimate,
                //        EMFactorImpact: item.EMFactorImpact,
                //    }
                //}
                vm.capsGridOpt2.push(temp2);
            })
        }
        /* End Option2 */

        /* Start Option3 */

        if ($('#gridBusinessCaseOpt3Timeline').data('kendoGrid') != undefined) {
            var gridupdatedData3 = $('#gridBusinessCaseOpt3Timeline').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertMilestoneArray3 = gridupdatedData3.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateMilestoneArray3 = gridupdatedData3.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });

            angular.forEach(insertMilestoneArray3, function (item, index) {
                var temp = {};
                temp.BusinessScheduleUniqueID = item.BusinessScheduleUniqueID;
                temp.Milestone = item.Milestone;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                temp.FunctionGroupID = item.FunctionGroupID;
                vm.milestoneInsertListItemsOpt3.push(temp);
            });
            angular.forEach(updateMilestoneArray3, function (item, index) {
                var temp = {};
                temp.BusinessScheduleUniqueID = item.BusinessScheduleUniqueID;
                temp.Milestone = item.Milestone;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.PlannedFinish = kendo.toString(item.PlannedFinish, "d");
                temp.FunctionGroupID = item.FunctionGroupID;
                if (milestoneToAddBC3.length > 0) {
                    temp.MilestoneTemplateID = item.MilestoneTemplateID;
                    temp.MilestoneID = item.MilestoneID;
                    temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                    temp.Comments = item.Comments;
                }
                vm.milestoneUpdateListItemsOpt3.push(temp);
            });
            vm.insertUpdateDeleteMilestoneOpt3 = {
                "insert": vm.milestoneInsertListItemsOpt3,
                "update": vm.milestoneUpdateListItemsOpt3,
                "delete": vm.deletedMilestoneDataOption3
            };
        }

        if ($('#gridBusinessCaseOptRiskOption3').data('kendoGrid') != undefined) {
            var gridupdatedDataRisk3 = $('#gridBusinessCaseOptRiskOption3').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertRiskArray3 = gridupdatedDataRisk3.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateRiskSArray3 = gridupdatedDataRisk3.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            //if (insertRiskArray.length!=0)
            angular.forEach(insertRiskArray3, function (item, index) {
                var temp = {};
                temp.BusinessRiskIssueUniqueID = item.BusinessRiskIssueUniqueID;
                temp.IfHappens = item.IfHappens;
                temp.RiskIssueResult = item.RiskIssueResult;
                temp.Mitigation = item.Mitigation;
                temp.RiskIssueTypeID = item.RiskIssueTypeID;
                temp.ProbabilityID = item.ProbabilityID;
                temp.ImpactID = item.ImpactID;
                temp.FunctionGroupID = item.FunctionGroupID;
                vm.riskInsertListItemsOpt3.push(temp);
            });
            angular.forEach(updateRiskSArray3, function (item, index) {
                var temp = {};
                temp.BusinessRiskIssueUniqueID = item.BusinessRiskIssueUniqueID;
                temp.IfHappens = item.IfHappens;
                temp.RiskIssueResult = item.RiskIssueResult;
                temp.Mitigation = item.Mitigation;
                temp.RiskIssueTypeID = item.RiskIssueTypeID;
                temp.ProbabilityID = item.ProbabilityID;
                temp.ImpactID = item.ImpactID;
                temp.FunctionGroupID = item.FunctionGroupID;
                vm.riskUpdateListItemsOpt3.push(temp);
            });
            vm.insertUpdateDeleteRiskOpt3 = {
                "insert": vm.riskInsertListItemsOpt3,
                "update": vm.riskUpdateListItemsOpt3,
                "delete": vm.deletedRiskDataOption3
            };
        }

        if ($('#gridBusinessCaseOptAssumptionOption3').data('kendoGrid') != undefined) {
            var gridupdatedDataAssumption3 = $('#gridBusinessCaseOptAssumptionOption3').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertAssumptionArray3 = gridupdatedDataAssumption3.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateAssumptionArray3 = gridupdatedDataAssumption3.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            angular.forEach(insertAssumptionArray3, function (item, index) {
                var temp = {};
                temp.BusinessKeyAssumptionUniqueID = "";
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.KeyAssumption = item.KeyAssumption;
                temp.AssumptionRationale = item.AssumptionRationale;
                vm.assumptionInsertListItemsOpt3.push(temp);
            });
            angular.forEach(updateAssumptionArray3, function (item, index) {
                var temp = {};
                temp.BusinessKeyAssumptionUniqueID = item.BusinessKeyAssumptionUniqueID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.KeyAssumption = item.KeyAssumption;
                temp.AssumptionRationale = item.AssumptionRationale;
                vm.assumptionUpdateListItemsOpt3.push(temp);
            });
            vm.insertUpdateDeleteAssumptionOpt3 = {
                "insert": vm.assumptionInsertListItemsOpt3,
                "update": vm.assumptionUpdateListItemsOpt3,
                "delete": vm.deletedAssumptionDataOption3
            };
        }

        if ($('#gridBusinessCaseFundingOption3').data('kendoGrid') != undefined) {
            var gridupdatedDataFunding3 = $('#gridBusinessCaseFundingOption3').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertFundingArray3 = gridupdatedDataFunding3.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateFundingArray3 = gridupdatedDataFunding3.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            angular.forEach(insertFundingArray3, function (item, index) {
                var temp = {};
                temp.BusinessFundingUniqueID = item.BusinessFundingUniqueID;
                temp.FundingTypeID = item.FundingTypeID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.FundingSourceID = item.FundingSourceID;
                temp.FundingIntheplan = item.FundingIntheplan;
                temp.FundingAmount = item.FundingAmount;
                temp.FundingNotes = item.FundingNotes;
                vm.fundindInsertListItemsOpt3.push(temp);
            });
            angular.forEach(updateFundingArray3, function (item, index) {
                var temp = {};
                temp.BusinessFundingUniqueID = item.BusinessFundingUniqueID;
                temp.FundingTypeID = item.FundingTypeID;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.FundingSourceID = item.FundingSourceID;
                temp.FundingIntheplan = item.FundingIntheplan;
                temp.FundingAmount = item.FundingAmount;
                temp.FundingNotes = item.FundingNotes;
                vm.fundindUpdateListItemsOpt3.push(temp);
            });
            vm.insertUpdateDeleteFundingOpt3 = {
                "insert": vm.fundindInsertListItemsOpt3,
                "update": vm.fundindUpdateListItemsOpt3,
                "delete": vm.deletedFundingDataOption3
            };
        }

        if ($('#gridBusinessCaseOptKeySuccessCriteriaOption3').data('kendoGrid') != undefined) {
            //var gridData = $('#gridBusinessCaseOptTimeline').data('kendoGrid');
            var gridupdatedDataKey3 = $('#gridBusinessCaseOptKeySuccessCriteriaOption3').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty
                })
                .map(function (x) {
                    return x
                });
            var insertKeySuccessArray3 = gridupdatedDataKey3.filter(function (x) {
                return x.id == "" || x.id == null
            })
                .map(function (x) {
                    return x
                });
            var updateKeySuccessArray3 = gridupdatedDataKey3.filter(function (x) {
                return x.id != "" && x.id != null
            })
                .map(function (x) {
                    return x
                });
            angular.forEach(insertKeySuccessArray3, function (item, index) {
                var temp = {};
                temp.BusinessKeySuccessUniqueID = item.BusinessKeySuccessUniqueID;
                temp.Metric = item.Metric;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.CurrentState = item.CurrentState;
                temp.TargetPerformance = item.TargetPerformance;
                vm.keySuccessInsertListItemsOpt3.push(temp);
            });
            angular.forEach(updateKeySuccessArray3, function (item, index) {
                var temp = {};
                temp.BusinessKeySuccessUniqueID = item.BusinessKeySuccessUniqueID;
                temp.Metric = item.Metric;
                temp.IncludeInBusinessCase = item.IncludeInBusinessCase;
                temp.CurrentState = item.CurrentState;
                temp.TargetPerformance = item.TargetPerformance;
                vm.keySuccessUpdateListItemsOpt3.push(temp);
            });
            vm.insertUpdateDeleteKeySuccessOpt3 = {
                "insert": vm.keySuccessInsertListItemsOpt3,
                "update": vm.keySuccessUpdateListItemsOpt3,
                "delete": vm.deletedKeySuccessDataOption3
            };
        }
        if ($('#gridCapsOpt3').data('kendoGrid') != undefined) {
            var temp3 = {};
            var gridData3 = $('#gridCapsOpt3').data('kendoGrid').dataSource.data()
                .map(function (x) { return x });
            angular.forEach(gridData3, function (item, index) {
                // if (!vm.businessOption3InfoSelector.NoCarbonImpact) {
                temp3 = {
                    EMSourceID: item.EMSourceID,
                    EMSourceName: item.EMSourceName,
                    EMUnit: item.EMUnit,
                    UnitOfMeasure: item.UnitOfMeasure,
                    EMBasisOfEstimate: item.EMBasisOfEstimate,
                    EMFactorImpact: item.EMFactorImpact,
                }
                //}
                //else {
                //    temp3 = {
                //        EMSourceID: item.EMSourceID,
                //        EMSourceName: item.EMSourceName,
                //        EMUnit: null,
                //        UnitOfMeasure: item.UnitOfMeasure,
                //        EMBasisOfEstimate: item.EMBasisOfEstimate,
                //        EMFactorImpact: item.EMFactorImpact,
                //    }
                //}
                vm.capsGridOpt3.push(temp3);
            })
        }
        /* End Option3 */
        var listArray = [];

        if (vm.showCapex != null) {
            var capexRequired = (((vm.businessOptionInfoSelector.TotalCapexBaseCase != null || vm.businessOptionInfoSelector.TotalCapexHighCase != null) && (vm.businessOptionInfoSelector.TotalCapexBaseCase !== "" || vm.businessOptionInfoSelector.TotalCapexHighCase !== "")) ? true : false);
        }
        if (vm.showCapexOpt2 != null) {
            var capexRequired2 = (((vm.businessOption2InfoSelector.TotalCapexBaseCase != null || vm.businessOption2InfoSelector.TotalCapexHighCase != null) && (vm.businessOption2InfoSelector.TotalCapexBaseCase !== "" || vm.businessOption2InfoSelector.TotalCapexHighCase !== "")) ? true : false);
        }
        if (vm.showCapexOpt3 != null) {
            var capexRequired3 = (((vm.businessOption3InfoSelector.TotalCapexBaseCase != null || vm.businessOption3InfoSelector.TotalCapexHighCase != null) && (vm.businessOption3InfoSelector.TotalCapexBaseCase !== "" || vm.businessOption3InfoSelector.TotalCapexHighCase !== "")) ? true : false);
        }


        if (vm.showOpex != null) {
            var opexRequired = (((vm.businessOptionInfoSelector.TotalNonFTEBaseCase != null || vm.businessOptionInfoSelector.TotalNonFTEHighCase != null) && (vm.businessOptionInfoSelector.TotalNonFTEBaseCase !== "" || vm.businessOptionInfoSelector.TotalNonFTEHighCase !== "")) ? true : false);
        }
        if (vm.showOpexOpt2 != null) {
            var opexRequired2 = (((vm.businessOption2InfoSelector.TotalNonFTEBaseCase != null || vm.businessOption2InfoSelector.TotalNonFTEHighCase != null) && (vm.businessOption2InfoSelector.TotalNonFTEBaseCase !== "" || vm.businessOption2InfoSelector.TotalNonFTEHighCase !== "")) ? true : false);
        }
        if (vm.showOpexOpt3 != null) {
            var opexRequired3 = (((vm.businessOption3InfoSelector.TotalNonFTEBaseCase != null || vm.businessOption3InfoSelector.TotalNonFTEHighCase != null) && (vm.businessOption3InfoSelector.TotalNonFTEBaseCase !== "" || vm.businessOption3InfoSelector.TotalNonFTEHighCase !== "")) ? true : false);
        }
        vm.businessOptionInfoSelectedData = {
            BusinessCaseOptionUniqueID: vm.businessOptionInfoSelector != null ? (vm.businessOptionInfoSelector.BusinessCaseOptionUniqueID != null ? vm.businessOptionInfoSelector.BusinessCaseOptionUniqueID : null) : null,
            ProjectID: vm.businessOptionInfoSelector.ProjectID,
            OptionTitle: vm.businessOptionInfoSelector.OptionTitle,
            RecommendedOption: vm.businessOptionInfoSelector.RecommendedOption == undefined ? false : vm.businessOptionInfoSelector.RecommendedOption,
            ProposalStatement: vm.businessOptionInfoSelector.ProposalStatement != null ? vm.businessOptionInfoSelector.ProposalStatement : null,
            DetailedDescription: vm.businessOptionInfoSelector.DetailedDescription != null ? vm.businessOptionInfoSelector.DetailedDescription : null,
            RationaleWhyBestOption: vm.businessOptionInfoSelector.RationaleWhyBestOption != null ? vm.businessOptionInfoSelector.RationaleWhyBestOption : null,

            TradeoffsConsiderations: vm.businessOptionInfoSelector.TradeoffsConsiderations != null ? vm.businessOptionInfoSelector.TradeoffsConsiderations : null,

            PeopleRatingID: vm.selectedBCPeopleRating != null ? vm.selectedBCPeopleRating.LookUpMemberID : null,
            TechnologyRatingID: vm.selectedBCTechnologyRating != null ? vm.selectedBCTechnologyRating.LookUpMemberID : null,
            BusinessCaseProcessID: vm.selectedBCBusinessCaseProcess != null ? vm.selectedBCBusinessCaseProcess.LookUpMemberID : null,
            ManufacturingProcessID: vm.selectedBCManufacturingProcess != null ? vm.selectedBCManufacturingProcess.LookUpMemberID : null,
            EquipmentRatingID: vm.selectedBCEquipmentRating != null ? vm.selectedBCEquipmentRating.LookUpMemberID : null,

            PeopleJustification: vm.businessOptionInfoSelector.PeopleJustification != null ? vm.businessOptionInfoSelector.PeopleJustification : null,
            TechnologyJustification: vm.businessOptionInfoSelector.TechnologyJustification != null ? vm.businessOptionInfoSelector.TechnologyJustification : null,
            BusinessProcessJustification: vm.businessOptionInfoSelector.BusinessProcessJustification != null ? vm.businessOptionInfoSelector.BusinessProcessJustification : null,
            ManufacturingProcessJustification: vm.businessOptionInfoSelector.ManufacturingProcessJustification != null ? vm.businessOptionInfoSelector.ManufacturingProcessJustification : null,
            EquipementJustification: vm.businessOptionInfoSelector.EquipementJustification != null ? vm.businessOptionInfoSelector.EquipementJustification : null,

            ExecutionStartDate: vm.businessOptionInfoSelector.ExecutionStartDate != null && vm.businessOptionInfoSelector.ExecutionStartDate != "" ? vm.businessOptionInfoSelector.ExecutionStartDate : null,
            ExecutionEndDate: vm.businessOptionInfoSelector.ExecutionEndDate != null && vm.businessOptionInfoSelector.ExecutionEndDate != null ? vm.businessOptionInfoSelector.ExecutionEndDate : null,

            CapexRequired: vm.showCapex != null ? capexRequired : null,
            TotalCapexBaseCase: capexRequired == false ? null : ((vm.businessOptionInfoSelector.TotalCapexBaseCase != null && vm.businessOptionInfoSelector.TotalCapexBaseCase !== "") ? vm.businessOptionInfoSelector.TotalCapexBaseCase : null),
            TotalCapexHighCase: capexRequired == false ? null : ((vm.businessOptionInfoSelector.TotalCapexHighCase != null && vm.businessOptionInfoSelector.TotalCapexHighCase !== "") ? vm.businessOptionInfoSelector.TotalCapexHighCase : null),

            ProjectSpendStart: (vm.businessOptionInfoSelector.ProjectSpendStart != null && vm.businessOptionInfoSelector.ProjectSpendStart != "") ? vm.businessOptionInfoSelector.ProjectSpendStart : null,
            IsProjectSpentNA: vm.businessOptionInfoSelector.IsProjectSpentNA != null ? vm.businessOptionInfoSelector.IsProjectSpentNA : false,
            AssetInService: (vm.businessOptionInfoSelector.AssetInService != null && vm.businessOptionInfoSelector.AssetInService != "") ? vm.businessOptionInfoSelector.AssetInService : null,
            AssetInServiceNA: vm.businessOptionInfoSelector.AssetInServiceNA != null ? vm.businessOptionInfoSelector.AssetInServiceNA : false,

            OpexRequired: vm.showOpex != null ? opexRequired : null,

            StrategicAlignment: vm.businessOptionInfoSelector.StrategicAlignment != null ? vm.businessOptionInfoSelector.StrategicAlignment : null,
            StrategicAlignmentJustification: vm.businessOptionInfoSelector.StrategicAlignmentJustification != null ? vm.businessOptionInfoSelector.StrategicAlignmentJustification : null,
            NPVBaseCase: vm.businessOptionInfoSelector.NPVBaseCase != null ? vm.businessOptionInfoSelector.NPVBaseCase : null,
            NPVHighCase: vm.businessOptionInfoSelector.NPVHighCase != null ? vm.businessOptionInfoSelector.NPVHighCase : null,
            NPVRationale: vm.businessOptionInfoSelector.NPVRationale != null ? vm.businessOptionInfoSelector.NPVRationale : null,

            //CostBenefitRatio: vm.businessOptionInfoSelector.CostBenefitRatio != null ? vm.businessOptionInfoSelector.CostBenefitRatio : null,
            //OverallBenefitScore: vm.businessOptionInfoSelector.OverallBenefitScore != null ? vm.businessOptionInfoSelector.OverallBenefitScore : null,
            DurationBaseCase: (vm.businessOptionInfoSelector.DurationBaseCase != null && vm.businessOptionInfoSelector.DurationBaseCase !== "") ? vm.businessOptionInfoSelector.DurationBaseCase : null,
            DurationHighCase: (vm.businessOptionInfoSelector.DurationHighCase != null && vm.businessOptionInfoSelector.DurationHighCase !== "") ? vm.businessOptionInfoSelector.DurationHighCase : null,
            DurationBasisofEstimate: vm.businessOptionInfoSelector.DurationBasisofEstimate != null ? vm.businessOptionInfoSelector.DurationBasisofEstimate : null,
            PeopleFTEMonthsRequiredBaseCase: (vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredBaseCase != null && vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredBaseCase !== "") ? vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredBaseCase : null,
            PeopleFTEMonthsRequiredHighCase: (vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredHighCase != null && vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredHighCase !== "") ? vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredHighCase : null,
            PeopleFTEMonthsRequiredBasisofEstimate: vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredBasisofEstimate != null ? vm.businessOptionInfoSelector.PeopleFTEMonthsRequiredBasisofEstimate : null,
            //TotalCapExBaseCase: vm.businessOptionInfoSelector.TotalCapExBaseCase,
            //TotalCapExHighCase: vm.businessOptionInfoSelector.TotalCapExHighCase,
            TotalCapExBasisofEstimate: vm.businessOptionInfoSelector.TotalCapExBasisofEstimate != null ? vm.businessOptionInfoSelector.TotalCapExBasisofEstimate : null,

            TotalNonFTEBaseCase: opexRequired == false ? null : ((vm.businessOptionInfoSelector.TotalNonFTEBaseCase != null && vm.businessOptionInfoSelector.TotalNonFTEBaseCase !== "") ? vm.businessOptionInfoSelector.TotalNonFTEBaseCase : null),
            TotalNonFTEHighCase: opexRequired == false ? null : ((vm.businessOptionInfoSelector.TotalNonFTEHighCase != null && vm.businessOptionInfoSelector.TotalNonFTEHighCase !== "") ? vm.businessOptionInfoSelector.TotalNonFTEHighCase : null),
            TotalNonFTEBasisofEstimate: vm.businessOptionInfoSelector.TotalNonFTEBasisofEstimate != null ? vm.businessOptionInfoSelector.TotalNonFTEBasisofEstimate : null,
            InLineProductID: vm.businessOptionInfoSelector.InLineProductID != null ? (vm.businessOptionInfoSelector.InLineProductID.LookUpMemberID == undefined ? vm.businessOptionInfoSelector.InLineProductID : vm.businessOptionInfoSelector.InLineProductID.LookUpMemberID) : null,

            InLineProductRationale: vm.businessOptionInfoSelector.InLineProductRationale != null ? vm.businessOptionInfoSelector.InLineProductRationale : null,
            ImpactMultiplierID: vm.businessOptionInfoSelector.ImpactMultiplierID != null ? (vm.businessOptionInfoSelector.ImpactMultiplierID.LookUpMemberID == undefined ? vm.businessOptionInfoSelector.ImpactMultiplierID : vm.businessOptionInfoSelector.ImpactMultiplierID.LookUpMemberID) : null,
            ImpactMultiplierRationale: vm.businessOptionInfoSelector.ImpactMultiplierRationale != null ? vm.businessOptionInfoSelector.ImpactMultiplierRationale : null,


            FunctionsRequiredID: vm.businessOptionInfoSelector.FunctionsRequiredID != null ? (vm.businessOptionInfoSelector.FunctionsRequiredID.LookUpMemberID == undefined ? vm.businessOptionInfoSelector.FunctionsRequiredID : vm.businessOptionInfoSelector.FunctionsRequiredID.LookUpMemberID) : null,
            //   ProductID: vm.businessOptionInfoSelector.ProductID != null ? (vm.businessOptionInfoSelector.ProductID.LookUpMemberID == undefined ? vm.businessOptionInfoSelector.ProductID : vm.businessOptionInfoSelector.ProductID.LookUpMemberID) : null,

            // businessOptionInfoSelectorGroup: vm.businessOptionInfoSelector.TOPSGroup,
            CurrentYearPlannedSpend: (vm.businessOptionInfoSelector.CurrentYearPlannedSpend != null && vm.businessOptionInfoSelector.CurrentYearPlannedSpend != "") ? vm.businessOptionInfoSelector.CurrentYearPlannedSpend : null,
            ProjectScope: vm.businessOptionInfoSelector.ProjectScope != null ? (vm.businessOptionInfoSelector.ProjectScope.LookUpMemberID == undefined ? vm.businessOptionInfoSelector.ProjectScope : vm.businessOptionInfoSelector.ProjectScope.LookUpMemberID) : null,
            //IsCapsProject: vm.businessOptionInfoSelector.IsCapsProject,
            CalculatedEmissionsImpact: (vm.formattedCalculatedEmissionsImpact1 != null && vm.formattedCalculatedEmissionsImpact1 !== "") ? vm.formattedCalculatedEmissionsImpact1 : null,
            //EmissionPortfolioID: (vm.SelectedCapsEmissionPortfolio1 != null && vm.SelectedCapsEmissionPortfolio1 !== "") ? vm.SelectedCapsEmissionPortfolio1.LookUpMemberID : null,
            EmissionsImpactRealizationDate: (vm.businessOptionInfoSelector.EmissionsImpactRealizationDate != null && vm.businessOptionInfoSelector.EmissionsImpactRealizationDate !== "") ? vm.businessOptionInfoSelector.EmissionsImpactRealizationDate : null,
            NoCarbonImpact: (vm.businessOptionInfoSelector.NoCarbonImpact != null && vm.businessOptionInfoSelector.NoCarbonImpact !== "") ? vm.businessOptionInfoSelector.NoCarbonImpact : null,

        };

        /* Option2 Business case*/
        vm.businessOption2InfoSelectedData = {
            BusinessCaseOptionUniqueID: vm.businessOption2InfoSelector != null ? (vm.businessOption2InfoSelector.BusinessCaseOptionUniqueID != null ? vm.businessOption2InfoSelector.BusinessCaseOptionUniqueID : null) : null,
            ProjectID: vm.businessOption2InfoSelector.ProjectID,
            OptionTitle: vm.businessOption2InfoSelector.OptionTitle,
            RecommendedOption: vm.businessOption2InfoSelector.RecommendedOption == undefined ? false : vm.businessOption2InfoSelector.RecommendedOption,
            ProposalStatement: vm.businessOption2InfoSelector.ProposalStatement != null ? vm.businessOption2InfoSelector.ProposalStatement : null,
            DetailedDescription: vm.businessOption2InfoSelector.DetailedDescription != null ? vm.businessOption2InfoSelector.DetailedDescription : null,
            RationaleWhyBestOption: vm.businessOption2InfoSelector.RationaleWhyBestOption != null ? vm.businessOption2InfoSelector.RationaleWhyBestOption : null,
            TradeoffsConsiderations: vm.businessOption2InfoSelector.TradeoffsConsiderations != null ? vm.businessOption2InfoSelector.TradeoffsConsiderations : null,

            PeopleRatingID: vm.selectedBCPeopleRatingOption2 != null ? vm.selectedBCPeopleRatingOption2.LookUpMemberID : null,
            TechnologyRatingID: vm.selectedBCTechnologyRatingOption2 != null ? vm.selectedBCTechnologyRatingOption2.LookUpMemberID : null,
            BusinessCaseProcessID: vm.selectedBCBusinessCaseProcessOption2 != null ? vm.selectedBCBusinessCaseProcessOption2.LookUpMemberID : null,
            ManufacturingProcessID: vm.selectedBCManufacturingProcessoption2 != null ? vm.selectedBCManufacturingProcessoption2.LookUpMemberID : null,
            EquipmentRatingID: vm.selectedBCEquipmentRatingOption2 != null ? vm.selectedBCEquipmentRatingOption2.LookUpMemberID : null,

            PeopleJustification: vm.businessOption2InfoSelector.PeopleJustification != null ? vm.businessOption2InfoSelector.PeopleJustification : null,
            TechnologyJustification: vm.businessOption2InfoSelector.TechnologyJustification != null ? vm.businessOption2InfoSelector.TechnologyJustification : null,
            BusinessProcessJustification: vm.businessOption2InfoSelector.BusinessProcessJustification != null ? vm.businessOption2InfoSelector.BusinessProcessJustification : null,
            ManufacturingProcessJustification: vm.businessOption2InfoSelector.ManufacturingProcessJustification != null ? vm.businessOption2InfoSelector.ManufacturingProcessJustification : null,
            EquipementJustification: vm.businessOption2InfoSelector.EquipementJustification != null ? vm.businessOption2InfoSelector.EquipementJustification : null,

            ExecutionStartDate: (vm.businessOption2InfoSelector.ExecutionStartDate != null && vm.businessOption2InfoSelector.ExecutionStartDate != "") ? vm.businessOption2InfoSelector.ExecutionStartDate : null,
            ExecutionEndDate: (vm.businessOption2InfoSelector.ExecutionEndDate != null && vm.businessOption2InfoSelector.ExecutionEndDate != "") ? vm.businessOption2InfoSelector.ExecutionEndDate : null,

            CapexRequired: vm.showCapexOpt2 != null ? capexRequired2 : null,
            TotalCapexBaseCase: capexRequired2 == false ? null : ((vm.businessOption2InfoSelector.TotalCapexBaseCase != null && vm.businessOption2InfoSelector.TotalCapexBaseCase !== "") ? vm.businessOption2InfoSelector.TotalCapexBaseCase : null),
            TotalCapexHighCase: capexRequired2 == false ? null : ((vm.businessOption2InfoSelector.TotalCapexHighCase != null && vm.businessOption2InfoSelector.TotalCapexHighCase !== "") ? vm.businessOption2InfoSelector.TotalCapexHighCase : null),

            ProjectSpendStart: (vm.businessOption2InfoSelector.ProjectSpendStart != null && vm.businessOption2InfoSelector.ProjectSpendStart != "") ? vm.businessOption2InfoSelector.ProjectSpendStart : null,
            IsProjectSpentNA: vm.businessOption2InfoSelector.IsProjectSpentNA != null ? vm.businessOption2InfoSelector.IsProjectSpentNA : false,
            AssetInService: (vm.businessOption2InfoSelector.AssetInService != null && vm.businessOption2InfoSelector.AssetInService != "") ? vm.businessOption2InfoSelector.AssetInService : null,
            AssetInServiceNA: vm.businessOption2InfoSelector.AssetInServiceNA != null ? vm.businessOption2InfoSelector.AssetInServiceNA : false,

            OpexRequired: vm.showOpexOpt2 != null ? opexRequired2 : null,

            StrategicAlignment: vm.businessOption2InfoSelector.StrategicAlignment != null ? vm.businessOption2InfoSelector.StrategicAlignment : null,
            StrategicAlignmentJustification: vm.businessOption2InfoSelector.StrategicAlignmentJustification != null ? vm.businessOption2InfoSelector.StrategicAlignmentJustification : null,
            NPVBaseCase: vm.businessOption2InfoSelector.NPVBaseCase != null ? vm.businessOption2InfoSelector.NPVBaseCase : null,
            NPVHighCase: vm.businessOption2InfoSelector.NPVHighCase != null ? vm.businessOption2InfoSelector.NPVHighCase : null,
            NPVRationale: vm.businessOption2InfoSelector.NPVRationale != null ? vm.businessOption2InfoSelector.NPVRationale : null,

            //CostBenefitRatio: vm.businessOption2InfoSelector.CostBenefitRatio != null ? vm.businessOption2InfoSelector.CostBenefitRatio : null,
            //OverallBenefitScore: vm.businessOption2InfoSelector.OverallBenefitScore != null ? vm.businessOption2InfoSelector.OverallBenefitScore : null,
            DurationBaseCase: (vm.businessOption2InfoSelector.DurationBaseCase != null && vm.businessOption2InfoSelector.DurationBaseCase !== "") ? vm.businessOption2InfoSelector.DurationBaseCase : null,
            DurationHighCase: (vm.businessOption2InfoSelector.DurationHighCase != null && vm.businessOption2InfoSelector.DurationHighCase !== "") ? vm.businessOption2InfoSelector.DurationHighCase : null,
            DurationBasisofEstimate: vm.businessOption2InfoSelector.DurationBasisofEstimate != null ? vm.businessOption2InfoSelector.DurationBasisofEstimate : null,
            PeopleFTEMonthsRequiredBaseCase: (vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredBaseCase != null && vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredBaseCase !== "") ? vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredBaseCase : null,
            PeopleFTEMonthsRequiredHighCase: (vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredHighCase != null && vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredHighCase !== "") ? vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredHighCase : null,
            PeopleFTEMonthsRequiredBasisofEstimate: vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredBasisofEstimate != null ? vm.businessOption2InfoSelector.PeopleFTEMonthsRequiredBasisofEstimate : null,
            //TotalCapExBaseCase: vm.businessOptionInfoSelector.TotalCapExBaseCase,
            //TotalCapExHighCase: vm.businessOptionInfoSelector.TotalCapExHighCase,
            TotalCapExBasisofEstimate: vm.businessOption2InfoSelector.TotalCapExBasisofEstimate != null ? vm.businessOption2InfoSelector.TotalCapExBasisofEstimate : null,

            TotalNonFTEBaseCase: opexRequired2 == false ? null : ((vm.businessOption2InfoSelector.TotalNonFTEBaseCase != null && vm.businessOption2InfoSelector.TotalNonFTEBaseCase !== "") ? vm.businessOption2InfoSelector.TotalNonFTEBaseCase : null),
            TotalNonFTEHighCase: opexRequired2 == false ? null : ((vm.businessOption2InfoSelector.TotalNonFTEHighCase != null && vm.businessOption2InfoSelector.TotalNonFTEHighCase !== "") ? vm.businessOption2InfoSelector.TotalNonFTEHighCase : null),
            TotalNonFTEBasisofEstimate: vm.businessOption2InfoSelector.TotalNonFTEBasisofEstimate != null ? vm.businessOption2InfoSelector.TotalNonFTEBasisofEstimate : null,
            InLineProductID: vm.businessOption2InfoSelector.InLineProductID != null ? (vm.businessOption2InfoSelector.InLineProductID.LookUpMemberID == undefined ? vm.businessOption2InfoSelector.InLineProductID : vm.businessOption2InfoSelector.InLineProductID.LookUpMemberID) : null,

            InLineProductRationale: vm.businessOption2InfoSelector.InLineProductRationale != null ? vm.businessOption2InfoSelector.InLineProductRationale : null,
            ImpactMultiplierID: vm.businessOption2InfoSelector.ImpactMultiplierID != null ? (vm.businessOption2InfoSelector.ImpactMultiplierID.LookUpMemberID == undefined ? vm.businessOption2InfoSelector.ImpactMultiplierID : vm.businessOption2InfoSelector.ImpactMultiplierID.LookUpMemberID) : null,
            ImpactMultiplierRationale: vm.businessOption2InfoSelector.ImpactMultiplierRationale != null ? vm.businessOption2InfoSelector.ImpactMultiplierRationale : null,


            FunctionsRequiredID: vm.businessOption2InfoSelector.FunctionsRequiredID != null ? (vm.businessOption2InfoSelector.FunctionsRequiredID.LookUpMemberID == undefined ? vm.businessOption2InfoSelector.FunctionsRequiredID : vm.businessOption2InfoSelector.FunctionsRequiredID.LookUpMemberID) : null,
            //   ProductID: vm.businessOption2InfoSelector.ProductID != null ? (vm.businessOption2InfoSelector.ProductID.LookUpMemberID == undefined ? vm.businessOption2InfoSelector.ProductID : vm.businessOption2InfoSelector.ProductID.LookUpMemberID) : null,

            // businessOptionInfoSelectorGroup: vm.businessOption2InfoSelector.TOPSGroup,
            CurrentYearPlannedSpend: (vm.businessOption2InfoSelector.CurrentYearPlannedSpend != null && vm.businessOption2InfoSelector.CurrentYearPlannedSpend != "") ? vm.businessOption2InfoSelector.CurrentYearPlannedSpend : null,
            ProjectScope: vm.businessOption2InfoSelector.ProjectScope != null ? (vm.businessOption2InfoSelector.ProjectScope.LookUpMemberID == undefined ? vm.businessOption2InfoSelector.ProjectScope : vm.businessOption2InfoSelector.ProjectScope.LookUpMemberID) : null,
            // IsCapsProject: vm.businessOption2InfoSelector.IsCapsProject,
            CalculatedEmissionsImpact: (vm.formattedCalculatedEmissionsImpact2 != null && vm.formattedCalculatedEmissionsImpact2 !== "") ? vm.formattedCalculatedEmissionsImpact2 : null,
            // EmissionPortfolioID: (vm.SelectedCapsEmissionPortfolio2 != null && vm.SelectedCapsEmissionPortfolio2 !== "") ? vm.SelectedCapsEmissionPortfolio2.LookUpMemberID : null,
            EmissionsImpactRealizationDate: (vm.businessOption2InfoSelector.EmissionsImpactRealizationDate != null && vm.businessOption2InfoSelector.EmissionsImpactRealizationDate !== "") ? vm.businessOption2InfoSelector.EmissionsImpactRealizationDate : null,
            NoCarbonImpact: (vm.businessOption2InfoSelector.NoCarbonImpact != null && vm.businessOption2InfoSelector.NoCarbonImpact !== "") ? vm.businessOption2InfoSelector.NoCarbonImpact : null,

        };

        /* Option3 Business case*/
        vm.businessOption3InfoSelectedData = {
            BusinessCaseOptionUniqueID: vm.businessOption3InfoSelector != null ? (vm.businessOption3InfoSelector.BusinessCaseOptionUniqueID != null ? vm.businessOption3InfoSelector.BusinessCaseOptionUniqueID : null) : null,
            ProjectID: vm.businessOption3InfoSelector.ProjectID,
            OptionTitle: vm.businessOption3InfoSelector.OptionTitle,
            RecommendedOption: vm.businessOption3InfoSelector.RecommendedOption == undefined ? false : vm.businessOption3InfoSelector.RecommendedOption,
            ProposalStatement: vm.businessOption3InfoSelector.ProposalStatement != null ? vm.businessOption3InfoSelector.ProposalStatement : null,
            DetailedDescription: vm.businessOption3InfoSelector.DetailedDescription != null ? vm.businessOption3InfoSelector.DetailedDescription : null,
            RationaleWhyBestOption: vm.businessOption3InfoSelector.RationaleWhyBestOption != null ? vm.businessOption3InfoSelector.RationaleWhyBestOption : null,
            TradeoffsConsiderations: vm.businessOption3InfoSelector.TradeoffsConsiderations != null ? vm.businessOption3InfoSelector.TradeoffsConsiderations : null,

            PeopleRatingID: vm.selectedBCPeopleRatingOption3 != null ? vm.selectedBCPeopleRatingOption3.LookUpMemberID : null,
            TechnologyRatingID: vm.selectedBCTechnologyRatingOption3 != null ? vm.selectedBCTechnologyRatingOption3.LookUpMemberID : null,
            BusinessCaseProcessID: vm.selectedBCBusinessCaseProcessOption3 != null ? vm.selectedBCBusinessCaseProcessOption3.LookUpMemberID : null,
            ManufacturingProcessID: vm.selectedBCManufacturingProcessOption3 != null ? vm.selectedBCManufacturingProcessOption3.LookUpMemberID : null,
            EquipmentRatingID: vm.selectedBCEquipmentRatingOption3 != null ? vm.selectedBCEquipmentRatingOption3.LookUpMemberID : null,

            PeopleJustification: vm.businessOption3InfoSelector.PeopleJustification != null ? vm.businessOption3InfoSelector.PeopleJustification : null,
            TechnologyJustification: vm.businessOption3InfoSelector.TechnologyJustification != null ? vm.businessOption3InfoSelector.TechnologyJustification : null,
            BusinessProcessJustification: vm.businessOption3InfoSelector.BusinessProcessJustification != null ? vm.businessOption3InfoSelector.BusinessProcessJustification : null,
            ManufacturingProcessJustification: vm.businessOption3InfoSelector.ManufacturingProcessJustification != null ? vm.businessOption3InfoSelector.ManufacturingProcessJustification : null,
            EquipementJustification: vm.businessOption3InfoSelector.EquipementJustification != null ? vm.businessOption3InfoSelector.EquipementJustification : null,

            ExecutionStartDate: (vm.businessOption3InfoSelector.ExecutionStartDate != null && vm.businessOption3InfoSelector.ExecutionStartDate != "") ? vm.businessOption3InfoSelector.ExecutionStartDate : null,
            ExecutionEndDate: (vm.businessOption3InfoSelector.ExecutionEndDate != null && vm.businessOption3InfoSelector.ExecutionEndDate != "") ? vm.businessOption3InfoSelector.ExecutionEndDate : null,

            CapexRequired: vm.showCapexOpt3 != null ? capexRequired3 : null,
            TotalCapexBaseCase: capexRequired3 == false ? null : ((vm.businessOption3InfoSelector.TotalCapexBaseCase != null && vm.businessOption3InfoSelector.TotalCapexBaseCase !== "") ? vm.businessOption3InfoSelector.TotalCapexBaseCase : null),
            TotalCapexHighCase: capexRequired3 == false ? null : ((vm.businessOption3InfoSelector.TotalCapexHighCase != null && vm.businessOption3InfoSelector.TotalCapexHighCase !== "") ? vm.businessOption3InfoSelector.TotalCapexHighCase : null),

            ProjectSpendStart: (vm.businessOption3InfoSelector.ProjectSpendStart != null && vm.businessOption3InfoSelector.ProjectSpendStart != "") ? vm.businessOption3InfoSelector.ProjectSpendStart : null,
            IsProjectSpentNA: vm.businessOption3InfoSelector.IsProjectSpentNA != null ? vm.businessOption3InfoSelector.IsProjectSpentNA : false,
            AssetInService: (vm.businessOption3InfoSelector.AssetInService != null && vm.businessOption3InfoSelector.AssetInService != "") ? vm.businessOption3InfoSelector.AssetInService : null,
            AssetInServiceNA: vm.businessOption3InfoSelector.AssetInServiceNA != null ? vm.businessOption3InfoSelector.AssetInServiceNA : false,

            OpexRequired: vm.showOpexOpt3 != null ? opexRequired3 : null,

            StrategicAlignment: vm.businessOption3InfoSelector.StrategicAlignment != null ? vm.businessOption3InfoSelector.StrategicAlignment : null,
            StrategicAlignmentJustification: vm.businessOption3InfoSelector.StrategicAlignmentJustification != null ? vm.businessOption3InfoSelector.StrategicAlignmentJustification : null,
            NPVBaseCase: vm.businessOption3InfoSelector.NPVBaseCase != null ? vm.businessOption3InfoSelector.NPVBaseCase : null,
            NPVHighCase: vm.businessOption3InfoSelector.NPVHighCase != null ? vm.businessOption3InfoSelector.NPVHighCase : null,
            NPVRationale: vm.businessOption3InfoSelector.NPVRationale != null ? vm.businessOption3InfoSelector.NPVRationale : null,

            //CostBenefitRatio: vm.businessOption3InfoSelector.CostBenefitRatio != null ? vm.businessOption3InfoSelector.CostBenefitRatio : null,
            //OverallBenefitScore: vm.businessOption3InfoSelector.OverallBenefitScore != null ? vm.businessOption3InfoSelector.OverallBenefitScore : null,
            DurationBaseCase: (vm.businessOption3InfoSelector.DurationBaseCase != null && vm.businessOption3InfoSelector.DurationBaseCase !== "") ? vm.businessOption3InfoSelector.DurationBaseCase : null,
            DurationHighCase: (vm.businessOption3InfoSelector.DurationHighCase != null && vm.businessOption3InfoSelector.DurationHighCase !== "") ? vm.businessOption3InfoSelector.DurationHighCase : null,
            DurationBasisofEstimate: vm.businessOption3InfoSelector.DurationBasisofEstimate != null ? vm.businessOption3InfoSelector.DurationBasisofEstimate : null,
            PeopleFTEMonthsRequiredBaseCase: (vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredBaseCase != null && vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredBaseCase !== "") ? vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredBaseCase : null,
            PeopleFTEMonthsRequiredHighCase: (vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredHighCase != null && vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredHighCase !== "") ? vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredHighCase : null,
            PeopleFTEMonthsRequiredBasisofEstimate: vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredBasisofEstimate != null ? vm.businessOption3InfoSelector.PeopleFTEMonthsRequiredBasisofEstimate : null,
            //TotalCapExBaseCase: vm.businessOptionInfoSelector.TotalCapExBaseCase,
            //TotalCapExHighCase: vm.businessOptionInfoSelector.TotalCapExHighCase,
            TotalCapExBasisofEstimate: vm.businessOption3InfoSelector.TotalCapExBasisofEstimate != null ? vm.businessOption3InfoSelector.TotalCapExBasisofEstimate : null,

            TotalNonFTEBaseCase: opexRequired3 == false ? null : ((vm.businessOption3InfoSelector.TotalNonFTEBaseCase != null && vm.businessOption3InfoSelector.TotalNonFTEBaseCase !== "") ? vm.businessOption3InfoSelector.TotalNonFTEBaseCase : null),
            TotalNonFTEHighCase: opexRequired3 == false ? null : ((vm.businessOption3InfoSelector.TotalNonFTEHighCase != null && vm.businessOption3InfoSelector.TotalNonFTEHighCase !== "") ? vm.businessOption3InfoSelector.TotalNonFTEHighCase : null),
            TotalNonFTEBasisofEstimate: vm.businessOption3InfoSelector.TotalNonFTEBasisofEstimate != null ? vm.businessOption3InfoSelector.TotalNonFTEBasisofEstimate : null,
            InLineProductID: vm.businessOption3InfoSelector.InLineProductID != null ? (vm.businessOption3InfoSelector.InLineProductID.LookUpMemberID == undefined ? vm.businessOption3InfoSelector.InLineProductID : vm.businessOption3InfoSelector.InLineProductID.LookUpMemberID) : null,

            InLineProductRationale: vm.businessOption3InfoSelector.InLineProductRationale != null ? vm.businessOption3InfoSelector.InLineProductRationale : null,
            ImpactMultiplierID: vm.businessOption3InfoSelector.ImpactMultiplierID != null ? (vm.businessOption3InfoSelector.ImpactMultiplierID.LookUpMemberID == undefined ? vm.businessOption3InfoSelector.ImpactMultiplierID : vm.businessOption3InfoSelector.ImpactMultiplierID.LookUpMemberID) : null,
            ImpactMultiplierRationale: vm.businessOption3InfoSelector.ImpactMultiplierRationale != null ? vm.businessOption3InfoSelector.ImpactMultiplierRationale : null,


            FunctionsRequiredID: vm.businessOption3InfoSelector.FunctionsRequiredID != null ? (vm.businessOption3InfoSelector.FunctionsRequiredID.LookUpMemberID == undefined ? vm.businessOption3InfoSelector.FunctionsRequiredID : vm.businessOption3InfoSelector.FunctionsRequiredID.LookUpMemberID) : null,
            //  ProductID: vm.businessOption3InfoSelector.ProductID != null ? (vm.businessOption3InfoSelector.ProductID.LookUpMemberID == undefined ? vm.businessOption3InfoSelector.ProductID : vm.businessOption3InfoSelector.ProductID.LookUpMemberID) : null,

            //businessOptionInfoSelectorGroup: vm.businessOption3InfoSelector.TOPSGroup,
            CurrentYearPlannedSpend: (vm.businessOption3InfoSelector.CurrentYearPlannedSpend != null && vm.businessOption3InfoSelector.CurrentYearPlannedSpend != "") ? vm.businessOption3InfoSelector.CurrentYearPlannedSpend : null,
            ProjectScope: vm.businessOption3InfoSelector.ProjectScope != null ? (vm.businessOption3InfoSelector.ProjectScope.LookUpMemberID == undefined ? vm.businessOption3InfoSelector.ProjectScope : vm.businessOption3InfoSelector.ProjectScope.LookUpMemberID) : null,
            //IsCapsProject: vm.businessOption3InfoSelector.IsCapsProject,
            CalculatedEmissionsImpact: (vm.formattedCalculatedEmissionsImpact3 != null && vm.formattedCalculatedEmissionsImpact3 !== "") ? vm.formattedCalculatedEmissionsImpact3 : null,
            //EmissionPortfolioID: (vm.SelectedCapsEmissionPortfolio3 != null && vm.SelectedCapsEmissionPortfolio3 !== "") ? vm.SelectedCapsEmissionPortfolio3.LookUpMemberID : null,
            EmissionsImpactRealizationDate: (vm.businessOption3InfoSelector.EmissionsImpactRealizationDate != null && vm.businessOption3InfoSelector.EmissionsImpactRealizationDate !== "") ? vm.businessOption3InfoSelector.EmissionsImpactRealizationDate : null,
            NoCarbonImpact: (vm.businessOption3InfoSelector.NoCarbonImpact != null && vm.businessOption3InfoSelector.NoCarbonImpact !== "") ? vm.businessOption3InfoSelector.NoCarbonImpact : null,

        };

        listBC_Op1Milestone.push(vm.insertUpdateDeleteMilestone);
        listBC_Op1Op1Risk.push(vm.insertUpdateDeleteRisk);
        listBC_Op1KeySuccess.push(vm.insertUpdateDeleteKeySuccess);
        listBC_Op1Assumption.push(vm.insertUpdateDeleteAssumption);
        listBC_Op1Funding.push(vm.insertUpdateDeleteFunding);
        listBC_Op1WaterWaste.push(vm.insertUpdateDeleteWaterWasteOpt1);
        //listCapsOpt1.push(vm.capsGridOpt1);
        listBusinessCaseInfo.push(vm.businessOptionInfoSelectedData);

        //option2 

        listBC_Op1Milestone2.push(vm.insertUpdateDeleteMilestoneOpt2);
        listBC_Op1Op1Risk2.push(vm.insertUpdateDeleteRiskOpt2);
        listBC_Op1KeySuccess2.push(vm.insertUpdateDeleteKeySuccessOpt2);
        listBC_Op1Assumption2.push(vm.insertUpdateDeleteAssumptionOpt2);
        listBC_Op1Funding2.push(vm.insertUpdateDeleteFundingOpt2);
        listBC_Op1WaterWaste2.push(vm.insertUpdateDeleteWaterWasteOpt2);
        //listCapsOpt2.push(vm.capsGridOpt2);
        listBusinessCaseInfoOpt2.push(vm.businessOption2InfoSelectedData);

        //option3

        listBC_Op1Milestone3.push(vm.insertUpdateDeleteMilestoneOpt3);
        listBC_Op1Op1Risk3.push(vm.insertUpdateDeleteRiskOpt3);
        listBC_Op1KeySuccess3.push(vm.insertUpdateDeleteKeySuccessOpt3);
        listBC_Op1Assumption3.push(vm.insertUpdateDeleteAssumptionOpt3);
        listBC_Op1Funding3.push(vm.insertUpdateDeleteFundingOpt3);
        listBC_Op1WaterWaste3.push(vm.insertUpdateDeleteWaterWasteOpt3);
        //listCapsOpt3.push(vm.capsGridOpt3);
        listBusinessCaseInfoOpt3.push(vm.businessOption3InfoSelectedData);

        listBC_GeneralInfo.push(getBusinessCaseGeneralInfoData());
        var resTopsOpt1 = CreateUpdateTops("gridOption1Tops");
        var resTopsOpt2 = CreateUpdateTops("gridOption2Tops");
        var resTopsOpt3 = CreateUpdateTops("gridOption3Tops");
        var hasError = false;

        var optionIds = clearOptionId1 + "," + clearOptionId2 + "," + clearOptionId3;
        var deleteData = { "ProjectID": vm.SelectedProject.ProjectID, "BusinessOptionID": optionIds };
        $.when(GETPostService.postDataWCFAsync("deleteBusinessCase", deleteData)).then(function (deleteSuccess) {
            var dataToSend = { "ProjectBussinessCaseInfo": JSON.stringify(listBC_GeneralInfo), "ProjectID": vm.SelectedProject.ProjectID, "BusinessOptionID": BusinessCaseOption1, "objRiskIssue": JSON.stringify(listBC_Op1Op1Risk), "objMilestone": JSON.stringify(listBC_Op1Milestone), "objKeySuccess": JSON.stringify(listBC_Op1KeySuccess), "objAssumption": JSON.stringify(listBC_Op1Assumption), "objFunding": JSON.stringify(listBC_Op1Funding), "objCapsEMSource": JSON.stringify(vm.capsGridOpt1), "BusinessCaseOptionInfo": JSON.stringify(listBusinessCaseInfo), "TOPSKPI": JSON.stringify(resTopsOpt1), "userId": currentUserId, "objCapsWaterWaste": JSON.stringify(listBC_Op1WaterWaste) };
            var dataToSendOpt2 = { "ProjectBussinessCaseInfo": "", "ProjectID": vm.SelectedProject.ProjectID, "BusinessOptionID": BusinessCaseOption2, "objRiskIssue": JSON.stringify(listBC_Op1Op1Risk2), "objMilestone": JSON.stringify(listBC_Op1Milestone2), "objKeySuccess": JSON.stringify(listBC_Op1KeySuccess2), "objAssumption": JSON.stringify(listBC_Op1Assumption2), "objFunding": JSON.stringify(listBC_Op1Funding2), "objCapsEMSource": JSON.stringify(vm.capsGridOpt2), "BusinessCaseOptionInfo": JSON.stringify(listBusinessCaseInfoOpt2), "TOPSKPI": JSON.stringify(resTopsOpt2), "userId": currentUserId, "objCapsWaterWaste": JSON.stringify(listBC_Op1WaterWaste2) };
            var dataToSendOpt3 = { "ProjectBussinessCaseInfo": "", "ProjectID": vm.SelectedProject.ProjectID, "BusinessOptionID": BusinessCaseOption3, "objRiskIssue": JSON.stringify(listBC_Op1Op1Risk3), "objMilestone": JSON.stringify(listBC_Op1Milestone3), "objKeySuccess": JSON.stringify(listBC_Op1KeySuccess3), "objAssumption": JSON.stringify(listBC_Op1Assumption3), "objFunding": JSON.stringify(listBC_Op1Funding3), "objCapsEMSource": JSON.stringify(vm.capsGridOpt3), "BusinessCaseOptionInfo": JSON.stringify(listBusinessCaseInfoOpt3), "TOPSKPI": JSON.stringify(resTopsOpt3), "userId": currentUserId, "objCapsWaterWaste": JSON.stringify(listBC_Op1WaterWaste3) };

            $.when(GETPostService.postDataWCFAsync('updateBusinessCase', dataToSend))
                .then(function (response) {
                    $.when(GETPostService.postDataWCFAsync('updateBusinessCase', dataToSendOpt2)).then(function (response2) {
                        $.when(GETPostService.postDataWCFAsync('updateBusinessCase', dataToSendOpt3)).then(function (response3) {
                            if (response == "Success" && response2 == "Success" && response3 == "Success") {
                                bcDataSaved = true;
                                clearOptionId1 = "";
                                clearOptionId2 = "";
                                clearOptionId3 = "";
                                //productMultiplier = vm.businessOptionInfoSelector.ProductMultiplier;

                                getDataForTops();
                                getDataForGrids();


                                alert(saveMessage);
                                hideLoading();
                                $.when(GETPostService.postDataWCFAsync("getProjectNameByID", SeletedProjectId), GETPostService.postDataWCFAsync("getBusinessCaseSchedule", SeletedProjectId))
                                    .then(function (resProjectName) {
                                        try {
                                            var ProjDetail = JSON.parse(resProjectName.getProjectNameByIDResult);
                                            SeletedProjectName = ProjDetail[0].ProjectName;
                                            $rootScope.$emit("UpdateProjectNameHub", SeletedProjectName);
                                            $rootScope.$emit("ProjectHubGetCall", SeletedProjectName);
                                        }
                                        catch (err) {
                                            hideLoading();
                                            var dataToSendErr = {
                                                "method": "SaveBusinessCaseData_getProjectNameByID", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                            };
                                            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                                                .then(function (response) { alert(errormessage) });
                                        }
                                    });
                                $rootScope.$emit("UpdateGeneralInfo", true);
                            }
                            else {
                                hasError = true;
                                getDataForTops();
                                getDataForGrids();
                                hideLoading();
                                alert("Error occurred in Business case data update.");

                            }
                        });
                    });
                    //alert(response);

                });

        });
        //}
    }
    function dropdownSetValue() {
        if (vm.selectedPrimaryProduct != null && vm.selectedPrimaryProduct != "") {
            vm.SelectedProject.PrimaryProductID = vm.selectedPrimaryProduct.LookUpMemberID;
            vm.SelectedProject.PrimaryProductName = vm.selectedPrimaryProduct.LookUpMemberName;
        }
        else {
            vm.SelectedProject.PrimaryProductID = null;
            vm.SelectedProject.PrimaryProductName = null;
        }
        if (vm.ImpactedProductIds != null && vm.ImpactedProductIds.length > 0) {
            vm.SelectedProject.OtherImpactedProducts = vm.ImpactedProductIds.join(",");

        }
        else {
            vm.SelectedProject.OtherImpactedProducts = null;
        }
        if (vm.selectedPortfolioOwner != null && vm.selectedPortfolioOwner != "") {
            vm.SelectedProject.PortfolioOwnerID = vm.selectedPortfolioOwner.LookUpMemberID;
            vm.SelectedProject.PortfolioOwner = vm.selectedPortfolioOwner.LookUpMemberName;
        }
        else {
            vm.SelectedProject.PortfolioOwnerID = null;
            vm.SelectedProject.PortfolioOwner = null;
        }
        if (vm.ExecutionScopeIds != null && vm.ExecutionScopeIds.length > 0) {
            vm.SelectedProject.ExecutionScopeID = vm.ExecutionScopeIds.join(",");
        }
        else {
            vm.SelectedProject.ExecutionScopeID = null;
        }
        if ($("#ddlSponsor").data("kendoComboBox") != null && $("#ddlSponsor").data("kendoComboBox").selectedIndex != -1) {
            vm.SelectedProject.SponsorId = $("#ddlSponsor").data("kendoComboBox").value();
            vm.SelectedProject.SponsorName = $("#ddlSponsor").data("kendoComboBox").text();
        }
        else {
            vm.SelectedProject.SponsorId = null;
            vm.SelectedProject.SponsorName = null;
        }
        if ($("#ddlbusinessCaseAuthor").data("kendoComboBox") != null && $("#ddlbusinessCaseAuthor").data("kendoComboBox").selectedIndex != -1) {
            vm.SelectedProject.BusinessCaseAuthorID = $("#ddlbusinessCaseAuthor").data("kendoComboBox").value();
            vm.SelectedProject.BusinessCaseAuthorName = $("#ddlbusinessCaseAuthor").data("kendoComboBox").text();
        }
        else {
            vm.SelectedProject.BusinessCaseAuthorID = null;
            vm.SelectedProject.BusinessCaseAuthorName = null;
        }
        var AdditionalAuthors = "";

        var multiselect = $("#ddl_GI_AdditionalAuthorsContributor").data("kendoMultiSelect");
        var alreadySearched = multiselect.value();

        if (alreadySearched != null && alreadySearched.length > 0) {
            angular.forEach(alreadySearched, function (item, index) {
                AdditionalAuthors = AdditionalAuthors + "," + item
            });
            AdditionalAuthors = AdditionalAuthors.substring(1, AdditionalAuthors.length);
            vm.SelectedProject.AdditionalAuthorsContributorsID = AdditionalAuthors;
        }
        else {
            vm.SelectedProject.AdditionalAuthorsContributorsID = null;
        }
        //option1

        //vm.businessOptionInfoSelector.ProductMultiplier = productMultiplier;


        if ($("#peopleRating").data("kendoComboBox") != null && ($("#peopleRating").data("kendoComboBox").value() != "" && $("#peopleRating").data("kendoComboBox").value() != null)) {

            vm.businessOptionInfoSelector.People = vm.selectedBCPeopleRating.LookUpMemberName;
            vm.businessOptionInfoSelector.PeopleRatingID = vm.selectedBCPeopleRating.LookUpMemberID;
        }
        else {
            vm.businessOptionInfoSelector.People = null;
            vm.businessOptionInfoSelector.PeopleRatingID = null;
        }
        if ($("#technologyRating").data("kendoComboBox") != null && ($("#technologyRating").data("kendoComboBox").value() != "" && $("#technologyRating").data("kendoComboBox").value() != null)) {

            vm.businessOptionInfoSelector.Technology = vm.selectedBCTechnologyRating.LookUpMemberName;
            vm.businessOptionInfoSelector.TechnologyRatingID = vm.selectedBCTechnologyRating.LookUpMemberID;
        }
        else {
            vm.businessOptionInfoSelector.Technology = null;
            vm.businessOptionInfoSelector.TechnologyRatingID = null;
        }
        if ($("#businessProcessRating").data("kendoComboBox") != null && ($("#businessProcessRating").data("kendoComboBox").value() != "" && $("#businessProcessRating").data("kendoComboBox").value() != null)) {

            vm.businessOptionInfoSelector.BusinessCaseProcess = vm.selectedBCBusinessCaseProcess.LookUpMemberName;
            vm.businessOptionInfoSelector.BusinessCaseProcessID = vm.selectedBCBusinessCaseProcess.LookUpMemberID;
        }
        else {
            vm.businessOptionInfoSelector.BusinessCaseProcess = null;
            vm.businessOptionInfoSelector.BusinessCaseProcessID = null;
        }
        if ($("#manufacturingRating").data("kendoComboBox") != null && ($("#manufacturingRating").data("kendoComboBox").value() != "" && $("#manufacturingRating").data("kendoComboBox").value() != null)) {

            vm.businessOptionInfoSelector.ManufacturingProcess = vm.selectedBCManufacturingProcess.LookUpMemberName;
            vm.businessOptionInfoSelector.ManufacturingProcessID = vm.selectedBCManufacturingProcess.LookUpMemberID;
        }
        else {
            vm.businessOptionInfoSelector.ManufacturingProcess = null;
            vm.businessOptionInfoSelector.ManufacturingProcessID = null;
        }
        if ($("#equipmentRating").data("kendoComboBox") != null && ($("#equipmentRating").data("kendoComboBox").value() != "" && $("#equipmentRating").data("kendoComboBox").value() != null)) {

            vm.businessOptionInfoSelector.Equipment = vm.selectedBCEquipmentRating.LookUpMemberName;
            vm.businessOptionInfoSelector.EquipmentRatingID = vm.selectedBCEquipmentRating.LookUpMemberID;
        }
        else {
            vm.businessOptionInfoSelector.Equipment = null;
            vm.businessOptionInfoSelector.EquipmentRatingID = null;
        }
        if ($("#functions1").data("kendoComboBox") != null && ($("#functions1").data("kendoComboBox").value() != "" && $("#functions1").data("kendoComboBox").value() != null)) {
            vm.businessOptionInfoSelector.FunctionsRequiredID = $("#functions1").data("kendoComboBox").value();
            //vm.businessOptionInfoSelector.OwnerName = $("#functions1").data("kendoComboBox").text();
        }
        if ($("#impactOpt1").data("kendoComboBox") != null && $("#impactOpt1").data("kendoComboBox").value() != null && $("#impactOpt1").data("kendoComboBox").value() != "") {
            vm.businessOptionInfoSelector.ImpactMultiplierID = $("#impactOpt1").data("kendoComboBox").value();
            //vm.businessOptionInfoSelector.OwnerName = $("#functions1").data("kendoComboBox").text();
        }
        if ($("#InlineProductOpt1").data("kendoComboBox") != null && ($("#InlineProductOpt1").data("kendoComboBox").value() != "" && $("#InlineProductOpt1").data("kendoComboBox").value() != null)) {
            vm.businessOptionInfoSelector.InLineProductID = $("#InlineProductOpt1").data("kendoComboBox").value();
            //vm.businessOptionInfoSelector.OwnerName = $("#functions1").data("kendoComboBox").text();
        }
        //option2 
        if ($("#peopleRating2").data("kendoComboBox") != null && ($("#peopleRating2").data("kendoComboBox").value() != "" && $("#peopleRating2").data("kendoComboBox").value() != null)) {

            vm.businessOption2InfoSelector.People = vm.selectedBCPeopleRatingOption2.LookUpMemberName;
            vm.businessOption2InfoSelector.PeopleRatingID = vm.selectedBCPeopleRatingOption2.LookUpMemberID;
        }
        else {
            vm.businessOption2InfoSelector.People = null;
            vm.businessOption2InfoSelector.PeopleRatingID = null;
        }
        if ($("#technologyRating2").data("kendoComboBox") != null && ($("#technologyRating2").data("kendoComboBox").value() != "" && $("#technologyRating2").data("kendoComboBox").value() != null)) {

            vm.businessOption2InfoSelector.Technology = vm.selectedBCTechnologyRatingOption2.LookUpMemberName;
            vm.businessOption2InfoSelector.TechnologyRatingID = vm.selectedBCTechnologyRatingOption2.LookUpMemberID;
        }
        else {
            vm.businessOption2InfoSelector.Technology = null;
            vm.businessOption2InfoSelector.TechnologyRatingID = null;
        }
        if ($("#businessProcessRating2").data("kendoComboBox") != null && ($("#businessProcessRating2").data("kendoComboBox").value() != "" && $("#businessProcessRating2").data("kendoComboBox").value() != null)) {

            vm.businessOption2InfoSelector.BusinessCaseProcess = vm.selectedBCBusinessCaseProcessOption2.LookUpMemberName;
            vm.businessOption2InfoSelector.BusinessCaseProcessID = vm.selectedBCBusinessCaseProcessOption2.LookUpMemberID;
        }
        else {
            vm.businessOption2InfoSelector.BusinessCaseProcess = null;
            vm.businessOption2InfoSelector.BusinessCaseProcessID = null;
        }
        if ($("#manufacturingRating2").data("kendoComboBox") != null && ($("#manufacturingRating2").data("kendoComboBox").value() != "" && $("#manufacturingRating2").data("kendoComboBox").value() != null)) {

            vm.businessOption2InfoSelector.ManufacturingProcess = vm.selectedBCManufacturingProcessoption2.LookUpMemberName;
            vm.businessOption2InfoSelector.ManufacturingProcessID = vm.selectedBCManufacturingProcessoption2.LookUpMemberID;
        }
        else {
            vm.businessOption2InfoSelector.ManufacturingProcess = null;
            vm.businessOption2InfoSelector.ManufacturingProcessID = null;
        }
        if ($("#equipmentRating2").data("kendoComboBox") != null && ($("#equipmentRating2").data("kendoComboBox").value() != "" && $("#equipmentRating2").data("kendoComboBox").value() != null)) {

            vm.businessOption2InfoSelector.Equipment = vm.selectedBCEquipmentRatingOption2.LookUpMemberName;
            vm.businessOption2InfoSelector.EquipmentRatingID = vm.selectedBCEquipmentRatingOption2.LookUpMemberID;
        }
        else {
            vm.businessOption2InfoSelector.Equipment = null;
            vm.businessOption2InfoSelector.EquipmentRatingID = null;
        }
        if ($("#functions2").data("kendoComboBox") != null && ($("#functions2").data("kendoComboBox").value() != "" && $("#functions2").data("kendoComboBox").value() != null)) {
            vm.businessOption2InfoSelector.FunctionsRequiredID = $("#functions2").data("kendoComboBox").value();
        }
        if ($("#impactOpt2").data("kendoComboBox") != null && ($("#impactOpt2").data("kendoComboBox").value() != "" && $("#impactOpt2").data("kendoComboBox").value() != null)) {
            vm.businessOption2InfoSelector.ImpactMultiplierID = $("#impactOpt2").data("kendoComboBox").value();
        }
        if ($("#InlineProductOpt2").data("kendoComboBox") != null && ($("#InlineProductOpt2").data("kendoComboBox").value() != "" && $("#InlineProductOpt2").data("kendoComboBox").value() != null)) {
            vm.businessOption2InfoSelector.InLineProductID = $("#InlineProductOpt2").data("kendoComboBox").value();
        }
        //option3
        if ($("#peopleRating3").data("kendoComboBox") != null && ($("#peopleRating3").data("kendoComboBox").value() != "" && $("#peopleRating3").data("kendoComboBox").value() != null)) {

            vm.businessOption3InfoSelector.People = vm.selectedBCPeopleRatingOption3.LookUpMemberName;
            vm.businessOption3InfoSelector.PeopleRatingID = vm.selectedBCPeopleRatingOption3.LookUpMemberID;
        }
        else {
            vm.businessOption3InfoSelector.People = null;
            vm.businessOption3InfoSelector.PeopleRatingID = null;
        }
        if ($("#technologyRating3").data("kendoComboBox") != null && ($("#technologyRating3").data("kendoComboBox").value() != "" && $("#technologyRating3").data("kendoComboBox").value() != null)) {

            vm.businessOption3InfoSelector.Technology = vm.selectedBCTechnologyRatingOption3.LookUpMemberName;
            vm.businessOption3InfoSelector.TechnologyRatingID = vm.selectedBCTechnologyRatingOption3.LookUpMemberID;
        }
        else {
            vm.businessOption3InfoSelector.Technology = null;
            vm.businessOption3InfoSelector.TechnologyRatingID = null;
        }
        if ($("#businessProcessRating3").data("kendoComboBox") != null && ($("#businessProcessRating3").data("kendoComboBox").value() != "" && $("#businessProcessRating3").data("kendoComboBox").value() != null)) {

            vm.businessOption3InfoSelector.BusinessCaseProcess = vm.selectedBCBusinessCaseProcessOption3.LookUpMemberName;
            vm.businessOption3InfoSelector.BusinessCaseProcessID = vm.selectedBCBusinessCaseProcessOption3.LookUpMemberID;
        }
        else {
            vm.businessOption3InfoSelector.BusinessCaseProcess = null;
            vm.businessOption3InfoSelector.BusinessCaseProcessID = null;
        }
        if ($("#manufacturingRating3").data("kendoComboBox") != null && ($("#manufacturingRating3").data("kendoComboBox").value() != "" && $("#manufacturingRating3").data("kendoComboBox").value() != null)) {

            vm.businessOption3InfoSelector.ManufacturingProcess = vm.selectedBCManufacturingProcessOption3.LookUpMemberName;
            vm.businessOption3InfoSelector.ManufacturingProcessID = vm.selectedBCManufacturingProcessOption3.LookUpMemberID;
        }
        else {
            vm.businessOption3InfoSelector.ManufacturingProcess = null;
            vm.businessOption3InfoSelector.ManufacturingProcessID = null;
        }
        if ($("#equipmentRating3").data("kendoComboBox") != null && ($("#equipmentRating3").data("kendoComboBox").value() != "" && $("#equipmentRating3").data("kendoComboBox").value() != null)) {

            vm.businessOption3InfoSelector.Equipment = vm.selectedBCEquipmentRatingOption3.LookUpMemberName;
            vm.businessOption3InfoSelector.EquipmentRatingID = vm.selectedBCEquipmentRatingOption3.LookUpMemberID;
        }
        else {
            vm.businessOption3InfoSelector.Equipment = null;
            vm.businessOption3InfoSelector.EquipmentRatingID = null;
        }
        if ($("#functions3").data("kendoComboBox") != null && ($("#functions3").data("kendoComboBox").value() != "" && $("#functions3").data("kendoComboBox").value() != null)) {
            vm.businessOption3InfoSelector.FunctionsRequiredID = $("#functions3").data("kendoComboBox").value();
        }
        if ($("#impactOpt3").data("kendoComboBox") != null && ($("#impactOpt3").data("kendoComboBox").value() != "" && $("#impactOpt3").data("kendoComboBox").value() != null)) {
            vm.businessOption3InfoSelector.ImpactMultiplierID = $("#impactOpt3").data("kendoComboBox").value();
        }
        if ($("#InlineProductOpt3").data("kendoComboBox") != null && ($("#InlineProductOpt3").data("kendoComboBox").value() != "" && $("#InlineProductOpt3").data("kendoComboBox").value() != null)) {
            vm.businessOption3InfoSelector.InLineProductID = $("#InlineProductOpt3").data("kendoComboBox").value();
        }
        if (bcDataSaved == true) {
            //option1
            vm.businessOptionInfoSelector.ExecutionStartDate = kendo.toString(kendo.parseDate(vm.businessOptionInfoSelector.ExecutionStartDate), 'MM/dd/yyyy');
            vm.businessOptionInfoSelector.ExecutionEndDate = kendo.toString(kendo.parseDate(vm.businessOptionInfoSelector.ExecutionEndDate), 'MM/dd/yyyy');
            vm.businessOptionInfoSelector.AssetInService = kendo.toString(kendo.parseDate(vm.businessOptionInfoSelector.AssetInService), 'MM/dd/yyyy');
            vm.businessOptionInfoSelector.ProjectSpendStart = kendo.toString(kendo.parseDate(vm.businessOptionInfoSelector.ProjectSpendStart), 'MM/dd/yyyy');

            //option2
            vm.businessOption2InfoSelector.ExecutionStartDate = kendo.toString(kendo.parseDate(vm.businessOption2InfoSelector.ExecutionStartDate), 'MM/dd/yyyy');
            vm.businessOption2InfoSelector.ExecutionEndDate = kendo.toString(kendo.parseDate(vm.businessOption2InfoSelector.ExecutionEndDate), 'MM/dd/yyyy');
            vm.businessOption2InfoSelector.AssetInService = kendo.toString(kendo.parseDate(vm.businessOption2InfoSelector.AssetInService), 'MM/dd/yyyy');
            vm.businessOption2InfoSelector.ProjectSpendStart = kendo.toString(kendo.parseDate(vm.businessOption2InfoSelector.ProjectSpendStart), 'MM/dd/yyyy');

            //option3
            vm.businessOption3InfoSelector.ExecutionStartDate = kendo.toString(kendo.parseDate(vm.businessOption3InfoSelector.ExecutionStartDate), 'MM/dd/yyyy');
            vm.businessOption3InfoSelector.ExecutionEndDate = kendo.toString(kendo.parseDate(vm.businessOption3InfoSelector.ExecutionEndDate), 'MM/dd/yyyy');
            vm.businessOption3InfoSelector.AssetInService = kendo.toString(kendo.parseDate(vm.businessOption3InfoSelector.AssetInService), 'MM/dd/yyyy');
            vm.businessOption3InfoSelector.ProjectSpendStart = kendo.toString(kendo.parseDate(vm.businessOption3InfoSelector.ProjectSpendStart), 'MM/dd/yyyy');
        }
    }
    function InitkendoGridTopsProjectScope() {
        //  vm.qualityGridVisible = true;
        var colProjectScope = [
            {
                field: "ProjectScope",
                title: "ProjectScope",
                hidden: true
            },
             {
                 field: "GroupOrder",
                 title: "GroupOrder",
                 hidden: false
             },
            {
                field: "Category",
                title: "Category"
            }, {
                field: "BaseCase",
                title: "Base Case",
                template: "#= (InCurrency ==1 ) ?  kendo.toString(BaseCase, 'n0')+' '+LocalCurrencyAbb :  kendo.toString(BaseCase, 'n1')#",
                attributes: { "class": "txt-float-R" },
                headerAttributes: { "class": "txt-float-R" }
            },
            {
                field: "HighCase",
                title: "High Case",
                template: "#= (InCurrency ==1 ) ? kendo.toString(HighCase, 'n0')+' '+LocalCurrencyAbb :  kendo.toString(HighCase, 'n1')#",
                attributes: { "class": "txt-float-R" },
                headerAttributes: { "class": "txt-float-R" }
            }];
        var dataSourcePS = new kendo.data.DataSource({
            data: vm.dsProjectScopeData,
            group: {
                field: "ProjectScope",
                compare: function (a, b) {
                    if (a.items[0].GroupOrder === b.items[0].GroupOrder) {
                        return 0;
                    } else if (a.items[0].GroupOrder > b.items[0].GroupOrder) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            },
            //sort: {field: "GroupOrder", dir :"asc"},
            // batch: true,
            schema: {
                model: {
                    //id: "QualityUniqueID",
                    fields: {
                        ProjectScope: { type: "string", hidden: true },
                        Category: { type: "string", editable: false },
                        BaseCase: { type: "number", editable: false },
                        HighCase: { type: "number", editable: false },
                        GroupOrder: { type: "number", editable: false },
                    }
                }
            }
        });
        $("#GridBCTopsProjectScope").kendoGrid({
            dataSource: dataSourcePS,
            columns: colProjectScope
        });


    };
    function InitKendoGridTops() {
        var dsBC_Tops = new kendo.data.DataSource({
            //data: gridTopsData,
            transport: {
                read: function (e) {
                    // on success
                    e.success(gridTopsData1);
                }
            },
            group: {
                field: "ParentKPI",
                compare: function (a, b) {
                    if (a.items[0].GroupOrder === b.items[0].GroupOrder) {
                        return 0;
                    } else if (a.items[0].GroupOrder > b.items[0].GroupOrder) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            },
            sort: { field: "KPIOrder", dir: "asc" },
            schema: {
                model: {
                    id: 'BusinessKPIUniqueID',
                    fields: {
                        KPIName: { type: "string", editable: false },
                        KPIID: { hidden: true },
                        ParentKPI: { hidden: true },
                        LookUpName: { type: "string", defaultValue: "No Impact", editable: vm.isEditable  },
                        KPIOrder: { type: "number", editable: false }
                    }
                }
            }
        });

        $("#gridOption1Tops").kendoGrid({
            dataSource: dsBC_Tops,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: vm.isEditable,

            columns: [
                {
                    field: "KPIName",
                    title: "KPIs",
                    headerAttributes: { "class": "wrap-header" },
                    groupHeaderTemplate: "#= value #"
                },
                {
                    field: "ParentKPI",
                    title: "ParentKPI",
                    hidden: true,
                    groupHeaderTemplate: "#= value #"
                },
                {
                    field: "LookUpValue",
                    title: "KPI Impact",
                    values: topsBulk
                }
            ],
            dataBound: function (e) {
                vm.NoImpactSelected = true;
                var grid = $("#gridOption1Tops").data("kendoGrid");
                var data = this._data.map(function (x) {
                    return x
                });
                if (data.length > 0) {
                    for (var x = 0; x < data.length; x++) {
                        //Get the currently active item
                        var dataItem = data[x].LookUpValue;
                        if (dataItem != topsKPIDefaultValue) {
                            vm.NoImpactSelected = false;
                            $scope.$digest();
                            break;
                        }

                    }
                }
            },
            edit: function (e) {

                if (e.container.find('[name="LookUpValue"]').data('kendoDropDownList') != undefined) {
                    e.container.find('[name="LookUpValue"]').data('kendoDropDownList').bind('change', function () {
                        // IsBaseline = true;
                        // var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                        var grid = $("#gridOption1Tops").data("kendoGrid");
                        var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                        if (dataItem.LookUpValue != topsKPIDefaultValue && vm.NoImpactSelected === true) {
                            vm.NoImpactSelected = false;
                            $scope.$digest();
                        }
                        else if (dataItem.LookUpValue === topsKPIDefaultValue && vm.NoImpactSelected === false) {

                            var data = grid.dataItems();
                            var dataNoKPIDefault = data.filter(function (entry) {
                                return entry.LookUpValue != topsKPIDefaultValue;
                            });
                            if (dataNoKPIDefault.length == 0) {
                                vm.NoImpactSelected = true;
                                $scope.$digest();
                            }
                        }


                    });
                }
            }

        });
    };
    function InitKendoGridTopsOption2() {
        var dsBC_Tops2 = new kendo.data.DataSource({
            //data: gridTopsData,
            transport: {
                read: function (e) {
                    // on success
                    e.success(gridTopsData2);
                }
            },
            group: {
                field: "ParentKPI",
            },
            sort: { field: "KPIOrder", dir: "asc" },
            schema: {
                model: {
                    id: 'BusinessKPIUniqueID',
                    fields: {
                        KPIName: { type: "string", editable: false },
                        KPIID: { hidden: true },
                        ParentKPI: { hidden: true },
                        LookUpName: { type: "string", defaultValue: "No Impact", editable: vm.isEditable  },
                        KPIOrder: { type: "number", editable: false }
                    }
                }
            }
        });

        $("#gridOption2Tops").kendoGrid({
            dataSource: dsBC_Tops2,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: vm.isEditable,

            columns: [
                {
                    field: "KPIName",
                    title: "KPIs",
                    headerAttributes: { "class": "wrap-header" },
                    groupHeaderTemplate: "#= value #"
                },
                {
                    field: "ParentKPI",
                    title: "ParentKPI",
                    hidden: true,
                    groupHeaderTemplate: "#= value #"
                },
                {
                    field: "LookUpValue",
                    title: "KPI Impact",
                    values: topsBulk
                }
            ],
            dataBound: function (e) {
                vm.NoImpactSelected2 = true;
                var grid = $("#gridOption2Tops").data("kendoGrid");
                var data = this._data.map(function (x) {
                    return x
                });
                if (data.length > 0) {
                    for (var x = 0; x < data.length; x++) {
                        //Get the currently active item
                        var dataItem = data[x].LookUpValue;
                        if (dataItem != topsKPIDefaultValue) {
                            vm.NoImpactSelected2 = false;
                            $scope.$digest();
                            break;
                        }

                    }
                }
            },
            edit: function (e) {

                if (e.container.find('[name="LookUpValue"]').data('kendoDropDownList') != undefined) {
                    e.container.find('[name="LookUpValue"]').data('kendoDropDownList').bind('change', function () {
                        // IsBaseline = true;
                        // var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                        var grid = $("#gridOption2Tops").data("kendoGrid");
                        var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                        if (dataItem.LookUpValue != topsKPIDefaultValue && vm.NoImpactSelected2 === true) {
                            vm.NoImpactSelected2 = false;
                            $scope.$digest();
                        }
                        else if (dataItem.LookUpValue === topsKPIDefaultValue && vm.NoImpactSelected2 === false) {

                            var data = grid.dataItems();
                            var dataNoKPIDefault = data.filter(function (entry) {
                                return entry.LookUpValue != topsKPIDefaultValue;
                            });
                            if (dataNoKPIDefault.length == 0) {
                                vm.NoImpactSelected2 = true;
                                $scope.$digest();
                            }
                        }


                    });
                }
            }
        });
    };
    function InitKendoGridTopsOption3() {
        var dsBC_Tops3 = new kendo.data.DataSource({
            //data: gridTopsData,
            transport: {
                read: function (e) {
                    // on success
                    e.success(gridTopsData3);
                }
            },
            group: {
                field: "ParentKPI",
            },
            sort: { field: "KPIOrder", dir: "asc" },
            schema: {
                model: {
                    id: 'BusinessKPIUniqueID',
                    fields: {
                        KPIName: { type: "string", editable: false },
                        KPIID: { hidden: true },
                        ParentKPI: { hidden: true },
                        LookUpName: { type: "string", defaultValue: "No Impact", editable: vm.isEditable  },
                        KPIOrder: { type: "number", editable: false }
                    }
                }
            }
        });

        $("#gridOption3Tops").kendoGrid({
            dataSource: dsBC_Tops3,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: vm.isEditable,

            columns: [
                {
                    field: "KPIName",
                    title: "KPIs",
                    headerAttributes: { "class": "wrap-header" },
                    groupHeaderTemplate: "#= value #"
                },
                {
                    field: "ParentKPI",
                    title: "ParentKPI",
                    hidden: true,
                    groupHeaderTemplate: "#= value #"
                },
                {
                    field: "LookUpValue",
                    title: "KPI Impact",
                    values: topsBulk
                }
            ],
            dataBound: function (e) {
                vm.NoImpactSelected3 = true;
                var grid = $("#gridOption3Tops").data("kendoGrid");
                var data = this._data.map(function (x) {
                    return x
                });
                if (data.length > 0) {
                    for (var x = 0; x < data.length; x++) {
                        //Get the currently active item
                        var dataItem = data[x].LookUpValue;
                        if (dataItem != topsKPIDefaultValue) {
                            vm.NoImpactSelected3 = false;
                            $scope.$digest();
                            break;
                        }

                    }
                }
            },
            edit: function (e) {

                if (e.container.find('[name="LookUpValue"]').data('kendoDropDownList') != undefined) {
                    e.container.find('[name="LookUpValue"]').data('kendoDropDownList').bind('change', function () {
                        // IsBaseline = true;
                        // var variance = SetVariance(e.model.PlannedFinish, e.model.BaselineFinish, e.model.CompletionDate);
                        var grid = $("#gridOption3Tops").data("kendoGrid");
                        var dataItem = grid.dataItem(this.wrapper.parents('tr'));
                        if (dataItem.LookUpValue != topsKPIDefaultValue && vm.NoImpactSelected3 === true) {
                            vm.NoImpactSelected3 = false;
                            $scope.$digest();
                        }
                        else if (dataItem.LookUpValue === topsKPIDefaultValue && vm.NoImpactSelected3 === false) {

                            var data = grid.dataItems();
                            var dataNoKPIDefault = data.filter(function (entry) {
                                return entry.LookUpValue != topsKPIDefaultValue;
                            });
                            if (dataNoKPIDefault.length == 0) {
                                vm.NoImpactSelected3 = true;
                                $scope.$digest();
                            }
                        }


                    });
                }
            }
        });
    };
    function CreateUpdateTops(gridName) {
        var KPIList = [];
        var gridData = $('#' + gridName).data('kendoGrid').dataSource.data()
            .filter(function (x) {
                return x.dirty
            })
            .map(function (x) {
                return x
            });
        angular.forEach(gridData, function (item, index) {
            var temp = {
                BusinessKPIUniqueID: item.id,
                ProjectID: SeletedProjectId,
                KPIID: item.KPIID,
                KPIValueID: item.LookUpValue,

            }
            KPIList.push(temp);
        });
        return KPIList;

    }
    function getDataForGrids() {
        milestoneToAdd = [];
        milestoneToAddBC1 = [];
        milestoneToAddBC2 = [];
        milestoneToAddBC3 = [];
        var dataToSendForMilestoneSet = {
            "ProjectID": SeletedProjectId, "DataType": "BusinessCaseTemplateDetails"
        };
        var dataToSendForMilestoneTemplate = {
            "ProjectID": SeletedProjectId, "DataType": "Template"
        };
        $.when(GETPostService.getDataWCFAsync("getBusinessCaseOptionByProjectID/" + SeletedProjectId), GETPostService.postDataWCFAsync("getBusinessCaseBudgetFunding", SeletedProjectId),
            GETPostService.postDataWCFAsync("getBusinessCaseKeyAssumption", SeletedProjectId), GETPostService.postDataWCFAsync("getBusinessCaseRiskIssue", SeletedProjectId),
            GETPostService.postDataWCFAsync("getGetBusinessCaseKeySuccess", SeletedProjectId), GETPostService.postDataWCFAsync("getBusinessCaseSchedule", SeletedProjectId)
            , GETPostService.postDataWCFAsync("getBusinessCaseCapsDetails", SeletedProjectId), GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneTemplate),
            GETPostService.postDataWCFAsync("getMilestoneSetProjectHub", dataToSendForMilestoneSet), GETPostService.postDataWCFAsync("getBusinessCaseCAPSWaterWasteByProjectID", SeletedProjectId))
            .then(function (resProjectBussinessDate, resBCBudgetFunding, resBCKeyAssumption, resBCRiskIssue, resBCKeySuccess, resBCSchedule, resBusinessCaseCapsData, resMilestoneTemplates, resMilestoneTemplateDetail, resCapsWaterWasteProject) {
                //var projDetails = JSON.parse(resProjectData.getProjectInfoByIDResult);
                try {
                    /**********************START: Getting Milestone Set template and their details****************************/
                    grdMilestoneTemplateBCOpt = JSON.parse(resMilestoneTemplates);
                    grdMilestoneTemplateDetailBCOpt = JSON.parse(resMilestoneTemplateDetail);
                    var dataSource = new kendo.data.DataSource({ data: grdMilestoneTemplateBCOpt });
                    var grid = $('#gridBCOptAddMilestones').data('kendoGrid');
                    dataSource.read();
                    grid.setDataSource(dataSource);

                    var grid1 = $('#gridBCOptAddMilestones2').data('kendoGrid');
                    grid1.setDataSource(dataSource);

                    var grid2 = $('#gridBCOptAddMilestones3').data('kendoGrid');
                    grid2.setDataSource(dataSource);
                    /**********************END: Getting Milestone Set template and their details****************************/

                    /**********************START: Water  and Waste details****************************/

                    var gridCapsDataWaterWasteOpt = JSON.parse(resCapsWaterWasteProject.getBusinessCaseCAPSWaterWasteByProjectIDResult);

                    gridCapsDataWaterWasteOpt1 = (gridCapsDataWaterWasteOpt.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    }))
                    gridCapsDataWaterWasteOpt2 = (gridCapsDataWaterWasteOpt.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    }))
                    gridCapsDataWaterWasteOpt3 = (gridCapsDataWaterWasteOpt.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    }))
                    /**********************END: Water  and Waste details****************************/


                    var projBC_Details = JSON.parse(resProjectBussinessDate.getBusinessCaseOptionByProjectIDResult);
                    vm.businessOptionInfoSelector = (projBC_Details.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    })[0]) != undefined ? projBC_Details.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    })[0] : projBC_Details.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    });
                    vm.businessOption2InfoSelector = (projBC_Details.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    })[0]) != undefined ? projBC_Details.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    })[0] : projBC_Details.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    });
                    vm.businessOption3InfoSelector = (projBC_Details.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    })[0]) != undefined ? projBC_Details.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    })[0] : projBC_Details.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    });
                    if (vm.businessOptionInfoSelector.OpexRequired == true) {
                        vm.showOpex = "1";
                        vm.businessOptionInfoSelector.OpexRequired = true;
                        //vm.showOpexDiv = true;
                    }
                    else {
                        vm.showOpex = "0";
                        vm.businessOptionInfoSelector.OpexRequired = false
                        //vm.showOpexDiv = false;
                    }

                    if (vm.businessOptionInfoSelector.CapexRequired == true) {
                        vm.showCapex = "1";
                        vm.businessOptionInfoSelector.CapexRequired = true;
                        //vm.showCapexDiv = true;
                    }
                    else {
                        vm.showCapex = "0";
                        vm.businessOptionInfoSelector.CapexRequired = false;
                        //vm.showCapexDiv = false;
                    }

                    //option2 & 3
                    if (vm.businessOption2InfoSelector.OpexRequired == true) {
                        vm.showOpexOpt2 = "1";
                        vm.businessOption2InfoSelector.OpexRequired = true;
                        //vm.showOpexDiv = true;
                    }
                    else {
                        vm.showOpexOpt2 = "0";
                        vm.businessOption2InfoSelector.OpexRequired = false
                        //vm.showOpexDiv = false;
                    }

                    if (vm.businessOption2InfoSelector.CapexRequired == true) {
                        vm.showCapexOpt2 = "1";
                        vm.businessOption2InfoSelector.CapexRequired = true;
                        //vm.showCapexDiv = true;
                    }
                    else {
                        vm.showCapexOpt2 = "0";
                        vm.businessOption2InfoSelector.CapexRequired = false;
                        //vm.showCapexDiv = false;
                    }


                    //option3
                    if (vm.businessOption3InfoSelector.OpexRequired == true) {
                        vm.showOpexOpt3 = "1";
                        vm.businessOption3InfoSelector.OpexRequired = true;
                        //vm.showOpexDiv = true;
                    }
                    else {
                        vm.showOpexOpt3 = "0";
                        vm.businessOption3InfoSelector.OpexRequired = false
                        //vm.showOpexDiv = false;
                    }

                    if (vm.businessOption3InfoSelector.CapexRequired == true) {
                        vm.showCapexOpt3 = "1";
                        vm.businessOption3InfoSelector.CapexRequired = true;
                        //vm.showCapexDiv = true;
                    }
                    else {
                        vm.showCapexOpt3 = "0";
                        vm.businessOption3InfoSelector.CapexRequired = false;
                        //vm.showCapexDiv = false;
                    }
                    dsBCBudgetFunding = JSON.parse(resBCBudgetFunding.getBusinessCaseBudgetFundingResult);
                    dsBCKeyAssumption = JSON.parse(resBCKeyAssumption.getBusinessCaseKeyAssumptionResult);
                    dsBCRiskIssue = JSON.parse(resBCRiskIssue.getBusinessCaseRiskIssueResult);
                    dsBCKeySuccess = JSON.parse(resBCKeySuccess.getGetBusinessCaseKeySuccessResult);
                    dsBCSchedule = JSON.parse(resBCSchedule.getBusinessCaseScheduleResult);
                    capsDataBC = JSON.parse(resBusinessCaseCapsData.getBusinessCaseCapsDetailsResult);

                    vm.dsBCScheduleOpt1 = dsBCSchedule.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    });

                    vm.dsBCScheduleOpt2 = dsBCSchedule.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    });
                    vm.dsBCScheduleOpt3 = dsBCSchedule.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    });

                    vm.dsBCKeySuccessOpt1 = dsBCKeySuccess.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    });
                    vm.dsBCKeySuccessOpt2 = dsBCKeySuccess.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    });
                    vm.dsBCKeySuccessOpt3 = dsBCKeySuccess.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    });

                    vm.dsBCRiskIssueOpt1 = dsBCRiskIssue.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    });
                    vm.dsBCRiskIssueOpt2 = dsBCRiskIssue.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    });
                    vm.dsBCRiskIssueOpt3 = dsBCRiskIssue.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    });

                    vm.dsBCKeyAssumptionOpt1 = dsBCKeyAssumption.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    });
                    vm.dsBCKeyAssumptionOpt2 = dsBCKeyAssumption.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    });
                    vm.dsBCKeyAssumptionOpt3 = dsBCKeyAssumption.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    });

                    vm.dsBCBudgetFundingOpt1 = dsBCBudgetFunding.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    });
                    vm.dsBCBudgetFundingOpt2 = dsBCBudgetFunding.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    });
                    vm.dsBCBudgetFundingOpt3 = dsBCBudgetFunding.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    });
                    vm.formattedCalculatedEmissionsImpact1 = kendo.toString(vm.businessOptionInfoSelector.CalculatedEmissionsImpact, "n1");
                    vm.formattedCalculatedEmissionsImpact2 = kendo.toString(vm.businessOption2InfoSelector.CalculatedEmissionsImpact, "n1");
                    vm.formattedCalculatedEmissionsImpact3 = kendo.toString(vm.businessOption3InfoSelector.CalculatedEmissionsImpact, "n1");

                    //if (vm.businessOptionInfoSelector.EmissionPortfolioID != null && vm.businessOptionInfoSelector.EmissionPortfolioID != "") {
                    gridCapsData = capsDataBC.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    });

                    angular.copy(gridCapsData, beforeSaveGriddata);
                    //}
                    //if (vm.businessOption2InfoSelector.EmissionPortfolioID != null && vm.businessOption2InfoSelector.EmissionPortfolioID != "") {

                    gridCapsData2 = capsDataBC.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    });
                    angular.copy(gridCapsData2, beforeSaveGriddata2);
                    //}
                    //if (vm.businessOption3InfoSelector.EmissionPortfolioID != null && vm.businessOption3InfoSelector.EmissionPortfolioID != "") {

                    gridCapsData3 = capsDataBC.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    });
                    angular.copy(gridCapsData3, beforeSaveGriddata3);
                    //}
                    $('#gridBusinessCaseOptTimeline').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseOptAssumption').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseFunding').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseOptKeySuccessCriteria').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseOptRisk').data('kendoGrid').dataSource.read();
                    $('#gridCapsOpt1').data('kendoGrid').dataSource.read();
                    $('#gridCapsWaterWasteOpt1').data('kendoGrid').dataSource.read();

                    $('#gridBusinessCaseOpt2Timeline').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseFundingOption2').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseOptKeySuccessCriteriaOption2').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseOptAssumptionOption2').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseOptRiskOption2').data('kendoGrid').dataSource.read();
                    $('#gridCapsOpt2').data('kendoGrid').dataSource.read();
                    $('#gridCapsWaterWasteOpt2').data('kendoGrid').dataSource.read();

                    $('#gridBusinessCaseOpt3Timeline').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseOptAssumptionOption3').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseOptRiskOption3').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseFundingOption3').data('kendoGrid').dataSource.read();
                    $('#gridBusinessCaseOptKeySuccessCriteriaOption3').data('kendoGrid').dataSource.read();
                    $('#gridCapsOpt3').data('kendoGrid').dataSource.read();
                    $('#gridCapsWaterWasteOpt3').data('kendoGrid').dataSource.read();


                    dropdownSetValue();


                    OriginalBCdata = {};

                    angular.copy(vm.SelectedProject, OriginalBCdata);

                    OriginalbusinessOptionInfoSelector = {};

                    angular.copy(vm.businessOptionInfoSelector, OriginalbusinessOptionInfoSelector);

                    OriginalbusinessOption2InfoSelector = {};

                    angular.copy(vm.businessOption2InfoSelector, OriginalbusinessOption2InfoSelector);

                    OriginalbusinessOption3InfoSelector = {};

                    angular.copy(vm.businessOption3InfoSelector, OriginalbusinessOption3InfoSelector);
                }
                catch (err) {
                    hideLoading();
                    var dataToSend = {
                        "method": "getDataForGrids", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            alert(errormessage);
                        });
                }
            });
    }
    function getDataForTops() {
        //var postdata = "TOPS KPI";
        //var postdata = { "kpi": "TOPS KPI", "ProjectID": SeletedProjectId };
        $.when(GETPostService.postDataWCFAsync("getBusinessCaseTOPSKPI", SeletedProjectId))
            .then(function (resTopsKPI) {
                try {
                    gridTopsData = JSON.parse(resTopsKPI.getBusinessCaseTOPSKPIResult);

                    gridTopsData1 = gridTopsData.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption1;
                    });
                    gridTopsData2 = gridTopsData.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption2;
                    });
                    gridTopsData3 = gridTopsData.filter(function (entry) {
                        return entry.BusinessOptionID == BusinessCaseOption3;
                    });
                    // InitKendoGridTops();
                    $('#gridOption1Tops').data('kendoGrid').dataSource.read();
                    $('#gridOption2Tops').data('kendoGrid').dataSource.read();
                    $('#gridOption3Tops').data('kendoGrid').dataSource.read();
                    $scope.$digest();
                }
                catch (err) {
                    hideLoading();
                    var dataToSend = {
                        "method": "getDataForTops", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            alert(errormessage);
                        });
                }
            });
    };
    function editNumberBC(container, options) {
        $('<input name="' + options.field + '" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox({
                spinners: false,
                decimals: 0,
                format: "n0",
                restrictDecimals: true,
                max: 9999999999,
                min: -9999999999
            });
    };
    function initBusinessCase() {

    };
}