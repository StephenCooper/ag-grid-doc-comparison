import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
  RowGroupOpenedEvent,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const columnDefs: ColDef[] = [
  { field: "athlete", width: 150, rowGroupIndex: 0 },
  { field: "age", width: 90, rowGroupIndex: 1 },
  { field: "country", width: 120, rowGroupIndex: 2 },
  { field: "year", width: 90 },
  { field: "date", width: 110, rowGroupIndex: 2 },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: null,
  animateRows: false,
  groupDisplayType: "groupRows",
  onRowGroupOpened: onRowGroupOpened,
  defaultColDef: {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  },
};

function onRowGroupOpened(event: RowGroupOpenedEvent) {
  var rowNodeIndex = event.node.rowIndex!;
  // factor in child nodes so we can scroll to correct position
  var childCount = event.node.childrenAfterSort
    ? event.node.childrenAfterSort.length
    : 0;
  var newIndex = rowNodeIndex + childCount;
  gridOptions.api!.ensureIndexVisible(newIndex);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
