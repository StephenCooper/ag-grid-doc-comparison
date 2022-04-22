import { ColDef, GridApi, GridReadyEvent } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="filterSwimming()">Filter Only Swimming</button>
      <button (click)="ages16And20()">Filter Only ages 16 and 20</button>
      <button (click)="clearFilter()" style="margin-left: 10px;">
        Clear Filter
      </button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [rowSelection]="rowSelection"
      [groupSelectsChildren]="true"
      [groupSelectsFiltered]="true"
      [suppressAggFuncInHeader]="true"
      [suppressRowClickSelection]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'age', minWidth: 120, aggFunc: 'sum' },
    { field: 'year', maxWidth: 120 },
    { field: 'date', minWidth: 150 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'total', aggFunc: 'sum' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  };
  public rowSelection = 'multiple';
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  filterSwimming() {
    this.gridApi.setFilterModel({
      sport: {
        type: 'set',
        values: ['Swimming'],
      },
    });
  }

  ages16And20() {
    this.gridApi.setFilterModel({
      age: {
        type: 'set',
        values: ['16', '20'],
      },
    });
  }

  clearFilter() {
    this.gridApi.setFilterModel(null);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
