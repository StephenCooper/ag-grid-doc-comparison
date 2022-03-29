const gridOptions = {
  columnDefs: [
    // one column for showing the groups
    {
      headerName: "Group",
      cellRenderer: "agGroupCellRenderer",
      showRowGroup: true,
      minWidth: 210,
    },

    // the first group column
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },

    { field: "athlete", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ],
  defaultColDef: {
    flex: 1,
    sortable: true,
    resizable: true,
  },
  groupDisplayType: "custom",
  enableRangeSelection: true,
  animateRows: true,
};

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});
