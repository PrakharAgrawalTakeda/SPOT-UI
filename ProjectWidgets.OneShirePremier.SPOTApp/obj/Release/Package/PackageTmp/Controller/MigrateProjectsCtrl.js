//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('MigrateProjectsCtrl', MigrateProjectsCtrl)
MigrateProjectsCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function MigrateProjectsCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;

  
    vm.projectIdsNoSite = [];
    vm.showCreateSite = false;
 
    vm.initMigrateProjects = initMigrateProjects;
    vm.CreateProjectSite = CreateProjectSite;

   

    function GetProjectIdsWithNoSite() {

        var lookup = securityGroup;
        $.when(GETPostService.postDataWCF("GetProjectIdsWithNoSite")).then(function (resProjectIds) {
           

            vm.projectIdsNoSite = JSON.parse(resProjectIds.GetProjectIdsWithNoSiteResult);
            if (vm.projectIdsNoSite.length > 0)
                vm.showCreateSite = true;

            InitkGridProjects();
            $scope.$digest();
        });

    };
    function CreateProjectSite() {
        var rootSiteUrlMP = "";
        var siteTemplateMP = "";
        try {
            displayLoading();
            $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"))
                .then(function (resToken) {
                    var token = resToken.GetTokenForDocumentResult;
                    // sitename = sitename.replace(/\%/g, "");

                    var countP = 0;

                    $.each(vm.projectIdsNoSite, function (key, value) {
                        $.when(GETPostService.postDataWCFAsync("GetProjectRootSiteUrl", value.ProblemUniqueID))
                            .then(function (resRootSiteUrl) {
                                var title = value.ProblemTitle;
                                var SelectedProblemId = value.ProblemID;
                                //var siteUrl = ReplaceSpecialCharacters(value.ProblemTitle);

                                if (JSON.parse(resRootSiteUrl.GetProjectRootSiteUrlResult).length > 0) {
                                    var RootUrl = JSON.parse(resRootSiteUrl.GetProjectRootSiteUrlResult)[0];
                                    rootSiteUrlMP = RootUrl.rootSiteUrl;
                                    siteTemplateMP = RootUrl.siteTemplate;
                                }
                                else {
                                    rootSiteUrlMP = rootSiteUrl;
                                    siteTemplateMP = siteTemplate;
                                }


                                var isConfidentialProject = false;

                                $.when(GETPostService.createProjectSiteForMigrate(token, rootSiteUrlMP, siteTemplateMP, SelectedProblemId,title, isConfidentialProject))
                                    .then(function (resDoc,resProjectUrl) {
                                        if (resDoc == "Success") {
                                            // var gridDataTeam = JSON.parse(team.getProjectTeamResult);
                                            vm.show = false;

                                            //GetSharepointDocuments();

                                            //SeletedProjectId = getParameterByName(window.location.search, "ProblemID");
                                            //var ProjectSiteUrl = rootSiteUrl + "/" + siteTemplate + "/" + value.ProblemID;
                                            var dataToSend = {
                                                "ProjectID": value.ProblemUniqueID, "ProjectSiteURL": resProjectUrl
                                            };
                                            $.when(GETPostService.postDataWCFAsync("insertUpdateProjectSiteURL", dataToSend))
                                                .then(function (resDoc) {
                                                    countP++;
                                                    try {
                                                        if (resDoc == "Success") {
                                                            if (countP == vm.projectIdsNoSite.length)
                                                                alert("Project Sites created successfully");
                                                            console.log("Project Site updated");

                                                        }
                                                    }
                                                    catch (err) {
                                                        var dataToSend = {
                                                            "method": "MigrateProjectPage CreateProjectSite", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                                        };
                                                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                                            .then(function (response) {
                                                                console.log("Error in database operation for project site update");
                                                            });
                                                    }
                                                });
                                        }
                                        else {
                                            alert("Error in Project site creation.");
                                            hideLoading();
                                        }
                                    });
                            });
                      
                    });
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "MigrateProjectPage CreateProjectSite", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                    hideLoading();
                    windowname.data("kendoWindow").close();
                });
        }

    }
    function ReplaceSpecialCharacters(value) {
        var str = value;
        var chars = ['~', '#', '%', '&', '{', '}', ':', '<', '>', '|', '"'];
        for (var i = 0; i < chars.length; i++) {
            str = str.replace(new RegExp(chars[i], 'gi'), "");
        }
        str = str.replace(/\\/g, "");
        str = str.replace(/\*/g, "");
        str = str.replace(/\//g, "");
        return str;
    }
    function InitkGridProjects() {

        var col = col_SecurityGroup_InitkGridGroupDetail();
        var dataSource1 = new kendo.data.DataSource({
            data: vm.projectIdsNoSite,
            batch: true,
            pageSize: 100,
            //pageSize: 20,
            schema: {
                model: {
                    id: "ProblemID",
                    fields: {
                        ProblemID: {
                            type: "string"
                        },
                        ProjectSiteURL: { type: "string" },

                    }
                }
            }
        });
        $("#GridProjects").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            editable: false,
            selectable: true,
            pageable: true


        });
        //var grid = $("#GridProjects").data("kendoGrid");

    };
    function col_SecurityGroup_InitkGridGroupDetail() {
        var col = [{
            field: "ProblemID",
            title: "Project Id",

        }, {
            field: "ProjectSiteURL",
            title: "Site Url",

        }];
        return col;
    };


    function initMigrateProjects() {
        displayLoading();

        GetProjectIdsWithNoSite();

    };
};