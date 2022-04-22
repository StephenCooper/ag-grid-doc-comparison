import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

const columnDefs: ColDef[] = [
  // row group columns
  { field: 'country', rowGroup: true },
  { field: 'athlete', rowGroup: true },

  // pivot column
  {
    headerName: 'Year',
    // to mix it up a bit, here we are using a valueGetter for the year column.
    valueGetter: 'data.year',
    pivot: true,
  },

  // aggregation columns
  { field: 'gold', aggFunc: 'sum' },
  { field: 'silver', aggFunc: 'sum' },
  { field: 'bronze', aggFunc: 'sum' },
  { field: 'total', aggFunc: 'sum' },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    filter: true,
    resizable: true,
    sortable: true,
  },
  autoGroupColumnDef: {
    minWidth: 250,
  },
  pivotMode: true,
  groupDefaultExpanded: 9,
  groupHideOpenParents: true,
  groupDisplayType: 'multipleColumns',
  animateRows: true,
  sideBar: true,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

// do http request to get our sample data - not using any framework to keep the example self contained.
// you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then(function (data) {
    gridOptions.api!.setRowData(data);
  });
