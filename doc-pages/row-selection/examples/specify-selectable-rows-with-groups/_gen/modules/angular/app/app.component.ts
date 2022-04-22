import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IsRowSelectable,
  RowNode,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div style="display: flex; flex-direction: column; height: 100%;">
    <div style="padding-bottom: 1rem;">
      <button (click)="filterBy2004()">Filter by Year 2008 &amp; 2012</button>
      <button (click)="clearFilter()">Clear Filter</button>
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
      [suppressRowClickSelection]="true"
      [groupDefaultExpanded]="groupDefaultExpanded"
      [isRowSelectable]="isRowSelectable"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', maxWidth: 100 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'date' },
    { field: 'sport' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
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
  public groupDefaultExpanded = -1;
  public isRowSelectable: IsRowSelectable = function (node: RowNode) {
    return node.data
      ? node.data.year === 2008 || node.data.year === 2004
      : false;
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  filterBy2004() {
    this.gridApi.setFilterModel({
      year: {
        type: 'set',
        values: ['2008', '2012'],
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
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
