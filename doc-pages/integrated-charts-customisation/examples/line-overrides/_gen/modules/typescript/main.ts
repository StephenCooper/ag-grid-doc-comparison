import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  AgChartThemeOverrides,
  ColDef,
  ColGroupDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
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

const columnDefs: ColDef[] = [
  { field: "country", width: 150, chartDataType: "category" },
  { field: "gold", chartDataType: "series" },
  { field: "silver", chartDataType: "series" },
  { field: "bronze", chartDataType: "series" },
  {
    headerName: "A",
    valueGetter: "Math.floor(Math.random()*1000)",
    chartDataType: "series",
  },
  {
    headerName: "B",
    valueGetter: "Math.floor(Math.random()*1000)",
    chartDataType: "series",
  },
  {
    headerName: "C",
    valueGetter: "Math.floor(Math.random()*1000)",
    chartDataType: "series",
  },
  {
    headerName: "D",
    valueGetter: "Math.floor(Math.random()*1000)",
    chartDataType: "series",
  },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
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
    line: {
      series: {
        strokeOpacity: 0.7,
        strokeWidth: 5,
        highlightStyle: {
          item: {
            fill: "red",
            stroke: "yellow",
          },
        },
        marker: {
          enabled: true,
          shape: "diamond",
          size: 12,
          strokeWidth: 4,
          fillOpacity: 0.2,
          strokeOpacity: 0.2,
        },
        tooltip: {
          renderer: function (params) {
            return {
              content:
                "<b>" +
                params.xName!.toUpperCase() +
                ":</b> " +
                params.xValue +
                "<br/>" +
                "<b>" +
                params.yName!.toUpperCase() +
                ":</b> " +
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
    columns: ["country", "gold", "silver", "bronze"],
  };

  var createRangeChartParams: CreateRangeChartParams = {
    cellRange: cellRange,
    chartType: "line",
  };

  params.api.createRangeChart(createRangeChartParams);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
