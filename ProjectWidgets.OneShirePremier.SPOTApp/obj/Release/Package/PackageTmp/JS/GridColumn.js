function col_ProjectCharter_GridProjectCharterMilestone() {
    var col = [{
        field: "TaskName",
        title: "Milestone",
        //filterable: true,
    }, {
        field: "TaskFinishDate",
        title: "Planned Finish",
        template: "#= TaskFinishDate ==null ? '' : kendo.toString(kendo.parseDate(new Date(TaskFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #",
        headerAttributes: { "class": "wrap-header" },
        //filterable: true,
    }, {
        field: "FunctionalOwner",
        title: "Functional Owner",
        values: functionalOwnerBulk,
        //filterable: true,
    }, {
        field: "IncludeInCharter",
        title: "Include in Charter Slide",
        template: '<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="chkbx" />',
        headerAttributes: { "class": "wrap-header" },
    }]
    return col;
}

function col_BusinessCaseOption_GridBusinessCaseOptAssumption() {
    var col = [
        {
            field: "KeyAssumption",
            title: "Key Assumption",
        },
        {
            field: "Valid",
            title: "Why Is This Assumption Valid?",
        }];
    return col;
}

function col_BusinessCaseOption_gridProjectCharterKeySuccessCriteria() {
    var col = [
        {
            field: "Metric",
            title: "Metric",
        },
        {
            field: "CurrentState",
            title: "Current State",
        }, {
            field: "TargetPerformance",
            title: "Target Performance",
            headerAttributes: { "class": "wrap-header" },
        },
        {
            field: "IncludeInCharter",
            title: "Include in Charter Slide",
            headerAttributes: { "class": "wrap-header" },
            template: '<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="chkbx" />',
        }];
    return col;
}

function col_ProjectCharter_GridProjectCharterRisk() {
    var col = [{
        field: "IfHappens",
        title: "If This Happens",
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "Result",
        title: "Then This Is The Result...",
    }, {
        field: "Details",
        title: "Details/Mitigation",
        headerAttributes: { "class": "wrap-header" },
        //filterable: true,<span class="k-icon k-i-edit"></span>
    }, {
        field: "IncludeInCharter",
        title: "Include in Charter Slide",
        headerAttributes: { "class": "wrap-header" },
        template: '<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="chkbx" />',
    }];
    return col;
}

function col_ProjectCharter_GridProjectCharterAssumption() {
    var col = [{
        field: "KeyAssumption",
        title: "Key Assumption",
    }, {
        field: "Valid",
        title: "Why Is This Assumption Valid?",
    }, {
        field: "IncludeInCharter",
        title: "Include in Charter Slide",
        headerAttributes: { "class": "wrap-header" },
        template: '<input type="checkbox" #= IncludeInCharter ? \'checked="checked"\' : "" # class="chkbx" />',
    }];
    return col;
}

