import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Grid, GridOptions, ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  SetFilterModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  CsvExportModule,
]);

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
