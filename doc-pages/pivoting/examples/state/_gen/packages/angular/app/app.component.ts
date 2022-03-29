import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  ColumnApi,
  ColumnState,
  GridReadyEvent,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<div style="height: 100%; display: flex; flex-direction: column;">
    <div style="margin-bottom: 5px;">
      <button (click)="saveState()">Save State</button>
      <button (click)="restoreState()">Restore State</button>
      <button (click)="printState()">Print State</button>
      <button (click)="resetState()">Reset State</button>
      <button (click)="togglePivotMode()">Toggle Pivot Mode</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [sideBar]="true"
      [pivotMode]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", enableRowGroup: true, enablePivot: true },
    { field: "age", enableValue: true },
    {
      field: "country",
      enableRowGroup: true,
      enablePivot: true,
      rowGroup: true,
    },
    { field: "year", enableRowGroup: true, enablePivot: true },
    { field: "date", enableRowGroup: true, enablePivot: true },
    { field: "sport", enableRowGroup: true, enablePivot: true, pivot: true },
    { field: "gold", enableValue: true, aggFunc: "sum" },
    { field: "silver", enableValue: true, aggFunc: "sum" },
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
    minWidth: 300,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  printState() {
    var state = this.gridColumnApi.getColumnState();
    console.log(state);
  }

  saveState() {
    savedState = this.gridColumnApi.getColumnState();
    savedPivotMode = this.gridColumnApi.isPivotMode();
    console.log("column state saved");
  }

  restoreState() {
    if (savedState) {
      // Pivot mode must be set first otherwise the columns we're trying to set state for won't exist yet
      this.gridColumnApi.setPivotMode(savedPivotMode);
      this.gridColumnApi.applyColumnState({
        state: savedState,
        applyOrder: true,
      });
      console.log("column state restored");
    } else {
      console.log("no previous column state to restore!");
    }
  }

  togglePivotMode() {
    var pivotMode = this.gridColumnApi.isPivotMode();
    this.gridColumnApi.setPivotMode(!pivotMode);
  }

  resetState() {
    this.gridColumnApi.resetColumnState();
    this.gridColumnApi.setPivotMode(false);
    console.log("column state reset");
  }

  onGridReady(params: GridReadyEvent) {
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

var savedState: ColumnState[];
var savedPivotMode: boolean;
