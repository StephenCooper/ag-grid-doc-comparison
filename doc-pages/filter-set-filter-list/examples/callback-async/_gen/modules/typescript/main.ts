import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  ModuleRegistry,
  SetFilterValuesFuncParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

var filterParams = {
  values: function (params: SetFilterValuesFuncParams) {
    setTimeout(function () {
      params.success(['value 1', 'value 2']);
    }, 3000);
  },
};

const gridOptions: GridOptions = {
  rowData: [
    { value: 'value 1' },
    { value: 'value 1' },
    { value: 'value 1' },
    { value: 'value 1' },
    { value: 'value 2' },
    { value: 'value 2' },
    { value: 'value 2' },
    { value: 'value 2' },
    { value: 'value 2' },
  ],
  columnDefs: [
    {
      headerName: 'Set filter column',
      field: 'value',
      flex: 1,
      filter: 'agSetColumnFilter',
      floatingFilter: true,
      filterParams: filterParams,
    },
  ],
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
