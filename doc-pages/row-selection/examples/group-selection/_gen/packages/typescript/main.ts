import { Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'age', minWidth: 120, checkboxSelection: true, aggFunc: 'sum' },
    { field: 'year', maxWidth: 120 },
    { field: 'date', minWidth: 150 },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
  },
  autoGroupColumnDef: {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  },
  rowSelection: 'multiple',
  groupSelectsChildren: true,
  suppressRowClickSelection: true,
  suppressAggFuncInHeader: true,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
