const columnDefs = [
  { field: "athlete" },
  { field: "age", width: 100 },
  { field: "country" },
  { field: "year", width: 100 },
  { field: "date" },
  { field: "sport" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
];

const gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    width: 170,
    sortable: true,
  },
  multiSortKey: "ctrl",
  onGridReady: function (params) {
    var defaultSortModel = [
      { colId: "country", sort: "asc", sortIndex: 0 },
      { colId: "athlete", sort: "asc", sortIndex: 1 },
    ];

    params.columnApi.applyColumnState({ state: defaultSortModel });
  },
};

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});
