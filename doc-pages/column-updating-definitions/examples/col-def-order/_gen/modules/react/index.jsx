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
      columnDefs: getColumnDefsA(),
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

  setColsA = () => {
    this.gridApi.setColumnDefs(getColumnDefsA());
  };

  setColsB = () => {
    this.gridApi.setColumnDefs(getColumnDefsB());
  };

  clearColDefs = () => {
    this.gridApi.setColumnDefs([]);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <button onClick={() => this.setColsA()}>Column Set A</button>
            <button onClick={() => this.setColsB()}>Column Set B</button>
            <button onClick={() => this.clearColDefs()}>Clear</button>
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
              maintainColumnOrder={true}
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

function getColumnDefsA() {
  return [
    { field: 'athlete', headerName: 'A Athlete' },
    { field: 'age', headerName: 'A Age' },
    { field: 'country', headerName: 'A Country' },
    { field: 'sport', headerName: 'A Sport' },
    { field: 'year', headerName: 'A Year' },
    { field: 'date', headerName: 'A Date' },
    { field: 'gold', headerName: 'A Gold' },
    { field: 'silver', headerName: 'A Silver' },
    { field: 'bronze', headerName: 'A Bronze' },
    { field: 'total', headerName: 'A Total' },
  ];
}
function getColumnDefsB() {
  return [
    { field: 'gold', headerName: 'B Gold' },
    { field: 'silver', headerName: 'B Silver' },
    { field: 'bronze', headerName: 'B Bronze' },
    { field: 'total', headerName: 'B Total' },
    { field: 'athlete', headerName: 'B Athlete' },
    { field: 'age', headerName: 'B Age' },
    { field: 'country', headerName: 'B Country' },
    { field: 'sport', headerName: 'B Sport' },
    { field: 'year', headerName: 'B Year' },
    { field: 'date', headerName: 'B Date' },
  ];
}

render(<GridExample></GridExample>, document.querySelector('#root'));
