import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Grid, GridOptions, ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  SetFilterModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete" },
    { field: "country", rowGroup: true },
    { field: "city", rowGroup: true },
    { field: "year" },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    resizable: true,
  },
  autoGroupColumnDef: {
    headerName: "Group",
    field: "athlete",
    minWidth: 220,
    cellRenderer: "agGroupCellRenderer",
  },
  rowData: getData(),

  // optional as 'singleColumn' is the default group display type
  groupDisplayType: "singleColumn",

  // set this to true to remove single children
  groupRemoveSingleChildren: false,

  // set this to true to remove leaf level single children
  groupRemoveLowestSingleChildren: false,

  // expand everything by default
  groupDefaultExpanded: -1,

  suppressAggFuncInHeader: true,
  animateRows: true,
};

function changeSelection(type: string) {
  // normal, single or lowest
  if (type === "normal") {
    gridOptions.api!.setGroupRemoveSingleChildren(false);
    gridOptions.api!.setGroupRemoveLowestSingleChildren(false);
  } else if (type === "single") {
    gridOptions.api!.setGroupRemoveSingleChildren(true);
    gridOptions.api!.setGroupRemoveLowestSingleChildren(false);
  } else if (type === "lowest") {
    gridOptions.api!.setGroupRemoveLowestSingleChildren(true);
    gridOptions.api!.setGroupRemoveSingleChildren(false);
  } else {
    console.log("unknown type: " + type);
  }
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).changeSelection = changeSelection;
}
