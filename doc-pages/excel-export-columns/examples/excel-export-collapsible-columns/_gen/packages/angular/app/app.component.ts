import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  ExcelExportParams,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<div class="container">
    <div class="columns">
      <div>
        <button (click)="onBtExport()" style="font-weight: bold;">
          Export to Excel
        </button>
      </div>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowData]="rowData"
        [defaultExcelExportParams]="defaultExcelExportParams"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Athlete Details",
      children: [
        {
          field: "athlete",
          width: 180,
          filter: "agTextColumnFilter",
        },
        {
          field: "age",
          width: 90,
          filter: "agNumberColumnFilter",
        },
        { headerName: "Country", field: "country", width: 140 },
      ],
    },
    {
      headerName: "Sports Results",
      children: [
        { field: "sport", width: 140 },
        {
          columnGroupShow: "closed",
          field: "total",
          width: 100,
          filter: "agNumberColumnFilter",
        },
        {
          columnGroupShow: "open",
          field: "gold",
          width: 100,
          filter: "agNumberColumnFilter",
        },
        {
          columnGroupShow: "open",
          field: "silver",
          width: 100,
          filter: "agNumberColumnFilter",
        },
        {
          columnGroupShow: "open",
          field: "bronze",
          width: 100,
          filter: "agNumberColumnFilter",
        },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };
  public defaultExcelExportParams: ExcelExportParams = {
    allColumns: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExport() {
    this.gridApi.exportDataAsExcel();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
