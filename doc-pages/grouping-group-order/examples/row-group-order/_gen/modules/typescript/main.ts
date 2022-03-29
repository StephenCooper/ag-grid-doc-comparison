import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Grid, GridOptions, ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "country", rowGroupIndex: 1, hide: true },
    { field: "year", rowGroupIndex: 0, hide: true },
    { field: "sport" },
    { field: "athlete" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 250,
  },
  // optional as 'singleColumn' is the default group display type
  groupDisplayType: "singleColumn",
  animateRows: true,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
