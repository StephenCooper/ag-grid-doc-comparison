import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: "athlete",
      width: 150,
      suppressSizeToFit: true,
    },
    { field: "age", width: 90, minWidth: 50, maxWidth: 100 },
    { field: "country", width: 120 },
    { field: "year", width: 90 },
    { field: "date", width: 110 },
    { field: "sport", width: 110 },
    { field: "gold", width: 100 },
    { field: "silver", width: 100 },
    { field: "bronze", width: 100 },
    { field: "total", width: 100 },
  ];
  public defaultColDef: ColDef = {
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
