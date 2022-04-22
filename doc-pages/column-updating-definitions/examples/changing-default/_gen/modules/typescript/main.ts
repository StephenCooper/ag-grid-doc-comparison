import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function getColumnDefs(): ColDef[] {
  return [
    { field: 'athlete', initialWidth: 100, initialSort: 'asc' },
    { field: 'age' },
    { field: 'country', initialPinned: 'left' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
}

const gridOptions: GridOptions = {
  defaultColDef: {
    initialWidth: 100,
    sortable: true,
    resizable: true,
  },
  columnDefs: getColumnDefs(),
};

function onBtWithDefault() {
  gridOptions.api!.setColumnDefs(getColumnDefs());
}

function onBtRemove() {
  gridOptions.api!.setColumnDefs([]);
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtWithDefault = onBtWithDefault;
  (<any>window).onBtRemove = onBtRemove;
}
