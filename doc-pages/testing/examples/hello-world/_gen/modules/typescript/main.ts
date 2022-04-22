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

// specify the columns
const columnDefs: ColDef[] = [
  { headerName: 'Make', field: 'make' },
  { headerName: 'Model', field: 'model' },
  { headerName: 'Price', field: 'price' },
];

// specify the data
var rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxster', price: 72000 },
];

// let the grid know which columns and what data to use
const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  onGridReady: function (params) {
    params.api.sizeColumnsToFit();
  },
};

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
// lookup the container we want the Grid to use
var eGridDiv = document.querySelector<HTMLElement>('#myGrid')!;

// create the grid passing in the div to use together with the columns & data we want to use
new Grid(eGridDiv, gridOptions);
