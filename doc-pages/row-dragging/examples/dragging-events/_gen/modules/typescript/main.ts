import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  ModuleRegistry,
  RowDragEndEvent,
  RowDragEnterEvent,
  RowDragLeaveEvent,
  RowDragMoveEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete', rowDrag: true },
    { field: 'country' },
    { field: 'year', width: 100 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ],
  defaultColDef: {
    width: 170,
    sortable: true,
    filter: true,
  },
  animateRows: true,
  onRowDragEnter: onRowDragEnter,
  onRowDragEnd: onRowDragEnd,
  onRowDragMove: onRowDragMove,
  onRowDragLeave: onRowDragLeave,
};

function onRowDragEnter(e: RowDragEnterEvent) {
  console.log('onRowDragEnter', e);
}

function onRowDragEnd(e: RowDragEndEvent) {
  console.log('onRowDragEnd', e);
}

function onRowDragMove(e: RowDragMoveEvent) {
  console.log('onRowDragMove', e);
}

function onRowDragLeave(e: RowDragLeaveEvent) {
  console.log('onRowDragLeave', e);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
