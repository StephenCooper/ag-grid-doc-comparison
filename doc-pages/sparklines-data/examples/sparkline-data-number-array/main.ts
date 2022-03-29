import {
  AreaSparklineOptions,
  Grid,
  GridOptions,
} from "@ag-grid-community/core";
declare function getStockData(): any[];

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "symbol", maxWidth: 110 },
    { field: "name", minWidth: 250 },
    {
      field: "rateOfChange",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "area",
        } as AreaSparklineOptions,
      },
    },
    { field: "volume", type: "numericColumn", maxWidth: 140 },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  rowData: getStockData(),
  rowHeight: 50,
};

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
  new Grid(gridDiv, gridOptions);
});
