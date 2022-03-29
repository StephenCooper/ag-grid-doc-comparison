import { Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

// specify the data
var rowData = [
  { orgHierarchy: ["A"] },
  { orgHierarchy: ["A", "B"] },
  { orgHierarchy: ["C", "D"] },
  { orgHierarchy: ["E", "F", "G", "H"] },
];

const gridOptions: GridOptions = {
  columnDefs: [
    // we're using the auto group column by default!
    {
      field: "groupType",
      valueGetter: function (params) {
        return params.data ? "Provided" : "Filler";
      },
    },
  ],
  defaultColDef: {
    flex: 1,
  },
  autoGroupColumnDef: {
    headerName: "Organisation Hierarchy",
    cellRendererParams: {
      suppressCount: true,
    },
  },
  rowData: rowData,
  treeData: true, // enable Tree Data mode
  animateRows: true,
  groupDefaultExpanded: -1, // expand all groups by default
  getDataPath: function (data) {
    return data.orgHierarchy;
  },
};

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
// lookup the container we want the Grid to use
var eGridDiv = document.querySelector<HTMLElement>("#myGrid")!;

// create the grid passing in the div to use together with the columns & data we want to use
new Grid(eGridDiv, gridOptions);
