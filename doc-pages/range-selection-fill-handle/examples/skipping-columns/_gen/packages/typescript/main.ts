import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  FillOperationParams,
  Grid,
  GridOptions,
} from "ag-grid-community";

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete", minWidth: 150 },
    { field: "age", maxWidth: 90 },
    { field: "country", minWidth: 150 },
    { field: "year", maxWidth: 90 },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    editable: true,
  },
  enableRangeSelection: true,
  enableFillHandle: true,
  suppressClearOnFillReduction: true,
  fillOperation: function (params) {
    if (params.column.getColId() === "country") {
      return params.currentCellValue;
    }

    return params.values[params.values.length - 1];
  },
};

function createRowData(data: any[]) {
  var rowData = data.slice(0, 100);
  return rowData;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then(function (data) {
    gridOptions.api!.setRowData(createRowData(data));
  });
