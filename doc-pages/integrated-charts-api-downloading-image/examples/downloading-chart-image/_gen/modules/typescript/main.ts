import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  AgChartThemeOverrides,
  ChartCreated,
  ColDef,
  ColGroupDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  GetChartImageDataUrlParams,
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
  onFirstDataRendered: onFirstDataRendered,
  onChartCreated: onChartCreated,
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  const createRangeChartParams: CreateRangeChartParams = {
    cellRange: {
      columns: ["country", "sugar", "fat", "weight"],
    },
    chartType: "groupedColumn",
    chartContainer: document.querySelector("#myChart") as any,
  };

  params.api.createRangeChart(createRangeChartParams);
}

var chartId: string | undefined;
function onChartCreated(event: ChartCreated) {
  chartId = event.chartId;
}

function downloadChartImage(fileFormat: string) {
  if (!chartId) {
    return;
  }

  const params: GetChartImageDataUrlParams = { fileFormat, chartId };
  const imageDataURL = gridOptions.api!.getChartImageDataURL(params);

  if (imageDataURL) {
    const a = document.createElement("a");
    a.href = imageDataURL;
    a.download = "image";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

function openChartImage(fileFormat: string) {
  if (!chartId) {
    return;
  }

  const params: GetChartImageDataUrlParams = { fileFormat, chartId };
  const imageDataURL = gridOptions.api!.getChartImageDataURL(params);

  if (imageDataURL) {
    const image = new Image();
    image.src = imageDataURL;

    const w = window.open("")!;
    w.document.write(image.outerHTML);
    w.document.close();
  }
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).downloadChartImage = downloadChartImage;
  (<any>window).openChartImage = openChartImage;
}
