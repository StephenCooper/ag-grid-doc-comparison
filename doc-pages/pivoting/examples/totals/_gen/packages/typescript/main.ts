import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, enableRowGroup: true },
    { field: 'athlete' },
    { field: 'sport', pivot: true, enablePivot: true },
    { field: 'year', pivot: true, enablePivot: true },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ],
  defaultColDef: {
    maxWidth: 140,
    filter: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 180,
  },
  pivotMode: true,
  pivotColumnGroupTotals: 'before',
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 