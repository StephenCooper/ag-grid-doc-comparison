import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: ColDef[] = [
  {
    field: "athlete",
    width: 150,
    suppressSizeToFit: true,
  },
  { field: "age", width: 90, minWidth: 50, maxWidth: 100 },
  { field: "country", width: 120 },
  { field: "year", width: 90 },
  { field: "date", width: 110 },
  { field: "sport", width: 110 },
  { field: "gold", width: 100 },
  { field: "silver", width: 100 },
  { field: "bronze", width: 100 },
  { field: "total", width: 100 },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: null,
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.sizeColumnsToFit();
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
