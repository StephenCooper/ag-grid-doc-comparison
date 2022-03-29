import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  SideBarDef,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);
declare var window: any;
const columnDefs: ColDef[] = [
  { field: "athlete" },
  { field: "age" },
  { field: "country" },
  { field: "sport" },
  { field: "year" },
  { field: "date" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    width: 100,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
  },
  sideBar: {
    toolPanels: ["columns"],
  },
  rowGroupPanelShow: "always",
  pivotPanelShow: "always",
  // debug: true,
  columnDefs: columnDefs,
  rowData: null,
};

function saveState() {
  window.colState = gridOptions.columnApi!.getColumnState();
  console.log("column state saved");
}

function restoreState() {
  if (!window.colState) {
    console.log("no columns state to restore by, you must save state first");
    return;
  }
  gridOptions.columnApi!.applyColumnState({
    state: window.colState,
    applyOrder: true,
  });
  console.log("column state restored");
}

function resetState() {
  gridOptions.columnApi!.resetColumnState();
  console.log("column state reset");
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).saveState = saveState;
  (<any>window).restoreState = restoreState;
  (<any>window).resetState = resetState;
}
