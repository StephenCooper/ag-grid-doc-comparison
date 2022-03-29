import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onBtApplyOneTransaction()">One Transaction</button>
                    <button v-on:click="onBtStart()">Start Feed</button>
                    <button v-on:click="onBtStop()">Stop Feed</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :asyncTransactionWaitMillis="asyncTransactionWaitMillis"
                :purgeClosedRowNodes="true"
                :rowSelection="rowSelection"
                :serverSideStoreType="serverSideStoreType"
                :rowModelType="rowModelType"
                :animateRows="true"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :getRowId="getRowId"
                :isApplyServerSideTransaction="isApplyServerSideTransaction"
                @async-transactions-flushed="onAsyncTransactionsFlushed"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "productName", rowGroup: true, hide: true },
        { field: "portfolioName", rowGroup: true, hide: true },
        { field: "bookId", rowGroup: true, hide: true },
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
          filterParams: { values: ["Financial", "Physical"] },
        },
        {
          headerName: "Bid",
          field: "bidFlag",
          width: 100,
          filter: "agSetColumnFilter",
          filterParams: { values: ["Buy", "Sell"] },
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
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 250,
        resizable: true,
        sortable: true,
      },
      asyncTransactionWaitMillis: null,
      rowSelection: null,
      serverSideStoreType: null,
      rowModelType: null,
      autoGroupColumnDef: null,
    };
  },
  created() {
    this.asyncTransactionWaitMillis = 500;
    this.rowSelection = "multiple";
    this.serverSideStoreType = "full";
    this.rowModelType = "serverSide";
    this.autoGroupColumnDef = {
      field: "tradeId",
    };
  },
  methods: {
    onAsyncTransactionsFlushed(e) {
      var summary = {};
      e.results.forEach((result) => {
        var status = result.status;
        if (summary[status] == null) {
          summary[status] = 0;
        }
        summary[status]++;
      });
      console.log("onAsyncTransactionsFlushed: " + JSON.stringify(summary));
    },
    onBtStart() {
      fakeServer.startUpdates();
    },
    onBtStop() {
      fakeServer.stopUpdates();
    },
    onBtApplyOneTransaction() {
      fakeServer.insertOneRecord();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      var dataSource = {
        getRows: function (params2) {
          fakeServer.getData(
            params2.request,
            params2.parentNode.data,
            function (result, serverVersion) {
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
    },
    getRowId(params) {
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
    },
    isApplyServerSideTransaction(params) {
      var transactionVersion = params.transaction.serverVersion;
      var dataLoadedVersion = params.storeInfo.serverVersion;
      var transactionCreatedSinceInitialLoad =
        transactionVersion > dataLoadedVersion;
      if (!transactionCreatedSinceInitialLoad) {
        console.log("cancelling transaction");
      }
      return transactionCreatedSinceInitialLoad;
    },
  },
};

window.numberCellFormatter = function numberCellFormatter(params) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

window.processUpdateFromFakeServer = function processUpdateFromFakeServer(
  gridApi,
  transactions
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
};

var fakeServer = new FakeServer();

createApp(VueExample).mount("#app");
