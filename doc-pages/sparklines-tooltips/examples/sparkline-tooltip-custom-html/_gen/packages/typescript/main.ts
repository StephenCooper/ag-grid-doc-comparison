import {
  Grid,
  GridOptions,
  LineSparklineOptions,
  TooltipRendererParams,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const body = document.body;

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
            stroke: "rgb(94,94,224)",
          },
          tooltip: {
            container: body,
            xOffset: 20,
            yOffset: -20,
            renderer: tooltipRenderer,
          },
          highlightStyle: {
            fill: "rgb(94,94,224)",
            strokeWidth: 0,
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

function tooltipRenderer(params: TooltipRendererParams) {
  const { yValue, context } = params;
  return `<div class='my-custom-tooltip my-custom-tooltip-arrow'>
              <div class='tooltip-title'>${context.data.symbol}</div>
              <div class='tooltip-content'>
                <div>Change: ${yValue}</div>
                <div>Volume: ${context.data.volume}</div>
              </div>
          </div>`;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
