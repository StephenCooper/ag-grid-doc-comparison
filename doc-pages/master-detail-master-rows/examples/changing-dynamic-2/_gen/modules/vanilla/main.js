const gridOptions = {
  masterDetail: true,
  isRowMaster: function (dataItem) {
    return dataItem ? dataItem.callRecords.length > 0 : false;
  },
  columnDefs: [
    // group cell renderer needed for expand / collapse icons
    { field: "name", cellRenderer: "agGroupCellRenderer" },
    { field: "account" },
    { field: "calls", cellRenderer: CallsCellRenderer },
    { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
  ],
  defaultColDef: {
    flex: 1,
  },
  animateRows: true,
  getRowId: function (params) {
    return params.data.account;
  },
  detailCellRendererParams: {
    detailGridOptions: {
      columnDefs: [
        { field: "callId" },
        { field: "direction" },
        { field: "number", minWidth: 150 },
        { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
        { field: "switchCode", minWidth: 150 },
      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: function (params) {
      params.successCallback(params.data.callRecords);
    },
  },
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params) {
  // arbitrarily expand a row for presentational purposes
  setTimeout(function () {
    params.api.getDisplayedRowAtIndex(1).setExpanded(true);
  }, 0);
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  fetch(
    "https://www.ag-grid.com/example-assets/master-detail-dynamic-data.json"
  )
    .then((response) => response.json())
    .then(function (data) {
      gridOptions.api.setRowData(data);
    });
});
