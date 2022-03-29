import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColumnSparklineOptions,
  Grid,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { SparklinesModule } from "@ag-grid-enterprise/sparklines";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule]);
declare function getStockData(): any[];

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "symbol", maxWidth: 110 },
    { field: "name", minWidth: 250 },
    {
      field: "rateOfChange",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "column",
          xKey: "xVal",
          yKey: "yVal",
          axis: {
            type: "number",
          },
        } as ColumnSparklineOptions,
      },
    },
    { field: "volume", type: "numericColumn", maxWidth: 140 },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  rowData: getStockData(),
  rowHeight: 50,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
