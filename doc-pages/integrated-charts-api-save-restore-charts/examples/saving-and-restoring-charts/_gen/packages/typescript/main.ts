import { ChartModel, ChartRef, Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', chartDataType: 'category' },
    { field: 'sugar', chartDataType: 'series' },
    { field: 'fat', chartDataType: 'series' },
    { field: 'weight', chartDataType: 'series' },
  ],
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  rowData: getData(),
  enableRangeSelection: true,
  popupParent: document.body,
  enableCharts: true,
  createChartContainer: createChartContainer,
};

var chartModel: ChartModel | null;
var currentChartRef: ChartRef | null;

function saveChart() {
  var chartModels = gridOptions.api!.getChartModels() || [];
  if (chartModels.length > 0) {
    chartModel = chartModels[0];
  }
  alert('Chart saved!');
}

function clearChart() {
  if (currentChartRef) {
    currentChartRef.destroyChart();
    currentChartRef = null;
  }
}

function restoreChart() {
  if (!chartModel) return;
  currentChartRef = gridOptions.api!.restoreChart(chartModel)!;
}

function createChartContainer(chartRef: ChartRef) {
  // destroy existing chart
  if (currentChartRef) {
    currentChartRef.destroyChart();
  }

  var eChart = chartRef.chartElement;
  var eParent = document.querySelector('#myChart') as any;
  eParent.appendChild(eChart);
  currentChartRef = chartRef;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).saveChart = saveChart;
  (<any>window).clearChart = clearChart;
  (<any>window).restoreChart = restoreChart;
}
