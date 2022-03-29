import { Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "assignee", rowGroup: true, hide: true },
    { field: "priority", rowGroup: true, hide: true },
    { field: "task" },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 200,
  },
  groupDisplayType: "multipleColumns",
  groupMaintainOrder: true,
  groupDefaultExpanded: -1,
  animateRows: true,
  rowData: getData(),
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
