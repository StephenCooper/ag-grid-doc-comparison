'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultColDef: {
        resizable: true,
        width: 150,
      },
      columnDefs: createNormalColDefs(),
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

  onBtNormalCols = () => {
    this.gridApi.setColumnDefs(createNormalColDefs());
  };

  onBtExtraCols = () => {
    this.gridApi.setColumnDefs(createExtraColDefs());
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <button onClick={() => this.onBtNormalCols()}>Normal Cols</button>
            <button onClick={() => this.onBtExtraCols()}>Extra Cols</button>
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
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

function createNormalColDefs() {
  return [
    {
      headerName: 'Athlete Details',
      headerClass: 'participant-group',
      children: [
        { field: 'athlete', colId: 'athlete' },
        { field: 'country', colId: 'country' },
      ],
    },
    { field: 'age', colId: 'age' },
    {
      headerName: 'Sports Results',
      headerClass: 'medals-group',
      children: [
        { field: 'sport', colId: 'sport' },
        { field: 'gold', colId: 'gold' },
      ],
    },
  ];
}
function createExtraColDefs() {
  return [
    {
      headerName: 'Athlete Details',
      headerClass: 'participant-group',
      children: [
        { field: 'athlete', colId: 'athlete' },
        { field: 'country', colId: 'country' },
        { field: 'region1', colId: 'region1' },
        { field: 'region2', colId: 'region2' },
      ],
    },
    { field: 'age', colId: 'age' },
    { field: 'distance', colId: 'distance' },
    {
      headerName: 'Sports Results',
      headerClass: 'medals-group',
      children: [
        { field: 'sport', colId: 'sport' },
        { field: 'gold', colId: 'gold' },
      ],
    },
  ];
}

render(<GridExample></GridExample>, document.querySelector('#root'));
