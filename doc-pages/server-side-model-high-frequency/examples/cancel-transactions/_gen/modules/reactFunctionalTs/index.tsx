'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import {
  AsyncTransactionsFlushed,
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IsApplyServerSideTransaction,
  IsApplyServerSideTransactionParams,
  ServerSideStoreType,
  ServerSideTransactionResult,
  ServerSideTransactionResultStatus,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

var products = ['Palm Oil', 'Rubber', 'Wool', 'Amber', 'Copper'];

var newProductSequence = 0;

var all_products = [
  'Palm Oil',
  'Rubber',
  'Wool',
  'Amber',
  'Copper',
  'Lead',
  'Zinc',
  'Tin',
  'Aluminium',
  'Aluminium Alloy',
  'Nickel',
  'Cobalt',
  'Molybdenum',
  'Recycled Steel',
  'Corn',
  'Oats',
  'Rough Rice',
  'Soybeans',
  'Rapeseed',
  'Soybean Meal',
  'Soybean Oil',
  'Wheat',
  'Milk',
  'Coca',
  'Coffee C',
  'Cotton No.2',
  'Sugar No.11',
  'Sugar No.14',
];

var allServerSideData: any[] = [];

function setupData() {
  products.forEach(function (product, index) {
    allServerSideData.push({
      product: product,
      value: Math.floor(Math.random() * 10000),
    });
  });
}

var serverVersion = 0;

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'product' },
    { field: 'value' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 250,
      resizable: true,
    };
  }, []);
  const isApplyServerSideTransaction = useCallback(function (
    params: IsApplyServerSideTransactionParams
  ) {
    var tx = params.transaction as any;
    var storeInfo = params.storeInfo;
    var txCreatedSinceRowDataRead = tx.serverVersion > storeInfo.serverVersion;
    console.log(
      'tx.serverVersion = ' +
        tx.serverVersion +
        ', storeInfo.serverVersion = ' +
        storeInfo.serverVersion
    );
    if (txCreatedSinceRowDataRead) {
      console.log('Applying transaction');
      return true;
    } else {
      console.log('Cancelling transaction');
      return false;
    }
  },
  []);
  const getRowId = useCallback(function (params: GetRowIdParams) {
    return params.data.product;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setupData();
    var dataSource: IServerSideDatasource = {
      getRows: function (params2) {
        setTimeout(function () {
          var rowData = allServerSideData.slice();
          console.log(
            'getRows: found ' + rowData.length + ' records on server.'
          );
          params2.success({
            rowData: rowData,
            storeInfo: { serverVersion: serverVersion },
          });
        }, 2000);
      },
    };
    params.api.setServerSideDatasource(dataSource);
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

  const onBtAdd = useCallback(() => {
    var newProductName =
      all_products[Math.floor(all_products.length * Math.random())];
    var newItem = {
      product: newProductName + ' ' + newProductSequence++,
      value: Math.floor(Math.random() * 10000),
    };
    allServerSideData.push(newItem);
    serverVersion++;
    var tx = {
      add: [newItem],
      serverVersion: serverVersion,
    };
    gridRef.current!.api.applyServerSideTransactionAsync(tx);
  }, [all_products, newProductSequence, allServerSideData, serverVersion]);

  const onBtRefresh = useCallback(() => {
    gridRef.current!.api.refreshServerSideStore({ purge: true });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={onBtAdd}>Add</button>
          <button onClick={onBtRefresh}>Refresh</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            isApplyServerSideTransaction={isApplyServerSideTransaction}
            getRowId={getRowId}
            rowModelType={'serverSide'}
            serverSideStoreType={'full'}
            onGridReady={onGridReady}
            onAsyncTransactionsFlushed={onAsyncTransactionsFlushed}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
