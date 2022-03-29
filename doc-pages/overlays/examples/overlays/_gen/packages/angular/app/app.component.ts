import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="onBtShowLoading()">Show Loading Overlay</button>
      <button (click)="onBtShowNoRows()">Show No Rows Overlay</button>
      <button (click)="onBtHide()">Hide Overlay</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [overlayLoadingTemplate]="overlayLoadingTemplate"
      [overlayNoRowsTemplate]="overlayNoRowsTemplate"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 200 },
    { field: "age" },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "date", minWidth: 180 },
    { field: "sport", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
  };
  public overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  public overlayNoRowsTemplate =
    "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
  }

  onBtShowNoRows() {
    this.gridApi.showNoRowsOverlay();
  }

  onBtHide() {
    this.gridApi.hideOverlay();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
