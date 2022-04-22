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
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'country', rowGroup: true, enableRowGroup: true },
        {
          field: 'year',
          rowGroup: true,
          enableRowGroup: true,
          enablePivot: true,
        },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 250,
      },
      sideBar: 'columns',
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

  onBtNormal = () => {
    this.gridColumnApi.setPivotMode(false);
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroup: true },
        { colId: 'year', rowGroup: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  };

  onBtPivotMode = () => {
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroup: true },
        { colId: 'year', rowGroup: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  };

  onBtFullPivot = () => {
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroup: true },
        { colId: 'year', pivot: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.onBtNormal()}>
              1 - Grouping Active
            </button>
            <button onClick={() => this.onBtPivotMode()}>
              2 - Grouping Active with Pivot Mode
            </button>
            <button onClick={() => this.onBtFullPivot()}>
              3 - Grouping Active with Pivot Mode and Pivot Active
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
              sideBar={this.state.sideBar}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
