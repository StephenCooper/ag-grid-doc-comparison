import { Component } from "@angular/core";
import {
  AreaSparklineOptions,
  ColDef,
  GridReadyEvent,
  TooltipRendererParams,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [rowHeight]="rowHeight"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "symbol", maxWidth: 120 },
    { field: "name", minWidth: 250 },
    {
      field: "change",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "area",
          fill: "rgba(185,173,77,0.3)",
          line: {
            stroke: "rgb(185,173,77)",
          },
          highlightStyle: {
            size: 4,
            stroke: "rgb(185,173,77)",
            fill: "rgb(185,173,77)",
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
        } as AreaSparklineOptions,
      },
    },
    {
      field: "rateOfChange",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "area",
          fill: "rgba(77,89,185, 0.3)",
          line: {
            stroke: "rgb(77,89,185)",
          },
          highlightStyle: {
            size: 4,
            stroke: "rgb(77,89,185)",
            fill: "rgb(77,89,185)",
          },
          tooltip: {
            renderer: renderer,
          },
          crosshairs: {
            xLine: {
              enabled: false,
            },
          },
        } as AreaSparklineOptions,
      },
    },
    {
      field: "volume",
      type: "numericColumn",
      maxWidth: 140,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  public rowData: any[] | null = getData();
  public rowHeight = 50;

  onGridReady(params: GridReadyEvent) {}
}

function renderer(params: TooltipRendererParams) {
  return {
    backgroundColor: "black",
    opacity: 0.5,
    color: "white",
  };
}
