import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

function getColumnDefs() {
  return [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]
}

const gridOptions: GridOptions = {
  defaultColDef: {
    initialWidth: 100,
    sortable: true,
    resizable: true,
    filter: true,
  },
  columnDefs: getColumnDefs(),
}

function setHeaderNames() {
  const columnDefs: ColDef[] = getColumnDefs()
  columnDefs.forEach(function (colDef, index) {
    colDef.headerName = 'C' + index
  })
  gridOptions.api!.setColumnDefs(columnDefs)
}

function removeHeaderNames() {
  const columnDefs: ColDef[] = getColumnDefs()
  columnDefs.forEach(function (colDef, index) {
    colDef.headerName = undefined
  })
  gridOptions.api!.setColumnDefs(columnDefs)
}

function setValueFormatters() {
  const columnDefs: ColDef[] = getColumnDefs()
  columnDefs.forEach(function (colDef, index) {
    colDef.valueFormatter = function (params) {
      return '[ ' + params.value + ' ]'
    }
  })
  gridOptions.api!.setColumnDefs(columnDefs)
}

function removeValueFormatters() {
  const columnDefs: ColDef[] = getColumnDefs()
  columnDefs.forEach(function (colDef, index) {
    colDef.valueFormatter = undefined
  })
  gridOptions.api!.setColumnDefs(columnDefs)
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => {
      gridOptions.api!.setRowData(data)
    })
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).setHeaderNames = setHeaderNames;
 (<any>window).removeHeaderNames = removeHeaderNames;
 (<any>window).setValueFormatters = setValueFormatters;
 (<any>window).removeValueFormatters = removeValueFormatters;
}