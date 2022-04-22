import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  ModuleRegistry,
  SendToClipboardParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  RangeSelectionModule,
  ClipboardModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete', minWidth: 200 },
    { field: 'age' },
    { field: 'country', minWidth: 150 },
    { field: 'year' },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],

  defaultColDef: {
    editable: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
  },

  enableRangeSelection: true,
  rowSelection: 'multiple',

  sendToClipboard: sendToClipboard,
};

function sendToClipboard(params: SendToClipboardParams) {
  console.log('send to clipboard called with data:');
  console.log(params.data);
}

function onBtCopyRows() {
  gridOptions.api!.copySelectedRowsToClipboard();
}

function onBtCopyRange() {
  gridOptions.api!.copySelectedRangeToClipboard();
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtCopyRows = onBtCopyRows;
  (<any>window).onBtCopyRange = onBtCopyRange;
}
