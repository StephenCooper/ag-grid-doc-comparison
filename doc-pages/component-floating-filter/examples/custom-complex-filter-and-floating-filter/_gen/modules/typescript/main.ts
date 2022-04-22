import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { CustomNumberFilter } from './custom-number-filter';
import {
  CustomFloatingParams,
  NumberFloatingFilter,
} from './number-floating-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: ColDef[] = [
  {
    field: 'athlete',
    minWidth: 150,
    filter: 'agTextColumnFilter',
    filterParams: {
      debounceMs: 2000,
    },
  },
  {
    field: 'age',
    filter: 'agNumberColumnFilter',
    filterParams: {
      debounceMs: 0,
    },
  },
  { field: 'country' },
  { field: 'year' },
  {
    field: 'date',
    minWidth: 180,
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: function (
        filterLocalDateAtMidnight: Date,
        cellValue: string
      ) {
        var dateAsString = cellValue;
        var dateParts = dateAsString.split('/');
        var cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        );

        if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
          return 0;
        }

        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }

        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
      },
    },
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  { field: 'sport' },
  {
    field: 'gold',
    floatingFilterComponent: NumberFloatingFilter,
    floatingFilterComponentParams: {
      maxValue: 7,
      suppressFilterButton: true,
    } as CustomFloatingParams,
    filter: CustomNumberFilter,
  },
  {
    field: 'silver',
    floatingFilterComponent: NumberFloatingFilter,
    floatingFilterComponentParams: {
      maxValue: 3,
      suppressFilterButton: true,
    } as CustomFloatingParams,
    filter: CustomNumberFilter,
  },
  {
    field: 'bronze',
    floatingFilterComponent: NumberFloatingFilter,
    floatingFilterComponentParams: {
      maxValue: 2,
      suppressFilterButton: true,
    } as CustomFloatingParams,
    filter: CustomNumberFilter,
  },
  {
    field: 'total',
    floatingFilterComponent: NumberFloatingFilter,
    floatingFilterComponentParams: {
      maxValue: 5,
      suppressFilterButton: true,
    } as CustomFloatingParams,
    filter: CustomNumberFilter,
  },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: null,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
