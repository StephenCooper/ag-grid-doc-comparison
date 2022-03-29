import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  SetFilterModule,
  MultiFilterModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "city", chartDataType: "category" },
    { field: "country", chartDataType: "category" },
    { field: "longitude", chartDataType: "series" },
    { field: "latitude", chartDataType: "series" },
    { field: "population", chartDataType: "series" },
  ],
  defaultColDef: {
    flex: 1,
    editable: true,
    sortable: true,
    filter: "agMultiColumnFilter",
    floatingFilter: true,
    resizable: true,
  },
  rowData: getData(),
  enableCharts: true,
  chartThemes: ["ag-default-dark"],
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  createColumnChart(params.api);
  createBubbleChart(params.api);
}

function createColumnChart(gridApi: GridApi) {
  gridApi.createCrossFilterChart({
    chartType: "column",
    cellRange: {
      columns: ["country", "population"],
    },
    aggFunc: "count",
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Number of Most Populous Cities by Country",
        },
        legend: {
          enabled: false,
        },
      },
      cartesian: {
        axes: {
          category: {
            label: {
              rotation: 325,
            },
          },
        },
      },
    },
    chartContainer: document.querySelector("#barChart") as any,
  });
}

function createBubbleChart(gridApi: GridApi) {
  gridApi.createCrossFilterChart({
    chartType: "bubble",
    cellRange: {
      columns: ["longitude", "latitude", "population"],
    },
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Latitude vs Longitude of Most Populous Cities",
        },
        legend: {
          enabled: false,
        },
      },
    },
    chartContainer: document.querySelector("#bubbleChart") as any,
  });
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
