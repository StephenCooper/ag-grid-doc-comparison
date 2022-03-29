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

const columnDefsMedalsIncluded: ColDef[] = [
  { field: "athlete" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
  { field: "age" },
  { field: "country" },
  { field: "sport" },
  { field: "year" },
  { field: "date" },
];

const colDefsMedalsExcluded: ColDef[] = [
  { field: "athlete" },
  { field: "age" },
  { field: "country" },
  { field: "sport" },
  { field: "year" },
  { field: "date" },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefsMedalsIncluded,
  defaultColDef: {
    initialWidth: 100,
    sortable: true,
    resizable: true,
  },
};

function onBtExcludeMedalColumns() {
  gridOptions.api!.setColumnDefs(colDefsMedalsExcluded);
}

function onBtIncludeMedalColumns() {
  gridOptions.api!.setColumnDefs(columnDefsMedalsIncluded);
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtExcludeMedalColumns = onBtExcludeMedalColumns;
  (<any>window).onBtIncludeMedalColumns = onBtIncludeMedalColumns;
}