function col_PortfoliCenter_gridPortfolioCenterProj() {
    //kendo.culture().numberFormat.currency.pattern[0] = "-$n";
    var col = [{
        title: "<span class='title-vertical'></span>",
        //  template: "#if(DataFreshness <= 3) {#<div class='zeroToThree'></div>#} else if(DataFreshness <= 7) {#<div class='fourToSeven'></div>#} else if(DataFreshness <= 14) {#<div class='eightToFourteen '></div>#} else if(DataFreshness <= 30) {#<div class='fifteenToThirty '></div>#} else {#<div class='aboveThirty'></div>#}#",
        attributes: { class: "#if(DataFreshness <= 14) {# zeroToThree #} else if(DataFreshness <= 30) {# fourToSeven #} else if(DataFreshness > 30) {# eightToFourteen #}#" },
        width: 10,
        menu: false,
        locked: true,
        sortable: true,
    }, {
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        width: 35,
        locked: true,
        sortable: true,
    }, {
        field: "PortfolioOwnerName ",
        title: "Portfolio Owner",
        width: 120,
        hidden: true,
        menu: true,
        headerAttributes: { "class": "wrap-header" },
        sortable: true,
        locked: true
    }, {
        field: "ExecutionScope ",
        title: "Execution Scope",
        width: 150,
        hidden: true,
        menu: true,
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "ProblemType ",
        headerAttributes: { "class": "wrap-header" },
        title: "Project Type",
        width: 100,
        hidden: true,
        menu: true,
    }, {
        field: "ProjectName",
        title: "Program / Project Name",
        headerAttributes: { "class": "wrap-header" },
        width: 300,
        filterable: true,
        attributes: { "class": "# if(data.IsArchived === true) { # arrow-grey-dark # } #" },
        locked: true,
        //    template: "<span>#: ProblemID #</span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>"
        //  template: "#if(BudgetID == '') {#<span>ProblemID</span></br><span><a href='${navigateHubUrl}' target='_blank'>ProjectName</a></span>#} else {#<span>ProblemID</span><span>BudgetID</span></br><span><a href='${navigateHubUrl}' target='_blank'>ProjectName</a></span>#}",
        template: "#if(BudgetID != '') { #<span>#: ProblemID # ( #: BudgetID # )</span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>#} else{ #<span>#: ProblemID # </span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>#}#",
    }, {
        field: "Tops",
        width: 80,
        title: "<span class='title-vertical'>TOPS</span>",
        sortable: true,
        //filterable: true,
    }, {
        field: "Phase",
        title: "Phase (Project-Capital-OE)",
        headerAttributes: { "class": "wrap-header" },
        width: 160,
        template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
        filterable: true,
        sortable: true,
    }, {
        field: "ProjStatus",
        title: "State",
        width: 120,
        hidden: true,
        menu: true,
    }, {
        field: "PM",
        title: "PM Sponsor",
        template: "<span>#: PM # </span><br/><span>#: Sponsor # </span>",
        headerAttributes: { "class": "wrap-header" },
        width: 190,
        //filterable: true,
    }, {
        field: "FundingApprovalNeedDate",
        headerAttributes: { "class": "wrap-header" },
        title: "Funding Approval Need Date",
        width: 100,
        hidden: true,
        menu: true,
        template: "#= (FundingApprovalNeedDate ==null || FundingApprovalNeedDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(FundingApprovalNeedDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"

    }, {
        field: "FundingStatus",
        title: "Funding Status",
        headerAttributes: { "class": "wrap-header align-right" },
        width: 120,
        hidden: true,
        menu: true,
    }, {
        field: "ScheduleIndicatorArrow",
        width: 37,
        title: "<span class='title-vertical'>Schedule</span>",
        template: "#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "RiskIndicatorArrow",
        width: 37,
        title: "<span class='title-vertical'>Risks/Issues</span>",
        template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicatorArrow == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicatorArrow == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(RiskIndicatorArrow == 'GreenUp')   {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
        ////filterable: true,
    }, {
        field: "AskNeedIndicatorArrow",
        width: 37,
        title: "<span class='title-vertical'>Ask/Needs</span>",
        attributes: { class: "text-mid" },
        template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        // template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(AskNeedIndicatorArrow == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(AskNeedIndicatorArrow == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(AskNeedIndicatorArrow == 'GreenUp')   {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
    }, {
        field: "BudgetIndicator",
        width: 37,
        title: "<span class='title-vertical'>Budget/Spend</span>",
        attributes: { class: "text-mid" },
        template: "<span class=#:BudgetIndicator#></span>",
    },
    {
        field: "DataCompleteness",
        width: 75,
        title: "DQ%",
        headerAttributes: { "class": "txt-float-R" },
        attributes: { class: "txt-float-R #:DataCompletenessColor#" },
    //    attributes: { style: "text-align:right;" },
    }, {
        field: "OverallStatusDescription ",
        title: "Overall Status (Explanation of status lights)",
        headerAttributes: {
            "class": "wrap-header"
        },
        width: 300,
        hidden: true,
        menu: true,
        attributes: { class: "textwrap1" },
    }, {
        field: "TotalProjectForecast",
        title: "<span>Total CAPEX Approved/ Forecast</span>",
        headerAttributes: { "class": "wrap-header" },
        //filterable: true,
        sortable: true,
        width: 150,
        attributes: { style: "text-align:right;" },
        template: "<span>#: kendo.toString(TotalApprovedCapex, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(TotalProjectForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
        //        template: "<span>#: (TotalApprovedCapex.toString().trim())+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((TotalProjectForecast.toString().trim())+' '+LocalCurrencyAbbreviation)#</span>",

    }, {
        field: "CalculatedEmissionsImpact",
        title: "Carbon Impact (Tons)",
        headerAttributes: { "class": "wrap-header" },
        //filterable: true,
        template: "#= (CalculatedEmissionsImpact===0 || CalculatedEmissionsImpact==='' || CalculatedEmissionsImpact===null)?'':kendo.toString(CalculatedEmissionsImpact, 'n1') #",
     //   template: "#= (ExecutionStartDate ==null || ExecutionStartDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ExecutionStartDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
 
        sortable: true,
        width: 150,
        attributes: { style: "text-align:right;" },
    }, {
        field: "WaterImpactLiters",
        title: "<span>Water Impact</span><br><span>(m3)<span>",
        headerAttributes: { "class": "wrap-header" },
        //filterable: true,
        template: "#= (WaterImpactLiters===0 || WaterImpactLiters==='' || WaterImpactLiters===null)?'':kendo.toString(WaterImpactLiters, 'n1') #",
        //   template: "#= (ExecutionStartDate ==null || ExecutionStartDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ExecutionStartDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"

        sortable: true,
        width: 150,
        attributes: { style: "text-align:right;" },
    },{
        field: "LocalEnergyCostImpactPerYear",
        title: "Energy Cost Impact (Per Year)",
        headerAttributes: {"class": "wrap-header" },
        template: "#= (LocalEnergyCostImpactPerYear===0 || LocalEnergyCostImpactPerYear==='' || LocalEnergyCostImpactPerYear===null)?'':kendo.toString(LocalEnergyCostImpactPerYear, 'n0') #",
        sortable: true,
        hidden: true,
        menu: true,
         width: 150,
             attributes: { style: "text-align:right;" },
         }, {
        field: "TotalForecastPerformanceAbsolute",
        width: "100px",
        title: "TFP(%)",
        attributes: {
            class: "txt-float-R #:TotalForecastPerformanceText#"
        },
        headerAttributes: { "class": "wrap-header align-right" },
        template: '#=kendo.format("{0:p2}", TotalForecastPerformance/100)#',
        hidden: true,
        menu: true,
    }, {
        field: "YTDPlan",
        width: "100px",
        title: "YTD Plan /Actuals",
        headerAttributes: { "class": "wrap-header align-right" },
        template: "<span>#: kendo.toString(YTDPlan, 'n1').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(YTDActual, 'n1').trim())+' '+LocalCurrencyAbbreviation)#</span>",
        hidden: true,
        menu: true,
        attributes: { style: "text-align:right;" },
    }, {
        field: "YearToDatePerformanceAbsolute",
        title: "YTDP(%)",
        width: "100px",
        headerAttributes: { "class": "wrap-header align-right" },
        attributes: { class: "txt-float-R #:YearToDatePerformanceText#" },
        template: '#=kendo.format("{0:p2}", YearToDatePerformance/100)#',
        hidden: true,
        menu: true,
    }, {
        field: "AnnualPlan",
        width: "100px",
        title: "Annual Plan /Forecast",
        headerAttributes: { "class": "wrap-header align-right" },
        template: "<span>#: kendo.toString(AnnualPlan, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(AnnualForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
        hidden: true,
        menu: true,
        attributes: { style: "text-align:right;" },
    }, {
        field: "AnnualForecastPerformanceAbsolute",
        title: "AFP(%)",
        width: "100px",
        attributes: { class: "txt-float-R #:AnnualForecastPerformanceText#" },
        headerAttributes: { "class": "wrap-header align-right" },
        template: '#=kendo.format("{0:p2}", AnnualForecastPerformance/100)#',
        hidden: true,
        menu: true,
    }, {
        field: "PredefinedInvestment",
        title: "Global/Regional Pre-Defined Investment",
        width: "150px",
        headerAttributes: { "class": "wrap-header" },
        hidden: true,
        menu: true,
    }, {
        //    title: "Cumulative Schedule Variance",
        //    headerAttributes: { "class": "wrap-header" },
        //    template: '<div class="chart" style="height:50px"></div>',
        //    width: "10%"
        //}, {
        title: "Milestone / Progression",
        headerAttributes: { "class": "wrap-header" },
        template: '<div class="chartPercentageComplete" style="height:50px"></div>',
        width: 150,
    }, {
        field: "NextMilestone",
        title: "Next Milestone",
        width: 230,
        headerAttributes: { "class": "wrap-header" },
        filterable: true
    }, {
        field: "NextMilestoneFinishDate",
        title: "Next Milestone Planned Finish Date",
        headerAttributes: { "class": "wrap-header" },
        filterable: true,
        width: 120,
        template: "#= (NextMilestoneFinishDate ==null || NextMilestoneFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(NextMilestoneFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ExecutionStartDate",
        title: "Execution Start Date",
        headerAttributes: { "class": "wrap-header" },
        filterable: true,
        width: 120,
        hidden: true,
        menu: true,
        attributes: { "class": "# if(data.ProjectStartIsLate === true) { # arrow-red # } #" },
        template: "#= (ExecutionStartDate ==null || ExecutionStartDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ExecutionStartDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ExecutionCompleteDate",
        title: "Execution Complete Date",
        headerAttributes: { "class": "wrap-header" },
        filterable: true,
        width: 120,
      //  hidden: true,
        menu: true,
        attributes: { "class": "# if(data.ProjectIsLate === true) { # arrow-red # } #" },
        template: "#= (ExecutionCompleteDate ==null || ExecutionCompleteDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ExecutionCompleteDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ExecutionDuration",
        title: "Execution Duration (Days)",
        headerAttributes: { "class": "wrap-header" },
        filterable: true,
        width: 120,
        attributes: { class: "txt-float-R" },
     //   hidden: true,
        menu: true,
        template: "<span>#: ExecutionDuration # </span><br/><span> #: ExecutionDurationComment # </span>",
    },
    {
        field: "ProjectPlannedFinishDate",
        title: "Planned Project Complete Date",
        headerAttributes: { "class": "wrap-header" },
        width: 120,
        filterable: true,
        hidden: true,
        menu: true,
        template: "#= (ProjectPlannedFinishDate ==null || ProjectPlannedFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ProjectPlannedFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ProjectCompleteVarianceDays",
        title: "Project Complete Variance (Days)",
        headerAttributes: { "class": "wrap-header" },
        hidden: true,
        menu: true,
        width: 120,
        attributes: { class: "txt-float-R" },
        template: "#= ProjectCompleteVarianceDays == 'NA'? 'NA': ProjectCompleteVarianceDays +' days'#",
    }, {
        field: "NextSteps",
        title: "Next Priorities",
        headerAttributes: { "class": "wrap-header" },
        width: 350,
        hidden: true,
        menu: true,
        attributes: { class: "textwrap1" },
    }, {
        field: "RecentAccomplishments",
        title: "Recent Accomplishments",
        headerAttributes: { "class": "wrap-header" },
        width: 350,
        hidden: true,
        menu: true,
        attributes: { class: "textwrap1" },
    }, {
        field: "BudgetCommentary",
        title: "Budget Commentary",
        headerAttributes: { "class": "wrap-header" },
        hidden: true,
        menu: true,
        width: 350,
        attributes: { class: "textwrap1" },
    },
        //{
        //    field: "ProjectClassification",
        //    title: "Project Classification",
        //    headerAttributes: { "class": "wrap-header" },
        //    hidden: true,
        //    menu: true,
        //    width: 120,
        //}, {
        //    field: "DevelopmentCRNo",
        //    title: "Development CR#",
        //    headerAttributes: { "class": "wrap-header" },
        //    hidden: true,
        //    menu: true,
        //    width: 120,
        //}
        //, {
        //    field: "DevelopmentCRApprovalDate",
        //    title: "Development CR Approval Date",
        //    headerAttributes: { "class": "wrap-header" },
        //    hidden: true,
        //    menu: true,
        //    width: 100,
        //    template: "#= (DevelopmentCRApprovalDate ==null || DevelopmentCRApprovalDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(DevelopmentCRApprovalDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
        //},
        {
            field: "DefinitiveCRNo",
            title: "CAR ID",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "DefinitiveCRApprovalDate",
            title: "CAR Approval Date",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
            template: "#= (DefinitiveCRApprovalDate ==null || DefinitiveCRApprovalDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(DefinitiveCRApprovalDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
        }, {
            field: "OEProjectType",
            title: "OE Project Type",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "IsOEProject",
            title: "OE Project",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "IsTechTransfer",
            title: "Tech Transfer",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "IsQAReference",
            title: "QA Reference",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "QAReferenceType",
            title: "QA Reference Type",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "QAReferenceNo",
            title: "QA Reference #",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "PrimaryProductTitle",
            title: "Primary Product",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            title: "C/B Ratio",
            field: "CBRatio",
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            attributes: { class: "txt-float-R" },
        }, {
            field: "OverallBenefitScore",
            title: "<span>Overall</span><br/><span>Benefit Score</span>",
            filterable: true,
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            attributes: { class: "txt-float-R" },
        }, {
            title: "Agile Primary Workstream",
            field: "AgilePrimaryWorkstream",
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
        }, {
            field: "AgileSecondaryWorkstream",
            title: "Agile Secondary Workstream",
            filterable: true,
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
        }, {
            field: "AgileWave",
            title: "Agile Wave",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "StrategicYear",
            title: "Strategic Year",
            filterable: true,
            width: 100,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
        }, {
            field: "AnnualMustWin",
            title: "Annual Must Win",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 120,
        }]

    return col;
}

function col_PortfoliCenter_gridPortfolioCenterProjCapitalView() {
    // kendo.culture().numberFormat.currency.pattern[0] = "-n";
    var col = [{
        title: "<span class='title-vertical'></span>",
        //  template: "#if(DataFreshness <= 3) {#<div class='zeroToThree'></div>#} else if(DataFreshness <= 7) {#<div class='fourToSeven'></div>#} else if(DataFreshness <= 14) {#<div class='eightToFourteen '></div>#} else if(DataFreshness <= 30) {#<div class='fifteenToThirty '></div>#} else {#<div class='aboveThirty'></div>#}#",
        attributes: { class: "#if(DataFreshness <= 14) {# zeroToThree #} else if(DataFreshness <= 30) {# fourToSeven #} else if(DataFreshness > 30) {# eightToFourteen #}#" },
        width: 10,
        menu: false,
        locked: true
    }, {
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        width: 30,
        locked: true,
        sortable: true,
    },
    {
        field: "PortfolioOwnerName ",
        title: "Portfolio Owner",
        width: 120,
        headerAttributes: { "class": "wrap-header" },
        sortable: true,
    }, {
        field: "ExecutionScope ",
        title: "Execution Scope",
        width: 150,
        hidden: true,
        menu: true,
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "BudgetID",
        title: "Budget ID",
        width: 100,
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "ProblemID",
        title: "SPOT ID",
        width: 80,
        headerAttributes: { "class": "wrap-header" },
        sortable: true,
        locked: true,
    }, {
        field: "ProblemType ",
        headerAttributes: { "class": "wrap-header" },
        title: "Project Type",
        width: 100,
        hidden: true,
        menu: true,
        sortable: true,
    }, {
        field: "ProjectName",
        title: "Program / Project Name",
        headerAttributes: { "class": "wrap-header" },
        width: 200,
        filterable: true,
        //    template: "<span>#: ProblemID #</span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>"
        //  template: "#if(BudgetID == '') {#<span>ProblemID</span></br><span><a href='${navigateHubUrl}' target='_blank'>ProjectName</a></span>#} else {#<span>ProblemID</span><span>BudgetID</span></br><span><a href='${navigateHubUrl}' target='_blank'>ProjectName</a></span>#}",
        template: "<span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>",
        locked: true,
        sortable: true,

    }, {
        field: "Tops",
        width: 60,
        title: "<span class='title-vertical'>TOPS</span>",
        //filterable: true,
        sortable: true,
    }, {
        field: "Phase",
        title: "Phase (Project-Capital-OE)",
        headerAttributes: { "class": "wrap-header" },
        width: 100,
        template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
        filterable: true,
        sortable: true,
    }, {
        field: "ProjStatus",
        title: "State",
        width: 100,
        hidden: true,
        menu: true,
    }, {
        field: "PM",
        title: "PM Sponsor",
        template: "<span>#: PM # </span><br/><span>#: Sponsor # </span>",
        headerAttributes: { "class": "wrap-header" },
        width: 100,
        //filterable: true,
    }, {
        field: "FundingApprovalNeedDate",
        headerAttributes: { "class": "wrap-header" },
        title: "Funding Approval Need Date",
        width: 100,

        template: "#= (FundingApprovalNeedDate ==null || FundingApprovalNeedDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(FundingApprovalNeedDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"

    }, {
        field: "FundingStatus",
        title: "Funding Status",
        headerAttributes: { "class": "wrap-header align-right" },
        width: 120,
        hidden: true,
        menu: true,
    }, {
        field: "ScheduleIndicatorArrow",
        width: 37,
        title: "<span class='title-vertical'>Schedule</span>",
        template: "#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "RiskIndicatorArrow",
        width: 37,
        title: "<span class='title-vertical'>Risks/Issues</span>",
        template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicatorArrow == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicatorArrow == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(RiskIndicatorArrow == 'GreenUp')   {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
        ////filterable: true,
    }, {
        field: "AskNeedIndicatorArrow",
        width: 37,
        title: "<span class='title-vertical'>Ask/Needs</span>",
        attributes: { class: "text-mid" },
        template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        // template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(AskNeedIndicatorArrow == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(AskNeedIndicatorArrow == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(AskNeedIndicatorArrow == 'GreenUp')   {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
    }, {
        field: "BudgetIndicator",
        width: 37,
        title: "<span class='title-vertical'>Budget/Spend</span>",

        template: "<span class=#:BudgetIndicator#></span>",
    },
    {
        field: "DataCompleteness",
        width: 75,
        title: "DQ%",
        headerAttributes: { "class": "txt-float-R" },
        attributes: { class: "txt-float-R #:DataCompletenessColor#" },
    },
   {
       field: "OverallStatusDescription ",
       title: "Overall Status (Explanation of status lights)",
       headerAttributes: {
           "class": "wrap-header"
       },
       width: 350,
       attributes: { class: "textwrap1" },
   }, {
       field: "TotalProjectForecast",
       title: "<span>Total CAPEX Approved/ Forecast</span>",
       headerAttributes: { "class": "wrap-header" },
       sortable: true,
       width: 110,
       attributes: { style: "text-align:right;" },
       template: "<span>#: kendo.toString(TotalApprovedCapex, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(TotalProjectForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
       //template: "<span>#: (kendo.toString(TotalApprovedCapex, 'c0')).trim()#</span><br/><span>#: (kendo.toString(TotalProjectForecast, 'c0')).trim()#</span>",
   }, {
       field: "LocalEnergyCostImpactPerYear",
       title: "Energy Cost Impact (Per Year)",
       headerAttributes: { "class": "wrap-header" },
       template: "#= (LocalEnergyCostImpactPerYear===0 || LocalEnergyCostImpactPerYear==='' || LocalEnergyCostImpactPerYear===null)?'':kendo.toString(LocalEnergyCostImpactPerYear, 'n0') #",
       sortable: true,
       width: 150,
       hidden: true,
       menu: true,
       attributes: { style: "text-align:right;" },
   }, {
       field: "TotalForecastPerformanceAbsolute",
       width: "100px",
       title: "TFP(%)",
       attributes: {
           class: "txt-float-R #:TotalForecastPerformanceText#"
       },
       headerAttributes: { "class": "wrap-header align-right" },
       template: '#=kendo.format("{0:p2}", TotalForecastPerformance/100)#',
   }, {
       field: "YTDPlan",
       width: "100px",
       title: "YTD Plan /Actuals",
       headerAttributes: { "class": "wrap-header align-right" },
       template: "<span>#: kendo.toString(YTDPlan, 'n1').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(YTDActual, 'n1').trim())+' '+LocalCurrencyAbbreviation)#</span>",

       //  template: "<span>#: (kendo.toString(YTDPlan, 'c0')).trim()#</span><br/><span>#: (kendo.toString(YTDActual, 'c0')).trim()#</span>",
       //  template: "<span>#: (YTDPlan.toString().trim())+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((YTDActual.toString().trim())+' '+LocalCurrencyAbbreviation)#</span>",
       attributes: { style: "text-align:right;" },
   }, {
       field: "YearToDatePerformanceAbsolute",
       title: "YTDP(%)",
       width: "100px",
       headerAttributes: { "class": "wrap-header align-right" },
       attributes: { class: "txt-float-R #:YearToDatePerformanceText#" },
       template: '#=kendo.format("{0:p2}", YearToDatePerformance/100)#'
   }, {
       field: "AnnualPlan",
       width: "100px",
       title: "Annual Plan /Forecast",
       attributes: { style: "text-align:right;" },
       headerAttributes: { "class": "wrap-header align-right" },
       template: "<span>#: kendo.toString(AnnualPlan, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(AnnualForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",

       // template: "<span>#: (AnnualPlan.toString().trim())+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((AnnualForecast.toString().trim())+' '+LocalCurrencyAbbreviation)#</span>",
       //  template: "<span>#: (kendo.toString(AnnualPlan, 'c0')).trim()#</span><br/><span>#: (kendo.toString(AnnualForecast, 'c0')).trim()#</span>",
       attributes: { style: "text-align:right;" },
   }, {
       field: "AnnualForecastPerformanceAbsolute",
       title: "AFP(%)",
       width: "100px",
       attributes: { class: "txt-float-R #:AnnualForecastPerformanceText#" },
       headerAttributes: { "class": "wrap-header align-right" },
       template: '#=kendo.format("{0:p2}", AnnualForecastPerformance/100)#',
   }, {
       field: "PredefinedInvestment",
       title: "Global/Regional Pre-Defined Investment",
       width: "150px",
       headerAttributes: { "class": "wrap-header" },
       hidden: true,
       menu: true,
   }, {
       //    title: "Cumulative Schedule Variance",
       //    headerAttributes: { "class": "wrap-header" },
       //    template: '<div class="chart" style="height:50px"></div>',
       //    width: "10%"
       //}, {
       title: "Milestone / Progression",
       headerAttributes: { "class": "wrap-header" },
       template: '<div class="chartPercentageCompleteCV" style="height:50px"></div>',
       width: 120,
   }, {
       field: "NextMilestone",
       title: "Next Milestone",
       width: 100,
       headerAttributes: { "class": "wrap-header" },
       filterable: true
   }, {
       field: "NextMilestoneFinishDate",
       title: "Next Milestone Planned Finish Date",
       headerAttributes: { "class": "wrap-header" },
       filterable: true,
       width: 100,
       template: "#= (NextMilestoneFinishDate ==null || NextMilestoneFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(NextMilestoneFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
   }, {
       field: "ExecutionStartDate",
       title: "Execution Start Date",
       headerAttributes: { "class": "wrap-header" },
       filterable: true,
       width: 120,
       hidden: true,
       menu: true,
       attributes: { "class": "# if(data.ProjectStartIsLate === true) { # arrow-red # } #" },
       template: "#= (ExecutionStartDate ==null || ExecutionStartDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ExecutionStartDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
   }, {
       field: "ExecutionCompleteDate",
       title: "Execution Complete Date",
       headerAttributes: { "class": "wrap-header" },
       filterable: true,
       width: 120,
    //   hidden: true,
       menu: true,
       attributes: { "class": "# if(data.ProjectIsLate === true) { # arrow-red # } #" },
       template: "#= (ExecutionCompleteDate ==null || ExecutionCompleteDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ExecutionCompleteDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
   }, {
       field: "ExecutionDuration",
       title: "Execution Duration (Days)",
       headerAttributes: { "class": "wrap-header" },
       filterable: true,
       width: 120,
       attributes: { class: "txt-float-R" },
     //  hidden: true,
       menu: true,
       template: "<span>#: ExecutionDuration # </span><br/><span> #: ExecutionDurationComment # </span>",
   }, {
       field: "ProjectPlannedFinishDate",
       title: "Planned Project Complete Date",
       headerAttributes: { "class": "wrap-header" },
       width: 100,
       filterable: true,
       hidden: true,
       menu: true,
       template: "#= (ProjectPlannedFinishDate ==null || ProjectPlannedFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ProjectPlannedFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
   }, {
       field: "ProjectCompleteVarianceDays",
       title: "Project Complete Variance (Days)",
       headerAttributes: { "class": "wrap-header" },
       width: 100,
       hidden: true,
       menu: true,
       attributes: { class: "txt-float-R" },
       template: "#= ProjectCompleteVarianceDays == 'NA'? 'NA': ProjectCompleteVarianceDays +' days'#",
   }, {
       field: "NextSteps",
       title: "Next Priorities",
       headerAttributes: { "class": "wrap-header" },
       width: 350,
       hidden: true,
       menu: true,
       attributes: { class: "textwrap1" },
   }, {
       field: "RecentAccomplishments",
       title: "Recent Accomplishments",
       headerAttributes: { "class": "wrap-header" },
       width: 350,
       hidden: true,
       menu: true,
       attributes: { class: "textwrap1" },
   }, {
       field: "BudgetCommentary",
       title: "Budget Commentary",
       headerAttributes: { "class": "wrap-header" },
       hidden: true,
       menu: true,
       width: 350,
       attributes: { class: "textwrap1" },
        },
        {
             field: "DefinitiveCRNo",
             title: "CAR ID",
             headerAttributes: { "class": "wrap-header" },
             hidden: true,
             menu: true,
             width: 100,
         }, {
             field: "DefinitiveCRApprovalDate",
             title: "CAR Approval Date",
             headerAttributes: { "class": "wrap-header" },
             hidden: true,
             menu: true,
             width: 100,
             template: "#= (DefinitiveCRApprovalDate ==null || DefinitiveCRApprovalDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(DefinitiveCRApprovalDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"

         }, {
             field: "OEProjectType",
             title: "OE Project Type",
             headerAttributes: { "class": "wrap-header" },
             hidden: true,
             menu: true,
             width: 100,
         }, {
             field: "IsOEProject",
             title: "OE Project",
             headerAttributes: { "class": "wrap-header" },
             hidden: true,
             menu: true,
             width: 100,
         }, {
             field: "IsTechTransfer",
             title: "Tech Transfer",
             headerAttributes: { "class": "wrap-header" },
             hidden: true,
             menu: true,
             width: 100,
         }, {
             field: "IsQAReference",
             title: "QA Reference",
             headerAttributes: { "class": "wrap-header" },
             hidden: true,
             menu: true,
             width: 100,
         }, {
             field: "QAReferenceType",
             title: "QA Reference Type",
             headerAttributes: { "class": "wrap-header" },
             hidden: true,
             menu: true,
             width: 100,
         }
        , {
            field: "QAReferenceNo",
            title: "QA Reference #",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "PrimaryProductTitle",
            title: "Primary Product",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            title: "C/B Ratio",
            field: "CBRatio",
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            attributes: { class: "txt-float-R" },
        }, {
            field: "OverallBenefitScore",
            title: "<span>Overall</span><br/><span>Benefit Score</span>",
            filterable: true,
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            attributes: { class: "txt-float-R" },
        }, {
            title: "Agile Primary Workstream",
            field: "AgilePrimaryWorkstream",
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
        }, {
            field: "AgileSecondaryWorkstream",
            title: "Agile Secondary Workstream",
            filterable: true,
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
        }
        , {
            field: "AgileWave",
            title: "Agile Wave",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "StrategicYear",
            title: "Strategic Year",
            filterable: true,
            width: 100,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
        }, {
            field: "AnnualMustWin",
            title: "Annual Must Win",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 120,
        }
    ]
    return col;
}

function col_PortfoliCenter_gridPortfolioCenterProjLocal() {
    
    var col = [{
        title: "<span class='title-vertical'></span>",
        //  template: "#if(DataFreshness <= 3) {#<div class='zeroToThree'></div>#} else if(DataFreshness <= 7) {#<div class='fourToSeven'></div>#} else if(DataFreshness <= 14) {#<div class='eightToFourteen '></div>#} else if(DataFreshness <= 30) {#<div class='fifteenToThirty '></div>#} else {#<div class='aboveThirty'></div>#}#",
        attributes: { class: "#if(DataFreshness <= 14) {# zeroToThree #} else if(DataFreshness <= 30) {# fourToSeven #} else if(DataFreshness > 30) {# eightToFourteen #}#" },
        width: 10,
        menu: false,
        locked: true
    }, {
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        width: 30,
        locked: true
    }, {
        field: "PortfolioOwnerName ",
        title: "Portfolio Owner",
        width: 120,
        hidden: true,
        menu: true,
        headerAttributes: { "class": "wrap-header" },
        sortable: true,
    }, {
        field: "ExecutionScope ",
        title: "Execution Scope",
        width: 150,
        hidden: true,
        menu: true,
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "ProblemType ",
        headerAttributes: { "class": "wrap-header" },
        title: "Project Type",
        width: 100,
        hidden: true,
        menu: true,
    }, {
        field: "ProjectName",
        title: "Program / Project Name",
        headerAttributes: { "class": "wrap-header" },
        width: 300,
        filterable: true,
        //    template: "<span>#: ProblemID #</span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>"
        //  template: "#if(BudgetID == '') {#<span>ProblemID</span></br><span><a href='${navigateHubUrl}' target='_blank'>ProjectName</a></span>#} else {#<span>ProblemID</span><span>BudgetID</span></br><span><a href='${navigateHubUrl}' target='_blank'>ProjectName</a></span>#}",
        template: "#if(BudgetID != '') { #<span>#: ProblemID # ( #: BudgetID # )</span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>#} else{ #<span>#: ProblemID # </span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>#}#",
        locked: true
    }, {
        field: "Tops",
        width: 80,
        title: "<span class='title-vertical'>TOPS</span>",
        //filterable: true,
        sortable: true,
    }, {
        field: "Phase",
        title: "Phase (Project-Capital-OE)",
        headerAttributes: { "class": "wrap-header" },
        width: 150,
        template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
        //   template: "#if(CapitalPhaseAbbreviation != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # </span>#} else{ #<span>#: Phase # </span>#}#",
        filterable: true,
        sortable: true,
    }, {
        field: "ProjStatus",
        title: "State",
        width: 100,
        hidden: true,
        menu: true,
    }, {
        field: "PM",
        title: "PM Sponsor",
        template: "<span>#: PM # </span><br/><span>#: Sponsor # </span>",
        headerAttributes: { "class": "wrap-header" },
        width: 180,
        //filterable: true,
    }, {
        field: "FundingApprovalNeedDate",
        headerAttributes: { "class": "wrap-header" },
        title: "Funding Approval Need Date",
        width: 100,
        hidden: true,
        menu: true,
        template: "#= (FundingApprovalNeedDate ==null || FundingApprovalNeedDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(FundingApprovalNeedDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"

    }, {
        field: "FundingStatus",
        title: "Funding Status",
        headerAttributes: { "class": "wrap-header align-right" },
        width: 120,
        hidden: true,
        menu: true,
    }, {
        field: "ScheduleIndicatorArrow",
        width: 37,
        title: "<span class='title-vertical'>Schedule</span>",
        template: "#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "RiskIndicatorArrow",
        width: 37,
        title: "<span class='title-vertical'>Risks/Issues</span>",
        template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicatorArrow == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicatorArrow == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(RiskIndicatorArrow == 'GreenUp')   {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
        ////filterable: true,
    }, {
        field: "AskNeedIndicatorArrow",
        width: 37,
        title: "<span class='title-vertical'>Ask/Needs</span>",
        attributes: { class: "text-mid" },
        template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        // template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(AskNeedIndicatorArrow == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(AskNeedIndicatorArrow == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(AskNeedIndicatorArrow == 'GreenUp')   {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
    }, {
        field: "BudgetIndicator",
        width: 37,
        title: "<span class='title-vertical'>Budget/Spend</span>",
        attributes: { class: "text-mid" },
        template: "<span class=#:BudgetIndicator#></span>",
        //template: "#if(BudgetIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
        // "else if(BudgetIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
        //"else if(BudgetIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
        //"else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //  template: "#if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(BudgetIndicator == 'GreenDown')   {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
        //    template: "#if(BudgetIndicatorArrow == 'GreyStop') {#<a><span class='k-icon k-i-stop arrow-grey-dark'></span></a>#} else if(BudgetIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicatorArrow == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicatorArrow == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(BudgetIndicatorArrow == 'GreenUp'){#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    },
    {
        field: "DataCompleteness",
        width: 75,
        title: "DQ%",
        headerAttributes: { "class": "txt-float-R" },
        attributes: { class: "txt-float-R #:DataCompletenessColor#" },
    }, {
        field: "OverallStatusDescription ",
        title: "Overall Status (Explanation of status lights)",
        headerAttributes: {
            "class": "wrap-header"
        },
        width: 350,
        hidden: true,
        menu: true,
        attributes: { class: "textwrap1" },
    }, {
        field: "TotalProjectForecast",
        title: "<span>Total CAPEX Approved/ Forecast</span>",
        headerAttributes: { "class": "wrap-header" },
        //filterable: true,
        sortable: true,
        width: 110,
        attributes: { style: "text-align:right;" },
        //template: "<span>#: (kendo.toString(TotalApprovedCapex, 'c0')).trim()#</span><br/><span>#: (kendo.toString(TotalProjectForecast, 'c0')).trim()#</span>",
        //    template: "<span>#: (TotalApprovedCapex.toString().trim())+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((TotalProjectForecast.toString().trim())+' '+LocalCurrencyAbbreviation)#</span>",
        template: "<span>#: kendo.toString(TotalApprovedCapex, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(TotalProjectForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
    }, {
        field: "LocalEnergyCostImpactPerYear",
        title: "Energy Cost Impact (Per Year)",
        headerAttributes: { "class": "wrap-header" },
        template: "#= (LocalEnergyCostImpactPerYear===0 || LocalEnergyCostImpactPerYear==='' || LocalEnergyCostImpactPerYear===null)?'':kendo.toString(LocalEnergyCostImpactPerYear, 'n0') #",
        sortable: true,
        hidden: true,
        menu: true,
        width: 150,
        attributes: { style: "text-align:right;" },
    }, {
        field: "TotalForecastPerformanceAbsolute",
        width: "100px",
        title: "TFP(%)",
        attributes: {
            class: "txt-float-R #:TotalForecastPerformanceText#"
        },
        headerAttributes: { "class": "wrap-header align-right" },
        template: '#=kendo.format("{0:p2}", TotalForecastPerformance/100)#',
        hidden: true,
        menu: true,
    }, {
        field: "YTDPlan",
        width: "100px",
        title: "YTD Plan /Actuals",
        headerAttributes: { "class": "wrap-header align-right" },
        template: "<span>#: kendo.toString(YTDPlan, 'n1').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(YTDActual, 'n1').trim())+' '+LocalCurrencyAbbreviation)#</span>",

        //     template: "<span>#: (YTDPlan.toString().trim())+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((YTDActual.toString().trim())+' '+LocalCurrencyAbbreviation)#</span>",
        // template: "<span>#: (kendo.toString(YTDPlan, 'c0')).trim()#</span><br/><span>#: (kendo.toString(YTDActual, 'c0')).trim()#</span>",
        hidden: true,
        menu: true,
        attributes: { style: "text-align:right;" },
    }, {
        field: "YearToDatePerformanceAbsolute",
        title: "YTDP(%)",
        width: "100px",
        headerAttributes: { "class": "wrap-header align-right" },
        attributes: { class: "txt-float-R #:YearToDatePerformanceText#" },
        template: '#=kendo.format("{0:p2}", YearToDatePerformance/100)#',
        hidden: true,
        menu: true,
    }, {
        field: "AnnualPlan",
        width: "100px",
        title: "Annual Plan /Forecast",
        headerAttributes: { "class": "wrap-header align-right" },
        template: "<span>#: kendo.toString(AnnualPlan, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(AnnualForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",

        //  template: "<span>#: (AnnualPlan.toString().trim())+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((AnnualForecast.toString().trim())+' '+LocalCurrencyAbbreviation)#</span>",
        //   template: "<span>#: (kendo.toString(AnnualPlan, 'c0')).trim()#</span><br/><span>#: (kendo.toString(AnnualForecast, 'c0')).trim()#</span>",
        hidden: true,
        menu: true,
        attributes: { style: "text-align:right;" },
    }, {
        field: "AnnualForecastPerformanceAbsolute",
        title: "AFP(%)",
        width: "100px",
        attributes: { class: "txt-float-R #:AnnualForecastPerformanceText#" },
        headerAttributes: { "class": "wrap-header align-right" },
        template: '#=kendo.format("{0:p2}", AnnualForecastPerformance/100)#',
        hidden: true,
        menu: true,
    }, {
        field: "PredefinedInvestment",
        title: "Global/Regional Pre-Defined Investment",
        width: "150px",
        headerAttributes: { "class": "wrap-header" },
        hidden: true,
        menu: true,
    },{
        //    title: "Cumulative Schedule Variance",
        //    headerAttributes: { "class": "wrap-header" },
        //    template: '<div class="chart" style="height:50px"></div>',
        //    width: "10%"
        //}, {
        title: "Milestone / Progression",
        headerAttributes: { "class": "wrap-header" },
        template: '<div class="chartPercentageCompleteLv" style="height:50px"></div>',
        width: 150,
    }, {
        field: "NextMilestone",
        title: "Next Milestone",
        width: 200,
        headerAttributes: { "class": "wrap-header" },
        filterable: true
    }, {
        field: "NextMilestoneFinishDate",
        title: "Next Milestone Planned Finish Date",
        headerAttributes: { "class": "wrap-header" },
        filterable: true,
        width: 100,
        template: "#= (NextMilestoneFinishDate ==null || NextMilestoneFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(NextMilestoneFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ExecutionStartDate",
        title: "Execution Start Date",
        headerAttributes: { "class": "wrap-header" },
        filterable: true,
        width: 120,
        hidden: true,
        menu: true,
        attributes: { "class": "# if(data.ProjectStartIsLate === true) { # arrow-red # } #" },
        template: "#= (ExecutionStartDate ==null || ExecutionStartDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ExecutionStartDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ExecutionCompleteDate",
        title: "Execution Complete Date",
        headerAttributes: { "class": "wrap-header" },
        filterable: true,
        width: 120,
     //   hidden: true,
        menu: true,
        attributes: { "class": "# if(data.ProjectIsLate === true) { # arrow-red # } #" },
        template: "#= (ExecutionCompleteDate ==null || ExecutionCompleteDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ExecutionCompleteDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ExecutionDuration",
        title: "Execution Duration (Days)",
        headerAttributes: { "class": "wrap-header" },
        filterable: true,
        width: 120,
        attributes: { class: "txt-float-R" },
      //  hidden: true,
        menu: true,
        template: "<span>#: ExecutionDuration # </span><br/><span> #: ExecutionDurationComment # </span>",
    }, {
        field: "ProjectPlannedFinishDate",
        title: "Planned Project Complete Date",
        headerAttributes: { "class": "wrap-header" },
        width: 100,
        filterable: true,
        hidden: true,
        menu: true,
        template: "#= (ProjectPlannedFinishDate ==null || ProjectPlannedFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ProjectPlannedFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ProjectCompleteVarianceDays",
        title: "Project Complete Variance (Days)",
        headerAttributes: { "class": "wrap-header" },
        hidden: true,
        menu: true,
        menu: true,
        width: 100,
        attributes: { class: "txt-float-R" },
        template: "#= ProjectCompleteVarianceDays == 'NA'? 'NA': ProjectCompleteVarianceDays +' days'#",
    }, {
        field: "NextSteps",
        title: "Next Priorities",
        headerAttributes: { "class": "wrap-header" },
        width: 350,
        hidden: true,
        menu: true,
        attributes: { class: "textwrap1" },
    }, {
        field: "RecentAccomplishments",
        title: "Recent Accomplishments",
        headerAttributes: { "class": "wrap-header" },
        width: 350,
        hidden: true,
        menu: true,
        attributes: { class: "textwrap1" },
    }, {
        field: "BudgetCommentary",
        title: "Budget Commentary",
        headerAttributes: { "class": "wrap-header" },
        hidden: true,
        menu: true,
        width: 350,
        attributes: { class: "textwrap1" },
        },
    //    {
    //    field: "ProjectClassification",
    //    title: "Project Classification",
    //    headerAttributes: { "class": "wrap-header" },
    //    hidden: true,
    //    menu: true,
    //    width: 120,
    //}
    //    , {
    //        field: "DevelopmentCRNo",
    //        title: "Development CR#",
    //        headerAttributes: { "class": "wrap-header" },
    //        hidden: true,
    //        menu: true,
    //        width: 120,
    //    }
    //    , {
    //        field: "DevelopmentCRApprovalDate",
    //        title: "Development CR Approval Date",
    //        headerAttributes: { "class": "wrap-header" },
    //        hidden: true,
    //        menu: true,
    //        width: 120,
    //        template: "#= (DevelopmentCRApprovalDate ==null || DevelopmentCRApprovalDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(DevelopmentCRApprovalDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    //    },
        {
            field: "DefinitiveCRNo",
            title: "CAR ID",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "DefinitiveCRApprovalDate",
            title: "CAR Approval Date",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
            template: "#= (DefinitiveCRApprovalDate ==null || DefinitiveCRApprovalDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(DefinitiveCRApprovalDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"

        }, {
            field: "OEProjectType",
            title: "OE Project Type",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "IsOEProject",
            title: "OE Project",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "IsTechTransfer",
            title: "Tech Transfer",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "IsQAReference",
            title: "QA Reference",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "QAReferenceType",
            title: "QA Reference Type",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 200,
        }, {
            field: "QAReferenceNo",
            title: "QA Reference #",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 200,
        }, {
            field: "PrimaryProductTitle",
            title: "Primary Product",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            title: "C/B Ratio",
            field: "CBRatio",
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            attributes: { class: "txt-float-R" },
        }, {
            field: "OverallBenefitScore",
            title: "<span>Overall</span><br/><span>Benefit Score</span>",
            filterable: true,
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            attributes: { class: "txt-float-R" },
        }, {
            title: "Agile Primary Workstream",
            field: "AgilePrimaryWorkstream",
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
        }, {
            field: "AgileSecondaryWorkstream",
            title: "Agile Secondary Workstream",
            filterable: true,
            width: 120,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
        }, {
            field: "AgileWave",
            title: "Agile Wave",
            headerAttributes: {
                "class": "wrap-header"
            },
            hidden: true,
            menu: true,
            width: 100,
        }, {
            field: "StrategicYear",
            title: "Strategic Year",
            filterable: true,
            width: 100,
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
        }, {
            field: "AnnualMustWin",
            title: "Annual Must Win",
            headerAttributes: { "class": "wrap-header" },
            hidden: true,
            menu: true,
            width: 120,
        }];

    return col;
}

function col_PortfolioCenter_gridPriorityPopUp() {
    //  kendo.culture().numberFormat.currency.pattern[0] = "-$n";
    var col = [{
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        // template: "#if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(OverallStatus == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(OverallStatus == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        width: "3%"
    },
    {
        field: "ProblemID",
        title: "<span>Project Id/</span></br><span>Budget Id</span>",
        template: "<span>#: ProblemID # </span><br/><span>#: BudgetID # </span>"
        //filterable: true,
    }, {
        field: "ProjectName",
        title: "Program/Project Name",
        width: "18%",
        template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
    }, {
        field: "Tops",
        width: "4%",
        title: "<span class='title-vertical'>TOPS</span>",
    }, {
        field: "Phase",
        title: "Phase (Project-Capital-OE)",
        width: "12%",
        headerAttributes: { "class": "wrap-header" },
        template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
        // template: "#if(CapitalPhaseAbbreviation != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # </span>#} else{ #<span>#: Phase # </span>#}#",
    }, {
        field: "PM",
        title: "<span>PM</span></br><span>Sponsor</span>",
        template: "<span>#: PM #</span><br/><span>#: Sponsor #</span>"
        //filterable: true,
    }, {
        field: "PrimaryProductTitle",
        title: "<span>Primary</span><br/><span>Product</span>",
    },{
        title: "C/B Ratio",
        field: "CBRatio",
        width: "10%",
        attributes: { class: "txt-float-R" },
    }, {
        field: "OverallBenefitScore",
        title: "<span>Overall</span><br/><span>Benefit Score</span>",
        filterable: true,
        width: "9%",
        attributes: { class: "txt-float-R" },
    }, {
        template: "<span>#: kendo.toString(TotalApprovedCapex, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(TotalProjectForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
        //template: "<span>#: kendo.toString(TotalApprovedCapex, 'c0') # </span><br/><span>#: kendo.toString(TotalProjectForecast, 'c0') # </span>",
        title: "<span>Total CAPEX Approved/ Forecast</span>",
        headerAttributes: { "class": "wrap-header" },
        attributes: { style: "text-align:right;" },
    }];
    return col;
};

function col_PortfolioCenter_gridBudgetPopUp() {
    var col = [{
        field: "Tops",
        title: "TOPS",
        //filterable: true,
    }, {
        field: "Phase",
        title: "Phase",
        //filterable: true,
    }, {
        field: "BudgetID",
        title: "Budget ID",
        //filterable: true,
    }, {
        field: "ProjectName",
        title: "Record Name",


    }, {
        //     template: "#if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(OverallStatus == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(OverallStatus == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#}#",
        field: "OverallStatusOrder",
        title: "Overall Status",
        attributes: { class: "text-mid" },
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "RecordOwner",
        title: "LBE",
        template: "$15M",
        //filterable: true,
    }, {
        field: "ProjectMgr",
        title: "Actuals",
        template: "$2M",
        //filterable: true,
    }, {
        template: "Approved",
        field: "DataFershness",
        title: "Lifecycle Phase",
    }];
    return col;
};

function col_PortfolioCenter_gridLateMilestonePopUp() {
    var col = [{
        template: "",
        field: "StatusIndicator",
        title: " ",
        attributes: { class: "#:StatusIndicator#" },
        width: "1%"
    }, {
        template: "#if(Linked == 1) {#<span class='k-icon k-i-link-vertical'></span>#}#",
        title: " ",
        width: "4%",
    }, {
        field: "Milestone",
        title: "Milestone",
        width: "20%",
        //filterable: true,
    }, {
        field: "ProjectName",
        title: "Project Name",
        width: "20%",
        template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
    }, {
        field: "PM",
        title: "PM",
        //filterable: true,
    }, {
        field: "FunctionalGroupOwner",
        title: "Functional Owner"
    }, {
        field: "BaselineFinish",
        title: "Baseline Finish",
        template: "#= BaselineFinish ==null ? '' : kendo.toString(kendo.parseDate(BaselineFinish, 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "PlannedFinish",
        title: "Planned Finish",
        template: "#= PlannedFinish ==null ? '' : kendo.toString(kendo.parseDate(PlannedFinish, 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "Variance",
        title: "Variance",
        width: "10%",
        attributes: {
            class: "txt-float-R"
        },
        template: "#= Variance == 'NA'? 'NA': Variance +' days'#",
    }];
    return col;
};

function col_PortfolioCenter_gridNxtThreeMnthsMilestonePopUp() {
    var c = [{
        template: "",
        field: "StatusIndicator",
        title: " ",
        attributes: { class: "#:StatusIndicator#" },
        width: "1%"
    }, {
        template: "#if(Linked == 1) {#<span class='k-icon k-i-link-vertical'></span>#}#",
        title: " ",
        width: "4%",
    }, {
        field: "Milestone",
        title: "Milestone",
        width: "20%",
        headerAttributes: { "class": "wrap-header" },
        //filterable: true,
    }, {
        field: "ProjectName",
        title: "Project Name",
        headerAttributes: { "class": "wrap-header" },
        width: "20%",
        template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
    }, {
        field: "PM",
        title: "PM",
        //filterable: true,
    }, {
        field: "FunctionalGroupOwner",
        title: "Functional Owner",
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "BaselineFinish",
        title: "Baseline Finish",
        headerAttributes: { "class": "wrap-header" },
        template: "#= BaselineFinish ==null ? '' : kendo.toString(kendo.parseDate(BaselineFinish, 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "PlannedFinish",
        title: "Planned Finish",
        headerAttributes: { "class": "wrap-header" },
        template: "#= PlannedFinish ==null ? '' : kendo.toString(kendo.parseDate(PlannedFinish, 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "Variance",
        title: "Variance",
        headerAttributes: { "class": "wrap-header" },
        template: "#= Variance == 'NA'? 'NA': Variance +' days'#",
        attributes: { class: "txt-float-R" },
    }];
    return c;
};

function ds_PortfolioCenter_gridNxtThreeMnthsMilestonePopUp(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        data: datasource,
        sort: [{
            field: "BaselineFinish",
            dir: "asc"
        }, {
            field: "PlannedFinish",
            dir: "asc"
        }],
        batch: true,
        schema: {
            model: {
                fields: {
                    StatusIndicator: { type: "string" },
                    Milestone: { type: "string" },
                    ProjectName: { type: "string" },
                    FunctionalGroupOwner: { type: "string" },
                    BaselineFinish: {
                        type: "date"
                    },
                    PlannedFinish: {
                        type: "date"
                    }
                }
            }
        },
    });

    return dataSource1;

};

function col_PortfolioCenter_gridNxtThreeMnthsProjectPopUp() {
    // kendo.culture().numberFormat.currency.pattern[0] = "-$n";
    var col = [{
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        // template: "#if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(OverallStatus == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(OverallStatus == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        width: "3%"
    }, {
        field: "ProjectName",
        title: "Program/Project Name",
        width: "18%",
        template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
    }, {
        field: "Tops",
        width: "4%",
        title: "<span class='title-vertical'>TOPS</span>",
    }, {
        field: "Phase",
        title: "Phase (Project-Capital-OE)",
        width: "12%",
        headerAttributes: { "class": "wrap-header" },
        template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
        //  template: "#if(CapitalPhaseAbbreviation != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # </span>#} else{ #<span>#: Phase # </span>#}#",
    }, {
        field: "PM",
        title: "<span>PM</span></br><span>Sponsor</span>",
        template: "<span>#: PM #</span><br/><span>#: Sponsor #</span>"
        //filterable: true,
    }, {
        field: "ScheduleIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Schedule</span>",
        template: "#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //    template: "#if(ScheduleIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(ScheduleIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(ScheduleIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown')   {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#}  else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
    }, {
        field: "RiskIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Risks/Issues</span>",
        //  template: "#if(RiskIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(RiskIndicator == 'GreenDown')   {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
        //filterable: true,
        template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "AskNeedIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Ask/Needs</span>",
        attributes: { class: "text-mid" },
        template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "BudgetIndicator",
        width: "3%",
        title: "<span class='title-vertical'>Budget/Spend</span>",
        attributes: { class: "text-mid" },
        //  template: "#if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(BudgetIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#} #",
        //  template: "#if(BudgetIndicator == 'GreyStop') {#<a><span class='k-icon k-i-stop arrow-grey-dark'></span></a>#} else if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //     template: "#if(BudgetIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
        // "else if(BudgetIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
        //"else if(BudgetIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
        //"else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "<span class=#:BudgetIndicator#></span>",
    }, {
        template: "<span>#: kendo.toString(TotalApprovedCapex, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(TotalProjectForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
        //template: "<span>#: kendo.toString(TotalApprovedCapex, 'c0')#</span><br/><span>#: kendo.toString(TotalProjectForecast, 'c0')#</span>",
        title: "<span>Total CAPEX Approved/ Forecast</span>",
        headerAttributes: { "class": "wrap-header" },
        attributes: { style: "text-align:right;" },
        width: "9%",
    }, {
        field: "NextMilestone",
        title: "<span>Next</span></br><span>Milestone</span>",
        filterable: true
    }, {
        field: "NextMilestoneFinishDate",
        title: "<span>Planned</span></br><span>Finish</span></br><span>Date</span>",
        filterable: true,
        template: "#= (NextMilestoneFinishDate ==null || NextMilestoneFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(NextMilestoneFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ProjectPlannedFinishDate",
        title: "<span>Planned</span></br><span>Project</span></br><span>Complete</span></br><span>Date</span>",
        filterable: true,
        template: "#= (ProjectPlannedFinishDate ==null || ProjectPlannedFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ProjectPlannedFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }];
    return col;
};

function ds_PortfolioCenter_gridNxtThreeMnthsProjectPopUp(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        data: datasource,
        sort: {
            field: "ProjectPlannedFinishDate",
            dir: "asc"
        },
        batch: true,
        schema: {
            model: {
                fields: {
                    Tops: { type: "string" },
                    Change: { type: "string" },
                    Phase: { type: "string" },
                    ProblemID: { type: "string" },
                    BudgetID: { type: "string" },
                    ProjectName: { type: "string" },
                    OverallStatus: { type: "string" },
                    PortfolioOwnerName: { type: "string" },
                    PM: { type: "string" },
                    DataFreshness: { type: "string" }
                }
            }
        },

    });

    return dataSource1;

};

function col_PortfolioCenter_gridLstThreeMnthsMileCompletedPopUp() {
    var col = [{
        template: "",
        field: "StatusIndicator",
        title: " ",
        attributes: { class: "#:StatusIndicator#" },
        headerAttributes: { "class": "wrap-header" },
        width: "1%"
    }, {
        template: "#if(Linked == 1) {#<span class='k-icon k-i-link-vertical'></span>#}#",
        title: " ",
        width: "4%",
    }, {
        field: "Milestone",
        title: "Milestone",
        width: "20%",
        //filterable: true,
    }, {
        field: "ProjectName",
        title: "Project Name",
        width: "20%",
        headerAttributes: { "class": "wrap-header" },
        template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
        //filterable: true,
    }, {
        field: "PM",
        title: "PM",
        //filterable: true,
    }, {
        field: "FunctionalGroupOwner",
        title: "Functional Owner",
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "BaselineFinish",
        title: "Baseline Finish",
        template: "#= BaselineFinish ==null ? '' : kendo.toString(kendo.parseDate(BaselineFinish, 'yyyy-MM-dd'), 'dd-MMM-yy') #",
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "PlannedFinish",
        title: "Planned Finish",
        template: "#= PlannedFinish ==null ? '' : kendo.toString(kendo.parseDate(PlannedFinish, 'yyyy-MM-dd'), 'dd-MMM-yy') #",
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "CompletionDate",
        title: "Completed Date",
        template: "#= CompletionDate ==null ? '' : kendo.toString(kendo.parseDate(CompletionDate, 'yyyy-MM-dd'), 'dd-MMM-yy') #",
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "Variance",
        title: "Variance",
        attributes: { class: "txt-float-R" },
        template: "#= Variance == 'NA'? 'NA': Variance +' days'#",
    }];
    return col;
};

function ds_PortfolioCenter_gridLstThreeMnthsMileCompletedPopUp(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        data: datasource,
        sort: {
            field: "CompletionDate",
            dir: "desc"
        },
        batch: true,
        schema: {
            model: {
                fields: {
                    Tops: { type: "string" },
                    Change: { type: "string" },
                    Phase: { type: "string" },
                    ProblemID: { type: "string" },
                    BudgetID: { type: "string" },
                    ProjectName: { type: "string" },
                    OverallStatus: { type: "string" },
                    PortfolioOwnerName: { type: "string" },
                    PM: { type: "string" },
                    DataFreshness: { type: "string" },
                    CapitalPhaseAbbreviation: { type: "string" },
                    OEPhaseAbbreviation: { type: "string" },

                }
            }
        },

    });

    return dataSource1;
};

