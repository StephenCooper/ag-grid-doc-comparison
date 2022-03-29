import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  Grid,
  GridOptions,
  HeaderCheckboxSelectionCallbackParams,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

var checkboxSelection = function (params: CheckboxSelectionCallbackParams) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (
  params: HeaderCheckboxSelectionCallbackParams
) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
const columnDefs: ColDef[] = [
  {
    field: "athlete",
    minWidth: 170,
    checkboxSelection: checkboxSelection,
    headerCheckboxSelection: headerCheckboxSelection,
  },
  { field: "age" },
  { field: "country" },
  { field: "year" },
  { field: "date" },
  { field: "sport" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
];

var autoGroupColumnDef: ColDef = {
  headerName: "Group",
  minWidth: 170,
  field: "athlete",
  valueGetter: function (params) {
    if (params.node!.group) {
      return params.node!.key;
    } else {
      return params.data[params.colDef.field!];
    }
  },
  headerCheckboxSelection: true,
  // headerCheckboxSelectionFilteredOnly: true,
  cellRenderer: "agGroupCellRenderer",
  cellRendererParams: {
    checkbox: true,
  },
};

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  },
  suppressRowClickSelection: true,
  groupSelectsChildren: true,
  // debug: true,
  rowSelection: "multiple",
  rowGroupPanelShow: "always",
  pivotPanelShow: "always",
  enableRangeSelection: true,
  columnDefs: columnDefs,
  paginationAutoPageSize: true,
  pagination: true,
  autoGroupColumnDef: autoGroupColumnDef,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
