import { Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete' },
    { field: 'country', rowGroup: true },
    { field: 'city', rowGroup: true },
    { field: 'year' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    resizable: true,
  },
  autoGroupColumnDef: {
    headerName: 'Group',
    field: 'athlete',
    minWidth: 220,
    cellRenderer: 'agGroupCellRenderer',
  },
  rowData: getData(),

  // optional as 'singleColumn' is the default group display type
  groupDisplayType: 'singleColumn',

  // set this to true to remove single children
  groupRemoveSingleChildren: false,

  // set this to true to remove leaf level single children
  groupRemoveLowestSingleChildren: false,

  // expand everything by default
  groupDefaultExpanded: -1,

  suppressAggFuncInHeader: true,
  animateRows: true,
};

function changeSelection(type: string) {
  // normal, single or lowest
  if (type === 'normal') {
    gridOptions.api!.setGroupRemoveSingleChildren(false);
    gridOptions.api!.setGroupRemoveLowestSingleChildren(false);
  } else if (type === 'single') {
    gridOptions.api!.setGroupRemoveSingleChildren(true);
    gridOptions.api!.setGroupRemoveLowestSingleChildren(false);
  } else if (type === 'lowest') {
    gridOptions.api!.setGroupRemoveLowestSingleChildren(true);
    gridOptions.api!.setGroupRemoveSingleChildren(false);
  } else {
    console.log('unknown type: ' + type);
  }
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).changeSelection = changeSelection;
}