function col_PortfolioCenter_gridLstThreeMnthsProjFinishExecPopUp() {
    //  kendo.culture().numberFormat.currency.pattern[0] = "-$n";
    var col = [{
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        //   template: "#if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(OverallStatus == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(OverallStatus == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        width: "3%"
    }, {
        field: "ProjectName",
        title: "Project Name",
        width: "18%",
        template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
    }, {
        field: "Tops",
        width: "4%",
        title: "<span class='title-vertical'>TOPS</span>",
        //filterable: true,
    }, {
        field: "Phase",
        title: "Phase (Project-Capital-OE)",
        width: "12%",
        headerAttributes: { "class": "wrap-header" },
        template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
        //  template: "#if(CapitalPhaseAbbreviation != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # </span>#} else{ #<span>#: Phase # </span>#}#",
    }, {
        field: "PM",
        title: "<span>PM</span></br><span>Sponsor</span>",
        template: "<span>#: PM #</span><br/><span>#: Sponsor #</span>"
        //filterable: true,
    }, {
        field: "ScheduleIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Schedule</span>",
        template: "#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "RiskIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Risks/Issues</span>",
        //   template: "#if(RiskIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(RiskIndicator == 'GreenDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "AskNeedIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Ask/Needs</span>",
        attributes: { class: "text-mid" },
        //  template: "#if(AskNeedIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(AskNeedIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(AskNeedIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(AskNeedIndicator == 'GreenDown')   {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "BudgetIndicator",
        width: "3%",
        title: "<span class='title-vertical'>Budget</span>",
        attributes: { class: "text-mid" },
        //   template: "#if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(BudgetIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //template: "#if(BudgetIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
        // "else if(BudgetIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
        //"else if(BudgetIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
        //"else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "<span class=#:BudgetIndicator#></span>",
    }, {
        template: "<span>#: kendo.toString(TotalApprovedCapex, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(TotalProjectForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
        //        template: "<span>#: (TotalApprovedCapex.toString().trim())+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((TotalProjectForecast.toString().trim())+' '+LocalCurrencyAbbreviation)#</span>",
        //template: "<span>#: (kendo.toString(TotalApprovedCapex, 'c0')).trim()#</span><br/><span>#: (kendo.toString(TotalProjectForecast, 'c0')).trim()#</span>",
        title: "<span>Total CAPEX Approved/ Forecast</span>",
        headerAttributes: { "class": "wrap-header" },
        attributes: { style: "text-align:right;" },
    }, {
        field: "NextMilestone",
        title: "<span>Next</span></br><span>Milestone</span>",
        filterable: true
    }, {
        field: "NextMilestoneFinishDate",
        title: "<span>Planned</span></br><span>Finish</span></br><span>Date</span>",
        filterable: true,
        template: "#= (NextMilestoneFinishDate ==null || NextMilestoneFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(NextMilestoneFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ProjectPlannedFinishDate",
        title: "<span>Planned</span></br><span>Project</span></br><span>Complete</span></br><span>Date</span>",
        filterable: true,
        template: "#= (ProjectPlannedFinishDate ==null || ProjectPlannedFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ProjectPlannedFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }];
    return col;
};

function ds_PortfolioCenter_gridLstThreeMnthsProjFinishExecPopUp(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        data: datasource,
        batch: true,
        schema: {
            model: {
                fields: {
                    ProjectName: { type: "string" },
                    OverallStatusArrow: { type: "string" },
                    Tops: { type: "string" },
                    Phase: { type: "string" },
                    PM: { type: "string" },
                    Sponsor: { type: "string" },
                    ScheduleIndicatorArrow: { type: "string" },
                    RiskIndicatorArrow: { type: "string" },
                    BudgetIndicator: { type: "string" },
                    AskNeedIndicatorArrow: { type: "string" },
                    ApprovedAmount: { type: "string" },
                    NextMilestone: { type: "string" },
                    NextMilestoneFinishDate: { type: "string" },
                    ProjectPlanned: { type: "string" }
                }
            }
        },

    });

    return dataSource1;
};

