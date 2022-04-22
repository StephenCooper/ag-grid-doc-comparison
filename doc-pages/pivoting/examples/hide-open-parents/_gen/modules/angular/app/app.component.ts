import {
  ColDef,
  GridReadyEvent,
  RowGroupingDisplayType,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="test-container">
    <div class="test-header">
      <span class="legend-item ag-row-level-0"></span>
      <span class="legend-label">Top Level Group (After collapsing)</span>
      <span class="legend-item ag-row-level-1"></span>
      <span class="legend-label">Second Level Group</span>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [pivotMode]="true"
      [groupDefaultExpanded]="groupDefaultExpanded"
      [groupHideOpenParents]="true"
      [groupDisplayType]="groupDisplayType"
      [animateRows]="true"
      [sideBar]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    // row group columns
    { field: 'country', rowGroup: true },
    { field: 'athlete', rowGroup: true },
    // pivot column
    {
      headerName: 'Year',
      // to mix it up a bit, here we are using a valueGetter for the year column.
      valueGetter: 'data.year',
      pivot: true,
    },
    // aggregation columns
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'total', aggFunc: 'sum' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    filter: true,
    resizable: true,
    sortable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 250,
  };
  public groupDefaultExpanded = 9;
  public groupDisplayType: RowGroupingDisplayType = 'multipleColumns';
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
