'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  SetFilterModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete', enableRowGroup: true, enablePivot: true },
        { field: 'age', enableValue: true },
        {
          field: 'country',
          enableRowGroup: true,
          enablePivot: true,
          rowGroup: true,
        },
        { field: 'year', enableRowGroup: true, enablePivot: true },
        { field: 'date', enableRowGroup: true, enablePivot: true },
        {
          field: 'sport',
          enableRowGroup: true,
          enablePivot: true,
          pivot: true,
        },
        { field: 'gold', enableValue: true, aggFunc: 'sum' },
        { field: 'silver', enableValue: true, aggFunc: 'sum' },
        { field: 'bronze', enableValue: true },
        { field: 'total', enableValue: true },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 300,
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

  printState = () => {
    var state = this.gridColumnApi.getColumnState();
    console.log(state);
  };

  saveState = () => {
    savedState = this.gridColumnApi.getColumnState();
    savedPivotMode = this.gridColumnApi.isPivotMode();
    console.log('column state saved');
  };

  restoreState = () => {
    if (savedState) {
      // Pivot mode must be set first otherwise the columns we're trying to set state for won't exist yet
      this.gridColumnApi.setPivotMode(savedPivotMode);
      this.gridColumnApi.applyColumnState({
        state: savedState,
        applyOrder: true,
      });
      console.log('column state restored');
    } else {
      console.log('no previous column state to restore!');
    }
  };

  togglePivotMode = () => {
    var pivotMode = this.gridColumnApi.isPivotMode();
    this.gridColumnApi.setPivotMode(!pivotMode);
  };

  resetState = () => {
    this.gridColumnApi.resetColumnState();
    this.gridColumnApi.setPivotMode(false);
    console.log('column state reset');
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.saveState()}>Save State</button>
            <button onClick={() => this.restoreState()}>Restore State</button>
            <button onClick={() => this.printState()}>Print State</button>
            <button onClick={() => this.resetState()}>Reset State</button>
            <button onClick={() => this.togglePivotMode()}>
              Toggle Pivot Mode
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
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              sideBar={true}
              pivotMode={true}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

var savedState;
var savedPivotMode;

render(<GridExample></GridExample>, document.querySelector('#root'));
