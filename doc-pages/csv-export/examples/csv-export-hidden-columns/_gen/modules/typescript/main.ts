import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Grid, GridOptions, ModuleRegistry } from "@ag-grid-community/core";
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
    { field: "athlete" },
    { field: "country" },
    { field: "sport" },
    { field: "gold", hide: true },
    { field: "silver", hide: true },
    { field: "bronze", hide: true },
    { field: "total" },
  ],

  rowData: getData(),
};

function getBoolean(id: string) {
  var field: any = document.querySelector("#" + id);

  return !!field.checked;
}

function getParams() {
  return {
    allColumns: getBoolean("allColumns"),
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
