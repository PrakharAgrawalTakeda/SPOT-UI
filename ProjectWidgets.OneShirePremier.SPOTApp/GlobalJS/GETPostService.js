"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').service("GETPostService", function ($http, $q) {
    var canFilter = false;
    // canProjFilter = false;
    var className = "GetPostService";

    function getDataWCFAsync(methodName) {
        var deferred = $q.defer();
        var wcfServiceUrl = serviceUrl;
        var url = wcfServiceUrl + "/" + methodName;
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            dataType: "json",
            processData: true,
            async: true,
            cache: false,
            success: function (data) {
                console.log("Success");
                //var a = JSON.parse(data.getPortfolioOwnerResult);
                deferred.resolve(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoading();
                console.log(textStatus, errorThrown + methodName);
                deferred.reject(errorThrown);
            }
        });
        return deferred.promise;
    };
    function postDataWCFAsync(methodName, parameter) {
        var deferred = $q.defer();
        var wcfServiceUrl = serviceUrl;
        var url = wcfServiceUrl + "/" + methodName;
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(parameter),
            contentType: "application/json",
            dataType: "json",
            processData: true,
            async: true,
            success: function (data) {
                console.log("Success");
                deferred.resolve(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoading();
                if (methodName != 'getGlobalMessage') {
                    alert(textStatus, errorThrown);
                    console.log(methodName + ' ' + errorThrown);
                    deferred.reject(errorThrown);
                }
                else {
                    console.log(methodName + ' ' + errorThrown);
                    deferred.resolve('');
                }


            }
        });
        return deferred.promise;
    }

    function getDataWCF(methodName) {
        var deferredGetData = $q.defer();
        var wcfServiceUrl = serviceUrl;
        var url = wcfServiceUrl + "/" + methodName;
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            dataType: "json",
            processData: true,
            async: false,
            cache: false,
            success: function (data) {
                console.log("Success");
                //var a = JSON.parse(data.getPortfolioOwnerResult);
                deferredGetData.resolve(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoading();
                console.log(textStatus, errorThrown + methodName);
                deferredGetData.reject(errorThrown);
            }
        });
        return deferredGetData.promise;
    };
    function postDataWCF(methodName, parameter) {
        var deferred = $q.defer();
        var wcfServiceUrl = serviceUrl;
        var url = wcfServiceUrl + "/" + methodName;
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
                hideLoading();
                if (methodName == "getGlobalMessage") {
                    alert(textStatus, errorThrown);
                    deferred.reject(errorThrown);
                }
                else {
                    console.log(methodName + ' ' + errorThrown);
                    deferred.resolve('');
                }
            }
        });
        return deferred.promise;
    }
    function getUserAdID() {
        var deferred = $q.defer();
        try {
            if (window.location.hostname !== "localhost")
            {
                $.get(authUrl + "/.auth/me", function (data, status) {
                    for (var key in data[0]["user_claims"]) {
                        var obj = data[0]["user_claims"][key];
                        if (obj.typ == "http://schemas.microsoft.com/identity/claims/objectidentifier") {
                            currentUserId = obj.val;
                        }
                        if (obj.typ == "name") {
                            currentUserName = obj.val;
                        }
                        if (currentUserName != "" && currentUserId != "") {
                            deferred.resolve(currentUserId);
                            break;
                        }

                    }

                }).fail(function () {
                    //   window.location.href = portfolioCenterpath;
                });
                return deferred.promise;
            }
        }
        catch (err) {
            console.log("authUrl");
            hideLoading();
            deferred.resolve("");
            return deferred.promise;
            // window.location.href = "https://login.microsoftonline.com";            
            // return false;
        }

    };
    function searchPeople(event, inputId) {
        //if (event.keyCode === 13 || event.keyCode === 8) {
        //    var peopleSearchAuto = $("#" + inputId).data("kendoComboBox");
        //    if (peopleSearchAuto != undefined && peopleSearchAuto != null) { peopleSearchAuto.close(); }
        //}
        if (event.keyCode === 13) {
            var textLength = event.target.value.length;
            if (textLength < 3) {
                alert(minThreeLetterMsg);
                var peopleSearchAuto = $("#" + inputId).data("kendoComboBox");
                peopleSearchAuto.close();
                return false;
            }
            else {

                displayLoading();

                var dataToSend = {
                    "UserDepartment": "All", "FilterString": event.target.value
                };

                $.when(postDataWCFAsync("getUserDataWithFilter", dataToSend)).then(function (resPeople) {

                    var dsResListPeople = JSON.parse(resPeople);
                    if (dsResListPeople.length < 1000) {
                        var dataSource = new kendo.data.DataSource({
                            transport: {
                                read: function (e) {
                                    // on success
                                    e.success(dsResListPeople);
                                }
                            }
                        });
                        var combobox = $("#" + inputId).data("kendoComboBox");
                        combobox.setDataSource(dataSource);
                        combobox.dataSource.read();
                        //$("#" + inputId).kendoComboBox({

                        //    suggest: true,
                        //    dataSource: dsResListPeople,
                        //    dataTextField: "UserDisplayName",
                        //    dataValueField: "UserADId",
                        //    placeholder: "'Select and/or Type to Search'",
                        //    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                        //        '<span>Photo</span>' +
                        //        '<span>Contact info</span>' +
                        //        '</div>',

                        //    // using {{angular}} templates:
                        //    valueTemplate: '<span class="selected-value" style="background-image: url(\'#: data.UserImageUrl #\')"></span><span>#: data.UserDisplayName #</span>',

                        //    template: '<span class="k-state-default" style="background-image: url(\'#: data.UserImageUrl #\')"></span>' +
                        //        '<span class="k-state-default"><h3>#: data.UserDisplayName #</h3><p>#: data.UserEmailAddress #</p><p>#: data.UserDepartment # #: data.UserCountry #</p></span>',

                        //});

                        hideLoading();

                        //var sampleddsearch = $("#" + inputId).data("kendoComboBox");
                        //sampleddsearch.open();
                    }
                    else {
                        if (!confirm(userDataMessage)) {
                            hideLoading();
                            return false;
                            //event.preventDefault();
                        }
                        else {
                            var dataSource = new kendo.data.DataSource({
                                transport: {
                                    read: function (e) {
                                        // on success
                                        e.success(dsResListPeople);
                                    }
                                }
                            });
                            var combobox = $("#" + inputId).data("kendoComboBox");
                            combobox.setDataSource(dataSource);
                            combobox.dataSource.read();
                            //$("#" + inputId).kendoComboBox({

                            //    suggest: true,
                            //    dataSource: dsResListPeople,
                            //    dataTextField: "UserDisplayName",
                            //    dataValueField: "UserADId",
                            //    placeholder: "'Select and/or Type to Search'",
                            //    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                            //        '<span>Photo</span>' +
                            //        '<span>Contact info</span>' +
                            //        '</div>',

                            //    // using {{angular}} templates:
                            //    valueTemplate: '<span class="selected-value" style="background-image: url(\'#: data.UserImageUrl #\')"></span><span>#: data.UserDisplayName #</span>',

                            //    template: '<span class="k-state-default" style="background-image: url(\'#: data.UserImageUrl #\')"></span>' +
                            //        '<span class="k-state-default"><h3>#: data.UserDisplayName #</h3><p>#: data.UserEmailAddress #</p><p>#: data.UserDepartment # #: data.UserCountry #</p></span>',

                            //});
                            hideLoading();


                        }
                    }
                    var usersearch = $("#" + inputId).data("kendoComboBox");
                    usersearch.open();

                });
            }
        }
        else {
            var usersearch = $("#" + inputId).data("kendoComboBox");
            usersearch.close();
        }
    };
    function setDefaultUser(inputId) {
        var deferred = $q.defer();
        var dataToSend = {
            "UserDepartment": "All", "FilterString": currentUserName
        };
        $.when(postDataWCF("getUserDataWithFilter", dataToSend)).then(function (resPeople) {

            var dsResListPeople = JSON.parse(resPeople);
            var currentUser = dsResListPeople.filter(function (entry) {
                return entry.UserADId === currentUserId;
            });
            $("#" + inputId).kendoComboBox({

                suggest: false,
                dataSource: dsResListPeople,
                minLength: 3,
                filtering: function (e) {
                    e.preventDefault();
                },
                dataTextField: "UserDisplayName",
                dataValueField: "UserADId",
                placeholder: peoplepickerPlaceholder,
                headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                    '<span>Photo</span>' +
                    '<span>Contact info</span>' +
                    '</div>',

                // using {{angular}} templates:
                valueTemplate: '<span class="selected-value" style="background-image: url(\'#: data.UserImageUrl #\')"></span><span>#: data.UserDisplayName #</span>',

                template: '<span class="k-state-default" style="background-image: url(\'#: data.UserImageUrl #\')"></span>' +
                    '<span class="k-state-default"><h3>#: data.UserDisplayName #</h3><p>#: data.UserEmailAddress #</p><p>#: data.UserDepartment # #: data.UserCountry #</p></span>',

            });


            //var sampledd = $("#" + inputId).data("kendoComboBox");
            //sampledd.input.keydown(userControlSearch);

            var sampledValue = $("#" + inputId).data("kendoComboBox");
            sampledValue.value(currentUser[0].UserADId);
            deferred.resolve("success");
        });
        return deferred.promise;
    };
    function onFiltering(e) {
        e.preventDefault();
        //   alert(e.sender.filter().filters.length);
        //var multiselect =(e.sender.input[0]).data("kendoMultiSelect");
        //// Close the suggestion popup
        //multiselect.close();
        canFilter = true;
    }
    //Generic method for custom user selector control with three parameter
    //1. Id if the control which we want to make multiselect
    //2. array of current additional authors user objects which needs to be displayed as selected on load
    //3. Current Additional author's userID's in comma seperated form
    function searchPeopleMultiselect(inputId, SelectedPpl, siteUsers) {
        var selectedPeoplefilter = "";
        var multiselect = $("#" + inputId).data("kendoMultiSelect");
        if (multiselect == undefined) {
            $("#" + inputId).kendoMultiSelect({
                dataTextField: "UserDisplayName",
                dataValueField: "UserADId",
                dataSource: siteUsers,
                minLength: 3,
                filtering: onFiltering,
                value: SelectedPpl,
                placeholder: peoplepickerPlaceholder,

                valueTemplate: '<span class="selected-value" style="background-image: url(\'#: data.UserImageUrl #\')"></span><span>#: data.UserDisplayName #</span>',

                //template: '<span class="k-state-default" style="background-image: url(\'#: data.UserImageUrl #\')"></span>' +
                //    '<span class="k-state-default"><h3>#: data.UserDisplayName #</h3><p>#: data.UserEmailAddress #</p><p>#: data.UserDepartment # #: data.UserCountry #</p></span>',
                template: '<span class="k-state-default" style="background-image: url(\'#: data.UserImageUrl #\')"></span>' +
                    '<span class="k-state-default"><h3>#: data.UserDisplayName #</h3># if (data.UserEmailAddress != null) {#<p>#: data.UserEmailAddress #</p># }if (data.UserDepartment != null) {#<p><span>#: data.UserDepartment #</span># }if (data.UserCountry != null) {# <span> #: data.UserCountry #</span></p># } #</span>',

            });

            $('#' + inputId).data().kendoMultiSelect.input.on('keydown', function (e) {
                if (e.keyCode == 13) {
                    if (canFilter == true) {
                        var multiselectppl = $("#" + inputId).data("kendoMultiSelect");
                        var alreadySearched = multiselectppl.value();
                        var userFilter = "";
                        angular.forEach(alreadySearched, function (item, index) {
                            userFilter = userFilter + "," + item
                        });
                        selectedPeoplefilter = userFilter.substring(1, userFilter.length)
                        console.log(multiselectppl.value());
                        var input = multiselectppl.input[0].value;
                        console.log(input);
                        if (input.length >= 3) {
                            displayLoading();
                            var dataToSend = {
                                "UserDepartment": "All", "FilterString": input, "AlreadySearchedUser": selectedPeoplefilter
                            };
                            $.when(postDataWCFAsync("getUserDataWithFilterMultiple", dataToSend))
                                .then(function (resPeople) {
                                    var siteUsers = JSON.parse(resPeople);
                                    multiselectppl.setDataSource(siteUsers);
                                    multiselectppl.open();
                                    hideLoading();
                                });
                        }
                        else {
                            alert(minThreeLetterMsg);

                            var multiselectppl = $("#" + inputId).data("kendoMultiSelect");
                            multiselectppl.close();
                        }
                    }
                    else {
                        alert(minThreeLetterMsg);

                        var multiselectppl = $("#" + inputId).data("kendoMultiSelect");
                        multiselectppl.close();
                    }
                }
                else {
                    var multiselectppl = $("#" + inputId).data("kendoMultiSelect");
                    multiselectppl.close();
                }
            });
        }
        else {
            multiselect.setDataSource(siteUsers);
            multiselect.value(SelectedPpl);
        }
        return selectedPeoplefilter;
    }
    function searchProjectParentMultiselect(inputId, dsProjects, searchFor, SelectedParentProj, UserAdId) {
        var selectedParentProfilter = "";
        var multiselect = $("#" + inputId).data("kendoMultiSelect");
        if (multiselect == undefined) {
            $("#" + inputId).kendoMultiSelect({
                dataTextField: "ProjectName",
                dataValueField: "ProblemUniqueID",
                dataSource: dsProjects,
                minLength: 3,
                value: SelectedParentProj,
                placeholder: projectPickerPlaceholder,

            });
            $('#' + inputId).data().kendoMultiSelect.input.on('keydown', function (e) {
                if (e.keyCode == 13) {

                    var projCombo = $("#" + inputId).data("kendoMultiSelect");
                    var alreadySearched = projCombo.value();
                    var parentProjFilter = "";
                    angular.forEach(alreadySearched, function (item, index) {
                        parentProjFilter = parentProjFilter + "," + item
                    });
                    selectedParentProfilter = parentProjFilter.substring(1, parentProjFilter.length)
                    console.log(projCombo.value());
                    var input = projCombo.input[0].value;
                    console.log(input);
                    if (input.length >= 3) {
                        displayLoading();
                        var dataToSend = {
                            "SearchFor": searchFor, "FilterString": input, "AlreadySearchedProject": selectedParentProfilter, "UserAdId": UserAdId
                        };
                        $.when(postDataWCFAsync("getAllProjectListFilterMultiple", dataToSend))
                            .then(function (resProj) {
                                var dsProjects = JSON.parse(resProj);
                                projCombo.setDataSource(dsProjects);
                                projCombo.open();
                                hideLoading();
                            });
                    }
                    else {
                        alert(minThreeLetterMsg);

                        var projCombo = $("#" + inputId).data("kendoMultiSelect");
                        projCombo.close();
                    }

                }
                else {
                    var projCombo = $("#" + inputId).data("kendoMultiSelect");
                    projCombo.close();
                }
            });
        }
        else {
            multiselect.setDataSource(dsProjects);
            multiselect.value(SelectedParentProj);
        }
        return selectedParentProfilter;
    }
    function searchPeopleBulkEdit(event, inputId) {
        var deferred = $q.defer();

        //if (event.keyCode === 13 || event.keyCode === 8) {
        //    var peopleSearchAuto = $("#" + inputId).data("kendoComboBox");
        //    if (peopleSearchAuto != undefined && peopleSearchAuto != null) { peopleSearchAuto.close(); }
        //}
        if (event.keyCode === 13) {
            var textLength = event.target.value.length;
            if (textLength < 3) {
                alert(minThreeLetterMsg);
                var peopleSearchAuto = $("#" + inputId).data("kendoComboBox");
                peopleSearchAuto.close();
                return false;
            }
            else {
                //displayLoading();
                var dataToSend = {
                    "UserDepartment": "All", "FilterString": event.target.value
                };

                $.when(postDataWCFAsync("getUserDataWithFilter", dataToSend)).then(function (resPeople) {

                    var dsResListPeople = JSON.parse(resPeople);
                    if (dsResListPeople.length < 1000) {
                        var dataSource = new kendo.data.DataSource({
                            transport: {
                                read: function (e) {
                                    // on success
                                    e.success(dsResListPeople);
                                }
                            }
                        });
                        var combobox = $("#" + inputId).data("kendoComboBox");
                        if (combobox != undefined) {
                            combobox.setDataSource(dataSource);
                            combobox.dataSource.read();
                        }
                        hideLoading();
                    }
                    else {
                        if (!confirm(userDataMessage)) {
                            hideLoading();
                            return false;
                            //event.preventDefault();
                        }
                        else {
                            var dataSource = new kendo.data.DataSource({
                                transport: {
                                    read: function (e) {
                                        // on success
                                        e.success(dsResListPeople);
                                    }
                                }
                            });
                            var combobox = $("#" + inputId).data("kendoComboBox");
                            if (combobox != undefined) {
                                combobox.setDataSource(dataSource);
                                combobox.dataSource.read();
                            }
                            hideLoading();
                        }
                    }
                    var userselect = $("#" + inputId).data("kendoComboBox");
                    userselect.open();
                    deferred.resolve(dsResListPeople);
                });
            }
        }
        else {
            var userselect = $("#" + inputId).data("kendoComboBox");
            userselect.close();
        }
        return deferred.promise;
    };
    
    function getSharepointDocuments(url, token, listTitle, allDocuments, deferredSharepointDoc) {
        var tDocu = [];
        try {
            $.ajax({
                url: url,
                //url: "https://projectwidgets1.sharepoint.com/sites/spotTeamSite1/[CONF]%20keertrtutu/_api/web/lists/getbytitle('" + listTitle + "')/items?$select=ID,FileLeafRef,FileDirRef,FileSystemObjectType,FileRef,Modified,ServerRedirectedEmbedUri,DocIcon,EncodedAbsUrl,Editor/Title,Author/Title&$expand=Editor,Author,File",
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application / json; odata=verbose"
                },
                success: function (data) {
                    console.log(data);
                    // tDocu.concat(data);
                    allDocuments.push.apply(allDocuments, data.d.results);
                    var nextlink = data.d.__next != null ? data.d.__next : null;

                    if (nextlink != null) {
                        //count = count + 1;
                        getSharepointDocuments(nextlink, token, listTitle, allDocuments, deferredSharepointDoc);
                    }
                    else {

                        //tDocu.push.apply(tDocu, allDocuments);
                        deferredSharepointDoc.resolve(allDocuments);
                    }
                    // createColumn(token);

                },
                error: function (err) {
                    hideLoading();
                    console.log(err.responseText);
                    var dataToSend = {
                        "method": "getSharepointDocuments", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            alert(errormessage);
                        });
                    deferredSharepointDoc.reject(err);
                }
            });
            return deferredSharepointDoc.promise;
        }
        catch (err) {
            var dataToSend = {
                "method": "getSharepointDocuments", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }

    }
    function addDocumentToLibrary(listTitle, fileUploadControlId, token, folderName) {
        var dfd = jQuery.Deferred();
        try {
            var newFileName = fileUploadControlId.name;
            var queryUrl = null;
            //var monitorFileReading = readFileAsArray1(fileUploadControlId)
            //monitorFileReading.then(
            //    function (arrayBuffer) {
            //        alert("read successfukl");
            //    });

            var monitorFileReading = readFileAsArray(fileUploadControlId);
            monitorFileReading.done(
                // File has been loaded in memory now we can start uploading into the SharePoint Library
                function (arrayBuffer) {
                    if (folderName == null) {
                        queryUrl = ProjectSiteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/RootFolder/Files/Add(url='" + newFileName + "',overwrite=true)?$expand=ListItemAllFields";
                    }
                    else {
                        var url = ProjectSiteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/RootFolder";
                        var item = folderName.split("/");
                        for (var i = 0; i < item.length; i++) {
                            if (item[i] != "") {
                                url = url + "/folders('" + item[i] + "')";
                            }
                        }
                        queryUrl = url + "/Files/Add(url='" + newFileName + "',overwrite=true)?$expand=ListItemAllFields";
                    }
                    // Now lets make a ajax call to SharePoint server to upload our file using REST
                    $.ajax({
                        url: queryUrl,
                        method: 'POST',
                        async: false,
                        data: arrayBuffer,
                        processData: false,
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "Authorization": "Bearer " + token,
                            "content-length": arrayBuffer.length,
                            "IF-MATCH": "*"
                        },
                        success: function (data) {
                            var ItemId = data.d.ListItemAllFields.ID;

                            console.log("File uploaded");
                            UpdateCreatedByModifiedBy(token, ItemId, listTitle, 1);
                            dfd.resolve("Success");
                        },
                        error: function (err) {
                            hideLoading();
                            console.log(err.responseText);
                            dfd.reject(err);
                        }
                    });
                }
            );

            monitorFileReading.fail(function (err) {
              
                console.log(err.responseText);
                dfd.resolve(err);
            });
            //});

        } catch (err) {
            hideLoading();
            var dataToSend = {
                "method": "addDocumentToLibrary", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            console.log(err.responseText);
            dfd.reject(err);
        }
        return dfd.promise();
    };
    function readFileAsArray1(fileUploadCntrl) {
        var deferred = jQuery.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.target.result);
        }
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        }
        reader.readAsArrayBuffer(fileUploadCntrl);
        return deferred.promise();
    };
    function readFileAsArray(fileUploadCntrl) {
        var deferred = jQuery.Deferred();
        var raw = fileUploadCntrl.rawFile;
        var reader = new FileReader();
        if (raw) {
            reader.onloadend = function () {
                var content = this.result;
                deferred.resolve(content);
            };
            reader.onerror = function (e) {
                deferred.reject(e.target.error);
            }
            reader.readAsArrayBuffer(raw);
            return deferred.promise();
        }

    };
    function createFolderToLibrary(listTitle, token, folderPath, folderName) {
        var dfd = jQuery.Deferred();
        try {
            var queryUrl = null;
            var path;
            // path = "Shared Documents/";
            if (folderPath != "") {
                path = folderPath + "/" + folderName;
                queryUrl = ProjectSiteUrl + "/_api/web/Folders/Add('" + path + "')?$expand=ListItemAllFields";
            }
            $.ajax({
                url: queryUrl,
                method: 'POST',
                async: false,
                processData: false,
                headers: {
                    "Authorization": "Bearer " + token,
                    "content-type": "application/json; odata=verbose",
                    "accept": "application/json; odata=verbose",
                    "X-HTTP-Method": "POST"
                },
                success: function (data) {
                    var ItemId = data.d.ListItemAllFields.ID;
                    dfd.resolve("Folder created Successfully.");
                    UpdateCreatedByModifiedBy(token, ItemId, listTitle, 1);

                },
                error: function (err) {
                   
                    hideLoading();
                    console.log(err.responseText);
                    dfd.resolve(err);
                }
            });

        } catch (err) {
            console.log(err.responseText);
            dfd.resolve(err);
        }
        return dfd.promise();
    };
    function createProjectSite(token, title, isConfidentialProject) {
        var dfd = jQuery.Deferred();
        try {
            $.ajax({
                url: rootSiteUrl + "/" + siteTemplate + "/_api/web/webinfos/add",
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    'parameters': {
                        '__metadata': {
                            'type': 'SP.WebInfoCreationInformation'
                        },
                        'Url': SelectedProblemId,
                        'Title': title,
                        'Description': title,
                        'Language': 1033,
                        //'WebTemplate': "{6CC2571F-1CDC-4149-955B-D1A165A2B0A0}",
                        'WebTemplate': 'sts', //team site
                        'UseUniquePermissions': isConfidentialProject == true ? true : false
                    }
                }),
                success: function (data) {

                    hideLoading();
                    console.log('success');
                    ProjectSiteUrl = rootSiteUrl + "/" + siteTemplate + "/" + SelectedProblemId;

                    createColumn(token, "CreatedByCustom");
                    createColumn(token, "ModifiedByCustom");
                    createColumn(token, "ModifiedTimeCustom");
                    if (isConfidentialProject == true) {
                        createSPGroup(token);
                        dfd.resolve("Success");
                    }
                    else
                        dfd.resolve("Success");
                },
                error: function (err) {
                    //alert("Error in Project site creation.");
                    if (JSON.parse(err.responseText).error.message.value.includes("already in use") == true) {
                        //alert(JSON.parse(err.responseText).error.message.value);
                        ProjectSiteUrl = rootSiteUrl + "/" + siteTemplate + "/" + SelectedProblemId;
                        hideLoading();
                        console.log(err);
                       
                        createColumn(token, "CreatedByCustom");
                        createColumn(token, "ModifiedByCustom");
                        createColumn(token, "ModifiedTimeCustom");
                        if (isConfidentialProject == true) {
                            createSPGroup(token);
                            dfd.resolve("already exist");
                        }
                        else
                            dfd.resolve("already exist");
                    }
                    else {
                        hideLoading();
                        console.log(err);
                        dfd.resolve(err);
                    }
                    
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "createProjectSite", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            dfd.resolve(err);
        }
        return dfd.promise();
    }
    function createProjectSiteForMigrate(token, rootSiteUrlMP, siteTemplateMP, SelectedProblemId , title, isConfidentialProject) {
        var dfdMP = jQuery.Deferred();
        try {
            $.ajax({
                url: rootSiteUrlMP + "/" + siteTemplateMP + "/_api/web/webinfos/add",
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    'parameters': {
                        '__metadata': {
                            'type': 'SP.WebInfoCreationInformation'
                        },
                        'Url': SelectedProblemId,
                        'Title': title,
                        'Description': title,
                        'Language': 1033,
                        //'WebTemplate': "{6CC2571F-1CDC-4149-955B-D1A165A2B0A0}",
                        'WebTemplate': 'sts',
                        'UseUniquePermissions': isConfidentialProject == true ? true : false
                    }
                }),
                success: function (data) {

                    hideLoading();
                    console.log('success');
                    ProjectSiteUrl = rootSiteUrlMP + "/" + siteTemplateMP + "/" + SelectedProblemId;

                    createColumn(token, "CreatedByCustom");
                    createColumn(token, "ModifiedByCustom");
                    createColumn(token, "ModifiedTimeCustom");
                    //if (isConfidentialProject == true) {
                    //    createSPGroup(token);
                    //    dfd.resolve("Success");
                    //}
                    //else
                    dfdMP.resolve("Success",ProjectSiteUrl);
                },
                error: function (err) {
                    //alert("Error in Project site creation.");
                    alert(JSON.parse(err.responseText).error.message.value);
                    hideLoading();
                    console.log(err);
                    dfdMP.resolve(err,"");
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "createProjectSiteForMigrate", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            dfdMP.resolve(err);
        }
        return dfdMP.promise();
    }
    function createSPGroup(token) {
        try {
            $.ajax({
                url: ProjectSiteUrl + '/_api/Web/SiteGroups',
                type: "POST",
                async: false,
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    '__metadata': {
                        'type': 'SP.Group'
                    },
                    'Title': SelectedProblemId + spGroupSuffix,
                    'Description': SeletedProjectName
                }),
                success: function (data) {
                    console.log(data);
                    assignPermissionToGroupOnProjectSite(token, data.d.Id);
                    //dfd.resolve("Success");
                },
                error: function (err) {
                    alert("Error in creating SP group");
                    hideLoading();
                    console.log(err);
                    //dfd.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "createSPGroup", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });

        }
    }
    function assignPermissionToGroupOnProjectSite(token, groupId) {
        var dfdPermission = jQuery.Deferred();
        try {
            $.ajax({
                url: ProjectSiteUrl + '/_api/web/roleassignments/addroleassignment(principalid=' + groupId + ', roledefid=1073741827)', //1073741829 (Full Control)
                type: "POST",
                async: false,
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    console.log(data);
                    getGroupIdSPOTPMT(token, false, SPOTPMTGroupName);
                    dfdPermission.resolve("Success");
                },
                error: function (err) {
                    alert("Error in assigning permission to confidential SP group");
                    hideLoading();
                    console.log(err);
                    dfdPermission.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "assignPermissionToGroupOnProjectSite", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            dfdPermission.resolve(err);
        }
        return dfdPermission.promise();
    }
    function getGroupIdSPOTPMT(token, isGroupDelete, groupName) {
        //var dfdPermission = jQuery.Deferred();
        try {
            $.ajax({
                url: ProjectSiteUrl + '/_api/web/sitegroups/getbyname(\'' + groupName + '\')?$select=id', //1073741829 (Full Control)
                type: "GET",
                async: false,
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    console.log(data);
                    if (isGroupDelete == false)
                        assignPermissionToGroupSPOTPMT(token, data.d.Id);
                    else
                        deleteSPConfidentialGroup(token, data.d.Id);
                    //dfdPermission.resolve("Success");
                },
                error: function (err) {
                    alert("Error in getting group Id for SPOTPMT");
                    hideLoading();
                    console.log(err);
                    // dfdPermission.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "getGroupIdSPOTPMT", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            //   dfdPermission.resolve(err);
        }
        // return dfdPermission.promise();
    }
    function assignPermissionToGroupSPOTPMT(token, groupId) {
        // var dfdPermission = jQuery.Deferred();
        try {
            $.ajax({
                url: ProjectSiteUrl + '/_api/web/roleassignments/addroleassignment(principalid=' + groupId + ', roledefid=1073741829)', //1073741829 (Full Control)
                type: "POST",
                async: false,
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    console.log(data);
                    //addMemberToConfidentialGroup(token, groupId);
                    //  dfdPermission.resolve("Success");
                },
                error: function (err) {
                    alert("Error in assigning permission to SPOT PMT group");
                    hideLoading();
                    console.log(err);
                    // dfdPermission.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "assignPermissionToGroupSPOTPMT", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            //  dfdPermission.resolve(err);
        }
        //  return dfdPermission.promise();
    }
    function RemoveListItem(itemId, listTitle, token, type) {
        var dfd = jQuery.Deferred();
        try {

            $.ajax({
                url: ProjectSiteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")",
                type: "POST",
                contentType: "application/json;odata=verbose",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "IF-MATCH": "*",
                    "X-HTTP-Method": "DELETE",
                },
                success: function (data) {
                    if (type !== 1)
                        alert("Document deleted successfully.");
                    else
                        alert("Folder deleted successfully.");
                    dfd.resolve("Success");
                },
                error: function (err) {

                    hideLoading();
                    console.log(err.responseText);
                    dfd.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "RemoveListItem", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            dfd.resolve(err);
        }
        return dfd.promise();
    }
    function CheckFileExist(filePath, token) {
        var dfd = jQuery.Deferred();
        try {
            if (filePath == null) {
                filePath = docLibraryInternalName;
            }
            $.ajax({
                url: ProjectSiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + filePath + "')/files?$select=Name",
                type: "GET",
                contentType: "application/json;odata=verbose",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "IF-MATCH": "*",
                },
                success: function (data) {
                    dfd.resolve(data);
                },
                error: function (err) {
                   
                    hideLoading();
                    console.log(err.responseText);
                    dfd.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "CheckFileExist", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            dfd.resolve(err);
        }
        return dfd.promise();
    }

    function CheckFolderExist(folderPath, token) {
        var dfd = jQuery.Deferred();
        try {
            if (folderPath == null) {
                folderPath = docLibraryInternalName;
            }
            $.ajax({
                url: ProjectSiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderPath + "')/folders?$select=Name",
                type: "GET",
                contentType: "application/json;odata=verbose",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "IF-MATCH": "*",
                },
                success: function (data) {
                    dfd.resolve(data);
                },
                error: function (err) {

                    hideLoading();
                    console.log(err.responseText);
                    dfd.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "CheckFolderExist", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            dfd.resolve(err);
        }
        return dfd.promise();
    }
    function isSiteUniquePermission(token, ProjectSiteUrl) {
      
        var dfdIsUnique = jQuery.Deferred();
        try {
            $.ajax({
                url: ProjectSiteUrl + "/_api/web?$select=hasuniqueroleassignments",
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    console.log('success');
                    // ProjectSiteUrl = rootSiteUrl + "/" + siteTemplate + "/" + sitename;
                    dfdIsUnique.resolve(data.d.HasUniqueRoleAssignments);
                },
                error: function (err) {
                    // alert("Error in break project site permission on General Info");
                    hideLoading();
                    console.log(err);
                    dfdIsUnique.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "isSiteUniquePermission", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            alert(errormessage);
                        });
            dfdIsUnique.resolve(err);
        }
        return dfdIsUnique.promise();
    }

    function resetUniquePermission(token, ProjectSiteUrl) {

        var dfdResetUnique = jQuery.Deferred();
        try {
            $.ajax({
                url: ProjectSiteUrl + "/_api/web/ResetRoleInheritance()",
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    console.log('success');
                    // ProjectSiteUrl = rootSiteUrl + "/" + siteTemplate + "/" + sitename;
                    dfdResetUnique.resolve("Success");
                },
                error: function (err) {
                    // alert("Error in break project site permission on General Info");
                    hideLoading();
                    console.log(err);
                    dfdResetUnique.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "resetUniquePermission", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            dfdResetUnique.resolve(err);
        }
        return dfdResetUnique.promise();
    }
    function createLibraryView(token) {
        var query = '<ViewFields><FieldRef Name="DocIcon" /><FieldRef Name="LinkFilename" /><FieldRef Name="Modified" /><FieldRef Name="Editor" /></ViewFields>';
        $.ajax
            ({
                url: ProjectSiteUrl + "/_api/web/lists/getByTitle('Documents')/views",
                type: "POST",
                data: "{'__metadata':{'type': 'SP.View'},'ViewType': 'HTML','Title':'NewView1','PersonalView':true,'DefaultView':true,'ViewQuery':'" + query + "'}",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data, status, xhr) {
                    console.log("Success");
                },
                error: function (xhr, status, error) {
                    console.log("Failed");
                }
            });
    }
    function deleteSPConfidentialGroup(token, groupid)
    {       
        try {
            $.ajax({
                //url: ProjectSiteUrl + "/_api/web/lists/getByTitle('" + docLibraryName + "')/breakroleinheritance(copyRoleAssignments=true, clearSubscopes=true)",
                url: ProjectSiteUrl + "/_api/web/sitegroups/removebyid('"+ groupid +"')",
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    console.log('success');
                },
                error: function (err) {
                    alert("Error in deleting SP Group");
                    hideLoading();
                    console.log(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "deleteSPConfidentialGroup", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
        }
       
    }
    
    function breakRolePermissionDocumentLibrary(token, ProjectSiteUrl) {
        var dfd = jQuery.Deferred();
        try {
            $.ajax({
                //url: ProjectSiteUrl + "/_api/web/lists/getByTitle('" + docLibraryName + "')/breakroleinheritance(copyRoleAssignments=true, clearSubscopes=true)",
                url: ProjectSiteUrl + "/_api/web/breakroleinheritance(copyRoleAssignments=false, clearSubscopes=true)",
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    console.log('success');
                    // ProjectSiteUrl = rootSiteUrl + "/" + siteTemplate + "/" + sitename;
                    dfd.resolve("Success");
                },
                error: function (err) {
                    alert("Error in break project site permission on General Info");
                    hideLoading();
                    console.log(err);
                    dfd.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "breakRolePermissionDocumentLibrary", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            dfd.resolve(err);
        }
        return dfd.promise();
    }
    function getAllMembers(teamMem) {
        // var dfdAllMembers = jQuery.Deferred();
        var gridDataTeamMembers = [];
        gridDataTeamMembers = teamMem;

        $.when(postDataWCFAsync("GetTokenForDocument"))
            .then(function (resToken) {
                var token = resToken.GetTokenForDocumentResult;

                getMembersFromConfidential(token, teamMem);

                // dfdAllMembers.resolve("Success");
            });
        // return dfdAllMembers.promise();
    }
    function getMembersFromConfidential(token, gridDataTeamMembers) {
        var spUsers = [];
        var teamMembers = [];
        var dfdMembers = jQuery.Deferred();
        try {

            $.ajax({
                url: ProjectSiteUrl + "/_api/web/sitegroups/getbyname('" + SelectedProblemId + spGroupSuffix + "')/users",
                type: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    console.log(data);
                    var groupMembers = data.d.results;
                    var spUserLength = groupMembers.length;
                    // spUsers = groupMembers;

                    $.each(gridDataTeamMembers, function (key, value) {
                        if (value.TeamMemberAdId != "")
                            teamMembers.push(value.UserEmailAddress);
                    });
                    $.each(groupMembers, function (key, value) {

                        spUsers.push(value.Email);
                    });


                    var uniqueTeamMember = teamMembers.filter(function (obj) {
                        return spUsers.indexOf(obj) === -1;
                    });

                    var uniqueSPUser = spUsers.filter(function (obj) {
                        return teamMembers.indexOf(obj) === -1;
                    });
                    var spUsersWithLoginname = groupMembers.filter(function (obj) {
                        return uniqueSPUser.indexOf(obj.Email) != -1;
                    });
                    if (uniqueTeamMember.length > 0)
                        displayLoading();
                    addMemberToConfidentialGroup(token, uniqueTeamMember);
                    if (uniqueSPUser.length > 0)
                        removeMembers(token, spUsersWithLoginname);
                    // dfdMembers.resolve(data.d.results);
                },
                error: function (err) {
                    alert("Error in member getting from confidential");
                    hideLoading();
                    console.log(err);
                    //return 0;
                    // dfdMembers.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "getMembersFromConfidential", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            //dfdMembers.resolve(err);
        }
        //  return dfdMembers.promise(); 
    }
    function removeMembers(token, members) {
        $.each(members, function (key, value) {
            try {
                $.ajax({
                    url: ProjectSiteUrl + "/_api/web/sitegroups/getbyname('" + SelectedProblemId + spGroupSuffix + "')/Users/removeByLoginName",
                    type: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        'loginName': value.LoginName
                    }),
                    success: function (data) {
                        console.log('success' + key + members.length);
                        //dfd.resolve("Success");
                    },
                    error: function (err) {
                        alert("Error in member removal to group");
                        hideLoading();
                        console.log(err);
                        //dfd.resolve(err);
                    }
                });
            }
            catch (err) {
                var dataToSend = {
                    "method": "addMemberToConfidentialGroup", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) {
                        alert(errormessage);
                    });

            }
        });
    }

    function addMemberToConfidentialGroup(token, uniqueTeamMember) {

        //var t =getMembersFromConfidential(token);
        //var dfd = jQuery.Deferred();
        var count = 0;
        var filterQuery = "";
        if (uniqueTeamMember.length != 0) {
            // $.each(uniqueTeamMember, function (key, value) {
            //count++;
                
            //if (count == 1)
            //    filterQuery = filterQuery + "EMail eq '" + value + "'";
            //else
            //    filterQuery = filterQuery + " or EMail eq '" + value + "'";
            //});
            //$.ajax({
            //    url: rootSiteUrl + "/" + siteTemplate + "/_api/Web/SiteUsers?$filter=" + filterQuery,
            //    type: "GET",
            //    headers: {
            //        "Authorization": "Bearer " + token,
            //        "accept": "application/json;odata=verbose",
            //        "content-type": "application/json;odata=verbose"
            //    }
            //}).done(function (data) {

            var memberNotAdded = "";
            var count = 0;
            ///if (data.d.results.length > 0) {
            $.each(uniqueTeamMember, function (key, value) {
                var loginName = federatedMembership + value;
                        
                var data1 = {
                    '__metadata': { 'type': 'SP.User' },
                    'LoginName': loginName
                };
                try {
                    $.ajax({
                        url: ProjectSiteUrl + "/_api/web/sitegroups/getbyname('" + SelectedProblemId + spGroupSuffix + "')/users",
                        type: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "accept": "application/json;odata=verbose",
                            "content-type": "application/json;odata=verbose"
                        },
                        data: JSON.stringify(data1),
                        success: function (data) {
                            count++;
                            hideLoading();
                            console.log('success');
                            //if (count == gridDataTeamMembers.length)
                            //  dfd.resolve("Success");
                        },
                        error: function (err) {
                            count++;
                            memberNotAdded = memberNotAdded + value;
                            hideLoading();
                            if (uniqueTeamMember.length == count) {
                                alert("Error in adding '" + memberNotAdded + "' to group");
                                var dataToSend = {
                                    "method": "addMemberToConfidentialGroup, " + SeletedProjectId + currentUserName, "exceptionMessage": "message:" + err.responseText + memberNotAdded + " stack:" + err.stack, "ErrorParameter": className
                                };
                                $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                                    .then(function (response) {
                                        // alert(errormessage);
                                    });
                            }
                                    
                                   
                        }
                    });
                }
                catch (err) {
                    var dataToSend = {
                        "method": "addMemberToConfidentialGroup", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                    };
                    $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                        .then(function (response) {
                            alert(errormessage);
                        });
                    //dfd.resolve(err);
                }
            });
            //}
            //else
            //    hideLoading();

            //});
        }
        // return dfd.promise();
    }
    function UpdateCreatedBy(token) {
        var updateData = { __metadata: { 'type': 'SP.Data.Shared_x0020_DocumentsItem' }, 'EditorId': 9 };
        // $.each(members, function (key, value) {
        try {
            $.ajax({
                // url: ProjectSiteUrl + "/_api/Web/Lists/getByTitle('Documents')/items(1)",
                url: "https://projectwidgets1.sharepoint.com/sites/spotTeamSite1/project%20standard/_api/web/lists/GetByTitle('Documents')/items(30)",
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-HTTP-Method": "MERGE",
                    "IF-MATCH": "*"
                },
                data: JSON.stringify(updateData),
                success: function (data) {
                    console.log('success' + key + members.length);
                    //dfd.resolve("Success");
                },
                error: function (err) {
                    alert("Error in created by update");
                    hideLoading();
                    console.log(err);
                    //dfd.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "UpdateModifiedCreatedBy", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });

        }
        // });        
    }
    function renameFileFolder(token, itemId, newFileName) {
        var renameDfd = jQuery.Deferred();
        var updateData = { __metadata: { 'type': 'SP.Data.Shared_x0020_DocumentsItem' }, "FileLeafRef": newFileName };

        try {
            $.ajax({
                url: ProjectSiteUrl + "/_api/web/lists/GetByTitle('" + docLibraryName + "')/items(" + itemId + ")",
                // url: "https://projectwidgets1.sharepoint.com/sites/spotTeamSite1/Test%204/_api/web/lists/GetByTitle('Documents')/items(" + itemId+")",
                //url: "https://projectwidgets1.sharepoint.com/sites/spotTeamSite1/Test%204/_api/web('/Shared%20Documents/Folder%201')/ListItemAllFields",
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-HTTP-Method": "MERGE",
                    "IF-MATCH": "*"
                },
                data: JSON.stringify(updateData),
                success: function (data) {
                    console.log('success renaming');
                    getLastModifiedDate(token, itemId, docLibraryName);
                    renameDfd.resolve("Success");
                },
                error: function (err) {
                    //alert("Error in renaming");
                    hideLoading();
                    console.log(err);
                    renameDfd.resolve(err.responseText);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "renameFileFolder", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            renameDfd.resolve(err);
        }
        // });   
        return renameDfd.promise();
    }
    function getLastModifiedDate(token, itemId, docLibraryName) {
        //var renameDfd = jQuery.Deferred();
        // var updateData = { __metadata: { 'type': 'SP.Data.Shared_x0020_DocumentsItem' }, "ModifiedByCustom": currentUserName };

        try {
            $.ajax({
                url: ProjectSiteUrl + "/_api/web/lists/GetByTitle('" + docLibraryName + "')/items(" + itemId + ")?$select=Modified,ModifiedTimeCustom",
                type: "GET",
                async: false,
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    // "X-HTTP-Method": "MERGE",
                    "IF-MATCH": "*"
                },
                // data: JSON.stringify(updateData),
                success: function (data) {
                    var ModifiedTimeCustom = new Date(data.d.ModifiedTimeCustom);
                    if (new Date(data.d.Modified) > ModifiedTimeCustom) {
                        UpdateCreatedByModifiedBy(token, itemId, docLibraryName, 0);
                        console.log("update");
                    }
                    console.log('success renaming');
                    //renameDfd.resolve("Success");
                },
                error: function (err) {
                    alert("Error in updating");
                    hideLoading();
                    console.log(err);
                    //renameDfd.resolve(err.responseText);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "UpdateModifiedCreatedBy", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            // renameDfd.resolve(err);
        }
        // });   
        //return renameDfd.promise();
    }
    function UpdateCreatedByModifiedBy(token, itemId, docLibraryName, flag) {
        var renameDfdModified = jQuery.Deferred();
        var updateData;
        if (flag === 1) {
            updateData = { __metadata: { 'type': 'SP.Data.Shared_x0020_DocumentsItem' }, "ModifiedByCustom": currentUserName, "ModifiedTimeCustom": new Date().toString(), "CreatedByCustom": currentUserName };
        }
        else {
            updateData = { __metadata: { 'type': 'SP.Data.Shared_x0020_DocumentsItem' }, "ModifiedByCustom": currentUserName, "ModifiedTimeCustom": new Date().toString() };

        }
        // getLastModifiedDate(token, itemId, docLibraryName);
        try {
            $.ajax({
                url: ProjectSiteUrl + "/_api/web/lists/GetByTitle('" + docLibraryName + "')/items(" + itemId + ")",
                // url: "https://projectwidgets1.sharepoint.com/sites/spotTeamSite1/Test%204/_api/web/lists/GetByTitle('Documents')/items(" + itemId+")",
                //url: "https://projectwidgets1.sharepoint.com/sites/spotTeamSite1/Test%204/_api/web('/Shared%20Documents/Folder%201')/ListItemAllFields",
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-HTTP-Method": "MERGE",
                    "IF-MATCH": "*"
                },
                data: JSON.stringify(updateData),
                success: function (data) {
                    console.log('success renaming');
                    renameDfdModified.resolve("Success");
                },
                error: function (err) {
                    if (JSON.parse(err.responseText).error.message.value.includes("locked") == true) {
                        alert(JSON.parse(err.responseText).error.message.value.split("locked")[0] + "locked by another user.");
                    }
                    hideLoading();
                    console.log(err);
                    renameDfdModified.resolve(err.responseText);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "UpdateModifiedCreatedBy", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            renameDfdModified.resolve(err);
        }
        // });   
        return renameDfdModified.promise();
    }
    function UpdateCreatedByModifiedByOnGetDocuments(token, item, docLibraryName) {
        var renameDfdGetDoc = jQuery.Deferred();
        var updateData;
        // ---------- Created by and modified by to be original user not the sharepoint app ---- //
        if ((new Date(item.Modified) > new Date(item.ModifiedTimeCustom) && (item.Editor.Title).toString() !== "SharePoint App") || item.CreatedByCustom == null) {
            updateData = { __metadata: { 'type': 'SP.Data.Shared_x0020_DocumentsItem' }, "ModifiedByCustom": (item.Editor.Title).toString() !== "SharePoint App" ? item.Editor.Title : item.ModifiedByCustom, "ModifiedTimeCustom": new Date(item.Modified) > new Date(item.ModifiedTimeCustom) || (new Date(item.ModifiedTimeCustom) == null) ? item.Modified : item.ModifiedTimeCustom, "CreatedByCustom": item.Author.Title !== "SharePoint App" ? item.Author.Title : item.CreatedByCustom };

            // getLastModifiedDate(token, itemId, docLibraryName);
            try {
                $.ajax({
                    url: ProjectSiteUrl + "/_api/web/lists/GetByTitle('" + docLibraryName + "')/items(" + item.Id + ")",
                    type: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose",
                        "X-HTTP-Method": "MERGE",
                        "IF-MATCH": "*"
                    },
                    data: JSON.stringify(updateData),
                    success: function (data) {
                        console.log('success renaming');
                        renameDfdGetDoc.resolve("Success");
                    },
                    error: function (err) {
                        if (JSON.parse(err.responseText).error.message.value.includes("locked") == true) {
                            alert(JSON.parse(err.responseText).error.message.value.split("locked")[0] + "locked by another user.");
                        }
                        // alert(JSON.parse(err.responseText).error.message.value);
                        hideLoading();
                        console.log(err);
                        renameDfdGetDoc.resolve(err.responseText);
                    }
                });
            }
            catch (err) {
                var dataToSend = {
                    "method": "UpdateModifiedCreatedBy", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) {
                        alert(errormessage);
                    });
                renameDfdGetDoc.resolve(err);
            }
        }

        // });   
        return renameDfdGetDoc.promise();
    }
    function createColumn(token, TitleName) {

        // var columnDfd = jQuery.Deferred();
        // var col1 = { '__metadata': { 'type': 'SP.Field' }, 'Title': TitleName, 'FieldTypeKind': '2' };
        //  var col2 = { '__metadata': { 'type': 'SP.Field' }, 'Title': 'ModifiedByCustom', 'FieldTypeKind': '2'};
        //   var col3 = { '__metadata': { 'type': 'SP.Field' }, 'Title': 'ModifiedTimeCustom', 'FieldTypeKind': '2' };
        //var columnInformation = {'FRow': col1, 'SRow': col2, 'TRow': col3 };
        var columnInformation = { '__metadata': { 'type': 'SP.Field' }, 'Title': TitleName, 'FieldTypeKind': 2 };
        try {
            $.ajax({
                url: ProjectSiteUrl + "/_api/web/lists/GetByTitle('" + docLibraryName + "')/Fields",
                type: "POST",
                async: false,
                data: JSON.stringify(columnInformation),
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                },
                success: function (data) {
                    console.log('column created');
                    // return "success";
                    // columnDfd.resolve("Success");
                },
                error: function (err) {
                    alert("Error in creating column");
                    hideLoading();
                    console.log(err);
                    //  return "error";
                    //columnDfd.resolve(err.responseText);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "downloadFile", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });

        }
        // return columnDfd.promise();
    }
    function downloadFile(token) {

        // var updateData = { __metadata: { 'type': 'SP.Data.Shared_x0020_DocumentsItem' }, "FileLeafRef": newFileName };

        try {
            $.ajax({
                //  url: ProjectSiteUrl + "/_api/web/lists/GetByTitle('" + docLibraryName + "')/items(" + itemId + ")",
                // url: "https://projectwidgets1.sharepoint.com/sites/spotTeamSite1/Test%204/_layouts/15/download.aspx?SourceUrl=%2Fsites%2FspotTeamSite1%2FTest%204%2FShared%20Documents%2Fkeertitest.docx",
                url: "https://projectwidgets1.sharepoint.com/sites/spotTeamSite1/Test%204/_api/web/lists/GetByTitle('Documents')/items(3)",
                type: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    // "accept": "application/json;odata=verbose",
                    //"content-type": "application/json;odata=verbose",
                    //"X-HTTP-Method": "MERGE",
                    "IF-MATCH": "* ",
                    "Access-Control-Allow-Origin": "*"
                },
                // data: JSON.stringify(updateData),
                success: function (data) {
                    console.log('success download');

                },
                error: function (err) {
                    alert("Error in downloading");
                    hideLoading();
                    console.log(err);

                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "downloadFile", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });

        }

    }
    function MoveDocumentToLibrary(itemId, listTitle, token, filePath, siteName, moveFileName) {
        var dfd = jQuery.Deferred();
        //var url1 = "https://projectwidgets1.sharepoint.com/sites/spotTeamSite1/Test%204/_api/web/lists/GetByTitle('Documents')/Items('14')/File/MoveTo(newurl='/sites/spotTeamSite1/Test 4/Shared Documents/keertitest/testttkeeer123.docx',flags='0')";
        var destinationUrl = filePath + "/" + moveFileName;
        try {

            $.ajax({
                //url: url1,//ProjectSiteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")",
                url: ProjectSiteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/Items(" + itemId + ")/File/MoveTo(newurl='" + destinationUrl + "',flags='0')",
                type: "POST",
                contentType: "application/json;odata=verbose",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "IF-MATCH": "*",
                    // "X-HTTP-Method": "DELETE",
                },
                success: function (data) {
                    getLastModifiedDate(token, itemId, listTitle);
                    dfd.resolve("Success");
                },
                error: function (err) {

                    hideLoading();
                    console.log(err.responseText);
                    dfd.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "RemoveListItem", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            dfd.resolve(err);
        }
        return dfd.promise();
    }
    function CopyDocumentToLibrary(itemId, listTitle, token, filePath, siteName, copyFileName) {
        var dfd = jQuery.Deferred();
        var url1 = "https://projectwidgets1.sharepoint.com/sites/spotTeamSite1/SolutionIdentified2Oct/_api/web/lists/GetByTitle('Documents')/Items('6')/File/copyto(strnewurl='/sites/spotTeamSite1/SolutionIdentified2Oct/Shared Documents/test 2/Widgets3.docx',boverwrite=true)";
        var destinationUrlCopy = filePath + "/" + copyFileName;
        try {

            $.ajax({
                // url: url1,//ProjectSiteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")",
                url: ProjectSiteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/Items(" + itemId + ")/File/copyto(strnewurl='" + destinationUrlCopy + "',boverwrite=true)",
                type: "POST",
                contentType: "application/json;odata=verbose",
                headers: {
                    "Authorization": "Bearer " + token,
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "IF-MATCH": "*",
                    // "X-HTTP-Method": "DELETE",
                },
                success: function (data) {
                    getLastModifiedDate(token, itemId, listTitle);
                    dfd.resolve("Success");
                },
                error: function (err) {

                    hideLoading();
                    console.log(err.responseText);
                    dfd.resolve(err);
                }
            });
        }
        catch (err) {
            var dataToSend = {
                "method": "RemoveListItem", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                });
            dfd.resolve(err);
        }
        return dfd.promise();
    };

    function searchProject(inputId, dsProjects, searchFor, projectUID) {
        var selectedPeoplefilter = "";
        var projCombo = $("#" + inputId).data("kendoComboBox");
        if (projCombo == undefined) {
            $("#" + inputId).kendoComboBox({
                dataTextField: "ProjectName",
                dataValueField: "ProblemUniqueID",
                dataSource: dsProjects,
                minLength: 3,
                placeholder: projectPickerPlaceholder,
            });
            try {
                $('#' + inputId).data().kendoComboBox.input.on('keydown', function (e) {
                    if (e.keyCode == 13) {
                        // if (canFilter == true) {
                        var projCombo = $("#" + inputId).data("kendoComboBox");

                        var userFilter = "";
                        console.log(projCombo.value());
                        var input = projCombo.input[0].value;
                        console.log(input);
                        if (input.length >= 3) {
                            displayLoading();
                            var dataToSend = {
                                "programUID": projectUID, "searchFor": searchFor, "filterString": input
                            };
                            $.when(postDataWCFAsync("getAllProjectProgramListFilter", dataToSend))
                                .then(function (resProj) {
                                    try {
                                        dsProjects = JSON.parse(resProj);
                                        projCombo.setDataSource(dsProjects);
                                        projCombo.open();
                                        hideLoading();
                                    }
                                    catch (err) {
                                        var dataToSend = {
                                            "method": "searchProject", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                        };
                                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                            .then(function (response) { alert(errormessage) });
                                        hideLoading();
                                    }
                                });
                        }
                        else {
                            alert(minThreeLetterMsg);
                            dsProjects = [];
                            var projCombo = $("#" + inputId).data("kendoComboBox");
                            projCombo.setDataSource(dsProjects);
                            projCombo.close();
                            hideLoading();
                        }
                        //}
                        //else {
                        //    alert(minThreeLetterMsg);

                        //    var projCombo = $("#" + inputId).data("kendoComboBox");
                        //    projCombo.close();
                        //}
                    }
                    else {
                        dsProjects = [];
                        var projCombo = $("#" + inputId).data("kendoComboBox");
                        if (e.keyCode == 8) {
                            projCombo.value('')
                        }


                        projCombo.setDataSource(dsProjects);
                        projCombo.close();
                    }
                });
            }
            catch (err) {
                var dataToSend = {
                    "method": "searchProject", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
                hideLoading();
            }

        }
        else {
            projCombo.setDataSource(dsProjects);
            hideLoading();
        }
        return selectedPeoplefilter;
    }
    /********Function to export the two views to excel
          It will dynamically create the cells 
          There will be multiple sheets***********/
    function ExportToExcel(ProjectList) {
        displayLoading();
        var excelExportProjectData = [];
        var excelExportProjectData = ProjectList;

        //    var startIndx = 0;
        var maxPageNo = Math.ceil(excelExportProjectData.length / chunk_size);
        //var extraRec = (excelExportProjectData.length % chunk_size);
        //if (extraRec != 0) { maxPageNo++; }
        var curPageNo = 0;

        var arrayExportProjectDateField = exportProjectDateField.split(',');
        var arrayExportMilestoneDateField = exportMilestoneDateField.split(',');
        var arrayExportAskNeedDateField = exportAskNeedDateField.split(',');
        var arrayExportBusinessCaseDateField = exportBusinessCaseDateField.split(',');
        var arrayExportRiskIssueDateField = exportRiskIssueDateField.split(',');
        var arrayExportTopsDateField = exportTopsDateField.split(',');
        var arrayExportCapGenDateField = exportCapGenDateField.split(',');
        var arrayExportCapForDateField = exportCapForDateField.split(',');
        var arrayExportCapGenNumberField = exportCapGenNumberField.split(',');
        var arrayExportCapForNumberField = exportCapForNumberField.split(',');

        if (excelExportProjectData.length > 0) {
            while (excelExportProjectData.length) {
                var excelWorkbookData = excelExportProjectData.splice(0, chunk_size);
                if (excelWorkbookData.length > 0) {
                    try {
                        //displayLoading();
                        // var filteredProjId = excelWorkbookData.map(function (a) { return { "ProjectID": a.ProblemID }; });
                        var projToSend = JSON.stringify(excelWorkbookData);
                        $.when(postDataWCFAsync("exportProjectViewToExcel", projToSend), postDataWCFAsync("exportMilestoneViewToExcel", projToSend),
                            postDataWCFAsync("exportIssuesRisksViewToExcel", projToSend), postDataWCFAsync("exportAsksNeedsViewToExcel", projToSend),
                            postDataWCFAsync("exportBusinessCaseOptionsViewToExcel", projToSend), postDataWCFAsync("exportTopsViewToExcel", projToSend)
                            , postDataWCFAsync("exportBudgetCapitalGeneralToExcel", projToSend), postDataWCFAsync("exportBudgetCapitalForecastToExcel", projToSend)
                        )
                            .then(function (resProjData, resMilestoneData, resRiskIssueExlData, resAsksNeedsExlData, resBusinessCaseOptionExlData, resTopsViewExlData
                                , resCapGenData, resCapForData
                            ) {
                                try {
                                    var response = JSON.parse(resProjData.exportProjectViewToExcelResult);
                                    var responseMilestone = JSON.parse(resMilestoneData.exportMilestoneViewToExcelResult);
                                    var responseIssuesRisksViewToExcel = JSON.parse(resRiskIssueExlData.exportIssuesRisksViewToExcelResult);
                                    var responseAsksNeedsViewToExcel = JSON.parse(resAsksNeedsExlData.exportAsksNeedsViewToExcelResult);
                                    var responseBusinessCaseOptionsViewToExcel = JSON.parse(resBusinessCaseOptionExlData.exportBusinessCaseOptionsViewToExcelResult);
                                    var responseTopsViewToExcel = JSON.parse(resTopsViewExlData.exportTopsViewToExcelResult);
                                    var responseCapGen = JSON.parse(resCapGenData.exportBudgetCapitalGeneralToExcelResult);
                                    var responseCapFor = JSON.parse(resCapForData.exportBudgetCapitalForecastToExcelResult);

                                    curPageNo++;
                                    /******************For Project Tab****************************/
                                    var modelProps = [];
                                    var columns = [];
                                    var rows = [];
                                    var columnSettings = [];
                                    if (response.length > 0) {
                                        modelProps = generateModel(response);
                                        columns = modelProps.map(function (name) {
                                            return {
                                                value: name
                                            };
                                        });
                                        rows = [{
                                            cells: columns
                                        }];
                                        var data = response;
                                        for (var i = 0; i < data.length; i++) {
                                            var rowCells = [];
                                            for (var j = 0; j < modelProps.length; j++) {
                                                //   var format = arrayExportProjectDateField.indexOf(modelProps[j]) >= 0 ? kendo.culture().calendar.patterns.d : "";
                                                var cellValue = "";
                                                if (arrayExportProjectDateField.indexOf(modelProps[j]) >= 0 && data[i][modelProps[j]] != "" && data[i][modelProps[j]] != null)
                                                    cellValue = new Date(data[i][modelProps[j]])
                                                else
                                                    cellValue = data[i][modelProps[j]];
                                                rowCells.push({ value: cellValue });
                                            }
                                            rows.push({ cells: rowCells });
                                        }
                                        var columnSettings = modelProps.map(function () {
                                            return {
                                                autoWidth: true
                                            };
                                        });
                                    }
                                    /******************For Milestone Tab****************************/
                                    var modelMilestone = [];
                                    var columnsMilestone = [];
                                    var rowsMilestone = [];
                                    var colMilestoneSettings = [];
                                    if (responseMilestone.length > 0) {
                                        var modelMilestone = generateModel(responseMilestone);
                                        var columnsMilestone = modelMilestone.map(function (name) {
                                            return {
                                                value: name
                                            };
                                        });
                                        var rowsMilestone = [{
                                            cells: columnsMilestone
                                        }];
                                        var dataMilestone = responseMilestone;

                                        for (var i = 0; i < dataMilestone.length; i++) {
                                            var rowCells = [];
                                            for (var j = 0; j < modelMilestone.length; j++) {
                                                //var format = arrayExportMilestoneDateField.indexOf(modelMilestone[j]) >= 0 ? kendo.culture().calendar.patterns.d : "";
                                                //var cellValue = dataMilestone[i][modelMilestone[j]];
                                                // var cellValue = arrayExportMilestoneDateField.indexOf(modelMilestone[j]) >= 0 ? new Date(dataMilestone[i][modelMilestone[j]]) : dataMilestone[i][modelMilestone[j]];
                                                var cellValue = "";
                                                if (arrayExportMilestoneDateField.indexOf(modelMilestone[j]) >= 0 && dataMilestone[i][modelMilestone[j]] != "" && dataMilestone[i][modelMilestone[j]] != null)
                                                    cellValue = new Date(dataMilestone[i][modelMilestone[j]])
                                                else
                                                    cellValue = dataMilestone[i][modelMilestone[j]];
                                                rowCells.push({ value: cellValue });
                                            }
                                            rowsMilestone.push({ cells: rowCells });
                                        }
                                        var colMilestoneSettings = modelMilestone.map(function () {
                                            return {
                                                autoWidth: true
                                            };
                                        });
                                    }
                                    /******************For Issues Risks Tab ****************************/
                                    var modelRiskIssue = [];
                                    var columnsRiskIssue = [];
                                    var rowsRiskIssue = [];
                                    var colRiskIssueeSettings = [];
                                    if (responseIssuesRisksViewToExcel.length > 0) {
                                        var modelRiskIssue = generateModel(responseIssuesRisksViewToExcel);
                                        var columnsRiskIssue = modelRiskIssue.map(function (name) {
                                            return {
                                                value: name
                                            };
                                        });
                                        var rowsRiskIssue = [{
                                            cells: columnsRiskIssue
                                        }];
                                        var dataRiskIssue = responseIssuesRisksViewToExcel;
                                        for (var i = 0; i < dataRiskIssue.length; i++) {
                                            var rowCells = [];
                                            for (var j = 0; j < modelRiskIssue.length; j++) {
                                                //var format = arrayExportRiskIssueDateField.indexOf(modelRiskIssue[j]) >= 0 ? kendo.culture().calendar.patterns.d : "";
                                                //var cellValue = dataRiskIssue[i][modelRiskIssue[j]];
                                                //  var cellValue = arrayExportRiskIssueDateField.indexOf(modelRiskIssue[j]) >= 0 ? new Date(dataRiskIssue[i][modelRiskIssue[j]]) : dataRiskIssue[i][modelRiskIssue[j]];
                                                var cellValue = "";
                                                if (arrayExportRiskIssueDateField.indexOf(modelRiskIssue[j]) >= 0 && dataRiskIssue[i][modelRiskIssue[j]] != "" && dataRiskIssue[i][modelRiskIssue[j]] != null)
                                                    cellValue = new Date(dataRiskIssue[i][modelRiskIssue[j]])
                                                else
                                                    cellValue = dataRiskIssue[i][modelRiskIssue[j]];
                                                rowCells.push({ value: cellValue });
                                            }
                                            rowsRiskIssue.push({ cells: rowCells });
                                        }
                                        var colRiskIssueeSettings = modelRiskIssue.map(function () {
                                            return {
                                                autoWidth: true
                                            };
                                        });
                                    }
                                    /******************For Ask ANd Need Tab ****************************/
                                    var modelAsksNeed = [];
                                    var columnsAsksNeed = [];
                                    var rowsAsksNeed = [];
                                    var colAsksNeedSettings = [];
                                    if (responseAsksNeedsViewToExcel.length > 0) {
                                        var modelAsksNeed = generateModel(responseAsksNeedsViewToExcel);
                                        var columnsAsksNeed = modelAsksNeed.map(function (name) {
                                            return {
                                                value: name
                                            };
                                        });
                                        var rowsAsksNeed = [{
                                            cells: columnsAsksNeed
                                        }];
                                        var dataAsksNeed = responseAsksNeedsViewToExcel;
                                        for (var i = 0; i < dataAsksNeed.length; i++) {
                                            var rowCells = [];
                                            for (var j = 0; j < modelAsksNeed.length; j++) {
                                                //var format = arrayExportAskNeedDateField.indexOf(modelAsksNeed[j]) >= 0 ? kendo.culture().calendar.patterns.d : "";
                                                //var cellValue = dataAsksNeed[i][modelAsksNeed[j]];
                                                //   var cellValue = arrayExportAskNeedDateField.indexOf(modelAsksNeed[j]) >= 0 ? new Date(dataAsksNeed[i][modelAsksNeed[j]]) : dataAsksNeed[i][modelAsksNeed[j]];
                                                var cellValue = "";
                                                if (arrayExportAskNeedDateField.indexOf(modelAsksNeed[j]) >= 0 && dataAsksNeed[i][modelAsksNeed[j]] != "" && dataAsksNeed[i][modelAsksNeed[j]] != null)
                                                    cellValue = new Date(dataAsksNeed[i][modelAsksNeed[j]])
                                                else
                                                    cellValue = dataAsksNeed[i][modelAsksNeed[j]];
                                                rowCells.push({ value: cellValue });
                                            }
                                            rowsAsksNeed.push({ cells: rowCells });
                                        }
                                        var colAsksNeedSettings = modelAsksNeed.map(function () {
                                            return {
                                                autoWidth: true
                                            };
                                        });
                                    }
                                    /******************For BusinessCaseOptionsViewToExcel  Tab ****************************/
                                    var modelBusinessCase = [];
                                    var columnsBusinessCase = [];
                                    var rowsBusinessCase = [];
                                    var colBusinessCaseSettings = [];
                                    if (responseBusinessCaseOptionsViewToExcel.length > 0) {
                                        var modelBusinessCase = generateModel(responseBusinessCaseOptionsViewToExcel);
                                        var columnsBusinessCase = modelBusinessCase.map(function (name) {
                                            return {
                                                value: name
                                            };
                                        });
                                        var rowsBusinessCase = [{
                                            cells: columnsBusinessCase
                                        }];
                                        var dataBusinessCase = responseBusinessCaseOptionsViewToExcel;
                                        for (var i = 0; i < dataBusinessCase.length; i++) {
                                            var rowCells = [];
                                            for (var j = 0; j < modelBusinessCase.length; j++) {
                                                //var format = arrayExportBusinessCaseDateField.indexOf(modelBusinessCase[j]) >= 0 ? kendo.culture().calendar.patterns.d : "";
                                                //var cellValue = dataBusinessCase[i][modelBusinessCase[j]];
                                                //  var cellValue = arrayExportBusinessCaseDateField.indexOf(modelBusinessCase[j]) >= 0 ? new Date(dataBusinessCase[i][modelBusinessCase[j]]) : dataBusinessCase[i][modelBusinessCase[j]];
                                                var cellValue = "";
                                                if (arrayExportBusinessCaseDateField.indexOf(modelBusinessCase[j]) >= 0 && dataBusinessCase[i][modelBusinessCase[j]] != "" && dataBusinessCase[i][modelBusinessCase[j]] != null)
                                                    cellValue = new Date(dataBusinessCase[i][modelBusinessCase[j]])
                                                else
                                                    cellValue = dataBusinessCase[i][modelBusinessCase[j]];
                                                rowCells.push({ value: cellValue });
                                            }
                                            rowsBusinessCase.push({ cells: rowCells });
                                        }
                                        var colBusinessCaseSettings = modelBusinessCase.map(function () {
                                            return {
                                                autoWidth: true
                                            };
                                        });
                                    }
                                    /******************For TopsViewToExcel Tab  ****************************/
                                    var modelTopsView = [];
                                    var columnsTopsView = [];
                                    var rowsTopsView = [];
                                    var colTopsViewSettings = [];
                                    if (responseTopsViewToExcel.length > 0) {
                                        var modelTopsView = generateModel(responseTopsViewToExcel);
                                        var columnsTopsView = modelTopsView.map(function (name) {
                                            return {
                                                value: name
                                            };
                                        });
                                        var rowsTopsView = [{
                                            cells: columnsTopsView
                                        }];
                                        var dataTopsView = responseTopsViewToExcel;
                                        for (var i = 0; i < dataTopsView.length; i++) {
                                            var rowCells = [];
                                            for (var j = 0; j < modelTopsView.length; j++) {
                                                var format = arrayExportTopsDateField.indexOf(modelTopsView[j]) >= 0 ? kendo.culture().calendar.patterns.d : "";
                                                var cellValue = dataTopsView[i][modelTopsView[j]];
                                                rowCells.push({ value: cellValue, format: format });
                                            }
                                            rowsTopsView.push({ cells: rowCells });
                                        }
                                        var colTopsViewSettings = modelTopsView.map(function () {
                                            return {
                                                autoWidth: true
                                            };
                                        });
                                    }

                                    /******************For CAPITAL GENERAL Tab****************************/
                                    var modelPropsCapGen = [];
                                    var columnsCapGen = [];
                                    var rowsCapGen = [];
                                    var columnSettingsCapGen = [];
                                    if (responseCapGen.length > 0) {
                                        modelPropsCapGen = generateModel(responseCapGen);
                                        columnsCapGen = modelPropsCapGen.map(function (name) {
                                            return {
                                                value: name
                                            };
                                        });
                                        rowsCapGen = [{
                                            cells: columnsCapGen
                                        }];
                                        var dataCapGen = responseCapGen;
                                        for (var i = 0; i < dataCapGen.length; i++) {
                                            var rowCells = [];
                                            for (var j = 0; j < modelPropsCapGen.length; j++) {
                                                //   var format = arrayExportProjectDateField.indexOf(modelProps[j]) >= 0 ? kendo.culture().calendar.patterns.d : "";
                                                var cellValue = "";
                                                if (arrayExportCapGenDateField.indexOf(modelPropsCapGen[j]) >= 0 && dataCapGen[i][modelPropsCapGen[j]] != "" && dataCapGen[i][modelPropsCapGen[j]] != null)
                                                    cellValue = new Date(dataCapGen[i][modelPropsCapGen[j]])
                                                    //else if (arrayExportCapGenNumberField.indexOf(modelPropsCapGen[j]) >= 0 && dataCapGen[i][modelPropsCapGen[j]] != "" && dataCapGen[i][modelPropsCapGen[j]] != null)
                                                    //    cellValue = kendo.toString(123434.567, "c");//new Number(dataCapGen[i][modelPropsCapGen[j]])
                                                else
                                                    cellValue = dataCapGen[i][modelPropsCapGen[j]];
                                                rowCells.push({ value: cellValue });
                                            }
                                            rowsCapGen.push({ cells: rowCells });
                                        }
                                        var colCapGenViewSettings = modelPropsCapGen.map(function () {
                                            return {
                                                autoWidth: true
                                            };
                                        });
                                    }

                                    /******************For CAPITAL Forecast Tab****************************/
                                    var modelPropsCapFor = [];
                                    var columnsCapFor = [];
                                    var rowsCapFor = [];
                                    var columnSettingsCapFor = [];
                                    if (responseCapFor.length > 0) {
                                        modelPropsCapFor = generateModel(responseCapFor);
                                        columnsCapFor = modelPropsCapFor.map(function (name) {
                                            return {
                                                value: name
                                            };
                                        });
                                        rowsCapFor = [{
                                            cells: columnsCapFor
                                        }];
                                        var dataCapFor = responseCapFor;
                                        for (var i = 0; i < dataCapFor.length; i++) {
                                            var rowCells = [];
                                            for (var j = 0; j < modelPropsCapFor.length; j++) {
                                                //   var format = arrayExportProjectDateField.indexOf(modelProps[j]) >= 0 ? kendo.culture().calendar.patterns.d : "";
                                                var cellValue = "";
                                                if (arrayExportCapForDateField.indexOf(modelPropsCapFor[j]) >= 0 && dataCapFor[i][modelPropsCapFor[j]] != "" && dataCapFor[i][modelPropsCapFor[j]] != null)
                                                    cellValue = new Date(dataCapFor[i][modelPropsCapFor[j]])
                                                    //else if (arrayExportCapForNumberField.indexOf(modelPropsCapFor[j]) >= 0 && dataCapFor[i][modelPropsCapFor[j]] != "" && dataCapFor[i][modelPropsCapGen[j]] != null)
                                                    //    cellValue = new Number(dataCapFor[i][modelPropsCapFor[j]])
                                                else
                                                    cellValue = dataCapFor[i][modelPropsCapFor[j]];
                                                rowCells.push({ value: cellValue });
                                            }
                                            rowsCapFor.push({ cells: rowCells });
                                        }
                                        var colCapForViewSettings = modelPropsCapFor.map(function () {
                                            return {
                                                autoWidth: true
                                            };
                                        });
                                    }


                                    //Create a new workbook with two sheets
                                    var workbook = new kendo.ooxml.Workbook({
                                        sheets: [{
                                            columns: columnSettings,
                                            title: "Projects",
                                            rows: rows
                                        }, {
                                            columns: colMilestoneSettings,
                                            title: "Milestones",
                                            rows: rowsMilestone
                                        }, {
                                            columns: colRiskIssueeSettings,
                                            title: "Risk and Issues",
                                            rows: rowsRiskIssue
                                        }, {
                                            columns: colAsksNeedSettings,
                                            title: "Ask and Need",
                                            rows: rowsAsksNeed
                                        }, {
                                            columns: colBusinessCaseSettings,
                                            title: "Business Case Options",
                                            rows: rowsBusinessCase
                                        }, {
                                            columns: colTopsViewSettings,
                                            title: "Tops",
                                            rows: rowsTopsView
                                        }
                                            , {
                                                columns: colCapGenViewSettings,
                                                title: "Capital (General)",
                                                rows: rowsCapGen
                                            }, {
                                                columns: colCapGenViewSettings,
                                                title: "Capital (Forecast)",
                                                rows: rowsCapFor
                                            }
                                        ]
                                    });
                                    //File name will have user name and datatime as a part of name
                                    var todayDate = kendo.toString(kendo.parseDate(new Date(), 'yyyy-MM-dd'), 'yyyyMMdd');
                                    var excelName = "SPOT Excel Export - " + currentUserName + "-" + curPageNo.toString() + " - " + todayDate + ".xlsx"
                                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: excelName });
                                    if (curPageNo === maxPageNo) { hideLoading(); }
                                }
                                catch (err) {
                                    hideLoading();
                                    var dataToSend = {
                                        "method": "ExportToExcel", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                    };
                                    $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                                        .then(function (response) { alert(errormessage); });
                                }
                            });
                    }
                    catch (err) {
                        hideLoading();
                        var dataToSend = {
                            "method": "ExportToExcel", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                        };
                        $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                            .then(function (response) { alert(errormessage); });
                    }
                }
            }
        }
        else {
            alert(errorNoRows);
            hideLoading();
        }
        //hideLoading();

    };
    /********This function will read the data column heading for model the datasource.********/
    function generateModel(response) {
        var sampleDataItem = response[0];
        var model = Object.keys(sampleDataItem);
        return model;
    }

    function searchProduct(inputId, selectedProduct, dsProducts) {
        var selectedProductfilter = "";
        var prodCombo = $("#" + inputId).data("kendoComboBox");

        if (prodCombo == undefined) {
            $("#" + inputId).kendoComboBox({
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                dataSource: dsProducts,
                minLength: 3,
                placeholder: productPickerPlaceholder,
                value: selectedProduct,
            });
            try {
                $('#' + inputId).data().kendoComboBox.input.on('keydown', function (e) {
                    if (e.keyCode == 13) {
                        // if (canFilter == true) {
                        var prodCombo = $("#" + inputId).data("kendoComboBox");
                        console.log(prodCombo.value());
                        var input = prodCombo.input[0].value;
                        console.log(input);
                        if (input.length >= 3) {
                            displayLoading();
                            var dataToSend = {
                                "filterString": input, "AlreadySearchedProduct": null
                            };
                            $.when(postDataWCFAsync("getProductDataWithFilter", dataToSend))
                                .then(function (resProd) {
                                    try {
                                        dsProducts = JSON.parse(resProd);
                                        prodCombo.setDataSource(dsProducts);
                                        prodCombo.open();
                                        hideLoading();
                                    }
                                    catch (err) {
                                        var dataToSend = {
                                            "method": "searchProduct", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                        };
                                        $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                                            .then(function (response) { alert(errormessage) });
                                        hideLoading();
                                    }
                                });
                        }
                        else {
                            alert(minThreeLetterMsg);
                            dsProducts = [];
                            var prodCombo = $("#" + inputId).data("kendoComboBox");
                            prodCombo.setDataSource(dsProducts);
                            prodCombo.close();
                            hideLoading();
                        }
                        //}
                        //else {
                        //    alert(minThreeLetterMsg);

                        //    var projCombo = $("#" + inputId).data("kendoComboBox");
                        //    projCombo.close();
                        //}
                    }
                    else {
                        dsProducts = [];
                        var prodCombo = $("#" + inputId).data("kendoComboBox");
                        if (e.keyCode == 8) {
                            prodCombo.value('')
                        }


                        prodCombo.setDataSource(dsProducts);
                        prodCombo.close();
                    }
                });
            }
            catch (err) {
                var dataToSend = {
                    "method": "searchProduct", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                };
                $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                    .then(function (response) { alert(errormessage) });
                hideLoading();
            }

        }
        else {
            prodCombo.setDataSource(dsProducts);
            hideLoading();
        }
        return selectedProductfilter;
    }

    function searchProductMultiselect(inputId, dsProduct, SelectedProduct) {
        var selectedProductfilter = "";
        var multiselect = $("#" + inputId).data("kendoMultiSelect");
        if (multiselect == undefined) {
            $("#" + inputId).kendoMultiSelect({
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                dataSource: dsProduct,
                minLength: 3,
                value: SelectedProduct,
                placeholder: productPickerPlaceholder,
            });
            $('#' + inputId).data().kendoMultiSelect.input.on('keydown', function (e) {
                if (e.keyCode == 13) {

                    var ProdCombo = $("#" + inputId).data("kendoMultiSelect");
                    var alreadySearched = ProdCombo.value();
                    var ProdFilter = "";
                    angular.forEach(alreadySearched, function (item, index) {
                        ProdFilter = ProdFilter + "," + item
                    });
                    selectedProductfilter = ProdFilter.substring(1, ProdFilter.length)
                    console.log(ProdCombo.value());
                    var input = ProdCombo.input[0].value;
                    console.log(input);
                    if (input.length >= 3) {
                        displayLoading();
                        var dataToSend = {
                            "filterString": input, "AlreadySearchedProduct": selectedProductfilter
                        };
                        $.when(postDataWCFAsync("getProductDataWithFilter", dataToSend))
                            .then(function (resProd) {
                                var dsProduct = JSON.parse(resProd);
                                ProdCombo.setDataSource(dsProduct);
                                ProdCombo.open();
                                hideLoading();
                            });
                    }
                    else {
                        alert(minThreeLetterMsg);

                        var ProdCombo = $("#" + inputId).data("kendoMultiSelect");
                        ProdCombo.close();
                    }

                }
                else {
                    var ProdCombo = $("#" + inputId).data("kendoMultiSelect");
                    ProdCombo.close();
                }
            });
        }
        else {
            multiselect.setDataSource(dsProduct);
            multiselect.value(SelectedProduct);
        }
        return selectedProductfilter;
    }
    function getCurrencyFxRate() {
        var deferred = $q.defer();
        $.when(postDataWCFAsync("getGetAllCurrencyFxRate"))
                              .then(function (resCurr) {
                                  try {
                                    var  dsCurr = JSON.parse(resCurr.getGetAllCurrencyFxRateResult);

                                      var col = [{
                                          field: "LocalCurrencyAbbreviation",
                                          title: "Currency Code",
                                          headerAttributes: {
                                              "class": "wrap-header"
                                          },
                                      }, {
                                          field: "LocalCurrencyName",
                                          title: "Currency Name",
                                      },{
                                          field: "FixRate",
                                          title: "Exchange Rate to JPY ",
                                          attributes: {
                                              class: "txt-float-R"
                                          },
                                          headerAttributes: {
                                              class: "txt-float-R"
                                          },
                                          //template: "#= (kendo.toString(FixRate, 'n4').trim()) #",
                                      }];
                                      var dataSource = new kendo.data.DataSource({
                                          //pageSize: 10,
                                          data: dsCurr,
                                         
                                          schema: {
                                              model: {
                                                  fields: {
                                                      LocalCurrencyAbbreviation: {
                                                          editable: false, nullable: true
                                                      },
                                                      LocalCurrencyName: {
                                                          type: "string", editable: false
                                                      },
                                                      //PortfolioOwner: { type: "string", editable: false },
                                                      FixRate: {
                                                          type: "string", editable: false
                                                      },
                                                  }
                                              }
                                          }
                                      });

                                      $("#GridCurrencyFxRate").kendoGrid({
                                          dataSource: dataSource,
                                          // groupable: false,
                                          columns: col})
                                      deferred.resolve("success");
                                      //prodCombo.setDataSource(dsProducts);
                                   
                                  }
                                  catch (err) {
                                      var dataToSend = {
                                          "method": "getCurrencyFxRate", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                                      };
                                      $.when(postDataWCFAsync("WriteErrorLog", dataToSend))
                                          .then(function (response) { alert(errormessage) });
                                      hideLoading();
                                  }
                              });
        return deferred.promise;

    }
    return {
        getDataWCFAsync: getDataWCFAsync,
        postDataWCFAsync: postDataWCFAsync,
        getDataWCF: getDataWCF,
        postDataWCF: postDataWCF,
        getUserAdID: getUserAdID,
        searchPeople: searchPeople,
        searchPeopleMultiselect: searchPeopleMultiselect,
        searchPeopleBulkEdit: searchPeopleBulkEdit,
        setDefaultUser: setDefaultUser,
        getSharepointDocuments: getSharepointDocuments,
        addDocumentToLibrary: addDocumentToLibrary,
        createFolderToLibrary: createFolderToLibrary,
        createProjectSite: createProjectSite,
        RemoveListItem: RemoveListItem,
        CheckFileExist: CheckFileExist,
        CheckFolderExist: CheckFolderExist,
        breakRolePermissionDocumentLibrary: breakRolePermissionDocumentLibrary,
        addMemberToConfidentialGroup: addMemberToConfidentialGroup,
        getAllMembers: getAllMembers,
        UpdateCreatedBy: UpdateCreatedBy,
        renameFileFolder: renameFileFolder,
        downloadFile: downloadFile,
        ExportToExcel: ExportToExcel,
        MoveDocumentToLibrary: MoveDocumentToLibrary,
        CopyDocumentToLibrary: CopyDocumentToLibrary,
        searchProject: searchProject,
        searchProjectParentMultiselect: searchProjectParentMultiselect,
        searchProduct: searchProduct,
        searchProductMultiselect: searchProductMultiselect,
        UpdateCreatedByModifiedBy: UpdateCreatedByModifiedBy,
        UpdateCreatedByModifiedByOnGetDocuments: UpdateCreatedByModifiedByOnGetDocuments,
        createSPGroup: createSPGroup,
        isSiteUniquePermission: isSiteUniquePermission,
        resetUniquePermission: resetUniquePermission,
        getGroupIdSPOTPMT: getGroupIdSPOTPMT,
        createProjectSiteForMigrate: createProjectSiteForMigrate,
        createLibraryView: createLibraryView,
        getCurrencyFxRate: getCurrencyFxRate
       
    }
});
