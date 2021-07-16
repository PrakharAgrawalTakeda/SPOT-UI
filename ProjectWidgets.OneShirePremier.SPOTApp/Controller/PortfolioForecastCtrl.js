///* <reference path="C:\ProjectWidgets\TFS Online\OneShireProjectOnline\ProjectWidgets.OneShirePremier.SPOT\ProjectWidgets.OneShirePremier.SPOTApp\HTML/CurrencyFxRate.html" />
///* <reference path="C:\ProjectWidgets\TFS Online\OneShireProjectOnline\ProjectWidgets.OneShirePremier.SPOT\ProjectWidgets.OneShirePremier.SPOTApp\HTML/CurrencyFxRate.html" />
//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('PortfolioForecastCtrl', PortfolioForecastCtrl)
PortfolioForecastCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function PortfolioForecastCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    //-------------------------Array variable vm---------------------//
    var forecastData = [];

    //-------------------------Array boolean vm---------------------//
    vm.IsOpen = false;
    vm.isPreliminary = false;

    //-------------------------function vm---------------------//
    vm.initPortfolioForecast = initPortfolioForecast;
    vm.SaveForecastData = SaveForecastData;
    vm.forecastChange = forecastChange;
    vm.showLocalCur = true;
    vm.GetFxRates=GetFxRates;

    //-------------------------page level variable---------------------//
    var className = "PortfolioForecastCtrl";
    var projectForecastData = [];
    var dataSourceForcastData = new kendo.data.DataSource();
    var dataSourceBudgetCummulative = new kendo.data.DataSource();
    var dataSourceBudgetCummulativeLocal = new kendo.data.DataSource();
    var updatedColumn = [];
    var newDataCummulativeCapex = [];
    var newDataForecastCapex = [];
    var newDataCummulativeOpex = [];
    var newDataForecastOpex = [];
    var IsBudgetAdmin = false;
    var yearLabel = [];

    //Functions
    //var Isload = true;
    vm.initPortfolioForecast = initPortfolioForecast;
    vm.UpdateForecastCummulativeGrid = UpdateForecastCummulativeGrid;
    var filterDataToSendForecast;
    var bulkBudget_IsPageLoad = true;

    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    var forcastCol = [];
    var forcastColLocal = []; 
    var projectForcastCol =[]; 
    $rootScope.$on("portfolioBudgetForecast", function (event, filterDataToSend) {
        filterDataToSendForecast = JSON.parse(filterDataToSend);
        prepareDataForPortfolioForecast();
    });

    function GetFxRates() {
        trackEvent("Portfolio center budget/spend tile forecast bulk edit tab - FxRates button");
        var myWindow = $("#dialogFxRate");
        myWindow.kendoWindow({
            content: "CurrencyFxRate.html?v="+buildNo,
            modal: true,
        });
        $.when(GETPostService.getCurrencyFxRate()).then(function (response) {
            myWindow.data("kendoWindow").open();
        });
    }

    function UpdateForecastCummulativeGrid() {
        trackEvent("Portfolio center budget/spend tile forecast bulk edit tab - change currency");
        var ShowLocal = vm.PortfolioLocalCurrencyValue.LookUpMemberID == OKU_ID ? false : true;
        vm.showLocalCur = ShowLocal;
        if (ShowLocal == true) {
            
            $("#GridPortfolioForecastCummulative").hide();
            $("#GridPortfolioForecastCummulativeLocal").show();
        }
        else {
            $("#GridPortfolioForecastCummulative").show();
            $("#GridPortfolioForecastCummulativeLocal").hide();
        }
    };


    function forecastChange() {
        trackEvent("Portfolio center budget/spend tile forecast bulk edit tab - change forecast type");
        dataSourceForcastData = new kendo.data.DataSource();
        dataSourceBudgetCummulative = new kendo.data.DataSource();
        dataSourceBudgetCummulativeLocal = new kendo.data.DataSource();
        $("#GridPortfolioForecastCummulative").show();
        $("#GridPortfolioForecastCummulativeLocal").show();
        
        if (vm.forecastTypeValue.LookUpMemberID == capexId) {
         
            dataSourceForcastData = ds_PortfolioForecast_GridPortfolioForecastData(newDataForecastCapex);
            var grid1 = $('#GridPortfolioForecastData').data('kendoGrid');
            dataSourceForcastData.read();
            grid1.setDataSource(dataSourceForcastData);

            // vm.showLocalCur = true;
            var gridCummLocal = $('#GridPortfolioForecastCummulativeLocal').data('kendoGrid');
            dataSourceBudgetCummulativeLocal = ds_PortfolioForecast_GridPortfolioForecastCummulativeLocal(newDataCummulativeCapex);
            dataSourceBudgetCummulativeLocal.read();
            gridCummLocal.setDataSource(dataSourceBudgetCummulativeLocal);

            //    vm.showLocalCur = false;
            var gridCumm = $('#GridPortfolioForecastCummulative').data('kendoGrid');
            dataSourceBudgetCummulative = ds_PortfolioForecast_GridPortfolioForecastCummulative(newDataCummulativeCapex);
            dataSourceBudgetCummulative.read();
            gridCumm.setDataSource(dataSourceBudgetCummulative);
        }
        else {
            
            dataSourceForcastData = ds_PortfolioForecast_GridPortfolioForecastData(newDataForecastOpex);
            var grid = $('#GridPortfolioForecastData').data('kendoGrid');
            dataSourceForcastData.read();
            grid.setDataSource(dataSourceForcastData);

            var gridCummLocal1 = $('#GridPortfolioForecastCummulativeLocal').data('kendoGrid');
            dataSourceBudgetCummulativeLocal = ds_PortfolioForecast_GridPortfolioForecastCummulativeLocal(newDataCummulativeOpex);
            dataSourceBudgetCummulativeLocal.read();
            gridCummLocal1.setDataSource(dataSourceBudgetCummulativeLocal);

            //  vm.showLocalCur = false;
            var gridCumm1 = $('#GridPortfolioForecastCummulative').data('kendoGrid');
            dataSourceBudgetCummulative = ds_PortfolioForecast_GridPortfolioForecastCummulative(newDataCummulativeOpex);
            dataSourceBudgetCummulative.read();
            gridCumm1.setDataSource(dataSourceBudgetCummulative);
        }
        UpdateForecastCummulativeGrid();
        hideLoading();
    }
    function SaveForecastData() {
        trackEvent("Portfolio center budget/spend tile forecast bulk edit tab - submit forecast changes button");
        displayLoading();
        if ($('#GridPortfolioForecastData').data('kendoGrid') != undefined) {
            var gridupdatedData3 = $('#GridPortfolioForecastData').data('kendoGrid').dataSource.data()
                .filter(function (x) {
                    return x.dirty;
                })
                .map(function (x) {
                    return x;
                });
        }

        var updatedForcastData = { "objCapexGridData": JSON.stringify(gridupdatedData3), "strSubmittedByID": currentUserId };
        if (gridupdatedData3.length > 0) {
            $.when(GETPostService.postDataWCFAsync("insertUpdateProtfolioBudget", updatedForcastData))
                .then(function (resForecast) {
                    if (resForecast == "Success") {
                        $rootScope.$emit("applyFilterFunc");
                        console.log("save");
                        prepareDataForPortfolioForecast();
                    }
                    else {
                        hideLoading();
                        console.log("error");
                    }
                });
        }
        else {
            hideLoading();
        }
    }
    function prepareDataForPortfolioForecast() {
        displayLoading();
        try {
            // vm.forecastTypeValue = 'ec313be6-353d-413b-9805-b7519f2ede18';
            var lookup = BudgetForecast + ',' + PortfolioLocalCurrency;
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.postDataWCFAsync("getUserPermissionById", currentUserId), GETPostService.postDataWCFAsync("getPortfolioBudgetForecastData", filterDataToSendForecast), GETPostService.postDataWCFAsync("getPortfolioBudgetCummulativeData", filterDataToSendForecast), GETPostService.postDataWCFAsync("getYearLabel"))
                .then(function (resLookup, resUserglobalPermission, resPortfolioBudgetForecastData, resPortfolioBudgetCummulativeData,resYearLabel) {
                    try {
                        vm.ShowLocalDropDown = showLocalCurrencyDdl;
                        var permission = JSON.parse(resUserglobalPermission.getUserPermissionByIdResult)
                        if (permission != null) {
                            var permissionlist = permission.filter(function (entry) {
                                return entry.Permission == updateBudgetPerm;
                            });
                            if (permissionlist.length > 0) {
                                IsBudgetAdmin = true;
                            }
                        }
                        var resLookupResult = JSON.parse(resLookup.getLookupDataResult);
                        vm.forecastType = resLookupResult.filter(function (entry) {
                            return entry.LookUpName == BudgetForecast;
                        });

                        vm.PortfolioLocalCurrencyDS = resLookupResult.filter(function (entry) {
                            return entry.LookUpName == PortfolioLocalCurrency;
                        });

                        forecastDataCummulative = JSON.parse(resPortfolioBudgetCummulativeData);
                        vm.PreliminaryMsg = forecastDataCummulative.length > 6 ? prelimMsg : curMsg;
                        vm.isPreliminary = forecastDataCummulative.length > 6 ? true : false;
                        projectForecastData = JSON.parse(resPortfolioBudgetForecastData);
                        //if (projectForecastData.length > 0) {
                        //    vm.IsOpen = projectForecastData[0].Isopen;
                        //}
                        if (IsBudgetAdmin) { vm.IsOpen = true; }

                        //Capex Data
                        var projectForecastDataCapex = JSON.parse(resPortfolioBudgetForecastData).filter(function (entry) {
                            return entry.BudgetDataTypeID == capexId;
                        });

                        var forecastDataCummulativeCapex = JSON.parse(resPortfolioBudgetCummulativeData).filter(function (entry) {
                            return entry.BudgetDataTypeID == capexId;
                        });
                        //Opex Data
                        var projectForecastDataOpex = JSON.parse(resPortfolioBudgetForecastData).filter(function (entry) {
                            return entry.BudgetDataTypeID == opexId;
                        });

                        var forecastDataCummulativeOpex = JSON.parse(resPortfolioBudgetCummulativeData).filter(function (entry) {
                            return entry.BudgetDataTypeID == opexId;
                        });

                        angular.copy(forecastDataCummulativeCapex, newDataCummulativeCapex);
                        angular.copy(projectForecastDataCapex, newDataForecastCapex);

                        angular.copy(forecastDataCummulativeOpex, newDataCummulativeOpex);
                        angular.copy(projectForecastDataOpex, newDataForecastOpex);


                        vm.ShowLocalDropDown = showLocalCurrencyDdl;
                        vm.PortfolioLocalCurrencyValue = LocalCurrencyAbbreviationPortfolio == OKU_Text ? vm.PortfolioLocalCurrencyDS[1] : vm.PortfolioLocalCurrencyDS[0]

                        if (bulkBudget_IsPageLoad == true) {
                            $("#GridPortfolioForecastCummulative").show();
                            $("#GridPortfolioForecastCummulativeLocal").show();
                           
                            yearLabel = JSON.parse(resYearLabel.getYearLabelResult);
                            projectForcastCol = col_PortfolioForecast_GridPortfolioForecastData(yearLabel);
                            forcastColLocal = col_PortfolioForecast_GridPortfolioForecastCummulativeLocal(yearLabel);
                            forcastCol = col_PortfolioForecast_GridPortfolioForecastCummulative(yearLabel);
                            var selectedval = vm.forecastType.filter(function (entry) {
                                return entry.LookUpMemberID == capexId;
                            });
                            vm.forecastTypeValue = selectedval[0];
                            dataSourceForcastData = ds_PortfolioForecast_GridPortfolioForecastData(projectForecastDataCapex);
                            portfolioProjectForecastGrid();

                            dataSourceBudgetCummulativeLocal = ds_PortfolioForecast_GridPortfolioForecastCummulativeLocal(forecastDataCummulativeCapex);
                            portfolioForecastGridCummulativeLocal();

                            dataSourceBudgetCummulative = ds_PortfolioForecast_GridPortfolioForecastCummulative(forecastDataCummulativeCapex);
                            portfolioForecastGridCummulative();
                            UpdateForecastCummulativeGrid();

                            bulkBudget_IsPageLoad = false;
                        }
                        else {
                            forecastChange();
                        }
                        $scope.$digest();
                        hideLoading();
                    }
                    catch (err) {
                        hideLoading();
                        var dataToSend = {
                            "method": "prepareDataForPortfolioForecast", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { alert(errormessage) });
                        hideLoading();
                    }
                });
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "prepareDataForPortfolioForecast", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
            hideLoading();
        }


    };

    function portfolioForecastGridCummulative() {
        var cell_index = 0; //cell index 0 based
        var row_index = 0; //row index 0 based
        var rowData = null;
        var col = forcastCol;
        //  var dataSourceBudgetCummulative = datasource;
        //$("#GridPortfolioForecastCummulative").show();
        //$("#GridPortfolioForecastCummulativeLocal").show();
        $("#GridPortfolioForecastCummulative").kendoGrid({
            // the column fields should match the excel columns
            columns: col,
            dataSource: dataSourceBudgetCummulative,
            // selectable: "multiple cell",
            // allowCopy: true,
            editable: false,
            navigatable: true,
            dataBound: function (e) {
                var dataElement = $(e.sender.element).find(".k-grid-content");
                dataElement.scroll(function () {
                  var  fakeScroll = $("#GridPortfolioForecastData").find(".k-grid-content");
                  var fakeScrollLocal = $("#GridPortfolioForecastCummulativeLocal").find(".k-grid-content");
                    fakeScroll.scrollLeft(dataElement.scrollLeft());
                    fakeScrollLocal.scrollLeft(dataElement.scrollLeft());
                });
            }
        });
        var grid = $('#GridPortfolioForecastCummulative').data('kendoGrid');
        $(grid.tbody).on("click", "td", function (e) {
            var row = $(this).closest("tr");
            var rowIdx = $("tr", grid.tbody).index(row);
            cell_index = $("td", row).index(this);
            rowData = grid.dataItem(row)
        });
        // grid.element.on('mousedown', function (e) {  });

    };

    function portfolioForecastGridCummulativeLocal() {
        var cell_index = 0; //cell index 0 based
        var row_index = 0; //row index 0 based
        var rowData = null;
        var col = forcastColLocal;
        //  var dataSourceBudgetCummulative = datasource;
        $("#GridPortfolioForecastCummulativeLocal").kendoGrid({
            // the column fields should match the excel columns
            columns: col,
            dataSource: dataSourceBudgetCummulativeLocal,
            // selectable: "multiple cell",
            // allowCopy: true,
            editable: false,
            navigatable: true,
            dataBound: function (e) {
                var dataElement = $(e.sender.element).find(".k-grid-content");
                dataElement.scroll(function () {
                    var fakeScroll = $("#GridPortfolioForecastData").find(".k-grid-content");
                    var fakeScrollCum = $("#GridPortfolioForecastCummulative").find(".k-grid-content");
                    fakeScroll.scrollLeft(dataElement.scrollLeft());
                    fakeScrollCum.scrollLeft(dataElement.scrollLeft());
                });
            }
        });
        var grid = $('#GridPortfolioForecastCummulativeLocal').data('kendoGrid');
        $(grid.tbody).on("click", "td", function (e) {
            var row = $(this).closest("tr");
            var rowIdx = $("tr", grid.tbody).index(row);
            cell_index = $("td", row).index(this);
            rowData = grid.dataItem(row)
        });
        // grid.element.on('mousedown', function (e) {  });

    };

    function portfolioProjectForecastGrid() {
        var cell_index = 0; //cell index 0 based
        var row_Index = 0; //row index 0 based
        var rowData = null;

        //var UpdateVerticalTotal = function () {
        //    var grid = showLocalCurrencyPortfolio == false ? $("#GridPortfolioForecastCummulative").data("kendoGrid") : $("#GridPortfolioForecastCummulativeLocal").data("kendoGrid");
        //    var items = grid.dataSource.data();
        //    var i = 2;
        //    //updatedColumn.push("AnnualTotalY1");
        //    //updatedColumn.push("AnnualTotal");
        //    //updatedColumn.push("CumulativeTotal");
        //    for (var x = 0; x < updatedColumn.length; x++) {
        //        var results = (dataSourceForcastData.aggregates()[updatedColumn[x]]).sum;
        //        items[i].set(updatedColumn[x], results);
        //    }
        //    var sum = 0;
        //    var sum = items[i].Apr + items[i].May + items[i].Jun + items[i].Jul + items[i].Aug + items[i].Sep + items[i].Oct + items[i].Nov + items[i].Dec+ items[i].Jan + items[i].Feb + items[i].Mar ;
        //    items[i].set("AnnualTotal", sum);
        //    var sumY1 = items[i].AprY1 + items[i].MayY1 + items[i].JunY1 + items[i].JulY1 + items[i].AugY1 + items[i].SepY1 + items[i].OctY1 + items[i].NovY1 + items[i].DecY1+ items[i].JanY1 + items[i].FebY1 + items[i].MarY1 ;
        //    items[i].set("AnnualTotalY1", sumY1);
        //    var sumCum = sum + sumY1 + items[i].Y2 + items[i].Y3 + items[i].Y4 + items[i].Y5 + items[i].Historical;
        //    items[i].set("CumulativeTotal", sumCum);
        //    //updatedColumn
        //    //console.log(results.sum); // displays "63"
        //};

        $("#GridPortfolioForecastData").kendoGrid({
            // the column fields should match the excel columns
            columns: projectForcastCol,
            dataSource: dataSourceForcastData,
            sortable: true,
            // selectable: "multiple cell",
            // sort: [{ field: "BudgetDataID", dir: "asc" }],
            //height:"400px",
            allowCopy: true,
            editable: true,
            navigatable: true,

            pageable: true,
            edit: function (e) {
                try {
                    var lockedIndex = 5;
                    updatedColumn = [];
                    //   if (e.model.Active == "Previous") { this.closeCell(); }
                    //   else {
                    if (vm.IsOpen) {
                        var fieldName = grid.columns[e.container.index() + lockedIndex].field;
                        if (months.indexOf(fieldName) != -1 && (months.indexOf(fieldName) < e.model.ActualMonths)) {
                            //if (e.model.ActualMonths.indexOf(fieldName) > -1) {
                            this.closeCell();
                        }
                        else {
                            $("[name='" + fieldName + "']", e.container).blur(function () {
                                var fieldName1 = grid.columns[e.container.index() + lockedIndex].field;

                                CalculateTotal("GridPortfolioForecastData", e.model);
                                if (updatedColumn.length == 0)
                                    updatedColumn.push(fieldName1);
                                //   UpdateVerticalTotal();
                            });
                            $(e.container).keydown(function (e) {
                                if (e.keyCode == 9) {
                                    var grid = $('#GridPortfolioForecastData').data('kendoGrid');
                                    var row = $(this).closest("tr");
                                    var rowIdx = $("tr", grid.tbody).index(row);
                                    cell_index = Number($("td", row).index(this)) + 1;
                                    rowData = grid.dataItem(row)
                                }
                            })


                        }
                    }
                    else {
                        this.closeCell();
                    }

                    // }
                }
                catch (err) {
                    var dataToSend = {
                        "method": "portfolioProjectForecastGrid(edit)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            alert(errormessage)
                        });
                }
            },
            dataBound: function (e) {
                //Get the datasource here
                //var data = this._data.filter(function (x) { return x.Active == "Current" })
                //    .map(function (x) { return x });
                var data = this._data.map(function (x) {
                    return x
                });
                //Loop through each item
                for (var x = 0; x < data.length; x++) {
                    //Get the currently active item
                    var dataItem = data[x];
                    var actualmonths = dataItem.ActualMonths;
                    var i = 3;
                    //Access table row based on uid
                    var tr = $("#GridPortfolioForecastData").find("[data-uid='" + dataItem.uid + "']");
                    for (var index = 0; index < actualmonths; index++) {
                        //Access cell object
                        var cell = $("td.enableActuals:nth-child(" + (i + index) + ")", tr);
                        //Get the cell content here
                        //Assign the css style to cell
                        cell.addClass("budgetActuals");

                    }
                    if (vm.isPreliminary==true){
                        var cell = $("td.enableActuals:nth-child(" + (i + index) + ")", tr);
                    //Get the cell content here
                    //Assign the css style to cell
                        cell.addClass("PrelimItalic");
                    }


                }
                var dataElement = $(e.sender.element).find(".k-grid-content");

                //$("#GridPortfolioForecastCummulative").show();
                //$("#GridPortfolioForecastCummulativeLocal").show();
                var fakeScroll = $("#GridPortfolioForecastCummulative").find(".k-grid-content");
                var fakeScrollLocal = $("#GridPortfolioForecastCummulativeLocal").find(".k-grid-content");
                dataElement.scroll(function () {
                   var fakeScroll = $("#GridPortfolioForecastCummulative").find(".k-grid-content");
                   var fakeScrollLocal = $("#GridPortfolioForecastCummulativeLocal").find(".k-grid-content");
                    fakeScroll.scrollLeft(dataElement.scrollLeft());
                    fakeScrollLocal.scrollLeft(dataElement.scrollLeft());
                });
                //fakeScroll.scroll(function () {
                //    dataElement = $("#GridPortfolioForecastData").find(".k-grid-content");
                //    fakeScrollLocal = $("#GridPortfolioForecastCummulativeLocal").find(".k-grid-content");
                //    dataElement.scrollLeft(fakeScroll.scrollLeft());
                //    fakeScrollLocal.scrollLeft(fakeScroll.scrollLeft());
                //});
                //fakeScrollLocal.scroll(function () {
                //    dataElement = $("#GridPortfolioForecastData").find(".k-grid-content");
                //    fakeScroll = $("#GridPortfolioForecastCummulative").find(".k-grid-content");
                //    dataElement.scrollLeft(fakeScrollLocal.scrollLeft());
                //    fakeScroll.scrollLeft(fakeScrollLocal.scrollLeft());
                //});
                //UpdateForecastCummulativeGrid();
            },
        });
        var grid = $('#GridPortfolioForecastData').data('kendoGrid');
        $(grid.tbody).on("click", "td", function (e) {
            var row = $(this).closest("tr");
            row_Index = $("tr", grid.tbody).index(row);
            cell_index = $("td", row).index(this);
            rowData = grid.dataItem(row);
        });
        // grid.element.on('mousedown', function (e) {  });
        grid.element.on('keydown', function (e) {
            try {
                if (e.keyCode === 86 && e.ctrlKey === true && vm.IsOpen) {
                    var textarea = $("#forcast");
                    textarea.val("");
                    textarea.focus();
                    setTimeout(function (e) {
                        var value = $.trim(textarea.val());
                        var grid = $("#GridPortfolioForecastData").data("kendoGrid");
                        var rows = value.split('\n');
                        var data = [];
                        for (var i = 0; i < rows.length; i++) {
                            var kl = [];
                            var cells = rows[i].split('\t');
                            for (var j = 0; j < cells.length; j++) {
                                kl.push(cells[j]);
                            }
                            data.push(kl);
                        };
                        updatedColumn = [];

                        var columns = $("#GridPortfolioForecastData").data("kendoGrid").columns;
                        var rowData = grid.dataItems();
                        var t = 0;
                        for (var k = row_Index; k < rowData.length; k++) {

                            for (var index = cell_index; (index < columns.length && data[t].length > 0) ; index++) {
                                var dataField = $(grid.thead.find("th")[index]).attr("data-field");
                                updatedColumn.push(dataField);
                                if (dataField != "Y1" && dataField != "Active" && dataField != "Historical" && dataField != "AnnualTotal" && dataField != "CumulativeTotal") {

                                    if (rowData[k].ActualMonths != null) {
                                        if (rowData[k].ActualMonths.indexOf(dataField) == -1) {
                                            rowData[k].set(dataField, data[t].shift());
                                        }
                                    }
                                    else {
                                        rowData[k].set(dataField, data[t].shift());
                                    }
                                }
                            }
                            t++;
                            CalculateTotal("GridPortfolioForecastData", rowData[k]);
                            //UpdateVerticalTotal();
                            updatedColumn = [];
                        }

                        grid.refresh();

                        textarea.val("");
                    }, 1)
                }

            }
            catch (err) {
                var dataToSend = {
                    "method": "portfolioProjectForecastGrid(keydown)", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) {
                        alert(errormessage)
                    });
            }
        })
    };

    function CalculateTotal(grid, gridData) {
        var Total = 0;
        var yearTotal = 0;
        var yearY1Total = 0;
        //var gridData = $('#' + grid).data('kendoGrid').dataSource.data();
        //var gridData = $('#' + grid).data('kendoGrid').dataSource.data().filter(function (x) { return x.Active == "Current" })
        //    .map(function (x) { return x });
        //if (gridData.length > 0) {
        var item = gridData;
        // for (var i = 0; i < gridData.length; i++) {
        // var dataItem = $("#" + grid).data("kendoGrid").dataSource.get(item.BudgetDataID);
        if (gridData.Jan != null) {
            yearTotal += gridData.Jan;
            Total += gridData.Jan;
        }
        if (gridData.Feb != null) {
            yearTotal += gridData.Feb;
            Total += gridData.Feb;
        }
        if (gridData.Mar != null) {
            yearTotal += gridData.Mar;
            Total += gridData.Mar;
        }
        if (gridData.Apr != null) {
            yearTotal += gridData.Apr;
            Total += gridData.Apr;
        }
        if (gridData.May != null) {
            yearTotal += gridData.May;
            Total += gridData.May;
        }
        if (gridData.Jun != null) {
            yearTotal += gridData.Jun;
            Total += gridData.Jun;
        }
        if (gridData.Jul != null) {
            yearTotal += gridData.Jul;
            Total += gridData.Jul;
        }
        if (gridData.Aug != null) {
            yearTotal += gridData.Aug;
            Total += gridData.Aug;
        }
        if (gridData.Sep != null) {
            yearTotal += gridData.Sep;
            Total += gridData.Sep;
        }
        if (gridData.Oct != null) {
            yearTotal += gridData.Oct;
            Total += gridData.Oct;
        }
        if (gridData.Nov != null) {
            yearTotal += gridData.Nov;
            Total += gridData.Nov;
        }
        if (gridData.Dec != null) {
            yearTotal += gridData.Dec;
            Total += gridData.Dec;
        }
        //Y1
        if (gridData.JanY1 != null) {
            yearY1Total += gridData.JanY1;
            Total += gridData.JanY1;
        }
        if (gridData.FebY1 != null) {
            yearY1Total += gridData.FebY1;
            Total += gridData.FebY1;
        }
        if (gridData.MarY1 != null) {
            yearY1Total += gridData.MarY1;
            Total += gridData.MarY1;
        }
        if (gridData.AprY1 != null) {
            yearY1Total += gridData.AprY1;
            Total += gridData.AprY1;
        }
        if (gridData.MayY1 != null) {
            yearY1Total += gridData.MayY1;
            Total += gridData.MayY1;
        }
        if (gridData.JunY1 != null) {
            yearY1Total += gridData.JunY1;
            Total += gridData.JunY1;
        }
        if (gridData.JulY1 != null) {
            yearY1Total += gridData.JulY1;
            Total += gridData.JulY1;
        }
        if (gridData.AugY1 != null) {
            yearY1Total += gridData.AugY1;
            Total += gridData.AugY1;
        }
        if (gridData.SepY1 != null) {
            yearY1Total += gridData.SepY1;
            Total += gridData.SepY1;
        }
        if (gridData.OctY1 != null) {
            yearY1Total += gridData.OctY1;
            Total += gridData.OctY1;
        }
        if (gridData.NovY1 != null) {
            yearY1Total += gridData.NovY1;
            Total += gridData.NovY1;
        }
        if (gridData.DecY1 != null) {
            yearY1Total += gridData.DecY1;
            Total += gridData.DecY1;
        }
        //if (gridData.Y1 != null) {
        //    Total += gridData.Y1;
        //}

        if (gridData.Y2 != null) {
            Total += gridData.Y2;
        }
        if (gridData.Y3 != null) {
            Total += gridData.Y3;
        }
        if (gridData.Y4 != null) {
            Total += gridData.Y4;
        }
        if (gridData.Y5 != null) {
            Total += gridData.Y5;
        }
        if (gridData.Historical != null) {
            Total += gridData.Historical;
        }
        //  }
        // dataItem.set('Total', Number(Total));
        item["CumulativeTotal"] = Total;
        item["AnnualTotalY1"] = yearY1Total;
        item["AnnualTotal"] = yearTotal;

        //var grid = $('#' + grid).data('kendoGrid');
        //gridData.read();
        //grid.setDataSource(gridData);


        var grid = $('#' + grid).getKendoGrid();
        var row = grid.tbody.find("tr[data-uid='" + item.uid + "']");
        row.find('td:eq(14)').text(kendo.format("{0:#,#}", yearTotal)); // set total value in 16th cell
        row.find('td:eq(27)').text(kendo.format("{0:#,#}", yearY1Total));
        row.find('td:eq(32)').text(kendo.format("{0:#,#}", Total));
        //$('#' + grid).data('kendoGrid').refresh();
        //}
    }




    function initPortfolioForecast() {
        // prepareDataForPortfolioForecast();
    };
};