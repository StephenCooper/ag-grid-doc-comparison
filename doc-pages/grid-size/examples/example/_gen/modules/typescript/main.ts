import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete", minWidth: 150 },
    { field: "age", minWidth: 70, maxWidth: 90 },
    { field: "country", minWidth: 130 },
    { field: "year", minWidth: 70, maxWidth: 90 },
    { field: "date", minWidth: 120 },
    { field: "sport", minWidth: 120 },
    { field: "gold", minWidth: 80 },
    { field: "silver", minWidth: 80 },
    { field: "bronze", minWidth: 80 },
    { field: "total", minWidth: 80 },
  ],

  defaultColDef: {
    resizable: true,
  },

  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.sizeColumnsToFit();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
