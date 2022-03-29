import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  ColumnApi,
  GridReadyEvent,
  SideBarDef,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="onBtNormal()">1 - Grouping Active</button>
      <button (click)="onBtPivotMode()">
        2 - Grouping Active with Pivot Mode
      </button>
      <button (click)="onBtFullPivot()">
        3 - Grouping Active with Pivot Mode and Pivot Active
      </button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [sideBar]="sideBar"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
    { field: "country", rowGroup: true, enableRowGroup: true },
    { field: "year", rowGroup: true, enableRowGroup: true, enablePivot: true },
    { field: "date" },
    { field: "sport" },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 250,
  };
  public sideBar: SideBarDef | string | boolean | null = "columns";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtNormal() {
    this.gridColumnApi.setPivotMode(false);
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "country", rowGroup: true },
        { colId: "year", rowGroup: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }

  onBtPivotMode() {
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "country", rowGroup: true },
        { colId: "year", rowGroup: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }

  onBtFullPivot() {
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "country", rowGroup: true },
        { colId: "year", pivot: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
