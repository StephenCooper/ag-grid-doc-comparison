import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
]);

const columnDefs: ColDef[] = [
  { field: "athlete", minWidth: 200 },
  { field: "age" },
  { field: "country", minWidth: 200 },
  { field: "year" },
  { field: "date", minWidth: 150 },
  { field: "sport", minWidth: 150 },
  { field: "gold" },
  { field: "silver" },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },

  columnDefs: columnDefs,
  rowSelection: "multiple",
};

function onBtExport() {
  var spreadsheets: string[] = [];

  gridOptions.api!.forEachNode((node, index) => {
    if (index % 100 === 0) {
      gridOptions.api!.deselectAll();
    }

    node.setSelected(true);

    if (index % 100 === 99) {
      spreadsheets.push(
        gridOptions.api!.getSheetDataForExcel({
          onlySelected: true,
        })!
      );
    }
  });

  // check if the last page was exported

  if (gridOptions.api!.getSelectedNodes().length) {
    spreadsheets.push(
      gridOptions.api!.getSheetDataForExcel({
        onlySelected: true,
      })!
    );
    gridOptions.api!.deselectAll();
  }

  gridOptions.api!.exportMultipleSheetsAsExcel({
    data: spreadsheets,
  });
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtExport = onBtExport;
}
