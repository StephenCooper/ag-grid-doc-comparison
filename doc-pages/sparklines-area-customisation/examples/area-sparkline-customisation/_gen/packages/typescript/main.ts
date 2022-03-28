import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AreaSparklineOptions, ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
      field: 'change',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          type: 'area',
          fill: 'rgba(216, 204, 235, 0.3)',
          line: {
            stroke: 'rgb(119,77,185)',
          },
          highlightStyle: {
            fill: 'rgb(143,185,77)',
          },
          axis: {
            stroke: 'rgb(204, 204, 235)',
          },
        } as AreaSparklineOptions,
      },
    },
    {
      field: 'volume',
      type: 'numericColumn',
      maxWidth: 140,
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  rowData: getData(),
  rowHeight: 50,
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 