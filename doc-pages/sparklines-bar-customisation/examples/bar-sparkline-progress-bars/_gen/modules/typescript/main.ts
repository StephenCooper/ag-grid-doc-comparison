import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  BarFormat,
  BarFormatterParams,
  Grid,
  GridOptions,
  LabelFormatterParams,
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
          type: 'bar',
          label: {
            enabled: true,
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
            formatter: function (params: LabelFormatterParams) {
              return `${params.value}%`;
            },
          },
          paddingOuter: 0,
          padding: {
            top: 0,
            bottom: 0,
          },
          valueAxisDomain: [0, 100],
          axis: {
            strokeWidth: 0,
          },
          tooltip: {
            enabled: false,
          },
          formatter: formatter,
        },
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

function formatter(params: BarFormatterParams): BarFormat {
  const { yValue } = params;
  return {
    fill: yValue <= 20 ? '#4fa2d9' : yValue < 60 ? '#277cb5' : '#195176',
  };
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
