import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [sideBar]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete", filter: "agTextColumnFilter", minWidth: 200 },
    { field: "age" },
    { field: "country", minWidth: 180 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    sortable: true,
    filter: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
