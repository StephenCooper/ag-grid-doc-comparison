import { Component } from "@angular/core";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  AgChartThemeOverrides,
  ColDef,
  ColGroupDef,
  ColumnApi,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [popupParent]="popupParent"
    [rowData]="rowData"
    [enableRangeSelection]="true"
    [enableCharts]="true"
    [chartThemeOverrides]="chartThemeOverrides"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "country", width: 150, chartDataType: "category" },
    { field: "total", chartDataType: "series" },
    { field: "gold", chartDataType: "series" },
    { field: "silver", chartDataType: "series" },
    { field: "bronze", chartDataType: "series" },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public popupParent: HTMLElement = document.body;
  public rowData: any[] | null = getData();
  public chartThemeOverrides: AgChartThemeOverrides = {
    scatter: {
      series: {
        fillOpacity: 0.7,
        strokeOpacity: 0.6,
        strokeWidth: 2,
        highlightStyle: {
          item: {
            fill: "red",
            stroke: "yellow",
          },
        },
        marker: {
          enabled: true,
          shape: "square",
          size: 5,
          maxSize: 12,
          strokeWidth: 4,
        },
        tooltip: {
          renderer: function (params) {
            var label = params.datum[params.labelKey!];
            var size = params.datum[params.sizeKey!];
            return {
              content:
                (label != null
                  ? "<b>" +
                    params.labelName!.toUpperCase() +
                    ":</b> " +
                    label +
                    "<br/>"
                  : "") +
                "<b>" +
                params.xName!.toUpperCase() +
                ":</b> " +
                params.xValue +
                "<br/>" +
                "<b>" +
                params.yName!.toUpperCase() +
                ":</b> " +
                params.yValue +
                (size != null
                  ? "<br/><b>" +
                    params.sizeName!.toUpperCase() +
                    ":</b> " +
                    size
                  : ""),
            };
          },
        },
      },
    },
  };

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ["country", "total", "gold", "silver", "bronze"],
    };
    var createRangeChartParams: CreateRangeChartParams = {
      cellRange: cellRange,
      chartType: "scatter",
    };
    params.api.createRangeChart(createRangeChartParams);
  }

  onGridReady(params: GridReadyEvent) {}
}
