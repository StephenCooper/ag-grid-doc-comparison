import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ChartModel,
  ChartRef,
  ChartRefParams,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { GridChartsModule } from "@ag-grid-enterprise/charts";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "country", chartDataType: "category" },
    { field: "sugar", chartDataType: "series" },
    { field: "fat", chartDataType: "series" },
    { field: "weight", chartDataType: "series" },
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
  alert("Chart saved!");
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
  var eParent = document.querySelector("#myChart") as any;
  eParent.appendChild(eChart);
  currentChartRef = chartRef;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).saveChart = saveChart;
  (<any>window).clearChart = clearChart;
  (<any>window).restoreChart = restoreChart;
}
