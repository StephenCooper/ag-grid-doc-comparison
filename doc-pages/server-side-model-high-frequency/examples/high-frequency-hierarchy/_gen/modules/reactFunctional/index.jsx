"use strict";

import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgGridReact } from "@ag-grid-community/react";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule]);

var fakeServer = new FakeServer();

const numberCellFormatter = (params) => {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const processUpdateFromFakeServer = (gridApi, transactions) => {
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

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
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
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 250,
      resizable: true,
      sortable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      field: "tradeId",
    };
  }, []);

  const onGridReady = useCallback((params) => {
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
  }, []);

  const onAsyncTransactionsFlushed = useCallback((e) => {
    var summary = {};
    e.results.forEach((result) => {
      var status = result.status;
      if (summary[status] == null) {
        summary[status] = 0;
      }
      summary[status]++;
    });
    console.log("onAsyncTransactionsFlushed: " + JSON.stringify(summary));
  }, []);

  const onBtStart = useCallback(() => {
    fakeServer.startUpdates();
  }, [fakeServer]);

  const onBtStop = useCallback(() => {
    fakeServer.stopUpdates();
  }, [fakeServer]);

  const onBtApplyOneTransaction = useCallback(() => {
    fakeServer.insertOneRecord();
  }, [fakeServer]);

  const getRowId = useCallback((params) => {
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
  }, []);

  const isApplyServerSideTransaction = useCallback((params) => {
    var transactionVersion = params.transaction.serverVersion;
    var dataLoadedVersion = params.storeInfo.serverVersion;
    var transactionCreatedSinceInitialLoad =
      transactionVersion > dataLoadedVersion;
    if (!transactionCreatedSinceInitialLoad) {
      console.log("cancelling transaction");
    }
    return transactionCreatedSinceInitialLoad;
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: "5px" }}>
          <button onClick={onBtApplyOneTransaction}>One Transaction</button>
          <button onClick={onBtStart}>Start Feed</button>
          <button onClick={onBtStop}>Stop Feed</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            columnDefs={columnDefs}
            asyncTransactionWaitMillis={500}
            purgeClosedRowNodes={true}
            rowSelection={"multiple"}
            serverSideStoreType={"full"}
            rowModelType={"serverSide"}
            animateRows={true}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            getRowId={getRowId}
            isApplyServerSideTransaction={isApplyServerSideTransaction}
            onGridReady={onGridReady}
            onAsyncTransactionsFlushed={onAsyncTransactionsFlushed}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
