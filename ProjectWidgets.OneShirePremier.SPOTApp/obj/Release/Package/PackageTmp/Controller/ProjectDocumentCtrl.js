//"use strict";
/*====================Date 02-June-2021=============================*/
angular.module('SPOTApp').controller('ProjectDocumentCtrl', ProjectDocumentCtrl)
ProjectDocumentCtrl.$inject = ['$rootScope', '$filter', '$scope', "$http", "$q", 'GETPostService'];
function ProjectDocumentCtrl($rootScope, $filter, $scope, $http, $q, GETPostService) {
    var vm = this;
    vm.InitProjectDocument = InitProjectDocument;
    vm.UploadDocument = UploadDocument;
    vm.moveDocument = moveDocument;
    vm.copyDocument = copyDocument;
    vm.CreateFolder = CreateFolder;
    vm.UpdateFileFolderName = UpdateFileFolderName;
    vm.CreateProjectSite = CreateProjectSite;
    //vm.createView = createView;
    vm.show = false;
    vm.oldName = "";
    var documents;
    var folders;
    var destinationPathUrl;
    var destinationPathUrlCopy;
    var childDocuments;
    var Isload = false;
    var folderToUpload = "";
    var createfolderPath = "";
    var moveFileName = "";
    var copyFileName = "";
    var updateIed = "";
    var moveItemId = "";
    var copyItemId = "";
    var documentLibraryName = docLibraryName;
    var className = "ProjectDocumentCtrl";
    var documentlibraryrelativePath = "";
    var sitename = "";
    //var isConfidentialProject = "";

    $rootScope.$on("GetProjectDocument", function (event, isConfidentialPro) {
        isConfidentialProject = isConfidentialPro;

        sitename = SeletedProjectName;
        if (ProjectSiteUrl != "" && ProjectSiteUrl != null) {

            GetSharepointDocuments();
        }
        else {
            //ProjectSiteUrl = rootSiteUrl + "/" + siteTemplate + "/" + sitename;
            vm.show = true;
        }

    });
    //function createView() {
    //    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyIsImtpZCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvcHJvamVjdHdpZGdldHMxLnNoYXJlcG9pbnQuY29tQDE0MmQ1NmUxLTRhYjUtNGY1ZC04MTQwLWQzZGI5ZmJmNGNhYyIsImlzcyI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEAxNDJkNTZlMS00YWI1LTRmNWQtODE0MC1kM2RiOWZiZjRjYWMiLCJpYXQiOjE1NzA1OTkzMTUsIm5iZiI6MTU3MDU5OTMxNSwiZXhwIjoxNTcwNjI4NDE1LCJpZGVudGl0eXByb3ZpZGVyIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDE0MmQ1NmUxLTRhYjUtNGY1ZC04MTQwLWQzZGI5ZmJmNGNhYyIsIm5hbWVpZCI6IjdmOGRjNmM3LWRkNmItNGZhOC1hN2M0LTFhYmUxYTVmYmM4ZkAxNDJkNTZlMS00YWI1LTRmNWQtODE0MC1kM2RiOWZiZjRjYWMiLCJvaWQiOiI0ZGVhZWYxNC1iZThhLTQ3MDAtYjhiYy1hZmY1MDc1ODNmNWUiLCJzdWIiOiI0ZGVhZWYxNC1iZThhLTQ3MDAtYjhiYy1hZmY1MDc1ODNmNWUiLCJ0cnVzdGVkZm9yZGVsZWdhdGlvbiI6ImZhbHNlIn0.PG7Rs9z0VDVMVy45rMmnn76DqswDpfSnLEw7A35u6XjAE1wv0kB8-UF8QgRwEgs2NK04k6RBKu3NZCCdpA_LAiIzhLo_YBpMpwfsuXRHJvoeJMuGY6ezkZM8HMvwtAjpz1VFYsRMg4549rEwEIbp72stDVuYsJhOKf1XKmMhLYDHPtHvv7N4cf1Cb0BRGVBVKE09kAv-hmq6BnYufPKgtXDSPkJLkM5BnTp8SkHHOjHs28BD8jqFyoqA-rn4td29y95wq9eabtA4oHrcdedue9mv3dFzetrQuqYlSts9i7uAJlzIya2vIwxSrP6LCs79hWEwoihA7hp12MrQN6aJ8A";
    //    $.when(GETPostService.createLibraryView(token))
    //        .then(function (resView) {
    //            console.log("dss");
    //        });
    //}
    function GetSharepointDocuments() {
        displayLoading();
        var allDocuments = [];
        var isSharedDocExist = [];
        $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"))
            .then(function (resToken) {
                var token = resToken.GetTokenForDocumentResult;
                var deferredSharepointDoc = $q.defer();
                var getDocumentUrl = ProjectSiteUrl + "/_api/web/lists/getbytitle('" + documentLibraryName + "')/items?$select=ID,FileLeafRef,FileDirRef,FileSystemObjectType,FileRef,Modified,ServerRedirectedEmbedUri,DocIcon,EncodedAbsUrl,Editor/Title,Author/Title,CreatedByCustom,ModifiedByCustom,ModifiedTimeCustom&$expand=Editor,Author,File";
                $.when(GETPostService.getSharepointDocuments(getDocumentUrl, token, documentLibraryName, allDocuments, deferredSharepointDoc))
                    .then(function (resDoc) {
                        try {
                            documents = [];
                            folders = [];
                            //GETPostService.downloadFile(token);
                            //var sitedetail = (new URL(ProjectSiteUrl));
                            var el = document.createElement('a');
                            el.href = ProjectSiteUrl;
                            var sitedetail = el;

                            documents = resDoc;
                            $.each(resDoc, function (index, item) {
                                $.when(GETPostService.UpdateCreatedByModifiedByOnGetDocuments(token, item, documentLibraryName))
                                    .then(function (ress) { console.log("success"); });
                            });
                            folders = resDoc.filter(function (entry) {
                                return entry.FileSystemObjectType !== 0;
                            });
                            if (documents.length > 0) {
                                var path = sitedetail.pathname;
                                if (!(path.substr(0, 1) == "/")) {
                                    path = "/" + path;
                                }
                                path = decodeURIComponent(path);
                                //path = path.replace(/\%20/g, " ");
                                var dirref = documents[0].FileDirRef.replace(path, "");
                                var item = dirref.split("/", 2);
                                documentlibraryrelativePath = path + "/" + item[1];
                                isSharedDocExist = documents.filter(function (entry) {
                                    return entry.FileRef == documentlibraryrelativePath;
                                });
                                if (isSharedDocExist.length == 0) {
                                    documents.push({ FileRef: path + "/" + item[1], FileDirRef: null, FileLeafRef: documentLibraryName, DocIcon: "", Modified: "", ServerRedirectedEmbedUri: "", FileSystemObjectType: 1, Author: { Title: "" }, Editor: { Title: "" }, CreatedByCustom: "", ModifiedByCustom: "", ModifiedTimeCustom: "" });
                                    folders.push({ FileRef: path + "/" + item[1], FileDirRef: null, FileLeafRef: documentLibraryName, DocIcon: "", Modified: "", ServerRedirectedEmbedUri: "", FileSystemObjectType: 1, Author: { Title: "" }, Editor: { Title: "" }, CreatedByCustom: "", ModifiedByCustom: "", ModifiedTimeCustom: "" });
                                }   
                                // documents.push({ FileRef: sitedetail.pathname+"/", FileDirRef: null, FileLeafRef: item[1], DocIcon: "", Modified: "", ServerRedirectedEmbedUri: "", Author: { Title: "" }, Editor: { Title: "" } });
                            }
                            else {
                                var path = sitedetail.pathname;
                                if (!(path.substr(0, 1) == "/")) {
                                    path = "/" + path;
                                }
                                path = decodeURIComponent(path);
                                //var dirref = documents[0].FileDirRef.replace(path, "");
                                // var item = dirref.split("/", 2);
                                documentlibraryrelativePath = path + "/" + docLibraryInternalName;
                                documents.push({ FileRef: path + "/" + docLibraryInternalName, FileDirRef: null, FileLeafRef: documentLibraryName, DocIcon: "", Modified: "", ServerRedirectedEmbedUri: "", FileSystemObjectType: 1, Author: { Title: "" }, Editor: { Title: "" }, CreatedByCustom: "", ModifiedByCustom: "", ModifiedTimeCustom :"" });
                                folders.push({ FileRef: path + "/" + docLibraryInternalName, FileDirRef: null, FileLeafRef: documentLibraryName, DocIcon: "", Modified: "", ServerRedirectedEmbedUri: "", FileSystemObjectType: 1, Author: { Title: "" }, Editor: { Title: "" }, CreatedByCustom: "", ModifiedByCustom: "", ModifiedTimeCustom :"" });

                            }
                            if (!Isload) {
                                InitKendoTreeDocuments();
                                InitKendoTreeViewDocuments();
                                InitKendoTreeViewDocumentsCopy();
                                $("#files").kendoUpload();
                                Isload = true;
                            }
                            else {
                                //$('#gridProjDoc').data('kendoTreeList').dataSource.read();
                                mainDocumentTree();
                                $('#FolderTreeView').data('kendoTreeList').dataSource.read();
                                $('#FolderTreeViewCopy').data('kendoTreeList').dataSource.read();
                            }
                            $scope.$digest();
                            hideLoading();
                        }
                        catch (err) {
                            var dataToSend = {
                                "method": "GetSharepointDocuments", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
                            };
                            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                                .then(function (response) {
                                    alert(errormessage);
                                    hideLoading();
                                });
                        }
                    });
            });
    }
    function mainDocumentTree() {
        var tree1 = $("#gridProjDoc").data("kendoTreeList");
        var dsNew = new kendo.data.TreeListDataSource({
            transport: {
                read: function (e) {
                    // on success
                    e.success(documents);
                }
            },
            schema: {
                model: {
                    id: "FileRef",
                    parentId: "FileDirRef",
                    fields: {
                        FileRef: { field: "FileRef", type: "string" },
                        FileDirRef: { field: "FileDirRef", type: "string", nullable: true }
                    },
                    //expanded: true
                }
            },
            pageSize: 50
        });
        tree1.setDataSource(dsNew);
        //  emptyChildDropDown();

        var treelist1 = $("#gridProjDoc").data("kendoTreeList");



        var data = treelist1.dataSource.rootNodes();
        for (let i = 0; i < data.length; i++) {
            var row = treelist1.content.find("tr[data-uid=" + data[i].uid + "]")
            treelist1.expand(row);
        }
        refreshTreeList(treelist1);
    }
    function InitKendoTreeDocuments() {

        var col = col_ProjectHub_gridProjDoc();
        $("#gridProjDoc").kendoTreeList({
            dataSource: {
                transport: {
                    read: function (e) {
                        // on success
                        e.success(documents);
                    }
                },
                schema: {
                    model: {
                        id: "FileRef",
                        parentId: "FileDirRef",
                        fields: {
                            FileRef: { field: "FileRef", type: "string" },
                            FileDirRef: { field: "FileDirRef", type: "string", nullable: true }
                        },
                       //expanded: true
                    }
                },
            },
           // loadOnDemand: false,
            height: 540,
            filterable: true,
            sortable: true,
            //dataBound: treeListBound,
            expand: treeListExpand,
            collapse: treeListExpand,
            columns: col,
            pageable: {
                pageSize: 50,
                pageSizes: true
            }

        });
        $("#gridProjDoc").kendoTooltip({
            filter: 'button',
            content: function (e) {
                var targetRow = $(e.target).closest('tr');
                var treelist = $("#gridProjDoc").data("kendoTreeList");
                var dataItem = treelist.dataItem(targetRow);
                var Str;
                $.each(treelist.columns[4].command, function (index, value) {
                    if (e.target.children().hasClass(value.imageClass)) {

                        Str = value.title;
                        return false;
                    }
                });
                return Str;
            },
            width: 100,
            position: "top"
        });    
        $("#gridProjDoc").getKendoTreeList().one("dataBound", function (e) {
            var treelist1 = $("#gridProjDoc").data("kendoTreeList");
            
            var data = treelist1.dataSource.rootNodes();
            for (let i = 0; i < data.length; i++) {
                var row = treelist1.content.find("tr[data-uid=" + data[i].uid + "]")
                treelist1.expand(row);
            }
            refreshTreeList(e.sender); 
        });
        $("#gridProjDoc").getKendoTreeList().dataSource.fetch();
    }
    function col_ProjectHub_gridProjDoc() {
        var col = [
            {
                field: "FileLeafRef",
                title: "Document Name",
                width: "42%",
                template: function (e) {
                    var docName = "";
                    if (e.FileSystemObjectType == 0) {
                        switch (e.DocIcon) {
                            case 'doc':
                            case 'docx':
                                // docName = "<span class='k-icon arrow k-i-doc'></span>" + e.FileLeafRef;
                                docName = "<span class='k-icon arrow k-i-doc'></span>" + ((e.ServerRedirectedEmbedUri == null || e.ServerRedirectedEmbedUri == '') ? "<a href=" + e.EncodedAbsUrl + " target='_blank'>" + e.FileLeafRef : "<a href=" + encodeURI(e.ServerRedirectedEmbedUri) + "&action=default target='_blank'>" + e.FileLeafRef);
                                break;
                            case 'xls':
                            case 'xlsx':
                                docName = "<span class='k-icon arrow k-i-xls'></span>" + ((e.ServerRedirectedEmbedUri == null || e.ServerRedirectedEmbedUri == '') ? "<a href=" + e.EncodedAbsUrl + " target='_blank'>" + e.FileLeafRef : "<a href=" + encodeURI(e.ServerRedirectedEmbedUri) + "&action=default target='_blank'>" + e.FileLeafRef);
                                break;
                            case 'ppt':
                            case 'pptx':
                                docName = "<span class='k-icon arrow k-i-ppt'></span>" + ((e.ServerRedirectedEmbedUri == null || e.ServerRedirectedEmbedUri == '') ? "<a href=" + e.EncodedAbsUrl + " target='_blank'>" + e.FileLeafRef : "<a href=" + encodeURI(e.ServerRedirectedEmbedUri) + "&action=default target='_blank'>" + e.FileLeafRef);
                                break;
                            case 'pdf':
                                docName = "<span class='k-icon arrow k-i-pdf'></span>" + ((e.ServerRedirectedEmbedUri == null || e.ServerRedirectedEmbedUri == '') ? "<a href=" + e.EncodedAbsUrl + " target='_blank'>" + e.FileLeafRef : "<a href=" + e.EncodedAbsUrl + " target='_blank'>" + e.FileLeafRef);
                                break;
                            case 'png':
                            case 'jpg':
                            case 'gif':
                                docName = "<span class='k-icon arrow k-i-image'></span>" + ((e.ServerRedirectedEmbedUri == null || e.ServerRedirectedEmbedUri == '') ? "<a href=" + e.EncodedAbsUrl + " target='_blank'>" + e.FileLeafRef : "<a href=" + encodeURI(e.ServerRedirectedEmbedUri) + "&action=default target='_blank'>" + e.FileLeafRef);
                                break;
                            case 'txt':
                                docName = "<span class='k-icon arrow k-i-txt'></span>" + ((e.ServerRedirectedEmbedUri == null || e.ServerRedirectedEmbedUri == '') ? "<a href=" + e.EncodedAbsUrl + " target='_blank'>" + e.FileLeafRef : "<a href=" + encodeURI(e.ServerRedirectedEmbedUri) + "&action=default target='_blank'>" + e.FileLeafRef);
                                break;
                            default:
                                docName = "<span class='k-icon arrow k-i-" + e.DocIcon + "'></span>" + ((e.ServerRedirectedEmbedUri == null || e.ServerRedirectedEmbedUri == '') ? "<a href=" + e.EncodedAbsUrl + " target='_blank'>" + e.FileLeafRef : "<a href=" + encodeURI(e.ServerRedirectedEmbedUri) + "&action=default target='_blank'>" + e.FileLeafRef);
                        }
                    }
                    else { docName = "<span class='k-icon arrow k-i-folder'></span>" + e.FileLeafRef; }
                    return docName;
                }
                //template: "#= (ServerRedirectedEmbedUri ==null || ServerRedirectedEmbedUri =='') ? #: FileLeafRef #:<a href='${ServerRedirectedEmbedUri}' target='_blank'>#: FileLeafRef #</a>"
            },
            {
                width: "10%",
                field: "ModifiedTimeCustom",
                title: "Modified",
                template: "#= (ModifiedTimeCustom ==null || ModifiedTimeCustom =='') ? '' : kendo.toString(kendo.parseDate(new Date(ModifiedTimeCustom), 'yyyy-MM-dd'), 'dd-MMM-yy hh:mm:ss tt') #"
            },
            {
                field: "ModifiedByCustom",
                title: "Modified By",
                //template: "#: Editor.Title #",
                width: "20%",
            },
            {
                field: "CreatedByCustom",
                title: "Created By",
                //template: "#: Author.Title #",
                width: "20%",
            },
            {
                command: [
                    {
                        name: "add",
                        title: "Create Folder",
                        imageClass: "k-i-folder-add",
                        className: "hiddenButton",
                        width: "5%",
                        text: " ",
                        click: function (e) {
                            e.preventDefault();
                            // e.target is the DOM element representing the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            createfolderPath = "";
                            $('#createfolder').val("");
                            if (data.FileRef != null) {
                                createfolderPath = data.FileRef;
                            }
                            var windowname = $("#dialogCreateFolder");
                            windowname.data("kendoWindow").open();
                        }
                    },
                    {
                        name: "delete",
                        title: "Delete",
                        imageClass: "k-i-close",
                        width: "5%",
                        className: "deleteButton",
                        text: " ",
                        click: function (e) {
                            e.preventDefault();
                            // e.target is the DOM element representing the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            var deleteMsg;
                            if (data.FileSystemObjectType == 0)
                                deleteMsg = deleteDocumentMessage;
                            else
                                deleteMsg = deleteFolderMessage;
                            if (!confirm(deleteMsg)) {
                                e.preventDefault();
                            }
                            else {
                                deleteDocument(data.ID, data.FileSystemObjectType);
                            }
                        }
                    },
                    {
                        name: "upload",
                        title: "Upload File",
                        imageClass: "k-i-upload",
                        className: "hiddenButton",
                        width: "5%",
                        text: " ",
                        click: function (e) {
                            e.preventDefault();
                            // e.target is the DOM element representing the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            if (data.FileDirRef != null) {
                                folderToUpload = data.FileRef;
                            }
                            else {
                                folderToUpload = null;
                            }
                            var upload = $("#files").data("kendoUpload");
                            upload.clearAllFiles();
                            var windowname = $("#dialogUploadDocument");
                            windowname.data("kendoWindow").open();
                        }
                    },
                    {
                        name: "download",
                        title: "Download File",
                        imageClass: "k-i-download",
                        width: "5%",
                        className: "downloadButton",
                        text: " ",
                        click: function (e) {
                            e.preventDefault();
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            var win = window.open(ProjectSiteUrl + "/_layouts/15/download.aspx?SourceUrl=" + data.FileRef, '_blank');
                        }

                    },
                    {
                        name: "rename",
                        title: "Edit Name",
                        imageClass: "k-i-edit",
                        width: "5%",
                        className: "editButton",
                        text: " ",
                        click: function (e) {
                            e.preventDefault();
                            // e.target is the DOM element representing the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            updateId = "";
                            //$('#renameFolder').val("");
                            if (data.ID != null) {
                                updateId = data.ID;
                            }

                            var windowname = $("#dialogUpdateFolderFile");
                            windowname.data("kendoWindow").open();
                            var name = data.FileLeafRef.split(".");
                          
                            vm.oldName = name[0];
                            $scope.$digest();
                        }

                    }, {
                        name: "move",
                        title: "Move",
                        imageClass: "k-i-move",
                        className: "moveButton",
                        width: "5%",
                        text: " ",
                        click: function (e) {
                            e.preventDefault();
                            // e.target is the DOM element representing the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            moveFileName = "";
                            moveItemId = "";
                            $('#moveFilePath').val("");
                            if (data.ID != null)
                                moveItemId = data.ID;
                            if (data.FileRef != null) {
                                moveFileName = data.FileLeafRef;
                            }
                            var windowname = $("#dialogMoveFile");
                            windowname.data("kendoWindow").open();
                        }
                    }, {
                        name: "copy",
                        title: "Copy",
                        imageClass: "k-i-copy",
                        className: "copyButton",
                        width: "5%",
                        text: " ",
                        click: function (e) {
                            e.preventDefault();
                            // e.target is the DOM element representing the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            copyFileName = "";
                            copyItemId = "";

                            if (data.ID != null)
                                copyItemId = data.ID;
                            if (data.FileRef != null) {
                                copyFileName = data.FileLeafRef;
                            }
                            var windowname = $("#dialogCopyFile");
                            windowname.data("kendoWindow").open();
                        }
                    }
                ]
            }
        ];
        return col;
    };
    function col_gridProjDoc_ListView() {
        var col = [
            {
                //field: "FileLeafRef",
                //  title: "",
                headerAttributes: { "style": "display:none" },
                width: "60%",
                template: function (e) {
                    var docName = "";
                    if (e.FileSystemObjectType !== 0) {
                        docName = "<span style='width:1.5em' class='k-icon arrow k-i-folder'></span>" + e.FileLeafRef;
                    }
                    return docName;
                }
            }

        ];
        return col;
    };

    function InitKendoTreeViewDocuments() {

        var col = col_gridProjDoc_ListView();
        $("#FolderTreeView").kendoTreeList({
            dataSource: {
                transport: {
                    read: function (e) {
                        // on success
                        e.success(folders);
                    }
                },
                schema: {
                    model: {
                        id: "FileRef",
                        parentId: "FileDirRef",
                        fields: {
                            FileRef: { field: "FileRef", type: "string" },
                            FileDirRef: { field: "FileDirRef", type: "string", nullable: true }
                        },
                        expanded: true
                    }
                },
            },

            height: 360,
            selectable: true,
            sortable: true,
            dataBound: treeListBound,
            expand: treeListExpand,
            columns: col,
            pageable: {
                pageSize: 50,
                //pageSizes: true
            },
            change: function (e) {

                var grid = $("#FolderTreeView").data("kendoTreeList");
                destinationPathUrl = grid.dataItem(grid.select()).FileRef;
            }

        });
        //$("#gridProjDoc").getKendoTreeList().one("dataBound", function (e) {
        //    var treelist1 = $("#gridProjDoc").data("kendoTreeList");
        //    var data = treelist1.dataSource.rootNodes();
        //    for (var i = 0; i < data.length; i++) {
        //        var row = treelist1.content.find("tr[data-uid=" + data[i].uid + "]")
        //        treelist1.expand(row);
        //    }
        //    var treelist2 = $("#FolderTreeView").data("kendoTreeList");
        //    refreshTreeList(e.sender);
        //});
        ////$("#FolderTreeView").getKendoTreeList().dataSource.fetch();
    }
    function InitKendoTreeViewDocumentsCopy() {

        var col = col_gridProjDoc_ListView();
        $("#FolderTreeViewCopy").kendoTreeList({
            dataSource: {
                transport: {
                    read: function (e) {
                        // on success
                        e.success(folders);
                    }
                },
                schema: {
                    model: {
                        id: "FileRef",
                        parentId: "FileDirRef",
                        fields: {
                            FileRef: { field: "FileRef", type: "string" },
                            FileDirRef: { field: "FileDirRef", type: "string", nullable: true }
                        },
                        expanded: true
                    }
                },
            },

            height: 360,
            selectable: true,
            sortable: true,
            dataBound: treeListBound,
            expand: treeListExpand,
            columns: col,
            pageable: {
                pageSize: 50,
                //pageSizes: true
            },
            change: function (e) {

                var grid = $("#FolderTreeViewCopy").data("kendoTreeList");
                destinationPathUrlCopy = grid.dataItem(grid.select()).FileRef;
            }

        });
        //$("#gridProjDoc").getKendoTreeList().one("dataBound", function (e) {
        //    var treelist1 = $("#gridProjDoc").data("kendoTreeList");
        //    var data = treelist1.dataSource.rootNodes();
        //    for (var i = 0; i < data.length; i++) {
        //        var row = treelist1.content.find("tr[data-uid=" + data[i].uid + "]")
        //        treelist1.expand(row);
        //    }
           
        //    refreshTreeList(e.sender);
        //});
        //$("#FolderTreeViewCopy").getKendoTreeList().dataSource.fetch();
    }
    function treeListExpand(e) {       
        setTimeout(function () {
            refreshTreeList(e.sender);
        }, 50);
    }
    function treeListBound(e) {
        try {
            var treelist1 = $("#gridProjDoc").data("kendoTreeList");
            var data = treelist1.dataSource.rootNodes();
            for (var i= 0; i < data.length; i++) {
                var row = treelist1.content.find("tr[data-uid=" + data[i].uid + "]")
                treelist1.expand(row);
            }

            refreshTreeList(e.sender);
        }
        catch (err) {
            console.log(err);
        }
    }
    function refreshTreeList(treeList) {
        // var treeList = e.sender;
        var items = treeList.items();


        for (var i = 0; i < items.length; i++) {
            if (i == 0) {
                $(items[i]).find(".editButton").hide();
                $(items[i]).find(".deleteButton").hide();
            }
            else {
                $(items[i]).find(".editButton").show();
                $(items[i]).find(".deleteButton").show();
            }
            var dataItem = treeList.dataItem(items[i]);

            if (dataItem.FileSystemObjectType == 0) {
                $(items[i]).find(".hiddenButton").hide();
            }
            else {
                $(items[i]).find(".hiddenButton").show();
            }
            if (dataItem.FileSystemObjectType == 1) {
                //  $(items[i]).find(".deleteButton").show();
                $(items[i]).find(".downloadButton").hide();
                $(items[i]).find(".moveButton").hide();
                $(items[i]).find(".copyButton").hide();
            }
            else {
                //  $(items[i]).find(".deleteButton").show();
                $(items[i]).find(".downloadButton").show();
                $(items[i]).find(".moveButton").show();
                $(items[i]).find(".copyButton").show();
            }
        }
    }
    function UploadDocument() {
        var SpecialCExistInFile = false;
        var windowname = $("#dialogUploadDocument");
        try {
            var newFile = 0;
            //var fileContent = document.getElementById('files').files ? document.getElementById('files').files[0] : "";
            // var files = document.getElementById('files').files;
            var files = $("#files").data("kendoUpload").getFiles();
            $.each(files, function(key, value){
                console.log(value.name);
                var specialCharacterExist = CheckForSpecialCharacter(value.name);
                if (specialCharacterExist == true) {
                    SpecialCExistInFile = true;
                }
            });
            if (files.length > 0) {
                if (!SpecialCExistInFile)
                {
                displayLoading();
                $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"))
                    .then(function (resToken) {
                        var token = resToken.GetTokenForDocumentResult;
                        $.when(GETPostService.CheckFileExist(folderToUpload, token))
                            .then(function (checkfiles) {
                                var folderpath = null;
                                if (folderToUpload != null) {
                                    folderpath = folderToUpload.replace(documentlibraryrelativePath, "");
                                }
                                var count = [];

                                for (var i = 0; i < files.length; i++) {
                                    var flag = true;
                                    var fileInfo = files[i];
                                    var fileContent = fileInfo;
                                    if (checkfiles.d.results.length > 0) {
                                        var fileExist = checkfiles.d.results.filter(function (entry) {
                                            return entry.Name.toUpperCase() == fileInfo.name.toUpperCase();
                                        });
                                        if (fileExist.length > 0) {
                                            if (confirm("A file with name " + fileInfo.name + " already exists. Would you like to replace the existing one? ")) {
                                                flag = true;
                                            }
                                            else {
                                                count.push(fileInfo.name);
                                                flag = false;
                                            }
                                        }
                                    }
                                    if (flag) {
                                        newFile = newFile + 1;
                                        $.when(GETPostService.addDocumentToLibrary(documentLibraryName, fileContent, token, folderpath))
                                            .then(function (resDoc) {
                                                count.push(resDoc);
                                                if (files.length == count.length) {
                                                    var upload = $("#files").data("kendoUpload");
                                                    upload.clearAllFiles();
                                                    alert("File uploaded successfully");
                                                    windowname.data("kendoWindow").close();
                                                    GetSharepointDocuments();
                                                }
                                            });
                                    }
                                }
                                if (newFile == 0) {
                                    hideLoading();
                                }
                            });
                    });
            }
            else { alert(InvalidFolderName); }
            }
            else { alert("Please select the file(s) to be uploaded. "); }

        }
        catch (err) {
            var dataToSend = {
                "method": "UploadDocument", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                    hideLoading();
                    windowname.data("kendoWindow").close();
                });
        }
    }

    function CreateFolder() {
        var windowname = $("#dialogCreateFolder");
        try {

            var folderName = document.getElementById('createfolder').value
            if (folderName != "") {
                if (!CheckForSpecialCharacter(folderName)) {
                    displayLoading();
                    $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"))
                        .then(function (resToken) {
                            var token = resToken.GetTokenForDocumentResult;
                            $.when(GETPostService.CheckFolderExist(createfolderPath, token))
                                .then(function (checkfiles) {
                                    if (checkfiles.d.results.length > 0) {
                                        var fileExist = checkfiles.d.results.filter(function (entry) {
                                            return entry.Name.toUpperCase() == folderName.toUpperCase();
                                        });
                                        if (fileExist.length > 0) {
                                            alert('A folder with the name you entered "' + folderName + '" already exists. Please select a different name.');
                                            hideLoading();
                                            return;
                                        }
                                    }
                                    $.when(GETPostService.createFolderToLibrary(documentLibraryName, token, createfolderPath, folderName))
                                        .then(function (resDoc) {
                                            //document.getElementById('createfolder').value = "";

                                            alert("Folder created successfully");
                                            GetSharepointDocuments();
                                            hideLoading();
                                            windowname.data("kendoWindow").close();

                                        });
                                });
                        });
                }
                else { alert(InvalidFolderName); }
            }
            else {
                alert("Please enter the folder name to be created.");

                return;
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "CreateFolder", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                    hideLoading();
                    windowname.data("kendoWindow").close();
                });
        }
    }
    function UpdateFileFolderName() {
        var windowname = $("#dialogUpdateFolderFile");
        try {
            var folderName = document.getElementById('renameFolder').value;
            if (folderName != "") {
                if (!CheckForSpecialCharacter(folderName)) {
                    displayLoading();
                    $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"))
                        .then(function (resToken) {
                            var token = resToken.GetTokenForDocumentResult;
                            $.when(GETPostService.renameFileFolder(token, updateId, folderName))
                                .then(function (resRenamed) {
                                    if (resRenamed == "Success") {
                                        windowname.data("kendoWindow").close();
                                        GetSharepointDocuments();
                                        hideLoading();
                                    }
                                    else
                                        if (resRenamed.includes("already exist") == true) {
                                            alert('A folder with the name you entered "' + folderName + '" already exists. Please select a different name.');
                                            hideLoading();
                                            return;
                                        }
                                        else {
                                            alert("Error in renaming");
                                            hideLoading();
                                            return;
                                        }
                                });
                        });
                }
                else { alert(InvalidFolderName); }
            }
            else {
                alert("Please enter the name to be updated.");

                return;
            }
        }
        catch (err) {
            var dataToSend = {
                "method": "UpdateFileFolderName", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                    hideLoading();
                    windowname.data("kendoWindow").close();
                });
        }
    }
    function CreateProjectSite() {
        try {
            displayLoading();          
            $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"), GETPostService.postDataWCFAsync("GetProjectRootSiteUrl", SeletedProjectId))
                .then(function (resToken, resRootSiteUrl) {
                    var token = resToken.GetTokenForDocumentResult;
                    if (JSON.parse(resRootSiteUrl.GetProjectRootSiteUrlResult).length > 0) {
                        var RootUrl = JSON.parse(resRootSiteUrl.GetProjectRootSiteUrlResult)[0];
                        rootSiteUrl = RootUrl.rootSiteUrl;
                        siteTemplate = RootUrl.siteTemplate;

                    }
                    // sitename = sitename.replace(/\%/g, "");
                    var title = sitename;
                    var siteUrl = ReplaceSpecialCharacters(sitename);
                  
                    if (isConfidentialProject == true) {
                        title = title.substring("7", title.length);
                        siteUrl = siteUrl.substring("7", siteUrl.length);
                    }
                    $.when(GETPostService.createProjectSite(token, title, isConfidentialProject), GETPostService.getDataWCF("getProjectTeam/" + SeletedProjectId))
                        .then(function (resDoc, team) {
                            if (resDoc == "Success" || resDoc == "already exist" ) {
                                var gridDataTeam = JSON.parse(team.getProjectTeamResult);
                                vm.show = false;
                                alert("Project site created successfully.");
                              

                                SeletedProjectId = getParameterByName(window.location.search, "ProblemID");

                                var dataToSend = {
                                    "ProjectID": SeletedProjectId, "ProjectSiteURL": ProjectSiteUrl,

                                };
                                $.when(GETPostService.postDataWCFAsync("insertUpdateProjectSiteURL", dataToSend))
                                    .then(function (resDoc) {
                                        try {
                                            if (resDoc == "Success") {
                                                console.log("Project Site updated");
                                                GetSharepointDocuments();
                                                if (gridDataTeam.length > 0 && isConfidentialProject == true)
                                                    GETPostService.getAllMembers(gridDataTeam);
                                            }
                                        }
                                        catch (err) {
                                            var dataToSend = {
                                                "method": "CreateProjectSite", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
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
        }
        catch (err) {
            var dataToSend = {
                "method": "CreateProjectSite", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                    hideLoading();
                    windowname.data("kendoWindow").close();
                });
        }

    }

    function deleteDocument(itemId, objectType) {
        try {
            displayLoading();
            $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"))
                .then(function (resToken) {
                    var token = resToken.GetTokenForDocumentResult;
                    $.when(GETPostService.RemoveListItem(itemId, documentLibraryName, token, objectType))
                        .then(function (resDoc) {
                            if (resDoc == "Success") {
                                GetSharepointDocuments();
                            }
                            else {
                                alert("Error in deletion.");
                                hideLoading();
                            }
                        });
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "deleteDocument", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                    hideLoading();
                });
        }
    }
    function editDocument(itemId) {
        try {
            displayLoading();
            $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"))
                .then(function (resToken) {
                    var token = resToken.GetTokenForDocumentResult;
                    $.when(GETPostService.renameFileFolder(itemId, documentLibraryName, token))
                        .then(function (resDoc) {
                            if (resDoc == "Success") {
                                GetSharepointDocuments();
                            }
                            else {
                                alert("Error in document renaming.");
                                hideLoading();
                            }
                        });
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "editDocument", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                    hideLoading();
                });
        }
    }
    function moveDocument(itemId) {
        try {


            displayLoading();
            $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"))
                .then(function (resToken) {
                    var token = resToken.GetTokenForDocumentResult;
                    $.when(GETPostService.MoveDocumentToLibrary(moveItemId, docLibraryName, token, destinationPathUrl, sitename, moveFileName))
                        .then(function (resDoc) {
                            if (resDoc == "Success") {
                                $.when(GETPostService.UpdateCreatedByModifiedBy(token, moveItemId, docLibraryName))
                                    .then(function (resModified) {
                                        alert("Document moved successfully.");
                                        var windowname = $("#dialogMoveFile");
                                        windowname.data("kendoWindow").close();
                                        GetSharepointDocuments();
                                    });

                            }
                            else {
                                alert("Error in moving document.");
                                hideLoading();
                            }
                        });
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "moveDocument", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                    hideLoading();
                });
        }
    }
    function copyDocument(itemId) {
        try {
            displayLoading();
            $.when(GETPostService.postDataWCFAsync("GetTokenForDocument"))
                .then(function (resToken) {
                    var token = resToken.GetTokenForDocumentResult;
                    $.when(GETPostService.CopyDocumentToLibrary(copyItemId, docLibraryName, token, destinationPathUrlCopy, sitename, copyFileName))
                        .then(function (resDoc) {
                            if (resDoc == "Success") {
                                alert("Document copied successfully.");
                                var windowname = $("#dialogCopyFile");
                                windowname.data("kendoWindow").close();
                                GetSharepointDocuments();
                            }
                            else {
                                alert("Error in document deletion.");
                                hideLoading();
                            }
                        });
                });
        }
        catch (err) {
            var dataToSend = {
                "method": "copyDocument", "exceptionMessage": "message:" + err.message + " stack:" + err.stack, "ErrorParameter": className
            };
            $.when(GETPostService.postDataWCFAsync("WriteErrorLog", dataToSend))
                .then(function (response) {
                    alert(errormessage);
                    hideLoading();
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
    function CheckForSpecialCharacter(value) {
        var chars = ['*', '#', '\\', ':', '<', '>', '?', '/', '|', '"', '%'];
        if (value.startsWith('.') || value.endsWith('.')) {
            return true;
        }
        for (var i = 0; i < chars.length; i++) {
            if (value.indexOf(chars[i]) > -1) {
                return true
            }
        }
        return false;
    }

    function InitProjectDocument() { };

};