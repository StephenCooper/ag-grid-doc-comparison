import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, MenuModule, ColumnsToolPanelModule, SetFilterModule])

const gridOptions: GridOptions = {
  columnDefs: [
    {
      field: 'year',
      rowGroup: true,
      hide: true,
    },
    {
      field: 'month',
      rowGroup: true,
      hide: true,
      comparator: function (a, b) {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]

        // sorts 'months' in chronological order
        return months.indexOf(a) - months.indexOf(b)
      },
    },
    { field: 'salesRep' },
    { field: 'handset' },
    { field: 'sale' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    sort: 'asc',
    minWidth: 300,
  },
  groupDefaultExpanded: 1,
  rowData: getData(),
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 