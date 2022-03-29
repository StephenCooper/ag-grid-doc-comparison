import { ColDef, Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const columnDefs: ColDef[] = [
  { field: "athlete", width: 150, suppressSizeToFit: true },
  {
    field: "age",
    headerName: "Age of Athlete",
    width: 90,
    minWidth: 50,
    maxWidth: 150,
  },
  { field: "country", width: 120 },
  { field: "year", width: 90 },
  { field: "date", width: 110 },
  { field: "sport", width: 110 },
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
  onColumnResized: (params) => {
    console.log(params);
  },
};

function sizeToFit() {
  gridOptions.api!.sizeColumnsToFit();
}

function autoSizeAll(skipHeader: boolean) {
  const allColumnIds: string[] = [];
  gridOptions.columnApi!.getAllColumns()!.forEach((column) => {
    allColumnIds.push(column.getId());
  });

  gridOptions.columnApi!.autoSizeColumns(allColumnIds, skipHeader);
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).sizeToFit = sizeToFit;
  (<any>window).autoSizeAll = autoSizeAll;
}
