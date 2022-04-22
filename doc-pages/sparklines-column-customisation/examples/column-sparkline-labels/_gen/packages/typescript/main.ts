import { ColumnSparklineOptions, Grid, GridOptions } from 'ag-grid-community';
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
          type: 'column',
          fill: '#fac858',
          highlightStyle: {
            stroke: '#fac858',
          },
          padding: {
            top: 10,
            bottom: 10,
          },
          label: {
            enabled: true,
            placement: 'outsideEnd',
          },
        } as ColumnSparklineOptions,
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
  rowHeight: 80,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
