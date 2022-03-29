import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
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
declare var window: any;

@Component({
  selector: "my-app",
  template: `<div class="test-container">
    <div class="test-header">
      <div class="example-section">
        Column State:
        <button (click)="saveState()">Save State</button>
        <button (click)="restoreState()">Restore State</button>
        <button (click)="resetState()">Reset State</button>
      </div>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridColumnApi!: ColumnApi;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Athlete",
      children: [
        { field: "athlete" },
        { field: "country", columnGroupShow: "open" },
        { field: "sport", columnGroupShow: "open" },
        { field: "year", columnGroupShow: "open" },
        { field: "date", columnGroupShow: "open" },
      ],
    },
    {
      headerName: "Medals",
      children: [
        { field: "total", columnGroupShow: "closed" },
        { field: "gold", columnGroupShow: "open" },
        { field: "silver", columnGroupShow: "open" },
        { field: "bronze", columnGroupShow: "open" },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    width: 150,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  saveState() {
    window.groupState = this.gridColumnApi.getColumnGroupState();
    console.log("group state saved", window.groupState);
    console.log("column state saved");
  }

  restoreState() {
    if (!window.groupState) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }
    this.gridColumnApi.setColumnGroupState(window.groupState);
    console.log("column state restored");
  }

  resetState() {
    this.gridColumnApi.resetColumnGroupState();
    console.log("column state reset");
  }

  onGridReady(params: GridReadyEvent) {
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
