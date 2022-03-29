import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, ColGroupDef, GridReadyEvent } from "ag-grid-community";
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
    [rowData]="rowData"
    [groupHeaderHeight]="groupHeaderHeight"
    [headerHeight]="headerHeight"
    [floatingFiltersHeight]="floatingFiltersHeight"
    [pivotGroupHeaderHeight]="pivotGroupHeaderHeight"
    [pivotHeaderHeight]="pivotHeaderHeight"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Athlete Details",
      children: [
        {
          field: "athlete",
          width: 150,
          suppressSizeToFit: true,
          enableRowGroup: true,
          rowGroupIndex: 0,
        },
        {
          field: "age",
          width: 90,
          minWidth: 75,
          maxWidth: 100,
          enableRowGroup: true,
        },
        {
          field: "country",
          width: 120,
          enableRowGroup: true,
        },
        {
          field: "year",
          width: 90,
          enableRowGroup: true,
          pivotIndex: 0,
        },
        { field: "sport", width: 110, enableRowGroup: true },
        {
          field: "gold",
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
        },
        {
          field: "silver",
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
        },
        {
          field: "bronze",
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
        },
        {
          field: "total",
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
        },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
  };
  public groupHeaderHeight = 75;
  public headerHeight = 150;
  public floatingFiltersHeight = 50;
  public pivotGroupHeaderHeight = 50;
  public pivotHeaderHeight = 100;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
