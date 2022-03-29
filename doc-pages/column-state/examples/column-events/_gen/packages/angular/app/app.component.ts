import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  ColumnApi,
  ColumnMovedEvent,
  ColumnPinnedEvent,
  ColumnPivotChangedEvent,
  ColumnResizedEvent,
  ColumnRowGroupChangedEvent,
  ColumnValueChangedEvent,
  ColumnVisibleEvent,
  GridReadyEvent,
  SortChangedEvent,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<div class="test-container">
    <div class="test-header">
      <div class="test-button-row">
        <div class="test-button-group">
          <button (click)="onBtSortOn()">Sort On</button>
          <br />
          <button (click)="onBtSortOff()">Sort Off</button>
        </div>
        <div class="test-button-group">
          <button (click)="onBtWidthNarrow()">Width Narrow</button>
          <br />
          <button (click)="onBtWidthNormal()">Width Normal</button>
        </div>
        <div class="test-button-group">
          <button (click)="onBtHide()">Hide Cols</button>
          <br />
          <button (click)="onBtShow()">Show Cols</button>
        </div>
        <div class="test-button-group">
          <button (click)="onBtReverseOrder()">Reverse Medal Order</button>
          <br />
          <button (click)="onBtNormalOrder()">Normal Medal Order</button>
        </div>
        <div class="test-button-group">
          <button (click)="onBtRowGroupOn()">Row Group On</button>
          <br />
          <button (click)="onBtRowGroupOff()">Row Group Off</button>
        </div>
        <div class="test-button-group">
          <button (click)="onBtAggFuncOn()">Agg Func On</button>
          <br />
          <button (click)="onBtAggFuncOff()">Agg Func Off</button>
        </div>
        <div class="test-button-group">
          <button (click)="onBtPivotOn()">Pivot On</button>
          <br />
          <button (click)="onBtPivotOff()">Pivot Off</button>
        </div>
        <div class="test-button-group">
          <button (click)="onBtPinnedOn()">Pinned On</button>
          <br />
          <button (click)="onBtPinnedOff()">Pinned Off</button>
        </div>
      </div>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (sortChanged)="onSortChanged($event)"
      (columnResized)="onColumnResized($event)"
      (columnVisible)="onColumnVisible($event)"
      (columnPivotChanged)="onColumnPivotChanged($event)"
      (columnRowGroupChanged)="onColumnRowGroupChanged($event)"
      (columnValueChanged)="onColumnValueChanged($event)"
      (columnMoved)="onColumnMoved($event)"
      (columnPinned)="onColumnPinned($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    width: 150,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onSortChanged(e: SortChangedEvent) {
    console.log("Event Sort Changed", e);
  }

  onColumnResized(e: ColumnResizedEvent) {
    console.log("Event Column Resized", e);
  }

  onColumnVisible(e: ColumnVisibleEvent) {
    console.log("Event Column Visible", e);
  }

  onColumnPivotChanged(e: ColumnPivotChangedEvent) {
    console.log("Event Pivot Changed", e);
  }

  onColumnRowGroupChanged(e: ColumnRowGroupChangedEvent) {
    console.log("Event Row Group Changed", e);
  }

  onColumnValueChanged(e: ColumnValueChangedEvent) {
    console.log("Event Value Changed", e);
  }

  onColumnMoved(e: ColumnMovedEvent) {
    console.log("Event Column Moved", e);
  }

  onColumnPinned(e: ColumnPinnedEvent) {
    console.log("Event Column Pinned", e);
  }

  onBtSortOn() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "age", sort: "desc" },
        { colId: "athlete", sort: "asc" },
      ],
    });
  }

  onBtSortOff() {
    this.gridColumnApi.applyColumnState({
      defaultState: { sort: null },
    });
  }

  onBtWidthNarrow() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "age", width: 100 },
        { colId: "athlete", width: 100 },
      ],
    });
  }

  onBtWidthNormal() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "age", width: 200 },
        { colId: "athlete", width: 200 },
      ],
    });
  }

  onBtHide() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "age", hide: true },
        { colId: "athlete", hide: true },
      ],
    });
  }

  onBtShow() {
    this.gridColumnApi.applyColumnState({
      defaultState: { hide: false },
    });
  }

  onBtPivotOn() {
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "country", pivot: true }],
    });
  }

  onBtPivotOff() {
    this.gridColumnApi.setPivotMode(false);
    this.gridColumnApi.applyColumnState({
      defaultState: { pivot: false },
    });
  }

  onBtRowGroupOn() {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "sport", rowGroup: true }],
    });
  }

  onBtRowGroupOff() {
    this.gridColumnApi.applyColumnState({
      defaultState: { rowGroup: false },
    });
  }

  onBtAggFuncOn() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "gold", aggFunc: "sum" },
        { colId: "silver", aggFunc: "sum" },
        { colId: "bronze", aggFunc: "sum" },
      ],
    });
  }

  onBtAggFuncOff() {
    this.gridColumnApi.applyColumnState({
      defaultState: { aggFunc: null },
    });
  }

  onBtNormalOrder() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "athlete" },
        { colId: "age" },
        { colId: "country" },
        { colId: "sport" },
        { colId: "gold" },
        { colId: "silver" },
        { colId: "bronze" },
      ],
      applyOrder: true,
    });
  }

  onBtReverseOrder() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "athlete" },
        { colId: "age" },
        { colId: "country" },
        { colId: "sport" },
        { colId: "bronze" },
        { colId: "silver" },
        { colId: "gold" },
      ],
      applyOrder: true,
    });
  }

  onBtPinnedOn() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "athlete", pinned: "left" },
        { colId: "age", pinned: "right" },
      ],
    });
  }

  onBtPinnedOff() {
    this.gridColumnApi.applyColumnState({
      defaultState: { pinned: null },
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
