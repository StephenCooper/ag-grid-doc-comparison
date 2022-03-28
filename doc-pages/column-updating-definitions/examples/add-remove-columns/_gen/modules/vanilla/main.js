
const columnDefsMedalsIncluded = [
  { field: 'athlete' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
  { field: 'age' },
  { field: 'country' },
  { field: 'sport' },
  { field: 'year' },
  { field: 'date' },
]

const colDefsMedalsExcluded = [
  { field: 'athlete' },
  { field: 'age' },
  { field: 'country' },
  { field: 'sport' },
  { field: 'year' },
  { field: 'date' },
]

const gridOptions = {
  columnDefs: columnDefsMedalsIncluded,
  defaultColDef: {
    initialWidth: 100,
    sortable: true,
    resizable: true,
  },
}

function onBtExcludeMedalColumns() {
  gridOptions.api.setColumnDefs(colDefsMedalsExcluded)
}

function onBtIncludeMedalColumns() {
  gridOptions.api.setColumnDefs(columnDefsMedalsIncluded)
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api.setRowData(data))
})
