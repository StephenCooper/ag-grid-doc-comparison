import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  ModuleRegistry,
  ValueGetterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  SetFilterModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    {
      headerName: 'Year',
      valueGetter: 'data.year',
      rowGroup: true,
      hide: true,
    },

    { field: 'athlete', minWidth: 200 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'total', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 200,
    filterValueGetter: function (params: ValueGetterParams) {
      if (params.node) {
        var colGettingGrouped = params.colDef.showRowGroup + '';
        return params.api.getValue(colGettingGrouped, params.node);
      }
    },
  },
  enableRangeSelection: true,
  groupHideOpenParents: true,
  animateRows: true,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
