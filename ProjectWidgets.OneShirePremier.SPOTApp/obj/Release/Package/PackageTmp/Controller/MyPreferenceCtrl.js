//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('MyPreferenceCtrl', MyPreferenceCtrl)
MyPreferenceCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function MyPreferenceCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    /******************Local variable*************************/
    var className = "MyPreference";
    var bindcontrols = true;
    var allMilestoneSetDetails = [];
    var functionalgroupBulk = [];
    var gridLength = 0;
    /******************vm variable*************************/
    vm.AddNewRow = AddNewRow;
    vm.showAlert = showAlert;
    vm.cancelSubmit = cancelSubmit;
    vm.userInfo = [];
    vm.dsPortfolioOwner = [];
    vm.deletedMilestoneFromSetData = [];
    vm.isPortfolioGroupOwner = false;
  //  vm.SelectedMilestoneSetObj = {};


    /******************function*************************/
    vm.initMyPreference = initMyPreference;
    vm.saveMyPreference = saveMyPreference;
    vm.saveMilestoneSetDetails = saveMilestoneSetDetails;
    vm.MilestoneSetEdit = MilestoneSetEdit;
    vm.OpenMilestoneDetailsInfo = OpenMilestoneDetailsInfo;
    vm.closeWindow = closeWindow;
    var IsFirstLoad = 1;
    var IsFirstLoadMilestoneDetails = 1;

    function closeWindow() {
        $("#dialogMilestoneDetails").data("kendoWindow").close();
    };

    function OpenMilestoneDetailsInfo() {
        vm.SelectedMilestoneSetObj = {
            MilestoneTemplateID: kendo.guid(),
            PortfolioID:"",
        }
        vm.selectedPortfolioOwner =null;
        MilestoneSetEdit('New');
    }
    function AddNewRow(gridName) {
        var gridNew = $("#" + gridName).data("kendoGrid");

        ////var sorting = gridNew.dataSource.sort();
        ////if (sorting) {
        ////    gridNew.dataSource.sort(null);
        ////}
        //gridNew.addRow();
        //$(".k-grid-edit-row").appendTo("#"+gridName+" tbody");
        newItemSortOrder= (gridNew.dataItems().length+1)*100
        var newRow = { SortOrder: newItemSortOrder, FuntionalOwnerID: "", Milestone: "", MilestoneTemplateID: vm.SelectedMilestoneSetObj.MilestoneTemplateID };

      
        gridNew.dataSource.add(newRow);
    };

    function cancelSubmit() {
        window.location.href = portfolioCenterpath;
    };
    function saveMilestoneSetDetails() {
        if (vm.selectedPortfolioOwner != undefined && vm.selectedPortfolioOwner != null && vm.selectedPortfolioOwner.PortfolioOwnerID != "") {
            if ($('#MilestoneSetDetailGrid').data('kendoGrid') != undefined) {
                gridLength = $('#MilestoneSetDetailGrid').data('kendoGrid').dataItems().length;
                var gridupdatedData = $('#MilestoneSetDetailGrid').data('kendoGrid').dataSource.data()
                    .filter(function (x) { return x.dirty || (x.MilestoneType == 1 || x.MilestoneType == 2) })
                    .map(function (x) { return x });

                var insertMilestoneArray = gridupdatedData.filter(function (x) { return x.id == "" || x.id == null })
                    .map(function (x) { return x });
                var updateMilestoneArray = gridupdatedData.filter(function (x) { return ((x.id != "" && x.id != null) ) })
                    .map(function (x) { return x });
                var milestoneSetDetailInsertListItems = [];
                var milestoneSetDetailUpdateListItems = [];
                angular.forEach(insertMilestoneArray, function (item, index) {
                    var currentIndx = gridLength - insertMilestoneArray.length + index;
                    var temp = {};
                    temp.MilestoneTemplateID = vm.SelectedMilestoneSetObj.MilestoneTemplateID;
                    temp.MilestoneID = item.MilestoneID;
                    temp.Milestone = item.Milestone;
                    temp.FuntionalOwnerID = item.FuntionalOwnerID;
                    temp.Comment = item.Comment;
                    temp.IncludeInReport = item.IncludeInReport;
                    temp.SortOrder = item.SortOrder == "" ? currentIndx * 100 : item.SortOrder;
                    temp.MilestoneType = item.MilestoneType;
                    milestoneSetDetailInsertListItems.push(temp);
                });
                angular.forEach(updateMilestoneArray, function (item, index) {
                    var temp = {};
                    temp.MilestoneTemplateID = item.MilestoneTemplateID;
                    temp.MilestoneID = item.MilestoneID;
                    temp.Milestone = (item.MilestoneType == 1) ? MilestoneStartPrefix + item.Milestone : (item.MilestoneType == 2 ? MilestoneEndPrefix + item.Milestone : item.Milestone);
                    temp.FuntionalOwnerID = item.FuntionalOwnerID;
                    temp.Comment = item.Comment;
                    temp.IncludeInReport = item.IncludeInReport;
                    temp.SortOrder = item.SortOrder;
                    temp.MilestoneType = item.MilestoneType;
                    milestoneSetDetailUpdateListItems.push(temp);
                });
            }
            vm.insertUpdateDeleteMilestone = {
                "insert": milestoneSetDetailInsertListItems,
                "update": milestoneSetDetailUpdateListItems,
                "delete": vm.deletedMilestoneFromSetData
            };
            var list_insertUpdateDeleteMilestone = [];
            list_insertUpdateDeleteMilestone.push(vm.insertUpdateDeleteMilestone);

            vm.milestoneSetInfoData = {
                MilestoneTemplateID: vm.SelectedMilestoneSetObj.MilestoneTemplateID,
                PortfolioID: vm.selectedPortfolioOwner.PortfolioOwnerID,
                MilestoneSet: vm.SelectedMilestoneSetObj.MilestoneSet
            };
            var dataToSend = { "userId": currentUserId, "milestoneSetInfo": JSON.stringify(vm.milestoneSetInfoData), "insertUpdateDeleteMilestone": JSON.stringify(list_insertUpdateDeleteMilestone) };
            GETPostService.postDataWCFAsync('insertUpdateMilestoneSet', dataToSend).then(function (response) {
                if (response == "Success") {
                    $.when(GETPostService.postDataWCFAsync("getUserMilestoneTemplates", currentUserId))
                      .then(function (resUserMilestoneTemplates) {
                          var milestoneTemplatesList = JSON.parse(resUserMilestoneTemplates.getUserMilestoneTemplatesResult);

                          //  InitMilestoneTempleGrid(milestoneTemplatesList);

                          var dataSourceMilestoneTemplates = new kendo.data.DataSource({
                              data: milestoneTemplatesList,
                              sort: [{
                                  field: "PortfolioOwner", dir: "asc"
                              },
                                 {
                                     field: "MilestoneSet", dir: "asc"
                                 }]
                          });
                          var gridMSTemplate = $('#gridMilestoneSets').data('kendoGrid');
                          dataSourceMilestoneTemplates.read();
                          gridMSTemplate.setDataSource(dataSourceMilestoneTemplates);

                          $("#dialogMilestoneDetails").data("kendoWindow").close();
                          //alert("Success");
                      });
                }
            })
        }
        else {
            alert('Please select Portfolio Owner!!..')
        }
        }
    function prepareDataForMyPreference() {
        
        var lookup = funtionalGroup;
        $.when(GETPostService.postDataWCFAsync("getLookupData", lookup),
            GETPostService.postDataWCFAsync("getUserPreferanceByID", currentUserId),
            GETPostService.postDataWCFAsync("getUserPortfolioGroup", currentUserId),
            GETPostService.postDataWCFAsync("getUserMilestoneTemplates", currentUserId))
            .then(function(resLookup,resUserPreference,resUserPortfolioGroup,resUserMilestoneTemplates,resMilestoneSetDetails) {
          
            var userInfo = JSON.parse(resUserPreference.getUserPreferanceByIDResult);
            vm.userInfo = userInfo[0];
            var dsPortfolioGroup = JSON.parse(resUserPortfolioGroup.getUserPortfolioGroupResult);
            var LookupData = JSON.parse(resLookup.getLookupDataResult);
            if (dsPortfolioGroup.length > 0)
            {
                vm.isPortfolioGroupOwner = true;
                var milestoneTemplatesList = JSON.parse(resUserMilestoneTemplates.getUserMilestoneTemplatesResult);
                vm.dsPortfolioOwner=dsPortfolioGroup;
                //vm.dsPortfolioOwner = LookupData.filter(function (entry) {
                //    return entry.LookUpName == portfolioOwner;
                //});
                vm.dsFuntionalGroup = JSON.parse(resLookup.getLookupDataResult).filter(function (entry) {
                    return entry.LookUpName === funtionalGroup;
                });
                for (var i = 0; i < vm.dsFuntionalGroup.length; i++) {
                    var item = {
                        "text": vm.dsFuntionalGroup[i].LookUpMemberName, "value": vm.dsFuntionalGroup[i].LookUpMemberID
                    }
                    functionalgroupBulk.push(item);
                }

                InitMilestoneTempleGrid(milestoneTemplatesList);
                IsFirstLoad = 0;
            }
            else
                hideLoading();

            $scope.$digest();
        });
    };

    function InitMilestoneTempleGrid(dataTemplate) {
        var col = [{
                        field: "PortfolioOwner",
                        title: "Portfolio Owner",
                        headerAttributes: { "class": "wrap-header" },
                },{
                         field: "MilestoneSet",
                         title: "Milestone Set",
                         headerAttributes: { "class": "wrap-header" },
                },{
                         field: "TemplateOwnerName",
                         title: "Template Owner",
                         width: "10%",
                },{
                                field: "CreatedDate",
                                title: "Creation Date",
                                headerAttributes: { "class": "wrap-header" },
                                template: function (e) {
                                    var value = "";
                                    value = (e.CreatedDate != null && e.CreatedDate != "") ? kendo.toString(kendo.parseDate(new Date(e.CreatedDate), 'yyyy-MM-dd'), 'dd-MMM-yy') : '';
                                    return value;
                                },
                            },
                    {
                        command: [{
                            name: " ",
                            iconClass: "k-icon k-i-edit",
                            width: "10%",
                            click: function (e) {
                                try {
                                  //  alert("Hello");
                                    if (e.target.childNodes[0].className.indexOf("k-i-edit") > -1)
                                    {
                                     // prevent page scroll position change
                                        e.preventDefault();
                                        displayLoading();
                                    // e.target is the DOM element representing the button
                                    var tr = $(e.target).closest("tr"); // get the current table row (tr)
                                    // get the data bound to the current table row
                                    var data = this.dataItem(tr);
                                    vm.SelectedMilestoneSetObj = data;
                                    MilestoneSetEdit('Update');
                                    }
                                    else if (e.target.childNodes[0].className.indexOf("k-i-close") > -1) {
                                        if (!confirm(gridDeleteMessage))
                                            e.preventDefault();
                                        else {
                                            e.preventDefault();
                                            displayLoading();
                                            var grid = $("#gridMilestoneSets").data("kendoGrid");
                                            // e.target is the DOM element representing the button
                                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                                            // get the data bound to the current table row
                                            
                                            var data = grid.dataItem(tr);
                                            if (data.MilestoneTemplateID != undefined && data.MilestoneTemplateID != "") {

                                                $.when(GETPostService.postDataWCFAsync("deleteMilestoneSet", data.MilestoneTemplateID))
                                                    .then(function (resDelete) {
                                                        if (resDelete.deleteMilestoneSetResult == "Success") {
                                                            var grid = $("#gridMilestoneSets").data("kendoGrid");
                                                            grid.removeRow(tr);
                                                            $scope.$digest();
                                                            hideLoading();
                                                        }
                                                    })
                                                }
                                        }
                                    }

                                }
                                catch (err) {
                                    var dataToSend = {
                                        "method": "InitMilestoneTempleGrid", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                    };
                                    $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                          .then(function (response) { alert(errormessage) });
                                }

                            }
                        },
                        {
                            name: " ",
                            iconClass: "k-icon k-i-close",
                            width: "10%",
                            
                        }]
                    }

        ];
        $("#gridMilestoneSets").kendoGrid({
            dataSource: {
                data: dataTemplate,
                sort: [{
                    field: "PortfolioOwner", dir: "asc"
                },
                {
                    field: "MilestoneSet", dir: "asc"
                }]

            },
            height: 370,
            // groupable: true,
            sortable: true,

            schema: {
                model: {
                    fields: {
                        PortfolioOwner: {
                            type: "string"
                        },
                        MilestoneSet: {
                            type: "string"
                        },
                        MilestoneTemplateID: {
                            type: "string"
                        },
                        TemplateOwnerName: {
                            type: "string"
                        },
                        CreatedDate: {
                            type: "date"
                        },
                     
                    }
                }
            },
            columns: col,
        });
        hideLoading();
    }

    function bindMilestoneSetControl() {
        //bindChangeDatePicker("logDate");
        //bindChangeDatePicker("closeDate");
        //bindChangeDatePicker("dueDate");
        //bindChangeComboBox("type");
        //bindChangeComboBox("probability");
        //bindChangeComboBox("impact");
        //bindChangeComboBox("functiongroup");
        //bindUserPicker("riskowner");
        bindcontrols = false;
    }

    function MilestoneSetEdit(Action){
        try {
            displayLoading();
            if (bindcontrols) {
                bindMilestoneSetControl();
            }
            if (vm.SelectedMilestoneSetObj != null && Action == 'New') {
                if (vm.SelectedMilestoneSetObj.PortfolioID != "") {
                    var selectedPortfolioOwner = vm.dsPortfolioOwner.filter(function (entry) {
                        return entry.PortfolioOwnerID == vm.SelectedMilestoneSetObj.PortfolioID;
                    });
                    vm.selectedPortfolioOwner = selectedPortfolioOwner[0];
                }
            }
           else
            {
                if(vm.SelectedMilestoneSetObj.PortfolioID != "") {
                var selectedPortfolioOwner = vm.dsPortfolioOwner.filter(function (entry) {
                    return entry.PortfolioOwnerID == vm.SelectedMilestoneSetObj.PortfolioID;
                });
                vm.selectedPortfolioOwner = selectedPortfolioOwner[0];
                }
            }

            InitMilestoneDetailGrid();
            //angular.copy(data, vm.riskIssue);
            //angular.copy(data, OriginalRiskObj);
           
            //$scope.$digest();
            var myWindow = $("#dialogMilestoneDetails");
            myWindow.data("kendoWindow").open();
        }
        catch (err) {
            var dataToSend = {
                "method": "MilestoneSetEdit", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                  .then(function (response) { alert(errormessage) });
            hideLoading();
        }
    }
    //var CheckBoxMilestoneEdit = function (item) {
   
    //        if (item.IncludeInReport == true) {
    //            return dirtyField(item, 'IncludeInReport') + '<input type="checkbox" checked class="milestoneSetChkbx" />';
    //        }
    //        else {
    //            return dirtyField(item, 'IncludeInReport') + '<input type="checkbox" class="milestoneSetChkbx" />';
    //        }
    //        $scope.$digest();
    //};
    var dirtyField = function (data, fieldName) {
        if (data.dirty && data.dirtyFields[fieldName]) {
            return "<span class='k-dirty'></span>";
        }
        else {
            return "";
        }
    };
    function InitMilestoneDetailGrid() {
        $.when(GETPostService.postDataWCFAsync("getMilestoneSetDetails", vm.SelectedMilestoneSetObj.MilestoneTemplateID))
      .then(function (resMilestoneSetDetails) {
          milestoneSetDetailsData = JSON.parse(resMilestoneSetDetails.getMilestoneSetDetailsResult);
          gridLength = milestoneSetDetailsData.length;
          try {
              var MilestoneSetDetailDataSource = new kendo.data.DataSource({
                  //data: gridDataSchedule,
                  transport: {
                      read: function (e) {
                          // on success
                          e.success(milestoneSetDetailsData);
                      }
                  },
                  sort: [{
                      field: "SortOrder", dir: "asc"
                  }],
                  batch: true,
                  schema: {
                      model: {
                          id: "MilestoneID",
                          fields: {
                              SortOrder: { editable: false },
                              Milestone: {
                                  type: "string"
                              },
                              FunctionalGroupName: {
                                  type: "string"
                              },
                              FuntionalOwnerID: {
                                  type: "string"
                              },
                              IncludeInReport: {
                                  type: "boolean"
                              },
                              Comment: {
                                  type: "string"
                              },
                          }
                      }
                  },
              });
              if (IsFirstLoadMilestoneDetails == 1) {
                  var col = [{
                      field: "SortOrder",
                      title: " ",
                      width: 60,
                      template: function (e) {
                          return '<div class="row" style="margin: 0px !important;padding:0px""><div class="col-xs-6" style="padding:0px"><a class="k-button k-button-Custom btnUp filter_btn"><span class="fa fa-arrow-up"></span></a></div><div class="col-xs-6" style="padding:0px"><a class="k-button k-button-Custom btnDown filter_btn"><span class="fa fa-arrow-down"></span></a></div></div>'
                      },
                      editable: false
                  }, {
                      field: "Milestone",
                      title: "Milestone",
                      template: function (data) {
                          if (data.MilestoneType == 1) {
                              data.Milestone = data.Milestone.replace(MilestoneStartPrefix, "");
                              if (data.Milestone == MilestoneExecutionInsert || data.Milestone.trim() == "") {
                                  return ("<span class='RedQuality'><b>" + MilestoneStartPrefix + "</b>" + MilestoneExecutionInsert + "</span>");
                              }
                              else { return ("<b>" + MilestoneStartPrefix + "</b>" + data.Milestone); }
                          }
                          else if (data.MilestoneType == 2) {
                              data.Milestone = data.Milestone.replace(MilestoneEndPrefix, "");
                              if (data.Milestone == MilestoneExecutionInsert || data.Milestone.trim() == "") {
                                  return ("<span class='RedQuality'><b>" + MilestoneEndPrefix + "</b>" + MilestoneExecutionInsert + "</span>");
                              }
                              else { return ("<b>" + MilestoneEndPrefix + "</b>" + data.Milestone); }
                          }
                          else
                              return data.Milestone;
                      }
                  }, {
                      field: "FuntionalOwnerID",
                      title: "Functional Owner",
                      values: functionalgroupBulk,
                      editor: FunctionalOwnerDropDownEditor
                  }, {
                      field: "Comment",
                      title: "Comment",
                  },
                          {
                              field: "IncludeInReport",
                              title: "Include in Dashboard",
                              headerAttributes: { "class": "wrap-header" },
                              template: function (e) {
                                  if (e.IncludeInReport == true) {
                                      return dirtyField(e, 'IncludeInReport') + '<input type="checkbox" checked class="milestoneSetChk" />';
                                  }
                                  else {
                                      return dirtyField(e, 'IncludeInReport') + '<input type="checkbox" class="milestoneSetChk" />';
                                  }
                              }
                          }, {
                              command: [{
                                  name: " ",
                                  iconClass: "k-icon k-i-close",
                                  width: "10%",
                                  visible: function (dataItem) {
                                      if (dataItem.MilestoneType == 1)
                                          return false;
                                      else if (dataItem.MilestoneType == 2)
                                          return false;
                                      else
                                          return true;
                                  },
                                  click: function (e) {
                                      // prevent page scroll position change
                                      if (!confirm(gridDeleteMessage))
                                          e.preventDefault();
                                      else {
                                          e.preventDefault();
                                          var grid = $("#MilestoneSetDetailGrid").data("kendoGrid");
                                          // e.target is the DOM element representing the button
                                          var tr = $(e.target).closest("tr"); // get the current table row (tr)
                                          // get the data bound to the current table row
                                          
                                          var data = grid.dataItem(tr);
                                          if (data != undefined) {
                                              if (data.MilestoneID != undefined && data.MilestoneID != "")
                                                  vm.deletedMilestoneFromSetData.push({ "MilestoneID": data.MilestoneID });
                                          }
                                          grid.removeRow(tr);
                                          $scope.$digest();
                                      }
                                  }
                              }],
                          }];

                  $("#MilestoneSetDetailGrid").kendoGrid({
                      dataSource: MilestoneSetDetailDataSource,
                      allowCopy: true,
                      columns: col,
                      // selectable: true,
                      // sortable: true,
                      navigatable: true,
                      editable: {
                          createAt: "bottom"
                      },
                      dataBound: function () {
                       
                          $(".milestoneSetChk").on("click", function (e) {
                             // alert("hello");
                              dataItem = grid.dataItem($(e.target).closest("tr"));
                              dataItem.set("IncludeInReport", this.checked);
                              //   milestoneCount = $(":checked", grid.element).length;
                              // if (milestoneCount <= milestoneCharterCount)

                              //else {
                              //   alert(milestoneCountMessage);
                              //    e.preventDefault();
                              // }
                          });
                          var grid = $("#MilestoneSetDetailGrid").data("kendoGrid");
                          var grdItemsUpDwn = grid.dataItems().length;
                          /*************Hiding the up button on first row***************/
                          var FstItem = $("tr", grid.tbody)[0];
                          var editButton = $(FstItem).find(".btnUp");
                          editButton.hide();

                          /*************Hiding the down button on last row***************/
                          var LstItem = $("tr", grid.tbody)[grdItemsUpDwn - 1];
                          var editButton = $(LstItem).find(".btnDown");
                          editButton.hide();


                          /*************Up button in the Admin grid make the record up one step***************/
                          $(".btnUp").on("click", function (e) {
                              var selectedItem = $(this).closest("tr");
                              var selectedUid = selectedItem.attr("data-uid");
                              var itemIndex = selectedItem.index();
                              var dataItem = grid.dataItem(selectedItem);
                              $("#MilestoneSetDetailGrid").data("kendoGrid").dataSource.sort({});
                              var newIndex = itemIndex - 1;
                              var content = $(".k-grid-content");

                              if (newIndex <= 0) {
                                  newIndex = 0;
                              }

                              grid.dataSource.remove(dataItem);
                              grid.dataSource.insert(newIndex, dataItem);

                              grid.select("[data-uid=" + selectedUid + "]");
                              var cell = e.target.closest('td');
                              $(cell).prepend("<span class='k-dirty'></span>");
                              dataItem.dirty = true;

                              var grdItems = grid.dataItems();
                              angular.forEach(grdItems, function (curGrdItem, indx) {
                                  if (curGrdItem.SortOrder != (indx + 1) * 100) {
                                      curGrdItem.SortOrder = (indx + 1) * 100
                                      curGrdItem.dirty = true;
                                  }
                              });
                          });
                          /*************Up button in the Admin grid make the record up one step***************/
                          $(".btnDown").on("click", function (e) {
                              var selectedItem = $(this).closest("tr");
                              var selectedUid = selectedItem.attr("data-uid");
                              var itemIndex = selectedItem.index();
                              var dataItem = grid.dataItem(selectedItem);
                              var newIndex = itemIndex + 1;

                              if (newIndex < grid.dataSource.view().length) {
                                  grid.dataSource.remove(dataItem);
                                  grid.dataSource.insert(newIndex, dataItem);
                                  grid.select("[data-uid=" + selectedUid + "]");
                              }
                              $("#MilestoneSetDetailGrid").data("kendoGrid").dataSource.sort({});
                              var cell = e.target.closest('td');
                              $(cell).prepend("<span class='k-dirty'></span>");
                              var grdItems = grid.dataItems();
                              angular.forEach(grdItems, function (curGrdItem, indx) {
                                  if (curGrdItem.SortOrder != (indx + 1) * 100) {
                                      curGrdItem.SortOrder = (indx + 1) * 100
                                      curGrdItem.dirty = true;
                                  }
                              });
                          });

                      }
                  });
                  IsFirstLoadMilestoneDetails = 0;
              }
              else {
                  var gridMSDetails = $('#MilestoneSetDetailGrid').data('kendoGrid');
                  MilestoneSetDetailDataSource.read();
                  gridMSDetails.setDataSource(MilestoneSetDetailDataSource);
          }
              hideLoading();
            }
            catch (err) {
                hideLoading();
                var dataToSend = {
                    "method": "InitMilestoneDetailGrid", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
            }
       
        function FunctionalOwnerDropDownEditor(container, options) {
            $('<input name="' + options.field + '"/>') // kendoDropDownList
                .appendTo(container)
                .kendoComboBox({
                    autoBind: false,
                    dataTextField: "text",
                    dataValueField: "value",
                    filter: "contains",
                    valuePrimitive: true,
                    dataSource: functionalgroupBulk
                });
        };



































        //var col = [{
        //    field: "Milestone",
        //    title: "Milestone",
        //    headerAttributes: { "class": "wrap-header" },
        //}, {
        //    field: "FunctionalOwnerID",
        //    title: "Functional Group Name",
        //    headerAttributes: { "class": "wrap-header" },
        //}, {
        //    field: "IncludeInReport",
        //    title: "Include In Report",
        //    width: "10%",
        //}];
    

          
        //    $("#MilestoneSetDetailGrid").kendoGrid({
        //        dataSource: {
        //            data: milestoneSetDetailsData,
        //            sort: [{
        //                field: "SortOrder", dir: "asc"
        //            }]

        //        },
        //        // groupable: true,
        //        sortable: true,

               
        //        columns: col,

        //    });
        });
    }

    function showAlert(e) {
        if (!confirm(includeArchiveMsg))
            {
            vm.userInfo.includeArchived = false;
            e.preventDefault();
        }
        else
            vm.userInfo.includeArchived = true;
      //  $scope.$digest();
         
    }
    function saveMyPreference() {
        displayLoading();
        var dataToSend = { "userADId": currentUserId, "includeArchived": vm.userInfo.includeArchived};

        GETPostService.postDataWCF('updateUserPreference', dataToSend).then(function (response) {
            if (response == "Success") {
                hideLoading();
                window.location.href = portfolioCenterpath;
            }

        });
    }
    function initMyPreference() {
        displayLoading();
        console.log("Getting user AD Id");
        $.when(GETPostService.getUserAdID()).then(function (userId) {
            console.log("Got user AD Id");
            if (userId!="")
                prepareDataForMyPreference();
            //else window.location.href = errorPagePath;
        });
       // prepareDataForMyPreference();

    };
};
