import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, IsRowSelectable } from 'ag-grid-community';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete' },
    { field: 'age', maxWidth: 100 },
    {
      field: 'country',
      minWidth: 180,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    { field: 'year', maxWidth: 120 },
    { field: 'date', minWidth: 150 },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
  },
  rowSelection: 'multiple',
  suppressMenuHide: true,
  isRowSelectable: function (rowNode) {
    return rowNode.data ? rowNode.data.year < 2007 : false
  },
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 