function col_PortfolioCenter_gridLstThreeMnthsProjCompletedPopUp() {
    // kendo.culture().numberFormat.currency.pattern[0] = "-$n";
    var col = [{
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        // template: "#if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(OverallStatus == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(OverallStatus == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        width: "3%"
    }, {
        field: "ProjectName",
        title: "Project Name",
        width: "18%",
        template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
    }, {
        field: "Tops",
        width: "4%",
        title: "<span class='title-vertical'>TOPS</span>",
        //filterable: true,
    }, {
        field: "Phase",
        title: "Phase (Project-Capital-OE)",
        width: "12%",
        headerAttributes: { "class": "wrap-header" },
        template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
        //    template: "#if(CapitalPhaseAbbreviation != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # </span>#} else{ #<span>#: Phase # </span>#}#",
    }, {
        field: "PM",
        title: "<span>PM</span></br><span>Sponsor</span>",
        template: "<span>#: PM #</span><br/><span>#: Sponsor #</span>"
        //filterable: true,
    }, {
        field: "ScheduleIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Schedule</span>",
        // template: "#if(ScheduleIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(ScheduleIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(ScheduleIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template:"#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "RiskIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Risks/Issues</span>",
        //    template: "#if(RiskIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(RiskIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "AskNeedIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Ask/Needs</span>",
        attributes: { class: "text-mid" },
        // template: "#if(AskNeedIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(AskNeedIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(AskNeedIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(AskNeedIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "BudgetIndicator",
        width: "3%",
        title: "<span class='title-vertical'>Budget</span>",
        attributes: { class: "text-mid" },
        //  template: "#if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(BudgetIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //   template: "#if(BudgetIndicator == 'GreyStop') {#<a><span class='k-icon k-i-stop arrow-grey-dark'></span></a>#} else if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        // template: "#if(BudgetIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
        // "else if(BudgetIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
        //"else if(BudgetIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
        //"else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "<span class=#:BudgetIndicator#></span>",
    }, {
        template: "<span>#: kendo.toString(TotalApprovedCapex, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(TotalProjectForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
        //  template: "<span>#: (kendo.toString(TotalApprovedCapex, 'c0')).trim()#</span><br/><span>#: (kendo.toString(TotalProjectForecast, 'c0')).trim()#</span>",
        title: "<span>Total CAPEX Approved/ Forecast</span>",
        headerAttributes: { "class": "wrap-header" },
        attributes: { style: "text-align:right;" },
    }, {
        field: "ProjectPlannedFinishDate",
        title: "<span>Planned</span></br><span>Project</span></br><span>Complete</span></br><span>Date</span>",
        filterable: true,
        template: "#= (ProjectPlannedFinishDate ==null || ProjectPlannedFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ProjectPlannedFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ProjectPlannedFinishDate",
        title: "<span>Actual</span></br><span>Project</span></br><span>Finish</span></br><span>Date</span>",
        filterable: true,
        template: "#= (ProjectPlannedFinishDate ==null || ProjectPlannedFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ProjectPlannedFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ProjectCompleteVarianceDays",
        title: "Variance",
        filterable: true,
        attributes: { class: "txt-float-R" },
        template: "#= ProjectCompleteVarianceDays == 'NA'? 'NA': ProjectCompleteVarianceDays +' days'#",
    }];
    return col;
};

