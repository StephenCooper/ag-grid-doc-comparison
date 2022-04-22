'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // colId will be 'firstCol'
        { headerName: 'Col 1', colId: 'firstCol', field: 'height' },
        // colId will be 'firstCol_1', cos 'firstCol' already taken
        { headerName: 'Col 2', colId: 'firstCol', field: 'height' },
        // colId will be 'height'
        { headerName: 'Col 3', field: 'height' },
        // colId will be 'height_1', cos 'height' already taken
        { headerName: 'Col 4', field: 'height' },
        // no colId, no field, so grid generated ID
        { headerName: 'Col 5', valueGetter: 'data.width' },
        { headerName: 'Col 6', valueGetter: 'data.width' },
      ],
      rowData: createRowData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var cols = params.columnApi.getAllColumns();
    cols.forEach(function (col) {
      var colDef = col.getColDef();
      console.log(
        colDef.headerName + ', Column ID = ' + col.getId(),
        JSON.stringify(colDef)
      );
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ height: '100%', boxSizing: 'border-box' }}>
          <div
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

function createRowData() {
  var data = [];
  for (var i = 0; i < 20; i++) {
    data.push({
      height: Math.floor(Math.random() * 100),
      width: Math.floor(Math.random() * 100),
      depth: Math.floor(Math.random() * 100),
    });
  }
  return data;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
