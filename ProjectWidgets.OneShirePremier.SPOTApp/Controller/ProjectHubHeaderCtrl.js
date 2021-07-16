//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('ProjectHubHeaderCtrl', ProjectHubHeaderCtrl)
ProjectHubHeaderCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function ProjectHubHeaderCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;

    // Flag
    vm.OEProjectVisibleSolution = false;
    vm.agileVisible = false;
    // vm.qualityGridVisible = false;
    vm.projectVisible = true;
    vm.programVisible = false;
    vm.isConfidentialVisible = false;
    vm.dateErrorMsg = InValidDateFormat;
    var topsDataSaved = false;
    var generalInfoSave = false;
    var importData = false;
    var dialogbind = false;
    var needHubreload = false;
    var needGeneralInforeload = false;
    var NullValueExist = true;
    var CapsPageLoad = true;
    vm.isEditable = false;
    vm.NoAttribute = false;
    vm.NoImpactSelected = true;
    vm.isPortfolioOwnerEditable = false;

    //vm.noEMSOurceVisible = false;
    vm.isCapsProjectChecked = true;
    vm.dateFormatlabel = dateLabel;
    vm.projectDetailsAndFormsPagepath = projectDetailsAndFormsPagepath;
    vm.noLocalAttribute = noLocalAttribute;
    //vm.noEMSource = noEMSourceMsg;
    vm.onProjectScopeChange = onProjectScopeChange;
    vm.onChangeCarbonImpact = onChangeCarbonImpact;
    vm.capsProjectTooltip = capsProjectTooltip;
    vm.environmentalTootltip = environmentalTootltip;
    //Array
    var gridTopsData = [];
    var gridCapsData = [];
    var gridCapsDataWaterWaste = [];
    var WaterWasteOptions = [];
    var WaterWasteDataSet = [];
    var WaterWasteTypeOptions = [];
    var WaterWasteCategoryOptions = [];
    var deletedWaterWaste = [];
    var topsBulk = [];
    var QualityReferenceBulk = [];
    var dsQualityReference = [];
    var dropdownValueLookupBulk = [];
    var dsProjects = [];
    var gridCapsDataAllPortfolio = [];
    var newValue = {};
    var EMPortfolioValueFirst = {};
    var isCapsDataExist;
    var WaterWasteBulk = [];
    vm.isUnitCost = null;
    vm.isUnitCostWW = null;
    vm.qualityType = [];
    vm.dsOEProjectType = [];
    vm.dsGIProjectType = [];
    vm.dsGIPortfolioOwner = [];
    vm.dsGIPrimaryProduct = [];
    vm.dsGIProgram = [];
    vm.dsGIProject = [];
    vm.dsPrimaryKPI = [];
    var dsGIQualityType = [];
    var programLookupData = [];
    var confidentialProgramData = [];
    var localAttriPeople = [];
    var dsUserPermission = [];
    var beforeSaveGriddata = [];
    var beforeSaveIsUnit = null;
    var beforeSaveEnergy = null;
    vm.dsGIOEProjectType = [];
    //vm.dsGISvpElement = [];
    vm.dsPermission = [];
    vm.dsProjectScopeData = [];
    vm.dsTopsFunctions = [];
    vm.dsTopsImpactMultiplier = [];
    vm.dsTopsInLineProductStrategy = [];
    vm.dsTopsProducts = [];
    vm.deletedQualityData = [];
    vm.localCurrencyAbbrePlaceholder;
    vm.localCurrencyAbbre;
    //String
    vm.SelectedProjectName = SeletedProjectName;
    vm.SelectedProjectID = "";
    vm.buildNo = buildNo;
    vm.releaseDate = releaseDate;

    vm.editDeliverablePagepath = editDeliverablePagepath;
    vm.InitkendoGridQuality = InitkendoGridQuality;
    vm.getDataForTops = getDataForTops;
    vm.getDataForCaps = getDataForCaps;
    vm.updateHubSettings = updateHubSettings;
    vm.businessCase = businessCase;
    vm.projectCharter = projectCharter;
    vm.fundingDeck = fundingDeck;
    vm.projectDashboard = projectDashboard;
    vm.projectDashboardPerformance = projectDashboardPerformance;
    vm.ProjectCloseOutReport = projectCloseOutReport;
    vm.GMSPTProgramDashboard = GMSPTProgramDashboard;
    vm.onEMPortfolioChange = onEMPortfolioChange;
    vm.AddNewRow = AddNewRow;
    var cntBtnClick = 0;
    var valid = true;
    // Objects
    vm.SelectedProject = {};
    vm.selectedPortfolioOwner = {};
    vm.selectedProjectType = {};
    vm.tops = {};
    vm.local = {};
    vm.dsHubSettings = [];
    var gridupdatedDataKey1 = [];
    var className = "ProjectHubHeaderCtrl";
    // Functions
    vm.openModel = openModel;
    vm.initProjectHubHeader = initProjectHubHeader;
    //  vm.InitProject = InitProject;
    vm.saveGIProjectInfoByID = saveGIProjectInfoByID;
    vm.InitkGridHubSettings = InitkGridHubSettings;
    vm.InitkendoGridTopsProjectScope = InitkendoGridTopsProjectScope;
    vm.insertReports = insertReports;
    vm.CreateUpdateTops = CreateUpdateTops;
    vm.CreateUpdateCaps = CreateUpdateCaps;
    vm.AddNewQualityRow = AddNewQualityRow;
    vm.Importdata = Importdata;
    vm.UpdateDate = UpdateDate;
    vm.importDialogClose = importDialogClose;
    vm.bindImportClose = bindImportClose;
    vm.getLocalAttributes = getLocalAttributes;
    vm.saveLocalAttribute = saveLocalAttribute;
    vm.isConfidentialProjectFunc = isConfidentialProjectFunc;
    vm.changeQualityRef = changeQualityRef;
    vm.changeOEProjectType = changeOEProjectType;
    //vm.changeCapsProjectType = changeCapsProjectType;
    vm.changeAgile = changeAgile;
    vm.changePOBOS = changePOBOS;
    vm.changeSiteAssessment = changeSiteAssessment;
    vm.GetProjectScopeDialog = GetProjectScopeDialog;
    vm.onChangeEnergyCostImpact = onChangeEnergyCostImpact;
    vm.onChangeWWCostImpact = onChangeWWCostImpact;
    vm.changeGMSGQLTAnnualMustWin = changeGMSGQLTAnnualMustWin;

    vm.reloadGeneralInfo = reloadGeneralInfo;
    var ProjectListForParent = [];
    //var NonConfProjectList = [];
    var ProjChange = false;
    var originalParentProj = {};
    var SelectedParentProj = {};
    var parentProjChange = false;


    $rootScope.$on("ProjectHubGetCall", function (event, ProjectName) {
        vm.SelectedProjectName = ProjectName;
        vm.UpdateDate(ProjectName);
    });
    $rootScope.$on("UpdateHubLoad", function (event, flag) {
        needHubreload = flag;
    });
    $rootScope.$on("UpdateGeneralInfo", function (event, flag) {
        needGeneralInforeload = flag;
    });

    function AddNewRow(gridName) {
        if (gridName == 'gridCapsWaterWaste') {
            if ($("#" + gridName).data("kendoGrid").dataSource.data().length >= 10) {
                alert(moreThanTenRowsInGrid);
                return
            }
        }
        var gridNew = $("#" + gridName).data("kendoGrid");
        gridNew.addRow();
    };

    function onChangeEnergyCostImpact() {
        if (vm.capsDataInfo.EnergyCostImpactPerYear != null && vm.capsDataInfo.EnergyCostImpactPerYear != "")
            vm.isUnitCost = false;
        else
            vm.isUnitCost = null;
        $scope.$digest();
    }
    function onChangeWWCostImpact() {
        if ((vm.capsDataInfo.EnergyWaterImpactCostPerYear != null && vm.capsDataInfo.EnergyWaterImpactCostPerYear != "") || (vm.capsDataInfo.EnergyWasteImpactCostPerYear != null && vm.capsDataInfo.EnergyWasteImpactCostPerYear != ""))
            vm.isUnitCostWW = false;
        else
            vm.isUnitCostWW = null;
        $scope.$digest();
    }
    function onProjectScopeChange(e) {
        var oldValue = e.sender.value();
        if (!confirm(ProjectScopeMessage)) {
            //$("#ddl_ProjectScope").data("kendoComboBox").value(e.sender.value());

            e.preventDefault();
            $scope.$digest();
            //$(this).dialog("close");           
        }
        else {
            if (e.dataItem.LookUpMemberName != "") {
                vm.selectedScopeData = vm.dsProjectScopeData.filter(function (entry) {
                    return entry.ProjectScope == e.dataItem.LookUpMemberName;
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
                vm.tops.DurationBaseCase = durationData[0].BaseCase;
                vm.tops.DurationHighCase = durationData[0].HighCase;
                vm.tops.PeopleFTEMonthsRequiredBaseCase = peopleData[0].BaseCase;
                vm.tops.PeopleFTEMonthsRequiredHighCase = peopleData[0].HighCase;
                vm.tops.TotalCapExBaseCase = capexData[0].BaseCase;
                vm.tops.TotalCapExHighCase = capexData[0].HighCase;
                vm.tops.TotalNonFTEOpExBaseCase = FTEOpexData[0].BaseCase;
                vm.tops.TotalNonFTEOpExHighCase = FTEOpexData[0].HighCase;
                $scope.$digest();
            }
        }
    }
    function GetProjectScopeDialog() {

        var myWindow = $("#dialogTopsProjectScope");
        //myWindow.kendoWindow({
        //    content: "TopsProjectScope.html",
        //    modal: true,
        //});
        //$.when(GETPostService.getTopsProjectScope()).then(function (response) {
        InitkendoGridTopsProjectScope();
        myWindow.data("kendoWindow").open();

        // });
    }
    function changeQualityRef(value, e) {
        if (value == true)
            vm.SelectedProject.qualityref = true;
        else {

            if (!confirm(qualityGridClearMessage)) {
                e.preventDefault();
            }
            else {
                vm.SelectedProject.qualityref = false;
                if (dsQualityReference.length == 0) {
                    dsQualityReference = [];
                    $('#qualityGrid').data('kendoGrid').dataSource.read();
                }
                else {
                    //vm.deletedQualityData = [];
                    if ($('#qualityGrid').data('kendoGrid') != undefined) {
                        gridupdatedDataKey1 = $('#qualityGrid').data('kendoGrid').dataSource.data();
                        dsQualityReference = [];
                        $('#qualityGrid').data('kendoGrid').dataSource.read();
                    }
                }
            }
        }
    }
    function changeOEProjectType(oeVal, e) {
        if (oeVal == true)
            vm.OEProjectVisibleSolution = true;
        else {

            if (!confirm(oeTypeClearMessage)) {
                e.preventDefault();
            }
            else {
                vm.OEProjectVisibleSolution = false;
                vm.selectedOEProjectType = "";
            }
        }
    }
   
    function changeAgile(agileVal, e) {
        if (agileVal == true)
            vm.agileVisible = true;
        else {

            if (!confirm(agileTypeClearMessage)) {
                e.preventDefault();
            }
            else {
                vm.agileVisible = false;
                vm.selectedAgilePrimaryWorkstream = "";
                vm.agileSecWorkstreamIds = "";
                vm.selectedAgileWave = "";
            }
        }
    }

    function changePOBOS(POBOVal, e) {
        if (POBOVal == true)
            vm.isPOBOSVisible = true;
        else {
            if (!confirm(pOBOSClearMessage)) {
                e.preventDefault();
            }
            else {
                vm.isPOBOSVisible = false;
                vm.SelectedProject.POBOSCategory = "";
            }
        }
    }

    /***Change event for GMSGQLTAnnual***/
    function changeGMSGQLTAnnualMustWin(GMSGQLTAnnualMustWinVal, e){
        if (GMSGQLTAnnualMustWinVal == true)
            vm.IsGMSGQLTAnnualMustWinVisible = true;
        else {
            if (!confirm(GMSGQLTAnnualMustWinClearMessage)) {
                e.preventDefault();
            }
            else {
                vm.IsGMSGQLTAnnualMustWinVisible = false;
                vm.selectedStrategicYear = "";
                vm.selectedAnnualMustWin = "";
            }
        }
    }


    function changeSiteAssessment(SiteAssessmentVal, e) {
        if (SiteAssessmentVal == true)
            vm.isSiteAssessmentVisible = true;
        else {
            if (!confirm(SiteAssessmentClearMessage)) {
                e.preventDefault();
            }
            else {
                vm.isSiteAssessmentVisible = false;
                vm.SelectedProject.SiteAssessmentCategory = "";
            }
        }
    }

    function getLocalAttributes() {
        trackEvent("Project details and forms - Local Attribute tab");
        try {
            var b = [];
            var lookupText = "";
            localAttriPeople = [];
            $.when(GETPostService.postDataWCF("getLocalVariableByProjectId", SeletedProjectId))
                .then(function (resLocalVariable) {

                    vm.local = JSON.parse(resLocalVariable.getLocalVariableByProjectIdResult);
                    if (vm.local.length > 0) {
                        vm.NoAttribute = false;
                        $.each(vm.local, function (index, event) {
                            if (event.LookupName != "") {
                                var events = $.grep(b, function (e) {
                                    return event.LookupName === e.LookupName;
                                });
                                if (events.length === 0) {

                                    b.push(event);
                                    lookupText = lookupText + "," + event.LookupName;

                                }

                            }
                            event.localVariableID = event.DataType == 'People' ? event.LocalVariableValue : "";
                            event.MultilocalVariableIDArray = [];
                            event.LocalVariableValueRangeEnd = "";
                            event.localVariablepplID = [];
                            if (event.DataType == 'People' && event.LocalVariableValue != "") {
                                $.when(GETPostService.postDataWCF("getUserDetailsByIdMultiple", event.LocalVariableValue))
                                    .then(function (resUserDetailsByIdMultiple) {
                                        var pplArray = JSON.parse(resUserDetailsByIdMultiple.getUserDetailsByIdMultipleResult);

                                        //   var pplArray = item.LocalVariableValue.split(',');

                                        angular.forEach(pplArray, function (item1, ind) {
                                            var temp = {
                                            };
                                            temp.text = item1.UserDisplayName;
                                            temp.value = item1.UserADId;
                                            temp.UserDisplayName = item1.UserDisplayName;
                                            temp.UserADId = item1.UserADId;
                                            // temp.UserADId = item1.UserADId
                                            temp.UserCountry = item1.UserCountry,
                                                temp.UserImageUrl = item1.UserImageUrl,
                                                temp.UserEmailAddress = item1.UserEmailAddress,
                                                temp.UserDepartment = item1.UserDepartment,
                                                event.localVariablepplID.push(temp);
                                            event.MultilocalVariableIDArray.push(item1.UserADId);
                                            localAttriPeople.push(temp);
                                        });

                                    });
                            }
                        });
                        //var peopleLocalAttributeTemp = vm.local.filter(function (e) {
                        //    return e.DataType === "People" && e.LocalVariableValue != "";
                        //});
                        //angular.forEach(peopleLocalAttributeTemp, function (item, index) {

                        $.when(GETPostService.postDataWCFAsync("getLookupData", lookupText.substring(1)))
                            .then(function (resLookup) {
                                try {
                                    dropdownValueLookupBulk = JSON.parse(resLookup.getLookupDataResult);
                                    InitkendoGridLocal();
                                    $scope.$digest();
                                }
                                catch (err) {
                                    var dataToSend = {
                                        "method": "getLocalAttributes", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                    };
                                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                        .then(function (response) { alert(errormessage) });
                                }
                            });
                    }
                    else {
                        vm.NoAttribute = true;
                        $scope.$digest();
                    }
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "getLocalAttributes", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };

    function InitkendoGridLocal() {

        var col = [{
            field: "LocalVariableUniqueID",
            title: "LocalVariableUniqueID",
            hidden: true,
        },
        {
            field: "DataType",
            title: "Type",
            hidden: true,
        }, {
            field: "LocalVariableName",
            title: "Local Variable Name",

        }, {
            field: "LocalVariableValue",
            title: "Value",
            template: customTemplate,
            //editor: chooseEditor
        }];
        var dataSource = new kendo.data.DataSource({
            //pageSize: 10,
            data: vm.local,
            //group: {
            //    field: "PortfolioOwner",
            //},
            schema: {
                model: {
                    id: "LocalVariableUniqueID",
                    fields: {
                        LocalVariableUniqueID: { editable: false, nullable: true },
                        LocalVariableName: { type: "string", editable: false },
                        //PortfolioOwner: { type: "string", editable: false },
                        DataType: { type: "string", editable: false },

                    }
                }
            }
        });

        $("#gridLocalAttributes").kendoGrid({
            dataSource: dataSource,
            // groupable: false,
            columns: col,
            // editable: vm.isEditable,
            dataBound: function (e) {
                var grid = this;

                $("#gridLocalAttributes .k-grid-content").on("change", "input.chkbxLocal", function (e) {

                    var grid = $("#gridLocalAttributes").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (dataItem != undefined)
                        dataItem.set("LocalVariableValue", this.checked);

                });
                $("#gridLocalAttributes .k-grid-content").on("change", "input.textbox", function (e) {

                    var grid = $("#gridLocalAttributes").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (dataItem != undefined)
                        dataItem.set("LocalVariableValue", this.value);
                });
                $("#gridLocalAttributes .k-grid-content").on("change", "textarea.multiTextbox", function (e) {
                    var grid = $("#gridLocalAttributes").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (dataItem != undefined)
                        dataItem.set("LocalVariableValue", this.value);
                });

                var ddlsDatePicker = $(".date");
                var ddlsDateValMsg = $(".dateValidationMsg");

                for (var k = 0; k < ddlsDatePicker.length; k++) {
                    var element2 = $(ddlsDatePicker[k]);
                    var row1 = element2.closest("tr");
                    var model1 = grid.dataItem(row1);
                    $(ddlsDatePicker[k]).attr("id", model1.uid.toString());
                    $(ddlsDateValMsg[k]).attr("id", model1.uid.toString() + "Msg");

                    $("#" + model1.uid).kendoDatePicker({ /*numeric settings*/
                        parseFormats: ["MM/dd/yyyy"],
                        placeholder: vm.dateFormatlabel
                    });
                    var validator = $("#" + model1.uid).kendoValidator({
                        rules: {
                            datepicker: function (input) {
                                var value = input.val();
                                if (value != "" && value != "null") {
                                    if (parseDate(value)) {
                                        valid = true;
                                        $("#" + model1.uid + "Msg").hide();
                                        var row = this.element.closest("tr");
                                        var model = grid.dataItem(row);

                                        model.LocalVariableValue = value;
                                    }
                                    else {
                                        $("#" + model1.uid + "Msg").show();
                                        valid = false;
                                    }
                                }
                                else {
                                    $("#" + model1.uid + "Msg").hide();
                                    valid = true;

                                    //var row = this.element.closest("tr");
                                    var model13 = grid.dataItem(this.element.closest("tr"));

                                    model13.LocalVariableValue = "";
                                }
                            }
                        }

                    }).data("kendoValidator");
                }
                $(".numeric").kendoNumericTextBox({
                    format: "n13",
                    decimals: 13,
                    min: 0,
                    restrictDecimals: true,
                    max: 999999999999,
                    change: function (e) {
                        var row = this.element.closest("tr");
                        var model = grid.dataItem(row);

                        model.LocalVariableValue = this.value();
                        model.dirty = true;
                    }
                });
                $(".numeric0").kendoNumericTextBox({
                    format: "n0",
                    decimals: 0,
                    min: 0,
                    restrictDecimals: true,
                    max: 999999999999,
                    change: function (e) {
                        var row = this.element.closest("tr");
                        var model = grid.dataItem(row);

                        model.LocalVariableValue = this.value();
                        model.dirty = true;
                    }
                });
                $(".numeric2").kendoNumericTextBox({
                    format: "n2",
                    decimals: 2,
                    min: 0,
                    restrictDecimals: true,
                    max: 999999999999,
                    change: function (e) {
                        var row = this.element.closest("tr");
                        var model = grid.dataItem(row);

                        model.LocalVariableValue = this.value();
                        model.dirty = true;
                    }
                });
                $(".numeric4").kendoNumericTextBox({
                    format: "n4",
                    decimals: 4,
                    min: 0,
                    restrictDecimals: true,
                    max: 999999999999,
                    change: function (e) {
                        var row = this.element.closest("tr");
                        var model = grid.dataItem(row);

                        model.LocalVariableValue = this.value();
                        model.dirty = true;
                    }
                });
                var ddls = $(".dropdown");

                for (var i = 0; i < ddls.length; i++) {
                    var element = $(ddls[i]);
                    var row = element.closest("tr");
                    var model = grid.dataItem(row);
                    var ddlDataSource;
                    var fieldName;
                    var dropdownDataSource = dropdownValueLookupBulk.filter(function (entry) {
                        return entry.LookUpName == model.LookupName;
                    });
                    ddlDataSource = new kendo.data.DataSource({
                        data: dropdownDataSource
                    });

                    fieldName = "LookUpMemberName";
                    model.MultilocalVariableIDArray = model.LocalVariableValue.split('Þ');
                    var selectedVal = model.MultilocalVariableIDArray

                    element.kendoMultiSelect({
                        valuePrimitive: true, //N.B. this is needed to have correct behavior when the initial value can be null
                        dataTextField: fieldName,
                        dataValueField: fieldName,
                        dataSource: ddlDataSource,
                        value: selectedVal,
                        change: function (e) {
                            var row = this.element.closest("tr");
                            var model = grid.dataItem(row);
                            if (e.sender.dataItem() == null) {
                                model.dirty = true;
                                model.set("LocalVariableValue", "");
                                //   model.set("MultilocalVariableIDArray", [])
                                //model.LocalVariableValue = ""; 
                                //   model.MultilocalVariableIDArray = [];
                                model.set("LocalVariableValue", "");
                                model.MultilocalVariableIDArray = [];
                                $('#gridLocalAttributes').data('kendoGrid').refresh();

                            } else {
                                var d = this.value();
                                var arr = [];
                                model.MultilocalVariableIDArray = [];
                                angular.forEach(d, function (it, index) {
                                    //arr.push(it);
                                    model.MultilocalVariableIDArray.push(it);
                                });
                                // model.set("MultilocalVariableIDArray", arr)
                                var LocVal = model.MultilocalVariableIDArray.join("Þ");
                                model.set("LocalVariableValue", LocVal);
                                model.dirty = true;





                                //if (this.value() && this.select() === -1) {
                                //    model.set("LocalVariableValue", "");
                                //    $('#gridLocalAttributes').data('kendoGrid').refresh();
                                //}
                                //else {
                                //    model.set("LocalVariableValue", this.value());
                                //    model.dirty = true;
                                //}
                            }
                        }
                    });

                }


                var selct = $(".singleselect");

                for (var i = 0; i < selct.length; i++) {
                    var element = $(selct[i]);
                    var row = element.closest("tr");
                    var model = grid.dataItem(row);
                    var ddlDataSource;
                    var fieldName;
                    var dropdownDataSource = dropdownValueLookupBulk.filter(function (entry) {
                        return entry.LookUpName == model.LookupName;
                    });
                    ddlDataSource = new kendo.data.DataSource({
                        data: dropdownDataSource
                    });

                    fieldName = "LookUpMemberName";
                    model.MultilocalVariableIDArray = model.LocalVariableValue;
                    var selectedVal = model.MultilocalVariableIDArray

                    element.kendoComboBox({
                        valuePrimitive: true, //N.B. this is needed to have correct behavior when the initial value can be null
                        dataTextField: fieldName,
                        dataValueField: fieldName,
                        dataSource: ddlDataSource,
                        //value: selectedVal,
                        change: function (e) {

                            var row = this.element.closest("tr");
                            var model = grid.dataItem(row);
                            if (e.sender.dataItem() == null) {
                                model.dirty = true;
                                model.set("LocalVariableValue", "");
                                //model.LocalVariableValue = "";    
                                $('#gridLocalAttributes').data('kendoGrid').refresh();

                            } else {
                                if (this.value() && this.select() === -1) {
                                    model.set("LocalVariableValue", "");
                                    $('#gridLocalAttributes').data('kendoGrid').refresh();
                                }
                                else {
                                    model.set("LocalVariableValue", this.value());
                                    model.dirty = true;





                                    //if (this.value() && this.select() === -1) {
                                    //    model.set("LocalVariableValue", "");
                                    //    $('#gridLocalAttributes').data('kendoGrid').refresh();
                                    //}
                                    //else {
                                    //    model.set("LocalVariableValue", this.value());
                                    //    model.dirty = true;
                                    //}
                                }
                            }
                        }
                    });

                }


                var ddlsPeoples = $(".people");
                for (var j = 0; j < ddlsPeoples.length; j++) {
                    var element1 = $(ddlsPeoples[j]);
                    var row12 = element1.closest("tr");
                    var model12 = grid.dataItem(row12);
                    var SelectedPpl12 = [];
                    var siteUsers12 = model12.localVariablepplID;

                    angular.forEach(siteUsers12, function (itmp, index) {
                        SelectedPpl12.push(itmp.UserADId);
                    })

                    var ddl_ppl = GETPostService.searchPeopleMultiselect(model12.uid, SelectedPpl12, siteUsers12);
                    var multiselectppl = $("#" + model12.uid).data("kendoMultiSelect");

                    multiselectppl.bind("change", function (e) {
                        var value = this.value();
                        var rowppl = this.element.closest("tr");
                        var modelppl = grid.dataItem(rowppl);


                        var arr = [];
                        var selectedPplStr = [];
                        angular.forEach(this.dataItems(), function (it, index) {
                            arr.push(it);
                            selectedPplStr.push(it.UserADId);
                        });

                        modelppl.set("localVariablepplID", arr)
                        modelppl.set("MultilocalVariableIDArray", selectedPplStr)
                        modelppl.dirty = true;
                        // Use the value of the widget
                    });

                }


                var ddlsSinglePeoples = $(".singlePeople");
                for (var j = 0; j < ddlsSinglePeoples.length; j++) {
                    var element1 = $(ddlsSinglePeoples[j]);
                    var row12 = element1.closest("tr");
                    var model12 = grid.dataItem(row12);

                    $(ddlsSinglePeoples[j]).attr("id", model12.uid.toString());

                    $("#" + model12.uid).kendoComboBox({
                        autoBind: false,
                        placeholder: "Select and/or Type to Search",
                        dataTextField: "text",
                        dataValueField: "text",
                        valuePrimitive: true,
                        minLength: 3,

                        filtering: function (e) {
                            e.preventDefault();
                        },
                        filter: "contains",
                        dataSource: localAttriPeople,
                        //   value: model12.localVariablepplID,
                        valueTemplate: '<span class="selected-value" style="background-image:url(#: UserImageUrl#)"></span><span>#: text#</span>',
                        template: "<span class='k-state-default' style=background-image:url(#: UserImageUrl#)></span><span class='k-state-default'><h3>#: text#</h3># if (UserEmailAddress != null) {#<p>#: UserEmailAddress#</p># } if (UserDepartment != null) {# <p><span> #:UserDepartment#</span># }if (UserCountry != null) {# <span>#:UserCountry#</span></p># } #</span>",
                        change: function (e) {
                            var row = this.element.closest("tr");
                            var model = grid.dataItem(row);
                            if (e.sender.dataItem() == null) {
                                model.LocalVariableValue = null;
                                model.dirty = true;
                            } else {
                                model.LocalVariableValue = this.value();
                                model.localVariableID = this.dataItem().value;
                                model.dirty = true;
                            }
                        }
                    });
                    if (localAttriPeople.length == 1) {
                        var sampledValue = $("#" + model12.uid).data("kendoComboBox");
                        sampledValue.value(localAttriPeople[0].text);
                    }
                    else {
                        if (localAttriPeople.length > 1) {
                            var sampledValue1 = $("#" + model12.uid).data("kendoComboBox");
                            sampledValue1.value(model12.LocalVariableValue);
                        }
                    }
                }
                $("#gridLocalAttributes .k-grid-content").on("keydown", "input.singlePeople", function (e) {
                    var grid = $("#gridLocalAttributes").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));

                    //  dataItem.set("LocalVariableValue", this.value);

                    GETPostService.searchPeopleBulkEdit(e, dataItem.uid).then(function (response) {
                        if (response.length > 0) {
                            angular.forEach(response, function (item, index) {
                                var user = localAttriPeople.filter(function (val) {
                                    return val.value === item.UserADId;
                                });
                                if (user.length == 0) {
                                    localAttriPeople.push({
                                        text: item.UserDisplayName, value: item.UserADId, UserCountry: item.UserCountry,
                                        UserImageUrl: item.UserImageUrl, UserEmailAddress: item.UserEmailAddress, UserDepartment: item.UserDepartment
                                    });
                                }
                            });
                            var combobox = $("#" + dataItem.uid).data("kendoComboBox");
                            combobox.setDataSource(localAttriPeople);
                            combobox.dataSource.read();
                            $("#gridLocalAttributes").getKendoGrid().columns[1].values = localAttriPeople;
                        }
                    });

                });

                $scope.$digest();
            }


        });
    };

    function customTemplate(item) {
        if (item == null)
            return "";

        switch (item.DataType) {
            case "Date":
                return "<div class='fullWidthAttributes'><input class='date' value='" + item.LocalVariableValue + "' /><label class='dateValidationMsg' style='display:none;color:red'>" + vm.dateErrorMsg + "</label></div>";//kendo.toString(kendo.parseDate(item.LocalVariableValue), 'MM/dd/yyyy');
            case "Boolean":
                if (item.LocalVariableValue == "true" || item.LocalVariableValue == true)

                    return "<div><input type='checkbox' checked class='chkbxLocal' /></div ";
                else if (item.LocalVariableValue == false || item.LocalVariableValue == "false")

                    return "<div><input type='checkbox' class='chkbxLocal' /></div> ";
                break;
            case "Text":
                switch (item.IsMulti) {
                    case false: return "<div class='fullWidthAttributes'><input class='textbox' value='" + item.LocalVariableValue + "' /></div>";
                    case true: return "<div class='fullWidthAttributes'><textarea style='height:" + (parseInt(item.LineDecimalCount) * 22) + "px;width: 100%;'  class='multiTextbox' value='" + item.LocalVariableValue + "' id='" + item.uid + "'>" + item.LocalVariableValue + "</textarea></div>";
                }
            case "Number":
                switch (item.LineDecimalCount) {
                    case 0: return "<div class='fullWidthAttributes'><input class='numeric0' value='" + item.LocalVariableValue + "' /></div>";
                    case 2: return "<div class='fullWidthAttributes'><input class='numeric2' value='" + item.LocalVariableValue + "' /></div>";
                    case 4: return "<div class='fullWidthAttributes'><input class='numeric4' value='" + item.LocalVariableValue + "' /></div>";
                    default: return "<div class='fullWidthAttributes'><input class='numeric' value='" + item.LocalVariableValue + "' /></div>";

                }
            case "Lookup":
                switch (item.IsMulti) {
                    case false: return "<div class='fullWidthAttributes'><input class='singleselect' value='" + item.LocalVariableValue + "' /></div>";
                    case true: return "<div class='fullWidthAttributes'><input class='dropdown' value='" + item.MultilocalVariableIDArray + "' /></div>";
                }
                //return "<div class='fullWidthAttributes'><input class='dropdown' value='" + item.MultilocalVariableIDArray + "' /></div>";
            case "People":
                switch (item.IsMulti) {
                    case false: return "<div class='fullWidthAttributes'><input class='singlePeople' value='" + item.LocalVariableValue + "' id='" + item.uid + "' /></div>";
                    case true: return "<div class='fullWidthAttributes'><input class='people' value='" + item.localVariablepplID + "' id='" + item.uid + "' /></div>";
                }



            default:
                return item.LocalVariableValue;
        }
    }

    function rebindLocalAttribute() {
        var dataSource = new kendo.data.DataSource({
            //pageSize: 10,
            data: vm.local,
            //group: {
            //    field: "PortfolioOwner",
            //},
            schema: {
                model: {
                    id: "LocalVariableUniqueID",
                    fields: {
                        LocalVariableUniqueID: { editable: false, nullable: true },
                        LocalVariableName: { type: "string", editable: false },
                        //PortfolioOwner: { type: "string", editable: false },
                        DataType: { type: "string", editable: false },

                    }
                }
            }
        });

        var grid = $('#gridLocalAttributes').data('kendoGrid');
        dataSource.read();
        grid.setDataSource(dataSource);
    }

    function saveLocalAttribute() {
        displayLoading();
        try {
            if (!valid) {
                hideLoading();
                return false;
            }

            var gridlocalVariables = $('#gridLocalAttributes').data('kendoGrid').dataSource.data();

            var finalData = [];
            $.each(gridlocalVariables, function (index, item) {
                var updateLocalAttribute = {};
                var ddlValue = "";
                if (item.DataType == "Lookup" && item.IsMulti == true) {
                    angular.forEach(item.MultilocalVariableIDArray, function (Lval, index) {
                        ddlValue = ddlValue + 'Þ' + Lval;
                    })
                    ddlValue = ddlValue.substring(1);
                }
                if (item.DataType == "Lookup" && item.IsMulti == false) {
                    ddlValue = item.LocalVariableValue;
                }
                else if (item.DataType == 'People' && item.IsMulti == true) {
                    angular.forEach(item.MultilocalVariableIDArray, function (Lval, index) {
                        ddlValue = ddlValue + 'Þ' + Lval;
                    })
                    ddlValue = ddlValue.substring(1);
                }
                else if (item.DataType == 'People' && item.IsMulti == false) {

                    ddlValue = item.localVariableID;
                }

                updateLocalAttribute.LocalVariableUniqueID = item.LocalVariableUniqueID;
                //   updateLocalAttribute.ProjectLocalVariableUniqueID = item.ProjectLocalVariableUniqueID;

                updateLocalAttribute.DataType = item.DataType;
                updateLocalAttribute.LocalVariableValue = (item.DataType == 'People' || item.DataType == 'Lookup') ? ddlValue : item.LocalVariableValue;
                finalData.push(updateLocalAttribute);
            });
            var dataToSend = { "ProjectID": SeletedProjectId, "objLocalVariablesData": JSON.stringify(finalData) };
            GETPostService.postDataWCF('insertUpdateLocalVariableByProjectId', dataToSend).then(function (response) {
                if (response == "Success") {
                    //console.log("success");
                    $.when(GETPostService.postDataWCF("getLocalVariableByProjectId", SeletedProjectId))
                        .then(function (resLocalVariable) {
                            vm.local = JSON.parse(resLocalVariable.getLocalVariableByProjectIdResult);
                            if (vm.local.length > 0) {
                                vm.NoAttribute = false;
                                $.each(vm.local, function (index, event) {
                                    //if (event.LookupName != "") {
                                    //    var events = $.grep(b, function (e) {
                                    //        return event.LookupName === e.LookupName;
                                    //    });
                                    //    if (events.length === 0) {
                                    //        b.push(event);
                                    //        lookupText = lookupText + "," + event.LookupName;
                                    //    }
                                    //}
                                    event.localVariableID = event.DataType == 'People' ? event.LocalVariableValue : "";
                                    event.MultilocalVariableIDArray = [];
                                    event.LocalVariableValueRangeEnd = "";
                                    event.localVariablepplID = [];
                                    if (event.DataType == 'People' && event.LocalVariableValue != "") {
                                        $.when(GETPostService.postDataWCF("getUserDetailsByIdMultiple", event.LocalVariableValue))
                                            .then(function (resUserDetailsByIdMultiple) {
                                                var pplArray = JSON.parse(resUserDetailsByIdMultiple.getUserDetailsByIdMultipleResult);
                                                angular.forEach(pplArray, function (item1, ind) {
                                                    var temp = {
                                                    };
                                                    temp.text = item1.UserDisplayName;
                                                    temp.value = item1.UserADId;
                                                    temp.UserDisplayName = item1.UserDisplayName;
                                                    temp.UserADId = item1.UserADId;
                                                    // temp.UserADId = item1.UserADId
                                                    temp.UserCountry = item1.UserCountry,
                                                        temp.UserImageUrl = item1.UserImageUrl,
                                                        temp.UserEmailAddress = item1.UserEmailAddress,
                                                        temp.UserDepartment = item1.UserDepartment,
                                                        event.localVariablepplID.push(temp);
                                                    event.MultilocalVariableIDArray.push(item1.UserADId);
                                                    localAttriPeople.push(temp);
                                                });
                                                rebindLocalAttribute();
                                            });
                                    }

                                });
                                rebindLocalAttribute();
                            }
                            //$('#gridLocalAttributes').data('kendoGrid').refresh();

                            alert(saveMessage);
                            hideLoading();
                        });

                }
                else {
                    hideLoading();

                    alert("Error occurred in Local Attribute Insert/Update");

                }
            });
        }

        catch (err) {
            hideLoading();
            var dataToSendErr = {
                "method": "saveLocalAttribute", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                .then(function (response) { alert(errormessage) });
        }
    };
    function DataTypeDropDownEditor(container, options) {
        $('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                valuePrimitive: true, //N.B. this is needed to have correct behavior when the initial value can be null
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                dataSource: dropdownValueLookupBulk,

            });
        // $("#lookup" + options.field).data("kendoComboBox").value(valuecombo);
        $scope.$digest();
        //   });

        //   }
        if (options.model.Text != null) {
            $('<input type="text" name="' + options.field + '"/>')
                .addClass('k-input k-textbox')
                .appendTo(container);
        }
        if (options.model.Number != null) {
            $('<input type="number" name="' + options.field + '"/>')
                .addClass('k-input k-numerictextbox')
                .appendTo(container);
        }
        if (options.model.Boolean != null) {
            $('<input type="checkbox" name="' + options.field + '" checked="checked"/>')
                .appendTo(container);
        }
    };
    function UpdateDate(ProjectName) {
        $.when(GETPostService.postDataWCF("getPortfolioDeliverablesStatus", SeletedProjectId)).then(function (resPortfolioDeliverableDate) {
            vm.dsDeliverableDate = JSON.parse(resPortfolioDeliverableDate.getPortfolioDeliverablesStatusResult);
            vm.CharterApprovedDate = vm.dsDeliverableDate[0].CharterApprovedDate;
            vm.CharterModifiedDate = vm.dsDeliverableDate[0].CharterModifiedDate;
            vm.BusinessApprovedDate = vm.dsDeliverableDate[0].BusinessApprovedDate;
            vm.BusinessModifiedDate = vm.dsDeliverableDate[0].BusinessModifiedDate;
            vm.CloseOutModifiedDate = vm.dsDeliverableDate[0].CloseoutModifiedDate;
            vm.CloseOutApprovedDate = vm.dsDeliverableDate[0].CloseoutApprovedDate;


            vm.BusinessCaseGeneratedDate = vm.dsDeliverableDate[0].BusinessCaseGeneratedDate;
            vm.FundingDeckGeneratedDate = vm.dsDeliverableDate[0].FundingDeckGeneratedDate;
            vm.PortfolioReportGeneratedDate = vm.dsDeliverableDate[0].PortfolioReportGeneratedDate;
            vm.PortfolioReportPerformanceGeneratedDate = vm.dsDeliverableDate[0].PortfolioReportPerformanceGeneratedDate;
            vm.ProjectCharterGeneratedDate = vm.dsDeliverableDate[0].ProjectCharterGeneratedDate;
            vm.CloseOutGeneratedDate = vm.dsDeliverableDate[0].CloseOutGeneratedDate;
            vm.GMSPTProgramDashboardDate = vm.dsDeliverableDate[0].GMSPTProgramDashboard;

            //SeletedProjectName = ProjectName;
            $scope.$digest();
        })
    };
    function Importdata() {
        trackEvent("Import data");
        var dataToSend = { "ProjectID": SeletedProjectId, "userId": currentUserId };
        GETPostService.postDataWCF('importBuissnessData', dataToSend).then(function (resImportdata) {
            alert(resImportdata);
            importData = true;
            //$("#dialogImportData").closest(".k-window-content").data("kendoWindow").close();
            if (resImportdata == "Data Import Successful")
                window.location.href = projectHubpath + "?ProblemTitle=" + SeletedProjectName + "&ProblemID=" + SeletedProjectId;
        });
    }
    function AddNewQualityRow() {
        var grid1 = $("#qualityGrid").data("kendoGrid");
        grid1.addRow();
    }
    function saveGIProjectInfoByID() {
        try {
            var listdata = [];
            var impObj;
            var exScope;
            var OEType;
            var agileSecondary;
            if (vm.SelectedParentProject == null && vm.SelectedProject.ParentProgramID != null)
                parentProjChange = true;
            else if (vm.SelectedProject != null && vm.SelectedProject != undefined && vm.SelectedParentProject != null) {
                if (vm.SelectedProject.ParentProgramID != vm.SelectedParentProject.ProblemUniqueID)
                    parentProjChange = true;
            }

            if (vm.ExecutionScopeIds != null) {
                exScope = vm.ExecutionScopeIds.join(",");
            }
            if (vm.ImpactedProductIds != null) {
                impObj = vm.ImpactedProductIds.join(",");
            }
            if (vm.selectedOEProjectType != null && vm.selectedOEProjectType != "") {
                OEType = vm.selectedOEProjectType.join(",");
            }
            if (vm.agileSecWorkstreamIds != null && vm.agileSecWorkstreamIds != "") {
                agileSecondary = vm.agileSecWorkstreamIds.join(",");
            }

            vm.qualityInsertListItems = [];
            vm.qualityUpdateListItems = [];

            if ($('#qualityGrid').data('kendoGrid') != undefined) {
                //var gridData = $('#gridProjectCharterMilestone').data('kendoGrid');
                var gridupdatedDataKey = $('#qualityGrid').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });
                var insertQualityArray = gridupdatedDataKey.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateQuaityArray = gridupdatedDataKey.filter(function (x) { return x.id != "" && x.id != null })
                    .map(function (x) { return x });
                angular.forEach(insertQualityArray, function (item, index) {
                    var temp = {};
                    temp.QualityUniqueID = item.QualityUniqueID;
                    temp.QualityReferenceTypeID = item.QualityReferenceTypeID;
                    temp.QualityReference = item.QualityReference;
                    vm.qualityInsertListItems.push(temp);
                });

                angular.forEach(updateQuaityArray, function (item, index) {
                    var temp = {};
                    temp.QualityUniqueID = item.QualityUniqueID;
                    temp.QualityReferenceTypeID = item.QualityReferenceTypeID;
                    temp.QualityReference = item.QualityReference;
                    vm.qualityUpdateListItems.push(temp);
                });

            }
            if (gridupdatedDataKey1.length > 0) {
                vm.deletedQualityData = [];
                // if ($('#qualityGrid').data('kendoGrid') != undefined) {
                //  var gridupdatedDataKey1 = $('#qualityGrid').data('kendoGrid').dataSource.data();
                angular.forEach(gridupdatedDataKey1, function (item, index) {
                    vm.deletedQualityData.push({ "QualityUniqueID": item.QualityUniqueID });
                });
                // }
            }
            vm.insertUpdateDeleteQuality = {
                "insert": vm.qualityInsertListItems,
                "update": vm.qualityUpdateListItems,
                "delete": vm.deletedQualityData
            };

            var listQuality = [];
            listQuality.push(vm.insertUpdateDeleteQuality);
            // vm.SelectedParentProject = $("#ddl_GI_ParentProg").val();

            var prjselect = $("#ddl_GI_ParentProg").data("kendoComboBox");
            if ($("#ddl_GI_ParentProg").data("kendoComboBox").select() === -1) {
                //alert(optionMsg);
                vm.SelectedParentProject = null
                $("#ddl_GI_ParentProg").data("kendoComboBox").value("");
            }
            var pOBOSCategoryList = [];
            var siteAssessmentCategoryList = [];

            if (vm.POBOSCategoryIds != null && vm.POBOSCategoryIds != "") {
                pOBOSCategoryList = vm.POBOSCategoryIds.length > 1 ? vm.POBOSCategoryIds.join(",") : vm.POBOSCategoryIds[0];
            }
            if (vm.SiteAssessmentCategoryIds != null && vm.SiteAssessmentCategoryIds != "") {
                siteAssessmentCategoryList = vm.SiteAssessmentCategoryIds.length > 1 ? vm.SiteAssessmentCategoryIds.join(",") : vm.SiteAssessmentCategoryIds[0];
            }

            // vm.SelectedParentProject = prjselect.value();
            vm.projectSelectorData = {
                IsConfidential: vm.SelectedProject.IsConfidential != null ? vm.SelectedProject.IsConfidential : false,
                ProjectID: vm.SelectedProject.ProjectID,
                ProjectName: vm.SelectedProject.ProjectName != null ? vm.SelectedProject.ProjectName : null,
                PrimaryProductID: vm.selectedPrimaryProduct != null ? vm.selectedPrimaryProduct.LookUpMemberID : null,
                OtherImpactedProducts: impObj != null ? impObj : null,
                ExecutionScopeID: exScope != null ? exScope : null,
                ParentProgramID: (vm.SelectedParentProject != null && vm.SelectedParentProject.ProblemUniqueID != "") ? vm.SelectedParentProject.ProblemUniqueID : null,
                ProjectDescription: vm.SelectedProject.ProjectDescription != null ? vm.SelectedProject.ProjectDescription : null,
                PortfolioOwnerID: vm.selectedPortfolioOwner != null ? vm.selectedPortfolioOwner.LookUpMemberID : null,
                //StrategicRationale: vm.SelectedProject.StrategicRationale != null ? vm.SelectedProject.StrategicRationale : null,
                CampaignTypeID: vm.SelectedProject.IsTechTransfer == true ? (vm.selectedCampaignType != null ? vm.selectedCampaignType.LookUpMemberID : null) : null,
                CampaignPhaseID: vm.SelectedProject.IsTechTransfer == true ? (vm.selectedCampaignPhase != null ? vm.selectedCampaignPhase.LookUpMemberID : null) : null,
                ProductionStepID: vm.SelectedProject.IsTechTransfer == true ? (vm.selectedProductionStep != null ? vm.selectedProductionStep.LookUpMemberID : null) : null,
                IsOEProject: vm.SelectedProject.IsOEProject != null ? vm.SelectedProject.IsOEProject : null,
                OEProjectType: vm.SelectedProject.IsOEProject == true ? (OEType != null ? OEType : null) : null,
                //SVPElementTypeID: vm.selectedSVPElementType != null ? vm.selectedSVPElementType.LookUpMemberID : null,
                //   GovernanceBodyTypeID: vm.SelectedProject.GovernanceBodyTypeID != null ? vm.SelectedProject.GovernanceBodyTypeID : null,
                // ProposalStatement: vm.SelectedProject.ProposalStatement != null ? vm.SelectedProject.ProposalStatement : null,
                //DetailedDescription: vm.SelectedProject.DetailedDescription != null ? vm.SelectedProject.DetailedDescription : null,
                //InScope: vm.SelectedProject.InScope != null ? vm.SelectedProject.InScope : null,
                //OutOfScope: vm.SelectedProject.OutOfScope != null ? vm.SelectedProject.OutOfScope : null,
                IsTechTransfer: vm.SelectedProject.IsTechTransfer,
                ProblemType: vm.selectedProjectType.LookUpMemberID,
                AgilePrimaryWorkstream: (vm.selectedAgilePrimaryWorkstream != null && vm.selectedAgilePrimaryWorkstream != "") ? vm.selectedAgilePrimaryWorkstream.LookUpMemberID : null,
                AgileSecondaryWorkstream: agileSecondary,
                AgileWave: (vm.selectedAgileWave != null && vm.selectedAgileWave != "") ? vm.selectedAgileWave.LookUpMemberID : null,
                IsArchived: vm.SelectedProject.IsArchived,
                IsCapsProject: vm.SelectedProject.IsCapsProject != null ? vm.SelectedProject.IsCapsProject : null,
                EmissionPortfolioID: vm.SelectedEmissionPortfolio != null ? vm.SelectedEmissionPortfolio.LookUpMemberID : null,
                IsGoodPractise: vm.SelectedProject.IsGoodPractise != null ? vm.SelectedProject.IsGoodPractise : null,
                IsPOBOS: vm.SelectedProject.IsPOBOS != null ? vm.SelectedProject.IsPOBOS : null,
                IsSiteAssessment: vm.SelectedProject.IsSiteAssessment != null ? vm.SelectedProject.IsSiteAssessment : null,
                POBOSCategory: vm.POBOSCategoryIds != null ? pOBOSCategoryList : null,
                SiteAssessmentCategory: vm.SiteAssessmentCategoryIds != null ? siteAssessmentCategoryList : null,
                PrimaryKPI: (vm.SelectedPrimaryKPI != null && vm.SelectedPrimaryKPI != "") ? vm.SelectedPrimaryKPI.LookUpMemberID : null,
                IsGMSGQLTAnnualMustWin: vm.SelectedProject.IsGMSGQLTAnnualMustWin != null ? vm.SelectedProject.IsGMSGQLTAnnualMustWin : null,
                StrategicYearID: (vm.selectedStrategicYear != null && vm.selectedStrategicYear != "") ? vm.selectedStrategicYear.LookUpMemberID : null,
                AnnualMustWinID: (vm.selectedAnnualMustWin != null && vm.selectedAnnualMustWin != "") ? vm.selectedAnnualMustWin.LookUpMemberID : null

            };

            listdata.push(vm.projectSelectorData);

            var dataToSend = { "ProjectID": vm.SelectedProject.ProjectID, objQualityData: JSON.stringify(listQuality), "objProjectInfoData": JSON.stringify(listdata), "strUserAdId": currentUserId };


            GETPostService.postDataWCF('updateProjectInfoByID', dataToSend).then(function (response) {
                //alert(response);
                if (response == "Success") {
                    console.log("1");
                    generalInfoSave = true;
                    $rootScope.$emit("UpdateHubSchedule");
                    alert(saveMessageGeneralInfo);
                    $.when(GETPostService.getDataWCF("getQualityReferenceByProjectId/" + SeletedProjectId), GETPostService.getDataWCFAsync("getProjectInfoByID/" + SeletedProjectId))
                        .then(function (resQualityRef, resProjectData) {
                            angular.copy(vm.SelectedParentProject, originalParentProj);

                            var projDetails = JSON.parse(resProjectData.getProjectInfoByIDResult);
                            vm.SelectedProject = projDetails[0];
                            vm.agileVisible = vm.SelectedProject.IsAgile;
                            var selectedCampaignType = [];
                            if (vm.SelectedProject.CampaignTypeID != "") {
                                selectedCampaignType = vm.dsGICampaignType.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedProject.CampaignTypeID;
                                });
                            };
                            vm.selectedCampaignType = selectedCampaignType.length > 0 ? selectedCampaignType[0] : null;

                            var selectedCampaignPhase = [];
                            if (vm.SelectedProject.CampaignPhaseID != "") {
                                selectedCampaignPhase = vm.dsGICampaignPhase.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedProject.CampaignPhaseID;
                                });
                            }
                            vm.selectedCampaignPhase = selectedCampaignPhase.length > 0 ? selectedCampaignPhase[0] : null;

                            var selectedProductionStep = [];
                            if (vm.SelectedProject.ProductionStepID != "") {
                                selectedProductionStep = vm.dsGIProductionStep.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedProject.ProductionStepID;
                                });
                            }
                            vm.selectedProductionStep = selectedProductionStep.length > 0 ? selectedProductionStep[0] : null;

                            var selectedAgilePrimaryWorkstream = [];
                            if (vm.SelectedProject.AgilePrimaryWorkstream != null && vm.SelectedProject.AgilePrimaryWorkstream != "") {
                                selectedAgilePrimaryWorkstream = vm.dsAgilePrimaryWorkstation.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedProject.AgilePrimaryWorkstream;
                                });
                            }
                            vm.selectedAgilePrimaryWorkstream = selectedAgilePrimaryWorkstream.length > 0 ? selectedAgilePrimaryWorkstream[0] : "";

                            var selectedAgileWave = [];
                            if (vm.SelectedProject.AgileWave != null && vm.SelectedProject.AgileWave != "") {
                                selectedAgileWave = vm.dsAgileWave.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedProject.AgileWave;
                                });
                            }
                            vm.selectedAgileWave = selectedAgileWave.length > 0 ? selectedAgileWave[0] : "";

                            var selectedEmissionP = [];
                            if (vm.SelectedProject.EmissionPortfolioID != null && vm.SelectedProject.EmissionPortfolioID != "") {
                                selectedEmissionP = vm.dsEmissionPortfolio.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedProject.EmissionPortfolioID;
                                });
                            }
                            vm.SelectedEmissionPortfolio = selectedEmissionP.length > 0 ? selectedEmissionP[0] : "";
                            newValue = vm.SelectedEmissionPortfolio;
                            EMPortfolioValueFirst = vm.SelectedEmissionPortfolio;
                            isCapsDataExist = vm.SelectedProject.EMDataAssociation;

                            var selectedStrategicYear = [];
                            if (vm.SelectedProject.StrategicYear != null && vm.SelectedProject.StrategicYear != ""){
                                selectedStrategicYear = vm.dsStrategicYear.filter(function (entry) {
                                    return entry.LookUpMemberName == vm.SelectedProject.StrategicYear;
                                });
                            }
                            vm.selectedStrategicYear = selectedStrategicYear.length > 0 ? selectedStrategicYear[0] : "";

                            var selectedAnnualMustWin = [];
                            if (vm.SelectedProject.AnnualMustWin != null && vm.SelectedProject.AnnualMustWin != ""){
                                selectedAnnualMustWin = vm.dsAnnulMustWin.filter(function (entry) {
                                    return entry.LookUpMemberName == vm.SelectedProject.AnnualMustWin;
                                });
                            }
                            vm.selectedAnnualMustWin = selectedAnnualMustWin.length > 0 ? selectedAnnualMustWin[0] : "";

                            var OEProjType = [];
                            //if (vm.SelectedProject.IsOEProject) {
                            if (vm.SelectedProject.OEProjectType != null && vm.SelectedProject.OEProjectType != 'undefined') {
                                OEProjType = vm.SelectedProject.OEProjectType.split(',');
                            }

                            vm.selectedOEProjectType = OEProjType;
                          
                            vm.deletedQualityData = [];
                            dsQualityReference = JSON.parse(resQualityRef.getQualityReferenceByProjectIdResult);
                            $('#qualityGrid').data('kendoGrid').dataSource.read();
                            if (dsQualityReference.length > 0) {
                                vm.SelectedProject.qualityref = true;
                            }
                            else {
                                vm.SelectedProject.qualityref = false;
                            }

                        });
                    $.when(GETPostService.postDataWCF("getProjectNameByID", SeletedProjectId))
                        .then(function (resProjectName) {
                            var ProjDetail = JSON.parse(resProjectName.getProjectNameByIDResult);
                            SeletedProjectName = ProjDetail[0].ProjectName;
                            ProjectSiteUrl = ProjDetail[0].ProjectSiteURL;
                            isConfidentialProject = ProjDetail[0].IsConfidential;
                            $rootScope.$emit("UpdateProjectNameHub", SeletedProjectName);
                            $rootScope.$emit("ProjectHubGetCall", SeletedProjectName);
                            if (ProjectSiteUrl != null) {
                                $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"))
                                    .then(function (resToken) {
                                        var token = resToken.GetTokenForDocumentResult;
                                        $.when(GETPostService.isSiteUniquePermission(token, ProjectSiteUrl))
                                            .then(function (resUniquePerm) {
                                                if (isConfidentialProject == true && resUniquePerm == false) {
                                                    $.when(GETPostService.breakRolePermissionDocumentLibrary(token, ProjectSiteUrl))
                                                        .then(function (resPermission) {
                                                            console.log("break permission on confidential project in Hub Header");
                                                            GETPostService.createSPGroup(token);
                                                        });
                                                }
                                                else if (isConfidentialProject == false && resUniquePerm == true) {
                                                    $.when(GETPostService.resetUniquePermission(token, ProjectSiteUrl))
                                                        .then(function (resResetPerm) {
                                                            console.log("Reset permission on confidential project in Hub Header");
                                                            GETPostService.getGroupIdSPOTPMT(token, true, SelectedProblemId + spGroupSuffix);
                                                        });
                                                }
                                            });


                                    });


                            }

                        });
                    //$("#btn_GI_close").closest(".k-window-content").data("kendoWindow").close();
                }
                else {

                    alert("Error occurred in Project Info Update");
                }
            });

        }
        catch (err) {
            var dataToSendErr = {
                "method": "saveGIProjectInfoByID", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                .then(function (response) { alert(errormessage) });
        }
    };

    function bindImportClose() {
        $("#dialogImportData").data("kendoWindow").bind("close", function (e) {
            if (!importData) {
                if (!confirm(dialogCloseMessage))
                    e.preventDefault();
            }
            else {
                importData = false;
            }
        });
    };
    function importDialogCloseEvent(e) {
        if (!importData) {
            if (!confirm(dialogCloseMessage))
                e.preventDefault();
        }
        else {
            importData = false;
        }
    };
    function importDialogClose(window) {
        $("#" + window).data("kendoWindow").close();
    };
    function DialogCloseEvent(e) {
        //dropdownSetValues();
        if (!topsDataSaved && !generalInfoSave) {


            if (!confirm(dialogCloseMessage))
                e.preventDefault();
            else {
                if (needHubreload) {
                    $rootScope.$emit("ReloadProjectHub");
                }
                if (parentProjChange) {
                    $rootScope.$emit("UpdateAssociatedProject");
                }
            }
        }
        else {
            topsDataSaved = false;
            generalInfoSave = false;
            importData = false;
            if (needHubreload) {
                $rootScope.$emit("ReloadProjectHub");
            }
            if (parentProjChange) {
                $rootScope.$emit("UpdateAssociatedProject");
            }
        }

    };

    function openModel() {
        if (dialogbind == false) {
            $("#dialogPrjDetails").data("kendoWindow").bind("close", function (e) {
                DialogCloseEvent(e);
            });

            dialogbind = true;
        }
        var tabStrip = $("#prjDetailTabStrip").kendoTabStrip().data("kendoTabStrip");

        tabStrip.select("li:first");  // Select by jQuery selector

        prepareDataForProjectDetails();
        bindChangeDatePicker("realizationDate");
        var projectTypeSelectorWindow = $("#dialogPrjDetails");
        projectTypeSelectorWindow.data("kendoWindow").open();
    };
    function isConfidentialProjectFunc() {
        if (!confirm(confProgChangMsg)) {
            vm.SelectedProject.IsConfidential = (!vm.SelectedProject.IsConfidential)

        }
        else {
            vm.SelectedParentProject = {};
            var projCombo = $("#ddl_GI_ParentProg").data("kendoComboBox");
            projCombo.setDataSource([]);
            projCombo.value("");
            needHubreload = true;
        }

    };
    function prepareDataForProjectDetails() {

        try {
            vm.optionsCostImpact = {
                format: "n0",
                decimals: 0,
                restrictDecimals: true
            },
            vm.options = {
                format: "n0",
                decimals: 0,
                min: 0,
                restrictDecimals: true
            },
                vm.optionsCurrency = {
                    format: "n0",
                    decimals: 0,
                    min: 0,
                    restrictDecimals: true
                };
            displayLoading();
            vm.deletedQualityData = [];

            //var d = new Date();
            //console.log("started " + d.toString());
            if (cntBtnClick == 0) {
                vm.isPortfolioOwnerEditable = false;
                var lookup = qualityReferenceType + "," + oeProjectType + "," + portfolioOwner + "," + product + "," + campaignType + "," + campaignPhase + "," + ProductionStep + ',' + executionScope + "," + projectType + "," + agileAttribute + "," + agileWave + "," + projectScope + "," + emissionPortfolio + "," + pOBOSCategory + "," + siteAssessmentCategory + "," + topsPrimaryKpi+ "," + strategicYear + "," + annualMustWin;
                $.when(GETPostService.postDataWCFAsync("getUserPermissionById", currentUserId),
                    GETPostService.getDataWCFAsync("getUserPermissionByProjectUserId/" + currentUserId + "/" + SeletedProjectId),
                    GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.postDataWCFAsync("getTopsProjectScope", SeletedProjectId)
                ).then(function (resUserGroup, resPermission, resLookup, resTopsProjectScopeData) {
                    try {
                        var combobox = $("#ddl_ProjectScope").data("kendoDropDownList");
                        combobox.bind("select", onProjectScopeChange);

                        var EMcombobox = $("#ddl_EmissionPortfolio").data("kendoComboBox");
                        EMcombobox.bind("select", onEMPortfolioChange);
                        var EMcombobox1 = $("#ddl_EmissionPortfolio").data("kendoComboBox");
                        EMcombobox1.bind("change", onEMPortfolioRemove);

                        programLookupData = resLookup.getLookupDataResult;
                        var lookupdata = JSON.parse(resLookup.getLookupDataResult);
                        vm.dsGIPortfolioOwner = lookupdata.filter(function (entry) {
                            return entry.LookUpName == portfolioOwner;
                        });
                        vm.dsGIPrimaryProduct = lookupdata.filter(function (entry) {
                            return entry.LookUpName == product;
                        });

                        //vm.dsGIProjectClassification = lookupdata.filter(function (entry) {
                        //    return entry.LookUpName == CapitalProjectClassification;
                        //});
                        vm.dsGIOEProjectType = lookupdata.filter(function (entry) {
                            return entry.LookUpName == oeProjectType;
                        });

                        dsUserPermission = JSON.parse(resUserGroup.getUserPermissionByIdResult).filter(function (entry) {
                            return entry.Permission == createConfidential;
                        });


                        vm.dsGICampaignType = lookupdata.filter(function (entry) {
                            return entry.LookUpName == campaignType;
                        });
                        vm.dsGICampaignPhase = lookupdata.filter(function (entry) {
                            return entry.LookUpName == campaignPhase;
                        });
                        vm.dsGIProductionStep = lookupdata.filter(function (entry) {
                            return entry.LookUpName == ProductionStep;
                        });
                        dsGIQualityType = lookupdata.filter(function (entry) {
                            return entry.LookUpName == qualityReferenceType;
                        });
                        vm.dsGIExecutionScope = lookupdata.filter(function (entry) {
                            return entry.LookUpName == executionScope;
                        });
                        vm.dsProjectType = lookupdata.filter(function (entry) {
                            return entry.LookUpName == projectType;
                        });
                        vm.dsAgilePrimaryWorkstation = lookupdata.filter(function (entry) {
                            return entry.LookUpName == agileAttribute;
                        });
                        vm.dsAgileWave = lookupdata.filter(function (entry) {
                            return entry.LookUpName == agileWave;
                        });
                        vm.dsProjectScope = lookupdata.filter(function (entry) {
                            return entry.LookUpName == projectScope;
                        });
                        vm.dsEmissionPortfolio = lookupdata.filter(function (entry) {
                            return entry.LookUpName == emissionPortfolio;
                        });
                        vm.dsPOBOSCategory = lookupdata.filter(function (entry) {
                            return entry.LookUpName == pOBOSCategory;
                        });
                        vm.dsSiteAssessmentCategory = lookupdata.filter(function (entry) {
                            return entry.LookUpName == siteAssessmentCategory;
                        });
                        vm.dsGIPrimaryKPI = $filter('orderBy')(lookupdata.filter(function (entry) {
                            return entry.LookUpName == topsPrimaryKpi;
                        }), "LookUpMemberOrder");

                        vm.dsStrategicYear = lookupdata.filter(function (entry){
                            return entry.LookUpName == strategicYear;
                        });
                        vm.dsAnnulMustWin = lookupdata.filter(function (entry){
                            return entry.LookUpName == annualMustWin;
                        });
                        
                        QualityReferenceBulk = [];
                        for (var i = 0; i < dsGIQualityType.length; i++) {
                            var item = {
                                "text": dsGIQualityType[i].LookUpMemberName, "value": dsGIQualityType[i].LookUpMemberID
                            }
                            QualityReferenceBulk.push(item);
                        }
                        vm.dsPermission = JSON.parse(resPermission.getUserPermissionByProjectUserIdResult);

                        vm.dsProjectScopeData = JSON.parse(resTopsProjectScopeData.getTopsProjectScopeResult);

                        if (vm.dsPermission[0].canEdit == true) {
                            vm.isEditable = true;
                        }
                        else vm.isEditable = false;

                        var dsPortfolioOwnerPermission = JSON.parse(resUserGroup.getUserPermissionByIdResult).filter(function (entry) {
                            return entry.Permission == EditPortfolioOwnerPerm;
                        });
                        if (dsPortfolioOwnerPermission.length > 0 && vm.isEditable == true) {
                            canPortfolioOwnerEdit = true;
                            vm.isPortfolioOwnerEditable = canPortfolioOwnerEdit;
                        }
                        else {
                            canPortfolioOwnerEdit = false;
                            vm.isPortfolioOwnerEditable = canPortfolioOwnerEdit;
                        }

                        var d = new Date();
                        console.log("first load before grid binding " + d.toString());

                        InitkendoGridQuality();

                        InitkGridHubSettings();

                        cntBtnClick++;
                        getDataForBinding();
                        //d = new Date();
                        //console.log("complated keerti" + d.toString());
                    }
                    catch (err) {
                        hideLoading();
                        var dataToSend = {
                            "method": "prepareDataForProjectDetails_First", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { alert(errormessage); });
                    }
                });
            }
            else {
                // var lookup = qualityReferenceType + "," + oeProjectType + "," + topsKPI + "," + projectType + ',' + portfolioOwner + "," + product + "," + CapitalProjectClassification + "," + campaignType + "," + campaignPhase + "," + ProductionStep + "," + project + "," + program + ',' + topsFunctionRequired + "," + topsImpactMultiplier + "," + topsInLineProductStrategy + "," + productMaster + ',' + executionScope + ',' + TOPSRecommendedPriorityGroup;
                getDataForBinding();
            }
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "prepareDataForProjectDetails", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage); });
        }
    };
    function getDataForBinding() {
        //var d = new Date();
        //console.log("started getDataBinding" + d.toString());
        vm.UpdateDate(SeletedProjectName);
        var dataToSendForParent = { "ProgramUID": SeletedProjectId, "linkToChild": false };
        $.when(GETPostService.getDataWCFAsync("getProjectInfoByID/" + SeletedProjectId),
            GETPostService.getDataWCFAsync("getQualityReferenceByProjectId/" + SeletedProjectId),
            GETPostService.postDataWCFAsync("getHubSetting", SeletedProjectId),
            //GETPostService.postDataWCFAsync("getPortfolioDeliverablesStatus", SeletedProjectId),
            GETPostService.postDataWCFAsync("getUserConfidentialProject", currentUserId)
            //,GETPostService.postDataWCFAsync("getProjectList", dataToSendForParent)
        )
            .then(function (resProjectData, resQualityRef, resHubSettings, resConfidentialProject
                //, resProgram
            ) {
                //d = new Date();
                //console.log("loaded getDataBinding" + d.toString());
                try {
                    //   confidentialProgramData = resConfidentialProject.getUserConfidentialProjectResult;
                    if (dsUserPermission.length > 0) { vm.isConfidentialVisible = true; }
                    var projDetails = JSON.parse(resProjectData.getProjectInfoByIDResult);
                    vm.SelectedProject = projDetails[0];
                    vm.localCurrencyAbbrePlaceholder = vm.SelectedProject.LocalCurrencyAbbreviation;
                    //LocalCurrencyAbbreviation
                    if (vm.SelectedProject.LocalCurrencyAbbreviation != null)
                        vm.localCurrencyAbbre = "(" + vm.SelectedProject.LocalCurrencyAbbreviation + ")";

                    //OriginalGeneralInfodata = {};

                    //angular.copy(vm.SelectedProject, OriginalGeneralInfodata);

                    vm.recordCreationDate = kendo.toString(kendo.parseDate(vm.SelectedProject.CreatedDate), 'MM/dd/yyyy');
                    if (projDetails[0].ParentProgramID != null && projDetails[0].ParentProgramName != null)
                        dsProjects = [{ "ProblemUniqueID": projDetails[0].ParentProgramID, "ProjectName": projDetails[0].ParentProgramName }];
                    else
                        dsProjects = [];
                    var searchFor = "Parent";
                    var projectUID = SeletedProjectId;
                    var SelectedParentProj = vm.SelectedProject.ParentProgramID;
                    searchProjectParent("ddl_GI_ParentProg", dsProjects, searchFor, projectUID, SelectedParentProj);

                    var selectedParentProj = [];




                    vm.SelectedParentProject = dsProjects[0];//selectedParentProj.length > 0 ? selectedParentProj[0] : "";
                    angular.copy(vm.SelectedParentProject, originalParentProj);



                    vm.SelectedProjectName = SeletedProjectName;
                    vm.OEProjectVisibleSolution = vm.SelectedProject.IsOEProject;
                    vm.agileVisible = vm.SelectedProject.IsAgile;
                    vm.isPOBOSVisible = vm.SelectedProject.IsPOBOS;
                    vm.isSiteAssessmentVisible = vm.SelectedProject.IsSiteAssessment;
                  
                    vm.IsGMSGQLTAnnualMustWinVisible = vm.SelectedProject.IsGMSGQLTAnnualMustWin;

                    vm.dsHubSettings = JSON.parse(resHubSettings.getHubSettingResult);
                    vm.CapsProjectVisible = vm.SelectedProject.IsCapsProject;
                    //vm.dsDeliverableDate = JSON.parse(resPortfolioDeliverableDate.getPortfolioDeliverablesStatusResult);
                    //vm.CharterApprovedDate = vm.dsDeliverableDate[0].CharterApprovedDate;
                    //vm.CharterModifiedDate = vm.dsDeliverableDate[0].CharterModifiedDate;
                    //vm.BusinessApprovedDate = vm.dsDeliverableDate[0].BusinessApprovedDate;
                    //vm.BusinessModifiedDate = vm.dsDeliverableDate[0].BusinessModifiedDate;

                    var selectedProjectType = [];
                    if (vm.SelectedProject.PortfolioOwnerID != null && vm.SelectedProject.PortfolioOwnerID != "") {
                        selectedProjectType = vm.dsProjectType.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.ProblemType;
                        });
                    }
                    vm.selectedProjectType = selectedProjectType.length > 0 ? selectedProjectType[0] : "";


                    var selectedPortfolioOwner = [];
                    if (vm.SelectedProject.PortfolioOwnerID != null && vm.SelectedProject.PortfolioOwnerID != "") {
                        selectedPortfolioOwner = vm.dsGIPortfolioOwner.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.PortfolioOwnerID;
                        });
                    }
                    vm.selectedPortfolioOwner = selectedPortfolioOwner.length > 0 ? selectedPortfolioOwner[0] : "";




                    var selectedPrimaryProduct = [];
                    if (vm.SelectedProject.PrimaryProductID != null && vm.SelectedProject.PrimaryProductID != "") {
                        selectedPrimaryProduct = vm.dsGIPrimaryProduct.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.PrimaryProductID;
                        });
                        //vm.selectedPrimaryProduct = selectedPrimaryProduct[0];
                    }
                    vm.selectedPrimaryProduct = selectedPrimaryProduct.length > 0 ? selectedPrimaryProduct[0] : "";


                    var selectedCampaignType = [];
                    if (vm.SelectedProject.CampaignTypeID != "" && vm.SelectedProject.CampaignTypeID != null) {
                        selectedCampaignType = vm.dsGICampaignType.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.CampaignTypeID;
                        });
                    }
                    vm.selectedCampaignType = selectedCampaignType.length > 0 ? selectedCampaignType[0] : "";


                    var selectedCampaignPhase = [];
                    if (vm.SelectedProject.CampaignPhaseID != "" && vm.SelectedProject.CampaignPhaseID != null) {
                        selectedCampaignPhase = vm.dsGICampaignPhase.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.CampaignPhaseID;
                        });
                    }
                    vm.selectedCampaignPhase = selectedCampaignPhase.length > 0 ? selectedCampaignPhase[0] : "";


                    var selectedProductionStep = [];
                    if (vm.SelectedProject.ProductionStepID != "" && vm.SelectedProject.ProductionStepID != null) {
                        selectedProductionStep = vm.dsGIProductionStep.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.ProductionStepID;
                        });
                    }
                    vm.selectedProductionStep = selectedProductionStep.length > 0 ? selectedProductionStep[0] : "";

                    var selectedAgilePrimaryWorkstream = [];
                    if (vm.SelectedProject.AgilePrimaryWorkstream != null && vm.SelectedProject.AgilePrimaryWorkstream != "") {
                        selectedAgilePrimaryWorkstream = vm.dsAgilePrimaryWorkstation.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.AgilePrimaryWorkstream;
                        });
                    }
                    vm.selectedAgilePrimaryWorkstream = selectedAgilePrimaryWorkstream.length > 0 ? selectedAgilePrimaryWorkstream[0] : "";

                    var selectedAgileWave = [];
                    if (vm.SelectedProject.AgileWave != null && vm.SelectedProject.AgileWave != "") {
                        selectedAgileWave = vm.dsAgileWave.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.AgileWave;
                        });
                    }
                    vm.selectedAgileWave = selectedAgileWave.length > 0 ? selectedAgileWave[0] : "";

                    var selectedPrimaryKPI = [];
                    if (vm.SelectedProject.PrimaryKPI != null && vm.SelectedProject.PrimaryKPI != "") {
                        selectedPrimaryKPI = vm.dsGIPrimaryKPI.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.PrimaryKPI;
                        });
                    }
                    vm.SelectedPrimaryKPI = selectedPrimaryKPI.length > 0 ? selectedPrimaryKPI[0] : "";

                  
    
                    var selectedStrategicYear = [];
                    if (vm.SelectedProject.StrategicYear != null && vm.SelectedProject.StrategicYear != ""){
                        selectedStrategicYear = vm.dsStrategicYear.filter(function (entry){
                            return entry.LookUpMemberName == vm.SelectedProject.StrategicYear;
                        });
                    }
                    vm.selectedStrategicYear = selectedStrategicYear.length > 0 ? selectedStrategicYear[0] : "";


                    var selectedAnnualMustWin = [];
                    if (vm.SelectedProject.AnnualMustWin != null && vm.SelectedProject.AnnualMustWin != ""){
                        selectedAnnualMustWin = vm.dsAnnulMustWin.filter(function (entry){
                            return entry.LookUpMemberName == vm.SelectedProject.AnnualMustWin;
                        });
                    }
                    vm.selectedAnnualMustWin = selectedAnnualMustWin.length > 0 ? selectedAnnualMustWin[0] : "";

                    dsQualityReference = JSON.parse(resQualityRef.getQualityReferenceByProjectIdResult);
                    if (dsQualityReference.length > 0) {
                        vm.SelectedProject.qualityref = true;

                        //  vm.qualityGridVisible = true;
                    }
                    else {
                        vm.SelectedProject.qualityref = false;
                    }

                    var impObj = [];
                    var exScope = [];
                    var OEProjType = [];
                    var POBOSCat = [];
                    var SiteAssessmentCat = [];
                    var agileSecWorkstream = [];
                    if (vm.SelectedProject.OtherImpactedProducts != null && vm.SelectedProject.OtherImpactedProducts != 'undefined') {
                        impObj = vm.SelectedProject.OtherImpactedProducts.split(',');
                    }

                    if (vm.SelectedProject.ExecutionScopeID != null && vm.SelectedProject.ExecutionScopeID != 'undefined') {
                        exScope = vm.SelectedProject.ExecutionScopeID.split(',');
                    }
                    if (vm.SelectedProject.AgileSecondaryWorkstream != null && vm.SelectedProject.AgileSecondaryWorkstream != 'undefined') {
                        agileSecWorkstream = vm.SelectedProject.AgileSecondaryWorkstream.split(',');
                    }

                    if (vm.SelectedProject.POBOSCategory != null && vm.SelectedProject.POBOSCategory != 'undefined') {
                        POBOSCat = vm.SelectedProject.POBOSCategory.split(',');
                    }
                    if (vm.SelectedProject.SiteAssessmentCategory != null && vm.SelectedProject.SiteAssessmentCategory != 'undefined') {
                        SiteAssessmentCat = vm.SelectedProject.SiteAssessmentCategory.split(',');
                    }

                    vm.OEProjectVisibleSolution = vm.SelectedProject.IsOEProject;
                    vm.agileVisible = vm.SelectedProject.IsAgile;
                    vm.isPOBOSVisible = vm.SelectedProject.IsPOBOS;
                    vm.isSiteAssessmentVisible = vm.SelectedProject.IsSiteAssessment;
                 
                    vm.IsGMSGQLTAnnualMustWinVisible = vm.SelectedProject.IsGMSGQLTAnnualMustWin;

                    vm.OETypeOptions = {
                        placeholder: "Select OE Project Type...",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsGIOEProjectType,
                        filter: "contains"
                    };
                    if (vm.SelectedProject.IsOEProject) {
                        if (vm.SelectedProject.OEProjectType != null && vm.SelectedProject.OEProjectType != 'undefined') {
                            OEProjType = vm.SelectedProject.OEProjectType.split(',');
                        }

                        vm.selectedOEProjectType = OEProjType;
                    }

                    var selectedEmissionP = [];
                    if (vm.SelectedProject.EmissionPortfolioID != null && vm.SelectedProject.EmissionPortfolioID != "") {
                        selectedEmissionP = vm.dsEmissionPortfolio.filter(function (entry) {
                            return entry.LookUpMemberID == vm.SelectedProject.EmissionPortfolioID;
                        });
                    }
                    vm.SelectedEmissionPortfolio = selectedEmissionP.length > 0 ? selectedEmissionP[0] : "";
                    newValue = vm.SelectedProject;
                    EMPortfolioValueFirst = vm.SelectedEmissionPortfolio;
                    isCapsDataExist = vm.SelectedProject.EMDataAssociation;

                    vm.ImpactedProductOptions = {
                        placeholder: "Select products...",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsGIPrimaryProduct,
                        filter: "contains"
                    };
                    vm.ImpactedProductIds = impObj;

                    vm.ExecutionScopeOptions = {
                        placeholder: "Select and/or Type to Search",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsGIExecutionScope,
                        filter: "contains"
                    };
                    vm.ExecutionScopeIds = exScope;

                    if (vm.SelectedProject.AgileSecondaryWorkstream != null && vm.SelectedProject.AgileSecondaryWorkstream != 'undefined') {
                        agileSecWorkstream = vm.SelectedProject.AgileSecondaryWorkstream.split(',');
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

                    if (vm.SelectedProject.POBOSCategory != null && vm.SelectedProject.POBOSCategory != 'undefined') {
                        POBOSCat = vm.SelectedProject.POBOSCategory.split(',');
                    }

                    vm.dsPOBOSCategories = {
                        placeholder: "Select and/or Type to Search",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsPOBOSCategory,
                        filter: "contains"
                    };
                    vm.POBOSCategoryIds = POBOSCat;

                    if (vm.SelectedProject.SiteAssessmentCategory != null && vm.SelectedProject.SiteAssessmentCategory != 'undefined') {
                        SiteAssessmentCat = vm.SelectedProject.SiteAssessmentCategory.split(',');
                    }
                    vm.dsSiteAssessmentCategories = {
                        placeholder: "Select and/or Type to Search",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsSiteAssessmentCategory,
                        filter: "contains"
                    };
                    vm.SiteAssessmentCategoryIds = SiteAssessmentCat;

                    disableAllCombo();
                    $('#qualityGrid').data('kendoGrid').dataSource.read();
                    $('#gridHubSettings').data('kendoTreeList').dataSource.read();

                    $scope.$digest();
                    hideLoading();
                    //d = new Date();
                    //console.log("Completed getDataBinding" + d.toString());
                }
                catch (err) {
                    hideLoading();
                    var dataToSendErr = {
                        "method": "getDataForBinding", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                        .then(function (response) { alert(errormessage); });
                }

            });
    };
    
    function disableAllCombo() {


        bindChangeComboBox("ddl_GI_PrimaryProduct");


        bindChangeComboBox("ddl_Tops_ImpactMultiplier");
        bindChangeComboBox("InlineProduct");
        bindChangeComboBox("functions");
        //bindChangeComboBox("ddl_GI_ClassificationDetails");
        // disableComboSearch("ddl_GI_SvpElement");
        bindChangeComboBox("ddl_GI_CampaignType");
        bindChangeComboBox("ddl_GI_CampaignPhase");
        bindChangeComboBox("ddl_GI_ProductionStep");
        bindChangeComboBox("ddl_Tops_RecommendedPriorityGroup");
        bindChangeComboBox("ddl_GI_PortfolioOwnerDetails");
        bindChangeComboBox("ddl_Primary_KPI");
        bindChangeComboBox("primaryWorkstation");
        bindChangeComboBox("agileSecondaryWorkstream");
        bindChangeComboBox("agileWave");
        bindChangeComboBox("ddlSiteAssessment");
        bindChangeComboBox("ddlPROBSCat");
        bindChangeComboBox("ddl_PrimaryKPI");
  
        bindChangeComboBox("strategicYear");
        bindChangeComboBox("annualMustWin");

    }

    function col_ProjectDetailsAndForms_qualityGrid() {
        var col = [];
        col = [{
            field: "QualityReferenceTypeID",
            title: "Quality Reference Type",
            values: QualityReferenceBulk,
            width: "45%",
        }, {
            field: "QualityReference",
            title: "Quality Reference #",
            width: "45%",
        }, {
            field: "QualityUniqueID",
            title: "id",
            hidden: true
        }, {
            hidden: !(vm.isEditable),
            command: [{
                name: " ",
                iconClass: "k-icon k-i-close",
                width: "10%",
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
                            if (data.QualityUniqueID != undefined && data.QualityUniqueID != "")
                                vm.deletedQualityData.push({ "QualityUniqueID": data.QualityUniqueID });
                        }
                        var grid = $("#qualityGrid").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        return col;
    }

    function InitkendoGridQuality() {
        //  vm.qualityGridVisible = true;
        var colQuality = col_ProjectDetailsAndForms_qualityGrid();
        var dataSourceQuality = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    // on success
                    e.success(dsQualityReference);
                }
            },
            // data: dsQualityReference,
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "QualityUniqueID",
                    fields: {
                        QualityUniqueID: { editable: false },
                        QualityReferenceTypeID: { type: "string", editable: vm.isEditable },
                        QualityReference: { type: "string", editable: vm.isEditable },
                    }
                }
            }
        });
        $("#qualityGrid").kendoGrid({
            dataSource: dataSourceQuality,
            columns: colQuality,
            navigatable: true,
            editable: {
                createAt: "bottom"
            }
        });
        if (vm.isEditable) {
            var grid1 = $("#qualityGrid").data("kendoGrid");

            grid1.addRow();
        }

    };

    function InitkendoGridTopsProjectScope() {
        //  vm.qualityGridVisible = true;
        var colProjectScope = [
            {
                field: "ProjectScope",
                title: "ProjectScope",
                hidden: true
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
                attributes: { class: "txt-float-R" },
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

            batch: true,
            schema: {
                model: {
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
        $("#GridTopsProjectScope").kendoGrid({
            dataSource: dataSourcePS,
            columns: colProjectScope,

        });


    };
    function getDataForCaps() {
        vm.isEMPortfolio = false;
        vm.RealizationDateCaps = false;
        deletedWaterWaste = [];
        // gridCapsData = [];
        $.when(GETPostService.postDataWCFAsync("getProjectCapsDetails", SeletedProjectId),
            GETPostService.postDataWCFAsync("getCapsDataByProjectId", SeletedProjectId),
             GETPostService.postDataWCFAsync("getCAPSWaterWasteByProjectID", SeletedProjectId),
             GETPostService.postDataWCFAsync("getCAPSWaterWaste"))
            .then(function (resCapsData, resCapsProject, resCapsWaterWasteProject, resCapsWaterWasteStream) {
                try {
                    gridCapsDataAllPortfolio = JSON.parse(resCapsData.getProjectCapsDetailsResult);
                    var capsData = JSON.parse(resCapsProject.getCapsDataByProjectIdResult);
                    vm.capsDataInfo = capsData[0];
                    /*********************------------START: Water and Waste-----------------*********************/
                    gridCapsDataWaterWaste = JSON.parse(resCapsWaterWasteProject.getCAPSWaterWasteByProjectIDResult);
                    WaterWasteDataSet = JSON.parse(resCapsWaterWasteStream.getCAPSWaterWasteResult);

                    WaterWasteOptions = Array.from(new Set(WaterWasteDataSet.map((item) => item.WWStream)))
                    WaterWasteTypeOptions = Array.from(new Set(WaterWasteDataSet.map((item) => item.WWType)))
                    WaterWasteCategoryOptions = Array.from(new Set(WaterWasteDataSet.map((item) => item.Category)))
                    vm.isUnitCostWW = vm.capsDataInfo.isUnitCostWW;
                    /*********************------------END: Water and Waste-----------------*********************/
               
                    var unitCostExist = vm.capsDataInfo.isUnitCost;
                    vm.isUnitCost = vm.capsDataInfo.isUnitCost;
                  
                    var selectedEmissionPCaps = [];
                    if (vm.capsDataInfo.EmissionPortfolioID != null && vm.capsDataInfo.EmissionPortfolioID != "") {
                        selectedEmissionPCaps = vm.dsEmissionPortfolio.filter(function (entry) {
                            return entry.LookUpMemberID == vm.capsDataInfo.EmissionPortfolioID;
                        });
                        vm.isEMPortfolio = true;
                    }
                    else {
                        vm.isEMPortfolio = false;
                    }
                    vm.SelectedCapsEmissionPortfolio = selectedEmissionPCaps.length > 0 ? selectedEmissionPCaps[0] : "";
                    //if (vm.capsDataInfo.EmissionPortfolioID != null && vm.capsDataInfo.EmissionPortfolioID != "") {
                    gridCapsData = gridCapsDataAllPortfolio.filter(function (entry) {
                        return entry.EMPortfolioOwnerID == vm.capsDataInfo.EmissionPortfolioID;
                    });
                    angular.copy(gridCapsData, beforeSaveGriddata);
                    beforeSaveIsUnit = vm.isUnitCost;
                 
                    beforeSaveEnergy = vm.capsDataInfo.EnergyCostImpactPerYear;
                    
                    vm.formattedCalculated = kendo.toString(vm.capsDataInfo.CalculatedEmissionsImpact, "n1");
                    InitKendoGridCaps();
                    if (CapsPageLoad == true) {
                        
                        CapsPageLoad=false;
                        InitKendoGridCapsWaterWaste();
                    }
                    else {
                        $('#gridCapsWaterWaste').data('kendoGrid').dataSource.read();
                    }


                    //var gridNew = $("#gridCapsWaterWaste").data("kendoGrid");
                    //gridNew.addRow();
                    //if (gridCapsDataWaterWaste.length==0)
                    //AddNewRow('gridCapsWaterWaste');

                    $scope.$digest();
                }
                catch (err) {
                    var dataToSend = {
                        "method": "getDataForCaps", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) { alert(errormessage) });
                }
            });
    }
    function getDataForTops() {
        trackEvent("Project details and forms - Tops tab");
        var d = new Date();
        console.log("tops started" + d.toString());
        try {
            var lookup = topsKPI + "," + topsFunctionRequired + "," + topsImpactMultiplier + "," + topsInLineProductStrategy + ',' + TOPSRecommendedPriorityGroup + "," + topsPrimaryKpi;

            var postdata = { "kpi": "TOPS KPI", "ProjectID": SeletedProjectId };
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.postDataWCFAsync("getKPIData", postdata),
                GETPostService.postDataWCFAsync("getProjectTOPS", SeletedProjectId))
                .then(function (resLookup, resTopsKPI, resTops) {
                    try {
                        var jsonLookupData = JSON.parse(resLookup.getLookupDataResult);
                        vm.dsTopsRecommendedPriorityGroup = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName == TOPSRecommendedPriorityGroup;
                        });

                        vm.dsTopsFunctions = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName == topsFunctionRequired;
                        });
                        vm.dsTopsImpactMultiplier = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName == topsImpactMultiplier;
                        });
                        vm.dsTopsInLineProductStrategy = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName == topsInLineProductStrategy;
                        });
                        //  $filter('orderBy'),, "LookUpMemberOrder")
                        vm.dsPrimaryKPI = $filter('orderBy')(jsonLookupData.filter(function (entry) {
                            return entry.LookUpName == topsPrimaryKpi;
                        }), "LookUpMemberOrder");

                        topsBulk = [];
                        var topsList = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName == topsKPI;
                        });
                        for (var i = 0; i < topsList.length; i++) {
                            var item = {
                                "text": topsList[i].LookUpMemberName, "value": topsList[i].LookUpMemberID
                            }
                            topsBulk.push(item);
                        }

                        gridTopsData = JSON.parse(resTopsKPI.getKPIDataResult);
                        var topsData = JSON.parse(resTops.getProjectTOPSResult);
                        if (topsData.length > 0) {
                            vm.tops = topsData[0];
                            var selectedTopsFunctions = [];
                            if (vm.tops.FunctionsRequiredID != null) {
                                selectedTopsFunctions = vm.dsTopsFunctions.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.tops.FunctionsRequiredID;
                                });
                            }
                            vm.tops.FunctionsRequiredID = selectedTopsFunctions.length > 0 ? selectedTopsFunctions[0] : "";

                            if (vm.tops.ProjectScope != null) {
                                var selectedTopsProjectScope = vm.dsProjectScope.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.tops.ProjectScope;
                                });
                            }
                            vm.tops.ProjectScope = (vm.tops.ProjectScope != null && vm.tops.ProjectScope != "") ? selectedTopsProjectScope[0] : null;

                            //if (vm.tops.ProductID != null) {
                            //    var selectedTopsProduct = vm.dsTopsProducts.filter(function (entry) {
                            //        return entry.LookUpMemberID == vm.tops.ProductID;
                            //    });
                            //    vm.tops.ProductID = selectedTopsProduct[0];
                            //}
                            var selectedRecommendedPriorityGroupID = [];
                            if (vm.tops.TOPSRecommendedPriorityGroupID != null && vm.tops.TOPSRecommendedPriorityGroupID != "") {
                                selectedRecommendedPriorityGroupID = vm.dsTopsRecommendedPriorityGroup.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.tops.TOPSRecommendedPriorityGroupID;
                                });
                            }
                            vm.tops.TOPSRecommendedPriorityGroupID = selectedRecommendedPriorityGroupID.length > 0 ? selectedRecommendedPriorityGroupID[0] : "";

                            var selectedTopsProduct = [];
                            if (vm.tops.InLineProductStrategyID != null) {
                                selectedTopsProduct = vm.dsTopsInLineProductStrategy.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.tops.InLineProductStrategyID;
                                });
                            }
                            vm.tops.InLineProductStrategyID = (vm.tops.InLineProductStrategyID != null && vm.tops.InLineProductStrategyID != "") ? selectedTopsProduct[0] : "";

                            var selectedTopsPrimaryKPI = [];
                            if (vm.tops.PrimaryKPI != null) {
                                selectedTopsPrimaryKPI = vm.dsPrimaryKPI.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.tops.PrimaryKPI;
                                });
                            }
                            vm.tops.PrimaryKPI = (vm.tops.PrimaryKPI != null && vm.tops.PrimaryKPI != "") ? selectedTopsPrimaryKPI[0] : "";


                            var selectedTopsMultiplier = [];
                            if (vm.tops.ImpactMultiplierID != null) {
                                selectedTopsMultiplier = vm.dsTopsImpactMultiplier.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.tops.ImpactMultiplierID;
                                });
                                //   vm.tops.ImpactMultiplierID = selectedTopsMultiplier[0];
                            }
                            vm.tops.ImpactMultiplierID = selectedTopsMultiplier.length > 0 ? selectedTopsMultiplier[0] : "";

                        }
                        //var dataSource = new kendo.data.DataSource({ data: gridTopsData });
                        //var grid = $('#gridTops').data('kendoGrid');
                        // dataSource.read();
                        //grid.setDataSource(da InitKendoGridTops();
                        InitKendoGridTops();

                        // $('#gridTops').data('kendoGrid').dataSource.read();
                        $scope.$digest();
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "getDataForTops", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { alert(errormessage) });
                    }
                    d = new Date();
                    console.log("tops loaded" + d.toString());
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "getDataForTops", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
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

        $("#gridCaps").kendoGrid({
            dataSource: dsCaps,
            groupable: false,
            sortable: true,
            //batch: true,
            editable: vm.isEditable,
            edit: function (e) {

                if (vm.capsDataInfo.NoCarbonImpact == true) {
                    $('#gridCaps').data("kendoGrid").closeCell();
                }
                var grid = this;
                var fieldName = grid.columns[e.container.index()].field;
                if (e.container.find('[name="UnitCost"]').length > 0) {
                    e.container.find('[name="UnitCost"]').data('kendoNumericTextBox').bind('change', function () {
                        NullValueExist = true;

                        if (fieldName == "UnitCost") {
                            var grid1 = $("#gridCaps").data("kendoGrid");
                            var data = grid1.dataSource.data();


                            var gridupdatedDataKey3 = $('#gridCaps').data('kendoGrid').dataSource.data();


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
                                vm.capsDataInfo.EnergyCostImpactPerYear = 0;
                            }
                        }
                        $scope.$digest();
                    });
                }
                //$("#gridCaps").find('table tr td:nth-child(4)').unbind("click").bind("change", function (e) {


                //    }


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
                    headerTemplate: '<div>Unit Cost <span>(' + vm.capsDataInfo.LocalCurrencyAbbreviation + ')</span><span title="Input the cost of each energy unit using up to 4 decimal places, positive values only." class="k-icon k-i-question"></span></div>',
                    editor: editNumberCost,
                    format: "{0:n4}",
                    //     validation: { min: 1},
                    editable: function (dataItem) {
                        return vm.isUnitCost == null ? true : vm.isUnitCost;
                        // var custom = vm.capsDataInfo.EnergyCostImpactPerYear;
                        //  return custom === '' || custom === 0 || custom == null;
                    }
                },
                {
                    field: "EMBasisOfEstimate",
                    title: "Basis of Estimate",
                    width: "13%",
                    // values: topsBulk
                }
            ]
        });
       


    };
    function InitKendoGridCapsWaterWaste() {


        var dsCapsWaterWaste = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(gridCapsDataWaterWaste);
                }
            },
            sort: [{field: "WWStream", dir: "asc"},
                {field: "WWType", dir: "asc"},
                {field: "Category", dir: "asc"}],
            schema: {
                model: {
                    id: 'EMDataWWID',
                    fields: {
                        EMDataWWID: { hidden: true },
                        WWStream: { type: "string", editable: vm.isEditable  },
                        EMWWUnit: { type: "number", validation: { maxlength: 10 }, editable: vm.isEditable  },
                        StandardUoM: { type: "string", editable: false },
                        UnitCost: {
                            type: "number", editable: vm.isEditable , defaultValue: null
                            //validation: { min: 0 } //It is not working as we have editor defined to make the value positive only we have updated the min value in editor
                        },
                        WWType: { type: "string", editable: vm.isEditable  },
                        Category: { type: "string", editable: vm.isEditable  },
                        EMBasisOfEstimate: { type: "string", editable: vm.isEditable  }
                    }
                }
            }
        });
        $("#gridCapsWaterWaste").kendoGrid({
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
                            //var grid1 = $("#gridCapsWaterWaste").data("kendoGrid");
                            //var data = grid1.dataSource.data();


                            var gridupdatedDataKey3 = $('#gridCapsWaterWaste').data('kendoGrid').dataSource.data();


                            angular.forEach(gridupdatedDataKey3, function (item, index) {
                                if (item.UnitCost != null) {
                                    NullValueExist = false;
                                    return;
                                    //vm.isUnitCost = true;
                                }

                            });
                            if (!NullValueExist)
                                vm.isUnitCostWW = true;
                            else {
                                vm.isUnitCostWW = null;
                                vm.capsDataInfo.EnergyWaterImpactCostPerYear = 0;
                                vm.capsDataInfo.EnergyWasteImpactCostPerYear = 0;
                            }
                        }
                        $scope.$digest();
                    });
                }
                //$("#gridCaps").find('table tr td:nth-child(4)').unbind("click").bind("change", function (e) {


                //    }


            },


            columns: [
                            {
                                field: "WWStream",
                                title: "Water/Waste",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteDropDownEditor,
                                values: WaterWasteOptions
                            }, {
                                field: "WWType",
                                title: "Type",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteTypeDropDownEditor,
                                values: WaterWasteTypeOptions,
                            }, {
                                field: "Category",
                                title: "Category",
                                headerAttributes: { "class": "wrap-header" },
                                width: "15%",
                                editor: WaterWasteCategoryDropDownEditor,
                                values: WaterWasteCategoryOptions,
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
                                headerTemplate: '<div>Unit Cost <span>(' + vm.capsDataInfo.LocalCurrencyAbbreviation + ')</span><span title="Input the cost of each energy unit using up to 4 decimal places, positive values only." class="k-icon k-i-question"></span></div>',
                                editor: editNumberCost,
                                format: "{0:n4}",
                                editable: function (dataItem) {
                                    return vm.isUnitCostWW == null ? true : vm.isUnitCostWW;
                                }
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
                                                    deletedWaterWaste.push({ "EMDataWWID": data.EMDataWWID });

                                                var grid = $("#gridCapsWaterWaste").data("kendoGrid");
                                                grid.removeRow(tr);

                                                $scope.$digest();
                                            }
                                        }
                                        catch (err) {
                                            hideLoading();
                                            var dataToSend = {
                                                "method": "InitKendoGridCapsWaterWaste", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
                dataSource: WaterWasteOptions,
                change: function (e) {
                    var grid = e.sender.element.closest(".k-grid").data("kendoGrid");
                    var row = e.sender.element.closest("tr");
                    var dataItem = grid.dataItem(row);
                    var WaterWasteStandardUoM = WaterWasteDataSet.filter(function (entry) {
                        return entry.WWStream == dataItem.WWStream;
                    });
                    dataItem.Category = "";
                    dataItem.WWType = "";
                    dataItem.StandardUoM = WaterWasteStandardUoM[0].StandardUoM;
                    dataItem.dirty = true;
                    $('#gridCapsWaterWaste').data('kendoGrid').refresh();
                },
            });
    };
    function WaterWasteTypeDropDownEditor(container, options) {
        var WaterWasteSelect = options.model.WWStream;
        var WaterWasteTypeOptionsAll = WaterWasteDataSet.filter(function (entry) {
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
                    $('#gridCapsWaterWaste').data('kendoGrid').refresh();
                },
            });
    };
    function WaterWasteCategoryDropDownEditor(container, options) {
        var WaterWasteSelect = options.model.WWStream;
        var WaterWasteType = options.model.WWType;
        var WaterWasteCategoryOptionsAll = WaterWasteDataSet.filter(function (entry) {
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

    function InitKendoGridTops() {
        var dsTops = new kendo.data.DataSource({
            //data: gridTopsData,
            transport: {
                read: function (e) {
                    // on success
                    e.success(gridTopsData);
                }
            },
            group: {
                field: "ParentKPI",
            },
            sort: {
                field: "KPIOrder", dir: "asc"
            },
            schema: {
                model: {
                    id: 'KPIID',
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

        $("#gridTops").kendoGrid({
            dataSource: dsTops,
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
                var grid = $("#gridTops").data("kendoGrid");
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
                        var grid = $("#gridTops").data("kendoGrid");
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
    function onEMPortfolioRemove(e) {
        if (e.sender.value() == "") {
            if (isCapsDataExist == 1) {
                if (!confirm(capsTypeClearMessage)) {
                    e.preventDefault();
                    vm.SelectedEmissionPortfolio = EMPortfolioValueFirst;
                    $scope.$digest();
                }
                else {
                    newValue = null;
                }
            }
            //else {
            //&& newValue.LookUpMemberID == EMPortfolioValueFirst.LookUpMemberID
            //    vm.SelectedEmissionPortfolio = EMPortfolioValueFirst;
            //    newValue = EMPortfolioValueFirst;
            //    $scope.$digest();
            //}
        }

    }
    function onEMPortfolioChange(e) {

        if (isCapsDataExist == 1 && e.dataItem.LookUpMemberID != EMPortfolioValueFirst.LookUpMemberID) {

            if (!confirm(capsTypeClearMessage)) {
                e.preventDefault();
                vm.SelectedEmissionPortfolio = EMPortfolioValueFirst;
                $scope.$digest();
            }
            else {

                newValue = {
                    "LookUpMemberID": e.dataItem.LookUpMemberID,
                    "LookUpMemberName": e.dataItem.LookUpMemberName,
                    "LookUpMemberOrder": e.dataItem.LookUpMemberOrder,
                    "LookUpName": e.dataItem.LookUpName
                }
            }

        }
        else {
            newValue = {
                "LookUpMemberID": e.dataItem.LookUpMemberID,
                "LookUpMemberName": e.dataItem.LookUpMemberName,
                "LookUpMemberOrder": e.dataItem.LookUpMemberOrder,
                "LookUpName": e.dataItem.LookUpName
            }
        }
    }
    function onChangeCarbonImpact() {
        //alert(vm.capsDataInfo.NoCarbonImpact);        
        if (vm.capsDataInfo.NoCarbonImpact == true) {
            for (var i = 0; i < gridCapsData.length; i++) {
                gridCapsData[i].EMUnit = null;
                gridCapsData[i].EMBasisOfEstimate = null;
                gridCapsData[i].UnitCost = null;
                vm.capsDataInfo.EnergyCostImpactPerYear = null;
            }
        }
        else {
            angular.copy(beforeSaveGriddata, gridCapsData);
            vm.isUnitCost = beforeSaveIsUnit;
            vm.capsDataInfo.EnergyCostImpactPerYear= beforeSaveEnergy;
            //gridCapsData = beforeSaveGriddata;
        }

        $('#gridCaps').data('kendoGrid').dataSource.read();

        //$scope.$digest();
    }

    function CreateUpdateCaps() {
        var capsData = [];
        var valid = true;
        try {
            console.log("save");
            var CapsRealizationDate = (vm.capsDataInfo.EmissionsImpactRealizationDate != null && vm.capsDataInfo.EmissionsImpactRealizationDate != "") ? $("#realizationDate").val() : null;

            if (CapsRealizationDate != null) {
                if (!parseDate(CapsRealizationDate)) {
                    valid = false;
                    vm.RealizationDateCaps = true;
                }
                else {
                    vm.RealizationDateCaps = false;
                }
            }

            var CAPSWaterWasteList = [];
            var tempWaterWaste;
            var gridWaterWasteData = $('#gridCapsWaterWaste').data('kendoGrid').dataSource.data()
                .map(function (x) { return x });
            angular.forEach(gridWaterWasteData, function (item, index) {            
                if ((item.WWStream == null || item.WWType == null || item.Category == null
                    || item.WWStream == "" || item.WWType == "" || item.Category == "")&& valid==true)
                {
                    valid = false;
                    alert(waterWasteErrorMsg);
                    return;
                }
                
            });
            if (!valid) {
                hideLoading();
                return;
            }
           
            var capsItem = {
                IsCapsProject: vm.capsDataInfo.IsCapsProject,
                CalculatedEmissionsImpact: (vm.capsDataInfo.CalculatedEmissionsImpact != null && vm.capsDataInfo.CalculatedEmissionsImpact !== "") ? vm.capsDataInfo.CalculatedEmissionsImpact : null,
                EmissionPortfolioID: (vm.SelectedCapsEmissionPortfolio != null && vm.SelectedCapsEmissionPortfolio !== "") ? vm.SelectedCapsEmissionPortfolio.LookUpMemberID : null,
                EmissionsImpactRealizationDate: (vm.capsDataInfo.EmissionsImpactRealizationDate != null && vm.capsDataInfo.EmissionsImpactRealizationDate !== "") ? vm.capsDataInfo.EmissionsImpactRealizationDate : null,
                NoCarbonImpact: (vm.capsDataInfo.NoCarbonImpact != null && vm.capsDataInfo.NoCarbonImpact !== "") ? vm.capsDataInfo.NoCarbonImpact : null,
                EnergyCostImpactPerYear: (vm.capsDataInfo.EnergyCostImpactPerYear != null && vm.capsDataInfo.EnergyCostImpactPerYear !== "") ? vm.capsDataInfo.EnergyCostImpactPerYear : null,
                EnergyImpact: vm.capsDataInfo.EnergyImpact,
                EnergyWasteImpactCostPerYear: (vm.capsDataInfo.EnergyWasteImpactCostPerYear != null && vm.capsDataInfo.EnergyWasteImpactCostPerYear !== "") ? vm.capsDataInfo.EnergyWasteImpactCostPerYear : null,
                EnergyWasteImpactPerYear:vm.capsDataInfo.EnergyWasteImpactPerYear,
                EnergyWaterImpactCostPerYear: (vm.capsDataInfo.EnergyWaterImpactCostPerYear != null && vm.capsDataInfo.EnergyWaterImpactCostPerYear !== "") ? vm.capsDataInfo.EnergyWaterImpactCostPerYear : null,
                EnergyWaterImpactPerYear: vm.capsDataInfo.EnergyWaterImpactPerYear,

            }
            capsData.push(capsItem);

            var CAPSList = [];
            var temp;
            var gridData = $('#gridCaps').data('kendoGrid').dataSource.data()
                .map(function (x) { return x });
            angular.forEach(gridData, function (item, index) {
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
               
                CAPSList.push(temp);
            });
        
            var waterWasteInsertListItems = [];
            var waterWasteUpdateListItems = [];
            if ($('#gridCapsWaterWaste').data('kendoGrid') != undefined) {
                var gridupdatedData = $('#gridCapsWaterWaste').data('kendoGrid').dataSource.data()
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
                "delete": deletedWaterWaste
            };

            var dataToSend = { "ProjectID": SeletedProjectId, "Capsdata": JSON.stringify(capsData), "Capsgrid": JSON.stringify(CAPSList), "CapsWaterWaste": JSON.stringify(vm.insertUpdateDeleteWaterWaste) };

            GETPostService.postDataWCF('insertUpdateCAPS', dataToSend).then(function (response) {
                getDataForCaps();
                alert(saveMessage);
                $.when(GETPostService.getDataWCFAsync("getProjectInfoByID/" + SeletedProjectId))
                    .then(function (resProjectData) {
                        var projDetails = JSON.parse(resProjectData.getProjectInfoByIDResult);
                        vm.SelectedProject = projDetails[0];

                        isCapsDataExist = vm.SelectedProject.EMDataAssociation;
                    });
                //alert(response);
                //if (response == "Success") {                    
                //    alert(saveMessage);
                //}
                //else {

                //    alert("Error occurred in Caps Update");

                //}
            });
        }
        catch (err) {
            var dataToSendErr = {
                "method": "CreateUpdateTops", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                .then(function (response) { alert(errormessage); });
        }
    }
    function CreateUpdateTops() {
        try {
            var topsData = [];
            var topsItem = {
                ProjectID: SeletedProjectId,
                DurationBaseCase: (vm.tops.DurationBaseCase != null && vm.tops.DurationBaseCase !== "") ? vm.tops.DurationBaseCase : null,
                DurationHighCase: (vm.tops.DurationHighCase != null && vm.tops.DurationHighCase !== "") ? vm.tops.DurationHighCase : null,
                PeopleFTEMonthsRequiredBaseCase: (vm.tops.PeopleFTEMonthsRequiredBaseCase != null && vm.tops.PeopleFTEMonthsRequiredBaseCase !== "") ? vm.tops.PeopleFTEMonthsRequiredBaseCase : null,
                PeopleFTEMonthsRequiredHighCase: (vm.tops.PeopleFTEMonthsRequiredHighCase != null && vm.tops.PeopleFTEMonthsRequiredHighCase !== "") ? vm.tops.PeopleFTEMonthsRequiredHighCase : null,
                TotalNonFTEOpExBaseCase: (vm.tops.TotalNonFTEOpExBaseCase != null && vm.tops.TotalNonFTEOpExBaseCase !== "") ? vm.tops.TotalNonFTEOpExBaseCase : null,
                TotalNonFTEOpExHighCase: (vm.tops.TotalNonFTEOpExHighCase != null && vm.tops.TotalNonFTEOpExHighCase !== "") ? vm.tops.TotalNonFTEOpExHighCase : null,
                TotalCapExBaseCase: (vm.tops.TotalCapExBaseCase != null && vm.tops.TotalCapExBaseCase !== "") ? vm.tops.TotalCapExBaseCase : null,
                TotalCapExHighCase: (vm.tops.TotalCapExHighCase != null && vm.tops.TotalCapExHighCase !== "") ? vm.tops.TotalCapExHighCase : null,
                TOPSRecommendedPriorityGroupID: vm.tops.TOPSRecommendedPriorityGroupID != null ? vm.tops.TOPSRecommendedPriorityGroupID.LookUpMemberID : null,
                FunctionsRequiredID: vm.tops.FunctionsRequiredID != null ? vm.tops.FunctionsRequiredID.LookUpMemberID : null,
                //  ProductID: vm.tops.ProductID != null ? vm.tops.ProductID.LookUpMemberID : null,
                ImpactMultiplierID: vm.tops.ImpactMultiplierID != null ? vm.tops.ImpactMultiplierID.LookUpMemberID : null,
                InLineProductStrategyID: vm.tops.InLineProductStrategyID != null ? vm.tops.InLineProductStrategyID.LookUpMemberID : null,
                DurationDescription: vm.tops.DurationDescription,
                PeopleDescription: vm.tops.PeopleDescription,
                TotalCapExDescription: vm.tops.TotalCapExDescription,
                TotalNonFTEDescription: vm.tops.TotalNonFTEDescription,
                InLineProductDescription: vm.tops.InLineProductDescription,
                ImpactMultiplierDescription: vm.tops.ImpactMultiplierDescription,
                //DurationDescription: vm.tops.DurationDescription,
                //PeopleDescription: vm.tops.PeopleDescription,
                //TotalCapExDescription: vm.tops.TotalCapExDescription,
                //TotalNonFTEDescription: vm.tops.TotalNonFTEDescription,
                TOPSGroup: vm.tops.TOPSGroup,
                CostBenefitRatio: vm.tops.CostBenefitRatio,
                OverallBenefitScore: vm.tops.CostBenefitRatio,
                PrimaryKPI: vm.tops.PrimaryKPI != null ? vm.tops.PrimaryKPI.LookUpMemberID : null,
                ProjectScope: vm.tops.ProjectScope != null ? vm.tops.ProjectScope.LookUpMemberID : null,
            }
            topsData.push(topsItem)
            var KPIList = [];
            var gridData = $('#gridTops').data('kendoGrid').dataSource.data()
                .filter(function (x) { return x.dirty })
                .map(function (x) { return x });
            angular.forEach(gridData, function (item, index) {
                var temp = {
                    KPIUniqueID: item.KPIUniqueID,
                    ProjectID: SeletedProjectId,
                    KPIID: item.KPIID,
                    KPIValueID: item.LookUpValue,
                }
                KPIList.push(temp);
            });

            var dataToSend = { "TOPS": JSON.stringify(topsData), "TOPSKPI": JSON.stringify(KPIList) };

            GETPostService.postDataWCF('insertUpdateTOPS', dataToSend).then(function (response) {
                //alert(response);
                if (response == "Success") {
                    topsDataSaved = true;
                    getDataForTops();
                    needGeneralInforeload = true;
                    reloadGeneralInfo();
                    $rootScope.$emit("RefreshForDataQuality");
                    //getDataForCaps();
                    alert(saveMessage);
                }
                else {

                    alert("Error occurred in Tops Update");

                }
            });
        }
        catch (err) {
            var dataToSendErr = {
                "method": "CreateUpdateTops", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                .then(function (response) { alert(errormessage); });
        }
    }
    function insertReports(formName) {
        var listdata = [];
        var report = {
            "ProjectID": SeletedProjectId,
            "UserADID": currentUserId,
            "ReportName": formName
        };
        listdata.push(report);
        var finalData = JSON.stringify({
            "ReportsData": listdata
        });
        GETPostService.postDataWCF('InsertReports', finalData).then(function (response) {
            //alert(response);
            if (response.InsertReportsResult == "Success") {
                alert(reportprocessmessage);
                vm.UpdateDate(SeletedProjectName)
            }
            else {
                alert("Error occurred");
            }
        });

    };

    function InitkGridHubSettings() {
        var dsHub = new kendo.data.TreeListDataSource({

            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.dsHubSettings);
                }
            },
            schema: {
                model: {
                    id: 'LookUpID',
                    fields: {
                        parentId: { field: "Parent", nullable: true },
                        LookUpName: { type: "string", editable: false },
                        HubSettingID: { hidden: true },
                        ProjectID: { type: "string" },
                        LookUpID: { type: "string", hidden: true },
                        Parent: { type: "string" },
                        HubValue: { type: "boolean" }
                    }
                }
            }
        });

        $("#gridHubSettings").kendoTreeList({
            dataSource: dsHub,
            //sortable: true,
            batch: true,
            expanded: true,
            //editable: true,
            columns: [
                {
                    field: "LookUpName",
                    title: "Hub Section"
                },
                {
                    field: "LookUpID",
                    title: "LookUpID",
                    hidden: true
                },
                {
                    field: "HubValue",
                    title: " ",
                    template: '#if(LookUpName != "Project Board Section") { # <input type="checkbox" #= data.HubValue ? checked="checked" : "" #  class="chkbx"/># } #'
                }
            ],
            dataBound: function () {

                $(".chkbx").bind("click", function (e) {
                    var grid = $("#gridHubSettings").data("kendoTreeList");
                    var dataItem = grid.dataItem($(e.target).closest("tr"));
                    var count = $(":checked", grid.element).length;
                    dataItem.set("HubValue", this.checked);

                });
            },

        });
        //  $('#gridHubSettings .k-grid-header').hide();
    };
    function updateHubSettings() {
        try {
            var hubSettingsUpdateListItems = [];
            if ($('#gridHubSettings').data('kendoTreeList') != undefined) {
                var gridupdatedDataHub = $('#gridHubSettings').data('kendoTreeList').dataSource.data()
                    .filter(function (x) { return x.dirty })
                    .map(function (x) { return x });

                angular.forEach(gridupdatedDataHub, function (item, index) {
                    var temp = {};
                    temp.ProjectID = item.ProjectID;
                    temp.LookUpID = item.LookUpID;
                    temp.HubSettingID = item.HubSettingID;
                    temp.HubValue = item.HubValue;
                    hubSettingsUpdateListItems.push(temp);
                });
                if (hubSettingsUpdateListItems.length > 0) {
                    GETPostService.postDataWCF('InsertUpdateHubSetting', JSON.stringify(hubSettingsUpdateListItems)).then(function (response) {
                        //alert(response);
                        if (response.InsertUpdateHubSettingResult == "Success") {
                            console.log("Hub setting updated successfully");
                            needHubreload = true;
                            alert(saveMessage);
                        }
                        else {
                            alert("Error occurred in Hub Update");

                        }
                    });
                }
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "updateHubSettings", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage); });
        }
    };


    function searchProjectParent(inputId, dsProjects, searchFor, projectUID, SelectedParentProj) {
        var selectedPeoplefilter = "";
        var projCombo = $("#" + inputId).data("kendoComboBox");
        if (projCombo == undefined) {
            $("#" + inputId).kendoComboBox({
                dataTextField: "ProjectName",
                dataValueField: "ProblemUniqueID",
                dataSource: dsProjects,
                minLength: 3,
                value: SelectedParentProj,
                //select: onParentProgChange,
                select: function (e) {
                    vm.SelectedParentProject = { "ProblemUniqueID": e.dataItem.ProblemUniqueID, "ProjectName": e.dataItem.ProjectName };
                    if (angular.equals(originalParentProj, vm.SelectedParentProject) == false && originalParentProj.ProblemUniqueID != undefined && originalParentProj.ProblemUniqueID !== null) {
                        if (!confirm(parentProgChangMsg)) {
                            //     e.preventDefault();
                            var dsParentProj = [];
                            dsParentProj.push(vm.SelectedParentProject);
                            angular.copy(originalParentProj, vm.SelectedParentProject);
                            var combobox = $("#ddl_GI_ParentProg").data("kendoComboBox");
                            combobox.setDataSource(dsParentProj);
                            $("#ddl_GI_ParentProg").data("kendoComboBox").value(originalParentProj.ProblemUniqueID)
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
                        var isConfidentialPrj = vm.SelectedProject.IsConfidential === true ? "1" : "0";
                        console.log(input);
                        if (input.length >= 3) {
                            displayLoading();
                            var dataToSend = {
                                "programUID": projectUID, "searchFor": searchFor + '-' + vm.SelectedProject.IsConfidential, "filterString": input
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
                                            "method": "searchProjectParent", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
                        $("#ddl_GI_ParentProg").data("kendoComboBox").value("");
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
                    "method": "searchProjectParent", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
                hideLoading();
            }

        }
        else {
            projCombo.setDataSource(dsProjects);
            projCombo.value(SelectedParentProj);
            hideLoading();
        }
        return selectedPeoplefilter;
    }
    function reloadGeneralInfo() {
        if (needGeneralInforeload == true) {
            displayLoading();
            $.when(GETPostService.getDataWCFAsync("getProjectInfoByID/" + SeletedProjectId))
                .then(function (resProjectData) {
                    //d = new Date();
                    //console.log("loaded getDataBinding" + d.toString());
                    try {
                        var projDetails = JSON.parse(resProjectData.getProjectInfoByIDResult);
                        vm.SelectedProject = projDetails[0];
                        isCapsDataExist = vm.SelectedProject.EMDataAssociation;
                        var dsProjects = [{ "ProblemUniqueID": projDetails[0].ParentProgramID, "ProjectName": projDetails[0].ParentProgramName }];
                        var searchFor = "Parent";
                        var projectUID = SeletedProjectId;
                        var SelectedParentProj = vm.SelectedProject.ParentProgramID;
                        searchProjectParent("ddl_GI_ParentProg", dsProjects, searchFor, projectUID, SelectedParentProj);

                        var selectedParentProj = [];

                        vm.SelectedParentProject = dsProjects[0];//selectedParentProj.length > 0 ? selectedParentProj[0] : "";
                        angular.copy(vm.SelectedParentProject, originalParentProj);

                        vm.SelectedProjectName = SeletedProjectName;
                        vm.OEProjectVisibleSolution = vm.SelectedProject.IsOEProject;
                        vm.agileVisible = vm.SelectedProject.IsAgile;
                        vm.isPOBOSVisible = vm.SelectedProject.IsPOBOS;
                        vm.isSiteAssessmentVisible = vm.SelectedProject.IsSiteAssessment;
                       
                        vm.IsGMSGQLTAnnualMustWinVisible = vm.SelectedProject.IsGMSGQLTAnnualMustWin;

                        var selectedPortfolioOwner = [];
                        if (vm.SelectedProject.PortfolioOwnerID != null && vm.SelectedProject.PortfolioOwnerID != "") {
                            selectedPortfolioOwner = vm.dsGIPortfolioOwner.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.PortfolioOwnerID;
                            });
                        }
                        vm.selectedPortfolioOwner = selectedPortfolioOwner.length > 0 ? selectedPortfolioOwner[0] : "";

                        var selectedPrimaryProduct = [];
                        if (vm.SelectedProject.PrimaryProductID != null && vm.SelectedProject.PrimaryProductID != "") {
                            selectedPrimaryProduct = vm.dsGIPrimaryProduct.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.PrimaryProductID;
                            });
                            //vm.selectedPrimaryProduct = selectedPrimaryProduct[0];
                        }
                        vm.selectedPrimaryProduct = selectedPrimaryProduct.length > 0 ? selectedPrimaryProduct[0] : "";

                        var selectedProjectPOBOS = [];
                        if (vm.SelectedProject.ProjectClassificationID != null && vm.SelectedProject.ProjectClassificationID != "") {
                            selectedProjectPOBOS = vm.dsGIProjectClassification.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.ProjectClassificationID;
                            });
                        }
                        vm.selectedProjectPOBOS = selectedProjectPOBOS.length > 0 ? selectedProjectPOBOS[0] : "";

                        var selectedCampaignType = [];
                        if (vm.SelectedProject.CampaignTypeID != "" && vm.SelectedProject.CampaignTypeID != null) {
                            selectedCampaignType = vm.dsGICampaignType.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.CampaignTypeID;
                            });
                        }
                        vm.selectedCampaignType = selectedCampaignType.length > 0 ? selectedCampaignType[0] : "";

                        var selectedCampaignPhase = [];
                        if (vm.SelectedProject.CampaignPhaseID != "" && vm.SelectedProject.CampaignPhaseID != null) {
                            selectedCampaignPhase = vm.dsGICampaignPhase.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.CampaignPhaseID;
                            });
                        }
                        vm.selectedCampaignPhase = selectedCampaignPhase.length > 0 ? selectedCampaignPhase[0] : "";

                        var selectedProductionStep = [];
                        if (vm.SelectedProject.ProductionStepID != "" && vm.SelectedProject.ProductionStepID != null) {
                            selectedProductionStep = vm.dsGIProductionStep.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.ProductionStepID;
                            });
                        }
                        vm.selectedProductionStep = selectedProductionStep.length > 0 ? selectedProductionStep[0] : "";

                        var selectedAgilePrimaryWorkstream = [];
                        if (vm.SelectedProject.AgilePrimaryWorkstream != null && vm.SelectedProject.AgilePrimaryWorkstream != "") {
                            selectedAgilePrimaryWorkstream = vm.dsAgilePrimaryWorkstation.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.AgilePrimaryWorkstream;
                            });
                        }
                        vm.selectedAgilePrimaryWorkstream = selectedAgilePrimaryWorkstream.length > 0 ? selectedAgilePrimaryWorkstream[0] : "";

                        var selectedAgileWave = [];
                        if (vm.SelectedProject.AgileWave != null && vm.SelectedProject.AgileWave != "") {
                            selectedAgileWave = vm.dsAgileWave.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.AgileWave;
                            });
                        }
                        vm.selectedAgileWave = selectedAgileWave.length > 0 ? selectedAgileWave[0] : "";

                        var selectedPrimaryKPI = [];
                        if (vm.SelectedProject.PrimaryKPI != null && vm.SelectedProject.PrimaryKPI != "") {
                            selectedPrimaryKPI = vm.dsGIPrimaryKPI.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedProject.PrimaryKPI;
                            });
                        }
                        vm.SelectedPrimaryKPI = selectedPrimaryKPI.length > 0 ? selectedPrimaryKPI[0] : "";


                        if (vm.SelectedProject.POBOSCategory != null && vm.SelectedProject.POBOSCategory != 'undefined') {
                            POBOSCat = vm.SelectedProject.POBOSCategory.split(',');
                        }
                        if (vm.SelectedProject.SiteAssessmentCategory != null && vm.SelectedProject.SiteAssessmentCategory != 'undefined') {
                            SiteAssessmentCat = vm.SelectedProject.SiteAssessmentCategory.split(',');
                        }

                        var impObj = [];
                        var exScope = [];
                        var OEProjType = [];
                        var agileSecWorkstream = [];
                        var POBOSCat = [];
                        var SiteAssessmentCat = [];
                        if (vm.SelectedProject.OtherImpactedProducts != null && vm.SelectedProject.OtherImpactedProducts != 'undefined') {
                            impObj = vm.SelectedProject.OtherImpactedProducts.split(',');
                        }

                        if (vm.SelectedProject.ExecutionScopeID != null && vm.SelectedProject.ExecutionScopeID != 'undefined') {
                            exScope = vm.SelectedProject.ExecutionScopeID.split(',');
                        }
                        if (vm.SelectedProject.AgileSecondaryWorkstream != null && vm.SelectedProject.AgileSecondaryWorkstream != 'undefined') {
                            agileSecWorkstream = vm.SelectedProject.AgileSecondaryWorkstream.split(',');
                        }

                        if (vm.SelectedProject.POBOSCategory != null && vm.SelectedProject.POBOSCategory != 'undefined') {
                            POBOSCat = vm.SelectedProject.POBOSCategory.split(',');
                        }
                        if (vm.SelectedProject.SiteAssessmentCategory != null && vm.SelectedProject.SiteAssessmentCategory != 'undefined') {
                            SiteAssessmentCat = vm.SelectedProject.SiteAssessmentCategory.split(',');
                        }

                        var selectedStrategicYear = [];
                        if (vm.SelectedProject.StrategicYear != null && vm.SelectedProject.StrategicYear != "") {
                            selectedStrategicYear = vm.dsStrategicYear.filter(function (entry) {
                                return entry.LookUpMemberName == vm.SelectedProject.StrategicYear;
                            });
                        }
                        vm.selectedStrategicYear = selectedStrategicYear.length > 0 ? selectedStrategicYear[0] : "";
                        var selectedAnnualMustWin = [];
                        if (vm.SelectedProject.AnnualMustWin != null && vm.SelectedProject.AnnualMustWin != "") {
                            selectedAnnualMustWin = vm.dsAnnulMustWin.filter(function (entry) {
                                return entry.LookUpMemberName == vm.SelectedProject.AnnualMustWin;
                            });
                        }
                        vm.selectedAnnualMustWin = selectedAnnualMustWin.length > 0 ? selectedAnnualMustWin[0] : "";

                        vm.OEProjectVisibleSolution = vm.SelectedProject.IsOEProject;
                        vm.agileVisible = vm.SelectedProject.IsAgile;
                        vm.OETypeOptions = {
                            placeholder: "Select OE Project Type...",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsGIOEProjectType,
                            filter: "contains"
                        };
                        if (vm.SelectedProject.IsOEProject) {
                            if (vm.SelectedProject.OEProjectType != null && vm.SelectedProject.OEProjectType != 'undefined') {
                                OEProjType = vm.SelectedProject.OEProjectType.split(',');
                            }

                            vm.selectedOEProjectType = OEProjType;

                        }

                        vm.ImpactedProductOptions = {
                            placeholder: "Select products...",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsGIPrimaryProduct,
                            filter: "contains"
                        };
                        vm.ImpactedProductIds = impObj;

                        vm.ExecutionScopeOptions = {
                            placeholder: "Select and/or Type to Search",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsGIExecutionScope,
                            filter: "contains"
                        };
                        vm.ExecutionScopeIds = exScope;

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
                        // disableAllCombo();
                        //  $('#qualityGrid').data('kendoGrid').dataSource.read();
                        // $('#gridHubSettings').data('kendoTreeList').dataSource.read();

                        if (vm.SelectedProject.POBOSCategory != null && vm.SelectedProject.POBOSCategory != 'undefined') {
                            POBOSCat = vm.SelectedProject.POBOSCategory.split(',');
                        }

                        vm.dsPOBOSCategories = {
                            placeholder: "Select and/or Type to Searchs",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsPOBOSCategory,
                            filter: "contains"
                        };
                        vm.POBOSCategoryIds = POBOSCat;

                        if (vm.SelectedProject.SiteAssessmentCategory != null && vm.SelectedProject.SiteAssessmentCategory != 'undefined') {
                            SiteAssessmentCat = vm.SelectedProject.SiteAssessmentCategory.split(',');
                        }
                        vm.dsSiteAssessmentCategories = {
                            placeholder: "Select and/or Type to Search",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsSiteAssessmentCategory,
                            filter: "contains"
                        };
                        vm.SiteAssessmentCategoryIds = SiteAssessmentCat;

                        $scope.$digest();
                        hideLoading();
                        //d = new Date();
                        //console.log("Completed getDataBinding" + d.toString());
                    }
                    catch (err) {
                        hideLoading();
                        var dataToSendErr = {
                            "method": "reloadGeneralInfo", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                            .then(function (response) { alert(errormessage); });
                    }

                });
            needGeneralInforeload = false;
        }
    }
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
                case 'realizationDate':
                    vm.RealizationDateCaps = false;
                    break;
                default:

            }
            $scope.$digest();
        }
    }
    function initProjectHubHeader() {

        // SeletedProjectName = getParameterByName(window.location.search, "ProblemTitle");
        SeletedProjectId = getParameterByName(window.location.search, "ProblemID");
        if (SeletedProjectName == null || SeletedProjectName == undefined)
            vm.SelectedProjectName = SeletedProjectName;

        //   
        //$.when( GETPostService.getDataWCF("getOverAllStatus/" + SeletedProjectId))
        //     .then(function (resOverallStatus) {
        //         var overAllDatacopy = JSON.parse(resOverallStatus.getOverAllStatusResult);
        //         vm.overAllData = overAllDatacopy[0];
        //     });
    };
}