import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Column,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 1rem;">
      <button (click)="onMedalsFirst()">Medals First</button>
      <button (click)="onMedalsLast()">Medals Last</button>
      <button (click)="onCountryFirst()">Country First</button>
      <button (click)="onSwapFirstTwo()">Swap First Two</button>
      <button (click)="onPrintColumns()">Print Columns</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [suppressDragLeaveHidesColumns]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridColumnApi!: ColumnApi;

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
    width: 150,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onMedalsFirst() {
    this.gridColumnApi.moveColumns(["gold", "silver", "bronze", "total"], 0);
  }

  onMedalsLast() {
    this.gridColumnApi.moveColumns(["gold", "silver", "bronze", "total"], 6);
  }

  onCountryFirst() {
    this.gridColumnApi.moveColumn("country", 0);
  }

  onSwapFirstTwo() {
    this.gridColumnApi.moveColumnByIndex(0, 1);
  }

  onPrintColumns() {
    const cols = this.gridColumnApi.getAllGridColumns();
    const colToNameFunc = (col: Column, index: number) =>
      index + " = " + col.getId();
    const colNames = cols.map(colToNameFunc).join(", ");
    console.log("columns are: " + colNames);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
