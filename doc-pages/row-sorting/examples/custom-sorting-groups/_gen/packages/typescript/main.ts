import { ColDef, Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const columnDefs: ColDef[] = [
  { field: 'athlete', hide: true },
  { field: 'age' },
  { field: 'country', rowGroup: true },
  { field: 'year' },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    sortable: true,
  },
  autoGroupColumnDef: {
    comparator: function (valueA, valueB, nodeA, nodeB, isInverted) {
      var res = valueA == valueB ? 0 : valueA > valueB ? 1 : -1;
      return res;
    },
    field: 'athlete',
    sort: 'asc',
  },
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
