import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);
declare var window: any;
const columnDefs: ColGroupDef[] = [
  {
    headerName: "Athlete",
    children: [
      { field: "athlete" },
      { field: "country", columnGroupShow: "open" },
      { field: "sport", columnGroupShow: "open" },
      { field: "year", columnGroupShow: "open" },
      { field: "date", columnGroupShow: "open" },
    ],
  },
  {
    headerName: "Medals",
    children: [
      { field: "total", columnGroupShow: "closed" },
      { field: "gold", columnGroupShow: "open" },
      { field: "silver", columnGroupShow: "open" },
      { field: "bronze", columnGroupShow: "open" },
    ],
  },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 150,
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: null,
};

function saveState() {
  window.groupState = gridOptions.columnApi!.getColumnGroupState();
  console.log("group state saved", window.groupState);
  console.log("column state saved");
}

function restoreState() {
  if (!window.groupState) {
    console.log("no columns state to restore by, you must save state first");
    return;
  }
  gridOptions.columnApi!.setColumnGroupState(window.groupState);
  console.log("column state restored");
}

function resetState() {
  gridOptions.columnApi!.resetColumnGroupState();
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
