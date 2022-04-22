import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IServerSideDatasource,
  ServerSideStoreType,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-enterprise';
declare var FakeServer: any;

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <label><input type="checkbox" id="failLoad" /> Make Loads Fail</label>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button (click)="onBtRetry()">Retry Failed Loads</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button (click)="onBtReset()">Reset Entire Grid</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [rowModelType]="rowModelType"
      [serverSideStoreType]="serverSideStoreType"
      [maxConcurrentDatasourceRequests]="maxConcurrentDatasourceRequests"
      [suppressAggFuncInHeader]="true"
      [purgeClosedRowNodes]="true"
      [cacheBlockSize]="cacheBlockSize"
      [animateRows]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      // demonstrating the use of valueGetters
      colId: 'country',
      valueGetter: 'data.country',
      rowGroup: true,
      hide: true,
    },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'year', minWidth: 100 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
  };
  public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 280,
    field: 'athlete',
  };
  public rowModelType = 'serverSide';
  public serverSideStoreType: ServerSideStoreType = 'partial';
  public maxConcurrentDatasourceRequests = 1;
  public cacheBlockSize = 20;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtRetry() {
    this.gridApi.retryServerSideLoads();
  }

  onBtReset() {
    this.gridApi.refreshServerSideStore({ purge: true });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        // setup the fake server with entire dataset
        var fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api!.setServerSideDatasource(datasource);
      });
  }
}

function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 1000);
    },
  };
}
