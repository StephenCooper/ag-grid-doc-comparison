import {
  ColDef,
  GetGroupRowAggParams,
  GridApi,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px">
      <button (click)="expandAll()">Expand All</button>
      <button (click)="collapseAll()">Collapse All</button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [sideBar]="true"
      [enableRangeSelection]="true"
      [getGroupRowAgg]="getGroupRowAgg"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { headerName: 'Gold*pi', field: 'goldPi', minWidth: 200 },
    { headerName: 'Silver*pi', field: 'silverPi', minWidth: 200 },
    { headerName: 'Bronze*pi', field: 'bronzePi', minWidth: 200 },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
  };
  public autoGroupColumnDef: ColDef = {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  expandAll() {
    this.gridApi.expandAll();
  }

  collapseAll() {
    this.gridApi.collapseAll();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }

  getGroupRowAgg(params: GetGroupRowAggParams) {
    const result = {
      gold: 0,
      silver: 0,
      bronze: 0,
      goldPi: 0,
      silverPi: 0,
      bronzePi: 0,
    };
    params.nodes.forEach((node) => {
      const data = node.group ? node.aggData : node.data;
      if (typeof data.gold === 'number') {
        result.gold += data.gold;
        result.goldPi += data.gold * Math.PI;
      }
      if (typeof data.silver === 'number') {
        result.silver += data.silver;
        result.silverPi += data.silver * Math.PI;
      }
      if (typeof data.bronze === 'number') {
        result.bronze += data.bronze;
        result.bronzePi += data.bronze * Math.PI;
      }
    });
    return result;
  }
}
