/// <reference path="C:\ProjectWidgets\TFS Online\OneShireProjectOnline\ProjectWidgets.OneShirePremier.SPOT\ProjectWidgets.OneShirePremier.SPOTApp\HTML/CurrencyFxRate.html" />
/// <reference path="C:\ProjectWidgets\TFS Online\OneShireProjectOnline\ProjectWidgets.OneShirePremier.SPOT\ProjectWidgets.OneShirePremier.SPOTApp\HTML/CurrencyFxRate.html" />
//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('PortfolioExcelUpdateCtrl', PortfolioExcelUpdateCtrl)
PortfolioExcelUpdateCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function PortfolioExcelUpdateCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    //-------------------------variable vm---------------------//
    vm.showLocalCur = true;
    vm.ProjId = "";
    vm.BudgetId = "";
    vm.BudgetDataFor = "Forecast"
    vm.IsOpen = false;
    vm.IsForecast = false;
    vm.IsHistorical = false;
    //-------------------------function vm---------------------//
    vm.initPortfolioBudgetExcelUpdate = initPortfolioBudgetExcelUpdate;
    vm.GetBudgetDataForExcel = GetBudgetDataForExcel;
    vm.forecastChangeExcel = forecastChangeExcel;
    vm.forecastChangeHistoricalExcel = forecastChangeHistoricalExcel;
    vm.SaveExcelDataHistorical = SaveExcelDataHistorical;
    vm.SaveExcelData = SaveExcelData;

    //-------------------------page level variable---------------------//
    var className = "PortfolioExcelUpdateCtrl";
    var projectForecastDataExcel = [];
    var projectHistoricalDataExcel = [];
    var dataSourceForcastDataExcel = new kendo.data.DataSource();
    var dataSourceHistoricalDataExcel = new kendo.data.DataSource();

    var updatedColumn = [];
    var newDataCummulativeCapex = [];
    var newDataForecastCapex = [];
    var newDataCummulativeOpex = [];
    var newDataForecastOpex = [];
    var IsBudgetAdmin = false;
    var filterDataToSendForecastExcel;
    var filterDataToSendHistoricalExcel;
    var bulkBudget_IsPageLoad = true;
    var bulkBudgetExcel_IsPageLoad = true;
    var bulkHistoricalExcel_IsPageLoad = true;
    var ExcelCol = [];
    var yearLabel = [];



    $rootScope.$on("portfolioForecastExcelUpdate", function (event, filterDataToSend) {
        vm.IsForecast = false;
        vm.IsHistorical = false;
        //  filterDataToSendForecast = JSON.parse(filterDataToSend);
        prepareDataForPortfolioForecastExcelUpdate();
    });
    /*******************Enter the Project Ids comma seperated and it will set the excel data for those*******************/
    function GetBudgetDataForExcel() {
        displayLoading();
          try {
              if (vm.BudgetDataFor == "Forecast") {
                  if ((vm.LBEPeriodValue != "" && vm.LBEPeriodValue != null) && vm.BudgetDataFor != "" && (vm.BudgetId != "" || vm.ProjId != "")) {
                      {
                          vm.IsForecast = true;
                          vm.IsHistorical = false;
                          var LBEPeriodList = vm.LBEPeriodValue.length > 1 ? vm.LBEPeriodValue.join(",") : vm.LBEPeriodValue[0];
                          var selectedval = vm.forecastType.filter(function (entry) {
                              return entry.LookUpMemberID == capexId;
                          });
                          vm.forecastTypeValue = selectedval[0];
                          filterDataToSendForecastExcel = {
                              "LBEPeriod": LBEPeriodList, "ProjectID": vm.ProjId, "BudgetID": vm.BudgetId
                          };
                          $.when(GETPostService.postDataWCFAsync("getProjectBulkBudgetForecastDataExcel", filterDataToSendForecastExcel))
                              .then(function (resPortfolioBudgetForecastData1) {
                                  try {
                                      projectForecastDataExcel = JSON.parse(resPortfolioBudgetForecastData1);

                                      //Capex Data
                                      var projectForecastDataCapexExcel = projectForecastDataExcel.filter(function (entry) {
                                          return entry.BudgetDataTypeID == capexId;
                                      });

                                      var projectForecastDataOpexExcel = projectForecastDataExcel.filter(function (entry) {
                                          return entry.BudgetDataTypeID == opexId;
                                      });

                                      //  angular.copy(projectForecastDataCapex, newDataForecastCapex);
                                      //   angular.copy(projectForecastDataOpex, newDataForecastOpex);

                                      //   vm.ShowLocalDropDown = showLocalCurrencyDdl;
                                      //   vm.PortfolioLocalCurrencyValue = LocalCurrencyAbbreviationPortfolio == OKU_Text ? vm.PortfolioLocalCurrencyDS[1] : vm.PortfolioLocalCurrencyDS[0]
                          

                                      if (bulkBudgetExcel_IsPageLoad == true) {

                                          bulkBudgetExcel_IsPageLoad = false;
                                  

                                          dataSourceForcastDataExcel = new kendo.data.DataSource({
                                              transport: {
                                                  read: function (e) {
                                                      e.success(projectForecastDataCapexExcel);
                                                  },
                                                  submit: onSubmit
                                              },
                                              batch: true,
                                              schema: {
                                                  model: {
                                                      id: "BudgetDataID",
                                                      fields: {
                                                          BudgetGlobalID: { type: "string" },
                                                          DateMasterID: { type: "string" },
                                                          BudgetDataID: { type: "string" },
                                                          BudgetDataIDY1: { type: "string" },
                                                          ProjectID: { type: "string" },
                                                          BudgetDataTypeID: { type: "string" },
                                                          BudgetData: { type: "string" },
                                                          CapitalBudgetID: { type: "string" },
                                                          ProblemID: { type: "string" },
                                                          ProblemTitle: { type: "string" },
                                                          PeriodName: { type: "string" },
                                                          HistoricalActual: { type: "number" },
                                                          Apr: { type: "number" },
                                                          May: { type: "number" },
                                                          Jun: { type: "number" },
                                                          Jul: { type: "number" },
                                                          Aug: { type: "number" },
                                                          Sep: { type: "number" },
                                                          Oct: { type: "number" },
                                                          Nov: { type: "number" },
                                                          Dec: { type: "number" },
                                                          Jan: { type: "number" },
                                                          Feb: { type: "number" },
                                                          Mar: { type: "number" },
                                                          Y1_Apr: { type: "number" },
                                                          Y1_May: { type: "number" },
                                                          Y1_Jun: { type: "number" },
                                                          Y1_Jul: { type: "number" },
                                                          Y1_Aug: { type: "number" },
                                                          Y1_Sep: { type: "number" },
                                                          Y1_Oct: { type: "number" },
                                                          Y1_Nov: { type: "number" },
                                                          Y1_Dec: { type: "number" },
                                                          Y1_Jan: { type: "number" },
                                                          Y1_Feb: { type: "number" },
                                                          Y1_Mar: { type: "number" },
                                                          Y2: { type: "number" },
                                                          Y3: { type: "number" },
                                                          Y4: { type: "number" },
                                                          Y5: { type: "number" },
                                                          Y1: { type: "number" },
                                                          AnnualTotal: { type: "number" },
                                                          CumulativeTotal: { type: "number" },
                                                      }
                                                  }
                                              }
                                          });
                                          InitSpreadSheet(dataSourceForcastDataExcel);
                                      }
                                      else {
                                          if (vm.forecastTypeValue == opexId)
                                              ReBindSpreadSheet(projectForecastDataOpexExcel);
                                          else ReBindSpreadSheet(projectForecastDataCapexExcel);
                                      }
                                      $scope.$digest();
                                      hideLoading();
                                  }
                                  catch (err) {
                                      hideLoading();
                                      var dataToSend = {
                                          "method": "GetBudgetDataForExcel", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                      };
                                      $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                          .then(function (response) { alert(errormessage) });
                                      hideLoading();
                                  }
                              });
                      }
                  }
                  else {
                      alert(bulkExcelDataMandatory);
                      hideLoading();
                  }
                }
              if (vm.BudgetDataFor == "Historical") {
                  if (vm.BudgetDataFor != "" && (vm.BudgetId != "" || vm.ProjId != "")){ 
      
                      vm.IsForecast = false;
                      vm.IsHistorical = true;
                      var selectedval = vm.forecastType.filter(function (entry) {
                          return entry.LookUpMemberID == capexId;
                      });
                      vm.forecastTypeHistoricalValue = selectedval[0];
                      filterDataToSendHistoricalExcel = {
                          "ProjectID": vm.ProjId, "BudgetID": vm.BudgetId
                      };
                      $.when(GETPostService.postDataWCFAsync("getProjectBulkBudgetHistoricalDataExcel", filterDataToSendHistoricalExcel))
                          .then(function (resPortfolioBudgetHistoricalData) {
                              try {
                                  projectHistoricalDataExcel = JSON.parse(resPortfolioBudgetHistoricalData);

                                  //Capex Data
                                  var projectHistoricalDataCapexExcel = projectHistoricalDataExcel.filter(function (entry) {
                                      return entry.BudgetDataTypeID == capexId;
                                  });

                                  var projectHistoricalDataOpexExcel = projectHistoricalDataExcel.filter(function (entry) {
                                      return entry.BudgetDataTypeID == opexId;
                                  });

                                  //  angular.copy(projectHistoricalDataCapex, newDataHistoricalCapex);
                                  //   angular.copy(projectHistoricalDataOpex, newDataHistoricalOpex);

                                  //   vm.ShowLocalDropDown = showLocalCurrencyDdl;
                                  //   vm.PortfolioLocalCurrencyValue = LocalCurrencyAbbreviationPortfolio == OKU_Text ? vm.PortfolioLocalCurrencyDS[1] : vm.PortfolioLocalCurrencyDS[0]

                                  if (bulkHistoricalExcel_IsPageLoad == true) {

                                      bulkHistoricalExcel_IsPageLoad = false;
                                      var selectedval = vm.forecastType.filter(function (entry) {
                                          return entry.LookUpMemberID == capexId;
                                      });
                                      vm.forecastTypeHistoricalValue = selectedval[0];

                                      dataSourceHistoricalDataExcel = new kendo.data.DataSource({
                                          transport: {
                                              read: function (e) {
                                                  e.success(projectHistoricalDataCapexExcel);
                                              },
                                              submit: onSubmitHistorical
                                          },
                                          batch: true,
                                          schema: {
                                              model: {
                                                  id: "BudgetHistoricalActualID",
                                                  fields: {
                                                      BudgetDataTypeID: { type: "string" },
                                                      ProjectID: { type: "string" },
                                                      BudgetDataType: { type: "string" },
                                                      ProblemID: { type: "string" },
                                                      CapitalBudgetID: { type: "string" },
                                                      ProblemTitle: { type: "string" },
                                                      HistoricalActual: { type: "number" },
                                                      HistoricalActualFY14: { type: "number" },
                                                      HistoricalActualFY15: { type: "number" },
                                                      HistoricalActualFY16: { type: "number" },
                                                      HistoricalActualFY17: { type: "number" },
                                                      HistoricalActualFY18: { type: "number" },
                                                      HistoricalActualFY19: { type: "number" },
                                                      HistoricalActualFY20: { type: "number" },
                                                      HistoricalActualFY21: { type: "number" },
                                                  }
                                              }
                                          }
                                      });
                                      InitSpreadSheetHistorical(dataSourceHistoricalDataExcel);
                                  }
                                  else {
                                      if (vm.forecastTypeHistoricalValue == opexId)
                                          ReBindSpreadSheetHistorical(projectHistoricalDataOpexExcel);
                                      else ReBindSpreadSheetHistorical(projectHistoricalDataCapexExcel);
                                  }
                                  $scope.$digest();
                                  hideLoading();
                              }
                              catch (err) {
                                  hideLoading();
                                  var dataToSend = {
                                      "method": "GetBudgetDataForExcel", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                  };
                                  $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                      .then(function (response) { alert(errormessage) });
                                  hideLoading();
                              }
                          });
                  }
                  else {
                      alert(bulkExcelDataHistoricalMandatory);
                      hideLoading();
                  }
              }
            }
            catch (err) {
                hideLoading();
                var dataToSend = {
                    "method": "GetBudgetDataForExcel", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
                hideLoading();
            }
        
       
    };

    /********************-----------------------Start: Methods for Forecast Excel Update--------------------------********************/
    function prepareDataForPortfolioForecastExcelUpdate() {
        displayLoading();
        try {
            var lookup = BudgetForecast;
            vm.LBEPeriodValue = null;
            vm.ProjId = "";
            vm.BudgetId = "";
            // vm.forecastTypeValue = 'ec313be6-353d-413b-9805-b7519f2ede18';
            filterDataToSendForecastExcel = {
                "LBEPeriod": "", "ProjectID": "", "BudgetID": ""
            };
            $.when(GETPostService.postDataWCFAsync("getLookupData", lookup), GETPostService.postDataWCFAsync("GetLBEPeriodData"), GETPostService.postDataWCFAsync("getUserPermissionById", currentUserId), GETPostService.postDataWCFAsync("getYearLabel")
).then(function (resLookup, resLBEPeriod, resUserglobalPermission, resYearLabel) {
    try {
        var permission = JSON.parse(resUserglobalPermission.getUserPermissionByIdResult)
        if (permission != null) {
            var permissionlist = permission.filter(function (entry) {
                return entry.Permission == updateBudgetPerm;
            });
            if (permissionlist.length > 0) {
                IsBudgetAdmin = true;
            }
        }
        vm.dsLBEPeriodData = JSON.parse(resLBEPeriod.getLBEPeriodDataResult);
        vm.dsLBEPeriod = {
            placeholder: "Select LBE Period...",
            dataTextField: "PeriodName",
            dataValueField: "DateMasterID",
            valuePrimitive: true,
            autoBind: false,
            dataSource: vm.dsLBEPeriodData,
            filter: "contains"
        };

        var resLookupResult = JSON.parse(resLookup.getLookupDataResult);
        vm.forecastType = resLookupResult.filter(function (entry) {
            return entry.LookUpName == BudgetForecast;
        });
        yearLabel = JSON.parse(resYearLabel.getYearLabelResult);
        createExcelColumns();
        $scope.$digest();
        hideLoading();
    }
    catch (err) {
        hideLoading();
        var dataToSend = {
            "method": "prepareDataForPortfolioForecastExcelUpdate", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
                "method": "prepareDataForPortfolioForecastExcelUpdate", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
            hideLoading();
        }


    };
    /********************-----------------------End: Methods for Forecast Excel Update--------------------------********************/
    /********************-----------------------START: Bind Spreadsheet--------------------------********************/
    function createExcelColumns() {
        ExcelCol = [
                                { field: "BudgetGlobalID", title: "Budget Global ID" },
                                { field: "DateMasterID", title: "Date Master ID" },
                                { field: "BudgetDataID", title: "Budget Data ID" },
                                { field: "BudgetDataIDY1", title: "Budget Data ID Y1" },
                                { field: "ProjectID", title: "Project ID" },
                                { field: "BudgetDataTypeID", title: "Budget Data Type ID" },
                                { field: "BudgetData", title: "Budget Data" },
                                { field: "CapitalBudgetID", title: "Capital Budget ID" },
                                { field: "ProblemID", title: "Problem ID" },
                                { field: "ProblemTitle", title: "Project Name" },
                                { field: "PeriodName", title: "Period Name" },
                                { field: "HistoricalActual", title: "Historical Actual" },
                        { field: "Apr", title: "Apr" },
                    { field: "May", title: "May" },
                    { field: "Jun", title: "Jun" },
                        { field: "Jul", title: "Jul" },
                            { field: "Aug", title: "Aug" },
                                { field: "Sep", title: "Sep" },
                                    { field: "Oct", title: "Oct" },
                                        { field: "Nov", title: "Nov" },
                                            { field: "Dec", title: "Dec" },
                                                { field: "Jan", title: "Jan" },
                                                    { field: "Feb", title: "Feb" },
                                                        { field: "Mar", title: "Mar" },
                                { field: "Y1_Apr", title: "AprY1" },
                                { field: "Y1_May", title: "MayY1" },
                                { field: "Y1_Jun", title: "JunY1" },
                                { field: "Y1_Jul", title: "JulY1" },
                                { field: "Y1_Aug", title: "AugY1" },
                                { field: "Y1_Sep", title: "SepY1" },
                                { field: "Y1_Oct", title: "OctY1" },
                                { field: "Y1_Nov", title: "NovY1" },
                                { field: "Y1_Dec", title: "DecY1" },
                                { field: "Y1_Jan", title: "JanY1" },
                                { field: "Y1_Feb", title: "FebY1" },
                                { field: "Y1_Mar", title: "MarY1" },
                                { field: "Y2", title: yearLabel[2].TblLabel },
                                { field: "Y3", title: yearLabel[3].TblLabel },
                                { field: "Y4", title: yearLabel[4].TblLabel },
                                { field: "Y5", title: yearLabel[5].TblLabel },
                                { field: "Y1", title: yearLabel[1].TblLabel },
                                { field: "AnnualTotal", title: "Annual Total" },
                                { field: "CumulativeTotal", title: "Cumulative Total" },

        ];
    }
     
    function InitSpreadSheet(dataSourceForcastDataExcel) {      

        var spreadsheet = $("#GridPortfolioForecastDataExcel").kendoSpreadsheet({

            toolbar: false,
            sheetsbar: false,
            sheets: [{
                name: "Products",
                dataSource: dataSourceForcastDataExcel,
                //filter: {
                //    ref: "G1:L2",
                //    //   columns:["ID","Date"]
                //},
                columns: [
                   {
                       width: 250
                   },
                   {
                       width: 250
                   },
                   {
                       width: 250
                   },
                   {
                       width: 250
                   },
                   {
                       width: 250
                   },
                   {
                       width: 250
                   },
                   {
                       width: 100
                   },
                   {
                       width: 100
                   },
                   {
                       width: 100
                   },
                   {
                       width: 300
                   },
                   {
                       width: 100
                   },
                   {
                       width: 100
                   }, {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },  {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   },
                   {
                       width: 75
                   }
                ]

            }],
            select: function (e) {
                // Check here if validation should be applied
                if (true) {
                    e.range.validation({
                        dataType: "number",
                        comparerType: "between",
                        from: -9999,
                        to: 1000000,
                        allowNulls: true,
                        type: "reject",
                        messageTemplate: "The value should be a number."
                    });
                }
            }
        }).data("kendoSpreadsheet");
        var sheet = spreadsheet.activeSheet();
        sheet.setDataSource(dataSourceForcastDataExcel, ExcelCol);
        var totalNoRows = (dataSourceForcastDataExcel.data().length == undefined || dataSourceForcastDataExcel.data().length==0) ? 0 : dataSourceForcastDataExcel.data().length + 1;
        if (totalNoRows > 0) {
            var totalNoRowsString = totalNoRows.toString()


            sheet.range("AP2:AP" + totalNoRowsString).formula("SUM(M2:X2)");
            sheet.range("AO2:AO" + totalNoRowsString).formula("SUM(Y2:AJ2)");
            sheet.range("AQ2:AQ" + totalNoRowsString).formula("SUM(L2:AN2)");
            var range = sheet.range(0, 0, totalNoRows, 12);
            range.color("Black");
            range.enable(false);


            //  range1.de


            var range2 = sheet.range("AO1:AQ" + totalNoRowsString);
            range2.enable(false);
            range2.color("Black");
        }
        var range1 = sheet.range("A0: AQ0");
        range1.enable(false);
        range1.color("Black");

        sheet.hideColumn(0);
        sheet.hideColumn(1);
        sheet.hideColumn(2);
        sheet.hideColumn(3);
        sheet.hideColumn(4);
        sheet.hideColumn(5);

    }
    /********************-----------------------END: Bind Spreadsheet--------------------------********************/
    /********************-----------------------START: ReBind Spreadsheet--------------------------********************/
    function ReBindSpreadSheet(projectForecastDataCapexExcel) {

        dataSourceForcastDataExcel = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(projectForecastDataCapexExcel);
                },
                submit: onSubmit
            },
            batch: true,
            schema: {
                model: {
                    id: "BudgetDataID",
                    fields: {
                        BudgetGlobalID: { type: "string" },
                        DateMasterID: { type: "string" },
                        BudgetDataID: { type: "string" },
                        BudgetDataIDY1: { type: "string" },
                        ProjectID: { type: "string" },
                        BudgetDataTypeID: { type: "string" },
                        BudgetData: { type: "string" },
                        CapitalBudgetID: { type: "string" },
                        ProblemID: { type: "string" },
                        ProblemTitle: { type: "string" },
                        PeriodName: { type: "string" },
                        HistoricalActual: { type: "number" },
                        Apr: { type: "number" },
                        May: { type: "number" },
                        Jun: { type: "number" },
                        Jul: { type: "number" },
                        Aug: { type: "number" },
                        Sep: { type: "number" },
                        Oct: { type: "number" },
                        Nov: { type: "number" },
                        Dec: { type: "number" },
                        Jan: { type: "number" },
                        Feb: { type: "number" },
                        Mar: { type: "number" },
                        Y1_Apr: { type: "number" },
                        Y1_May: { type: "number" },
                        Y1_Jun: { type: "number" },
                        Y1_Jul: { type: "number" },
                        Y1_Aug: { type: "number" },
                        Y1_Sep: { type: "number" },
                        Y1_Oct: { type: "number" },
                        Y1_Nov: { type: "number" },
                        Y1_Dec: { type: "number" },
                        Y1_Jan: { type: "number" },
                        Y1_Feb: { type: "number" },
                        Y1_Mar: { type: "number" },
                        Y2: { type: "number" },
                        Y3: { type: "number" },
                        Y4: { type: "number" },
                        Y5: { type: "number" },
                        Y1: { type: "number" },
                        AnnualTotal: { type: "number" },
                        CumulativeTotal: { type: "number" },
                    }
                }
            }
        });

        var spreadsheet = $("#GridPortfolioForecastDataExcel").data("kendoSpreadsheet");
        var sheet = spreadsheet.activeSheet();
        sheet.setDataSource(dataSourceForcastDataExcel, ExcelCol);

        var totalNoRows = (dataSourceForcastDataExcel.data().length == undefined || dataSourceForcastDataExcel.data().length == 0) ? 0 : dataSourceForcastDataExcel.data().length + 1;
        if (totalNoRows > 0)
            {
        var totalNoRowsString = totalNoRows.toString()
        sheet.range("AP2:AP" + totalNoRowsString).formula("SUM(M2:X2)");
        sheet.range("AO2:AO" + totalNoRowsString).formula("SUM(Y2:AJ2)");
        sheet.range("AQ2:AQ" + totalNoRowsString).formula("SUM(L2:AN2)");
        var range = sheet.range(0, 0, totalNoRows, 12);
        range.color("Black");
        range.enable(false);

        var range2 = sheet.range("AO1:AQ" + totalNoRowsString);
        range2.enable(false);
        range2.color("Black");   
        }
        var range1 = sheet.range("A0: AQ0");
        range1.enable(false);
        range1.color("Black");

        sheet.hideColumn(0);
        sheet.hideColumn(1);
        sheet.hideColumn(2);
        sheet.hideColumn(3);
        sheet.hideColumn(4);
        sheet.hideColumn(5);
    }
    /********************-----------------------END: ReBind Spreadsheet--------------------------********************/
    /********************-----------------------START: Bind Spreadsheet for Historical--------------------------********************/
    function InitSpreadSheetHistorical(dataSourceHistoricalDataExcel) {
        var spreadsheet = $("#GridPortfolioHistoricalDataExcel").kendoSpreadsheet({

            toolbar: false,
            sheetsbar: false,
            sheets: [{
                name: "Historical",
                dataSource: dataSourceHistoricalDataExcel,

            }],
            select: function (e) {
                // Check here if validation should be applied
                if (true) {
                    e.range.validation({
                        dataType: "number",
                        comparerType: "between",
                        from: 0,
                        to: 1000000,
                        allowNulls: true,
                        type: "reject",
                        messageTemplate: "The value should be a number."
                    });
                }
            }
        }).data("kendoSpreadsheet");
        var totalNoRows = dataSourceHistoricalDataExcel.data().length == undefined ? 0 : dataSourceHistoricalDataExcel.data().length + 1;
        var sheet = spreadsheet.activeSheet();

        var range = sheet.range(0, 0, totalNoRows, 8);
        range.enable(false);
        range.color("Black");
        var totalNoRowsString = totalNoRows.toString();
        sheet.range("H2:H" + totalNoRowsString).formula("SUM(I2:P2)");

        var range1 = sheet.range("A0: P0");
        range1.enable(false);
        range1.color("Black");

        sheet.hideColumn(0);
        sheet.hideColumn(1);
        sheet.hideColumn(2);
    }
    /********************-----------------------END: Bind Spreadsheet--------------------------********************/
    /********************-----------------------START: ReBind Spreadsheet--------------------------********************/
    function ReBindSpreadSheetHistorical(projectHistoricalDataCapexExcel) {

        dataSourceHistoricalDataExcel = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(projectHistoricalDataCapexExcel);
                },
                submit: onSubmitHistorical
            },
            batch: true,
            schema: {
                model: {
                    id: "BudgetHistoricalActualID",
                    fields: {
                        BudgetDataTypeID: { type: "string" },
                        ProjectID: { type: "string" },
                        BudgetDataType: { type: "string" },
                        ProblemID: { type: "string" },
                        CapitalBudgetID: { type: "string" },
                        ProblemTitle: { type: "string" },
                        HistoricalActual: { type: "number" },
                        HistoricalActualFY14: { type: "number" },
                        HistoricalActualFY15: { type: "number" },
                        HistoricalActualFY16: { type: "number" },
                        HistoricalActualFY17: { type: "number" },
                        HistoricalActualFY18: { type: "number" },
                        HistoricalActualFY19: { type: "number" },
                        HistoricalActualFY20: { type: "number" },
                        HistoricalActualFY21: { type: "number" },
                    }
                }
            }
        });

        var spreadsheet = $("#GridPortfolioHistoricalDataExcel").data("kendoSpreadsheet");
        var sheet = spreadsheet.activeSheet();
        sheet.setDataSource(dataSourceHistoricalDataExcel);

        var totalNoRows = dataSourceHistoricalDataExcel.data().length == undefined ? 0 : dataSourceHistoricalDataExcel.data().length + 1;
        var range = sheet.range(0, 0, totalNoRows, 8);
     
        range.color("Black");
        range.enable(false);

        var totalNoRowsString = totalNoRows.toString();
        sheet.range("H2:H" + totalNoRowsString).formula("SUM(I2:P2)");
        var range1 = sheet.range("A0: P0");
        range1.enable(false);
        range1.color("Black");
        sheet.hideColumn(0);
        sheet.hideColumn(1);
        sheet.hideColumn(2);
    }
    /********************-----------------------END: ReBind Spreadsheet--------------------------********************/
    function forecastChangeExcel() {
        trackEvent("Portfolio center budget/spend tile forecast bulk edit Excel tab - change forecast type");

        if (vm.forecastTypeValue.LookUpMemberID == capexId) {
            var projectForecastDataCapexExcel = projectForecastDataExcel.filter(function (entry) {
                return entry.BudgetDataTypeID == capexId;
            });
            //var dataSource = new kendo.data.DataSource({
            //    data: projectForecastDataCapexExcel,
            //});
            ReBindSpreadSheet(projectForecastDataCapexExcel);
            //    $("#GridPortfolioForecastDataExcel").kendoSpreadsheet();
        }
        else {
            var projectForecastDataOpexExcel = projectForecastDataExcel.filter(function (entry) {
                return entry.BudgetDataTypeID == opexId;
            });
            //var dataSource = new kendo.data.DataSource({
            //    data: projectForecastDataOpexExcel,
            //});
            ReBindSpreadSheet(projectForecastDataOpexExcel);

        }
        hideLoading();
    }

    function forecastChangeHistoricalExcel() {
        trackEvent("Portfolio center budget/spend tile forecast bulk edit Excel tab - change forecast type");

        if (vm.forecastTypeHistoricalValue.LookUpMemberID == capexId) {
            var projectHistoricalDataCapexExcel = projectHistoricalDataExcel.filter(function (entry) {
                return entry.BudgetDataTypeID == capexId;
            });

            ReBindSpreadSheetHistorical(projectHistoricalDataCapexExcel);

        }
        else {
            var projectHistoricalDataOpexExcel = projectHistoricalDataExcel.filter(function (entry) {
                return entry.BudgetDataTypeID == opexId;
            });

            ReBindSpreadSheetHistorical(projectHistoricalDataOpexExcel);

        }
        hideLoading();
    }

    function SaveExcelData() {
        dataSourceForcastDataExcel.sync();
    }

    function SaveExcelDataHistorical() {
        dataSourceHistoricalDataExcel.sync();
        //   var gridupdatedData3 = $('#GridPortfolioForecastDataExcel').data('kendoSpreadsheet').sheets("Product")[0].dataSource.options.data;
        //.filter(function (x) {
        //    return x.dirty;
        //})
        //.map(function (x) {
        //    return x;
        //});

    }
    function onSubmit(e) {
        displayLoading();
        //     alert(kendo.stringify(e.data.updated));
        var GridData = e.data.updated.filter(function (entry) {
            return entry.BudgetDataTypeID == vm.forecastTypeValue.LookUpMemberID;
        });
        var dataToSend = { "ForecastExcelGridData": JSON.stringify(GridData), "userId": currentUserId, "HistoricalExcelGridData": "" };
        $.when(GETPostService.postDataWCFAsync('insertUpdateProjectBulkBudgetForecastDataExcel', dataToSend))
              .then(function (response) {
                  alert(saveMessage);
                  $.when(GETPostService.postDataWCFAsync("getProjectBulkBudgetForecastDataExcel", filterDataToSendForecastExcel))
                    .then(function (resPortfolioBudgetForecastData1) {
                        try {
                            projectForecastDataExcel = JSON.parse(resPortfolioBudgetForecastData1);
                            $rootScope.$emit("applyFilterFunc");
                            forecastChangeExcel();
                        } catch (err) {
                            hideLoading();
                            var dataToSend = {
                                "method": "onSubmit", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                            };
                            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                .then(function (response) { alert(errormessage) });
                            hideLoading();
                        }
                    });
              });
    }
    function onSubmitHistorical(e) {
        displayLoading();
        var GridData = e.data.updated.filter(function (entry) {
            return entry.BudgetDataTypeID == vm.forecastTypeHistoricalValue.LookUpMemberID;
        });
        var dataToSend = { "ForecastExcelGridData": "", "userId": currentUserId, "HistoricalExcelGridData": JSON.stringify(GridData) };
        $.when(GETPostService.postDataWCFAsync('insertUpdateProjectBulkBudgetForecastDataExcel', dataToSend))
              .then(function (response) {
                  alert(saveMessage);
                  $.when(GETPostService.postDataWCFAsync("getProjectBulkBudgetHistoricalDataExcel", filterDataToSendHistoricalExcel))
                  .then(function (resPortfolioBudgetHistoricalData) {
                      try {
                          projectHistoricalDataExcel = JSON.parse(resPortfolioBudgetHistoricalData);
                          $rootScope.$emit("applyFilterFunc");
                          forecastChangeHistoricalExcel();
                      }
                      catch (err) {
                          hideLoading();
                          var dataToSend = {
                              "method": "onSubmitHistorical", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                          };
                          $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                              .then(function (response) { alert(errormessage) });
                          hideLoading();
                      }
                  });
              });
    }

    function initPortfolioBudgetExcelUpdate() {
        // prepareDataForPortfolioForecast();
    };
};