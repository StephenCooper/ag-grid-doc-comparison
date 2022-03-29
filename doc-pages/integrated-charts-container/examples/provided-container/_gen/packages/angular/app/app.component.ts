import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ChartRef, ColDef, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<div id="container">
    <ag-grid-angular
      style="width: 100%; height: 300px;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [enableRangeSelection]="true"
      [enableCharts]="true"
      [popupParent]="popupParent"
      [createChartContainer]="createChartContainer"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete", width: 150, chartDataType: "category" },
    { field: "gold", chartDataType: "series" },
    { field: "silver", chartDataType: "series" },
    { field: "bronze", chartDataType: "series" },
    { field: "total", chartDataType: "series" },
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
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/wide-spread-of-sports.json"
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }

  createChartContainer(chartRef: ChartRef) {
    var eChart = chartRef.chartElement;
    var eTemp = document.createElement("div");
    eTemp.innerHTML = chartPanelTemplate;
    var eChartWrapper = eTemp.firstChild as any;
    var eParent = document.querySelector("#container") as HTMLElement;
    eParent.appendChild(eChartWrapper);
    eChartWrapper.querySelector(".chart-wrapper-body").appendChild(eChart);
    eChartWrapper.querySelector(".chart-wrapper-title").innerText =
      "Chart Created At " + new Date();
    eChartWrapper
      .querySelector(".chart-wrapper-close")
      .addEventListener("click", function () {
        chartRef.destroyChart();
        eParent.removeChild(eChartWrapper);
      });
  }
}

var chartPanelTemplate =
  '<div class="chart-wrapper ag-theme-alpine">' +
  '<div class="chart-wrapper-top">' +
  '<span class="chart-wrapper-title"></span>' +
  '<button class="chart-wrapper-close">Destroy Chart</button>' +
  "</div>" +
  '<div class="chart-wrapper-body"></div>' +
  "</div>";
