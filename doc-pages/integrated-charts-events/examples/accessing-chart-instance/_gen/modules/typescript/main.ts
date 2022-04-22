import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ChartCreated,
  ChartDestroyed,
  ChartRangeSelectionChanged,
  ColDef,
  Grid,
  GridApi,
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

const columnDefs: ColDef[] = [
  { field: 'Month', width: 150, chartDataType: 'category' },
  { field: 'Sunshine (hours)', chartDataType: 'series' },
  { field: 'Rainfall (mm)', chartDataType: 'series' },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  popupParent: document.body,
  columnDefs: columnDefs,
  enableRangeSelection: true,
  enableCharts: true,
  onChartCreated: onChartCreated,
  onChartRangeSelectionChanged: onChartRangeSelectionChanged,
  onChartDestroyed: onChartDestroyed,
};

var chart: any = null;

function onChartCreated(event: ChartCreated) {
  console.log('Created chart with ID ' + event.chartId);

  const chartRef = gridOptions.api!.getChartRef(event.chartId)!;
  chart = chartRef.chart;

  updateTitle(gridOptions.api!, chart);
}

function onChartRangeSelectionChanged(event: ChartRangeSelectionChanged) {
  console.log('Changed range selection of chart with ID ' + event.chartId);
  updateTitle(gridOptions.api!, chart);
}

function onChartDestroyed(event: ChartDestroyed) {
  console.log('Destroyed chart with ID ' + event.chartId);
  chart = null;
}

function updateTitle(api: GridApi, chart: any) {
  var cellRange = api.getCellRanges()![1];
  if (!cellRange) return;
  var columnCount = cellRange.columns.length;
  var rowCount = cellRange.endRow!.rowIndex - cellRange.startRow!.rowIndex + 1;

  chart.title.enabled = true;
  chart.title.text = 'Monthly Weather';

  chart.subtitle.enabled = true;
  chart.subtitle.text =
    'Using series data from ' +
    columnCount +
    ' column(s) and ' +
    rowCount +
    ' row(s)';
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/weather-se-england.json')
  .then((response) => response.json())
  .then(function (data) {
    gridOptions.api!.setRowData(data);
  });
