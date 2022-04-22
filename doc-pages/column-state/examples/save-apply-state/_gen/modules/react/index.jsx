'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
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
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
        width: 100,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
      },
      sideBar: {
        toolPanels: ['columns'],
      },
      rowGroupPanelShow: 'always',
      pivotPanelShow: 'always',
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

  saveState = () => {
    window.colState = this.gridColumnApi.getColumnState();
    console.log('column state saved');
  };

  restoreState = () => {
    if (!window.colState) {
      console.log('no columns state to restore by, you must save state first');
      return;
    }
    this.gridColumnApi.applyColumnState({
      state: window.colState,
      applyOrder: true,
    });
    console.log('column state restored');
  };

  resetState = () => {
    this.gridColumnApi.resetColumnState();
    console.log('column state reset');
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <div className="example-section">
              <button onClick={() => this.saveState()}>Save State</button>
              <button onClick={() => this.restoreState()}>Restore State</button>
              <button onClick={() => this.resetState()}>Reset State</button>
            </div>
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
              sideBar={this.state.sideBar}
              rowGroupPanelShow={this.state.rowGroupPanelShow}
              pivotPanelShow={this.state.pivotPanelShow}
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
