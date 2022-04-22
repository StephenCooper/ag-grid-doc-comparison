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

class SlowCellRenderer {
  init(p) {
    const start = new Date().valueOf();
    while (new Date().valueOf() - start < 15) {
      this.eGui = document.createElement('span');
    }
    this.eGui = document.createElement('span');
    this.eGui.innerHTML = `${++count}`;
  }

  getGui() {
    return this.eGui;
  }

  refresh() {
    return false;
  }
}

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: '1' },
        { field: '2' },
        { field: '3' },
        { field: '4' },
        { field: '5' },
        { field: '6' },
        { field: '7' },
        { field: '8' },
        { field: '9' },
        { field: '10' },
        { field: '11' },
        { field: '12' },
        { field: '13' },
        { field: '14' },
        { field: '15' },
        { field: '16' },
        { field: '17' },
        { field: '18' },
        { field: '19' },
        { field: '20' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 80,
        cellRenderer: SlowCellRenderer,
      },
      rowData: getRowData(),
      rowSelection: 'single',
      rowBuffer: 0,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div>
          <label className="infoLabel">Try Scrolling!</label>
        </div>
        <div
          style={{
            height: '95%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            rowSelection={this.state.rowSelection}
            rowBuffer={this.state.rowBuffer}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

let count = 0;
function getRowData() {
  // 1000 blank rows for the grid
  return Array.apply(null, Array(1000));
}

render(<GridExample></GridExample>, document.querySelector('#root'));
