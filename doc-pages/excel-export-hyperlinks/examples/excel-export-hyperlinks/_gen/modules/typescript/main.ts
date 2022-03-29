import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ExcelExportParams,
  ExcelStyle,
  Grid,
  GridOptions,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  MenuModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [{ field: "company" }, { field: "url", cellClass: "hyperlinks" }],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  defaultExcelExportParams: {
    autoConvertFormulas: true,
    processCellCallback: (params) => {
      const field = params.column.getColDef().field;
      return field === "url" ? `=HYPERLINK("${params.value}")` : params.value;
    },
  },
  excelStyles: [
    {
      id: "hyperlinks",
      font: {
        underline: "Single",
        color: "#358ccb",
      },
    },
  ],

  rowData: [
    { company: "Google", url: "https://www.google.com" },
    { company: "Adobe", url: "https://www.adobe.com" },
    { company: "The New York Times", url: "https://www.nytimes.com" },
    { company: "Twitter", url: "https://www.twitter.com" },
    { company: "StackOverflow", url: "https://stackoverflow.com/" },
    { company: "Reddit", url: "https://www.reddit.com" },
    { company: "Github", url: "https://www.github.com" },
    { company: "Microsoft", url: "https://www.microsoft.com" },
    { company: "Gizmodo", url: "https://www.gizmodo.com" },
    { company: "LinkedIN", url: "https://www.linkedin.com" },
  ],
};

function onBtExport() {
  gridOptions.api!.exportDataAsExcel();
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtExport = onBtExport;
}
