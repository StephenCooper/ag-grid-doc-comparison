import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Column, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],
  defaultColDef: {
    width: 150,
  },
  suppressDragLeaveHidesColumns: true,
}

function onMedalsFirst() {
  gridOptions.columnApi!.moveColumns(['gold', 'silver', 'bronze', 'total'], 0)
}

function onMedalsLast() {
  gridOptions.columnApi!.moveColumns(['gold', 'silver', 'bronze', 'total'], 6)
}

function onCountryFirst() {
  gridOptions.columnApi!.moveColumn('country', 0)
}

function onSwapFirstTwo() {
  gridOptions.columnApi!.moveColumnByIndex(0, 1)
}

function onPrintColumns() {
  const cols = gridOptions.columnApi!.getAllGridColumns()
  const colToNameFunc = (col: Column, index: number) => index + ' = ' + col.getId()
  const colNames = cols.map(colToNameFunc).join(', ')
  console.log('columns are: ' + colNames)
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onMedalsFirst = onMedalsFirst;
 (<any>window).onMedalsLast = onMedalsLast;
 (<any>window).onCountryFirst = onCountryFirst;
 (<any>window).onSwapFirstTwo = onSwapFirstTwo;
 (<any>window).onPrintColumns = onPrintColumns;
}