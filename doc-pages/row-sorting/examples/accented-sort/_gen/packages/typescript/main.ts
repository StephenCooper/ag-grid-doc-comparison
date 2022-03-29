import { ColDef, Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const columnDefs: ColDef[] = [{ field: "accented", width: 150 }];

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
  },
  columnDefs: columnDefs,
  animateRows: true,
  sortingOrder: ["desc", "asc", null],
  accentedSort: true,
  rowData: [{ accented: "aáàä" }, { accented: "aàáä" }, { accented: "aäàá" }],
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
