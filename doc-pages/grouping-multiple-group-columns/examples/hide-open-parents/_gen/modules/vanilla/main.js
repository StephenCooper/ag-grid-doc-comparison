const gridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    {
      headerName: 'Year',
      valueGetter: 'data.year',
      rowGroup: true,
      hide: true,
    },

    { field: 'athlete', minWidth: 200 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'total', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 200,
    filterValueGetter: function (params) {
      if (params.node) {
        var colGettingGrouped = params.colDef.showRowGroup + '';
        return params.api.getValue(colGettingGrouped, params.node);
      }
    },
  },
  enableRangeSelection: true,
  groupHideOpenParents: true,
  animateRows: true,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});
