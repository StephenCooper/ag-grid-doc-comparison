'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

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
      rowSelection: 'multiple',
      serverSideStoreType: 'full',
      rowModelType: 'serverSide',
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      const dataSource = {
        getRows: (params) => {
          // To make the demo look real, wait for 500ms before returning
          setTimeout(function () {
            const rows = [];
            products.forEach(function (product, index) {
              rows.push({
                product: product,
                value: getNextValue(),
              });
            });
            // call the success callback
            params.success({ rowData: rows, rowCount: rows.length });
          }, 500);
        },
      };
      params.api.setServerSideDatasource(dataSource);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onRemoveSelected = () => {
    const rowsToRemove = this.gridApi.getSelectedRows();
    const tx = {
      remove: rowsToRemove,
    };
    this.gridApi.applyServerSideTransaction(tx);
  };

  onRemoveRandom = () => {
    const rowsToRemove = [];
    let firstRow;
    this.gridApi.forEachNode(function (node) {
      if (firstRow == null) {
        firstRow = node.data;
      }
      // skip half the nodes at random
      if (Math.random() < 0.75) {
        return;
      }
      rowsToRemove.push(node.data);
    });
    if (rowsToRemove.length == 0 && firstRow != null) {
      rowsToRemove.push(firstRow);
    }
    const tx = {
      remove: rowsToRemove,
    };
    this.gridApi.applyServerSideTransaction(tx);
  };

  onUpdateSelected = () => {
    const rowsToUpdate = this.gridApi.getSelectedRows();
    rowsToUpdate.forEach(function (data) {
      data.value = getNextValue();
    });
    const tx = {
      update: rowsToUpdate,
    };
    this.gridApi.applyServerSideTransaction(tx);
  };

  onUpdateRandom = () => {
    const rowsToUpdate = [];
    this.gridApi.forEachNode(function (node) {
      // skip half the nodes at random
      if (Math.random() > 0.5) {
        return;
      }
      const data = node.data;
      data.value = getNextValue();
      rowsToUpdate.push(data);
    });
    const tx = {
      update: rowsToUpdate,
    };
    this.gridApi.applyServerSideTransaction(tx);
  };

  onAdd = (index) => {
    const newProductName =
      all_products[Math.floor(all_products.length * Math.random())];
    const itemsToAdd = [];
    for (let i = 0; i < 5; i++) {
      itemsToAdd.push({
        product: newProductName + ' ' + newProductSequence++,
        value: getNextValue(),
      });
    }
    const tx = {
      addIndex: index,
      add: itemsToAdd,
    };
    this.gridApi.applyServerSideTransaction(tx);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.onAdd(undefined)}>Add at End</button>
            <button onClick={() => this.onAdd(0)}>Add at Start</button>
            <button onClick={() => this.onUpdateSelected()}>
              Update Selected
            </button>
            <button onClick={() => this.onUpdateRandom()}>Update Random</button>
            <button onClick={() => this.onRemoveSelected()}>
              Remove Selected
            </button>
            <button onClick={() => this.onRemoveRandom()}>Remove Random</button>
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
              rowSelection={this.state.rowSelection}
              serverSideStoreType={this.state.serverSideStoreType}
              enableCellChangeFlash={true}
              rowModelType={this.state.rowModelType}
              animateRows={true}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

const products = ['Palm Oil', 'Rubber', 'Wool', 'Amber', 'Copper'];
const all_products = [
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
let newProductSequence = 0;
let valueCounter = 0;
function getNextValue() {
  valueCounter++;
  return Math.floor((valueCounter * 987654321) / 7) % 10000;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
