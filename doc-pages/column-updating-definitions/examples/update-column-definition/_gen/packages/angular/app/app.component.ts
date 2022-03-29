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

@Component({
  selector: "my-app",
  template: `<div class="test-container">
    <div class="test-header">
      <button (click)="setHeaderNames()">Set Header Names</button>
      <button (click)="removeHeaderNames()">Remove Header Names</button>
      <button (click)="setValueFormatters()">Set Value Formatters</button>
      <button (click)="removeValueFormatters()">Remove Value Formatters</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [defaultColDef]="defaultColDef"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    initialWidth: 100,
    sortable: true,
    resizable: true,
    filter: true,
  };
  public columnDefs: ColDef[] = getColumnDefs();
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  setHeaderNames() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.headerName = "C" + index;
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  removeHeaderNames() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.headerName = undefined;
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  setValueFormatters() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.valueFormatter = function (params) {
        return "[ " + params.value + " ]";
      };
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  removeValueFormatters() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.valueFormatter = undefined;
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}

function getColumnDefs() {
  return [
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
}
