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
  ValueGetterParams,
  ValueParserParams,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  RowGroupingModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "day", maxWidth: 90 },
    { field: "month", chartDataType: "category" },
    { field: "rain", chartDataType: "series", valueParser: numberParser },
    { field: "pressure", chartDataType: "series", valueParser: numberParser },
    { field: "temp", chartDataType: "series", valueParser: numberParser },
    { field: "wind", chartDataType: "series", valueParser: numberParser },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    editable: true,
    sortable: true,
    filter: true,
    resizable: true,
  },
  rowData: getData(),
  onFirstDataRendered: onFirstDataRendered,
  enableRangeSelection: true,
  chartThemes: ["ag-pastel", "ag-vivid"],
  enableCharts: true,
  popupParent: document.body,
  chartThemeOverrides: {
    common: {
      padding: {
        right: 40,
      },
      legend: {
        position: "bottom",
      },
    },
    column: {
      series: {
        strokeWidth: 2,
        fillOpacity: 0.8,
      },
    },
    line: {
      series: {
        strokeWidth: 5,
        strokeOpacity: 0.8,
      },
    },
  },
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api!.createRangeChart({
    chartType: "customCombo",
    cellRange: {
      columns: ["month", "rain", "pressure", "temp"],
    },
    seriesChartTypes: [
      { colId: "rain", chartType: "groupedColumn", secondaryAxis: false },
      { colId: "pressure", chartType: "line", secondaryAxis: true },
      { colId: "temp", chartType: "line", secondaryAxis: true },
    ],
    aggFunc: "sum",
    suppressChartRanges: true,
    chartContainer: document.querySelector("#myChart") as any,
  });
}

function numberParser(params: ValueParserParams) {
  const value = params.newValue;
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return parseFloat(value);
}

// set up the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
