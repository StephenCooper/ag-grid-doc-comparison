import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  CreateRangeChartParams,
  Grid,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { MenuModule } from "@ag-grid-enterprise/menu";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "country", width: 150, chartDataType: "category" },
    { field: "gold", chartDataType: "series", sort: "desc" },
    { field: "silver", chartDataType: "series", sort: "desc" },
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
  enableCharts: true,
  popupParent: document.body,
};

function onChart1() {
  var params: CreateRangeChartParams = {
    cellRange: {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ["country", "gold", "silver"],
    },
    chartType: "groupedColumn",
    chartThemeName: "ag-vivid",
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Top 5 Medal Winners",
        },
      },
    },
  };

  gridOptions.api!.createRangeChart(params);
}

function onChart2() {
  var params: CreateRangeChartParams = {
    cellRange: {
      columns: ["country", "bronze"],
    },
    chartType: "groupedBar",
    chartThemeName: "ag-pastel",
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Bronze Medal by Country",
        },
        legend: {
          enabled: false,
        },
      },
    },
    unlinkChart: true,
  };

  gridOptions.api!.createRangeChart(params);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onChart1 = onChart1;
  (<any>window).onChart2 = onChart2;
}
