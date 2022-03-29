import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";
import { CustomHeaderGroup } from "./custom-header-group.component";

@Component({
  selector: "my-app",
  template: `
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      [defaultColDef]="defaultColDef"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})
export class AppComponent {
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Athlete Details",
      headerGroupComponent: CustomHeaderGroup,
      children: [
        { field: "athlete", width: 150 },
        { field: "age", width: 90, columnGroupShow: "open" },
        {
          field: "country",
          width: 120,
          columnGroupShow: "open",
        },
      ],
    },
    {
      headerName: "Medal details",
      headerGroupComponent: CustomHeaderGroup,
      children: [
        { field: "year", width: 90 },
        { field: "date", width: 110 },
        {
          field: "sport",
          width: 110,
          columnGroupShow: "open",
        },
        {
          field: "gold",
          width: 100,
          columnGroupShow: "open",
        },
        {
          field: "silver",
          width: 100,
          columnGroupShow: "open",
        },
        {
          field: "bronze",
          width: 100,
          columnGroupShow: "open",
        },
        {
          field: "total",
          width: 100,
          columnGroupShow: "open",
        },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    width: 100,
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
