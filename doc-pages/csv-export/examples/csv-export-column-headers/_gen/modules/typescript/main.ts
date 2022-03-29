import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  Grid,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { MenuModule } from "@ag-grid-enterprise/menu";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  MenuModule,
]);

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },

  suppressExcelExport: true,
  popupParent: document.body,

  columnDefs: [
    { headerName: "Brand", children: [{ field: "make" }, { field: "model" }] },
    {
      headerName: "Value",
      children: [{ field: "price" }],
    },
  ],

  rowData: [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ],

  onGridReady: function (params: GridReadyEvent) {
    (document.getElementById("columnGroups") as HTMLInputElement).checked =
      true;
  },
};

function getBoolean(id: string) {
  var field = document.querySelector("#" + id) as HTMLInputElement;

  return !!field.checked;
}

function getParams() {
  return {
    skipColumnGroupHeaders: getBoolean("columnGroups"),
    skipColumnHeaders: getBoolean("skipHeader"),
  };
}

function onBtnExport() {
  gridOptions.api!.exportDataAsCsv(getParams());
}

function onBtnUpdate() {
  (document.querySelector("#csvResult") as any).value =
    gridOptions.api!.getDataAsCsv(getParams());
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtnExport = onBtnExport;
  (<any>window).onBtnUpdate = onBtnUpdate;
}
