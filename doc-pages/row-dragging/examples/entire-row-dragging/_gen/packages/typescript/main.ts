import { Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete" },
    { field: "country" },
    { field: "year", width: 100 },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ],

  defaultColDef: {
    width: 170,
    sortable: true,
    filter: true,
  },
  rowDragManaged: true,
  rowDragEntireRow: true,
  rowDragMultiRow: true,
  rowSelection: "multiple",
  animateRows: true,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
