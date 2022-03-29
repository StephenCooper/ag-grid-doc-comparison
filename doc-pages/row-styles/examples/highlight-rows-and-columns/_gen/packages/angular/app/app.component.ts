import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, ColGroupDef, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [columnHoverHighlight]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Participant",
      children: [{ field: "athlete" }, { field: "age" }],
    },
    {
      headerName: "Details",
      children: [
        { field: "country" },
        { field: "year" },
        { field: "date" },
        { field: "sport" },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
