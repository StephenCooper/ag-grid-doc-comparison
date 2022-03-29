import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from "ag-grid-community";

const columnDefs: ColDef[] = [
  { field: "country", rowGroup: true, hide: true },
  { field: "year", filter: "agNumberColumnFilter" },
  { field: "gold", aggFunc: "sum" },
  { field: "silver", aggFunc: "sum" },
  { field: "bronze", aggFunc: "sum" },
  { field: "total", aggFunc: "sum" },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    resizable: true,
  },
  autoGroupColumnDef: {
    headerName: "Country",
    field: "athlete",
  },
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
