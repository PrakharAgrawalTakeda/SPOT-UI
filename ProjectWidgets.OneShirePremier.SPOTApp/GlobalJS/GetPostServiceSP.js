"use strict";
angular.module('SPOTApp').service("GETPostService", function ($http, $q) {


    //*******************************************************************
    //Function to add data with POST request
    //Param : baseUrl : web url (i.e. : /_api/web/lists/getByTitle('List Title')/items)
    //Param : data : JSON data to add into list

    var postRequest = function (postData, baseUrl) {
        debugger
        var deferred = $q.defer();
        $http({
            url: baseUrl,
            method: "POST",
            headers: {
                /*"accept": "application/json;odata=verbose",
                "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
                "content-Type": "application/json;odata=verbose"*/
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "X-HTTP-Method": "POST"
            },
            data: JSON.stringify(postData)
        })
            .success(function (result) {
                deferred.resolve(result);
            })
            .error(function (data, status, headers, config) {

                //  var obj =generateErrorMsg(data, status, headers, config, baseUrl, postData);
                //alert('Error : '+JSON.stringify(result)+'\nError : '+status+'\n Url :'+baseUrl+'\n query:'+query);
                deferred.reject(data);

            });
        return deferred.promise;
    };

    //*******************************************************************
    //Function to get data with GET request
    //Param : baseUrl : web url (i.e. : _spPageContextInfo.siteAbsoluteUrl)
    //Param : query : List REST Api call with $select, $filter, $expand etc (i.e.: /_api/web/lists/getByTitle('List Title')/items?$select= ----- &$filter= )	
    var getRequest = function (baseUrl, query) {

        var deferred = $q.defer();
        $http({
            url: query,
            method: "GET",
            async: false,
            //cache: true,
            headers: {
                "accept": "application/json;odata=verbose",
                "content-Type": "application/json;odata=verbose"
            }
        })
            .then(function (result) {
                deferred.resolve(result);
            },
            function (data, status, headers, config) {

                // var obj =generateErrorMsg(data, status, headers, config, baseUrl, query);
                //alert('Error : '+JSON.stringify(result)+'\nError : '+status+'\n Url :'+baseUrl+'\n query:'+query);
                deferred.reject(data);
            });
        return deferred.promise;
    };

    var postRequestInsert = function (postData, baseUrl, listName) {
        debugger
        var deferred = $q.defer();
        //var listName = "Key_x0020_Assumption";
        listName = "SP.Data." + listName.charAt(0).toUpperCase() + listName.split(" ").join("").slice(1) + "ListItem";
        var metadata = { "__metadata": { "type": listName } };
        var datavalue = $.extend(metadata, postData[0])

        $http({
            url: baseUrl,
            method: "POST",
            headers: {
                /*"accept": "application/json;odata=verbose",
                "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
                "content-Type": "application/json;odata=verbose"*/
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "X-HTTP-Method": "POST"
            },
            data: JSON.stringify(datavalue)
        })
            .success(function (result) {
                deferred.resolve(result);
            })
            .error(function (data, status, headers, config) {

                //  var obj =generateErrorMsg(data, status, headers, config, baseUrl, postData);
                //alert('Error : '+JSON.stringify(result)+'\nError : '+status+'\n Url :'+baseUrl+'\n query:'+query);
                deferred.reject(data);

            });
        return deferred.promise;
    };
    function fnInsertSingleItemToList(data, listName) {
        try {
            var dfd = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle(listName);
            var itemCreateInfo = new SP.ListItemCreationInformation();
            this.oListItem = oList.addItem(itemCreateInfo);
            for (var i = 0 ; i < data.length ; i++)
                oListItem.set_item(data[i], data[i])
            //oListItem.set_item('Title', 'My New Item!');
            // oListItem.set_item('Body', 'Hello World!');
            oListItem.update();
            clientContext.load(oListItem);
            clientContext.executeQueryAsync(Function.createDelegate($scope, function () {
                //if (vm.deleteAttachFlag == true) {
                //    var deffAttachment = sfc.oe.utility.uploadFile("HRForm", vm.recordID, "fileinput");
                //    $.when(deffAttachment).then(function () {
                //        dfd.resolve("1");
                //    });
                //} else {
                dfd.resolve("1");
                // }
            }), Function.createDelegate($scope, function (sender, args) {
                dfd.resolve("0");
                console.log('Request failed--' + args.get_message() + '\n' + args.get_stackTrace());
            })
             );
        } catch (e) {
            dfd.resolve("0");
            console.log('Something went wrong for OE. Please try again\n');
        }

        return dfd.promise();
    }
    //var tasksProperties = [{ 'Title': 'Approval', 'Body': 'Planned Purchase Orders Approval' },
    //                   { 'Title': 'Aggrement', 'Body': 'Contract Purchase Agreements Approval' }];
    function fnInsertBatchItemToList(itemsProperties, listName) {
        try {
            var dfd = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle(listName);
            var items = [];

            for (var i = 0; i < itemsProperties.length; i++) {
                var itemCreateInfo = new SP.ListItemCreationInformation();
                var listItem = oList.addItem(itemCreateInfo);
                for (var propName in itemsProperties[i]) {
                    if ((itemsProperties[i][propName] != null || itemsProperties[i][propName] != undefined) && propName != "Id") {
                        listItem.set_item(propName, itemsProperties[i][propName])
                    }
                }
                listItem.update();
                clientContext.load(listItem);
                items.push(listItem);
            }
            clientContext.executeQueryAsync(Function.createDelegate(this, function () {
                dfd.resolve("1");
            }), Function.createDelegate(this, function (sender, args) {
                dfd.resolve("0");
                console.log('Request failed--' + args.get_message() + '\n' + args.get_stackTrace());
            })
             );
        } catch (e) {
            dfd.resolve("0");
            console.log('Something went wrong for OE. Please try again\n');
        }

        return dfd.promise();
    }

    function fnGetListData(listName, Id) {
        try {
            var dfd = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle(listName);
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='ID' /><Value Type='Number'>" + Id + "</Value></Eq></Where></Query></View>");
            //Get items by Query  
            var items = oList.getItems(camlQuery);
            //Load item collection  
            clientContext.load(items);

            clientContext.executeQueryAsync(Function.createDelegate(this,
       function () {
           var listItemEnumerator = items.getEnumerator();
           dfd.resolve(listItemEnumerator);
       }), Function.createDelegate(this, function (sender, args) {
           dfd.resolve("0");
           console.log('Request failed--' + args.get_message() + '\n' + args.get_stackTrace());
       })
   );
        } catch (e) {
            dfd.resolve("0");
            console.log('Something went wrong for OE. Please try again\n');
        }

        return dfd.promise();
    }

    function fnUpdateBatchItemToList(items, listName, Id) {
        try {
            var dfd = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle(listName);
            //var camlQuery = new SP.CamlQuery();
            //camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='ImD' /><Value Type='Number'>" + Id + "</Value></Eq></Where></Query></View>");
            ////Get items by Query  
            //var filterResult = oList.getItems(camlQuery);
            ////Load item collection  
            //clientContext.load(filterResult);

            clientContext.executeQueryAsync(Function.createDelegate(this,
       function () {
           //Check itemcollection count greater than 0  
           if (oList.get_count() > 0) {
               var dataEnum = oList.getEnumerator();
               while (dataEnum.moveNext()) {
                   var currentItem = dataEnum.get_current();
                   var progTitle = currentItem.get_item("Title");
                   var currentId = currentItem.get_item("ID");
                   var data = items.filter(function (elem) {

                       return elem.ID == currentId;
                   });
                   if (data.length > 0) {
                       //Get Item by current ID  
                       var listItem = oList.getItemById(currentId);
                       //for (var i = 0; i < data.length; i++) {

                       for (var propName in data[0]) {
                           if (propName != "ID" && (data[0][propName] != null || data[0][propName] != undefined)) {
                               listItem.set_item(propName, data[0][propName])
                           }
                       }
                       listItem.update();
                       clientContext.load(listItem);
                   }
                   // items.push(listItem);
                   // }

               }
               clientContext.executeQueryAsync(Function.createDelegate(this, function (sender, args) {
                   //Item Updated sucess  
                   alert("Items are updated Successfully");
                   dfd.resolve("1");

               }), Function.createDelegate(this, function (sender, args) {
                   dfd.resolve("0");
                   console.log('Request failed--' + args.get_message() + '\n' + args.get_stackTrace());
               }));
           }
           else {
               dfd.resolve();
           }
           // }
       }), Function.createDelegate(this, function (sender, args) {
           dfd.resolve("0");
           console.log('Request failed--' + args.get_message() + '\n' + args.get_stackTrace());
       })
   );







        } catch (e) {
            dfd.resolve("0");
            console.log('Something went wrong for OE. Please try again\n');
        }

        return dfd.promise();
    }
    function fnInsertGridDataToList(itemsProperties, listName) {
        try {
            var dfd = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle(listName);
            var items = [];

            for (var i = 0; i < itemsProperties.length; i++) {
                var itemCreateInfo = new SP.ListItemCreationInformation();
                var listItem = oList.addItem(itemCreateInfo);
                var dirtyfields = itemsProperties[i].dirtyFields;
                if (Object.keys(dirtyfields).length > 0) {
                    for (var j = 0; j < Object.keys(dirtyfields).length; j++) {
                        if (Object.keys(dirtyfields)[j] == "IR_x0020_ImpactId" || Object.keys(dirtyfields)[j] == "ProbabilityId" || Object.keys(dirtyfields)[j] == "FunctionId") {
                            var lookup = new SP.FieldLookupValue();
                            lookup.set_lookupId(itemsProperties[i][Object.keys(dirtyfields)[j]])
                            listItem.set_item(Object.keys(dirtyfields)[j].replace("Id", ""), itemsProperties[i][Object.keys(dirtyfields)[j]])
                        }
                        else {
                            listItem.set_item(Object.keys(dirtyfields)[j], itemsProperties[i][Object.keys(dirtyfields)[j]])
                        }
                    }

                }
                //for (var propName in itemsProperties[i]) {
                //    if (Object.keys(monthlyPlanData[i].dirtyFields).length > 0)
                //    {

                //    }
                //    if ((itemsProperties[i][propName] != null || itemsProperties[i][propName] != undefined) && propName != "Id") {
                //        listItem.set_item(propName, itemsProperties[i][propName])
                //    }
                //}
                listItem.update();
                clientContext.load(listItem);
            }
            clientContext.executeQueryAsync(Function.createDelegate(this, function () {
                dfd.resolve("1");
            }), Function.createDelegate(this, function (sender, args) {
                dfd.resolve("0");
                console.log('Request failed--' + args.get_message() + '\n' + args.get_stackTrace());
            })
             );
        } catch (e) {
            dfd.resolve("0");
            console.log('Something went wrong for OE. Please try again\n');
        }

        return dfd.promise();
    }
    function fnUpdateGridDataToList(itemsProperties, listName) {
        try {
            var dfd = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle(listName);
            var items = [];
            clientContext.executeQueryAsync(Function.createDelegate(this,
            function () {
                for (var i = 0; i < itemsProperties.length; i++) {
                    var listItem
                    var dirtyfields = itemsProperties[i].dirtyFields;
                    if (Object.keys(dirtyfields).length > 0) {
                        var itemId = itemsProperties[i].Id;
                        listItem = oList.getItemById(itemId);
                        for (var j = 0; j < Object.keys(dirtyfields).length; j++) {
                            if (Object.keys(dirtyfields)[j] == "IR_x0020_ImpactId" || Object.keys(dirtyfields)[j] == "ProbabilityId" || Object.keys(dirtyfields)[j] == "FunctionId") {
                                var lookup = new SP.FieldLookupValue();
                                lookup.set_lookupId(itemsProperties[i][Object.keys(dirtyfields)[j]])
                                listItem.set_item(Object.keys(dirtyfields)[j].replace("Id", ""), itemsProperties[i][Object.keys(dirtyfields)[j]])
                            }
                            else {
                                listItem.set_item(Object.keys(dirtyfields)[j], itemsProperties[i][Object.keys(dirtyfields)[j]])
                            }
                        }
                        listItem.update();
                        clientContext.load(listItem);

                    }

                }
                clientContext.executeQueryAsync(Function.createDelegate(this, function () {
                    dfd.resolve("1");
                }), Function.createDelegate(this, function (sender, args) {
                    dfd.resolve("0");
                    console.log('Request failed--' + args.get_message() + '\n' + args.get_stackTrace());
                })
                );
            }), Function.createDelegate(this, function (sender, args) {
                dfd.resolve("0");
                console.log('Request failed--' + args.get_message() + '\n' + args.get_stackTrace());
            })
    );
        } catch (e) {
            dfd.resolve("0");
            console.log('Something went wrong for OE. Please try again\n');
        }


        return dfd.promise();
    }

    function getDataWCF(methodName) {
        var deferred = $q.defer();
        var serviceUrl = serviceUrl;
        var url = serviceUrl + "/" & methodName;
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            dataType: "json",
            processData: true,
            async: false,
            success: function (data) {
                console.log("Success");
                //var a = JSON.parse(data.getPortfolioOwnerResult);
                deferred.resolve(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus, errorThrown);
                deferred.reject(data);
            }
        });
        return deferred.promise;
    };
    function postDataWCF(methodName, parameter) {
        var deferred = $q.defer();
        var serviceUrl = serviceUrl;
        var url = serviceUrl + "/" & methodName;
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(parameter),
            contentType: "application/json",
            dataType: "json",
            processData: true,
            async: false,
            success: function (data) {
                console.log("Success");
                deferred.resolve(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus, errorThrown);
                deferred.reject(data);
            }
        });
        return deferred.promise;
    }

    return {
        postRequest: postRequest,
        getRequest: getRequest,
        postRequestInsert: postRequestInsert,
        fnUpdateBatchItemToList: fnUpdateBatchItemToList,
        fnGetListData: fnGetListData,
        fnInsertBatchItemToList: fnInsertBatchItemToList,
        fnInsertGridDataToList: fnInsertGridDataToList,
        fnUpdateGridDataToList: fnUpdateGridDataToList,
        getDataFromWCF: getDataFromWCF
    }

});
