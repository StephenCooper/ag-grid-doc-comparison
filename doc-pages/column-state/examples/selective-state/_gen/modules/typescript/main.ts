import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, SideBarDef } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])
declare var window: any;

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
]

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    width: 100,
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
}

function onBtSaveSortState() {
  const allState = gridOptions.columnApi!.getColumnState()
  const sortState = allState.map(state => ({
    colId: state.colId,
    sort: state.sort,
    sortIndex: state.sortIndex,
  }))
  window.sortState = sortState
  console.log('sort state saved', sortState)
}

function onBtRestoreSortState() {
  if (!window.sortState) {
    console.log('no sort state to restore, you must save sort state first')
    return
  }
  gridOptions.columnApi!.applyColumnState({
    state: window.sortState,
  })
  console.log('sort state restored')
}

function onBtSaveOrderAndVisibilityState() {
  const allState = gridOptions.columnApi!.getColumnState()
  const orderAndVisibilityState = allState.map(state => ({
    colId: state.colId,
    hide: state.hide,
  }))
  window.orderAndVisibilityState = orderAndVisibilityState
  console.log('order and visibility state saved', orderAndVisibilityState)
}

function onBtRestoreOrderAndVisibilityState() {
  if (!window.orderAndVisibilityState) {
    console.log(
      'no order and visibility state to restore by, you must save order and visibility state first'
    )
    return
  }
  gridOptions.columnApi!.applyColumnState({
    state: window.orderAndVisibilityState,
    applyOrder: true,
  })
  console.log('column state restored')
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onBtSaveSortState = onBtSaveSortState;
 (<any>window).onBtRestoreSortState = onBtRestoreSortState;
 (<any>window).onBtSaveOrderAndVisibilityState = onBtSaveOrderAndVisibilityState;
 (<any>window).onBtRestoreOrderAndVisibilityState = onBtRestoreOrderAndVisibilityState;
}