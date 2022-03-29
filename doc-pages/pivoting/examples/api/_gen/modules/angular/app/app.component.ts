import {
  ColDef,
  ColumnApi,
  GridApi,
  GridReadyEvent,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div style="margin-bottom: 5px;">
      <div>
        <button (click)="turnOnPivotMode()">Pivot Mode On</button>
        <button (click)="turnOffPivotMode()">Pivot Mode Off</button>
        <button (click)="addPivotColumn()" style="margin-left: 15px;">
          Pivot Country
        </button>
        <button (click)="addPivotColumns()">Pivot Year &amp; Country</button>
        <button (click)="removePivotColumn()">Un-Pivot Country</button>
      </div>
      <div style="margin-top: 5px;">
        <button (click)="emptyPivotColumns()">Remove All Pivots</button>
        <button (click)="exportToCsv()" style="margin-left: 15px;">
          CSV Export
        </button>
      </div>
    </div>
    <div style="height: calc(100% - 60px);">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [autoGroupColumnDef]="autoGroupColumnDef"
        [sideBar]="true"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
    {
      field: "athlete",
      enableRowGroup: true,
      enablePivot: true,
      minWidth: 200,
    },
    { field: "age", enableValue: true },
    { field: "country", enableRowGroup: true, enablePivot: true },
    { field: "year", enableRowGroup: true, enablePivot: true },
    { field: "date", enableRowGroup: true, enablePivot: true },
    { field: "sport", enableRowGroup: true, enablePivot: true, minWidth: 200 },
    { field: "gold", enableValue: true, aggFunc: "sum" },
    { field: "silver", enableValue: true },
    { field: "bronze", enableValue: true },
    { field: "total", enableValue: true },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 250,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  turnOffPivotMode() {
    this.gridColumnApi.setPivotMode(false);
  }

  turnOnPivotMode() {
    this.gridColumnApi.setPivotMode(true);
  }

  addPivotColumn() {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "country", pivot: true }],
      defaultState: { pivot: false },
    });
  }

  addPivotColumns() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "year", pivot: true },
        { colId: "country", pivot: true },
      ],
      defaultState: { pivot: false },
    });
  }

  removePivotColumn() {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "country", pivot: false }],
    });
  }

  emptyPivotColumns() {
    this.gridColumnApi.applyColumnState({
      defaultState: { pivot: false },
    });
  }

  exportToCsv() {
    this.gridApi.exportDataAsCsv();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
