//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('SecurityGroupUsersCtrl', SecurityGroupUsersCtrl)
SecurityGroupUsersCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function SecurityGroupUsersCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;

    // vm.validator;

    //Array
    vm.securityGroupSelectorData = {};
   // vm.dsResList1 = [];
    vm.dsUserGroupInfo = [];
    vm.dsGroup = [];
    vm.multiGroup = [];

    //Functions
    // vm.DisposeProjectTypeSelector = DisposeProjectTypeSelector;
    vm.initSecurityGroup = initSecurityGroup;
    vm.GetSecurityGroupData = GetSecurityGroupData;
    vm.InitkGridGroupDetail = InitkGridGroupDetail;
    vm.UpdateSecurityGroup = UpdateSecurityGroup;
    vm.MemberOnChange = MemberOnChange;
    vm.UpdatedUserGroupData = UpdatedUserGroupData;

    function GetSecurityGroupData() {

        var lookup = securityGroup;
        $.when(GETPostService.postDataWCF("getUserPermissionById", currentUserId)).then(function (resUserPermission) {
            var userPermission = JSON.parse(resUserPermission.getUserPermissionByIdResult);

            //var a=userPermission.find(item => item.Permission == manageUsers);
            var canManageUser = (userPermission.filter(function (entry) { return entry.Permission == manageUsers; })).length > 0 ? true : false;
            if (canManageUser == true) {
                $.when(GETPostService.postDataWCF("getLookupData", lookup))
                    .then(function (resGroup) {

                        vm.dsGroup = JSON.parse(resGroup.getLookupDataResult);
                        //vm.dsUserGroupInfo = JSON.parse(resUserGroupInfo.getSecurityGroupAndUsersResult);
                        //vm.dsResList1 = JSON.parse(userInfo.getUserDataResult);

                        vm.multiSecurityGroup = {
                            placeholder: "Select group...",
                            dataTextField: "LookUpMemberName",
                            dataValueField: "LookUpMemberID",
                            valuePrimitive: true,
                            autoBind: false,
                            dataSource: vm.dsGroup,
                        filter: "contains"
                        };
                      
                        $scope.$digest();

                       // InitkGridGroupDetail();
                       
                        hideLoading();
                    });
            }
            else
                window.location.href = portfolioCenterpath;
        });

    };
    function InitkGridGroupDetail() {

        var col = col_SecurityGroup_InitkGridGroupDetail();
        var dataSource1 = new kendo.data.DataSource({
            data: vm.dsUserGroupInfo,
            batch: true,
            pageSize: 100,
            //pageSize: 20,
            schema: {
                model: {
                    id: "SecurityGroupId",
                    fields: {
                        UserName: {
                            type: "string"
                        },
                        GroupName: { type: "string" },

                    }
                }
            }
        });
        $("#GridGroupDetail").kendoGrid({
            dataSource: dataSource1,
            columns: col,
            editable: false,
            selectable: true,
            pageable: true,
            change: function () {
                var groups;
                vm.securityGroupSelectorData = {};
                var memberGroup;
                var row = this.select();
                var dataItem = this.dataItem(row[0]);
                vm.selectedUser = vm.dsUserGroupInfo.filter(function (entry) {
                    return entry.UserADId == dataItem.UserADId;
                });
                if (vm.selectedUser.length > 0) {
                     
                    var pplObj = {};
                    var siteUsers = [];
                    pplObj.UserADId = vm.selectedUser[0].UserADId;
                    pplObj.UserDisplayName = vm.selectedUser[0].UserName;
                    pplObj.UserImageUrl = vm.selectedUser[0].UserImageUrl;
                    pplObj.UserEmailAddress = vm.selectedUser[0].UserEmailAddress;
                    pplObj.UserDepartment = vm.selectedUser[0].UserDepartment;
                    pplObj.UserCountry = vm.selectedUser[0].UserCountry;
                    siteUsers.push(pplObj);
                    var ownerlist = $("#securityMembers").data("kendoComboBox");
                    ownerlist.value(vm.selectedUser[0].UserADId);
                    ownerlist.setDataSource(siteUsers);
                    ownerlist.refresh();
                   
                    if (dataItem.SecurityGroupID.split(",").length >= 1)
                        groups = dataItem.SecurityGroupID.split(",");
                    else
                        groups = dataItem.SecurityGroupID;
                    memberGroup = $("#member").data("kendoMultiSelect");
                    memberGroup.value(groups);
                }
                else {
                    memberGroup = $("#member").data("kendoMultiSelect");
                    memberGroup.value("");
                    alert("User is not present in the list");
                }

                $scope.$digest();

            }

        });
        var grid = $("#GridGroupDetail").data("kendoGrid");

    };
    function col_SecurityGroup_InitkGridGroupDetail() {
        var col = [{
            field: "UserName",
            title: "User Name",

        }, {
            field: "GroupName",
            title: "Group Name",

        }];
        return col;
    };
    function UpdateSecurityGroup() {
        var listdata = [],
         memberID = '',
            securityGroupList = [];
        if ($("#securityMembers").data("kendoComboBox") != null) {
            memberID = $("#securityMembers").data("kendoComboBox").value();            
        }
        if (vm.securityGroupSelectorData.GroupName != null) {
            securityGroupList = vm.securityGroupSelectorData.GroupName.join(",");
        }
        else {
            securityGroupList = vm.securityGroupSelectorData.SecurityGroupID;
        }
        vm.securityGroupSelectorData = {
            UserADId: memberID != "" ? memberID : null,
            SecurityGroupID:  securityGroupList ,
            UserIsActive: 'true'
            //UserIsActive: (vm.securityGroupSelectorData.isActive == undefined) ? false: vm.securityGroupSelectorData.isActive,           
        };
        listdata.push(vm.securityGroupSelectorData);

        var finalData = JSON.stringify({
            "UserSecurityGroupData": listdata
        });
        GETPostService.postDataWCF('updateUserSecurityGroup', finalData).then(function (response) {
            if (response == 1) {
                console.log(response);
                UpdatedUserGroupData();

            }

        });
    };
    function UpdatedUserGroupData() {        
                var ownerlist = $("#securityMembers").data("kendoComboBox");
                ownerlist.setDataSource([]);
                ownerlist.value([]);
                ownerlist.refresh(); 
                var memberGroup = $("#member").data("kendoMultiSelect");
                memberGroup.value("");
           
    }
    function MemberOnChange() {
        var memberID = '';
        vm.dsfilterUserGroup = [];
        vm.dsUserGroupInfo = [];
        if ($("#securityMembers").data("kendoComboBox") != null) {

            if ($("#securityMembers").data("kendoComboBox").selectedIndex != -1) {
                memberID = $("#securityMembers").data("kendoComboBox").value();
                $.when(GETPostService.postDataWCF("getUserGroupById", memberID))
                    .then(function (resUserGroupInfo) {
                        vm.dsUserGroupInfo = JSON.parse(resUserGroupInfo.getUserGroupByIdResult);
                        if (vm.dsUserGroupInfo.length > 0) {
                            $.each(vm.dsUserGroupInfo, function (index, item) {
                                vm.dsfilterUserGroup.push(item.LookUpID);
                            });
                        }
                        if (vm.dsfilterUserGroup != undefined) {
                           // var groups = vm.dsfilterUserGroup.length != 0 ? (vm.dsfilterUserGroup[0].SecurityGroupID != null ? vm.dsfilterUserGroup[0].SecurityGroupID.split(",") : "") : "";
                            var required = $("#member").data("kendoMultiSelect");

                            required.value(vm.dsfilterUserGroup);
                            $scope.$digest();
                        }
                       
                    });
            }
            
        }
    };
    function bindUserPicker(elmentId) {
        $("#" + elmentId).kendoComboBox({
            suggest: true,
            dataSource: [],
            minLength: 3,
            filtering: function (e) {
                e.preventDefault();
            },
            filter: "contains",
            dataTextField: "UserDisplayName",
            dataValueField: "UserADId",
            placeholder: "Select and/or Type to Search",
            change: function (e) { vm.MemberOnChange() },
            headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                '<span>Photo</span>' +
                '<span>Contact info</span>' +
                '</div>',

            // using {{angular}} templates:
            valueTemplate: '<span class="selected-value" style="background-image: url(\'#: data.UserImageUrl #\')"></span><span>#: data.UserDisplayName #</span>',

            template: '<span class="k-state-default" style="background-image: url(\'#: data.UserImageUrl #\')"></span>' +
                '<span class="k-state-default"><h3>#: data.UserDisplayName #</h3><p>#: data.UserEmailAddress #</p><p>#: data.UserDepartment # #: data.UserCountry #</p></span>',

        });

        $("#" + elmentId).data("kendoComboBox").input.on('keydown', function (e) {
            //userControlSearch(e,$(this).attr('id'));
            GETPostService.searchPeople(e, e.currentTarget.name.replace("_input", ""));
        });

    };
    function initSecurityGroup() {
        displayLoading();
        bindUserPicker("securityMembers");
       //GetSecurityGroupData();
        $.when(GETPostService.getUserAdID()).then(function (userId) {
            if (userId != "") 
                GetSecurityGroupData();
            //else window.location.href = errorPagePath;
        });
    };
};