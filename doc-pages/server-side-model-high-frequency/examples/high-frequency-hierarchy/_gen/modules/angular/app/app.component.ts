import {
  AsyncTransactionsFlushed,
  ColDef,
  GridApi,
  GridReadyEvent,
  IsApplyServerSideTransactionParams,
  IServerSideDatasource,
  ServerSideStoreType,
  ServerSideTransaction,
  ServerSideTransactionResult,
  ServerSideTransactionResultStatus,
  ValueFormatterParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts
declare var FakeServer: any;

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="onBtApplyOneTransaction()">One Transaction</button>
      <button (click)="onBtStart()">Start Feed</button>
      <button (click)="onBtStop()">Stop Feed</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [asyncTransactionWaitMillis]="asyncTransactionWaitMillis"
      [purgeClosedRowNodes]="true"
      [rowSelection]="rowSelection"
      [serverSideStoreType]="serverSideStoreType"
      [rowModelType]="rowModelType"
      [animateRows]="true"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [getRowId]="getRowId"
      [isApplyServerSideTransaction]="isApplyServerSideTransaction"
      [rowData]="rowData"
      (asyncTransactionsFlushed)="onAsyncTransactionsFlushed($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    // keys
    { field: "productName", rowGroup: true, hide: true },
    { field: "portfolioName", rowGroup: true, hide: true },
    { field: "bookId", rowGroup: true, hide: true },
    // {field: 'productId'},
    // {field: 'portfolioId'},
    // {field: 'bookId'},
    // all the other columns (visible and not grouped)
    {
      headerName: "Current",
      field: "current",
      width: 200,
      type: "numericColumn",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "Previous",
      field: "previous",
      width: 200,
      type: "numericColumn",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "Deal Type",
      field: "dealType",
      filter: "agSetColumnFilter",
      filterParams: {
        values: ["Financial", "Physical"],
      },
    },
    {
      headerName: "Bid",
      field: "bidFlag",
      width: 100,
      filter: "agSetColumnFilter",
      filterParams: {
        values: ["Buy", "Sell"],
      },
    },
    {
      headerName: "PL 1",
      field: "pl1",
      width: 200,
      type: "numericColumn",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "PL 2",
      field: "pl2",
      width: 200,
      type: "numericColumn",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "Gain-DX",
      field: "gainDx",
      width: 200,
      type: "numericColumn",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "SX / PX",
      field: "sxPx",
      width: 200,
      type: "numericColumn",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "99 Out",
      field: "_99Out",
      width: 200,
      type: "numericColumn",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "Submitter ID",
      field: "submitterID",
      width: 200,
      type: "numericColumn",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "Submitted Deal ID",
      field: "submitterDealID",
      width: 200,
      type: "numericColumn",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
  ];
  public asyncTransactionWaitMillis = 500;
  public rowSelection = "multiple";
  public serverSideStoreType: ServerSideStoreType = "full";
  public rowModelType = "serverSide";
  public defaultColDef: ColDef = {
    width: 250,
    resizable: true,
    sortable: true,
  };
  public autoGroupColumnDef: ColDef = {
    field: "tradeId",
  };
  public rowData!: any[];

  onAsyncTransactionsFlushed(e: AsyncTransactionsFlushed) {
    var summary: {
      [key in ServerSideTransactionResultStatus]?: any;
    } = {};
    (e.results as ServerSideTransactionResult[]).forEach(
      (result: ServerSideTransactionResult) => {
        var status = result.status;
        if (summary[status] == null) {
          summary[status] = 0;
        }
        summary[status]++;
      }
    );
    console.log("onAsyncTransactionsFlushed: " + JSON.stringify(summary));
  }

  onBtStart() {
    fakeServer.startUpdates();
  }

  onBtStop() {
    fakeServer.stopUpdates();
  }

  onBtApplyOneTransaction() {
    fakeServer.insertOneRecord();
  }

  onGridReady(params: GridReadyEvent) {
    var dataSource: IServerSideDatasource = {
      getRows: function (params2) {
        fakeServer.getData(
          params2.request,
          params2.parentNode.data,
          function (result: any[], serverVersion: string) {
            params2.success({
              rowData: result,
              storeInfo: { serverVersion: serverVersion },
            });
          }
        );
      },
    };
    params.api.setServerSideDatasource(dataSource);
    var callback = processUpdateFromFakeServer.bind(window, params.api);
    fakeServer.addUpdateListener(callback);
  }

  getRowId(params: any) {
    var data = params.data;
    if (data.tradeId) {
      return data.tradeId;
    } else if (data.bookId) {
      return data.bookId;
    } else if (data.portfolioId) {
      return data.portfolioId;
    } else if (data.productId) {
      return data.productId;
    }
  }

  isApplyServerSideTransaction(params: IsApplyServerSideTransactionParams) {
    var transactionVersion = (params.transaction as any).serverVersion;
    var dataLoadedVersion = params.storeInfo.serverVersion;
    var transactionCreatedSinceInitialLoad =
      transactionVersion > dataLoadedVersion;
    if (!transactionCreatedSinceInitialLoad) {
      console.log("cancelling transaction");
    }
    return transactionCreatedSinceInitialLoad;
  }
}

var fakeServer = new FakeServer();
function numberCellFormatter(params: ValueFormatterParams) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function processUpdateFromFakeServer(
  gridApi: GridApi,
  transactions: ServerSideTransaction[]
) {
  var updatingJustOneTransaction = transactions.length == 4;
  if (updatingJustOneTransaction) {
    console.log("Updating One Record");
  }
  transactions.forEach(function (tx) {
    gridApi.applyServerSideTransactionAsync(tx, function (res) {
      if (updatingJustOneTransaction) {
        console.log(
          "Route [" + (tx.route || []).join(",") + "], status = " + res.status
        );
      }
    });
  });
}
