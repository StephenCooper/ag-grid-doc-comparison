import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Grid, GridOptions, ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MultiFilterModule,
  SetFilterModule,
  MenuModule,
  ClipboardModule,
]);

var dateFilterParams = {
  filters: [
    {
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterDate: Date, cellValue: string) {
          if (cellValue == null) return -1;

          return getDate(cellValue).getTime() - filterDate.getTime();
        },
      },
    },
    {
      filter: 'agSetColumnFilter',
      filterParams: {
        comparator: function (a: string, b: string) {
          return getDate(a).getTime() - getDate(b).getTime();
        },
      },
    },
  ],
};

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete', filter: 'agMultiColumnFilter' },
    {
      field: 'gold',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agNumberColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
    },
    {
      field: 'date',
      filter: 'agMultiColumnFilter',
      filterParams: dateFilterParams,
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
    floatingFilter: true,
    menuTabs: ['filterMenuTab'],
  },
};

function getDate(value: string) {
  var dateParts = value.split('/');
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
