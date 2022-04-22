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

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete', minWidth: 180 },
        { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 80 },
        { field: 'country' },
        { field: 'year', maxWidth: 90 },
        {
          field: 'date',
          filter: 'agDateColumnFilter',
          filterParams: dateFilterParams,
        },
        { field: 'gold', filter: 'agNumberColumnFilter' },
        { field: 'silver', filter: 'agNumberColumnFilter' },
        { field: 'bronze', filter: 'agNumberColumnFilter' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        filter: true,
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      document.querySelector('#everyone').checked = true;
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  externalFilterChanged = (newValue) => {
    ageType = newValue;
    this.gridApi.onFilterChanged();
  };

  isExternalFilterPresent = () => {
    // if ageType is not everyone, then we are filtering
    return ageType !== 'everyone';
  };

  doesExternalFilterPass = (node) => {
    switch (ageType) {
      case 'below25':
        return node.data.age < 25;
      case 'between25and50':
        return node.data.age >= 25 && node.data.age <= 50;
      case 'above50':
        return node.data.age > 50;
      case 'dateAfter2008':
        return asDate(node.data.date) > new Date(2008, 1, 1);
      default:
        return true;
    }
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <label>
              <input
                type="radio"
                name="filter"
                id="everyone"
                onChange={() => this.externalFilterChanged('everyone')}
              />
              Everyone
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                id="below25"
                onChange={() => this.externalFilterChanged('below25')}
              />
              Below 25
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                id="between25and50"
                onChange={() => this.externalFilterChanged('between25and50')}
              />
              Between 25 and 50
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                id="above50"
                onChange={() => this.externalFilterChanged('above50')}
              />
              Above 50
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                id="dateAfter2008"
                onChange={() => this.externalFilterChanged('dateAfter2008')}
              />
              After 01/01/2008
            </label>
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
              animateRows={true}
              isExternalFilterPresent={this.isExternalFilterPresent}
              doesExternalFilterPass={this.doesExternalFilterPass}
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
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var cellDate = asDate(cellValue);
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
};
var ageType = 'everyone';
function asDate(dateAsString) {
  var splitFields = dateAsString.split('/');
  return new Date(
    Number.parseInt(splitFields[2]),
    Number.parseInt(splitFields[1]) - 1,
    Number.parseInt(splitFields[0])
  );
}

render(<GridExample></GridExample>, document.querySelector('#root'));
