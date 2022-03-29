import { Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const gridOptions: GridOptions = {
  columnDefs: [
    // one column for showing the groups
    {
      headerName: "Group",
      cellRenderer: "agGroupCellRenderer",
      showRowGroup: true,
      minWidth: 210,
    },

    // the first group column
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },

    { field: "athlete", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ],
  defaultColDef: {
    flex: 1,
    sortable: true,
    resizable: true,
  },
  groupDisplayType: "custom",
  enableRangeSelection: true,
  animateRows: true,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
