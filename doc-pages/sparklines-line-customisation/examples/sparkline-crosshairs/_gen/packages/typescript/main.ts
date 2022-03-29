import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  LineSparklineOptions,
  TooltipRendererParams,
} from "ag-grid-community";

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "symbol", maxWidth: 120 },
    { field: "name", minWidth: 250 },
    {
      field: "change",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          line: {
            stroke: "rgb(52, 168, 83)",
          },
          highlightStyle: {
            size: 4,
            stroke: "rgb(52, 168, 83)",
            fill: "rgb(52, 168, 83)",
          },
          tooltip: {
            renderer: renderer,
          },
          crosshairs: {
            xLine: {
              enabled: true,
              lineDash: "dash",
              stroke: "rgba(0, 0, 0, 0.5)",
            },
            yLine: {
              enabled: true,
              lineDash: "dash",
              stroke: "rgba(0, 0, 0, 0.5)",
            },
          },
        } as LineSparklineOptions,
      },
    },
    {
      field: "rateOfChange",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          line: {
            stroke: "rgb(168,52,137)",
          },
          highlightStyle: {
            size: 4,
            stroke: "rgb(168,52,137)",
            fill: "rgb(168,52,137)",
          },
          tooltip: {
            renderer: renderer,
          },
          crosshairs: {
            xLine: {
              enabled: false,
            },
          },
        } as LineSparklineOptions,
      },
    },
    {
      field: "volume",
      type: "numericColumn",
      maxWidth: 140,
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  rowData: getData(),
  rowHeight: 50,
};

function renderer(params: TooltipRendererParams) {
  return {
    backgroundColor: "black",
    opacity: 0.5,
    color: "white",
  };
}
// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
