'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
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
      ],
      asyncTransactionWaitMillis: 500,
      rowSelection: 'multiple',
      serverSideStoreType: 'full',
      rowModelType: 'serverSide',
      defaultColDef: {
        width: 250,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: {
        field: 'tradeId',
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var dataSource = {
      getRows: (params2) => {
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
  };

  onAsyncTransactionsFlushed = (e) => {
    var summary = {};
    e.results.forEach((result) => {
      var status = result.status;
      if (summary[status] == null) {
        summary[status] = 0;
      }
      summary[status]++;
    });
    console.log('onAsyncTransactionsFlushed: ' + JSON.stringify(summary));
  };

  onBtStart = () => {
    fakeServer.startUpdates();
  };

  onBtStop = () => {
    fakeServer.stopUpdates();
  };

  onBtApplyOneTransaction = () => {
    fakeServer.insertOneRecord();
  };

  getRowId = (params) => {
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
  };

  isApplyServerSideTransaction = (params) => {
    var transactionVersion = params.transaction.serverVersion;
    var dataLoadedVersion = params.storeInfo.serverVersion;
    var transactionCreatedSinceInitialLoad =
      transactionVersion > dataLoadedVersion;
    if (!transactionCreatedSinceInitialLoad) {
      console.log('cancelling transaction');
    }
    return transactionCreatedSinceInitialLoad;
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.onBtApplyOneTransaction()}>
              One Transaction
            </button>
            <button onClick={() => this.onBtStart()}>Start Feed</button>
            <button onClick={() => this.onBtStop()}>Stop Feed</button>
          </div>
          <div
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine-dark"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              asyncTransactionWaitMillis={this.state.asyncTransactionWaitMillis}
              purgeClosedRowNodes={true}
              rowSelection={this.state.rowSelection}
              serverSideStoreType={this.state.serverSideStoreType}
              rowModelType={this.state.rowModelType}
              animateRows={true}
              defaultColDef={this.state.defaultColDef}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              getRowId={this.getRowId}
              isApplyServerSideTransaction={this.isApplyServerSideTransaction}
              onGridReady={this.onGridReady}
              onAsyncTransactionsFlushed={this.onAsyncTransactionsFlushed.bind(
                this
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

var fakeServer = new FakeServer();
function numberCellFormatter(params) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function processUpdateFromFakeServer(gridApi, transactions) {
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

render(<GridExample></GridExample>, document.querySelector('#root'));
