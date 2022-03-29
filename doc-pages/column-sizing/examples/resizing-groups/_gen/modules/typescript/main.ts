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

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: ColGroupDef[] = [
  {
    headerName: "Everything Resizes",
    children: [
      {
        field: "athlete",
        headerClass: "resizable-header",
      },
      { field: "age", headerClass: "resizable-header" },
      {
        field: "country",
        headerClass: "resizable-header",
      },
    ],
  },
  {
    headerName: "Only Year Resizes",
    children: [
      { field: "year", headerClass: "resizable-header" },
      {
        field: "date",
        resizable: false,
        headerClass: "fixed-size-header",
      },
      {
        field: "sport",
        resizable: false,
        headerClass: "fixed-size-header",
      },
    ],
  },
  {
    headerName: "Nothing Resizes",
    children: [
      {
        field: "gold",
        resizable: false,
        headerClass: "fixed-size-header",
      },
      {
        field: "silver",
        resizable: false,
        headerClass: "fixed-size-header",
      },
      {
        field: "bronze",
        resizable: false,
        headerClass: "fixed-size-header",
      },
      {
        field: "total",
        resizable: false,
        headerClass: "fixed-size-header",
      },
    ],
  },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 150,
    resizable: true,
  },
  columnDefs: columnDefs,
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

// do http request to get our sample data - not using any framework to keep the example self contained.
// you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
