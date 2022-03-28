import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, GetRowIdFunc, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])


var columnDefs: ColDef[] = [
  {headerName: "Row ID", valueGetter: 'node.id'},
  {field: "make"},
  {field: "model"},
  {field: "price"}
];
    
// specify the data
var rowData = [
  {id: 'c1', make: "Toyota", model: "Celica", price: 35000},
  {id: 'c2', make: "Ford", model: "Mondeo", price: 32000},
  {id: 'c8', make: "Porsche", model: "Boxter", price: 72000},
  {id: 'c4', make: "BMW", model: "M50", price: 60000},
  {id: 'c14', make: "Aston Martin", model: "DBX", price: 190000}
];

// let the grid know which columns and what data to use
var gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  getRowId: params => params.data.id
};

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions);
 