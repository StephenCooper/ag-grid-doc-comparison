import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },

  suppressExcelExport: true,
  popupParent: document.body,

  columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],

  pinnedTopRowData: [{ make: 'Top Make', model: 'Top Model', price: 0 }],

  pinnedBottomRowData: [
    { make: 'Bottom Make', model: 'Bottom Model', price: 10101010 },
  ],

  rowData: [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ],
}

function getBoolean(id: string) {
  var field: any = document.querySelector('#' + id)

  return !!field.checked
}

function getParams() {
  return {
    skipPinnedTop: getBoolean('skipPinnedTop'),
    skipPinnedBottom: getBoolean('skipPinnedBottom'),
  }
}

function onBtnExport() {
  gridOptions.api!.exportDataAsCsv(getParams())
}

function onBtnUpdate() {
  (document.querySelector('#csvResult') as any).value = gridOptions.api!.getDataAsCsv(
    getParams()
  )
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onBtnExport = onBtnExport;
 (<any>window).onBtnUpdate = onBtnUpdate;
}