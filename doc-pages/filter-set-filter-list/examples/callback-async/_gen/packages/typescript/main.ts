import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  SetFilterValuesFuncParams,
} from "ag-grid-community";

var filterParams = {
  values: function (params: SetFilterValuesFuncParams) {
    setTimeout(function () {
      params.success(["value 1", "value 2"]);
    }, 3000);
  },
};

const gridOptions: GridOptions = {
  rowData: [
    { value: "value 1" },
    { value: "value 1" },
    { value: "value 1" },
    { value: "value 1" },
    { value: "value 2" },
    { value: "value 2" },
    { value: "value 2" },
    { value: "value 2" },
    { value: "value 2" },
  ],
  columnDefs: [
    {
      headerName: "Set filter column",
      field: "value",
      flex: 1,
      filter: "agSetColumnFilter",
      floatingFilter: true,
      filterParams: filterParams,
    },
  ],
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
