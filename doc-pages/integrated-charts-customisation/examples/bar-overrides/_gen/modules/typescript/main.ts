import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
    {
      headerName: 'A',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
    {
      headerName: 'B',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
    {
      headerName: 'C',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
    {
      headerName: 'D',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
  ],
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  popupParent: document.body,
  rowData: getData(),
  enableRangeSelection: true,
  enableCharts: true,
  onFirstDataRendered: onFirstDataRendered,
  chartThemeOverrides: {
    bar: {
      series: {
        fillOpacity: 0.8,
        strokeOpacity: 0.8,
        strokeWidth: 2,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.3)',
          xOffset: 10,
          yOffset: 5,
          blur: 8,
        },
        label: {
          enabled: true,
          fontStyle: 'italic',
          fontWeight: 'bold',
          fontSize: 15,
          fontFamily: 'Arial, sans-serif',
          color: 'green',
          formatter: function (params) {
            return '<' + params.value + '>';
          },
        },
        highlightStyle: {
          item: {
            fill: 'red',
            stroke: 'yellow',
          },
        },
        tooltip: {
          renderer: function (params) {
            return {
              content:
                '<b>' +
                params.xName!.toUpperCase() +
                ':</b> ' +
                params.xValue +
                '<br/>' +
                '<b>' +
                params.yName!.toUpperCase() +
                ':</b> ' +
                params.yValue,
            };
          },
        },
      },
    },
  },
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  var cellRange = {
    rowStartIndex: 0,
    rowEndIndex: 4,
    columns: ['country', 'gold', 'silver', 'bronze'],
  };

  var createRangeChartParams: CreateRangeChartParams = {
    cellRange: cellRange,
    chartType: 'groupedBar',
  };

  params.api.createRangeChart(createRangeChartParams);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
