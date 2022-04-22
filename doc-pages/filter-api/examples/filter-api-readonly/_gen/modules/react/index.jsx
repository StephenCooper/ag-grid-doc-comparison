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
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  MultiFilterModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete', filter: true, filterParams: defaultFilterParams },
        {
          field: 'age',
          filter: 'agNumberColumnFilter',
          filterParams: defaultFilterParams,
        },
        {
          field: 'country',
          filter: 'agSetColumnFilter',
          filterParams: defaultFilterParams,
        },
        {
          field: 'year',
          maxWidth: 120,
          filter: 'agNumberColumnFilter',
          filterParams: defaultFilterParams,
        },
        {
          field: 'date',
          minWidth: 215,
          filter: 'agDateColumnFilter',
          filterParams: {
            readOnly: true,
            comparator: dateComparator,
          },
          suppressMenu: true,
        },
        {
          field: 'sport',
          suppressMenu: true,
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              {
                filter: 'agTextColumnFilter',
                filterParams: { readOnly: true },
              },
              { filter: 'agSetColumnFilter', filterParams: { readOnly: true } },
            ],
            readOnly: true,
          },
        },
        { field: 'gold', filterParams: defaultFilterParams },
        { field: 'silver', filterParams: defaultFilterParams },
        { field: 'bronze', filterParams: defaultFilterParams },
        { field: 'total', filter: false },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
        floatingFilter: true,
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

  irelandAndUk = () => {
    var countryFilterComponent = this.gridApi.getFilterInstance('country');
    countryFilterComponent.setModel({ values: ['Ireland', 'Great Britain'] });
    this.gridApi.onFilterChanged();
  };

  clearCountryFilter = () => {
    var countryFilterComponent = this.gridApi.getFilterInstance('country');
    countryFilterComponent.setModel(null);
    this.gridApi.onFilterChanged();
  };

  destroyCountryFilter = () => {
    this.gridApi.destroyFilter('country');
  };

  endingStan = () => {
    var countryFilterComponent = this.gridApi.getFilterInstance('country');
    var countriesEndingWithStan = countryFilterComponent
      .getValues()
      .filter(function (value) {
        return value.indexOf('stan') === value.length - 4;
      });
    countryFilterComponent.setModel({ values: countriesEndingWithStan });
    this.gridApi.onFilterChanged();
  };

  printCountryModel = () => {
    var countryFilterComponent = this.gridApi.getFilterInstance('country');
    var model = countryFilterComponent.getModel();
    if (model) {
      console.log('Country model is: ' + JSON.stringify(model));
    } else {
      console.log('Country model filter is not active');
    }
  };

  sportStartsWithS = () => {
    var sportsFilterComponent = this.gridApi.getFilterInstance('sport');
    sportsFilterComponent.setModel({
      filterModels: [
        {
          type: 'startsWith',
          filter: 's',
        },
      ],
    });
    this.gridApi.onFilterChanged();
  };

  sportEndsWithG = () => {
    var sportsFilterComponent = this.gridApi.getFilterInstance('sport');
    sportsFilterComponent.setModel({
      filterModels: [
        {
          type: 'endsWith',
          filter: 'g',
        },
      ],
    });
    this.gridApi.onFilterChanged();
  };

  sportsCombined = () => {
    var sportsFilterComponent = this.gridApi.getFilterInstance('sport');
    sportsFilterComponent.setModel({
      filterModels: [
        {
          condition2: {
            type: 'endsWith',
            filter: 'g',
          },
          operator: 'AND',
          condition1: {
            type: 'startsWith',
            filter: 's',
          },
        },
      ],
    });
    this.gridApi.onFilterChanged();
  };

  ageBelow25 = () => {
    var ageFilterComponent = this.gridApi.getFilterInstance('age');
    ageFilterComponent.setModel({
      type: 'lessThan',
      filter: 25,
      filterTo: null,
    });
    this.gridApi.onFilterChanged();
  };

  ageAbove30 = () => {
    var ageFilterComponent = this.gridApi.getFilterInstance('age');
    ageFilterComponent.setModel({
      type: 'greaterThan',
      filter: 30,
      filterTo: null,
    });
    this.gridApi.onFilterChanged();
  };

  ageBelow25OrAbove30 = () => {
    var ageFilterComponent = this.gridApi.getFilterInstance('age');
    ageFilterComponent.setModel({
      condition1: {
        type: 'greaterThan',
        filter: 30,
        filterTo: null,
      },
      operator: 'OR',
      condition2: {
        type: 'lessThan',
        filter: 25,
        filterTo: null,
      },
    });
    this.gridApi.onFilterChanged();
  };

  ageBetween25And30 = () => {
    var ageFilterComponent = this.gridApi.getFilterInstance('age');
    ageFilterComponent.setModel({
      type: 'inRange',
      filter: 25,
      filterTo: 30,
    });
    this.gridApi.onFilterChanged();
  };

  clearAgeFilter = () => {
    var ageFilterComponent = this.gridApi.getFilterInstance('age');
    ageFilterComponent.setModel(null);
    this.gridApi.onFilterChanged();
  };

  after2010 = () => {
    var dateFilterComponent = this.gridApi.getFilterInstance('date');
    dateFilterComponent.setModel({
      type: 'greaterThan',
      dateFrom: '2010-01-01',
      dateTo: null,
    });
    this.gridApi.onFilterChanged();
  };

  before2012 = () => {
    var dateFilterComponent = this.gridApi.getFilterInstance('date');
    dateFilterComponent.setModel({
      type: 'lessThan',
      dateFrom: '2012-01-01',
      dateTo: null,
    });
    this.gridApi.onFilterChanged();
  };

  dateCombined = () => {
    var dateFilterComponent = this.gridApi.getFilterInstance('date');
    dateFilterComponent.setModel({
      condition1: {
        type: 'lessThan',
        dateFrom: '2012-01-01',
        dateTo: null,
      },
      operator: 'OR',
      condition2: {
        type: 'greaterThan',
        dateFrom: '2010-01-01',
        dateTo: null,
      },
    });
    this.gridApi.onFilterChanged();
  };

  clearDateFilter = () => {
    var dateFilterComponent = this.gridApi.getFilterInstance('date');
    dateFilterComponent.setModel(null);
    this.gridApi.onFilterChanged();
  };

  clearSportFilter = () => {
    var dateFilterComponent = this.gridApi.getFilterInstance('sport');
    dateFilterComponent.setModel(null);
    this.gridApi.onFilterChanged();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="example-header">
            <span className="button-group">
              <button onClick={() => this.irelandAndUk()}>
                Ireland &amp; UK
              </button>
              <button onClick={() => this.endingStan()}>
                Countries Ending 'stan'
              </button>
              <button onClick={() => this.printCountryModel()}>
                Print Country
              </button>
              <button onClick={() => this.clearCountryFilter()}>
                Clear Country
              </button>
              <button onClick={() => this.destroyCountryFilter()}>
                Destroy Country
              </button>
            </span>
            <span className="button-group">
              <button onClick={() => this.ageBelow25()}>Age Below 25</button>
              <button onClick={() => this.ageAbove30()}>Age Above 30</button>
              <button onClick={() => this.ageBelow25OrAbove30()}>
                Age Below 25 or Above 30
              </button>
              <button onClick={() => this.ageBetween25And30()}>
                Age Between 25 and 30
              </button>
              <button onClick={() => this.clearAgeFilter()}>
                Clear Age Filter
              </button>
            </span>
            <span className="button-group">
              <button onClick={() => this.after2010()}>
                Date after 01/01/2010
              </button>
              <button onClick={() => this.before2012()}>
                Date before 01/01/2012
              </button>
              <button onClick={() => this.dateCombined()}>Date combined</button>
              <button onClick={() => this.clearDateFilter()}>
                Clear Date Filter
              </button>
            </span>
            <span className="button-group">
              <button onClick={() => this.sportStartsWithS()}>
                Sport starts with S
              </button>
              <button onClick={() => this.sportEndsWithG()}>
                Sport ends with G
              </button>
              <button onClick={() => this.sportsCombined()}>
                Sport starts with S and ends with G
              </button>
              <button onClick={() => this.clearSportFilter()}>
                Clear Sport Filter
              </button>
            </span>
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

var defaultFilterParams = { readOnly: true };

render(<GridExample></GridExample>, document.querySelector('#root'));
