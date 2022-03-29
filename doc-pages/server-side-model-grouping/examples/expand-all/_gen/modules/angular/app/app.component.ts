import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  ServerSideStoreType,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts
declare var FakeServer: any;

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="onBtExpandAll()">Expand All</button>
      &nbsp;&nbsp;&nbsp;
      <button (click)="onBtCollapseAll()">Collapse All</button>
      &nbsp;&nbsp;&nbsp;
      <button (click)="onBtExpandTopLevel()">Expand Top Level Only</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [maxConcurrentDatasourceRequests]="maxConcurrentDatasourceRequests"
      [rowModelType]="rowModelType"
      [serverSideStoreType]="serverSideStoreType"
      [suppressAggFuncInHeader]="true"
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
      field: "year",
      enableRowGroup: true,
      rowGroup: true,
      hide: true,
      minWidth: 100,
    },
    { field: "country", enableRowGroup: true, rowGroup: true, hide: true },
    { field: "sport", enableRowGroup: true, rowGroup: true, hide: true },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
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
  };
  public maxConcurrentDatasourceRequests = 1;
  public rowModelType = "serverSide";
  public serverSideStoreType: ServerSideStoreType = "full";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExpandAll() {
    this.gridApi.expandAll();
  }

  onBtCollapseAll() {
    this.gridApi.collapseAll();
  }

  onBtExpandTopLevel() {
    this.gridApi.forEachNode(function (node) {
      if (node.group && node.level == 0) {
        node.setExpanded(true);
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
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
    getRows: function (params: IServerSideGetRowsParams) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
            storeInfo: {
              lastLoadedTime: new Date().toLocaleString(),
              randomValue: Math.random(),
            },
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 200);
    },
  };
}
