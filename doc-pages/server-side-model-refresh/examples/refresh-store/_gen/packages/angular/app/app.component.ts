import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IServerSideDatasource,
  ServerSideStoreType,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
declare var FakeServer: any;

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="refreshCache([])">Refresh Top Level</button>
      <button (click)="refreshCache(['Canada'])">Refresh [Canada]</button>
      <button (click)="refreshCache(['Canada', 2002])">
        Refresh [Canada,2002]
      </button>
      <button (click)="getBlockState()">Print Block State</button>

      <label><input type="checkbox" id="purge" /> Purge</label>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [rowModelType]="rowModelType"
      [serverSideStoreType]="serverSideStoreType"
      [suppressAggFuncInHeader]="true"
      [rowGroupPanelShow]="rowGroupPanelShow"
      [animateRows]="true"
      [debug]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "country", rowGroup: true, enableRowGroup: true, hide: true },
    { field: "year", rowGroup: true, enableRowGroup: true, hide: true },
    { field: "version" },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
    sortable: true,
  };
  public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 280,
    field: "athlete",
  };
  public rowModelType = "serverSide";
  public serverSideStoreType: ServerSideStoreType = "full";
  public rowGroupPanelShow = "always";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  refreshCache(route?: string[]) {
    versionCounter++;
    var purge =
      (document.querySelector("#purge") as HTMLInputElement).checked === true;
    this.gridApi.refreshServerSideStore({ route: route, purge: purge });
  }

  getBlockState() {
    var blockState = this.gridApi.getCacheBlockState();
    console.log(blockState);
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

var versionCounter = 1;
function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      response.rows = response.rows.map(function (item: any) {
        var res: any = {};
        Object.assign(res, item);
        res.version =
          versionCounter + " - " + versionCounter + " - " + versionCounter;
        return res;
      });
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
