import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  AgChartThemeOverrides,
  ColDef,
  ColGroupDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
} from "ag-grid-community";

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "country", width: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
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
  enableRangeSelection: true,
  enableCharts: true,
  chartThemes: ["ag-pastel", "ag-material-dark", "ag-vivid-dark", "ag-solar"],
  chartThemeOverrides: {
    cartesian: {
      axes: {
        category: {
          label: {
            rotation: 335,
          },
        },
      },
    },
  },
  rowData: getData(),
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  var createRangeChartParams: CreateRangeChartParams = {
    cellRange: {
      rowStartIndex: 0,
      rowEndIndex: 79,
      columns: ["country", "gold", "silver", "bronze"],
    },
    chartType: "groupedColumn",
    chartContainer: document.querySelector("#myChart") as any,
    aggFunc: "sum",
  };

  params.api.createRangeChart(createRangeChartParams);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
