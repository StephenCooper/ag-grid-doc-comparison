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
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
        width: 150,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
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

  onSortChanged = (e) => {
    console.log('Event Sort Changed', e);
  };

  onColumnResized = (e) => {
    console.log('Event Column Resized', e);
  };

  onColumnVisible = (e) => {
    console.log('Event Column Visible', e);
  };

  onColumnPivotChanged = (e) => {
    console.log('Event Pivot Changed', e);
  };

  onColumnRowGroupChanged = (e) => {
    console.log('Event Row Group Changed', e);
  };

  onColumnValueChanged = (e) => {
    console.log('Event Value Changed', e);
  };

  onColumnMoved = (e) => {
    console.log('Event Column Moved', e);
  };

  onColumnPinned = (e) => {
    console.log('Event Column Pinned', e);
  };

  onBtSortOn = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'age', sort: 'desc' },
        { colId: 'athlete', sort: 'asc' },
      ],
    });
  };

  onBtSortOff = () => {
    this.gridColumnApi.applyColumnState({
      defaultState: { sort: null },
    });
  };

  onBtWidthNarrow = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'age', width: 100 },
        { colId: 'athlete', width: 100 },
      ],
    });
  };

  onBtWidthNormal = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'age', width: 200 },
        { colId: 'athlete', width: 200 },
      ],
    });
  };

  onBtHide = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'age', hide: true },
        { colId: 'athlete', hide: true },
      ],
    });
  };

  onBtShow = () => {
    this.gridColumnApi.applyColumnState({
      defaultState: { hide: false },
    });
  };

  onBtPivotOn = () => {
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.applyColumnState({
      state: [{ colId: 'country', pivot: true }],
    });
  };

  onBtPivotOff = () => {
    this.gridColumnApi.setPivotMode(false);
    this.gridColumnApi.applyColumnState({
      defaultState: { pivot: false },
    });
  };

  onBtRowGroupOn = () => {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: 'sport', rowGroup: true }],
    });
  };

  onBtRowGroupOff = () => {
    this.gridColumnApi.applyColumnState({
      defaultState: { rowGroup: false },
    });
  };

  onBtAggFuncOn = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'gold', aggFunc: 'sum' },
        { colId: 'silver', aggFunc: 'sum' },
        { colId: 'bronze', aggFunc: 'sum' },
      ],
    });
  };

  onBtAggFuncOff = () => {
    this.gridColumnApi.applyColumnState({
      defaultState: { aggFunc: null },
    });
  };

  onBtNormalOrder = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'athlete' },
        { colId: 'age' },
        { colId: 'country' },
        { colId: 'sport' },
        { colId: 'gold' },
        { colId: 'silver' },
        { colId: 'bronze' },
      ],
      applyOrder: true,
    });
  };

  onBtReverseOrder = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'athlete' },
        { colId: 'age' },
        { colId: 'country' },
        { colId: 'sport' },
        { colId: 'bronze' },
        { colId: 'silver' },
        { colId: 'gold' },
      ],
      applyOrder: true,
    });
  };

  onBtPinnedOn = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'athlete', pinned: 'left' },
        { colId: 'age', pinned: 'right' },
      ],
    });
  };

  onBtPinnedOff = () => {
    this.gridColumnApi.applyColumnState({
      defaultState: { pinned: null },
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <div className="test-button-row">
              <div className="test-button-group">
                <button onClick={() => this.onBtSortOn()}>Sort On</button>
                <br />
                <button onClick={() => this.onBtSortOff()}>Sort Off</button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtWidthNarrow()}>
                  Width Narrow
                </button>
                <br />
                <button onClick={() => this.onBtWidthNormal()}>
                  Width Normal
                </button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtHide()}>Hide Cols</button>
                <br />
                <button onClick={() => this.onBtShow()}>Show Cols</button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtReverseOrder()}>
                  Reverse Medal Order
                </button>
                <br />
                <button onClick={() => this.onBtNormalOrder()}>
                  Normal Medal Order
                </button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtRowGroupOn()}>
                  Row Group On
                </button>
                <br />
                <button onClick={() => this.onBtRowGroupOff()}>
                  Row Group Off
                </button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtAggFuncOn()}>
                  Agg Func On
                </button>
                <br />
                <button onClick={() => this.onBtAggFuncOff()}>
                  Agg Func Off
                </button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtPivotOn()}>Pivot On</button>
                <br />
                <button onClick={() => this.onBtPivotOff()}>Pivot Off</button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtPinnedOn()}>Pinned On</button>
                <br />
                <button onClick={() => this.onBtPinnedOff()}>Pinned Off</button>
              </div>
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
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
              onSortChanged={this.onSortChanged.bind(this)}
              onColumnResized={this.onColumnResized.bind(this)}
              onColumnVisible={this.onColumnVisible.bind(this)}
              onColumnPivotChanged={this.onColumnPivotChanged.bind(this)}
              onColumnRowGroupChanged={this.onColumnRowGroupChanged.bind(this)}
              onColumnValueChanged={this.onColumnValueChanged.bind(this)}
              onColumnMoved={this.onColumnMoved.bind(this)}
              onColumnPinned={this.onColumnPinned.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
