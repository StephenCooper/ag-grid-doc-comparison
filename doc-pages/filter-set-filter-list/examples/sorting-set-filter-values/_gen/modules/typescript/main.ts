import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  IFiltersToolPanel,
  ModuleRegistry,
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
  comparator: function (a: string, b: string) {
    var valA = parseInt(a);
    var valB = parseInt(b);
    if (valA === valB) return 0;
    return valA > valB ? 1 : -1;
  },
};

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: 'Age (No Comparator)',
      field: 'age',
      filter: 'agSetColumnFilter',
    },
    {
      headerName: 'Age (With Comparator)',
      field: 'age',
      filter: 'agSetColumnFilter',
      filterParams: filterParams,
    },
  ],
  defaultColDef: {
    flex: 1,
    filter: true,
    resizable: true,
  },
  rowData: getRowData(),
  sideBar: 'filters',
  onGridReady: function (params) {
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  },
};

function getRowData() {
  var rows = [];
  for (var i = 1; i < 117; i++) {
    rows.push({ age: i });
  }
  return rows;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
