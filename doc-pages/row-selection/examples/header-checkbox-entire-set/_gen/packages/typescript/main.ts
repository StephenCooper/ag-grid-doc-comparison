import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  HeaderCheckboxSelectionCallbackParams,
} from "ag-grid-community";

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete", minWidth: 180 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  },
  suppressRowClickSelection: true,
  rowSelection: "multiple",
};

function isFirstColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

function onQuickFilterChanged() {
  gridOptions.api!.setQuickFilter(
    (document.getElementById("quickFilter") as HTMLInputElement).value
  );
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onQuickFilterChanged = onQuickFilterChanged;
}