function ds_PortfolioCenter_gridLstThreeMnthsProjCompletedPopUp(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        data: datasource,
        batch: true,
        schema: {
            model: {
                fields: {
                    ProjectName: { type: "string" },
                    OverallStatusArrow: { type: "string" },
                    Tops: { type: "string" },
                    Phase: { type: "string" },
                    PM: { type: "string" },
                    Sponsor: { type: "string" },
                    ScheduleIndicatorArrow: { type: "string" },
                    RiskIndicatorArrow: { type: "string" },
                    BudgetIndicator: { type: "string" },
                    AskNeedIndicatorArrow: { type: "string" },
                    ApprovedAmount: { type: "string" },
                    NextMilestone: { type: "string" },
                    ProjectPlanned: { type: "string" },
                    NextMilestoneFinishDate: { type: "string" },
                }
            }
        },

    });

    return dataSource1;
};

function col_PortfolioCenter_gridLstThreeMnthsProjInitiatedPopUp() {
    // kendo.culture().numberFormat.currency.pattern[0] = "-$n";
    var col = [{
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        //  template: "#if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(OverallStatus == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(OverallStatus == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        width: "3%"
    }, {
        field: "ProjectName",
        title: "Project Name",
        width: "18%",
        template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
    }, {
        field: "Tops",
        width: "4%",
        title: "<span class='title-vertical'>TOPS</span>",
        //filterable: true,
    }, {
        field: "Phase",
        title: "Phase (Project-Capital-OE)",
        width: "12%",
        headerAttributes: { "class": "wrap-header" },
        template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
        // template: "#if(CapitalPhaseAbbreviation != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # </span>#} else{ #<span>#: Phase # </span>#}#",
    }, {
        field: "PM",
        title: "<span>PM</span></br><span>Sponsor</span>",
        template: "<span>#: PM #</span><br/><span>#: Sponsor #</span>"
        //filterable: true,
    }, {
        field: "ScheduleIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Schedule</span>",
        template: "#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //    template: "#if(ScheduleIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(ScheduleIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(ScheduleIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "RiskIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Risks/Issues</span>",
        //  template: "#if(RiskIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(RiskIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "AskNeedIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Ask/Needs</span>",
        attributes: { class: "text-mid" },
        //   template: "#if(AskNeedIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(AskNeedIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(AskNeedIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(AskNeedIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "BudgetIndicator",
        width: "3%",
        title: "<span class='title-vertical'>Budget</span>",
        attributes: { class: "text-mid" },
        //  template: "#if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(BudgetIndicator == 'GreenDown')  {#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //    template: "#if(BudgetIndicator == 'GreyStop') {#<a><span class='k-icon k-i-stop arrow-grey-dark'></span></a>#} else if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //   template: "#if(BudgetIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
        // "else if(BudgetIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
        //"else if(BudgetIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
        //"else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "<span class=#:BudgetIndicator#></span>",

    }, {
        template: "<span>#: kendo.toString(TotalApprovedCapex, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(TotalProjectForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
        //   template: "<span>#: (kendo.toString(TotalApprovedCapex, 'c0')).trim()#</span><br/><span>#: (kendo.toString(TotalProjectForecast, 'c0')).trim()#</span>",
        title: "<span>Total CAPEX Approved/ Forecast</span>",
        headerAttributes: { "class": "wrap-header" },
        attributes: { style: "text-align:right;" },
    }, {
        field: "NextMilestone",
        title: "<span>Next</span></br><span>Milestone</span>",
        filterable: true
    }, {
        field: "NextMilestoneFinishDate",
        title: "<span>Planned</span></br><span>Finish</span></br><span>Date</span>",
        filterable: true,
        template: "#= (NextMilestoneFinishDate ==null || NextMilestoneFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(NextMilestoneFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ProjectPlannedFinishDate",
        title: "<span>Planned</span></br><span>Project</span></br><span>Complete</span></br><span>Date</span>",
        filterable: true,
        template: "#= (ProjectPlannedFinishDate ==null || ProjectPlannedFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ProjectPlannedFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }];
    return col;
};

function ds_PortfolioCenter_gridLstThreeMnthsProjInitiatedPopUp(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        data: datasource,
        batch: true,
        schema: {
            model: {
                fields: {
                    ProjectName: { type: "string" },
                    OverallStatusArrow: { type: "string" },
                    Tops: { type: "string" },
                    Phase: { type: "string" },
                    PM: { type: "string" },
                    Sponsor: { type: "string" },
                    ScheduleIndicatorArrow: { type: "string" },
                    RiskIndicatorArrow: { type: "string" },
                    BudgetIndicator: { type: "string" },
                    AskNeedIndicatorArrow: { type: "string" },
                    ApprovedAmount: { type: "string" },
                    NextMilestone: { type: "string" },
                    ProjectPlanned: { type: "string" },
                    NextMilestoneFinishDate: { type: "string" },
                }
            }
        },

    });

    return dataSource1;
};

