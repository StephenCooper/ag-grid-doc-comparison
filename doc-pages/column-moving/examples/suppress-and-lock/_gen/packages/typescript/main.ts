import { ColDef, Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const columnDefs: ColDef[] = [
  {
    field: "athlete",
    suppressMovable: true,
    width: 150,
    cellClass: "suppress-movable-col",
  },
  { field: "age", lockPosition: true, cellClass: "locked-col" },
  { field: "country", width: 150 },
  { field: "year" },
  { field: "date" },
  { field: "sport" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    width: 150,
    lockPinned: true, // Dont allow pinning for this example
  },
  suppressDragLeaveHidesColumns: true,
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
