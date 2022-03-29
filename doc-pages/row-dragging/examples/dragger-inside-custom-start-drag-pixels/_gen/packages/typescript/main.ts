import {
  ColDef,
  Grid,
  GridOptions,
  RowDragEndEvent,
  RowDragEnterEvent,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { CustomCellRenderer } from "./customCellRenderer";

const columnDefs: ColDef[] = [
  {
    field: "athlete",
    cellClass: "custom-athlete-cell",
    cellRenderer: CustomCellRenderer,
  },
  { field: "country" },
  { field: "year", width: 100 },
  { field: "date" },
  { field: "sport" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 170,
    sortable: true,
    filter: true,
  },
  rowDragManaged: true,
  columnDefs: columnDefs,
  animateRows: true,
  onRowDragEnter: onRowDragEnter,
  onRowDragEnd: onRowDragEnd,
};

function onRowDragEnter(e: RowDragEnterEvent) {
  console.log("onRowDragEnter", e);
}

function onRowDragEnd(e: RowDragEndEvent) {
  console.log("onRowDragEnd", e);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
