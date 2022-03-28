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

  columnDefs: [
    { field: 'athlete' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'gold', hide: true },
    { field: 'silver', hide: true },
    { field: 'bronze', hide: true },
    { field: 'total' },
  ],

  rowData: getData()
}

function getBoolean(id: string) {
  var field: any = document.querySelector('#' + id)

  return !!field.checked
}

function getParams() {
  return {
    allColumns: getBoolean('allColumns'),
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