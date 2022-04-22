import { Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'athlete', hide: true },
    { field: 'year' },
    { field: 'total', aggFunc: 'sum', filter: 'agNumberColumnFilter' },
  ],
  defaultColDef: {
    flex: 1,
    filter: true,
    floatingFilter: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    field: 'athlete',
  },
  groupDefaultExpanded: -1,
  groupAggFiltering: (params) => !!params.node.group,
  rowData: getData(),
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
