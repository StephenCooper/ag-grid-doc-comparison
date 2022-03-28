import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AreaSparklineOptions, ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'symbol', maxWidth: 110 },
    { field: 'name', minWidth: 250 },
    {
      field: 'change',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          type: 'area',
          xKey: 'xVal',
          yKey: 'yVal',
          axis: {
            // set x-axis type to 'number'
            type: 'number',
          },
        } as AreaSparklineOptions,
      },
    },
    { field: 'volume', type: 'numericColumn', maxWidth: 140 },
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
 