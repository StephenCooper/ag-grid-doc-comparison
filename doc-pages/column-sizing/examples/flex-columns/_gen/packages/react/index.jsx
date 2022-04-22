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
      columnDefs: [
        {
          headerName: 'A',
          field: 'author',
          width: 300,
          colSpan: colSpan,
        },
        {
          headerName: 'Flexed Columns',
          children: [
            {
              headerName: 'B',
              minWidth: 200,
              maxWidth: 350,
              flex: 2,
            },
            {
              headerName: 'C',
              flex: 1,
            },
          ],
        },
      ],
      defaultColDef: {
        resizable: true,
      },
      rowData: [1, 2],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    setInterval(fillAllCellsWithWidthMeasurement, 50);
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
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

var colSpan = function (params) {
  return params.data === 2 ? 3 : 1;
};
function fillAllCellsWithWidthMeasurement() {
  Array.prototype.slice
    .call(document.querySelectorAll('.ag-cell'))
    .forEach(function (cell) {
      var width = cell.offsetWidth;
      var isFullWidthRow = cell.parentElement.childNodes.length === 1;
      cell.textContent = (isFullWidthRow ? 'Total width: ' : '') + width + 'px';
    });
}

render(<GridExample></GridExample>, document.querySelector('#root'));
