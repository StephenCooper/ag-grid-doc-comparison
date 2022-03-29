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
  ValueGetterParams,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div class="example-header">
      <span class="legend-item ag-row-level-0"></span>
      <span class="legend-label">Top Level Group</span>
      <span class="legend-item ag-row-level-1"></span>
      <span class="legend-label">Second Level Group</span>
      <span class="legend-item ag-row-level-2"></span>
      <span class="legend-label">Bottom Rows</span>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [enableRangeSelection]="true"
      [groupHideOpenParents]="true"
      [animateRows]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "country", rowGroup: true, hide: true },
    {
      headerName: "Year",
      valueGetter: "data.year",
      rowGroup: true,
      hide: true,
    },
    { field: "athlete", minWidth: 200 },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
    { field: "total", aggFunc: "sum" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
    filterValueGetter: function (params: ValueGetterParams) {
      if (params.node) {
        var colGettingGrouped = params.colDef.showRowGroup + "";
        return params.api.getValue(colGettingGrouped, params.node);
      }
    },
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
