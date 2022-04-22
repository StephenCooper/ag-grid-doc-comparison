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
        { field: 'country', rowGroup: true, hide: true },
        { field: 'year', rowGroup: true, hide: true },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        resizable: true,
      },
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  expandAll = () => {
    this.gridApi.expandAll();
  };

  collapseAll = () => {
    this.gridApi.collapseAll();
  };

  expandCountries = () => {
    this.gridApi.forEachNode((node) => {
      if (node.level === 0) {
        node.setExpanded(true);
      }
    });
  };

  expand2000 = () => {
    this.gridApi.forEachNode((node) => {
      if (node.key === '2000') {
        node.parent.setExpanded(true); // ensure parent 'country' group is also expanded
        node.setExpanded(true);
      }
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.expandAll()}>Expand All</button>
            <button onClick={() => this.collapseAll()}>Collapse All</button>
            <button onClick={() => this.expandCountries()}>
              Expand Countries
            </button>
            <button onClick={() => this.expand2000()}>
              Expand Year '2000'
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
