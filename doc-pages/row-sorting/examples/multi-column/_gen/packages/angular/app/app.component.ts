import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, ColumnState, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [multiSortKey]="multiSortKey"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete" },
    { field: "age", width: 100 },
    { field: "country" },
    { field: "year", width: 100 },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    width: 170,
    sortable: true,
  };
  public multiSortKey = "ctrl";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    var defaultSortModel: ColumnState[] = [
      { colId: "country", sort: "asc", sortIndex: 0 },
      { colId: "athlete", sort: "asc", sortIndex: 1 },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
