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
      rowData: getRowData(),
      columnDefs: [
        {
          headerName: 'Set Filter Column',
          field: 'col1',
          filter: 'agSetColumnFilter',
          editable: true,
          flex: 1,
        },
      ],
      sideBar: 'filters',
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    params.api.getToolPanelInstance('filters').expandFilters();
  };

  updateFirstRow = () => {
    var firstRow = this.gridApi.getDisplayedRowAtIndex(0);
    if (firstRow) {
      var firstRowData = firstRow.data;
      firstRowData['col1'] += 'X';
      this.gridApi.applyTransaction({ update: [firstRowData] });
    }
  };

  addDRow = () => {
    this.gridApi.applyTransaction({ add: [{ col1: 'D' }] });
  };

  reset = () => {
    this.gridApi.setFilterModel(null);
    this.gridApi.setRowData(getRowData());
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <label>Transaction Updates: </label>
            <button onClick={() => this.updateFirstRow()}>
              Update First Displayed Row
            </button>
            <button onClick={() => this.addDRow()}>Add New 'D' Row</button>
            <button onClick={() => this.reset()} style={{ marginLeft: '20px' }}>
              Reset
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
              rowData={this.state.rowData}
              columnDefs={this.state.columnDefs}
              sideBar={this.state.sideBar}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getRowData() {
  return [
    { col1: 'A' },
    { col1: 'A' },
    { col1: 'B' },
    { col1: 'B' },
    { col1: 'C' },
    { col1: 'C' },
  ];
}

render(<GridExample></GridExample>, document.querySelector('#root'));
