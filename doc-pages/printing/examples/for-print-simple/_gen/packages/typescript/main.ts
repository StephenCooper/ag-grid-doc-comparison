import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';

const columnDefs: ColDef[] = [
  { headerName: 'ID', valueGetter: 'node.rowIndex + 1', width: 70 },
  { field: 'model', width: 150 },
  { field: 'color' },
  { field: 'price', valueFormatter: '"$" + value.toLocaleString()' },
  { field: 'year' },
  { field: 'country' },
]

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: getData(),
  defaultColDef: {
    width: 100,
  },
}

function onBtPrinterFriendly() {
  var eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
  eGridDiv.style.width = ''
  eGridDiv.style.height = ''

  gridOptions.api!.setDomLayout('print')
}

function onBtNormal() {
  var eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
  eGridDiv.style.width = '400px'
  eGridDiv.style.height = '200px'

  // Same as setting to 'normal' as it is the default
  gridOptions.api!.setDomLayout()
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onBtPrinterFriendly = onBtPrinterFriendly;
 (<any>window).onBtNormal = onBtNormal;
}