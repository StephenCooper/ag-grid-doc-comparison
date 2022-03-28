import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, RowGroupingDisplayType } from 'ag-grid-community';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'athlete' },
    { field: 'year' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'total', aggFunc: 'sum' },
    { field: 'age' },
    { field: 'date' },
    { field: 'sport' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    resizable: true,
  },
  autoGroupColumnDef: {
    headerName: 'Country',
    minWidth: 300,
  },
  // optional as 'singleColumn' is the default group display type
  groupDisplayType: 'singleColumn',
  showOpenedGroup: true,
  animateRows: true,
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 