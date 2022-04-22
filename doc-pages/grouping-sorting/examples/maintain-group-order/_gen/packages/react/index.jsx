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
        { field: 'assignee', rowGroup: true, hide: true },
        { field: 'priority', rowGroup: true, hide: true },
        { field: 'task' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 200,
      },
      groupDisplayType: 'multipleColumns',
      groupDefaultExpanded: -1,
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
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
            groupDisplayType={this.state.groupDisplayType}
            groupMaintainOrder={true}
            groupDefaultExpanded={this.state.groupDefaultExpanded}
            animateRows={true}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
