import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  LineSparklineOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
      field: 'change',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          type: 'line',
          line: {
            stroke: 'rgb(124, 255, 178)',
            strokeWidth: 2,
          },
          padding: {
            top: 5,
            bottom: 5,
          },
          highlightStyle: {
            size: 7,
            fill: 'rgb(124, 255, 178)',
            strokeWidth: 0,
          },
        } as LineSparklineOptions,
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
