import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
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
    <div class="example-header">
      <span class="legend-box lock-pinned"></span> Locked Column
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
  public columnDefs: ColDef[] = [
    {
      headerName: "Athlete (locked as pinned)",
      field: "athlete",
      width: 240,
      pinned: "left",
      lockPinned: true,
      cellClass: "lock-pinned",
    },
    {
      headerName: "Age (locked as not pinnable)",
      field: "age",
      width: 260,
      lockPinned: true,
      cellClass: "lock-pinned",
    },
    { field: "country", width: 150 },
    { field: "year", width: 90 },
    { field: "date", width: 150 },
    { field: "sport", width: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
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
