'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: 'athlete',
          filterParams: containsFilterParams,
        },
        {
          field: 'age',
          minWidth: 120,
          filter: 'agNumberColumnFilter',
          filterParams: filterParams,
        },
        {
          field: 'date',
          filter: 'agDateColumnFilter',
          filterParams: equalsFilterParams,
        },
        {
          field: 'country',
          filterParams: notEqualsFilterParams,
        },
        { field: 'gold', filter: 'agNumberColumnFilter' },
        { field: 'silver', filter: 'agNumberColumnFilter' },
        { field: 'bronze', filter: 'agNumberColumnFilter' },
        { field: 'total', filter: false },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      getLocaleText: (params) => {
        if (params.key === 'notEqualNoNulls') {
          return '* Not Equals (No Nulls) *';
        }
        return params.defaultValue;
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  printState = () => {
    var filterState = this.gridApi.getFilterModel();
    console.log('filterState: ', filterState);
  };

  saveState = () => {
    window.filterState = this.gridApi.getFilterModel();
    console.log('filter state saved');
  };

  restoreState = () => {
    this.gridApi.setFilterModel(window.filterState);
    console.log('filter state restored');
  };

  resetState = () => {
    this.gridApi.setFilterModel(null);
    console.log('column state reset');
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
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
              getLocaleText={this.state.getLocaleText}
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
  filterOptions: [
    'empty',
    {
      displayKey: 'evenNumbers',
      displayName: 'Even Numbers',
      predicate: (_, cellValue) => cellValue != null && cellValue % 2 === 0,
      numberOfInputs: 0,
    },
    {
      displayKey: 'oddNumbers',
      displayName: 'Odd Numbers',
      predicate: (_, cellValue) => cellValue != null && cellValue % 2 !== 0,
      numberOfInputs: 0,
    },
    {
      displayKey: 'blanks',
      displayName: 'Blanks',
      predicate: (_, cellValue) => cellValue == null,
      numberOfInputs: 0,
    },
    {
      displayKey: 'age5YearsAgo',
      displayName: 'Age 5 Years Ago',
      predicate: ([fv1], cellValue) =>
        cellValue == null || cellValue - 5 === fv1,
      numberOfInputs: 1,
    },
    {
      displayKey: 'betweenExclusive',
      displayName: 'Between (Exclusive)',
      predicate: ([fv1, fv2], cellValue) =>
        cellValue == null || (fv1 < cellValue && fv2 > cellValue),
      numberOfInputs: 2,
    },
  ],
  suppressAndOrCondition: true,
};
var containsFilterParams = {
  filterOptions: [
    'contains',
    {
      displayKey: 'startsA',
      displayName: 'Starts With "A"',
      predicate: (_, cellValue) =>
        cellValue != null && cellValue.indexOf('A') === 0,
      numberOfInputs: 0,
    },
    {
      displayKey: 'startsN',
      displayName: 'Starts With "N"',
      predicate: (_, cellValue) =>
        cellValue != null && cellValue.indexOf('N') === 0,
      numberOfInputs: 0,
    },
    {
      displayKey: 'regexp',
      displayName: 'Regular Expression',
      predicate: ([fv1], cellValue) =>
        cellValue == null || new RegExp(fv1, 'gi').test(cellValue),
      numberOfInputs: 1,
    },
    {
      displayKey: 'betweenExclusive',
      displayName: 'Between (Exclusive)',
      predicate: ([fv1, fv2], cellValue) =>
        cellValue == null || (fv1 < cellValue && fv2 > cellValue),
      numberOfInputs: 2,
    },
  ],
};
var equalsFilterParams = {
  filterOptions: [
    'equals',
    {
      displayKey: 'equalsWithNulls',
      displayName: 'Equals (with Nulls)',
      predicate: ([filterValue], cellValue) => {
        if (cellValue == null) return true;
        var parts = cellValue.split('/');
        var cellDate = new Date(
          Number(parts[2]),
          Number(parts[1] - 1),
          Number(parts[0])
        );
        return cellDate.getTime() === filterValue.getTime();
      },
    },
    {
      displayKey: 'leapYear',
      displayName: 'Leap Year',
      predicate: (_, cellValue) => {
        if (cellValue == null) return true;
        const year = Number(cellValue.split('/')[2]);
        return year % 4 === 0 && year % 200 !== 0;
      },
      numberOfInputs: 0,
    },
    {
      displayKey: 'betweenExclusive',
      displayName: 'Between (Exclusive)',
      predicate: ([fv1, fv2], cellValue) => {
        if (cellValue == null) return true;
        var parts = cellValue.split('/');
        var cellDate = new Date(
          Number(parts[2]),
          Number(parts[1] - 1),
          Number(parts[0])
        );
        return (
          cellDate.getTime() > fv1.getTime() &&
          cellDate.getTime() < fv2.getTime()
        );
      },
      numberOfInputs: 2,
    },
  ],
  comparator: function (filterLocalDateAtMidnight, cellValue) {
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
  browserDatePicker: true,
};
var notEqualsFilterParams = {
  filterOptions: [
    'notEqual',
    {
      displayKey: 'notEqualNoNulls',
      displayName: 'Not Equals without Nulls',
      predicate: ([filterValue], cellValue) => {
        if (cellValue == null) return false;
        return cellValue.toLowerCase() !== filterValue.toLowerCase();
      },
    },
  ],
};

render(<GridExample></GridExample>, document.querySelector('#root'));
