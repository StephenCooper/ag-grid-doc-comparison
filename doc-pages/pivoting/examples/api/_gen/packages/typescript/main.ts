import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  SideBarDef,
} from "ag-grid-community";

const gridOptions: GridOptions = {
  columnDefs: [
    {
      field: "athlete",
      enableRowGroup: true,
      enablePivot: true,
      minWidth: 200,
    },
    { field: "age", enableValue: true },
    { field: "country", enableRowGroup: true, enablePivot: true },
    { field: "year", enableRowGroup: true, enablePivot: true },
    { field: "date", enableRowGroup: true, enablePivot: true },
    { field: "sport", enableRowGroup: true, enablePivot: true, minWidth: 200 },
    { field: "gold", enableValue: true, aggFunc: "sum" },
    { field: "silver", enableValue: true },
    { field: "bronze", enableValue: true },
    { field: "total", enableValue: true },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 250,
  },
  sideBar: true,
};

function turnOffPivotMode() {
  gridOptions.columnApi!.setPivotMode(false);
}

function turnOnPivotMode() {
  gridOptions.columnApi!.setPivotMode(true);
}

function addPivotColumn() {
  gridOptions.columnApi!.applyColumnState({
    state: [{ colId: "country", pivot: true }],
    defaultState: { pivot: false },
  });
}

function addPivotColumns() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: "year", pivot: true },
      { colId: "country", pivot: true },
    ],
    defaultState: { pivot: false },
  });
}

function removePivotColumn() {
  gridOptions.columnApi!.applyColumnState({
    state: [{ colId: "country", pivot: false }],
  });
}

function emptyPivotColumns() {
  gridOptions.columnApi!.applyColumnState({
    defaultState: { pivot: false },
  });
}

function exportToCsv() {
  gridOptions.api!.exportDataAsCsv();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).turnOffPivotMode = turnOffPivotMode;
  (<any>window).turnOnPivotMode = turnOnPivotMode;
  (<any>window).addPivotColumn = addPivotColumn;
  (<any>window).addPivotColumns = addPivotColumns;
  (<any>window).removePivotColumn = removePivotColumn;
  (<any>window).emptyPivotColumns = emptyPivotColumns;
  (<any>window).exportToCsv = exportToCsv;
}
