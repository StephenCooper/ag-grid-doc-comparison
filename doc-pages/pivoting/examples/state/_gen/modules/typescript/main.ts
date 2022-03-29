import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColumnState,
  Grid,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
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
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete", enableRowGroup: true, enablePivot: true },
    { field: "age", enableValue: true },
    {
      field: "country",
      enableRowGroup: true,
      enablePivot: true,
      rowGroup: true,
    },
    { field: "year", enableRowGroup: true, enablePivot: true },
    { field: "date", enableRowGroup: true, enablePivot: true },
    { field: "sport", enableRowGroup: true, enablePivot: true, pivot: true },
    { field: "gold", enableValue: true, aggFunc: "sum" },
    { field: "silver", enableValue: true, aggFunc: "sum" },
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
    minWidth: 300,
  },
  sideBar: true,
  pivotMode: true,
};

var savedState: ColumnState[];
var savedPivotMode: boolean;

function printState() {
  var state = gridOptions.columnApi!.getColumnState();
  console.log(state);
}

function saveState() {
  savedState = gridOptions.columnApi!.getColumnState();
  savedPivotMode = gridOptions.columnApi!.isPivotMode();
  console.log("column state saved");
}

function restoreState() {
  if (savedState) {
    // Pivot mode must be set first otherwise the columns we're trying to set state for won't exist yet
    gridOptions.columnApi!.setPivotMode(savedPivotMode);
    gridOptions.columnApi!.applyColumnState({
      state: savedState,
      applyOrder: true,
    });
    console.log("column state restored");
  } else {
    console.log("no previous column state to restore!");
  }
}

function togglePivotMode() {
  var pivotMode = gridOptions.columnApi!.isPivotMode();
  gridOptions.columnApi!.setPivotMode(!pivotMode);
}

function resetState() {
  gridOptions.columnApi!.resetColumnState();
  gridOptions.columnApi!.setPivotMode(false);
  console.log("column state reset");
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).printState = printState;
  (<any>window).saveState = saveState;
  (<any>window).restoreState = restoreState;
  (<any>window).togglePivotMode = togglePivotMode;
  (<any>window).resetState = resetState;
}
