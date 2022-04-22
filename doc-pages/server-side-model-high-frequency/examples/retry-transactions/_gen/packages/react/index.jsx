'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [{ field: 'product' }, { field: 'value' }],
      defaultColDef: {
        width: 250,
        resizable: true,
      },
      getRowId: (params) => {
        return params.data.product;
      },
      rowModelType: 'serverSide',
      serverSideStoreType: 'full',
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    setupData();
    var dataSource = {
      getRows: function (params) {
        var rowData = allServerSideData.slice();
        console.log('getRows: found ' + rowData.length + ' records on server.');
        setTimeout(function () {
          params.success({ rowData: rowData });
        }, 2000);
      },
    };
    params.api.setServerSideDatasource(dataSource);
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

  onBtAdd = () => {
    var newProductName =
      all_products[Math.floor(all_products.length * Math.random())];
    var newItem = {
      product: newProductName + ' ' + newProductSequence++,
      value: Math.floor(Math.random() * 10000),
    };
    allServerSideData.push(newItem);
    var tx = {
      add: [newItem],
    };
    this.gridApi.applyServerSideTransactionAsync(tx);
  };

  onBtRefresh = () => {
    this.gridApi.refreshServerSideStore({ purge: true });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.onBtAdd()}>Add</button>
            <button onClick={() => this.onBtRefresh()}>Refresh</button>
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
              defaultColDef={this.state.defaultColDef}
              getRowId={this.state.getRowId}
              rowModelType={this.state.rowModelType}
              serverSideStoreType={this.state.serverSideStoreType}
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
var allServerSideData = [];
function setupData() {
  products.forEach(function (product, index) {
    allServerSideData.push({
      product: product,
      value: Math.floor(Math.random() * 10000),
    });
  });
}

render(<GridExample></GridExample>, document.querySelector('#root'));
