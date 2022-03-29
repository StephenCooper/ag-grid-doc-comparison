import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  Grid,
  GridOptions,
  ICellRendererParams,
  IsFullWidthRowParams,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { FullWidthCellRenderer } from "./fullWidthCellRenderer";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "name", cellRenderer: countryCellRenderer },
    { field: "continent" },
    { field: "language" },
  ],
  defaultColDef: {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
  },
  rowData: getData(),
  rowDragManaged: true,
  getRowHeight: function (params) {
    // return 100px height for full width rows
    if (isFullWidth(params.data)) {
      return 100;
    }
  },
  isFullWidthRow: function (params: IsFullWidthRowParams) {
    return isFullWidth(params.rowNode.data);
  },
  // see AG Grid docs cellRenderer for details on how to build cellRenderers
  fullWidthCellRenderer: FullWidthCellRenderer,
  animateRows: true,
};

function countryCellRenderer(params: ICellRendererParams) {
  if (!params.fullWidth) {
    return params.value;
  }
  var flag =
    '<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/flags/' +
    params.data.code +
    '.png">';
  return (
    '<span style="cursor: default;">' + flag + " " + params.value + "</span>"
  );
}

function isFullWidth(data: any) {
  // return true when country is Peru, France or Italy
  return ["Peru", "France", "Italy"].indexOf(data.name) >= 0;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
