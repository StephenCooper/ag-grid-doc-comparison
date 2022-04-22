'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: getColumnDefs(),
      defaultColDef: {
        resizable: true,
      },
      rowModelType: 'infinite',
      rowSelection: 'multiple',
      maxBlocksInCache: 2,
      getRowId: function (params) {
        return params.data.a;
      },
      datasource: getDataSource(100),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
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
            rowModelType={this.state.rowModelType}
            rowSelection={this.state.rowSelection}
            maxBlocksInCache={this.state.maxBlocksInCache}
            suppressRowClickSelection={true}
            getRowId={this.state.getRowId}
            datasource={this.state.datasource}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

var ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
function getColumnDefs() {
  const columnDefs = [
    { checkboxSelection: true, headerName: '', width: 60 },
    { headerName: '#', width: 80, valueGetter: 'node.rowIndex' },
  ];
  ALPHABET.forEach(function (letter) {
    columnDefs.push({
      headerName: letter.toUpperCase(),
      field: letter,
      width: 150,
    });
  });
  return columnDefs;
}
function getDataSource(count) {
  const dataSource = {
    rowCount: count,
    getRows: function (params) {
      var rowsThisPage = [];
      for (
        var rowIndex = params.startRow;
        rowIndex < params.endRow;
        rowIndex++
      ) {
        var record = {};
        ALPHABET.forEach(function (letter, colIndex) {
          var randomNumber = 17 + rowIndex + colIndex;
          var cellKey = letter.toUpperCase() + (rowIndex + 1);
          record[letter] = cellKey + ' = ' + randomNumber;
        });
        rowsThisPage.push(record);
      }
      // to mimic server call, we reply after a short delay
      setTimeout(function () {
        // no need to pass the second 'rowCount' parameter as we have already provided it
        params.successCallback(rowsThisPage);
      }, 100);
    },
  };
  return dataSource;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
