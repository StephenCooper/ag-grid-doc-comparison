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
        { field: 'athlete', filter: 'agTextColumnFilter' },
        { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 100 },
        { field: 'country' },
        { field: 'year', maxWidth: 100 },
        {
          field: 'date',
          filter: 'agDateColumnFilter',
          filterParams: filterParams,
        },
        { field: 'sport' },
        { field: 'gold', filter: 'agNumberColumnFilter' },
        { field: 'silver', filter: 'agNumberColumnFilter' },
        { field: 'bronze', filter: 'agNumberColumnFilter' },
        { field: 'total', filter: 'agNumberColumnFilter' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
      },
      sideBar: 'filters',
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

    params.api.getToolPanelInstance('filters').expandFilters();
  };

  clearFilters = () => {
    this.gridApi.setFilterModel(null);
  };

  saveFilterModel = () => {
    savedFilterModel = this.gridApi.getFilterModel();
    var keys = Object.keys(savedFilterModel);
    var savedFilters = keys.length > 0 ? keys.join(', ') : '(none)';
    document.querySelector('#savedFilters').innerHTML = savedFilters;
  };

  restoreFilterModel = () => {
    this.gridApi.setFilterModel(savedFilterModel);
  };

  restoreFromHardCoded = () => {
    var hardcodedFilter = {
      country: {
        type: 'set',
        values: ['Ireland', 'United States'],
      },
      age: { type: 'lessThan', filter: '30' },
      athlete: { type: 'startsWith', filter: 'Mich' },
      date: { type: 'lessThan', dateFrom: '2010-01-01' },
    };
    this.gridApi.setFilterModel(hardcodedFilter);
  };

  destroyFilter = () => {
    this.gridApi.destroyFilter('athlete');
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div>
            <div className="button-group">
              <button onClick={() => this.saveFilterModel()}>
                Save Filter Model
              </button>
              <button onClick={() => this.restoreFilterModel()}>
                Restore Saved Filter Model
              </button>
              <button
                onClick={() => this.restoreFromHardCoded()}
                title="Name = 'Mich%', Country = ['Ireland', 'United States'], Age < 30, Date < 01/01/2010"
              >
                Set Custom Filter Model
              </button>
              <button onClick={() => this.clearFilters()}>Reset Filters</button>
              <button onClick={() => this.destroyFilter()}>
                Destroy Filter
              </button>
            </div>
          </div>
          <div>
            <div className="button-group">
              Saved Filters: <span id="savedFilters">(none)</span>
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
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  // browserDatePicker: true,
};
var savedFilterModel = null;

render(<GridExample></GridExample>, document.querySelector('#root'));
