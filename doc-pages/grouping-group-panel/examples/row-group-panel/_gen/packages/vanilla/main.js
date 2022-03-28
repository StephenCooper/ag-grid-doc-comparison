
const gridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, enableRowGroup: true, hide: true },
    { field: 'year', rowGroup: true, enableRowGroup: true, hide: true },
    { field: 'sport', enableRowGroup: true },
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
  animateRows: true,
  rowGroupPanelShow: 'always',
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api.setRowData(data))
})
