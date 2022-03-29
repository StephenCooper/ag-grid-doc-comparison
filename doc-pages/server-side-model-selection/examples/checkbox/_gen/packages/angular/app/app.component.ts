import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IsRowSelectable,
  ServerSideStoreType,
} from "ag-grid-community";
declare var FakeServer: any;

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [getRowId]="getRowId"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [rowSelection]="rowSelection"
    [isRowSelectable]="isRowSelectable"
    [suppressRowClickSelection]="true"
    [animateRows]="true"
    [suppressAggFuncInHeader]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "year", rowGroup: true, hide: true },
    { field: "athlete", hide: true },
    { field: "sport", checkboxSelection: true },
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
  public getRowId: GetRowIdFunc = function (params: GetRowIdParams) {
    var data = params.data;
    // use year for group level ids, or the id we assigned for leaf level
    return data.id || data.year;
  };
  public autoGroupColumnDef: ColDef = {
    field: "athlete",
    flex: 1,
    minWidth: 240,
    // headerCheckboxSelection: true, // not supported for Enterprise Model
    cellRendererParams: {
      checkbox: true,
    },
  };
  public rowModelType = "serverSide";
  public serverSideStoreType: ServerSideStoreType = "partial";
  public rowSelection = "multiple";
  public isRowSelectable: IsRowSelectable = function (rowNode) {
    return !rowNode.group;
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        // assign a unique ID to each data item
        data.forEach(function (item: any, index: number) {
          item.id = index;
        });
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
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 200);
    },
  };
}
