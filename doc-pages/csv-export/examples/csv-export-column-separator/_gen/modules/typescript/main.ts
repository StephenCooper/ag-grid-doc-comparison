import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule, MenuModule])

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

  rowData: [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ],
}

function getValue(inputSelector: string) {
  var text = (document.querySelector(inputSelector) as any).value
  switch (text) {
    case 'none':
      return
    case 'tab':
      return '\t'
    default:
      return text
  }
}

function getParams() {
  return {
    columnSeparator: getValue('#columnSeparator'),
  }
}

function onBtnExport() {
  var params = getParams()
  if (params.columnSeparator) {
    alert(
      'NOTE: you are downloading a file with non-standard separators - it may not render correctly in Excel.'
    )
  }
  gridOptions.api!.exportDataAsCsv(params)
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