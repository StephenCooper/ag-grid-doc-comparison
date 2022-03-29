import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Grid, GridOptions, ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "country", rowGroup: true },
    { field: "year", rowGroup: true },
    { field: "sport" },
    { field: "athlete" },
    { field: "total" },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 200,
  },
  animateRows: true,
  isGroupOpenByDefault: (params) => {
    return (
      (params.field === "year" && params.key === "2004") ||
      (params.field === "country" && params.key === "United States")
    );
  },
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
