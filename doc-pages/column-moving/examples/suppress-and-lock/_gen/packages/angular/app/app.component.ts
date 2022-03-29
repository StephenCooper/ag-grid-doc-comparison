import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<div class="wrapper">
    <div class="legend-bar">
      <span class="legend-box locked-col"></span> Position Locked Column
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span class="legend-box suppress-movable-col"></span> Suppress Movable
      Column
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
  public columnDefs: ColDef[] = [
    {
      field: "athlete",
      suppressMovable: true,
      width: 150,
      cellClass: "suppress-movable-col",
    },
    { field: "age", lockPosition: true, cellClass: "locked-col" },
    { field: "country", width: 150 },
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
    lockPinned: true, // Dont allow pinning for this example
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
