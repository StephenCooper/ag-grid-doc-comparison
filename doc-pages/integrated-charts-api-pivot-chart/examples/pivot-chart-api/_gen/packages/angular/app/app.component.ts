import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  CreatePivotChartParams,
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<div
    style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow: hidden;"
  >
    <ag-grid-angular
      style="width: 100%; height: 40%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [pivotMode]="true"
      [popupParent]="popupParent"
      [rowData]="rowData"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    <div
      id="chart"
      style="flex: 1 1 auto; overflow: hidden; height: 60%;"
    ></div>
  </div> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "country", pivot: true },
    { field: "year", rowGroup: true },
    { field: "sport", rowGroup: true },
    { field: "total", aggFunc: "sum" },
    { field: "gold", aggFunc: "sum" },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 130,
    filter: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public popupParent: HTMLElement = document.body;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(event: FirstDataRenderedEvent) {
    var chartContainer = document.querySelector("#chart") as any;
    var params: CreatePivotChartParams = {
      chartType: "groupedColumn",
      chartContainer: chartContainer,
      chartThemeName: "ag-vivid",
      chartThemeOverrides: {
        common: {
          padding: {
            top: 20,
            left: 10,
            bottom: 30,
            right: 10,
          },
          legend: {
            enabled: true,
            position: "bottom",
          },
          navigator: {
            enabled: true,
            height: 10,
          },
        },
      },
    };
    event.api.createPivotChart(params);
    // expand one row for demonstration purposes
    setTimeout(function () {
      event.api.getDisplayedRowAtIndex(2)!.setExpanded(true);
    }, 0);
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/wide-spread-of-sports.json"
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
