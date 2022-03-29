import {
  Grid,
  GridOptions,
  KeyCreatorParams,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

var valueGetter = function (params: ValueGetterParams) {
  return params.data["animalsString"].split("|");
};

var valueFormatter = function (params: ValueFormatterParams) {
  return params.value
    .map(function (animal: any) {
      return animal.name;
    })
    .join(", ");
};

var keyCreator = function (params: KeyCreatorParams) {
  return params.value.map(function (animal: any) {
    return animal.name;
  });
};

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: "Animals (array)",
      field: "animalsArray",
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Animals (string)",
      filter: "agSetColumnFilter",
      valueGetter: valueGetter,
    },
    {
      headerName: "Animals (objects)",
      field: "animalsObjects",
      filter: "agSetColumnFilter",
      valueFormatter: valueFormatter,
      keyCreator: keyCreator,
    },
  ],
  defaultColDef: {
    flex: 1,
  },
  rowData: getData(),
  sideBar: "filters",
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
