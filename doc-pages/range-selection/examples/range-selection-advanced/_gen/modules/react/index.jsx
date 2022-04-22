'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RangeSelectionModule,
  MenuModule,
  ClipboardModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete', minWidth: 150 },
        { field: 'age', maxWidth: 90 },
        { field: 'country', minWidth: 150 },
        { field: 'year', maxWidth: 90 },
        { field: 'date', minWidth: 150 },
        { field: 'sport', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        editable: true,
      },
      processCellForClipboard: function (params) {
        if (
          params.column.getColId() === 'athlete' &&
          params.value &&
          params.value.toUpperCase
        ) {
          return params.value.toUpperCase();
        }
        return params.value;
      },
      processCellFromClipboard: function (params) {
        if (
          params.column.getColId() === 'athlete' &&
          params.value &&
          params.value.toLowerCase
        ) {
          return params.value.toLowerCase();
        }
        return params.value;
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => params.api.setRowData(data);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onRangeSelectionChanged = (event) => {
    var lbRangeCount = document.querySelector('#lbRangeCount');
    var lbEagerSum = document.querySelector('#lbEagerSum');
    var lbLazySum = document.querySelector('#lbLazySum');
    var cellRanges = this.gridApi.getCellRanges();
    // if no selection, clear all the results and do nothing more
    if (!cellRanges || cellRanges.length === 0) {
      lbRangeCount.innerHTML = '0';
      lbEagerSum.innerHTML = '-';
      lbLazySum.innerHTML = '-';
      return;
    }
    // set range count to the number of ranges selected
    lbRangeCount.innerHTML = cellRanges.length + '';
    var sum = 0;
    var api = this.gridApi;
    if (cellRanges) {
      cellRanges.forEach(function (range) {
        // get starting and ending row, remember rowEnd could be before rowStart
        var startRow = Math.min(range.startRow.rowIndex, range.endRow.rowIndex);
        var endRow = Math.max(range.startRow.rowIndex, range.endRow.rowIndex);
        for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
          range.columns.forEach(function (column) {
            var rowModel = api.getModel();
            var rowNode = rowModel.getRow(rowIndex);
            var value = api.getValue(column, rowNode);
            if (typeof value === 'number') {
              sum += value;
            }
          });
        }
      });
    }
    lbEagerSum.innerHTML = sum + '';
    if (event.started) {
      lbLazySum.innerHTML = '?';
    }
    if (event.finished) {
      lbLazySum.innerHTML = sum + '';
    }
  };

  onAddRange = () => {
    this.gridApi.addCellRange({
      rowStartIndex: 4,
      rowEndIndex: 8,
      columnStart: 'age',
      columnEnd: 'date',
    });
  };

  onClearRange = () => {
    this.gridApi.clearRangeSelection();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="example-header">
            <button onClick={() => this.onAddRange()}>Add Range</button>
            <button onClick={() => this.onClearRange()}>Clear Range</button>
            Range Count:
            <span id="lbRangeCount" style={{ paddingRight: '20px' }}></span>
            Eager Sum:
            <span id="lbEagerSum" style={{ paddingRight: '20px' }}></span>
            Lazy Sum:
            <span id="lbLazySum" style={{ paddingRight: '20px' }}></span>
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
              defaultColDef={this.state.defaultColDef}
              enableRangeSelection={true}
              processCellForClipboard={this.state.processCellForClipboard}
              processCellFromClipboard={this.state.processCellFromClipboard}
              onGridReady={this.onGridReady}
              onRangeSelectionChanged={this.onRangeSelectionChanged.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
