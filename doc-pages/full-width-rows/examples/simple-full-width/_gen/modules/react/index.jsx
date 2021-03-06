'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import FullWidthCellRenderer from './fullWidthCellRenderer.jsx';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class CountryCellRenderer {
  init(params) {
    const flag = `<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/flags/${params.data.code}.png">`;

    const eTemp = document.createElement('div');
    eTemp.innerHTML = `<span style="cursor: default;">${flag} ${params.value}</span>`;
    this.eGui = eTemp.firstElementChild;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'name', cellRenderer: CountryCellRenderer },
        { field: 'continent' },
        { field: 'language' },
      ],
      defaultColDef: {
        flex: 1,
        sortable: true,
        resizable: true,
        filter: true,
      },
      rowData: getData(),
      getRowHeight: (params) => {
        // return 100px height for full width rows
        if (isFullWidth(params.data)) {
          return 100;
        }
      },
      isFullWidthRow: (params) => {
        return isFullWidth(params.rowNode.data);
      },
      fullWidthCellRenderer: FullWidthCellRenderer,
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
            rowData={this.state.rowData}
            getRowHeight={this.state.getRowHeight}
            isFullWidthRow={this.state.isFullWidthRow}
            fullWidthCellRenderer={this.state.fullWidthCellRenderer}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function isFullWidth(data) {
  // return true when country is Peru, France or Italy
  return ['Peru', 'France', 'Italy'].indexOf(data.name) >= 0;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
