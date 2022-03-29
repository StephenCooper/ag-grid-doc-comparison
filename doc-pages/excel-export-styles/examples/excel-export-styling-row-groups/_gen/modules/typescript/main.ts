import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  CellClassParams,
  Grid,
  GridOptions,
  ModuleRegistry,
  ProcessRowGroupForExportParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
  RowGroupingModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "country", minWidth: 120, rowGroup: true },
    { field: "year", rowGroup: true },
    { headerName: "Name", field: "athlete", minWidth: 150 },
    {
      headerName: "Name Length",
      valueGetter: 'data ? data.athlete.length : ""',
    },
    { field: "sport", minWidth: 120, rowGroup: true },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ],

  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },

  autoGroupColumnDef: {
    cellClass: getIndentClass,
    minWidth: 250,
    flex: 1,
  },

  excelStyles: [
    {
      id: "indent-1",
      alignment: {
        indent: 1,
      },
      // note, dataType: 'string' required to ensure that numeric values aren't right-aligned
      dataType: "String",
    },
    {
      id: "indent-2",
      alignment: {
        indent: 2,
      },
      dataType: "String",
    },
    {
      id: "indent-3",
      alignment: {
        indent: 3,
      },
      dataType: "String",
    },
  ],
};

function rowGroupCallback(params: ProcessRowGroupForExportParams) {
  return params.node.key!;
}

function getIndentClass(params: CellClassParams) {
  var indent = 0;
  var node = params.node;

  while (node && node.parent) {
    indent++;
    node = node.parent;
  }
  return "indent-" + indent;
}

function onBtnExportDataAsExcel() {
  gridOptions.api!.exportDataAsExcel({
    processRowGroupCallback: rowGroupCallback,
  });
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then(function (data) {
    gridOptions.api!.setRowData(data);
    gridOptions.api!.forEachNode(function (node) {
      node.expanded = true;
    });
    gridOptions.api!.onGroupExpandedOrCollapsed();
  });

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtnExportDataAsExcel = onBtnExportDataAsExcel;
}
