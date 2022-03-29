import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from "ag-grid-community";

const columnDefs: ColDef[] = [
  { field: "athlete", sortingOrder: ["asc", "desc"] },
  { field: "age", width: 90, sortingOrder: ["desc", "asc"] },
  { field: "country", sortingOrder: ["desc", null] },
  { field: "year", width: 90, sortingOrder: ["asc"] },
  { field: "date" },
  { field: "sport" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 170,
    sortable: true,
  },
  columnDefs: columnDefs,
  rowData: null,
  animateRows: true,
  sortingOrder: ["desc", "asc", null],
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
