'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: 'ID',
          field: 'id',
        },
        {
          headerName: 'Expected Position',
          valueGetter: '"translateY(" + node.rowIndex * 100 + "px)"',
        },
        {
          field: 'a',
        },
        {
          field: 'b',
        },
        {
          field: 'c',
        },
      ],
      rowHeight: 100,
      rowModelType: 'viewport',
      viewportDatasource: createViewportDatasource(),
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
            rowHeight={this.state.rowHeight}
            rowModelType={this.state.rowModelType}
            viewportDatasource={this.state.viewportDatasource}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function createViewportDatasource() {
  let initParams;
  return {
    init: (params) => {
      initParams = params;
      var oneMillion = 1000 * 1000;
      params.setRowCount(oneMillion);
    },
    setViewportRange(firstRow, lastRow) {
      var rowData = {};
      for (var rowIndex = firstRow; rowIndex <= lastRow; rowIndex++) {
        var item = {};
        item.id = rowIndex;
        item.a = 'A-' + rowIndex;
        item.b = 'B-' + rowIndex;
        item.c = 'C-' + rowIndex;
        rowData[rowIndex] = item;
      }
      initParams.setRowData(rowData);
    },
    destroy: () => {},
  };
}

render(<GridExample></GridExample>, document.querySelector('#root'));
