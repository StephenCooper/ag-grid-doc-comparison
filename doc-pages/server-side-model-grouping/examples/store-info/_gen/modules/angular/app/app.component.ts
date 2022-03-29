import {
  ColDef,
  GetServerSideStoreParamsParams,
  GridApi,
  GridReadyEvent,
  IServerSideDatasource,
  ServerSideStoreParams,
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
      <button (click)="onBtStoreState()">Store State</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowGroupPanelShow]="rowGroupPanelShow"
      [serverSideStoreType]="serverSideStoreType"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [cacheBlockSize]="cacheBlockSize"
      [rowModelType]="rowModelType"
      [getServerSideStoreParams]="getServerSideStoreParams"
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
    { field: "country", enableRowGroup: true, rowGroup: true },
    { field: "sport", enableRowGroup: true, rowGroup: true },
    { field: "year", minWidth: 100 },
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
  public rowGroupPanelShow = "always";
  public serverSideStoreType: ServerSideStoreType = "full";
  public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 280,
  };
  public cacheBlockSize = 4;
  public rowModelType = "serverSide";
  public getServerSideStoreParams: (
    params: GetServerSideStoreParamsParams
  ) => ServerSideStoreParams = function (params) {
    var noGroupingActive = params.rowGroupColumns.length == 0;
    var res: ServerSideStoreParams;
    if (noGroupingActive) {
      res = {
        // infinite scrolling
        storeType: "partial",
        // 100 rows per block
        cacheBlockSize: 100,
        // purge blocks that are not needed
        maxBlocksInCache: 2,
      };
    } else {
      var topLevelRows = params.level == 0;
      res = {
        storeType: topLevelRows ? "full" : "partial",
        cacheBlockSize: params.level == 1 ? 5 : 2,
        maxBlocksInCache: -1, // never purge blocks
      };
    }
    console.log("############## NEW STORE ##############");
    console.log(
      "getServerSideStoreParams, level = " +
        params.level +
        ", result = " +
        JSON.stringify(res)
    );
    return res;
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtStoreState() {
    var storeState = this.gridApi.getServerSideStoreState();
    console.log("Store States:");
    storeState.forEach(function (state, index) {
      console.log(
        index +
          " - " +
          JSON.stringify(state).replace(/"/g, "").replace(/,/g, ", ")
      );
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
    getRows: function (params) {
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
      }, 400);
    },
  };
}
