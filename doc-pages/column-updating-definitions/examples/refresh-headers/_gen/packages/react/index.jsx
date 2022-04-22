'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CustomHeader from './customHeader.jsx';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      rowData: null,
      defaultColDef: {
        headerComponent: CustomHeader,
      },
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

  onBtUpperNames = () => {
    const columnDefs = [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
      { field: 'year' },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ];
    columnDefs.forEach(function (c) {
      c.headerName = c.field.toUpperCase();
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtLowerNames = () => {
    const columnDefs = [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
      { field: 'year' },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ];
    columnDefs.forEach(function (c) {
      c.headerName = c.field;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtFilterOn = () => {
    const columnDefs = [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
      { field: 'year' },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ];
    columnDefs.forEach(function (c) {
      c.filter = true;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtFilterOff = () => {
    const columnDefs = [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
      { field: 'year' },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ];
    columnDefs.forEach(function (c) {
      c.filter = false;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtResizeOn = () => {
    const columnDefs = [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
      { field: 'year' },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ];
    columnDefs.forEach(function (c) {
      c.resizable = true;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtResizeOff = () => {
    const columnDefs = [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
      { field: 'year' },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ];
    columnDefs.forEach(function (c) {
      c.resizable = false;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <button onClick={() => this.onBtUpperNames()}>
              Upper Header Names
            </button>
            <button onClick={() => this.onBtLowerNames()}>
              Lower Lower Names
            </button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={() => this.onBtFilterOn()}>Filter On</button>
            <button onClick={() => this.onBtFilterOff()}>Filter Off</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={() => this.onBtResizeOn()}>Resize On</button>
            <button onClick={() => this.onBtResizeOff()}>Resize Off</button>
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
              rowData={this.state.rowData}
              defaultColDef={this.state.defaultColDef}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
