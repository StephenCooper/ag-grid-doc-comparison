import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';

var rowData = [
  { a: 1, b: 1, c: 1, d: 1, e: 1 },
  { a: 2, b: 2, c: 2, d: 2, e: 2 },
]

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
  ],
  rowData: rowData,
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 