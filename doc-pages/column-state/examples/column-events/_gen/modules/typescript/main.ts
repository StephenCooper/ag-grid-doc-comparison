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

const columnDefs: ColDef[] = [
  { field: 'athlete' },
  { field: 'age' },
  { field: 'country' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
];

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
  // debug: true,
  columnDefs: columnDefs,
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
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'age', sort: 'desc' },
      { colId: 'athlete', sort: 'asc' },
    ],
  });
}

function onBtSortOff() {
  gridOptions.columnApi!.applyColumnState({
    defaultState: { sort: null },
  });
}

function onBtWidthNarrow() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'age', width: 100 },
      { colId: 'athlete', width: 100 },
    ],
  });
}

function onBtWidthNormal() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'age', width: 200 },
      { colId: 'athlete', width: 200 },
    ],
  });
}

function onBtHide() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'age', hide: true },
      { colId: 'athlete', hide: true },
    ],
  });
}

function onBtShow() {
  gridOptions.columnApi!.applyColumnState({
    defaultState: { hide: false },
  });
}

function onBtPivotOn() {
  gridOptions.columnApi!.setPivotMode(true);
  gridOptions.columnApi!.applyColumnState({
    state: [{ colId: 'country', pivot: true }],
  });
}

function onBtPivotOff() {
  gridOptions.columnApi!.setPivotMode(false);
  gridOptions.columnApi!.applyColumnState({
    defaultState: { pivot: false },
  });
}

function onBtRowGroupOn() {
  gridOptions.columnApi!.applyColumnState({
    state: [{ colId: 'sport', rowGroup: true }],
  });
}

function onBtRowGroupOff() {
  gridOptions.columnApi!.applyColumnState({
    defaultState: { rowGroup: false },
  });
}

function onBtAggFuncOn() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'gold', aggFunc: 'sum' },
      { colId: 'silver', aggFunc: 'sum' },
      { colId: 'bronze', aggFunc: 'sum' },
    ],
  });
}

function onBtAggFuncOff() {
  gridOptions.columnApi!.applyColumnState({
    defaultState: { aggFunc: null },
  });
}

function onBtNormalOrder() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'athlete' },
      { colId: 'age' },
      { colId: 'country' },
      { colId: 'sport' },
      { colId: 'gold' },
      { colId: 'silver' },
      { colId: 'bronze' },
    ],
    applyOrder: true,
  });
}

function onBtReverseOrder() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'athlete' },
      { colId: 'age' },
      { colId: 'country' },
      { colId: 'sport' },
      { colId: 'bronze' },
      { colId: 'silver' },
      { colId: 'gold' },
    ],
    applyOrder: true,
  });
}

function onBtPinnedOn() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'athlete', pinned: 'left' },
      { colId: 'age', pinned: 'right' },
    ],
  });
}

function onBtPinnedOff() {
  gridOptions.columnApi!.applyColumnState({
    defaultState: { pinned: null },
  });
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
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
  (<any>window).onBtNormalOrder = onBtNormalOrder;
  (<any>window).onBtReverseOrder = onBtReverseOrder;
  (<any>window).onBtPinnedOn = onBtPinnedOn;
  (<any>window).onBtPinnedOff = onBtPinnedOff;
}
