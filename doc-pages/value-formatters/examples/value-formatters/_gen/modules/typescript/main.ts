import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  ModuleRegistry,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { headerName: 'A', field: 'a' },
    { headerName: 'B', field: 'b' },
    { headerName: '£A', field: 'a', valueFormatter: currencyFormatter },
    { headerName: '£B', field: 'b', valueFormatter: currencyFormatter },
    { headerName: '(A)', field: 'a', valueFormatter: bracketsFormatter },
    { headerName: '(B)', field: 'b', valueFormatter: bracketsFormatter },
  ],
  defaultColDef: {
    flex: 1,
    cellClass: 'number-cell',
    resizable: true,
  },
  rowData: createRowData(),
};

function bracketsFormatter(params: ValueFormatterParams) {
  return '(' + params.value + ')';
}

function currencyFormatter(params: ValueFormatterParams) {
  return '£' + formatNumber(params.value);
}

function formatNumber(number: number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function createRowData() {
  var rowData = [];

  for (var i = 0; i < 100; i++) {
    rowData.push({
      a: Math.floor(((i + 2) * 173456) % 10000),
      b: Math.floor(((i + 7) * 373456) % 10000),
    });
  }

  return rowData;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
