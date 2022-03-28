import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgChartThemeOverrides, ChartMenuOptions, ColDef, ColGroupDef, CreateRangeChartParams, FirstDataRenderedEvent, GetChartToolbarItems, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, GridChartsModule])

const columnDefs: ColDef[] = [
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
]

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: getData(),
  popupParent: document.body,
  enableRangeSelection: true,
  onFirstDataRendered: onFirstDataRendered,
  enableCharts: true,
  getChartToolbarItems: getChartToolbarItems,
  chartThemeOverrides: {
    pie: {
      title: {
        enabled: true,
        text: 'Precious Metals Production',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'rgb(100, 100, 100)',
      },
      subtitle: {
        enabled: true,
        text: 'by country',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'rgb(100, 100, 100)',
      },
      padding: {
        top: 25,
        right: 20,
        bottom: 55,
        left: 20,
      },
      legend: {
        enabled: false,
      },
      series: {
        label: {
          enabled: true,
        },
        callout: {
          length: 20,
        },
      },
    },
  },
}

function getChartToolbarItems(): ChartMenuOptions[] {
  return ['chartDownload', 'chartData', 'chartSettings']
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  var createRangeChartParams: CreateRangeChartParams = {
    cellRange: {
      rowStartIndex: 0,
      rowEndIndex: 5,
      columns: ['country', 'gold'],
    },
    chartType: 'pie',
  }

  params.api.createRangeChart(createRangeChartParams)
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 