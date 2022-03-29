import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, ColGroupDef, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div class="legend-bar">
      <span class="legend-box resizable-header"></span> Resizable Column
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span class="legend-box fixed-size-header"></span> Fixed Width Column
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
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Everything Resizes",
      children: [
        {
          field: "athlete",
          headerClass: "resizable-header",
        },
        { field: "age", headerClass: "resizable-header" },
        {
          field: "country",
          headerClass: "resizable-header",
        },
      ],
    },
    {
      headerName: "Only Year Resizes",
      children: [
        { field: "year", headerClass: "resizable-header" },
        {
          field: "date",
          resizable: false,
          headerClass: "fixed-size-header",
        },
        {
          field: "sport",
          resizable: false,
          headerClass: "fixed-size-header",
        },
      ],
    },
    {
      headerName: "Nothing Resizes",
      children: [
        {
          field: "gold",
          resizable: false,
          headerClass: "fixed-size-header",
        },
        {
          field: "silver",
          resizable: false,
          headerClass: "fixed-size-header",
        },
        {
          field: "bronze",
          resizable: false,
          headerClass: "fixed-size-header",
        },
        {
          field: "total",
          resizable: false,
          headerClass: "fixed-size-header",
        },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    width: 150,
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
