import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 1rem;">
      <button (click)="onBtSuppressRowDrag()">Suppress</button>
      <button (click)="onBtShowRowDrag()">Remove Suppress</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowDragManaged]="true"
      [animateRows]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", rowDrag: true },
    { field: "country" },
    { field: "year", width: 100 },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  public defaultColDef: ColDef = {
    width: 170,
    sortable: true,
    filter: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtSuppressRowDrag() {
    this.gridApi.setSuppressRowDrag(true);
  }

  onBtShowRowDrag() {
    this.gridApi.setSuppressRowDrag(false);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
