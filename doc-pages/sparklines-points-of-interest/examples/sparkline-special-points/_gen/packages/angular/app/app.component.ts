import { Component } from "@angular/core";
import {
  AreaSparklineOptions,
  ColDef,
  ColumnFormatterParams,
  ColumnSparklineOptions,
  GridReadyEvent,
  LineSparklineOptions,
  MarkerFormatterParams,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [rowHeight]="rowHeight"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public rowHeight = 70;
  public columnDefs: ColDef[] = [
    {
      field: "sparkline",
      headerName: "Line Sparkline",
      minWidth: 100,
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          line: {
            stroke: "rgb(124, 255, 178)",
            strokeWidth: 3,
          },
          padding: {
            top: 10,
            bottom: 10,
          },
          marker: {
            shape: "diamond",
            formatter: lineMarkerFormatter,
          },
        } as LineSparklineOptions,
      },
    },
    {
      field: "sparkline",
      headerName: "Column Sparkline",
      minWidth: 100,
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "column",
          padding: {
            top: 10,
            bottom: 10,
          },
          formatter: columnFormatter,
        } as ColumnSparklineOptions,
      },
    },
    {
      field: "sparkline",
      headerName: "Area Sparkline",
      minWidth: 100,
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "area",
          fill: "rgba(84, 112, 198, 0.3)",
          line: {
            stroke: "rgb(84, 112, 198)",
          },
          padding: {
            top: 10,
            bottom: 10,
          },
          marker: {
            formatter: areaMarkerFormatter,
          },
        } as AreaSparklineOptions,
      },
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  public rowData: any[] | null = getData();

  onGridReady(params: GridReadyEvent) {}
}

const colors = {
  firstLast: "rgb(253, 221, 96)",
  min: "rgb(239, 108, 0)",
  max: "rgb(59, 162, 114)",
  negative: "rgb(255, 110, 118)",
  positive: "rgba(0,128,0, 0.3)",
  highlighted: "rgb(88, 217, 249)",
};
function lineMarkerFormatter(params: MarkerFormatterParams) {
  const { min, max, first, last, highlighted } = params;
  const color = highlighted
    ? colors.highlighted
    : min
    ? colors.min
    : max
    ? colors.max
    : colors.firstLast;
  return {
    size: highlighted || min || max || first || last ? 5 : 0,
    fill: color,
    stroke: color,
  };
}
function columnFormatter(params: ColumnFormatterParams) {
  const { first, last, yValue, highlighted } = params;
  let fill = undefined;
  if (!highlighted) {
    if (first || last) {
      fill = colors.firstLast;
    } else if (yValue < 0) {
      fill = colors.negative;
    } else {
      fill = colors.positive;
    }
  } else {
    fill = colors.highlighted;
  }
  return { fill };
}
function areaMarkerFormatter(params: MarkerFormatterParams) {
  const { min, max, first, last, highlighted } = params;
  const color = highlighted
    ? colors.highlighted
    : min
    ? colors.min
    : max
    ? colors.max
    : colors.firstLast;
  return {
    size: highlighted || min || max || first || last ? 5 : 0,
    fill: color,
    stroke: color,
  };
}
