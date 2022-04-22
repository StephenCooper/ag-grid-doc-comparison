import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
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
  { field: 'year' },
  { field: 'date' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    width: 150,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
  },
  sideBar: {
    toolPanels: ['columns'],
  },
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always',
  // debug: true,
  columnDefs: columnDefs,
  rowData: null,
};

function onBtSortAthlete() {
  gridOptions.columnApi!.applyColumnState({
    state: [{ colId: 'athlete', sort: 'asc' }],
  });
}

function onBtSortCountryThenSportClearOthers() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'country', sort: 'asc', sortIndex: 0 },
      { colId: 'sport', sort: 'asc', sortIndex: 1 },
    ],
    defaultState: { sort: null },
  });
}

function onBtClearAllSorting() {
  gridOptions.columnApi!.applyColumnState({
    defaultState: { sort: null },
  });
}

function onBtRowGroupCountryThenSport() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'country', rowGroupIndex: 0 },
      { colId: 'sport', rowGroupIndex: 1 },
    ],
    defaultState: { rowGroup: false },
  });
}

function onBtRemoveCountryRowGroup() {
  gridOptions.columnApi!.applyColumnState({
    state: [{ colId: 'country', rowGroup: false }],
  });
}

function onBtClearAllRowGroups() {
  gridOptions.columnApi!.applyColumnState({
    defaultState: { rowGroup: false },
  });
}

function onBtOrderColsMedalsFirst() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'gold' },
      { colId: 'silver' },
      { colId: 'bronze' },
      { colId: 'total' },
      { colId: 'athlete' },
      { colId: 'age' },
      { colId: 'country' },
      { colId: 'sport' },
      { colId: 'year' },
      { colId: 'date' },
    ],
    applyOrder: true,
  });
}

function onBtOrderColsMedalsLast() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'athlete' },
      { colId: 'age' },
      { colId: 'country' },
      { colId: 'sport' },
      { colId: 'year' },
      { colId: 'date' },
      { colId: 'gold' },
      { colId: 'silver' },
      { colId: 'bronze' },
      { colId: 'total' },
    ],
    applyOrder: true,
  });
}

function onBtHideMedals() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'gold', hide: true },
      { colId: 'silver', hide: true },
      { colId: 'bronze', hide: true },
      { colId: 'total', hide: true },
    ],
  });
}

function onBtShowMedals() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'gold', hide: false },
      { colId: 'silver', hide: false },
      { colId: 'bronze', hide: false },
      { colId: 'total', hide: false },
    ],
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
  (<any>window).onBtSortAthlete = onBtSortAthlete;
  (<any>(
    window
  )).onBtSortCountryThenSportClearOthers = onBtSortCountryThenSportClearOthers;
  (<any>window).onBtClearAllSorting = onBtClearAllSorting;
  (<any>window).onBtRowGroupCountryThenSport = onBtRowGroupCountryThenSport;
  (<any>window).onBtRemoveCountryRowGroup = onBtRemoveCountryRowGroup;
  (<any>window).onBtClearAllRowGroups = onBtClearAllRowGroups;
  (<any>window).onBtOrderColsMedalsFirst = onBtOrderColsMedalsFirst;
  (<any>window).onBtOrderColsMedalsLast = onBtOrderColsMedalsLast;
  (<any>window).onBtHideMedals = onBtHideMedals;
  (<any>window).onBtShowMedals = onBtShowMedals;
}
