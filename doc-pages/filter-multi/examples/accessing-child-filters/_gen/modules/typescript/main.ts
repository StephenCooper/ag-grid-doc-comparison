import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  IMultiFilter,
  ISetFilter,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MultiFilterModule,
  SetFilterModule,
  MenuModule,
  ClipboardModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    {
      field: "athlete",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agTextColumnFilter",
            filterParams: {
              buttons: ["apply", "clear"],
            },
          },
          {
            filter: "agSetColumnFilter",
          },
        ],
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
    menuTabs: ["filterMenuTab"],
  },
};

function getTextModel() {
  var textFilter = (
    gridOptions.api!.getFilterInstance("athlete") as IMultiFilter
  ).getChildFilterInstance(0)!;
  console.log("Current Text Filter model: ", textFilter.getModel());
}

function getSetMiniFilter() {
  var setFilter = (
    gridOptions.api!.getFilterInstance("athlete") as IMultiFilter
  ).getChildFilterInstance(1) as ISetFilter;
  console.log("Current Set Filter search text: ", setFilter.getMiniFilter());
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).getTextModel = getTextModel;
  (<any>window).getSetMiniFilter = getSetMiniFilter;
}
