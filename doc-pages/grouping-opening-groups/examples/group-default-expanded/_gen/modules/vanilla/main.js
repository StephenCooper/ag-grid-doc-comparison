const gridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'athlete' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 200,
  },
  // all 'country' row groups will be open by default
  groupDefaultExpanded: 1,
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
