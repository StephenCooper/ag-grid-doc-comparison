import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  ColumnMovedEvent,
  ColumnPinnedEvent,
  ColumnPivotChangedEvent,
  ColumnResizedEvent,
  ColumnRowGroupChangedEvent,
  ColumnValueChangedEvent,
  ColumnVisibleEvent,
  Grid,
  GridOptions,
  ModuleRegistry,
  SortChangedEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

function getColumnDefs(): ColDef[] {
  return [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ];
}

function onSortChanged(e: SortChangedEvent) {
  console.log('Event Sort Changed', e);
}

function onColumnResized(e: ColumnResizedEvent) {
  console.log('Event Column Resized', e);
}

function onColumnVisible(e: ColumnVisibleEvent) {
  console.log('Event Column Visible', e);
}

function onColumnPivotChanged(e: ColumnPivotChangedEvent) {
  console.log('Event Pivot Changed', e);
}

function onColumnRowGroupChanged(e: ColumnRowGroupChangedEvent) {
  console.log('Event Row Group Changed', e);
}

function onColumnValueChanged(e: ColumnValueChangedEvent) {
  console.log('Event Value Changed', e);
}

function onColumnMoved(e: ColumnMovedEvent) {
  console.log('Event Column Moved', e);
}

function onColumnPinned(e: ColumnPinnedEvent) {
  console.log('Event Column Pinned', e);
}

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    width: 150,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
  },
  columnDefs: getColumnDefs(),
  rowData: null,
  onSortChanged: onSortChanged,
  onColumnResized: onColumnResized,
  onColumnVisible: onColumnVisible,
  onColumnPivotChanged: onColumnPivotChanged,
  onColumnRowGroupChanged: onColumnRowGroupChanged,
  onColumnValueChanged: onColumnValueChanged,
  onColumnMoved: onColumnMoved,
  onColumnPinned: onColumnPinned,
};

function onBtSortOn() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    if (colDef.field === 'age') {
      colDef.sort = 'desc';
    }
    if (colDef.field === 'athlete') {
      colDef.sort = 'asc';
    }
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtSortOff() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    colDef.sort = null;
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtWidthNarrow() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    if (colDef.field === 'age' || colDef.field === 'athlete') {
      colDef.width = 100;
    }
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtWidthNormal() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    colDef.width = 200;
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtHide() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    if (colDef.field === 'age' || colDef.field === 'athlete') {
      colDef.hide = true;
    }
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtShow() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    colDef.hide = false;
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtPivotOn() {
  gridOptions.columnApi!.setPivotMode(true);

  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    if (colDef.field === 'country') {
      colDef.pivot = true;
    }
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtPivotOff() {
  gridOptions.columnApi!.setPivotMode(false);

  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    colDef.pivot = false;
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtRowGroupOn() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    if (colDef.field === 'sport') {
      colDef.rowGroup = true;
    }
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtRowGroupOff() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    colDef.rowGroup = false;
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtAggFuncOn() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    if (
      colDef.field === 'gold' ||
      colDef.field === 'silver' ||
      colDef.field === 'bronze'
    ) {
      colDef.aggFunc = 'sum';
    }
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtAggFuncOff() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    colDef.aggFunc = null;
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtPinnedOn() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    if (colDef.field === 'athlete') {
      colDef.pinned = 'left';
    }
    if (colDef.field === 'age') {
      colDef.pinned = 'right';
    }
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onBtPinnedOff() {
  const columnDefs: ColDef[] = getColumnDefs();
  columnDefs.forEach(function (colDef) {
    colDef.pinned = null;
  });
  gridOptions.api!.setColumnDefs(columnDefs);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtSortOn = onBtSortOn;
  (<any>window).onBtSortOff = onBtSortOff;
  (<any>window).onBtWidthNarrow = onBtWidthNarrow;
  (<any>window).onBtWidthNormal = onBtWidthNormal;
  (<any>window).onBtHide = onBtHide;
  (<any>window).onBtShow = onBtShow;
  (<any>window).onBtPivotOn = onBtPivotOn;
  (<any>window).onBtPivotOff = onBtPivotOff;
  (<any>window).onBtRowGroupOn = onBtRowGroupOn;
  (<any>window).onBtRowGroupOff = onBtRowGroupOff;
  (<any>window).onBtAggFuncOn = onBtAggFuncOn;
  (<any>window).onBtAggFuncOff = onBtAggFuncOff;
  (<any>window).onBtPinnedOn = onBtPinnedOn;
  (<any>window).onBtPinnedOff = onBtPinnedOff;
}
