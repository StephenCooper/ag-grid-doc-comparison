import {
  ChartModel,
  ChartRef,
  ColDef,
  GridApi,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="wrapper">
    <div id="buttons">
      <button (click)="saveChart()">Save chart</button>
      <button (click)="clearChart()">Clear chart</button>
      <button (click)="restoreChart()">Restore chart</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [enableRangeSelection]="true"
      [popupParent]="popupParent"
      [enableCharts]="true"
      [createChartContainer]="createChartContainer"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    <div id="myChart" class="ag-theme-alpine my-chart"></div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'country', chartDataType: 'category' },
    { field: 'sugar', chartDataType: 'series' },
    { field: 'fat', chartDataType: 'series' },
    { field: 'weight', chartDataType: 'series' },
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

  saveChart() {
    var chartModels = this.gridApi.getChartModels() || [];
    if (chartModels.length > 0) {
      chartModel = chartModels[0];
    }
    alert('Chart saved!');
  }

  clearChart() {
    if (currentChartRef) {
      currentChartRef.destroyChart();
      currentChartRef = null;
    }
  }

  restoreChart() {
    if (!chartModel) return;
    currentChartRef = this.gridApi.restoreChart(chartModel)!;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  createChartContainer(chartRef: ChartRef) {
    // destroy existing chart
    if (currentChartRef) {
      currentChartRef.destroyChart();
    }
    var eChart = chartRef.chartElement;
    var eParent = document.querySelector('#myChart') as any;
    eParent.appendChild(eChart);
    currentChartRef = chartRef;
  }
}

var chartModel: ChartModel | null;
var currentChartRef: ChartRef | null;