function col_PortfolioCenter_gridLstThreeMnthsProjHoldPopUp() {
    // kendo.culture().numberFormat.currency.pattern[0] = "-$n";
    var col = [{
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        //     template: "#if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(OverallStatus == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(OverallStatus == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        width: "3%"
    }, {
        field: "ProjectName",
        title: "Project Name",
        width: "18%",
        template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
    }, {
        field: "Tops",
        width: "4%",
        title: "<span class='title-vertical'>TOPS</span>",
        //filterable: true,
    }, {
        field: "Phase",
        title: "Phase (Project-Capital-OE)",
        width: "12%",
        headerAttributes: { "class": "wrap-header" },
        template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
        //   template: "<span>#: Phase # - #: CapitalPhaseAbbreviation # </span>",
    }, {
        field: "PM",
        title: "<span>PM</span></br><span>Sponsor</span>",
        template: "<span>#: PM #</span><br/><span>#: Sponsor #</span>"
        //filterable: true,
    }, {
        field: "ScheduleIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Schedule</span>",
        template: "#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //  template: "#if(ScheduleIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(ScheduleIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(ScheduleIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "RiskIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Risks/Issues</span>",
        //   template: "#if(RiskIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "AskNeedIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Ask/Needs</span>",
        attributes: { class: "text-mid" },
        //     template: "#if(AskNeedIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(AskNeedIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(AskNeedIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",

    }, {
        field: "BudgetIndicator",
        width: "3%",
        title: "<span class='title-vertical'>Budget</span>",
        attributes: { class: "text-mid" },
        //     template: "#if(BudgetIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
        // "else if(BudgetIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
        //"else if(BudgetIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
        //"else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //  template: "#if(BudgetIndicator == 'GreyStop') {#<a><span class='k-icon k-i-stop arrow-grey-dark'></span></a>#} else if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        // template: "#if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "<span class=#:BudgetIndicator#></span>",
    }, {
        template: "<span>#: kendo.toString(TotalApprovedCapex, 'n0').trim()+' '+ LocalCurrencyAbbreviation #</span><br/><span>#: ((kendo.toString(TotalProjectForecast, 'n0').trim())+' '+LocalCurrencyAbbreviation)#</span>",
        //  template: "<span>#: (kendo.toString(TotalApprovedCapex, 'c0')).trim()#</span><br/><span>#: (kendo.toString(TotalProjectForecast, 'c0')).trim()#</span>",
        title: "<span>Total CAPEX Approved/ Forecast</span>",
        headerAttributes: { "class": "wrap-header" },
        attributes: { style: "text-align:right;" },
    }, {
        field: "NextMilestone",
        title: "<span>Next</span></br><span>Milestone</span>",
        filterable: true
    }, {
        field: "NextMilestoneFinishDate",
        title: "<span>Planned</span></br><span>Finish</span></br><span>Date</span>",
        filterable: true,
        template: "#= (NextMilestoneFinishDate ==null || NextMilestoneFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(NextMilestoneFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }, {
        field: "ProjectPlannedFinishDate",
        title: "<span>Planned</span></br><span>Project</span></br><span>Complete</span></br><span>Date</span>",
        filterable: true,
        template: "#= (ProjectPlannedFinishDate ==null || ProjectPlannedFinishDate =='') ? '' : kendo.toString(kendo.parseDate(new Date(ProjectPlannedFinishDate), 'yyyy-MM-dd'), 'dd-MMM-yy') #"
    }];
    return col;
};

function ds_PortfolioCenter_gridLstThreeMnthsProjHoldPopUp(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        data: datasource,
        batch: true,
        schema: {
            model: {
                fields: {
                    ProjectName: { type: "string" },
                    OverallStatusArrow: { type: "string" },
                    Tops: { type: "string" },
                    Phase: { type: "string" },
                    PM: { type: "string" },
                    Sponsor: { type: "string" },
                    ScheduleIndicatorArrow: { type: "string" },
                    RiskIndicatorArrow: { type: "string" },
                    BudgetIndicator: { type: "string" },
                    AskNeedIndicatorArrow: { type: "string" },
                    ApprovedAmount: { type: "string" },
                    NextMilestone: { type: "string" },
                    NextMilestoneFinishDate: { type: "string" },
                    ProjectPlanned: { type: "string" }
                }
            }
        },

    });

    return dataSource1;
};

function col_PortfolioCenter_gridProjectPerformance(hidePreliminary) {
    // kendo.culture().numberFormat.currency.pattern[0] = "-$n";
    var col = [{
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        //  template: "#if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(OverallStatus == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(OverallStatus == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        sortable: false,
        width: "30px",
        locked: true, lockable: false,
    }, {
        field: "ProjectName",
        headerAttributes: { "class": "wrap-header" },
        //title: "Project/Program Name",
        title: "Project ID (Budget ID) Project Name",
        width: "150px",
        sortable: false,
        template: "#if(BudgetID != '') { #<span>#: ProblemID # ( #: BudgetID # )</span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>#} else{ #<span>#: ProblemID # </span></br><span><a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a></span>#}#",
        locked: true, lockable: false,
    }, {
        field: "PM",
        title: "<span>PM</span></br><span>Sponsor</span>",
        template: "<span>#: PM #</span><br/><span>#: Sponsor #</span>",
        width: "130px",
        sortable: false,
        //filterable: true,
    }, {
        field: "ProjStatus",
        width: "60px",
        headerAttributes: { "class": "wrap-header" },
        sortable: false,
        title: "Project State",
        //filterable: true,
    }, {
        field: "Phase",
        title: "Phase",
        width: "60px",
        sortable: false,
        //template: "<span>#: Phase # - #: CapitalPhaseAbbreviation # </span>",
    }, {
        field: "CapitalPhaseName",
        title: "Capital Phase",
        headerAttributes: { "class": "wrap-header" },
        width: "80px",
        sortable: false,
    }, {
        field: "ScheduleIndicatorArrow",
        width: "30px",
        sortable: false,
        title: "<span class='title-vertical'>Schedule</span>",
        template: "#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //   template: "#if(ScheduleIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(ScheduleIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(ScheduleIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "RiskIndicatorArrow",
        width: "30px",
        sortable: false,
        title: "<span class='title-vertical'>Risks/Issues</span>",
        //  template: "#if(RiskIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "AskNeedIndicatorArrow",
        width: "30px",
        sortable: false,
        title: "<span class='title-vertical'>Ask/Needs</span>",
        attributes: { class: "text-mid" },
        template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "BudgetIndicator",
        width: "30px",
        sortable: false,
        title: "<span class='title-vertical'>Budget</span>",
        attributes: { class: "text-mid" },
        //  template: "#if(BudgetIndicator == 'GreyStop') {#<a><span class='k-icon k-i-stop arrow-grey-dark'></span></a>#} else if(BudgetIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(BudgetIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(BudgetIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //       template: "#if(BudgetIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
        // "else if(BudgetIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
        //"else if(BudgetIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
        //"else if(BudgetIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
        //"else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "<span class=#:BudgetIndicator#></span>",
    }, {
        field: "TotalProjectForecast",
        width: "100px",
        //  template: "<span>#: (kendo.toString(TotalProjectForecast, 'c0')).trim()#</span>",
        title: "Total CAPEX",
        headerAttributes: { "class": "wrap-header  align-right" },
        attributes: { style: "text-align:right;" },
        template: "<span>#: (kendo.toString(TotalProjectForecast, 'n0').trim()+' '+LocalCurrencyAbbreviation)#</span>",
    }, {
        field: "TotalForecastPerformanceAbsolute",
        width: "60px",
        title: "TFP(%)",
        attributes: {
            class: "txt-float-R #:TotalForecastPerformanceText#"
        },
        headerAttributes: { "class": "wrap-header align-right" },
        template: '#=kendo.format("{0:p2}", TotalForecastPerformance/100)#',
    }, {
        field: "TotalForecastPerformanceValue",
        width: "100px",
        title: "TFP",
        attributes: {
            class: "txt-float-R #:TotalForecastPerformanceText#"
        },
        headerAttributes: { "class": "wrap-header align-right" },
        // template: '#=kendo.format("{0:c0}", TotalForecastPerformanceValue)#',
        template: "#= (kendo.toString(TotalForecastPerformanceValue, 'n0').trim())+' '+ LocalCurrencyAbbreviation #",
    }, {
        field: "TotalYear",
        width: "100px",
        title: "Annual Forecast",
        attributes: {
            class: "txt-float-R"
        },
        headerAttributes: { "class": "wrap-header align-right" },
        //  template: '#=kendo.format("{0:c0}", TotalYear)#',
        template: "#= (kendo.toString(TotalYear, 'n0').trim())+' '+ LocalCurrencyAbbreviation #",
    }, {
        field: "AnnualForecastPerformanceAbsolute",
        title: "AFP(%)",
        width: "60px",
        attributes: { class: "txt-float-R #:AnnualForecastPerformanceText#" },
        headerAttributes: { "class": "wrap-header align-right" },
        template: '#=kendo.format("{0:p2}", AnnualForecastPerformance/100)#'
    }, {
        field: "AnnualForecastPerformanceValue",
        title: "AFP",
        width: "100px",
        attributes: { class: "txt-float-R #:AnnualForecastPerformanceText#" },
        headerAttributes: { "class": "wrap-header align-right" },
        template: "#= (kendo.toString(AnnualForecastPerformanceValue, 'n0').trim())+' '+ LocalCurrencyAbbreviation #",
        //  template: '#=kendo.format("{0:c0}", AnnualForecastPerformanceValue)#'
    }, {
        field: "AFPDevCode",
        title: "AFP Dev Code",
        width: "80px",
        headerAttributes: { "class": "wrap-header" },
    }, {
        field: "YearToDatePerformanceAbsolute",
        title: "YTDP(%)",
        width: "60px",
        headerAttributes: { "class": "wrap-header align-right" },
        attributes: { class: "txt-float-R #:YearToDatePerformanceText#" },
        template: '#=kendo.format("{0:p2}", YearToDatePerformance/100)#'
    }, {
        field: "YearToDatePerformanceValue",
        title: "YTDP",
        width: "100px",
        headerAttributes: { "class": "wrap-header align-right" },
        attributes: { class: "txt-float-R #:YearToDatePerformanceText#" },
        template: "#=kendo.toString(YearToDatePerformanceValue, 'n0').trim() +' '+ LocalCurrencyAbbreviation #",
        //  template: '#=kendo.format("{0:c0}", YearToDatePerformanceValue)#'
    }, {
        field: "MonthToDatePerformanceAbsolute",
        title: "MTDP(%)",
        width: "60px",
        headerAttributes: { "class": "wrap-header align-right" },
        attributes: { class: "txt-float-R #:MonthToDatePerformanceText#" },
        template: '#=kendo.format("{0:p2}", MonthToDatePerformance/100)#'
    }, {
        field: "MonthToDatePerformanceValue",
        width: "100px",
        title: "MTDP",
        headerAttributes: { "class": "wrap-header align-right" },
        attributes: { class: "txt-float-R #:MonthToDatePerformanceText#" },
        template: "#= (kendo.toString(MonthToDatePerformanceValue, 'n0').trim())+' '+ LocalCurrencyAbbreviation #",
        // template: '#=kendo.format("{0:c0}", MonthToDatePerformanceValue)#'
    }
        , {
            field: "MTDPDevCode",
            width: "80px",
            title: "MTDP Dev Code",
            headerAttributes: { "class": "wrap-header" },
        },
        //{
        //    field: "IsForecastSubmitted",
        //    width: "80px",
        //    title: "Current Period Submitted?",
        //    headerAttributes: { "class": "wrap-header" },
        //},
        {
            field: "LastSubmittedBy",
            width: "90px",
            title: "Period Submitted By",
            headerAttributes: { "class": "wrap-header" },
        }, {
            field: "LastSubmitted",
            width: "110px",
            title: "Period Submitted Date/Time",
            headerAttributes: { "class": "wrap-header" },
            template: "#= LastSubmitted ==null ? '' : kendo.toString(kendo.parseDate(new Date(LastSubmitted), 'yyyy-MM-dd'), 'dd-MMM-yy  hh:mm:ss') #",
        }, {
            field: "SubmitReference",
            width: "80px",
            title: "Period Submitted Reference",
            headerAttributes: { "class": "wrap-header" },
            hidden: hidePreliminary,
        }];


    return col;
};

