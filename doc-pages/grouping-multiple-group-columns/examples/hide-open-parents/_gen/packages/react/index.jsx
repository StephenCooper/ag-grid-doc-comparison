'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'country', rowGroup: true, hide: true },
        {
          headerName: 'Year',
          valueGetter: 'data.year',
          rowGroup: true,
          hide: true,
        },
        { field: 'athlete', minWidth: 200 },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
        { field: 'total', aggFunc: 'sum' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 200,
        filterValueGetter: (params) => {
          if (params.node) {
            var colGettingGrouped = params.colDef.showRowGroup + '';
            return params.api.getValue(colGettingGrouped, params.node);
          }
        },
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

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="example-header">
            <span className="legend-item ag-row-level-0"></span>
            <span className="legend-label">Top Level Group</span>
            <span className="legend-item ag-row-level-1"></span>
            <span className="legend-label">Second Level Group</span>
            <span className="legend-item ag-row-level-2"></span>
            <span className="legend-label">Bottom Rows</span>
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
              enableRangeSelection={true}
              groupHideOpenParents={true}
              animateRows={true}
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
