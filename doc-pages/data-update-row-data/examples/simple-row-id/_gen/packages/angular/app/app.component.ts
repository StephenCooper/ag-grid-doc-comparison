import { Component } from "@angular/core";
import {
  ColDef,
  GetRowIdFunc,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

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
        [getRowId]="getRowId"
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
  public getRowId: GetRowIdFunc = (params) => params.data.id;

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
  { id: "1", make: "Toyota", model: "Celica", price: 35000 },
  { id: "4", make: "BMW", model: "M50", price: 60000 },
  { id: "5", make: "Aston Martin", model: "DBX", price: 190000 },
];
var rowDataB = [
  { id: "1", make: "Toyota", model: "Celica", price: 35000 },
  { id: "2", make: "Ford", model: "Mondeo", price: 32000 },
  { id: "3", make: "Porsche", model: "Boxter", price: 72000 },
  { id: "4", make: "BMW", model: "M50", price: 60000 },
  { id: "5", make: "Aston Martin", model: "DBX", price: 190000 },
];
