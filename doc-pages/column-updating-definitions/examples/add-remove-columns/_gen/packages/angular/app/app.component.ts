import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<div class="test-container">
    <div class="test-header">
      <button (click)="onBtExcludeMedalColumns()">Exclude Medal Columns</button>
      <button (click)="onBtIncludeMedalColumns()">Include Medal Columns</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = columnDefsMedalsIncluded;
  public defaultColDef: ColDef = {
    initialWidth: 100,
    sortable: true,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExcludeMedalColumns() {
    this.gridApi.setColumnDefs(colDefsMedalsExcluded);
  }

  onBtIncludeMedalColumns() {
    this.gridApi.setColumnDefs(columnDefsMedalsIncluded);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

const columnDefsMedalsIncluded: ColDef[] = [
  { field: "athlete" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
  { field: "age" },
  { field: "country" },
  { field: "sport" },
  { field: "year" },
  { field: "date" },
];
const colDefsMedalsExcluded: ColDef[] = [
  { field: "athlete" },
  { field: "age" },
  { field: "country" },
  { field: "sport" },
  { field: "year" },
  { field: "date" },
];
