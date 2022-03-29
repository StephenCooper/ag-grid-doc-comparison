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
  IServerSideGetRowsParams,
  IServerSideGetRowsRequest,
  IsRowSelectable,
  RowNode,
  ServerSideStoreType,
} from "ag-grid-community";
declare var _: any;

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="updateSelectedRows()">Update Selected Rows</button>
      <button (click)="refreshStore()">Refresh Store</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowSelection]="rowSelection"
      [rowModelType]="rowModelType"
      [serverSideStoreType]="serverSideStoreType"
      [cacheBlockSize]="cacheBlockSize"
      [animateRows]="true"
      [getRowId]="getRowId"
      [isRowSelectable]="isRowSelectable"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "id", hide: true },
    { field: "athlete" },
    { field: "country", rowGroup: true, hide: true },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  public defaultColDef: ColDef = {
    width: 250,
    resizable: true,
  };
  public rowSelection = "multiple";
  public rowModelType = "serverSide";
  public serverSideStoreType: ServerSideStoreType = "partial";
  public cacheBlockSize = 75;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  refreshStore() {
    this.gridApi.refreshServerSideStore({ purge: true });
  }

  updateSelectedRows() {
    var idsToUpdate = this.gridApi.getSelectedNodes().map(function (node) {
      return node.data.id;
    });
    var updatedRows: any[] = [];
    this.gridApi.forEachNode(function (rowNode) {
      if (idsToUpdate.indexOf(rowNode.data.id) >= 0) {
        // cloning underlying data otherwise the mock server data will also be updated
        var updated = JSON.parse(JSON.stringify(rowNode.data));
        // arbitrarily update medal count
        updated.gold += 1;
        updated.silver += 2;
        updated.bronze += 3;
        // directly update data in rowNode rather than requesting new data from server
        rowNode.setData(updated);
        // NOTE: setting row data will NOT change the row node ID - so if using getRowId() and the data changes
        // such that the ID will be different, the rowNode will not have it's ID updated!
        updatedRows.push(updated);
      }
    });
    // mimics server-side update
    updateServerRows(updatedRows);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        allData = data;
        // add id to data
        allData.forEach(function (item) {
          item.id = idSequence++;
        });
        var dataSource: IServerSideDatasource = {
          getRows: function (params: IServerSideGetRowsParams) {
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
              var response = getMockServerResponse(params.request);
              // call the success callback
              params.success({
                rowData: response.rowsThisBlock,
                rowCount: response.lastRow,
              });
            }, 500);
          },
        };
        params.api!.setServerSideDatasource(dataSource);
      });
  }

  getRowId(params: GetRowIdParams) {
    return params.data.id;
  }

  // only select group rows
  isRowSelectable(rowNode: RowNode) {
    return !rowNode.group;
  }
}

var idSequence = 0;
var allData: any[] = [];
// ******* Mock Server Implementation *********
// Note this a stripped down mock server implementation which only supports grouping
function getMockServerResponse(request: IServerSideGetRowsRequest) {
  var groupKeys = request.groupKeys;
  var rowGroupColIds = request.rowGroupCols.map(function (x) {
    return x.id;
  });
  var parentId = groupKeys.length > 0 ? groupKeys.join("") : "";
  var rows = group(allData, rowGroupColIds, groupKeys, parentId);
  var rowsThisBlock = rows.slice(request.startRow, request.endRow);
  rowsThisBlock.sort();
  var lastRow = rows.length <= (request.endRow || 0) ? rows.length : -1;
  return { rowsThisBlock: rowsThisBlock, lastRow: lastRow };
}
function group(
  data: any[],
  rowGroupColIds: string[],
  groupKeys: string[],
  parentId: string
): any[] {
  var groupColId = rowGroupColIds.shift();
  if (!groupColId) return data;
  var groupedData = _(data)
    .groupBy(function (x: any) {
      return x[groupColId!];
    })
    .value();
  if (groupKeys.length === 0) {
    return Object.keys(groupedData).map(function (key) {
      var res: Record<string, any> = {};
      // Note: the server provides group id's using a simple heuristic based on group keys:
      // i.e. group node ids will be in the following format: 'Russia', 'Russia-2002'
      res["id"] = getGroupId(parentId, key);
      res[groupColId!] = key;
      return res;
    });
  }
  return group(
    groupedData[groupKeys.shift()!],
    rowGroupColIds,
    groupKeys,
    parentId
  );
}
function updateServerRows(rowsToUpdate: any[]) {
  var updatedDataIds = rowsToUpdate.map(function (data) {
    return data.id;
  });
  for (var i = 0; i < allData.length; i++) {
    var updatedDataIndex = updatedDataIds.indexOf(allData[i].id);
    if (updatedDataIndex >= 0) {
      allData[i] = rowsToUpdate[updatedDataIndex];
    }
  }
}
function getGroupId(parentId: string, key: string) {
  return parentId ? parentId + "-" + key : key;
}
