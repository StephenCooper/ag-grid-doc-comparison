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
        { field: 'athlete', colId: 'athlete' },
        { field: 'age', colId: 'age' },
        { field: 'country', colId: 'country' },
        { field: 'year', colId: 'year' },
        { field: 'date', colId: 'date' },
        { field: 'total', colId: 'total' },
        { field: 'gold', colId: 'gold' },
        { field: 'silver', colId: 'silver' },
        { field: 'bronze', colId: 'bronze' },
      ],
      defaultColDef: {
        initialWidth: 150,
        sortable: true,
        resizable: true,
        filter: true,
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

  onBtNoGroups = () => {
    const columnDefs = [
      { field: 'athlete', colId: 'athlete' },
      { field: 'age', colId: 'age' },
      { field: 'country', colId: 'country' },
      { field: 'year', colId: 'year' },
      { field: 'date', colId: 'date' },
      { field: 'total', colId: 'total' },
      { field: 'gold', colId: 'gold' },
      { field: 'silver', colId: 'silver' },
      { field: 'bronze', colId: 'bronze' },
    ];
    this.gridApi.setColumnDefs(columnDefs);
  };

  onMedalsInGroupOnly = () => {
    const columnDefs = [
      { field: 'athlete', colId: 'athlete' },
      { field: 'age', colId: 'age' },
      { field: 'country', colId: 'country' },
      { field: 'year', colId: 'year' },
      { field: 'date', colId: 'date' },
      {
        headerName: 'Medals',
        headerClass: 'medals-group',
        children: [
          { field: 'total', colId: 'total' },
          { field: 'gold', colId: 'gold' },
          { field: 'silver', colId: 'silver' },
          { field: 'bronze', colId: 'bronze' },
        ],
      },
    ];
    this.gridApi.setColumnDefs(columnDefs);
  };

  onParticipantInGroupOnly = () => {
    const columnDefs = [
      {
        headerName: 'Participant',
        headerClass: 'participant-group',
        children: [
          { field: 'athlete', colId: 'athlete' },
          { field: 'age', colId: 'age' },
          { field: 'country', colId: 'country' },
          { field: 'year', colId: 'year' },
          { field: 'date', colId: 'date' },
        ],
      },
      { field: 'total', colId: 'total' },
      { field: 'gold', colId: 'gold' },
      { field: 'silver', colId: 'silver' },
      { field: 'bronze', colId: 'bronze' },
    ];
    this.gridApi.setColumnDefs(columnDefs);
  };

  onParticipantAndMedalsInGroups = () => {
    const columnDefs = [
      {
        headerName: 'Participant',
        headerClass: 'participant-group',
        children: [
          { field: 'athlete', colId: 'athlete' },
          { field: 'age', colId: 'age' },
          { field: 'country', colId: 'country' },
          { field: 'year', colId: 'year' },
          { field: 'date', colId: 'date' },
        ],
      },
      {
        headerName: 'Medals',
        headerClass: 'medals-group',
        children: [
          { field: 'total', colId: 'total' },
          { field: 'gold', colId: 'gold' },
          { field: 'silver', colId: 'silver' },
          { field: 'bronze', colId: 'bronze' },
        ],
      },
    ];
    this.gridApi.setColumnDefs(columnDefs);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <label>
              <button onClick={() => this.onBtNoGroups()}>No Groups</button>
            </label>
            <label>
              <div className="participant-group legend-box"></div>
              <button onClick={() => this.onParticipantInGroupOnly()}>
                Participant in Group
              </button>
            </label>
            <label>
              <div className="medals-group legend-box"></div>
              <button onClick={() => this.onMedalsInGroupOnly()}>
                Medals in Group
              </button>
            </label>
            <label>
              <div className="participant-group legend-box"></div>
              <div className="medals-group legend-box"></div>
              <button onClick={() => this.onParticipantAndMedalsInGroups()}>
                Participant and Medals in Group
              </button>
            </label>
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
              maintainColumnOrder={true}
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
