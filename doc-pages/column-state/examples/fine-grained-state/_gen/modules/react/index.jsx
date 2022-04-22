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
        width: 150,
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

  onBtSortAthlete = () => {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: 'athlete', sort: 'asc' }],
    });
  };

  onBtSortCountryThenSportClearOthers = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'country', sort: 'asc', sortIndex: 0 },
        { colId: 'sport', sort: 'asc', sortIndex: 1 },
      ],
      defaultState: { sort: null },
    });
  };

  onBtClearAllSorting = () => {
    this.gridColumnApi.applyColumnState({
      defaultState: { sort: null },
    });
  };

  onBtRowGroupCountryThenSport = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroupIndex: 0 },
        { colId: 'sport', rowGroupIndex: 1 },
      ],
      defaultState: { rowGroup: false },
    });
  };

  onBtRemoveCountryRowGroup = () => {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: 'country', rowGroup: false }],
    });
  };

  onBtClearAllRowGroups = () => {
    this.gridColumnApi.applyColumnState({
      defaultState: { rowGroup: false },
    });
  };

  onBtOrderColsMedalsFirst = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'gold' },
        { colId: 'silver' },
        { colId: 'bronze' },
        { colId: 'total' },
        { colId: 'athlete' },
        { colId: 'age' },
        { colId: 'country' },
        { colId: 'sport' },
        { colId: 'year' },
        { colId: 'date' },
      ],
      applyOrder: true,
    });
  };

  onBtOrderColsMedalsLast = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'athlete' },
        { colId: 'age' },
        { colId: 'country' },
        { colId: 'sport' },
        { colId: 'year' },
        { colId: 'date' },
        { colId: 'gold' },
        { colId: 'silver' },
        { colId: 'bronze' },
        { colId: 'total' },
      ],
      applyOrder: true,
    });
  };

  onBtHideMedals = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'gold', hide: true },
        { colId: 'silver', hide: true },
        { colId: 'bronze', hide: true },
        { colId: 'total', hide: true },
      ],
    });
  };

  onBtShowMedals = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'gold', hide: false },
        { colId: 'silver', hide: false },
        { colId: 'bronze', hide: false },
        { colId: 'total', hide: false },
      ],
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <table>
              <tbody>
                <tr>
                  <td>Sort:</td>
                  <td>
                    <button onClick={() => this.onBtSortAthlete()}>
                      Sort Athlete
                    </button>
                    <button
                      onClick={() => this.onBtSortCountryThenSportClearOthers()}
                    >
                      Sort Country, then Sport - Clear Others
                    </button>
                    <button onClick={() => this.onBtClearAllSorting()}>
                      Clear All Sorting
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Column Order:</td>
                  <td>
                    <button onClick={() => this.onBtOrderColsMedalsFirst()}>
                      Show Medals First
                    </button>
                    <button onClick={() => this.onBtOrderColsMedalsLast()}>
                      Show Medals Last
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Column Visibility:</td>
                  <td>
                    <button onClick={() => this.onBtHideMedals()}>
                      Hide Medals
                    </button>
                    <button onClick={() => this.onBtShowMedals()}>
                      Show Medals
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Row Group:</td>
                  <td>
                    <button onClick={() => this.onBtRowGroupCountryThenSport()}>
                      Group Country then Sport
                    </button>
                    <button onClick={() => this.onBtRemoveCountryRowGroup()}>
                      Remove Country
                    </button>
                    <button onClick={() => this.onBtClearAllRowGroups()}>
                      Clear All Groups
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
