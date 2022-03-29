import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

var columnDefs: ColDef[] = [
  { field: "make" },
  { field: "model" },
  { field: "price" },
];

// specify the data
var rowDataA = [
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Aston Martin", model: "DBX", price: 190000 },
];

var rowDataB = [
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "BMW", model: "M50", price: 60000 },
  { make: "Aston Martin", model: "DBX", price: 190000 },
];

// let the grid know which columns and what data to use
var gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: rowDataA,
  rowSelection: "single",
  animateRows: true,
};

function onRowDataA() {
  gridOptions.api!.setRowData(rowDataA);
}

function onRowDataB() {
  gridOptions.api!.setRowData(rowDataB);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onRowDataA = onRowDataA;
  (<any>window).onRowDataB = onRowDataB;
}
