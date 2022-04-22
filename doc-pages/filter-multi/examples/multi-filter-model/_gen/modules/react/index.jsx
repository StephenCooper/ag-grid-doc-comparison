'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MultiFilterModule,
  SetFilterModule,
  MenuModule,
  ClipboardModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete', filter: 'agMultiColumnFilter' },
        {
          field: 'country',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              {
                filter: 'agTextColumnFilter',
                filterParams: {
                  defaultOption: 'startsWith',
                },
              },
              {
                filter: 'agSetColumnFilter',
              },
            ],
          },
        },
        {
          field: 'gold',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              {
                filter: 'agNumberColumnFilter',
              },
              {
                filter: 'agSetColumnFilter',
              },
            ],
          },
        },
        {
          field: 'date',
          filter: 'agMultiColumnFilter',
          filterParams: dateFilterParams,
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        menuTabs: ['filterMenuTab'],
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

  printState = () => {
    var filterState = this.gridApi.getFilterModel();
    console.log('Current filter state: ', filterState);
  };

  saveState = () => {
    savedFilterState = this.gridApi.getFilterModel();
    console.log('Filter state saved');
  };

  restoreState = () => {
    this.gridApi.setFilterModel(savedFilterState);
    console.log('Filter state restored');
  };

  resetState = () => {
    this.gridApi.setFilterModel(null);
    console.log('Filter state reset');
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={() => this.printState()}>Print State</button>
            <button onClick={() => this.saveState()}>Save State</button>
            <button onClick={() => this.restoreState()}>Restore State</button>
            <button onClick={() => this.resetState()}>Reset State</button>
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
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

var dateFilterParams = {
  filters: [
    {
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterDate, cellValue) => {
          if (cellValue == null) return -1;
          return getDate(cellValue).getTime() - filterDate.getTime();
        },
      },
    },
    {
      filter: 'agSetColumnFilter',
      filterParams: {
        comparator: (a, b) => {
          return getDate(a).getTime() - getDate(b).getTime();
        },
      },
    },
  ],
};
function getDate(value) {
  var dateParts = value.split('/');
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
}
var savedFilterState;

render(<GridExample></GridExample>, document.querySelector('#root'));
