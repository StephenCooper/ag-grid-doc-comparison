import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  GridReadyEvent,
  IServerSideDatasource,
  ServerSideStoreType,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 220 },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "sport", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
  };
  public rowModelType = "serverSide";
  public serverSideStoreType: ServerSideStoreType = "full";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        // setup the fake server with entire dataset
        var fakeServer = createFakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = createServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api!.setServerSideDatasource(datasource);
      });
  }
}

function createServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: function (params) {
      console.log(
        "[Datasource] - rows requested by grid: startRow = " +
          params.request.startRow +
          ", endRow = " +
          params.request.endRow
      );
      // get data for request from our fake server
      var response = server.getData();
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({ rowData: response.rows });
        } else {
          params.fail();
        }
      }, 1000);
    },
  };
}
function createFakeServer(allData: any[]) {
  return {
    getData: function () {
      return {
        success: true,
        rows: allData,
      };
    },
  };
}
