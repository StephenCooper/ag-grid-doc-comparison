import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Grid, GridOptions, ModuleRegistry } from '@ag-grid-community/core';
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
    { field: 'assignee', rowGroup: true, hide: true },
    { field: 'priority', rowGroup: true, hide: true },
    { field: 'task' },
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
  groupDisplayType: 'multipleColumns',
  groupMaintainOrder: true,
  groupDefaultExpanded: -1,
  animateRows: true,
  rowData: getData(),
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
