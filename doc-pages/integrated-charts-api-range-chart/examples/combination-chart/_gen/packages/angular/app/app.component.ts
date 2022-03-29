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
  ValueGetterParams,
  ValueParserParams,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<div class="wrapper">
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [enableRangeSelection]="true"
      [chartThemes]="chartThemes"
      [enableCharts]="true"
      [popupParent]="popupParent"
      [chartThemeOverrides]="chartThemeOverrides"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    <div id="myChart" class="ag-theme-alpine"></div>
  </div>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "day", maxWidth: 90 },
    { field: "month", chartDataType: "category" },
    { field: "rain", chartDataType: "series", valueParser: numberParser },
    { field: "pressure", chartDataType: "series", valueParser: numberParser },
    { field: "temp", chartDataType: "series", valueParser: numberParser },
    { field: "wind", chartDataType: "series", valueParser: numberParser },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    editable: true,
    sortable: true,
    filter: true,
    resizable: true,
  };
  public rowData: any[] | null = getData();
  public chartThemes: string[] = ["ag-pastel", "ag-vivid"];
  public popupParent: HTMLElement = document.body;
  public chartThemeOverrides: AgChartThemeOverrides = {
    common: {
      padding: {
        right: 40,
      },
      legend: {
        position: "bottom",
      },
    },
    column: {
      series: {
        strokeWidth: 2,
        fillOpacity: 0.8,
      },
    },
    line: {
      series: {
        strokeWidth: 5,
        strokeOpacity: 0.8,
      },
    },
  };

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api!.createRangeChart({
      chartType: "customCombo",
      cellRange: {
        columns: ["month", "rain", "pressure", "temp"],
      },
      seriesChartTypes: [
        { colId: "rain", chartType: "groupedColumn", secondaryAxis: false },
        { colId: "pressure", chartType: "line", secondaryAxis: true },
        { colId: "temp", chartType: "line", secondaryAxis: true },
      ],
      aggFunc: "sum",
      suppressChartRanges: true,
      chartContainer: document.querySelector("#myChart") as any,
    });
  }

  onGridReady(params: GridReadyEvent) {}
}

function numberParser(params: ValueParserParams) {
  const value = params.newValue;
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return parseFloat(value);
}
