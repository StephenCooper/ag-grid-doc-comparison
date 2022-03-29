import { Component } from "@angular/core";
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
  template: `<div
    style="height: 100%; width: 100%; display: flex; flex-direction: column;"
  >
    <div style="margin-bottom: 5px; min-height: 30px;">
      <button (click)="onRowDataA()">Row Data A</button>
      <button (click)="onRowDataB()">Row Data B</button>
    </div>
    <div style="flex: 1 1 0px;">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [rowData]="rowData"
        [rowSelection]="rowSelection"
        [animateRows]="true"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ];
  public rowData: any[] | null = rowDataA;
  public rowSelection = "single";

  onRowDataA() {
    this.gridApi.setRowData(rowDataA);
  }

  onRowDataB() {
    this.gridApi.setRowData(rowDataB);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

// specify the data
var rowDataA = [
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Aston Martin", model: "DBX", price: 190000 },
];
var rowDataB = [
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "BMW", model: "M50", price: 60000 },
  { make: "Aston Martin", model: "DBX", price: 190000 },
];
