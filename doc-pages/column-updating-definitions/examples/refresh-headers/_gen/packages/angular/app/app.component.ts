import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { CustomHeader } from "./custom-header.component";

@Component({
  selector: "my-app",
  template: `<div class="test-container">
    <div class="test-header">
      <button (click)="onBtUpperNames()">Upper Header Names</button>
      <button (click)="onBtLowerNames()">Lower Lower Names</button>
      &nbsp;&nbsp;&nbsp;
      <button (click)="onBtFilterOn()">Filter On</button>
      <button (click)="onBtFilterOff()">Filter Off</button>
      &nbsp;&nbsp;&nbsp;
      <button (click)="onBtResizeOn()">Resize On</button>
      <button (click)="onBtResizeOff()">Resize Off</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      [defaultColDef]="defaultColDef"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    headerComponent: CustomHeader,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtUpperNames() {
    const columnDefs: ColDef[] = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.headerName = c.field!.toUpperCase();
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  onBtLowerNames() {
    const columnDefs: ColDef[] = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.headerName = c.field;
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  onBtFilterOn() {
    const columnDefs: ColDef[] = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.filter = true;
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  onBtFilterOff() {
    const columnDefs: ColDef[] = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.filter = false;
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  onBtResizeOn() {
    const columnDefs: ColDef[] = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.resizable = true;
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  onBtResizeOff() {
    const columnDefs: ColDef[] = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.resizable = false;
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
