import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ExcelExportParams,
  Grid,
  GridOptions,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  ExcelExportModule,
  MenuModule,
]);

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: "Athlete Details",
    children: [
      {
        field: "athlete",
        width: 180,
        filter: "agTextColumnFilter",
      },
      {
        field: "age",
        width: 90,
        filter: "agNumberColumnFilter",
      },
      { headerName: "Country", field: "country", width: 140 },
    ],
  },
  {
    headerName: "Sports Results",
    children: [
      { field: "sport", width: 140 },
      {
        columnGroupShow: "closed",
        field: "total",
        width: 100,
        filter: "agNumberColumnFilter",
      },
      {
        columnGroupShow: "open",
        field: "gold",
        width: 100,
        filter: "agNumberColumnFilter",
      },
      {
        columnGroupShow: "open",
        field: "silver",
        width: 100,
        filter: "agNumberColumnFilter",
      },
      {
        columnGroupShow: "open",
        field: "bronze",
        width: 100,
        filter: "agNumberColumnFilter",
      },
    ],
  },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    filter: true,
  },
  // debug: true,
  columnDefs: columnDefs,
  rowData: null,
  defaultExcelExportParams: {
    allColumns: true,
  },
};

function onBtExport() {
  gridOptions.api!.exportDataAsExcel();
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtExport = onBtExport;
}
