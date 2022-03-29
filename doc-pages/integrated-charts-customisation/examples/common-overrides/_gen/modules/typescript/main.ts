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
  rowData: getData(),
  enableRangeSelection: true,
  enableCharts: true,
  onFirstDataRendered: onFirstDataRendered,
  chartThemeOverrides: {
    common: {
      padding: {
        top: 20,
        right: 30,
        bottom: 10,
        left: 2,
      },
      background: {
        fill: "#e5e5e5",
      },
      title: {
        enabled: true,
        text: "Precious Metals Production",
        fontStyle: "italic",
        fontWeight: "600",
        fontSize: 18,
        fontFamily: "Impact, sans-serif",
        color: "#414182",
      },
      subtitle: {
        enabled: true,
        text: "by country",
        fontSize: 14,
        fontFamily: "Monaco, monospace",
        color: "rgb(100, 100, 100)",
      },
      legend: {
        enabled: true,
        position: "left",
        spacing: 20,
        item: {
          label: {
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 18,
            fontFamily: "Palatino, serif",
            color: "#555",
          },
          marker: {
            shape: "diamond",
            size: 10,
            padding: 10,
            strokeWidth: 2,
          },
          paddingX: 120,
          paddingY: 20,
        },
      },
      tooltip: {
        class: "my-tooltip-class",
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
    chartType: "groupedBar",
  };

  params.api.createRangeChart(createRangeChartParams);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
