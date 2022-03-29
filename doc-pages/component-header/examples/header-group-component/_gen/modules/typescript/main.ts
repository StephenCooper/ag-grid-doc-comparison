import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
} from "@ag-grid-community/core";
import { CustomHeaderGroup } from "./customHeaderGroup";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: ColGroupDef[] = [
  {
    headerName: "Athlete Details",
    headerGroupComponent: CustomHeaderGroup,
    children: [
      { field: "athlete", width: 150 },
      { field: "age", width: 90, columnGroupShow: "open" },
      {
        field: "country",
        width: 120,
        columnGroupShow: "open",
      },
    ],
  },
  {
    headerName: "Medal details",
    headerGroupComponent: CustomHeaderGroup,
    children: [
      { field: "year", width: 90 },
      { field: "date", width: 110 },
      {
        field: "sport",
        width: 110,
        columnGroupShow: "open",
      },
      {
        field: "gold",
        width: 100,
        columnGroupShow: "open",
      },
      {
        field: "silver",
        width: 100,
        columnGroupShow: "open",
      },
      {
        field: "bronze",
        width: 100,
        columnGroupShow: "open",
      },
      {
        field: "total",
        width: 100,
        columnGroupShow: "open",
      },
    ],
  },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: null,
  defaultColDef: {
    width: 100,
    resizable: true,
  },
};
// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
