import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from "ag-grid-community";
import { MedalCellRenderer } from "./medalCellRenderer";
import { TotalValueRenderer } from "./totalValueRenderer";

const columnDefs: ColDef[] = [
  { field: "athlete" },
  { field: "year" },
  { field: "gold", cellRenderer: MedalCellRenderer },
  { field: "silver", cellRenderer: MedalCellRenderer },
  { field: "bronze", cellRenderer: MedalCellRenderer },
  { field: "total", minWidth: 175, cellRenderer: TotalValueRenderer },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => {
    gridOptions.api!.setRowData(data);
  });
