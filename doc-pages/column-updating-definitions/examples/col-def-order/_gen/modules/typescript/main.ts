import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

function getColumnDefsA() {
  return [
    { field: 'athlete', headerName: 'A Athlete' },
    { field: 'age', headerName: 'A Age' },
    { field: 'country', headerName: 'A Country' },
    { field: 'sport', headerName: 'A Sport' },
    { field: 'year', headerName: 'A Year' },
    { field: 'date', headerName: 'A Date' },
    { field: 'gold', headerName: 'A Gold' },
    { field: 'silver', headerName: 'A Silver' },
    { field: 'bronze', headerName: 'A Bronze' },
    { field: 'total', headerName: 'A Total' },
  ]
}

function getColumnDefsB() {
  return [
    { field: 'gold', headerName: 'B Gold' },
    { field: 'silver', headerName: 'B Silver' },
    { field: 'bronze', headerName: 'B Bronze' },
    { field: 'total', headerName: 'B Total' },
    { field: 'athlete', headerName: 'B Athlete' },
    { field: 'age', headerName: 'B Age' },
    { field: 'country', headerName: 'B Country' },
    { field: 'sport', headerName: 'B Sport' },
    { field: 'year', headerName: 'B Year' },
    { field: 'date', headerName: 'B Date' },
  ]
}

const gridOptions: GridOptions = {
  defaultColDef: {
    initialWidth: 100,
    sortable: true,
    resizable: true,
    filter: true,
  },
  maintainColumnOrder: true,
  columnDefs: getColumnDefsA(),
}

function setColsA() {
  gridOptions.api!.setColumnDefs(getColumnDefsA())
}

function setColsB() {
  gridOptions.api!.setColumnDefs(getColumnDefsB())
}

function clearColDefs() {
  gridOptions.api!.setColumnDefs([])
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).setColsA = setColsA;
 (<any>window).setColsB = setColsB;
 (<any>window).clearColDefs = clearColDefs;
}