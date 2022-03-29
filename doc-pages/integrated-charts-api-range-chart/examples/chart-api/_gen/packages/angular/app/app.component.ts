import { Component } from "@angular/core";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  CreateRangeChartParams,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<div class="outer-div">
    <div class="button-bar">
      <button (click)="onChart1()">Top 5 Medal Winners</button>
      <button (click)="onChart2()">Bronze Medals by Country</button>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowData]="rowData"
        [enableRangeSelection]="true"
        [enableCharts]="true"
        [popupParent]="popupParent"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "country", width: 150, chartDataType: "category" },
    { field: "gold", chartDataType: "series", sort: "desc" },
    { field: "silver", chartDataType: "series", sort: "desc" },
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
  public rowData: any[] | null = getData();
  public popupParent: HTMLElement = document.body;

  onChart1() {
    var params: CreateRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ["country", "gold", "silver"],
      },
      chartType: "groupedColumn",
      chartThemeName: "ag-vivid",
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: "Top 5 Medal Winners",
          },
        },
      },
    };
    this.gridApi.createRangeChart(params);
  }

  onChart2() {
    var params: CreateRangeChartParams = {
      cellRange: {
        columns: ["country", "bronze"],
      },
      chartType: "groupedBar",
      chartThemeName: "ag-pastel",
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: "Bronze Medal by Country",
          },
          legend: {
            enabled: false,
          },
        },
      },
      unlinkChart: true,
    };
    this.gridApi.createRangeChart(params);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