function ds_PortfolioCenter_gridProjectPerformance(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        data: datasource,
        pageSize: 500,
        batch: true,
        sort: {
            field: "AnnualForecastPerformance",
            dir: "desc"
        },
        schema: {
            model: {
                fields: {
                    ProjectName: { type: "string" },
                    OverallStatusArrow: { type: "string" },
                    Tops: { type: "string" },
                    Phase: { type: "string" },
                    PM: { type: "string" },
                    Sponsor: { type: "string" },
                    ScheduleIndicatorArrow: { type: "string" },
                    RiskIndicatorArrow: { type: "string" },
                    BudgetIndicator: { type: "string" },
                    AskNeedIndicatorArrow: { type: "string" },
                    TotalProjectForecast: { type: "decimal" },
                    AnnualForecastPerformance: { type: "decimal" },
                    YearToDatePerformance: { type: "decimal" },
                    TotalForecastPerformance: { type: "decimal" },
                    MonthToDatePerformance: { type: "decimal" },
                    TotalForecastPerformanceAbsolute: { type: "decimal" },
                    AnnualForecastPerformanceAbsolute: { type: "decimal" },

                    YearToDatePerformanceAbsolute: { type: "decimal" },
                    MonthToDatePerformanceAbsolute: { type: "decimal" },
                    LastSubmitted: { type: "date" },
                    LastSubmittedBy: { type: "string" },
                    IsForecastSubmitted: { type: "string" },
                    MTDPDevCode: { type: "string" },
                    MonthToDatePerformanceValue: { type: "decimal" },
                    YearToDatePerformanceValue: { type: "decimal" },
                    AnnualForecastPerformanceValue: { type: "decimal" },
                    TotalYear: { type: "decimal" },
                    TotalForecastPerformanceValue: { type: "decimal" },
                    AFPDevCode: { type: "string" },
                }
            }
        },

    });

    return dataSource1;
};

function col_PortfolioCenter_gridForecastSubmission(hidePreliminary) {
    var col = [{
        field: "OverallStatusOrder",
        title: "<span class='title-vertical'>Overall Status</span>",
        // template: "#if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(OverallStatus == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(OverallStatus == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(OverallStatus == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(OverallStatusArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(OverallStatusArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(OverallStatusArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(OverallStatusArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        width: "3%"
    }, {
        field: "ProjectName",
        title: "Project/Program Name",
        width: "20%",
        template: "<a href='${navigateHubUrl}' target='_blank'>#: ProjectName #</a>"
    }, {
        field: "Tops",
        width: "5%",
        title: "<span class='title-vertical'>TOPS</span>",
        //filterable: true,
    }, {
        field: "Phase",
        title: "Phase (Project-Capital-OE)",
        headerAttributes: { "class": "wrap-header" },
        width: "10%",
        //template: "<span>#: Phase # - #: CapitalPhaseAbbreviation # </span>",
        template: "#if(Phase != '') { #<span>#: Phase # - #: CapitalPhaseAbbreviation # -  #: OEPhaseAbbreviation #</span>#}#",
    }, {
        field: "PM",
        title: "<span>PM</span></br><span>Sponsor</span>",
        template: "<span>#: PM #</span><br/><span>#: Sponsor #</span>",
        width: "10%",
        //filterable: true,
    }, {
        field: "ScheduleIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Schedule</span>",
        template:"#if(ScheduleIndicatorArrow == 'PurpleStop') {#<a><span class='k-icon k-i-stop arrow-purple'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(ScheduleIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(ScheduleIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(ScheduleIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "RiskIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Risks/Issues</span>",
        //  template: "#if(RiskIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(RiskIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(RiskIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        //filterable: true,
        template: "#if(RiskIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(RiskIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(RiskIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(RiskIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
    }, {
        field: "AskNeedIndicatorArrow",
        width: "3%",
        title: "<span class='title-vertical'>Ask/Needs</span>",
        attributes: { class: "text-mid" },
        // template: "#if(AskNeedIndicator == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} else if(AskNeedIndicator == 'RedStop'){#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} else if(AskNeedIndicator == 'GreenStop') {#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} else if(ScheduleIndicator == 'GreenDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-green'></span></a>#} else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",
        template: "#if(AskNeedIndicatorArrow == 'RedDown') {#<a><span class='k-icon k-i-arrow-down arrow arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'RedStop') {#<a><span class='k-icon k-i-stop arrow-red'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenStop'){#<a><span class='k-icon k-i-stop arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'GreenUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-green'></span></a>#} " +
            "else if(AskNeedIndicatorArrow =='YellowStop') {#<a><span class='k-icon k-i-stop arrow-yellow'></span></a>#} " +
            "else if(AskNeedIndicatorArrow == 'YellowDown'){#<a><span class='k-icon k-i-arrow-down arrow arrow-yellow'></span></a>#}  " +
            "else if(AskNeedIndicatorArrow == 'YellowUp') {#<a><span class='k-icon k-i-arrow-up arrow arrow-yellow'></span></a>#} " +
            "else {#<a><span class='k-icon k-i-stop arrow-grey'></span></a>#}#",

    }, {
        field: "BudgetIndicator",
        width: "3%",
        title: "<span class='title-vertical'>Budget</span>",
        attributes: { class: "text-mid" },

        template: "<span class=#:BudgetIndicator#></span>",
    //}, {
    //    field: "IsForecastSubmitted",
    //    title: "Current Period Submitted?",
    //    headerAttributes: { "class": "wrap-header" },
    //    width: "10%",
    }, {
        field: "LastSubmittedBy",
        title: "Period Submitted By",
        headerAttributes: { "class": "wrap-header" },
        width: "10%",
    }, {
        field: "LastSubmitted",
        title: "Period Submitted Date/Time",
        headerAttributes: { "class": "wrap-header" },
        width: "10%",
        template: "#= LastSubmitted ==null ? '' : kendo.toString(kendo.parseDate(new Date(LastSubmitted), 'yyyy-MM-dd'), 'dd-MMM-yy  hh:mm:ss') #",
    }, {
        field: "SubmitReference",
        title: "Period Submitted Reference",
    headerAttributes: { "class" : "wrap-header" },
    width: "10%",
    hidden: hidePreliminary
            }];


    return col;
};

function ds_PortfolioCenter_gridForecastSubmission(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        data: datasource,
        pageSize: 500,
        batch: true,
        sort: {
            field: "IsForecastSubmitted",
            dir: "asc"
        },
        schema: {
            model: {
                fields: {
                    ProjectName: { type: "string" },
                    OverallStatusArrow: { type: "string" },
                    Tops: { type: "string" },
                    Phase: { type: "string" },
                    PM: { type: "string" },
                    Sponsor: { type: "string" },
                    ScheduleIndicatorArrow: { type: "string" },
                    RiskIndicatorArrow: { type: "string" },
                    BudgetIndicator: { type: "string" },
                    AskNeedIndicatorArrow: { type: "string" },
                    LastSubmittedBy: { type: "string" },
                    LastSubmitted: { type: "date" },
                    IsForecastSubmitted: { type: "string" },
                }
            }
        },

    });

    return dataSource1;
};

function col_PortfolioForecast_GridPortfolioForecastCummulative(yearLabel) {
    var col = [
        {
            field: "BudgetDataID", hidden: true
        }, {
            field: "Active",
            locked: true, lockable: false,
            headerAttributes: { "class": "wrap-header align-center" }, title: "Reference", width: "100px", editable: false,
        },
         {
             field: "OyAbbreviation",
             locked: true,
             headerAttributes: { "class": "wrap-header align-center" }, title: "Currency", width: "80px", editable: false,
         },
           {
               field: "PeriodName",
               locked: true,
               headerAttributes: { "class": "wrap-header align-center" }, title: "LBE", width: "80px", editable: false,
           },   
        {
            field: "Historical", title: "Historical", headerAttributes: { "class": "align-center" }, width: "100px", editable: false, format: "{0:#,#.0000}", attributes: { class: "txt-float-R" }
        },

        {
            field: "Apr", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Apr</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "May", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">May</span></div>', attributes: { class: "txt-float-R" }

        },
        {
            field: "Jun", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Jun</span></div>', attributes: { class: "txt-float-R" }

        },
        {
            field: "Jul", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Jul</span></div>', attributes: { class: "txt-float-R" }

        },
        {
            field: "Aug", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Aug</span></div>', attributes: { class: "txt-float-R" }

        },
        {
            field: "Sep", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Sep</span></div>', attributes: { class: "txt-float-R" }

        },
        {
            field: "Oct", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Oct</span></div>', attributes: { class: "txt-float-R" }

        },
        {
            field: "Nov", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Nov</span></div>', attributes: { class: "txt-float-R" }

        }, {
            field: "Dec", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Dec</span></div>', attributes: { class: "txt-float-R" }

        }, {
            field: "Jan", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Jan</span></div>', attributes: { class: "txt-float-R" }
        }, {
            field: "Feb", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Feb</span></div>', attributes: { class: "txt-float-R" }
        }, {
            field: "Mar", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Mar</span></div>', attributes: { class: "txt-float-R" }

        },
        {
            field: "AnnualTotal", width: "100px", title: "Total Year", headerAttributes: { "class": "wrap-header" }, attributes: { class: "blueBg txt-float-R" }, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[0].TblLabel + '</span></div>'
        },

        {
            field: "AprY1", title: "Apr", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Apr</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "MayY1", title: "May", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">May</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "JunY1", title: "Jun", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Jun</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "JulY1", title: "Jul", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Jul</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "AugY1", title: "Aug", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Aug</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "SepY1", title: "Sep", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Sep</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "OctY1", title: "Oct", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Oct</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "NovY1", title: "Nov", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Nov</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "DecY1", title: "Dec", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Dec</span></div>', attributes: { class: "txt-float-R" }
        }, {
            field: "JanY1", title: "Jan", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Jan</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "FebY1", title: "Feb", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Feb</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "MarY1", title: "Mar", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Mar</span></div>', attributes: { class: "txt-float-R" }
        }, {
            field: "AnnualTotalY1", headerAttributes: { "class": "wrap-header" }, width: "100px", title: "Total FY+1", attributes: { class: "greenBg txt-float-R" }, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[1].TblLabel + '</span></div>'
        },
        // { field: "Y1", title: "Y+1", editable: false, format: "{0:#,#$}" },
        {
            field: "Y2", title: "FY+2", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[2].TblLabel + '</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "Y3", title: "FY+3", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[3].TblLabel + '</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "Y4", title: "FY+4", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[4].TblLabel + '</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "Y5", title: "5+", width: "100px", editor: editNumber, format: "{0:#,#.0000}",
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[5].TblLabel + '</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "CumulativeTotal", title: "Total CAPEX", width: "100px", headerAttributes: { "class": "wrap-header align-center" }, attributes: { class: "purpleBg txt-float-R" }, format: "{0:#,#.0000}"
        }
    ];


    return col;
};


function col_PortfolioForecast_GridPortfolioForecastCummulativeLocal(yearLabel) {
    var col = [
    {
        field: "BudgetDataID", hidden: true
    },
    {
        field: "Active",
        locked: true,
        headerAttributes: {
            "class": "wrap-header align-center"
        }, title: "&nbsp", width: "100px", editable: false,
    },
        {
            field: "LocalCurrencyAbbreviation",
            locked: true,
            headerAttributes: { "class": "wrap-header align-center" }, title: "Currency", width: "80px", editable: false,
        },
          {
              field: "PeriodName",
              locked: true,
              headerAttributes: { "class": "wrap-header align-center" }, title: "LBE", width: "80px", editable: false,
          },
        {
            field: "HistoricalLocal", title: "Historical", headerAttributes: { "class": "align-center" }, width: "100px", editable: false, format: "{0:#,#}", attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "AprLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Apr</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "MayLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">May</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "JunLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Jun</span></div>', attributes: {
                class: "txt-float-R"
            }

        }, {
            field: "JulLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Jul</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "AugLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Aug</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "SepLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Sep</span></div>', attributes: {
                class: "txt-float-R"
            }

        }, {
            field: "OctLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Oct</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "NovLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Nov</span></div>', attributes: {
                class: "txt-float-R"
            }

        }, {
            field: "DecLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Dec</span></div>', attributes: {
                class: "txt-float-R"
            }

        }, {
            field: "JanLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Jan</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "FebLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Feb</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "MarLocal", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Mar</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "AnnualTotalLocal", width: "100px", title: "Total Year", headerAttributes: { "class": "wrap-header" }, attributes: { class: "blueBg txt-float-R" }, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[0].TblLabel + '</span></div>'
        }, {
            field: "AprY1Local", title: "Apr", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Apr</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "MayY1Local", title: "May", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">May</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "JunY1Local", title: "Jun", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Jun</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "JulY1Local", title: "Jul", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Jul</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "AugY1Local", title: "Aug", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Aug</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "SepY1Local", title: "Sep", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Sep</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "OctY1Local", title: "Oct", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Oct</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "NovY1Local", title: "Nov", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Nov</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "DecY1Local", title: "Dec", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Dec</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "JanY1Local", title: "Jan", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Jan</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "FebY1Local", title: "Feb", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Feb</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "MarY1Local", title: "Mar", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Mar</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "AnnualTotalY1Local", headerAttributes: {
                "class": "wrap-header"
            }, width: "100px", title: "Total FY+1", attributes: {
                class: "greenBg txt-float-R"
            }, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[1].TblLabel + '</span></div>'
        }, {
            field: "Y2Local", title: "FY+2", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[2].TblLabel + '</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "Y3Local", title: "FY+3", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[3].TblLabel + '</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "Y4Local", title: "FY+4", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[4].TblLabel + '</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "Y5Local", title: "5+", width: "100px", editor: editNumber, format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[5].TblLabel + '</span></div>', attributes: {
                class: "txt-float-R"
            }
        }, {
            field: "CumulativeTotalLocal", title: "Total CAPEX", width: "100px", headerAttributes: {
                "class": "wrap-header align-center"
            }, attributes: {
                class: "purpleBg txt-float-R"
            }, format: "{0:#,#}"
        }
    ];


    return col;
};

