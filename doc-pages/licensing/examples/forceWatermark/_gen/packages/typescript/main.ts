import { Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const gridOptions: GridOptions = {
  // define grid columns
  columnDefs: [
    // using default ColDef
    { headerName: "Athlete", field: "athlete" },
    { headerName: "Sport", field: "sport" },

    // using number column type
    { headerName: "Age", field: "age", type: "numberColumn" },
    { headerName: "Year", field: "year", type: "numberColumn" },

    // using date and non-editable column types
    { headerName: "Date", field: "date", width: 200 },
  ],

  defaultColDef: {
    width: 150,
  },

  // default ColGroupDef, get applied to every column group
  defaultColGroupDef: {
    marryChildren: true,
  },

  columnTypes: {
    numberColumn: { width: 83 },
  },

  rowData: null,

  onGridReady: function (params) {
    params.api.sizeColumnsToFit();
  },
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
