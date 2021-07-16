angular.module('SPOTApp').directive('directiveTopMenu', directiveTopMenu);

function directiveTopMenu() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/TopMenu.html?v="+buildNo;
    return directive;
}

angular.module('SPOTApp').directive('directiveProjectHubHeader', directiveProjectHubHeader);

function directiveProjectHubHeader() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/ProjectHubHeader.html?v="+buildNo;
    return directive;
}

angular.module('SPOTApp').directive('directiveBusCaseGenInfo', directiveBusCaseGenInfo);

function directiveBusCaseGenInfo() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath+"/BusinessCaseGenInfo.html?v="+buildNo;

    return directive;

}
angular.module('SPOTApp').directive('directiveBusCaseOpt', directiveBusCaseOpt);

function directiveBusCaseOpt() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath+"/BusinessCaseOption.html?v="+buildNo;

    return directive;


}

angular.module('SPOTApp').directive('directiveBusCaseOpt2', directiveBusCaseOpt2);

function directiveBusCaseOpt2() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/BusinessCaseOption2.html?v="+buildNo;

    return directive;


}
angular.module('SPOTApp').directive('directiveBusCaseOpt3', directiveBusCaseOpt3);

function directiveBusCaseOpt3() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/BusinessCaseOption3.html?v="+buildNo;

    return directive;


}
angular.module('SPOTApp').directive('directivePrjHubTabs', directivePrjHubTabs);

function directivePrjHubTabs() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath+"/ProjectHubTabs.html?v="+buildNo;

    return directive;
}

angular.module('SPOTApp').directive('directivePrjTypeSelector', directivePrjTypeSelector);

function directivePrjTypeSelector() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/ProjectTypeSelector.html?v="+buildNo;

    return directive;
}

angular.module('SPOTApp').directive('directiveRiskIssueform', directiveRiskIssueform);

function directiveRiskIssueform() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/RiskIssue.html?v="+buildNo;

    return directive;
}
angular.module('SPOTApp').directive('directiveOverallStatusform', directiveOverallStatusform);

function directiveOverallStatusform() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/OverAllStatus.html?v="+buildNo;

    return directive;
}

angular.module('SPOTApp').directive('directiveMilestoneform', directiveMilestoneform);

function directiveMilestoneform() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/Milestone.html?v="+buildNo;

    return directive;
}

angular.module('SPOTApp').directive('directiveAskNeedform', directiveAskNeedform);

function directiveAskNeedform() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/AskNeed.html?v="+buildNo;

    return directive;
}
angular.module('SPOTApp').directive('directiveImportData', directiveImportData);

function directiveImportData() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/ImportData.html?v="+buildNo;

    return directive;
}
angular.module('SPOTApp').directive('directiveEditDeliverables', directiveEditDeliverables);

function directiveEditDeliverables() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/BusinessCaseGenInfo.html?v="+buildNo;

    return directive;

}


angular.module('SPOTApp').directive('directiveProjectDetailFormsAndReports', directiveProjectDetailFormsAndReports);

function directiveProjectDetailFormsAndReports() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/ProjectDetailFormsAndReports.html?v="+buildNo;

    return directive;

}
angular.module('SPOTApp').directive('directiveProjectCharterDeliverable', directiveProjectCharterDeliverable);

function directiveProjectCharterDeliverable() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/ProjectCharterDeliverable.html?v="+buildNo;

    return directive;

}

angular.module('SPOTApp').directive('directiveBusinessCaseDeliverable', directiveBusinessCaseDeliverable);
function directiveBusinessCaseDeliverable() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/BusinessCaseDeliverable.html?v="+buildNo;
    return directive;
}

angular.module('SPOTApp').directive('directiveProjectDocument', directiveProjectDocument);

function directiveProjectDocument() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/ProjectDocument.html?v="+buildNo;
    return directive;
}
angular.module('SPOTApp').directive('directiveProjectBudget', directiveProjectBudget);

function directiveProjectBudget() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/ProjectBudget.html?v="+buildNo;
    return directive;
}
angular.module('SPOTApp').directive('directiveUploadDocument', directiveUploadDocument);

function directiveUploadDocument() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/UploadDocument.html?v="+buildNo;
    return directive;
}
angular.module('SPOTApp').directive('directiveCreateFolder', directiveCreateFolder);

function directiveCreateFolder() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/CreateFolder.html?v="+buildNo;
    return directive;
}

angular.module('SPOTApp').directive('directiveProgramHub', directiveProgramHub);

function directiveProgramHub() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/ProgramHub.html?v="+buildNo;
    return directive;
}

angular.module('SPOTApp').directive('directiveProjectHub', directiveProjectHub);

function directiveProjectHub() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/ProjectHubData.html?v="+buildNo;
    return directive;
}

angular.module('SPOTApp').directive('directiveUpdateFolderFile', directiveUpdateFolderFile);

function directiveUpdateFolderFile() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/RenameFolderFile.html?v="+buildNo;
    return directive;
}

angular.module('SPOTApp').directive('directivePortfolioForecast', directivePortfolioForecast);

function directivePortfolioForecast() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/PortfolioForecast.html?v="+buildNo;
    return directive;
}
angular.module('SPOTApp').directive('directiveMoveFile', directiveMoveFile);

function directiveMoveFile() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/MoveFile.html?v="+buildNo;
    return directive;
}
angular.module('SPOTApp').directive('directiveCopyFile', directiveCopyFile);

function directiveCopyFile() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/CopyFile.html?v="+buildNo;
    return directive;
}
angular.module('SPOTApp').directive('directiveBaselineCount', directiveBaselineCount);
function directiveBaselineCount() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/Baselinecount.html?v="+buildNo;
    return directive;
}
angular.module('SPOTApp').directive('directiveProjectCloseOutDeliverable', directiveProjectCloseOutDeliverable);

function directiveProjectCloseOutDeliverable() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/ProjectCloseOutDeliverable.html?v="+buildNo;

    return directive;

}

angular.module('SPOTApp').directive('directivePortfolioForecastExcelUpdate', directivePortfolioForecastExcelUpdate);

function directivePortfolioForecastExcelUpdate() {

    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    //template replaces the complete element with its text. 
    directive.templateUrl = htmlfilepath + "/PortfolioForecastExcelUpdate.html?v=" + buildNo;
    return directive;
}