function ds_PortfolioForecast_GridPortfolioForecastData(datasource) {
    var dataSourceForcastData = new kendo.data.DataSource({
        transport: {
            read: function (e) {
                // on success
                e.success(datasource);
            }
        },
        schema: {
            model: {
                id: 'BudgetDataID',
                fields: {
                    BudgetDataID: {
                        hidden: true
                    },
                    // Active: { editable: false },
                    CapitalBudgetID: {
                        editable: false
                    },
                    ProblemID: {
                        editable: false
                    },
                    ProjectName: {
                        editable: false
                    },
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

                    AprY1: {
                        type: "number"
                    },
                    MayY1: {
                        type: "number"

                    },
                    JunY1: {
                        type: "number"
                    },
                    JulY1: {
                        type: "number"
                    },
                    AugY1: {
                        type: "number"
                    },
                    SepY1: {
                        type: "number"
                    },
                    OctY1: {
                        type: "number"
                    },
                    NovY1: {
                        type: "number"
                    },
                    DecY1: {
                        type: "number"
                    },
                    JanY1: {
                        type: "number"
                    },
                    FebY1: {
                        type: "number"
                    },
                    MarY1: {
                        type: "number"
                    },
                    AnnualTotalY1: {
                        type: "number", editable: false
                    },

                    //Y1: {
                    //    type: "number", editable: false
                    //},
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
                    },
                    UserName: {
                        editable: false
                    },
                    LastSubmitted: {
                        editable: false
                    },
                    SubmittedForPeriod: {
                        editable: false
                    }

                }
            }
        },
        pageSize: 500,
        aggregate: [{
            field: "Apr", aggregate: "sum"
        }, {
            field: "May", aggregate: "sum"
        }, {
            field: "Jun", aggregate: "sum"
        }, {
            field: "Jul", aggregate: "sum"
        }, {
            field: "Aug", aggregate: "sum"
        }, {
            field: "Sep", aggregate: "sum"
        }, {
            field: "Oct", aggregate: "sum"
        }, {
            field: "Nov", aggregate: "sum"
        }, {
            field: "Dec", aggregate: "sum"
        }, {
            field: "Jan", aggregate: "sum"
        },
        {
            field: "Feb", aggregate: "sum"
        }, {
            field: "Mar", aggregate: "sum"
        }, {
            field: "AnnualTotal", aggregate: "sum"
        }, {
            field: "AprY1", aggregate: "sum"
        }, {
            field: "MayY1", aggregate: "sum"
        }, {
            field: "JunY1", aggregate: "sum"
        }, {
            field: "JulY1", aggregate: "sum"
        }, {
            field: "AugY1", aggregate: "sum"
        }, {
            field: "SepY1", aggregate: "sum"
        }, {
            field: "OctY1", aggregate: "sum"
        }, {
            field: "NovY1", aggregate: "sum"
        }, {
            field: "DecY1", aggregate: "sum"
        }, {
            field: "JanY1", aggregate: "sum"
        }, {
            field: "FebY1", aggregate: "sum"
        }, {
            field: "MarY1", aggregate: "sum"
        }, {
            field: "AnnualTotalY1", aggregate: "sum"
        }, {
            field: "Y2", aggregate: "sum"
        }, {
            field: "Y3", aggregate: "sum"
        }, {
            field: "Y4", aggregate: "sum"
        }, {
            field: "Y5", aggregate: "sum"
        }, {
            field: "CumulativeTotal", aggregate: "sum"
        }],



    });
    return dataSourceForcastData;
}
function ds_PortfolioForecast_GridPortfolioForecastCummulative(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        // data: vm.capexForecast,
        transport: {
            read: function (e) {
                e.success(datasource);
            }
        },
        //sort: [{ field: "Active", dir: "desc" }
        //],
        schema: {
            model: {
                id: 'BudgetDataID',
                fields: {
                    BudgetDataID: {
                        hidden: true
                    },
                    Active: {
                        editable: false
                    },
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
                        type: "number"
                    },
                    AprY1: {
                        type: "number"
                    },
                    MayY1: {
                        type: "number"
                    },
                    JunY1: {
                        type: "number"
                    },
                    JulY1: {
                        type: "number"
                    },
                    AugY1: {
                        type: "number"
                    },
                    SepY1: {
                        type: "number"
                    },
                    OctY1: {
                        type: "number"
                    },
                    NovY1: {
                        type: "number"
                    },
                    DecY1: {
                        type: "number"
                    },
                    JanY1: {
                        type: "number"
                    },
                    FebY1: {
                        type: "number"
                    },
                    MarY1: {
                        type: "number"
                    },
                    AnnualTotalY1: {
                        type: "number"
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
                        type: "number"
                    }
                }
            }
        }
    });

    return dataSource1;
}

function ds_PortfolioForecast_GridPortfolioForecastCummulativeLocal(datasource) {
    var dataSource1 = new kendo.data.DataSource({
        // data: vm.capexForecast,
        transport: {
            read: function (e) {
                e.success(datasource);
            }
        },
        //sort: [{ field: "Active", dir: "desc" }
        //],
        schema: {
            model: {
                id: 'BudgetDataID',
                fields: {
                    BudgetDataID: {
                        hidden: true
                    },
                    Active: {
                        editable: false
                    },
                    HistoricalLocal: {
                        type: "number", editable: false
                    },
                    AprLocal: {
                        type: "number"
                    },
                    MayLocal: {
                        type: "number"
                    },
                    JunLocal: {
                        type: "number"
                    },
                    JulLocal: {
                        type: "number"
                    },
                    AugLocal: {
                        type: "number"
                    },
                    SepLocal: {
                        type: "number"
                    },
                    OctLocal: {
                        type: "number"
                    },
                    NovLocal: {
                        type: "number"
                    },
                    DecLocal: {
                        type: "number"
                    },
                    JanLocal: {
                        type: "number"
                    },
                    FebLocal: {
                        type: "number"
                    },
                    MarLocal: {
                        type: "number"
                    },
                    AnnualTotalLocal: {
                        type: "number"
                    },
                    AprY1Local: {
                        type: "number"
                    },
                    MayY1Local: {
                        type: "number"
                    },
                    JunY1Local: {
                        type: "number"
                    },
                    JulY1Local: {
                        type: "number"
                    },
                    AugY1Local: {
                        type: "number"
                    },
                    SepY1Local: {
                        type: "number"
                    },
                    OctY1Local: {
                        type: "number"
                    },
                    NovY1Local: {
                        type: "number"
                    },
                    DecY1Local: {
                        type: "number"
                    },
                    JanY1Local: {
                        type: "number"
                    },
                    FebY1Local: {
                        type: "number"
                    },
                    MarY1Local: {
                        type: "number"
                    },
                    AnnualTotalY1Local: {
                        type: "number"
                    },
                    Y2Local: {
                        type: "number"
                    },
                    Y3Local: {
                        type: "number"
                    },
                    Y4Local: {
                        type: "number"
                    },
                    Y5Local: {
                        type: "number"
                    },
                    CumulativeTotalLocal: {
                        type: "number"
                    }
                }
            }
        }
    });

    return dataSource1;
}

function col_PortfolioForecast_GridPortfolioForecastData(yearLabel) {
    var col = [
        {
            field: "BudgetDataID", hidden: true
        },
        // { field: "Active", locked: true, lockable: false, headerAttributes: { "class": "wrap-header" }, title: "&nbsp", width: "100", editable: false },
        {
            field: "CapitalBudgetID", locked: true, width: "60px",
            headerAttributes: { "class": "wrap-header align-center" }, title: "Budget ID", editable: false,

        },
        {
            field: "ProblemID", locked: true, width: "60px",
            headerAttributes: { "class": "wrap-header align-center" }, title: "Project ID", editable: false,

        },
        {
            field: "ProjectName", locked: true, headerAttributes: { "class": "wrap-header align-center" }, title: "Project Name", width: "170px", editable: false,
        },        
        {
            field: "PM", locked: true, headerAttributes: { "class": "wrap-header align-center" }, title: "PM", width: "90px", editable: false,
        },
        {
            field: "LocalCurrencyAbbreviation", locked: true, headerAttributes: { "class": "wrap-header align-center" }, title: "Currency", width: "50px", editable: false,
        },
        {
            field: "Historical", title: "Historical", headerAttributes: { "class": "align-center" }, width: "100px", editable: false, format: "{0:#,#}", attributes: {
                class: "txt-float-R budgetActuals"
            }
        },
        {
            field: "Apr", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Apr</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "May", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">May</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "Jun", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Jun</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "Jul", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Jul</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "Aug", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Aug</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "Sep", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Sep</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "Oct", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Oct</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "Nov", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Nov</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "Dec", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Dec</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            //class 'enableActuals' for greying out Actual months
            field: "Jan", width: "100px", editor: editNumber, aggregates: ["sum"], format: "{0:#,#}",
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Jan</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "Feb", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div  class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Feb</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "Mar", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">Mar</span></div>', attributes: { class: "txt-float-R enableActuals" }
        },
        {
            field: "AnnualTotal", width: "100px", title: "Total Year", headerAttributes: { "class": "wrap-header" }, format: "{0:#,#}", editable: false, aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="blueBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[0].TblLabel + '</span></div>', attributes: { class: "txt-float-R blueBg" }
        },

        {
            field: "AprY1", title: "Apr", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Apr</span></div>', attributes: { class: "txt-float-R" }
        },
        //{
        //    field: "AprY1", title: "Apr", width: "100px", editor: editNumber, template: "#= currency(data)#", aggregates: ["sum"],
        //    headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Apr</span></div>', attributes: { class: "txt-float-R" }
        //},
        {
            field: "MayY1", title: "May", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">May</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "JunY1", title: "Jun", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Jun</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "JulY1", title: "Jul", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Jul</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "AugY1", title: "Aug", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Aug</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "SepY1", title: "Sep", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Sep</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "OctY1", title: "Oct", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Oct</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "NovY1", title: "Nov", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Nov</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "DecY1", title: "Dec", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Dec</span></div>', attributes: { class: "txt-float-R" }
        }, {
            field: "JanY1", title: "Jan", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Jan</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "FebY1", title: "Feb", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Feb</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "MarY1", title: "Mar", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">Mar</span></div>', attributes: { class: "txt-float-R" }
        }, {
            field: "AnnualTotalY1", headerAttributes: { "class": "wrap-header" }, width: "100px", title: "Total FY+1", editable: false, format: "{0:#,#}", attributes: { class: "greenBg txt-float-R" }, aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="greenBg headBgHeight"></span><span class="customGridHeaderHeight">'+ yearLabel[1].TblLabel+'</span></div>'
        },

        // { field: "Y1", title: "Y+1", editable: false, format: "{0:#,#}" },
        {
            field: "Y2", title: "FY+2", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[2].TblLabel + '</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "Y3", title: "FY+3", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[3].TblLabel + '</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "Y4", title: "FY+4", width: "100px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[4].TblLabel + '</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "Y5", title: "5+", width: "110px", editor: editNumber, format: "{0:#,#}", aggregates: ["sum"],
            headerTemplate: '<div class="align-center"><span class="pinkBg headBgHeight"></span><span class="customGridHeaderHeight">' + yearLabel[5].TblLabel + '</span></div>', attributes: { class: "txt-float-R" }
        },
        {
            field: "CumulativeTotal", title: "Total CAPEX", width: "100px", headerAttributes: { "class": "wrap-header align-center" }, editable: false, attributes: { class: "budgetActuals txt-float-R" }, format: "{0:#,#}", aggregates: ["sum"]
            //headerTemplate: '<div><span class="purpleBg headBgHeight"></span><span class="customGridHeaderHeight">Total Capex Forecast (LBE)</span></div>',
        },
        {
            field: "UserName", title: "Period Submitted By", width: "100px", headerAttributes: { "class": "wrap-header align-center" }, editable: false, attributes: { class: "txt-float-R budgetActuals" }
        },
        {
            field: "LastSubmitted", title: "Period Submitted Date/Time", width: "100px", headerAttributes: { "class": "wrap-header align-center" }, editable: false,
            template: "#= LastSubmitted ==null ? '' : kendo.toString(kendo.parseDate(new Date(LastSubmitted), 'yyyy-MM-dd'), 'dd-MMM-yy  hh:mm:ss') #", attributes: { class: "txt-float-R budgetActuals" }
        },
        {
            field: "SubmittedForPeriod", title: "Period Submitted Reference", width: "100px", headerAttributes: { "class": "wrap-header align-center" }, editable: false, attributes: { class: "txt-float-R budgetActuals" }
        }
    ];


    return col;
};
//function currency(data) {
//    if (data.AprY1 > 40) {
//        return kendo.toString(data.AprY1, "$###.##");
//    }
//    return kendo.toString(data.AprY1, "###.##£");
//}
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
};


