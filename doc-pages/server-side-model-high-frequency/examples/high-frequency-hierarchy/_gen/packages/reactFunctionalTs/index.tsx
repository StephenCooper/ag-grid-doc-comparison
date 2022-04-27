'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {
  AsyncTransactionsFlushed,
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IsApplyServerSideTransaction,
  IsApplyServerSideTransactionParams,
  ServerSideStoreType,
  ServerSideTransaction,
  ServerSideTransactionResult,
  ServerSideTransactionResultStatus,
  ValueFormatterParams,
} from 'ag-grid-community';

declare var FakeServer: any;

var fakeServer = new FakeServer();

function numberCellFormatter(params: ValueFormatterParams) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function processUpdateFromFakeServer(
  gridApi: GridApi,
  transactions: ServerSideTransaction[]
) {
  var updatingJustOneTransaction = transactions.length == 4;
  if (updatingJustOneTransaction) {
    console.log('Updating One Record');
  }
  transactions.forEach(function (tx) {
    gridApi.applyServerSideTransactionAsync(tx, function (res) {
      if (updatingJustOneTransaction) {
        console.log(
          'Route [' + (tx.route || []).join(',') + '], status = ' + res.status
        );
      }
    });
  });
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // keys
    { field: 'productName', rowGroup: true, hide: true },
    { field: 'portfolioName', rowGroup: true, hide: true },
    { field: 'bookId', rowGroup: true, hide: true },
    // {field: 'productId'},
    // {field: 'portfolioId'},
    // {field: 'bookId'},
    // all the other columns (visible and not grouped)
    {
      headerName: 'Current',
      field: 'current',
      width: 200,
      type: 'numericColumn',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Previous',
      field: 'previous',
      width: 200,
      type: 'numericColumn',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Deal Type',
      field: 'dealType',
      filter: 'agSetColumnFilter',
      filterParams: {
        values: ['Financial', 'Physical'],
      },
    },
    {
      headerName: 'Bid',
      field: 'bidFlag',
      width: 100,
      filter: 'agSetColumnFilter',
      filterParams: {
        values: ['Buy', 'Sell'],
      },
    },
    {
      headerName: 'PL 1',
      field: 'pl1',
      width: 200,
      type: 'numericColumn',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'PL 2',
      field: 'pl2',
      width: 200,
      type: 'numericColumn',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Gain-DX',
      field: 'gainDx',
      width: 200,
      type: 'numericColumn',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'SX / PX',
      field: 'sxPx',
      width: 200,
      type: 'numericColumn',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: '99 Out',
      field: '_99Out',
      width: 200,
      type: 'numericColumn',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Submitter ID',
      field: 'submitterID',
      width: 200,
      type: 'numericColumn',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Submitted Deal ID',
      field: 'submitterDealID',
      width: 200,
      type: 'numericColumn',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 250,
      resizable: true,
      sortable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      field: 'tradeId',
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    var dataSource: IServerSideDatasource = {
      getRows: (params2) => {
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
  }, []);

  const onAsyncTransactionsFlushed = useCallback(
    (e: AsyncTransactionsFlushed) => {
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
      console.log('onAsyncTransactionsFlushed: ' + JSON.stringify(summary));
    },
    []
  );

  const onBtStart = useCallback(() => {
    fakeServer.startUpdates();
  }, [fakeServer]);

  const onBtStop = useCallback(() => {
    fakeServer.stopUpdates();
  }, [fakeServer]);

  const onBtApplyOneTransaction = useCallback(() => {
    fakeServer.insertOneRecord();
  }, [fakeServer]);

  const getRowId = useCallback((params: any) => {
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

  const isApplyServerSideTransaction = useCallback(
    (params: IsApplyServerSideTransactionParams) => {
      var transactionVersion = (params.transaction as any).serverVersion;
      var dataLoadedVersion = params.storeInfo.serverVersion;
      var transactionCreatedSinceInitialLoad =
        transactionVersion > dataLoadedVersion;
      if (!transactionCreatedSinceInitialLoad) {
        console.log('cancelling transaction');
      }
      return transactionCreatedSinceInitialLoad;
    },
    []
  );

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={onBtApplyOneTransaction}>One Transaction</button>
          <button onClick={onBtStart}>Start Feed</button>
          <button onClick={onBtStop}>Stop Feed</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            columnDefs={columnDefs}
            asyncTransactionWaitMillis={500}
            purgeClosedRowNodes={true}
            rowSelection={'multiple'}
            serverSideStoreType={'full'}
            rowModelType={'serverSide'}
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

render(<GridExample></GridExample>, document.querySelector('#root'));
