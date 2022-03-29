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
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
  ClipboardModule,
]);

var rowData = [
  { a: 1, b: 1, c: 1, d: 1, e: 1 },
  { a: 2, b: 2, c: 2, d: 2, e: 2 },
];

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "a" },
    { field: "b" },
    { field: "c" },
    { field: "d" },
    { field: "e" },
  ],
  rowData: rowData,
  popupParent: document.querySelector("body")!,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
