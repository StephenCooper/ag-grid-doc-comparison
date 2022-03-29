import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ChartCreated,
  ChartDestroyed,
  ChartOptionsChanged,
  ChartRangeSelectionChanged,
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [popupParent]="popupParent"
    [enableRangeSelection]="true"
    [enableCharts]="true"
    [rowData]="rowData"
    (chartCreated)="onChartCreated($event)"
    (chartRangeSelectionChanged)="onChartRangeSelectionChanged($event)"
    (chartOptionsChanged)="onChartOptionsChanged($event)"
    (chartDestroyed)="onChartDestroyed($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "Month", width: 150, chartDataType: "category" },
    { field: "Sunshine (hours)", chartDataType: "series" },
    { field: "Rainfall (mm)", chartDataType: "series" },
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

  onChartCreated(event: ChartCreated) {
    console.log("Created chart with ID " + event.chartId, event);
  }

  onChartRangeSelectionChanged(event: ChartRangeSelectionChanged) {
    console.log(
      "Changed range selection of chart with ID " + event.chartId,
      event
    );
  }

  onChartOptionsChanged(event: ChartOptionsChanged) {
    console.log("Changed options of chart with ID " + event.chartId, event);
  }

  onChartDestroyed(event: ChartDestroyed) {
    console.log("Destroyed chart with ID " + event.chartId, event);
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/weather-se-england.json"
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
