import { Component } from "@angular/core";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  LineSparklineOptions,
  TooltipRendererParams,
} from "ag-grid-community";

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
          tooltip: {
            renderer: tooltipRenderer,
          },
          line: {
            stroke: "rgb(103,103,255)",
            strokeWidth: 1,
          },
          highlightStyle: {
            fill: "white",
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

function tooltipRenderer(params: TooltipRendererParams) {
  return {
    title: params.context.data.symbol,
    // sets styles for tooltip
    color: "white",
    backgroundColor: "rgb(78,78,255)",
    opacity: 0.7,
  };
}
