import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from "ag-grid-community";

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
};

function onBtExport() {
  var sports: Record<string, boolean> = {};

  gridOptions.api!.forEachNode(function (node) {
    if (!sports[node.data.sport]) {
      sports[node.data.sport] = true;
    }
  });

  var spreadsheets = [];

  var sportFilterInstance = gridOptions.api!.getFilterInstance("sport")!;

  for (var sport in sports) {
    sportFilterInstance.setModel({ values: [sport] });
    gridOptions.api!.onFilterChanged();

    if (sportFilterInstance.getModel() == null) {
      throw new Error("Example error: Filter not applied");
    }

    const sheet = gridOptions.api!.getSheetDataForExcel({
      sheetName: sport,
    });
    if (sheet) {
      spreadsheets.push(sheet);
    }
  }

  sportFilterInstance.setModel(null);
  gridOptions.api!.onFilterChanged();

  gridOptions.api!.exportMultipleSheetsAsExcel({
    data: spreadsheets,
    fileName: "ag-grid.xlsx",
  });

  spreadsheets = [];
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
