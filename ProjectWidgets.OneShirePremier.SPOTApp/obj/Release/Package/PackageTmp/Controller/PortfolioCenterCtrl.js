//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('ProjectCenterCtrl', ProjectCenterCtrl)
ProjectCenterCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function ProjectCenterCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    //Variables to bind data on tiles
    vm.tileInfo = {};
    vm.buildNo = buildNo;
    vm.releaseDate = releaseDate;
    //vm.includeChart = false;
    vm.includeLocal = false;
    vm.includeDefault = true;
    vm.includeCapitalReport = false;
    vm.searchButtonText = "Apply";
    var valid = true;
    vm.forecastBulkEdit = false;
    vm.includeChild = false;
    vm.OYAbbreviationPortfolio = "";
    //var FilterOpen = 0;
    var className = "PortfolioCenterCtrl";

    vm.selectedPeoplefilter = [];
    vm.selectedParentProgramfilter = [];
    vm.selectedProjectStatusfilter = [];
    vm.filterPortfolio = [];
    vm.selectedProjectCapPhasefilter = [];
    vm.selectedProjectOEPhasefilter = [];
    vm.selectedProjectPhasefilter = [];
    vm.objselectedProjectOEPhasefilter = [];
    vm.objselectedProjectCapPhasefilter = [];

    var OEPhasefilterList = [];
    var dsOEPhasefilterList = [];
    var CapPhasefilterList = [];
    var dsCapPhasefilterList = [];
    //vm.dsLocalVarFilter = [];

    //For Milestone Performance
    var LateMilestoneList = [];
    var preLateMilestoneList = [];
    var localAttriPeople = [];
    var dsProjectPhase = [];

    var dsChartPhaseProject = [];
    var lstTopsPriority = [];
    var chkMilestoneData = false;


    // Functions
    vm.initProjectCenter = initProjectCenter;
    vm.InitKendoGridPriority = InitKendoGridPriority;
    vm.InitKendoGridLate = InitKendoGridLate;
    vm.InitNextThreeMnth = InitNextThreeMnth;
    vm.InitPhaseWindow = InitPhaseWindow;
    vm.InitBudgetWindow = InitBudgetWindow;
    vm.InitLstThreeMnthWindow = InitLstThreeMnthWindow;
    vm.getLocalAttributes = getLocalAttributes;
    vm.ApplyFilter = ApplyFilter;
    vm.bindGridChart = bindGridChart;
    vm.clearFilter = clearFilter;
    vm.ExportToExcel = ExportToExcel;
    vm.SpotDataPowerBI = SpotDataPowerBI;
    vm.UpdateFilter = UpdateFilter;
    vm.insertReports = insertReports;
    vm.getGridViewProjects = getGridViewProjects;
    vm.getCapexData = getCapexData;
    vm.getExcelBudgetData = getExcelBudgetData;
    vm.checkAll = checkAll;
    vm.GetFxRates = GetFxRates;
    vm.trackEventFunc = trackEventFunc;
    vm.ClearAllSort = ClearAllSort;
    vm.capsProjectTooltipPcr = capsProjectTooltip;
    //vm.environmentalTootltipPcr = environmentalTootltip;
    //    vm.getCapitalPhaseMainFilter = getCapitalPhaseMainFilter;
    vm.currencyChange = currencyChange;
    vm.showLocalCur = false;
    vm.ShowLocalDropDown = false;
    vm.PortfolioPowerBIReport = PortfolioPowerBIReport;

    //Local array variables
    var nxtThreeMthMilestoneCmplt = [];
    var nxtThreeMthProjectCmplt = [];

    var ltThreeMthMileCompl = [];
    var ltThreeMthProjFinishExec = [];
    var ltThreeMthProjInitiated = [];
    var ltThreeMthProjCompleted = [];
    var ltThreeMthProjOnHold = [];

    var listProjInitiate = [];
    var listProjDefine = [];
    var listProjPlan = [];
    var listProjExecute = [];
    var listProjClose = [];
    var listProjTrack = [];
    var phases = [];
    var ProjectData = [];
    var userFilter = "";
    var parentProgramFilter = "";
    var ProjectCapPhaseFilter = "";
    var gridDataRiskIssue = [];
    var gridDataAskNeed = [];
    var dropdownValueLookupBulk = [];

    var dataToSendLocal = JSON.stringify([]);
    var OriginalSelectedPortfolioData = [];
    var OriginalSelectedExecutionScope = [];

    //var OriginalSelectedPortfolioOwnerForLocalGrid = [];
    //var OriginalSelectedExecutionScopeForLocalGrid = [];
    //Integer variables
    var InitNextWindowData = 0;
    var InitLastWindowData = 0;
    var InitPhaseWindowData = 0;
    var InitPriorityWindowData = 0;
    var InitMilePerformanceData = 0;
    var InitBudgetSpendWindowData = 0;
    var IsPageLoad = 0;
    var filterDataToSend = {};
    vm.mainFilterCount = 0;
    vm.parentProgramCount = 0;
    vm.LocalVariableCnt = 0;
    var LocalProjGrid = null;
    var CapitalProjGrid = null;
    var DefaultProjGrid = null;
    var changPortfolio = 0;
    var validfilter = true;
    var closeByButton = 0;
    var filteredDefault = false;
    var filteredLocal = false;
    var filteredCapital = false;
    var localGridCreated = false;
    var localGridCreatedWithPO = false;
    var capitalGridCreated = false;
    var defaultGridCreated = false;

    var div = '<div style="width:1300px; height:22px; overflow-x: scroll; margin-left: auto;" id="scroller"><div style="height:1px"> </div></div>';
    var divCap = '<div style="width:1300px; height:22px; overflow-x: scroll; margin-left: auto;" id="scrollerCap"><div style="height:1px"> </div></div>';
    var divLv = '<div style="width:1300px; height:22px; overflow-x: scroll; margin-left: auto;" id="scrollerLv"><div style="height:1px"> </div></div>';

    function ClearAllSort() {
        if (vm.includeGridView == LocalAttributes)
            $("#gridPortfolioCenterProjLV").data("kendoGrid").dataSource.sort({
                //    field: "OverallStatusOrder", dir: "asc"
                //},
                //                        {
                //                            field: "ProjectNameWithoutPrefix", dir: "asc"
            });
        else if (vm.includeGridView == CapitalPortfolioReport)
            $("#gridPortfolioCenterProjCapitalVw").data("kendoGrid").dataSource.sort({
                //    field: "PortfolioOwnerName", dir: "asc"
                //},
                //                {
                //                    field: "AnnualForecastPerformanceAbsolute", dir: "desc"
            });
        else
            $("#gridPortfolioCenterProj").data("kendoGrid").dataSource.sort({
                //    field: "OverallStatusOrder", dir: "asc"
                //},
                //                        {
                //                            field: "ProjectNameWithoutPrefix", dir: "asc"
            });

    }

    function trackEventFunc(eventName) {
        trackEvent(eventName);
    }
    function GetFxRates() {
        trackEvent("Portfolio center budget/spend tile FxRates button");

        var myWindow = $("#dialogFxRate");
        myWindow.kendoWindow({
            content: "CurrencyFxRate.html?v=" + buildNo,
            modal: true
        });
        $.when(GETPostService.getCurrencyFxRate()).then(function (response) {
            myWindow.data("kendoWindow").open();
        });
    }

    function currencyChange() {
        trackEvent("Portfolio center budget/spend tile currency change");
        vm.showLocalCur = vm.PortfolioLocalCurrencyValue.LookUpMemberID == OKU_ID ? false : true;
        if (vm.showLocalCur == true) {
            $("#OKU_Div").hide();
            $("#Local_Div").show();
        }
        else {
            $("#OKU_Div").show();
            $("#Local_Div").hide();
        }
    }

    function getCapexData() {
        trackEvent("Portfolio center budget/spend tile - Forecast Bulk Edit");
        $rootScope.$emit("portfolioBudgetForecast", JSON.stringify(filterDataToSend));
    }

    function getExcelBudgetData() {
        
        trackEvent("Portfolio center budget/spend tile - Forecast Excel Update");
        $rootScope.$emit("portfolioForecastExcelUpdate", JSON.stringify(filterDataToSend));
    }
    $rootScope.$on("applyFilterFunc", function () {
        ApplyFilter('Apply');
        CreateCapexPerformanceChart();
    });

    function addScroller(grid) {
        if (grid.element.length > 0) {
            if (grid.element[0].id == "gridPortfolioCenterProj") {
                $('#scroller').remove();

                grid.wrapper.find('.k-grid-header').append(div);
                $('#scroller').width(grid.wrapper.find('.k-grid-content').width() - parseInt(grid.wrapper.find('.k-grid-header').css("padding-right")));
                $('#scroller > div').width(grid.wrapper.find('.k-grid-content tbody').width());

                $("#gridPortfolioCenterProj .k-grid-content").scroll(function () {
                    $("#scroller").scrollLeft($("#gridPortfolioCenterProj .k-grid-content").scrollLeft());
                });
                $("#scroller").scroll(function () {

                    $("#gridPortfolioCenterProj .k-grid-content").scrollLeft($("#scroller").scrollLeft());
                });
            }
            else if (grid.element[0].id == "gridPortfolioCenterProjCapitalVw") {
                $('#scrollerCap').remove();

                grid.wrapper.find('.k-grid-header').append(divCap);
                $('#scrollerCap').width(grid.wrapper.find('.k-grid-content').width() - parseInt(grid.wrapper.find('.k-grid-header').css("padding-right")));
                $('#scrollerCap > div').width(grid.wrapper.find('.k-grid-content tbody').width());

                $("#gridPortfolioCenterProjCapitalVw .k-grid-content").scroll(function () {
                    $("#scrollerCap").scrollLeft($("#gridPortfolioCenterProjCapitalVw .k-grid-content").scrollLeft());
                });
                $("#scrollerCap").scroll(function () {

                    $("#gridPortfolioCenterProjCapitalVw .k-grid-content").scrollLeft($("#scrollerCap").scrollLeft());
                });
            }
            else if (grid.element[0].id == "gridPortfolioCenterProjLV") {
                $('#scrollerLv').remove();

                grid.wrapper.find('.k-grid-header').append(divLv);

                $('#scrollerLv').width(grid.wrapper.find('.k-grid-content').width() - parseInt(grid.wrapper.find('.k-grid-header').css("padding-right")));
                $('#scrollerLv > div').width(grid.wrapper.find('.k-grid-content tbody').width());

                $("#gridPortfolioCenterProjLV .k-grid-content").scroll(function () {
                    $("#scrollerLv").scrollLeft($("#gridPortfolioCenterProjLV .k-grid-content").scrollLeft());
                });
                $("#scrollerLv").scroll(function () {

                    $("#gridPortfolioCenterProjLV .k-grid-content").scrollLeft($("#scrollerLv").scrollLeft());
                });
            }
        }

    }

    function getGridViewProjects() {
        trackEvent("Portfolio center project view changed");
        $("div").removeClass("fixed-header");
        //header1.removeClass("fixed-header");
        var selectedGridView = vm.includeGridView;
        localStorage['selectedPortfolioGridView'] = selectedGridView;
        if (selectedGridView == LocalAttributes) {
            vm.includeDefault = false;
            vm.includeLocal = true;
            vm.includeCapitalReport = false;
            $("#gridPortfolioCenterProjLV").show();
            $("#gridPortfolioCenterProjCapitalVw").hide();
            $("#gridPortfolioCenterProj").hide();
        }
        else if (selectedGridView == CapitalPortfolioReport) {
            vm.includeDefault = false;
            vm.includeLocal = false;
            vm.includeCapitalReport = true;
            $("#gridPortfolioCenterProjLV").hide();
            $("#gridPortfolioCenterProjCapitalVw").show();
            $("#gridPortfolioCenterProj").hide();
        }
        else {
            vm.includeDefault = true;
            vm.includeLocal = false;
            vm.includeCapitalReport = false;
            $("#gridPortfolioCenterProjLV").hide();
            $("#gridPortfolioCenterProjCapitalVw").hide();
            $("#gridPortfolioCenterProj").show();
        }

        if (vm.includeDefault === true && filteredDefault === false) {
            InitKendoGridProj();
            filteredDefault = true;
        }

        else if (vm.includeLocal == true && filteredLocal === false) {

            displayLoading();
            var objLV = JSON.stringify([]);
            //  var dataToSend = filterDataToSend;
            $("#gridPortfolioCenterProjLV").show();
            //$(".k-grid-header").removeClass("fixed-header");

            $.when(GETPostService.postDataWCFAsync("getAllProjectInfoWithLocalVar", filterDataToSend))
                .then(function (resAllProjWithLocal) {
                    try {
                        debugger;
                        var resLocalProj = JSON.parse(resAllProjWithLocal);

                        if (localGridCreatedWithPO == true && localGridCreated === false) {
                            $('#gridPortfolioCenterProjLV').kendoGrid('destroy').empty();
                            localGridCreatedWithPO = false;
                            localGridCreated === false;
                        }
                        if (localGridCreated === false) {
                            var gridCol = col_PortfoliCenter_gridPortfolioCenterProjLocal();
                            if (resLocalProj.length > 0) {
                                var colResult = (generateModel(resLocalProj)).sort();
                                var colToExclude = nonConsiderableColumnInPortfolioLocal.split(',');
                                //     var dateFieldInProject = LocalVarProjectDateField.split(',');

                                angular.forEach(colResult, function (item, index) {
                                    if (jQuery.inArray(item, colToExclude) == -1) {
                                        var len = gridCol.filter(function (entry) {
                                            return entry.field == item;
                                        });
                                        if (len.length == 0) {
                                            var obj = {};
                                            //if (index == 1) {
                                            //    obj.locked = true;
                                            //    obj.lockable = false;
                                            //}

                                            obj.field = "[\"" + item + "\"]";
                                            obj.title = item;
                                            obj.width = 200;

                                            gridCol.push(obj);
                                        }
                                    }
                                });

                            }

                            LocalProjGrid = $("#gridPortfolioCenterProjLV").kendoGrid({
                                //columnMenuOpen: function (e) {
                                //    var mylist = e.container.find(".k-columns-item>ul");
                                //    var listitems = mylist.children('li').get();

                                //    $(listitems).find("input").click(function (e) {
                                //        if (!$(this).hasClass("custom-class")) {
                                //            var allChecked = $(this).closest("ul").find("li.k-item input:checked").length == $(this).closest("ul").find("li.k-item input").length;
                                //            $(".custom-class input")[0].checked = allChecked;
                                //        }
                                //    })
                                //    e.container.find(".custom-class").remove()
                                //    e.container.find('.k-filter-item').find('[role="menuitemcheckbox"]').remove();
                                //    var GridName = LocalAttributes;
                                //    if (LocalGridSelectAll === true) {
                                //        $("<li class='custom-class'><span class='k-link'><input type='checkbox' checked onclick='checkAll(this," + GridName + ")'/>SelectAll</span></li>").insertBefore(e.container.find(".k-columns-item ul li").last());
                                //    }
                                //    else
                                //        $("<li class='custom-class'><span class='k-link'><input type='checkbox' onclick='checkAll(this," + GridName + ")'/>SelectAll</span></li>").insertBefore(e.container.find(".k-columns-item ul li").last());
                                //},
                                columnShow: function () {
                                    addScroller(this)
                                },
                                columnHiede: function () {
                                    addScroller(this)
                                },
                                dataSource: {
                                    data: resLocalProj,
                                    pageSize: 100,
                                    sort: [{ field: "OverallStatusOrder", dir: "asc" },
                                    {
                                        field: "ProjectNameWithoutPrefix", dir: "asc"
                                    }]

                                },
                                // sortable: true,
                                sortable: { mode: "multiple", allowUnsort: true },
                                filterable: true,
                                columnMenu: true,
                                reorderable: true,
                                resizable: true,
                                pageable: true,




                                columns: gridCol,
                                dataBound: function () {
                                    /*To make the grid scrollable with fix header*/
                                    /*Start*/
                                    var wrapper1 = this.wrapper,
                                        header1 = wrapper1.find(".k-grid-header");
                                    //   toolbar = wrapper.find(".k-grid-toolbar"),
                                    //  pagingSpace = wrapper1.find(".k-grid-pager");
                                    addScroller(this);
                                    function resizeFixed1() {
                                        var paddingRight = parseInt(header1.css("padding-right"));
                                        header1.css("width", wrapper1.width() - paddingRight);
                                    }

                                    function scrollFixed1() {
                                        /*How much screen has scrolled*/
                                        var offset = $(this).scrollTop(),
                                            /*How much grid has offset from top*/
                                            //     tableOffsetTop = wrapper1.offset().top + toolbar.height() + header.height(),
                                            tableOffsetTop1 = wrapper1.offset().top + header1.height(),
                                            /**/
                                            //   tableOffsetBottom = (tableOffsetTop - toolbar.height()) + wrapper1.height() + 20 - header.height();
                                            tableOffsetBottom1 = tableOffsetTop1 + wrapper1.height() - header1.height();
                                        if (offset >= tableOffsetTop1) {
                                            header1.addClass("fixed-header");
                                        } else {
                                            header1.removeClass("fixed-header");
                                        }
                                    }

                                    resizeFixed1();
                                    $(window).resize(resizeFixed1);
                                    $(window).scroll(scrollFixed1);
                                    /************************   End   ******************************************/
                                    //  if (vm.includeChart == true) {
                                    var grid = this;

                                    $(".chartPercentageCompleteLv").each(function () {
                                        var chart = $(this);
                                        var tr = chart.closest('tr');
                                        var model = grid.dataItem(tr);
                                        chart.kendoChart({
                                            series: [{
                                                type: "bullet",
                                                data: [[model.ActualCompletedMilestones, model.TargetToComplete]]
                                            }],
                                            chartArea: {
                                                margin: {
                                                    left: 0
                                                }
                                            },

                                            valueAxis: {
                                                min: 0,
                                                max: model.TotalMilestone,
                                                line: {
                                                    visible: false
                                                },
                                                labels: {
                                                    visible: false
                                                },
                                                majorGridLines: {
                                                    visible: false
                                                }
                                            },
                                            tooltip: {
                                                visible: true,
                                                template: "target: #= value.target # <br /> completed: #= value.current #"
                                            }
                                        });
                                    });
                                    // }
                                },
                                columnMenuInit: function (e) {
                                    var list = e.container.find('.k-columns-item ul')
                                    var items = list.find('li');

                                    items.each(function (x, y) {
                                        $(y).removeClass('k-first k-last')
                                    })

                                    items.sort(function (a, b) {
                                        a = $(a);
                                        b = $(b);
                                        
                                        var firstText = (a.find('input[data-field]').attr('title').indexOf(">") > 1 || a.find('input[data-field]').attr('data-field').indexOf("]")>1) ? a.find('input[data-field]').attr('data-field') : a.find('input[data-field]').attr('title');
                                        var secondText = (b.find('input[data-field]').attr('title').indexOf(">")>1 || b.find('input[data-field]').attr('data-field').indexOf("]")>1)?b.find('input[data-field]').attr('data-field'):b.find('input[data-field]').attr('title');

                                        return ((firstText < secondText) ? -1 : ((firstText > secondText) ? 1 : 0));
                                    })

                                    items.first().addClass('k-first');
                                    items.last().addClass('k-last');

                                    items.each(function (y, x) {
                                        list.append($(x));
                                    })
                                }

                            });
                            localGridCreated = true;
                            localGridCreatedWithPO = true;
                        }
                        else {
                            var dataSource = new kendo.data.DataSource({
                                data: resLocalProj, pageSize: 100,
                                sort: [{
                                    //  field: "OverallStatus", dir: "desc"
                                    field: "OverallStatusOrder", dir: "asc"
                                },
                             {
                                 field: "ProjectNameWithoutPrefix", dir: "asc"
                             }]
                            });
                            var grid = $('#gridPortfolioCenterProjLV').data('kendoGrid');
                            dataSource.read();
                            grid.setDataSource(dataSource);
                        }
                        hideLoading();
                    }

                    catch (err) {
                        hideLoading();
                        var dataToSend = {
                            "method": "getGridViewProjects", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { alert(errormessage) });
                    }

                })


        }
        else if (vm.includeCapitalReport == true && filteredCapital === false) {

            displayLoading();
            var objCV = JSON.stringify([]);
            //  var dataToSend = filterDataToSend;
            $("#gridPortfolioCenterProjCapitalVw").show();
            //$(".k-grid-header").removeClass("fixed-header");


            try {
                //if (CapitalProjGrid != undefined && $('#gridPortfolioCenterProjCapitalVw').data().kendoGrid != undefined) {
                //    $('#gridPortfolioCenterProjCapitalVw').data().kendoGrid.destroy();
                //    // LocalProjGrid.destroy();
                //    $("#gridPortfolioCenterProjCapitalVw").empty();
                //}

                var resCapitalViewProj = [];
                angular.copy(ProjectData, resCapitalViewProj);

                if (capitalGridCreated === false) {
                    var gridCol = col_PortfoliCenter_gridPortfolioCenterProjCapitalView();


                    CapitalProjGrid = $("#gridPortfolioCenterProjCapitalVw").kendoGrid({
                        //columnMenuOpen: function (e) {
                        //    var mylist = e.container.find(".k-columns-item>ul");
                        //    var listitems = mylist.children('li').get();

                        //    $(listitems).find("input").click(function (e) {
                        //        if (!$(this).hasClass("custom-class")) {
                        //            var allChecked = $(this).closest("ul").find("li.k-item input:checked").length == $(this).closest("ul").find("li.k-item input").length;
                        //            $(".custom-class input")[0].checked = allChecked;
                        //        }
                        //    })
                        //    e.container.find(".custom-class").remove()
                        //    e.container.find('.k-filter-item').find('[role="menuitemcheckbox"]').remove();
                        //    var GridName = 'CapitalPortfolioReport';
                        //    if (CapitalGridSelectAll === true) {
                        //        $("<li class='custom-class'><span class='k-link'><input type='checkbox' checked onclick='checkAll(this," + GridName + ")'/>SelectAll</span></li>").insertBefore(e.container.find(".k-columns-item ul li").last());
                        //    }
                        //    else
                        //        $("<li class='custom-class'><span class='k-link'><input type='checkbox' onclick='checkAll(this," + GridName + ")'/>SelectAll</span></li>").insertBefore(e.container.find(".k-columns-item ul li").last());
                        //},
                        columnShow: function () {
                            addScroller(this)
                        },
                        columnHiede: function () {
                            addScroller(this)
                        },
                        dataSource: {
                            data: resCapitalViewProj,
                            pageSize: 100,
                            sort: [{ field: "PortfolioOwnerName", dir: "asc" },
                            {
                                field: "AnnualForecastPerformanceAbsolute", dir: "desc"
                            }]

                        },
                        //   sortable: true,
                        sortable: { mode: "multiple", allowUnsort: true },
                        filterable: true,
                        columnMenu: true,
                        reorderable: true,
                        resizable: true,
                        pageable: true,




                        columns: gridCol,
                        dataBound: function () {

                            /*To make the grid scrollable with fix header*/
                            /*Start*/
                            var wrapper2 = this.wrapper,
                                header2 = wrapper2.find(".k-grid-header");
                            //   toolbar = wrapper.find(".k-grid-toolbar"),
                            //  pagingSpace = wrapper1.find(".k-grid-pager");
                            addScroller(this);
                            function resizeFixed2() {
                                var paddingRight = parseInt(header2.css("padding-right"));
                                header2.css("width", wrapper2.width() - paddingRight);


                            }

                            function scrollFixed2() {
                                /*How much screen has scrolled*/
                                var offset = $(this).scrollTop(),
                                    /*How much grid has offset from top*/
                                    //     tableOffsetTop = wrapper1.offset().top + toolbar.height() + header.height(),
                                    tableOffsetTop2 = wrapper2.offset().top + header2.height(),
                                    /**/
                                    //   tableOffsetBottom = (tableOffsetTop - toolbar.height()) + wrapper1.height() + 20 - header.height();
                                    tableOffsetBottom2 = tableOffsetTop2 + wrapper2.height() - header2.height();
                                if (offset >= tableOffsetTop2) {
                                    header2.addClass("fixed-header");
                                } else {
                                    header2.removeClass("fixed-header");
                                }
                            }

                            resizeFixed2();
                            $(window).resize(resizeFixed2);
                            $(window).scroll(scrollFixed2);
                            /************************   End   ******************************************/
                            // if (vm.includeChart == true) {
                            var grid2 = this;

                            $(".chartPercentageCompleteCV").each(function () {
                                var chart = $(this);
                                var tr = chart.closest('tr');
                                var model = grid2.dataItem(tr);
                                chart.kendoChart({
                                    series: [{
                                        type: "bullet",
                                        data: [[model.ActualCompletedMilestones, model.TargetToComplete]]
                                    }],
                                    chartArea: {
                                        margin: {
                                            left: 0
                                        }
                                    },

                                    valueAxis: {
                                        min: 0,
                                        max: model.TotalMilestone,
                                        line: {
                                            visible: false
                                        },
                                        labels: {
                                            visible: false
                                        },
                                        majorGridLines: {
                                            visible: false
                                        }
                                    },
                                    tooltip: {
                                        visible: true,
                                        template: "target: #= value.target # <br /> completed: #= value.current #"
                                    }
                                });
                            });
                            //    }

                        },
                        columnMenuInit: function (e) {
                      
                            var list = e.container.find('.k-columns-item ul')
                            var items = list.find('li');

                            items.each(function (x, y) {
                                $(y).removeClass('k-first k-last')
                            })

                            items.sort(function (a, b) {
                                a = $(a);
                                b = $(b);

                                var firstText = (a.find('input[data-field]').attr('title').indexOf(">") > 1 || a.find('input[data-field]').attr('data-field').indexOf("]") > 1) ? a.find('input[data-field]').attr('data-field') : a.find('input[data-field]').attr('title');
                                var secondText = (b.find('input[data-field]').attr('title').indexOf(">") > 1 || b.find('input[data-field]').attr('data-field').indexOf("]") > 1) ? b.find('input[data-field]').attr('data-field') : b.find('input[data-field]').attr('title');

                                return ((firstText < secondText) ? -1 : ((firstText > secondText) ? 1 : 0));
                            })

                            items.first().addClass('k-first');
                            items.last().addClass('k-last');

                            items.each(function (y, x) {
                                list.append($(x));
                            })
                        }
                    });
                    capitalGridCreated = true;
                }
                else {
                    var dataSource = new kendo.data.DataSource({
                        data: resCapitalViewProj, pageSize: 100,
                        sort: [{
                            //  field: "OverallStatus", dir: "desc"
                            field: "OverallStatusOrder", dir: "asc"
                        },
                     {
                         field: "ProjectNameWithoutPrefix", dir: "asc"
                     }]
                    });
                    var grid = $('#gridPortfolioCenterProjCapitalVw').data('kendoGrid');
                    dataSource.read();
                    grid.setDataSource(dataSource);
                }
                hideLoading();
            }

            catch (err) {
                hideLoading();
                var dataToSend = {
                    "method": "getCapitalViewProjects", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
            }
            filteredCapital = true;
        }

        else {
            $("div").removeClass("fixed-header");
        }

    };

    function insertReports() {

        window.open(vm.PortfolioPowerBIReport);
        //if (ProjectData.length <= ProjectData_size) {
        //    var formName = portfolioDataOutputReport;
        //    var filteredProjId = "";
        //    if (ProjectData.length > 0) {
        //        angular.forEach(ProjectData, function (item, index) {
        //            filteredProjId = filteredProjId + ',' + item.ProblemID
        //        })
        //        filteredProjId.substring(1);
        //    }

        //    var listdata = [];
        //    var report = {
        //        "ProjectID": filteredProjId,
        //        "UserADID": currentUserId,
        //        "ReportName": formName
        //    };
        //    listdata.push(report);
        //    var finalData = JSON.stringify({
        //        "ReportsData": listdata
        //    });
        //    GETPostService.postDataWCF('InsertReports', finalData).then(function (response) {
        //        //alert(response);
        //        try {
        //            if (response.InsertReportsResult == "Success") {
        //                alert(reportprocessmessage);
        //            }
        //            else {
        //                alert("Error occurred");
        //            }
        //        }
        //        catch (err) {
        //            hideLoading();
        //            var dataToSend = {
        //                "method": "insertReports", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
        //            };
        //            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
        //                .then(function (response) { alert(errormessage); });
        //        }
        //    });
        //}
        //else
        //    alert(errorMessageForMaxRecordReport);
    };

    //Function to queue the portfolio report
    //function insertReports() {
    //    var maxRecNo = Math.ceil(ProjectData.length / ProjectData_size);
    //    var curRecNo = 0;
    //    var reportProjectData = [];
    //    var reportProjectData = ProjectData.map(function (a) {
    //        return {
    //            "ProblemUniqueID": a.ProblemUniqueID
    //        };
    //    });
    //    if (reportProjectData.length > 0) {
    //        var formName = portfolioDataOutputReport;
    //        var parID = kendo.guid();
    //        while (reportProjectData.length) {

    //            var excelWorkbookData = reportProjectData.splice(0, ProjectData_size);
    //            if (excelWorkbookData.length > 0) {
    //                try {
    //                    //displayLoading();
    //                    // var filteredProjId = excelWorkbookData.map(function (a) { return { "ProjectID": a.ProblemID }; });
    //                    var filteredProjId = "";
    //                    angular.forEach(excelWorkbookData, function (item, index) {
    //                        filteredProjId = filteredProjId + ',' + item.ProblemUniqueID
    //                    })
    //                    filteredProjId.substring(1);
    //                    var listdata = [];
    //                    var report = {
    //                        "ProjectID": filteredProjId,
    //                        "UserADID": currentUserId,
    //                        "ReportName": formName,
    //                        "RecordID": parID
    //                    };
    //                    listdata.push(report);
    //                    var finalData = JSON.stringify({
    //                        "ReportsData": listdata
    //                    });
    //                    GETPostService.postDataWCF('InsertReports', finalData).then(function (response) {
    //                        //alert(response);
    //                        try {
    //                            curRecNo++;
    //                            if (response.InsertReportsResult == "Success") {
    //                                if (curRecNo == maxRecNo)
    //                                    alert("Report has been queued.");
    //                            }
    //                            else {
    //                                alert("Error occurred");
    //                            }
    //                        }
    //                        catch (err) {
    //                            hideLoading();
    //                            var dataToSend = {
    //                                "method": "insertReports", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
    //                            };
    //                            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
    //                                .then(function (response) { alert(errormessage); });
    //                        }
    //                    })
    //                } catch (err) {
    //                    hideLoading();
    //                    var dataToSend = {
    //                        "method": "insertReports", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
    //                    };
    //                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
    //                        .then(function (response) { alert(errormessage); });
    //                }
    //            }
    //        }
    //    }
    //    else {
    //        alert(errorNoRows);
    //        hideLoading();
    //    }
    //    //if (ProjectData.length <= ProjectData_size) {
    //    //    var formName = portfolioDataOutputReport;
    //    //    var filteredProjId = "";
    //    //    if (ProjectData.length > 0) {
    //    //        angular.forEach(ProjectData, function (item, index) {
    //    //            filteredProjId = filteredProjId + ',' + item.ProblemUniqueID
    //    //        })
    //    //        filteredProjId.substring(1);
    //    //    }
    //    //}
    //    //else
    //    //    alert(errorMessageForMaxRecordReport);
    //};

    /********Function to export the two views to excel
             It will dynamically create the cells 
             There will be multiple sheets***********/
    function ExportToExcel() {
        window.open(vm.SpotDataPowerBI);
        //displayLoading();
        //var excelExportProjectData = [];
        //var filteredProjId = ProjectData.map(function (a) {
        //    return {
        //        "ProjectID": a.ProblemID
        //    };
        //});

        //GETPostService.ExportToExcel(filteredProjId);

    };

    /********This function will read the data column heading for model the datasource.********/
    function generateModel(response) {
        var sampleDataItem = response[0];
        var model = Object.keys(sampleDataItem);
        return model;
    }

    /****************UpdateFilter will return the local variable filter string
                    It will only consider those variables which have any value selected
                    It will not consider the null value variables********************/
    function UpdateFilter() {
        var dataToSendArray = [];
        var dataToSendLocal = "";
        try {
            var gridupdatedData = [];
            if ($('#gridLocalAttributesFilter').data('kendoGrid') != undefined) {
                gridupdatedData = $('#gridLocalAttributesFilter').data('kendoGrid').dataSource.data();
            }
            else
                if (vm.local != null && vm.local != undefined)
                    gridupdatedData = vm.local;

            angular.forEach(gridupdatedData, function (item, index) {
                //if (item.DataType == "text") {
                //    if (item.LocalVariableValue !== "" && item.LocalVariableValueRangeEnd !== "")
                //    { }
                //}
                if ((item.DataType == "Lookup" && item.MultilocalVariableIDArray.length != 0)
                    || (item.DataType == "People" && item.localVariablepplID.length != 0)
                    || (item.DataType == "Number" && item.LocalVariableValue !== "" && item.LocalVariableValueRangeEnd !== "" && item.LocalVariableValue !== null && item.LocalVariableValueRangeEnd !== null)
                    || (item.DataType == "Date" && item.LocalVariableValue !== "" && item.LocalVariableValueRangeEnd !== "" && item.LocalVariableValue !== null && item.LocalVariableValueRangeEnd !== null)
                    || (item.DataType === "Boolean" && item.LocalVariableValue !== "" && item.LocalVariableValue !== "false" && item.LocalVariableValue !== false)
                    || ((item.DataType === "Text" && item.LocalVariableValue !== "") || ((item.DataType === "Text" && item.isBlank === true)) || ((item.DataType === "Text" && item.isNotBlank === true)))) {
                    var ddlValue = "";
                    if (item.DataType == "Lookup") {
                        angular.forEach(item.MultilocalVariableIDArray, function (Lval, index) {
                            ddlValue = ddlValue + ',' + Lval;
                        })
                        ddlValue = ddlValue.substring(1);
                    }
                    else if (item.DataType == "Boolean") {
                        ddlValue = (item.LocalVariableValue == true || item.LocalVariableValue == "true") ? "Yes" : "";
                    }
                    else if (item.DataType == "Date") {
                        if (item.LocalVariableValue != null && item.LocalVariableValueRangeEnd != null && item.LocalVariableValue !== "" && item.LocalVariableValueRangeEnd !== "")
                            ddlValue = kendo.toString(item.LocalVariableValue, 'MM/dd/yyyy') + ',' + kendo.toString(item.LocalVariableValueRangeEnd, 'MM/dd/yyyy')
                    }
                    else if (item.DataType == 'Number') {
                        if (item.LocalVariableValue != null && item.LocalVariableValueRangeEnd != null && item.LocalVariableValue !== '' && item.LocalVariableValueRangeEnd !== '')
                            ddlValue = kendo.toString(item.LocalVariableValue) + ',' + kendo.toString(item.LocalVariableValueRangeEnd)
                    }
                    else if (item.DataType == 'People') {
                        angular.forEach(item.MultilocalVariableIDArray, function (Lval, index) {
                            ddlValue = ddlValue + ',' + Lval;
                        })
                        ddlValue = ddlValue.substring(1);
                    }

                    var itm = {
                    };
                    itm.LocalVariableUniqueID = item.LocalVariableUniqueID;
                    itm.DataType = item.DataType;
                    itm.LocalVariableFilterValue = item.DataType != "Text" ? ddlValue : item.LocalVariableValue;
                    itm.LookupName = item.LookupName;
                    itm.isBlank = item.isBlank;
                    itm.isNotBlank = item.isNotBlank;
                    dataToSendArray.push(itm);
                }

            })

        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "UpdateFilter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage); });
        }
        dataToSendLocal = JSON.stringify(dataToSendArray);
        localStorage["LocalCnt"] = dataToSendArray.length;
        //FilterOpen = 0;
        return dataToSendLocal;
    };

    /****************getLocalAttributes will return the local variable as per the selected portfolio owner for filtering
                  ********************/
    function getLocalAttributes() {
        // trackEvent("Portfolio center get local attribute");
        try {
            var b = [];
            var lookupText = "";
            localAttriPeople = [];
            var sPortfolioOwner = vm.selectedPortfolioOwnerfilter == undefined ? "" : vm.selectedPortfolioOwnerfilter.join(",");
            var sExecutionScope = (vm.selectedExecutionScopefilter == undefined || vm.selectedExecutionScopefilter == null) ? "" : vm.selectedExecutionScopefilter.join(",");
            if (vm.selectedExecutionScopefilter != null) {
                exScope = vm.selectedExecutionScopefilter.length > 1 ? vm.selectedExecutionScopefilter.join(",") : vm.selectedExecutionScopefilter[0];
            }
            var strPortfolioOwner = "";
            if (sExecutionScope == "" && sPortfolioOwner == "")
                strPortfolioOwner = "";
            else if (sExecutionScope == "")
                strPortfolioOwner = sPortfolioOwner;
            else if (sPortfolioOwner == "")
                strPortfolioOwner = sExecutionScope;
            else strPortfolioOwner = sPortfolioOwner + ',' + sExecutionScope
            //  var strExecutionScope = vm.selectedPortfolioOwnerfilter == undefined ? "" : vm.selectedPortfolioOwnerfilter.join(",");
            var dataItem = "";
            vm.filterportfolioMultiselect = "";
            vm.filterpplMultiselect = "";
            vm.filterparentProgramSelect = "";
            vm.filterExecutionScopeMultiselect = "";
            vm.filterphaseMultiselect = "";
            vm.filterproductMultiselect = "";
            vm.filterprojStatusMultiselect = "";
            vm.filterCapexMultiselect = "";
            vm.filterGMSBudgetOwnerMultiselect = "";
            vm.filteroETypeMultiselect = "";

            //vm.filterProjectIDText = "";
            vm.filterprojectTypeMultiselect = "";
            vm.filterparentProgramSelect = "";
            vm.filterFundingStatusMultiselect = "";

            vm.filterCapitalPhaseMultiselect = "";
            vm.filterOEPhaseMultiselect = "";
            vm.filterAGILEWorkstreamMultiselect = "";
            vm.filterAGILEWaveMultiselect = "";
            vm.filterPrimaryKPIMultiselect = "";
            vm.filterTOPSGroupMultiselect = "";
            vm.filterCAPSProjectMultiselect = "";
            vm.filterProjectProgramMultiselect = "";
            vm.filterStrategicYearMultiselect = "";
            vm.filterAnnualMustWinMultiselect = "";

            var portfolioMultiselect = $("#ddl_PortfolioOwnerFilterMain").data("kendoMultiSelect").dataItems();
            if (portfolioMultiselect.length > 0) {
                angular.forEach(portfolioMultiselect, function (item, index) {
                    vm.filterportfolioMultiselect = vm.filterportfolioMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterportfolioMultiselect = vm.filterportfolioMultiselect.substring(1);
            }

            var pplMultiselect = $("#PeopleFilter").data("kendoMultiSelect").dataItems();
            if (pplMultiselect.length > 0) {
                angular.forEach(pplMultiselect, function (item, index) {
                    vm.filterpplMultiselect = vm.filterpplMultiselect + ',' + item.UserDisplayName;
                })
                vm.filterpplMultiselect = vm.filterpplMultiselect.substring(1);
            }

            var ExecutionScopeMultiselect = $("#ddl_ExecutionScopeFilterMain").data("kendoMultiSelect").dataItems();
            if (ExecutionScopeMultiselect.length > 0) {
                angular.forEach(ExecutionScopeMultiselect, function (item, index) {
                    vm.filterExecutionScopeMultiselect = vm.filterExecutionScopeMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterExecutionScopeMultiselect = vm.filterExecutionScopeMultiselect.substring(1);
            }

            var phaseMultiselect = $("#ddl_PhaseFilterMain").data("kendoMultiSelect").dataItems();
            if (phaseMultiselect.length > 0) {
                angular.forEach(phaseMultiselect, function (item, index) {
                    vm.filterphaseMultiselect = vm.filterphaseMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterphaseMultiselect = vm.filterphaseMultiselect.substring(1);
            }

            var productMultiselect = $("#ProductFilter").data("kendoMultiSelect").dataItems();
            if (productMultiselect.length > 0) {
                angular.forEach(productMultiselect, function (item, index) {
                    vm.filterproductMultiselect = vm.filterproductMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterproductMultiselect = vm.filterproductMultiselect.substring(1);
            }

            var projStatusMultiselect = $("#ddl_ProjStatusFilterMain").data("kendoMultiSelect").dataItems();
            if (projStatusMultiselect.length > 0) {
                angular.forEach(projStatusMultiselect, function (item, index) {
                    vm.filterprojStatusMultiselect = vm.filterprojStatusMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterprojStatusMultiselect = vm.filterprojStatusMultiselect.substring(1);
            }

            var CapexMultiselect = $("#ddl_CapexFilterMain").data("kendoMultiSelect").dataItems();
            if (CapexMultiselect.length > 0) {
                angular.forEach(CapexMultiselect, function (item, index) {
                    vm.filterCapexMultiselect = vm.filterCapexMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterCapexMultiselect = vm.filterCapexMultiselect.substring(1);
            }

            var GMSBudgetOwnerMultiselect = $("#GMSBudgetOwnerFilter").data("kendoMultiSelect").dataItems();
            if (GMSBudgetOwnerMultiselect.length > 0) {
                angular.forEach(GMSBudgetOwnerMultiselect, function (item, index) {
                    vm.filterGMSBudgetOwnerMultiselect = vm.filterGMSBudgetOwnerMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterGMSBudgetOwnerMultiselect = vm.filterGMSBudgetOwnerMultiselect.substring(1);
            }

            var oETypeMultiselect = $("#ddl_OETypeFilterMain").data("kendoMultiSelect").dataItems();
            if (oETypeMultiselect.length > 0) {
                angular.forEach(oETypeMultiselect, function (item, index) {
                    vm.filteroETypeMultiselect = vm.filteroETypeMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filteroETypeMultiselect = vm.filteroETypeMultiselect.substring(1);
            }

            //vm.filterProjectIDText = vm.selectedProjectIDfilter;

            var projectTypeMultiselect = $("#ddl_ProjectTypeFilterMain").data("kendoMultiSelect").dataItems();
            if (projectTypeMultiselect.length > 0) {
                angular.forEach(projectTypeMultiselect, function (item, index) {
                    vm.filterprojectTypeMultiselect = vm.filterprojectTypeMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterprojectTypeMultiselect = vm.filterprojectTypeMultiselect.substring(1);
            }

            // vm.filterparentProgramSelect = $("#ddl_ParentProgramFilterMain").data("kendoComboBox").text();

            var parentMultiselect = $("#ddl_ParentProgramFilterMain").data("kendoMultiSelect").dataItems();
            if (parentMultiselect.length > 0) {
                angular.forEach(parentMultiselect, function (item, index) {
                    vm.filterparentProgramSelect = vm.filterparentProgramSelect + ',' + item.ProjectName;
                })
                vm.filterparentProgramSelect = vm.filterparentProgramSelect.substring(1);
            }

            var fundingStatusMultiselect = $("#ddl_FundingStatusFilterMain").data("kendoMultiSelect").dataItems();
            if (fundingStatusMultiselect.length > 0) {
                angular.forEach(fundingStatusMultiselect, function (item, index) {
                    vm.filterFundingStatusMultiselect = vm.filterFundingStatusMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterFundingStatusMultiselect = vm.filterFundingStatusMultiselect.substring(1);
            }
            var CapitalPhaseMultiselect = $("#ddl_CapPhaseFilterMain").data("kendoMultiSelect").dataItems();
            if (CapitalPhaseMultiselect.length > 0) {
                angular.forEach(CapitalPhaseMultiselect, function (item, index) {
                    vm.filterCapitalPhaseMultiselect = vm.filterCapitalPhaseMultiselect + ',' + item.CapitalPhaseName;
                })
                vm.filterCapitalPhaseMultiselect = vm.filterCapitalPhaseMultiselect.substring(1);
            }

            var OEPhaseMultiselect = $("#ddl_OEPhaseFilterMain").data("kendoMultiSelect").dataItems();
            if (OEPhaseMultiselect.length > 0) {
                angular.forEach(OEPhaseMultiselect, function (item, index) {
                    vm.filterOEPhaseMultiselect = vm.filterOEPhaseMultiselect + ',' + item.CapitalPhaseName;
                })
                vm.filterOEPhaseMultiselect = vm.filterOEPhaseMultiselect.substring(1);
            }

            var AGILEWorkstreamMultiselect = $("#ddl_AGILEWorkstreamFilterMain").data("kendoMultiSelect").dataItems();
            if (AGILEWorkstreamMultiselect.length > 0) {
                angular.forEach(AGILEWorkstreamMultiselect, function (item, index) {
                    vm.filterAGILEWorkstreamMultiselect = vm.filterAGILEWorkstreamMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterAGILEWorkstreamMultiselect = vm.filterAGILEWorkstreamMultiselect.substring(1);
            }

            var AGILEWaveMultiselect = $("#ddl_AGILEWaveFilterMain").data("kendoMultiSelect").dataItems();
            if (AGILEWaveMultiselect.length > 0) {
                angular.forEach(AGILEWaveMultiselect, function (item, index) {
                    vm.filterAGILEWaveMultiselect = vm.filterAGILEWaveMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterAGILEWaveMultiselect = vm.filterAGILEWaveMultiselect.substring(1);
            }

            var PrimaryKPIMultiselect = $("#ddl_PrimaryKPIFilterMain").data("kendoMultiSelect").dataItems();
            if (PrimaryKPIMultiselect.length > 0) {
                angular.forEach(PrimaryKPIMultiselect, function (item, index) {
                    vm.filterPrimaryKPIMultiselect = vm.filterPrimaryKPIMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterPrimaryKPIMultiselect = vm.filterPrimaryKPIMultiselect.substring(1);
            }

            var TOPSGroupMultiselect = $("#ddl_TopsGroupFilterMain").data("kendoMultiSelect").dataItems();
            if (TOPSGroupMultiselect.length > 0) {
                angular.forEach(TOPSGroupMultiselect, function (item, index) {
                    vm.filterTOPSGroupMultiselect = vm.filterTOPSGroupMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterTOPSGroupMultiselect = vm.filterTOPSGroupMultiselect.substring(1);
            }

            var CAPSProjectMultiselect = $("#ddl_IsCAPSProjectFilterMain").data("kendoMultiSelect").dataItems();
            if (CAPSProjectMultiselect.length > 0) {
                angular.forEach(CAPSProjectMultiselect, function (item, index) {
                    vm.filterCAPSProjectMultiselect = vm.filterCAPSProjectMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterCAPSProjectMultiselect = vm.filterCAPSProjectMultiselect.substring(1);
            }

            var StrategicYearMultiselect = $("#ddl_StrategicYearFilterMain").data("kendoMultiSelect").dataItems();
            if (StrategicYearMultiselect.length > 0) {
                angular.forEach(StrategicYearMultiselect, function (item, index) {
                    vm.filterStrategicYearMultiselect = vm.filterStrategicYearMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterStrategicYearMultiselect = vm.filterStrategicYearMultiselect.substring(1);
            }

            var AnnualMustWinMultiselect = $("#ddl_AnnualMustWinFilterMain").data("kendoMultiSelect").dataItems();
            if (AnnualMustWinMultiselect.length > 0) {
                angular.forEach(AnnualMustWinMultiselect, function (item, index) {
                    vm.filterAnnualMustWinMultiselect = vm.filterAnnualMustWinMultiselect + ',' + item.LookUpMemberName;
                })
                vm.filterAnnualMustWinMultiselect = vm.filterAnnualMustWinMultiselect.substring(1);
            }

            var ProjectProgramMultiselect = $("#ddl_ParentProgramFilterMain").data("kendoMultiSelect").dataItems();
            if (ProjectProgramMultiselect.length > 0) {
                angular.forEach(ProjectProgramMultiselect, function (item, index) {
                    vm.filterProjectProgramMultiselect = vm.filterProjectProgramMultiselect + ',' + item.ProjectName;
                })
                vm.filterProjectProgramMultiselect = vm.filterProjectProgramMultiselect.substring(1);
            }

            /*-------------------------------------------If local variable data stored in local storage **/

            if ((vm.local == null || vm.local == undefined || vm.local == [] || vm.local.length == 0) && (vm.filterPortfolio != {} || angular.equals(portfolioMultiselect, OriginalSelectedPortfolioData) == false || angular.equals(ExecutionScopeMultiselect, OriginalSelectedExecutionScope) == false)) {
                $.when(GETPostService.postDataWCFAsync("getLocalVariableForFilter", strPortfolioOwner))
                    .then(function (resLocalFilter) {
                        try {
                            debugger;
                            vm.local = JSON.parse(resLocalFilter.getLocalVariableForFilterResult);
                            IsPageLoad = 1;
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
                                    event.MultilocalVariableIDArray = [];
                                    event.LocalVariableValueRangeEnd = "";
                                    event.localVariablepplID = []; //event.DataType == 'People' ? event.UserADId : "";
                                    event.isBlank = "";
                                    event.isNotBlank = "";
                                });

                                $.when(GETPostService.postDataWCFAsync("getLookupData", lookupText.substring(1)))
                                    .then(function (resLookup) {
                                        dropdownValueLookupBulk = JSON.parse(resLookup.getLookupDataResult);
                                        refreshLocalVarGrid();
                                        var myWindow = $("#dialogFilter");
                                        myWindow.data("kendoWindow").open();
                                        //FilterOpen = 1;
                                    });
                            }
                            else {
                                var myWindow = $("#dialogFilter");
                                myWindow.data("kendoWindow").open();
                            }
                        }
                        catch (err) {
                            hideLoading();
                            var dataToSend = {
                                "method": "getLocalAttributes", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                            };
                            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                .then(function (response) { alert(errormessage) });
                        }
                    });

                angular.copy(portfolioMultiselect, OriginalSelectedPortfolioData);
                angular.copy(ExecutionScopeMultiselect, OriginalSelectedExecutionScope);

            }
            else
                if (vm.local != null && vm.local != undefined && IsPageLoad == 0 && vm.local != []) {

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
                    });

                    $.when(GETPostService.postDataWCFAsync("getLookupData", lookupText.substring(1)))
                        .then(function (resLookup) {
                            dropdownValueLookupBulk = JSON.parse(resLookup.getLookupDataResult);
                            refreshLocalVarGrid();
                            var myWindow = $("#dialogFilter");
                            myWindow.data("kendoWindow").open();
                            //FilterOpen = 1;
                        });
                    IsPageLoad = 1;
                }
                else {
                    var myWindow = $("#dialogFilter");
                    myWindow.data("kendoWindow").open();
                }
        }

        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "getLocalAttributes", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };
    /**********************************************refreshLocalVarGrid : Function is used to refresh the local variable grid.*******************/
    function refreshLocalVarGrid() {
        try {
            var dataSourceLocalVar = new kendo.data.DataSource({
                data: vm.local,
                group: {
                    field: "PortfolioOwner",
                    dir: "asc"
                }
            });
            var grid1 = $('#gridLocalAttributesFilter').data('kendoGrid');
            dataSourceLocalVar.read();
            grid1.setDataSource(dataSourceLocalVar);
        }

        catch (err) {
            var dataToSend = {
                "method": "refreshLocalVarGrid", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    }

    function InitkendoGridLocal() {
        try {
            var col = [{
                field: "PortfolioOwner",
                title: "PortfolioOwner",
                headerAttributes: {
                    "class": "wrap-header"
                },
                hidden: true,
                groupHeaderTemplate: "#= value #"
            }, {
                field: "LocalVariableUniqueID",
                title: "LocalVariableUniqueID",
                hidden: true,
            },
            //{
            //field: "PortfolioOwner",
            //title: "PorfolioOwner",
            //    hidden: true,
            //    groupHeaderTemplate: "#= value #"
            //},
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
                group: {
                    field: "PortfolioOwner",
                },
                schema: {
                    model: {
                        id: "LocalVariableUniqueID",
                        fields: {
                            LocalVariableUniqueID: {
                                editable: false, nullable: true
                            },
                            LocalVariableName: {
                                type: "string", editable: false
                            },
                            //PortfolioOwner: { type: "string", editable: false },
                            DataType: {
                                type: "string", editable: false
                            },
                        }
                    }
                }
            });

            $("#gridLocalAttributesFilter").kendoGrid({
                dataSource: dataSource,
                // groupable: false,
                columns: col,
                // editable: vm.isEditable,
                dataBound: function (e) {
                    var grid = this;

                    $("#gridLocalAttributesFilter .k-grid-content").on("change", "input.chkbx", function (e) {

                        var grid = $("#gridLocalAttributesFilter").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr"));
                        if (dataItem != undefined)
                            dataItem.set("LocalVariableValue", this.checked);

                    });
                    $("#gridLocalAttributesFilter .k-grid-content").on("change", "input.textbox", function (e) {

                        var grid = $("#gridLocalAttributesFilter").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr")[0]);
                        if (dataItem != undefined) {
                            dataItem.LocalVariableValue = this.value;
                            dataItem.isNotBlank = false;
                            dataItem.isBlank = false;

                            dataItem.dirty = true;
                        }
                    });

                    $("#gridLocalAttributesFilter .k-grid-content").on("change", "input.chkbxTxt", function (e) {

                        var grid = $("#gridLocalAttributesFilter").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr")[0]);
                        if (dataItem != undefined) {
                            //var curRow = $(e.target).closest("tr")
                            //curRow.find("input:eq(0)").prop('disabled', this.checked);
                            if (this.checked == true) {
                                dataItem.set("LocalVariableValue", "");

                                if ($(this).index() == 1) {
                                    dataItem.set("isBlank", this.checked);
                                    dataItem.set("isNotBlank", !this.checked);
                                } else {
                                    dataItem.set("isBlank", !this.checked);
                                    dataItem.set("isNotBlank", this.checked);
                                }
                            }
                            else {
                                if ($(this).index() == 1) {
                                    dataItem.set("isBlank", this.checked);
                                } else {
                                    dataItem.set("isNotBlank", this.checked);
                                }
                            }
                        }
                    });
                    $("#gridLocalAttributesFilter .k-grid-content").on("click", "input.textbox", function (e) {

                        var grid = $("#gridLocalAttributesFilter").data("kendoGrid"),
                            dataItem = grid.dataItem($(e.target).closest("tr")[0]);
                        var checkBoxBlank = $(this).parent().find(".chkbxTxt")[0];
                        var checkBoxNotBlank = $(this).parent().find(".chkbxTxt")[1];

                        dataItem["isBlank"] = false;
                        dataItem["isNotBlank"] = false;
                        dataItem.dirty = true;
                        dataItem.dirtyFields = { isBlank: true, isNotBlank: true };

                        checkBoxBlank.checked = false;
                        checkBoxNotBlank.checked = false;
                        //dataItem.set("isBlank", false);
                        //dataItem.set("isNotBlank", false);

                    });
                    var ddlsDatePicker = $(".date");
                    var ddlsDateValMsg = $(".dateValidationMsg");

                    var ddlsDatePickerRangeEnd = $(".dateRangeEnd");
                    var ddlsDateValMsgRangeEnd = $(".dateValidationRangeEndMsg");

                    for (var k = 0; k < ddlsDatePicker.length; k++) {
                        var element2 = $(ddlsDatePicker[k]);
                        var row1 = element2.closest("tr");
                        var model1 = grid.dataItem(row1);
                        $(ddlsDatePicker[k]).attr("id", model1.uid.toString());
                        $(ddlsDateValMsg[k]).attr("id", model1.uid.toString() + "Msg");

                        $(ddlsDatePickerRangeEnd[k]).attr("id", model1.uid.toString() + "RangeEnd");
                        $(ddlsDateValMsgRangeEnd[k]).attr("id", model1.uid.toString() + "RangeEndMsg");

                        $("#" + model1.uid).kendoDatePicker({ /*numeric settings*/
                            parseFormats: ["MM/dd/yyyy"],
                            placeholder: vm.dateFormatlabel,
                            change: function (e) {
                                var row = this.element.closest("tr");
                                var modelDate = grid.dataItem(row);
                                var validDate = this.value() == null ? '' : kendo.toString(kendo.parseDate(new Date(this.value()), 'yyyy-MM-dd'), 'MM/dd/yyyy');
                                modelDate.set("LocalVariableValue", validDate);
                                modelDate.dirty = true;
                            }
                        });
                        //   $("#" + model1.uid).attr("readonly", "readonly");
                        $("#" + model1.uid).on("keydown", function (e) {
                            if (e.keyCode == 8) {
                                var row = this.closest("tr");
                                var modelDate = grid.dataItem(row);
                                modelDate.set("LocalVariableValue", "");
                                modelDate.dirty = true;
                                e.target.value("");
                            }
                            else return false;
                        });
                        $("#" + model1.uid + "RangeEnd").kendoDatePicker({ /*numeric settings*/
                            parseFormats: ["MM/dd/yyyy"],
                            placeholder: vm.dateFormatlabel,
                            change: function (e) {
                                var row = this.element.closest("tr");
                                var modelDate = grid.dataItem(row);
                                var validDate = this.value() == null ? '' : kendo.toString(kendo.parseDate(new Date(this.value()), 'yyyy-MM-dd'), 'MM/dd/yyyy')
                                modelDate.set("LocalVariableValueRangeEnd", validDate);
                                modelDate.dirty = true;
                            }
                        });
                        //$("#" + model1.uid + "RangeEnd").attr("readonly", "readonly");

                        $("#" + model1.uid + "RangeEnd").on("keydown", function (e) {
                            if (e.keyCode == 8) {
                                var row = this.closest("tr");
                                var modelDate = grid.dataItem(row);
                                modelDate.set("LocalVariableValueRangeEnd", "");
                                modelDate.dirty = true;
                                e.target.value("");
                            }
                            else return false;
                        });
                        var validator = $("#" + model1.uid).kendoValidator({
                            rules: {
                                datepicker: function (input) {
                                    var value = $("#" + model1.uid).val();
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
                            }

                        }).data("kendoValidator");


                    }
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
                    $(".numeric13").kendoNumericTextBox({
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
                    

                    $(".numericRangeEnd0").kendoNumericTextBox({
                        format: "n0",
                        decimals: 0,
                        min: 0,
                        restrictDecimals: true,
                        max: 999999999999,
                        change: function (e) {
                            var row = this.element.closest("tr");
                            var model = grid.dataItem(row);

                            model.LocalVariableValueRangeEnd = this.value();
                            model.dirty = true;
                        }
                    });
                    $(".numericRangeEnd2").kendoNumericTextBox({
                        format: "n2",
                        decimals: 2,
                        min: 0,
                        restrictDecimals: true,
                        max: 999999999999,
                        change: function (e) {
                            var row = this.element.closest("tr");
                            var model = grid.dataItem(row);

                            model.LocalVariableValueRangeEnd = this.value();
                            model.dirty = true;
                        }
                    });
                    $(".numericRangeEnd4").kendoNumericTextBox({
                        format: "n4",
                        decimals: 4,
                        min: 0,
                        restrictDecimals: true,
                        max: 999999999999,
                        change: function (e) {
                            var row = this.element.closest("tr");
                            var model = grid.dataItem(row);

                            model.LocalVariableValueRangeEnd = this.value();
                            model.dirty = true;
                        }
                    });
                    $(".numericRangeEnd13").kendoNumericTextBox({
                        format: "n13",
                        decimals: 13,
                        min: 0,
                        restrictDecimals: true,
                        max: 999999999999,
                        change: function (e) {
                            var row = this.element.closest("tr");
                            var model = grid.dataItem(row);

                            model.LocalVariableValueRangeEnd = this.value();
                            model.dirty = true;
                        }
                    });
                    $(".numeric").kendoNumericTextBox({
                        min: '0',/*numeric settings*/
                        change: function (e) {
                            var row = this.element.closest("tr");
                            var model = grid.dataItem(row);

                            model.LocalVariableValue = this.value();
                            model.dirty = true;
                        }
                    });
                    $(".numericRangeEnd").kendoNumericTextBox({
                        min: '0',/*numeric settings*/
                        change: function (e) {
                            var row = this.element.closest("tr");
                            var model = grid.dataItem(row);

                            model.LocalVariableValueRangeEnd = this.value();
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
                        var selectedVal = model.MultilocalVariableIDArray

                        element.kendoMultiSelect({
                            valuePrimitive: true, //N.B. this is needed to have correct behavior when the initial value can be null
                            dataTextField: fieldName,
                            dataValueField: fieldName,
                            dataSource: ddlDataSource,
                            value: selectedVal,
                            change: function (e) {

                                if (e.sender.dataItem() == null || e.sender.dataItem() == undefined) {
                                    var row = this.element.closest("tr");
                                    var model = grid.dataItem(row);
                                    model.dirty = true;
                                    model.set("LocalVariableValue", "");
                                    model.set("MultilocalVariableIDArray", [])
                                    //model.LocalVariableValue = "";    
                                    $('#gridLocalAttributesFilter').data('kendoGrid').refresh();

                                }
                                else {
                                    var row = this.element.closest("tr");
                                    var model = grid.dataItem(row);
                                    var d = this.value();
                                    var arr = [];
                                    angular.forEach(d, function (it, index) {
                                        arr.push(it);
                                    });
                                    model.set("MultilocalVariableIDArray", arr)
                                    model.dirty = true;
                                    //model.MultilocalVariableIDArray.push(this.dataItem());
                                }


                            }
                        });

                    }
                    var ddlsPeoples = $(".people");
                    for (var j = 0; j < ddlsPeoples.length; j++) {
                        //var multiselectppl = $("#" + ddlsPeoples[j].id).data("kendoMultiSelect");
                        //if (multiselectppl!=undefined)
                        //var alreadySearchedppl = multiselectppl.value();
                        //vm.selectedPeoplefilter = multiselect.dataItems();

                        var element1 = $(ddlsPeoples[j]);
                        var row1 = element1.closest("tr");
                        var model1 = grid.dataItem(row1);
                        //$(ddlsPeoples[j]).attr("id", model1.uid.toString());
                        var SelectedPpl1 = [];
                        var siteUsers1 = model1.localVariablepplID;

                        angular.forEach(siteUsers1, function (itmp, index) {
                            SelectedPpl1.push(itmp.UserADId);
                        })
                        var ddl_ppl = GETPostService.searchPeopleMultiselect(model1.uid, SelectedPpl1, siteUsers1);
                        var multiselectppl = $("#" + model1.uid).data("kendoMultiSelect");

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

                       
                        multiselectppl.setOptions({
                            placeholder: "New Placeholder"
                        });
                        multiselectppl._placeholder();
                    }
                }


            });
        }

        catch (err) {
            var dataToSend = {
                "method": "InitkendoGridLocal", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };

    function customTemplate(item) {
        if (item == null)
            return "";

        switch (item.DataType) {
            case "Date":
                return "<input class='date' value='" + item.LocalVariableValue + "' /><label class='dateValidationMsg' style='display:none;color:red'>" + vm.dateErrorMsg + "</label><input class='dateRangeEnd' value='" + item.LocalVariableValueRangeEnd + "' /><label class='dateValidationRangeEndMsg' style='display:none;color:red'>" + vm.dateErrorMsg + "</label>";//kendo.toString(kendo.parseDate(item.LocalVariableValue), 'MM/dd/yyyy');
            case "Boolean":
                if (item.LocalVariableValue == "true" || item.LocalVariableValue == true)

                    return "<input type='checkbox' checked class='chkbx' />&nbsp Yes / No";
                else if (item.LocalVariableValue == false || item.LocalVariableValue == "false")

                    return "<div class='fullWidthAttributes'><input type='checkbox' class='chkbx' />&nbsp Yes / No</div> ";
                break;


            case "Text":
                if (item.isBlank == true && item.isNotBlank == false)
                    return "<div class='fullWidthAttributes'><input class='textbox' value='" + item.LocalVariableValue + "'  /><input type='checkbox' class='chkbxTxt' checked /> Is blank <input type='checkbox' class='chkbxTxt' /> Is not blank</div>";
                else if (item.isBlank == false && item.isNotBlank == true)
                    return "<div class='fullWidthAttributes'><input class='textbox' value='" + item.LocalVariableValue + "' /><input type='checkbox' class='chkbxTxt' /> Is blank <input type='checkbox' class='chkbxTxt' checked /> Is not blank</div>";
                else
                    return "<div class='fullWidthAttributes'><input class='textbox' value='" + item.LocalVariableValue + "' /><input type='checkbox' class='chkbxTxt' /> Is blank <input type='checkbox' class='chkbxTxt' /> Is not blank</div>";

                break;
                //return "<div class='fullWidthAttributes'><input class='textbox' value='" + item.LocalVariableValue + "' /><input type='checkbox' class='chkbxTxt' /></div>";
            case "Number":

                switch (item.LineDecimalCount) {
                    case 0: return "<input class='numeric0' value='" + item.LocalVariableValue + "' /> <input class='numericRangeEnd0' value='" + item.LocalVariableValueRangeEnd + "' />";
                    case 2: return "<input class='numeric2' value='" + item.LocalVariableValue + "' /> <input class='numericRangeEnd2' value='" + item.LocalVariableValueRangeEnd + "' />";
                    case 4: return "<input class='numeric4' value='" + item.LocalVariableValue + "' /> <input class='numericRangeEnd4' value='" + item.LocalVariableValueRangeEnd + "' />";
                    case 13: return "<input class='numeric13' value='" + item.LocalVariableValue + "' /> <input class='numericRangeEnd13' value='" + item.LocalVariableValueRangeEnd + "' />";
                    default: return "<input class='numeric' value='" + item.LocalVariableValue + "' /> <input class='numericRangeEnd' value='" + item.LocalVariableValueRangeEnd + "' />";

                }
                //return "<input class='numeric' value='" + item.LocalVariableValue + "' /> <input class='numericRangeEnd' value='" + item.LocalVariableValueRangeEnd + "' />";
            case "Lookup": return "<div class='fullWidthAttributes'><input class='dropdown' value='" + item.MultilocalVariableIDArray + "' /></div>";
            case "People": return "<div class='fullWidthAttributes'><input class='people' value='" + item.localVariablepplID + "' id='" + item.uid + "'  /></div>";



            default:
                return item.LocalVariableValue;
        }

    }
    /*******************Clear filter is used to clear all the selected filters 
    It will clear all the main page filters and local variables filter*********************/
    function clearFilter() {
        try {
            vm.selectedPortfolioOwnerfilter = null;
            vm.selectedExecutionScopefilter = null;
            vm.selectedProjectPhasefilter = null;
            vm.selectedProjectCapPhasefilter = null;
            vm.selectedProjectOEPhasefilter = null;
            vm.objselectedProjectOEPhasefilter = null;
            vm.objselectedProjectCapPhasefilter = null;

            vm.selectedPrimaryProductfilter = null;
            vm.selectedProjectStatusfilter = null;
            vm.selectedCapexRangefilter = null;
            vm.selectedGMSBudgetOwnerfilter = null;
            vm.selectedOETypefilter = null;
            vm.selectedProjectTypefilter = null;
            //vm.selectedProjectIDfilter = null;
            vm.selectedFundingStatusfilter = null;
            vm.selectedAGILEWorkstreamfilter = null;
            vm.selectedAGILEWavefilter = null;
            vm.selectedPrimaryKPIfilter = null;
            vm.selectedTOPSGroupfilter = null;

            var multiselect = $("#PeopleFilter").data("kendoMultiSelect");
            var parentMultiSelect = $("#ddl_ParentProgramFilterMain").data("kendoMultiSelect");
            vm.selectedPeoplefilter = [];
            vm.selectedParentProgramfilter = [];
            vm.selectedIsCAPSProjectfilter = null;
            vm.selectedStrategicYearfilter = null;
            vm.selectedAnnualMustWinfilter = null;
            //vm.selectedParentProjectfilter = [];


            multiselect.value([]);
            parentMultiSelect.value([]);
            vm.local = [];
            IsPageLoad = 0;
            refreshLocalVarGrid();

            //var multiselectPop = $("#PeopleFilterPop").data("kendoMultiSelect");
            //multiselectPop.value([]);
            vm.mainFilterCount = 0;
            vm.parentProgramCount = 0;
            vm.LocalVariableCnt = 0;
            // $scope.$digest();
        }

        catch (err) {
            var dataToSend = {
                "method": "clearFilter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }
    };

    function bindGridChart() {
        displayLoading();
        InitKendoGridProj();
        hideLoading();
    };

    function ApplyFilter(btnName) {
        trackEvent("ApplyFilter" + btnName); 
        $("div").removeClass("fixed-header");
        try {
          //  vm.enable = "false";
            //    vm.searchButtonText = "Applying";
            // Do your searching here
            localGridCreated = false;
            closeByButton = 0;
            displayLoading();
            filteredDefault = false;
            filteredLocal = false;
            filteredCapital = false;
            if (btnName == 'Update') {
                closeByButton = 1;
                InitBudgetSpendWindowData = InitBudgetSpendWindowData == 0 ? 0 : 1;
                var myWindow = $("#dialogFilter");
                myWindow.data("kendoWindow").close();
                chkMilestoneData = false;

            }
            if (validfilter === true) {
                chkMilestoneData = false;
                //vm.includeChart = false;
                vm.includeLocal = false;
                $("#gridPortfolioCenterProj").show();
                InitNextWindowData = InitNextWindowData == 0 ? 0 : 1;
                InitLastWindowData = InitLastWindowData == 0 ? 0 : 1;

                InitPhaseWindowData = 0;
                InitPriorityWindowData = 0;
                InitMilePerformanceData = 0;
                InitBudgetSpendWindowData = InitBudgetSpendWindowData == 0 ? 0 : 1;

                var phFltr;
                var exScope;
                var priFilter;
                var stFltr;
                var budgtOwnerFltr;
                var oeFltr;
                var poFltr;
                var capFltr;
                var pplFltr = [];
                var fsFltr;
                var ppFltr;
                var ptFltr;
                //   var prjIDFltr;
                var ppFltrName;
                var includeChild = vm.includeChild;
                var capPhfltr;
                var oePhfltr;
                var aglWrkStream;
                var aglWave;
                var priKPI;
                var topsGroupFltr;
                var isCAPSProjectFltr;
                var annualMustWinMainFltr;
                var strategicYearMainFltr;

                userFilter = "";
                parentProgramFilter = "";
                if (vm.selectedExecutionScopefilter != null) {
                    exScope = vm.selectedExecutionScopefilter.length > 1 ? vm.selectedExecutionScopefilter.join(",") : vm.selectedExecutionScopefilter[0];
                }
                if (vm.selectedProjectPhasefilter != null) {
                    phFltr = vm.selectedProjectPhasefilter.length > 1 ? vm.selectedProjectPhasefilter.join(",") : vm.selectedProjectPhasefilter[0];
                }
                if (vm.selectedPrimaryProductfilter != null) {
                    priFilter = vm.selectedPrimaryProductfilter.length > 1 ? vm.selectedPrimaryProductfilter.join(",") : vm.selectedPrimaryProductfilter[0];
                }
                if (vm.selectedProjectStatusfilter != null) {
                    stFltr = vm.selectedProjectStatusfilter.length > 1 ? vm.selectedProjectStatusfilter.join(",") : vm.selectedProjectStatusfilter[0];
                }
                if (vm.selectedCapexRangefilter != null) {
                    capFltr = vm.selectedCapexRangefilter.length > 1 ? vm.selectedCapexRangefilter.join(",") : vm.selectedCapexRangefilter[0];
                }
                if (vm.selectedGMSBudgetOwnerfilter != null) {
                    budgtOwnerFltr = vm.selectedGMSBudgetOwnerfilter.length > 1 ? vm.selectedGMSBudgetOwnerfilter.join(",") : vm.selectedGMSBudgetOwnerfilter[0];
                }
                if (vm.selectedOETypefilter != null) {
                    oeFltr = vm.selectedOETypefilter.length > 1 ? vm.selectedOETypefilter.join(",") : vm.selectedOETypefilter[0];
                }
                if (vm.selectedPortfolioOwnerfilter != null) {
                    poFltr = vm.selectedPortfolioOwnerfilter.length > 1 ? vm.selectedPortfolioOwnerfilter.join(",") : vm.selectedPortfolioOwnerfilter[0];
                }
                //if (vm.selectedProjectIDfilter != null) {
                //    prjIDFltr = vm.selectedProjectIDfilter;
                //}
                if (vm.selectedProjectTypefilter != null) {
                    ptFltr = vm.selectedProjectTypefilter.length > 1 ? vm.selectedProjectTypefilter.join(",") : vm.selectedProjectTypefilter[0];
                }
                if (vm.selectedFundingStatusfilter != null) {
                    fsFltr = vm.selectedFundingStatusfilter.length > 1 ? vm.selectedFundingStatusfilter.join(",") : vm.selectedFundingStatusfilter[0];
                }
                if (vm.selectedProjectCapPhasefilter != null) {
                    capPhfltr = vm.selectedProjectCapPhasefilter.length > 1 ? vm.selectedProjectCapPhasefilter.join(",") : vm.selectedProjectCapPhasefilter[0];
                }
                if (vm.selectedProjectOEPhasefilter != null) {
                    oePhfltr = vm.selectedProjectOEPhasefilter.length > 1 ? vm.selectedProjectOEPhasefilter.join(",") : vm.selectedProjectOEPhasefilter[0];
                }
                if (vm.selectedAGILEWorkstreamfilter != null) {
                    aglWrkStream = vm.selectedAGILEWorkstreamfilter.length > 1 ? vm.selectedAGILEWorkstreamfilter.join(",") : vm.selectedAGILEWorkstreamfilter[0];
                }
                //if (vm.selectedAGILESecondaryWorkstreamfilter != null) {
                //    aglSecWrk = vm.selectedAGILESecondaryWorkstreamfilter.length > 1 ? vm.selectedAGILESecondaryWorkstreamfilter.join(",") : vm.selectedAGILESecondaryWorkstreamfilter[0];
                // }
                if (vm.selectedAGILEWavefilter != null) {
                    aglWave = vm.selectedAGILEWavefilter.length > 1 ? vm.selectedAGILEWavefilter.join(",") : vm.selectedAGILEWavefilter[0];
                }
                if (vm.selectedPrimaryKPIfilter != null) {
                    priKPI = vm.selectedPrimaryKPIfilter.length > 1 ? vm.selectedPrimaryKPIfilter.join(",") : vm.selectedPrimaryKPIfilter[0];
                }
                if (vm.selectedTOPSGroupfilter != null) {
                    topsGroupFltr = vm.selectedTOPSGroupfilter.length > 1 ? vm.selectedTOPSGroupfilter.join(",") : vm.selectedTOPSGroupfilter[0];
                }
                if (vm.selectedIsCAPSProjectfilter != null) {
                    isCAPSProjectFltr = vm.selectedIsCAPSProjectfilter.length > 1 ? vm.selectedIsCAPSProjectfilter.join(",") : vm.selectedIsCAPSProjectfilter[0];
                }
                if (vm.selectedStrategicYearfilter != null) {
                    strategicYearMainFltr = vm.selectedStrategicYearfilter.length > 1 ? vm.selectedStrategicYearfilter.join(",") : vm.selectedStrategicYearfilter[0];
                }
                if (vm.selectedAnnualMustWinfilter != null) {
                    annualMustWinMainFltr = vm.selectedAnnualMustWinfilter.length > 1 ? vm.selectedAnnualMustWinfilter.join(",") : vm.selectedAnnualMustWinfilter[0];
                }


                var parentMultiSelect = $("#ddl_ParentProgramFilterMain").data("kendoMultiSelect");
                vm.selectedParentProgramfilter = parentMultiSelect.dataItems();
                var selectedParentProgram = parentMultiSelect.value();

                if (selectedParentProgram != null && selectedParentProgram != undefined) {
                    if (selectedParentProgram.length > 0) {
                        parentProgramFilter = "";
                        angular.forEach(selectedParentProgram, function (item, index) {
                            parentProgramFilter = parentProgramFilter + "," + item;
                        });
                        parentProgramFilter = parentProgramFilter.substring(1, parentProgramFilter.length);
                    }
                }
                //  if (vm.selectedPeoplefilter != null && vm.selectedPeoplefilter.length > 0) {
                var multiselect = $("#PeopleFilter").data("kendoMultiSelect");
                //multiselect.focus();
                var alreadySearched = multiselect.value();
                vm.selectedPeoplefilter = multiselect.dataItems();
                if (alreadySearched != null && alreadySearched.length > 0) {
                    userFilter = "";
                    angular.forEach(alreadySearched, function (item, index) {
                        userFilter = userFilter + "," + item
                    });
                    userFilter = userFilter.substring(1, userFilter.length);
                }

                dataToSendLocal = JSON.stringify([]);
                dataToSendLocal = UpdateFilter();
                var LocalVarDatatoStore = [];
                if ($('#gridLocalAttributesFilter').data('kendoGrid') != undefined) {
                    LocalVarDatatoStore = $('#gridLocalAttributesFilter').data('kendoGrid').dataSource.data();
                }

                vm.filterPortfolio = {
                    ExecutionScopeFilter: exScope,
                    ProjectPhaseFilter: phFltr,
                    PrimaryProductfilter: priFilter,
                    ProjectStatusfilter: stFltr,
                    CapexRangefilter: capFltr,
                    GMSBudgetOwnerfilter: budgtOwnerFltr,
                    OETypefilter: oeFltr,
                    PortfolioOwnerfilter: poFltr,
                    Peoplefilter: vm.selectedPeoplefilter,
                    // ProjectIDfilter: prjIDFltr,
                    ProjectTypefilter: ptFltr,
                    ParentProgramfilter: vm.selectedParentProgramfilter,
                    //ParentProgramfilterName: ppFltrName,
                    FundingStatusFilter: fsFltr,
                    LocalVariablefilter: LocalVarDatatoStore,
                    includeChild: includeChild,
                    CapitalPhaseFilter: capPhfltr,
                    OEPhaseFilter: oePhfltr,
                    AglWrkStreamfilter: aglWrkStream,
                    AglWavefilter: aglWave,
                    PrimaryKPI: priKPI,
                    TopsGroup: topsGroupFltr,
                    IsCAPSProjectfilter: isCAPSProjectFltr,
                    annualMustWinfilter:annualMustWinMainFltr,
                    strategicYearfilter:strategicYearMainFltr
                };
                var listdata = [];
                listdata.push(vm.filterPortfolio);
                var finalData = JSON.stringify(listdata);

                localStorage['myKeyFilter'] = finalData;


                filterDataToSend = {
                    "strUserAdId": currentUserId, "strGMSBudgetOwnerfilter": budgtOwnerFltr, "strExecutionScopeFilter": exScope, "strOETypefilter": oeFltr, "strProjectPhaseFilter": phFltr,
                    "strProjectStatusfilter": stFltr, "strPrimaryProductfilter": priFilter, "strPortfolioOwnerfilter": poFltr, "struserFilter": userFilter,
                    "strCapexRangefilter": capFltr,
                    "strProjectTypefilter": ptFltr, "strParentProgramfilter": parentProgramFilter,
                    "strFundingStatusFilter": fsFltr, "strIncludeChild": includeChild, "objLocalVariable": dataToSendLocal,
                    "strCapPhasefilter": capPhfltr, "strOEPhasefilter": oePhfltr,
                    "strAglWrkStreamfilter": aglWrkStream, "strAglWavefilter": aglWave, "strPrimaryKPI": priKPI, "strTopsGroupfilter": topsGroupFltr,
                    "strIsCAPSProjectfilter": isCAPSProjectFltr, "strAnnualMustWinfilter": annualMustWinMainFltr, "strStrategicYearfilter": strategicYearMainFltr
                };

                //     filterDataToSend = dataToSend;
                $.when(GETPostService.postDataWCFAsync("getAllProjectInfo", filterDataToSend),
                    GETPostService.postDataWCFAsync("getPortfolioCenterTileInfo", filterDataToSend), GETPostService.postDataWCFAsync("getPhasePriorityDataPortfolio", filterDataToSend))
                    .then(function (resAllProj, resTileInfo, resPhasePriorityDataPortfolioCenter) {
                        try {


                            if (resAllProj != undefined) {
                                ProjectData = JSON.parse(resAllProj);
                                //var MilestoneData = JSON.parse(resMilestone);
                                //  
                                var tileInfoResult = JSON.parse(resTileInfo);
                                vm.tileInfo = tileInfoResult[0];
                                //   alert(vm.tileInfo.LocalCurrencyAbbreviation);

                                vm.ShowLocalDropDown = (vm.tileInfo.LocalCurrencyAbbreviation != undefined && vm.tileInfo.LocalCurrencyAbbreviation != OKU_Text) ? true : false;
                                LocalCurrencyAbbreviationPortfolio = vm.tileInfo.LocalCurrencyAbbreviation;
                                //  alert(vm.ShowLocalDropDown);
                                showLocalCurrencyDdl = vm.ShowLocalDropDown;
                                vm.OYAbbreviationPortfolio = OKU_Text;
                               
                                getGridViewProjects();
                                var PhasePriorityData = JSON.parse(resPhasePriorityDataPortfolioCenter);
                                UpdateDataWithFiltered(PhasePriorityData);
                                vm.PortfolioLocalCurrencyValue = vm.tileInfo.LocalCurrencyAbbreviation == OKU_Text ? vm.PortfolioLocalCurrencyDS[1] : vm.PortfolioLocalCurrencyDS[0]
                                currencyChange();
                            }

                            vm.searchButtonText = "Apply";
                            vm.enable = "true";

                            $scope.$digest();

                            hideLoading();
                        }

                        catch (err) {
                            hideLoading();
                            var dataToSend = {
                                "method": "ApplyFilter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                            };
                            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                .then(function (response) { alert(errormessage) });
                            vm.enable = "true";
                        }
                    });
            }
        }

        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "ApplyFilter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
            vm.enable = "true";
        }


    }

    function prepareDataForPortfolioCenter() {
        var permitted = false;
        console.log("Getting User Permission");
        $.when(GETPostService.postDataWCFAsync("getUserPermissionById", currentUserId)).then(function (resPermission) {
            try {
                console.log("Message after User Permission");
    
                var per = JSON.parse(resPermission.getUserPermissionByIdResult);
                if (per.length == 0) { window.location.href = errorPagePath; }
                else {
                    angular.forEach(per, function (item, index) {
                        if (item.Permission == viewProject || item.Permission == editProject) {
                            permitted = true;
                        }
                        if (item.Permission == forecastBulkEdit) {
                            vm.forecastBulkEdit = true;
                        } if (item.Permission == forecastBulkEditExcel) {
                            vm.forecastBulkEditExcel = true;
                        }
                    });
                    if (permitted == false) { window.location.href = errorPagePath; }
                    else {
                        // vm.includeChart = false;
                        vm.includeLocal = false;
                        var d = new Date();
                        console.log("Local storage call started " + d.toString());
                        var dsResLst = [];
                        var lookup = projectPhase + "," + portfolioOwner + "," + projectStatus + "," + GMSBudgetOwner + "," + capexRange + ',' + oeProjectType + ',' + executionScope + ',' + product + ',' + fundingStatus + ',' + projectType + ',' + PortfolioLocalCurrency + ',' + agileWave + ',' + topsPrimaryKpi + ',' + TOPSRecommendedPriorityGroup + ',' + IsCAPSProject + "," + strategicYear + "," + portfolioAnnualMustWin;
                        var lookupWithAtt = agileAttribute;
                        var filter = {
                        };

                        vm.includeGridView = (localStorage['selectedPortfolioGridView'] !== undefined && localStorage['selectedPortfolioGridView'] != null) ? localStorage['selectedPortfolioGridView'] : Default;
                        var stored = localStorage['myKeyFilter'];

                        if (stored) {
                            filter = JSON.parse(stored);
                            vm.filterPortfolio = filter[0];
                            if (vm.filterPortfolio != undefined && vm.filterPortfolio != null) {

                                if (vm.filterPortfolio["ExecutionScopeFilter"] != null && vm.filterPortfolio["ExecutionScopeFilter"] != undefined) {
                                    vm.selectedExecutionScopefilter = vm.filterPortfolio["ExecutionScopeFilter"].split(',');
                                }

                                if (vm.filterPortfolio["ProjectPhaseFilter"] != null && vm.filterPortfolio["ProjectPhaseFilter"] != undefined) {
                                    vm.selectedProjectPhasefilter = vm.filterPortfolio["ProjectPhaseFilter"].split(',');
                                }

                                if (vm.filterPortfolio["PrimaryProductfilter"] != null && vm.filterPortfolio["PrimaryProductfilter"] != undefined) {
                                    vm.selectedPrimaryProductfilter = vm.filterPortfolio["PrimaryProductfilter"].split(',');
                                }

                                if (vm.filterPortfolio["ProjectStatusfilter"] != null && vm.filterPortfolio["PrimaryProductfilter"] != undefined) {
                                    vm.selectedProjectStatusfilter = vm.filterPortfolio["ProjectStatusfilter"].split(',');
                                }
                                //else
                                //    vm.filterPortfolio["ProjectStatusfilter"] = activeStatus;

                                if (vm.filterPortfolio["CapexRangefilter"] != null && vm.filterPortfolio["CapexRangefilter"] != undefined) {
                                    vm.selectedCapexRangefilter = vm.filterPortfolio["CapexRangefilter"].split(',');
                                }


                                if (vm.filterPortfolio["GMSBudgetOwnerfilter"] != null && vm.filterPortfolio["GMSBudgetOwnerfilter"] != undefined) {
                                    vm.selectedGMSBudgetOwnerfilter = vm.filterPortfolio["GMSBudgetOwnerfilter"].split(',');
                                }

                                if (vm.filterPortfolio["OETypefilter"] != null && vm.filterPortfolio["OETypefilter"] != undefined) {
                                    vm.selectedOETypefilter = vm.filterPortfolio["OETypefilter"].split(',');
                                }

                                if (vm.filterPortfolio["PortfolioOwnerfilter"] != null && vm.filterPortfolio["PortfolioOwnerfilter"] != undefined) {
                                    vm.selectedPortfolioOwnerfilter = vm.filterPortfolio["PortfolioOwnerfilter"].split(',');
                                }
                                if (vm.filterPortfolio["ProjectTypefilter"] != null && vm.filterPortfolio["ProjectTypefilter"] != undefined) {
                                    vm.selectedProjectTypefilter = vm.filterPortfolio["ProjectTypefilter"].split(',');
                                }
                                //if (vm.filterPortfolio["ProjectIDfilter"] != null && vm.filterPortfolio["ProjectIDfilter"] != undefined) {
                                //    vm.selectedProjectIDfilter = vm.filterPortfolio["ProjectIDfilter"];
                                //}
                                if (vm.filterPortfolio["FundingStatusFilter"] != null && vm.filterPortfolio["FundingStatusFilter"] != undefined) {
                                    vm.selectedFundingStatusfilter = vm.filterPortfolio["FundingStatusFilter"].split(',');
                                }

                                if (vm.filterPortfolio["Peoplefilter"] != null && vm.filterPortfolio["Peoplefilter"] != undefined) {
                                    vm.selectedPeoplefilter = vm.filterPortfolio["Peoplefilter"];
                                    angular.forEach(vm.selectedPeoplefilter, function (item, index) {
                                        userFilter = userFilter + "," + item.UserADId
                                    });
                                    userFilter = userFilter.substring(1, userFilter.length);
                                }

                                if (vm.filterPortfolio["ParentProgramfilter"] != null && vm.filterPortfolio["ParentProgramfilter"] != undefined) {
                                    vm.selectedParentProgramfilter = vm.filterPortfolio["ParentProgramfilter"];
                                    angular.forEach(vm.selectedParentProgramfilter, function (item, index) {
                                        parentProgramFilter = parentProgramFilter + "," + item.ProblemUniqueID;
                                    });
                                    parentProgramFilter = parentProgramFilter.substring(1, parentProgramFilter.length);


                                }

                                if (vm.filterPortfolio["CapitalPhaseFilter"] != null && vm.filterPortfolio["CapitalPhaseFilter"] != undefined) {
                                    vm.selectedProjectCapPhasefilter = vm.filterPortfolio["CapitalPhaseFilter"].split(',');
                                }
                                if (vm.filterPortfolio["OEPhaseFilter"] != null && vm.filterPortfolio["OEPhaseFilter"] != undefined) {
                                    vm.selectedProjectOEPhasefilter = vm.filterPortfolio["OEPhaseFilter"].split(',');
                                }
                                vm.includeChild = vm.filterPortfolio["includeChild"] != null ? vm.filterPortfolio["includeChild"] : false;

                                //if (vm.filterPortfolio["ParentProgramfilter"] != null && vm.filterPortfolio["ParentProgramfilter"] != undefined) {
                                //    vm.ParentProgramfilterName = vm.filterPortfolio["ParentProgramfilter"];
                                //}
                                if (vm.filterPortfolio["LocalVariablefilter"] != null && vm.filterPortfolio["LocalVariablefilter"] != undefined) {
                                    vm.local = vm.filterPortfolio["LocalVariablefilter"];
                                }

                                if (vm.filterPortfolio["AglWrkStreamfilter"] != null && vm.filterPortfolio["AglWrkStreamfilter"] != undefined) {
                                    vm.selectedAGILEWorkstreamfilter = vm.filterPortfolio["AglWrkStreamfilter"].split(',');
                                }
                                if (vm.filterPortfolio["AglWavefilter"] != null && vm.filterPortfolio["AglWavefilter"] != undefined) {
                                    vm.selectedAGILEWavefilter = vm.filterPortfolio["AglWavefilter"].split(',');
                                }
                                if (vm.filterPortfolio["PrimaryKPI"] != null && vm.filterPortfolio["PrimaryKPI"] != undefined) {
                                    vm.selectedPrimaryKPIfilter = vm.filterPortfolio["PrimaryKPI"].split(',');
                                }
                                if (vm.filterPortfolio["TopsGroup"] != null && vm.filterPortfolio["TopsGroup"] != undefined) {
                                    vm.selectedTOPSGroupfilter = vm.filterPortfolio["TopsGroup"].split(',');
                                }
                                if (vm.filterPortfolio["IsCAPSProjectfilter"] != null && vm.filterPortfolio["IsCAPSProjectfilter"] != undefined) {
                                    vm.selectedIsCAPSProjectfilter = vm.filterPortfolio["IsCAPSProjectfilter"].split(',');
                                }

                                if (vm.filterPortfolio["annualMustWinfilter"] != null && vm.filterPortfolio["annualMustWinfilter"] != undefined) {
                                    vm.selectedAnnualMustWinfilter = vm.filterPortfolio["annualMustWinfilter"].split(',');
                                }
                                if (vm.filterPortfolio["strategicYearfilter"] != null && vm.filterPortfolio["strategicYearfilter"] != undefined) {
                                    vm.selectedStrategicYearfilter = vm.filterPortfolio["strategicYearfilter"].split(',');
                                }
                                vm.LocalVariableCnt = ((localStorage["LocalCnt"] != null && localStorage["LocalCnt"] != undefined) ? localStorage["LocalCnt"] : 0);

                                /*Seting up the value for OriginalSelectedPortfolioOwnerForLocalGrid and OriginalSelectedExecutionScopeForLocalGrid so the 
                                Local attribute grid of projetcs on portfolio center will be populated according to the selected 
                                portfolio Owner and excution scope only*/

                                //OriginalSelectedPortfolioOwnerForLocalGrid = vm.filterPortfolio["PortfolioOwnerfilter"];
                                //OriginalSelectedExecutionScopeForLocalGrid = vm.filterPortfolio["ExecutionScopeFilter"]

                            }
                            else {
                                vm.filterPortfolio["Peoplefilter"] = currentUserId;
                                userFilter = currentUserId;
                                vm.filterPortfolio["ProjectStatusfilter"] = activeStatus;
                                var pplObj = {
                                };
                                pplObj.UserADId = currentUserId;
                                pplObj.UserDisplayName = currentUserName;
                                vm.selectedPeoplefilter.push(pplObj);
                                vm.includeGridView = (localStorage['selectedPortfolioGridView'] !== undefined && localStorage['selectedPortfolioGridView'] != null) ? localStorage['selectedPortfolioGridView'] : Default;
                                //vm.selectedPeoplefilter = currentUserId;
                            }
                        }
                        else {
                            userFilter = currentUserId;
                            vm.filterPortfolio["Peoplefilter"] = currentUserId;
                            //vm.selectedPeoplefilter = currentUserId
                            vm.filterPortfolio["ProjectStatusfilter"] = activeStatus;
                            var pplObj = {
                            };
                            pplObj.UserADId = currentUserId;
                            pplObj.UserDisplayName = currentUserName;
                            vm.selectedPeoplefilter.push(pplObj);

                            vm.includeGridView = (localStorage['selectedPortfolioGridView'] !== undefined && localStorage['selectedPortfolioGridView'] != null) ? localStorage['selectedPortfolioGridView'] : Default;
                        }

                        d = new Date();
                        console.log("DB call started " + d.toString());
                        var objLV = JSON.stringify([]);
                        objLV = UpdateFilter();
                        //
                        filterDataToSend = {
                            "strUserAdId": currentUserId, "strGMSBudgetOwnerfilter": vm.filterPortfolio["GMSBudgetOwnerfilter"], "strExecutionScopeFilter": vm.filterPortfolio["ExecutionScopeFilter"],
                            "strOETypefilter": vm.filterPortfolio["OETypefilter"], "strProjectPhaseFilter": vm.filterPortfolio["ProjectPhaseFilter"],
                            "strProjectStatusfilter": vm.filterPortfolio["ProjectStatusfilter"], "strPrimaryProductfilter": vm.filterPortfolio["PrimaryProductfilter"],
                            "strPortfolioOwnerfilter": vm.filterPortfolio["PortfolioOwnerfilter"], "struserFilter": userFilter,
                            "strCapexRangefilter": vm.filterPortfolio["CapexRangefilter"], "objLocalVariable": objLV,
                            "strFundingStatusfilter": vm.filterPortfolio["FundingStatusfilter"],
                            "strParentProgramfilter": parentProgramFilter,
                            "strProjectTypefilter": vm.filterPortfolio["ProjectTypefilter"],
                            // "strProjectIDfilter": vm.filterPortfolio["ProjectIDfilter"],
                            "strIncludeChild": vm.filterPortfolio["includeChild"],
                            "strCapPhasefilter": vm.filterPortfolio["CapitalPhaseFilter"], "strOEPhasefilter": vm.filterPortfolio["OEPhaseFilter"],
                            "strAglWrkStreamfilter": vm.filterPortfolio["AglWrkStreamfilter"], "strAglWavefilter": vm.filterPortfolio["AglWavefilter"],
                            "strPrimaryKPI": vm.filterPortfolio["PrimaryKPI"], "strTopsGroupfilter": vm.filterPortfolio["TopsGroup"],
                            "strIsCAPSProjectfilter": vm.filterPortfolio["IsCAPSProjectfilter"],
                            "strAnnualMustWinfilter": vm.filterPortfolio["annualMustWinfilter"],
                            "strStrategicYearfilter": vm.filterPortfolio["strategicYearfilter"]
                        };

                        $.when(GETPostService.postDataWCFAsync("getAllProjectInfo", filterDataToSend), GETPostService.postDataWCFAsync("getPortfolioCenterTileInfo", filterDataToSend),
                            GETPostService.postDataWCFAsync("getLookupData", lookup),
                             GETPostService.postDataWCFAsync("getLookupDataPerformancestatus", lookupWithAtt),
                            GETPostService.postDataWCFAsync("getPhasePriorityDataPortfolio", filterDataToSend),
                            GETPostService.getDataWCF("getCapitalPhase"))
                            .then(function (resAllProj, resTileInfo, resLookup, resLookupWithAtt, resPhasePriorityDataPortfolioCenter, resCapitalPhase) {
                                try {
                                    d = new Date();
                                    console.log("DB call completed " + d.toString());
                                    console.log("Dropdown Binding Start " + d.toString());
                                    /*People Search Start*/
                                    var siteUsers = vm.selectedPeoplefilter;
                                    var SelectedPpl = [];
                                    var SelectedPplArray = userFilter.split(',');

                                    angular.forEach(SelectedPplArray, function (item, index) {
                                        SelectedPpl.push(item);
                                    });

                                    vm.selectedPeoplefilter = GETPostService.searchPeopleMultiselect("PeopleFilter", SelectedPpl, siteUsers)

                                    var multiselectpplMain = $("#PeopleFilter").data("kendoMultiSelect");

                                    multiselectpplMain.bind("change", function (e) {
                                        var value = this.value();
                                        vm.mainFilterCount = value.length;
                                        $scope.$digest();
                                    });
                                 
                                    multiselectpplMain.setOptions({
                                        placeholder: peoplepickerPlaceholderSmall
                                    });
                                    multiselectpplMain._placeholder();

                                    /*People Search End*/
                                    /*---------------Get Primary product data and bind it to primary and Ipacted Product------------------*/
                                    /*----------Start------------------*/
                                    var PrimaryProductDS = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                        return entry.LookUpName == product;
                                    });
                                    vm.dsPrimaryProductMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: PrimaryProductDS,
                                        filter: "contains"
                                    };

                                    vm.dsImpactedProducts = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: vm.dsPrimaryProduct,
                                        filter: "contains"
                                    };

                                    var resLookupResult = JSON.parse(resLookup.getLookupDataResult);
                                    var resLookupWithAttResult = JSON.parse(resLookupWithAtt.getLookupDataPerformancestatusResult);
                                    /*----------END------------------*/
                                    /*---------------Get Strategic Year data and bind it to dropdown------------------*/
                                    /*----------Start------------------*/
                                    var StrategicYearDs = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == strategicYear;
                                    });
                                    var AnnulMustWinDs = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == annualMustWin;
                                    });

                                    vm.dsStrategicYearMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: StrategicYearDs,
                                        filter: "contains"
                                    };

                                    vm.dsAnnualMustWinMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: AnnulMustWinDs,
                                        filter: "contains"
                                    };

                                    /*------------END---------------------*/

                                    /*---------------Get Portfolio Owner data and bind it to Portfolio Owner and Execution Scope------------------*/
                                    /*----------Start------------------*/
                                    var PortfolioOwnerds = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == portfolioOwner;
                                    });

                                    vm.dsPortfolioOwnerMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: PortfolioOwnerds,
                                        filter: "contains",
                                        change: function () {
                                            vm.local = [];
                                            vm.LocalVariableCnt = 0;
                                            IsPageLoad = 0;
                                            changPortfolio = 1;
                                            refreshLocalVarGrid();
                                            $scope.$digest();
                                        }
                                    };

                                    var ExecutionScopeDs = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == executionScope;
                                    });

                                    vm.dsExecutionScopeMainFilter = {
                                        placeholder: "Select scope...",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: ExecutionScopeDs,
                                        filter: "contains",
                                        change: function () {
                                            vm.local = [];
                                            vm.LocalVariableCnt = 0;
                                            IsPageLoad = 0;
                                            changPortfolio = 1;
                                            refreshLocalVarGrid();
                                            $scope.$digest();
                                        }
                                    };
                                    /*----------END------------------*/
                                    /******************Start:Bind Capital And OE Phase*************************/
                                    var capitalPhaseList = JSON.parse(resCapitalPhase.getCapitalPhaseResult);
                                    OEPhasefilterList = capitalPhaseList.filter(function (entry) {
                                        return entry.IsOEPhase == true;
                                    });
                                    //dsOEPhasefilterList = OEPhasefilterList;

                                    CapPhasefilterList = capitalPhaseList.filter(function (entry) {
                                        return entry.IsOEPhase == false;
                                    });
                                    //dsCapPhasefilterList = CapPhasefilterList;
                                    /******************End:Bind Capital And OE Phase*************************/
                                    /*---------------Get Project Phase data and bind it to Phase dropdown------------------*/
                                    /*----------Start------------------*/
                                    var projectPhaseDS = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == projectPhase;
                                    });

                                    vm.dsProjectPhaseMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: projectPhaseDS,
                                        filter: "contains",
                                        change: function (e) {
                                            var selectedOpt = [];
                                            var selectedOEOpt = [];

                                            dsCapPhasefilterList = CapPhasefilterList.filter(function (entry) {
                                                return (vm.selectedProjectPhasefilter.indexOf(entry.AssociatedPhaseID)) > -1;
                                            });
                                            dsOEPhasefilterList = OEPhasefilterList.filter(function (entry) {
                                                return (vm.selectedProjectPhasefilter.indexOf(entry.AssociatedPhaseID)) > -1;
                                            });


                                            /****************Start:For Capital Phase filter*******************/

                                            var multiselectCap = $("#ddl_CapPhaseFilterMain").data("kendoMultiSelect");
                                            var multiselectOE = $("#ddl_OEPhaseFilterMain").data("kendoMultiSelect");


                                            selectedOpt = multiselectCap.dataItems();
                                            selectedOEOpt = multiselectOE.dataItems();

                                            vm.selectedProjectCapPhasefilter = [];
                                            vm.selectedProjectOEPhasefilter = [];

                                            angular.forEach(selectedOpt, function (item1, index) {
                                                if (vm.selectedProjectPhasefilter.indexOf(item1.AssociatedPhaseID) > -1)
                                                    vm.selectedProjectCapPhasefilter.push(item1.CapitalPhaseID);
                                            })

                                            angular.forEach(selectedOEOpt, function (item1, index) {
                                                if (vm.selectedProjectPhasefilter.indexOf(item1.AssociatedPhaseID) > -1)
                                                    vm.selectedProjectOEPhasefilter.push(item1.CapitalPhaseID);
                                            })

                                            if (multiselectCap == undefined) {
                                                CreateCapitalPhaseDropdown();
                                            }
                                            else {
                                                multiselectCap.setDataSource(dsCapPhasefilterList);
                                                multiselectCap.value(vm.selectedProjectCapPhasefilter);
                                            }

                                            /****************END:For Capital Phase filter*******************/
                                            /****************START:For OE Phase filter*******************/

                                            if (multiselectOE == undefined) { 
                                                CreateOEDropdown();
                                            }
                                            else {
                                                multiselectOE.setDataSource(dsOEPhasefilterList);
                                                multiselectOE.value(vm.selectedProjectOEPhasefilter);
                                            }

                                            $scope.$digest();
                                        }
                                    };
                                    vm.objselectedProjectCapPhasefilter = [];
                                    vm.objselectedProjectOEPhasefilter = [];
                                    angular.forEach(CapPhasefilterList, function (item, index) {
                                        if ((vm.selectedProjectPhasefilter.indexOf(item.AssociatedPhaseID)) > -1)
                                            dsCapPhasefilterList.push(item);
                                        //  if(D)

                                        if (vm.selectedProjectCapPhasefilter.indexOf(item.CapitalPhaseID) > -1)
                                            vm.objselectedProjectCapPhasefilter.push(item);
                                    //    vm.selectedProjectOEPhasefilter = [];

                                    });
                                    angular.forEach(OEPhasefilterList, function (item, index) {
                                        if ((vm.selectedProjectPhasefilter.indexOf(item.AssociatedPhaseID)) > -1)
                                            dsOEPhasefilterList.push(item);
                                        if (vm.selectedProjectOEPhasefilter.indexOf(item.CapitalPhaseID) > -1)
                                            vm.objselectedProjectOEPhasefilter.push(item);
                                    });

                                    var multiselectCap = $("#ddl_CapPhaseFilterMain").data("kendoMultiSelect");
                                    if (multiselectCap == undefined) {
                                        CreateCapitalPhaseDropdown();
                                    }

                                    var multiselectOE = $("#ddl_OEPhaseFilterMain").data("kendoMultiSelect");
                                    if (multiselectOE == undefined) {
                                        CreateOEDropdown();
                                    }
                                    /*----------END------------------*/
                                    /*---------------Get Project Status data and bind it to State dropdown------------------*/
                                    /*----------Start------------------*/
                                    var ProjectStatusDS = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == projectStatus;
                                    });
                                    vm.dsProjectStatus = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: ProjectStatusDS,
                                        filter: "contains"
                                    };

                                    if (vm.selectedProjectStatusfilter == undefined || vm.selectedProjectStatusfilter == null || vm.selectedProjectStatusfilter == "") {
                                        var selActiveStatus = ProjectStatusDS.filter(function (entry) {
                                            return entry.LookUpMemberID === vm.filterPortfolio["ProjectStatusfilter"];
                                        });
                                        if (selActiveStatus.length > 0)
                                            vm.selectedProjectStatusfilter.push(selActiveStatus[0].LookUpMemberID);
                                    }
                                    /*----------END------------------*/
                                    /*---------------Get Budget Owner data and bind it to Budget Owner dropdown------------------*/
                                    /*----------Start------------------*/
                                    var GMSBudgetOwnerDS = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == GMSBudgetOwner;
                                    });
                                    vm.dsGMSBudgetOwnerMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: GMSBudgetOwnerDS,
                                        filter: "contains"
                                    };
                                    /*----------END------------------*/

                                    /*---------------Get all AD users for resource dropdown------------------*/
                                    /*----------Start------------------*/
                                    //var siteUsers = JSON.parse(userInfo.getUserDataResult);

                                    //vm.usersListMainFilter = {
                                    //    dataSource: siteUsers,
                                    //    dataTextField: "UserDisplayName",
                                    //    dataValueField: "UserADId",
                                    //    placeholder: "Select and/or Type to Search",


                                    //    // using {{angular}} templates:
                                    //    valueTemplate: '<span class="selected-value" style="background-image: url(\'{{dataItem.UserImageUrl}}\')"></span><span>{{dataItem.UserDisplayName}}</span>',

                                    //    template: '<span class="k-state-default" style="background-image: url(\'{{dataItem.UserImageUrl}}\')"></span>' +
                                    //        '<span class="k-state-default"><h3>{{dataItem.UserDisplayName}}</h3><p>{{dataItem.UserEmailAddress}}</p><p>{{ dataItem.UserDepartment }} {{ dataItem.UserCountry }}</p></span>'

                                    //};
                                    //if (userFilter == currentUserId || vm.selectedPeoplefilter == undefined || vm.selectedPeoplefilter == null || userFilter.length != 0) {
                                    //    var currentUser = siteUsers.filter(function (entry) {
                                    //        return entry.UserADId === currentUserId;
                                    //    });
                                    //    vm.selectedPeoplefilter.push(currentUser[0]);
                                    //}


                                    /*----------END------------------*/
                                    /*---------------Get CapexRange for dropdown------------------*/
                                    /*----------Start------------------*/
                                    var capexRangeDS = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == capexRange;
                                    });

                                    vm.dsCapexRange = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: capexRangeDS,
                                        filter: "contains"
                                    };
                                    /*----------END------------------*/
                                    /*---------------Get OEType for dropdown------------------*/
                                    /*----------Start------------------*/
                                    var oeTypeDS = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == oeProjectType;
                                    });
                                    vm.dsOETypeMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: oeTypeDS,
                                        filter: "contains"
                                    };
                                    /*----------END------------------*/

                                    /*----------Start------------------*/
                                    var projectTypeDS = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == projectType;
                                    });
                                    vm.dsProjectTypeMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: projectTypeDS,
                                        filter: "contains"
                                    };
                                    /*----------END------------------*/
                                    /*----------Start------------------*/
                                    //var parentProgramDS = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                    //    return entry.LookUpName == parentProject;
                                    //});
                                    //vm.dsParentProgramMainFilter = {
                                    //    placeholder: "Select and/or Type to Search",
                                    //    dataTextField: "LookUpMemberName",
                                    //    dataValueField: "LookUpMemberID",
                                    //    valuePrimitive: true,
                                    //    autoBind: false,
                                    //    dataSource: parentProgramDS
                                    //};
                                    var inputId = "ddl_ParentProgramFilterMain";
                                    var dsProjects = [];
                                    var searchFor = "ParentWithBudget";
                                    var SelectedParentProj = vm.selectedParentProgramfilter;
                                    //var SelectedParentProj = parentProgramFilter.split(',');
                                    if (vm.selectedParentProgramfilter != null && vm.selectedParentProgramfilter != undefined) {
                                        vm.parentProgramCount = SelectedParentProj.length;

                                        angular.forEach(SelectedParentProj, function (item, index) {
                                            dsProjects.push(item);
                                        });

                                    }
                                    vm.selectedParentProgramfilter = GETPostService.searchProjectParentMultiselect(inputId, dsProjects, searchFor, SelectedParentProj, currentUserId);

                                    var multiselectparentprogramMain = $("#ddl_ParentProgramFilterMain").data("kendoMultiSelect");

                                    multiselectparentprogramMain.bind("change", function (e) {
                                        var value = this.value();
                                        vm.parentProgramCount = value.length;
                                        $scope.$digest();
                                    });
                                    // searchProjectParent(inputId, dsProjects, searchFor, SelectedParentProj);
                                    // vm.SelectedParentProject = { "ProblemUniqueID": e.dataItem.ProblemUniqueID, "ProjectName": e.dataItem.ProjectName };

                                    // GETPostService.searchProject(inputId, dsProjects, searchFor, projectUID)
                                    ///*----------END------------------*/
                                    /*----------Start------------------*/
                                    var FundingStatusDS = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == fundingStatus;
                                    });
                                    vm.dsFundingStatusMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: FundingStatusDS,
                                        filter: "contains"
                                    };
                                    /*----------END------------------*/
                                    /*----------Agile Functionality Start------------------*/
                                    var AgileWorkStreamMainDs = resLookupWithAttResult.filter(function (entry) {
                                        return entry.LookUpName == agileAttribute;
                                    });
                                    vm.dsAgileWorkStreamMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: AgileWorkStreamMainDs,
                                        filter: "contains"
                                    };

                                    var AgileWaveDs = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == agileWave;
                                    });
                                    vm.dsAGILEWaveMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: AgileWaveDs,
                                        filter: "contains"
                                    };
                                    /*----------END------------------*/
                                    /******************Start:Bind Primary KPI*************************/

                                    var PrimaryKPIDs = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == topsPrimaryKpi;
                                    });
                                    vm.dsPrimaryKPIMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: PrimaryKPIDs,
                                        filter: "contains"
                                    };

                                    /******************END:Bind Primary KPI*************************/
                                    /******************Start:TOPS Group*************************/

                                    var TopsGroups = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == TOPSRecommendedPriorityGroup;
                                    });
                                    vm.dsTopsGroupMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberName",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: TopsGroups,
                                        filter: "contains"
                                    };

                                    /******************END:TOPS Group*************************/


                                    /*----------Start------------------*/
                                    vm.PortfolioLocalCurrencyDS = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == PortfolioLocalCurrency;
                                    });

                                    /*----------END------------------*/

                                    /******************END:IsCAPS Project*************************/


                                    /*----------Start------------------*/

                                    var IsCAPSProjectDs = resLookupResult.filter(function (entry) {
                                        return entry.LookUpName == IsCAPSProject;
                                    });
                                    vm.dsIsCAPSProjectMain = {
                                        placeholder: "Select and/or Type to Search",
                                        dataTextField: "LookUpMemberName",
                                        dataValueField: "LookUpMemberID",
                                        valuePrimitive: true,
                                        autoBind: false,
                                        dataSource: IsCAPSProjectDs,
                                        filter: "contains"
                                    };


                                    //vm.dsIsCAPSProjectMain = resLookupResult.filter(function (entry) {
                                    //    return entry.LookUpName == IsCAPSProject;
                                    //});

                                    /*----------END------------------*/



                                    /*---------------Get pROJECT data FOR GRID------------------*/
                                    /*----------Start------------------*/
                                    var tileInfoResult = JSON.parse(resTileInfo);
                                    vm.tileInfo = tileInfoResult[0];

                                    d = new Date();
                                    console.log("Dropdown binding completed " + d.toString());
                                    console.log("Project Grid Creation Start " + d.toString());
                                    if (resAllProj != undefined) {
                                        ProjectData = JSON.parse(resAllProj);
                                    }
                                    getGridViewProjects();
                                    displayLoading();

                                    vm.PortfolioLocalCurrencyValue = vm.tileInfo.LocalCurrencyAbbreviation == OKU_Text ? vm.PortfolioLocalCurrencyDS[1] : vm.PortfolioLocalCurrencyDS[0]
                                    //   alert(vm.tileInfo.LocalCurrencyAbbreviation);

                                    vm.ShowLocalDropDown = (vm.tileInfo.LocalCurrencyAbbreviation != undefined && vm.tileInfo.LocalCurrencyAbbreviation != OKU_Text) ? true : false;
                                    LocalCurrencyAbbreviationPortfolio = vm.tileInfo.LocalCurrencyAbbreviation;
                                    //  alert(vm.ShowLocalDropDown);
                                    showLocalCurrencyDdl = vm.ShowLocalDropDown;
                                    vm.OYAbbreviationPortfolio = OKU_Text;


                                    d = new Date();
                                    console.log("Project Grid Creation Complete " + d.toString());
                                    /*----------END------------------*/
                                    /*---------------Get Milestone performance data for tile------------------*/
                                    /*----------Start------------------*/
                                    //dsProjectPhase = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                                    //    return entry.LookUpName == projectPhase;
                                    //});
                                    var PhasePriorityData = JSON.parse(resPhasePriorityDataPortfolioCenter);
                                    UpdateDataWithFiltered(PhasePriorityData);
                                    //InitGridProject();

                                    $scope.$digest();
                                    d = new Date();
                                    console.log("UI completed " + d.toString());
                                    hideLoading();
                                }

                                catch (err) {
                                    hideLoading();
                                    var dataToSend = {
                                        "method": "prepareDataForPortfolioCenter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                    };
                                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                        .then(function (response) { alert(errormessage) });
                                }
                            }
                            );
                    }
                }
                InitkendoGridLocal();
                $("#dialogFilter").data("kendoWindow").bind("close", function (e) {
                    if ($('#gridLocalAttributesFilter').data('kendoGrid') != undefined) {
                        var gridupdatedData = $('#gridLocalAttributesFilter').data('kendoGrid').dataSource.data();
                        var cntLocal = 0;
                        validfilter = true;
                        // angular.forEach(gridupdatedData, function (item, index) {
                        for (var i = 0, len = gridupdatedData.length; i < len; i++) {
                            var item = gridupdatedData[i];
                            if ((item.DataType == "Number" && (((item.LocalVariableValue !== "" && item.LocalVariableValue !== null)
                                && (item.LocalVariableValueRangeEnd === "" || item.LocalVariableValueRangeEnd === null))
                                || ((item.LocalVariableValue === "" || item.LocalVariableValue === null)
                                    && (item.LocalVariableValueRangeEnd !== "" && item.LocalVariableValueRangeEnd !== null))))
                                || (item.DataType == "Date" && (((item.LocalVariableValue !== "" && item.LocalVariableValue !== null)
                                    && (item.LocalVariableValueRangeEnd === "" || item.LocalVariableValueRangeEnd === null))
                                    || ((item.LocalVariableValue === "" || item.LocalVariableValue === null)
                                        && (item.LocalVariableValueRangeEnd !== "" && item.LocalVariableValueRangeEnd !== null))))) {

                                alert(errorMessageForLimitSelection);
                                e.preventDefault();
                                validfilter = false;
                                hideLoading();
                                break;

                            }





                            if ((item.DataType == "Lookup" && item.MultilocalVariableIDArray.length != 0)
                                || (item.DataType == "People" && item.localVariablepplID.length != 0)
                                || (item.DataType == "Number" && item.LocalVariableValue !== "" && item.LocalVariableValueRangeEnd !== "" && item.LocalVariableValue !== null && item.LocalVariableValueRangeEnd !== null)
                                || (item.DataType == "Date" && item.LocalVariableValue !== "" && item.LocalVariableValueRangeEnd !== "" && item.LocalVariableValue !== null && item.LocalVariableValueRangeEnd !== null)
                                || (item.DataType === "Boolean" && item.LocalVariableValue !== "" && item.LocalVariableValue !== "false" && item.LocalVariableValue !== false)
                                || ((item.DataType === "Text" && item.LocalVariableValue !== "") || ((item.DataType === "Text" && item.isBlank === true)) || ((item.DataType === "Text" && item.isNotBlank === true)))) {
                                cntLocal++;
                            }
                            //else {
                            //    item.LocalVariableValue = "";
                            //    item.LocalVariableValueRangeEnd = "";
                            //}
                        }
                        if (validfilter == true) {
                            vm.LocalVariableCnt = cntLocal;
                            if (closeByButton != 1) {
                                $scope.$digest();
                            }
                        }
                        closeByButton = 0;
                        //  refreshLocalVarGrid();

                    }
                });
                //InitkendoGridLacalVariable();
            }

            catch (err) {
                hideLoading();
                var dataToSend = {
                    "method": "prepareDataForPortfolioCenter", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
            }
        });
    };
    function CreateOEDropdown() {
        $("#ddl_OEPhaseFilterMain").kendoMultiSelect({
            placeholder: "Select and/or Type to Search",
            dataTextField: "CapitalPhaseName",
            dataValueField: "CapitalPhaseID",
            valuePrimitive: true,
            autoBind: false,
            dataSource: dsOEPhasefilterList,
            filter: "contains",
            value: vm.objselectedProjectOEPhasefilter,//vm.selectedProjectOEPhasefilter,
            change: function (e) {
                var selectedOEOption = []
                vm.selectedProjectOEPhasefilter = [];
                vm.objselectedProjectOEPhasefilter = [];
                selectedOEOption = $("#ddl_OEPhaseFilterMain")[0].selectedOptions;
                angular.forEach(selectedOEOption, function (item1, index) {
                    vm.selectedProjectOEPhasefilter.push(item1.value);
                    vm.objselectedProjectOEPhasefilter.push(item1);
                });
                $scope.$digest();
            }
        });
    };
    function CreateCapitalPhaseDropdown() {
        $("#ddl_CapPhaseFilterMain").kendoMultiSelect({
            placeholder: "Select and/or Type to Search",
            dataTextField: "CapitalPhaseName",
            dataValueField: "CapitalPhaseID",
            valuePrimitive: true,
            autoBind: false,
            dataSource: dsCapPhasefilterList,
            filter: "contains",
            value:vm.objselectedProjectCapPhasefilter , //vm.objselectedProjectOEPhasefilter,//vm.selectedProjectCapPhasefilter,
            change: function (e) {
                var selectedCapOpt = []
                vm.selectedProjectCapPhasefilter = [];
                vm.objselectedProjectCapPhasefilter = [];
                selectedCapOpt = $("#ddl_CapPhaseFilterMain")[0].selectedOptions;
                angular.forEach(selectedCapOpt, function (item1, index) {
                    vm.selectedProjectCapPhasefilter.push(item1.value);
                    vm.objselectedProjectCapPhasefilter.push(item1);
                });
                $scope.$digest();
            }
        });
    };
    function getMilestoneData() {
        if (chkMilestoneData == false) {

            InitGridsMilestone();
            displayLoading();
            dataToSendLocal = UpdateFilter();
            var dataToSend = {
                "strUserAdId": currentUserId, "strGMSBudgetOwnerfilter": vm.filterPortfolio["GMSBudgetOwnerfilter"], "strExecutionScopeFilter": vm.filterPortfolio["ExecutionScopeFilter"],
                "strOETypefilter": vm.filterPortfolio["OETypefilter"], "strProjectPhaseFilter": vm.filterPortfolio["ProjectPhaseFilter"],
                "strProjectStatusfilter": vm.filterPortfolio["ProjectStatusfilter"], "strPrimaryProductfilter": vm.filterPortfolio["PrimaryProductfilter"],
                "strPortfolioOwnerfilter": vm.filterPortfolio["PortfolioOwnerfilter"], "struserFilter": userFilter,
                "strCapexRangefilter": vm.filterPortfolio["CapexRangefilter"], "objLocalVariable": dataToSendLocal,
                "strFundingStatusfilter": vm.filterPortfolio["FundingStatusfilter"],
                "strParentProgramfilter": parentProgramFilter,
                "strProjectTypefilter": vm.filterPortfolio["ProjectTypefilter"],
                //"strProjectIDfilter": vm.filterPortfolio["ProjectIDfilter"],
                "strIncludeChild": vm.filterPortfolio["includeChild"],
                "strCapPhasefilter": vm.filterPortfolio["CapitalPhaseFilter"],
                "strOEPhasefilter": vm.filterPortfolio["OEPhaseFilter"],
                "strAglWrkStreamfilter": vm.filterPortfolio["AglWrkStreamfilter"],
                "strAglWavefilter": vm.filterPortfolio["AglWavefilter"],
                "strTopsGroupfilter": vm.filterPortfolio["TOPSGroup"]
            };
            var d = new Date();
            console.log("Milestone DB call started " + d.toString());
            $.when(GETPostService.postDataWCFAsync("getAllMilestonesPortfolioCenter", dataToSend), GETPostService.postDataWCFAsync("getRiskIssuePortfolio", dataToSend), GETPostService.postDataWCFAsync("getAskNeedPortfolio", dataToSend))
                .then(function (resMilestone, resRiskIssue, resAskNeed) {
                    try {
                        var FilteredMilestoneData = JSON.parse(resMilestone);

                        /*LATE MILESTONE*/
                        LateMilestoneList = FilteredMilestoneData.filter(function (entry) {
                            return entry.Late == '1';
                        });

                        /*PREDICTED LATE MILESTONE*/
                        preLateMilestoneList = FilteredMilestoneData.filter(function (entry) {
                            return entry.PredictedLate == '1';
                        });

                        /*----------END------------------*/
                        /*---------------Get last Three months data for tile------------------*/
                        /*----------Start------------------*/
                        ltThreeMthMileCompl = FilteredMilestoneData.filter(function (entry) {
                            return entry.Last3MonthsMilestonesCompleted == '1';
                        });

                        /*---------------Get NEXT Three months data for tile------------------*/
                        /*----------Start------------------*/
                        nxtThreeMthMilestoneCmplt = FilteredMilestoneData.filter(function (entry) {
                            return entry.Next3MonthsMilestonesCompleting == '1';
                        });


                        /*----------END------------------*/

                        var dataSourceLate = new kendo.data.DataSource({
                            data: LateMilestoneList,
                            sort: {
                                field: "Variance",
                                dir: "desc"
                            }
                        });
                        var grid = $('#gridLateMilestonePopUp').data('kendoGrid');
                        dataSourceLate.read();
                        grid.setDataSource(dataSourceLate);

                        var dataSourcePreLate = new kendo.data.DataSource({
                            data: preLateMilestoneList,
                            sort: {
                                field: "Variance",
                                dir: "desc"
                            }
                        });
                        var gridpre = $('#gridPreLateMilestonePopUp').data('kendoGrid');
                        dataSourcePreLate.read();
                        gridpre.setDataSource(dataSourcePreLate);

                        var dataSourceNxtThreeMnth = new kendo.data.DataSource({
                            data: nxtThreeMthMilestoneCmplt,
                            sort: [{
                                field: "BaselineFinish",
                                dir: "asc"
                            }, {
                                field: "PlannedFinish",
                                dir: "asc"
                            }],
                        });
                        var gridNxtThreeMnth = $('#gridNxtThreeMnthsMilestonePopUp').data('kendoGrid');
                        dataSourceNxtThreeMnth.read();
                        gridNxtThreeMnth.setDataSource(dataSourceNxtThreeMnth);

                        var dataSourceLstThreeMnth = new kendo.data.DataSource({
                            data: ltThreeMthMileCompl,
                            sort: {
                                field: "CompletionDate",
                                dir: "desc"
                            }
                        });
                        var gridLstThreeMnth = $('#gridLstThreeMnthsMileCompletedPopUp').data('kendoGrid');
                        dataSourceLstThreeMnth.read();
                        gridLstThreeMnth.setDataSource(dataSourceLstThreeMnth);

                        gridDataRiskIssue = JSON.parse(resRiskIssue);
                        gridDataAskNeed = JSON.parse(resAskNeed);

                        var dataSourceRiskIssue = new kendo.data.DataSource({
                            data: gridDataRiskIssue,
                            sort: {
                                field: "DueDate",
                                dir: "asc"
                            },
                            // detailTemplate: kendo.template($("#riskIssuedetail-template").html())
                        });
                        // $('#gridNxtThreeMnthsRiskIssue').data().kendoGrid.destroy();
                        var gridDueRiskIssue = $('#gridNxtThreeMnthsRiskIssue').data('kendoGrid');
                        dataSourceRiskIssue.read();
                        //   current.$el.find('#gridid').data().kendoGrid.destroy();
                        gridDueRiskIssue.setDataSource(dataSourceRiskIssue);

                        var dataSourceAskNeed = new kendo.data.DataSource({
                            data: gridDataAskNeed,
                            sort: {
                                field: "NeedByDate",
                                dir: "asc"
                            }

                        });
                        var gridDueAskNeed = $('#gridNxtThreeMnthsAskNeed').data('kendoGrid');
                        dataSourceAskNeed.read();
                        gridDueAskNeed.setDataSource(dataSourceAskNeed);

                        // $scope.$digest();
                        hideLoading();
                    }

                    catch (err) {
                        hideLoading();
                        var dataToSend = {
                            "method": "getMilestoneData", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { alert(errormessage) });
                    }
                });

            chkMilestoneData = true;
        }
    }

    function UpdateDataWithFiltered(PhasePriorityData) {
        var d = new Date();
        console.log("UpdateDataWithFiltered Started" + d.toString());

        var dsChartPhaseData = PhasePriorityData.filter(function (entry) {
            return entry.DateType == 'Phase';
        });
        var dsChartPriorityData = PhasePriorityData.filter(function (entry) {
            return entry.DateType == 'Priority';
        });
        /*---------------Get Priority chart tile------------------*/
        /*----------Start------------------*/
        lstTopsPriority = [];

        angular.forEach(dsChartPriorityData, function (item, index) {
            var topItem = {
            };

            topItem = {
                "name": item.name, "data": [item.data], color: item.color
            }
            lstTopsPriority.push(topItem);
        });
        //CreatePriorityChart();

        ///*----------END------------------*/


        ///*----------END------------------*/

        ///*---------------Get PHASE data for tile------------------*/



        dsChartPhaseProject = [];
        var phaseItem;
        angular.forEach(dsChartPhaseData, function (item, index) {
            phaseItem = {
            };
            phases[item.name] = [];
            phases[item.name] = $filter('orderBy')(ProjectData.filter(function (entry) {
                return entry.Phase == item.name;
            }), "-daysInPhase");
            phaseItem.PhaseName = item.name;
            phaseItem.ProjectCnt = item.data;
            dsChartPhaseProject.push(phaseItem);
        });

        CreatePriorityChart(lstTopsPriority);
        CreatePhaseChart(dsChartPhaseProject);

        d = new Date();
        console.log("UpdateDataWithFiltered Completed" + d.toString());
    };

    /* #region For Priority PopUp*/
    function InitKendoGridPriority() {

        trackEvent("Portfolio center priority tile");
        displayLoading();
        var myWindow = $("#dialog");
        myWindow.data("kendoWindow").open();
        //   $(".k-window").css("maxWidth", "1400px");
        if (InitPriorityWindowData == 0) {
            var col = col_PortfolioCenter_gridPriorityPopUp();

            $("#gridPriorityPopUp").kendoGrid({
                dataSource: {
                    data: ProjectData,
                    sort: [{
                        field: "OverallStatusOrder", dir: "asc"
                    },
                    {
                        field: "ProjectNameWithoutPrefix", dir: "asc"
                    }]

                },
                height: 370,
                // groupable: true,
                sortable: true,

                schema: {
                    model: {
                        fields: {
                            Tops: {
                                type: "string"
                            },
                            Phase: {
                                type: "string"
                            },
                            ProblemID: {
                                type: "string"
                            },
                            BudgetID: {
                                type: "string"
                            },
                            ProjectName: {
                                type: "string"
                            },
                            OverallStatus: {
                                type: "string"
                            },
                            PortfolioOwnerName: {
                                type: "string"
                            },
                            PM: {
                                type: "string"
                            },
                            DataFreshness: {
                                type: "string"
                            },
                            ProjectNameWithoutPrefix: {
                                type: "string"
                            }
                        }
                    }
                },
                columns: col,
            });
            InitPriorityWindowData = 1;
        }
        hideLoading();
    };

    function InitKendoGridProj() {
        try {
            var d = new Date();
            console.log("getting column " + d.toString());
            var col = col_PortfoliCenter_gridPortfolioCenterProj();
            d = new Date();
            console.log("getting column completed" + d.toString());

            console.log("grid binding started" + d.toString());

            if (defaultGridCreated == false) {

                DefaultProjGrid = $("#gridPortfolioCenterProj").kendoGrid({
                    //columnMenuOpen: function (e) {
                    //    var mylist = e.container.find(".k-columns-item>ul");
                    //    var listitems = mylist.children('li').get();

                    //    $(listitems).find("input").click(function (e) {
                    //        if (!$(this).hasClass("custom-class")) {
                    //            var allChecked = $(this).closest("ul").find("li.k-item input:checked").length == $(this).closest("ul").find("li.k-item input").length;
                    //            $(".custom-class input")[0].checked = allChecked;
                    //        }
                    //    })
                    //    e.container.find(".custom-class").remove()
                    //    e.container.find('.k-filter-item').find('[role="menuitemcheckbox"]').remove();
                    //    var GridName = Default;
                    //    if (DefaultGridSelectAll === true)
                    //    {
                    //        $("<li class='custom-class'><span class='k-link'><input type='checkbox' checked onclick='checkAll(this," + GridName + ")'/>SelectAll</span></li>").insertBefore(e.container.find(".k-columns-item ul li").last());
                    //    }
                    //    else
                    //        $("<li class='custom-class'><span class='k-link'><input type='checkbox' onclick='checkAll(this," + GridName + ")'/>SelectAll</span></li>").insertBefore(e.container.find(".k-columns-item ul li").last());
                    //},
                    columnShow: function () {
                        addScroller(this)
                    },
                    columnHiede: function () {
                        addScroller(this)
                    },
                    dataSource: {
                        data: ProjectData,
                        pageSize: 100,
                        sort: [{
                            field: "OverallStatusOrder", dir: "asc"
                        },
                        {
                            field: "ProjectNameWithoutPrefix", dir: "asc"
                        }]

                    },
                    columns: col,
                    // sortable: true,
                    sortable: { mode: "multiple", allowUnsort: true },
                    filterable: true,
                    columnMenu: true,
                    reorderable: true,
                    resizable: true,
                    pageable: true,
                    schema: {
                        model: {
                            fields: {
                                ProjectName: {
                                    type: "string"
                                },
                                OverallStatus: {
                                    type: "string"
                                },
                                Tops: {
                                    type: "string"
                                },
                                Phase: {
                                    type: "string"
                                },
                                PM: {
                                    type: "string"
                                },
                                Sponsor: {
                                    type: "string"
                                },
                                ScheduleIndicator: {
                                    type: "string"
                                },
                                RiskIndicator: {
                                    type: "string"
                                },
                                BudgetIndicator: {
                                    type: "string"
                                },
                                AskNeedIndicator: {
                                    type: "string"
                                },
                                ApprovedAmount: {
                                    type: "string"
                                },
                                NextMilestone: {
                                    type: "string"
                                },
                                //ProjectPlanned: {
                                //    type: "string"
                                //}
                                ProjectNameWithoutPrefix: {
                                    type: "string"
                                }
                            }
                        }
                    },

                    dataBound: function (e) {

                        d = new Date();
                        console.log("databound started " + d.toString());
                        /*To make the grid scrollable with fix header*/
                        /*Start*/
                        var wrapper = this.wrapper,
                            header = wrapper.find(".k-grid-header"),
                            //   toolbar = wrapper.find(".k-grid-toolbar"),
                            pagingSpace = wrapper.find(".k-grid-pager");

                        addScroller(this);

                        function resizeFixed() {
                            var paddingRight = parseInt(header.css("padding-right"));
                            header.css("width", wrapper.width() - paddingRight);
                        }

                        function scrollFixed() {
                            /*How much screen has scrolled*/
                            var offset = $(this).scrollTop(),
                                /*How much grid has offset from top*/
                                //     tableOffsetTop = wrapper.offset().top + toolbar.height() + header.height(),
                                tableOffsetTop = wrapper.offset().top + header.height(),
                                /**/
                                //   tableOffsetBottom = (tableOffsetTop - toolbar.height()) + wrapper.height() + 20 - header.height();
                                tableOffsetBottom = tableOffsetTop + wrapper.height() - header.height();
                            if (offset >= tableOffsetTop) {
                                header.addClass("fixed-header");
                            } else {
                                header.removeClass("fixed-header");
                            }
                        }

                        resizeFixed();
                        $(window).resize(resizeFixed);
                        $(window).scroll(scrollFixed);
                        /************************   End   ******************************************/
                        //  if (vm.includeChart == true) {
                        var grid = this;

                        $(".chartPercentageComplete").each(function () {
                            var chart = $(this);
                            var tr = chart.closest('tr');
                            var model = grid.dataItem(tr);
                            chart.kendoChart({
                                series: [{
                                    type: "bullet",
                                    data: [[model.ActualCompletedMilestones, model.TargetToComplete]]
                                }],
                                chartArea: {
                                    margin: {
                                        left: 0
                                    }
                                },

                                valueAxis: {
                                    min: 0,
                                    max: model.TotalMilestone,
                                    line: {
                                        visible: false
                                    },
                                    labels: {
                                        visible: false
                                    },
                                    majorGridLines: {
                                        visible: false
                                    }
                                },
                                tooltip: {
                                    visible: true,
                                    template: "target: #= value.target # <br /> completed: #= value.current #"
                                }
                            });
                        });
                        // }
                    },


                    columnMenuInit: function (e) {
                        var list = e.container.find('.k-columns-item ul')
                        var items = list.find('li');

                        items.each(function (x, y) {
                            $(y).removeClass('k-first k-last')
                        })

                        items.sort(function (a, b) {
                            a = $(a);
                            b = $(b);

                            var firstText = (a.find('input[data-field]').attr('title').indexOf(">") > 1 || a.find('input[data-field]').attr('data-field').indexOf("]") > 1) ? a.find('input[data-field]').attr('data-field') : a.find('input[data-field]').attr('title');
                            var secondText = (b.find('input[data-field]').attr('title').indexOf(">") > 1 || b.find('input[data-field]').attr('data-field').indexOf("]") > 1) ? b.find('input[data-field]').attr('data-field') : b.find('input[data-field]').attr('title');

                            return ((firstText < secondText) ? -1 : ((firstText > secondText) ? 1 : 0));
                        })

                        items.first().addClass('k-first');
                        items.last().addClass('k-last');

                        items.each(function (y, x) {
                            list.append($(x));
                        })
                    }
                });
                defaultGridCreated = true;

            }
            else {

                var dataSource = new kendo.data.DataSource({
                    data: ProjectData, pageSize: 100,
                    sort: [{
                        field: "OverallStatusOrder", dir: "asc"
                    },
                 {
                     field: "ProjectNameWithoutPrefix", dir: "asc"
                 }]
                });
                var grid = $('#gridPortfolioCenterProj').data('kendoGrid');
                dataSource.read();
                grid.setDataSource(dataSource);
            }



            $("#gridPortfolioCenterProj").kendoTooltip({
                filter: "td:nth-child(1)", //this filter selects the second column's cells
                content: function (e) {
                    var dataItem = $("#gridPortfolioCenterProj").data("kendoGrid").dataItem(e.target.closest("tr"));
                    var content = dataItem.DataFreshness == "" ? "" : dataItem.DataFreshness + " Days";
                    return content;
                }
            }).data("kendoTooltip");
            $("#gridPortfolioCenterProj th:nth-child(1) a:nth-child(1)").hide();
            d = new Date();
            console.log("databound finish " + d.toString());
        }

        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitKendoGridProj", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage) });
        }

    };

    function InitKendoGridLate() {
        var tabStrip1 = $("#milestoneTile").kendoTabStrip().data("kendoTabStrip");


        var tabName = tabStrip1.select()[0].textContent;
        trackEvent("Portfolio center Milestone performance Tile");
        trackEvent("Portfolio center milestone performance tile - " + tabName);

        getMilestoneData();
        if (InitMilePerformanceData == 0) {
            InitMilePerformanceData = 1;
        }
        var myWindow = $("#dialogMile");
        myWindow.data("kendoWindow").open();

    }


    function InitGridsMilestone() {

        var col = col_PortfolioCenter_gridLateMilestonePopUp();
        $("#gridLateMilestonePopUp").kendoGrid({
            dataSource: LateMilestoneList,
            height: 190,
            // groupable: true,
            sortable: true,
            schema: {
                model: {
                    fields: {
                        StatusIndicator: {
                            type: "string"
                        },
                        Milestone: {
                            type: "string"
                        },
                        ProjectName: {
                            type: "string"
                        },
                        FunctionalGroupOwner: {
                            type: "string"
                        },
                        BaselineFinish: {
                            type: "date"
                        },
                        PlannedFinish: {
                            type: "date"
                        }
                    }
                }
            },
            columns: col,
        });

        $("#gridPreLateMilestonePopUp").kendoGrid({
            dataSource: LateMilestoneList,
            height: 190,
            // groupable: true,
            sortable: true,
            schema: {
                model: {
                    fields: {
                        Milestone: {
                            type: "string"
                        },
                        ProjectName: {
                            type: "string"
                        },
                        FunctionalGroupOwner: {
                            type: "string"
                        },
                        BaselineFinish: {
                            type: "date"
                        },
                        PlannedFinish: {
                            type: "date"
                        }
                    }
                }
            },
            columns: col,
        });

        var dsNxtThreeMthMilestoneCmplt = ds_PortfolioCenter_gridNxtThreeMnthsMilestonePopUp(nxtThreeMthMilestoneCmplt);
        var col = col_PortfolioCenter_gridNxtThreeMnthsMilestonePopUp();
        $("#gridNxtThreeMnthsMilestonePopUp").kendoGrid({
            dataSource: dsNxtThreeMthMilestoneCmplt,
            columns: col,
            height: 300,
            sortable: true,
        });

        var col_MileCompleted = col_PortfolioCenter_gridLstThreeMnthsMileCompletedPopUp();
        var ds_MileCompleted = ds_PortfolioCenter_gridLstThreeMnthsMileCompletedPopUp(ltThreeMthMileCompl);
        $("#gridLstThreeMnthsMileCompletedPopUp").kendoGrid({
            dataSource: ds_MileCompleted,
            height: 250,
            groupable: false,
            sortable: true,
            columns: col_MileCompleted,
        });

        $("#gridNxtThreeMnthsRiskIssue").kendoGrid({
            dataSource: {
                data: gridDataRiskIssue,
                sort: {
                    field: "DueDate",
                    dir: "asc"
                }
            },
            sortable: true,
            height: 300,
            schema: {
                model: {
                    fields: {
                        StatusIndicator: {
                            type: "string"
                        },
                        DueDate: {
                            type: "string"
                        },
                        IfHappens: {
                            type: "string"
                        },
                        RiskIssueTypeID: {
                            type: "string"
                        },
                        RiskIssueResult: {
                            type: "string"
                        },
                        Mitigation: {
                            type: "string"
                        },
                        OwnerName: {
                            type: "string"
                        },
                        FunctionGroup: {
                            type: "string"
                        },
                    }
                }
            },

            columns: [{
                template: "",
                field: "StatusIndicator",
                title: " ",
                width: "1%",
                attributes: {
                    class: "#:StatusIndicator#"
                },
            }, {
                template: "#if(linkLevel>0) {#<span class='k-icon k-i-link-vertical'></span>#}#",
                title: " ",
                width: "4%",
            }, {
                field: "ProjectName",
                title: "Project Name",
                width: "25%",
                template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
            },{
                field: "PM",
                title: "Project Manager",
                width: "20%",
            }, {
                field: "RiskIssueTypeName",
                title: "Type",
                width: "10%"
                //filterable: true,
            },
            {
                field: "IfHappens",
                title: "If This Happens",
                headerAttributes: {
                    "class": "wrap-header"
                },
                width: "30%"
                //filterable: true,
            }, {
                field: "DueDate",
                title: "Due Date",
                headerAttributes: {
                    "class": "wrap-header"
                },
                width: "10%",
                template: "#= DueDate ==null ? '' :  kendo.toString(kendo.parseDate(new Date(DueDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
                //filterable: true,
            }],
            detailTemplate: kendo.template($("#riskIssuedetail-template").html())
        });

        $("#gridNxtThreeMnthsAskNeed").kendoGrid({
            dataSource: {
                data: gridDataAskNeed,
                sort: {
                    field: "NeedByDate",
                    dir: "asc"
                }
            },
            sortable: true,
            height: 300,
            schema: {
                model: {
                    fields: {
                        StatusIndicator: {
                            type: "string"
                        },
                        AskNeed: {
                            type: "string"
                        },
                        NeedFromName: {
                            type: "string"
                        },
                        NeedByDate: {
                            type: "date"
                        },
                        Comments: {
                            type: "string"
                        },
                    }
                }
            },
            columns: [{
                template: "",
                field: "StatusIndicator",
                title: " ",
                width: "1%",
                attributes: {
                    class: "#:StatusIndicator#"
                },
            }, {
                template: "#if(linkLevel>0) {#<span class='k-icon k-i-link-vertical'></span>#}#",
                title: " ",
                width: "4%",
            }, {
                field: "ProjectName",
                title: "Project Name",
                width: "25%",
                template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
            }, {
                field: "PM",
                title: "Project Manager",
                width: "20%",
            }, {
                field: "AskNeed",
                title: "Ask or Need",
                width: "25%",
            }, {
                field: "NeedFromName",
                title: "Need From",
            }, {
                field: "NeedByDate",
                title: "Need Date",
                template: "#= NeedByDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(NeedByDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
            }],
            detailTemplate: kendo.template($("#askNNeed-template").html())
        });
    }

    function InitNextThreeMnth() {
        var tabStrip2 = $("#nextThreeMonthTab").kendoTabStrip().data("kendoTabStrip");


        var tabName = tabStrip2.select()[0].textContent;
        trackEvent("Portfolio center next three month tile");
        trackEvent("Portfolio center next three month tile - " + tabName);

        getMilestoneData();

        if (InitNextWindowData == 0) {

            /*--------------Next Three Month Start-----------------*/
            nxtThreeMthProjectCmplt = ProjectData.filter(function (entry) {
                return (entry.Next3MonthsProjectCompleting == '1');
            });
            var dsNxtThreeMthProjectCmplt = ds_PortfolioCenter_gridNxtThreeMnthsProjectPopUp(nxtThreeMthProjectCmplt);
            var col1 = col_PortfolioCenter_gridNxtThreeMnthsProjectPopUp();
            $("#gridNxtThreeMnthsProjectPopUp").kendoGrid({
                dataSource: dsNxtThreeMthProjectCmplt,
                columns: col1,
                height: 300,
                groupable: false,
                sortable: true,
            });
            /*--------------Next Three Month End-----------------*/
            InitNextWindowData = 1;
        }
        else if (InitNextWindowData == 1) {
            nxtThreeMthProjectCmplt = ProjectData.filter(function (entry) {
                return (entry.Next3MonthsProjectCompleting == '1');
            });
            var dsNxtThreeMthProjectCmplt = ds_PortfolioCenter_gridNxtThreeMnthsProjectPopUp(nxtThreeMthProjectCmplt);

            var grid = $('#gridNxtThreeMnthsProjectPopUp').data('kendoGrid');
            dsNxtThreeMthProjectCmplt.read();
            grid.setDataSource(dsNxtThreeMthProjectCmplt);
            InitNextWindowData = 2;
        }

        var myWindow = $("#dialogNxtMnth");
        myWindow.data("kendoWindow").open();

    };
    /*********************************Creating phase chart
       This is a bar chart
       **********************************************************/
    function CreatePhaseChart() {
        $("#PhaseChartMain").kendoChart({
            dataSource: {
                data: dsChartPhaseProject //Defined In BusinessCase Data
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent"
                }
            },
            series: [{
                field: "ProjectCnt",
                categoryField: "PhaseName",
                color: "#7d7d7d"
            }],
            valueAxis: {
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            }
        });

        $("#PhaseChartPop").kendoChart({
            dataSource: {
                data: dsChartPhaseProject
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent"
                }
            },
            series: [{
                field: "ProjectCnt",
                categoryField: "PhaseName",
                color: "#7d7d7d"

            }],
            valueAxis: {
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            }
        });
    }

    /*********************************Creating priority chart
    This is a 100% stacked chart
    **********************************************************/
    function CreatePriorityChart(lstTopsPriority) {
        $("#PriorityChart").kendoChart({
            legend: {
                position: "bottom",
            },
            seriesDefaults: {
                type: "bar",
                stack: {
                    type: "100%"
                }
            },
            series: lstTopsPriority,
            valueAxis: {
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                categories: [2012],
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            tooltip: {
                visible: true,
                template: "TOPS Group: #= series.name # <br /> Projects in that group: #= series.data #",
            }
        });
        $("#PriorityChartPopUp").kendoChart({
            legend: {
                position: "right",
            },
            seriesDefaults: {
                type: "bar",
                stack: {
                    type: "100%"
                }
            },
            series: lstTopsPriority,
            valueAxis: {
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                categories: [2012],
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            tooltip: {
                visible: true,
                template: "TOPS Group: #= series.name # <br /> Projects in that group: #= series.data[0] #",
            }
        });


    }
    /******************************************************
        To Initoalize and open phase pop up
    ***************************************************/
    function InitPhaseWindow() {

        trackEvent("Portfolio center phase tile");
        displayLoading();
        try {
            if (InitPhaseWindowData == 0) {
                var ArrayOfPhase = phases;
                // var maxArray = ArrayOfPhase.map(function (a) { return a.length; }).indexOf(Math.max.apply(Math, ArrayOfPhase.map(function (a) { return a.length; })));
                var max = Math.max(ArrayOfPhase.Initiate.length, ArrayOfPhase.Define.length, ArrayOfPhase.Plan.length, ArrayOfPhase.Execute.length, ArrayOfPhase.Close.length, ArrayOfPhase.Track.length);
                var jsonObj = [];
                //var countInt = listProjInitiate.length;
                //var countDefine = listProjDefine.length;
                //var countPlan = listProjPlan.length;
                //var countExecute = listProjExecute.length;
                //var countClose = listProjClose.length;
                //var countTrack = listProjTrack.length;

                for (var i = 0; i < max; i += 1) {

                    var item = {
                    }

                    if (ArrayOfPhase.Initiate.length > i) {
                        item["Initiate"] = ArrayOfPhase.Initiate[i] != undefined ? ArrayOfPhase.Initiate[i].ProjectName.substring(0, 60) : "";
                        item["IPhaseName"] = ArrayOfPhase.Initiate[i].CapitalPhaseName;
                        item["IDays"] = ArrayOfPhase.Initiate[i].daysInPhase + " d";
                        item["IIcon"] = ArrayOfPhase.Initiate[i].OverallStatusArrow == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                            (ArrayOfPhase.Initiate[i].OverallStatusArrow == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                (ArrayOfPhase.Initiate[i].OverallStatusArrow == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                    (ArrayOfPhase.Initiate[i].OverallStatusArrow == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                        (ArrayOfPhase.Initiate[i].OverallStatusArrow == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                            (ArrayOfPhase.Initiate[i].OverallStatusArrow == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                                (ArrayOfPhase.Initiate[i].OverallStatusArrow == 'YellowDown' ? "k-icon k-i-arrow-down arrow-yellow" :
                                                    "k-icon k-i-stop arrow-grey"))))));
                        item["IStatus"] = "<span class='k-icon k-i-arrow-60-right'></span>" + ArrayOfPhase.Initiate[i].ProjStatus;
                    }
                    else {
                        item["Initiate"] = "";
                        item["IPhaseName"] = "";
                        item["IDays"] = "";
                        item["IIcon"] = "";
                        item["IStatus"] = "";
                    }
                    if (ArrayOfPhase.Define.length > i) {
                        item["Define"] = ArrayOfPhase.Define[i] != undefined ? ArrayOfPhase.Define[i].ProjectName.substring(0, 60) : "";
                        item["DPhaseName"] = ArrayOfPhase.Define[i].CapitalPhaseName;
                        item["DDays"] = ArrayOfPhase.Define[i].daysInPhase + " d";
                        item["DIcon"] = ArrayOfPhase.Define[i].OverallStatusArrow == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                            (ArrayOfPhase.Define[i].OverallStatusArrow == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                (ArrayOfPhase.Define[i].OverallStatusArrow == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                    (ArrayOfPhase.Define[i].OverallStatusArrow == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                        (ArrayOfPhase.Define[i].OverallStatusArrow == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                            (ArrayOfPhase.Define[i].OverallStatusArrow == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                                (ArrayOfPhase.Define[i].OverallStatusArrow == 'YellowDown' ? "k-icon k-i-arrow-down arrow-yellow" :
                                                    "k-icon k-i-stop arrow-grey"))))));
                        // item["DIcon"] = ArrayOfPhase.Define[i].OverallStatus == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" : (ArrayOfPhase.Define[i].OverallStatus == 'RedStop' ? "k-icon k-i-stop arrow-red" : (ArrayOfPhase.Define[i].OverallStatus == 'GreenStop' ? "k-icon k-i-stop arrow-green" : (ArrayOfPhase.Define[i].OverallStatus == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" : "k-icon k-i-stop arrow-grey")));
                        item["DStatus"] = "<span class='k-icon k-i-arrow-60-right'></span>" + ArrayOfPhase.Define[i].ProjStatus;
                    }
                    else {
                        item["Define"] = "";
                        item["DPhaseName"] = "";
                        item["DDays"] = "";
                        item["DIcon"] = "";
                        item["DStatus"] = "";
                    }
                    if (ArrayOfPhase.Plan.length > i) {
                        item["Plan"] = ArrayOfPhase.Plan[i] != undefined ? ArrayOfPhase.Plan[i].ProjectName.substring(0, 60) : "";
                        item["PPhaseName"] = ArrayOfPhase.Plan[i].CapitalPhaseName;
                        item["PDays"] = ArrayOfPhase.Plan[i].daysInPhase + " d";
                        item["PIcon"] = ArrayOfPhase.Plan[i].OverallStatusArrow == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                            (ArrayOfPhase.Plan[i].OverallStatusArrow == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                (ArrayOfPhase.Plan[i].OverallStatusArrow == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                    (ArrayOfPhase.Plan[i].OverallStatusArrow == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                        (ArrayOfPhase.Plan[i].OverallStatusArrow == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                            (ArrayOfPhase.Plan[i].OverallStatusArrow == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                                (ArrayOfPhase.Plan[i].OverallStatusArrow == 'YellowDown' ? "k-icon k-i-arrow-down arrow-yellow" :
                                                    "k-icon k-i-stop arrow-grey"))))));
                        //   item["PIcon"] = ArrayOfPhase.Plan[i].OverallStatus == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" : (ArrayOfPhase.Plan[i].OverallStatus == 'RedStop' ? "k-icon k-i-stop arrow-red" : (ArrayOfPhase.Plan[i].OverallStatus == 'GreenStop' ? "k-icon k-i-stop arrow-green" : (ArrayOfPhase.Plan[i].OverallStatus == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" : "k-icon k-i-stop arrow-grey")));
                        item["PStatus"] = "<span class='k-icon k-i-arrow-60-right'></span>" + ArrayOfPhase.Plan[i].ProjStatus;
                    }
                    else {
                        item["Plan"] = "";
                        item["PPhaseName"] = "";
                        item["PDays"] = "";
                        item["PIcon"] = "";
                        item["PStatus"] = "";
                    }
                    if (ArrayOfPhase.Execute.length > i) {
                        item["Execute"] = ArrayOfPhase.Execute[i] != undefined ? ArrayOfPhase.Execute[i].ProjectName.substring(0, 60) : "";
                        item["EPhaseName"] = ArrayOfPhase.Execute[i].CapitalPhaseName;
                        item["EDays"] = ArrayOfPhase.Execute[i].daysInPhase + " d";
                        item["EIcon"] = ArrayOfPhase.Execute[i].OverallStatusArrow == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                            (ArrayOfPhase.Execute[i].OverallStatusArrow == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                (ArrayOfPhase.Execute[i].OverallStatusArrow == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                    (ArrayOfPhase.Execute[i].OverallStatusArrow == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                        (ArrayOfPhase.Execute[i].OverallStatusArrow == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                            (ArrayOfPhase.Execute[i].OverallStatusArrow == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                                (ArrayOfPhase.Execute[i].OverallStatusArrow == 'YellowDown' ? "k-icon k-i-arrow-down arrow-yellow" :
                                                    "k-icon k-i-stop arrow-grey"))))));
                        //  item["EIcon"] = ArrayOfPhase.Execute[i].OverallStatus == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" : (ArrayOfPhase.Execute[i].OverallStatus == 'RedStop' ? "k-icon k-i-stop arrow-red" : (ArrayOfPhase.Execute[i].OverallStatus == 'GreenStop' ? "k-icon k-i-stop arrow-green" : (ArrayOfPhase.Execute[i].OverallStatus == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" : "k-icon k-i-stop arrow-grey")));
                        item["EStatus"] = "<span class='k-icon k-i-arrow-60-right'></span>" + ArrayOfPhase.Execute[i].ProjStatus;
                    }
                    else {
                        item["Execute"] = "";
                        item["EPhaseName"] = "";
                        item["EDays"] = "";
                        item["EIcon"] = "";
                        item["EStatus"] = "";
                    }
                    if (ArrayOfPhase.Close.length > i) {
                        item["Close"] = ArrayOfPhase.Close[i] != undefined ? ArrayOfPhase.Close[i].ProjectName.substring(0, 60) : "";
                        item["CPhaseName"] = ArrayOfPhase.Close[i].CapitalPhaseName;
                        item["CDays"] = ArrayOfPhase.Close[i].daysInPhase + " d";
                        item["CIcon"] = ArrayOfPhase.Close[i].OverallStatusArrow == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                            (ArrayOfPhase.Close[i].OverallStatusArrow == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                (ArrayOfPhase.Close[i].OverallStatusArrow == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                    (ArrayOfPhase.Close[i].OverallStatusArrow == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                        (ArrayOfPhase.Close[i].OverallStatusArrow == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                            (ArrayOfPhase.Close[i].OverallStatusArrow == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                                (ArrayOfPhase.Close[i].OverallStatusArrow == 'YellowDown' ? "k-icon k-i-arrow-down arrow-yellow" :
                                                    "k-icon k-i-stop arrow-grey"))))));
                        //   item["CIcon"] = ArrayOfPhase.Close[i].OverallStatus == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" : (ArrayOfPhase.Close[i].OverallStatus == 'RedStop' ? "k-icon k-i-stop arrow-red" : (ArrayOfPhase.Close[i].OverallStatus == 'GreenStop' ? "k-icon k-i-stop arrow-green" : (ArrayOfPhase.Close[i].OverallStatus == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" : "k-icon k-i-stop arrow-grey")));
                        item["CStatus"] = "<span class='k-icon k-i-arrow-60-right'></span>" + ArrayOfPhase.Close[i].ProjStatus;
                    }
                    else {
                        item["Close"] = "";
                        item["CPhaseName"] = "";
                        item["CDays"] = "";
                        item["CIcon"] = "";
                        item["CStatus"] = "";
                    }
                    if (ArrayOfPhase.Track.length > i) {
                        item["Track"] = ArrayOfPhase.Track[i].ProjectName.substring(0, 60);
                        item["TPhaseName"] = ArrayOfPhase.Track[i].CapitalPhaseName;
                        item["TDays"] = ArrayOfPhase.Track[i].daysInPhase + " d";
                        item["TIcon"] = ArrayOfPhase.Track[i].OverallStatus == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" :
                                 (ArrayOfPhase.Track[i].OverallStatus == 'RedStop' ? "k-icon k-i-stop arrow-red" :
                                 (ArrayOfPhase.Track[i].OverallStatus == 'GreenStop' ? "k-icon k-i-stop arrow-green" :
                                 (ArrayOfPhase.Track[i].OverallStatus == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" :
                                 (ArrayOfPhase.Track[i].OverallStatus == 'YellowStop' ? "k-icon k-i-stop arrow-yellow" :
                                 (ArrayOfPhase.Track[i].OverallStatus == 'YellowUp' ? "k-icon k-i-arrow-up arrow arrow-yellow" :
                                 (ArrayOfPhase.Track[i].OverallStatus == 'YellowDown' ? "k-icon k-i-arrow-down arrow-yellow" :
                                 "k-icon k-i-stop arrow-grey"))))));
                        //  item["TIcon"] = ArrayOfPhase.Track[i].OverallStatus == 'RedDown' ? "k-icon k-i-arrow-down arrow arrow-red" : (ArrayOfPhase.Track[i].OverallStatus == 'RedStop' ? "k-icon k-i-stop arrow-red" : (ArrayOfPhase.Track[i].OverallStatus == 'GreenStop' ? "k-icon k-i-stop arrow-green" : (ArrayOfPhase.Track[i].OverallStatus == 'GreenUp' ? "k-icon k-i-arrow-up arrow arrow-green" : "k-icon k-i-stop arrow-grey")));
                        item["TStatus"] = "<span class='k-icon k-i-arrow-60-right'></span>" + ArrayOfPhase.Track[i].ProjStatus;
                    }
                    else {
                        item["Track"] = "";
                        item["TPhaseName"] = "";
                        item["TDays"] = "";
                        item["TIcon"] = "";
                        item["TStatus"] = "";
                    }
                    jsonObj.push(item);
                }
                $("#PhGrid").kendoGrid({
                    dataSource: {
                        data: jsonObj
                    },
                    columns: [{
                        //template: "<div class='row'><div class='col-xs-2 padR0 padL0'><div class='col-xs-12 padL0 padR0'><span class='#= IIcon #'></span></div><div class='col-xs-12 padL0 padR0'>#= IDays #</div></div><div class='col-xs-10 padR0 padL0'><div class='col-xs-12 padL0 padR0 gridCellBT'>#= Initiate #</div><div class='col-xs-12 padL0 padR0 catPhaseName'>#= IPhaseName #</div></div></div>",
                        template: "<div class='row'><div class='col-xs-2 padR0 padL0'><div class='col-xs-12 padL0 padR0'><span class='#= IIcon #'></span></div><div class='col-xs-12 padL0 padR0'>#= IDays #</div></div><div class='col-xs-10 padR0 padL0'><div class='col-xs-12 padL0 padR0 gridCellBT'>#= Initiate #</div><div class='col-xs-12 padL0 padR0 catPhaseName'>#= IPhaseName #</div><div class='col-xs-12 padL0 padR0 catPhaseStatus'>#= IStatus #</div></div></div>",

                        field: "Initiate",
                        title: "Initiate",
                    }, {
                        template: "<div class='row'><div class='col-xs-2 padR0 padL0'><div class='col-xs-12 padL0 padR0'><span class='#= DIcon #'></span></div><div class='col-xs-12 padL0 padR0'>#= DDays #</div></div><div class='col-xs-10 padR0 padL0'><div class='col-xs-12 padL0 padR0 gridCellBT'>#= Define #</div><div class='col-xs-12 padL0 padR0 catPhaseName'>#= DPhaseName #</div><div class='col-xs-12 padL0 padR0 catPhaseStatus'>#= DStatus #</div></div></div>",
                        field: "Define",
                        title: "Define",
                    }, {
                        template: "<div class='row'><div class='col-xs-2 padR0 padL0'><div class='col-xs-12 padL0 padR0'><span class='#= PIcon #'></span></div><div class='col-xs-12 padL0 padR0'>#= PDays #</div></div><div class='col-xs-10 padR0 padL0'><div class='col-xs-12 padL0 padR0 gridCellBT'>#= Plan #</div><div class='col-xs-12 padL0 padR0 catPhaseName'>#= PPhaseName #</div><div class='col-xs-12 padL0 padR0 catPhaseStatus'>#= PStatus #</div></div></div>",
                        field: "Plan",
                        title: "Plan",
                    }, {
                        template: "<div class='row'><div class='col-xs-2 padR0 padL0'><div class='col-xs-12 padL0 padR0'><span class='#= EIcon #'></span></div><div class='col-xs-12 padL0 padR0'>#= EDays #</div></div><div class='col-xs-10 padR0 padL0'><div class='col-xs-12 padL0 padR0 gridCellBT'>#= Execute #</div><div class='col-xs-12 padL0 padR0 catPhaseName'>#= EPhaseName #</div><div class='col-xs-12 padL0 padR0 catPhaseStatus'>#= EStatus #</div></div></div>",
                        field: "Execute",
                        title: "Execute",
                    }, {
                        template: "<div class='row'><div class='col-xs-2 padR0 padL0'><div class='col-xs-12 padL0 padR0'><span class='#= CIcon #'></span></div><div class='col-xs-12 padL0 padR0'>#= CDays #</div></div><div class='col-xs-10 padR0 padL0'><div class='col-xs-12 padL0 padR0 gridCellBT'>#= Close #</div><div class='col-xs-12 padL0 padR0 catPhaseName'>#= CPhaseName #</div><div class='col-xs-12 padL0 padR0 catPhaseStatus'>#= CStatus #</div></div></div>",
                        field: "Close",
                        title: "Close",
                    }, {
                        template: "<div class='row'><div class='col-xs-2 padR0 padL0'><div class='col-xs-12 padL0 padR0'><span class='#= TIcon #'></span></div><div class='col-xs-12 padL0 padR0'>#= TDays #</div></div><div class='col-xs-10 padR0 padL0'><div class='col-xs-12 padL0 padR0 gridCellBT'>#= Track #</div><div class='col-xs-12 padL0 padR0 catPhaseName'>#= TPhaseName #</div><div class='col-xs-12 padL0 padR0 catPhaseStatus'>#= TStatus #</div></div></div>",
                        field: "Track",
                        title: "Track",
                    }],
                    height: 300,
                    // groupable: true,
                    sortable: true,

                    dataBound: function (e) {
                        var rows = e.sender.content.find('tr');
                        var InitiateIndex = this.wrapper.find(".k-grid-header [data-field=" + "Initiate" + "]").index();
                        var DefineIndex = e.sender.wrapper.find(".k-grid-header [data-field=" + "Define" + "]").index();
                        var PlanIndex = e.sender.wrapper.find(".k-grid-header [data-field=" + "Plan" + "]").index();
                        var ExecuteIndex = e.sender.wrapper.find(".k-grid-header [data-field=" + "Execute" + "]").index();
                        var CloseIndex = e.sender.wrapper.find(".k-grid-header [data-field=" + "Close" + "]").index();
                        var TrackIndex = e.sender.wrapper.find(".k-grid-header [data-field=" + "Track" + "]").index();

                        rows.each(function (index, row) {
                            var dataItem = e.sender.dataItem(row);
                            if (dataItem.Initiate) {
                                $(row).children('td:eq(' + InitiateIndex + ')').addClass('setborder');
                            }
                            if (dataItem.Define) {
                                $(row).children('td:eq(' + DefineIndex + ')').addClass('setborder');
                            }
                            if (dataItem.Plan) {
                                $(row).children('td:eq(' + PlanIndex + ')').addClass('setborder');
                            }
                            if (dataItem.Execute) {
                                $(row).children('td:eq(' + ExecuteIndex + ')').addClass('setborder');
                            }
                            if (dataItem.Close) {
                                $(row).children('td:eq(' + CloseIndex + ')').addClass('setborder');
                            }
                            if (dataItem.Track) {
                                $(row).children('td:eq(' + TrackIndex + ')').addClass('setborder');
                            }
                        })
                    },

                });
                InitPhaseWindowData = 1;
            }
            var myWindow = $("#dialogPhGrid");
            myWindow.data("kendoWindow").open();
        }
        catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "InitPhaseWindow", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) { alert(errormessage); });
        }
        hideLoading();
    }

    /*****************************************************************8
        To Initialise and open Budget popup
     ******************************************/

    function InitBudgetWindow() {
        var tabStrip1 = $("#portfolioBudgetTabstrip").kendoTabStrip().data("kendoTabStrip");


        var tabName = tabStrip1.select()[0].textContent;
        trackEvent("Portfolio center budget tile");
        trackEvent("Portfolio center budget/spend tile - " + tabName);

        var hidePrelim = vm.tileInfo.PreliminaryPeriod > 0 ? true : false;
        displayLoading();
        //var d = new Date();
        //console.log("Milestone DB call started " + d.toString());
        if (InitBudgetSpendWindowData === 0) {
            CreateCapexPerformanceChart();
            try {


                var col_ProjectPerformance = col_PortfolioCenter_gridProjectPerformance(hidePrelim);
                var ds_ProjectPerformance = ds_PortfolioCenter_gridProjectPerformance(ProjectData);

                //var col_ForecastSubmission = col_PortfolioCenter_gridForecastSubmission(hidePrelim);
                //var ds_ForecastSubmission = ds_PortfolioCenter_gridForecastSubmission(ProjectData);

                $("#gridProjectPerformance").kendoGrid({
                    dataSource: ds_ProjectPerformance,
                    //height: 470,
                    groupable: false,
                    sortable: true,
                    columns: col_ProjectPerformance,
                    pageable: true,
                });

                //$("#gridForecastSubmission").kendoGrid({
                //    dataSource: ds_ForecastSubmission,
                //    //height: 470,
                //    groupable: false,
                //    sortable: true,
                //    columns: col_ForecastSubmission,
                //    pageable: true,
                //});
                InitBudgetSpendWindowData = 1;

            }
            catch (err) {
                hideLoading();
                var dataToSend = {
                    "method": "InitBudgetWindow", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
            }

        }
        else if (InitBudgetSpendWindowData === 1) {
            CreateCapexPerformanceChart();
            try {


                var ds_ProjectPerformance = ds_PortfolioCenter_gridProjectPerformance(ProjectData);

                //var ds_ForecastSubmission = ds_PortfolioCenter_gridForecastSubmission(ProjectData);

                var grid = $('#gridProjectPerformance').data('kendoGrid');
                ds_ProjectPerformance.read();
                grid.setDataSource(ds_ProjectPerformance);

                //var grid1 = $('#gridForecastSubmission').data('kendoGrid');
                //ds_ForecastSubmission.read();
                //grid1.setDataSource(ds_ForecastSubmission);

                InitBudgetSpendWindowData = 2;

            }
            catch (err) {
                hideLoading();
                var dataToSend = {
                    "method": "InitBudgetWindow", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
            }

        };


        var myWindow = $("#dialogBudget");
        myWindow.data("kendoWindow").open();
        var tabStrip = $("#portfolioBudgetTabstrip").data("kendoTabStrip");
        tabStrip.select(0);
        hideLoading();
    };


    function CreateCapexPerformanceChart() {
        $.when(GETPostService.postDataWCFAsync("getBudgetChartData", filterDataToSend))
            .then(function (resBudgetChartData) {
                try {
                    $("#OKU_Div").show();
                    $("#Local_Div").show();
                    /*Setting the max scale for chart*/
                    var budgetData = JSON.parse(resBudgetChartData)
                    var maxRec = budgetData.length > 0 ? budgetData[budgetData.length - 1] : 0;
                    var maxScale = 0;

                    var maxScaleLocal = 0;
                    if (maxRec.BudgetCummTotal >= maxRec.PlanCummTotal) {
                        if (maxRec.BudgetCummTotal > maxRec.ActualForecastCummTotal) {
                            maxScale = maxRec.BudgetCummTotal;
                            maxScaleLocal = maxRec.BudgetCummTotalLocal;
                        }
                        else //(maxRec.ActualForecastCummTotal > maxRec.BudgetCummTotal)
                        {
                            maxScale = maxRec.ActualForecastCummTotal;
                            maxScaleLocal = maxRec.ActualForecastCummTotalLocal;
                        }
                    }
                    else {
                        if (maxRec.PlanCummTotal > maxRec.ActualForecastCummTotal) {
                            maxScale = maxRec.PlanCummTotal;
                            maxScaleLocal = maxRec.PlanCummTotalLocal;
                        }
                        else {
                            maxScale = maxRec.ActualForecastCummTotal;
                            maxScaleLocal = maxRec.ActualForecastCummTotalLocal;
                        }
                    }

                    var chartLabelDimension = "";
                    if (maxScale > 1000000000)
                        var chartLabelDimension = "B";
                    else if (maxScale > 1000000)
                        var chartLabelDimension = "M";
                    else if (maxScale > 1000)
                        var chartLabelDimension = "K";

                    var chartLabelDimensionLocal = "";
                    if (maxScaleLocal > 1000000000)
                        var chartLabelDimensionLocal = "B";
                    else if (maxScaleLocal > 1000000)
                        var chartLabelDimensionLocal = "M";
                    else if (maxScaleLocal > 1000)
                        var chartLabelDimensionLocal = "K";

                    var shortLabels = function (item) {
                        console.log(1);
                        var value = item.value;
                        // return kendo.toString((value / 1000), "$\\ #") + "k";
                        if (chartLabelDimension === undefined) {
                            return kendo.format('{0:N4}', kendo.parseInt(value));
                        }
                        else if (chartLabelDimension.length > 0 && chartLabelDimension == "B")
                            return kendo.toString((value / 1000000000), 'n4') + chartLabelDimension;
                        else if (chartLabelDimension.length > 0 && chartLabelDimension == "M")
                            return kendo.toString((value / 1000000), 'n4') + chartLabelDimension;
                        else if (chartLabelDimension.length > 0 && chartLabelDimension == "K")
                            return kendo.toString((value / 1000), 'n4') + chartLabelDimension;
                        else if (chartLabelDimension.length > 0 && chartLabelDimension == "")
                            return kendo.toString(value, 'n4') + chartLabelDimension;
                        else
                            kendo.toString(value, 'n4')
                        // return kendo.format('{0:N4}', kendo.parseInt(value));
                    }
                    var shortLabelsChart = function (item) {
                        console.log(1);
                        var value = item.value;
                        // return kendo.toString((value / 1000), "$\\ #") + "k";
                        if (chartLabelDimension === undefined) {
                            return kendo.format('{0:N4}', kendo.parseInt(value));
                        }
                        else if (chartLabelDimension.length > 0 && chartLabelDimension == "B")
                            return kendo.toString((value / 1000000000), 'n4') + chartLabelDimension;
                        else if (chartLabelDimension.length > 0 && chartLabelDimension == "M")
                            return kendo.toString((value / 1000000), 'n4') + chartLabelDimension;
                        else if (chartLabelDimension.length > 0 && chartLabelDimension == "K")
                            return kendo.toString((value / 1000), 'n4') + chartLabelDimension;
                        else if (chartLabelDimension.length > 0 && chartLabelDimension == "")
                            return kendo.toString(value, 'n4') + chartLabelDimension;
                        else
                            return kendo.toString(value, 'n4');
                    }

                    var shortLabelsLocal = function (item) {

                        console.log(1);
                        var value = item.value;
                        // return kendo.toString((value / 1000), "$\\ #") + "k";
                        if (chartLabelDimensionLocal === undefined) {
                            return kendo.format('{0:N0}', kendo.parseInt(value));
                        }
                        else if (chartLabelDimensionLocal.length > 0 && chartLabelDimensionLocal == "B")
                            return kendo.toString((value / 1000000000), 'n0') + chartLabelDimensionLocal;
                        else if (chartLabelDimensionLocal.length > 0 && chartLabelDimensionLocal == "M")
                            return kendo.toString((value / 1000000), 'n0') + chartLabelDimensionLocal;
                        else if (chartLabelDimensionLocal.length > 0 && chartLabelDimensionLocal == "K")
                            return kendo.toString((value / 1000), 'n0') + chartLabelDimensionLocal;
                        else
                            return kendo.format('{0:N0}', kendo.parseInt(value));
                    }
                    var shortLabelsChartLocal = function (item) {
                        console.log(1);
                        var value = item.value;
                        // return kendo.toString((value / 1000), "$\\ #") + "k";
                        if (chartLabelDimensionLocal === undefined) {
                            return kendo.format('{0:N0}', kendo.parseInt(value));
                        }
                        else if (chartLabelDimensionLocal.length > 0 && chartLabelDimensionLocal == "B")
                            return kendo.toString((value / 1000000000), 'n0') + chartLabelDimensionLocal;
                        else if (chartLabelDimensionLocal.length > 0 && chartLabelDimensionLocal == "M")
                            return kendo.toString((value / 1000000), 'n0') + chartLabelDimensionLocal;
                        else if (chartLabelDimensionLocal.length > 0 && chartLabelDimensionLocal == "K")
                            return kendo.toString((value / 1000), 'n0') + chartLabelDimensionLocal;
                        else
                            return kendo.format('{0:N0}', kendo.parseInt(value));
                    }
                    var getLocalCurr = function (item) {
                        return LocalCurrencyAbbreviationPortfolio;
                    }

                    $("#budgetChart").kendoChart({
                        dataSource: {
                            data: budgetData
                        },
                        legend: {
                            position: "bottom"
                        },
                        yAxis: {
                            title: {
                                text: "OY",
                            }
                        },
                        title: {
                            text: "Fiscal Year CAPEX Performance"
                        },
                        seriesDefaults: {
                            type: "line",
                            labels: {
                                visible: true,
                                template: shortLabelsChart,
                                background: "transparent"
                            }
                        },
                        series: [
                   // {
                        //    name: "Budget Cum. Total",
                        //    field: "BudgetCummTotal",
                        //    categoryField: "Month",
                        //    style: "smooth",
                        //    color: "#000000"
                        //},
                        {
                            name: "Plan Cum. Total",
                            field: "PlanCummTotal",
                            categoryField: "Month",
                            style: "smooth",
                            color: "Blue"
                        }, {
                            name: "Current Cum. Total",
                            field: "ActualForecastCummTotal",
                            categoryField: "Month",
                            style: "smooth",
                            color: "Green"
                        }],
                        valueAxis: {
                            //labels: {
                            //    template: shortLabels,
                            //},
                            title: {
                                text: "OY"
                            }
                        },
                        tooltip: {
                            visible: true,
                            template: "#= (series.name=='Current Cum. Total'?'Current ':'Plan') #:#= (kendo.toString(value, 'n4').trim())#"
                        },
                        categoryAxis: {
                            majorGridLines: {
                                visible: false
                            }
                        }
                    });

                    $("#budgetChartLocal").kendoChart({
                        dataSource: {
                            data: budgetData
                        },
                        legend: {
                            position: "bottom"
                        },
                        yAxis: {
                            title: {
                                text: "$K USD",
                            }
                        },
                        title: {
                            text: "Fiscal Year CAPEX Performance"
                        },
                        seriesDefaults: {
                            type: "line",
                            labels: {
                                visible: true,
                                template: shortLabelsChartLocal,
                                background: "transparent"
                            }
                        },
                        series: [{
                            //    name: "Budget Cum. Total",
                            //    field: "BudgetCummTotalLocal",
                            //    categoryField: "Month",
                            //    style: "smooth",
                            //    color: "#000000"
                            //}, {
                            name: "Plan Cum. Total",
                            field: "PlanCummTotalLocal",
                            categoryField: "Month",
                            style: "smooth",
                            color: "Blue"
                        }, {
                            name: "Current Cum. Total",
                            field: "ActualForecastCummTotalLocal",
                            categoryField: "Month",
                            style: "smooth",
                            color: "Green"
                        }],
                        valueAxis: {
                            labels: {
                                template: shortLabelsLocal,
                            },
                            title: {
                                text: LocalCurrencyAbbreviationPortfolio
                            }
                        },
                        tooltip: {
                            visible: true,
                            template: "#= (series.name=='Current Cum. Total'?'Current ':'Plan') #: #=  (kendo.toString(value, 'n0').trim())#"
                        },
                        categoryAxis: {
                            majorGridLines: {
                                visible: false
                            }
                        }
                    });

                    currencyChange();
                }
                catch (err) {
                    hideLoading();
                    var dataToSend = {
                        "method": "CreateCapexPerformanceChart", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) { alert(errormessage) });
                }
            })
    }
    /**********************
    To Initialise and open Last three months popup
    **********************/
    function InitLstThreeMnthWindow() {
        var tabStrip1 = $("#lastThreeMonthTab").kendoTabStrip().data("kendoTabStrip");


        var tabName = tabStrip1.select()[0].textContent;
        trackEvent("Portfolio center last three month tile");
        trackEvent("Portfolio center last three month tile - " + tabName);
        getMilestoneData();

        if (InitLastWindowData == 0) {
            ltThreeMthProjFinishExec = ProjectData.filter(function (entry) {
                return entry.Last3MonthsProjectsFinishExecution == '1';
            });

            ltThreeMthProjInitiated = ProjectData.filter(function (entry) {
                return entry.Last3MonthsProjectsInitiated == '1';
            });

            ltThreeMthProjCompleted = ProjectData.filter(function (entry) {
                return entry.Last3MonthsProjectCompleted == '1';
            });

            ltThreeMthProjOnHold = ProjectData.filter(function (entry) {
                return entry.Last3MonthsProjectOnHold == '1';
            });

            var col_ProjFinishExec = col_PortfolioCenter_gridLstThreeMnthsProjFinishExecPopUp();
            var ds_ProjFinishExec = ds_PortfolioCenter_gridLstThreeMnthsProjFinishExecPopUp(ltThreeMthProjFinishExec);

            var col_ProjCompleted = col_PortfolioCenter_gridLstThreeMnthsProjCompletedPopUp();
            var ds_ProjCompleted = ds_PortfolioCenter_gridLstThreeMnthsProjCompletedPopUp(ltThreeMthProjCompleted);

            var col_ProjInitiated = col_PortfolioCenter_gridLstThreeMnthsProjInitiatedPopUp();
            var ds_ProjInitiated = ds_PortfolioCenter_gridLstThreeMnthsProjInitiatedPopUp(ltThreeMthProjInitiated);

            var col_ProjOnHold = col_PortfolioCenter_gridLstThreeMnthsProjHoldPopUp();
            var ds_ProjOnHold = ds_PortfolioCenter_gridLstThreeMnthsProjHoldPopUp(ltThreeMthProjOnHold);


            $("#gridLstThreeMnthsProjFinishExecPopUp").kendoGrid({
                dataSource: ds_ProjFinishExec,
                height: 250,
                groupable: false,
                sortable: true,
                columns: col_ProjFinishExec
            });
            $("#gridLstThreeMnthsProjCompletedPopUp").kendoGrid({
                dataSource: ds_ProjCompleted,
                height: 250,
                groupable: false,
                sortable: true,
                columns: col_ProjCompleted,
            });
            $("#gridLstThreeMnthsProjInitiatedPopUp").kendoGrid({
                dataSource: ds_ProjInitiated,
                height: 250,
                groupable: false,
                sortable: true,
                columns: col_ProjInitiated,
            });
            $("#gridLstThreeMnthsProjHoldPopUp").kendoGrid({
                dataSource: ds_ProjOnHold,
                height: 250,
                groupable: false,
                sortable: true,
                columns: col_ProjOnHold,
            });
            InitLastWindowData = 1;
        }
        else if (InitLastWindowData == 1) {
            ltThreeMthProjFinishExec = ProjectData.filter(function (entry) {
                return entry.Last3MonthsProjectsFinishExecution == '1';
            });

            ltThreeMthProjInitiated = ProjectData.filter(function (entry) {
                return entry.Last3MonthsProjectsInitiated == '1';
            });

            ltThreeMthProjCompleted = ProjectData.filter(function (entry) {
                return entry.Last3MonthsProjectCompleted == '1';
            });

            ltThreeMthProjOnHold = ProjectData.filter(function (entry) {
                return entry.Last3MonthsProjectOnHold == '1';
            });

            var ds_ProjFinishExec = ds_PortfolioCenter_gridLstThreeMnthsProjFinishExecPopUp(ltThreeMthProjFinishExec);

            var ds_ProjCompleted = ds_PortfolioCenter_gridLstThreeMnthsProjCompletedPopUp(ltThreeMthProjCompleted);

            var ds_ProjInitiated = ds_PortfolioCenter_gridLstThreeMnthsProjInitiatedPopUp(ltThreeMthProjInitiated);

            var ds_ProjOnHold = ds_PortfolioCenter_gridLstThreeMnthsProjHoldPopUp(ltThreeMthProjOnHold);

            var grid = $('#gridLstThreeMnthsProjFinishExecPopUp').data('kendoGrid');
            ds_ProjFinishExec.read();
            grid.setDataSource(ds_ProjFinishExec);

            var grid1 = $('#gridLstThreeMnthsProjCompletedPopUp').data('kendoGrid');
            ds_ProjCompleted.read();
            grid1.setDataSource(ds_ProjCompleted);

            var grid2 = $('#gridLstThreeMnthsProjInitiatedPopUp').data('kendoGrid');
            ds_ProjInitiated.read();
            grid2.setDataSource(ds_ProjInitiated);

            var grid3 = $('#gridLstThreeMnthsProjHoldPopUp').data('kendoGrid');
            ds_ProjOnHold.read();
            grid3.setDataSource(ds_ProjOnHold);

            InitLastWindowData = 2;
        }
        var myWindow = $("#dialogLstMnth");
        myWindow.data("kendoWindow").open();

    };
    function clearLocalStorage() {
        localStorage['selectedPortfolioGridView'] = Default;
        localStorage['myKeyFilter'] = [];
        localStorage["LocalCnt"] = null;
    }


    function initProjectCenter() {
        displayLoading();
        console.log("Getting user AD Id");
        if (buildNo != localStorage["buildNo"]) {
            clearLocalStorage();
            localStorage["buildNo"] = buildNo;
            window.location.href = portfolioCenterpath;
        }
        $.when(GETPostService.getUserAdID()).then(function (userId) {
            console.log("Got user AD Id");
            if (userId != "")
                prepareDataForPortfolioCenter();
            //else window.location.href = errorPagePath;
        });
       //prepareDataForPortfolioCenter();

    };
};