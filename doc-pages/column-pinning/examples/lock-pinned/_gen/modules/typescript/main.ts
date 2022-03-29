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

const columnDefs: ColDef[] = [
  {
    headerName: "Athlete (locked as pinned)",
    field: "athlete",
    width: 240,
    pinned: "left",
    lockPinned: true,
    cellClass: "lock-pinned",
  },
  {
    headerName: "Age (locked as not pinnable)",
    field: "age",
    width: 260,
    lockPinned: true,
    cellClass: "lock-pinned",
  },
  { field: "country", width: 150 },
  { field: "year", width: 90 },
  { field: "date", width: 150 },
  { field: "sport", width: 150 },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    resizable: true,
  },
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
