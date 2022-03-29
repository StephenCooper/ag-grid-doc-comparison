var list1 = ["Elephant", "Lion", "Monkey"];
var list2 = ["Elephant", "Giraffe", "Tiger"];

var valuesArray = list1.slice();
var valuesCallbackList = list1;

function valuesCallback(params) {
  setTimeout(function () {
    params.success(valuesCallbackList);
  }, 1000);
}

var arrayFilterParams = {
  values: valuesArray,
};

var callbackFilterParams = {
  values: valuesCallback,
  refreshValuesOnOpen: true,
};

const gridOptions = {
  columnDefs: [
    {
      colId: "array",
      headerName: "Values Array",
      field: "animal",
      filter: "agSetColumnFilter",
      filterParams: arrayFilterParams,
    },
    {
      colId: "callback",
      headerName: "Values Callback",
      field: "animal",
      filter: "agSetColumnFilter",
      filterParams: callbackFilterParams,
    },
  ],
  defaultColDef: {
    flex: 1,
    filter: true,
    resizable: true,
  },
  sideBar: "filters",
  rowData: getData(),
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params) {
  params.api.getToolPanelInstance("filters").expandFilters();
}

function useList1() {
  console.log("Updating values to " + list1);
  valuesArray.length = 0;
  list1.forEach(function (value) {
    valuesArray.push(value);
  });

  var filter = gridOptions.api.getFilterInstance("array");
  filter.refreshFilterValues();

  valuesCallbackList = list1;
}

function useList2() {
  console.log("Updating values to " + list2);
  valuesArray.length = 0;
  list2.forEach(function (value) {
    valuesArray.push(value);
  });

  var filter = gridOptions.api.getFilterInstance("array");
  filter.refreshFilterValues();

  valuesCallbackList = list2;
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
});
