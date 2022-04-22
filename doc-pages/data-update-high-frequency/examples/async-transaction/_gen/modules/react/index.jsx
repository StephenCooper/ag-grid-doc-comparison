'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // these are the row groups, so they are all hidden (they are show in the group column)
        {
          headerName: 'Product',
          field: 'product',
          enableRowGroup: true,
          enablePivot: true,
          rowGroupIndex: 0,
          hide: true,
        },
        {
          headerName: 'Portfolio',
          field: 'portfolio',
          enableRowGroup: true,
          enablePivot: true,
          rowGroupIndex: 1,
          hide: true,
        },
        {
          headerName: 'Book',
          field: 'book',
          enableRowGroup: true,
          enablePivot: true,
          rowGroupIndex: 2,
          hide: true,
        },
        { headerName: 'Trade', field: 'trade', width: 100 },
        // all the other columns (visible and not grouped)
        {
          field: 'current',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          field: 'previous',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          field: 'dealType',
          enableRowGroup: true,
          enablePivot: true,
        },
        {
          headerName: 'Bid',
          field: 'bidFlag',
          enableRowGroup: true,
          enablePivot: true,
          width: 100,
        },
        {
          headerName: 'PL 1',
          field: 'pl1',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          headerName: 'PL 2',
          field: 'pl2',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          headerName: 'Gain-DX',
          field: 'gainDx',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          headerName: 'SX / PX',
          field: 'sxPx',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          headerName: '99 Out',
          field: '_99Out',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          field: 'submitterID',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          field: 'submitterDealID',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
      ],
      rowGroupPanelShow: 'always',
      pivotPanelShow: 'always',
      getRowId: function (params) {
        return params.data.trade;
      },
      defaultColDef: {
        width: 120,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        width: 250,
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    getData();
    params.api.setRowData(globalRowData);
  };

  onNormalUpdate = () => {
    var startMillis = new Date().getTime();
    setMessage('Running Transaction');
    var api = this.gridApi;
    for (var i = 0; i < UPDATE_COUNT; i++) {
      setTimeout(function () {
        // pick one index at random
        var index = Math.floor(Math.random() * globalRowData.length);
        var itemToUpdate = globalRowData[index];
        var newItem = copyObject(itemToUpdate);
        // copy previous to current value
        newItem.previous = newItem.current;
        // then create new current value
        newItem.current = Math.floor(Math.random() * 100000) + 100;
        // do normal update. update is done before method returns
        api.applyTransaction({ update: [newItem] });
      }, 0);
    }
    // print message in next VM turn to allow browser to refresh first.
    // we assume the browser executes the timeouts in order they are created,
    // so this timeout executes after all the update timeouts created above.
    setTimeout(function () {
      var endMillis = new Date().getTime();
      var duration = endMillis - startMillis;
      setMessage('Transaction took ' + duration.toLocaleString() + 'ms');
    }, 0);
    function setMessage(msg) {
      var eMessage = document.querySelector('#eMessage');
      eMessage.innerHTML = msg;
    }
  };

  onAsyncUpdate = () => {
    var startMillis = new Date().getTime();
    setMessage('Running Async');
    var updatedCount = 0;
    var api = this.gridApi;
    for (var i = 0; i < UPDATE_COUNT; i++) {
      setTimeout(function () {
        // pick one index at random
        var index = Math.floor(Math.random() * globalRowData.length);
        var itemToUpdate = globalRowData[index];
        var newItem = copyObject(itemToUpdate);
        // copy previous to current value
        newItem.previous = newItem.current;
        // then create new current value
        newItem.current = Math.floor(Math.random() * 100000) + 100;
        // update using async method. passing the callback is
        // optional, we are doing it here so we know when the update
        // was processed by the grid.
        api.applyTransactionAsync({ update: [newItem] }, resultCallback);
      }, 0);
    }
    function resultCallback() {
      updatedCount++;
      if (updatedCount === UPDATE_COUNT) {
        // print message in next VM turn to allow browser to refresh
        setTimeout(function () {
          var endMillis = new Date().getTime();
          var duration = endMillis - startMillis;
          setMessage('Async took ' + duration.toLocaleString() + 'ms');
        }, 0);
      }
    }
    function setMessage(msg) {
      var eMessage = document.querySelector('#eMessage');
      eMessage.innerHTML = msg;
    }
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.onNormalUpdate()}>Normal Update</button>
            <button onClick={() => this.onAsyncUpdate()}>Async Update</button>
            <span id="eMessage"></span>
          </div>
          <div
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              suppressAggFuncInHeader={true}
              animateRows={true}
              rowGroupPanelShow={this.state.rowGroupPanelShow}
              pivotPanelShow={this.state.pivotPanelShow}
              getRowId={this.state.getRowId}
              defaultColDef={this.state.defaultColDef}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

// defined and updated in data.js
var UPDATE_COUNT = 200;
function numberCellFormatter(params) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
// makes a copy of the original and merges in the new values
function copyObject(object) {
  // start with new object
  var newObject = {};
  // copy in the old values
  Object.keys(object).forEach(function (key) {
    newObject[key] = object[key];
  });
  return newObject;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
