import {
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  IFiltersToolPanel,
} from "@ag-grid-community/core";

var listOfDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

var daysValuesNotProvidedFilterParams = {
  comparator: function (a: string, b: string) {
    var aIndex = listOfDays.indexOf(a);
    var bIndex = listOfDays.indexOf(b);
    if (aIndex === bIndex) return 0;
    return aIndex > bIndex ? 1 : -1;
  },
};

var daysValuesProvidedFilterParams = {
  values: listOfDays,
  suppressSorting: true, // use provided order
};

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: "Days (Values Not Provided)",
      field: "days",
      filter: "agSetColumnFilter",
      filterParams: daysValuesNotProvidedFilterParams,
    },
    {
      headerName: "Days (Values Provided)",
      field: "days",
      filter: "agSetColumnFilter",
      filterParams: daysValuesProvidedFilterParams,
    },
  ],
  defaultColDef: {
    flex: 1,
    filter: true,
    resizable: true,
  },
  sideBar: "filters",
  rowData: getRowData(),
  onFirstDataRendered: onFirstDataRendered,
};

function getRowData() {
  var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  var rows = [];
  for (var i = 0; i < 200; i++) {
    var index = Math.floor(Math.random() * 5);
    rows.push({ days: weekdays[index] });
  }

  return rows;
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  (
    params.api.getToolPanelInstance("filters") as any as IFiltersToolPanel
  ).expandFilters();
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
  new Grid(gridDiv, gridOptions);
});
