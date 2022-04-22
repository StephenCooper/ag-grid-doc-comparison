'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: 'Set Filter Column',
          field: 'col1',
          filter: 'agSetColumnFilter',
          flex: 1,
          editable: true,
        },
      ],
      sideBar: 'filters',
      rowData: getRowData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    params.api.getToolPanelInstance('filters').expandFilters();
  };

  setNewData = () => {
    var newData = [
      { col1: 'A' },
      { col1: 'A' },
      { col1: 'B' },
      { col1: 'C' },
      { col1: 'D' },
      { col1: 'E' },
    ];
    this.gridApi.setRowData(newData);
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
            <button onClick={() => this.setNewData()}>Set New Data</button>
            <button onClick={() => this.reset()} style={{ marginLeft: '5px' }}>
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
              columnDefs={this.state.columnDefs}
              sideBar={this.state.sideBar}
              rowData={this.state.rowData}
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
  return [{ col1: 'A' }, { col1: 'A' }, { col1: 'B' }, { col1: 'C' }];
}

render(<GridExample></GridExample>, document.querySelector('#root'));
