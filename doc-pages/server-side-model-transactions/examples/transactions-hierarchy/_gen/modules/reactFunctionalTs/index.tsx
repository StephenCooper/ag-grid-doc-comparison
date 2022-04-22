'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  GetServerSideStoreParamsParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  ServerSideStoreParams,
  ServerSideStoreType,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule]);

const productsNames = ['Palm Oil', 'Rubber', 'Wool', 'Amber', 'Copper'];

const products: any[] = [];

let idSequence = 0;

function createOneTrade() {
  return {
    id: idSequence++,
    tradeName: 'TRD-' + Math.floor(Math.random() * 20000),
    value: Math.floor(Math.random() * 20000),
  };
}

function setupData() {
  productsNames.forEach(function (productName) {
    const product: any = {
      id: idSequence++,
      productName: productName,
      trades: [],
    };
    products.push(product);
    for (let i = 0; i < 2; i++) {
      product.trades.push(createOneTrade());
    }
  });
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'productName', rowGroup: true, hide: true },
    { field: 'tradeName' },
    { field: 'value' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 250,
      resizable: true,
    };
  }, []);
  const getRowId = useCallback(function (params: GetRowIdParams) {
    return params.data.id;
  }, []);
  const getServerSideStoreParams = useCallback(function (
    params: GetServerSideStoreParamsParams
  ): ServerSideStoreParams {
    const type = params.level == 0 ? 'partial' : 'full';
    return {
      storeType: type,
    };
  },
  []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setupData();
    const dataSource: IServerSideDatasource = {
      getRows: function (params2: IServerSideGetRowsParams) {
        // To make the demo look real, wait for 500ms before returning
        setTimeout(function () {
          const doingTopLevel = params2.request.groupKeys.length == 0;
          if (doingTopLevel) {
            params2.success({
              rowData: products.slice(),
              rowCount: products.length,
            });
          } else {
            const key = params2.request.groupKeys[0];
            let foundProduct: any = undefined;
            products.forEach(function (product) {
              if (product.productName == key) {
                foundProduct = product;
              }
            });
            if (foundProduct) {
              params2.success({ rowData: foundProduct.trades });
            } else {
              params2.fail();
            }
          }
        }, 2000);
      },
    };
    params.api.setServerSideDatasource(dataSource);
  }, []);

  const onBtNewPalmOil = useCallback(() => {
    const transaction = {
      route: ['Palm Oil'],
      add: [createOneTrade()],
    };
    const res = gridRef.current!.api.applyServerSideTransaction(transaction);
    console.log('New Palm Oil, result = ' + (res && res.status));
  }, []);

  const onBtNewRubber = useCallback(() => {
    const transaction = {
      route: ['Rubber'],
      add: [createOneTrade()],
    };
    const res = gridRef.current!.api.applyServerSideTransaction(transaction);
    console.log('New Rubber, result = ' + (res && res.status));
  }, []);

  const onBtNewWoolAmber = useCallback(() => {
    const transactions = [];
    transactions.push({
      route: ['Wool'],
      add: [createOneTrade()],
    });
    transactions.push({
      route: ['Amber'],
      add: [createOneTrade()],
    });
    const api = gridRef.current!.api!;
    transactions.forEach(function (tx) {
      const res = api.applyServerSideTransaction(tx);
      console.log('New ' + tx.route[0] + ', result = ' + (res && res.status));
    });
  }, []);

  const onBtNewProduct = useCallback(() => {
    const transaction = {
      route: [],
      add: [{ id: idSequence++, productName: 'Rice', trades: [] }],
    };
    const res = gridRef.current!.api.applyServerSideTransaction(transaction);
    console.log('New Product, result = ' + (res && res.status));
  }, [idSequence]);

  const onBtStoreState = useCallback(() => {
    const storeState = gridRef.current!.api.getServerSideStoreState();
    console.log('Store States:');
    storeState.forEach(function (state, index) {
      console.log(
        index +
          ' - ' +
          JSON.stringify(state).replace(/"/g, '').replace(/,/g, ', ')
      );
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={onBtNewPalmOil}>New Palm Oil</button>
          <button onClick={onBtNewRubber}>New Rubber</button>
          <button onClick={onBtNewWoolAmber}>New Wool &amp; Amber</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={onBtNewProduct}>New Product (will fail)</button>
          <button onClick={onBtStoreState}>Store State</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowId={getRowId}
            rowModelType={'serverSide'}
            serverSideStoreType={'full'}
            animateRows={true}
            purgeClosedRowNodes={true}
            getServerSideStoreParams={getServerSideStoreParams}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
