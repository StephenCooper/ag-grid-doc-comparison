import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, GetRowIdFunc, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])


var columnDefs: ColDef[] = [
  {field: "make"},
  {field: "model"},
  {field: "price"}
];

// specify the data
var rowDataA = [
  {id: '1', make: "Toyota", model: "Celica", price: 35000},
  {id: '4', make: "BMW", model: "M50", price: 60000},
  {id: '5', make: "Aston Martin", model: "DBX", price: 190000}
];

var rowDataB = [
  {id: '1', make: "Toyota", model: "Celica", price: 35000},
  {id: '2', make: "Ford", model: "Mondeo", price: 32000},
  {id: '3', make: "Porsche", model: "Boxter", price: 72000},
  {id: '4', make: "BMW", model: "M50", price: 60000},
  {id: '5', make: "Aston Martin", model: "DBX", price: 190000}
];

// let the grid know which columns and what data to use
var gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: rowDataA,
  rowSelection: 'single',
  animateRows: true,
  getRowId: params => params.data.id
};

function onRowDataA() {
  gridOptions.api!.setRowData(rowDataA);
}

function onRowDataB() {
  gridOptions.api!.setRowData(rowDataB);
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions);
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onRowDataA = onRowDataA;
 (<any>window).onRowDataB = onRowDataB;
}