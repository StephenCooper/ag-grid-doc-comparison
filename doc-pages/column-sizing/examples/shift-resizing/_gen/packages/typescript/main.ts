import { ColDef, Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const columnDefs: ColDef[] = [
  { field: "athlete", width: 150 },
  { field: "age", width: 90 },
  { field: "country", width: 150 },
  { field: "year", width: 90 },
  { field: "date", width: 110 },
  { field: "sport", width: 150 },
  { field: "gold", width: 100 },
  { field: "silver", width: 100 },
  { field: "bronze", width: 100 },
  { field: "total", width: 100 },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: null,
  colResizeDefault: "shift",
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
