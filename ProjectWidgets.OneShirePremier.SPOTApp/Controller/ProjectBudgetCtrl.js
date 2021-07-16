//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('ProjectBudgetCtrl', ProjectBudgetCtrl)
ProjectBudgetCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function ProjectBudgetCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    var TotalCapexY1 = 0;
    var TotalOpexY1 = 0;
    var className = "ProjectBudgetCtrl";
    var capexActuals;
    var opexActuals;
    var IsBudgetAdmin = false;
    var CanUpdateBudgetOwner = false;
    var gridBudgetIO = [];
    var deletedBudgetIO = [];
    var capexChangeCount = 0;
    var firstSave = true;
    var yearLabel = [];
    var isPreliminary = 0;
    //vm.blankCondition = "vm.SelectedBudget.CapitalBudgetID == null";
    vm.IsOpen = true;
    vm.dateErrorMsg = InValidDateFormat;
    vm.dateFormatlabel = dateLabel;
    vm.SelectedBudget = {};
    vm.dsFundingStatus = [];
    vm.dsCapitalDeviationMonthly = [];
    vm.dsCapitalDeviationYearly = [];
    vm.dsCapExRequired = [];
    vm.dsLocalCurrency = [];
    //vm.dsProjectClassification = [];
    vm.dsBudgetWhere = [];
    vm.dsBudgetWhy = [];
    vm.predefinedInvestment = [];
    vm.dsBudgetOwner = [];
    vm.SeletedProjectId = "";
    vm.LocalCurrencyAbb = "";
    vm.LocalCurrencyPlaceholderAbb = "";
    // vm.validator;
    vm.capexRequired = false;
    vm.opexRequired = false;
    vm.capexOpexSubmit = false;
    vm.isEditable = false;
    vm.isCapexRequiredEditable = false;
    vm.isBudgetIdEditable = false;
    vm.isBudgetOwnerEditable = false;
    //Functions
    var Isload = true;
    var capitalBudgetIdBlank = false;
    var permission = [];
    var capexRequiredNo = false;
    vm.isDeleteBudgetIO = false;
    vm.initProjectBudget = initProjectBudget;
    //vm.onCapexChange = onCapexChange;
    //vm.onOpexChange = onOpexChange;
    vm.updateBudgetdata = updateBudgetdata;
    vm.UpdateForecastdata = UpdateForecastdata;
    vm.AddNewRow = AddNewRow;
    vm.GetFxRates = GetFxRates;

    //const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

    $rootScope.$on("getBudgetData", function (event) {
        displayLoading();
        prepareDataForBudget();
    });

    function GetFxRates() {
        var myWindow = $("#dialogFxRate");
        myWindow.kendoWindow({
            content: "CurrencyFxRate.html?v=" + buildNo,
            modal: true,
        });
        $.when(GETPostService.getCurrencyFxRate()).then(function (response) {
            myWindow.data("kendoWindow").open();
        });
    }

    
    function prepareDataForBudget() {
        //var lookup = Funding Status, Capital Deviation Codes Monthly, Capital Deviation Codes YTD;
        //capexChangeCount = 0;
        //firstSave = true;
        try {
            SeletedProjectId = getParameterByName(window.location.search, "ProblemID");
            //vm.crApprovalDateError = false;
            vm.definitiveCRDateError = false;
            //vm.APISDateError = false;
            vm.fundingNeedDateError = false;
            vm.capexOpexSubmit = false;
            vm.isCapexRequiredEditable = false;
            vm.isBudgetIdEditable = false;
            vm.isBudgetOwnerEditable = false;
            vm.IsOpen = true;
            vm.options = {
                format: "n0",
                decimals: 0,
                min: 0,
                restrictDecimals: true
            }
            capitalBudgetIdBlank = false;
            var dataToSendForPortfolio = {
                "ProjectUID": SeletedProjectId, "UserID": currentUserId
            };
            var lookup = fundingStatus + "," + capitalDeviationCodesMonthly + "," + CapitalDeviationCodesYTD + "," + localcurrency + "," + where + "," + why + "," + predefinedInvestment;
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.postDataWCFAsync("getProjectBudgetByID", SeletedProjectId),
                GETPostService.postDataWCFAsync("getProjectBudgetForecastDataY1", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectBudgetForecastData", SeletedProjectId),
                GETPostService.getDataWCFAsync("getUserPermissionByProjectUserId/" + currentUserId + "/" + SeletedProjectId), GETPostService.postDataWCFAsync("getUserPermissionById", currentUserId), GETPostService.postDataWCFAsync("getBudgetIO", SeletedProjectId),
                GETPostService.postDataWCFAsync("getPortfolioOwnerWithCurrency", dataToSendForPortfolio), GETPostService.postDataWCFAsync("getYearLabel"))
                .then(function (resLookup, resBudgetData, resForecastDataY1, resForecastData, resPermission, resUserglobalPermission, resBudgetIO, resBudgetOwners, resYearLabel) {
                    try {
                        var jsonLookupData = JSON.parse(resLookup.getLookupDataResult);
                        var dsPermission = JSON.parse(resPermission.getUserPermissionByProjectUserIdResult);
                        yearLabel = JSON.parse(resYearLabel.getYearLabelResult);
                        if (dsPermission[0].canEdit == true) {
                            vm.isEditable = true;
                        }
                        else { vm.isEditable = false };
                        permission = JSON.parse(resUserglobalPermission.getUserPermissionByIdResult)
                        if (permission != null) {
                            IsBudgetAdmin = false;
                            vm.IsOpen = false;
                            CanUpdateBudgetOwner = false;
                            angular.forEach(permission, function (item, index) {
                                if (item.Permission == updateBudgetPerm)
                                    IsBudgetAdmin = true;
                                else if (item.Permission == UpdateBudgetOwner) {
                                    CanUpdateBudgetOwner = true;
                                    vm.isBudgetOwnerEditable = true;
                                }
                                else if (item.Permission == DeleteBudgetIO)
                                {
                                    vm.isDeleteBudgetIO = true;
                                }
                            });
                        }
                        vm.dsBudgetOwner = JSON.parse(resBudgetOwners);
                        vm.dsCapExRequired = [{ LookUpMemberID: "1", LookUpMemberName: "Yes" }, { LookUpMemberID: "0", LookUpMemberName: "No" }];
                        vm.dsBudgetData = JSON.parse(resBudgetData.getProjectBudgetByIDResult);
                        vm.dsForecastDataY1 = JSON.parse(resForecastDataY1.getProjectBudgetForecastDataY1Result);
                        vm.dsForecastData = JSON.parse(resForecastData.getProjectBudgetForecastDataResult);

                        vm.capexForecast = JSON.parse(resForecastData.getProjectBudgetForecastDataResult).filter(function (entry) {
                            return entry.BudgetDataTypeID == capexID;
                        }).reverse();


                        vm.opexForecast = JSON.parse(resForecastData.getProjectBudgetForecastDataResult).filter(function (entry) {
                            return entry.BudgetDataTypeID == opexID;
                        }).reverse();

                        vm.capexForecastY1 = JSON.parse(resForecastDataY1.getProjectBudgetForecastDataY1Result).filter(function (entry) {
                            return entry.BudgetDataTypeID == capexID;
                        });


                        vm.opexForecastY1 = JSON.parse(resForecastDataY1.getProjectBudgetForecastDataY1Result).filter(function (entry) {
                            return entry.BudgetDataTypeID == opexID;
                        });


                        gridBudgetIO = JSON.parse(resBudgetIO.getBudgetIOResult);
                        vm.SelectedBudget = vm.dsBudgetData[0];
                        isPreliminary = vm.SelectedBudget.PreliminaryCount > 0 ? 1 : 0;

                        if (isPreliminary == 1) {
                            vm.capexForecastCommittedSpend = vm.capexForecast.filter(function (entry) {
                                return entry.ActiveID == preliminary;
                            })[0].CommittedSpend;
                            vm.opexForecastCommittedSpend = vm.opexForecast.filter(function (entry) {
                                return entry.ActiveID == preliminary;
                            })[0].CommittedSpend;
                        }
                        else {
                            vm.capexForecastCommittedSpend = vm.capexForecast.filter(function (entry) {
                                return entry.ActiveID == currentForecastId;
                            })[0].CommittedSpend;
                            vm.opexForecastCommittedSpend = vm.opexForecast.filter(function (entry) {
                                return entry.ActiveID == currentForecastId;
                            })[0].CommittedSpend;
                        }

                        vm.capexRequired = vm.SelectedBudget.CapExRequired == true ? true : false;
                        vm.opexRequired = vm.SelectedBudget.OpExRequired == true ? true : false;
                        if (vm.capexRequired || vm.opexRequired) {
                            vm.capexOpexSubmit = true;
                        }
                        if (vm.capexRequired == true) {
                            //capexChangeCount = 0;
                            var editCapexRequiredPermissionList = permission.filter(function (entry) {
                                return entry.Permission == EditCapexRequiredPerm;
                            });
                            if (editCapexRequiredPermissionList.length > 0 && vm.isEditable == true) {
                                vm.isCapexRequiredEditable = true;
                            }
                            else
                                vm.isCapexRequiredEditable = false;
                        }
                        else {
                            if (vm.isEditable == true)
                                vm.isCapexRequiredEditable = true;
                        }
                        //Capital BudgetID to be editable by security role
                        if ((vm.SelectedBudget.CapitalBudgetID == "" || vm.SelectedBudget.CapitalBudgetID == null) && vm.isEditable == true) {
                            capitalBudgetIdBlank = true;
                            vm.isBudgetIdEditable = true;
                        }
                        else {
                            var editBudgetIdPermissionList = permission.filter(function (entry) {
                                return entry.Permission == EditBudgetIDPerm;
                            });
                            if (editBudgetIdPermissionList.length > 0 && vm.isEditable == true) {
                                vm.isBudgetIdEditable = true;
                            }
                            else
                                vm.isBudgetIdEditable = false;
                        }
                        vm.dsFundingStatus = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName === fundingStatus;
                        });
                        vm.dsCapitalDeviationMonthly = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName === capitalDeviationCodesMonthly;
                        });
                        vm.dsCapitalDeviationYearly = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName === CapitalDeviationCodesYTD;
                        });
                        vm.dsLocalCurrency = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName === localcurrency;
                        });
                        //vm.dsProjectClassification = jsonLookupData.filter(function (entry) {
                        //    return entry.LookUpName === CapitalProjectClassification;
                        //});
                        vm.dsBudgetWhere = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName === where;
                        });
                        vm.dsBudgetWhy = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName === why;
                        });
                        vm.dsPreDefinedInvestment = jsonLookupData.filter(function (entry) {
                            return entry.LookUpName === predefinedInvestment;
                        });

                        //vm.SelectedBudget.CapExRequired = vm.SelectedBudget.CapExRequired == false ? "No" : "Yes";
                        if (vm.SelectedBudget.CapExRequired != null) {
                            var selectedFunding = vm.dsCapExRequired.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedBudget.CapExRequired;
                            });
                            vm.SelectedBudget.CapExRequired = selectedFunding[0];
                        }
                        if (vm.SelectedBudget.OpExRequired != null) {
                            var selectedFunding1 = vm.dsCapExRequired.filter(function (entry) {
                                return entry.LookUpMemberID == vm.SelectedBudget.OpExRequired;
                            });
                            vm.SelectedBudget.OpExRequired = selectedFunding1[0];
                        }
                        if (vm.dsBudgetData[0] != null) {
                            //vm.IsOpen = vm.SelectedBudget.Isopen;
                            if (vm.LocalCurrencyAbb != null) {
                                vm.LocalCurrencyAbb = "(" + vm.SelectedBudget.LocalCurrencyAbbreviation + ")";
                                vm.LocalCurrencyPlaceholderAbb = vm.SelectedBudget.LocalCurrencyAbbreviation;
                            }
                            if (vm.SelectedBudget.LastSubmitted != null) {
                                vm.SelectedBudget.LastSubmitted = kendo.toString(kendo.parseDate(vm.SelectedBudget.LastSubmitted), 'dd-MMM-yy  hh:mm:ss')
                            }
                            else
                                vm.SelectedBudget.LastSubmitted = "";
                            if (vm.SelectedBudget.PreliminaryLastSubmitted != null) {
                                vm.SelectedBudget.PreliminaryLastSubmitted = kendo.toString(kendo.parseDate(vm.SelectedBudget.PreliminaryLastSubmitted), 'dd-MMM-yy  hh:mm:ss')
                            }
                            else
                                vm.SelectedBudget.PreliminaryLastSubmitted = "";
                            if (vm.SelectedBudget.FundingStatusID != null) {
                                var selectedval = vm.dsFundingStatus.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedBudget.FundingStatusID;
                                });
                                vm.SelectedBudget.FundingStatusID = selectedval[0];
                            }
                            if (vm.SelectedBudget.MTDPDeviationCodeID != null) {
                                var selectedval = vm.dsCapitalDeviationMonthly.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedBudget.MTDPDeviationCodeID;
                                });
                                vm.SelectedBudget.MTDPDeviationCodeID = selectedval[0];
                            }
                            if (vm.SelectedBudget.AFPDeviationCodeID != null) {
                                var selectedval = vm.dsCapitalDeviationYearly.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedBudget.AFPDeviationCodeID;
                                });
                                vm.SelectedBudget.AFPDeviationCodeID = selectedval[0];
                            }
                            //if (vm.SelectedBudget.ProjectClassificationID != null) {
                            //    var selectedval = vm.dsProjectClassification.filter(function (entry) {
                            //        return entry.LookUpMemberID == vm.SelectedBudget.ProjectClassificationID;
                            //    });
                            //    vm.SelectedBudget.ProjectClassificationID = selectedval[0];
                            //}
                            if (vm.SelectedBudget.WhereID != null) {
                                var selectedval2 = vm.dsBudgetWhere.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedBudget.WhereID;
                                });
                                vm.SelectedBudget.WhereID = selectedval2[0];
                            }
                            if (vm.SelectedBudget.WhyID != null) {
                                var selectedval3 = vm.dsBudgetWhy.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedBudget.WhyID;
                                });
                                vm.SelectedBudget.WhyID = selectedval3[0];
                            }
                            if (vm.SelectedBudget.PredefinedInvestmentID != null) {
                                var selectedval4 = vm.dsPreDefinedInvestment.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedBudget.PredefinedInvestmentID;
                                });
                                vm.SelectedBudget.PredefinedInvestmentID = selectedval4[0];
                            }
                            if (vm.SelectedBudget.LocalCurrencyID != null) {
                                var selectedval = vm.dsLocalCurrency.filter(function (entry) {
                                    return entry.LookUpMemberID == vm.SelectedBudget.LocalCurrencyID;
                                });
                                vm.SelectedBudget.LocalCurrencyID = selectedval[0];
                            }
                            if (vm.SelectedBudget.BudgetOwner != null) {
                                var selectedval = vm.dsBudgetOwner.filter(function (entry) {
                                    return entry.PortfolioOwnerID == vm.SelectedBudget.BudgetOwner;
                                });
                                vm.SelectedBudget.BudgetOwner = selectedval[0];
                            }
                            if (((vm.SelectedBudget.BudgetOwner == null || vm.SelectedBudget.BudgetOwner == "") && vm.isEditable == true) || (vm.SelectedBudget.BudgetOwner != null && vm.SelectedBudget.BudgetOwner != '' && vm.SelectedBudget.GMSBudgetOwnerEditable == true && vm.isEditable == true && vm.SelectedBudget.CapExRequired.LookUpMemberID == "0")) {
                                vm.isBudgetOwnerEditable = true;
                            }
                        }
                        if (vm.isEditable == false) {
                            vm.IsOpen = false;
                        }
                        else {
                            if (vm.SelectedBudget.Isopen == "1") {
                                vm.IsOpen = true;
                            }
                        }

                        if (IsBudgetAdmin) {
                            vm.IsOpen = true;
                            //vm.isBudgetOwnerEditable = true;
                        }
                        if (Isload) {
                            bindChangeComboBox("funding");
                            bindChangeComboBox("currency");
                            bindChangeComboBox("preDefinedInvest");
                            bindChangeComboBox("Where");
                            bindChangeComboBox("Why");
                            //bindChangeComboBox("projectclassification");
                            budgetCapexGrid();
                            budgetCapexGridY1();
                            budgetOpexGrid();
                            budgetOpexGridY1();
                            bindChangeDatePicker("definitiveCRApprovalDate");
                            bindChangeDatePicker("fundingNeedDate");
                            bindChangeDatePicker("crApprovalDate");
                            bindChangeDatePicker("APISDate");
                            InitkGridBudgetIO();
                            //$("#gridbudgetIO").data("kendoGrid").addRow();
                            Isload = false;
                        }
                        else {
                            $('#gridBudgetOpexY1').data('kendoGrid').dataSource.read();
                            $('#gridBudgetOpex').data('kendoGrid').dataSource.read();
                            $('#gridBudgetCapexY1').data('kendoGrid').dataSource.read();
                            $('#gridBudgetCapex').data('kendoGrid').dataSource.read();
                            $('#gridbudgetIO').data('kendoGrid').dataSource.read();
                            // $("#gridbudgetIO").data("kendoGrid").addRow();
                        }
                        $scope.$digest();
                        hideLoading();
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "prepareDataForBudget", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) { alert(errormessage) });
                        hideLoading();
                    }
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "prepareDataForBudget", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }


    };
    function GetProjectBudgetData() {
        try {
            vm.capexOpexSubmit = false;
            vm.capexRequired = vm.SelectedBudget.CapExRequired == true ? true : false;
            vm.opexRequired = vm.SelectedBudget.OpExRequired == true ? true : false;
            if (vm.capexRequired || vm.opexRequired) {
                vm.capexOpexSubmit = true;
            }
            if (vm.SelectedBudget.CapExRequired != null) {
                var selectedFunding = vm.dsCapExRequired.filter(function (entry) {
                    return entry.LookUpMemberID == vm.SelectedBudget.CapExRequired;
                });
                vm.SelectedBudget.CapExRequired = selectedFunding[0];
            }
            if (vm.SelectedBudget.OpExRequired != null) {
                var selectedFunding1 = vm.dsCapExRequired.filter(function (entry) {
                    return entry.LookUpMemberID == vm.SelectedBudget.OpExRequired;
                });
                vm.SelectedBudget.OpExRequired = selectedFunding1[0];
            }
            if (vm.SelectedBudget != null) {
                //vm.IsOpen = vm.SelectedBudget.Isopen;
                if (vm.SelectedBudget.LastSubmitted != null) {
                    vm.SelectedBudget.LastSubmitted = kendo.toString(kendo.parseDate(vm.SelectedBudget.LastSubmitted), 'dd-MMM-yy  hh:mm:ss')
                }
                if (vm.SelectedBudget.PreliminaryLastSubmitted != null) {
                    vm.SelectedBudget.PreliminaryLastSubmitted = kendo.toString(kendo.parseDate(vm.SelectedBudget.PreliminaryLastSubmitted), 'dd-MMM-yy  hh:mm:ss')
                }
                if (vm.SelectedBudget.FundingStatusID != null) {
                    var selectedval = vm.dsFundingStatus.filter(function (entry) {
                        return entry.LookUpMemberID == vm.SelectedBudget.FundingStatusID;
                    });
                    vm.SelectedBudget.FundingStatusID = selectedval[0];
                }
                if (vm.SelectedBudget.MTDPDeviationCodeID != null) {
                    var selectedval = vm.dsCapitalDeviationMonthly.filter(function (entry) {
                        return entry.LookUpMemberID == vm.SelectedBudget.MTDPDeviationCodeID;
                    });
                    vm.SelectedBudget.MTDPDeviationCodeID = selectedval[0];
                }
                if (vm.SelectedBudget.AFPDeviationCodeID != null) {
                    var selectedval = vm.dsCapitalDeviationYearly.filter(function (entry) {
                        return entry.LookUpMemberID == vm.SelectedBudget.AFPDeviationCodeID;
                    });
                    vm.SelectedBudget.AFPDeviationCodeID = selectedval[0];
                }
                //if (vm.SelectedBudget.ProjectClassificationID != null) {
                //    var selectedval = vm.dsProjectClassification.filter(function (entry) {
                //        return entry.LookUpMemberID == vm.SelectedBudget.ProjectClassificationID;
                //    });
                //    vm.SelectedBudget.ProjectClassificationID = selectedval[0];
                //}
                if (vm.SelectedBudget.WhereID != null) {
                    var selectedval2 = vm.dsBudgetWhere.filter(function (entry) {
                        return entry.LookUpMemberID == vm.SelectedBudget.WhereID;
                    });
                    vm.SelectedBudget.WhereID = selectedval2[0];
                }
                if (vm.SelectedBudget.WhyID != null) {
                    var selectedval3 = vm.dsBudgetWhy.filter(function (entry) {
                        return entry.LookUpMemberID == vm.SelectedBudget.WhyID;
                    });
                    vm.SelectedBudget.WhyID = selectedval3[0];
                }
                if (vm.SelectedBudget.PredefinedInvestmentID != null) {
                    var selectedval4 = vm.dsPreDefinedInvestment.filter(function (entry) {
                        return entry.LookUpMemberID == vm.SelectedBudget.PredefinedInvestmentID;
                    });
                    vm.SelectedBudget.PredefinedInvestmentID = selectedval4[0];
                }


                if (vm.SelectedBudget.LocalCurrencyID != null) {
                    var selectedval = vm.dsLocalCurrency.filter(function (entry) {
                        return entry.LookUpMemberID == vm.SelectedBudget.LocalCurrencyID;
                    });
                    vm.SelectedBudget.LocalCurrencyID = selectedval[0];
                }
                if (vm.SelectedBudget.BudgetOwner != null) {
                    var selectedval = vm.dsBudgetOwner.filter(function (entry) {
                        return entry.PortfolioOwnerID == vm.SelectedBudget.BudgetOwner;
                    });
                    vm.SelectedBudget.BudgetOwner = selectedval[0];
                }

            }
            if (((vm.SelectedBudget.BudgetOwner == null || vm.SelectedBudget.BudgetOwner == "") && vm.isEditable == true) || (vm.SelectedBudget.BudgetOwner != null && vm.SelectedBudget.BudgetOwner != '' && vm.SelectedBudget.GMSBudgetOwnerEditable == true && vm.isEditable == true && vm.SelectedBudget.CapExRequired.LookUpMemberID == "0")) {
                vm.isBudgetOwnerEditable = true;
            }
            else { vm.isBudgetOwnerEditable = false; }
            if (IsBudgetAdmin) {
                vm.IsOpen = true;
            }
            if (CanUpdateBudgetOwner)
                vm.isBudgetOwnerEditable = true;
        }
        catch (err) {
            var dataToSend = {
                "method": "GetProjectBudgetData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }
    }
    function budgetCapexGrid() {

        var cell_index = 0; //cell index 0 based
        var row_index = 0; //row index 0 based
        var rowData = null;
        var dataSource1 = new kendo.data.DataSource({
            // data: vm.capexForecast,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.capexForecast);
                }
            },
            sort: [{ field: "ActiveOrder", dir: "asc" }
            ],
            schema: {
                model: {
                    id: 'BudgetDataID',
                    fields: {
                        BudgetDataID: {
                            hidden: true
                        },
                        Active: { editable: false },
                        LocalCurrencyAbbreviation: { editable: false },
                        Historical: {
                            type: "number", editable: false
                        },
                        Apr: {
                            type: "number"
                        },
                        May: {
                            type: "number"

                        },
                        Jun: {
                            type: "number"
                        },
                        Jul: {
                            type: "number"
                        },
                        Aug: {
                            type: "number"
                        },
                        Sep: {
                            type: "number"
                        },
                        Oct: {
                            type: "number"
                        },
                        Nov: {
                            type: "number"
                        },
                        Dec: {
                            type: "number"
                        },
                        Jan: {
                            type: "number"
                        },
                        Feb: {
                            type: "number"
                        },
                        Mar: {
                            type: "number"
                        },
                        AnnualTotal: { type: "number", editable: false },
                        Y1: {
                            type: "number", editable: false
                        },
                        Y2: {
                            type: "number"
                        },
                        Y3: {
                            type: "number"
                        },
                        Y4: {
                            type: "number"
                        },
                        Y5: {
                            type: "number"
                        },
                        CumulativeTotal: {
                            type: "number", editable: false
                        }
                    }
                }
            }
        });
        var capexCol = [
            { field: "BudgetDataID", hidden: true },
            { field: "Active", title: "Reference", headerAttributes: { "class": "wrap-header" }, width: "5%", editable: false },
            { field: "LocalCurrencyAbbreviation", title: "Currency", headerAttributes: { "class": "wrap-header" }, width: "4%", editable: false },
            { field: "Historical", headerAttributes: { "class": "wrap-header" }, width: "5%", editable: false, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Apr", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "May", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jun", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jul", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Aug", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Sep", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Oct", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Nov", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Dec", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jan", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Feb", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Mar", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "AnnualTotal", title: yearLabel[0].TblLabel, editable: false, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Y1", title: yearLabel[1].TblLabel, editable: false, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Y2", title: yearLabel[2].TblLabel, editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Y3", title: yearLabel[3].TblLabel, editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Y4", title: yearLabel[4].TblLabel, editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Y5", title: yearLabel[5].TblLabel, editor: editNumber, format: "{0:#,#}", headerAttributes: { "class": "wrap-header" }, attributes: { class: "txt-float-R" } },
            { field: "CumulativeTotal", title: "Total CAPEX", headerAttributes: { "class": "wrap-header" }, editable: false, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            //{ field: "Total" }
        ];
        $("#gridBudgetCapex").kendoGrid({

            // the column fields should match the excel columns
            columns: capexCol,
            dataSource: dataSource1,
            // selectable: "multiple cell",
            allowCopy: true,
            editable: true,
            navigatable: true,
            edit: function (e) {
                try {
                    if (e.model.Active == "Previous" || e.model.Active == "Plan")
                    { this.closeCell(); }
                    else
                    {
                        if (vm.dsBudgetData[0].PreliminaryCount != 0 && e.model.Active == "Current") {
                            this.closeCell();
                        }
                        if (vm.IsOpen) {
                            var fieldName = grid.columns[e.container.index()].field;
                            if (months.indexOf(fieldName) != -1 && (months.indexOf(fieldName) < e.model.ActualMonths)) {
                                //if (e.model.ActualMonths.indexOf(fieldName) > -1) {
                                this.closeCell();
                            }
                            else {
                                $("[name='" + fieldName + "']", e.container).blur(function () {
                                    CalculateTotal("gridBudgetCapex");
                                });
                                $(e.container).keydown(function (e) {
                                    if (e.keyCode == 9) {
                                        var grid = $('#gridBudgetCapex').data('kendoGrid');
                                        var row = $(this).closest("tr");
                                        var rowIdx = $("tr", grid.tbody).index(row);
                                        cell_index = Number($("td", row).index(this)) + 1;
                                        rowData = grid.dataItem(row)
                                    }
                                })
                            }
                        }
                        else { this.closeCell(); }

                    }
                }
                catch (err) {
                    var dataToSend = {
                        "method": "budgetCapexGrid(edit)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                          .then(function (response) { alert(errormessage) });
                }
            },
            dataBound: function (e) {
                //Get the datasource here
                var grid = $("#gridBudgetCapex").data("kendoGrid");
                var data = grid.dataSource.data();
                $.each(data, function (i, row) {
                    if (vm.dsBudgetData[0].PreliminaryCount === 0) {
                        if (row.Active != "Current") {
                            $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#f1f1f1");
                        }
                        else
                            $('tr[data-uid="' + row.uid + '"] ').css("background-color", "white");
                    }
                    else {
                        if (row.Active != "Preliminary") {
                            $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#f1f1f1");
                        }
                        else
                            $('tr[data-uid="' + row.uid + '"] ').css("background-color", "white");
                    }
                })
                var data = this._data.filter(function (x) {
                    if (vm.dsBudgetData[0].PreliminaryCount === 0) return x.Active == "Current";
                    else {
                        return x.Active == "Preliminary";

                    }

                }).map(function (x) { return x });
                //Loop through each item
                for (var x = 0; x < data.length; x++) {
                    //Get the currently active item
                    var dataItem = data[x];
                    var actualmonths = dataItem.ActualMonths;
                    var i = 5;
                    //Access table row based on uid
                    var tr = $("#gridBudgetCapex").find("[data-uid='" + dataItem.uid + "']");
                    var noneditcell = $("td:nth-child(17)", tr);
                    noneditcell.addClass("budgetActuals");
                    noneditcell = $("td:nth-child(18)", tr);
                    noneditcell.addClass("budgetActuals");
                    noneditcell = $("td:nth-child(23)", tr);
                    noneditcell.addClass("budgetActuals");
                    //Set Current cell 
                    noneditcell = $("td:nth-child(3)", tr);
                    noneditcell.addClass("budgetActuals");
                    //Set Historical cell 
                    noneditcell = $("td:nth-child(4)", tr);
                    noneditcell.addClass("budgetActuals");
                    for (var index = 0; index < actualmonths; index++) {
                        //Access cell object
                        var cell = $("td:nth-child(" + (i + index) + ")", tr);
                        //Get the cell content here
                        //Assign the css style to cell
                        cell.addClass("budgetActuals");

                    }
                    if (vm.dsBudgetData[0].PreliminaryCount != 0) {
                        if (actualmonths != "12") {
                            var cell1 = $("td:nth-child(" + (i + parseInt(actualmonths)) + ")", tr);
                            cell1.addClass("PrelimItalic");
                            // cell1.css("font-style", "italic");
                            //cell1.css("color", "blue !important");
                        }
                    }
                }
            }

        });
        var grid = $('#gridBudgetCapex').data('kendoGrid');
        $(grid.tbody).on("click", "td", function (e) {
            var row = $(this).closest("tr");
            var rowIdx = $("tr", grid.tbody).index(row);
            cell_index = $("td", row).index(this);
            rowData = grid.dataItem(row)
        });
        // grid.element.on('mousedown', function (e) {  });
        grid.element.on('keydown', function (e) {
            try {
                if (e.keyCode === 86 && e.ctrlKey === true && vm.IsOpen) {
                    var textarea = $("#ta");
                    textarea.val("");
                    textarea.focus();
                    setTimeout(function (e) {
                        var value = $.trim(textarea.val());
                        var grid = $("#gridBudgetCapex").data("kendoGrid");
                        var rows = value.split('\n');
                        var data = [];
                        for (var i = 0; i < rows.length; i++) {
                            var cells = rows[i].split('\t');
                            for (var j = 0; j < cells.length; j++) {
                                data.push(cells[j]);
                            }
                        };
                        var columns = $("#gridBudgetCapex").data("kendoGrid").columns
                        for (var index = cell_index; (index < columns.length && data.length > 0) ; index++) {
                            var dataField = $(grid.thead.find("th")[index]).attr("data-field");
                            if (dataField != "Y1" && dataField != "Active" && dataField != "Historical" && dataField != "AnnualTotal" && dataField != "CumulativeTotal") {
                                if (rowData["ActualMonths"] != null) {
                                    if (rowData["ActualMonths"].indexOf(dataField) == -1)
                                    { rowData.set(dataField, data.shift()); }
                                }
                                else {
                                    rowData.set(dataField, data.shift());
                                }
                            }
                        }
                        grid.refresh();
                        CalculateTotal("gridBudgetCapex");
                        textarea.val("");
                    }, 1)
                }

            }
            catch (err) {
                var dataToSend = {
                    "method": "budgetCapexGrid(keydown)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                      .then(function (response) { alert(errormessage) });
            }
        })
    };
    function budgetCapexGridY1() {
        var cell_index = 0; //cell index 0 based
        var row_index = 0; //row index 0 based
        var rowData = null;
        var dataSource2 = new kendo.data.DataSource({
            //data: vm.capexForecastY1,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.capexForecastY1);
                }
            },
            sort: [{ field: "Active", dir: "desc" }
            ],
            schema: {
                model: {
                    id: 'BudgetDataID',
                    fields: {
                        BudgetDataID: {
                            hidden: true
                        },
                        Active: { editable: false },
                        //Historical: {
                        //    type: "string", editable: false
                        //},
                        LocalCurrencyAbbreviation: { editable: false },
                        Apr: {
                            type: "number"
                        },
                        May: {
                            type: "number"

                        },
                        Jun: {
                            type: "number"
                        },
                        Jul: {
                            type: "number"
                        },
                        Aug: {
                            type: "number"
                        },
                        Sep: {
                            type: "number"
                        },
                        Oct: {
                            type: "number"
                        },
                        Nov: {
                            type: "number"
                        },
                        Dec: {
                            type: "number"
                        },
                        Jan: {
                            type: "number"
                        },
                        Feb: {
                            type: "number"
                        },
                        Mar: {
                            type: "number"
                        },

                    }
                }
            }
        });
        var capexColY1 = [
            { field: "BudgetDataID", hidden: true },
            { field: "Active", title: yearLabel[6].TblLabel, headerAttributes: { "class": "wrap-header" }, width: "10%", editable: false },
            // { field: "Historical", headerAttributes: { "class": "wrap-header" }, width: "10%", editable: false },
            { field: "LocalCurrencyAbbreviation", title: "Currency", headerAttributes: { "class": "wrap-header" }, width: "5%", editable: false, attributes: { class: "txt-float-R" } },
            { field: "Apr", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "May", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jun", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jul", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Aug", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Sep", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Oct", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Nov", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Dec", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jan", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Feb", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Mar", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } }
            //{ field: "Total" },       
            //{ field: "Total" }
        ];
        $("#gridBudgetCapexY1").kendoGrid({
            // the column fields should match the excel columns
            columns: capexColY1,
            dataSource: dataSource2,
            editable: true,
            navigatable: true,
            // selectable: "multiple cell",
            edit: function (e) {
                try {
                    if (vm.IsOpen) {
                        var grid = this;
                        var fieldName = grid.columns[e.container.index()].field;
                        $("[name='" + fieldName + "']", e.container).blur(function () {
                            updateY1InCapex();
                        });

                        $(e.container).keydown(function (e) {
                            if (e.keyCode == 9) {
                                var grid = $('#gridBudgetCapexY1').data('kendoGrid');
                                var row = $(this).closest("tr");
                                var rowIdx = $("tr", grid.tbody).index(row);
                                cell_index = Number($("td", row).index(this)) + 1;
                                rowData = grid.dataItem(row)
                                console.log(rowIdx + cell_index + rowData);
                            }
                        })
                    }
                    else { this.closeCell(); }

                }
                catch (err) {
                    var dataToSend = {
                        "method": "budgetCapexGridY1(edit)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                          .then(function (response) { alert(errormessage) });
                }
            },
            allowCopy: true
        });
        var grid = $('#gridBudgetCapexY1').data('kendoGrid');
        $(grid.tbody).on("click", "td", function (e) {
            var row = $(this).closest("tr");
            var rowIdx = $("tr", grid.tbody).index(row);
            cell_index = $("td", row).index(this);
            rowData = grid.dataItem(row)
        });

        grid.element.on('keydown', function (e) {
            try {
                if (e.keyCode === 86 && e.ctrlKey === true) {
                    var textarea = $("#ta");
                    textarea.val("");
                    textarea.focus();
                    setTimeout(function (e) {
                        var value = $.trim(textarea.val());
                        var grid = $("#gridBudgetCapexY1").data("kendoGrid");
                        var rows = value.split('\n');
                        var data = [];
                        for (var i = 0; i < rows.length; i++) {
                            var cells = rows[i].split('\t');
                            for (var j = 0; j < cells.length; j++) {
                                data.push(cells[j]);
                            }
                        };
                        var columns = $("#gridBudgetCapexY1").data("kendoGrid").columns
                        for (var index = cell_index; (index < columns.length && data.length > 0) ; index++) {
                            var dataField = $(grid.thead.find("th")[index]).attr("data-field");
                            if (dataField != "Active") {
                                rowData.set(dataField, data.shift());
                            }
                        }
                        grid.refresh();
                        updateY1InCapex();
                        textarea.val("");
                    }, 1)
                }
            }
            catch (err) {
                var dataToSend = {
                    "method": "budgetCapexGridY1(keydown)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                      .then(function (response) { alert(errormessage) });
            }
        });
    };
    function budgetOpexGrid() {
        var cell_index = 0; //cell index 0 based
        var row_index = 0; //row index 0 based
        var rowData = null;
        var dataSource2 = new kendo.data.DataSource({
            //data: vm.opexForecast,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.opexForecast);
                }
            },
            sort: [{ field: "ActiveOrder", dir: "asc" }],
            schema: {
                model: {
                    id: 'BudgetDataID',
                    fields: {
                        BudgetDataID: {
                            hidden: true
                        },
                        Active: { editable: false },
                        LocalCurrencyAbbreviation: { editable: false },
                        Historical: {
                            type: "number", editable: false
                        },
                        Apr: {
                            type: "number"
                        },
                        May: {
                            type: "number"

                        },
                        Jun: {
                            type: "number"
                        },
                        Jul: {
                            type: "number"
                        },
                        Aug: {
                            type: "number"
                        },
                        Sep: {
                            type: "number"
                        },
                        Oct: {
                            type: "number"
                        },
                        Nov: {
                            type: "number"
                        },
                        Dec: {
                            type: "number"
                        },
                        Jan: {
                            type: "number"
                        },
                        Feb: {
                            type: "number"
                        },
                        Mar: {
                            type: "number"
                        },
                        AnnualTotal: {
                            type: "number", editable: false
                        },
                        Y1: {
                            type: "number", editable: false
                        },
                        Y2: {
                            type: "number"
                        },
                        Y3: {
                            type: "number"
                        },
                        Y4: {
                            type: "number"
                        },
                        Y5: {
                            type: "number"
                        },
                        CumulativeTotal: {
                            type: "number", editable: false
                        }
                    }
                }
            }
        });
        var opexCol = [
            { field: "BudgetDataID", hidden: true },
            { field: "Active", title: "Reference", headerAttributes: { "class": "wrap-header" }, width: "5%" },
            { field: "LocalCurrencyAbbreviation", title: "Currency", headerAttributes: { "class": "wrap-header" }, width: "4%", editable: false },
            { field: "Historical", headerAttributes: { "class": "wrap-header" }, width: "5%", format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Apr", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "May", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jun", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jul", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Aug", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Sep", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Oct", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Nov", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Dec", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jan", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Feb", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Mar", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "AnnualTotal", title: yearLabel[0].TblLabel, editable: false, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Y1", title: yearLabel[1].TblLabel, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Y2", title: yearLabel[2].TblLabel, editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Y3", title: yearLabel[3].TblLabel, editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Y4", title: yearLabel[4].TblLabel, editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Y5", title: yearLabel[5].TblLabel, editor: editNumber, format: "{0:#,#}", headerAttributes: { "class": "wrap-header" }, attributes: { class: "txt-float-R" } },
            { field: "CumulativeTotal", title: "Total OPEX", headerAttributes: { "class": "wrap-header" }, editable: false, format: "{0:#,#}", attributes: { class: "txt-float-R" } }
        ];
        $("#gridBudgetOpex").kendoGrid({
            // the column fields should match the excel columns
            columns: opexCol,
            dataSource: dataSource2,
            editable: true,
            navigatable: true,
            allowCopy: true,
            edit: function (e) {
                try {
                    if (e.model.Active == "Previous" || e.model.Active == "Plan")
                    { this.closeCell(); }
                    else {
                        if (vm.dsBudgetData[0].PreliminaryCount != 0 && e.model.Active == "Current") {
                            this.closeCell();
                        }
                        if (vm.IsOpen) {
                            var fieldName = grid.columns[e.container.index()].field;
                            if (months.indexOf(fieldName) != -1 && (months.indexOf(fieldName) < e.model.ActualMonths)) {
                                //  if (e.model.ActualMonths.indexOf(fieldName) > -1) {
                                this.closeCell();
                            }
                            else {
                                $("[name='" + fieldName + "']", e.container).blur(function () {
                                    CalculateTotal("gridBudgetOpex");
                                });
                                $(e.container).keydown(function (e) {
                                    if (e.keyCode == 9) {
                                        var grid = $('#gridBudgetOpex').data('kendoGrid');
                                        var row = $(this).closest("tr");
                                        var rowIdx = $("tr", grid.tbody).index(row);
                                        cell_index = Number($("td", row).index(this)) + 1;
                                        rowData = grid.dataItem(row)
                                        console.log(rowIdx + cell_index + rowData);
                                    }
                                })
                            }
                        }
                        else { this.closeCell(); }

                    }
                }
                catch (err) {
                    var dataToSend = {
                        "method": "budgetOpexGrid(edit)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                          .then(function (response) { alert(errormessage) });
                }
            },
            dataBound: function (e) {
                //Get the datasource here
                var grid = $("#gridBudgetOpex").data("kendoGrid");
                var data = grid.dataSource.data();
                $.each(data, function (i, row) {
                    if (vm.dsBudgetData[0].PreliminaryCount === 0) {
                        if (row.Active != "Current") {
                            $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#f1f1f1");
                        }
                        else
                            $('tr[data-uid="' + row.uid + '"] ').css("background-color", "white");
                    }
                    else {
                        if (row.Active != "Preliminary") {
                            $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#f1f1f1");
                        }
                        else
                            $('tr[data-uid="' + row.uid + '"] ').css("background-color", "white");
                    }
                })

                var data = this._data.filter(function (x) {
                    if (vm.dsBudgetData[0].PreliminaryCount === 0) return x.Active == "Current";
                    else
                        return x.Active == "Preliminary";
                })
                .map(function (x) { return x });
                //Loop through each item
                for (var x = 0; x < data.length; x++) {
                    //Get the currently active item
                    var dataItem = data[x];
                    var actualmonths = dataItem.ActualMonths;
                    var i = 5;
                    //Access table row basedon uid
                    var tr = $("#gridBudgetOpex").find("[data-uid='" + dataItem.uid + "']");
                    var noneditcell = $("td:nth-child(17)", tr);
                    noneditcell.addClass("budgetActuals");
                    noneditcell = $("td:nth-child(18)", tr);
                    noneditcell.addClass("budgetActuals");
                    noneditcell = $("td:nth-child(23)", tr);
                    noneditcell.addClass("budgetActuals");

                    //Set Current cell 
                    noneditcell = $("td:nth-child(3)", tr);
                    noneditcell.addClass("budgetActuals");
                    //Set Historical cell 
                    noneditcell = $("td:nth-child(4)", tr);
                    noneditcell.addClass("budgetActuals");

                    for (var index = 0; index < actualmonths; index++) {
                        //Access cell object
                        var cell = $("td:nth-child(" + (i + index) + ")", tr);
                        //Get the cell content here
                        cell.addClass("budgetActuals");
                        // cell.css("font-style", "italic");
                        //Assign the css style to cell
                        //You can hide the cell content using css here


                    }
                    if (vm.dsBudgetData[0].PreliminaryCount != 0) {
                        if (actualmonths != "12") {
                            var cell1 = $("td:nth-child(" + (i + parseInt(actualmonths)) + ")", tr);

                            cell1.addClass("PrelimItalic");
                        }
                    }
                }
            }
        });
        var grid = $('#gridBudgetOpex').data('kendoGrid');

        $(grid.tbody).on("click", "td", function (e) {
            var row = $(this).closest("tr");
            var rowIdx = $("tr", grid.tbody).index(row);
            cell_index = $("td", row).index(this);
            rowData = grid.dataItem(row)
        });
        // grid.element.on('mousedown', function (e) {  });
        grid.element.on('keydown', function (e) {
            try {
                if (e.keyCode === 86 && e.ctrlKey === true) {
                    var textarea = $("#ta");
                    textarea.val("");
                    textarea.focus();
                    setTimeout(function (e) {
                        var value = $.trim(textarea.val());
                        var grid = $("#gridBudgetOpex").data("kendoGrid");
                        var rows = value.split('\n');
                        var data = [];
                        for (var i = 0; i < rows.length; i++) {
                            var cells = rows[i].split('\t');
                            for (var j = 0; j < cells.length; j++) {
                                data.push(cells[j]);
                            }
                        };

                        var columns = $("#gridBudgetOpex").data("kendoGrid").columns
                        for (var index = cell_index; (index < columns.length && data.length > 0) ; index++) {
                            var dataField = $(grid.thead.find("th")[index]).attr("data-field");
                            if (dataField != "Y1" && dataField != "Active" && dataField != "Historical" && dataField != "AnnualTotal" && dataField != "CumulativeTotal") {
                                if (rowData["ActualMonths"] != null) {
                                    if (rowData["ActualMonths"].indexOf(dataField) == -1)
                                    { rowData.set(dataField, data.shift()); }
                                }
                                else {
                                    rowData.set(dataField, data.shift());
                                }
                            }
                        }
                        grid.refresh();
                        CalculateTotal("gridBudgetOpex");
                        textarea.val("");
                    }, 1)
                }
            }
            catch (err) {
                var dataToSend = {
                    "method": "budgetOpexGrid(keydown)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                      .then(function (response) { alert(errormessage) });
            }
        });
    };
    function budgetOpexGridY1() {
        var cell_index = 0; //cell index 0 based
        var row_index = 0; //row index 0 based
        var rowData = null;
        var dataSource2 = new kendo.data.DataSource({
            //data: vm.opexForecastY1,
            transport: {
                read: function (e) {
                    // on success
                    e.success(vm.opexForecastY1);
                }
            },
            schema: {
                model: {
                    id: 'BudgetDataID',
                    fields: {
                        BudgetDataID: {
                            hidden: true
                        },
                        Active: { editable: false },
                        //Historical: {
                        //    type: "string", editable: false
                        //},
                        LocalCurrencyAbbreviation: { editable: false },
                        Jan: {
                            type: "number"
                        },
                        Feb: {
                            type: "number"
                        },
                        Mar: {
                            type: "number"
                        },
                        Apr: {
                            type: "number"
                        },
                        May: {
                            type: "number"

                        },
                        Jun: {
                            type: "number"
                        },
                        Jul: {
                            type: "number"
                        },
                        Aug: {
                            type: "number"
                        },
                        Sep: {
                            type: "number"
                        },
                        Oct: {
                            type: "number"
                        },
                        Nov: {
                            type: "number"
                        },
                        Dec: {
                            type: "number"
                        }

                    }
                }
            }
        });
        var opexColY1 = [
            { field: "BudgetDataID", hidden: true },
            { field: "Active", title: yearLabel[7].TblLabel, headerAttributes: { "class": "wrap-header" }, width: "10%" },
            // { field: "Historical", headerAttributes: { "class": "wrap-header" }, width: "10%" },
            { field: "LocalCurrencyAbbreviation", title: "Currency", headerAttributes: { "class": "wrap-header" }, width: "5%", editable: false, attributes: { class: "txt-float-R" } },
            { field: "Apr", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "May", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jun", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jul", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Aug", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Sep", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Oct", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Nov", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Dec", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Jan", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Feb", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } },
            { field: "Mar", editor: editNumber, format: "{0:#,#}", attributes: { class: "txt-float-R" } }
            //{ field: "Total" },        
            //{ field: "Total" }
        ];
        $("#gridBudgetOpexY1").kendoGrid({
            // the column fields should match the excel columns
            columns: opexColY1,
            dataSource: dataSource2,
            editable: true,
            //selectable: "multiple cell",
            navigatable: true,
            allowCopy: true,
            edit: function (e) {
                try {
                    if (vm.IsOpen) {
                        var grid = this;
                        var fieldName = grid.columns[e.container.index()].field;
                        $("[name='" + fieldName + "']", e.container).blur(function () {
                            updateY1InOpex();
                        });
                        $(e.container).keydown(function (e) {
                            if (e.keyCode == 9) {
                                var grid = $('#gridBudgetOpexY1').data('kendoGrid');
                                var row = $(this).closest("tr");
                                var rowIdx = $("tr", grid.tbody).index(row);
                                cell_index = Number($("td", row).index(this)) + 1;
                                rowData = grid.dataItem(row)
                                console.log(rowIdx + cell_index + rowData);
                            }
                        });
                    }
                    else { this.closeCell(); }
                }
                catch (err) {
                    var dataToSend = {
                        "method": "budgetOpexGridY1(edit)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                          .then(function (response) { alert(errormessage) });
                }
            },
        });
        var grid = $('#gridBudgetOpexY1').data('kendoGrid');

        $(grid.tbody).on("click", "td", function (e) {
            var row = $(this).closest("tr");
            var rowIdx = $("tr", grid.tbody).index(row);
            cell_index = $("td", row).index(this);
            rowData = grid.dataItem(row)
        });

        grid.element.on('keydown', function (e) {
            try {
                if (e.keyCode === 86 && e.ctrlKey === true) {
                    var textarea = $("#ta");
                    textarea.val("");
                    textarea.focus();
                    setTimeout(function (e) {
                        var value = $.trim(textarea.val());
                        var grid = $("#gridBudgetOpexY1").data("kendoGrid");
                        var rows = value.split('\n');
                        var data = [];
                        for (var i = 0; i < rows.length; i++) {
                            var cells = rows[i].split('\t');
                            for (var j = 0; j < cells.length; j++) {
                                data.push(cells[j]);
                            }
                        };
                        var columns = $("#gridBudgetOpexY1").data("kendoGrid").columns
                        for (var index = cell_index; (index < columns.length && data.length > 0) ; index++) {
                            var dataField = $(grid.thead.find("th")[index]).attr("data-field");
                            if (dataField != "Active") {
                                rowData.set(dataField, data.shift());
                            }
                        }
                        grid.refresh();
                        updateY1InOpex();
                        textarea.val("");
                    }, 1)
                }
            }
            catch (err) {
                var dataToSend = {
                    "method": "budgetOpexGridY1(keydown)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                      .then(function (response) { alert(errormessage) });
            }
        });

    };
    /*************------------For Validating the Budget data--------------***************/
    function updateBudgetdata() {
        displayLoading();
        var gridIOData = null;
        var validInvestmentRange = true;
       
        if ($('#gridbudgetIO').data('kendoGrid') != undefined) {
            gridIOData = $('#gridbudgetIO').data('kendoGrid').dataSource.data();
            var gridupdatedData = $('#gridbudgetIO').data('kendoGrid').dataSource.data()
                   .filter(function (x) { return x.dirty })
                   .map(function (x) { return x });
       
            for (var i = 0; i < gridIOData.length; i++) {
                /*********Budget ID(CAR ID ia a required field)******/
                if (gridIOData[i].BudgetIO == "")
                    {
                        var message = missingBudgetIOmessage;
                        $.each(gridIOData, function (i, row) {
                            if (row.BudgetIO == '')
                                $('tr[data-uid="' + row.uid + '"] ').children().eq(0).css("background-color", "yellow");
                        });
                     //   message = message.replace("value", gridupdatedData[i].BudgetIO);
                        alert(message);
                        hideLoading();
                        return;
                }

                if (gridIOData[i].InvestmentOrder.length > 12 && validInvestmentRange == true)
                {
                  //  alert(projectInvestmentOrderRange);
                    validInvestmentRange = false;
                }
                    if (gridupdatedData.length > 0) {
                    var duplicateIO = gridIOData.filter(function (entry) {
                        return entry.BudgetIO == gridIOData[i].BudgetIO;
                    });
                    if (duplicateIO.length > 1) {
                        var message = duplicateBudgetIOmessage
                        message = message.replace("value", gridIOData[i].BudgetIO);
                        alert(message); hideLoading(); return;
                    }
                }
            }
          
        }
        validInvestmentRange

        if (validInvestmentRange == false) {
            if (!confirm(projectInvestmentOrderRange)) {
                hideLoading();
                return;
            }
        }
        if (vm.SelectedBudget.CapitalBudgetID != null && vm.SelectedBudget.CapitalBudgetID != "") {
            if (capitalBudgetIdBlank == true) {
                //if (!confirm(BudgetIdMsg))                //    
                //    hideLoading();
                //else {
                var dataToSend = {
                    "ProjectID": SeletedProjectId, "BudgetID": vm.SelectedBudget.CapitalBudgetID, "BudgetIO": JSON.stringify(gridIOData)
                };
                GETPostService.postDataWCFAsync('checkBudgetUnqiueID', dataToSend).then(function (response) {
                    try {
                        var flag = JSON.parse(response);
                        if (flag.length > 0 && flag[0].BudgetIDCount == 0 && flag[0].BudgetIOCount == 0) {
                            SaveBudgetdata();
                        }
                        else {
                            if (flag[0].BudgetIDCount > 0) {
                                alert(duplicateBudgetIDmessage);
                            }
                            if (flag[0].BudgetIOCount > 0) {
                                var message = duplicateBudgetIOmessage
                                var duplicatevalue = flag[0].BudgetIODuplicate.substr(0, flag[0].BudgetIODuplicate.length - 2);
                                message = message.replace("value", duplicatevalue);
                                alert(message);
                            }
                            hideLoading(); return;
                        }
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "updateBudgetdata", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) { alert(errormessage) });
                        hideLoading();
                    }
                });

                //}
            }
            else {
                var dataToSend1 = {
                    "ProjectID": SeletedProjectId, "BudgetID": vm.SelectedBudget.CapitalBudgetID, "BudgetIO": JSON.stringify(gridIOData)
                };
                GETPostService.postDataWCFAsync('checkBudgetUnqiueID', dataToSend1).then(function (response) {
                    try {
                        var flag = JSON.parse(response);
                        if (flag.length > 0 && flag[0].BudgetIDCount == 0 && flag[0].BudgetIOCount == 0) {
                            SaveBudgetdata();
                        }
                        else {
                            if (flag[0].BudgetIDCount > 0) {
                                alert(duplicateBudgetIDmessage);
                            }
                            if (flag[0].BudgetIOCount > 0) {
                                var message = duplicateBudgetIOmessage
                                var duplicatevalue = flag[0].BudgetIODuplicate.substr(0, flag[0].BudgetIODuplicate.length - 2);
                                message = message.replace("value", duplicatevalue);
                                alert(message);
                            }
                            hideLoading(); return;
                        }
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "updateBudgetdata", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) { alert(errormessage) });
                        hideLoading();
                    }
                });
            }

        }
        else {
            var dataToSend = {
                "ProjectID": SeletedProjectId, "BudgetID": "", "BudgetIO": JSON.stringify(gridIOData)
            };
            GETPostService.postDataWCFAsync('checkBudgetUnqiueID', dataToSend).then(function (response) {
                try {
                    var flag = JSON.parse(response);
                    if (flag.length > 0 && flag[0].BudgetIOCount == 0) {
                        SaveBudgetdata();
                    }
                    else {
                        var message = duplicateBudgetIOmessage
                        var duplicatevalue = flag[0].BudgetIODuplicate.substr(0, flag[0].BudgetIODuplicate.length - 2);
                        message = message.replace("value", duplicatevalue);
                        alert(message);
                        hideLoading(); return;
                    }
                }
                catch (err) {
                    var dataToSend = {
                        "method": "updateBudgetdata", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                          .then(function (response) { alert(errormessage) });
                    hideLoading();
                }
            });
            //SaveBudgetdata()
        }
    }
    function SaveBudgetdata() {
        try {

            var valid = true;
            var APISDate = (vm.SelectedBudget.APISDate != null && vm.SelectedBudget.APISDate != "") ? $("#APISDate").val() : null;
            var definitiveDate = (vm.SelectedBudget.DefinitiveCRApprovalDate != null && vm.SelectedBudget.DefinitiveCRApprovalDate != "") ? $("#definitiveCRApprovalDate").val() : null;
            //var developmentCRApprovalDate = (vm.SelectedBudget.DevelopmentCRApprovalDate != null && vm.SelectedBudget.DevelopmentCRApprovalDate != "") ? $("#crApprovalDate").val() : null;
            var fundingApprovalNeedDate = (vm.SelectedBudget.FundingApprovalNeedDate != null && vm.SelectedBudget.FundingApprovalNeedDate != "") ? $("#fundingNeedDate").val() : null;
            if (vm.SelectedBudget.CapExRequired.LookUpMemberID == "1") {
                if ((vm.SelectedBudget.CapitalBudgetID == null || vm.SelectedBudget.CapitalBudgetID == "") ||
                    //(vm.SelectedBudget.LocalCurrencyID == null || vm.SelectedBudget.LocalCurrencyID == "") 
                    (vm.SelectedBudget.WhereID == null || vm.SelectedBudget.WhereID == "") ||
                    (vm.SelectedBudget.WhyID == null || vm.SelectedBudget.WhyID == "") ||
                    (vm.SelectedBudget.PredefinedInvestmentID == null || vm.SelectedBudget.PredefinedInvestmentID == "") || fundingApprovalNeedDate == null ||
                    vm.SelectedBudget.BudgetOwner == null || vm.SelectedBudget.BudgetOwner == "") {
                    valid = false;
                    alert(capexYesMandatory);
                    if (vm.SelectedBudget.CapitalBudgetID == null || vm.SelectedBudget.CapitalBudgetID == "")
                        document.getElementById("budgetId").style.backgroundColor = "yellow";
                    else
                        document.getElementById("budgetId").style.backgroundColor = "white";

                    if (vm.SelectedBudget.BudgetOwner == null || vm.SelectedBudget.BudgetOwner == "") {
                        var t = $("#budgetOwner").data("kendoComboBox");
                        t.wrapper.find(".k-input").attr('style', 'background: yellow !important');
                    }
                    else {
                        $("#budgetOwner").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: white !important');
                    }

                    if (vm.SelectedBudget.WhereID == null || vm.SelectedBudget.WhereID == "") {
                        $("#Where").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: yellow !important');
                    }
                    else {
                        $("#Where").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: white !important');
                    }

                    if (vm.SelectedBudget.WhyID == null || vm.SelectedBudget.WhyID == "")
                        $("#Why").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: yellow !important');

                    else
                        $("#Why").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: white !important');


                    if (vm.SelectedBudget.PredefinedInvestmentID == null || vm.SelectedBudget.PredefinedInvestmentID == "")
                        $("#preDefinedInvest").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: yellow !important');

                    else
                        $("#preDefinedInvest").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: white !important');


                    if (fundingApprovalNeedDate == null)
                        $("#fundingNeedDate").data("kendoDatePicker").wrapper.find(".k-input").attr('style', 'background: yellow !important');

                        //document.getElementById("fundingNeedDate").style.backgroundColor = "yellow";
                    else
                        $("#fundingNeedDate").data("kendoDatePicker").wrapper.find(".k-input").attr('style', 'background: white !important');



                }
                else {
                    if (!IsBudgetAdmin && vm.isCapexRequiredEditable) {
                        if (!confirm(capexYeslockedMsg)) {
                            valid = false;
                        }
                        else {
                            valid = true;
                        }
                    }
                }
            }

            if (fundingApprovalNeedDate != null) {
                if (!parseDate(fundingApprovalNeedDate)) {
                    valid = false;
                    vm.fundingNeedDateError = true;
                }
                else {
                    vm.fundingNeedDateError = false;
                }
            }
          
            if (definitiveDate != null) {
                if (!parseDate(definitiveDate)) {
                    valid = false;
                    vm.definitiveCRDateError = true;
                }
                else {
                    vm.definitiveCRDateError = false;
                }
            }
           

            if (!valid)
            { hideLoading(); return; }
            var BudgetData = [];
            var budgetIOData = [];
            document.getElementById("budgetId").style.backgroundColor = "white";
            $("#budgetOwner").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: white !important');
            $("#Where").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: white !important');
            $("#Why").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: white !important');
            $("#preDefinedInvest").data("kendoComboBox").wrapper.find(".k-input").attr('style', 'background: white !important');
            $("#fundingNeedDate").data("kendoDatePicker").wrapper.find(".k-input").attr('style', 'background: white !important');

            vm.budgetData = {
                ProjectID: SeletedProjectId,
                BudgetID: vm.SelectedBudget.BudgetID,
                CapExRequired: vm.SelectedBudget.CapExRequired != null ? vm.SelectedBudget.CapExRequired.LookUpMemberID : null,
                OpExRequired: vm.SelectedBudget.OpExRequired != null ? vm.SelectedBudget.OpExRequired.LookUpMemberID : null,
                TotalApprovedCapEx: vm.SelectedBudget.TotalApprovedCapEx != null && vm.SelectedBudget.TotalApprovedCapEx != "" ? vm.SelectedBudget.TotalApprovedCapEx : null,
                TotalApprovedOpEx: vm.SelectedBudget.TotalApprovedOpEx != null && vm.SelectedBudget.TotalApprovedOpEx != "" ? vm.SelectedBudget.TotalApprovedOpEx : null,
                CapitalBudgetID: vm.SelectedBudget.CapitalBudgetID != null ? vm.SelectedBudget.CapitalBudgetID : null,
                // DevelopmentCRID: vm.SelectedBudget.DevelopmentCRID != null ? vm.SelectedBudget.DevelopmentCRID : null,
                // DevelopmentCRApprovalDate: (vm.SelectedBudget.DevelopmentCRApprovalDate != null && vm.SelectedBudget.DevelopmentCRApprovalDate != "") ? vm.SelectedBudget.DevelopmentCRApprovalDate : null,
                APISDate: (vm.SelectedBudget.APISDate != null && vm.SelectedBudget.APISDate != "") ? vm.SelectedBudget.APISDate : null,
                FundingStatusID: vm.SelectedBudget.FundingStatusID != null ? vm.SelectedBudget.FundingStatusID.LookUpMemberID : null,
                DefinitiveCRID: vm.SelectedBudget.DefinitiveCRID != null ? vm.SelectedBudget.DefinitiveCRID : null,
                DefinitiveCRApprovalDate: (vm.SelectedBudget.DefinitiveCRApprovalDate != null && vm.SelectedBudget.DefinitiveCRApprovalDate != "") ? vm.SelectedBudget.DefinitiveCRApprovalDate : null,
                // ProjectClassificationID: vm.SelectedBudget.ProjectClassificationID != null ? vm.SelectedBudget.ProjectClassificationID.LookUpMemberID : null,
                PredefinedInvestmentID: vm.SelectedBudget.PredefinedInvestmentID != null ? vm.SelectedBudget.PredefinedInvestmentID.LookUpMemberID : null,
                WhereID: vm.SelectedBudget.WhereID != null ? vm.SelectedBudget.WhereID.LookUpMemberID : null,
                WhyID: vm.SelectedBudget.WhyID != null ? vm.SelectedBudget.WhyID.LookUpMemberID : null,


                FundingApprovalNeedDate: (vm.SelectedBudget.FundingApprovalNeedDate != null && vm.SelectedBudget.FundingApprovalNeedDate != "") ? vm.SelectedBudget.FundingApprovalNeedDate : null,
                LocalCurrencyID: vm.SelectedBudget.LocalCurrencyID != null ? vm.SelectedBudget.LocalCurrencyID.LookUpMemberID : null,
                BudgetComment: vm.SelectedBudget.BudgetComment,
                BudgetOwner: vm.SelectedBudget.BudgetOwner != null ? vm.SelectedBudget.BudgetOwner.PortfolioOwnerID : null,
            }

            BudgetData.push(vm.budgetData);
            var BudgetIOUpdateListItems = [];
            if ($('#gridbudgetIO').data('kendoGrid') != undefined) {   
                var gridupdatedData = $('#gridbudgetIO').data('kendoGrid').dataSource.data()
                   .filter(function (x) { return x.dirty })
                   .map(function (x) { return x });
                if (gridupdatedData.length > 0) {
                  //  budgetIOData = gridupdatedData;

                    angular.forEach(gridupdatedData, function (item, index) {


                    var temp = {};
                    temp.BudgetIOID = item.BudgetIOID;
                    temp.BudgetIO = item.BudgetIO;
                    temp.InvestmentOrder = item.InvestmentOrder;
                    temp.CARApprovalDate = kendo.toString(item.CARApprovalDate, "d");
                    temp.CARApprovedCAPEX = item.CARApprovedCAPEX;
                    temp.CARApprovedOPEX = item.CARApprovedOPEX;
                    temp.SpendStartDate = item.SpendStartDate;
                    temp.SpendEndDate = item.SpendEndDate;
                    temp.FinancialClosureDate = item.FinancialClosureDate;
                    BudgetIOUpdateListItems.push(temp);
                    });
                }

            }
            var dataToSend = {
                "ProjectID": SeletedProjectId, "objBudgetData": JSON.stringify(BudgetData), "objCapexGridData": JSON.stringify([]),
                "objCapexGridDataY1": JSON.stringify([]), "objOpexGridData": JSON.stringify([]), "objOpexGridDataY1": JSON.stringify([]),
                "objBudgetIO": JSON.stringify(BudgetIOUpdateListItems), "objBudgetIODelete": JSON.stringify(deletedBudgetIO)
            };

            GETPostService.postDataWCFAsync('updateProjectBudget', dataToSend).then(function (response) {
                //alert(response);
                if (response == "Success") {
                    if (vm.SelectedBudget.CapExRequired.LookUpMemberName == "Yes")
                        capexChangeCount = 0;
                    firstSave = false;
                    $.when(GETPostService.postDataWCFAsync("getProjectBudgetByID", SeletedProjectId), GETPostService.postDataWCFAsync("getBudgetIO", SeletedProjectId))
               .then(function (resBudgetData, resBudgetIO) {
                   try {
                       vm.dsBudgetData = JSON.parse(resBudgetData.getProjectBudgetByIDResult);
                       vm.SelectedBudget = vm.dsBudgetData[0];
                       if (vm.SelectedBudget.CapitalBudgetID == "" || vm.SelectedBudget.CapitalBudgetID == null) {
                           capitalBudgetIdBlank = true;
                           vm.isBudgetIdEditable = true;
                       }
                       else {
                           capitalBudgetIdBlank = false;
                           var editBudgetIdPermissionList = permission.filter(function (entry) {
                               return entry.Permission == EditBudgetIDPerm;
                           });
                           if (editBudgetIdPermissionList.length > 0) {
                               vm.isBudgetIdEditable = true;
                           }
                           else
                               vm.isBudgetIdEditable = false;
                       }

                       if (vm.SelectedBudget.CapExRequired == true) {

                           var editCapexRequiredPermissionList = permission.filter(function (entry) {
                               return entry.Permission == EditCapexRequiredPerm;
                           });
                           if (editCapexRequiredPermissionList.length > 0) {
                               vm.isCapexRequiredEditable = true;
                           }
                           else
                               vm.isCapexRequiredEditable = false;
                       }
                       else {
                           // capexRequiredNo = true;
                           vm.isCapexRequiredEditable = true;
                       }
                       GetProjectBudgetData();
                       deletedBudgetIO = [];
                       gridBudgetIO = JSON.parse(resBudgetIO.getBudgetIOResult);
                       $('#gridbudgetIO').data('kendoGrid').dataSource.read();
                       $scope.$digest();
                       // $rootScope.$emit("ReloadProjectHub");
                       $rootScope.$emit("UpdateHubStatus");
                   }
                   catch (err) {
                       var dataToSend = {
                           "method": "updateBudgetdata", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                       };
                       $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                             .then(function (response) { alert(errormessage) });
                       hideLoading();
                   }
               });
                    hideLoading();
                }
                else {
                    hideLoading();
                    alert("Error occurred in Budget data update.");
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "updateBudgetdata", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }
    };
    function UpdateForecastdata() {
        try {
            GETPostService.postDataWCFAsync('getProjectCurrentState', SeletedProjectId).then(function (response) {
                var projectstate = JSON.parse(response.getProjectCurrentStateResult);
                if (projectstate[0].PhaseStateID == cancelStateID) {
                    alert(cancelForecast);
                    return;
                }

                displayLoading();
                var capexGridData = vm.SelectedBudget.CapExRequired.LookUpMemberID == "1" ? capexOpexGridGeneral("gridBudgetCapex") : [];
                var capexGridDataY1 = vm.SelectedBudget.CapExRequired.LookUpMemberID == "1" ? capexOpexY1GridGeneral("gridBudgetCapexY1") : [];
                var OpexGridData = vm.SelectedBudget.OpExRequired.LookUpMemberID == "1" ? capexOpexGridGeneral("gridBudgetOpex") : [];
                var OpexGridDataY1 = vm.SelectedBudget.OpExRequired.LookUpMemberID == "1" ? capexOpexY1GridGeneral("gridBudgetOpexY1") : [];

                var dataToSend = {
                    "ProjectID": SeletedProjectId, "objBudgetData": JSON.stringify([]), "objCapexGridData": JSON.stringify(capexGridData),
                    "objCapexGridDataY1": JSON.stringify(capexGridDataY1), "objOpexGridData": JSON.stringify(OpexGridData), "objOpexGridDataY1": JSON.stringify(OpexGridDataY1),
                    "objBudgetIO": JSON.stringify([]), "objBudgetIODelete": JSON.stringify([])
                };
                GETPostService.postDataWCFAsync('updateProjectBudget', dataToSend).then(function (response) {
                    //alert(response);
                    if (response == "Success") {
                        $.when(GETPostService.postDataWCFAsync("getProjectBudgetByID", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectBudgetForecastDataY1", SeletedProjectId), GETPostService.postDataWCFAsync("getProjectBudgetForecastData", SeletedProjectId))
                    .then(function (resBudgetData, resForecastDataY1, resForecastData) {
                        try {
                            vm.dsForecastDataY1 = JSON.parse(resForecastDataY1.getProjectBudgetForecastDataY1Result);
                            vm.dsForecastData = JSON.parse(resForecastData.getProjectBudgetForecastDataResult);
                            vm.dsBudgetData = JSON.parse(resBudgetData.getProjectBudgetByIDResult);
                            vm.SelectedBudget = vm.dsBudgetData[0];
                            GetProjectBudgetData();
                            vm.capexForecast = JSON.parse(resForecastData.getProjectBudgetForecastDataResult).filter(function (entry) {
                                return entry.BudgetDataTypeID == capexID;
                            }).reverse();


                            vm.opexForecast = JSON.parse(resForecastData.getProjectBudgetForecastDataResult).filter(function (entry) {
                                return entry.BudgetDataTypeID == opexID;
                            }).reverse();

                            vm.capexForecastY1 = JSON.parse(resForecastDataY1.getProjectBudgetForecastDataY1Result).filter(function (entry) {
                                return entry.BudgetDataTypeID == capexID;
                            });
                            vm.opexForecastY1 = JSON.parse(resForecastDataY1.getProjectBudgetForecastDataY1Result).filter(function (entry) {
                                return entry.BudgetDataTypeID == opexID;
                            });

                            isPreliminary = vm.SelectedBudget.PreliminaryCount > 0 ? 1 : 0;
                            if (isPreliminary == 1) {
                                vm.capexForecastCommittedSpend = vm.capexForecast.filter(function (entry) {
                                    return entry.ActiveID == preliminary;
                                })[0].CommittedSpend;
                                vm.opexForecastCommittedSpend = vm.opexForecast.filter(function (entry) {
                                    return entry.ActiveID == preliminary;
                                })[0].CommittedSpend;
                            }
                            else {
                                vm.capexForecastCommittedSpend = vm.capexForecast.filter(function (entry) {
                                    return entry.ActiveID == currentForecastId;
                                })[0].CommittedSpend;
                                vm.opexForecastCommittedSpend = vm.opexForecast.filter(function (entry) {
                                    return entry.ActiveID == currentForecastId;
                                })[0].CommittedSpend;
                            }



                            $('#gridBudgetOpexY1').data('kendoGrid').dataSource.read();
                            $('#gridBudgetOpex').data('kendoGrid').dataSource.read();
                            $('#gridBudgetCapexY1').data('kendoGrid').dataSource.read();
                            $('#gridBudgetCapex').data('kendoGrid').dataSource.read();
                            $scope.$digest();
                            // $rootScope.$emit("ReloadProjectHub");
                            $rootScope.$emit("UpdateHubStatus");
                        }
                        catch (err) {
                            var dataToSend = {
                                "method": "UpdateForecastdata", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                            };
                            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                  .then(function (response) { alert(errormessage) });
                            hideLoading();
                        }
                    });

                        hideLoading();
                    }
                    else {
                        hideLoading();
                        alert("Error occurred in Forecast data update.");
                    }
                });
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "UpdateForecastdata", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }
    };
    function capexOpexGridGeneral(gridId) {
        var capexGridUpdatedData = [];
        if ($('#' + gridId).data('kendoGrid') != undefined) {
            var gridupdatedData = $('#' + gridId).data('kendoGrid').dataSource.data()
            // .filter(function (x) { return x.dirty })
            //.map(function (x) { return x });
            var updateCapex;
            if (vm.dsBudgetData[0].PreliminaryCount === 0) {
                updateCapex = gridupdatedData.filter(function (x) {
                    return x.id != "" && x.id != null && x.Active == "Current"
                }).map(function (x) { return x });
            }
            else {
                updateCapex = gridupdatedData.filter(function (x) {
                    return x.id != "" && x.id != null && x.Active == "Preliminary"
                }).map(function (x) { return x });
            }
            // angular.forEach(updateCapex[1], function (item, index) {
            if (updateCapex.length > 0) {
                var item = updateCapex[0];
                var temp = {};
                temp.BudgetDataID = item.BudgetDataID;
                temp.BudgetGlobalID = item.BudgetGlobalID;
                temp.ProjectID = item.ProjectID;
                temp.BudgetDataTypeID = item.BudgetDataTypeID;
                temp.Active = item.Active;
                temp.Jan = item.Jan;
                temp.Feb = item.Feb;
                temp.Mar = item.Mar;
                temp.Apr = item.Apr;
                temp.May = item.May;
                temp.Jun = item.Jun;
                temp.Jul = item.Jul;
                temp.Aug = item.Aug;
                temp.Sep = item.Sep;
                temp.Oct = item.Oct;
                temp.Nov = item.Nov;
                temp.Dec = item.Dec;
                if (gridId == "gridBudgetCapex") {
                    temp.AFPDeviationCodeID = vm.SelectedBudget.AFPDeviationCodeID != null ? vm.SelectedBudget.AFPDeviationCodeID.LookUpMemberID : null;
                    temp.MTDPDeviationCodeID = vm.SelectedBudget.MTDPDeviationCodeID != null ? vm.SelectedBudget.MTDPDeviationCodeID.LookUpMemberID : null;

                }
                temp.Y1 = item.Y1;
                temp.Y2 = item.Y2;
                temp.Y3 = item.Y3;
                temp.Y4 = item.Y4;
                temp.Y5 = item.Y5;
                temp.AnnualTotal = item.AnnualTotal;
                temp.CumulativeTotal = item.CumulativeTotal;
                temp.CommittedSpend = (gridId === "gridBudgetCapex") ? vm.capexForecastCommittedSpend : vm.opexForecastCommittedSpend;
                temp.SubmittedByID = currentUserId;

                capexGridUpdatedData.push(temp);
            }
            // });     
            return capexGridUpdatedData;
        }
    };
    function capexOpexY1GridGeneral(gridId) {
        var capexY1GridUpdatedData = [];
        if ($('#' + gridId).data('kendoGrid') != undefined) {
            var gridupdatedData = $('#' + gridId).data('kendoGrid').dataSource.data()
            //  .filter(function (x) { return x.dirty })
            // .map(function (x) { return x });
            var updateCapex;
            if (vm.dsBudgetData[0].PreliminaryCount === 0) {
                updateCapex = gridupdatedData.filter(function (x) { return x.id != "" && x.id != null && x.Active == "Current" })
                    .map(function (x) { return x });
            }
            else {
                updateCapex = gridupdatedData.filter(function (x) {
                    return x.id != "" && x.id != null && x.Active == "Preliminary"
                }).map(function (x) { return x });
            }
            // angular.forEach(updateCapex[1], function (item, index) {
            if (updateCapex.length > 0) {
                var item = updateCapex[0];
                var temp = {};
                temp.BudgetDataID = item.BudgetDataID;
                temp.BudgetGlobalID = item.BudgetGlobalID;
                temp.ProjectID = item.ProjectID;
                temp.BudgetDataTypeID = item.BudgetDataTypeID;
                //temp.Active = item.Active;
                //temp.Historical = item.Historical;
                temp.Jan = item.Jan;
                temp.Feb = item.Feb;
                temp.Mar = item.Mar;
                temp.Apr = item.Apr;
                temp.May = item.May;
                temp.Jun = item.Jun;
                temp.Jul = item.Jul;
                temp.Aug = item.Aug;
                temp.Sep = item.Sep;
                temp.Oct = item.Oct;
                temp.Nov = item.Nov;
                temp.Dec = item.Dec;
                capexY1GridUpdatedData.push(temp);
            }
            // });     
            return capexY1GridUpdatedData;
        }
    }
    function InitkGridBudgetIO() {
        try {         
            var col = [{
                field: "BudgetIO",
                title: "CAR ID",
                headerAttributes: { "class": "wrap-header" },
                //width: "90%"
                editable: false
            }, {
                field: "InvestmentOrder",
                title: "Investment Order",
                headerAttributes: { "class": "wrap-header" },
                //width: "90%"
                //editable: vm.isEditable
            }, {
                field: "CARApprovalDate",
                title: "CAR Approval Date",
                headerAttributes: { "class": "wrap-header" },
                format: "{0:MM/dd/yyyy}",
            }, {
                field: "CARApprovedCAPEX",
                title: "CAR Approved CAPEX " + vm.LocalCurrencyAbb,
                headerAttributes: { "class": "wrap-header" },
                format: "{0:#,#}",
            }, {
                field: "CARApprovedOPEX",
                title: "CAR Approved OPEX " + vm.LocalCurrencyAbb,
                headerAttributes: { "class": "wrap-header" },
                format: "{0:#,#}",
            }, {
                field: "SpendStartDate",
                title: "Start Date",
                headerAttributes: { "class": "wrap-header" },
                format: "{0:MM/dd/yyyy}",
                hidden: true,
            }, {
                field: "SpendEndDate",
                title: "End Date",
                headerAttributes: { "class": "wrap-header" },
                format: "{0:MM/dd/yyyy}",
                hidden: true,
            }, {
                field: "FinancialClosureDate",
                title: "Financial Closure Date",
                headerAttributes: { "class": "wrap-header" },
                format: "{0:MM/dd/yyyy}",
                hidden: true,
            },
            {
                hidden: !(vm.isEditable && vm.isDeleteBudgetIO),
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
                            if (data.BudgetIOID != 'undefined' && data.BudgetIOID != "" && data.BudgetIOID != null)
                                deletedBudgetIO.push({ "BudgetIOID": data.BudgetIOID });
                            var grid = $("#gridbudgetIO").data("kendoGrid");
                            grid.removeRow(tr);
                            $scope.$digest();
                        }
                    }
                }]
            }];
            var budgetIODataSource = new kendo.data.DataSource({
                //data: gridDataSchedule,
                transport: {
                    read: function (e) {
                        // on success
                        e.success(gridBudgetIO);
                    }
                },
                schema: {
                    model: {
                        id: "BudgetIOID",
                        fields: {
                            BudgetIOID: { editable: false, nullable: true },
                            BudgetIO: {
                                type: "string",
                            },
                            InvestmentOrder: {
                        type: "string"
                    },
                    CARApprovalDate: {
                        type: "date", defaultValue: null
            },
                    CARApprovedCAPEX:{
                        type: "number", defaultValue: null
                    },
                    CARApprovedOPEX:{
                        type: "number", defaultValue: null
                    },
                    SpendStartDate:{
                        type: "date", defaultValue: null
                    },
                    SpendEndDate:{
                        type: "date", defaultValue: null
                    },
                    FinancialClosureDate: {
                        type: "date", defaultValue: null
                    }

                        }
                    }
                }
            });
            $("#gridbudgetIO").kendoGrid({
                dataSource: budgetIODataSource,
                columns: col,
                selectable: true,
                sortable: true,
                navigatable: true,
                editable: {
                    createAt: "bottom"
                },
                height:"250px",
                edit: function (e) {
                    try {
                        var grid = this;
                        var fieldName = grid.columns[e.container.index()].field;
                        if (fieldName == "BudgetIO") {
                            
                            if (!(e.model.isNew() || vm.isDeleteBudgetIO)) {
                                this.closeCell();
                            }
                        }
                    }
                    catch (err) {
                        var dataToSend = {
                            "method": "InitkGridBudgetIO(Edit)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) {
                                //  alert(errormessage);
                            });
                    }
                }

            });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitkGridBudgetIO", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };
    function AddNewRow() {
        var gridNew = $("#gridbudgetIO").data("kendoGrid");
        gridNew.addRow();
    };
    function updateY1InCapex() {
        var grid = $("#gridBudgetCapexY1").data("kendoGrid");
        var Total = 0;
        var gridData = grid.dataSource.view();
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].Jan != null) {
                Total += gridData[i].Jan;
            }
            if (gridData[i].Feb != null) {
                Total += gridData[i].Feb;
            }
            if (gridData[i].Mar != null) {
                Total += gridData[i].Mar;
            }
            if (gridData[i].Apr != null) {
                Total += gridData[i].Apr;
            }
            if (gridData[i].May != null) {
                Total += gridData[i].May;
            }
            if (gridData[i].Jun != null) {
                Total += gridData[i].Jun;
            }
            if (gridData[i].Jul != null) {
                Total += gridData[i].Jul;
            }
            if (gridData[i].Aug != null) {
                Total += gridData[i].Aug;
            }
            if (gridData[i].Sep != null) {
                Total += gridData[i].Sep;
            }
            if (gridData[i].Oct != null) {
                Total += gridData[i].Oct;
            }
            if (gridData[i].Nov != null) {
                Total += gridData[i].Nov;
            }
            if (gridData[i].Dec != null) {
                Total += gridData[i].Dec;
            }
        }
        var gridcapexData = $('#gridBudgetCapex').data('kendoGrid').dataSource.data().filter(function (x) {
            if (vm.dsBudgetData[0].PreliminaryCount === 0) return x.Active == "Current";
            else
                return x.Active == "Preliminary";
        }).map(function (x) { return x });

        if (gridcapexData.length > 0) {
            var item = gridcapexData[0];
            var grid = $('#gridBudgetCapex').getKendoGrid();
            var row = grid.tbody.find("tr[data-uid='" + item.uid + "']");
            row.find('td:eq(17)').text(kendo.format("{0:#,#}", Number(Total))); // set total value in 6th cell
            // item.set('Y1', Number(Total));
            item["Y1"] = Total;
            // TotalCapexY1 = Total;
            /// $('#gridBudgetCapex').data('kendoGrid').refresh();
            CalculateTotal("gridBudgetCapex");
        }
    }
    function updateY1InOpex() {
        var grid = $("#gridBudgetOpexY1").data("kendoGrid");
        var Total = 0;
        var gridData = grid.dataSource.view();
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].Jan != null) {
                Total += gridData[i].Jan;
            }
            if (gridData[i].Feb != null) {
                Total += gridData[i].Feb;
            }
            if (gridData[i].Mar != null) {
                Total += gridData[i].Mar;
            }
            if (gridData[i].Apr != null) {
                Total += gridData[i].Apr;
            }
            if (gridData[i].May != null) {
                Total += gridData[i].May;
            }
            if (gridData[i].Jun != null) {
                Total += gridData[i].Jun;
            }
            if (gridData[i].Jul != null) {
                Total += gridData[i].Jul;
            }
            if (gridData[i].Aug != null) {
                Total += gridData[i].Aug;
            }
            if (gridData[i].Sep != null) {
                Total += gridData[i].Sep;
            }
            if (gridData[i].Oct != null) {
                Total += gridData[i].Oct;
            }
            if (gridData[i].Nov != null) {
                Total += gridData[i].Nov;
            }
            if (gridData[i].Dec != null) {
                Total += gridData[i].Dec;
            }
        }
        var gridcapexData = $('#gridBudgetOpex').data('kendoGrid').dataSource.data().filter(function (x) {
            if (vm.dsBudgetData[0].PreliminaryCount === 0) return x.Active == "Current";
            else
                return x.Active == "Preliminary";
        }).map(function (x) { return x });
        if (gridcapexData.length > 0) {
            var item = gridcapexData[0];
            var grid = $('#gridBudgetOpex').getKendoGrid();
            var row = grid.tbody.find("tr[data-uid='" + item.uid + "']");
            row.find('td:eq(17)').text(kendo.format("{0:#,#}", Number(Total)));
            //item.set('Y1', Number(Total));
            item["Y1"] = Total;
            //TotalOpexY1 = Total;
            //  $('#gridBudgetOpex').data('kendoGrid').refresh();
            CalculateTotal("gridBudgetOpex");
        }
    }
    function CalculateTotal(grid) {
        var Total = 0;
        var yearTotal = 0;
        var gridData = $('#' + grid).data('kendoGrid').dataSource.data().filter(function (x) {
            if (vm.dsBudgetData[0].PreliminaryCount === 0) return x.Active == "Current";
            else
                return x.Active == "Preliminary";
        })
           .map(function (x) { return x });
        if (gridData.length > 0) {
            var item = gridData[0];
            for (var i = 0; i < gridData.length; i++) {
                // var dataItem = $("#" + grid).data("kendoGrid").dataSource.get(item.BudgetDataID);
                if (gridData[i].Jan != null) {
                    yearTotal += gridData[i].Jan;
                    Total += gridData[i].Jan;
                }
                if (gridData[i].Feb != null) {
                    yearTotal += gridData[i].Feb;
                    Total += gridData[i].Feb;
                }
                if (gridData[i].Mar != null) {
                    yearTotal += gridData[i].Mar;
                    Total += gridData[i].Mar;
                }
                if (gridData[i].Apr != null) {
                    yearTotal += gridData[i].Apr;
                    Total += gridData[i].Apr;
                }
                if (gridData[i].May != null) {
                    yearTotal += gridData[i].May;
                    Total += gridData[i].May;
                }
                if (gridData[i].Jun != null) {
                    yearTotal += gridData[i].Jun;
                    Total += gridData[i].Jun;
                }
                if (gridData[i].Jul != null) {
                    yearTotal += gridData[i].Jul;
                    Total += gridData[i].Jul;
                }
                if (gridData[i].Aug != null) {
                    yearTotal += gridData[i].Aug;
                    Total += gridData[i].Aug;
                }
                if (gridData[i].Sep != null) {
                    yearTotal += gridData[i].Sep;
                    Total += gridData[i].Sep;
                }
                if (gridData[i].Oct != null) {
                    yearTotal += gridData[i].Oct;
                    Total += gridData[i].Oct;
                }
                if (gridData[i].Nov != null) {
                    yearTotal += gridData[i].Nov;
                    Total += gridData[i].Nov;
                }
                if (gridData[i].Dec != null) {
                    yearTotal += gridData[i].Dec;
                    Total += gridData[i].Dec;
                }
                if (gridData[i].Y1 != null) {
                    Total += gridData[i].Y1;
                }
                if (gridData[i].Y2 != null) {
                    Total += gridData[i].Y2;
                }
                if (gridData[i].Y3 != null) {
                    Total += gridData[i].Y3;
                }
                if (gridData[i].Y4 != null) {
                    Total += gridData[i].Y4;
                }
                if (gridData[i].Y5 != null) {
                    Total += gridData[i].Y5;
                }
                if (gridData[i].Historical != null) {
                    Total += gridData[i].Historical;
                }
            }
            // dataItem.set('Total', Number(Total));
            item["CumulativeTotal"] = Total;
            item["AnnualTotal"] = yearTotal;
            var grid = $('#' + grid).getKendoGrid();
            var row = grid.tbody.find("tr[data-uid='" + item.uid + "']");
            row.find('td:eq(16)').text(kendo.format("{0:#,#}", yearTotal)); // set total value in 17th cell
            row.find('td:eq(22)').text(kendo.format("{0:#,#}", Total));
            //$('#' + grid).data('kendoGrid').refresh();
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
                case 'definitiveCRApprovalDate':
                    vm.definitiveCRDateError = false;
                    break;
                case 'fundingNeedDate':
                    vm.fundingNeedDateError = false;
                    break;
                    //case 'crApprovalDate':
                    //    vm.crApprovalDateError = false;
                    //    break;
                    //case 'APISDate':
                    //    vm.APISDateError = false;
                    //    break;
                default:
            }
            $scope.$digest();
        }
    }
    function editNumber(container, options) {
        $('<input name="' + options.field + '" data-bind="value:' + options.field + '"/>')
          .appendTo(container)
          .kendoNumericTextBox({
              spinners: false,
              decimals: 0,
              format: "n0",
              restrictDecimals: true,
              max: 999999999999,
          });
    }
    function initProjectBudget() {

    };
};