import { ColDef, Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// specify the columns
const columnDefs: ColDef[] = [
  { field: 'make' },
  { field: 'model' },
  { field: 'price' },
];

// specify the data
var rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxster', price: 72000 },
];

// let the grid know which columns and what data to use
const gridOptions: GridOptions = {
  alwaysShowHorizontalScroll: true,
  alwaysShowVerticalScroll: true,
  columnDefs: columnDefs,
  rowData: rowData,
  onGridReady: (params) => {
    params.api.sizeColumnsToFit();
  },
  defaultColDef: {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  },
};

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
// lookup the container we want the Grid to use
var eGridDiv = document.querySelector<HTMLElement>('#myGrid')!;

// create the grid passing in the div to use together with the columns & data we want to use
new Grid(eGridDiv, gridOptions);
