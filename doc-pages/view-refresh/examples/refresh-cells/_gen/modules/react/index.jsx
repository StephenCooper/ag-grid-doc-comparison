'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'a', suppressCellFlash: true },
        { field: 'b' },
        { field: 'c' },
        { field: 'd' },
        { field: 'e' },
        { field: 'f' },
      ],
      defaultColDef: {
        flex: 1,
      },
      rowData: [],
      pinnedTopRowData: [],
      pinnedBottomRowData: [],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // placing in 13 rows, so there are exactly enough rows to fill the grid, makes
    // the row animation look nice when you see all the rows
    data = createData(14);
    topRowData = createData(2);
    bottomRowData = createData(2);
    params.api.setRowData(data);
    params.api.setPinnedTopRowData(topRowData);
    params.api.setPinnedBottomRowData(bottomRowData);
  };

  scrambleAndRefreshAll = () => {
    scramble();
    var params = {
      force: isForceRefreshSelected(),
      suppressFlash: isSuppressFlashSelected(),
    };
    this.gridApi.refreshCells(params);
  };

  scrambleAndRefreshLeftToRight = () => {
    scramble();
    var api = this.gridApi;
    ['a', 'b', 'c', 'd', 'e', 'f'].forEach(function (col, index) {
      var millis = index * 100;
      var params = {
        force: isForceRefreshSelected(),
        suppressFlash: isSuppressFlashSelected(),
        columns: [col],
      };
      callRefreshAfterMillis(params, millis, api);
    });
  };

  scrambleAndRefreshTopToBottom = () => {
    scramble();
    var frame = 0;
    var i;
    var rowNode;
    var api = this.gridApi;
    for (i = 0; i < api.getPinnedTopRowCount(); i++) {
      rowNode = api.getPinnedTopRow(i);
      refreshRow(rowNode, api);
    }
    for (i = 0; i < api.getDisplayedRowCount(); i++) {
      rowNode = api.getDisplayedRowAtIndex(i);
      refreshRow(rowNode, api);
    }
    for (i = 0; i < api.getPinnedBottomRowCount(); i++) {
      rowNode = api.getPinnedBottomRow(i);
      refreshRow(rowNode, api);
    }
    function refreshRow(rowNode, api) {
      var millis = frame++ * 100;
      var rowNodes = [rowNode]; // params needs an array
      var params = {
        force: isForceRefreshSelected(),
        suppressFlash: isSuppressFlashSelected(),
        rowNodes: rowNodes,
      };
      callRefreshAfterMillis(params, millis, api);
    }
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="example-header">
            <div>
              <button onClick={() => this.scrambleAndRefreshAll()}>
                Scramble &amp; Refresh All
              </button>
              <button onClick={() => this.scrambleAndRefreshLeftToRight()}>
                Scramble &amp; Refresh Left to Right
              </button>
              <button onClick={() => this.scrambleAndRefreshTopToBottom()}>
                Scramble &amp; Refresh Top to Bottom
              </button>
            </div>
            <div>
              <label>
                <input type="checkbox" id="forceRefresh" />
                Force Refresh
              </label>
              <label>
                <input type="checkbox" id="suppressFlash" />
                Suppress Flash
              </label>
            </div>
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
              rowData={this.state.rowData}
              pinnedTopRowData={this.state.pinnedTopRowData}
              pinnedBottomRowData={this.state.pinnedBottomRowData}
              enableCellChangeFlash={true}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

// placing in 13 rows, so there are exactly enough rows to fill the grid, makes
// the row animation look nice when you see all the rows
var data = [];
var topRowData = [];
var bottomRowData = [];
function createData(count) {
  var result = [];
  for (var i = 1; i <= count; i++) {
    result.push({
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return result;
}
function isForceRefreshSelected() {
  return document.querySelector('#forceRefresh').checked;
}
function isSuppressFlashSelected() {
  return document.querySelector('#suppressFlash').checked;
}
function callRefreshAfterMillis(params, millis, gridApi) {
  setTimeout(function () {
    gridApi.refreshCells(params);
  }, millis);
}
function scramble() {
  data.forEach(scrambleItem);
  topRowData.forEach(scrambleItem);
  bottomRowData.forEach(scrambleItem);
}
function scrambleItem(item) {
  ['a', 'b', 'c', 'd', 'e', 'f'].forEach(function (colId) {
    // skip 50% of the cells so updates are random
    if (Math.random() > 0.5) {
      return;
    }
    item[colId] = Math.floor(Math.random() * 100);
  });
}

render(<GridExample></GridExample>, document.querySelector('#root'));
