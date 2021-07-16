function closeDialog(windowName) {
    var myWindow = $("#" + windowName);
    myWindow.data("kendoWindow").close();
}
function displayLoading() {
    //var element = $(document.body);
    //kendo.ui.progress(element, true);
    $("#preloader").show();
}

function hideLoading() {
    //var element = $(document.body);
    //kendo.ui.progress(element, false);
    setTimeout(function () { $("#preloader").hide(); }, 400);
}
function trackEvent(functionName) {
    try {
        aisdk.trackEvent({ name: functionName });
        //console.log(functionName);
    }
    catch(excep) {
        console.log("exception");
    }
}

function displayLoadingWindow(windowName) {
    var windowWidget = $("#" + windowName).data("kendoWindow");
    kendo.ui.progress(windowWidget.element, true);
}
function hideLoadingWindow(windowName) {
    var windowWidget = $("#" + windowName).data("kendoWindow");
    kendo.ui.progress(windowWidget.element, false);
}
function NewGuid() {
    //return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //    return v.toString(16); })
    return kendo.guid();
};
function disableComboSearch(elmentId) {
    var comboSearchBox = $("#" + elmentId).data("kendoComboBox");

    comboSearchBox.input.attr("readonly", false)
        .on("keydown", function (e) {
            if (e.keyCode != 8 && e.keyCode != 46) {
                e.preventDefault();
            }
        });
};

function checkAll(el, gridname) {

    displayLoading();
    var checked = el.checked;
    $(el).closest("li").siblings().each(function (e) {
        if (!$(this).hasClass("custom-class") && $(this).find("input")[0].checked != checked) {
            $(this).find("input").click();
            $(this).removeClass("k-state-hover");
        }
    });
  //  var gridname = $(grid.sender)[0].element[0].id;
    if (gridname == Default)
        DefaultGridSelectAll = checked;
    else if (gridname == LocalAttributes)
        LocalGridSelectAll = checked;
    else if (gridname == 'CapitalPortfolioReport')
        CapitalGridSelectAll = checked;
    hideLoading();

}


//function parseDate(date)
//{
//    var month, year;
//    var dateStr = kendo.toString(kendo.parseDate(date), 'MM/dd/yyyy');
//    if (dateStr!=null && dateStr.indexOf('/') > -1) {
//        var parts = dateStr.split('/');
//        //const months = ['1', '2', '3', '4', '5', '6', '7', '8', '10', '11', '12', 'DEC'];
//        month = parts[0]
//        var day = parts[1];
//        year = parts[2];
//        //if (parts[1] != null) {
//        //    month = months.indexOf(parts[1].toUpperCase());
//        //}
//        //if (parts[2] != null) {
//        //    var currentyear = new Date().getFullYear()
//        //    var str = currentyear.toString();
//        //    var cyear = str.substring(0, 2);
//        //    year = cyear + parts[2];
//        //}
//        if (isNaN(month) || isNaN(day) || isNaN(year)) {
//            return  false ;
//        }
//        month = Number(month);
//        day = Number(day);
//        year = Number(year);

//        if (day < 1 || day > 31) {
//            return false;
//        }
//        if (month  < 1 || month > 12) { // check month range
//            return false;
//        }
//        if (month == 2) { // check for february 29th
//            var isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
//            if (day > 29 || (day === 29 && !isleap)) {
//                return false ;
//            }
//        }
//        return true;
//    }
//    else { return false;}
//}
function parseDate(date) {
    var month, year;
    var dateStr = kendo.toString(kendo.parseDate(date), 'MM/dd/yyyy');
    if (dateStr != null && date.indexOf('/') > -1) {
        var parts = date.split('/');
        //const months = ['1', '2', '3', '4', '5', '6', '7', '8', '10', '11', '12', 'DEC'];
        month = parts[0]
        var day = parts[1];
        year = parts[2];
        //if (parts[1] != null) {
        //    month = months.indexOf(parts[1].toUpperCase());
        //}
        //if (parts[2] != null) {
        //    var currentyear = new Date().getFullYear()
        //    var str = currentyear.toString();
        //    var cyear = str.substring(0, 2);
        //    year = cyear + parts[2];
        //}
        if (isNaN(month) || isNaN(day) || isNaN(year)) {
            return false;
        }
        month = Number(month);
        day = Number(day);
        year = Number(year);
        if (year.toString().length != 4) {
            return false;
        }
        if (day < 1 || day > 31) {
            return false;
        }
        if (month < 1 || month > 12) { // check month range
            return false;
        }
        if (month == 2) { // check for february 29th
            var isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
            if (day > 29 || (day === 29 && !isleap)) {
                return false;
            }
        }
        return true;
    }
    else { return false; }
}

function disableDatePicker(elmentId) {
    //$("#" + elmentId).kendoDatePicker({
    //    format: "dd-MMM-yy"
    //});
     
    $("#" + elmentId).kendoDatePicker({
        disableDates: function (date) {
            if (date > new Date()) {
                return true;
            } else {
                return false;
            }
        }
    });
}
    //$("#" + elmentId).on("keydown", function (e) {
    //    if (e.keyCode == 8 || e.keyCode == 46) {
    //        $(this).data("kendoDatePicker").value("");
    //    }
    //    else { e.preventDefault(); }
    //})
function bindChangeComboBox(elmentId) {
    $("#" + elmentId).on("change", function (e) {
        if ($(this).data("kendoComboBox").value() && $(this).data("kendoComboBox").select() === -1) {
            $(this).data("kendoComboBox").value("");
        }

    });
};
function UpdateRiskIssue() {
    var myWindow = $("#dialogRiskIssue");
    myWindow.data("kendoWindow").open();
}
function getParameterByName(urlToCheck, name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(urlToCheck);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
function CompletedDateEditor(container, options) {
    $('<input  name="' + options.field + '"/>')
      .appendTo(container)
      .kendoDatePicker({
          format: "MM/dd/yyyy",
          placeholder: dateLabel,
          disableDates: function (date) {
              if (date > new Date()) {
                  return true;
              } else {
                  return false;
              }
          }
      });
}

    

