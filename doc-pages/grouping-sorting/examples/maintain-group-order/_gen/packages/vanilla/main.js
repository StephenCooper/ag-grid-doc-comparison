
const gridOptions = {
  columnDefs: [
    { field: 'assignee', rowGroup: true, hide: true },
    { field: 'priority', rowGroup: true, hide: true },
    { field: 'task' },
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
  groupDisplayType: 'multipleColumns',
  groupMaintainOrder: true,
  groupDefaultExpanded: -1,
  animateRows: true,
  rowData: getData(),
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(gridDiv, gridOptions)
})
