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
      defaultColDef: {
        initialWidth: 100,
        sortable: true,
        resizable: true,
        filter: true,
      },
      columnDefs: getColumnDefs(),
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  setHeaderNames = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.headerName = 'C' + index;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  removeHeaderNames = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.headerName = undefined;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  setValueFormatters = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.valueFormatter = function (params) {
        return '[ ' + params.value + ' ]';
      };
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  removeValueFormatters = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.valueFormatter = undefined;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <button onClick={() => this.setHeaderNames()}>
              Set Header Names
            </button>
            <button onClick={() => this.removeHeaderNames()}>
              Remove Header Names
            </button>
            <button onClick={() => this.setValueFormatters()}>
              Set Value Formatters
            </button>
            <button onClick={() => this.removeValueFormatters()}>
              Remove Value Formatters
            </button>
          </div>
          <div
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              defaultColDef={this.state.defaultColDef}
              columnDefs={this.state.columnDefs}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getColumnDefs() {
  return [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
}

render(<GridExample></GridExample>, document.querySelector('#root'));
