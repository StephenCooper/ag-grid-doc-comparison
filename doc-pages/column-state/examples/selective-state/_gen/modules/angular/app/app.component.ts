import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  SideBarDef,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts
declare var window: any;

@Component({
  selector: "my-app",
  template: `<div class="test-container">
    <div class="test-header">
      <div class="example-section">
        <button (click)="onBtSaveSortState()">Save Sort</button>
        <button (click)="onBtRestoreSortState()">Restore Sort</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button (click)="onBtSaveOrderAndVisibilityState()">
          Save Order &amp; Visibility
        </button>
        <button (click)="onBtRestoreOrderAndVisibilityState()">
          Restore Order &amp; Visibility
        </button>
      </div>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [sideBar]="sideBar"
      [rowGroupPanelShow]="rowGroupPanelShow"
      [pivotPanelShow]="pivotPanelShow"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
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
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    width: 100,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
  };
  public sideBar: SideBarDef | string | boolean | null = {
    toolPanels: ["columns"],
  };
  public rowGroupPanelShow = "always";
  public pivotPanelShow = "always";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtSaveSortState() {
    const allState = this.gridColumnApi.getColumnState();
    const sortState = allState.map((state) => ({
      colId: state.colId,
      sort: state.sort,
      sortIndex: state.sortIndex,
    }));
    window.sortState = sortState;
    console.log("sort state saved", sortState);
  }

  onBtRestoreSortState() {
    if (!window.sortState) {
      console.log("no sort state to restore, you must save sort state first");
      return;
    }
    this.gridColumnApi.applyColumnState({
      state: window.sortState,
    });
    console.log("sort state restored");
  }

  onBtSaveOrderAndVisibilityState() {
    const allState = this.gridColumnApi.getColumnState();
    const orderAndVisibilityState = allState.map((state) => ({
      colId: state.colId,
      hide: state.hide,
    }));
    window.orderAndVisibilityState = orderAndVisibilityState;
    console.log("order and visibility state saved", orderAndVisibilityState);
  }

  onBtRestoreOrderAndVisibilityState() {
    if (!window.orderAndVisibilityState) {
      console.log(
        "no order and visibility state to restore by, you must save order and visibility state first"
      );
      return;
    }
    this.gridColumnApi.applyColumnState({
      state: window.orderAndVisibilityState,
      applyOrder: true,
    });
    console.log("column state restored");
  }

  onGridReady(params: GridReadyEvent) {
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
