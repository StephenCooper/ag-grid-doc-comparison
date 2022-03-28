import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, IsRowSelectable } from 'ag-grid-community';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', maxWidth: 100 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'date' },
    { field: 'sport' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
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
  groupSelectsFiltered: true,
  suppressRowClickSelection: true,
  groupDefaultExpanded: -1,
  isRowSelectable: function (node) {
    return node.data
      ? node.data.year === 2008 || node.data.year === 2004
      : false
  },
}

function filterBy2004() {
  gridOptions.api!.setFilterModel({
    year: {
      type: 'set',
      values: ['2008', '2012'],
    },
  })
}

function clearFilter() {
  gridOptions.api!.setFilterModel(null)
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(function (data) {
      gridOptions.api!.setRowData(data)
    })
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).filterBy2004 = filterBy2004;
 (<any>window).clearFilter = clearFilter;
}