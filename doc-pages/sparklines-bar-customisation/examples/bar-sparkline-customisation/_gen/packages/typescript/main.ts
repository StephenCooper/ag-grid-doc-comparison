import { BarSparklineOptions, Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
      field: 'change',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          type: 'bar',
          fill: '#5470c6',
          stroke: '#91cc75',
          highlightStyle: {
            fill: '#fac858',
          },
          valueAxisDomain: [0, 1],
          paddingOuter: 0,
          padding: {
            top: 0,
            bottom: 0,
          },
          axis: {
            strokeWidth: 0,
          },
        } as BarSparklineOptions,
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
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
