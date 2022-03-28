import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';
import { CustomTooltip } from './customTooltip';

const columnDefs: ColDef[] = [
  {
    field: 'athlete',
    minWidth: 150,
    tooltipField: 'athlete',
    tooltipComponentParams: { color: '#ececec' },
  },
  { field: 'age' },
  { field: 'country', minWidth: 130, tooltipField: 'country' },
  { field: 'year' },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
]

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
    tooltipComponent: CustomTooltip
  },

  tooltipShowDelay: 0,
  tooltipHideDelay: 2000,

  // set rowData to null or undefined to show loading panel by default
  rowData: null,
  columnDefs: columnDefs,
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => {
      gridOptions.api!.setRowData(data)
    })
 