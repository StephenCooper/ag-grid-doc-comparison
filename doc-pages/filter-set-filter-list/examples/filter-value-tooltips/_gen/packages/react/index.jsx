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
        {
          field: 'colA',
          tooltipField: 'colA',
          filter: 'agSetColumnFilter',
        },
        {
          field: 'colB',
          tooltipField: 'colB',
          filter: 'agSetColumnFilter',
          filterParams: {
            showTooltips: true,
          },
        },
        {
          field: 'colC',
          tooltipField: 'colC',
          tooltipComponent: CustomTooltip,
          filter: 'agSetColumnFilter',
          filterParams: {
            showTooltips: true,
          },
        },
      ],
      sideBar: 'filters',
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
      tooltipShowDelay: 100,
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
            sideBar={this.state.sideBar}
            defaultColDef={this.state.defaultColDef}
            tooltipShowDelay={this.state.tooltipShowDelay}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
