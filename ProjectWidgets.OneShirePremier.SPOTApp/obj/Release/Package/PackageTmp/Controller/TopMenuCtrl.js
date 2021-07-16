//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('TopMenuCtrl', TopMenuCtrl)
TopMenuCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function TopMenuCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;

    // vm.validator;
    vm.validationMsg = validationMessages;
    vm.validationMessage;
    vm.validationClass;
    //Object
    vm.projectTypeSelector = {};
    vm.projectVisible = true;
    vm.programVisible = false;
    vm.OEProjectVisible = false;
    vm.OEProjectVisibleSolution = false;
    vm.OEProjectVisibleTechTransfer = false;
    vm.OEProjectVisibleTechOps = false;
    vm.OEProjectVisibleSimple = false;
    vm.CapsProjectVisible = false;
    vm.notCenterFunction = true;
    vm.notCenterFunctionSimple = true;
    vm.productMasterListUrl = productMasterListUrl;
    vm.securityGroupUserspath = securityGroupUserspath;
    vm.myPreferencesPagepath = myPreferencesPagepath;
    vm.portfolioCenterpath = portfolioCenterpath;
    vm.simplePOBOSChange = simplePOBOSChange;

    vm.simpleGMSGQLTAnnualMustWinChange = simpleGMSGQLTAnnualMustWinChange;
    vm.standardGMSGQLTAnnualMustWinChange = standardGMSGQLTAnnualMustWinChange;


    vm.capsProjectTooltipNew = capsProjectTooltip;
    vm.environmentalTootltipNew = environmentalTootltip;
    vm.CurrentUserNameValue = "";
    //Array
    vm.ProjectTypeSelectorListItems = [];
    vm.dsResList = [];
    vm.dsPrimaryProduct = [];
    vm.dsOwner = [];
    vm.dsExecutionScopeData = [];
    vm.qualityType = [];
    vm.dsCampaign = [];
    vm.dsCampaignType = [];
    vm.dsProductionStep = [];
    // vm.dsProgram = [];
    vm.dsProject = [];
    vm.customOptions = [];
    vm.dsUserPermission = [];
    vm.dsProjectSearch = [];
    vm.dsOEProjectType = [];
    vm.dsHubSettings = [];
    vm.ProblemCapture = "ProblemCapture";
    vm.SolutionIdentified = "SolutionIdentified";
    vm.TechOpsProgram = "TechOpsProgram";
    vm.TechTransfer = "TechTransfer";
    vm.StandardProject = "Standard Project / Program";
    vm.simpleProject = "SimpleProject";
    vm.ProblemName;
    vm.ProblemID;
    vm.redirectProject;
    vm.problemCaptureValidationMessage = false;
    vm.solutionValidationMessage = false;
    vm.techOpsValidationMessage = false;
    vm.techTransferValidationMessage = false;
    vm.isConfidentialVisible = false;
    vm.canManageUser = false;
    vm.canCreateProj = false;
    vm.simpleProjectValidationMessage = false;
    vm.dsPOCurrency = [];

    vm.dsStrategicYear = [];
    vm.dsAnnualMustWin = [];


    vm.currentDate = new Date();
    var datetimefor = kendo.toString(vm.currentDate, "ddd MMM d yyyy hh:mm:ss tt");
    // vm.MailSubject = "DL.SPOTSupport@takeda.com?Subject=SPOT Support Request " + currentUserName +'(' + vm.currentDate+')';
    vm.MailSubject = "DL.SPOTSupport@takeda.com?Subject=SPOT Support Request " + currentUserName + ' (Logged on ' + datetimefor + ')';    //Functions
    //Functions
    // vm.DisposeProjectTypeSelector = DisposeProjectTypeSelector;
    vm.initTopMenu = initTopMenu;
    vm.ProjectTypeSelector = ProjectTypeSelector;
    vm.CreateProblemCaptureData = CreateProblemCaptureData;
    vm.techTransferChange = techTransferChange;
    vm.standardAgileChange = standardAgileChange;
    vm.simpleAgileChange = simpleAgileChange;

    vm.oeTypeChange = oeTypeChange;
    vm.oeTypeChangeSolution = oeTypeChangeSolution;
    vm.oeTypeChangeTechOps = oeTypeChangeTechOps;
    vm.oeTypeChangeTransfer = oeTypeChangeTransfer;
    vm.oeTypeChangeSimpleProject = oeTypeChangeSimpleProject;
    //vm.capsProjectChange = capsProjectChange;
    //vm.capsProjectChangeSimple = capsProjectChangeSimple;
    //   vm.InitProject = InitProject;
    vm.SetDefaultValues = SetDefaultValues;
    vm.portfolioOnChange = portfolioOnChange;
    vm.solutionOnChange = solutionOnChange;
    vm.techTransferOnChange = techTransferOnChange;
    vm.techOps = techOps;
    vm.navigateToHub = navigateToHub;
    vm.simpleproject = simpleproject;
    vm.logout = logout;
    vm.openModel = openModel;
    vm.GetSearchedProjects = GetSearchedProjects;
    vm.userControlSearch = userControlSearch;
    vm.AddNewQualityRow = AddNewQualityRow;
    vm.onChangeStandardQualityRef = onChangeStandardQualityRef;
    vm.isConfidentialProjectFunc = isConfidentialProjectFunc;
    vm.trackEventFunc = trackEventFunc;
    vm.standardSiteAssessmentChange = standardSiteAssessmentChange;
    vm.simpleSiteAssessmentChange = simpleSiteAssessmentChange;
    vm.standardPOBOSChange = standardPOBOSChange;
    vm.CopyProject = CopyProject;
    // vm.bindChangeComboBoxProject = bindChangeComboBoxProject;
    var saveData = 0;
    var userProjects = [];
    var OriginalProjectTypeSelector = {};
    var dsGIQualityType = [];
    var QualityReferenceBulk = [];
    var dsQualityReference = [];
    var parentProgram = [];
    var confidentialProgramData = [];
    var className = "TopMenuCtrl";
    var projType;
    var bindClose = 0;
    var NewProjectId;
    var IsSimpleProjectLoad = false;
    var IsCopyProject = false;

    function trackEventFunc(eventName) {
        trackEvent(eventName);
    }
    function GetSearchedProjects(event) {
        trackEvent("Search project on top bar");
        try {

            if (event.keyCode !== 13) {
                var ProjSearchAuto = $("#ProjSearch").data("kendoAutoComplete");

                if ((ProjSearchAuto != undefined && ProjSearchAuto != null)) {
                    ProjSearchAuto.close();
                    ProjSearchAuto.destroy();

                }
            }
            if (event.keyCode === 13) {
                displayLoading();
                var dataToSend = {
                    "strUserAdId": currentUserId, "strFilterString": vm.projselect
                };
                $.when(GETPostService.postDataWCFAsync("getProjectByUserId", dataToSend)).then(function (resProj) {
                    try {
                        hideLoading();
                        userProjects = JSON.parse(resProj);
                        vm.dsProjectSearch = userProjects.filter(function (entry) {
                            if (entry.ProjectText != null && entry.ProjectText != undefined)
                                return (entry.ProjectText.toLowerCase()).indexOf(vm.projselect.toLowerCase()) >= 0;
                        });
                        $("#ProjSearch").kendoAutoComplete({
                            dataTextField: "ProjectText",
                            dataValueField: "UrlPostfix",
                            filter: "contains",
                            dataSource: {
                                data: vm.dsProjectSearch,
                            },
                            select: function (e) {
                                this.close();
                                this.value("");
                                this.destroy();
                                var urlPostFix = e.dataItem.UrlPostfix;
                                var url = window.location.protocol + "//" + window.location.host + projectHubpathAbs + "?" + urlPostFix;
                                // window.location.href = url

                                window.open(url, '_blank');

                                //console.log(text);
                                // Use the selected item or its text
                            }
                        });
                        var sampledd = $("#ProjSearch").data("kendoAutoComplete");
                        sampledd.search(vm.projselect);
                    }
                    catch (err) {
                        hideLoading();
                        var dataToSendErr = {
                            "method": "GetSearchedProjects", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                            .then(function (response) { alert(errormessage) });
                    }
                });
            }

            if ($('#ProjSearch').next('span').next('span').hasClass('k-i-loading'))
                $('#ProjSearch').next('span').next('span').hide();
        }
        catch (err) {
            hideLoading();
            var dataToSendErr = {
                "method": "GetSearchedProjects", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                .then(function (response) { alert(errormessage) });
        }
    }

    //$scope.$digest();

    function logout() {
        trackEvent("Log out");
        window.location.href = authUrl + "/.auth/logout";
    }
    function navigateToHub() {
        window.open(projectHubpath + "?" + vm.redirectProject.UrlPostfix,
            '_blank' // <- This is what makes it open in a new window.
        );
    }
    function isConfidentialProjectFunc(inputId) {
        var combobox = $("#" + inputId).data("kendoComboBox");
        combobox.setDataSource([]);
        combobox.value("");
        vm.projectTypeSelector.ParentProgram = "";
        //if (vm.projectTypeSelector.isConfidential == true) {

        //    vm.dsProgram = JSON.parse(confidentialProgramData);

        //}
        //else {
        //    vm.dsProgram = JSON.parse(parentProgram).filter(function (entry) {
        //        return entry.LookUpName == program;
        //    });

        //}

    };
    function openModel(a) {
        var projectTypeSelectorWindow = $("#" + a);
        projectTypeSelectorWindow.data("kendoWindow").open();
    }

    function ProjectTypeSelector() {
        try {
            displayLoading();
            vm.ProjectTypeSelectorListItems = [];

            var projectTypeSelectorWindow = $("#DialogProjectTypeSelector");
            projectTypeSelectorWindow.data("kendoWindow").open();

            $.when(GETPostService.getDataWCF("getProjectTypeSelectorData"))
                .then(function (resProjectSelectorListItems) {
                    /*For Project Type Selector Pop Up Window*/
                    projType = JSON.parse(resProjectSelectorListItems.getProjectTypeSelectorDataResult);
                    angular.forEach(projType, function (item, index) {
                        item.ImageName = imageFolderPath + "/" + item.ProjectTypeImageName;
                        item.PageName = htmlfilepath + "/" + item.PageName + "?v=" + buildNo;
                        vm.ProjectTypeSelectorListItems.push(item);
                    });



                });
            GetProjectTypeData();
        }
        catch (err) {
            hideLoading();
            var dataToSendErr = {
                "method": "ProjectTypeSelector", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSendErr))
                .then(function (response) { alert(errormessage); });
        }
    };
    function GetProjectTypeData() {
        try {
            var d = new Date();
            var ProjectUID = "";
            var dataToSendForPortfolio = {
                "ProjectUID": "", "UserID": currentUserId
            };
            console.log("DB call started people picker " + d.toString());
            var lookup = portfolioOwner + "," + product + "," + campaignType + "," + campaignPhase + "," + ProductionStep + "," + qualityReferenceType + "," + oeProjectType + "," + executionScope + "," + localCurrency + "," + agileAttribute + "," + agileWave + "," + emissionPortfolio + "," + pOBOSCategory + "," + siteAssessmentCategory + "," + topsPrimaryKpi + "," + copyProjectTemplate + "," + strategicYear + "," + annualMustWin;

            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.postDataWCFAsync("getUserPermissionById", currentUserId)
                , GETPostService.postDataWCFAsync("getPortfolioOwnerWithCurrency", dataToSendForPortfolio), GETPostService.postDataWCFAsync("getHubSetting", ""))
                .then(function (resLookup, resUserPermission, resPortfolioOwnerCurrency, resHubSettings) {
                    //GETPostService.postDataWCFAsync("getHubSetting", "0c0f331f-f422-42df-b355-f01b0450a382")
                    //var currentUserPermission = JSON.parse(resUserPermission.getUserPermissionByIdResult);
                    vm.dsPOCurrency = JSON.parse(resPortfolioOwnerCurrency);
                    var jsonLookupData = JSON.parse(resLookup.getLookupDataResult);
                    vm.dsPrimaryKPI = $filter('orderBy')(jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == topsPrimaryKpi;
                    }), "LookUpMemberOrder");
                    vm.dsUserPermission = JSON.parse(resUserPermission.getUserPermissionByIdResult).filter(function (entry) {
                        return entry.Permission == 'CreateConfidential';
                    });
                    vm.dsPrimaryProduct = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == product;
                    });
                    vm.dsOwner = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == portfolioOwner;
                    });
                    vm.dsExecutionScopeData = $filter('orderBy')(jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == executionScope;
                    }), "LookUpMemberOrder");
                    //vm.dsProjectClassification = jsonLookupData.filter(function (entry) {
                    //    return entry.LookUpName == CapitalProjectClassification;
                    //});
                    vm.dsCampaignType = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == campaignType;
                    });
                    vm.dsCampaign = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName === campaignPhase;
                    });
                    vm.dsProductionStep = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == ProductionStep;
                    });
                    vm.dsHubSettings = JSON.parse(resHubSettings.getHubSettingResult);

                    vm.dsOEProjectType = $filter('orderBy')(jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == oeProjectType;
                    }), "LookUpMemberOrder");
                    vm.dslocalCurrency = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == localCurrency;
                    });
                    vm.isConfidentialVisible = vm.dsUserPermission.length > 0 ? true : false;
                    vm.dsPrograms = [];//getdropdowndata(resPrograms);

                    dsGIQualityType = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == qualityReferenceType;
                    });
                    vm.dsAgilePrimaryWorkstation = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == agileAttribute;
                    });
                    vm.dsAgileWave = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == agileWave;
                    });
                    vm.dsEmissionPortfolio = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == emissionPortfolio;
                    });
                    /**-----------------START:Copy Project----------------**/
                    var CopyProjectTempleData = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == copyProjectTemplate;
                    });

                    vm.CopyProjectTempleList = [];

                    var disbleFeatureList = disableCopyProjectType.toLowerCase().split(',');

                    angular.forEach(CopyProjectTempleData, function (item, index) {
                        var temp = {};
                        temp.LookUpMemberID = item.LookUpMemberID;
                        temp.LookUpMemberName = item.LookUpMemberName;
                        temp.checked = true;
                        temp.disable = disbleFeatureList.indexOf(item.LookUpMemberID.toLowerCase()) > -1 ? true : false;
                        vm.CopyProjectTempleList.push(temp)
                    });
                    /**-----------------END:Copy Project----------------**/
                    QualityReferenceBulk = [];
                    for (var i = 0; i < dsGIQualityType.length; i++) {
                        var item = {
                            "text": dsGIQualityType[i].LookUpMemberName, "value": dsGIQualityType[i].LookUpMemberID
                        }
                        QualityReferenceBulk.push(item);
                    }

                    var d = new Date();
                    console.log("people picker binded " + d.toString());
                    //vm.dsProjectClassification = $filter('orderBy')(vm.dsProjectClassification, 'LookUpMemberOrder');
                    vm.dsPrimaryProduct = $filter('orderBy')(vm.dsPrimaryProduct, 'LookUpMemberOrder');//LookUpMemberOrder

                    vm.dsImpactedProducts = {
                        placeholder: "Select and/or Type to Search",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsPrimaryProduct,
                        filter: "contains"
                    };

                    vm.dsExecutionScope = {
                        placeholder: "Select scope...",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsExecutionScopeData,
                        filter: "contains"
                    };
                    vm.dsExecutionScope1 = {
                        placeholder: "Select scope...",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsOwner,
                        filter: "contains"
                    };
                    vm.dsOEType = {
                        placeholder: "Select and/or Type to Search",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsOEProjectType,
                        filter: "contains"
                    };

                    vm.dsAgileSecWorkstation = {
                        placeholder: "Select secondary workstream...",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsAgilePrimaryWorkstation,
                        filter: "contains"
                    };

                    vm.dsPOBOSCategory = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == pOBOSCategory;
                    });

                    vm.dsStrategicYear = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == strategicYear;
                    });


                    vm.dsAnnualMustWin = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == annualMustWin;
                    });

                    vm.dsSiteAssessmentCategory = jsonLookupData.filter(function (entry) {
                        return entry.LookUpName == siteAssessmentCategory;
                    });
                    vm.dsPOBOSCategories = {
                        placeholder: "Select and/or Type to Search",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsPOBOSCategory,
                        filter: "contains"
                    };

                    vm.dsSiteAssessmentCategories = {
                        placeholder: "Select and/or Type to Search",
                        dataTextField: "LookUpMemberName",
                        dataValueField: "LookUpMemberID",
                        valuePrimitive: true,
                        autoBind: false,
                        dataSource: vm.dsSiteAssessmentCategory,
                        filter: "contains"
                    };
                    $scope.$digest();
                    hideLoading();
                    //hideLoading();
                });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "GetProjectTypeData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
    };
    function userControlSearch(event) {

        GETPostService.searchPeople(event, "PeopleSearch");

    };
    function userControlSearchSimple(event) {


        GETPostService.searchPeople(event, "PeopleSearchSimple");

    };

    function oeTypeChange() {
        vm.OEProjectVisible = false;
        vm.projectTypeSelector.OEProjectType = "";
    };
    function oeTypeChangeSolution() {
        vm.OEProjectVisibleSolution = false;
        vm.projectTypeSelector.OEProjectType = "";
    };
    function oeTypeChangeTechOps() {
        vm.OEProjectVisibleTechOps = false;
        vm.projectTypeSelector.OEProjectType = "";
    };
    function oeTypeChangeTransfer() {
        vm.OEProjectVisibleTechTransfer = false;
        vm.projectTypeSelector.OEProjectType = "";
    };
    function oeTypeChangeSimpleProject() {
        vm.OEProjectVisibleSimple = false;
        vm.projectTypeSelector.OEProjectTypeSimple = "";
    };
    function techTransferChange() {
        vm.techTransferVisible = false;
        vm.projectTypeSelector.CampaignType = "";
        vm.projectTypeSelector.CampaignPhase = "";
        vm.projectTypeSelector.ProductionStepID = "";

    };
    function standardPOBOSChange() {
        vm.standardPOBOSVisible = false;
        vm.projectTypeSelector.POBOSCategory = "";
    };
    function simplePOBOSChange() {
        vm.simplePOBOSVisible = false;
        vm.projectTypeSelector.POBOSCategory = "";
    };
    //Start Code ************************** Add new global attribute Strategy Deployment Annual Initiative ***************************** 



    function simpleGMSGQLTAnnualMustWinChange() {
        vm.simpleGMSGQLTAnnualMustWinVisible = false;
        vm.projectTypeSelector.StrategicYear = "";
        vm.projectTypeSelector.AnnualMustWin = "";
    };



    function standardGMSGQLTAnnualMustWinChange() {
        vm.standardGMSGQLTAnnualMustWinVisible = false;
        vm.projectTypeSelector.StrategicYear = "";
        vm.projectTypeSelector.AnnualMustWin = "";
    };



    //End Code ************************** Add new global attribute Strategy Deployment Annual Initiative ***************************** 
    function standardSiteAssessmentChange() {
        vm.isSiteAssessmentVisible = false;
        vm.projectTypeSelector.SiteAssessmentCategory = "";
    };
    function simpleSiteAssessmentChange() {
        vm.isSimpleSiteAssessmentVisible = false;
        vm.projectTypeSelector.SiteAssessmentCategory = "";
    };

    function standardAgileChange() {
        vm.standardAgileVisible = false;
        vm.projectTypeSelector.agilePrimaryWorkstation = "";
        vm.projectTypeSelector.agileSecWorkstream = "";
        vm.projectTypeSelector.agileWave = "";
    };
    function simpleAgileChange() {
        vm.simpleAgileVisible = false;
        vm.projectTypeSelector.agilePrimaryWorkstation = "";
        vm.projectTypeSelector.agileSecWorkstream = "";
        vm.projectTypeSelector.agileWave = "";

    };

    function onChangeStandardQualityRef() {
        vm.standardQualityRef = false;
    };

    function CreateProblemCaptureData(projecttype, windowname) {
        try {
            saveData = 1;
            displayLoading();
            NewProjectId = NewGuid();

            var listdata = [];
            var hubSettingsListData = [];
            var oeTypeList = [];
            if (projecttype == vm.ProblemCapture) {
                var validator = $("#problemCapture").kendoValidator().data("kendoValidator");
                if (!validator.validate()) {
                    vm.problemCaptureValidationMessage = true;
                    vm.solutionValidationMessage = false;
                    vm.techOpsValidationMessage = false;
                    vm.techTransferValidationMessage = false;
                    vm.simpleProjectValidationMessage = false;
                    hideLoading();
                    return false;
                }
            }
            else if (projecttype == vm.SolutionIdentified) {
                var solutionValidator = $("#SolutionIdentified").kendoValidator().data("kendoValidator");
                if (!solutionValidator.validate()) {
                    vm.solutionValidationMessage = true;
                    vm.problemCaptureValidationMessage = false;
                    vm.techOpsValidationMessage = false;
                    vm.techTransferValidationMessage = false;
                    vm.simpleProjectValidationMessage = false;
                    hideLoading();
                    return false;
                }
            }
            else if (projecttype == vm.TechOpsProgram) {
                var techOpsValidator = $("#TechOpsProgram").kendoValidator().data("kendoValidator");
                if (!techOpsValidator.validate()) {
                    vm.techOpsValidationMessage = true;
                    vm.solutionValidationMessage = false;
                    vm.problemCaptureValidationMessage = false;
                    vm.techTransferValidationMessage = false;
                    vm.simpleProjectValidationMessage = false;
                    hideLoading();
                    return false;
                }
            }
            else if (projecttype == vm.StandardProject) {
                var selectedUserID = $("#PeopleSearch").data("kendoComboBox").selectedIndex != -1 ? $("#PeopleSearch").data("kendoComboBox")._old : null;
                var techTransValidator = $("#StandardTechTransfer").kendoValidator().data("kendoValidator");
                if ((!techTransValidator.validate()) || ($("#ddl_StandardCurrency").data("kendoComboBox").value() && $("#ddl_StandardCurrency").data("kendoComboBox").select() === -1)) {
                    vm.techTransferValidationMessage = true;
                    vm.techOpsValidationMessage = false;
                    vm.solutionValidationMessage = false;
                    vm.problemCaptureValidationMessage = false;
                    vm.simpleProjectValidationMessage = false;
                    hideLoading();
                    return false;
                }
            }
            else if (projecttype == vm.simpleProject) {
                var selectedUserID = $("#PeopleSearchSimple").data("kendoComboBox").selectedIndex != -1 ? $("#PeopleSearchSimple").data("kendoComboBox")._old : null;

                var simpleValidator = $("#simpleProject").kendoValidator().data("kendoValidator");
                if ((!simpleValidator.validate()) || ($("#simpleLocalCurrency").data("kendoComboBox").value() && $("#simpleLocalCurrency").data("kendoComboBox").select() === -1)) {
                    vm.simpleProjectValidationMessage = true;
                    vm.techTransferValidationMessage = false;
                    vm.techOpsValidationMessage = false;
                    vm.solutionValidationMessage = false;
                    vm.problemCaptureValidationMessage = false;
                    hideLoading();
                    return false;
                }
            }
            else {
                vm.techTransferValidationMessage = false;
                vm.techOpsValidationMessage = false;
                vm.solutionValidationMessage = false;
                vm.problemCaptureValidationMessage = false;
                vm.simpleProjectValidationMessage = false;
                hideLoading();
                //return false;
            }

            if (selectedUserID == null) {
                vm.techTransferValidationMessage = true;
                vm.techOpsValidationMessage = false;
                vm.solutionValidationMessage = false;
                vm.problemCaptureValidationMessage = false;
                vm.simpleProjectValidationMessage = false;
                hideLoading();
                return false;
            }
            var ImpactedProductsList = [];
            var executionscopeList = [];
            var agileSecWorkstreamList = [];
            var pOBOSCategoryList = [];
            var siteAssessmentCategoryList = [];

            if (vm.projectTypeSelector.OtherImpactedProduct != null) {
                ImpactedProductsList = vm.projectTypeSelector.OtherImpactedProduct.length > 1 ? vm.projectTypeSelector.OtherImpactedProduct.join(",") : vm.projectTypeSelector.OtherImpactedProduct[0];
            }

            if (vm.projectTypeSelector.ExecutionScope != null) {
                executionscopeList = vm.projectTypeSelector.ExecutionScope.length > 1 ? vm.projectTypeSelector.ExecutionScope.join(",") : vm.projectTypeSelector.ExecutionScope[0];
            }

            if (vm.projectTypeSelector.agileSecWorkstream != null && vm.projectTypeSelector.agileSecWorkstream != "") {
                agileSecWorkstreamList = vm.projectTypeSelector.agileSecWorkstream.length > 1 ? vm.projectTypeSelector.agileSecWorkstream.join(",") : vm.projectTypeSelector.agileSecWorkstream[0];
            }
            if (vm.projectTypeSelector.POBOSCategory != null && vm.projectTypeSelector.POBOSCategory != "") {
                pOBOSCategoryList = vm.projectTypeSelector.POBOSCategory.length > 1 ? vm.projectTypeSelector.POBOSCategory.join(",") : vm.projectTypeSelector.POBOSCategory[0];
            }
            if (vm.projectTypeSelector.SiteAssessmentCategory != null && vm.projectTypeSelector.SiteAssessmentCategory != "") {
                siteAssessmentCategoryList = vm.projectTypeSelector.SiteAssessmentCategory.length > 1 ? vm.projectTypeSelector.SiteAssessmentCategory.join(",") : vm.projectTypeSelector.SiteAssessmentCategory[0];
            }

            if (projecttype == vm.StandardProject) {
                if (vm.projectTypeSelector.OEProjectType != null && vm.projectTypeSelector.OEProjectType != "") {
                    oeTypeList = vm.projectTypeSelector.OEProjectType.join(",");
                }
                else
                    oeTypeList = null;
            }
            else {
                if (vm.projectTypeSelector.OEProjectType != null && vm.projectTypeSelector.OEProjectType != "") {
                    oeTypeList = vm.projectTypeSelector.OEProjectType.join(",");
                }
                else
                    oeTypeList = null;
            }
            var sampledd = "";
            var isAgileValue = "";
            if (projecttype == vm.StandardProject) {
                sampledd = $("#PeopleSearch").data("kendoComboBox");
                isAgileValue = vm.projectTypeSelector.IsAgileStandard != null ? vm.projectTypeSelector.IsAgileStandard : null;
            }
            else {
                sampledd = $("#PeopleSearchSimple").data("kendoComboBox");
                isAgileValue = vm.projectTypeSelector.IsAgileSimple != null ? vm.projectTypeSelector.IsAgileSimple : null;
            }

            vm.projectTypeSelectorData = {
                ProblemUniqueID: NewProjectId,
                ProblemTitle: vm.projectTypeSelector.Title != null ? vm.projectTypeSelector.Title : null,
                ProblemType: projecttype,
                PortfolioOwnerID: vm.projectTypeSelector.PortfolioOwner != null ? vm.projectTypeSelector.PortfolioOwner.LookUpMemberID : null,
                CreatedByID: currentUserId,
                ProblemOwnerID: selectedUserID,
                ProblemOwnerName: selectedUserID != null ? (sampledd.dataItem() != undefined ? sampledd.dataItem().UserDisplayName : null) : null,
                ParentProgramID: vm.projectTypeSelector.ParentProgram != null ? vm.projectTypeSelector.ParentProgram : null,
                PrimaryProductID: vm.projectTypeSelector.PrimaryProduct != null ? vm.projectTypeSelector.PrimaryProduct.LookUpMemberID : null,
                ProjectDescription: vm.projectTypeSelector.ProblemDescription != null ? vm.projectTypeSelector.ProblemDescription : null,
                // ProjectClassificationID: vm.projectTypeSelector.ProjectClassification != null ? vm.projectTypeSelector.ProjectClassification.LookUpMemberID : null,

                ExecutionScope: vm.projectTypeSelector.ExecutionScope != null ? executionscopeList : null,
                OtherImpactedProducts: vm.projectTypeSelector.OtherImpactedProduct != null ? ImpactedProductsList : null,

                IsTechTransfer: vm.projectTypeSelector.IsTechTransfer != null ? vm.projectTypeSelector.IsTechTransfer : null,
                CampaignTypeID: vm.projectTypeSelector.CampaignType != null ? vm.projectTypeSelector.CampaignType.LookUpMemberID : null,
                CampaignPhaseID: vm.projectTypeSelector.CampaignPhase != null ? vm.projectTypeSelector.CampaignPhase.LookUpMemberID : null,
                ProductionStepID: vm.projectTypeSelector.ProductionStepID != null ? vm.projectTypeSelector.ProductionStepID.LookUpMemberID : null,
                //StrategicRationale: vm.projectTypeSelector.Justification != null ? vm.projectTypeSelector.Justification : null,
                TargetEndState: vm.projectTypeSelector.TargetEndState != null ? vm.projectTypeSelector.TargetEndState : null,
                IsConfidential: vm.projectTypeSelector.isConfidential == undefined ? false : vm.projectTypeSelector.isConfidential,
                //ParentProgramID: (vm.projectTypeSelector.ParentProgram != null) ? vm.projectTypeSelector.ParentProgram.LookUpMemberID : null,
                LocalCurrencyID: (vm.projectTypeSelector.localCurrency != null) ? vm.projectTypeSelector.localCurrency.LookUpMemberID : null,
                IsOEProject: projecttype == vm.StandardProject ? (vm.projectTypeSelector.IsOEProject != null ? vm.projectTypeSelector.IsOEProject : null) : (vm.projectTypeSelector.IsOEProjectSimple != null ? vm.projectTypeSelector.IsOEProjectSimple : null),
                OEProjectType: oeTypeList,
                IsAgile: isAgileValue,
                AgilePrimaryWorkstream: (vm.projectTypeSelector.agilePrimaryWorkstation != null && vm.projectTypeSelector.agilePrimaryWorkstation != "") ? vm.projectTypeSelector.agilePrimaryWorkstation.LookUpMemberID : null,
                AgileSecondaryWorkstream: agileSecWorkstreamList,
                agileWave: (vm.projectTypeSelector.agileWave != null && vm.projectTypeSelector.agileWave != "") ? vm.projectTypeSelector.agileWave.LookUpMemberID : null,
                IsCapsProject: projecttype == vm.StandardProject ? (vm.projectTypeSelector.IsCapsProject != null ? vm.projectTypeSelector.IsCapsProject : null) : (vm.projectTypeSelector.IsCapsProjectSimple != null ? vm.projectTypeSelector.IsCapsProjectSimple : null),
                EmissionPortfolioID: vm.projectTypeSelector.CapsProjectValue != null ? vm.projectTypeSelector.CapsProjectValue.LookUpMemberID : null,
                IsPOBOS: projecttype == vm.StandardProject ? (vm.projectTypeSelector.IsPOBOSStandard != null ? vm.projectTypeSelector.IsPOBOSStandard : null) : (vm.projectTypeSelector.IsPOBOSSimple != null ? vm.projectTypeSelector.IsPOBOSSimple : null),
                IsSiteAssessment: projecttype == vm.StandardProject ? (vm.projectTypeSelector.IsSiteAssessment != null ? vm.projectTypeSelector.IsSiteAssessment : null) : (vm.projectTypeSelector.IsSiteAssessmentSimple != null ? vm.projectTypeSelector.IsSiteAssessmentSimple : null),
                POBOSCategory: vm.projectTypeSelector.POBOSCategory != null ? pOBOSCategoryList : null,
                SiteAssessmentCategory: vm.projectTypeSelector.SiteAssessmentCategory != null ? siteAssessmentCategoryList : null,
                PrimaryKPI: (vm.projectTypeSelector.PrimaryKPI != null && vm.projectTypeSelector.PrimaryKPI != "") ? vm.projectTypeSelector.PrimaryKPI.LookUpMemberID : null,
                IsGMSGQLTAnnualMustWin: projecttype == vm.StandardProject ? (vm.projectTypeSelector.IsGMSGQLTAnnualMustWinStandard != null ? vm.projectTypeSelector.IsGMSGQLTAnnualMustWinStandard : null) : (vm.projectTypeSelector.IsGMSGQLTAnnualMustWin != null ? vm.projectTypeSelector.IsGMSGQLTAnnualMustWin : null),
                StrategicYearID: (vm.projectTypeSelector.StrategicYear != null && vm.projectTypeSelector.StrategicYear != "") ? vm.projectTypeSelector.StrategicYear.LookUpMemberID : null,
                AnnualMustWinID: (vm.projectTypeSelector.AnnualMustWin != null && vm.projectTypeSelector.AnnualMustWin != "") ? vm.projectTypeSelector.AnnualMustWin.LookUpMemberID : null

            };

            vm.qualityInsertListItems = [];
            var objQualityReferenceData = [];

            if ($('#standardProjectQualityGrid').data('kendoGrid') != undefined) {
                //var gridData = $('#gridProjectCharterMilestone').data('kendoGrid');
                var gridupdatedDataKey = $('#standardProjectQualityGrid').data('kendoGrid').dataSource.data()
                //.filter(function (x) { return x.dirty })
                //.map(function (x) { return x });
                //var insertQualityArray = gridupdatedDataKey.filter(function (x) { return x.id == "" || x.id == null })
                //    .map(function (x) { return x });

                angular.forEach(gridupdatedDataKey, function (item, index) {
                    var temp = {};
                    temp.ProblemUniqueID = vm.projectTypeSelectorData.ProblemUniqueID;
                    temp.QualityReferenceTypeID = item.QualityReferenceTypeID;
                    temp.QualityReference = item.QualityReference;
                    objQualityReferenceData.push(temp);
                });

            }
            if (vm.projectTypeSelector.qualityref == false) {
                objQualityReferenceData = [];
            }
            var hubSettingsUpdateListItems = [];
            if (projecttype == vm.simpleProject) {

                if ($('#gridHubSettingsProblemCapture').data('kendoTreeList') != undefined) {
                    var gridupdatedDataHub = $('#gridHubSettingsProblemCapture').data('kendoTreeList').dataSource.data();
                    //.filter(function (x) { return x.dirty })
                    //.map(function (x) { return x });

                    angular.forEach(gridupdatedDataHub, function (item, index) {
                        var temp = {};
                        temp.ProjectID = NewProjectId;
                        temp.LookUpID = item.LookUpID;
                        temp.HubSettingID = item.HubSettingID;
                        temp.HubValue = item.HubValue;
                        hubSettingsUpdateListItems.push(temp);
                    });
                }
            }


            listdata.push(vm.projectTypeSelectorData);
            //hubSettingsListData.push(hubSettingsUpdateListItems);



            var finalData = JSON.stringify({
                "problemCaptureData": listdata,
                "hubSettingsData": hubSettingsUpdateListItems,
                "ProjectIDTemplate": vm.TemplateProjectID,
                "CopyProjectParameter": vm.SelectedValues
            });

            GETPostService.postDataWCF('insertProblemCaptureData', finalData).then(function (response) {
                //alert(response);
                if (response.insertProblemCaptureDataResult == "Success") {

                    if (projecttype == vm.StandardProject && vm.projectTypeSelector.qualityref == true) {
                        GETPostService.postDataWCF('insertQualityReferenceData', JSON.stringify(objQualityReferenceData)).then(function (response) {
                            hideLoading();
                            if (response.insertQualityReferenceDataResult == "Success") {
                                vm.ProblemName = vm.projectTypeSelectorData.ProblemTitle;
                                vm.ProblemID = vm.projectTypeSelectorData.ProblemUniqueID;
                                vm.projectTypeSelector = {};
                                $("#btnSubmit").closest(".k-window-content").data("kendoWindow").close();

                                window.location.href = projectHubpath + "?ProblemID=" + vm.ProblemID + "&ProblemTitle=" + vm.ProblemName;
                            }
                        });
                    }
                    else {
                        hideLoading();
                        vm.ProblemName = vm.projectTypeSelectorData.ProblemTitle;
                        vm.ProblemID = vm.projectTypeSelectorData.ProblemUniqueID;
                        vm.projectTypeSelector = {};
                        $("#btnSubmit").closest(".k-window-content").data("kendoWindow").close();

                        window.location.href = projectHubpath + "?ProblemID=" + vm.ProblemID + "&ProblemTitle=" + vm.ProblemName;
                    }
                }
                else {
                    hideLoading();

                    alert("Error occurred in Problem Capture Insertion");

                }

            });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "CreateProblemCaptureData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };

    function portfolioOnChange() {
        var techTransferEx = [];
        techTransferEx.push(vm.projectTypeSelector.PortfolioOwner.LookUpMemberID);
        vm.projectTypeSelector.ExecutionScope = techTransferEx;
        $scope.$digest();
    };
    function solutionOnChange() {
        var techTransferEx = [];
        techTransferEx.push(vm.projectTypeSelector.PortfolioOwner.LookUpMemberID);
        vm.projectTypeSelector.ExecutionScope = techTransferEx;
        $scope.$digest();
    };

    function techTransferOnChange() {
        var getPortfolioGroup = vm.dsPOCurrency.filter(function (entry) {
            return entry.PortfolioOwnerID == vm.projectTypeSelector.PortfolioOwner.LookUpMemberID
        });
        if (getPortfolioGroup[0].PortfolioGroup == centerFunctionName)
            vm.notCenterFunction = false;
        else
            vm.notCenterFunction = true;
        if ($("#standardPortfolioOwner").data("kendoComboBox").value() && $("#standardPortfolioOwner").data("kendoComboBox").select() === -1) {
            $("#standardPortfolioOwner").data("kendoComboBox").value("");
        }
        if (vm.projectTypeSelector.PortfolioOwner != null) {
            var techTransferEx = [];
            techTransferEx.push(vm.projectTypeSelector.PortfolioOwner.LookUpMemberID);
            vm.projectTypeSelector.ExecutionScope = techTransferEx;
            vm.currencyValue = vm.dsPOCurrency.filter(function (entry) {
                return entry.PortfolioOwnerID == vm.projectTypeSelector.PortfolioOwner.LookUpMemberID;
            });

            var item = {
                "LookUpMemberID": vm.currencyValue[0].LocalCurrencyID, "LookUpMemberName": vm.currencyValue[0].LocalCurrencyName
            };

            vm.projectTypeSelector.localCurrency = item;// vm.currencyValue[0].LocalCurrencyID;

            vm.EmissionPortfolioEqualOne = vm.dsEmissionPortfolio.filter(function (entry) {
                return entry.LookUpMemberID == vm.projectTypeSelector.PortfolioOwner.LookUpMemberID;
            });

            var item1 = {
                "LookUpMemberID": vm.projectTypeSelector.PortfolioOwner.LookUpMemberID, "LookUpMemberName": vm.projectTypeSelector.PortfolioOwner.LookUpMemberName
            };
            if (vm.EmissionPortfolioEqualOne.length != 0)
                vm.projectTypeSelector.CapsProjectValue = item1;
            else
                vm.projectTypeSelector.CapsProjectValue = "";

            // $("#standardPortfolioOwner").data("kendoComboBox").value(vm.currencyValue.LocalCurrencyName);
        }
        $scope.$digest();
    };
    function techOps() {
        var techTransferEx = [];
        techTransferEx.push(vm.projectTypeSelector.PortfolioOwner.LookUpMemberID);
        vm.projectTypeSelector.ExecutionScope = techTransferEx;
        $scope.$digest();
    };
    function simpleproject() {
        var getPortfolioGroup = vm.dsPOCurrency.filter(function (x) {
            return x.PortfolioOwnerID == vm.projectTypeSelector.PortfolioOwner.LookUpMemberID
        });
        if (getPortfolioGroup[0].PortfolioGroup == centerFunctionName)
            vm.notCenterFunctionSimple = false;
        else
            vm.notCenterFunctionSimple = true;
        if ($("#simplePortfolio").data("kendoComboBox").value() && $("#simplePortfolio").data("kendoComboBox").select() === -1) {
            $("#simplePortfolio").data("kendoComboBox").value("");
        }
        if (vm.projectTypeSelector.PortfolioOwner != null) {
            var techTransferEx = [];
            techTransferEx.push(vm.projectTypeSelector.PortfolioOwner.LookUpMemberID);
            vm.projectTypeSelector.ExecutionScope = techTransferEx;
            vm.currencyValue = vm.dsPOCurrency.filter(function (entry) {
                return entry.PortfolioOwnerID == vm.projectTypeSelector.PortfolioOwner.LookUpMemberID;
            });
            var item = {
                "LookUpMemberID": vm.currencyValue[0].LocalCurrencyID, "LookUpMemberName": vm.currencyValue[0].LocalCurrencyName
            };

            vm.projectTypeSelector.localCurrency = item;

            vm.EmissionPortfolioEqualOne = vm.dsEmissionPortfolio.filter(function (entry) {
                return entry.LookUpMemberID == vm.projectTypeSelector.PortfolioOwner.LookUpMemberID;
            });

            var item1 = {
                "LookUpMemberID": vm.projectTypeSelector.PortfolioOwner.LookUpMemberID, "LookUpMemberName": vm.projectTypeSelector.PortfolioOwner.LookUpMemberName
            };
            if (vm.EmissionPortfolioEqualOne.length != 0)
                vm.projectTypeSelector.CapsProjectValue = item1;
            else
                vm.projectTypeSelector.CapsProjectValue = "";
        }
        $scope.$digest();
    };
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
                        var grid = $("#standardProjectQualityGrid").data("kendoGrid");
                        grid.removeRow(tr);
                        $scope.$digest();
                    }
                }
            }]
        }];
        return col;
    }
    /****----------------------START: Copy Project--------------------------***/
    function PrepareCopyProject() { searchProject('ddl_Copy_Prog') }

    function CopyProject() {
        vm.SelectedValues = '';
        var CopyQuality = false;
        dsQualityReference = [];
       
        if (vm.TemplateProjectID != undefined && vm.TemplateProjectID != "") {

            for (var i = 0; i < vm.CopyProjectTempleList.length; i++) {
                if (vm.CopyProjectTempleList[i].checked) {
                    vm.SelectedValues = vm.SelectedValues == '' ? vm.CopyProjectTempleList[i].LookUpMemberID : vm.SelectedValues + ',' + vm.CopyProjectTempleList[i].LookUpMemberID;
                    if (vm.CopyProjectTempleList[i].LookUpMemberID == '085b590b-016c-47fa-9c87-4e2a09775e9d')
                        CopyQuality = true;
                }
            }
            var finalData = {
                "ProjectIDTemplate": vm.TemplateProjectID,
                "CopyUserID": currentUserId,
                "CopyProjectParameter": vm.SelectedValues
            };
            $.when(GETPostService.postDataWCFAsync('getProjectTemplateInfoByID', finalData),
                    GETPostService.getDataWCFAsync("getQualityReferenceByProjectId/" + vm.TemplateProjectID))
                .then(function (response, resQualityRef) {
                    //alert(response);
                    var resLocalProj = JSON.parse(response.getProjectTemplateInfoByIDResult);
                    vm.projectTypeSelector = resLocalProj.length > 0 ? resLocalProj[0] : {};
                    // var resLocalProj = JSON.parse(resAllProjWithLocal);
                    // ProjectType.ProjectTypeTitle = 'Standard Project / Program'
                    vm.projectTypeSelector.qualityref = false;
                    IsCopyProject = true;

                    if (CopyQuality == true) {
                        dsQualityReference = JSON.parse(resQualityRef.getQualityReferenceByProjectIdResult);
                        if (dsQualityReference.length > 0) {
                            vm.projectTypeSelector.qualityref = true;
                        }
                    }
                    var ProjectTypeID = (vm.projectTypeSelector.ProjectTypeID == undefined || vm.projectTypeSelector.ProjectTypeID == "") ? standardProjectTypeID : vm.projectTypeSelector.ProjectTypeID;
                    openModel(ProjectTypeID);

                })
        }
        else {
            alert(noTemplateSelectedMessage);
        }

    }
    /****----------------------END: Copy Project--------------------------***/
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
            //pageSize: 20,
            schema: {
                model: {
                    id: "QualityUniqueID",
                    fields: {
                        QualityUniqueID: { editable: false },
                        QualityReferenceTypeID: { type: "string" },
                        QualityReference: { type: "string" },
                    }
                }
            }
        });
        $("#standardProjectQualityGrid").kendoGrid({
            dataSource: dataSourceQuality,
            columns: colQuality,
            navigatable: true,
            editable: {
                createAt: "bottom"
            }
        });
        if (vm.isEditable) {
            var grid1 = $("#standardProjectQualityGrid").data("kendoGrid");

            grid1.addRow();
        }

    };
    function AddNewQualityRow() {
        var grid1 = $("#standardProjectQualityGrid").data("kendoGrid");
        grid1.addRow();
    }
    function SetDefaultValues(projectType) {
        try {

            /********START : Setting Default values for copy projects***********/
            if (IsCopyProject) {

                var IsAgile = vm.projectTypeSelector.IsAgile == 1 ? true : false;
                var IsOEProject = vm.projectTypeSelector.IsOEProject == 1 ? true : false;
                var IsCapsProject = vm.projectTypeSelector.IsCapsProject == 1 ? true : false;
                var IsPOBOS = vm.projectTypeSelector.IsPOBOS == 1 ? true : false;
                var IsSiteAssessment = vm.projectTypeSelector.IsSiteAssessment == 1 ? true : false;
                var IsGMSGQLTAnnualMustWin = vm.projectTypeSelector.IsGMSGQLTAnnualMustWin == 1 ? true : false;

                projectType = vm.projectTypeSelector.ProblemType;
                vm.projectTypeSelector.isConfidential = vm.projectTypeSelector.isConfidential == 1 ? true : false;
                // vm.projectTypeSelector.qualityref = false;
                vm.projectTypeSelector.IsTechTransfer = vm.projectTypeSelector.IsTechTransfer == 1 ? true : false;
                vm.projectTypeSelector.IsOEProject = vm.projectTypeSelector.IsOEProjectSimple = IsOEProject;
                vm.projectTypeSelector.IsAgileSimple = vm.projectTypeSelector.IsAgileStandard = IsAgile;
                vm.projectTypeSelector.IsCapsProjectSimple = vm.projectTypeSelector.IsCapsProject = IsCapsProject;

                vm.projectTypeSelector.IsPOBOSStandard = vm.projectTypeSelector.IsPOBOSSimple = IsPOBOS;

                vm.projectTypeSelector.IsSiteAssessment = vm.projectTypeSelector.IsSiteAssessmentSimple = IsSiteAssessment;

                vm.projectTypeSelector.IsGMSGQLTAnnualMustWin = vm.projectTypeSelector.IsGMSGQLTAnnualMustWinStandard = IsGMSGQLTAnnualMustWin;
                
                vm.OEProjectVisibleTechTransfer = vm.projectTypeSelector.IsTechTransfer;
                vm.CapsProjectVisible = vm.CapsProjectVisibleSimple = IsCapsProject;

                vm.OEProjectVisibleSimple = IsOEProject;
                vm.techTransferVisible = vm.projectTypeSelector.IsTechTransfer;
                vm.standardAgileVisible = vm.simpleAgileVisible = IsAgile;

                vm.simplePOBOSVisible = vm.standardPOBOSVisible = IsPOBOS;

                vm.isSimpleSiteAssessmentVisible = vm.isSiteAssessmentVisible = IsSiteAssessment;

                vm.simpleGMSGQLTAnnualMustWinVisible = vm.standardGMSGQLTAnnualMustWinVisible = IsGMSGQLTAnnualMustWin;

                // debugger;
                if (vm.projectTypeSelector.PrimaryProduct != "") {
                    var selectedPrimaryProduct = vm.dsPrimaryProduct.filter(function (entry) {
                        return entry.LookUpMemberID == vm.projectTypeSelector.PrimaryProduct;
                    });
                    vm.projectTypeSelector.PrimaryProduct = selectedPrimaryProduct[0];
                }

                if (vm.projectTypeSelector.StrategicYear != "") {
                    var selectedStrategicYear = vm.dsStrategicYear.filter(function (entry) {
                        return entry.LookUpMemberID == vm.projectTypeSelector.StrategicYear;
                    });
                    vm.projectTypeSelector.StrategicYear = selectedStrategicYear[0];
                }

                if (vm.projectTypeSelector.AnnualMustWin != "") {
                    var selectedAnnualMustWin = vm.dsAnnualMustWin.filter(function (entry) {
                        return entry.LookUpMemberID == vm.projectTypeSelector.AnnualMustWin;
                    });
                    vm.projectTypeSelector.AnnualMustWin = selectedAnnualMustWin[0];
                }


                if (vm.projectTypeSelector.CampaignPhase != "") {
                    var selectedPortfolioCampaignPhase = vm.dsCampaign.filter(function (entry) {
                        return entry.LookUpMemberID == vm.projectTypeSelector.CampaignPhase;
                    });
                    vm.projectTypeSelector.CampaignPhase = selectedPortfolioCampaignPhase[0];
                }

                if (vm.projectTypeSelector.ProductionStepID != "") {
                    var selectedProductionStep = vm.dsProductionStep.filter(function (entry) {
                        return entry.LookUpMemberID == vm.projectTypeSelector.ProductionStepID;
                    });
                    vm.projectTypeSelector.ProductionStepID = selectedProductionStep[0];
                }
                if (vm.projectTypeSelector.CampaignType != "") {
                    var selectedCampaignType = vm.dsCampaignType.filter(function (entry) {
                        return entry.LookUpMemberID == vm.projectTypeSelector.CampaignType;
                    });
                    vm.projectTypeSelector.CampaignType = selectedCampaignType[0];
                }



                if (vm.projectTypeSelector.PrimaryKPI != "") {
                    var selectedPrimaryKPI = vm.dsPrimaryKPI.filter(function (entry) {
                        return entry.LookUpMemberID == vm.projectTypeSelector.PrimaryKPI;
                    });
                    vm.projectTypeSelector.PrimaryKPI = selectedPrimaryKPI[0];
                }

                if (vm.projectTypeSelector.agilePrimaryWorkstation != "") {
                    var selectedagilePrimaryWorkstation = vm.dsAgilePrimaryWorkstation.filter(function (entry) {
                        return entry.LookUpMemberID == vm.projectTypeSelector.agilePrimaryWorkstation;
                    });
                    vm.projectTypeSelector.agilePrimaryWorkstation = selectedagilePrimaryWorkstation[0];
                }
                if (vm.projectTypeSelector.agileWave != "") {
                    var selectedAgileWave = vm.dsAgileWave.filter(function (entry) {
                        return entry.LookUpMemberID == vm.projectTypeSelector.agileWave;
                    });
                    vm.projectTypeSelector.agileWave = selectedAgileWave[0];
                }
                //if (vm.projectTypeSelector.AgileSecondaryWorkstream != "") {
                //    var selectedAgileSecondaryWorkstream = vm.dsAgilePrimaryWorkstation.filter(function (entry) {
                //        return entry.LookUpMemberID == vm.projectTypeSelector.AgileSecondaryWorkstream;
                //    });
                //    vm.projectTypeSelector.AgileSecondaryWorkstream = selectedAgileSecondaryWorkstream.join(",");
                //}

                vm.projectTypeSelector.POBOSCategory = (vm.projectTypeSelector.POBOSCategory == null || vm.projectTypeSelector.POBOSCategory == "" || vm.projectTypeSelector.POBOSCategory == undefined) ? "" : vm.projectTypeSelector.POBOSCategory.split(',');
                vm.projectTypeSelector.SiteAssessmentCategory = (vm.projectTypeSelector.SiteAssessmentCategory == null || vm.projectTypeSelector.SiteAssessmentCategory == "" || vm.projectTypeSelector.SiteAssessmentCategory == undefined) ? "" : vm.projectTypeSelector.SiteAssessmentCategory.split(',');
                vm.projectTypeSelector.agileSecWorkstream = (vm.projectTypeSelector.agileSecWorkstream == null || vm.projectTypeSelector.agileSecWorkstream == "" || vm.projectTypeSelector.agileSecWorkstream == undefined) ? "" : vm.projectTypeSelector.agileSecWorkstream.split(',');
                vm.projectTypeSelector.OEProjectType = (vm.projectTypeSelector.OEProjectType == null || vm.projectTypeSelector.OEProjectType == "" || vm.projectTypeSelector.OEProjectType == undefined) ? "" : vm.projectTypeSelector.OEProjectType.split(',');
                vm.projectTypeSelector.OtherImpactedProduct = (vm.projectTypeSelector.OtherImpactedProducts == null || vm.projectTypeSelector.OtherImpactedProducts == "" || vm.projectTypeSelector.OtherImpactedProducts == undefined) ? "" : vm.projectTypeSelector.OtherImpactedProducts.split(',');

                /********START : Setting Default values for copy projects***********/
            }
            else {
                vm.projectTypeSelector.isConfidential = false;
                vm.projectTypeSelector.qualityref = false;
                vm.projectTypeSelector.IsTechTransfer = false;
                vm.projectTypeSelector.IsOEProject = false;
                vm.projectTypeSelector.IsOEProjectSimple = false;
                vm.projectTypeSelector.IsAgileSimple = false;
                vm.projectTypeSelector.IsAgileStandard = false;
                vm.projectTypeSelector.IsCapsProject = false;
                vm.projectTypeSelector.IsCapsProjectSimple = false;
                vm.projectTypeSelector.IsPOBOSStandard = false;
                vm.projectTypeSelector.IsPOBOSSimple = false;
                vm.projectTypeSelector.IsSiteAssessment = false;
                vm.projectTypeSelector.IsSiteAssessmentSimple = false;
                vm.projectTypeSelector.IsGMSGQLTAnnualMustWin = false;
                vm.projectTypeSelector.IsGMSGQLTAnnualMustWinStandard = false;

                vm.OEProjectVisibleTechTransfer = false;
                vm.CapsProjectVisible = false;
                vm.CapsProjectVisibleSimple = false;
                vm.OEProjectVisibleSimple = false;
                vm.techTransferVisible = false;
                vm.standardAgileVisible = false;
                vm.simpleAgileVisible = false;
                vm.simplePOBOSVisible = false;
                vm.standardPOBOSVisible = false;
                vm.isSimpleSiteAssessmentVisible = false;
                vm.isSiteAssessmentVisible = false;
                vm.simpleGMSGQLTAnnualMustWinVisible = false;
                vm.standardGMSGQLTAnnualMustWinVisible = false;

                //  vm.isConfidentialProjectFunc();

            }

            bindChangeComboBox("standardPrimProduct");
            bindChangeComboBox("campaignPhase");
            bindChangeComboBox("productionStep");
            bindChangeComboBox("campaignType");

            bindChangeComboBox("primaryWorkstation");
            bindChangeComboBox("agileWave");


            bindChangeComboBox("simplePrimartProduct");
            //bindChangeComboBox("simpleParentProgram");
            bindChangeComboBox("localCurrency");

            bindChangeComboBox("ddlSiteAssessment");
            //bindChangeComboBox("simpleParentProgram");
            bindChangeComboBox("ddlPROBSCat");
            bindChangeComboBox("ddlPrimaryKPI");

            bindChangeComboBox("standardPortfolioOwner");
            bindChangeComboBox("ddl_StandardCurrency");
            bindChangeComboBox("ddl_StandardEmission");

            bindChangeComboBox("simplePortfolio");
            bindChangeComboBox("simpleLocalCurrency");
            bindChangeComboBox("ddl_SimpleEmission");

            InitkendoGridQuality();
            if (projectType == simpleProjectType && !IsSimpleProjectLoad) {
                InitkGridHubSettings();
                IsSimpleProjectLoad = true;
            }
            angular.forEach(projType, function (item, index) {
                if (index < projType.length && bindClose == 0) {

                    $("#" + item.ProjectTypeUniqueID).data("kendoWindow").bind("close", function (e) {
                        if (saveData == 0) {
                            if (angular.equals(OriginalProjectTypeSelector, vm.projectTypeSelector) == false) {
                                if (!confirm(dialogCloseMessage))
                                    e.preventDefault();
                                else {
                                    vm.projectTypeSelector = {};
                                    angular.copy(vm.projectTypeSelector, OriginalProjectTypeSelector);

                                }
                            }
                            else {
                                vm.projectTypeSelector = {};
                                angular.copy(vm.projectTypeSelector, OriginalProjectTypeSelector);
                            }
                        }
                        else {
                            vm.projectTypeSelector = {};
                            angular.copy(vm.projectTypeSelector, OriginalProjectTypeSelector);
                            //vm.qualityGridVisible = false
                            //vm.projectTypeSelector.qualityref = "No";
                            //if ($("#qualityGrid").data("kendoGrid") != null) {
                            //    $("#qualityGrid").data("kendoGrid").dataSource.data([]);
                            //}
                        }
                    });
                } if (index == projType.length - 1) {
                    bindClose = 1
                }
            });
            var PortfolioOwnerId = currentUserId;
            switch (projectType) {
                case "Standard Project / Program":
                    GETPostService.setDefaultUser("PeopleSearch").then(function (result) {
                        var sampledd = $("#PeopleSearch").data("kendoComboBox");
                        sampledd.input.keydown(userControlSearch);
                    });
                    searchProject("standParentProgram");
                    IsCopyProject = false;
                    break;

                case "Simple Project":
                    GETPostService.setDefaultUser("PeopleSearchSimple").then(function (result) {
                        var sampledd = $("#PeopleSearchSimple").data("kendoComboBox");
                        sampledd.input.keydown(userControlSearchSimple);
                    });
                    searchProject("simpleParentProgram");
                    IsCopyProject = false;
                    break;
                case "SimpleProject":
                    GETPostService.setDefaultUser("PeopleSearchSimple").then(function (result) {
                        var sampledd = $("#PeopleSearchSimple").data("kendoComboBox");
                        sampledd.input.keydown(userControlSearchSimple);
                    });
                    searchProject("simpleParentProgram");
                    IsCopyProject = false;
                    break;
                case "Copy an existing project": PrepareCopyProject()
                    break;
                default:
                    console.log("default");
            }
            angular.copy(vm.projectTypeSelector, OriginalProjectTypeSelector);
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "SetDefaultValues", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage); });
        }

    };

    function NewGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    };
    function updateGlobalMessage() {
        try {
            $.when(GETPostService.postDataWCFAsync("getGlobalMessage"))
                .then(function (resGlobalMessage) {
                    try {
                        var globalMessage = JSON.parse(resGlobalMessage.getGlobalMessageResult);
                        if (globalMessage.length > 0)
                            if (globalMessage !== globalMessage[0].GlobalMessageText) {
                                vm.globalMesaage = "";
                                vm.globalMesaage = globalMessage[0].GlobalMessageText;
                                //vm.dsProjectSearch = userProjects;

                                $scope.$digest();
                            }

                    } catch (err) {
                        hideLoading();
                        var dataToSend = {
                            "method": "updateGlobalMessage", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { });
                    }
                });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "updateGlobalMessage", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { });
        }
    }

    function searchProject(inputId) {
        var selectedPeoplefilter = "";
        var dsProjects = [];
        var projCombo = $("#" + inputId).data("kendoComboBox");
        if (projCombo == undefined) {
            $("#" + inputId).kendoComboBox({
                dataTextField: "ProjectText",
                dataValueField: "ProblemUniqueID",
                dataSource: dsProjects,
                minLength: 3,
                placeholder: projectPickerPlaceholder,
                select: function (e) {
                    if (inputId == 'ddl_Copy_Prog')
                        vm.TemplateProjectID = e.dataItem.ProblemUniqueID;
                    else
                        vm.projectTypeSelector.ParentProgram = e.dataItem.ProblemUniqueID;
                }
            });
            try {
                $('#' + inputId).data().kendoComboBox.input.on('keydown', function (e) {
                    if (e.keyCode == 13) {
                        // if (canFilter == true) {
                        var projCombo = $("#" + inputId).data("kendoComboBox");

                        var userFilter = "";
                        console.log(projCombo.value());
                        var input = projCombo.input[0].value;
                        console.log(input);
                        if (input.length >= 3) {
                            displayLoading();


                            var conf = vm.projectTypeSelector.isConfidential == undefined ? '' : vm.projectTypeSelector.isConfidential;
                            var dataToSend = {
                                "strUserAdId": currentUserId + 'Þ' + conf, "strFilterString": input
                            };
                            $.when(GETPostService.postDataWCFAsync("getProjectByUserId", dataToSend)).then(function (resProj) {
                                try {
                                    dsProjects = JSON.parse(resProj);
                                    projCombo.setDataSource(dsProjects);
                                    projCombo.open();
                                    hideLoading();
                                }
                                catch (err) {
                                    var dataToSend = {
                                        "method": "searchProject", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
                    else {
                        dsProjects = [];
                        var projCombo = $("#" + inputId).data("kendoComboBox");
                        if (e.keyCode == 8) {
                            projCombo.value('')
                        }


                        projCombo.setDataSource(dsProjects);
                        projCombo.close();
                    }
                });
            }
            catch (err) {
                var dataToSend = {
                    "method": "searchProject", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
                hideLoading();
            }

        }
        else {
            projCombo.setDataSource(dsProjects);
            hideLoading();
        }
        return selectedPeoplefilter;
    }
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

        $("#gridHubSettingsProblemCapture").kendoTreeList({
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
                    template: '#if(LookUpName != "Project Board Section") { # <input type="checkbox" #= data.HubValue ? checked="checked" : "" #  class="HubValueChkbx"/># } #'
                }
            ],
            dataBound: function () {

                $(".HubValueChkbx").bind("click", function (e) {
                    var grid = $("#gridHubSettingsProblemCapture").data("kendoTreeList");
                    var dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (dataItem != null)
                        dataItem.set("HubValue", this.checked);
                    //dataItem.dirty = true;
                });
            },

        });
        //  $('#gridHubSettings .k-grid-header').hide();
    };
    function initTopMenu() {
        var isMobile = /iPhone|iPhone XR|iPad|iPod|Android|Tablet|Windows Phone|blackberry|webOS/i.test(navigator.userAgent.toLowerCase());
        //if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        //    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        //    isMobile = true;
        //}
        //var platform = ["Win32", "Android", "iOS"];
        var isTouchCapable = 'ontouchstart' in window ||
            window.DocumentTouch && document instanceof window.DocumentTouch ||
            navigator.maxTouchPoints > 0 ||
            window.navigator.msMaxTouchPoints > 0;
        var isChrome = false;
        isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (navigator.platform == "Win32") {
            if (!isChrome) {
                alert(chromeBrowserMsg);
            }
            //else if (!isChrome && !isTouchCapable) {
            //    alert(chromeBrowserMsg);
            //}
        } else {
            if (isMobile || navigator.platform == "iOS") {
                alert(mobileDeviceMsg);
            }
        }
        var img = document.createElement("img");
        img.width = "85";

        var src = document.getElementById("logo");
        switch (environment) {
            case "qa": img.src = "../Images/spot-qa-logo.svg"; break;
            case "training": img.src = "../Images/spot-training-logo.svg"; break;
            default: img.src = "../Images/spot_logo.svg";
        }
        src.appendChild(img);

        $.when(GETPostService.getUserAdID()).then(function (userId) {
            if (userId != "") {
                $.when(GETPostService.postDataWCF("getUserPermissionById", currentUserId), GETPostService.postDataWCF("getGlobalMessage"))
                    .then(function (resUserPermission, resGlobalMessage) {
                        vm.CurrentUserNameValue = currentUserName;
                        var userPermission = JSON.parse(resUserPermission.getUserPermissionByIdResult);
                        vm.MailSubject = "DL.SPOTSupport@takeda.com?Subject=SPOT Support Request " + currentUserName + ' (Logged on ' + datetimefor + ')';    //Functions

                        vm.canManageUser = (userPermission.filter(function (entry) { return entry.Permission == manageUsers; })).length > 0 ? true : false;
                        vm.canCreateProj = (userPermission.filter(function (entry) { return entry.Permission == createProject; })).length > 0 ? true : false;
                        vm.globalMesaage = "";
                        var globalMessage = JSON.parse(resGlobalMessage.getGlobalMessageResult);
                        if (globalMessage.length > 0)
                            vm.globalMesaage = globalMessage[0].GlobalMessageText;
                        setInterval(updateGlobalMessage, 900000);
                        $scope.$digest();

                    });
            }
        });
        //$.when(GETPostService.postDataWCF("getUserPermissionById", currentUserId), GETPostService.postDataWCF("getGlobalMessage"))
        //    .then(function (resUserPermission, resGlobalMessage) {
        //        debugger;
        //        var userPermission = JSON.parse(resUserPermission.getUserPermissionByIdResult);
        //        vm.MailSubject = "DL.SPOTSupport@takeda.com?Subject=SPOT Support Request " + currentUserName + ' (Logged on ' + datetimefor + ')';    //Functions

        //        //var a=userPermission.find(item => item.Permission == manageUsers);
        //        vm.canManageUser = (userPermission.filter(function (entry) { return entry.Permission == manageUsers; })).length > 0 ? true : false;
        //        vm.canCreateProj = (userPermission.filter(function (entry) { return entry.Permission == createProject; })).length > 0 ? true : false;
        //        vm.globalMesaage = "";
        //        var globalMessage = JSON.parse(resGlobalMessage.getGlobalMessageResult);
        //        if (globalMessage.length > 0)
        //            vm.globalMesaage = globalMessage[0].GlobalMessageText;
        //        //vm.dsProjectSearch = userProjects;

        //        setInterval(updateGlobalMessage, 900000);
        //        $scope.$digest();

        //    });
    };
};