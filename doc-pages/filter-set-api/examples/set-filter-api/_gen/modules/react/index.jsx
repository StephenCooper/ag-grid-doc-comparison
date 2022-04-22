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
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  FiltersToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: 'athlete',
          filter: 'agSetColumnFilter',
          filterParams: {
            cellHeight: 20,
          },
        },
        {
          field: 'country',
          valueFormatter: function (params) {
            return `${params.value.name} (${params.value.code})`;
          },
          keyCreator: countryKeyCreator,
        },
        { field: 'age', maxWidth: 120, filter: 'agNumberColumnFilter' },
        { field: 'year', maxWidth: 120 },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold', filter: 'agNumberColumnFilter' },
        { field: 'silver', filter: 'agNumberColumnFilter' },
        { field: 'bronze', filter: 'agNumberColumnFilter' },
        { field: 'total', filter: 'agNumberColumnFilter' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 160,
        filter: true,
        resizable: true,
      },
      sideBar: 'filters',
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      patchData(data);
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = () => {
    this.gridApi.getToolPanelInstance('filters').expandFilters();
  };

  selectJohnAndKenny = () => {
    const instance = this.gridApi.getFilterInstance('athlete');
    instance.setModel({ values: ['John Joe Nevin', 'Kenny Egan'] });
    this.gridApi.onFilterChanged();
  };

  selectEverything = () => {
    const instance = this.gridApi.getFilterInstance('athlete');
    instance.setModel(null);
    this.gridApi.onFilterChanged();
  };

  selectNothing = () => {
    const instance = this.gridApi.getFilterInstance('athlete');
    instance.setModel({ values: [] });
    this.gridApi.onFilterChanged();
  };

  setCountriesToFranceAustralia = () => {
    const instance = this.gridApi.getFilterInstance('country');
    instance.setFilterValues(['France', 'Australia']);
    instance.applyModel();
    this.gridApi.onFilterChanged();
  };

  setCountriesToAll = () => {
    const instance = this.gridApi.getFilterInstance('country');
    instance.resetFilterValues();
    instance.applyModel();
    this.gridApi.onFilterChanged();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="example-header">
            <div>
              Athlete:
              <button onClick={() => this.selectNothing()}>
                API: Filter empty set
              </button>
              <button onClick={() => this.selectJohnAndKenny()}>
                API: Filter only John Joe Nevin and Kenny Egan
              </button>
              <button onClick={() => this.selectEverything()}>
                API: Remove filter
              </button>
            </div>
            <div style={{ paddingTop: '10px' }}>
              Country - available filter values
              <button onClick={() => this.setCountriesToFranceAustralia()}>
                Filter values restricted to France and Australia
              </button>
              <button onClick={() => this.setCountriesToAll()}>
                Make all countries available
              </button>
            </div>
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
              sideBar={this.state.sideBar}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

function countryKeyCreator(params) {
  return params.value.name;
}
function patchData(data) {
  // hack the data, replace each country with an object of country name and code
  data.forEach(function (row) {
    const countryName = row.country;
    const countryCode = countryName.substring(0, 2).toUpperCase();
    row.country = {
      name: countryName,
      code: countryCode,
    };
  });
}

render(<GridExample></GridExample>, document.querySelector('#root'));
