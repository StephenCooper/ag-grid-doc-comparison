import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from '@ag-grid-community/core';
import { CustomLoadingOverlay } from './customLoadingOverlay';
import { CustomNoRowsOverlay } from './customNoRowsOverlay';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

const columnDefs: ColDef[] = [
  { field: 'athlete', width: 150 },
  { field: 'age', width: 90 },
  { field: 'country', width: 120 },
  { field: 'year', width: 90 },
  { field: 'date', width: 110 },
  { field: 'sport', width: 110 },
  { field: 'gold', width: 100 },
  { field: 'silver', width: 100 },
  { field: 'bronze', width: 100 },
  { field: 'total', width: 100 },
]

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },

  // set rowData to null or undefined to show loading panel by default
  rowData: null,
  columnDefs: columnDefs,

  loadingOverlayComponent: CustomLoadingOverlay,
  loadingOverlayComponentParams: {
    loadingMessage: 'One moment please...',
  },
  noRowsOverlayComponent: CustomNoRowsOverlay,
  noRowsOverlayComponentParams: {
    noRowsMessageFunc: () => 'Sorry - no rows! at: ' + new Date(),
  },
}

function onBtShowLoading() {
  gridOptions.api!.showLoadingOverlay()
}

function onBtShowNoRows() {
  gridOptions.api!.showNoRowsOverlay()
}

function onBtHide() {
  gridOptions.api!.hideOverlay()
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => {
      gridOptions.api!.setRowData(data)
    })
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onBtShowLoading = onBtShowLoading;
 (<any>window).onBtShowNoRows = onBtShowNoRows;
 (<any>window).onBtHide = onBtHide;
}