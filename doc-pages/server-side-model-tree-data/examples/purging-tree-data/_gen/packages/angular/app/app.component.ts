import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  GetServerSideGroupKey,
  GridApi,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  IServerSideGetRowsRequest,
  IsServerSideGroup,
  IsServerSideGroupOpenByDefaultParams,
  ServerSideStoreType,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="refreshCache([])">Refresh Everything</button>
      <button (click)="refreshCache(['Kathryn Powers', 'Mabel Ward'])">
        Refresh ['Kathryn Powers','Mabel Ward']
      </button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [rowModelType]="rowModelType"
      [serverSideStoreType]="serverSideStoreType"
      [treeData]="true"
      [animateRows]="true"
      [cacheBlockSize]="cacheBlockSize"
      [isServerSideGroupOpenByDefault]="isServerSideGroupOpenByDefault"
      [isServerSideGroup]="isServerSideGroup"
      [getServerSideGroupKey]="getServerSideGroupKey"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'employeeId', hide: true },
    { field: 'employeeName', hide: true },
    { field: 'employmentType' },
    { field: 'startDate' },
  ];
  public defaultColDef: ColDef = {
    width: 235,
    resizable: true,
    flex: 1,
  };
  public autoGroupColumnDef: ColDef = {
    field: 'employeeName',
  };
  public rowModelType = 'serverSide';
  public serverSideStoreType: ServerSideStoreType = 'partial';
  public cacheBlockSize = 10;
  public isServerSideGroupOpenByDefault: (
    params: IsServerSideGroupOpenByDefaultParams
  ) => boolean = (params: IsServerSideGroupOpenByDefaultParams) => {
    var isKathrynPowers =
      params.rowNode.level == 0 && params.data.employeeName == 'Kathryn Powers';
    var isMabelWard =
      params.rowNode.level == 1 && params.data.employeeName == 'Mabel Ward';
    return isKathrynPowers || isMabelWard;
  };
  public isServerSideGroup: IsServerSideGroup = (dataItem: any) => {
    // indicate if node is a group
    return dataItem.group;
  };
  public getServerSideGroupKey: GetServerSideGroupKey = (dataItem: any) => {
    // specify which group key to use
    return dataItem.employeeName;
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  refreshCache(route: string[]) {
    this.gridApi.refreshServerSideStore({ route: route, purge: true });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/tree-data.json')
      .subscribe((data) => {
        var fakeServer = createFakeServer(data);
        var datasource = createServerSideDatasource(fakeServer);
        params.api!.setServerSideDatasource(datasource);
      });
  }
}

function createFakeServer(fakeServerData: any[]) {
  const fakeServer = {
    getData: (request: IServerSideGetRowsRequest) => {
      function extractRowsFromData(groupKeys: string[], data: any[]): any {
        if (groupKeys.length === 0) {
          return data.map(function (d) {
            return {
              group: !!d.underlings,
              employeeId: d.employeeId + '',
              employeeName: d.employeeName,
              employmentType: d.employmentType,
              startDate: d.startDate,
            };
          });
        }
        var key = groupKeys[0];
        for (var i = 0; i < data.length; i++) {
          if (data[i].employeeName === key) {
            return extractRowsFromData(
              groupKeys.slice(1),
              data[i].underlings.slice()
            );
          }
        }
      }
      return extractRowsFromData(request.groupKeys, fakeServerData);
    },
  };
  return fakeServer;
}
function createServerSideDatasource(fakeServer: any) {
  const dataSource: IServerSideDatasource = {
    getRows: (params: IServerSideGetRowsParams) => {
      console.log('ServerSideDatasource.getRows: params = ', params);
      var request = params.request;
      var allRows = fakeServer.getData(request);
      var doingInfinite = request.startRow != null && request.endRow != null;
      var result = doingInfinite
        ? {
            rowData: allRows.slice(request.startRow, request.endRow),
            rowCount: allRows.length,
          }
        : { rowData: allRows };
      console.log('getRows: result = ', result);
      setTimeout(function () {
        params.success(result);
      }, 500);
    },
  };
  return dataSource;
}
