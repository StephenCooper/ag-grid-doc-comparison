import { ColDef, Grid, GridOptions, IRowDragItem } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

var rowDragText = function (params: IRowDragItem) {
  // keep double equals here because data can be a string or number
  if (params.rowNode!.data.year == '2012') {
    return params.defaultTextValue + ' (London Olympics)';
  }
  return params.defaultTextValue;
};

const columnDefs: ColDef[] = [
  {
    field: 'athlete',
    rowDrag: true,
    rowDragText: rowDragText,
  },
  { field: 'country' },
  { field: 'year', width: 100 },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 170,
    sortable: true,
    filter: true,
  },
  rowDragManaged: true,
  columnDefs: columnDefs,
  animateRows: true,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
