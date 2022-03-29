import {
  AgChartThemeOverrides,
  ColDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  GridReadyEvent,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

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
    { field: "gold", chartDataType: "series" },
    { field: "silver", chartDataType: "series" },
    { field: "bronze", chartDataType: "series" },
    {
      headerName: "A",
      valueGetter: "Math.floor(Math.random()*1000)",
      chartDataType: "series",
    },
    {
      headerName: "B",
      valueGetter: "Math.floor(Math.random()*1000)",
      chartDataType: "series",
    },
    {
      headerName: "C",
      valueGetter: "Math.floor(Math.random()*1000)",
      chartDataType: "series",
    },
    {
      headerName: "D",
      valueGetter: "Math.floor(Math.random()*1000)",
      chartDataType: "series",
    },
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
    pie: {
      series: {
        fillOpacity: 0.8,
        strokeOpacity: 0.8,
        strokeWidth: 2,
        title: {
          enabled: true,
          fontStyle: "italic",
          fontWeight: "bold",
          fontSize: 14,
          fontFamily: "Arial, sans-serif",
          color: "maroon",
        },
        highlightStyle: {
          item: {
            fill: "red",
            stroke: "yellow",
          },
        },
        shadow: {
          color: "rgba(96, 96, 175, 0.5)",
          xOffset: 0,
          yOffset: 0,
          blur: 1,
        },
        label: {
          enabled: true,
          fontStyle: "italic",
          fontWeight: "bold",
          fontSize: 14,
          fontFamily: "Arial, sans-serif",
          color: "#2222aa",
          minAngle: 30,
        },
        callout: {
          strokeWidth: 3,
          colors: ["black", "#00ff00"],
          length: 15,
        },
        tooltip: {
          renderer: function (params) {
            return {
              content:
                "<b>" +
                params.angleName!.toUpperCase() +
                ":</b> " +
                params.angleValue +
                "<br>" +
                "<b>" +
                params.labelName!.toUpperCase() +
                ":</b> " +
                params.datum[params.labelKey!],
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
      columns: ["country", "gold", "silver"],
    };
    var createRangeChartParams: CreateRangeChartParams = {
      cellRange: cellRange,
      chartType: "doughnut",
    };
    params.api.createRangeChart(createRangeChartParams);
  }

  onGridReady(params: GridReadyEvent) {}
}
